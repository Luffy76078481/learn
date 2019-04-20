/**
 * Created by xm on 2017/5/8.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import './css/bingo.scss'
import {auth} from "globalAction";
class BingoPage extends Component {

    constructor (props){
        super();
    }
    
    onClickGame() {
        var gameLink = window.configHelper.getGamePlayLink(window.configHelper.BBIN_bingo_id);
        window.actions.authToLink(gameLink);
    }


    onClickKenoGame() {
        var gameLink = window.configHelper.getGamePlayLink(window.configHelper.KG_bingo_id);
        window.actions.authToLink(gameLink);
       
    }
    onClickTCGame(GamePlatform) {
        // var gameLink = window.configHelper.getGamePlayLink(window.configHelper.CG_bingo_id);
        // window.actions.authToLink(gameLink);
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
    onClickTFCame() {
        var gameLink = window.configHelper.getGamePlayLink(window.configHelper.FC_bingo_id);
        window.actions.authToLink(gameLink);
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
                {rprops.supportCG?
                    <div className="bingo-fname bingo-fname3">
                        <div className="container">
                            <div className="bing-desc-bbin wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <h3>
                                    <div className="bingo-title-img3" style={{visibility: "visible", animationName: "fadeInUp"}}></div>
                                </h3>
                                <span className="bing-desc-inco-bg"></span>
                                <p className="color-main">最全的彩票平台，最值得您信赖的移动端，一流的服务体验多样玩法<br/>
                                    简单刺激 ! 感受彩票无限乐趣 ! 让您随时随地极致享乐!</p>
                                <span className="bing-desc-inco-bg"></span>
                            </div>
                            <div className="row bingo-platform-list">
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img bingo-platform-pk10"></span>
                                        <span className="color-third">北京赛车PK10</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img bingo-platform-fcsd"></span>
                                        <span className="color-third">福彩3D</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img bingo-platform-pls"></span>
                                        <span className="color-third">排列三</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img bingo-platform-xglhc"></span>
                                        <span className="color-third">香港六合彩</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img bingo-platform-cqssc"></span>
                                        <span className="color-third">重庆时时彩</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img bingo-platform-cqssc"></span>
                                        <span className="color-third">天津时时彩</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img bingo-platform-ssxw"></span>
                                        <span className="color-third">广东十一选5</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img bingo-platform-ssxw"></span>
                                        <span className="color-third">江西十一选5</span>
                                    </a>
                                </div>
                         
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img bingo-platform-ogc"></span>
                                        <span className="color-third">CG分分彩</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img bingo-platform-cgc"></span>
                                        <span className="color-third">CG1.5分彩</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img bingo-platform-jndc"></span>
                                        <span className="color-third">加拿大3.5分彩</span>
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
                                {/*<article style={{backgroundImage: "url(" + this.state.imgs[0].imageUrl + ")"}}></article>*/}
                            </h3>
                            <span className="bing-desc-inco-bg "></span>
                            <p className="color-main">最全的彩票平台，最值得您信赖的移动端，一流的服务体验多样玩法<br/>
                                简单刺激 ! 感受彩票无限乐趣 ! 让您随时随地极致享乐!</p>
                            <span className="bing-desc-inco-bg"></span>
                        </div>
                        <div className="row bingo-platform-list">
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img bingo-platform-xglhc"></span>
                                        <span className="color-third">六合彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img bingo-platform-fcsd"></span>
                                        <span className="color-third">3D彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img bingo-platform-jndbs"></span>
                                        <span className="color-third">加拿大卑斯</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img bingo-platform-bjklb"></span>
                                        <span className="color-third">北京快乐捌</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a  target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img bingo-platform-cqssc"></span>
                                        <span className="color-third">上海时时乐</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img bingo-platform-cqssc"></span>
                                        <span className="color-third">重庆时时乐</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a  target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img bingo-platform-cqssc"></span>
                                        <span className="color-third">江西时时乐</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img bingo-platform-cqssc"></span>
                                        <span className="color-third">天津时时乐</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img bingo-platform-tjsfc"></span>
                                        <span className="color-third">天津十分彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img bingo-platform-tjsfc"></span>
                                        <span className="color-third">广东十分彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img bingo-platform-tjsfc"></span>
                                        <span className="color-third">广西十分彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img bingo-platform-pls"></span>
                                        <span className="color-third">排列三</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img bingo-platform-bbklc"></span>
                                        <span className="color-third">BB快乐彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a  target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img bingo-platform-pk10"></span>
                                        <span className="color-third">北京PK拾</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a  target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img bingo-platform-bbklc"></span>
                                        <span className="color-third">BB快乐彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img bingo-platform-aysyq"></span>
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