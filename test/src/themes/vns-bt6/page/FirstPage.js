import React, { Component } from 'react';
import "./css/FirstPage.scss";
import { connect } from 'react-redux';
import { Link,browserHistory} from 'react-router';

class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {tab:1}
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    changePT(LinkID){
        window.actions.ChangeLinkID(LinkID);
        browserHistory.push("/games")
    }
    render() {
        const ImageGallery = window.r.get("ImageGallery");
        const NoticeBar = window.r.get("NoticeBar");
        const promotionLink = this.props.remoteSysConfs.channel_push_url;
        const HijackAlert = window.r.get("hijackAlert");
        return (
            <div className="gdhFirst">
                 {HijackAlert && <HijackAlert/>}
                <div className="noticeBox">
                    <div className="note"><NoticeBar ></NoticeBar></div>
                    <div className="slider"><ImageGallery height="360px" imgtype='slider'></ImageGallery></div>
                    <div className="slider-bottom-box">
                        <div className="slider-inline-box">
                            <Link to="/register">注册</Link>
                            <Link to="/deposit">存款</Link>
                            <Link to="/withdraw">取款</Link>
                            <Link to="/promotions">优惠</Link>
                            <a href="/agent.html" target="_blank">代理</a>
                            <a href="/help.html" target="_blank">新手</a>
                        </div>
                    </div>
                </div>
                <div className="main home-slots">
                    <h3>电子游戏 SLOT MACHINE</h3>
                    <div className="jackpot" >8,403,992.89</div>
                    <div className="slot-hot">
                        <div className="data-hot01" onClick = {this.changePT.bind(this,"AG")}>
                            <label>AG捕鱼王</label>
                            <span>
                                <i className="fa fa-heart"></i> 87,100
                            </span>
                        </div>
                        <div className="data-hot02" onClick = {this.changePT.bind(this,"MG2")}>
                            <label>摆脱</label>
                            <span>
                                <i className="fa fa-heart"></i> 87,100
                            </span>
                        </div>
                        <div className="data-hot03" onClick = {this.changePT.bind(this,"HB")}>
                            <label>糖果派对</label>
                            <span>
                                <i className="fa fa-heart"></i> 87,100
                            </span>
                        </div>
                        <div className="data-hot04" onClick = {this.changePT.bind(this,"AG")}>
                            <label>水果拉霸</label>
                            <span>
                                <i className="fa fa-heart"></i> 87,100
                            </span>
                        </div>
                    </div>
                    <ul className="slot-tab">
                        <li className="game-box-mg" onClick={this.changePT.bind(this,"MG2")}></li>
                        <li className="game-box-pt" onClick={this.changePT.bind(this,"PT")}></li>
                        <li className="game-box-ag" onClick={this.changePT.bind(this,"AG")}></li>
                        <li className="game-box-bb" onClick={this.changePT.bind(this,"BBIN")}></li>
                        <li className="game-box-hb" onClick={this.changePT.bind(this,"HB")}></li>
                        <li className="game-box-cq" onClick={this.changePT.bind(this,"CQ")}></li>
                        <li className="game-box-qt" onClick={this.changePT.bind(this,"QT")}></li>
                        <li className="game-box-by" onClick={()=>{browserHistory.push("/ag")}}></li>
                    </ul>
                    <div className="home-lobby">
                        <div className="wrapper">
                            <h3>
                                更多精彩 尽在<label>威尼斯人娱乐城</label>
                                <span>More exciting to do in the Venetian Entertainment City</span>
                            </h3>
                            <Link className="live" to="/casino">
                                <label>真人娱乐 LIVE DEALER</label>
                                <div className="line"></div>
                                <p><span>太阳城娱乐城</span>集合八大真人娱乐平台，为您提供最顶级的娱乐体验，真人娱乐场天天返水高达1.2%</p>
                            </Link>
                            <Link className="sport" to="/sport">
                                <label>体育赛事 SPORT</label>
                                <div className="line"></div>
                                <p>英超、意甲、德甲、西甲等世界足坛顶尖赛事，让您畅享足球赛事的同时可以时刻体验体育投注的魅力。</p>
                            </Link>
                            <Link className="lottery" to="/bingo">
                                <label>彩票游戏 LOTTERY</label>
                                <div className="line"></div>
                                <p>江西时时彩，新疆时时彩，天津时时彩，广东快乐十分等，六合彩赔率业界最高48.5倍</p>
                            </Link>
                        </div>
                    </div>

                    {/* <div className="pa2">
                        <div className="nav">
                            <ul>
                                <li onClick={this.changePT.bind(this,"AG")}><Link to="/games"></Link></li>
                                <li onClick={this.changePT.bind(this,"MG2")}><Link to="/games"></Link></li>
                                <li onClick={this.changePT.bind(this,"BBIN")}><Link to="/games"></Link></li>
                            </ul>
                        </div>
                        <div className="games">
                            <div className="person"></div>
                            <div className="items">
                                <ul>
                                    <li><Link to="/games" onClick = {this.changePT.bind(this,"BBIN")}><span>开始游戏</span></Link></li>
                                    <li><Link to="/games" onClick = {this.changePT.bind(this,"PT")}><span>开始游戏</span></Link></li>
                                    <li><Link to="/games" onClick = {this.changePT.bind(this,"HB")}><span>开始游戏</span></Link></li>
                                    <li><Link to="/games" onClick = {this.changePT.bind(this,"BBIN")}><span>开始游戏</span></Link></li>
                                    <li><Link to="/games" onClick = {this.changePT.bind(this,"AG")}><span>开始游戏</span></Link></li>
                                    <li><Link to="/games" onClick = {this.changePT.bind(this,"BBIN")}><span>开始游戏</span></Link></li>
                                    <li><Link to="/games" onClick = {this.changePT.bind(this,"BBIN")}><span>开始游戏</span></Link></li>
                                    <li><Link to="/games" onClick = {this.changePT.bind(this,"BBIN")}><span>开始游戏</span></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="pa3">
                        <ul>
                            <li><Link to="/casino"></Link></li>
                            <li><Link to="/sport"></Link></li>
                            <li><Link to="/bingo"></Link></li>
                        </ul>
                    </div> */}
                    <div className="pa4">
                        <div className="text">
                            <div className="group">
                                <div className="icons"></div>
                                <p>全新模式，新颖设计更耐玩，汇集诸多精彩壹壹呈现；各国博彩精英、世界顶级博彩服务团队打造，享受随时随地、足不出户的博彩“游戏人生”!</p>
                                <div className="more"><a href={promotionLink} target="_blank">更多</a></div>
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
        remoteSysConfs:state.remoteSysConfs
    }
);

export default connect(mapStateToProps, {})(FirstPage);