import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';
import './GamesPageTop3.scss'
export default class GamePagesTop extends Component {

    constructor(props) {
        super(props);
        this.state = {tab: ""}
    }

    onMoveTab(tab) {
        this.setState({tab: tab});
    }

    render() {

        const num = window.numbers["games"] || ("888," + Math.floor(Math.random() * 899 + 100) + "," + Math.floor(Math.random() * 899 + 100));
        const ImageGallery = window.r.get("ImageGallery");
        const NoticeBar = window.r.get("GamesPageNoticeBar");
        return (
            <article id="game3">
                <div className="container">
                    <div className="one">
                        <div className="top">
                            <h1>TOP排行榜</h1>
                            <div className="box">
                                <ul>
                                    <li onMouseOver={this.onMoveTab.bind(this, "tab1")}>
                                        <span>1</span><span>轮盘 I 蓝宝石</span></li>
                                    <div className={this.state.tab === "tab1" ? "pic pic1 now" : "hide"}><img alt=""/>
                                    </div>
                                    <li onMouseOver={this.onMoveTab.bind(this, "tab2")}><span>2</span><span>麻将老虎机</span>
                                    </li>
                                    <div className={this.state.tab === "tab2" ? "pic pic2 now" : "hide"}><img alt=""/>
                                    </div>
                                    <li onMouseOver={this.onMoveTab.bind(this, "tab3")}><span>3</span><span>日日进财</span>
                                    </li>
                                    <div className={this.state.tab === "tab3" ? "pic pic3 now" : "hide"}><img alt=""/>
                                    </div>
                                    <li onMouseOver={this.onMoveTab.bind(this, "tab4")}><span>4</span><span>日日生财</span>
                                    </li>
                                    <div className={this.state.tab === "tab4" ? "pic pic4 now" : "hide"}><img alt=""/>
                                    </div>
                                    <li onMouseOver={this.onMoveTab.bind(this, "tab5")}>
                                        <span>5</span><span>禁忌王座（手机）</span></li>
                                    <div className={this.state.tab === "tab5" ? "pic pic5 now" : "hide"}><img alt=""/>
                                    </div>
                                    <li onMouseOver={this.onMoveTab.bind(this, "tab6")}><span>6</span><span>复古花园</span>
                                    </li>
                                    <div className={this.state.tab === "tab6" ? "pic pic6 now" : "hide"}><img alt=""/>
                                    </div>
                                    <li onMouseOver={this.onMoveTab.bind(this, "tab7")}>
                                        <span>7</span><span>21点之富贵临门</span></li>
                                    <div className={this.state.tab === "tab7" ? "pic pic7 now" : "hide"}><img alt=""/>
                                    </div>
                                    <li onMouseOver={this.onMoveTab.bind(this, "tab8")}><span>8</span><span>德州扑克</span>
                                    </li>
                                    <div className={this.state.tab === "tab8" ? "pic pic8 now" : "hide"}><img alt=""/>
                                    </div>

                                </ul>
                            </div>
                        </div>
                        <div className="ad_box">
                            <div className="boxA a1">
                                <div className="ad"></div>
                                <div className="txt">
                                    <div className="t">
                                        <p>PT老虎机</p>
                                        <p>PT SLOTS</p>
                                    </div>
                                    <div className="a-btn"><Link to="/pt">立即开始</Link></div>
                                </div>
                            </div>
                            <div className="boxA a2">
                                <div className="ad"></div>
                                <div className="txt">
                                    <div className="t">
                                        <p>MG老虎机</p>
                                        <p>MG SLOTS</p>
                                    </div>
                                    <div className="a-btn"><Link to="/mg">立即开始</Link></div>
                                </div>
                            </div>
                            <div className="boxA a3">
                                <div className="ad"></div>
                                <div className="txt">
                                    <div className="t">
                                        <p>优惠活动</p>
                                        <p>PROMOTION</p>
                                    </div>
                                    <div className="a-btn"><Link to="/promotions">立即前往</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="two">
                        <div className="pot">
                            <div className="winner">
                                <div className="title">
                                    <span>大赢家</span>
                                    <span>WINNERS</span>
                                </div>
                                <div className="run">
                                    <marquee className="run-cont" ref="affiche" direction="up"
                                             style={{loop: -1, scrollAmount: 1,scrollDelay:20, }} onMouseOut={(e) => {
                                        this.refs.affiche.start()
                                    }} onMouseOver={(e) => {
                                        this.refs.affiche.stop()
                                    }}>

                                        <div className="dzyy-b-list" style={{clear: "both", marginBottom: "10px"}}>
                                            <img className="m1" alt=""/>
                                            <div className="dzyy_right">
                                                <span style={{color: "red"}}> 恭喜</span><span style={{fontSize: "12px"}}>来自[陕西西安]玩家suns*****</span>
                                                <br/>
                                                <span style={{fontSize: "12px"}}> 在</span><span
                                                style={{color: "#FFE500"}}>
                                                <span style={{color: "#FFE500", fontSize: "12px"}}>【篮球巨星】</span>
                                                </span><span style={{fontSize: "12px"}}>中 赢得</span><i
                                                style={{color: "#ffde00", fontStyle: "normal", fontSize: "14px"}}><span
                                                style={{fontSize: "12px"}}>￥50,880</span></i>
                                                <br/>
                                            </div>
                                        </div>
                                        <div className="dzyy-b-list" style={{clear: "both", marginBottom: "10px"}}>
                                            <br/>
                                        </div>
                                        <div className="dzyy-b-list" style={{clear: "both", marginBottom: "10px"}}>
                                            <img className="m2" alt=""/>
                                            <div className="dzyy_right">
                                                <span style={{color: "red"}}> 恭喜</span><span style={{fontSize: "12px"}}>来自[四川绵阳]玩家yyaan*****</span>
                                                <br/>
                                                <span style={{fontSize: "12px"}}> 在</span><span
                                                style={{color: "#FFE500"}}><span style={{color: "#FFE500"}}><span
                                                style={{color: "#FFE500", fontSize: "12px"}}>【超级888】</span>
                                                </span>
                                                </span><span style={{fontSize: "12px"}}>中赢得</span><i
                                                style={{color: "#ffde00", fontStyle: "normal", fontSize: "14px"}}><span
                                                style={{fontSize: "12px"}}>￥16,238</span></i>
                                                <br/>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="dzyy-b-list" style={{clear: "both", marginBottom: "10px"}}>
                                            <br/>
                                        </div>
                                        <div className="dzyy-b-list" style={{clear: "both", marginBottom: "10px"}}>
                                            <img className="m3" alt=""/>
                                            <div className="dzyy_right">
                                                <span style={{color: "red"}}> 恭喜</span><span style={{fontSize: "12px"}}>来自[广东湛江]玩家f845****</span>
                                                <br/>
                                                <span style={{fontSize: "12px"}}> 在 </span><span
                                                style={{color: "#FFE500"}}><span
                                                style={{color: "#FFE500", fontSize: "12px"}}>【</span><span
                                                style={{color: "#FFE500", fontSize: "12px"}}>冰河世界】</span>
                                                 </span><span style={{fontSize: "12px"}}>中赢得</span><i
                                                style={{color: "#ffde00", fontStyle: "normal", fontSize: "14px"}}><span
                                                style={{fontSize: "12px"}}><span
                                                style={{whiteSpace: "normal", color: "#ffde00", fontSize: "14px"}}><span
                                                style={{fontSize: "12px"}}>￥37,020</span></span></span></i>
                                                <br/>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="dzyy-b-list" style={{clear: "both", marginBottom: "10px"}}>
                                            <br/>
                                            <img className="m4" alt=""/>
                                            <div className="dzyy_right">
                                                <span style={{color: "red"}}> 恭喜</span><span style={{fontSize: "12px"}}>来自</span><span
                                                style={{whiteSpace: "normal"}}><span
                                                style={{whiteSpace: "normal", fontSize: "12px"}}>来自[山东滕州</span><span
                                                style={{whiteSpace: "normal", fontSize: "12px"}}>]玩家wang</span><span
                                                style={{whiteSpace: "normal", fontSize: "12px"}}>***</span><span
                                                style={{whiteSpace: "normal"}}></span></span>
                                                <br/>
                                                <span style={{fontSize: "12px"}}> 在</span><span
                                                style={{whiteSpace: "normal"}}><span style={{color: "#FFE500"}}><span
                                                style={{color: "#FFE500", fontSize: "12px"}}><span
                                                style={{color: "#FFE500"}}>【超级狮子】</span>
                                                </span>
                                                </span><span style={{fontSize: "12px"}}>中赢得</span></span><span
                                                style={{whiteSpace: "normal", color: "#ffde00", fontSize: "12px"}}>￥126,543.86</span>
                                                <br/>
                                            </div>
                                        </div>
                                        <div className="dzyy-b-list" style={{clear: "both", marginBottom: "10px"}}>
                                            <br/>
                                        </div>
                                    </marquee>
                                </div>
                            </div>
                            <div className="money">
                                <div className="number"><span className="jackpot" data-key="games">{num}</span></div>
                            </div>
                        </div>
                        <div className="banner"><ImageGallery height="140px" type="game_banner_imgs"></ImageGallery>
                        </div>
                    </div>
                    <div className="three">
                        <NoticeBar marqueeCls="broadcast-content z_in" marqueeWidth="905px" type="notice_slot"></NoticeBar>
                    </div>
                    <div className="four">
                        <div className="f-title">累计奖池</div>
                        <div className="f-games">
                            <ul>
                                <li>
                                    <p>高速公路之王</p>
                                    <p>￥<span className="jackpot">416,522.26</span></p>
                                </li>
                                <li>
                                    <p>神的时代：激情四</p>
                                    <p>￥<span className="jackpot">556,772.32</span></p>
                                </li>
                                <li>
                                    <p>金色召集</p>
                                    <p>￥<span className="jackpot">496,685.15</span></p>
                                </li>
                                <li>
                                    <p>AG捕鱼王</p>
                                    <p>￥<span className="jackpot">625,875.18</span></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}