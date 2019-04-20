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
                                        <div className="vip-level-card-desc"><ul className="text-align-left"><li>欢迎奖金和再存奖金</li>&#13;
                                            <li>无上限游戏返水</li>&#13;
                                            <li>每日奖励和奖金</li>&#13;
                                            <li>24/7客服</li>&#13;
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
                                        <div className="vip-level-card-desc"><ul className="text-align-left"><li>丰厚的优惠活动</li>&#13;
                                            <li>更高奖金奉送</li>&#13;
                                            <li>惊喜礼包和独家锦标赛</li>&#13;
                                            <li>每日奖励和奖金</li>&#13;
                                            <li>更高返水</li>&#13;
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
                                        <div className="vip-level-card-desc"><ul className="text-align-left"><li>独家优惠活动</li>&#13;
                                            <li>VIP每月抽奖</li>&#13;
                                            <li>VIP百家乐特别通道</li>&#13;
                                            <li>最新游戏专属通道</li>&#13;
                                            <li>高投注额VIP牌桌</li>&#13;
                                            <li>更高返水</li>&#13;
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
                                        <div className="vip-level-card-desc"><ul className="text-align-left"><li>24/7专属客服</li>&#13;
                                            <li>独家优惠活动邀请</li>&#13;
                                            <li>VIP每月抽奖</li>&#13;
                                            <li>快速支付</li>&#13;
                                            <li>更高额度存款</li>&#13;
                                            <li>更高投注额VIP牌桌</li>&#13;
                                            <li>VIP现场荷官专属通道</li>&#13;
                                            <li>更高返水</li>&#13;
                                        </ul></div>
                                        <div className="vip-level-card-button-wrapper">
                                            <Link to="/promotions" className="cta-btn btn-yellow btn-medium modal-trigger text-bold">
                                                仅限邀请
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
                            <p className="text-align-center mb-25"><strong>畅享VIP荣尊体验，尽在大发</strong></p>&#13;
                            &#13;
                            <table border="1" cellPadding="1" cellSpacing="1" style={{width: '100%'}}>
                                <tbody>
                                <tr><td style={{background:"rgb(175,0,0)", width: "461px"}}></td>&#13;
                                <td className="text-white" style={{background:'rgb(175, 0, 0)',textAlign:'center',verticalAlign:'middle',width:'245px'}}><span className="icon-vip-bronze"></span><br />&#13;
                                    青铜</td>&#13;
                                <td className="text-white" style={{background:'rgb(175, 0, 0)',textAlign:'center',verticalAlign:'middle',width:'245px'}}><span className="icon-vip-silver"></span><br />&#13;
                                    白银</td>&#13;
                                <td className="text-white" style={{background:'rgb(175, 0, 0)',textAlign:'center',verticalAlign:'middle',width:'245px'}}><span className="icon-vip-gold"></span><br />&#13;
                                    黄金</td>&#13;
                                <td className="text-white" style={{background:'rgb(175, 0, 0)',textAlign:'center',verticalAlign:'middle',width:'245px'}}><span className="icon-vip-platinum"></span><br />&#13;
                                    铂金</td>&#13;
                            </tr><tr className="text-white"><td style={{background:'rgb(55, 55, 55)',textAlign:'center',verticalAlign:'middle',width:'461px',borderColor:'rgb(55,55,55)'}}><strong><span className="text-16"><span className="text-yellow"></span></span><span className="text-16"><span className="text-yellow">返水</span></span><span className="text-16"><span className="text-yellow"></span></span></strong></td>&#13;
                                <td colSpan="4" style={{background:'rgb(55, 55, 55)',width:'670px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">娱乐场和老虎机（无上限）</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.80%</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.87%</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.00%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.20%</span></td>&#13;
                            </tr><tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">现场荷官（每日）</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.78%</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.81%</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.83%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.88%</span></td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">街机返水（每日）</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.80%</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.87%</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.00%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.20%</span></td>&#13;
                            </tr><tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}>捕鱼王(每周)</td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.50%</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.53%</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.60%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.70%</span></td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">无上限混合过关返水（每日）</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">2.75%</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">3.00%</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">3.25%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">3.25%</span></td>&#13;
                            </tr><tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">百练赛&amp;虚拟运动返水（每周）</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.75%</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.75%</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.75%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.75%</span></td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">体育返水（每周）</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.25%</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.35%</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.48%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.58%</span></td>&#13;
                            </tr><tr><td style={{background:'rgb(55, 55, 55)',textAlign:'center',verticalAlign:'middle',width:'461px',borderColor:'rgb(55,55,55)'}}><strong><span className="text-16"><span className="text-yellow"></span></span><span className="text-16"><span className="text-yellow">所有体育输额返还&amp;再存奖金</span></span><span className="text-16"><span className="text-yellow"></span></span></strong></td>&#13;
                                <td colSpan="4" style={{background:'rgb(55, 55, 55)',width:'670px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">美职棒/NBA/WNBA/电竞输额返还</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">7.88%</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">8.88%</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">9.88%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">9.88%</span></td>&#13;
                            </tr><tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">体育输额返还</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">-</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">-</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">8.88%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">9.88%</span></td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">再存奖金（每周）</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">5%</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">12%</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">30%</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">35%</span></td>&#13;
                            </tr><tr><td style={{background:'rgb(55, 55, 55)',textAlign:'center',verticalAlign:'middle',width:'461px',borderColor:'rgb(55,55,55)'}}><strong><span className="text-16"><span className="text-yellow"></span></span><span className="text-16"><span className="text-yellow"></span></span><span className="text-16"><span className="text-yellow">老虎机俱乐部</span></span><span className="text-16"><span className="text-yellow"></span></span><span className="text-16"><span className="text-yellow"></span></span></strong></td>&#13;
                                <td colSpan="4" style={{background:'rgb(55, 55, 55)',width:'670px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><u>再存奖金</u></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">15%高达1,600元再存奖金</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">15%高达1,600元再存奖金</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">20%高达4,000元再存奖金</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">25%高达8,000元再存奖金</span></td>&#13;
                            </tr><tr><td style={{background:'rgb(55, 55, 55)',textAlign:'center',verticalAlign:'middle',width:'461px',borderColor:'rgb(55,55,55)'}}><strong><span className="text-16"><span className="text-yellow"></span></span><span className="text-16"><span className="text-yellow">专属通道和优惠活动</span></span><span className="text-16"><span className="text-yellow"></span></span></strong></td>&#13;
                                <td colSpan="4" style={{background:'rgb(55, 55, 55)',width:'670px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">存取款处理</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black"> ​<img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" />​</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black"> ​<img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" />​</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">优先</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">首选</span></td>&#13;
                            </tr><tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">投注限额</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">标准</span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">标准</span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">更高投注限额</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">卓越贵宾投注限额</span></td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">独家礼包、奖励&amp;锦标赛</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black"><img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" /></span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black"><img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" /></span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black"><img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" /></span></td>&#13;
                            </tr><tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">VIP专属优惠活动和奖金</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black"><img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" /></span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black"><img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" /></span></td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">付款方式优先权</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">​<img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" />​</span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">​<img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" />​</span></td>&#13;
                            </tr><tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">专属付款通道</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black"><img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" /></span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black"><img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" /></span></td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">24/7专属VIP服务</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black"><img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" /></span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black"><img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" /></span></td>&#13;
                            </tr><tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">老虎机专属通道</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black"><img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" /></span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black"><img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" /></span></td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><u>大发黄金版体验专属通道</u></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black"></span></td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black"></span></td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black"><img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" /></span></td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black"><img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" /></span></td>&#13;
                            </tr><tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">VIP欢迎奖金</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black"><img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" /></span></td>&#13;
                            </tr><tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">专属卓越贵宾身份</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black"><img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" /></span></td>&#13;
                            </tr><tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">独家优惠活动邀请</span></td>&#13;
                                <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}> </td>&#13;
                                <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black"> ​<img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" />​</span></td>&#13;
                            </tr></tbody>
                            </table>
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