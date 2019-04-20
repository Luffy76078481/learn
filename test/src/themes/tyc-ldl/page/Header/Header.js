
import React, { Component } from 'react';
import { Link , IndexLink,browserHistory } from 'react-router';
import { Tooltip,Icon} from 'antd';
import { connect } from 'react-redux'
import QRCode from 'qrcode.react';
import "./Header.scss";
class Header extends Component {
    constructor() {
        super();
        this.state = {
            time:"",
            showBlock: "",
            reqLock:false,
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
                new window.actions.ApiBankAccountsAction().fly();
                new window.actions.ApiPlayerInfoAction().fly();
            }else{
                let mess;
                if(resp.Message == '用户名或密码错误'){
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
        new window.actions.LogoutAction().fly();
        browserHistory.push('/');
    }
    componentWillMount(){
        new window.actions.ApiQueryPromotionsAction(1,20,null,false).fly();
    }
    componentDidMount(){
        window.setInterval(()=>{
            let d = new Date();
            let dt = d.getTime();
            if(window.config.timezone.indexOf("美东") != -1){
                dt = dt + (d.getTimezoneOffset() - 4*60)*60*1000
            }
        }, 1000);

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
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    renderLoginForm() {
        return (
            <form id="login-form" onSubmit={this.onLogin.bind(this)}>
                <div className="form-login-reg">
                    <Link to="/register" className="form-reg-btn" >立即注册</Link>
                </div>
                <div className="inputDiv">
                    <input type="text" ref="username"  id="demotestid2" className="account-input input-type border-type" placeholder="用户名"/>
                </div>
                <div className="inputDiv">
                    <input type="password" ref="password" className="pwd-input input-type border-type" placeholder="密码"/>
                    <a onClick={this.serversOpen.bind(this)} className="forget">
                        忘记
                    </a>
                </div>
                <div>
                    <button type="submit" className="loginBt">登录</button>
                </div>
                {this.state.errorMessage?<span className="errorMessage">{this.state.errorMessage}</span>:null}
                <div className="clear"></div>
            </form>
        );
    }
    renderUserInfo() {
        const user = this.props.user;
        return (
            <div className="userInfo">
                <span className="memberItem">你好,<b>{user.username}</b>(总额:{this.props.user.amount} RMB)</span>
                <Tooltip title="存款" getPopupContainer={
                    (triggerNode)=> triggerNode
                }>
                    <Link to="/withdrawAndDeposit" className="circle-icon">存</Link>
                </Tooltip>
                <Tooltip title="转款" getPopupContainer={
                    (triggerNode)=> triggerNode
                }>
                    <Link to="/transfer" className="circle-icon">转</Link>
                </Tooltip>
                <Tooltip title="取款" getPopupContainer={
                    (triggerNode)=> triggerNode
                }>
                    <Link to="/withdrawAndDeposit/withdraw" className="circle-icon">取</Link>
                </Tooltip>
                <Tooltip title="用户中心" getPopupContainer={
                    (triggerNode)=> triggerNode
                }>
                    <Link to="/member"><Icon type="user" /></Link>
                </Tooltip>
                <Tooltip title="消息中心" getPopupContainer={
                    (triggerNode)=> triggerNode
                }>
                    <Link to="/records_message" >
                        <Icon type="mail" />
                        <span>({this.props.sitemsg.unread})</span>
                    </Link>
                </Tooltip>
                <Tooltip title="登出" getPopupContainer={
                    (triggerNode)=> triggerNode
                }>
                    <a onClick={this.onLogout.bind(this)}>
                        <Icon type="logout" />
                    </a>
                </Tooltip>
            </div>
        );
    }

    renderSlotPlatformOnNav(){
        var ret = [];
        for (var i = 0; i < this.props.slot_platforms.length; i++) {
            var platform = this.props.slot_platforms[i];
            let itemIcon = "";
            if(!platform.ShowSlot){
                continue;
            }
            if(platform.ID=="BBIN" || platform.ID=="TGP"){
                itemIcon=(<span className="itemIcon"></span>);
            }
            if(platform.Name2 !="YOPLAY") {
                ret.push(
                    <li className={"li-"+i} key={i}>
                        <Link  to={"/games/tab=" + platform.ID}>
                            {itemIcon}
                            <div className="itemName">{platform.Name}</div>
                            <div className={"itemImg "+platform.ID}></div>
                            <div className="itemBtn">
                                <a>进入大厅</a>
                            </div>
                        </Link>
                    </li>
                );
            }
        }
        return ret;
    }
    toSportGame(game){
        if (!window.actions.auth()) {
            return;
        }
        let parma = {
            GamePlatform:game.GamePlatform,
            GameType:game.GameTypeText,
            GameId:game.GameIdentify,
            IsMobile:false,
            IsDemo:false,
        }
        browserHistory.push('/sport/'+game.GamePlatform)
    }
    renderSportNav(){
        var ret = [];
        let sportGames = [];
        //用户未登陆不显示N188体育
        if(!this.props.user.username){
            for(let i = 0; i< this.props.sportGames.length; i++){
                if(this.props.sportGames[i].GamePlatform != "N188"){
                    sportGames.push(this.props.sportGames[i]);
                }
            }
        }else{
            sportGames = this.props.sportGames;
        }
        for (var i = 0; i < sportGames.length; i++) {
            var sport = sportGames[i];
            let itemIcon = "";
            if(sport.GamePlatform=="N188" ){
                itemIcon=(<span className="itemIcon"></span>);
            }
            ret.push(
                <li className={"li-"+i} key={i}>
                    <a onClick={this.toSportGame.bind(this,sport)}>
                        {itemIcon}
                        <div className="itemName">{sport.Title}</div>
                        <div className={"itemImg "+sport.GamePlatform}></div>
                        <div className="itemBtn">
                            <a>进入大厅</a>
                        </div>
                    </a>
                </li>
            );
        }
        return ret;
    }
    toCasinosGame(game){
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
    renderCasinosNav(){
        var ret = [];
        for (var i = 0; i < this.props.casinos.length; i++) {
            var casinos = this.props.casinos[i];
            if(casinos.PlatformId =="OPUS2") continue;//应sky要求去掉印尼厅
            let itemIcon = "";
            if(casinos.PlatformId=="TGP" || casinos.PlatformId=="BBIN" ){
                itemIcon=(<span className="itemIcon"></span>);
            }
            ret.push(
                <li className={"li-"+i} key={i}>
                    <a onClick={this.toCasinosGame.bind(this,casinos)}>
                        {itemIcon}
                        <div className="itemName">{casinos.Title}</div>
                        <div className={"itemImg "+casinos.PlatformId}></div>
                        <div className="itemBtn">
                            <a>进入大厅</a>
                        </div>
                    </a>
                </li>
            );
        }
        return ret;
    }
    toBingoGame(game){
        if (!window.actions.auth()) {
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
    renderBingoNav(){
        var ret = [];
        for (var i = 0; i < this.props.bingoGames.length; i++) {
            var bingoGames = this.props.bingoGames[i];
            ret.push(
                <li className={"li-"+i} key={i}>
                    <a onClick={this.toBingoGame.bind(this,bingoGames)}>
                        <div className="itemName">{bingoGames.Title}</div>
                        <div className={"itemImg bingo_"+bingoGames.GamePlatform}></div>
                        <div className="itemBtn">
                            <a>进入大厅</a>
                        </div>
                    </a>
                </li>
            );
        }
        return ret;
    }
    toAGGame(parma){
        if (!window.actions.auth()) {
            return;
        }

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
    renderAGNav(){
        let ret = [];
        let gameContent = this.props.agGames;
        let agLink,bbinLink;
        if(gameContent.length>0){
            for(var i=0; i<gameContent.length;i++){
                let item = gameContent[i];
                if(item.GamePlatform=="AG"){
                    agLink = {
                        GamePlatform:item.GamePlatform,
                        GameType:item.GameTypeText,
                        GameId:item.GameIdentify,
                        IsMobile:false,
                        IsDemo:false,
                    };
                }else{
                    bbinLink = {
                        GamePlatform:item.GamePlatform,
                        GameType:item.GameTypeText,
                        GameId:item.GameIdentify,
                        IsMobile:false,
                        IsDemo:false,
                    };
                }
            }
        }
        if(agLink !=null){
            ret.push(
                <li className={"li-0"} key={0}>
                    <a onClick={this.toAGGame.bind(this,agLink)}>
                        <div className="itemName">AG 捕鱼王</div>
                        <div className={"itemImg ag_buyu"}></div>
                        <div className="itemBtn">
                            <a>进入大厅</a>
                        </div>
                    </a>
                </li>
            );
            ret.push(
                <li className={"li-3"} key={3}>
                    <a onClick={this.toAGGame.bind(this,agLink)}>
                        <div className="itemName">PT 深海大赢家</div>
                        <div className={"itemImg ag_shenhai"}></div>
                        <div className="itemBtn">
                            <a>进入大厅</a>
                        </div>
                    </a>
                </li>
            );
        }
        if(bbinLink !=null){
            ret.push(
                <li className={"li-1"} key={1}>
                    <a onClick={this.toAGGame.bind(this,bbinLink)}>
                        <div className="itemName">BBIN 捕鱼大师</div>
                        <div className={"itemImg ag_buyuBBin"}></div>
                        <div className="itemBtn">
                            <a>进入大厅</a>
                        </div>
                    </a>
                </li>
            );
            ret.push(
                <li className={"li-2"} key={2}>
                    <a onClick={this.toAGGame.bind(this,bbinLink)}>
                        <div className="itemName">BBIN 捕鱼达人</div>
                        <div className={"itemImg ag_buyuDaren"}></div>
                        <div className="itemBtn">
                            <a>进入大厅</a>
                        </div>
                    </a>
                </li>
            );
        }
        return ret;
    }
    toStreetGame(game){
        if (!window.actions.auth()) {
            return;
        }
        let parma = {
            GamePlatform:game.GamePlatform,
            GameType:game.GameTypeText,
            GameId:game.GameIdentify,
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
    renderStreetNav(){
        let ret = [];
        let game=[
            {//抢庄牛牛
                GamePlatform:"KY",
                GameTypeText: "slot",
                GameIdentify:"830",
            },
            {//砸金花
                GamePlatform:"KY",
                GameTypeText: "slot",
                GameIdentify:"220",
            },
            {//二八杠
                GamePlatform:"KY",
                GameTypeText: "slot",
                GameIdentify:"720",
            },
        ]
        ret.push(
            <div className={"hasChild"} key={0}>
                <div className="first">
                    <Link to={"/streetMachine"}>
                        <div className="itemName">开元棋牌</div>
                        <div className="animate">
                            <div className={"itemImg ky"}></div>
                            <div className="itemBtn">
                                <a>进入大厅</a>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="first">
                    <Link to={"/streetMachine2"}>
                        <div className="itemName">天美棋牌</div>
                        <div className="animate">
                            <div className={"itemImg tm"}></div>
                            <div className="itemBtn">
                                <a>进入大厅</a>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="line"></div>
                <div className="rightCon">
                    <span className="top">
                        超人气棋牌游戏
                    </span>
                    <ul>
                        <li>
                            <a onClick={this.toStreetGame.bind(this,game[0])}>
                                <div className={"itemImg ky_niu"}></div>
                                <div className="itemBtn">
                                    <a>马上游戏</a>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a onClick={this.toStreetGame.bind(this,game[1])}>
                                <div className={"itemImg ky_za"}></div>
                                <div className="itemBtn">
                                    <a>马上游戏</a>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a onClick={this.toStreetGame.bind(this,game[2])}>
                                <div className={"itemImg ky_28"}></div>
                                <div className="itemBtn">
                                    <a>马上游戏</a>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
        return ret;
    }
    renderPromotionsNav(){
        var ret = [];
        ret.push(
            <li className={"li-0"} key={0}>
                <Link to={"/promotions"}>
                    <div className="itemName">全部</div>
                    <div className={"itemImg promotion_0"}></div>
                    <div className="itemBtn">
                        <a>查看更多</a>
                    </div>
                </Link>
            </li>
        )
        for (var i = 0; i < this.props.promotionTypes.length; i++) {
            var promotionTypes = this.props.promotionTypes[i];
            ret.push(
                <li className={"li-"+(i+1)} key={i+1}>
                    <Link to={"/promotions/tab=" + promotionTypes.Id}>
                        <div className="itemName">{promotionTypes.TypeName}</div>
                        <div className={"itemImg promotion_"+(i+1)}></div>
                        <div className="itemBtn">
                            <a>查看更多</a>
                        </div>
                    </Link>
                </li>
            );
        }
        return ret;
    }
    render() {
        const NavigationBar = window.r.get("NavigationBar");
        let notice="";
        this.props.notices.forEach((item,index)=>{
            notice += item.Title+":"+item.Content;
        });
        return (
            <div className="headerCon" >
                <header id="header">
                    <div className="header-container">
                        <div className="row">
                            <div className="col-md-2">
                                <IndexLink className="logo" to="/">
                                    <span className="innerLogo"></span>
                                </IndexLink>
                            </div>

                            <div className="col-md-10">
                                <div className="row">
                                    <div className="right">
                                        {this.props.user.token?this.renderUserInfo():this.renderLoginForm()}
                                    </div>
                                </div>
                                <NavigationBar showBlock={this.state.showBlock}  menuHover={(value)=>{this.setState({showBlock: value})}}></NavigationBar>
                            </div>
                        </div>
                    </div>
                    <div className="secondNav"  onMouseLeave={()=>{this.setState({showBlock:""})}}>
                        {/*电子游戏*/}
                        <div className="navItem" style={{display:this.state.showBlock=="games"?"block":"none"}}>
                            <ul>
                                {this.renderSlotPlatformOnNav()}
                            </ul>
                        </div>
                        {/*体育*/}
                        <div className="navItem" style={{display:this.state.showBlock=="casino"?"block":"none"}}>
                            <ul>
                                {this.renderCasinosNav()}
                            </ul>
                        </div>
                        {/*真人*/}
                        <div className="navItem" style={{display:this.state.showBlock=="sport"?"block":"none"}}>
                            <ul>
                            {this.renderSportNav()}
                            </ul>
                        </div>
                        {/*扑鱼*/}
                        <div className="navItem" style={{display:this.state.showBlock=="ag"?"block":"none"}}>
                            <ul>
                                {this.renderAGNav()}
                            </ul>
                        </div>
                        {/*彩票*/}
                        <div className="navItem" style={{display:this.state.showBlock=="bingo"?"block":"none"}}>
                            <ul>
                            {this.renderBingoNav()}
                            </ul>
                        </div>
                        {/*棋牌*/}
                        <div className="navItem" style={{display:this.state.showBlock=="pt"?"block":"none"}}>
                            {this.renderStreetNav()}
                        </div>
                        {/*优惠活动*/}
                        <div className="navItem" style={{display:this.state.showBlock=="promotions"?"block":"none"}}>
                            <ul>
                                {this.renderPromotionsNav()}
                            </ul>
                        </div>
                    </div>
                </header>
                <div className="sub-header container ">
                    <div className="row">
                        <div className="col-md-8 marquee">
                            <i className="glyphicon glyphicon-volume-up"></i>
                            <marquee ref="notice1" direction="left"  onMouseOver={(ele)=>{this.refs.notice1.stop();}} onMouseOut={(ele)=>{this.refs.notice1.start();}} className="NewNoticeList color-highlight">
                                <a data-toggle="modal" data-target="#noticeModal" className="app_color">
                                    {notice}
                                </a>
                            </marquee>
                        </div>
                        <div className="col-md-4 right">
                            <div className="row">
                                <a className="col-md-4 showQrcode" >
                                    <i className="fa fa-mobile-phone"></i>
                                    手机版
                                    <div className="mobile-qrcode-wrapper-header">
                                        <div className="mobile-qrcode">
                                            <div className="col-md-12">
                                                <div>手机版介绍</div>
                                            </div>
                                            <div className="col-md-6 qr-left-col">
                                                <span className="qr-top-text">扫一扫</span><br/>
                                                <span  className="qr-bottom-text">随时游戏</span>
                                            </div>
                                            <div id="dynamic-qr-code" className="col-md-6 qr-right-col">
                                                <QRCode className="qrImg"
                                                        includeMargin={true} //内部是否有margin
                                                        size={100}  //图片大小
                                                        value={this.props.remoteSysConfs.channel_push_url || "" } //地址
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <Link to="/FAQ" className="col-md-4">
                                    <i className="fa fa-question-circle"></i>
                                    常见问题
                                </Link>
                                <a  href="#" onClick={this.serversOpen.bind(this)} className="col-md-4">
                                    <i className="fa fa-comments-o"></i>
                                    在线客服
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        login: state.login,
        sitemsg: state.sitemsg,
        agGames:state.game.agByGames,
        global:state.global,
        notices:state.notices,
        remoteSysConfs:state.remoteSysConfs,
        slot_platforms: state.game.slot_platforms,
        casinos:state.views.casinos,
        sportGames:state.game.sportGames,
        bingoGames:state.game.bingoGames,
        promotionTypes:state.promotions.promoTypes,
    }
);
export default connect(mapStateToProps)(Header)