/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './CasinoPage.scss'


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
    }
    renderCansinoListNav() {
        var CansinoListsNav = [];
        // for (var i = 0; i < this.props.casinos.length && i < 8; i++) {
        for (var i = 0; i < this.props.casinos.length; i++) {
                var clsName = i % 2 == 0 ? "BGcolor-main":"cansino-nav-active BGcolor-third";
            var CansinoList = this.props.casinos[i];
            CansinoListsNav.push(
                <li key={i} className={clsName}>
                    <a target="_blank" href="javascript:void(0)" className="cansino-start-txt color-main"  onClick={this.onClickGameLink.bind(this, CansinoList)}>{CansinoList.Title}</a>
                    <a target="_blank" href="javascript:void(0)" className="cansino-start-game color-second"  onClick={this.onClickGameLink.bind(this, CansinoList)}></a>
                </li>
            );
        }
        return CansinoListsNav;
    }
    renderCansinoList() {
        var CansinoLists = [];
        var options = window.r.props("CasinoPage");
        const maskText = options.maskName || "立即开始";
        for (var i = 0; i <  this.props.casinos.length; i++) {
            var CansinoList =  this.props.casinos[i];
            CansinoLists.push(
                <div key={i} className="color-main" >
                    <div className={" c_"+CansinoList.PlatformId+" c-items wow fadeInUp animated"} style={{visibility: "visible", animationName: "fadeInUp", float:'left', marginLeft:'40px'}}>
                        <div className={ "c_"+CansinoList.PlatformId+" casino-platform-list-img casino-list-img"} onClick={this.onClickGameLink.bind(this,CansinoList)}  style={{backgroundSize:"100%", background: "url("+window.config.prdImgUrl+ CansinoList.ImageUrl + ") no-repeat"}}>
                            {!options.hideCasinoTitle?
                                <h3 style={{color:"#fff"}}>{CansinoList.Title}</h3>
                                :null
                            }
                        </div>
                        <div className={CansinoList.ID+" casino-platform-list-link"}>
                            <a target="_blank" href="javascript:void(0)" onClick={this.onClickGameLink.bind(this,CansinoList)} className="casino-go-game color-highlight">{ !options.hideCasinoTitle?"进入游戏":""}</a>
                        </div>
                        {!options.hoverMask?
                            null:
                            <div className="mask">
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickGameLink.bind(this,CansinoList)} className="casino-go-game color-highlight">{maskText}</a>
                            </div>
                        }
                    </div>
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
        let height = options2.casinoHeight || "170px";

        return (
            <article id="casino">
                {options2&&options2.casinoEnabled ? <ImageGallery width="100%" height={height} type="casino_banner_imgs" imgtype='banner' />:null}
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
                        <div className="row casino-platform-list">
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