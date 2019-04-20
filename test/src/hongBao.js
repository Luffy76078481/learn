
import React, { Component } from 'react';
import { render } from 'react-dom'
import Content from "./global/otherPages/hongBao/page/Content"
import "./global/otherPages/hongBao/hongBao.scss";
import "./plugin/animate.min.css"; // 红包动画
import 'isomorphic-fetch';
//解决IE下Promise报错 【1.install babel-runtime和babel-plugin-transform-runtime 2.添加在主页之前添加window.Promise = Promise】
window.Promise = Promise;
// ★★★★★


import "./themes/xhtd-xhtd/otherPages/hongBao/hongBao.scss" ;

class HongBaoPage extends Component {
    render() {
        return (
            <div>
                 <Content/>
            </div>
        )
    }
}
render(<HongBaoPage/>, document.getElementById('root'));
