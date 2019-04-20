import React, { Component, } from 'react';
import { Link, IndexLink, browserHistory} from 'react-router';
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
                <li  key={i} onClick={this.changePT.bind(this,platform.Name2)} key={i} className={platform.id}><a>{platform.ID + "平台"}</a></li>
            );
        }
        return ret;
    }

    changePT(LinkID){
       
        if(LinkID == 'OPUS真人/电子')
        LinkID = 'OPUS2'
        window.actions.ChangeLinkID(LinkID);
        browserHistory.push("/");
        setTimeout(() => { 
            browserHistory.push("/games");
        }, 10);
     
    }
    renderSportList(){
        const _this = this;
        let SportList =[];
        if(!this.props.user.username){
            for(let i = 0; i< this.props.sportGames.length; i++){
                if(this.props.sportGames[i].GamePlatform != "N188"){
                    sportGames.push(this.props.sportGames[i]);
                }
            }
        }else{
            sportGames = this.props.sportGames.slice();
        }
        // if(!this.props.user.username){
        //     for(var i=0;i<this.props.sportGames.length;i++){
        //         if(this.props.sportGames[i].GamePlatform != "N188"){
        //             SportList.push (
        //                         <li key={i} onClick={_this.onClickGameLink.bind(_this,this.props.sportGames[i].GamePlatform)}><a>{this.props.sportGames[i].Title}</a></li>
        //                     )
        //         }
        //     }
        // }else{
        //     SportList = this.props.sportGames.slice();
        // }
 
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
    gameLinkTo(val){
        if(val == 'OPUS')
        val = 'OPUS2'
        this.props.dispatch({ type: "ChangeLinkID",data:val });
        browserHistory.push("/");
        setTimeout(() => {
            browserHistory.push("/games");
        }, 10);
       
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

    listRun(){
     var ret = [];
        for(var i=1;i<this.props.tabGames.length;i++){
        var tabGame = this.props.tabGames[i]
        ret.push(
             
            <li className="xhtdGames"  onClick={this.onClickGameLink.bind(this,  {GamePlatform:tabGames.GamePlatform,Id:tabGames.GameIdentify} )}><a>{tabGames.Title}</a></li>
            )
        }
    }

    renderTabGames(){
        let tabGames = this.props.tabGames;
        if(tabGames.length>0){
            return(
                <ul className="items">
                    <li className="xhtdGames spec-li"  onClick={this.onClickGameLink.bind(this, tabGames[0])}><a>{tabGames[0].Title}</a></li>
                    <li className="xhtdGames spec-li"  onClick={this.onClickGameLink.bind(this, tabGames[1])}><a>{tabGames[1].Title}</a></li>
                    <li className="xhtdGames spec-li"  onClick={this.onClickGameLink.bind(this, tabGames[2])}><a>{tabGames[2].Title}</a></li>
                    <li className="xhtdGames spec-li"  onClick={this.onClickGameLink.bind(this, tabGames[3])}><a>{tabGames[3].Title}</a></li>
                   
                    {this.renderSlotPlatformOnNav()}
                </ul>
            )
        }
        

    }


    render() {
        let sportGames = [];
        if(!this.props.user.username){
            for(let i = 0; i< this.props.sportGames.length; i++){
                if(this.props.sportGames[i].GamePlatform != "N188"){
                    sportGames.push(this.props.sportGames[i]);
                }
            }
        }else{
            sportGames = this.props.sportGames.slice();
        }
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
                               {
                                    sportGames.map((item, index)=>{
                                      return(
                                            <li key={index} onClick={this.onClickGameLink.bind(this,item)}><a>{item.Title}</a></li>
                                      )
                                    })
                               }
                            </ul>
                    </li>
                    <li className="mainTitle n-PT"><div className="nav_inbox navbx5"><Link to="/pt" activeClassName="active">PT老虎机</Link></div></li>
                            
                    <li className="mainTitle n-MG"><div className="nav_inbox navbx6"><Link to="/mg" activeClassName="active">MG老虎机</Link></div></li>
                    <li className="mainTitle n-casino" onMouseEnter={menuHoverCallback.bind(this, "casino")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx2"><Link to="/casino" activeClassName="active">真人视讯</Link></div>
                        <ul className="items casino2">
                            {this.renderCasinoList()}
                        </ul>
                    </li>
                    <li className="mainTitle n-bingo" onMouseEnter={menuHoverCallback.bind(this, "bingo")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx4"><Link to="/bingo" activeClassName="active">彩票区</Link></div>
                    </li>
                    <li className="mainTitle n-games" onMouseEnter={menuHoverCallback.bind(this, "games")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx3"><Link to="/games" activeClassName="active">电子游艺</Link></div>
                        
                            {this.renderTabGames()}
                           
                    </li>
                    <li className=" spec-agby">
                        <div className="nav_inbox navbx1 n-kaiyuan"><Link activeClassName="active" to="/ag">
                        <i className='glyphicon glyphicon-fire mr5 agFish'></i>AG捕鱼</Link></div>
                    </li>
                    
                    <li className="mainTitle ">
                    <div className="nav_inbox navbx2 n-kaiyuan"><Link to="/streetMachine" activeClassName="active">
                    <i className='glyphicon glyphicon-fire mr5 agFish'></i>棋牌</Link></div></li>
                 
                   

 
                    <li className="bomb">
                        <div className="nav_inbox navbx8">
                           <a href={promotionLink} target="_blank">
                                <i className="glyphicon glyphicon-phone mr5 mt5"></i>
                                手机投注
                            </a>
                        </div>
                    </li>
                    <li className="mainTitle n-promo">
                        <div className="nav_inbox navbx9">
                            <Link to="/promotions" activeClassName="active"><i className="glyphicon glyphicon-gift mr5 mt5"></i>优惠活动</Link>
                        </div>
                    </li>
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        platforms: state.game.slot_platforms,
        casinos: state.views.casinos,
        sportGames: state.game.sportGames,
        bingoGames :state.game.bingoGames,
        tabGames:state.game.tabGames,
        remoteSysConfs:state.remoteSysConfs
     }
);

export default connect(mapStateToProps)(NavigationBar)