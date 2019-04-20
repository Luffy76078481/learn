import React, { Component } from 'react';
import { Link, IndexLink ,browserHistory} from 'react-router';
import { connect } from 'react-redux';
import {auth} from "globalAction";
import "./NavigationBar_xhXhtd_new.scss"
var mega = {};
var $activeElement;

class NavigationBar extends Component {
    // 挂载
    componentDidMount() {
        $('[rel]').hover(function() {
            // active[rel]，展开的元素
            $activeElement = $activeElement != undefined ?$activeElement : $('.active[rel]');
            // 元素的rel属性值
            var _rel = $(this).attr('rel');
            clearTimeout(mega[_rel + '_timer']);
            // 对象添加方法
            mega[_rel + '_timer'] = setTimeout(function() {
                // 遍历涵盖rel属性的元素
                $('[rel]').each(function() {
                    //如果等于此rel值的添加active Class,其他删除active Class
                    $(this)[_rel == $(this).attr('rel') ? 'addClass' : 'removeClass']('active');
                });
                // slideDown() 方法通过使用滑动效果，显示隐藏的被选元素。对应二级导航展开
                $('#' + _rel).stop(true, true).slideDown("300");
    
            }, 150);
        }, function() {
            var _rel = $(this).attr('rel');
            clearTimeout(mega[_rel + '_timer']);
            mega[_rel + '_timer'] = setTimeout(function() {
                $('[rel]').removeClass('active');
                $activeElement.addClass('active');
                $('#' + _rel).stop(true, true).slideUp(300);
            }, 150);
        });  
    }
    // 电子二级
    renderSlotPlatformOnNav() {
        let ret = [];      
        for (var i = 0; i < this.props.platforms.length; i++) {
            var platform = this.props.platforms[i];
            if (platform.Name == "YOPLAY" || platform.Name2 == "YOPLAY") {
                continue;
            }
            ret.push(
                <li onClick={this.gameLinkTo.bind(this,platform.ID)} key={i+platform.Name} ><Link className={'pt_'+platform.ID.toLowerCase()}></Link></li>
            );
        }            
        return ret;
    }
    // 电子二级点击
    gameLinkTo(LinkID){
        window.actions.ChangeLinkID(LinkID);
        browserHistory.push("/");
        setTimeout(() => { 
            browserHistory.push("/games");
        }, 10);
    }
    // 真人二级
    renderCasinoList() {
        var CasinoLists = [];
        for (var i = 0; i < this.props.casinos.length && i < 8; i++) {
            var CasinoList = this.props.casinos[i];
            CasinoLists.push(
                <li key={i} onClick={this.onClickCasinoLink.bind(this, CasinoList)}><Link to="/casino" className={'casino_'+CasinoList.ID.toLowerCase()} ></Link></li>
            );
        }
        return CasinoLists;
    }
    // 真人二级点击
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
    // 彩票点击
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
    // 彩票2级
    renderBingoList(){
        let BingoLists = [];
        let bingoGames = this.props.bingoGames;
        
        for (let i = 0; i < bingoGames.length && i < 8; i++) {
            let BingoList = bingoGames[i];   
            let className;
            if(BingoList.Title.includes('重庆时时彩')){
                className = 'CQSSC1';
            }else if(BingoList.Title.includes('香港六合彩')){
                className = 'HK60';
            }else if(BingoList.Title.includes('北京赛车')){
                className = 'BJPK101';
            }else if(BingoList.Title.includes('CG')){
                className = 'CG';
            }else if(BingoList.Title.includes('BBIN')){
                className = 'BBIN';
            }else if(BingoList.Title.includes('FC')){
                className = 'FC';
            }
            
            BingoLists.push(
                <li key={className+i}  onClick={this.onClickBingo.bind(this, BingoList)}>
                    <a className = {className}></a>
                </li>
            );
        }

        return BingoLists;
    }
    // 棋牌游戏
    readPqGames(){
        var _this = this;
        let gameId = {
            qznn:830,
            zjh:220,
            ddz:610
        }
        return (
            <ul className="show_option">
                <li > <Link  to="/streetMachine" className='qp_tm'></Link></li>
                <li ><Link  to="/streetMachine" className='qp_ky'></Link></li>
                {/* <Link activeClassName="active" to="/streetMachine"><a className='qp_tm'></a></Link>
                <Link activeClassName="active" to="/streetMachine"><a className='qp_ky'></a></Link> */}
                {/* <li onClick={_this.onClickGame.bind(_this, gameId.ddz)}><a className='qp_ddz'></a></li> */}
            </ul>
        )
    }
 
