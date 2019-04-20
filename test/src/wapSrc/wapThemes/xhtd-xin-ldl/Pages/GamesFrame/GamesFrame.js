import React, { Component } from 'react';
import {Drawer, Icon, Modal, NavBar, NoticeBar, PullToRefresh, Toast} from "antd-mobile";
import {browserHistory,Link} from 'react-router';
import {wapLogin,isShowDownApp} from 'globalAction';
import connect from "react-redux/es/connect/connect";
import {wapNav} from "wapNavJson";
import {config} from "globalConfig";
import './GamesFrame.scss'

let handleGame;
class GamesFrame extends Component{
    constructor(props) {
        super(props);
        this.state={
            closable:false,
            selPlatformId:this.props.params.platformID == undefined?"":this.props.params.platformID,
            depositModalShow: false,//是否显示充值弹出层
            transferModalShow: false,//是否显示转入弹出层
        }
    }
    componentWillMount () {
        let _this = this;
        let isAutoLogin = location.search;
        if(isAutoLogin){
            if(isAutoLogin.indexOf('channel')>0){
                cache.setSession('channel',isAutoLogin.split('=')[1]);
                return;
            }

            function autoLogin(key){
                let newstr=window.Util.b64DecodeUnicode(key.slice(1));
                let strArr=newstr.split('&');
                let strObj={};
                let newArr=[];
                for(var i=0;i<strArr.length;i++){
                    newArr=strArr[i].split('=');
                    strObj[newArr[0]]=newArr[1]
                }
                if(!strObj.name) return;
                let name = strObj.name;
                let password = strObj.password;
                new window.actions.ApiLoginAction(name,password).fly(resp=>{
                    if (resp.StatusCode === 0) {
                        new window.actions.LoginAfterInit();
                    }else{
                        if(_this.props.user.token){//如果url后面的用户名和密码是错误的 但是本地中仍有token就不提示！
                            return;
                        }
                        Modal.alert('请重新登录!',resp.Message,[{text:"重新登录",onPress:()=>{
                                browserHistory.push('/');
                                wapLogin(true);
                            }}])
                    }
                });
            }
            autoLogin(isAutoLogin);

        }
    }
    closeable(){
        isShowDownApp(false);
    }
    downLoad(){
        window.open(this.props.remoteSysConfs.channel_push_url, "_blank");
    }
    openSildeBar(){
        this.props.params.openSilde()
    }
    //渲染头部导航右侧部分
    renderRightCon(){
        let dom=[];
        let _this=this;
        if(this.props.user.token){
            dom=[
                <Link to='/money' className="userInfo" key={'userInfo'}>￥{this.props.user.amount}<i className="icon icon-user"></i></Link>
            ]
        }else{
            dom=[
                <a onClick={wapLogin.bind(null,true)} className="loginBtn" key={"firstLogin"}>登录/注册</a>,
            ]
        }
        return dom;
    }

