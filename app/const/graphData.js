/**
 * Created by zaoyu on 2018/1/30.
 */
//地图信息的Json数据
let graphData = {
    //pointID name type enabled isFree coordinateX coordinateY coordinateZ mapID bundled codeID
    point: [
        /*[{'id': 1}, {'coordinate': [10, 10]}, {'type':'haltPoint'},{'name':'站点-1'}],
        [{'id': 2}, {'coordinate': [50, 50]}, {'type':'haltPoint'},{'name':'站点-2'}],
        [{'id': 3}, {'coordinate': [52, 26]}, {'type':'haltPoint'},{'name':'站点-3'}],
        [{'id': 4}, {'coordinate': [36, 32]}, {'type':'haltPoint'},{'name':'站点-4'}],
        [{'id': 5}, {'coordinate': [20, 20]}, {'type':'haltPoint'},{'name':'站点-5'}],
        [{'id': 6}, {'coordinate': [13, 63]}, {'type':'haltPoint'},{'name':'站点-6'}],
        [{'id': 7}, {'coordinate': [62, 5]}, {'type':'haltPoint'},{'name':'站点-7'}],
        [{'id': 8}, {'coordinate': [33, 66]}, {'type':'haltPoint'},{'name':'站点-8'}],
        [{'id': 9}, {'coordinate': [79, 50]}, {'type':'haltPoint'},{'name':'站点-9'}],
        [{'id': 10}, {'coordinate': [13, 32]}, {'type':'haltPoint'},{'name':'站点-10'}],
        [{'id': 11}, {'coordinate': [12, 5]}, {'type':'haltPoint'},{'name':'站点-11'}],
        [{'id': 12}, {'coordinate': [95, 17]}, {'type':'haltPoint'},{'name':'站点-12'}],
        [{'id': 13}, {'coordinate': [77, 88]}, {'type':'haltPoint'},{'name':'站点-13'}],
        [{'id': 14}, {'coordinate': [12, 100]}, {'type':'haltPoint'},{'name':'站点-14'}],
        [{'id': 15}, {'coordinate': [20, 10]}, {'type':'haltPoint'},{'name':'站点-15'}],
        [{'id': 16}, {'coordinate': [20, 30]}, {'type':'haltPoint'},{'name':'站点-16'}],
        [{'id': 17}, {'coordinate': [40, 20]}, {'type':'chargePoint'},{'name':'站点-17'}],
        [{'id': 18}, {'coordinate': [10, 20]}, {'type':'chargePoint'},{'name':'站点-18'}],
        [{'id': 19}, {'coordinate': [25, 15]}, {'type':'chargePoint'},{'name':'站点-19'}],
        [{'id': 20}, {'coordinate': [10, 30]}, {'type':'chargePoint'},{'name':'站点-20'}],
        [{'id': 21}, {'coordinate': [38, 24]}, {'type':'chargePoint'},{'name':'站点-21'}],
        [{'id': 22}, {'coordinate': [26, 32]}, {'type':'chargePoint'},{'name':'站点-22'}]*/
        [{'id': 1}, {'coordinate': [10, 10]}, {'type':'haltPoint'},{'name':'站点-1'}],
        [{'id': 2}, {'coordinate': [55, 75]}, {'type':'parkPoint'},{'name':'站点-2'}],
        [{'id': 3}, {'coordinate': [52, 26]}, {'type':'haltPoint'},{'name':'站点-3'}],
        [{'id': 4}, {'coordinate': [36, 32]}, {'type':'haltPoint'},{'name':'站点-4'}],
        [{'id': 5}, {'coordinate': [20, 20]}, {'type':'haltPoint'},{'name':'站点-5'}],
        [{'id': 6}, {'coordinate': [20, 45]}, {'type':'chargePoint'},{'name':'站点-6'}],
        [{'id': 7}, {'coordinate': [62, 5]}, {'type':'haltPoint'},{'name':'站点-7'}],
        [{'id': 8}, {'coordinate': [30, 55]}, {'type':'haltPoint'},{'name':'站点-8'}],
        [{'id': 9}, {'coordinate': [70, 70]}, {'type':'unloadPoint'},{'name':'站点-9'}],
        //[{'id': 10}, {'coordinate': [13, 32]}, {'type':'haltPoint'},{'name':'站点-10'}],
        [{'id': 11}, {'coordinate': [12, 5]}, {'type':'haltPoint'},{'name':'站点-11'}],
        [{'id': 12}, {'coordinate': [85, 60]}, {'type':'haltPoint'},{'name':'站点-12'}],
        [{'id': 13}, {'coordinate': [77, 88]}, {'type':'haltPoint'},{'name':'站点-13'}],
        [{'id': 14}, {'coordinate': [40, 65]}, {'type':'haltPoint'},{'name':'站点-14'}],
        [{'id': 15}, {'coordinate': [20, 10]}, {'type':'haltPoint'},{'name':'站点-15'}],
        [{'id': 16}, {'coordinate': [20, 30]}, {'type':'haltPoint'},{'name':'站点-16'}],
        [{'id': 17}, {'coordinate': [95, 55]}, {'type':'chargePoint'},{'name':'站点-17'}],
        [{'id': 18}, {'coordinate': [10, 20]}, {'type':'chargePoint'},{'name':'站点-18'}],
        [{'id': 19}, {'coordinate': [25, 15]}, {'type':'chargePoint'},{'name':'站点-19'}],
        [{'id': 20}, {'coordinate': [10, 30]}, {'type':'chargePoint'},{'name':'站点-20'}],
        [{'id': 21}, {'coordinate': [38, 24]}, {'type':'chargePoint'},{'name':'站点-21'}],
        [{'id': 22}, {'coordinate': [26, 32]}, {'type':'chargePoint'},{'name':'站点-22'}]
    ],
    line: [
        [{'id': 1},{'source':[20,20]},{'end':[36,32]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 2},{'source':[20,45]},{'end':[30,55]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 3},{'source':[30,55]},{'end':[40,65]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 4},{'source':[79,50]},{'end':[50,50]},{'type':'straightLine'},{'direction':'reverse'}],
        [{'id': 5},{'source':[20,20]},{'end':[10,30]},{'type':'straightLine'},{'direction':'forward'}],
        //[{'id': 6},{'source':[20,20]},{'end':[40,20]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 7},{'source':[20,20]},{'end':[10,20]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 8},{'source':[20,20]},{'end':[20,30]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 9},{'source':[20,20]},{'end':[20,10]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 10},{'source':[20,20]},{'end':[10,10]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 11},{'source':[20,20]},{'end':[25,15]},{'type':'straightLine'},{'direction':'forward'}],
        //[{'id': 12},{'source':[20,20]},{'end':[38,24]},{'type':'straightLine'},{'direction':'forward'}],
        //[{'id': 13},{'source':[20,20]},{'end':[26,32]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 14},{'source':[40,65]},{'end':[55,75]},{'type':'straightLine'},{'direction':'bothWay'}],
        //[{'id': 15},{'source':[13,63]},{'end':[33,66]},{'type':'curveLine'},{'direction':'forward'}],
        //[{'id': 16},{'source':[62,5]},{'end':[52,26]},{'type':'curveLine'},{'direction':'forward'}],
        //[{'id': 17},{'source':[40,20]},{'end':[52,26]},{'type':'curveLine'},{'direction':'bothWay'}],
        //[{'id': 18},{'source':[20,20]},{'end':[10,30]},{'type':'curveLine'},{'direction':'forward'}],
        //[{'id': 19},{'source':[20,20]},{'end':[40,20]},{'type':'curveLine'},{'direction':'forward'}],
        //[{'id': 20},{'source':[20,20]},{'end':[10,20]},{'type':'curveLine'},{'direction':'forward'}],
        //[{'id': 21},{'source':[20,20]},{'end':[20,30]},{'type':'curveLine'},{'direction':'forward'}],
        //[{'id': 22},{'source':[20,20]},{'end':[20,10]},{'type':'curveLine'},{'direction':'forward'}],
        //[{'id': 23},{'source':[20,20]},{'end':[10,10]},{'type':'curveLine'},{'direction':'forward'}],
        //[{'id': 24},{'source':[20,20]},{'end':[25,15]},{'type':'curveLine'},{'direction':'forward'}],
        [{'id': 25},{'source':[20,20]},{'end':[38,24]},{'type':'curveLine'},{'direction':'forward'}],
        [{'id': 26},{'source':[20,20]},{'end':[26,32]},{'type':'curveLine'},{'direction':'forward'}],
        [{'id': 27},{'source':[62,5]},{'end':[52,26]},{'type':'curveLine'},{'direction':'bothWay'}],
    ],
    //vehicleID serialNo vehicleName macAddress NavType maxSpeed maxLoad enabled createTime warehouseID curPointID lastPointID status loadState direction battery speed operatorID
    vehicle:[
        [{id:1},{'coordinate':[77,88]},{navType:0}]
    ]
};
export default{
    getPointArray(){
        let pointArray = [];
        let point = [];
        graphData.point.forEach(function(node){
            point.push(node[0].id);
            point.push(node[1].coordinate);
            point.push(node[2].type);
            //point.push(node[3].name);
            pointArray.push(point);
            point=[];
        });
        return pointArray;
    },
    getLineArray(){
        let lineArray = [];
        let bothWayLineArray = [];
        let curveArray = [];
        let bothWayCurveArray = [];
        let line = [];
        graphData.line.forEach(function(node){
            if(node[3].type === 'straightLine'){ //直线
                if(node[4].direction === 'forward'){ //正向直线
                    line.push(node[0].id);
                    line.push([node[1].source,node[2].end]);
                    line.push(node[3].type);
                    line.push(node[4].direction);
                    lineArray.push(line);
                    line=[];
                }else if(node[4].direction === 'bothWay'){ //双向直线
                    line.push(node[0].id);
                    line.push([node[1].source,node[2].end]);
                    line.push(node[3].type);
                    line.push(node[4].direction);
                    bothWayLineArray.push(line);
                    line=[];
                }
            }else if(node[3].type === 'curveLine'){ //曲线
                if(node[4].direction === 'forward'){ //正向曲线
                    line.push(node[0].id);
                    line.push([node[1].source,node[2].end]);
                    line.push(node[3].type);
                    line.push(node[4].direction);
                    curveArray.push(line);
                    line=[];
                }else if(node[4].direction === 'bothWay'){ //双向曲线
                    line.push(node[0].id);
                    line.push([node[1].source,node[2].end]);
                    line.push(node[3].type);
                    line.push(node[4].direction);
                    bothWayCurveArray.push(line);
                    line=[];
                }
            }

        });
        return {
            lineArray:lineArray,
            bothWayLineArray:bothWayLineArray,
            curveArray:curveArray,
            bothWayCurveArray:bothWayCurveArray
        }
    },
    getVehicleArray(){
        let VehicleArray = [];
        let vehicle = [];
        graphData.vehicle.forEach(function(node){
            vehicle.push(node[0].id);
            vehicle.push(node[1].coordinate);
            vehicle.push(node[2].navType);
            VehicleArray.push(vehicle);
            vehicle=[];
        });
        return VehicleArray;
    },
}

