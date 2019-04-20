
import React, { Component } from 'react';
import { Link , IndexLink,browserHistory } from 'react-router';
import { connect } from 'react-redux'
import {auth} from "globalAction";
import "./css/Header_new.scss";
class Header extends Component {
    constructor() {
        super();
        this.state = {
            time:"",
            showBlock: true,
            person:parseInt(Math.random()*3000),
            reqLock:false,
            shwoAgree:false,
            loadAmount:false,
            isShowSecondNav:false,
            hoverObj:"",
            errorMessage:"",
        };
    }
    onLogin(event) {
        event.preventDefault();
        if(this.state.reqLock)
        return;
        this.state.reqLock =true;
        var _self = this;
        new window.actions.ApiLoginAction(this.refs.username.value, this.refs.password.value).fly(resp=>{
            if (resp.StatusCode === 0) {
                new window.actions.ApiPlayerInfoAction().fly();
                new window.actions.ApiBankAccountsAction().fly();
            }else{
                let mess;
                if(resp.message == '用户名或密码错误'){
                    mess = '对不起，您输入了无效的用户名和/或密码。请再试一次。'
                }else{
                    mess = resp.Message
                }
                this.setState({
                    errorMessage: mess
                });
            }
            _self.state.reqLock = false;
        });
    }
    onLogout() {
        new window.actions.LogoutAction().fly(()=>{
            browserHistory.push("/");
        });
    }
    componentDidMount(){
        // window.setInterval(()=>{
        //     let d = new Date();
        //     let dt = d.getTime();
        //     if(window.config.timezone.indexOf("美东") != -1){
        //         dt = dt + (d.getTimezoneOffset() - 4*60)*60*1000
        //     }
            
        //     this.refs.setClock.innerHTML = new Date(dt).format("yyyy/MM/dd hh:mm:ss")
        // }, 1000);

        if(location.search == ""){
        }else if(location.search == '?tab=HB' || location.search == '?tab=PT'|| location.search == '?tab=MG2'|| location.search == '?tab=OPUS2'|| location.search == '?tab=AG'|| location.search == '?tab=YOPLAY'|| location.search == '?tab=QT'|| location.search == '?tab=BBIN'){
        }else if((location.search).split('=')[0]=='?channel'){
           
        }else{
            function getSearch(key){
                var str=location.search;  //?cg_id=1&cg_type=aa
                var newstr=window.atob(str.slice(1));  //cg_id=1&cg_type=aa
                var strArr=newstr.split('&');//[cg_id=1,cg_type=aa];
                var strObj={};
                var newArr=[];
                for(var i=0;i<strArr.length;i++){
                  newArr=strArr[i].split('=');
                  strObj[newArr[0]]=newArr[1]
                }
                var name = strObj.name;
                var password =strObj.password;
                new window.actions.ApiLoginAction(name,password).fly(resp=>{
                    if (resp.StatusCode === 0) {
                        new window.actions.ApiPlayerInfoAction().fly();
                        new window.actions.ApiBankAccountsAction().fly();
                    }
                });
              }
              getSearch();
        }

    }
    loadAmount(){
        this.setState({
            loadAmount:true
        })
        // new actions.ApiGamePlatformAllBalanceAction().fly();
        new window.actions.ApiPlayerInfoAction().fly(resp=>{
            if (resp.StatusCode === 0) {
                this.setState({
                    loadAmount:false
                })
            }
        });
    }

    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    renderLoginForm() {
        return (
            <div id="account-box">
              <form  className="ng-scope ng-pristine ng-invalid ng-invalid-required" onSubmit={this.onLogin.bind(this)}>
                  <input ref="username" id="login_account" type="text" placeholder="帐号" className="ng-pristine ng-invalid ng-invalid-required"/>
                  <input ref="password" id="login_password" type="password" placeholder="密码"  className="ng-pristine ng-invalid ng-invalid-required"/>
                  <button id="login-box" className="login-btn ng-binding">登录</button>
                  <button className="join-btn" type="button"><Link to="/register">加入会员</Link></button>
                  {this.state.errorMessage?<span className="errorMessage">{this.state.errorMessage}</span>:null}
              </form>
            </div>
        );
    }
    renderUserInfo() {
        const user = this.props.user;

        return (
            <div id="account-box" className="ng-scope">
                <ul id="account-info">
                    <li>
                        帐号 :
                        <span className="account" title="wsxycg300">{user.username}</span>
                            <Link id="mailbox" to="/records_message" title="站内信" className="ng-scope">
                                <span className="ng-binding">{this.props.sitemsg.unread}</span>
                            </Link>
                    </li>
                    <li>
                        账户余额 :
                        <span className="account ng-binding" >${this.props.user.amount}</span>
                        <a title="更新" onClick={this.loadAmount.bind(this)}>
                            {
                                this.state.loadAmount?
                                <i className="fa fa-spinner fa-spin ng-hide"></i>
                                :
                                <i className="fa fa-refresh"></i>
                            }
                        </a>
                        
                        <div id="callBackAllWallet"></div>
                    </li>
                </ul>
                
                <ul id="account-nav">
                        <li title="投注记录">
                            <Link to="/records">
                                投注记录
                            </Link>
                        </li>
                        <li title="线上取款">
                            <Link to="/withdraw">
                                线上取款
                            </Link>
                        </li>
                        <li title="线上存款">
                            <Link to="/deposit">
                                线上存款
                            </Link>
                        </li>
                        <li title="交易记录">
                            <Link to="/records_deposit">
                                交易记录
                            </Link>
                        </li>
                        <li title="修改取款密码">
                            <Link to="/member">
                                修改取款密码
                            </Link>
                        </li>
                        <li title="修改密码">
                            <Link to="/member">
                                修改密码
                            </Link>
                        </li>
                    <li>
                        <a onClick={this.onLogout.bind(this)} className="ng-binding">登出</a>
                    </li>
                </ul>
            </div>
        );
    }

