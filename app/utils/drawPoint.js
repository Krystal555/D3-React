/**
 * Created by zaoyu on 2018/1/31.
 */
import * as d3 from 'd3';

import dragPoint from './dragPoint';
let drag = dragPoint.dragPoint;

export default {
    //画节点函数
    drawPoint(xScale,yScale,xRatio,yRatio,pointArray,lineArray,curveArray,bothWayCurveArray){
        let svg = d3.select('svg');
        //删除旧节点数据
        svg.select('.d3-point').remove();
        //设置散点坐标
        svg.append('g')
            .attr('class','d3-point')
            .selectAll("circle")
            .data(pointArray)
            .enter()
            .append("circle")
            .attr('fill','blue')
            .attr('id',function(d){
                return d[0];
            })
            .attr('cx', function(d) {
                return xScale(d[1][0]).toFixed(2);
            })
            .attr('cy', function(d) {
                return yScale(d[1][1]).toFixed(2);
            })
            .attr('r',8)
            .call(drag(xRatio,yRatio,pointArray,lineArray,curveArray,bothWayCurveArray));

        //为节点添加右键编辑事件，待开发
        let circles = svg.selectAll('circle');
        let circlesList = circles._groups[0];
        circlesList.forEach(function(point){
            point.addEventListener('contextmenu',(d)=>{
                event.preventDefault();
                event.stopPropagation();
                alert('右键菜单功能');
            })
        });
    }
}