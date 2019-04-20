import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import "./FirstPage.scss";

class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {tab:"MgPart"}
    }
    initAll() {
        window.renderOwl('.casino-list', {
            items:1,
            dots:true,
            autoplay:true,
            autoplayHoverPause:true,
            autoplayTimeout:3000,
            loop:true
        });
        window.renderOwl('.sport-list', {
            items:1,
            dots:true,
            autoplay:true,
            autoplayHoverPause:true,
            autoplayTimeout:3000,
            loop:true,
        });
        window.renderOwl('.game-list', {
            items:1,
            dots:true,
            autoplay:true,
            autoplayHoverPause:true,
            autoplayTimeout:3000,
            loop:true,
        });
        window.Util.index();
    }
    componentDidMount() {
        this.initAll();
    }
    componentDidUpdate() {
        this.initAll();
    }
    render() {
        const ImageGallery = window.r.get("ImageGallery");
        const NoticeBar = window.r.get("NoticeBar");
        const FirstPagePromotionAlert = window.r.get("FirstPagePromotionAlert");
        const appName = window.config.appName;
        return (
            <div className="pppPage">
                {FirstPagePromotionAlert && <FirstPagePromotionAlert/>} 
                <ImageGallery height="385px" type="pc_home_images"></ImageGallery>
                <div className="notice-block">
                    <div className="note">
                        &nbsp;<i className="glyphicon glyphicon-volume-up"></i>&nbsp;<span>公告</span>
                        <NoticeBar ></NoticeBar>
                    </div>
                </div>
                <div className="info-bar">
                    <div className="inner">
                        <ul className="leftBox">
                            <li>
                                <Link to="/register">
                                    <div className="icon"></div>
                                    <p>成为会员</p>
                                    <i className="rightArrow glyphicon glyphicon-chevron-right"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to="/deposit">
                                    <div className="icon"></div>
                                    <p>充直存款</p>
                                    <i className="rightArrow glyphicon glyphicon-chevron-right"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to="/games">
                                    <div className="icon"></div>
                                    <p>玩遍{appName}</p>
                                </Link>
                            </li>
                        </ul>
                        <div className="rightBox">
                            <Link to="/register">
                                <div className="pp-btn">
                                   <span className="register-icon"></span>立即开户
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="content content1">
                    <div className="p-box p-box1">
                        <div className="box-item casino">
                            <div className="slider casino-list " style={{width:"100%"}}>
                                <div className="item">
                                    <img src={require("./images/pppIndex/casino/S_01.png")} alt=""/>
                                    <div className="c-info"><span>AG亚洲厅</span><spna>vip包桌独享-创新玩法层出不穷</spna></div>
                                    <Link to="casino">
                                        <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <img src={require("./images/pppIndex/casino/S_02.png")} alt=""/>
                                    <div className="c-info"><span>OG东方厅</span><spna>好路多台 实时输赢排行榜-把握赢利机会</spna></div>
                                    <Link to="casino">
                                        <div className="into">
                                            <div className="go">
                                                <p className="mask"></p>
                                                <p className="text">立即前往</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <img src={require("./images/pppIndex/casino/S_03.png")} alt=""/>
                                    <div className="c-info"><span>AB欧博厅</span><spna>老牌实力平台 独创金臂模式-多种玩法游戏丰富</spna></div>
                                    <Link to="casino">
                                        <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <img src={require("./images/pppIndex/casino/S_04.png")} alt=""/>
                                    <div className="c-info"><span>PT欧洲厅</span><spna>实况Casino 即时下注-足不出户，体验真实投注</spna></div>
                                    <Link to="casino">
                                        <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <img src={require("./images/pppIndex/casino/S_05.png")} alt=""/>
                                    <div className="c-info"><span>MG美洲厅</span><spna>真实赌场标准营运 画面精致，系统安全稳定</spna></div>
                                    <Link to="casino">
                                        <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <img src={require("./images/pppIndex/casino/S_06.png")} alt=""/>
                                    <div className="c-info"><span>BBIN台湾厅</span><spna>刺激好玩 多种玩法创新不无聊</spna></div>
                                    <Link to="casino">
                                        <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <img src={require("./images/pppIndex/casino/S_07.png")} alt=""/>
                                    <div className="c-info"><span>BBIN台湾厅</span><spna>真实体验 多重玩法公平公正</spna></div>
                                    <Link to="casino">
                                        <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <img src={require("./images/pppIndex/casino/S_08.png")} alt=""/>
                                    <div className="c-info"><span>SUNBET申博厅</span><spna>系统安全稳定 玩的开心玩的安心</spna></div>
                                    <Link to="casino">
                                        <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="box-item sport">
                            <div className="slider sport-list" style={{width:"100%"}}>
                                <div className="item">
                                    <img src={require("./images/pppIndex/sport/s1.png")} alt=""/>
                                    <div className="c-info"><span>沙巴体育</span><spna>多种玩法游戏丰富</spna></div>
                                    <Link to="/sport">
                                        <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <img src={require("./images/pppIndex/sport/s2.png")} alt=""/>
                                    <div className="c-info"><span>OPUS体育</span><spna>快速多元赢利双收</spna></div>
                                    <Link to="/sport">
                                        <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <img src={require("./images/pppIndex/sport/s3.png")} alt=""/>
                                    <div className="c-info"><span>皇冠体育</span><spna>公平公正值得您信賴</spna></div>
                                    <Link to="/sport">
                                        <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <img src={require("./images/pppIndex/sport/s4.png")} alt=""/>
                                    <div className="c-info"><span>188体育</span><spna>多种赛事供您选择</spna></div>
                                    <Link to="/sport">
                                        <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="box-item promotion">
                            <div className="title">最新中奖公告</div>
                            <div className="prom-list">
                                <div className="p-item">
                                    <div className="inside pic"></div>
                                    <div className="inside txt">
                                        <p>恭喜<span>qeu**5</span>会员</p>
                                        <p>在 <span>年年有馀</span> 赢得<span>¥252904</span>元</p>
                                    </div>
                                </div>
                                <div className="p-item">
                                    <div className="inside pic"></div>
                                    <div className="inside txt">
                                        <p>恭喜<span>kee**8</span>会员</p>
                                        <p>在 <span>招财进宝</span> 赢得<span>¥341007</span>元</p>
                                    </div>
                                </div>
                                <div className="p-item">
                                    <div className="inside pic"></div>
                                    <div className="inside txt">
                                        <p>恭喜<span>ben**4</span>会员</p>
                                        <p>在 <span>众神时代</span> 赢得<span>¥202904</span>元</p>
                                    </div>
                                </div>
                                <div className="p-item">
                                    <div className="inside pic"></div>
                                    <div className="inside txt">
                                        <p>恭喜<span>rtu**7</span>会员</p>
                                        <p>在 <span>大蓝</span> 赢得<span>¥122506</span>元</p>
                                    </div>
                                </div>
                                <div className="p-item">
                                    <div className="inside pic"></div>
                                    <div className="inside txt">
                                        <p>恭喜<span>plk**5</span>会员</p>
                                        <p>在 <span>水上乐园</span> 赢得<span>¥240574</span>元</p>
                                    </div>
                                </div>
                                <div className="p-item">
                                    <div className="inside pic"></div>
                                    <div className="inside txt">
                                        <p>恭喜<span>te9**8</span>会员</p>
                                        <p>在 <span>侏罗纪</span> 赢得<span>¥552110</span>元</p>
                                    </div>
                                </div>
                                <div className="p-item">
                                    <div className="inside pic"></div>
                                    <div className="inside txt">
                                        <p>恭喜<span>hju**0</span>会员</p>
                                        <p>在 <span>金鱼</span> 赢得<span>¥252103</span>元</p>
                                    </div>
                                </div>
                                <div className="p-item">
                                    <div className="inside pic"></div>
                                    <div className="inside txt">
                                        <p>恭喜<span>gg7**5</span>会员</p>
                                        <p>在 <span>龙宫</span> 赢得<span>¥182904</span>元</p>
                                    </div>
                                </div>
                                <div className="p-item">
                                    <div className="inside pic"></div>
                                    <div className="inside txt">
                                        <p>恭喜<span>lg7**8</span>会员</p>
                                        <p>在 <span>鲤鱼门</span> 赢得<span>¥352900</span>元</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-box p-box2">
                        <div className="box-item bingo">
                            <div className="slider bingo-list">
                                <div className="title">彩票投注</div>
                                <div className="pic">
                                    <div className="c-info"><span>彩票</span><spna>100%官方赛果</spna></div>
                                    <Link to="/bingo"> <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div></Link>
                                </div>
                            </div>
                        </div>
                        <div className="box-item game">
                            <div className="slider game-list" style={{width:"100%"}}>
                                <div className="item">
                                    <img src={require("./images/pppIndex/game/g2.png")} alt=""/>
                                    <div className="c-info"><span>AG</span><spna>全球首创漫威游戏 创意无限</spna></div>
                                    <Link to="games">
                                        <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <img src={require("./images/pppIndex/game/g8.png")} alt=""/>
                                    <div className="c-info"><span>BBIN</span><spna>独有视频扑克和纸牌游戏，全新玩法，欢乐开局</spna></div>
                                    <Link to="games">
                                        <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <img src={require("./images/pppIndex/game/g7.png")} alt=""/>
                                    <div className="c-info"><span>HB</span><spna>老牌实力平台 独创金臂模式-多种玩法游戏丰富</spna></div>
                                    <Link to="games">
                                        <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <img src={require("./images/pppIndex/game/g3.png")} alt=""/>
                                    <div className="c-info"><span>OPUS</span><spna>亚洲老牌 带您穿越古今</spna></div>
                                    <Link to="games">
                                        <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <img src={require("./images/pppIndex/game/g1.png")} alt=""/>
                                    <div className="c-info"><span>MG</span><spna>真实赌场标准营运 画面精致，系统安全稳定</spna></div>
                                    <Link to="games">
                                        <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <img src={require("./images/pppIndex/game/g4.png")} alt=""/>
                                    <div className="c-info"><span>PT</span><spna>刺激好玩 多种玩法创新不无聊</spna></div>
                                    <Link to="games">
                                        <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <img src={require("./images/pppIndex/game/g5.png")} alt=""/>
                                    <div className="c-info"><span>YOPLAY</span><spna>首创“多人模式”街机游戏，一起争夺Jackpot巨奖！</spna></div>
                                    <Link to="games">
                                        <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div>
                                    </Link>
                                </div>
                                <div className="item">
                                    <img src={require("./images/pppIndex/game/g6.png")} alt=""/>
                                    <div className="c-info"><span>QT</span><spna>首创线上独立JACKPOT 机台大厅，开创老虎机XIN时代！</spna></div>
                                    <Link to="games">
                                        <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="box-item agent">
                            <div className="agent-list">
                                <div className="title">代理加盟</div>
                                <div className="pic">
                                    <a href="/agent.html" target="_blank"> <div className="into"><div className="go"><p className="mask"></p><p className="text">立即前往</p></div></div></a>
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
        user : state.user,
        views:state.views,
        global: state.global,
        bestGames: state.game.bestGames,
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(FirstPage)