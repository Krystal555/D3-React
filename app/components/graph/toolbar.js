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

    render(){
        return(
            <div>
                <ButtonGroup>
                    <Button onClick={this.pointClick.bind(this,1)}>普通点</Button>
                    <Button onClick={this.pointClick.bind(this,2)}>货位点</Button>
                    <Button onClick={this.pointClick.bind(this,3)}>充电点</Button>
                    <Button onClick={this.pointClick.bind(this,4)}>停靠点</Button>
                    <Button onClick={this.pointClick.bind(this,5)}>悬挂点</Button>
                    <Button onClick={this.pointClick.bind(this,6)}>装货点</Button>
                    <Button onClick={this.pointClick.bind(this,7)}>卸货点</Button>
                    <Button onClick={this.pointClick.bind(this,8)}>出口点</Button>
                    <Button onClick={this.pointClick.bind(this,9)}>入口点</Button>
                    <Button onClick={this.pointClick.bind(this,10)}>电梯点</Button>
                    <Button onClick={this.pointClick.bind(this,11)}>悬挂点</Button>
                    <Button onClick={this.drawStraightLine.bind(this)}>画直线</Button>
                    <Button onClick={this.pointClick.bind(this,13)}>画弧线</Button>
                </ButtonGroup>
            </div>
        );
    }
}