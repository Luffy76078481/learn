import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Tabs,Icon} from "antd";
import "./css/FirstPage_acyl.scss";
import sixPng from './images/six.png';

class FirstPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        window.onClickGameLink = (link)=>{
            this.onClickGameLink(link);
        };
        const TabPane = Tabs.TabPane;
        const promotionLink = window.configHelper.getPromotionUrl();
        const FirstPagePromotionAlert = window.r.get("FirstPagePromotionAlert");
        const ImageGallery = window.r.get("ImageGallery");
        return (
            <div className="wfPage home-page">
                {FirstPagePromotionAlert && <FirstPagePromotionAlert/>}
                <ImageGallery height="320px"  hasOption="true"></ImageGallery>
                <div className="notice-module right-notice">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="网站公告" key="1">
                            <div className="firstLetter">
                                凡使用银行入款的会员每次均可享受2%的现金返利优惠，每日最高上限1000元(北京时间）。
                            </div>
                        </TabPane>
                        <TabPane tab="帮助中心" key="2">
                            <div className="firstLetter">
                                凡使用银行入款的会员每次均可享受2%的现金返利优惠，每日最高上限1000元(北京时间）。
                            </div>
						</TabPane>
                    </Tabs>
                    <div className="bottom">
                        <div className="qrcode">
                            <img width="100" src={"http://qr.liantu.com/api.php?w=160&h=160&text=https://" + this.props.remoteSysConfs.channel_push_url} className="qrImg" alt="" />
                        </div>
                        <div className="right">
                            <h3>免费下载APP</h3>
                            <p>
                                <Icon type="apple" theme="filled" /><Icon type="android" theme="filled" />
                            </p>
                        </div>
                    </div>
                </div>
                <div className="inner-content">
					<div className="cup-content">
						<div className="left">
							{/*左侧悬浮*/}
							<div className="lottery-nav-module ">
								<div className="hot">
									<div>
										<p className="image">
											<img src={sixPng}/>
										</p>
										<p className="title">
											<span className="name">六合彩 <span className="button">投注<i className="anticon anticon-caret-right"></i></span></span><span className="countdown">明天21:34开奖</span>
										</p>
									</div>
									<div>
										<p className="image">
											<img src={sixPng}/>
										</p>
										<p className="title">
											<span className="name">重庆时时彩 <span className="button">投注<i className="anticon anticon-caret-right"></i></span></span><span className="countdown"><span className="count-down">2分44秒</span></span>
										</p>
									</div>
									<div>
										<p className="image">
											<img src={sixPng}/>
										</p>
										<p className="title">
											<span className="name">分分彩 <span className="button">投注<i className="anticon anticon-caret-right"></i></span></span><span className="countdown"><span className="count-down">9秒</span></span>
										</p>
									</div>
									<div>
										<p className="image">
											<img src={sixPng}/>
										</p>
										<p className="title">
											<span className="name">广西快3 <span className="button">投注<i className="anticon anticon-caret-right"></i></span></span><span className="countdown"><span className="count-down">6分44秒</span></span>
										</p>
									</div>
								</div>
								<div className="all">
									<div className="outer-div">
										<div className="inner-div">
											<span className="tl">PC蛋蛋</span><span>北京28</span><span>加拿大28</span>
										</div>
									</div>
									<div className="outer-div">
										<div className="inner-div">
											<span className="tl">低频彩</span><span>六合彩</span><span>福彩3D</span><span>排列3</span>
										</div>
									</div>
									<div className="outer-div">
										<div className="inner-div">
											<span className="tl">时时彩</span><span>重庆时时彩</span><span>极速赛车</span><span>两分彩</span><span>分分彩</span><span>新疆时时彩</span><span>五分彩</span><span>广东快乐十分</span><span>重庆快乐十分</span>
										</div>
									</div>
									<div className="outer-div">
										<div className="inner-div">
											<span className="tl">快3</span><span>广西快3</span><span>安徽快3</span><span>江苏快3</span>
										</div>
									</div>
									<div className="outer-div">
										<div className="inner-div">
											<span className="tl">11选5</span><span>山东11选5</span><span>江西11选5</span><span>广东11选5</span>
										</div>
									</div>
								</div>
							</div>
							<div className="app-promotion-module">
								<div className="inner">
                                    <img src={"http://qr.liantu.com/api.php?w=160&h=160&text=https://" + location.hostname + "/_promotion/web/index.html"}  />
								</div>
							</div>
						</div>
						<div className="right">
                            {/*{热门游戏}*/}
							<div className=" hot-lotteries">
                                <h2 className="box-title"><span>热门游戏</span></h2>
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="六合彩" key="1">
                                        <div className="lottery-head-module ">
                                            <div className="last-draw">
                                                <div className="left">
                                                    <img src={sixPng}/>
                                                </div>
                                                <div className="right">
                                                    <p className="hd">
                                                        <span className="title1">六合彩</span><span className="issue"><em>第2018079期</em>&nbsp;本期期开奖结果</span>
                                                    </p>
                                                    <div className="ant-carousel ant-carousel-vertical">
                                                        <div className="slick-initialized slick-slider slick-vertical">
                                                            <div className="slick-list">
                                                                <div className="slick-track">
                                                                    <p className="slick-slide slick-cloned result">
                                                                        <span className="ball BLUE N large fill">马</span><span className="ball GREEN N large fill">蛇</span><span className="ball BLUE N large fill">猪</span><span className="ball BLUE N large fill">猪</span><span className="ball BLUE N large fill">牛</span><span className="ball GREEN N large fill">兔</span><span className="ball T large fill">+</span><span className="ball BLUE N large fill">鼠</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="ft">
                                                        <span className="drawtime">开奖时间:07-17 21:34（星期二）</span><span className="button1">往期开奖</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="current">
                                                <p className="hd">
                                                    <span className="issue"><em>第2018080期</em>&nbsp;&nbsp;截止时间:&nbsp;07-19 21:27 星期四</span>
                                                </p>
                                                <div className="result">
                                                    <div className="timer">
                                                        <div className="countdown-pc">
                                                            <div className="static-month">
                                                                <span className="card">07</span>
                                                            </div>
                                                            <div className="static-day">
                                                                <span className="card">19</span>
                                                            </div>
                                                            <div className="static-hour">
                                                                <span className="card">21</span>
                                                            </div>
                                                            <div className="static-minute">
                                                                <span className="card">27</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p>
                                                    <span>正常每周二、四、六开奖</span>
                                                </p>
                                            </div>

                                        </div>
                                    </TabPane>
                                    <TabPane tab="重庆时时彩" key="2">
                                        <div className="lottery-head-module ">
                                            <div className="last-draw">
                                                <div className="left">
                                                    <img src={sixPng}/>
                                                </div>
                                                <div className="right">
                                                    <p className="hd">
                                                        <span className="title1">重庆时时彩</span><span className="issue"><em>第2018079期</em>&nbsp;本期期开奖结果</span>
                                                    </p>
                                                    <div className="ant-carousel ant-carousel-vertical">
                                                        <div className="slick-initialized slick-slider slick-vertical">
                                                            <div className="slick-list">
                                                                <div className="slick-track">
                                                                    <p className="slick-slide slick-cloned result">
                                                                        <span className="ball BLUE N large fill">马</span><span className="ball GREEN N large fill">蛇</span><span className="ball BLUE N large fill">猪</span><span className="ball BLUE N large fill">猪</span><span className="ball BLUE N large fill">牛</span><span className="ball GREEN N large fill">兔</span><span className="ball T large fill">+</span><span className="ball BLUE N large fill">鼠</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="ft">
                                                        <span className="drawtime">开奖时间:07-17 11:34（星期二）</span><span className="button1">往期开奖</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="current">
                                                <p className="hd">
                                                    <span className="issue"><em>第2018080期</em>&nbsp;&nbsp;截止时间:&nbsp;07-19 21:27 星期四</span>
                                                </p>
                                                <div className="result">
                                                    <div className="timer">
                                                        <div className="countdown-pc">
                                                            <div className="static-month">
                                                                <span className="card">07</span>
                                                            </div>
                                                            <div className="static-day">
                                                                <span className="card">19</span>
                                                            </div>
                                                            <div className="static-hour">
                                                                <span className="card">21</span>
                                                            </div>
                                                            <div className="static-minute">
                                                                <span className="card">27</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p>
                                                    <span>正常每周二、四、六开奖</span>
                                                </p>
                                            </div>

                                        </div>
									</TabPane>
                                    <TabPane tab="分分彩" key="3">
                                        <div className="lottery-head-module ">
                                            <div className="last-draw">
                                                <div className="left">
                                                    <img src={sixPng}/>
                                                </div>
                                                <div className="right">
                                                    <p className="hd">
                                                        <span className="title1">分分彩</span><span className="issue"><em>第2018079期</em>&nbsp;本期期开奖结果</span>
                                                    </p>
                                                    <div className="ant-carousel ant-carousel-vertical">
                                                        <div className="slick-initialized slick-slider slick-vertical">
                                                            <div className="slick-list">
                                                                <div className="slick-track">
                                                                    <p className="slick-slide slick-cloned result">
                                                                        <span className="ball BLUE N large fill">马</span><span className="ball GREEN N large fill">蛇</span><span className="ball BLUE N large fill">猪</span><span className="ball BLUE N large fill">猪</span><span className="ball BLUE N large fill">牛</span><span className="ball GREEN N large fill">兔</span><span className="ball T large fill">+</span><span className="ball BLUE N large fill">鼠</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="ft">
                                                        <span className="drawtime">开奖时间:07-17 11:34（星期二）</span><span className="button1">往期开奖</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="current">
                                                <p className="hd">
                                                    <span className="issue"><em>第2018080期</em>&nbsp;&nbsp;截止时间:&nbsp;07-19 21:27 星期四</span>
                                                </p>
                                                <div className="result">
                                                    <div className="timer">
                                                        <div className="countdown-pc">
                                                            <div className="static-month">
                                                                <span className="card">07</span>
                                                            </div>
                                                            <div className="static-day">
                                                                <span className="card">19</span>
                                                            </div>
                                                            <div className="static-hour">
                                                                <span className="card">21</span>
                                                            </div>
                                                            <div className="static-minute">
                                                                <span className="card">27</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p>
                                                    <span>正常每周二、四、六开奖</span>
                                                </p>
                                            </div>

                                        </div>
									</TabPane>
                                    <TabPane tab="广西快3" key="4">
                                        <div className="lottery-head-module ">
                                            <div className="last-draw">
                                                <div className="left">
                                                    <img src={sixPng}/>
                                                </div>
                                                <div className="right">
                                                    <p className="hd">
                                                        <span className="title1">广西快3</span><span className="issue"><em>第2018079期</em>&nbsp;本期期开奖结果</span>
                                                    </p>
                                                    <div className="ant-carousel ant-carousel-vertical">
                                                        <div className="slick-initialized slick-slider slick-vertical">
                                                            <div className="slick-list">
                                                                <div className="slick-track">
                                                                    <p className="slick-slide slick-cloned result">
                                                                        <span className="ball BLUE N large fill">马</span><span className="ball GREEN N large fill">蛇</span><span className="ball BLUE N large fill">猪</span><span className="ball BLUE N large fill">猪</span><span className="ball BLUE N large fill">牛</span><span className="ball GREEN N large fill">兔</span><span className="ball T large fill">+</span><span className="ball BLUE N large fill">鼠</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="ft">
                                                        <span className="drawtime">开奖时间:07-17 11:34（星期二）</span><span className="button1">往期开奖</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="current">
                                                <p className="hd">
                                                    <span className="issue"><em>第2018080期</em>&nbsp;&nbsp;截止时间:&nbsp;07-19 21:27 星期四</span>
                                                </p>
                                                <div className="result">
                                                    <div className="timer">
                                                        <div className="countdown-pc">
                                                            <div className="static-month">
                                                                <span className="card">07</span>
                                                            </div>
                                                            <div className="static-day">
                                                                <span className="card">19</span>
                                                            </div>
                                                            <div className="static-hour">
                                                                <span className="card">21</span>
                                                            </div>
                                                            <div className="static-minute">
                                                                <span className="card">27</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p>
                                                    <span>正常每周二、四、六开奖</span>
                                                </p>
                                            </div>

                                        </div>
									</TabPane>
                                </Tabs>
							</div>
							<div className="contentR">
								{/*{热门跟投}*/}
								<div className="follow-bet-module">
									<div className="hd">
										<h2 className="box-title">热门跟投<span><Icon type="sync" theme="outlined" />换一批</span></h2>
									</div>
									<div className="items">
										<ul>
											<li>
												<div className="left">
													<div className="top">
														蜜汁翘臀 在<em>重庆时时彩</em> 20180718041期 第二球 投注 [<em>小</em>] 中奖 2029.50元
													</div>
													<div className="bot">
														<span className="action"><Icon type="like" />529</span>
														<em className="ant-list-item-action-split"></em>
														<span className="action"><Icon type="fork" />226</span>
													</div>
                                                </div>
												<div className="rBtn">
													<a><Icon type="fork" />投注</a>
												</div>
											</li>
                                            <li>
                                                <div className="left">
                                                    <div className="top">
                                                        蜜汁翘臀 在<em>重庆时时彩</em> 20180718041期 第二球 投注 [<em>小</em>] 中奖 2029.50元
                                                    </div>
                                                    <div className="bot">
                                                        <span className="action"><Icon type="like" />529</span>
                                                        <em className="ant-list-item-action-split"></em>
                                                        <span className="action"><Icon type="fork" />226</span>
                                                    </div>
                                                </div>
                                                <div className="rBtn">
                                                    <a><Icon type="fork" />投注</a>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="left">
                                                    <div className="top">
                                                        蜜汁翘臀 在<em>重庆时时彩</em> 20180718041期 第二球 投注 [<em>小</em>] 中奖 2029.50元
                                                    </div>
                                                    <div className="bot">
                                                        <span className="action"><Icon type="like" />529</span>
                                                        <em className="ant-list-item-action-split"></em>
                                                        <span className="action"><Icon type="fork" />226</span>
                                                    </div>
                                                </div>
                                                <div className="rBtn">
                                                    <a><Icon type="fork" />投注</a>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="left">
                                                    <div className="top">
                                                        蜜汁翘臀 在<em>重庆时时彩</em> 20180718041期 第二球 投注 [<em>小</em>] 中奖 2029.50元
                                                    </div>
                                                    <div className="bot">
                                                        <span className="action"><Icon type="like" />529</span>
                                                        <em className="ant-list-item-action-split"></em>
                                                        <span className="action"><Icon type="fork" />226</span>
                                                    </div>
                                                </div>
                                                <div className="rBtn">
                                                    <a><Icon type="fork" />投注</a>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="left">
                                                    <div className="top">
                                                        蜜汁翘臀 在<em>重庆时时彩</em> 20180718041期 第二球 投注 [<em>小</em>] 中奖 2029.50元
                                                    </div>
                                                    <div className="bot">
                                                        <span className="action"><Icon type="like" />529</span>
                                                        <em className="ant-list-item-action-split"></em>
                                                        <span className="action"><Icon type="fork" />226</span>
                                                    </div>
                                                </div>
                                                <div className="rBtn">
                                                    <a><Icon type="fork" />投注</a>
                                                </div>
                                            </li>
										</ul>
									</div>
								</div>
								{/*中奖快讯*/}
                                <div className="winning-module">
                                    <div className="inner">
                                        <div className="hd">
                                            <p className="p1">
                                                本站累计中奖
                                            </p>
                                            <p className="p2">
                                                超<em>2</em>亿<em>7000</em>万
                                            </p>
                                        </div>
                                        <div className="bd">
                                            <ul>
                                                <li>【北京赛车】i6p***<em>350.00元</em></li>
                                                <li>【重庆时时彩】jkt***<em>164.00元</em></li>
                                                <li>【加拿大28】77k***<em>110.00元</em></li>
                                                <li>【极速赛车】k1a***<em>404.00元</em></li>
                                                <li>【重庆时时彩】4sg***<em>1,000.00元</em></li>
                                                <li>【快3】bnh***<em>152.30元</em></li>
                                                <li>【加拿大28】rbf***<em>169.20元</em></li>
                                                <li>【极速赛车】5g7***<em>200.00元</em></li>
                                                <li>【快3】xmb***<em>330.00元</em></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
						</div>
					</div>
    			</div>
			</div>
        );
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps)(FirstPage)