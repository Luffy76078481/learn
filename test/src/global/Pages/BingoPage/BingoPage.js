/**
 * Created by xm on 2017/5/8.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import './bingo.scss'
import {auth} from "globalAction";

class BingoPage extends Component {

    constructor (props){
        super();
    }
    
    onClickGame() {
        if (!auth()) {
            return;
        }
        let parma = {
            GamePlatform:"BBIN",
            GameType:"Lottery",
            GameId:'FE7F7ECC527746B0B906557003E4D8C5',
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen("Bingo");
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }


    onClickKenoGame() {
        if (!auth()) {
            return;
        }
        let parma = {
            GamePlatform:"KG",
            GameType:"Lottery",
            GameId:'99EB6DCF7BEF4B62A15F2606A98C163E',
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen("Bingo");
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    onClickTCGame() {
        if (!auth()) {
            return;
        }
        let parma = {
            GamePlatform:"CG",
            GameType:"Lottery",
            GameId:'D20DF9D9BF004974B80A978801EA2767',
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen("Bingo");
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
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this)} >
                                        <img src="images/bingo/bingo-inco_41.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">北京赛车PK10</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this)} >
                                        <img src="images/bingo/bingo-inco_13.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">福彩3D</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this)} >
                                        <img src="images/bingo/bingo-inco_35.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">排列三</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this)} >
                                        <img src="images/bingo/bingo-inco_11.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">香港六合彩</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this)} >
                                        <img src="images/bingo/bingo-inco_23.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">重庆时时彩</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this)} >
                                        <img src="images/bingo/bingo-inco_24.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">天津时时彩</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this)} >
                                        <img src="images/bingo/bingo-inco_65.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">广东十一选5</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this)} >
                                        <img src="images/bingo/bingo-inco_65.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">江西十一选5</span>
                                    </a>
                                </div>
                                {/*<div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>*/}
                                    {/*<a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this)} >*/}
                                        {/*<img src="images/bingo/bingo-inco_66.png?v=1" className="bingo-platform-img"/>*/}
                                        {/*<span className="color-third">腾讯分分彩</span>*/}
                                    {/*</a>*/}
                                {/*</div>*/}
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this)} >
                                        <img src="images/bingo/bingo-inco_66.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">CG分分彩</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this)} >
                                        <img src="images/bingo/bingo-inco_67.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">CG1.5分彩</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickTCGame.bind(this)} >
                                        <img src="images/bingo/bingo-inco_68.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">加拿大3.5分彩</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>:null}

                {rprops.supportKG?
                    <div className="bingo-fname bingo-fname2">
                        <div className="container">
                            <div className="bing-desc-bbin wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <h3>
                                    <div className="bingo-title-img2" style={{visibility: "visible", animationName: "fadeInUp"}}></div>
                                </h3>
                                <span className="bing-desc-inco-bg"></span>
                                <p className="color-main">最全的彩票平台，最值得您信赖的移动端，一流的服务体验多样玩法<br/>
                                    简单刺激 ! 感受彩票无限乐趣 ! 让您随时随地极致享乐!</p>
                                <span className="bing-desc-inco-bg"></span>
                            </div>
                            <div className="row bingo-platform-list">
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickKenoGame.bind(this)} >
                                        <img src="images/bingo/bingo-inco_11.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">六合彩</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickKenoGame.bind(this)} >
                                        <img src="images/bingo/bingo-inco_13.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">3D彩</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickKenoGame.bind(this)} >
                                        <img src="images/bingo/bingo-inco_15.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">加拿大卑斯</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickKenoGame.bind(this)} >
                                        <img src="images/bingo/bingo-inco_17.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">北京快乐捌</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickKenoGame.bind(this)} >
                                        <img src="images/bingo/bingo-inco_23.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">上海时时乐</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickKenoGame.bind(this)} >
                                        <img src="images/bingo/bingo-inco_24.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">重庆时时乐</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickKenoGame.bind(this)} >
                                        <img src="images/bingo/bingo-inco_25.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">江西时时乐</span>
                                    </a>
                                </div>
                                <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <a target="_blank" href="javascript:void(0)" onClick={this.onClickKenoGame.bind(this)} >
                                        <img src="images/bingo/bingo-inco_26.png?v=1" className="bingo-platform-img"/>
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
                                {/*<article style={{backgroundImage: "url(" + this.state.imgs[0].imageUrl + ")"}}></article>*/}
                            </h3>
                            <span className="bing-desc-inco-bg "></span>
                            <p className="color-main">最全的彩票平台，最值得您信赖的移动端，一流的服务体验多样玩法<br/>
                                简单刺激 ! 感受彩票无限乐趣 ! 让您随时随地极致享乐!</p>
                            <span className="bing-desc-inco-bg"></span>
                        </div>
                        <div className="row bingo-platform-list">
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickGame.bind(this)} >
                                    <img src="images/bingo/bingo-inco_11.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">六合彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickGame.bind(this)} >
                                    <img src="images/bingo/bingo-inco_13.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">3D彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickGame.bind(this)} >
                                    <img src="images/bingo/bingo-inco_15.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">加拿大卑斯</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickGame.bind(this)} >
                                    <img src="images/bingo/bingo-inco_17.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">北京快乐捌</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a  target="_blank" href="javascript:void(0)" onClick={this.onClickGame.bind(this)} >
                                    <img src="images/bingo/bingo-inco_23.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">上海时时乐</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickGame.bind(this)} >
                                    <img src="images/bingo/bingo-inco_24.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">重庆时时乐</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a  target="_blank" href="javascript:void(0)" onClick={this.onClickGame.bind(this)} >
                                    <img src="images/bingo/bingo-inco_25.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">江西时时乐</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickGame.bind(this)} >
                                    <img src="images/bingo/bingo-inco_26.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">天津时时乐</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickGame.bind(this)} >
                                    <img src="images/bingo/bingo-inco_31.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">天津十分彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickGame.bind(this)} >
                                    <img src="images/bingo/bingo-inco_33.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">广东十分彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickGame.bind(this)} >
                                    <img src="images/bingo/bingo-inco_34.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">广西十分彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickGame.bind(this)} >
                                    <img src="images/bingo/bingo-inco_35.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">排列三</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickGame.bind(this)} >
                                    <img src="images/bingo/bingo-inco_40.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">BB快乐彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a  target="_blank" href="javascript:void(0)" onClick={this.onClickGame.bind(this)} >
                                    <img src="images/bingo/bingo-inco_41.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">北京PK拾</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a  target="_blank" href="javascript:void(0)" onClick={this.onClickGame.bind(this)} >
                                    <img src="images/bingo/bingo-inco_42.png?v=1" className="bingo-platform-img"/>
                                        <span className="color-third">BB快乐彩</span>
                                </a>
                            </div>
                            <div className="col-md-3 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickGame.bind(this)} >
                                    <img src="images/bingo/bingo-inco_43.png?v=1" className="bingo-platform-img"/>
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