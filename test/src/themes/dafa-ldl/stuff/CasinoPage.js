/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './css/CasinoPage.scss'


class CasinoPage extends Component {
    onClickGameLink(game) {
        if (!window.actions.auth()) {
            return;
        }
        let GameType = '';
        if(game.PlatformId=="MG2"){
             GameType = 'casino'
        }else{
            GameType = 'Trueman'
        }
        let parma = {
            GamePlatform:game.PlatformId,
            GameType:GameType,//Trueman
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen("Casino");
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    componentDidMount() {
        window.$("#root").attr("class", "casinocss");
        // document.title = "体验最好的在线真人娱乐场就在dafabet真人现场荷官!"
        document.title = window.config.title;
        window.addEventListener("resize", this.onResize);
        this.onResize();
    }
    onResize(){
        var $showcase = window.$(".c-items .casino-list-imgItem");
        var windowWidth = window.$(window).width();
        var num = 0.25;
        var width = parseInt((windowWidth-200)*num);
        if(windowWidth<1300) return;
        $showcase.height(parseInt(width*0.75));
    }
    renderCansinoListNav() {
        var CansinoListsNav = [];
        for (var i = 0; i < this.props.casinos.length && i < 8; i++) {
            var clsName = i % 2 == 0 ? "BGcolor-main":"cansino-nav-active BGcolor-third";
            var CansinoListNav = this.props.casinos[i];
            var gameLink = window.configHelper.getGamePlayLink(CansinoListNav.gameId);
            CansinoListsNav.push(
                <li key={i} className={clsName}>
                    <a target="_blank" href="javascript:void(0)" className="cansino-start-txt color-main"  onClick={this.onClickGameLink.bind(this, gameLink)}>{CansinoListNav.title}</a>
                    <a target="_blank" href="javascript:void(0)" className="cansino-start-game color-second"  onClick={this.onClickGameLink.bind(this, gameLink)}></a>
                </li>
            );
        }
        return CansinoListsNav;
    }
    renderCansinoList() {
        var CansinoLists = [];
        var options = window.r.props("CasinoPage");
        var windowWidth = window.$(window).width();
        var num = 0.25;
        var width = parseInt((windowWidth-200)*num);
        var height = width*0.75;

        const maskText = options.maskName || "立即开始";
        for (var i = 0; i < this.props.casinos.length; i++) {
            var CansinoList = this.props.casinos[i];
            var gameLink = window.configHelper.getGamePlayLink(CansinoList.GameId);
            var large="";
            // if((i+1)>3 && ((i+1)%3==0)){
            //     large="large";
            // }
            CansinoLists.push(
                <div key={i} className={large+" c-items"} >
                    <div className={" c_"+CansinoList.ID+" game-list-item fadeInUp animated"}>
                        <div className={"casino-list-img"} >
                            <img className={"casino-list-imgItem"} height={height} src={window.config.prdImgUrl+CansinoList.ImageUrl} />
                            {!options.hideCasinoTitle?
                                <h3 style={{color:"#fff"}}>{CansinoList.Title}</h3>
                                :null
                            }
                        </div>
                        <div className="game-hover">
                            <div className="game-hover-inner">
                                <div className="game-hover-wrapper">
                                    <a target="_blank" className="btn" href="javascript:void(0)" onClick={this.onClickGameLink.bind(this,CansinoList)} data-title={CansinoList.title}>开始游戏</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="room-info-wrapper">
                        <div className="room-info">
                            <span className="room-title">{CansinoList.Title}</span>
                        </div>
                    </div>

                        {!options.hoverMask?
                            null:
                            <div className="mask">
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickGameLink.bind(this,gameLink)} className="casino-go-game color-highlight">{maskText}</a>
                            </div>

                        }
                </div>

            );
        }
        return CansinoLists;
    }


    render() {

        const CansinoListNav = this.renderCansinoListNav();
        const CansinoList = this.renderCansinoList();
        var options = window.r.props("CasinoPage");
        const ImageGallery = window.r.get("ImageGallery");
        const options2 = window.r.props('ImageGallery');
        let height = options2.casinoHeight || options2.height || "170px";

        return (
            <article id="casino">
                {options2&&options2.casinoEnabled2 ? <ImageGallery width="100%" height={height} type="casino_banner_imgs" imgtype='banner' />:null}
                <div className="container">
                    <div className="casino-Content">
                        {!options.hideNav?
                        <div className="cansino-nav">
                            <ul>
                                {CansinoListNav}
                            </ul>
                            <div className="clear"></div>
                        </div>:null
                        }
                        <div className="casino-platform-list">
                            {CansinoList}
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        casinos:state.views.casinos,
    }
);

export default connect(mapStateToProps, {})(CasinoPage);