/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import './PtPromotion.scss'

class PtPromotion extends Component {

    render() {

        return (
            <div className="Pt_promotion">
                <div className="part1">
                    <div className="win">
                        <div className="title"><h2>获奖者</h2></div>
                        <div className="winner">
                            <ul>
                                <li>
                                    <div className="icon"></div>
                                    <div className="txt">
                                        <p>老虎机俱乐部急速通关</p>
                                        <p>恭喜308名会员达到要求，获得奖金！</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon"></div>
                                    <div className="txt">
                                        <p>出勤奖励888周周送</p>
                                        <p>恭喜2573名会员达到要求，获得888奖金！！！</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon"></div>
                                    <div className="txt">
                                        <p>血战到底再赢158</p>
                                        <p>恭喜156名会员达到要求，获得158奖金！</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon"></div>
                                    <div className="txt">
                                        <p>幸运注单，天降8888</p>
                                        <p>恭喜会员a926***达到要求，获得888奖金！</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon"></div>
                                    <div className="txt">
                                        <p>老虎机千百倍</p>
                                        <p>恭喜会员zbw***达到要求，获得188奖金！</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="number">
                        <div className="title">最高奖金</div>
                        <div className="num">
                            <span className="jackpot">649,649,231.01</span>
                        </div>
                    </div>
                </div>
                <div className="part2">
                    <div className="left_pic"><Link to="/promotions"></Link></div>
                    <div className="right_pic"><Link to="/promotions"></Link></div>
                </div>
                <div className="part3">
                    <div className="p-btn">
                        <div className="more"><Link to="/promotions">更多优惠</Link></div>
                    </div>
                    <div className="QR-code">
                        <img src={"/api/v0/qcode.png?code=" + encodeURIComponent("https://" + location.hostname + "/_promotion/web/index.html")} alt=""/>
                        <p>下载手机客户端</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {}
);

export default connect(mapStateToProps, {})(PtPromotion);