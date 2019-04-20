import React, { Component } from 'react';
import { Link, IndexLink,browserHistory } from 'react-router';
import { connect } from 'react-redux';
import "./NavigationBar.scss"
import {auth} from "globalAction";

class NavigationBar extends Component {
    componentDidMount() {
        if (window.config.spec == "ybb") {
            window.$("ul.main_nav li:eq(10)").insertAfter("ul.main_nav li:eq(0)");
            // window.$("ul.main_nav li:eq(6)").insertAfter("ul.main_nav li:eq(9)");
        }
        if (window.config.spec == "xpj2") {
            window.$('.menu-nav ul li').css({'width':'9%'})
        }
    }

    serversOpen(e) {
        e.preventDefault();
        if (e.target.id == 'test') {
            window.swal({
                title: "忘记密码",
                text: "联系在线客服协助修改密码",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "联系客服",
                showCancelButton: true,
                cancelButtonText: "关闭",
            },
                () => {
                    window.open(this.props.remoteSysConfs.online_service_link, 'servers', 'width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
                });
            return;
        }
        window.open(this.props.remoteSysConfs.online_service_link, 'servers', 'width=900,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=450,screenY=250');
        return false;
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

    renderSlotPlatformOnNav() {
        var ret = [];
        for (var i = 0; i < this.props.platforms.length; i++) {
            var platform = this.props.platforms[i];
            if (!platform.ShowSlot) {
                continue;
            }
            ret.push(
                <li onClick={this.gameLinkTo.bind(this,platform.Name2)} key={i} className={platform.ID}><a>{platform.Name2 + "平台"}</a></li>
                // <li onClick={this.gameLinkTo.bind(this,platform.name2)} key={i} className={platform.id}><Link to="/games">{platform.name2 + "平台"}</Link></li>
            );
        }
        return ret;
    }
    renderCasinoList() {
        var CasinoLists = [];
        if(this.props.views.casinos.length<=0){
            return;
        }
        for (var i = 0; i < this.props.views.casinos.length && i < 8; i++) {
            var CasinoList = this.props.views.casinos[i];
            CasinoLists.push(
                <li key={i} className={'CasinoHdNav_' + CasinoList.ID} onClick={this.onClickCasinoLink.bind(this, CasinoList)}><Link to="/casino" >{CasinoList.Title}</Link></li>
            );
        }
        return CasinoLists;
 
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

    onClickCasino(link) {
        if (!window.actions.auth()) {
            return;
        }

        var gameLink = window.configHelper.getGamePlayLink(link);
        var width = 1020;
        if (link == 'E3953FADF3604EBF8EE67A46866AD21E') {
            width = 1190;
        }
        if (this.win) {
            this.win.close();
        }
        this.win = window.open(gameLink, 'game', "width=" + width + "px,height=700px,directories=0,alwaysRaised=0,depended=1,z-look=1,location=0, menubar=0,scrollbars=0,status=0,toolbar=0,resizable=1,left=5,top=50,screenX=350,screenY=250", true);
    }

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
    listRun(tabGames){
        for(let i=1;i<tabGames.length;i++){
            return(<li className="xhtdGames"  onClick={this.onClickGameLink.bind(this,  {GamePlatform:tabGames[i].GamePlatform,GameIdentify:tabGames[i].GameIdentify})}><a>{tabGames[i].Title}</a></li>)
        }
    }

    renderTabGames(){
        let tabGames = this.props.tabGames
        if(tabGames.length>0){
            return(
                <ul className="items">
                    {/* <li className="xhtdGames spec-li"  onClick={this.onClickGameLink.bind(this,  {GamePlatform:tabGames[0].GamePlatform,GameIdentify:tabGames[0].GameIdentify})}><a>{tabGames[0].Title}</a></li> */}
                    {/* {
                        this.listRun(tabGames)
                    } */}
                    {this.renderSlotPlatformOnNav()}
                </ul>
            )
        }
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

    render() {
        const promotionLink = this.props.remoteSysConfs.channel_push_url;


        let rprops = window.r.props("BingoPage");
        var options = window.r.props("NavigationBar");
        const SecondNav = window.r.get("SecondNav");
        const menuHoverCallback = this.props.menuHover || function (value) {
        };
        const fishName = options.fishName || "捕鱼达人";
        const gamePath = options.gamePath || "/games";
        const gameName = options.gameName || "电子游艺";
        const wapDownloadName = options.wapDownloadName || "手机投注"
        return (
            <nav role="navigation" className="Navigation">
            
                    <ul className="main_nav">
                        <li>
                            <div className="nav_inbox navbx0">
                                <IndexLink to="/" activeClassName="active" className="color-highlight home">
                                {!options.homeText ?
                                    <i className="glyphicon glyphicon-home f24 mt5"></i> : "网站首页" }
                                </IndexLink>
                            </div>
                        </li>
                        <li className="mainTitle n-games" onMouseEnter={menuHoverCallback.bind(this, "games")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                            <div className="nav_inbox navbx3"><Link to={gamePath} activeClassName="active">{gameName}</Link></div>
                            <ul className="items xhtd-spec-list">
                                {this.renderTabGames()}
                            </ul>
                        </li>
                        <li  className="mainTitle n-games" onMouseEnter={menuHoverCallback.bind(this, "pt")}>
                            <div className="nav_inbox navbx7">
                                <Link  activeClassName="active" to="/PT">PT老虎机</Link>
                            </div>
                        </li>
                        <li  className="mainTitle n-games" onMouseEnter={menuHoverCallback.bind(this, "mg")}>
                            <div className="nav_inbox navbx7">
                                <Link  activeClassName="active" to="/MG">MG老虎机</Link>
                            </div>
                        </li>
                        <li className="mainTitle n-games"><div className="nav_inbox navbx2 n-kaiyuan"><Link to="/streetMachine" activeClassName="active">棋牌对战</Link></div></li>
                        <li className="mainTitle n-AG" onMouseEnter={menuHoverCallback.bind(this, "agFish")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx7"><Link to="/ag" activeClassName="active">{fishName}</Link></div>
                        {!options.ag ? null :
                            <ul className="items">
                                <li><Link to="/ag">AG捕鱼</Link></li>
                                <li><Link to="/ag">PT捕鱼：深海大赢家</Link></li>
                            </ul>}
                        </li>
                        <li className="mainTitle " onMouseEnter={menuHoverCallback.bind(this, "casino")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                            <div className="nav_inbox navbx2"><Link to="/casino" activeClassName="active">真人视讯</Link></div>
                            {!options.sub ? null :
                                <ul className="items casino2">
                                    {this.renderCasinoList()}
                                </ul>}
                        </li>
                        <li className="mainTitle n-sport" onMouseEnter={menuHoverCallback.bind(this, "sport")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                            <div className="nav_inbox navbx1"><Link activeClassName="active" to="/sport">体育电竞</Link></div>
                            <ul className="items">
                                {this.renderSportList()}
                            </ul>
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

                       
                        <li className="mainTitle looto n-promo n-news">
                            <div className="nav_inbox navbx1 n-news"><Link activeClassName="active" to="/LootoPage">幸运转轮</Link></div>
                        </li>
                        <li className="mainTitle looto n-promo spec-lsw n-news">
                            {/* <div className="nav_inbox navbx1"><Link activeClassName="active" to="/SstateMent"><i className='glyphicon glyphicon-fire mr5 agFish'></i>流水王</Link></div> */}
                            <div className="nav_inbox navbx1"><Link activeClassName="active" to="/SstateMent">流水王</Link></div>
                        </li>

                      
                        <li className="bomb">
                        
                        <div className="nav_inbox navbx8">
                        
                            <a href={promotionLink} target="_blank">
                                <i className="glyphicon glyphicon-phone mr5 mt5"></i>
                                {wapDownloadName}
                            </a> 
                        </div>
                        </li>
                            {window.config.vip ? null :
                        <li className="mainTitle n-promo">
                            <div className="nav_inbox navbx9">
                                <Link to="/promotions" activeClassName="active"><i className="glyphicon glyphicon-gift mr5 mt5"></i>优惠活动</Link>
                            </div>
                        </li>
                        }
                        <li className="mainTitle n-promo">
                            <Link to="/vip" className="main-menu-link" activeClassName="active">
                                VIP
                            </Link>
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
        platforms: state.game.slot_platforms,
        views: state.views,
        sportGames: state.game.sportGames,
        casinos: state.views.casinos,
        bingoGames :state.game.bingoGames,
        tabGames:state.game.tabGames,
    }
);

export default connect(mapStateToProps)(NavigationBar)