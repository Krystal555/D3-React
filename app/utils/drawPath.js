/**
 * Created by zaoyu on 2018/1/31.
 */
import * as d3 from 'd3';
//拖拽贝塞尔曲线控制点函数
import dragPoint from './dragControlPoint';
let dragControlPoint = dragPoint.dragControlPoint;
//计算贝塞尔曲线控制点坐标函数
import calculateControlPoint from './calculateControlPoint';
//计算路径实际起始点(x1,y1,x2,y2)
import drawLine from './drawSingleLine';
const drawSingleLine = drawLine.drawSingleLine;

export default{
    //画路径箭头函数
    drawArrow(){
        let svg = d3.select('svg');
        let d3Line = svg.select('.d3-line');
        let defs = d3Line.append('defs');
        //定义箭头标识
        let arrow_startPath = "M10,2 L2,6 L10,10";
        let arrow_endPath = "M2,2 L10,6 L2,10 L6,6 L2,2";
        defs.append("marker")
            .attr("id","arrow-start")
            .attr("markerUnits","strokeWidth")
            .attr("markerWidth","12" )
            .attr("markerHeight","12")
            .attr("viewBox","0 0 12 12")
            .attr("refX","6")
            .attr("refY","6")
            .attr("orient",'auto')
            .append("path")
            .attr("d",arrow_startPath)
            .attr("fill","#fe6602");
        defs.append("marker")
            .attr("id","arrow-end")
            .attr("markerUnits","strokeWidth")
            .attr("markerWidth","12" )
            .attr("markerHeight","12")
            .attr("viewBox","0 0 12 12")
            .attr("refX","6")
            .attr("refY","6")
            .attr("orient",'auto')
            .append("path")
            .attr("d",arrow_endPath)
            .attr("fill","red");
    },
    //画单向直线路径函数
    drawStraightPath(xScale,yScale,lineArray){
        let svg = d3.select('svg');
        let d3Line = svg.select('.d3-line');
        //删除旧路径数据
        svg.select('.d3-straightLine').remove();
        let d3StraightLine = d3Line.append('g')
            .attr('class','d3-straightLine');

        //算出直线两点的方向向量，起始点都分别加上（减去）半径所占的x,y
        lineArray.forEach(function(line){
            let x1 = line[1][0][0];
            let y1 = line[1][0][1];
            let x2 = line[1][1][0];
            let y2 = line[1][1][1];
            let draw = drawSingleLine(xScale(x1),yScale(y1),xScale(x2),yScale(y2),false,true);
            line[4] = [[draw.x1,draw.y1],[draw.x2,draw.y2]];
        });

        //画直线路径（输入lineArray来画，根据两点x1,x2,y1,y2画标线）
        d3StraightLine.selectAll("line")
            .data(lineArray)
            .enter()
            .append('line')
            .attr("class","straightPath")
            .style("stroke","purple")
            .style("stroke-width",2)
            .style("marker-end","url(#arrow-end)")
            .attr('id',function(d){
                return d[0];
            })
            .attr("type",function(d){
                return d[2]
            })
            .attr("direction",function(d){
                return d[3]
            })
            .attr("x1",function(d){
                return d[4][0][0]
            })
            .attr("y1",function(d){
                return d[4][0][1]
            })
            .attr("x2",function(d){
                return d[4][1][0]
            })
            .attr("y2",function(d){
                return d[4][1][1]
            })
            .attr("initialX1",function(d){
                return xScale(d[1][0][0]).toFixed(2)
            })
            .attr("initialY1",function(d){
                return yScale(d[1][0][1]).toFixed(2)
            })
            .attr("initialX2",function(d){
                return xScale(d[1][1][0]).toFixed(2)
            })
            .attr("initialY2",function(d){
                return yScale(d[1][1][1]).toFixed(2)
            })

        //为路径添加右键编辑事件，待开发
        /*let lines = svg.selectAll('line');
        let lineList = lines._groups[0];
        lineList.forEach(function(line){
            line.addEventListener('contextmenu',(d)=>{
                event.preventDefault();
                event.stopPropagation();
                alert('右键菜单功能');
            })
        });*/
    },

    //画双向直线路径函数
    drawBothWayPath(xScale,yScale,bothWayLineArray){
        let svg = d3.select('svg');
        let d3Line = svg.select('.d3-line');
        //删除旧路径数据
        svg.select('.d3-bothWayLine').remove();
        let d3BothWayLine = d3Line.append('g')
            .attr('class','d3-bothWayLine');

        //算出直线两点的方向向量，起始点都分别加上(减去)节点半径所占的x,y
        bothWayLineArray.forEach(function(line){
            let x1 = line[1][0][0];
            let y1 = line[1][0][1];
            let x2 = line[1][1][0];
            let y2 = line[1][1][1];
            let draw = drawSingleLine(xScale(x1),yScale(y1),xScale(x2),yScale(y2),true,true);
            line[4] = [[draw.x1,draw.y1],[draw.x2,draw.y2]];
        });

        //画双向直线路径（输入bothWayLineArray,根据两点x1,x2,y1,y2画标线）
        d3BothWayLine.selectAll("line")
            .data(bothWayLineArray)
            .enter()
            .append('line')
            .attr("class","bothWayPath")
            .style("stroke","purple")
            .style("stroke-width",2)
            .style("marker-start","url(#arrow-start)")
            .style("marker-end","url(#arrow-end)")
            .attr('id',function(d){
                return d[0];
            })
            .attr("type",function(d){
                return d[2]
            })
            .attr("direction",function(d){
                return d[3]
            })
            .attr("x1",function(d){
                return d[4][0][0]
            })
            .attr("y1",function(d){
                return d[4][0][1]
            })
            .attr("x2",function(d){
                return d[4][1][0]
            })
            .attr("y2",function(d){
                return d[4][1][1]
            })
            .attr("initialX1",function(d){
                return xScale(d[1][0][0]).toFixed(2)
            })
            .attr("initialY1",function(d){
                return yScale(d[1][0][1]).toFixed(2)
            })
            .attr("initialX2",function(d){
                return xScale(d[1][1][0]).toFixed(2)
            })
            .attr("initialY2",function(d){
                return yScale(d[1][1][1]).toFixed(2)
            })
    },

    //单向贝塞尔曲线路径函数
    drawCurvePath(xScale,yScale,xRatio,yRatio,curveArray){
        let svg = d3.select('svg');
        let d3Line = svg.select('.d3-line');
        //删除旧路径数据
        svg.select('.d3-curveLine').remove();
        let d3CurveLine = d3Line.append('g')
            .attr('class','d3-curveLine');
        //计算控制点坐标以及控制线实际坐标
        curveArray.forEach(function(line){
            let x1 = line[1][0][0];
            let y1 = line[1][0][1];
            let x2 = line[1][1][0];
            let y2 = line[1][1][1];
            //如果控制点坐标已经有了则不用重新计算，否则需要重新计算一遍
            if(!line[1][2]){
                let cX = calculateControlPoint(x1,y1,x2,y2)[0];
                let cY = calculateControlPoint(x1,y1,x2,y2)[1];
                line[1][2] = [cX,cY];//加入控制点坐标
            }
            //计算贝塞尔控制线一坐标
            let controlLine1 = drawSingleLine(xScale(x1),yScale(y1),xScale(line[1][2][0]),yScale(line[1][2][1]),false,false);
            //计算贝塞尔控制线二坐标
            let controlLine2 = drawSingleLine(xScale(x2),yScale(y2),xScale(line[1][2][0]),yScale(line[1][2][1]),false,false);
            line[4] = [[controlLine1.x1,controlLine1.y1],[controlLine1.x2,controlLine1.y2],[controlLine2.x1,controlLine2.y1],[controlLine2.x2,controlLine2.y2]];
        });
        //画贝塞尔曲线（起点、控制点、终点）
        d3CurveLine.selectAll('g')
         .data(curveArray)
         .enter()
         .append('g')
         .attr("class","curveGroup")
            .append('path')
            .attr("class","curvePath")
            .attr("stroke","purple")
            .attr("stroke-width",2)
            .attr('fill','none')
            .attr("marker-end","url(#arrow-end)")
             .attr('id',function(d){
             return d[0];
             })
             .attr("type",function(d){
             return d[2]
             })
             .attr("direction",function(d){
             return d[3]
             })
            .attr("controlX",function(d){
                return xScale(d[1][2][0]).toFixed(2)
            })
            .attr("controlY",function(d){
                return yScale(d[1][2][1]).toFixed(2)
            })
            .attr("initialX1",function(d){
                return xScale(d[1][0][0]).toFixed(2)
            })
            .attr("initialY1",function(d){
                return yScale(d[1][0][1]).toFixed(2)
            })
            .attr("initialX2",function(d){
                return xScale(d[1][1][0]).toFixed(2)
            })
            .attr("initialY2",function(d){
                return yScale(d[1][1][1]).toFixed(2)
            })
            .attr("d",function(d){
                 let startX = d[4][0][0];
                 let startY = d[4][0][1];
                 let controlX = xScale(d[1][2][0]);
                 let controlY = yScale(d[1][2][1]);
                 let endX = drawSingleLine(xScale(d[1][1][0]),yScale(d[1][1][1]),xScale(d[1][2][0]),yScale(d[1][2][1]),true,false).x1;
                 let endY = drawSingleLine(xScale(d[1][1][0]),yScale(d[1][1][1]),xScale(d[1][2][0]),yScale(d[1][2][1]),true,false).y1;
             return `M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`;
             });
        //画贝塞尔曲线的控制线一
        d3CurveLine.selectAll('.curveGroup')
            .data(curveArray)
            .append('line')
            .attr('class','curveControl')
            .attr("stroke","#332e31")
            .attr("stroke-width",2)
            .attr('stroke-dasharray','5,1')
            .attr("x1",function(d){
                return d[4][0][0]
            })
            .attr("y1",function(d){
                return d[4][0][1]
            })
            .attr("x2",function(d){
                return d[4][1][0]
            })
            .attr("y2",function(d){
                return d[4][1][1]
            })
            .attr("initialX1",function(d){
                return xScale(d[1][0][0]).toFixed(2)
            })
            .attr("initialY1",function(d){
                return yScale(d[1][0][1]).toFixed(2)
            })
            .attr("initialX2",function(d){
                return xScale(d[1][2][0]).toFixed(2)
            })
            .attr("initialY2",function(d){
                return yScale(d[1][2][1]).toFixed(2)
            });
        //画贝塞尔曲线的控制线二
        d3CurveLine.selectAll('.curveGroup')
            .data(curveArray)
            .append('line')
            .attr('class','curveControl')
            .attr("stroke","#332e31")
            .attr("stroke-width",2)
            .attr('stroke-dasharray','5,1')
            .attr("x1",function(d){
                return d[4][2][0]
            })
            .attr("y1",function(d){
                return d[4][2][1]
            })
            .attr("x2",function(d){
                return d[4][3][0]
            })
            .attr("y2",function(d){
                return d[4][3][1]
            })
            .attr("initialX1",function(d){
                return xScale(d[1][1][0]).toFixed(2)
            })
            .attr("initialY1",function(d){
                return yScale(d[1][1][1]).toFixed(2)
            })
            .attr("initialX2",function(d){
                return xScale(d[1][2][0]).toFixed(2)
            })
            .attr("initialY2",function(d){
                return xScale(d[1][2][1]).toFixed(2)
            });
        //画贝塞尔曲线的控制点
        d3CurveLine.selectAll('.curveGroup')
            .data(curveArray)
            .append('circle')
            .attr('class','controlPoint')
            .attr("stroke","#332e31")
            .attr("stroke-width",2)
            .attr('fill','#7a7778')
            .attr('stroke-dasharray','3,1')
            .attr('cx', function(d) {
                return xScale(d[1][2][0]).toFixed(2)
            })
            .attr('cy', function(d) {
                return yScale(d[1][2][1]).toFixed(2)
            })
            .attr('r',8)
            .call(dragControlPoint(xScale,yScale,xRatio,yRatio,curveArray))
    },

    //双向贝塞尔路径函数
    drawBothWayCurve(xScale,yScale,xRatio,yRatio,bothWayCurveArray){
        let svg = d3.select('svg');
        let d3Line = svg.select('.d3-line');
        //删除旧路径数据
        svg.select('.d3-bothWayCurve').remove();
        let d3CurveLine = d3Line.append('g')
            .attr('class','d3-bothWayCurve');
        //计算控制点坐标以及控制线实际坐标
        bothWayCurveArray.forEach(function(line) {
            //如果控制点坐标已经有了则不用重新计算，否则需要重新计算一遍
            let x1 = line[1][0][0];
            let y1 = line[1][0][1];
            let x2 = line[1][1][0];
            let y2 = line[1][1][1];
            if (!line[1][2]) {
                let cX = calculateControlPoint(x1, y1, x2, y2)[0];
                let cY = calculateControlPoint(x1, y1, x2, y2)[1];
                line[1][2] = [cX, cY];//加入控制点坐标
            }
            //计算贝塞尔控制线一坐标
            let controlLine1 = drawSingleLine(xScale(x1), yScale(y1), xScale(line[1][2][0]), yScale(line[1][2][1]), false, false);
            //计算贝塞尔控制线二坐标
            let controlLine2 = drawSingleLine(xScale(x2), yScale(y2), xScale(line[1][2][0]), yScale(line[1][2][1]), false, false);
            line[4] = [[controlLine1.x1, controlLine1.y1], [controlLine1.x2, controlLine1.y2], [controlLine2.x1, controlLine2.y1], [controlLine2.x2, controlLine2.y2]];
        });
            //画双向贝塞尔曲线（起点、控制点、终点）
            d3CurveLine.selectAll('g')
                .data(bothWayCurveArray)
                .enter()
                .append('g')
                .attr("class","bothWayCurveGroup")
                .append('path')
                .attr("class","bothWayCurve")
                .attr("stroke","purple")
                .attr("stroke-width",2)
                .attr('fill','none')
                .attr("marker-start","url(#arrow-start)")
                .attr("marker-end","url(#arrow-end)")
                .attr('id',function(d){
                    return d[0];
                })
                .attr("type",function(d){
                    return d[2]
                })
                .attr("direction",function(d){
                    return d[3]
                })
                .attr("controlX",function(d){
                    return xScale(d[1][2][0]).toFixed(2)
                })
                .attr("controlY",function(d){
                    return yScale(d[1][2][1]).toFixed(2)
                })
                .attr("initialX1",function(d){
                    return xScale(d[1][0][0]).toFixed(2)
                })
                .attr("initialY1",function(d){
                    return yScale(d[1][0][1]).toFixed(2)
                })
                .attr("initialX2",function(d){
                    return xScale(d[1][1][0]).toFixed(2)
                })
                .attr("initialY2",function(d){
                    return yScale(d[1][1][1]).toFixed(2)
                })
                .attr("d",function(d){
                    let startX = drawSingleLine(xScale(d[1][0][0]),yScale(d[1][0][1]),xScale(d[1][2][0]),yScale(d[1][2][1]),true,false).x1;
                    let startY = drawSingleLine(xScale(d[1][0][0]),yScale(d[1][0][1]),xScale(d[1][2][0]),yScale(d[1][2][1]),true,false).y1;
                    let controlX = xScale(d[1][2][0]);
                    let controlY = yScale(d[1][2][1]);
                    let endX = drawSingleLine(xScale(d[1][1][0]),yScale(d[1][1][1]),xScale(d[1][2][0]),yScale(d[1][2][1]),true,false).x1;
                    let endY = drawSingleLine(xScale(d[1][1][0]),yScale(d[1][1][1]),xScale(d[1][2][0]),yScale(d[1][2][1]),true,false).y1;
                    return `M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`;
                });
            //画双向贝塞尔曲线的控制线一
            d3CurveLine.selectAll('.bothWayCurveGroup')
                .data(bothWayCurveArray)
                .append('line')
                .attr('class','bothWayCurveControl')
                .attr("stroke","#332e31")
                .attr("stroke-width",2)
                .attr('stroke-dasharray','5,1')
                .attr("x1",function(d){
                    return d[4][0][0]
                })
                .attr("y1",function(d){
                    return d[4][0][1]
                })
                .attr("x2",function(d){
                    return d[4][1][0]
                })
                .attr("y2",function(d){
                    return d[4][1][1]
                })
                .attr("initialX1",function(d){
                    return xScale(d[1][0][0]).toFixed(2)
                })
                .attr("initialY1",function(d){
                    return yScale(d[1][0][1]).toFixed(2)
                })
                .attr("initialX2",function(d){
                    return xScale(d[1][2][0]).toFixed(2)
                })
                .attr("initialY2",function(d){
                    return yScale(d[1][2][1]).toFixed(2)
                });
            //画双向贝塞尔曲线的控制线二
            d3CurveLine.selectAll('.bothWayCurveGroup')
                .data(bothWayCurveArray)
                .append('line')
                .attr('class','bothWayCurveControl')
                .attr("stroke","#332e31")
                .attr("stroke-width",2)
                .attr('stroke-dasharray','5,1')
                .attr("x1",function(d){
                    return d[4][2][0]
                })
                .attr("y1",function(d){
                    return d[4][2][1]
                })
                .attr("x2",function(d){
                    return d[4][3][0]
                })
                .attr("y2",function(d){
                    return d[4][3][1]
                })
                .attr("initialX1",function(d){
                    return xScale(d[1][1][0]).toFixed(2)
                })
                .attr("initialY1",function(d){
                    return yScale(d[1][1][1]).toFixed(2)
                })
                .attr("initialX2",function(d){
                    return xScale(d[1][2][0]).toFixed(2)
                })
                .attr("initialY2",function(d){
                    return xScale(d[1][2][1]).toFixed(2)
                });
            //画双向贝塞尔曲线的控制点
            d3CurveLine.selectAll('.bothWayCurveGroup')
                .data(bothWayCurveArray)
                .append('circle')
                .attr('class','controlPoint')
                .attr("stroke","#332e31")
                .attr("stroke-width",2)
                .attr('fill','#7a7778')
                .attr('stroke-dasharray','3,1')
                .attr('cx', function(d) {
                    return xScale(d[1][2][0]).toFixed(2)
                })
                .attr('cy', function(d) {
                    return yScale(d[1][2][1]).toFixed(2)
                })
                .attr('r',8)
                .call(dragControlPoint(xScale,yScale,xRatio,yRatio,bothWayCurveArray))
    }
}