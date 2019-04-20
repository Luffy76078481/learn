/**
 * Created by xm on 2017/7/27.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import QRCode from 'qrcode.react';
import "./Footer.scss";
import logotext_grey from "./images/logotext_grey.png";
import footer_logo_top from './images/footer_logo-top.png';
import footer_logo_down from './images/footer_logo-down.png';
import footer_logo_middle from './images/footer_logo-middle.png';
import app1 from './images/app store-01.png';
import app2 from './images/app store-02.png';
import mobile from './images/mobile.png';
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
        const appName = window.config.appName;
        return (
            <div id="footer">
                <div className="footer-info-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="e-photo-text footer-section e-table-middle">
                                    <div className="e-photo"><img src={logotext_grey} alt="footer logo" />
                                    </div>
                                    <div className="e-text">
                                        <p className="e-text-title">Sun Game 亚洲在线娱乐</p>
                                        <p>Sun Game 乃正式注册的网上博彩公司。</p>
                                        <p className="mt-s">版权为 Sun Game 所有©2018</p>
                                    </div>
                                </div>
                                <div className="row footer-section">
                                    <div className="col-md-6">
                                        <div className="e-photo-text pd-s">
                                            <div className="e-photo"><i className="fa fa-phone"></i></div>
                                            <div className="e-text">
                                                <a className="e-text-title">{this.props.remoteSysConfs.online_service_phone}</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 zindex500" id="zindex500">
                                        <div className="e-photo-text pd-s">
                                            <div className="e-photo"><i className="fa fa-qq"></i></div>
                                            <div className="e-text"><a className="e-text-title">{this.props.remoteSysConfs.online_service_qq}</a></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="footer-section">
                                            <p className="footer-title">官网平台</p>
                                            <ul className="footer-list--horizen">
                                                <li><img src={footer_logo_top} alt="" /></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="footer-section" >
                                            <p className="footer-title">监管机构</p>
                                            <ul className="footer-list--horizen">
                                                <li><img src={footer_logo_down}  alt="" /></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="footer-section">
                                    <p className="footer-title">合作平台</p>
                                    <ul className="footer-list--horizen">
                                        <li><img src={footer_logo_middle}  className="img" /></li>
                                    </ul>
                                </div>

                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-4">
                                        <p className="footer-title">信息中心</p>
                                        <ul className="footer-list sssv28-footer-font">
                                            <li><Link  to="/register">免费注册</Link></li>
                                            <li><Link to="/promotions">优惠</Link></li>
                                            <li><Link to="/FAQ">常见问题</Link></li>
                                            <li> <Link to="/ContactUs">联系我们</Link></li>
                                            <li><a href="/agent.html" target="_blank">合作伙伴</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="footer-title">产品</p>
                                        <ul className="footer-list sssv28-footer-font ng-scope">
                                            <li><Link to="/sport">体育博彩</Link>
                                            </li>
                                            <li><Link to="/casino">真人娱乐场</Link>
                                            </li>
                                            <li><Link to="/PT">电子游戏</Link></li>
                                            <li><Link to="/bingo" >彩票</Link></li>
                                            <li><Link to="/streetMachine">Ky棋牌</Link></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="footer-title">投注资料</p>
                                        <ul className="footer-list sssv28-footer-font">
                                            <li><Link to="/Gamerules">赛果</Link></li>
                                            <li><Link to="/Gamerules">体育博彩规则</Link></li>
                                            <li><Link to="/casino">真人娱乐场游戏介绍</Link></li>
                                            <li><Link to="/Responsible">责任博彩</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="footer-link-wrapper ">
                    <div className="container ">
                        <div className="mobile-qrcode-wrapper ">
                            <div className="mobile-qrcode">
                                <QRCode className="qrImg"
                                        includeMargin={true} //内部是否有margin
                                        size={120}  //图片大小
                                        value={this.props.remoteSysConfs.channel_push_url || "" } //地址
                                />
                                <div className="row pt-xs">
                                    <div className="col-md-5 col-md-offset-1">
                                        <img src={app1} />
                                    </div>
                                    <div className="col-md-5">
                                        <img src={app2} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-7">
                                    <img src={mobile} />
                                </div>
                                <div className="col-md-5">
                                    <div className="mobile-txt">
                                        <span className="css-arrow"></span>
                                        <br/>手机版<br/>扫一扫
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-link">
                            <Link to="/AboutUs">关于{appName}</Link>
                            <Link to="/FAQ">常见问题</Link>
                            <Link to="/ContactUs">联系我们</Link>
                            <Link to="/TermsConditions" >服务条款</Link>
                            <Link to="/Privacy">隐私政策</Link>
                            <Link to="/Responsible">责任博彩</Link>
                            <Link to="/Disclaimer">免责声明</Link>
                            <a href="/agent.html">合作伙伴</a>
                            <Link to="/Gamerules">游戏规则</Link>
                        </div>
                    </div>
                </div>

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