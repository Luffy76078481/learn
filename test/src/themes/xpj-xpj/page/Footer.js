/**
 * Created by xm on 2017/7/27.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./css/Footer.scss";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            online_service_link: "",
        }
    }

    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }

    render() {
         const config = window.config;
        const appName = config.appName;
        const promotionLink = window.configHelper.getPromotionUrl();
        const options =  window.r.props("Footer");
        return (
            <div className="FootPage">
                <article id="footer-nav" className="BGcolor-third">
                    <div className="container">
                        {!options.footerNav?
                        <div className="row">
                            <div className="col-md-5 right client-download wow fadeInUp"></div>
                        </div>:
                        <div className="row">
                             <div className="f-nav">
                                <div className="left">
                                    <ul>
                                        <li><a href="https://www.xpjgroup.com//" target="_blank">新葡京酒店</a>/</li>
                                        <li><a href="/agent.html" target="_blank">代理专区</a>/</li>
                                        <li><a href="#" target="_blank"> 新葡京资讯</a>/</li>
                                        <li><a href="/help.html#contact" target="_blank"> 联系我们</a>/</li>
                                        <li><a href="/help.html" target="_blank"> 帮助中心</a></li>
                                    </ul>
                                </div>
                                <div className="right">
                                    <ul>
                                        <li><a href="http://cdn.silvereagle88.com/generic/setupglx.exe" target="_blank">PT下载</a></li>
                                        <li><a href="https://dl.fortunabase.com/download.php?file_name=MIP_Launch98.exe&amp;ul=en&amp;btag2=689781s" target="_blank">MG下载</a></li>
                                        <li><a href={promotionLink} target="_blank">{appName}下载</a></li>
                                    </ul>
                                </div>
                             </div>
                        </div>}
                    </div>
                </article>


                <article id="footer" className="BGcolor-main">
                    <div className="container">
                        <div className="row footer-help-share wow fadeInUp">
                            <div id="foot_help">
                                <h3 className="color-third"><i className="glyphicon glyphicon-question-sign mr5 "></i>使用帮助 <span>GUIDE</span></h3>
                                <div className="guide-list">
                                    <p>
                                        <a href="/help.html#deposit" target="_blank" className="color-third">如何存款</a>
                                        <a href="/help.html#responsibility" target="_blank" className="color-third">责任条款</a>
                                        <a href="/help.html#rule" target="_blank" className="color-third">游戏帮助</a>
                                    </p>
                                    <p>
                                        <a href="/help.html#myAccount" target="_blank" className="color-third">隐私保护</a>
                                        <a href="/help.html#withdrawal" target="_blank" className="color-third">如何提款</a>
                                        <a href="/help.html#terms" target="_blank" className="color-third">规则与条款</a>
                                    </p>
                                </div>
                            </div>
                            <div id="foot_share" className="fadeInUp">
                                <h3 className="color-third"><i className="glyphicon glyphicon-share-alt mr5"></i>社交分享 <span>SHARE</span></h3>
                                <div className="share-list">
                                    <a href="http://weibo.com/" target="_blank" className="share-weibo color-third" title="微博"></a>
                                    <a href="http://user.qzone.qq.com/" target="_blank" className="share-qzone color-third" title="QQ空间"></a>
                                    <a href="https://www.facebook.com/" target="_blank" className="share-fackbook color-third" title="fackbook"></a>
                                    <a href="https://twitter.com/" target="_blank" className="share-twitter color-third" title="twitter"></a>
                                </div>
                            </div>
                                <div id="foot-mobile-img" className=" footer-mobile-img wow fadeInUp color-second">

                            </div>
                        </div>
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
        message:state.message,
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps, {})(Footer)