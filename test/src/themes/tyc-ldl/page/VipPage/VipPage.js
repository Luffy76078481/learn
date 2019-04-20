/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';
import { Link, IndexLink,browserHistory } from 'react-router';
import {connect} from 'react-redux';
import './VipPage.scss';

import slider_icon_level from './picture/slider_icon_level.png';
import slider_icon_benefits from './picture/slider_icon_benefits.png';
import slider_icon_promos from './picture/slider_icon_promos.png';
import pre_login from './picture/pre-login.png';
import checkIconVip from './picture/check-icon-vip.png';
class VipPage extends Component {
    componentDidMount() {
        window.$("#root").attr("class", "");
    }
    render() {
        return (
            <div id="vipPage">
                <main className="main">
                    <section className="banner slider " id="main-banner">
                        <div className="banner-slides">
                            <div className="banner-slides-item">
                                <div className="banner-blurb top">
                                    <div className="banner-blurb-outer">
                                        <div className="banner-blurb-inner">
                                            <div style={{float: "right"}}>&#13;
                                                <div className="pull-left" style={{width:'16vw',height: '16vw'}}>
                                                    <img alt="slider_icon_level.png" className="pull-left mr-10" height="73" src={slider_icon_level} style={{width:"4.83vw"}} />
                                                    <span className="block text-yellow text-bold ml-10">VIP等级 </span>
                                                    <span className="text-white">尊荣身份象征</span>&#13;
                                                </div>&#13;
                                                <div className="pull-left" style={{width:'16vw',height: '16vw'}}>
                                                    <img alt="slider_icon_benefits.png" className="pull-left mr-10" data-entity-type="" data-entity-uuid="" height="73" src={slider_icon_benefits} style={{width: '3.83vw'}} /><span className="block text-yellow text-bold  ml-10">VIP福利和奖励 </span> <span className="text-white">出乎意外的奖励</span>&#13;
                                                </div>&#13;
                                                <div className="pull-left" style={{width:'16vw',height: '16vw'}}><img alt="slider_icon_promos.png" className="pull-left mr-10" data-entity-type="" data-entity-uuid="" height="72" src={slider_icon_promos} style={{width: '5.83vw'}} /><span className="block text-yellow text-bold ml-10">&gt;专属活动和奖励 </span> <span className="text-white">独家定制惊喜奖励</span>&#13;
                                                </div>&#13;
                                                <div className="pull-left" style={{width:'13vw',height: '16vw'}}>
                                                    <Link to="/register" style={{fontSize:'1.55vw',padding:'0.2vw 2vw'}} target="_blank" className="cta-btn btn-yellow btn-medium pull-right mt-15">
                                                        立即加入
                                                    </Link>

                                                </div>
                                            </div>&#13;
                                        </div>
                                    </div>
                                </div>
                                <img src={pre_login} data-src="./picture/pre-login.png"/>
                            </div>
                        </div>
                    </section>


                    <div className="container">
                        <div id="vip-level-card-section" className="level-card-section">
                            <div className="section-divider"></div>
                            <div className="vip-level-badge section-ribbon mt-20 mb-20">
                                <h1 className="text-bold">VIP等级</h1>
                            </div>

                            <p className="text-align-center">
                                <strong>升级并荣升最高等级</strong>
                            </p>

                            <section id="vip-level-cards">
                                <div id="level-card-bronze" className="vip-level-card-wrapper">

                                    <a className="card-link hidden modal-trigger" href="#bronze" target="modal" > </a>

                                    <div className="vip-level-card-title">
                                        <span className="vip-level-card-title-text">青铜</span>
                                    </div>
                                    <div className="vip-level-card-content">
                                        <span className="vip-level-card-icon vip-level-bronze"></span>
                                        <div className="vip-level-card-desc"><ul className="text-align-left">
                                            <li>晋升礼金</li>&#13;
                                            <li>无上限返水</li>&#13;
                                            <li>晋升条件：</li>&#13;
                                            <li style={{"listStyle":"none"}}>周投注≥10万</li>&#13;
                                        </ul></div>
                                        <div className="vip-level-card-button-wrapper">
                                            <Link to="/promotions"  className="cta-btn btn-yellow btn-medium text-bold">
                                                立即加入
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div id="level-card-silver" className="vip-level-card-wrapper">

                                    <a className="card-link hidden modal-trigger" href="#silver-pre" target="modal" > </a>

                                    <div className="vip-level-card-title">
                                        <span className="vip-level-card-title-text">白银</span>
                                    </div>
                                    <div className="vip-level-card-content">
                                        <span className="vip-level-card-icon vip-level-silver"></span>
                                        <div className="vip-level-card-desc"><ul className="text-align-left">
                                            <li>晋升礼金</li>&#13;
                                            <li>更高返水</li>&#13;
                                            <li>每周存送</li>&#13;
                                            <li>月度红包</li>&#13;
                                            <li>生日礼金</li>&#13;
                                            <li>优先取款</li>&#13;
                                            <li>晋升条件：</li>&#13;
                                            <li style={{"listStyle":"none"}}>周投注≥100万</li>&#13;
                                        </ul></div>
                                        <div className="vip-level-card-button-wrapper">
                                            <Link to="/promotions" className="cta-btn btn-yellow btn-medium modal-trigger text-bold">
                                                升级至白银
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div id="level-card-gold" className="vip-level-card-wrapper">

                                    <a className="card-link hidden modal-trigger" href="#gold" target="modal" > </a>

                                    <div className="vip-level-card-title">
                                        <span className="vip-level-card-title-text">黄金</span>
                                    </div>
                                    <div className="vip-level-card-content">
                                        <span className="vip-level-card-icon vip-level-gold"></span>
                                        <div className="vip-level-card-desc"><ul className="text-align-left">
                                            <li>晋升礼金</li>&#13;
                                            <li>更高返水</li>&#13;
                                            <li>每周存送</li>&#13;
                                            <li>月度红包</li>&#13;
                                            <li>生日礼金</li>&#13;
                                            <li>优先取款</li>&#13;
                                            <li>专属存款通道</li>&#13;
                                            <li>更高投注限额</li>&#13;
                                            <li>更多提款次数/日</li>&#13;
                                            <li>晋升条件：</li>&#13;
                                            <li style={{"listStyle":"none"}}>周投注≥500万</li>&#13;
                                        </ul></div>
                                        <div className="vip-level-card-button-wrapper">
                                            <Link to="/promotions" className="cta-btn btn-yellow btn-medium modal-trigger text-bold">
                                                升级至黄金
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div id="level-card-platinum" className="vip-level-card-wrapper">

                                    <a className="card-link hidden modal-trigger" href="#platinum" target="modal" > </a>

                                    <div className="vip-level-card-title">
                                        <span className="vip-level-card-title-text">铂金</span>
                                    </div>
                                    <div className="vip-level-card-content">
                                        <span className="vip-level-card-icon vip-level-platinum"></span>
                                        <div className="vip-level-card-desc"><ul className="text-align-left">
                                            <li>晋升礼金</li>&#13;
                                            <li>高达1.5%返水</li>&#13;
                                            <li>每周存送</li>&#13;
                                            <li>月度红包</li>&#13;
                                            <li>生日礼金</li>&#13;
                                            <li>优先取款</li>&#13;
                                            <li>专属存款通道</li>&#13;
                                            <li>铂金投注限额</li>&#13;
                                            <li>更高提款次数/日</li>&#13;
                                            <li>晋升条件：</li>&#13;
                                            <li style={{"listStyle":"none"}}>周投注≥1000万</li>&#13;
                                        </ul></div>
                                        <div className="vip-level-card-button-wrapper">
                                            <Link to="/promotions" className="cta-btn btn-yellow btn-medium modal-trigger text-bold">
                                            升级至铂金
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div id="level-card-platinum" className="vip-level-card-wrapper">

                                    <a className="card-link hidden modal-trigger" href="#platinum" target="modal" > </a>

                                    <div className="vip-level-card-title">
                                        <span className="vip-level-card-title-text">钻石</span>
                                    </div>
                                    <div className="vip-level-card-content">
                                        <span className="vip-level-card-icon vip-level-platinum vip-level-zuanshi"></span>
                                        <div className="vip-level-card-desc"><ul className="text-align-left">
                                            <li>晋升礼金</li>&#13;
                                            <li>高达1.8%返水</li>&#13;
                                            <li>每周存送</li>&#13;
                                            <li>月度红包</li>&#13;
                                            <li>生日礼金</li>&#13;
                                            <li>优先取款</li>&#13;
                                            <li>专属存款通道</li>&#13;
                                            <li>钻石投注限额</li>&#13;
                                            <li>不限提款次数/日</li>&#13;
                                            <li>晋升条件：</li>&#13;
                                            <li style={{"listStyle":"none"}}>周投注≥5000万</li>&#13;
                                        </ul></div>
                                        <div className="vip-level-card-button-wrapper">
                                            <Link to="/promotions" className="cta-btn btn-yellow btn-medium modal-trigger text-bold">
                                                升级至钻石
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <section className="rewards-recognition">
                            <div className="section-divider"></div>
                            <div className="rewards-recognition-badge section-ribbon mt-20 mb-20">
                                <h1 className="text-bold">亚洲最佳VIP奖励和尊荣身份</h1>
                            </div>
                            <p className="text-align-center mb-25"><strong>畅享VIP荣尊体验，尽在太阳城</strong></p>&#13;
                            &#13;
                            <table border="1" cellPadding="1" cellSpacing="1" style={{width: '100%'}}>
                                <tbody>
                                <tr><td style={{background:"rgb(175, 0, 0)", width: "461px"}}></td>&#13;
                                <td className="text-white" style={{background:'rgb(175, 0, 0)',textAlign:'center',verticalAlign:'middle',width:'245px'}}><span className="icon-vip-bronze"></span><br />&#13;
                                    青铜</td>&#13;
                                <td className="text-white" style={{background:'rgb(175, 0, 0)',textAlign:'center',verticalAlign:'middle',width:'245px'}}><span className="icon-vip-silver"></span><br />&#13;
                                    白银</td>&#13;
                                <td className="text-white" style={{background:'rgb(175, 0, 0)',textAlign:'center',verticalAlign:'middle',width:'245px'}}><span className="icon-vip-gold"></span><br />&#13;
                                    黄金</td>&#13;
                                <td className="text-white" style={{background:'rgb(175, 0, 0)',textAlign:'center',verticalAlign:'middle',width:'245px'}}><span className="icon-vip-platinum"></span><br />&#13;
                                    铂金</td>&#13;
                                <td className="text-white" style={{background:'rgb(175, 0, 0)',textAlign:'center',verticalAlign:'middle',width:'245px'}}><span className="icon-vip-zuanshi"></span><br />&#13;
                                    钻石</td>&#13;
                            </tr><tr className="text-white"><td style={{background:'rgb(55, 55, 55)',textAlign:'center',verticalAlign:'middle',width:'461px',borderColor:'rgb(55,55,55)'}}><strong><span className="text-16"><span className="text-yellow"></span></span><span className="text-16"><span className="text-yellow">返水</span></span><span className="text-16"><span className="text-yellow"></span></span></strong></td>&#13;
                                <td colSpan="5" style={{background:'rgb(55, 55, 55)',width:'670px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">真人</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.6%</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.8%</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.0%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.2%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.5%</span></td>&#13;
                            </tr><tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">电子</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.8%</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.0%</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.2%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.5%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.8%</span></td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">彩票</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.5%</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.6%</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.7%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.8%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.0%</span></td>&#13;
                            </tr><tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}>棋牌</td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.8%</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.0%</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.2%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.5%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.8%</span></td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">体育</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.5%</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.6%</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.7%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.8%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.0%</span></td>&#13;
                            </tr><tr ><td style={{background:'rgb(55, 55, 55)',textAlign:'center',verticalAlign:'middle',width:'461px',borderColor:'rgb(55,55,55)'}}><strong><span className="text-16"><span className="text-yellow"></span></span><span className="text-16"><span className="text-yellow">VIP待遇</span></span><span className="text-16"><span className="text-yellow"></span></span></strong></td>&#13;
                                <td colSpan="5" style={{background:'rgb(55, 55, 55)',width:'670px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">晋升礼金</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">38</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">88</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">388</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">3888</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">8888</span></td>&#13;
                            </tr><tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">每周存送</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">-</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">10%/1888</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">20%/3888</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">30%/8888</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">40%/18888</span></td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">月度红包</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">-</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">388</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">888</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1888</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">3888</span></td>&#13;
                            </tr><tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">生日礼金</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">-</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">88</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">388</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">688</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">888</span></td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">取款通道</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">-</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">优先</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">优先</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">优先</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">优先</span></td>&#13;
                            </tr><tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">存款通道</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">-</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">-</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">黄金专用通道</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">铂金专用通道</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">钻石专用通道</span></td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">投注限额</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">-</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">-</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">更高投注限额</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">铂金投注限额</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">钻石投注限额</span></td>&#13;
                            </tr><tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">提款次数/天</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">5</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">5</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">10</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">15</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">不限</span></td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">积分商城</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black"> ​<img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" />​</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black"> ​<img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" />​</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black"> ​<img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" />​</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black"> ​<img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" />​</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black"> ​<img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" />​</span></td>&#13;
                            </tr>
                            
                            </tbody>
                            </table>
                            {/* <p>1.会员注册后默认为新注册会员，达到晋级标准后会自动提升VIP等级，晋级礼金请联系在线客服领取。</p>
                            <p>2.周流水计算区间：北京时间每周一12:00至下周一中午11：59。</p>
                            <p>3.晋升礼金/生日礼金5倍流水。</p>
                            <p>4.每周存送/月度红包8倍流水。</p>
                            <p>5.月度红包获得标准需保持每月7天以上活跃度且每天投注不少于1000元。</p>
                            <p>6.生日礼金需在生日当天将本人手持身份证正反面照片发送至客服邮箱731667777@qq.com进行申请。</p>
                            <p>7.会员VIP等级只升不降。</p>
                            <p>8.Dafa娱乐城保留此VIP条例的最终解释权。</p> */}
                        </section>
                    </div>






                </main>


            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
    }
);

export default connect(mapStateToProps, {})(VipPage);