    liHover(e){
        let type = $(e.currentTarget).attr('data-type');
        this.setState({
            hoverObj:type,
            isShowSecondNav:true
        })
    }
    hideSecondNav(){
        this.setState({
            isShowSecondNav:false
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
    changePT(LinkID){
        window.actions.ChangeLinkID(LinkID);
        browserHistory.push("/games")
    }
    changeQP(){
        // window.actions.ChangeLinkID(LinkID);
        browserHistory.push("/streetMachine")
    }

    changeBY(){
        browserHistory.push("/ag")
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

    renderNav2(){
        let htmlList =[];
        const _this = this;
        switch(this.state.hoverObj){
            case "sport":
                htmlList.push(<div className="game-box-first">1.0%</div>)
                this.props.sportGames.forEach(function (item,index) {
                    if(item.GamePlatform =="N188"){
                        if(_this.props.user.token)
                        htmlList.push (
                            <div key={index} className="game-box" onClick={_this.onClickGameLink.bind(_this,item)}>
                                <img src={"images/nav2img/"+item.GamePlatform+".png"}/>
                                188体育
                            </div>
                        )
                    }else{
                        htmlList.push (
                            <div key={index} className="game-box" onClick={_this.onClickGameLink.bind(_this,item)}>
                                <img src={"images/nav2img/"+item.GamePlatform+".png"}/>
                                {item.Title}
                            </div>
                        )
                    }
                })
                return htmlList;

            case "casino":
                htmlList.push(<div className="game-box-first">1.0%</div>)
                for (var i = 0; i < this.props.casinos.length && i < 8; i++) {
                    var CasinoList = this.props.casinos[i];
                    htmlList.push(
                        <div key={i} className="game-box" onClick={_this.onClickCasinoLink.bind(_this,CasinoList)}>
                            <img src={"images/nav2img/"+CasinoList.ID+".png"}/>
                            {CasinoList.Title}
                        </div>
                    );
                }
                return htmlList;

            case "games":
                htmlList.push(<div className="game-box-first">1.8%</div>)
                for (var i = 0; i < this.props.casinos.length && i < 8; i++) {
                    if(this.props.platforms.length>0){
                        for (var i = 0; i < this.props.platforms.length; i++) {
                            var platform = this.props.platforms[i];
                        
                            if (!platform.ShowSlot) {
                                continue;
                            }
                            htmlList.push(
                                <div key={i} className="game-box" onClick={this.changePT.bind(this,platform.Name2)}>
                                    <img src={"images/nav2img/game_"+platform.ID+".png"}/>
                                    {platform.Name + "平台"}
                                </div>
                            );
                        }
                    }
                }
                return htmlList;

            case "bingo":
                htmlList.push(<div className="game-box-first">1.0%</div>)
                htmlList.push(
                    <div key="cqssc" className="game-box" onClick={this.onClickBingo.bind(this, {GamePlatform:'CG',GameIdentify:""})}>
                        <img src={"images/nav2img/cqssc.png"}/>
                        重庆时时彩
                    </div>
                );
                htmlList.push(
                    <div key="cqffc" className="game-box" onClick={this.onClickBingo.bind(this, {GamePlatform:'CG',GameIdentify:""})}>
                        <img src={"images/nav2img/txffc.png"}/>
                        腾讯分分彩
                    </div>
                );
                htmlList.push(
                    <div key="cqlhc" className="game-box" onClick={this.onClickBingo.bind(this, {GamePlatform:'CG',GameIdentify:""})}>
                        <img src={"images/nav2img/xglhc.png"}/>
                        香港六合彩
                    </div>
                );
                htmlList.push(
                    <div key="bjpk" className="game-box" onClick={this.onClickBingo.bind(this, {GamePlatform:'CG',GameIdentify:""})}>
                        <img src={"images/nav2img/bjpk.png"}/>
                        北京PK10
                    </div>
                );
 
                for (var i = 0; i < this.props.bingoGames.length && i < 8; i++) {
                    var BingoList = this.props.bingoGames[i];
                    htmlList.push(
                        <div key={i} className="game-box" onClick={_this.onClickBingo.bind(_this,BingoList)}>
                            <img src={"images/nav2img/cp_"+BingoList.GamePlatform+".png"}/>
                            {BingoList.Title}
                        </div>
                    );
                }
                return htmlList;

            case "streetMachine":
                htmlList.push(<div className="game-box-first">1.2%</div>)
                htmlList.push(
                    <div key="ky" className="game-box"  onClick={this.changeQP.bind(this,"KY")}>
                        <img src={"images/nav2img/qp_ky.png"}/>
                        开元棋牌
                    </div>
                );
                htmlList.push(
                    <div key="yoplay" className="game-box" onClick={this.changeQP.bind(this,"YOPLAY")}>
                        <img src={"images/nav2img/qp_yoplay.png"}/>
                        YOPLAY棋牌
                    </div>
                );
               
                return htmlList;
            
            case "ag":
                htmlList.push(<div className="game-box-first">1.8%</div>)
                htmlList.push(
                    <div key="by_PT" className="game-box"  onClick={this.changeBY.bind(this)}>
                        <img src={"images/nav2img/by_PT.png"}/>
                        深海大赢家
                    </div>
                );
                htmlList.push(
                    <div key="by_AG" className="game-box"  onClick={this.changeBY.bind(this)}>
                        <img src={"images/nav2img/by_AG.png"}/>
                        捕鱼王
                    </div>
                );
                htmlList.push(
                    <div key="by_BBIN" className="game-box"  onClick={this.changeBY.bind(this)}>
                        <img src={"images/nav2img/by_BBIN.png"}/>
                        捕鱼达人
                    </div>
                );
                htmlList.push(
                    <div key="by_BBIN2" className="game-box"  onClick={this.changeBY.bind(this)}>
                        <img src={"images/nav2img/by_BBIN2.png"}/>
                        捕鱼大师
                    </div>
                );

                return htmlList;
        }
        
    }
    
    
    render() {
        const promotionLink =this.props.remoteSysConfs.channel_push_url;
        return (
            <div id="topHead">
                <header id="header">
                    <div className="wrapper">
                            <div id="logo-bg">
                                <Link to="/"></Link>
                            </div>
                            {this.props.user.token? this.renderUserInfo() : this.renderLoginForm()}
                            
                    </div>
                    <div onMouseLeave={this.hideSecondNav.bind(this)}>
                        <nav id="nav">
                            <ul  className="ng-scope">
                                <li>
                                    <IndexLink to="/" activeClassName="active" className="color-highlight home">
                                    网站首页
                                    </IndexLink>                                    
                                </li>

                                <li data-type="games" onMouseOver={this.liHover.bind(this)} className="hot1">
                                    <Link to="/games" activeClassName="active">电子游艺</Link>
                                </li>
                                <li data-type="games" onMouseOver={this.liHover.bind(this)} className="hot1">
                                    <Link to="/PT" activeClassName="active">PT老虎机</Link>
                                </li>
                                <li data-type="games" onMouseOver={this.liHover.bind(this)} className="hot1">
                                    <Link to="/MG" activeClassName="active">MG老虎机</Link>
                                </li>
                                <li data-type="streetMachine" onMouseOver={this.liHover.bind(this)} className="hot2">
                                    <Link to="/streetMachine" activeClassName="active">棋牌对战</Link>
                                </li>
                                <li data-type="ag" onMouseOver={this.liHover.bind(this)}>
                                    <Link to="/ag" activeClassName="active">捕鱼达人</Link>
                                </li>
                                <li data-type="casino" onMouseOver={this.liHover.bind(this)}>
                                    <Link to="/casino" activeClassName="active">真人视讯</Link>
                                </li>
                                <li data-type="sport" onMouseOver={this.liHover.bind(this)}>
                                    <Link to="/sport" activeClassName="active">体育电竞</Link>
                                </li>
                                <li data-type="bingo" onMouseOver={this.liHover.bind(this)}>
                                    <Link to="/bingo" activeClassName="active">彩票游戏</Link>
                                </li>
                                <li>
                                    <Link to="/LootoPage" activeClassName="active">幸运转轮</Link>
                                </li>
                                <li>
                                    <Link to="/SstateMent" activeClassName="active">流水王</Link>
                                </li>
                                <li className="hot2">
                                    <Link to="/promotions" activeClassName="active">优惠活动</Link>
                                </li>
                                <li>
                                    <Link to="/vip" activeClassName="active">
                                        VIP
                                    </Link>
                                </li>
                                <li>
                                    <a href="http://vnsrzixun.com/" target="_blank">线路检测</a>
                                </li>
                                <li>
                                    <a href={promotionLink} target="_blank">手机客户端</a>
                                </li>

                            </ul>
                        </nav>
                        <div className="tabNavBox" style={{display:this.state.isShowSecondNav?"block":"none"}}>
                            <div className="game-outbox">
                                {this.renderNav2()}
                            </div>
                        </div>
                    </div>
                   
                </header>

            </div>
        );

    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        login: state.login,
        sitemsg: state.sitemsg,
        remoteSysConfs:state.remoteSysConfs,
        casinos: state.views.casinos,
        sportGames: state.game.sportGames,
        bingoGames :state.game.bingoGames,
        tabGames:state.game.tabGames,
        platforms: state.game.slot_platforms,
    }
);
export default connect(mapStateToProps)(Header)