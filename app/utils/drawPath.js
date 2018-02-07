/**
 * Created by zaoyu on 2018/1/31.
 */
import * as d3 from 'd3';

import dragPoint from './dragControlPoint';
let dragControlPoint = dragPoint.dragControlPoint;

/*import dragPoint from './dragPoint';
let drag = dragPoint.dragPoint;*/

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
        //输入的是以仓库为标准的尺寸（小尺寸）
        lineArray.forEach(function(line){
            let x1 = line[1][0][0];
            let y1 = line[1][0][1];
            let x2 = line[1][1][0];
            let y2 = line[1][1][1];
            let dx1,dy1,dx2,dy2,value,angle,drawX1,drawY1,drawX2,drawY2,r1=0.8,r2=1.4;
            if(x2===x1 && y2<y1){
                dx1 = 0; dy1 = -r1;
                dx2 = 0; dy2 = -r2;
            }else if(x2===x1 && y2>y1){
                dx1 = 0; dy1 = r1;
                dx2 = 0; dy2 = r2;
            }else if(y2===y1 && x2>x1){
                dx1 = r1; dy1 = 0;
                dx2 = r2; dy2 = 0;
            }else if(y2===y1 && x2<x1){
                dx1 = -r1; dy1 = 0;
                dx2 = -r2; dy2 = 0;
            }else{
                value = (y2-y1)/(x2-x1);
                angle = Math.atan(value);
                if((y2-y1<0 && x2-x1>0)||(y2-y1>0 && x2-x1>0)){
                    dx1 = r1*Math.cos(angle);
                    dy1 = r1*Math.sin(angle);
                    dx2 = r2*Math.cos(angle);
                    dy2 = r2*Math.sin(angle);
                }else{
                    dx1 = r1*Math.cos(angle+Math.PI);
                    dy1 = r1*Math.sin(angle+Math.PI);
                    dx2 = r2*Math.cos(angle+Math.PI);
                    dy2 = r2*Math.sin(angle+Math.PI);
                }
            }
            drawX1 = (x1+dx1);
            drawY1 = (y1+dy1);
            drawX2 = (x2-dx2);
            drawY2 = (y2-dy2);
            line[4] = [[drawX1,drawY1],[drawX2,drawY2]];
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
                return xScale(d[4][0][0])
            })
            .attr("y1",function(d){
                return yScale(d[4][0][1])
            })
            .attr("x2",function(d){
                return xScale(d[4][1][0])
            })
            .attr("y2",function(d){
                return yScale(d[4][1][1])
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
    drawBothWayPath(xScale,yScale,BothWayLineArray){
        let svg = d3.select('svg');
        let d3Line = svg.select('.d3-line');
        //删除旧路径数据
        svg.select('.d3-BothWayLine').remove();
        let d3BothWayLine = d3Line.append('g')
            .attr('class','d3-BothWayLine');

        //算出直线两点的方向向量，起始点都分别加上(减去)节点半径所占的x,y
        //输入的是以仓库为标准的尺寸（小尺寸）
        BothWayLineArray.forEach(function(line){
            let x1 = line[1][0][0];
            let y1 = line[1][0][1];
            let x2 = line[1][1][0];
            let y2 = line[1][1][1];
            let dx1,dy1,dx2,dy2,value,angle,drawX1,drawY1,drawX2,drawY2,r1=1.4,r2=1.4;
            if(x2===x1 && y2<y1){
                dx1 = 0; dy1 = -r1;
                dx2 = 0; dy2 = -r2;
            }else if(x2===x1 && y2>y1){
                dx1 = 0; dy1 = r1;
                dx2 = 0; dy2 = r2;
            }else if(y2===y1 && x2>x1){
                dx1 = r1; dy1 = 0;
                dx2 = r2; dy2 = 0;
            }else if(y2===y1 && x2<x1){
                dx1 = -r1; dy1 = 0;
                dx2 = -r2; dy2 = 0;
            }else{
                value = (y2-y1)/(x2-x1);
                angle = Math.atan(value);
                if((y2-y1<0 && x2-x1>0)||(y2-y1>0 && x2-x1>0)){
                    dx1 = r1*Math.cos(angle);
                    dy1 = r1*Math.sin(angle);
                    dx2 = r2*Math.cos(angle);
                    dy2 = r2*Math.sin(angle);
                }else{
                    dx1 = r1*Math.cos(angle+Math.PI);
                    dy1 = r1*Math.sin(angle+Math.PI);
                    dx2 = r2*Math.cos(angle+Math.PI);
                    dy2 = r2*Math.sin(angle+Math.PI);
                }
            }
            drawX1 = (x1+dx1);
            drawY1 = (y1+dy1);
            drawX2 = (x2-dx2);
            drawY2 = (y2-dy2);
            line[4] = [[drawX1,drawY1],[drawX2,drawY2]];
        });

        //画双向直线路径（输入BothWayLineArray,根据两点x1,x2,y1,y2画标线）
        d3BothWayLine.selectAll("line")
            .data(BothWayLineArray)
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
                return xScale(d[4][0][0])
            })
            .attr("y1",function(d){
                return yScale(d[4][0][1])
            })
            .attr("x2",function(d){
                return xScale(d[4][1][0])
            })
            .attr("y2",function(d){
                return yScale(d[4][1][1])
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

    //画贝塞尔曲线路径函数
    drawCurvePath(xScale,yScale,xRatio,yRatio,curveArray){
        let svg = d3.select('svg');
        let d3Line = svg.select('.d3-line');
        //删除旧路径数据
        //svg.select('.d3-curveLine').remove();
        let d3CurveLine = d3Line.append('g')
            .attr('class','d3-curveLine');

        curveArray.forEach(function(line){
            let x1 = line[1][0][0];
            let y1 = line[1][0][1];
            let x2 = line[1][1][0];
            let y2 = line[1][1][1];
            let cX = 250/xRatio;
            let cY = 550/yRatio;
            line[1][2] = [cX,cY];

            let dx = [],dy=[],drawX = [],drawY = [],r1=0.8,r2=0.8;
            if(cX===x1 && cY<y1){
                dx[0] = 0; dy[0] = -r1;
                dx[1] = 0; dy[1] = -r2;
            }else if(cX===x1 && cY>y1){
                dx[0] = 0; dy[0] = r1;
                dx[1] = 0; dy[1] = r2;
            }else if(cY===y1 && cX>x1){
                dx[0] = r1; dy[0] = 0;
                dx[1] = r2; dy[1] = 0;
            }else if(cY===y1 && cX<x1){
                dx[0] = -r1; dy[0] = 0;
                dx[1] = -r2; dy[1] = 0;
            }else{
                let value = (cY-y1)/(cX-x1);
                let angle = Math.atan(value);
                if((cY-y1<0 && cX-x1>0)||(cY-y1>0 && cX-x1>0)){
                    dx[0] = r1*Math.cos(angle);
                    dy[0] = r1*Math.sin(angle);
                    dx[1] = r2*Math.cos(angle);
                    dy[1] = r2*Math.sin(angle);
                }else{
                    dx[0] = r1*Math.cos(angle+Math.PI);
                    dy[0] = r1*Math.sin(angle+Math.PI);
                    dx[1] = r2*Math.cos(angle+Math.PI);
                    dy[1] = r2*Math.sin(angle+Math.PI);
                }
            }

            if(cX===x2 && cY<y2){
                dx[2] = 0; dy[2] = -r1;
                dx[3] = 0; dy[4] = -r2;
            }else if(cX===x2 && cY>y2){
                dx[2] = 0; dy[2] = r1;
                dx[3] = 0; dy[3] = r2;
            }else if(cY===y2 && cX>x2){
                dx[2] = r1; dy[2] = 0;
                dx[3] = r2; dy[3] = 0;
            }else if(cY===y2 && cX<x2){
                dx[2] = -r1; dy[2] = 0;
                dx[3] = -r2; dy[3] = 0;
            }else{
                let value = (cY-y2)/(cX-x2);
                let angle = Math.atan(value);
                if((cY-y2<0 && cX-x2>0)||(cY-y2>0 && cX-x2>0)){
                    dx[2] = r1*Math.cos(angle);
                    dy[2] = r1*Math.sin(angle);
                    dx[3] = r2*Math.cos(angle);
                    dy[3] = r2*Math.sin(angle);
                }else{
                    dx[2] = r1*Math.cos(angle+Math.PI);
                    dy[2] = r1*Math.sin(angle+Math.PI);
                    dx[3] = r2*Math.cos(angle+Math.PI);
                    dy[3] = r2*Math.sin(angle+Math.PI);
                }
            }
            drawX = [x1+dx[0],cX-dx[1],x2+dx[2],cX-dx[3]];
            drawY = [y1+dy[0],cY-dy[1],y2+dy[2],cY-dy[3]];
           line[4] = [[drawX[0],drawY[0]],[drawX[1],drawY[1]],[drawX[2],drawY[2]],[drawX[3],drawY[3]]];
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
                return xScale(d[1][2][1]).toFixed(2)
            })
            .attr("initialY1",function(d){
                return yScale(d[1][0][1]).toFixed(2)
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
                 let startX = xScale(d[4][0][0]);
                 let startY = yScale(d[4][0][1]);
                 let endX = xScale(d[4][2][0]);
                 let endY = yScale(d[4][2][1]);
                 let controlX = xScale(d[1][2][0]);
                 let controlY = yScale(d[1][2][1]);
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
                return xScale(d[4][0][0])
            })
            .attr("y1",function(d){
                return yScale(d[4][0][1])
            })
            .attr("x2",function(d){
                return xScale(d[4][1][0])
            })
            .attr("y2",function(d){
                return yScale(d[4][1][1])
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
                return xScale(d[4][2][0])
            })
            .attr("y1",function(d){
                return yScale(d[4][2][1])
            })
            .attr("x2",function(d){
                return xScale(d[4][3][0])
            })
            .attr("y2",function(d){
                return yScale(d[4][1][1])
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
            .attr('fill','#fff')
            .attr('stroke-dasharray','3,1')
            .attr('cx', function(d) {
                return xScale(d[1][2][0]).toFixed(2)
            })
            .attr('cy', function(d) {
                return yScale(d[1][2][1]).toFixed(2)
            })
            .attr('r',8)
            .call(dragControlPoint())
    }

}