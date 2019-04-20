/**
 * vn2 bingo
 */

import React, {Component} from 'react';
import {auth} from "globalAction";
import {connect} from 'react-redux';
import './bingo.scss'

class BingoPage extends Component {

    constructor (props){
        super();
    }
    onClickTCGame(GamePlatform){
        if (!auth()) {
            return;
        }
        let parma = {
            GamePlatform:GamePlatform,
            GameType:"Lottery",
            GameId:'',
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen('Bingo');
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })      
    }
    render() {
        let rprops = window.r.props("BingoPage");
        const ImageGallery = window.r.get("ImageGallery");
        const options = window.r.props("ImageGallery");
        const height = options.bingoHeight || options.height || "170px";
        return (
            <article id="bingo" className=" BGcolor-main">
                <div className="banner">
                    <ImageGallery width="100%" height={height} type="bingo_banner_imgs" imgtype='banner'></ImageGallery>
                </div>
                {rprops.supportKG? 
                    <div className="bingo-fname bingo-fname2">
                        <div className="container">
                            <div className="bing-desc-bbin wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <h3>
                                    <div className="bingo-title-img2" style={{visibility: "visible", animationName: "fadeInUp"}}></div>
                                </h3>
                                <span className="bing-desc-inco-bg"></span>
                                <p className="color-main">最全的彩票平台，最值得您信赖的移动端，一流的服务体验多样玩法<br/>简单刺激 ! 感受彩票无限乐趣 ! 让您随时随地极致享乐!</p>
                                <span className="bing-desc-inco-bg"></span>
                            </div>
                            <div className="row bingo-platform-list">
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,"KG")} >
                                        <img src={require("./bingo/bingo-inco_11.png")} className="bingo-platform-img"/>
                                        <span className="color-third">六合彩</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,"KG")} >
                                        <img src={require("./bingo/bingo-inco_13.png")} className="bingo-platform-img"/>
                                        <span className="color-third">3D彩</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,"KG")} >
                                        <img src={require("./bingo/bingo-inco_15.png")} className="bingo-platform-img"/>
                                        <span className="color-third">加拿大卑斯</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,"KG")} >
                                        <img src={require("./bingo/bingo-inco_17.png")} className="bingo-platform-img"/>
                                        <span className="color-third">北京快乐捌</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,"KG")} >
                                        <img src={require("./bingo/bingo-inco_23.png")} className="bingo-platform-img"/>
                                        <span className="color-third">上海时时乐</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,"KG")} >
                                        <img src={require("./bingo/bingo-inco_24.png")} className="bingo-platform-img"/>
                                        <span className="color-third">重庆时时乐</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,"KG")} >
                                        <img src={require("./bingo/bingo-inco_25.png")} className="bingo-platform-img"/>
                                        <span className="color-third">江西时时乐</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,"KG")} >
                                        <img src={require("./bingo/bingo-inco_26.png")} className="bingo-platform-img"/>
                                        <span className="color-third">天津时时乐</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>:null}

                <div className="bingo-fname BGcolor-main bingo-bbin">
                    <div className="container">
                        <div className="bing-desc-bbin wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                            <h3>
                                <div className="bingo-title-img"></div>
                            </h3>
                            <span className="bing-desc-inco-bg "></span>
                            <p className="color-main">最全的彩票平台，最值得您信赖的移动端，一流的服务体验多样玩法<br/>
                                简单刺激 ! 感受彩票无限乐趣 ! 让您随时随地极致享乐!</p>
                            <span className="bing-desc-inco-bg"></span>
                        </div>
                        <div className="row bingo-platform-list">
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                    <img src={require("./bingo/bingo-inco_11.png")} className="bingo-platform-img"/>
                                        <span className="color-third">六合彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                    <img src={require("./bingo/bingo-inco_13.png")} className="bingo-platform-img"/>
                                        <span className="color-third">3D彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                    <img src={require("./bingo/bingo-inco_15.png")} className="bingo-platform-img"/>
                                        <span className="color-third">加拿大卑斯</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                    <img src={require("./bingo/bingo-inco_17.png")} className="bingo-platform-img"/>
                                        <span className="color-third">北京快乐捌</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a  target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                    <img src={require("./bingo/bingo-inco_23.png")}  className="bingo-platform-img"/>
                                        <span className="color-third">上海时时乐</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                    <img src={require("./bingo/bingo-inco_24.png")}  className="bingo-platform-img"/>
                                        <span className="color-third">重庆时时乐</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a  target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                    <img src={require("./bingo/bingo-inco_25.png")} className="bingo-platform-img"/>
                                        <span className="color-third">江西时时乐</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                    <img src={require("./bingo/bingo-inco_26.png")}  className="bingo-platform-img"/>
                                        <span className="color-third">天津时时乐</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                    <img src={require("./bingo/bingo-inco_31.png")}  className="bingo-platform-img"/>
                                        <span className="color-third">天津十分彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                    <img src={require("./bingo/bingo-inco_33.png")} className="bingo-platform-img"/>
                                        <span className="color-third">广东十分彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                    <img src={require("./bingo/bingo-inco_34.png")} className="bingo-platform-img"/>
                                        <span className="color-third">广西十分彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                    <img src={require("./bingo/bingo-inco_35.png")} className="bingo-platform-img"/>
                                        <span className="color-third">排列三</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                    <img src={require("./bingo/bingo-inco_40.png")} className="bingo-platform-img"/>
                                        <span className="color-third">BB快乐彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a  target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                    <img src={require("./bingo/bingo-inco_41.png")} className="bingo-platform-img"/>
                                        <span className="color-third">北京PK拾</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a  target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                    <img src={require("./bingo/bingo-inco_42.png")} className="bingo-platform-img"/>
                                        <span className="color-third">BB快乐彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                    <img src={require("./bingo/bingo-inco_43.png")} className="bingo-platform-img"/>
                                        <span className="color-third">澳洲商业区</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>


            </article>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {}
);

export default connect(mapStateToProps, {})(BingoPage);