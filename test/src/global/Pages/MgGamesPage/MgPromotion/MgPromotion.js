/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './MgPromotion.scss'

class MgGamesPage extends Component {

    render() {
        const MgGamesTop = window.r.get("MgGamesTop");
        const NoticeBar = window.r.get("MgGamesNoticeBar");
        const GameListPanel = window.r.get("GameListPanel");

        return (
            <div className="Mg_promotion">
                <div className="left-box">
                    <div className="pic"></div>
                    <div className="text">
                        <h2>【AG捕鱼王II 】380万大奖</h2>
                        <p>来自湖北的王先生w***215在《AG捕鱼王II》中388万大奖，新葡京对此表示祝贺</p>
                    </div>
                </div>
                <div className="right-box">
                    <ul>
                        <li>
                            <div className="icon icon1"></div>
                            <div className="txt">
                                <p className="title">【老虎机俱乐部急速通关竞赛】</p>
                                <p>恭喜998名会员达到要求，获得奖金！</p>
                            </div>
                        </li>
                        <li>
                            <div className="icon icon2"></div>
                            <div className="txt">
                                <p className="title">【出勤奖励888周周送】</p>
                                <p>恭喜4581名会员达到要求，获得888奖金！</p>
                            </div>
                        </li>
                        <li>
                            <div className="icon icon3"></div>
                            <div className="txt">
                                <p className="title">【血战到底再赢158】</p>
                                <p>恭喜246名会员达到要求，获得158奖金！</p>
                            </div>
                        </li>
                        <li>
                            <div className="icon icon4"></div>
                            <div className="txt">
                                <p className="title">【幸运注单，天降8888】</p>
                                <p>恭喜会员eva8****达到要求,获得3888奖金！</p>
                            </div>
                        </li>
                        <li>
                            <div className="icon icon5"></div>
                            <div className="txt">
                                <p className="title">【老虎机千百倍】</p>
                                <p>恭喜会员vinc****达到要求，获得188奖金！</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {}
);

export default connect(mapStateToProps, {})(MgGamesPage);