    //棋牌游戏点击
    onClickGame(id){
        if (!window.actions.auth()) {
            return;
        }
        let parma = {
            GamePlatform:"ky",
            GameType:"slot",
            GameId:id,
            IsMobile:false,
            IsDemo:false,
            YoPlay: 1
        }
       
        let windowOpen = window.Util.windowOpen('StreetGame');
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    // 捕鱼点击
    onClickFishLink(type){
        if (!window.actions.auth()) {
            return;
        }
        let parma;
        if( type=='ag' ){
            parma = {
                GamePlatform:'AG',
                GameType:'slot',
                GameId:6,
                IsMobile:false,
                IsDemo:false,
            }; 
        }
        if( type=='bbin' )(
            parma = {
                GamePlatform:'BBIN',
                GameType:'slot',
                GameId:30599,
                IsMobile:false,
                IsDemo:false,            
            }
        )
        let windowOpen = window.Util.windowOpen('AgGame');
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    
    // 体育二级导航游戏点击
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
                        <li key={index} onClick={_this.onClickGameLink.bind(_this,item)}><a className={item.GamePlatform.toLowerCase()}></a></li>
                    )
                }
            }else{
                SportList.push (
                    <li key={index} onClick={_this.onClickGameLink.bind(_this,item)}><a className={item.GamePlatform.toLowerCase()}></a></li>
                )
            }            
        })
        return SportList;
    }
    // 渲染
    render() {
        var options = window.r.props("NavigationBar");
        const menuHoverCallback = this.props.menuHover || function (value) {};
        const bingoName = options.bingoName || "彩票区";
        const fishName = options.fishName || "捕鱼游戏";
        const gamePath = options.gamePath || "/games";
        const gameName = options.gameName || "电子游艺";
        return (
            <div className="navNav">
                <nav role="navigation" className="Navigation">                           
                    <ul className="main_nav">
                        {/* 首页 */}
                        <li className="mainTitle">
                            <div className="nav_inbox navbx0">
                                <IndexLink to="/" activeClassName="active" className="color-highlight home">
                                    <i className="glyphicon glyphicon-home mr5 agFish"></i>
                                    首页
                                </IndexLink>
                            </div>
                        </li>
                        {/* 体育 */}
                        <li rel="sub-nav1" className="mainTitle n-sport option_box" onMouseEnter={menuHoverCallback.bind(this, "sport")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                            <div className="nav_inbox navbx1">
                                <Link activeClassName="active" to="/sport"><i className="nav_icon nav_sports"></i>体育投注</Link>
                            </div>
                        </li>
                        {/* 真人 */}
                        <li rel="sub-nav2" className="mainTitle n-casino option_box" onMouseEnter={menuHoverCallback.bind(this, "casino")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                            <div className="nav_inbox navbx2">
                                <Link to="/casino" activeClassName="active"><i className="nav_icon nav_casino"></i>真人视讯</Link>
                            </div>
                        </li>
                        {/* 电子 */}
                        <li rel="sub-nav3" className="mainTitle n-games option_box" onMouseEnter={menuHoverCallback.bind(this, "games")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                            <div className="nav_inbox navbx3">
                                <Link to={gamePath} activeClassName="active"><i className="nav_icon nav_game"></i>{gameName}</Link>
                            </div>                
                        </li>
                        {/* 彩票 */}
                        <li rel="sub-nav4" className="mainTitle n-bingo option_box" onMouseEnter={menuHoverCallback.bind(this, "bingo")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                            <div className="nav_inbox navbx4"><Link to="/bingo" activeClassName="active"><i className="nav_icon nav_lottery"></i>{bingoName}</Link></div>             
                        </li>
                        {/* 
                            <li className="mainTitle n-PT"><div className="nav_inbox navbx5"><Link to="/pt" activeClassName="active">PT老虎机</Link></div></li>      
                            <li className="mainTitle n-MG"><div className="nav_inbox navbx6"><Link to="/mg" activeClassName="active">MG老虎机</Link></div></li> 
                        */}
                        {/* 棋牌 */}
                        <li rel="sub-nav5" className="mainTitle option_box" onMouseEnter={menuHoverCallback.bind(this, "sport")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                            <div className="nav_inbox navbx1 kaiyuan_box">
                                <Link activeClassName="active" to="/streetMachine"><i className="nav_icon nav_kyIcon"></i>棋牌</Link>
                            </div>                          
                        </li>
                        {/* 捕鱼 */}
                        <li rel="sub-nav6" className="mainTitle n-AG option_box" onMouseEnter={menuHoverCallback.bind(this, "agFish")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                            <div className="nav_inbox navbx7">
                                <Link to="/ag" activeClassName="active"><i className="glyphicon glyphicon-fire mr5 agFish"></i>{fishName}</Link>
                            </div>
                        </li>      
                        {/* 优惠活动 */}
                        <li className="mainTitle n-promo">
                            <div className="nav_inbox navbx9">
                                <Link to="/promotions" activeClassName="active"><i className="glyphicon glyphicon-gift mr5 mt5"></i>优惠活动</Link>
                            </div>
                        </li>
                    </ul>     
                </nav>
                {/* 二级导航 */}
                <div className="secondWrap">
                    <nav rel="sub-nav1" id="sub-nav1"><div className="container"><ul className="show_option">{this.renderSportList()}</ul></div></nav>
                    <nav rel="sub-nav2" id="sub-nav2"><div className="container"><ul className="show_option">{this.renderCasinoList()}</ul></div></nav>
                    <nav rel="sub-nav3" id="sub-nav3"><div className="container"><ul className="show_option">{this.renderSlotPlatformOnNav()}</ul></div></nav>
                    <nav rel="sub-nav4" id="sub-nav4"><div className="container"><ul className="show_option">{this.renderBingoList()}</ul></div></nav>
                    <nav rel="sub-nav5" id="sub-nav5"><div className="container"><ul className="show_option">{this.readPqGames()}</ul></div></nav>
                    <nav rel="sub-nav6" id="sub-nav6">  
                        <div className="container">                             
                            <ul className="show_option">                         
                                <li><Link className='agFish' onClick={this.onClickFishLink.bind(this, 'ag')}></Link></li>
                                <li><Link className='bbFish' onClick={this.onClickFishLink.bind(this, 'bbin')}></Link></li>
                            </ul>
                        </div> 
                    </nav>
                </div>                
            </div>

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