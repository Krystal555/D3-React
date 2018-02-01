/**
 * Created by zaoyu on 2018/1/31.
 */
import * as d3 from 'd3';

export default {
    //画节点函数
    drawPoint(xScale,yScale,pointArray){
        let svg = d3.select('svg');
        //删除旧节点数据
        svg.select('.d3-point').remove();
        //设置节点的拖拽行为
        let drag = d3.drag()
            .on('start',function(){
                d3.select(this).classed('active',true)
            })
            .on('drag',function(){
                d3.select(this)
                    .attr('cx',(d3.event.x).toFixed(1))
                    .attr('cy',(d3.event.y).toFixed(1))
                /*在节点被拖动后，不仅要修改节点的cx和cy属性，
                  还要修改pointArray里对应节点的坐标，
                  这个坐标相对的是仓库坐标不是地图坐标
                 */
                let id = this.getAttribute('id');
                pointArray.forEach(function(point){
                   if(point[0] == id){
                       point[1][0] = ((d3.event.x)/10).toFixed(1);
                       point[1][1] = ((d3.event.y)/10).toFixed(1);
                   }
                })
            })
            .on('end',function(){
                d3.select(this).classed('active',false)
            });
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
                return xScale(d[1][0]);
            })
            .attr('cy', function(d) {
                return yScale(d[1][1]);
            })
            .attr('r',8)
            //.attr('cursor','pointer')//鼠标设置成手指形状
            .call(drag);

        //为节点添加右键点击事件
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