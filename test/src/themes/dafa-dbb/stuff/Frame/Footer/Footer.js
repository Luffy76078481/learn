/**
 * Created by xm on 2017/7/27.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Footer.scss'

class Footer extends Component {
    constructor(props) {
        super(props);
        this.userCount = this.num1();
    }

    num1(){
        var num1 =  ("260" + Math.floor(Math.random()*889 + 103));
        return num1;
    }
    render() {
        const config = window.config;
        const appName = config.appName;
        return (
            <div className="FootPage">
                <article id="footer" className="BGcolor-main">
                    <div className="container">
                        <div className="row footer-help-share wow fadeInUp"></div>
                        <div id="foot-Cagayan" className="row wow fadeInUp color-second">
                            <div className="Cagayan">
                                <a href="/help.html" className="copyColor2 f12 color-third"
                                    target="_blank">关于{appName}</a> |
                                <a href="/help.html#deposit" className="copyColor2 f12 color-third" target="_blank">开户与存提款</a>
                                |
                                <a href="/agent.html" className="copyColor2 f12 color-third" target="_blank">合作经营条款与规则</a>
                                |
                                <a href="/help.html#yibanrule" className="copyColor2 f12 color-third" target="_blank">优惠活动规则</a> |
                                <a href="/help.html#responsibility" className="copyColor2 f12 color-third"
                                    target="_blank">博彩责任</a> |
                                <a href="/agent.html" className="copyColor2 f12 color-third"
                                    target="_blank">代理中心</a>
                                <p className="lh25 color-third">本网站属于菲律宾政府授权和监管所有版权归{appName}所有，违者必究。</p>
                                <p className="c_right lh25 color-third">
                                ©2004-2018 {appName}. All rights reserved &nbsp;&nbsp;当前注册人数：<span id="reg_count">{this.userCount}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
                <article id="platform-inco">
                    <div className="container">
                        <div className="row">
                            <img className="footer_bottom_img"/>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        message:state.message
    }
);

export default connect(mapStateToProps, {

})(Footer)