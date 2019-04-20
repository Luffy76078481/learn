/**
 * Created by sobi on 2017/9/1.
 */
/**
 * Created by xm on 2017/5/8.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Particles from 'react-particles-js';
import {auth} from "globalAction";
import './css/bingo.scss'

class BingoPage extends Component {

    constructor (props){
        super();
    }

    componentDidMount() {
        window.$("#root").attr("class", "agcss");
        // document.title = "dafa在线快乐彩|dafabet彩票正式上线，亚洲最好的在线彩票"
    }

    onClickGame(e) {
        e.preventDefault();
        var gameLink = window.configHelper.getGamePlayLink(window.configHelper.BBIN_bingo_id);
        window.actions.authToLink(gameLink);
    }


    onClickKenoGame(e) {
        e.preventDefault();
        var gameLink = window.configHelper.getGamePlayLink(window.configHelper.KG_bingo_id);
        window.actions.authToLink(gameLink);
    }

    onClickTCGame(GamePlatform,e) {
        e.preventDefault();
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
    onClickFcGgame(e) {
        e.preventDefault();
        var gameLink = window.configHelper.getGamePlayLink(window.configHelper.dafaFC_bingo_id);
        window.actions.authToLink(gameLink);
    }
    renderParams(){
        const par = {
            particles: {
                number: {
                    value: 332,
                    density: { enable: true, value_area: 5291.259800856225 }
                },
                color: { value: "#ffffff" },
                shape: {
                    type: "polygon",
                    stroke: { width: 2, color: "#e6e6e6" },
                    polygon: { nb_sides: 6 },
                    image: { src: "img/github.svg", width: 100, height: 100 }
                },
                opacity: {
                    value: 0.2,
                    random: false,
                    anim: {
                        enable: true,
                        speed: 1.2993235396821523,
                        opacity_min: 0.056845404861094156,
                        sync: false
                    }
                },
                size: {
                    value: 0.5,
                    random: false,
                    anim: { enable: false, speed: 40, size_min: 0.1, sync: true }
                },
                line_linked: {
                    enable: true,
                    distance: 321,
                    color: "#ffffff",
                    opacity: 0.2805971106514665,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "bounce",
                    bounce: false,
                    attract: { enable: false, rotateX: 600, rotateY: 1200 }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 400, line_linked: { opacity: 1 } },
                    bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                    repulse: { distance: 200, duration: 0.4 },
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 }
                }
            },
            retina_detect: true}
            return par
    }

    render() {
        let rprops = window.r.props("BingoPage");
        const ImageGallery = window.r.get("ImageGallery");
        const NoticeBar = window.r.get("NoticeBar");
        const AffixBar = window.r.get("AffixBar");
        const options = window.r.props("ImageGallery");
        const height = options.bingoHeight || options.height || "400px";
        const options2 = window.r.props("BingoPage");

        return (
            <article id="bingo">
            {/* banner高度★★★★★★140px */}
                {!options2.banner?null:
                    <ImageGallery width="100%" height={height} type="bingo_banner_imgs" imgtype='banner'></ImageGallery>}
                {!options2.notice?null:
                    <div className="note"><span>公告栏</span>&nbsp;&nbsp;&nbsp;<i className="glyphicon glyphicon-volume-up"></i><NoticeBar ></NoticeBar></div>
                }
                {!options2.AffixBar?null:
                    <div className="leftBox"><AffixBar></AffixBar></div>
                }
                {!options2.bgAnimate?null:
                    <Particles params={this.renderParams()} className="canva"/>} 
                <div className="main" id="wrapwcent">

                    {rprops.supportCG?
                        <div className="cg bin twoLine" onClick={this.onClickTCGame.bind(this,'CG')}>
                            <a href="" className="lotto-game">
                                <div className="bingo_cg bingo_item">
                                </div>
                            </a>
                            <div className="txtGroup">
                                <div className="title">CG</div>
                                {window.config.spec!="manbet"?
                                    <div className="txt">种类多样彩票平台，移动端一流的服务体验，让您随时随地极致享乐</div>:
                                    <div className="txt">快乐彩、时时彩、六合彩游戏多样化，应有尽有，尽情体验精彩游戏。</div>}
                            </div>
                            <a href="">
                                <div className="b-btn">{options2.btnTxt||""}</div>
                            </a>
                        </div>
                        :null}

                    {rprops.supportKG?
                        <div className="kg bin" onClick={this.onClickKenoGame.bind(this)}>
                            <a href="" className="lotto-game">
                                <div className="bingo_kg bingo_item">
                                </div>
                            </a>
                            <div className="txtGroup">
                                <div className="title">KG</div>
                                {window.config.spec!="manbet"?
                                    <div className="txt">最全的彩票平台，移动端一流的服务体验，让您随时随地极致享乐</div>:
                                    <div className="txt">快乐彩、时时彩、六合彩游戏多样化，玩家可自订介面，尽情体验精彩游戏。</div>}
                            </div>
                            <a href="">
                                <div className="b-btn">{options2.btnTxt||""}</div>
                            </a>
                        </div>
                        :null}

                    <div className="bbin bin" onClick={this.onClickTCGame.bind(this,'BBIN')}>
                        <a href="">
                            <div className="bingo_bbin bingo_item">
                            </div>
                        </a>
                        <div className="txtGroup">
                            <div className="title">BBIN</div>
                            {window.config.spec!="manbet"?
                            <div className="txt">热门六合彩，最低下注1元，波音老品牌，值得您的信赖</div>:
                            <div className="txt">六合彩／时时彩／分分彩／3D彩，应有尽有。官方同步开奖，更高中奖率，感受彩票无限乐趣。</div>}

                        </div>
                        <a href="">
                            <div className="b-btn">{options2.btnTxt||""}</div>
                        </a>
                    </div>
                   <br></br>
                    {window.config.spec == 'dafa'||window.config.spec == 'tyc'? null:
                        <div className="more bin twoLine" >
                            <a href="">
                                <div className="bingo_more bingo_item">
                                </div>
                            </a>
                            <div className="txtGroup">
                                <div className="title">{options2.title ||"敬请期待"}。</div>
                                {window.config.spec!="manbet"?
                                    <div className="txt">种类多样彩票平台，移动端一流的服务体验，让您随时随地极致享乐</div>:
                                    <div className="txt"></div>}
                            </div>
                            <a href="">
                                <div className="b-btn">{options2.btnTxt||""}</div>
                            </a>
                        </div>
                        }
                      
                </div>
            </article>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {}
);

export default connect(mapStateToProps, {})(BingoPage);