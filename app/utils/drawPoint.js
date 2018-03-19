/**
 * Created by zaoyu on 2018/1/31.
 */
import * as d3 from 'd3';

import dragPoint from './dragPoint';
let drag = dragPoint.dragPoint;

import haltPoint from '../Images/halt-point.jpg';
import chargePoint from '../Images/charge-point.jpg';

export default {
    //画节点函数
    drawPoint(xScale,yScale,xRatio,yRatio,pointArray,lineArray,curveArray,bothWayCurveArray){
        let svg = d3.select('svg');
        //删除旧节点数据
        svg.select('.d3-point').remove();
        svg.select('.d3-imgPoint').remove();
        let imgPoint = svg.append('defs')
                        .attr('class','d3-imgPoint');
        //设置散点坐标
        svg.append('g')
            .attr('class','d3-point')
            .selectAll("circle")
            .data(pointArray)
            .enter()
            .append('circle')
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
            .attr('fill',function(d,i){
                /*imgPoint.append('pattern')
                    .attr('id',`${d[2]}${i+1}`)
                    .attr('height',16)
                    .attr('width',16)
                    .attr("patternUnits", "objectBoundingBox")
                    .append('image')
                    .attr('x',0)
                    .attr('y',0)
                    .attr('height',16)
                    .attr('width',16)
                    .attr('xlink:href',function(){
                        if(d[2]==='haltPoint'){
                            return haltPoint
                        }else if(d[2]==='chargePoint'){
                            return chargePoint
                        }
                    });
                return `url(#${d[2]}${i+1})`*/
                if(d[2]==='haltPoint'){
                    return 'blue';
                }else if(d[2]==='chargePoint'){
                    return 'green';
                }else if(d[2]==='parkPoint'){
                    return 'purple';
                }else if(d[2]==='unloadPoint'){
                    return 'gray';
                }
            })
            .call(drag(xRatio,yRatio,pointArray,lineArray,curveArray,bothWayCurveArray))

        //为节点添加右键编辑事件，待开发
        let circles = svg.selectAll('circle');
        let circlesList = circles._groups[0];
        circlesList.forEach(function(point){
            point.addEventListener('contextmenu',(d)=>{
                event.preventDefault();
                event.stopPropagation();
                let contextMenu = document.getElementsByClassName('c-contextMenu');
                let pointCx = point.getAttribute('cx');
                let pointCy = point.getAttribute('cy');
                contextMenu[0].style.display = 'inline-block';
                contextMenu[0].style.left = `${+pointCx+5}px`;
                contextMenu[0].style.top = `${+pointCy+5}px`;
            });
        });
        //当鼠标左键点击，右键事件消失
        document.onclick = function(event){
            let contextMenu = document.getElementsByClassName('c-contextMenu');
            contextMenu[0].style.display = 'none';
        }
    }
}