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
        // const ImageGallery = window.r.get("ImageGallery");
        const options = window.r.props("ImageGallery");
        // const height = options.bingoHeight || options.height || "400px";
        return (
            <article id="bingo" className=" BGcolor-main">
                <div className="banner">
                    {/* <ImageGallery width="100%" height={height} type="bingo_banner_imgs" imgtype='banner'></ImageGallery> */}
                    <div className="HeaderBanner">
                    <div id="AnimationContainer">
                        <div className="AnimatedImage" id="AnimatedImage1"></div>
                        <div className="AnimatedImage" id="AnimatedImage2"></div>
                        <div className="AnimatedImage" id="AnimatedImage3"></div>
                    </div>
                    <div id="BannerItemOuterContainer">
                        <div id="BannerItemInnerContainer">
                            <div className="BannerItem BannerItem4">   
                             <div className="advertPod advertPodText">
                                <div className="gameLaunch" >
                                    <div className="advertPodImage center-clipped-background2" >
                                        <div className="advertPodTextContainer">
                                            <span >BBIN彩票</span>
                                        </div>
                                    </div>
                                    <div className="advertPodOverlay" onClick={this.onClickTCGame.bind(this,'BBIN')}></div>
                                </div>
                            </div>
                            </div>
                            <div className="BannerItem BannerItem3"><div className="advertPod advertPodText">
                            <a href="#">
                                <div className="advertPodImage center-clipped-background">
                                    <div className="advertPodTextContainer">
                                        <span>FC彩票</span>
                                    </div>
                                </div>
                                <div className="advertPodOverlay" onClick={this.onClickTCGame.bind(this,'FC')}></div>
                            </a>
                        </div>
                        </div>
                        <div className="BannerItem">
                            <div className="BingoHeaderBannerItem">
                            <div className="BannerItem" >

                                </div>
                               </div>

                        </div>     
                     </div>
                    </div>
                </div>
                </div>
                {/* {rprops.supportKG ? 
                    <div className="bingo-fname bingo-fname2">
                     <div className=" bbinBingoBg kgBorderTop">
                            <div className="bbinBingoContent kgTitle">
                                <div className="kgfanme">
                                     KG彩票LOTTERY
                                     <div className="nav-moblie-pis">
                                        <span>移动版：无须下载,在iPhone、iPAD和Android浏览器上也能进行游戏</span>
                                        <div className="nav-moblie-link">WWW.KGCP.CC<span></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row bingo-platform-list">
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'KG')} >
                                    <span className="bingo-platform-img"><img src={require("./images/bingo/cp_03.png")} /></span>
                                    </a>
                                    <span className="bottomBg"></span>
                                     <span className="color-third">六合彩</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'KG')} >
                                    <span className="bingo-platform-img"><img src={require("./images/bingo/cp_49.png")} /></span>
                                    </a>
                                    <span className="bottomBg"></span>
                                     <span className="color-third">3D彩</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'KG')} >
                                    <span className="bingo-platform-img"> <img src={require("./images/bingo/cp_07.png")} /></span>
                                    </a>
                                    <span className="bottomBg"></span>
                                    <span className="color-third">加拿大卑斯</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'KG')} >
                                    <span className="bingo-platform-img"> <img src={require("./images/bingo/cp_09.png")} /></span>
                                    </a>
                                    <span className="bottomBg"></span>
                                     <span className="color-third">北京快乐捌</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'KG')} >
                                    <span className="bingo-platform-img"><img src={require("./images/bingo/cp_35.png")} /></span>
                                    </a>
                                    <span className="bottomBg"></span>
                                     <span className="color-third">上海时时乐</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'KG')} >
                                    <span className="bingo-platform-img"><img src={require("./images/bingo/cp_34.png")} /></span>
                                    </a>
                                    <span className="bottomBg"></span>
                                     <span className="color-third">重庆时时乐</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'KG')} >
                                    <span className="bingo-platform-img bingo-platform-cqssc"><img src={require("./images/bingo/cp_jx.png")} /></span>
                                    </a>
                                    <span className="bottomBg"></span>
                                     <span className="color-third">江西时时乐</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'KG')} >
                                    <span className="bingo-platform-img"><img src={require("./images/bingo/cp_27.png")} /></span>
                                    </a>
                                    <span className="bottomBg"></span>
                                    <span className="color-third">天津时时乐</span>
                                </div>
                            </div>
                        </div>
                    </div>:null} */}
                {rprops.supportFC ?
                    
                    <div className="bingo-fname bingo-fname3">
                     <div className=" bbinBingoBg kgBorderTop">
                            <div className="bbinBingoContent kgTitle">
                                <div className="kgfanme">
                                    FC彩票
                                   
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row bingo-platform-list">
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'FC')} >
                                        <span className="bingo-platform-img">
                                            <img src={require("./images/bingo/cp_53.png")} />
                                        </span>
                                    </a>
                                    <span className="bottomBg"></span>
                                    <span className="color-third">重庆时时彩</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'FC')} >
                                    <span className="bingo-platform-img">
                                    <img src={require("./images/bingo/cp_39.png")} />
                                    </span>
                                    </a>
                                    <span className="bottomBg"></span>
                                    <span className="color-third">PK拾</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'FC')} >
                                    <span className="bingo-platform-img"><img src={require("./images/bingo/cp_30.png")} /></span>
                                    </a>
                                    <span className="bottomBg"></span>
                                    <span className="color-third">PC蛋蛋</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'FC')} >
                                    <span className="bingo-platform-img">
                                        <img src={require("./images/bingo/cp_31.png")} />
                                    </span>
                                    </a>
                                    <span className="bottomBg"></span>
                                    <span className="color-third">11选5</span>
                                    
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'FC')} >
                                    <span className="bingo-platform-img ">
                                    <img src={require("./images/bingo/cp_13.png")} />
                                    </span>
                                    </a>
                                    <span className="bottomBg"></span>
                                    <span className="color-third">快3</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'FC')} >
                                    <span className="bingo-platform-img">
                                    <img src={require("./images/bingo/cp_03.png")} />
                                    </span>
                                    </a>
                                    <span className="bottomBg"></span>
                                    <span className="color-third">香港六合彩</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'FC')} >
                                    <span className="bingo-platform-img ">
                                    <img src={require("./images/bingo/cp_05.png")} />
                                    </span>
                                    </a>
                                    <span className="bottomBg"></span>
                                    <span className="color-third">福彩3D</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'FC')} >
                                    <span className="bingo-platform-img ">
                                    <img src={require("./images/bingo/cp_13.png")} />
                                    </span>
                                    </a>
                                    <span className="bottomBg"></span>
                                    <span className="color-third">排列三，五</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'FC')} >
                                    <span className="bingo-platform-img ">
                                    <img src={require("./images/bingo/txffc.png")} />
                                    </span>
                                    </a>
                                    <span className="bottomBg"></span>
                                    <span className="color-third">腾讯分分彩</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'FC')} >
                                    <span className="bingo-platform-img ">
                                    <img src={require("./images/bingo/xyft.png")} />
                                    </span>
                                    </a>
                                    <span className="bottomBg"></span>
                                    <span className="color-third">幸运飞艇</span>
                                </div>
                         
                            </div>
                        </div>
                    </div>:null}
                {rprops.supportCG?
                    <div className="bingo-fname bingo-fname3">
                     <div className=" bbinBingoBg kgBorderTop">
                            <div className="bbinBingoContent kgTitle">
                                <div className="kgfanme">
                                    CG彩票
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row bingo-platform-list">
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img">
                                    <img src={require("./images/bingo/cp_39.png")} />
                                    </span>
                                    </a>
                                    <span className="bottomBg"></span>
                                    <span className="color-third">北京赛车PK10</span>
                                </div> 
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img">
                                    <img src={require("./images/bingo/cp_05.png")} />
                                    </span> 
                                    </a>
                                    <span className="bottomBg"></span>
                                     <span className="color-third">福彩3D</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img">
                                    <img src={require("./images/bingo/cp_13.png")} />
                                    </span>
                                    </a>
                                    <span className="bottomBg"></span>
                                     <span className="color-third">排列三</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img">
                                    <img src={require("./images/bingo/cp_03.png")} />
                                    </span>
                                    </a>
                                    <span className="bottomBg"></span>
                                    <span className="color-third">香港六合彩</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img ">
                                    <img src={require("./images/bingo/cp_53.png")} />
                                    </span>
                                    </a>
                                    <span className="bottomBg"></span>
                                     <span className="color-third">重庆时时彩</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img"><img src={require("./images/bingo/cp_27.png")} /></span>
                                    </a>
                                    <span className="bottomBg"></span>
                                     <span className="color-third">天津时时彩</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img"><img src={require("./images/bingo/cp_31.png")} /></span>
                                    </a>
                                    <span className="bottomBg"></span>
                                     <span className="color-third">广东十一选5</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img"><img src={require("./images/bingo/cp_31.png")} /></span>
                                    </a>
                                    <span className="bottomBg"></span>
                                     <span className="color-third">江西十一选5</span>
                                </div>
                         
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img"><img src={require("./images/bingo/cp_32.png")}/></span>
                                    </a>
                                    <span className="bottomBg"></span>
                                     <span className="color-third">CG分分彩</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img"><img src={require("./images/bingo/cp_32.png")}/></span>
                                    </a>
                                    <span className="bottomBg"></span>
                                    <span className="color-third">CG1.5分彩</span>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'CG')} >
                                    <span className="bingo-platform-img "><img src={require("./images/bingo/cp_32.png")}/></span>
                                    </a>
                                    <span className="bottomBg"></span>
                                     <span className="color-third">加拿大3.5分彩</span>
                                </div>
                            </div>
                        </div>
                    </div>:null}



                <div className="bingo-fname BGcolor-main bingo-bbin">
                <div className=" bbinBingoBg kgBorderTop">
                            <div className="bbinBingoContent kgTitle">
                                <div className="kgfanme">
                                     BBIN彩票
                                </div>
                            </div>
                        </div>
                    <div className="container">
                        <div className="row bingo-platform-list">
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img"><img src={require("./images/bingo/cp_03.png")} /></span>
                                </a>
                                <span className="bottomBg"></span>
                                  <span className="color-third">六合彩</span>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img"><img src={require("./images/bingo/cp_49.png")} /></span>
                                </a>
                                <span className="bottomBg"></span>
                                 <span className="color-third">3D彩</span>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img "> <img src={require("./images/bingo/cp_07.png")} /></span>
                                </a>
                                <span className="bottomBg"></span>
                                <span className="color-third">加拿大卑斯</span>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img"><img src={require("./images/bingo/cp_09.png")} /></span>
                                </a>
                                <span className="bottomBg"></span>
                                 <span className="color-third">北京快乐捌</span>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a  target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img"><img src={require("./images/bingo/cp_35.png")} /></span>
                                </a>
                                <span className="bottomBg"></span>
                                 <span className="color-third">上海时时乐</span>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img"><img src={require("./images/bingo/cp_34.png")} /></span>
                                </a>
                                <span className="bottomBg"></span>
                                 <span className="color-third">重庆时时乐</span>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a  target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img"><img src={require("./images/bingo/cp_jx.png")} /></span>
                                </a>
                                <span className="bottomBg"></span>
                                <span className="color-third">江西时时乐</span>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img"><img src={require("./images/bingo/cp_27.png")} /></span>
                                </a>
                                <span className="bottomBg"></span>
                                 <span className="color-third">天津时时乐</span>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img"><img src={require("./images/bingo/cp_33.png")} /></span>
                                </a>
                                <span className="bottomBg"></span>
                                 <span className="color-third">天津十分彩</span>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img"><img src={require("./images/bingo/cp_gd.png")} /></span>
                                </a>
                                <span className="bottomBg"></span>
                                <span className="color-third">广东十分彩</span>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img "><img src={require("./images/bingo/cp_36.png")} /></span>
                                </a>
                                <span className="bottomBg"></span>
                                <span className="color-third">广西十分彩</span>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img "><img src={require("./images/bingo/cp_13.png")} /></span>
                                </a>
                                <span className="bottomBg"></span>
                                <span className="color-third">排列三</span>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img"><img src={require("./images/bingo/cp_11.png")} /></span>
                                </a>
                                <span className="bottomBg"></span>
                                  <span className="color-third">BB快乐彩</span>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a  target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img"> <img src={require("./images/bingo/cp_39.png")} /></span>
                                </a>
                                <span className="bottomBg"></span>
                                 <span className="color-third">北京PK拾</span>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a  target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img"><img src={require("./images/bingo/cp_11.png")} /></span>
                                </a>
                                <span className="bottomBg"></span>
                                <span className="color-third">BB快乐彩</span>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this,'BBIN')} >
                                <span className="bingo-platform-img"><img src={require("./images/bingo/cp_43.png")} /></span>
                                </a>
                                <span className="bottomBg"></span>
                                 <span className="color-third">澳洲商业区</span>
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