/**
 * Created by zaoyu on 2018/1/24.
 */
import React from 'react';
import {Layout} from 'antd';
const {Header, Content, Footer} = Layout;

import Nav from '../../components/nav/index';
import D3Container from '../../components/graph/d3Container';

import './style.less';

export default class App extends React.Component{

    render(){
        return(
            <Layout className="container">
                <Header className="header">Hello World</Header>
                <Content className="content">
                    <div className="sider"><Nav/></div>
                    <Content className="d3Container"><D3Container/></Content>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2016 Created by Ant UED
                </Footer>
            </Layout>
        );
    }
}