/*
*
* 【该JS有根据url的Base64位串码自动登录功能】
*【该JS有url的channel分享码功能 ---该分享码主要用在注册的时候】
*
*
* */
import React, { Component } from 'react';
import {Link,browserHistory} from 'react-router';
import { connect } from 'react-redux'
import * as cache from "CacheHelper";
import { Modal} from 'antd-mobile';
import "./FirstPage.scss";
import {wapLogin} from 'globalAction';

class FirstPage extends Component{
    constructor(props) {
        super(props);
    }
    componentWillMount () {
        window.wapHistoryType.push('/gameFrame/games')
    }
    render(){
        return(<div></div>)
    }

}
const mapStateToProps = (state, ownProps) => (
    {}
);

export default connect(mapStateToProps,{})(FirstPage)