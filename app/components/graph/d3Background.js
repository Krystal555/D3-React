/**
 * Created by zaoyu on 2018/1/24.
 */
import React from 'react';
import * as d3 from 'd3';

export default class D3Background extends React.Component{
    constructor(){
        super();
    }

    componentDidMount(){

    }

    render(){
        return(
            <div className="d3-container" ref="d3Container"/>
        );
    }
}