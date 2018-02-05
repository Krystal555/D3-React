/**
 * Created by zaoyu on 2018/1/31.
 */
import * as d3 from 'd3';

export default{
    //画单向直线路径函数
    drawStraightPath(xScale,yScale,lineArray){
        let svg = d3.select('svg');
        let d3Line = svg.select('.d3-line');
        //删除旧路径数据
        svg.select('.d3-straightLine').remove();
        let d3StraightLine = d3Line.append('g')
            .attr('class','d3-straightLine');
        //设置直线路径的拖拽行为
        /*let drag = d3.drag()
            .on('start',function(){
                d3.select(this).classed('active',true)
            })
            .on('drag',function(){
                let initialX1 = this.getAttribute('x1');
                let initialY1 = this.getAttribute('y1');
                let initialX2 = this.getAttribute('x2');
                let initialY2 = this.getAttribute('y2');
                d3.select(this)
                    .attr('x1',(+initialX1 + d3.event.dx).toFixed(1))
                    .attr('y1',(+initialY1 + d3.event.dy).toFixed(1))
                    .attr('x2',(+initialX2 + d3.event.dx).toFixed(1))
                    .attr('y2',(+initialY2 + d3.event.dy).toFixed(1));
                //在路径被拖动后,不仅要修改路径的x1y1x2y2属性,还要修改lineArray里对应路径的x1y1x2y2坐标,这个坐标相对的是仓库地理坐标不是地图坐标
                let id = this.getAttribute('id');
                lineArray.forEach(function(line){
                    if(line[0] == id){
                        line[1][0][0]= (+initialX1 + d3.event.dx).toFixed(1);
                        line[1][0][1] = (+initialY1 + d3.event.dy).toFixed(1);
                        line[1][1][0] = (+initialX2 + d3.event.dx).toFixed(1);
                        line[1][1][1] = (+initialY2 + d3.event.dy).toFixed(1);
                    }
                })
            })
            .on('end',function(){
                d3.select(this).classed('active',false)
            });*/

        //定义箭头标识
        let arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
        let arrowMarker = d3StraightLine.append("marker")
            .attr("id","arrow-end")
            .attr("markerUnits","strokeWidth")
            .attr("markerWidth","12" )
            .attr("markerHeight","12")
            .attr("viewBox","0 0 12 12")
            .attr("refX","6")
            .attr("refY","6")
            .attr("orient",'auto')
            .append("path")
            .attr("d",arrow_path)
            .attr("fill","red");

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
        //.call(drag);

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

        //定义箭头标识
        //let arrow_startPath = "M10,2 L2,6 L10,10 L6,6 L10,2";
        let arrow_startPath = "M10,2 L2,6 L10,10";
        let arrow_rightPath = "M2,2 L10,6 L2,10 L6,6 L2,2";
        let defs = d3BothWayLine.append('defs');
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
            .attr("d",arrow_rightPath)
            .attr("fill","red");

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

        //画双向直线路径（输入BothWayLineArray来画,根据两点x1,x2,y1,y2画标线）
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
    drawCurvePath(svg,xScale,yScale,point1,point2){
        //定义起始点和终止点
        let X1 = xScale(point1[0]<point2[0]?point1[0]+0.5:point1[0]);
        let Y1 = yScale(point1[1]<point2[1]?point1[1]+0.4:point1[1]);
        let X2 = xScale(point1[0]<point2[0]?point2[0]-1:point2[0]+1);
        let Y2 = yScale(point1[0]<point2[0]?point2[1]+0.4:point2[1]+0.5);
        //定义贝塞尔控制点
        let cX = xScale(point1[0]<point2[0]? point1[0]+(point2[0]-point1[0])/2:point2[0]+(point1[0]-point2[0])/2);
        let cY = yScale(point1[1]<point2[1]? point1[1]+(point2[1]-point1[1])/2+4:point2[1]+(point1[1]-point2[1])/2+4);
        console.log(cX,cY);

        let g = svg.append('g')
            .attr('class','d3-curveLine');
        //定义箭头标识
        let arrowMarker = g.append("marker")
            .attr("id","arrow")
            .attr("markerUnits","strokeWidth")
            .attr("markerWidth","12")
            .attr("markerHeight","12")
            .attr("viewBox","0 0 12 12")
            .attr("refX","6")
            .attr("refY","6")
            .attr("orient","auto");

        let arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
        arrowMarker.append("path")
            .attr("d",arrow_path)
            .attr("fill","red");

        g.append('path')
            .attr("stroke","purple")
            .attr("stroke-width",2)
            .attr('fill','none')
            //.attr('d','M100,100 Q190,20 270,100 T450 100');
            .attr('d',`M${X1} ${Y1} Q ${cX} ${cY} ${X2} ${Y2}`)
            .attr("marker-end","url(#arrow)")
    }

}