/**
 * Created by zaoyu on 2018/1/24.
 */
import React from 'react';
import * as d3 from 'd3';

import ToolBar from './toolbar';
import './graph.less';
import ContextMenu from './contextMenu';
import graphData from '../../const/graphData';
//画直线、曲线路径以及路径箭头的函数
import drawPath from '../../utils/drawPath';
const drawStraightPath = drawPath.drawStraightPath;
const drawBothWayPath = drawPath.drawBothWayPath;
const drawCurvePath = drawPath.drawCurvePath;
const drawBothWayCurve = drawPath.drawBothWayCurve;
const drawArrow = drawPath.drawArrow;
//画节点函数
import drawPoint from '../../utils/drawPoint';
const drawPicPoint = drawPoint.drawPoint;
//画小车函数
import drawVehicle from '../../utils/drawVehicle';
const drawPicVehicle = drawVehicle.drawVehicle;
//地图背景
import svgBackground from '../../Images/svg-background.jpg';
//拖拽节点函数
import dragPoint from '../../utils/dragPoint';
let drag = dragPoint.dragPoint;
//拖拽控制点函数
import dragConPoint from '../../utils/dragControlPoint';
let dragControlPoint = dragConPoint.dragControlPoint;
//节点类型映射
const pointType = {
    1:'haltPoint',
    2:'blockPoint',
    3:'chargePoint',
    4:'parkPoint',
    5:'forkPoint',
    6:'hangPoint',
    7:'loadPoint',
    8:'unloadPoint',
    9:'exitPoint',
    10:'entrancePoint',
    11:'liftPoint'
};
/*const drawMargin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
};*/
//画布的大小设置
let mapWidth = 1200,mapHeight = 1000;
//仓库地图大小
let warehouseWidth = 120,warehouseHeight = 100;
//画布与仓库地图的比例
let xRatio = +mapWidth/+warehouseWidth,yRatio = +mapHeight/+warehouseHeight;
console.log(`画布与仓库地图的比例:x轴-${xRatio},y轴-${yRatio}`);
//地图初始数据信息
let pointArray = graphData.getPointArray();
let lineArray = graphData.getLineArray().lineArray;
let bothWayLineArray = graphData.getLineArray().bothWayLineArray;
let curveArray = graphData.getLineArray().curveArray;
let bothWayCurveArray = graphData.getLineArray().bothWayCurveArray;
let vehicleArray = graphData.getVehicleArray();
//创建svg的X轴和Y轴坐标
let xScale = d3.scaleLinear()
    .domain([0,warehouseWidth])
    .range([0,mapWidth]);
let xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(20)
    .tickSize(mapHeight)
    .tickPadding(8-mapHeight);

let yScale = d3.scaleLinear()
    .domain([0, warehouseHeight])
    .range([0,mapHeight]);
