/**
 * Created by zaoyu on 2018/1/30.
 */
//地图信息的Json数据
let graphData = {
    point: [
        [{'id': 1}, {'coordinate': [10, 10]}],
        [{'id': 2}, {'coordinate': [50, 50]}],
        [{'id': 3}, {'coordinate': [52, 26]}],
        [{'id': 4}, {'coordinate': [36, 32]}],
        [{'id': 5}, {'coordinate': [20, 20]}],
        [{'id': 6}, {'coordinate': [13, 63]}],
        [{'id': 7}, {'coordinate': [62, 5]}],
        [{'id': 8}, {'coordinate': [33, 66]}],
        [{'id': 9}, {'coordinate': [79, 50]}],
        [{'id': 10}, {'coordinate': [13, 32]}],
        [{'id': 11}, {'coordinate': [12, 5]}],
        [{'id': 12}, {'coordinate': [95, 17]}],
        [{'id': 13}, {'coordinate': [77, 88]}],
        [{'id': 14}, {'coordinate': [12, 100]}],
        [{'id': 15}, {'coordinate': [20, 10]}],
        [{'id': 16}, {'coordinate': [20, 30]}],
        [{'id': 17}, {'coordinate': [40, 20]}],
        [{'id': 18}, {'coordinate': [10, 20]}],
        [{'id': 19}, {'coordinate': [25, 15]}],
        [{'id': 20}, {'coordinate': [10, 30]}],
        [{'id': 21}, {'coordinate': [38, 24]}],
        [{'id': 22}, {'coordinate': [26, 32]}]
    ],
    line: [
        [{'id': 1},{'source':[20,20]},{'end':[36,32]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 2},{'source':[36,32]},{'end':[50,50]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 3},{'source':[50,50]},{'end':[79,50]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 4},{'source':[79,50]},{'end':[50,50]},{'type':'straightLine'},{'direction':'reverse'}],
        [{'id': 5},{'source':[20,20]},{'end':[10,30]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 6},{'source':[20,20]},{'end':[40,20]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 7},{'source':[20,20]},{'end':[10,20]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 8},{'source':[20,20]},{'end':[20,30]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 9},{'source':[20,20]},{'end':[20,10]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 10},{'source':[20,20]},{'end':[10,10]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 11},{'source':[20,20]},{'end':[25,15]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 12},{'source':[20,20]},{'end':[38,24]},{'type':'straightLine'},{'direction':'forward'}],
        [{'id': 13},{'source':[20,20]},{'end':[26,32]},{'type':'straightLine'},{'direction':'forward'}],
    ]
};
export default{
    getPointArray(){
        let pointArray = [];
        let point = [];
        graphData.point.forEach(function(node){
            point.push(node[0].id);
            point.push(node[1].coordinate);
            pointArray.push(point);
            point=[];
        });
        return pointArray;
    },
    getLineArray(){
        let lineArray = [];
        let line = [];
        graphData.line.forEach(function(node){
            line.push(node[0].id);
            line.push([node[1].source,node[2].end]);
            line.push(node[3].type);
            line.push(node[4].direction);
            lineArray.push(line);
            line=[];
        });
        return lineArray;
    }
}

