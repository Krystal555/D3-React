/**
 * Created by zaoyu on 2018/1/30.
 */
import React from 'react';
import {List} from 'antd';

const data = [
    '查看信息',
    '编辑',
    '删除'
];

export default class ContextMenu extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="c-contextmenu">

               {/* <List
                    size="small"
                    bordered
                    dataSource={data}
                    renderItem={item =>(<List.Item>{item}</List.Item>)}
                />*/}
            </div>
        );
    }
}