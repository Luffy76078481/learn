/**
 * VIP
 */
import React, {Component} from 'react';
import { Link, IndexLink,browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {config} from "globalConfig";
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
    serversOpen(e) {
        e.preventDefault();
        if (e.target.id == 'test') {
            window.swal({
                title: "忘记密码",
                text: "联系在线客服协助修改密码",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "联系客服",
                showCancelButton: true,
                cancelButtonText: "关闭",
            },
                () => {
                    window.open(this.props.remoteSysConfs.online_service_link, 'servers', 'width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
                });
            return;
        }
        window.open(this.props.remoteSysConfs.online_service_link, 'servers', 'width=900,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=450,screenY=250');
        return false;
    }
    render() {
        let vipColor = "#af0000" // 默认dafa red color
        if(config.webSiteTag == "xhtd"){
            vipColor = "#5800a1"
        }
        else if(config.webSiteTag == "xpj" || config.webSiteTag == "vns"){
            vipColor = "#502f2a"
        }
        return (
            <div id="vipPage">
                <main className="main">
                    <section className="banner slider " id="main-banner">
                        <div className="banner-slides">
                            <div className="banner-slides-item">
                                <div className="banner-blurb top">
                                    <div className="banner-blurb-outer">
                                        <div className="banner-blurb-inner">
                                            <div style={{float: "right"}}>;
                                                <div className="pull-left" style={{width:'16vw',height: '16vw'}}>
                                                    <img alt="slider_icon_level.png" className="pull-left mr-10" height="73" src={slider_icon_level} style={{width:"4.83vw"}} />
                                                    <span className="block text-yellow text-bold ml-10">VIP等级 </span>
                                                    <span className="text-white">尊荣身份象征</span>
                                                </div>
                                                <div className="pull-left" style={{width:'16vw',height: '16vw'}}>
                                                    <img alt="slider_icon_benefits.png" className="pull-left mr-10" data-entity-type="" data-entity-uuid="" height="73" src={slider_icon_benefits} style={{width: '3.83vw'}} /><span className="block text-yellow text-bold  ml-10">VIP福利和奖励 </span> <span className="text-white">出乎意外的奖励</span>
                                                </div>
                                                <div className="pull-left" style={{width:'16vw',height: '16vw'}}><img alt="slider_icon_promos.png" className="pull-left mr-10" data-entity-type="" data-entity-uuid="" height="72" src={slider_icon_promos} style={{width: '5.83vw'}} /><span className="block text-yellow text-bold ml-10">&gt;专属活动和奖励 </span> 
                                                <span className="text-white">独家定制惊喜奖励</span>
                                                </div>
                                                <div className="pull-left" style={{width:'13vw',height: '16vw'}}>
                                                    <Link to="" style={{fontSize:'1.55vw',padding:'0.2vw 2vw'}} target="_blank" className="cta-btn btn-yellow btn-medium pull-right mt-15">
                                                        立即加入
                                                    </Link>
                                                </div>
                                            </div>;
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
                                    <div className="vip-level-card-title" style={{"backgroundColor":vipColor}}>
                                        <span className="vip-level-card-title-text">青铜</span>
                                    </div>
                                    <div className="vip-level-card-content" style={{"backgroundColor":vipColor}}>
                                        <span className="vip-level-card-icon vip-level-bronze"></span>
                                        <div className="vip-level-card-desc"><ul className="text-align-left">
                                            <li>晋升礼金</li>
                                            <li>无上限返水</li>
                                            <li>晋升条件：</li>
                                            <li style={{"listStyle":"none"}}>周投注≥10万</li>
                                            <li style={{"listStyle":"none"}}>周存款≥1万</li>
                                        </ul></div>
                                        <div className="vip-level-card-button-wrapper" onClick={this.serversOpen.bind(this)}>
                                            <Link to="" className="cta-btn btn-yellow btn-medium text-bold">
                                                立即加入
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div id="level-card-silver" className="vip-level-card-wrapper">
                                    <a className="card-link hidden modal-trigger" href="#silver-pre" target="modal" > </a>
                                    <div className="vip-level-card-title" style={{"backgroundColor":vipColor}}>
                                        <span className="vip-level-card-title-text">白银</span>
                                    </div>
                                    <div className="vip-level-card-content" style={{"backgroundColor":vipColor}}>
                                        <span className="vip-level-card-icon vip-level-silver"></span>
                                        <div className="vip-level-card-desc"><ul className="text-align-left">
                                            <li>晋升礼金</li>
                                            <li>更高返水</li>
                                            <li>每周存送</li>
                                            <li>月度红包</li>
                                            <li>生日礼金</li>
                                            {/* <li>优先取款</li> */}
                                            <li>晋升条件：</li>
                                            <li style={{"listStyle":"none"}}>周投注≥100万</li>
                                            <li style={{"listStyle":"none"}}>周存款≥10万</li>
                                        </ul></div>
                                        <div className="vip-level-card-button-wrapper" onClick={this.serversOpen.bind(this)}>
                                            <Link to="" className="cta-btn btn-yellow btn-medium modal-trigger text-bold">
                                                升级至白银
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div id="level-card-gold" className="vip-level-card-wrapper">
                                    <a className="card-link hidden modal-trigger" href="#gold" target="modal" > </a>
                                    <div className="vip-level-card-title" style={{"backgroundColor":vipColor}}>
                                        <span className="vip-level-card-title-text">黄金</span>
                                    </div>
                                    <div className="vip-level-card-content" style={{"backgroundColor":vipColor}}>
                                        <span className="vip-level-card-icon vip-level-gold"></span>
                                        <div className="vip-level-card-desc"><ul className="text-align-left">
                                            <li>晋升礼金</li>
                                            <li>更高返水</li>
                                            <li>每周存送</li>
                                            <li>月度红包</li>
                                            <li>生日礼金</li>
                                            {/* <li>优先取款</li>
                                            <li>专属存款通道</li>
                                            <li>更高投注限额</li>
                                            <li>更多提款次数/日</li> */}
                                            <li>晋升条件：</li>
                                            <li style={{"listStyle":"none"}}>周投注≥300万</li>
                                            <li style={{"listStyle":"none"}}>周存款≥30万</li>
                                        </ul></div>
                                        <div className="vip-level-card-button-wrapper" onClick={this.serversOpen.bind(this)}>
                                            <Link to="" className="cta-btn btn-yellow btn-medium modal-trigger text-bold">
                                                升级至黄金
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div id="level-card-platinum" className="vip-level-card-wrapper">
                                    <a className="card-link hidden modal-trigger" href="#platinum" target="modal" > </a>
                                    <div className="vip-level-card-title" style={{"backgroundColor":vipColor}}>
                                        <span className="vip-level-card-title-text">铂金</span>
                                    </div>
                                    <div className="vip-level-card-content" style={{"backgroundColor":vipColor}}>
                                        <span className="vip-level-card-icon vip-level-platinum"></span>
                                        <div className="vip-level-card-desc"><ul className="text-align-left">
                                            <li>晋升礼金</li>
                                            <li>高达1.5%返水</li>
                                            <li>每周存送</li>
                                            <li>月度红包</li>
                                            <li>生日礼金</li>
                                            {/* <li>优先取款</li>
                                            <li>专属存款通道</li>
                                            <li>铂金投注限额</li>
                                            <li>更高提款次数/日</li> */}
                                            <li>晋升条件：</li>
                                            <li style={{"listStyle":"none"}}>周投注≥1000万</li>
                                            <li style={{"listStyle":"none"}}>周存款≥100万</li>
                                        </ul></div>
                                        <div className="vip-level-card-button-wrapper" onClick={this.serversOpen.bind(this)}>
                                            <Link to="" className="cta-btn btn-yellow btn-medium modal-trigger text-bold">
                                            升级至铂金
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div id="level-card-platinum" className="vip-level-card-wrapper">
                                    <a className="card-link hidden modal-trigger" href="#platinum" target="modal" > </a>
                                    <div className="vip-level-card-title" style={{"backgroundColor":vipColor}}>
                                        <span className="vip-level-card-title-text">钻石</span>
                                    </div>
                                    <div className="vip-level-card-content" style={{"backgroundColor":vipColor}}>
                                        <span className="vip-level-card-icon vip-level-platinum vip-level-zuanshi"></span>
                                        <div className="vip-level-card-desc"><ul className="text-align-left">
                                            <li>晋升礼金</li>
                                            <li>高达1.8%返水</li>
                                            <li>每周存送</li>
                                            <li>月度红包</li>
                                            <li>生日礼金</li>
                                            {/* <li>优先取款</li>
                                            <li>专属存款通道</li>
                                            <li>钻石投注限额</li>
                                            <li>不限提款次数/日</li> */}
                                            <li>晋升条件：</li>
                                            <li style={{"listStyle":"none"}}>周投注≥2000万</li>
                                            <li style={{"listStyle":"none"}}>周存款≥200万</li>
                                        </ul></div>
                                        <div className="vip-level-card-button-wrapper" onClick={this.serversOpen.bind(this)}>
                                            <Link to="" className="cta-btn btn-yellow btn-medium modal-trigger text-bold">
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
                            <p className="text-align-center mb-25"><strong>畅享VIP荣尊体验，尽在大发</strong></p>               
                            <table cellPadding="1" cellSpacing="1" style={{width: '100%'}}>
                                <tbody>
                                    <tr>
                                        <td style={{background:vipColor, width: "461px"}}></td>
                                        <td className="text-white" style={{background:vipColor,textAlign:'center',verticalAlign:'middle',width:'245px'}}>
                                            <span className="icon-vip-bronze"></span><br/>青铜
                                        </td>
                                        <td className="text-white" style={{background:vipColor,textAlign:'center',verticalAlign:'middle',width:'245px'}}>
                                            <span className="icon-vip-silver"></span><br/>白银
                                        </td>
                                        <td className="text-white" style={{background:vipColor,textAlign:'center',verticalAlign:'middle',width:'245px'}}>
                                            <span className="icon-vip-gold"></span><br/>黄金
                                        </td>
                                        <td className="text-white" style={{background:vipColor,textAlign:'center',verticalAlign:'middle',width:'245px'}}>
                                            <span className="icon-vip-platinum"></span><br/>铂金
                                        </td>
                                        <td className="text-white" style={{background:vipColor,textAlign:'center',verticalAlign:'middle',width:'245px'}}>
                                            <span className="icon-vip-zuanshi"></span><br/>钻石
                                        </td>
                                    </tr>
                                    <tr className="text-white"><td style={{background:'rgb(55, 55, 55)',textAlign:'center',verticalAlign:'middle',width:'461px',borderColor:'rgb(55,55,55)'}}><strong><span className="text-16"><span className="text-yellow"></span></span><span className="text-16"><span className="text-yellow">返水</span></span><span className="text-16"><span className="text-yellow"></span></span></strong></td>
                                        <td colSpan="5" style={{background:'rgb(55, 55, 55)',width:'670px',borderColor:'rgb(55,55,55)'}}> </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">真人</span></td>
                                        <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.6%</span></td>
                                        <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.7%</span></td>
                                        <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.8%</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.9%</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.0%</span></td>
                                    </tr>
                                    <tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">电子</span></td>
                                        <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.8%</span></td>
                                        <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.0%</span></td>
                                        <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.2%</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.5%</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.8%</span></td>
                                    </tr>
                                    <tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">彩票</span></td>
                                        <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.38%</span></td>
                                        <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.38%</span></td>
                                        <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.48%</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.48%</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.58%</span></td>
                                    </tr>
                                    <tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}>棋牌</td>
                                        <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.7%</span></td>
                                        <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.8%</span></td>
                                        <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.9%</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.0%</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1.2%</span></td>
                                    </tr>
                                    <tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">体育</span></td>
                                        <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.48%</span></td>
                                        <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.58%</span></td>
                                        <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.68%</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.78%</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">0.88%</span></td>
                                    </tr>
                                    <tr>
                                        <td style={{background:'rgb(55, 55, 55)',textAlign:'center',verticalAlign:'middle',width:'461px',borderColor:'rgb(55,55,55)'}}>
                                            <strong>
                                                <span className="text-16"><span className="text-yellow"></span></span>
                                                <span className="text-16"><span className="text-yellow">VIP待遇</span></span>
                                                <span className="text-16"><span className="text-yellow"></span></span>
                                            </strong>
                                        </td>
                                        <td colSpan="5" style={{background:'rgb(55, 55, 55)',width:'670px',borderColor:'rgb(55,55,55)'}}> </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">晋升礼金</span></td>
                                        <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">88</span></td>
                                        <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">388</span></td>
                                        <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">588</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">888</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">1888</span></td>
                                    </tr>
                                    <tr className="odd">
                                        <td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">每周存送</span></td>
                                        <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">5%</span></td>
                                        <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">10%</span></td>
                                        <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">15%</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">20%</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">25%</span></td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">月度红包</span></td>
                                        <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">88</span></td>
                                        <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">188</span></td>
                                        <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">388</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">588</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">888</span></td>
                                    </tr>
                                    <tr className="odd">
                                    <td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">生日礼金</span></td>
                                        <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">-</span></td>
                                        <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">88</span></td>
                                        <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">388</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">688</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">888</span></td>
                                    </tr>
                                    <tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">取款通道</span></td>
                                        <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">-</span></td>
                                        <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">优先</span></td>
                                        <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">优先</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">优先</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">优先</span></td>
                                    </tr>
                                    <tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">存款通道</span></td>
                                        <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">-</span></td>
                                        <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">-</span></td>
                                        <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">黄金专用通道</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">铂金专用通道</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">钻石专用通道</span></td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">投注限额</span></td>
                                        <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">-</span></td>
                                        <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">-</span></td>
                                        <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">更高投注限额</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">铂金投注限额</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">钻石投注限额</span></td>
                                    </tr>
                                    <tr className="odd"><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">提款次数/天</span></td>
                                        <td className="text-align-center" style={{width:'158px',borderColor:'rgb(55,55,55)'}}><span className="text-black">5</span></td>
                                        <td className="text-align-center" style={{width:'160px',borderColor:'rgb(55,55,55)'}}><span className="text-black">5</span></td>
                                        <td className="text-align-center" style={{width:'156px',borderColor:'rgb(55,55,55)'}}><span className="text-black">10</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">15</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black">不限</span></td>
                                    </tr>
                                    <tr><td style={{width:'461px',borderColor:'rgb(55,55,55)'}}><span className="text-black">积分商城</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black"> ​<img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" />​</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black"> ​<img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" />​</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black"> ​<img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" />​</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black"> ​<img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" />​</span></td>
                                        <td className="text-align-center" style={{width:'136px',borderColor:'rgb(55,55,55)'}}><span className="text-black"> ​<img alt="check-icon-vip.png" data-entity-type="" data-entity-uuid="" height="22" src={checkIconVip} width="28" />​</span></td>
                                    </tr>               
                                </tbody>
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
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps, {})(VipPage);