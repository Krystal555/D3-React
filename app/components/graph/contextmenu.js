/**
 * Created by zaoyu on 2018/1/30.
 */
import React from 'react';

export default class ContextMenu extends React.Component{
    constructor(){
        super();
    }
    overItem(index){
        let contextMenuItems = document.getElementsByClassName('contextMenuItem');
        contextMenuItems[index].style.backgroundColor = '#5698f7';
    }
    leaveItem(index){
        let contextMenuItems = document.getElementsByClassName('contextMenuItem');
        contextMenuItems[index].style.backgroundColor = '#f0f0f0';
    }
    selectItem(index){

    }

    render(){
        return(
            <div className="c-contextMenu">
                <ul className="m-contextMenuList">
                    <li className="contextMenuItem" onMouseOver={this.overItem.bind(this,0)} onMouseOut={this.leaveItem.bind(this,0)} onClick={this.selectItem.bind(this,0)}>查看信息</li>
                    <li className="contextMenuItem" onMouseOver={this.overItem.bind(this,1)} onMouseOut={this.leaveItem.bind(this,1)} onClick={this.selectItem.bind(this,1)}>编辑</li>
                    <li className="contextMenuItem" onMouseOver={this.overItem.bind(this,2)} onMouseOut={this.leaveItem.bind(this,2)} onClick={this.selectItem.bind(this,2)}>删除</li>
                </ul>
            </div>
        );
    }
}