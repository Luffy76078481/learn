import React, { Component } from 'react';
import {Drawer, Icon, Modal, NavBar, NoticeBar, PullToRefresh, Toast} from "antd-mobile";
import {browserHistory,Link} from 'react-router';
import {wapLogin,isShowDownApp} from 'globalAction';
import connect from "react-redux/es/connect/connect";

import {config} from "globalConfig";
import './GamesFrame.scss'

let handleGame;
class GamesFrame extends Component{
    constructor(props) {
        super(props);
        this.state={
            closable:false,
            depositModalShow: false,//是否显示充值弹出层
            transferModalShow: false,//是否显示转入弹出层
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

    render(){
        let _this = this;
        let isShowdownLoad = !this.props.isShowDownApp || config.isApp;
        let rightCon = this.renderRightCon();
        return (
            <div>
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
                    {
                        React.cloneElement(
                            this.props.children,{
                                gameAddFavorite:this.gameAddFavorite.bind(this),
                                gameRemoveFavorite:this.gameRemoveFavorite.bind(this),
                                playGame:this.playGame.bind(this)
                            }
                        )
                    }
                    {/*{this.props.children}*/}
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
        platforms:state.game.platforms,
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps)(GamesFrame)