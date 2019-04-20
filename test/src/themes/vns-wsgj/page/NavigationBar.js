import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import "./css/NavigationBar.scss"
import {auth} from "globalAction";

class NavigationBar extends Component {

    renderSlotPlatformOnNav() {
        var ret = [];

        for (var i = 0; i < this.props.platforms.length; i++) {
     
            var platform = this.props.platforms[i];
            if (!platform.ShowSlot) {
                continue;
            }
            ret.push(
                <li key={i} className={platform.ID}><Link to="/games" onClick={this.changePT.bind(this,platform.Name2)}>{platform.Name + "平台"}</Link></li>
            );
        }
        return ret;
    }

    changePT(LinkID){
        window.actions.ChangeLinkID(LinkID);
    }
    renderSportList(){
        const _this = this;
        let SportList =[];
        this.props.sportGames.forEach(function (item,index) {
            if(item.GamePlatform =="N188" ){
                if(_this.props.user.token){
                    SportList.push (
                        <li key={index} onClick={_this.onClickGameLink.bind(_this,item)}><a>{item.Title}</a></li>
                    )
                }
            }else{
                SportList.push (
                    <li key={index} onClick={_this.onClickGameLink.bind(_this,item)}><a>{item.Title}</a></li>
                )
            }
        })
        return SportList;
    }
    renderCasinoList() {
        var CasinoLists = [];
        for (var i = 0; i < this.props.casinos.length && i < 8; i++) {
            var CasinoList = this.props.casinos[i];
            CasinoLists.push(
                <li key={i} className={'CasinoHdNav_' + CasinoList.ID} onClick={this.onClickCasinoLink.bind(this, CasinoList)}><Link to="/casino" >{CasinoList.Title}</Link></li>
            );
        }
        return CasinoLists;
    }
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

    onClickBingo(game) {
        if (!auth()) {
            return;
        }
        // if (game.GamePlatform == 'BBIN') { var gameLink = window.configHelper.getGamePlayLink(window.configHelper.BBIN_bingo_id);windowOpen.location.href= gameLink;return; }
        // if (game.GamePlatform == 'KG') { var gameLink = window.configHelper.getGamePlayLink(window.configHelper.KG_bingo_id);windowOpen.location.href= gameLink;return; }
        // if (game.GamePlatform == 'CG') { var gameLink = window.configHelper.getGamePlayLink(window.configHelper.CG_bingo_id);windowOpen.location.href= gameLink;return; }
        // if (game.GamePlatform == 'HK') { var gameLink = window.configHelper.getGamePlayLink("AX_CG_HK6");windowOpen.location.href= gameLink;return; }
        // if (game.GamePlatform == 'CQ') { var gameLink = window.configHelper.getGamePlayLink("AX_CG_CQSSC");windowOpen.location.href= gameLink;return; }
        // if (game.GamePlatform == 'BJ') { var gameLink = window.configHelper.getGamePlayLink("AX_CG_BJPK10");windowOpen.location.href= gameLink;return; }

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

    listRun(tabGames){
        for(let i=1;i<tabGames.length;i++){
            return(<li className="xhtdGames"  onClick={this.onClickGameLink.bind(this,  {GamePlatform:tabGames[i].GamePlatform,Id:tabGames[i].GameIdentify})}><a>{tabGames[i].Title}</a></li>)
        }
    }

    renderTabGames(){
        let tabGames = this.props.tabGames
        if(tabGames.length>0){
            return(
                <ul className="items">
                    <li className="xhtdGames spec-li"  onClick={this.onClickGameLink.bind(this,  {GamePlatform:tabGames[0].GamePlatform,Id:tabGames[0].GameIdentify})}><a>{tabGames[0].Title}</a></li>
                    {
                        this.listRun(tabGames)
                    }
                    {this.renderSlotPlatformOnNav()}
                </ul>
            )
        }
        

    }


    render() {
        const promotionLink =this.props.remoteSysConfs.channel_push_url;
        var options = window.r.props("NavigationBar");
        const menuHoverCallback = this.props.menuHover || function (value) {
        };
       
        return (
            <nav role="navigation" className="Navigation">
                <ul className="main_nav">
                    <li className="spec-lili"><div className="nav_inbox navbx0">
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
                        <div className="nav_inbox navbx3"><Link to="/games" activeClassName="active">电子游艺</Link></div>
                        
                            {this.renderTabGames()}
                           
                    </li>
                    <li className="mainTitle n-bingo" onMouseEnter={menuHoverCallback.bind(this, "bingo")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx4"><Link to="/bingo" activeClassName="active">彩票游戏</Link></div>
                        <ul className="items">
                            <li className="xhtdGames" onClick={this.onClickBingo.bind(this, {GamePlatform:'CG',GameIdentify:""})}><a>重庆时时彩</a></li>
                            <li className="xhtdGames" onClick={this.onClickBingo.bind(this, {GamePlatform:'CG',GameIdentify:""})}><a>腾讯分分彩</a></li>
                            <li className="xhtdGames" onClick={this.onClickBingo.bind(this, {GamePlatform:'CG',GameIdentify:""})}><a>香港六合彩</a></li>
                            {/* <li className="xhtdGames" onClick={this.onClickBingo.bind(this, {GamePlatform:'CG',Id:"D20DF9D9BF004974B80A978801EA2767"})}><a>北京PK10</a></li> */}
                            <li className="xhtdGames" onClick={this.onClickBingo.bind(this, {GamePlatform:'CG',GameIdentify:""})}><a>北京PK10</a></li>
                            {this.renderBingoList()}
                        </ul>
                    </li>
                    <li className="mainTitle n-qipai" onMouseEnter={menuHoverCallback.bind(this, "sport")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx1 n-kaiyuan"><Link activeClassName="active" to="/streetMachine">棋牌游戏</Link></div>
                        {/* <ul className="items">
                            <li className='xhtdGames'><Link to="/streetMachine">开元棋牌</Link></li>
                            <li className='xhtdGames'><Link to="/ag">AG捕鱼</Link></li>
                        </ul> */}
                    </li>
                    <li className="bomb spec-agby">
                        <div className="nav_inbox navbx1 n-kaiyuan"><Link activeClassName="active" to="/ag">捕鱼王</Link></div>
                    </li>
                   
                    <li className="mainTitle n-promo">
                        <div className="nav_inbox navbx9">
                            <Link to="/promotions" activeClassName="active"><i className="glyphicon glyphicon-gift mr5 mt5"></i>优惠活动</Link>
                        </div>
                    </li>
                    <li className="mainTitle">
                        <div className="nav_inbox navbx10 spec-zhuanlun">
                            <Link to="/SstateMent" activeClassName="active"><i className="glyphicon mr5 mt5"></i>流水王</Link>
                        </div>
                    </li>
                    <li className="mainTitle spec-liushui">
                        <div className="nav_inbox navbx10 spec-liushui">
                            <Link to="/LootoPage" activeClassName="active"><i className="glyphicon mr5 mt5"></i>幸运转轮</Link>
                        </div>
                    </li>
                    <li className="bomb">
                        <div className="nav_inbox navbx8">
                           <a href={promotionLink} target="_blank">
                                <i className="glyphicon glyphicon-phone mr5 mt5"></i>
                                手机app下载
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        platforms: state.game.slot_platforms,
        casinos: state.views.casinos,
        sportGames: state.game.sportGames,
        bingoGames :state.game.bingoGames,
        tabGames:state.game.tabGames,
        remoteSysConfs:state.remoteSysConfs
     }
);

export default connect(mapStateToProps)(NavigationBar)