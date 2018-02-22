/**
 * 拖拽二次贝塞尔曲线的控制点，与控制点相连的控制线跟着移动，且贝塞尔曲线形状改变
 * 分为单向贝塞尔曲线和双向贝塞尔曲线来分别计算
 */
import * as d3 from 'd3';

import drawLine from './drawSingleLine';
const drawSingleLine = drawLine.drawSingleLine;

export default {
    dragControlPoint(xScale,yScale,xRatio,yRatio,curveArray){
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
                if(curveArray && curveArray[0][2]==='curveLine' && curveArray[0][3]==='forward') {
                    //单向曲线的控制线跟着控制点移动
                    d3.select('.d3-curveLine').selectAll('line')
                        .each(function (line) {
                            //如果路径的终点圆心坐标(initialX2,initialY2)等于圆心初始坐标，那就得跟着该圆一起动
                            if (+d3.select(this).attr('initialX2') === +initialCx && +d3.select(this).attr('initialY2') === +initialCy) {
                                let x1 = d3.select(this).attr('initialX1');//路径的起始圆心坐标不变initialX1，initialY1
                                let y1 = d3.select(this).attr('initialY1');
                                let flag1 = d3.select(this).attr('direction') === 'bothWay';//flag1为true表示这条路径是双向,否则是单向(画图所需)
                                let flag2 = false;//flag2控制线段终点需剪掉的半径长
                                d3.select(this)
                                    .attr('x1', (drawSingleLine(+x1, +y1, d3.event.x, d3.event.y, flag1, flag2).x1))//获得路径的圆边坐标
                                    .attr('y1', (drawSingleLine(+x1, +y1, d3.event.x, d3.event.y, flag1, flag2).y1))
                                    .attr('x2', (drawSingleLine(+x1, +y1, d3.event.x, d3.event.y, flag1, flag2).x2))
                                    .attr('y2', (drawSingleLine(+x1, +y1, d3.event.x, d3.event.y, flag1, flag2).y2))
                                line.push([[d3.select(this).attr('x1'), d3.select(this).attr('y1')], [d3.select(this).attr('x2'), d3.select(this).attr('y2')]]);
                            }
                        });
                    //单向曲线跟着控制点移动
                    d3.select('.d3-curveLine').selectAll('path')
                        .each(function (path) {
                            //如果路径的控制点坐标(controlX,controlY)等于控制点圆心初始坐标，那就得跟着控制点一起动
                            if (+d3.select(this).attr('controlX') === +initialCx && +d3.select(this).attr('controlY') === +initialCy) {
                                path[4][0] = path[5][0];
                                path[4][1] = path[5][1];
                                path[4][2] = path[6][0];
                                path[4][3] = path[6][1];
                                path.pop();
                                path.pop();
                                let startX = path[4][0][0];
                                let startY = path[4][0][1];
                                let endX = drawSingleLine(xScale(path[1][1][0]), yScale(path[1][1][1]), d3.event.x, d3.event.y, true, false).x1;
                                let endY = drawSingleLine(xScale(path[1][1][0]), yScale(path[1][1][1]), d3.event.x, d3.event.y, true, false).y1;
                                let controlX = d3.event.x;
                                let controlY = d3.event.y;
                                d3.select(this)
                                    .attr('d', `M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`)
                            }
                        })
                }else if(curveArray && curveArray[0][2]==='curveLine' && curveArray[0][3]==='bothWay'){
                    //双向曲线的控制线跟着控制点移动
                    d3.select('.d3-bothWayCurve').selectAll('line')
                        .each(function (line) {
                            //如果控制线的终点圆心坐标(initialX2,initialY2)等于圆心初始坐标，那就得跟着该控制点一起动
                            if (+d3.select(this).attr('initialX2') === +initialCx && +d3.select(this).attr('initialY2') === +initialCy) {
                                let x1 = d3.select(this).attr('initialX1');//路径的起始圆心坐标不变initialX1，initialY1
                                let y1 = d3.select(this).attr('initialY1');
                                d3.select(this)
                                    .attr('x1', (drawSingleLine(+x1, +y1, d3.event.x, d3.event.y, false, false).x1))//获得路径的圆边坐标
                                    .attr('y1', (drawSingleLine(+x1, +y1, d3.event.x, d3.event.y, false, false).y1))
                                    .attr('x2', (drawSingleLine(+x1, +y1, d3.event.x, d3.event.y, false, false).x2))
                                    .attr('y2', (drawSingleLine(+x1, +y1, d3.event.x, d3.event.y, false, false).y2))
                                line.push([[d3.select(this).attr('x1'), d3.select(this).attr('y1')], [d3.select(this).attr('x2'), d3.select(this).attr('y2')]]);
                            }
                        });
                    //双向曲线跟着控制点移动
                    d3.select('.d3-bothWayCurve').selectAll('path')
                        .each(function (path) {
                            //如果曲线路径的控制点坐标(controlX,controlY)等于控制点圆心初始坐标，那就得跟着控制点一起动
                            if (+d3.select(this).attr('controlX') === +initialCx && +d3.select(this).attr('controlY') === +initialCy) {
                                path[4][0] = path[5][0];
                                path[4][1] = path[5][1];
                                path[4][2] = path[6][0];
                                path[4][3] = path[6][1];
                                path.pop();
                                path.pop();
                                let startX = drawSingleLine(xScale(path[1][0][0]), yScale(path[1][0][1]), d3.event.x, d3.event.y, true, false).x1;
                                let startY = drawSingleLine(xScale(path[1][0][0]), yScale(path[1][0][1]), d3.event.x, d3.event.y, true, false).y1;
                                let endX = drawSingleLine(xScale(path[1][1][0]), yScale(path[1][1][1]), d3.event.x, d3.event.y, true, false).x1;
                                let endY = drawSingleLine(xScale(path[1][1][0]), yScale(path[1][1][1]), d3.event.x, d3.event.y, true, false).y1;
                                let controlX = d3.event.x;
                                let controlY = d3.event.y;
                                d3.select(this)
                                    .attr('d', `M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`)
                            }
                        })
                }
            })
            .on('end',function(){
                d3.select(this).classed('active',false);
                let initialCx = this.getAttribute('initialCx');//获得控制点圆心移动前初始x坐标
                let initialCy = this.getAttribute('initialCy');//获得控制点圆心移动前初始y坐标
                d3.select(this)
                    .attr('initialCx',(d3.event.x).toFixed(2))//重写控制点圆心移动结束后的x坐标
                    .attr('initialCy',(d3.event.y).toFixed(2));//重写控制点圆心移动结束后的y坐标
                if(curveArray && curveArray[0][2]==='curveLine' && curveArray[0][3]==='forward') {
                    //单向曲线路径
                    d3.select('.d3-curveLine').selectAll('line')
                        .each(function (line) {
                            //如果控制线终点的圆心坐标(initialX2,initialY2)等于控制点圆心初始坐标(initialCx,initialCy)，那么这条路径的initialX2,initialY2需重写
                            if (+d3.select(this).attr('initialX2') === +initialCx && +d3.select(this).attr('initialY2') === +initialCy) {
                                d3.select(this)
                                    .attr("initialX2", (d3.event.x).toFixed(2))//重写控制线的终点圆心坐标initialX2,initialY2
                                    .attr("initialY2", (d3.event.y).toFixed(2));
                            }
                        });
                    d3.select('.d3-curveLine').selectAll('path')
                        .each(function (path) {
                            //如果贝塞尔曲线的控制点坐标(controlX,controlY)等于控制点圆心初始坐标(initialCx,initialCy)，那么曲线的控制点坐标(controlX,controlY)需重写
                            if (+d3.select(this).attr('controlX') === +initialCx && +d3.select(this).attr('controlY') === +initialCy) {
                                d3.select(this)
                                    .attr("controlX", (d3.event.x).toFixed(2))//重写曲线控制点的(controlX,controlY)
                                    .attr("controlY", (d3.event.y).toFixed(2));
                                let curveId = d3.select(this).attr('id');
                                curveArray.forEach(function (curveLine) {
                                    if (+curveLine[0] === +curveId) {
                                        curveLine[1][2] = [d3.event.x / xRatio, d3.event.y / yRatio]
                                    }
                                })
                            }
                        });
                }else if(curveArray && curveArray[0][2]==='curveLine' && curveArray[0][3]==='bothWay') {
                    //双向曲线路径
                    d3.select('.d3-bothWayCurve').selectAll('line')
                        .each(function (line) {
                            //如果控制线终点的圆心坐标(initialX2,initialY2)等于控制点圆心初始坐标(initialCx,initialCy)，那么这条路径的initialX2,initialY2需重写
                            if (+d3.select(this).attr('initialX2') === +initialCx && +d3.select(this).attr('initialY2') === +initialCy) {
                                d3.select(this)
                                    .attr("initialX2", (d3.event.x).toFixed(2))//重写控制线的终点圆心坐标initialX2,initialY2
                                    .attr("initialY2", (d3.event.y).toFixed(2));
                            }
                        });
                    d3.select('.d3-bothWayCurve').selectAll('path')
                        .each(function (path) {
                            //如果贝塞尔曲线的控制点坐标(controlX,controlY)等于控制点圆心初始坐标(initialCx,initialCy)，那么曲线的控制点坐标(controlX,controlY)需重写
                            if (+d3.select(this).attr('controlX') === +initialCx && +d3.select(this).attr('controlY') === +initialCy) {
                                d3.select(this)
                                    .attr("controlX", (d3.event.x).toFixed(2))//重写曲线控制点的(controlX,controlY)
                                    .attr("controlY", (d3.event.y).toFixed(2));
                                let curveId = d3.select(this).attr('id');
                                curveArray.forEach(function (curveLine) {
                                    if (+curveLine[0] === +curveId) {
                                        curveLine[1][2] = [d3.event.x / xRatio, d3.event.y / yRatio]
                                    }
                                })
                            }
                        });
                }
            });
    }
}
