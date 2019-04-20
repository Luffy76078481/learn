/**
 * Created by sobi on 2017/9/1.
 */
/**
 * Created by xm on 2017/5/8.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Particles from 'react-particles-js';
import './css/bingo.scss'
import {auth} from "globalAction";

class BingoPage extends Component {

    constructor (props){
        super();
    }

    componentDidMount() {
        window.$("#root").attr("class", "agcss");
    }

    onClickGame(game) {
        if (!auth()) {
            return;
        }

        let parma = {
            GamePlatform:game.GamePlatform,
            GameType:"Lottery",
            GameId:game.GameIdentify,
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
    renderBingoList(){
        let list =[];
       this.props.bingoGames.forEach((item,index)=>{
           list.push(
               <div className="bingo-box">
                    <div key={index} className="bin twoLine" onClick={this.onClickGame.bind(this,item)} style={{backgroundSize:"100%", background: "url("+window.config.prdImgUrl+ item.ImageUrl + ") 0 0/100% 100% no-repeat"}}>
                        <a href="" className="lotto-game">
                            <div className="bingo_cg bingo_item">
                            </div>
                        </a>
                    </div>
                    <div className="room-info-wrapper">
                        <div className="room-info">
                            <span className="room-title">{item.Title}</span>
                        </div>
                    </div>
                    <div className="game-hover">
                        <div className="game-hover-inner">
                            <div className="game-hover-wrapper">
                                <a className="btn pre-login-launch"  onClick={this.onClickGame.bind(this,item)}>马上游戏</a>
                            </div>
                        </div>
                    </div>
               </div>
           )
       });
       return list;
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
                    {this.renderBingoList()}
                    <div className="bingo-box2">
                        <div className="morecp bin twoLine" >
                            <a href="">
                                <div className="bingo_more bingo_item">
                                </div>
                            </a>
                        </div>
                        <div className="room-info-wrapper">
                            <div className="room-info">
                                <span className="room-title">敬请期待</span>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        bingoGames:state.game.bingoGames
    }
);

export default connect(mapStateToProps, {})(BingoPage);