    //游戏相关
    gameAddFavorite(item,event){
        event.preventDefault();
        event.stopPropagation();
        if(!wapLogin(true)) return false;
        Toast.loading(item.Title+'收藏中..',300);
        new window.actions.ApiAddFavoriteAction(item.Id).fly(resp=>{
            Toast.hide();
            if(resp.StatusCode!=0){
                Modal.alert("添加失败！", resp.Message);
            }
        });
    }
    gameRemoveFavorite(item,event){
        event.preventDefault();
        event.stopPropagation();
        Toast.loading(item.Title+'删除收藏中..',300);
        new window.actions.ApiDeleteFavoriteAction(item.Id).fly(resp=>{
            Toast.hide();
            if(resp.StatusCode!=0){
                Modal.alert("删除收藏失败！", resp.Message);
            }
        });
    }
    playGame(game){
        event.preventDefault();
        event.stopPropagation();
        if(!wapLogin(true)) return false;
        let _this = this;
        let currentBalance=0;
        let totalAmount = parseInt(this.props.user.amount)> 1 ? parseInt(this.props.user.amount):0;

        for (var i =0;i<this.props.platforms.length;i++){
            let _thisBalance = this.props.platforms[i].Balance? parseInt(this.props.platforms[i].Balance):0;
            totalAmount+=_thisBalance;
            if(this.props.platforms[i].ID ==game.GamePlatform){
                currentBalance=_thisBalance;
            }
        }
        handleGame=game;
        if(totalAmount<1 ){
            this.setState({
                depositModalShow:true
            })
        }else if(currentBalance<1){
            this.setState({
                transferModalShow:true
            })
        }else{
            _this.getGameUrl(game)
        }

    }
    getGameUrl(game,TransferFlag=false){
        let parma = {
            GamePlatform:game.GamePlatform,
            GameType:game.GameTypeText,
            GameId:game.GameIdentify,
            IsMobile:true,
            IsDemo:false,
        }
        Toast.loading('游戏地址获取中...',300);
        let windowOpen;
        if(!config.isApp){
            windowOpen = window.Util.windowOpen('Game');
        }
        new window.actions.ApiGetLoginUrl(parma,'(mobile)',TransferFlag).fly(res=>{
            Toast.hide();
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                if(TransferFlag){
                    new window.actions.ApiPlayerInfoAction().fly();
                    new window.actions.ApiGamePlatformAllBalanceAction().fly();
                }
                if(!config.isApp){
                    windowOpen.location.href= gameLink;
                }else{
                    window.Util.appOpen(gameLink)
                }
            }
            else{
                if(!config.isApp){
                    windowOpen.urlError(res.Message);
                }else{
                    Modal.alert(res.Message)
                }
            }
        })
    }

    renderPlatfromList(){
        let platformLists = [];
        let routerPath =  this.props.location.pathname;
        let selfPlatfromId = routerPath.indexOf('games')>-1?this.state.selPlatformId:undefined;
        let index = 0;
        platformLists.push(
            <li key={100} >
                <a title={"全部"}  className={selfPlatfromId==""?"active":""}  onClick={this.onSelectPlatform.bind(this,"")}>
                    <svg className="icon"
                         viewBox="0 0 1024 1024">
                        <path
                            d="M99.6 334.3h236.1V98.2H99.6v236.1z m295.2 0h236.1V98.2H394.8v236.1zM689.9 98.2v236.1H926V98.2H689.9zM99.6 629.4h236.1V393.3H99.6v236.1z m295.2 0h236.1V393.3H394.8v236.1z m295.1 0H926V393.3H689.9v236.1zM99.6 924.5h236.1V688.4H99.6v236.1z m295.2 0h236.1V688.4H394.8v236.1z m295.1 0H926V688.4H689.9v236.1z"
                        ></path>
                    </svg>
                </a>
            </li>
        )
        for (var i = 0; i < this.props.slot_platforms.length; i++) {
            if(index>=10) break;
            let platform = this.props.slot_platforms[i];
            let className="";
            if(!platform.ShowSlot){
                continue;
            }
            if(platform.Name2 !="YOPLAY"){
                if(selfPlatfromId == platform.ID){
                    className="active";
                }
                platformLists.push(
                    <li key={i} >
                        <a href="javascript:void(0)" className={className}  onClick={this.onSelectPlatform.bind(this, platform.ID)}>
                            <span className={"platIcon "+platform.ID}></span>
                            <p>{platform.Name2}</p>
                        </a>
                    </li>
                );
                index++;
            }
        }
        for (var t = 0; t < wapNav.length; t++) {
            if(index>=10) break;
            let nav = wapNav[t];
            if(!nav.showPlatfrom) continue;
            index++;
            platformLists.push(
                <li key={index}>
                    <Link to={nav.link}  activeClassName={'active'}>
                        <span className={"platIcon "+nav.className}></span>
                        {/*<svg className={"platIcon"}  viewBox="0 0 1024 1024" dangerouslySetInnerHTML={{__html:nav.svg}}></svg>*/}
                        <p>{nav.name}</p>
                    </Link>
                </li>
            );

        }
        platformLists.push(<li key={99}>
            <a onClick={this.onOpenChange.bind(this)} title={"全部"}>
                <span>更多>></span>
            </a>
        </li>)
        return platformLists;
    }
    renderCategorysDrawer(){
        let platformLists=[];
        let navLists = [];
        let routerPath =  this.props.location.pathname;
        let selfPlatfromId = routerPath.indexOf('games')>-1?this.state.selPlatformId:undefined;
        for (var i = 0; i < this.props.slot_platforms.length; i++) {
            let platform = this.props.slot_platforms[i];
            let className="";
            if(!platform.ShowSlot){
                continue;
            }
            if(platform.Name2 !="YOPLAY"){
                if(selfPlatfromId == platform.ID){
                    className="active";
                }
                platformLists.push(
                    <li key={i} >
                        <a href="javascript:void(0)" className={className} onClick={this.onSelectPlatform.bind(this, platform.ID)}>
                            <span className={"platIcon "+platform.ID}></span>
                            <span className={"name"}>{platform.Name2}</span>
                        </a>
                    </li>
                );
            }
        }
        for (var t = 0; t < wapNav.length; t++) {
            let nav = wapNav[t];
            if(!nav.showPlatfrom) continue;
            navLists.push(
                <li key={'nav_'+t}>
                    <Link to={nav.link} activeClassName={'active'}>
                        <span className={"platIcon "+nav.className}></span>
                        {/*<svg className={"platIcon"}  viewBox="0 0 1024 1024" dangerouslySetInnerHTML={{__html:nav.svg}}></svg>*/}
                        <span>{nav.name}</span>
                    </Link>
                </li>
            );
        }
        return(
            <div className={"chose-category"}>
                <h2>游戏供应商</h2>
                <ul>
                    <li>
                        <a title={"全部"} className={selfPlatfromId==""?"active":""} onClick={this.onSelectPlatform.bind(this,"")}>
                            <svg className="icon"
                                 viewBox="0 0 1024 1024">
                                <path
                                    d="M99.6 334.3h236.1V98.2H99.6v236.1z m295.2 0h236.1V98.2H394.8v236.1zM689.9 98.2v236.1H926V98.2H689.9zM99.6 629.4h236.1V393.3H99.6v236.1z m295.2 0h236.1V393.3H394.8v236.1z m295.1 0H926V393.3H689.9v236.1zM99.6 924.5h236.1V688.4H99.6v236.1z m295.2 0h236.1V688.4H394.8v236.1z m295.1 0H926V688.4H689.9v236.1z"
                                ></path>
                            </svg>
                            <span className={"name"}>全部</span>
                        </a>
                    </li>
                    {platformLists}
                    {navLists}
                </ul>
            </div>
        )
    }
    onOpenChange(){
        this.setState({open:!this.state.open})
    }
    onSelectPlatform(platformID) {
        // if(platformID === this.state.selPlatformId) return;
        browserHistory.push('/gameFrame/games/'+platformID);
        this.setState({
            selPlatformId:platformID,
        })
    }

    render(){
        let _this = this;
        let isShowdownLoad = !this.props.isShowDownApp || config.isApp;
        let drawer = this.renderCategorysDrawer();
        let rightCon = this.renderRightCon();
        const HijackAlert = window.r.get("HijackAlert");
        const AffixService_Callback = window.r.get("AffixService_Callback");
        return (
            <div>
                {HijackAlert && <HijackAlert/>}
                {AffixService_Callback && <AffixService_Callback/>}
                {isShowdownLoad?
                    null:
                    <NoticeBar mode="closable" className="closable" onClick={this.closeable.bind(this)} icon={null}>
                        <div className="logo">
                        </div>
                        <div onClick={this.downLoad.bind(this)}  className="text">
                            <p>下载APP</p>
                            <span>原生用户体验</span>
                            <span>领取优惠大礼包</span>
                        </div>
                        <a onClick={this.downLoad.bind(this)} className="downAppBtn">下载</a>
                    </NoticeBar>
                }
                <NavBar
                    mode="light"
                    icon={<Icon type="ellipsis" />}
                    style={{top:isShowdownLoad?0:"55px"}}
                    onLeftClick={this.openSildeBar.bind(this)}
                    rightContent={rightCon}
                >
                    <Link to={"/"} className="logo"></Link>
                </NavBar>
                <div
                    className="game-content"
                    style={{top:isShowdownLoad?'0':"55px"}}
                >
                    <div className={"gamesPage"}>
                    {/*平台分类*/}
                    <div className={"game-categorys"}>
                        <ul>
                            {this.renderPlatfromList()}
                        </ul>
                    </div>
                    {
                        React.cloneElement(
                            this.props.children,{
                                gameAddFavorite:this.gameAddFavorite.bind(this),
                                gameRemoveFavorite:this.gameRemoveFavorite.bind(this),
                                playGame:this.playGame.bind(this),
                                selPlatformId:this.state.selPlatformId
                            }
                        )
                    }
                    <Drawer
                        className="categorys-drawer"
                        style={{minHeight: document.documentElement.clientHeight,zIndex:this.state.open?"2":"-1"}}
                        enableDragHandle
                        sidebar={drawer}
                        open={_this.state.open}
                        position={'right'}
                        onOpenChange={this.onOpenChange.bind(this)}
                    >
                        <div> </div>{/*给一个空的子元素 防止报错*/}
                    </Drawer>
                    </div>
                </div>
                {/*充值弹出层*/}
                {
                    this.state.depositModalShow &&
                    <Modal
                        transparent
                        visible={this.state.depositModalShow}
                        onClose={()=>{this.setState({depositModalShow:false})}}
                        footer={
                            [
                                { text: '充值', onPress: () => {browserHistory.push('/money/deposit')}},
                                { text: '直接进入', onPress: () => {
                                        _this.getGameUrl(handleGame);
                                        this.setState({depositModalShow:false})
                                    } }
                            ]
                        }
                    >
                        <b style={{color:'#333'}}>您的余额不足，是否前往充值?</b>
                    </Modal>
                }
                {/*转账弹出层*/}
                {
                    this.state.transferModalShow &&
                    <Modal
                        transparent
                        visible={this.state.transferModalShow}
                        onClose={()=>{this.setState({transferModalShow:false})}}
                        footer={
                            [
                                { text: '直接进入', onPress: () => {
                                        _this.getGameUrl(handleGame);
                                        _this.setState({transferModalShow:false})
                                    }},
                                { text: '自动转入', onPress: () => {
                                        _this.getGameUrl(handleGame,true);
                                        _this.setState({transferModalShow:false})
                                    }}
                            ]
                        }
                    >
                        <b style={{color:'#333'}}>您在{handleGame.GamePlatform}的余额不足，是否将资金自动转入{handleGame.GamePlatform}</b>
                    </Modal>
                }
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        isShowDownApp:state.isShowDownApp,
        user : state.user,
        platforms:state.game.platforms,
        remoteSysConfs:state.remoteSysConfs,
        slot_platforms:state.game.slot_platforms,
        slot_category:state.wapCategores.slot_category//老虎机的分类
    }
);

export default connect(mapStateToProps)(GamesFrame)