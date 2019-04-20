/*
*
* 【该JS有根据url的Base64位串码自动登录功能】
*【该JS有url的channel分享码功能 ---该分享码主要用在注册的时候】
*
*
* */
import React, { Component } from 'react';
import {Link,browserHistory} from 'react-router';
import { connect } from 'react-redux'
import {wapNav} from "wapNavJson";
import * as cache from "CacheHelper";
import {Carousel, NoticeBar, Icon, NavBar, PullToRefresh, Toast, Modal,Badge} from 'antd-mobile';
import {ApiGamePlatformAllBalanceAction, ApiPlayerInfoAction, wapAuth} from 'globalAction';
import "./FirstPage.scss";
import {config} from "globalConfig";
import {wapLogin,isShowDownApp} from 'globalAction';
let handleGame;
class FirstPage extends Component{
    state = {
        imgHeight:"3rem",
        refreshing: false,
        loading:false,
        hasMore:true,
        down: true,
        tabsId:"",
        selfGamesClass:"",
        contentList:[],
        closable:false,
        depositModalShow:false,//是否显示充值弹出层
        transferModalShow:false,//是否显示转入弹出层
    }
    componentWillMount () {

        //let user = cache.get('user');
        //if(user){
        //    new ApiPlayerInfoAction().fly();
        //}
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
                                //window.wapHistoryType.push('/');
                                window.wapHistoryType.push('/');
                                wapLogin(true);
                            }}])
                    }
                });
            }
            autoLogin(isAutoLogin);
        }

    }

    reload(){
        this.setState({ refreshing: true });
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
    //公告渲染
    renderNotice(){
        let notice=[];
        this.props.notices.forEach((item,index)=>(
            notice.push(
                <span key={index}>{item.Content} </span>
            )
        ))
        return notice;
    }
    openBanner(link){
        if(!link) return;
        if(config.isApp){
            window.Util.appOpen(link)
        }else{
            window.open(link,'_blank');
        }
    }
    openLine(){
        if(config.isApp){
            window.Util.appOpen("http://dafazixun.com")
        }else{
            window.open("http://dafazixun.com",'_blank');
        }
    }
    //Banner渲染
    renderBanner(){
        let banner=[];
        this.props.wapAdsList.forEach((img,index)=>(
            banner.push(
                <a
                    key={img.Id}
                    onClick={this.openBanner.bind(this,img.Link)}
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                    <img
                        key={index}
                        src={config.devImgUrl+img.ImgUrl}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                        }}
                    />
                </a>
            )
        ))
        return banner;
    }

    closeable(){
        isShowDownApp(false);
    }
    downLoad(){
        window.open(this.props.remoteSysConfs.channel_push_url, "_blank");
    }

    linkTo(router){
        window.wapHistoryType.push(router)
    }
    renderWapCategores(){
        let categores=[];
        let _this = this;
        for (var i =0; i< wapNav.length; i++){
            let nav = wapNav[i];
            categores.push(
                <Link  key={i} onClick={nav.target?this.openLine.bind(this,nav.link):this.linkTo.bind(this,nav.link)}>
                    {nav.hot&&<Badge text="热门"  />}
                        <div className={"icon"}
                             dangerouslySetInnerHTML={{__html:nav.svg}}></div>
                    <p>{nav.name}</p>
                </Link>
            );
        }

        return categores;
    }
    render(){
        let _this = this;
        let isShowdownLoad = !this.props.isShowDownApp || config.isApp;
        let rightCon = this.renderRightCon();
        let notice = this.renderNotice();
        let banner = this.renderBanner();
        let wapCategores = this.renderWapCategores();
        const HijackAlert = window.r.get("HijackAlert");
        return(
            <div>
                {HijackAlert && <HijackAlert/>}
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
                {/*拉動刷新*/}
                <PullToRefresh
                    className="scroll-content firstPage"
                    style={{top:isShowdownLoad?'0':"55px"}}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.reload()
                    }}
                >
                    {/*banner*/}
                    <Carousel autoplay={true} infinite>
                        {banner}
                    </Carousel>
                    {/*公告*/}
                    <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                        {notice}
                    </NoticeBar>
                    {/*内容*/}
                    <div>
                        <div className="contentTab">
                            <div className="tabs">
                                {wapCategores}
                            </div>
                            {/*{*/}
                                {/*this.props.user.token &&*/}
                                {/*<a className="collection" onClick={this.selfGames.bind(this)}>【我的收藏】</a>*/}
                            {/*}*/}
                            {/*<Link to="/allGame" className="tabsMore">【全部游戏】</Link>*/}
                        </div>
                        {/*<div className="contentList">*/}
                            {/*{contentList}*/}
                        {/*</div>*/}
                    </div>
                </PullToRefresh>

                {/*充值弹出层*/}
                {
                    this.state.depositModalShow &&
                    <Modal
                        transparent
                        visible={this.state.depositModalShow}
                        onClose={()=>{this.setState({depositModalShow:false})}}
                        footer={
                        [
                            { text: '充值', onPress: () => {window.wapHistoryType.push('/money/deposit')}},
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
        notices:state.notices,
        wapAdsList:state.wapAdsList,
        remoteSysConfs:state.remoteSysConfs,
        wapCategory:state.wapCategory,
        wapPage:state.wapPage,
        platforms:state.game.platforms,
        homeCategores:state.wapCategores.mobileHomeCategories
    }
);

export default connect(mapStateToProps,{})(FirstPage)