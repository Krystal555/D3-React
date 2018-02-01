/**
 * Created by zaoyu on 2018/1/24.
 */
import React from 'react';
import * as d3 from 'd3';

import ToolBar from './toolbar';
import './graph.less';
import ContextMenu from './contextmenu';
import graphData from '../../const/graphData';

import drawPath from '../../utils/drawPath';
const drawStraightPath = drawPath.drawStraightPath;
const drawCurvePath = drawPath.drawCurvePath;
import drawPoint from '../../utils/drawPoint';
const drawPicPoint = drawPoint.drawPoint;
import svgBackground from '../../Images/svg-background.jpg';

const drawMargin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
};
//画布的大小设置
let width = 1200,height = 1000;
//地图初始数据信息
let pointArray = graphData.getPointArray();
let lineArray = graphData.getLineArray();
//创建svg的X轴和Y轴坐标
let xScale = d3.scaleLinear()
    .domain([0,120])
    .range([0,width]);
let xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(20)
    .tickSize(height)
    .tickPadding(8-height);

let yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0,height]);
let yAxis = d3.axisRight()
    .scale(yScale)
    .ticks(20)
    .tickSize(width)
    .tickPadding(8-width);

export default class D3Container extends React.Component{
    constructor(){
        super();

        this.state = {
            showContextMenu:true
        }
    }

    componentDidMount(){
        let element = this.refs.d3Container;
        return this.createD3(element);
    }

    createD3(element){
        //开发画布的缩放功能
        let zoom = d3.zoom()
            .scaleExtent([0.5,3])
            .translateExtent([[20,20],[width,height]])
            .on('zoom',function(){
                let k = d3.event.transform.k;
                let x = d3.event.transform.x;
                let y = d3.event.transform.y;
                console.log(k,x,y)
                d3.selectAll('g')
                 .attr('transform',`translate(${x},${y})scale(${k})`)
            });

        //创建svg画布
        let svg = d3.select(element)
            .append('svg')
            .attr('class','d3-svg')
            .style('width',width)
            .style('height',height)
            .style('background','#F9F9F9');
            //.call(zoom);
        svg.append('image')
            .attr('xlink:href',svgBackground)
            .attr('x',xScale(0))
            .attr('y',yScale(0))
            .attr('width',width)
            .attr('height',height);

        /*//创建缩放容器
        let svg = svgWrapper.append('svg')
            .attr('class','d3-zoomContainer')*/

        //分别添加X轴和Y轴
        svg.append('g')
            .attr('class','d3-xAxis')
            //.attr('transform', `translate(0,30)`) //设置距离上边界的距离
            .call(xAxis);
        svg.append('g')
            .attr('class','d3-yAxis')
            //.attr('transform', `translate(30,0)`) //设置距离左边界的距离
            .call(yAxis);

        //禁止画布右键事件
        svg.on('contextmenu',()=>{
            event.preventDefault();
        });
        //画初始所有站点
        drawPicPoint(xScale,yScale,pointArray);
        //画初始所有直线路径
        drawStraightPath(xScale,yScale,lineArray);
        //画初始所有曲线路径
        drawCurvePath(svg,xScale,yScale,[13,63],[33,66]);
        drawCurvePath(svg,xScale,yScale,[33,66],[13,63]);
        drawCurvePath(svg,xScale,yScale,[36,32],[50,50]);
    };

    //添加节点
    updatePoint(index){
        let svg = d3.select('.d3-svg');
        let circles = svg.selectAll('circle');
        circles.on('mousedown',null);
        circles.on('mouseup',null);
        svg.on('click',()=>{
            let newPoint = d3.mouse(d3.event.currentTarget);
            let id = Math.random().toString().slice(-8);//随机生成8位的id号
            let newX = (newPoint[0]/10).toFixed(1);
            let newY = (newPoint[1]/10).toFixed(1);
            pointArray.push([id,[newX,newY]]);
            console.log(pointArray);
            drawPicPoint(xScale,yScale,pointArray);
            //退出画节点
            document.onkeydown = function(event){
                let keyNum = window.event ? event.keyCode : e.which;
                if(keyNum === 27){ //按下ESC键退出
                    svg.on('click',null);
                }
            }
        });
    }
    //添加直线路径
    drawStraightLine(){
        console.log('画路径');
        let sourceX,sourceY,endX,endY;
        let svg = d3.select('.d3-svg');
        svg.on('click',null);
        let circles = svg.selectAll('circle')
            .on('.drag',null) //取消拖拽行为
            .on('mousedown',function(point,index){
                sourceX = this.getAttribute('cx');//被点击的起始节点坐标
                sourceY = this.getAttribute('cy');
            })
            .on('mouseup',function(){
                endX = this.getAttribute('cx');//被点击的终止节点坐标
                endY = this.getAttribute('cy');
                if(!!sourceX && !!sourceY && !!endX && !!endY){
                    let id = Math.random().toString().slice(-8);//随机生成8位的id号
                    let x1 = +((sourceX/10).toFixed(1));
                    let y1 = +((sourceY/10).toFixed(1));
                    let x2 = +((endX/10).toFixed(1));
                    let y2 = +((endY/10).toFixed(1));
                    let type = 'straightLine';
                    let direction = 'forward';
                    lineArray.push([id,[[x1,y1],[x2,y2]],type,direction]);
                    drawStraightPath(xScale,yScale,lineArray)
                 }
            });
        //退出画直线路径
        document.onkeydown = function(event){
            let keyNum = window.event ? event.keyCode : e.which;
            if(keyNum === 27){ //按下ESC键退出
                //停止circles响应mousedown和mouseup事件，避免再画线
                circles.on('mousedown',null);
                circles.on('mouseup',null);
                //恢复节点的拖拽行为
                let drag = d3.drag()
                    .on('start',function(){
                        d3.select(this).classed('active',true)
                    })
                    .on('drag',function(){
                        d3.select(this)
                            .attr('cx',(d3.event.x).toFixed(1))
                            .attr('cy',(d3.event.y).toFixed(1))
                        /*在节点被拖动后，不仅要修改节点的cx和cy属性，
                         还要修改pointArray里对应节点的坐标，
                         这个坐标相对的是仓库坐标不是地图坐标
                         */
                        let id = this.getAttribute('id');
                        pointArray.forEach(function(point){
                            if(point[0] == id){
                                point[1][0] = ((d3.event.x)/10).toFixed(1);
                                point[1][1] = ((d3.event.y)/10).toFixed(1);
                            }
                        })
                    })
                    .on('end',function(){
                        d3.select(this).classed('active',false)
                    });
                circles.call(drag);
            }
        }
    }

    render(){
        return(
            <div className="d3Content">
                <ToolBar
                    updatePoint={this.updatePoint.bind(this)}
                    drawStraightLine={this.drawStraightLine.bind(this)}
                />
                <div className="d3Draw" ref="d3Container"/>
                <ContextMenu/>
            </div>
        );
    }
}