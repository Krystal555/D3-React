/**
 * Created by zaoyu on 2018/2/26.
 */
import * as d3 from 'd3';

import dragVehicle from './dragVehicle';
let drag = dragVehicle.dragVehicle;

import magneticVehicle from '../Images/magneticVehicle.jpg';

export default {
    //画小车函数
    drawVehicle(xScale,yScale,xRatio,yRatio,vehicleArray){
        let svg = d3.select('svg');
        //删除旧节点数据
        svg.select('.d3-vehicle').remove();
        svg.select('.d3-imgVehicle').remove();
        let imgVehicle = svg.append('defs')
            .attr('class','d3-imgVehicle');
        //设置散点坐标
        svg.append('g')
            .attr('class','d3-vehicle')
            .selectAll("rect")
            .data(vehicleArray)
            .enter()
            .append('rect')
            .attr('fill','green')
            .attr('id',function(d){
                return d[0];
            })
            .attr('x', function(d) {
                return xScale(d[1][0]).toFixed(2)-15;
            })
            .attr('y', function(d) {
                return yScale(d[1][1]).toFixed(2)-15;
            })
            .attr('width',30)
            .attr('height',30)
            .attr('fill',function(d,i){
                imgVehicle.append('pattern')
                    .attr('id',`${d[2]}-${i+1}`)
                    .attr('height',30)
                    .attr('width',30)
                    .attr("patternUnits", "objectBoundingBox")
                    .append('image')
                    .attr('x',0)
                    .attr('y',0)
                    .attr('height',30)
                    .attr('width',30)
                    .attr('xlink:href',function(){
                        if(d[2]===0){
                            return magneticVehicle
                        }
                    });
                return `url(#${d[2]}-${i+1})`
            })
            //.call(drag(xRatio,yRatio,vehicleArray));


        //为节点添加右键编辑事件，待开发
        /*let circles = svg.selectAll('rect');
        let circlesList = circles._groups[0];
        circlesList.forEach(function(point){
            point.addEventListener('contextmenu',(d)=>{
                event.preventDefault();
                event.stopPropagation();
                alert('右键菜单功能');
            })
        });*/
    }
}