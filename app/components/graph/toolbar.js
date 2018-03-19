/**
 * Created by zaoyu on 2018/1/28.
 */
import React from 'react';
import {Button} from 'antd';

const ButtonGroup = Button.Group;

export default class ToolBar extends React.Component{
    constructor(){
        super();
    }

    pointClick(index){
        this.props.updatePoint(index);
    }
    drawStraightLine(){
        this.props.drawStraightLine();
    }
    drawBothWayLine(){
        this.props.drawBothWayLine();
    }
    drawCurveLine(){
        this.props.drawCurveLine();
    }
    drawBothWayCurve(){
        this.props.drawBothWayCurve();
    }
    addVehicle(){
        this.props.addVehicle();
    }
    render(){
        return(
            <div>
                <ButtonGroup>
                    <Button onClick={this.pointClick.bind(this,1)}>普通点</Button>
                    <Button onClick={this.pointClick.bind(this,2)}>货位点</Button>
                    <Button onClick={this.pointClick.bind(this,3)}>充电点</Button>
                    <Button onClick={this.pointClick.bind(this,4)}>停靠点</Button>
                    <Button onClick={this.pointClick.bind(this,5)}>分岔点</Button>
                    <Button onClick={this.pointClick.bind(this,6)}>悬挂点</Button>
                    <Button onClick={this.pointClick.bind(this,7)}>装货点</Button>
                    <Button onClick={this.pointClick.bind(this,8)}>卸货点</Button>
                    <Button onClick={this.pointClick.bind(this,9)}>出口点</Button>
                    <Button onClick={this.pointClick.bind(this,10)}>入口点</Button>
                    <Button onClick={this.pointClick.bind(this,11)}>电梯点</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button onClick={this.drawStraightLine.bind(this)}>单向直线</Button>
                    <Button onClick={this.drawBothWayLine.bind(this)}>双向直线</Button>
                    <Button onClick={this.drawCurveLine.bind(this)}>单向曲线</Button>
                    <Button onClick={this.drawBothWayCurve.bind(this)}>双向曲线</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button onClick={this.addVehicle.bind(this)}>添加小车</Button>
                </ButtonGroup>
            </div>
        );
    }
}