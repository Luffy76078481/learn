import React, { Component } from 'react';
import { Link, IndexLink,browserHistory } from 'react-router';
import { connect } from 'react-redux';
import "./NavigationBar.scss"
import {auth} from "globalAction";

class NavigationBar extends Component {

    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    // 体育链接
    onClickGameLink(game) {
        if (!auth()) {
            return;
        }
        let parma = {
            GamePlatform:game.GamePlatform,
            GameType:game.GameTypeText,
            GameId:game.GameIdentify,
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen('Game');
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    // 体育2级
    renderSportList(){
        const _this = this;
        let SportList =[];
        this.props.sportGames.forEach(function (item,index) {
            if(item.GamePlatform =="N188" ){
                if(_this.props.user.token){
                    SportList.push (
                        <li key={index} onClick={_this.onClickGameLink.bind(_this,item)}><a className={item.GamePlatform.toLowerCase()}>{item.Title}</a></li>
                    )
                }
            }else{
                SportList.push (
                    <li key={index} onClick={_this.onClickGameLink.bind(_this,item)}><a className={item.GamePlatform.toLowerCase()}>{item.Title}</a></li>
                )
            }            
        })
        return SportList;
    }
    // 真人二级
    renderCasinoList() {
        var CasinoLists = [];
        for (var i = 0; i < this.props.casinos.length && i < 8; i++) {
            var CasinoList = this.props.casinos[i];
            CasinoLists.push(
                <li key={i} onClick={this.onClickCasinoLink.bind(this, CasinoList)}><Link to="/casino" className={'casino_'+CasinoList.ID.toLowerCase()}>{CasinoList.Title}</Link></li>
            );
        }
        return CasinoLists;
    }
    // 真人游戏链接
    onClickCasinoLink(game){
        if (!window.actions.auth()) {
            return;
        }
        let parma = {
            GamePlatform:game.PlatformId,
            GameType:'Trueman',//Trueman
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen('Casino');
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    // 热门游戏
    renderTabGames(){
        let tabGames = this.props.tabGames
        let ret= [];
        if(tabGames.length>0){
            ret.push(
                <li className="xhtdGames spec-li" key={"hotgame"}  onClick={this.onClickGameLink.bind(this,  {GamePlatform:tabGames[0].GamePlatform,GameIdentify:tabGames[0].GameIdentify})}><a>{tabGames[0].Title}</a></li>
            )
            for(let i=1;i<tabGames.length;i++){
                ret.push(<li key = {i+'hotGame'} className="xhtdGames" onClick={this.onClickGameLink.bind(this,  {GamePlatform:tabGames[i].GamePlatform,GameIdentify:tabGames[i].GameIdentify})}><a>{tabGames[i].Title}</a></li>)
            }
        }    
        return ret;   
    }
    // 热门链接
    onClickGameLink(game) {
        if (!auth()) {
            return;
        }

        let parma = {
            GamePlatform:game.GamePlatform,
            GameType:game.GameTypeText,
            GameId:game.GameIdentify,
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen('Game');
        
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    // 电子2级
    renderSlotPlatformOnNav() {
        var ret = [];
        for (var i = 0; i < this.props.platforms.length; i++) {
            var platform = this.props.platforms[i];
            if (!platform.ShowSlot) {
                continue;
            }
            ret.push(
                <li onClick={this.gameLinkTo.bind(this,platform.Name2)} key={i} className={platform.ID}><a>{platform.Name2 + "平台"}</a></li>
            );
        }
        return ret;
    }
    // 电子链接
    gameLinkTo(val){
        if(val == 'OPUS')
        val = 'OPUS2';
        this.props.dispatch({ type: "ChangeLinkID",data:val });
        browserHistory.push("/");
        setTimeout(() => {
            browserHistory.push("/games");
        }, 10);
    }
    // 彩票2级
    renderBingoList(){
        var BingoLists = [];
        for (var i = 0; i < this.props.bingoGames.length && i < 8; i++) {
            var BingoList = this.props.bingoGames[i];
            BingoLists.push(
                <li key={i}  onClick={this.onClickBingo.bind(this, BingoList)}><a>{BingoList.Title}</a></li>
            );
        }
        return BingoLists;       
    }
    // 彩票链接
    onClickBingo(game) {
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
    render() {
        const promotionLink = this.props.remoteSysConfs.channel_push_url;
        var options = window.r.props("NavigationBar");
        const menuHoverCallback = this.props.menuHover || function (value) {};
        const bingoName = options.bingoName || "彩票区";
        const fishName = options.fishName || "AG捕鱼";
        const gamePath = options.gamePath || "/games";
        const gameName = options.gameName || "电子游艺";
        const wapDownloadName = options.wapDownloadName || "手机投注"
        return (
            <nav role="navigation" className="Navigation">
                <ul className="main_nav">
                    <li>
                        <div className="nav_inbox navbx0">
                            <IndexLink to="/" activeClassName="active" className="color-highlight home">
                                <i className="glyphicon glyphicon-home f24 mt5"></i>        
                            </IndexLink>
                        </div>
                    </li>
                    <li className="mainTitle n-sport" onMouseEnter={menuHoverCallback.bind(this, "sport")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx1"><Link activeClassName="active" to="/sport">体育投注</Link></div>       
                        <ul className="items">
                            {this.renderSportList()}
                        </ul>
                    </li>
                    <li className="mainTitle n-casino" onMouseEnter={menuHoverCallback.bind(this, "casino")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx2"><Link to="/casino" activeClassName="active">真人视讯</Link></div>
                        <ul className="items casino2">
                            {this.renderCasinoList()}
                        </ul>
                    </li>
                    <li className="mainTitle n-games" onMouseEnter={menuHoverCallback.bind(this, "games")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx3"><Link to={gamePath} activeClassName="active">{gameName}</Link></div>
                        <ul className="items">
                            {this.renderTabGames()}
                            {this.renderSlotPlatformOnNav()}
                        </ul>
                    </li>
                    <li className="mainTitle n-bingo" onMouseEnter={menuHoverCallback.bind(this, "bingo")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx4"><Link to="/bingo" activeClassName="active">{bingoName}</Link></div>
                        <ul className="items">
                            <li className="xhtdGames" onClick={this.onClickBingo.bind(this, {GamePlatform:'CG',GameIdentify:""})}><a>重庆时时彩</a></li>
                            <li className="xhtdGames" onClick={this.onClickBingo.bind(this, {GamePlatform:'CG',GameIdentify:""})}><a>腾讯分分彩</a></li>
                            <li className="xhtdGames" onClick={this.onClickBingo.bind(this, {GamePlatform:'CG',GameIdentify:""})}><a>香港六合彩</a></li>
                            <li className="xhtdGames" onClick={this.onClickBingo.bind(this, {GamePlatform:'CG',GameIdentify:""})}><a>北京PK10</a></li>
                            {this.renderBingoList()}
                        </ul>
                    </li>
                    <li className="mainTitle ">
                        <div className="nav_inbox navbx2 n-kaiyuan">
                            <Link to="/streetMachine" activeClassName="active"><i className='glyphicon glyphicon-fire mr5 agFish'></i>开元棋牌</Link>
                        </div>
                    </li>
                    {/* 捕鱼 */}
                    <li className="mainTitle n-AG" onMouseEnter={menuHoverCallback.bind(this, "agFish")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx7">
                            <Link to="/ag" activeClassName="active"><i className="glyphicon glyphicon-fire mr5 agFish"></i>{fishName}</Link>
                        </div>
                    </li>
                    <li className="bomb">        
                        <div className="nav_inbox navbx8">
                            <a href={promotionLink} target="_blank">
                                <i className="glyphicon glyphicon-phone mr5 mt5"></i>{wapDownloadName}
                            </a>
                        </div>
                    </li>
                    <li className="mainTitle n-promo">
                        <div className="nav_inbox navbx9">
                            <Link to="/promotions" activeClassName="active"><i className="glyphicon glyphicon-gift mr5 mt5"></i>优惠活动</Link>
                        </div>
                    </li>               
                    <li onClick={this.serversOpen.bind(this)}><div className="nav_inbox navbx9"><a className="spc-zxkf">在线客服</a></div></li>
                </ul>
            </nav>
        )      
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs,
        user: state.user,
        casinos: state.views.casinos,// 真人数据
        tabGames:state.game.tabGames,
        bingoGames :state.game.bingoGames, // 彩票数据
        platforms: state.game.slot_platforms, // 电子数据
        views: state.views,
        sportGames: state.game.sportGames,
        StreetGames:state.game.StreetGames
    }
);

export default connect(mapStateToProps)(NavigationBar)