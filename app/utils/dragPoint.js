/**
 * 拖拽节点函数，节点移动时与之相连的入度路径也移动
 */
import * as d3 from 'd3';

import drawLine from './drawSinglePath';
const drawSinglePath = drawLine.drawSingleLine;

export default {
    dragPoint(pointArray,lineArray){
        //设置节点的拖拽行为，节点移动时所有入度的线也跟着一起移动
        return d3.drag()
            .on('start',function(){
                d3.select(this).classed('active',true)
                    .attr('initialCx',this.getAttribute('cx'))//获得拖动前的圆心坐标，好去匹配与之相连的路径
                    .attr('initialCy',this.getAttribute('cy'));
            })
            .on('drag',function(){
                d3.select(this)
                    .attr('cx',(d3.event.x).toFixed(2))
                    .attr('cy',(d3.event.y).toFixed(2));

                let initialCx = this.getAttribute('initialCx');//获得圆心的初始x坐标
                let initialCy = this.getAttribute('initialCy');//获得圆心的初始y坐标
                d3.select(".d3-straightLine").selectAll("line")
                    .each(function(line){
                        //如果路径的终点圆心坐标（initialX2，initialY2）等于圆心初始坐标，那就得跟着该圆一起动
                        if(+d3.select(this).attr('initialX2')===+initialCx && +d3.select(this).attr('initialY2')===+initialCy) {
                            let x1 = d3.select(this).attr('initialX1');//路径的起始圆心坐标不变initialX1，initialY1
                            let y1 = d3.select(this).attr('initialY1');
                            d3.select(this)
                                .attr('x1', (drawSinglePath(+x1,+y1,d3.event.x,d3.event.y).x1))//获得路径的圆边坐标
                                .attr('y1', (drawSinglePath(+x1,+y1,d3.event.x,d3.event.y).y1))
                                .attr('x2', (drawSinglePath(+x1,+y1,d3.event.x,d3.event.y).x2))
                                .attr('y2', (drawSinglePath(+x1,+y1,d3.event.x,d3.event.y).y2))
                        }
                    })
            })
            .on('end',function(){
                d3.select(this).classed('active',false);
                let initialCx = this.getAttribute('initialCx');//获得圆心移动前初始x坐标
                let initialCy = this.getAttribute('initialCy');//获得圆心移动前初始y坐标
                d3.select(this)
                    .attr('initialCx',(d3.event.x).toFixed(2))//改变圆心移动结束后的坐标
                    .attr('initialCy',(d3.event.y).toFixed(2));
                d3.select(".d3-straightLine").selectAll("line")
                    .each(function(line){
                        //如果路径的终点圆心坐标(initialX2,initialY2）等于圆心初始坐标(initialCx,initialCy)，那么这条路径的initialX2,initialY2也得改变
                        if(+d3.select(this).attr('initialX2')===+initialCx && +d3.select(this).attr('initialY2')===+initialCy) {
                            d3.select(this)
                                .attr("initialX2",(d3.event.x).toFixed(2))//修改路径的终点圆心坐标initialX2，initialY2
                                .attr("initialY2",(d3.event.y).toFixed(2));
                            //在节点拖动停止后,路径的x1y1x2y2属性不仅要改变,还要改变lineArray里对应路径的x1,y1,x2,y2坐标和initialX2,initialY2坐标,这个坐标是仓库坐标不是地图坐标
                            let lineId = d3.select(this).attr('id');
                            let x1 = d3.select(this).attr('x1');
                            let y1 = d3.select(this).attr('y1');
                            let x2 = d3.select(this).attr('x2');
                            let y2 = d3.select(this).attr('y2');
                            lineArray.forEach(function(line){
                                if(+line[0] === +lineId){
                                    line[1][1] = [(d3.event.x)/10,(d3.event.y)/10];//initial
                                    line[4] = [[x1,y1],[x2,y2]];//x1,y1,x2,y2
                                }
                            })
                        }
                    })

                //在节点被拖动后,节点的cx和cy属性不仅要改变,还要改变pointArray里对应节点的坐标,这个坐标相对的是仓库坐标不是地图坐标
                let pointId = d3.select(this).attr('id');
                pointArray.forEach(function(point){
                    if(+point[0] === +pointId){
                        point[1][0] = (d3.event.x)/10;
                        point[1][1] = (d3.event.y)/10;
                    }
                });
            });
    }
}