let yAxis = d3.axisRight()
    .scale(yScale)
    .ticks(20)
    .tickSize(mapWidth)
    .tickPadding(8-mapWidth);

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
            .translateExtent([[20,20],[mapWidth,mapHeight]])
            .on('zoom',function(){
                let k = d3.event.transform.k;
                let x = d3.event.transform.x;
                let y = d3.event.transform.y;
                console.log(k,x,y);
                d3.selectAll('g')
                 .attr('transform',`translate(${x},${y})scale(${k})`)
            });

        //创建svg画布
        let svg = d3.select(element)
            .append('svg')
            .attr('class','d3-svg')
            .style('width',mapWidth+10)
            .style('height',mapHeight+10)
            .style('background','#F9F9F9');
            //.call(zoom);
        svg.append('image')
            .attr('xlink:href',svgBackground)
            .attr('x',xScale(0))
            .attr('y',yScale(0))
            .attr('width',mapWidth)
            .attr('height',mapHeight);

        //创建缩放容器
        /*let svg = svgWrapper.append('svg')
            .attr('class','d3-zoomContainer')*/

        //分别添加X轴和Y轴
        svg.append('g')
            .attr('class','d3-xAxis')
            //.attr('transform', `translate(10,0)`) //设置距离上边界的距离
            .call(xAxis);
        svg.append('g')
            .attr('class','d3-yAxis')
            //.attr('transform', `translate(0,10)`) //设置距离左边界的距离
            .call(yAxis);

        //禁止画布右键事件
        svg.on('contextmenu',()=>{
            event.preventDefault();
        });

        //画初始所有站点
        drawPicPoint(xScale,yScale,xRatio,yRatio,pointArray,lineArray.concat(bothWayLineArray),curveArray,bothWayCurveArray);
        svg.append('g')
            .attr('class','d3-line');//所有路径
        svg.append('g')
            .attr('class','d3-path');//小车运行路径
        //画路径的箭头
        drawArrow();
        //画初始所有单向直线路径
        drawStraightPath(xScale,yScale,lineArray);
        //画初始所有双向直线路径
        drawBothWayPath(xScale,yScale,bothWayLineArray);
        //画初始所有单向曲线路径
        drawCurvePath(xScale,yScale,xRatio,yRatio,curveArray);
        //画初始所有双向曲线路径
        drawBothWayCurve(xScale,yScale,xRatio,yRatio,bothWayCurveArray);
        //画初始所有小车
        drawPicVehicle(xScale,yScale,xRatio,yRatio,vehicleArray);
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
            let newX = newPoint[0]/xRatio;
            let newY = newPoint[1]/yRatio;
            let flag = false;//判断新加的站点是否已存在
            pointArray.some(function(point){
               if(point[1][0]===newX && point[1][1]===newY){
                   flag = true;//已经有该点存在了
                   return true;//终止遍历
               }
            });
            if(!flag){
                pointArray.push([id,[newX,newY],pointType[index]]);
            }
            console.log(pointArray);
            drawPicPoint(xScale,yScale,xRatio,yRatio,pointArray,lineArray.concat(bothWayLineArray),curveArray,bothWayCurveArray);
            //退出画节点
            document.onkeydown = function(event){
                let keyNum = window.event ? event.keyCode : e.which;
                if(keyNum === 27){ //按下ESC键退出
                    svg.on('click',null);
                }
            }
        });
    }
    //添加单向直线路径
    drawStraightLine(){
        console.log('画单向直线路径');
        let sourceX,sourceY,endX,endY;
        let svg = d3.select('.d3-svg');
        svg.on('click',null);
        let circles = svg.select('.d3-point').selectAll('circle')
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
                    let x1 = +(sourceX/xRatio);
                    let y1 = +(sourceY/yRatio);
                    let x2 = +(endX/xRatio);
                    let y2 = +(endY/yRatio);
                    let type = 'straightLine';
                    let direction = 'forward';
                    lineArray.push([id,[[x1,y1],[x2,y2]],type,direction]);
                    drawStraightPath(xScale,yScale,lineArray);
                 }
            });

        //退出画单向直线路径
        document.onkeydown = function(event){
            let keyNum = window.event ? event.keyCode : e.which;
            if(keyNum === 27){ //按下ESC键退出
                //停止circles响应mousedown和mouseup事件，避免再画线
                circles
                    .on('mousedown',null)
                    .on('mouseup',null)
                    .call(drag(xRatio,yRatio,pointArray,lineArray.concat(bothWayLineArray),curveArray,bothWayCurveArray));//恢复节点的拖拽行为
            }
        }
    }
    //添加双向直线路径
    drawBothWayLine(){
        console.log('画双向直线路径');
        let sourceX,sourceY,endX,endY;
        let svg = d3.select('.d3-svg');
        svg.on('click',null);
        let circles = svg.select('.d3-point').selectAll('circle')
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
                    let x1 = +(sourceX/xRatio);
                    let y1 = +(sourceY/yRatio);
                    let x2 = +(endX/xRatio);
                    let y2 = +(endY/yRatio);
                    let type = 'straightLine';
                    let direction = 'bothWay';
                    bothWayLineArray.push([id,[[x1,y1],[x2,y2]],type,direction]);
                    drawBothWayPath(xScale,yScale,bothWayLineArray)
                }
            });
        //退出画双向直线路径
        document.onkeydown = function(event){
            let keyNum = window.event ? event.keyCode : e.which;
            if(keyNum === 27){ //按下ESC键退出
                //停止circles响应mousedown和mouseup事件，避免再画线
                circles
                    .on('mousedown',null)
                    .on('mouseup',null)
                    .call(drag(xRatio,yRatio,pointArray,lineArray.concat(bothWayLineArray),curveArray,bothWayCurveArray));//恢复节点的拖拽行为
            }
        }
    }
    //添加单向曲线路径
    drawCurveLine(){
        console.log('画单向曲线路径');
        let sourceX,sourceY,endX,endY;
        let svg = d3.select('.d3-svg');
        svg.on('click',null);
        let circles = svg.select('.d3-point').selectAll('circle')
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
                    let x1 = +(sourceX/xRatio);
                    let y1 = +(sourceY/yRatio);
                    let x2 = +(endX/xRatio);
                    let y2 = +(endY/yRatio);
                    let type = 'curveLine';
                    let direction = 'forward';
                    curveArray.push([id,[[x1,y1],[x2,y2]],type,direction]);
                    drawCurvePath(xScale,yScale,xRatio,yRatio,curveArray);
                }
            });
        //退出画单向曲线路径函数
        document.onkeydown = function(event){
            let keyNum = window.event ? event.keyCode : e.which;
            if(keyNum === 27){ //按下ESC键退出
                //停止circles响应mousedown和mouseup事件，避免再画线
                circles
                    .on('mousedown',null)
                    .on('mouseup',null)
                    .call(drag(xRatio,yRatio,pointArray,lineArray.concat(bothWayLineArray),curveArray,bothWayCurveArray));//恢复节点的拖拽行为
            }
        }
    }
    //添加双向曲线路径
    drawBothWayCurve(){
        console.log('画双向曲线路径');
        let sourceX,sourceY,endX,endY;
        let svg = d3.select('.d3-svg');
        svg.on('click',null);
        let circles = svg.select('.d3-point').selectAll('circle')
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
                    let x1 = +(sourceX/xRatio);
                    let y1 = +(sourceY/yRatio);
                    let x2 = +(endX/xRatio);
                    let y2 = +(endY/yRatio);
                    let type = 'curveLine';
                    let direction = 'bothWay';
                    bothWayCurveArray.push([id,[[x1,y1],[x2,y2]],type,direction]);
                    drawBothWayCurve(xScale,yScale,xRatio,yRatio,bothWayCurveArray)
                }
            });
        //退出画双向曲线路径函数
        document.onkeydown = function(event){
            let keyNum = window.event ? event.keyCode : e.which;
            if(keyNum === 27){ //按下ESC键退出
                //停止circles响应mousedown和mouseup事件，避免再画线
                circles
                    .on('mousedown',null)
                    .on('mouseup',null)
                    .call(drag(xRatio,yRatio,pointArray,lineArray.concat(bothWayLineArray),curveArray,bothWayCurveArray));//恢复节点的拖拽行为
            }
        }
    }
    //添加小车
    addVehicle(){
        /*let svg = d3.select('.d3-svg');
        let circles = svg.selectAll('circle');
        circles.on('mousedown',null);
        circles.on('mouseup',null);
        svg.on('click',()=>{
            let newVehicle = d3.mouse(d3.event.currentTarget);
            let id = Math.random().toString().slice(-8);//随机生成8位的id号
            let newVehicleX = newVehicle[0]/xRatio;
            let newVehicleY = newVehicle[1]/yRatio;
            vehicleArray.push([id,[newVehicleX,newVehicleY],0]);
            console.log(vehicleArray);
            drawPicVehicle(xScale,yScale,xRatio,yRatio,vehicleArray);
            //退出画小车
            document.onkeydown = function(event){
                let keyNum = window.event ? event.keyCode : e.which;
                if(keyNum === 27){ //按下ESC键退出
                    svg.on('click',null);
                }
            }
        });*/
        let pathArray=[
            [77,88],
            [79,50],
            [50,50],
            [36,32]
        ];
        let svg = d3.select('svg');
        let d3Path = svg.select('.d3-path');
        //删除旧路径数据
        //svg.select('.d3-straightLine').remove();
        /*for(let i = 0;i<pathArray.length-1;i++){
            let start = pathArray[i];
            let end = pathArray[i+1];
            setTimeout(function(i){
                let vehiclePath = d3Path.append('path')
                    .attr("class","vehiclePath")
                    .attr("stroke","yellow")
                    .attr("stroke-width",2)
                    .attr('stroke-dasharray','10,7')
                    .attr('fill','none')
                    .attr('d',`M${xScale(start[0])},${yScale(start[1])} L${xScale(start[0])},${yScale(start[1])}`)
                    .transition()
                    .duration(3000)
                    .ease(d3.easeLinear)
                    .attr('d',`M${xScale(start[0])},${yScale(start[1])} L${xScale(end[0])},${yScale(end[1])}`)
            },3000*i);
        }*/
        let vehicle1 = svg.select('.d3-vehicle').select('rect');
        for(let i = 0;i<pathArray.length-1;i++){
            let start = pathArray[i];
            let end = pathArray[i+1];
            setTimeout(function(i){
                vehicle1.attr('x',`${xScale(start[0])-15}`)
                    .attr('y',`${xScale(start[1])-15}`)
                    .transition()
                    .duration(5000)
                    .ease(d3.easeLinear)
                    .attr('x',`${xScale(end[0])-15}`)
                    .attr('y',`${xScale(end[1])-15}`)
            },5000*i);
        }
    }
    render(){
        return(
            <div className="d3Content">
                <ToolBar
                    updatePoint={this.updatePoint.bind(this)}
                    drawStraightLine={this.drawStraightLine.bind(this)}
                    drawBothWayLine={this.drawBothWayLine.bind(this)}
                    drawCurveLine={this.drawCurveLine.bind(this)}
                    drawBothWayCurve={this.drawBothWayCurve.bind(this)}
                    addVehicle={this.addVehicle.bind(this)}
                />
                <div className="d3Draw" ref="d3Container">
                    <ContextMenu/>
                </div>
            </div>
        );
    }
}