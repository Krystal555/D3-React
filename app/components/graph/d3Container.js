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
import dragPoint from '../../utils/dragPoint';
let drag = dragPoint.dragPoint;

const drawMargin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
};
/*let graph = {
    point: [
        {'id': 1,'x':10,'y':10},
        {'id': 2,'x':50,'y':50},
        {'id': 3,'x':52,'y':26},
        {'id': 4,'x':36,'y':32},
        {'id': 5,'x':20,'y':20},
        {'id': 6,'x':13,'y':63},
        {'id': 7,'x':62,'y':5},
        {'id': 8,'x':33,'y':66},
        {'id': 9,'x':79,'y':50},
        {'id': 10,'x':13,'y':32},
        {'id': 11,'x':12,'y':5},
        {'id': 12,'x':95,'y':17},
        {'id': 13,'x':77,'y':88},
        {'id': 14,'x':12,'y':100},
        {'id': 15,'x':20,'y':10},
        {'id': 16,'x':20,'y':30},
        {'id': 17,'x':40,'y':20},
        {'id': 18,'x':10,'y':20},
        {'id': 19,'x':25,'y':15},
        {'id': 20,'x':10,'y':30},
        {'id': 21,'x':38,'y':24},
        {'id': 22,'x':26,'y':32},
    ],
    line: [
       {'id': 1,'source':5,'target':4,'type':'straightLine','direction':'forward'},
        {'id': 2,'source':4,'target':2,'type':'straightLine','direction':'forward'},
        {'id': 3,'source':2,'target':9,'type':'straightLine','direction':'forward'},
        {'id': 4,'source':9,'target':2,'type':'straightLine','direction':'reverse'},
        {'id': 5,'source':5,'target':20,'type':'straightLine','direction':'forward'},
        {'id': 6,'source':5,'target':17,'type':'straightLine','direction':'forward'},
        {'id': 7,'source':5,'target':18,'type':'straightLine','direction':'forward'},
        {'id': 8,'source':5,'target':16,'type':'straightLine','direction':'forward'},
        {'id': 9,'source':5,'target':15,'type':'straightLine','direction':'forward'},
        {'id': 10,'source':5,'target':1,'type':'straightLine','direction':'forward'},
        {'id': 11,'source':5,'target':19,'type':'straightLine','direction':'forward'},
        {'id': 12,'source':[20,20],'target':[38,24],'type':'straightLine','direction':'forward'},
        {'id': 13,'source':[20,20],'target':[26,32],'type':'straightLine','direction':'forward'},
    ]
};*/
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

        //创建缩放容器
        /*let svg = svgWrapper.append('svg')
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

        //创建一个力学空的模拟器
        /*let simulation = d3.forceSimulation()
            //.force('link',d3.forceLink().id(function(d){return d.id}))
            .force('change',d3.forceManyBody())
            .force('center',d3.forceCenter(width/2,height/2));*/

        //禁止画布右键事件
        svg.on('contextmenu',()=>{
            event.preventDefault();
        });
        //画初始所有站点
        drawPicPoint(xScale,yScale,pointArray,lineArray);
        //drawPicPoint(xScale,yScale,graph.point);
        //画初始所有直线路径
        drawStraightPath(xScale,yScale,lineArray);
        //drawStraightPath(xScale,yScale,graph.line);
        //画初始所有曲线路径
        drawCurvePath(svg,xScale,yScale,[13,63],[33,66]);
        drawCurvePath(svg,xScale,yScale,[33,66],[13,63]);
        drawCurvePath(svg,xScale,yScale,[36,32],[50,50]);

        /*simulation.nodes(graph.point)
            .force('link',d3.forceLink(graph.line))
            .on('tick',()=>{
                let line = svg.selectAll('line');
                let point = svg.selectAll('circle');
                console.log(line);
                console.log(point);
                line.attr("x1", function(d) { return d.x1; })
                    .attr("y1", function(d) { return d.y1; })
                    .attr("x2", function(d) { return d.x2; })
                    .attr("y2", function(d) { return d.y2; });

                point.attr("cx", function(d) { return d.x})
                    .attr("cy", function(d) { return d.y});
            });
       simulation.force('line')
            .links(graph.line)*/
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
            let newX = newPoint[0]/10;
            let newY = newPoint[1]/10;
            pointArray.push([id,[newX,newY]]);
            console.log(pointArray);
            drawPicPoint(xScale,yScale,pointArray,lineArray);
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
                    let x1 = +(sourceX/10);
                    let y1 = +(sourceY/10);
                    let x2 = +(endX/10);
                    let y2 = +(endY/10);
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
                circles
                    .on('mousedown',null)
                    .on('mouseup',null)
                    .call(drag(pointArray,lineArray));//恢复节点的拖拽行为
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