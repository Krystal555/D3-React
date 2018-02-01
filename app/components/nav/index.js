/**
 * Created by zaoyu on 2018/1/26.
 */
import React from 'react';
import {Button, Icon, Menu} from 'antd';
const SubMenu = Menu.SubMenu;

import './nav.less';

export default class Nav extends React.Component{
    constructor(){
        super();
        this.state = {
            collapsed:false
        };
        this.toggleCollapsed = this.toggleCollapsed.bind(this);
    }
    toggleCollapsed(){
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render(){
        return(
            <div className="c-nav">
                <Button type="primary" onClick={this.toggleCollapsed}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="1">
                        <Icon type="home"/>
                        <span>系统首页</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="table"/>
                        <span>仓库管理</span>
                    </Menu.Item>
                    <SubMenu key="3" title={<span><Icon type="car"/><span>车辆管理</span></span>}>
                        <Menu.Item key="3-1"><Icon type="table" />车辆信息</Menu.Item>
                        <Menu.Item key="3-2"><Icon type="bulb"/>车辆充放电信息</Menu.Item>
                        <Menu.Item key="3-3"><Icon type="exception"/>车辆异常信息</Menu.Item>
                    </SubMenu>
                    <SubMenu key="4" title={<span><Icon type="barcode" /><span>订单管理</span></span>}>
                        <Menu.Item key="4-1"><Icon type="switcher"/>订单信息</Menu.Item>
                        <Menu.Item key="4-4"><Icon type="layout"/>任务信息</Menu.Item>
                    </SubMenu>
                    <SubMenu key="5" title={<span><Icon type="team" /><span>用户管理</span></span>}>
                        <Menu.Item key="5-1"><Icon type="solution"/>用户权限</Menu.Item>
                        <Menu.Item key="5-2"><Icon type="idcard"/>用户信息</Menu.Item>
                    </SubMenu>
                    <SubMenu key="6" title={<span><Icon type="setting" /><span>系统设置</span></span>}>
                        <Menu.Item key="6-1"><Icon type="tool"/>系统设置</Menu.Item>
                        <Menu.Item key="6-2"><Icon type="exclamation-circle-o"/>警告设置</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}