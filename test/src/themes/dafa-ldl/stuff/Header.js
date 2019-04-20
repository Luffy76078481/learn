/**
 * Created by jamen on 2017/4/28.
 */

import React, { Component } from 'react';
import { Link , IndexLink } from 'react-router';
import { connect } from 'react-redux'
import "./css/Header.scss";
import { browserHistory } from 'react-router';
// import navconfig from "../../../common/navconfig";
// import {ApiPlayerInfoAction} from "../../../actions";

import loadAmount from './images/loadAmount.gif';
class Header extends Component {
    constructor() {
        super();
        this.state = {
            time:"",
            tags: [],
            isPassWord:"password",
            test:0,
            errorMessage:"",
            playerBalance:true,
            showBlock: false,
            loadAmount:false,
            reqLock:false
        };

    }
    onLogin(event) {
        event.preventDefault();
        if(this.state.reqLock)
        return;
        this.state.reqLock =true;
        var _self = this;
        new window.actions.ApiLoginAction(this.refs.username.value, this.refs.password.value, "", "").fly(resp=>{
            if (resp.StatusCode === 0) {
                new window.actions.ApiBankAccountsAction().fly();
                new window.actions.ApiPlayerInfoAction().fly();
                new window.actions.ApiGamePlatformAllBalanceAction().fly();
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
    onLogout(event) {
        new window.actions.LogoutAction().fly();
        setTimeout(() => {
            browserHistory.push("/");
        }, 500);
    }
    componentDidMount(){
         // this.reVerifyCode();
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
    componentWillReceiveProps(nextProps) {

    }

    reVerifyCode(e) {
        new window.actions.ApiVerifyCodeAction().fly();
    }



    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    changePasswordType(){
        if(this.state.isPassWord =="password"){
            this.setState({isPassWord:"text"})
        }else{
            this.setState({isPassWord:"password"})
        }

    }
    renderLoginForm() {

        const options = window.r.props("Header");
        let isPassWord  = this.state.isPassWord=="password"?"password-mask-icon":"password-mask-icon password-unmasked";
        return (
            <form id="login-form" className={this.props.remoteSysConfs.require_login_verify_code=="true" ? "require_verify_code" : ""} onSubmit={this.onLogin.bind(this)}>
                <div className="form-login-input">
                    <div className="loginInput">
                        <input type="text" ref="username"  id="demotestid2" className="account-input input-type border-type" placeholder="用户名"/>
                        {/* <span className="code-image"><img onClick={this.reVerifyCode.bind(this)} src={this.props.verifycode.img}/></span> */}
                    </div>
                    <div className="loginInput">
                        <input type={this.state.isPassWord} ref="password" className="pwd-input input-type border-type" placeholder="密码"/>
                        <span className={isPassWord} onClick={this.changePasswordType.bind(this)}></span>
                    </div>
                    
                </div>
                <div className="form-login-button">
                    <button type="submit" className="form-login-btn">登录</button>
                    <Link to="/register" className="form-reg-btn" title="免费注册">免费注册</Link>
                    <br/>
                    <a id="test" onClick={this.serversOpen.bind(this)} className="demotest forget"><i className="glyphicon glyphicon-question-sign"></i>无法登录?</a>
                    <a href="javascript:Util.AddFavorite('dafabet');" className="color-highlight fav"><i className="glyphicon glyphicon-home"></i>收藏本站</a>
                </div>
                {this.state.errorMessage?<span className="errorMessage">{this.state.errorMessage}</span>:null}
                <div className="clear"></div>
               
            </form>
        );
    }
    playerBalanceChange(e){
        let $dom = window.$(e.currentTarget);
        let isChecked = $dom.attr('data-checked');
        if(isChecked =="true"){
            $dom.removeClass('checked').addClass('unchecked')
            $dom.attr('data-checked','false')
            this.setState({
                playerBalance:false
            })
        }else{
            $dom.removeClass('unchecked').addClass('checked')
            $dom.attr('data-checked','true')
            this.setState({
                playerBalance:true
            })
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

    showMoney(){
        var ret = [];
        for (let i = 0; i < this.props.game.platforms.length; i++) {
            let platform = this.props.game.platforms[i];
            let balance = platform.Balance || 0;
            let name = platform.Name;
            balance = balance.toFixed(2);

            ret.push(
                <li key={name}>
                    <div className="balance-details">
                        <div className="balance-label">{name}</div>
                        <div className="balance-balance" data-balanceid="4">{balance}</div>
                    </div>
                </li>
            )
        }
        return ret;
    }

    renderUserInfo() {
        const user = this.props.user;
        const userLevel = user.userLevel?user.userLevel:0;
        const options = window.r.props("Header");
        const userLevelVal =  window.cache.get("user").userLevelName
        return (
            <div className="mt10">

                <div className="player-balance">
                    <span className={"playerInfo playerLevel_"+userLevel}>
                        <div id="vip-tooltip" className="vip-tooltip tooltip-content text-center">您已成为{userLevelVal}会员</div>
                    </span>欢迎 <Link to="/member">{user.username}</Link>
                    <span className="balance-checkbox checked" ref="balanceCheckbox" data-checked="true" onClick={this.playerBalanceChange.bind(this)}>
                        <span></span>
                    </span>
                    {this.state.playerBalance?
                        (<div className={"account-balance"}>
                            {this.state.loadAmount?(<img className="loadAmount" src={loadAmount} />):
                                (<span>总余额：{this.props.user.amount}元<i className="glyphicon glyphicon-repeat" onClick={this.loadAmount.bind(this)}></i></span>)
                            }
                            <div id="balance-tooltip" className="tooltip-content tooltip-balance text-left">
                                <ul>
                                    {this.showMoney()}
                                </ul>
                            </div>   
                        </div>)
                        :null
                    }
                </div>
                <div className="player-options">
                    <div className="cashier-tooltip pull-left">
                        <Link to="/member" className={"cashier-label"}>出纳柜台</Link>
                        <div className={"tooltip-content text-center"}>
                            <ul>
                                <li><Link to="/deposit">存款</Link></li>
                                <li><Link to="/withdraw">取款</Link></li>
                                <li><Link to="/transfer">游戏转账</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="myaccount-tooltip pull-left">
                        <a className="icon-myaccount"></a>
                        <div className={"tooltip-content text-center"}>
                            <ul>
                                <li><Link to="/member">我的账户</Link></li>
                                <li><Link to="/person_change_pwd">修改密码</Link></li>
                                <li><Link to="/records">交易记录</Link></li>
                                <li><a onClick={this.onLogout.bind(this)}>登出</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="clear"></div>
            </div>

        );
    }


    serversOpen(e){
        e.preventDefault();

        if(e.target.id=='test'){
            window.swal({
                    title: "无法登陆?",
                    text: "联系在线客服协助修改密码",
                    confirmButtonColor: "#c5841f",
                    confirmButtonText: "联系客服",
                    showCancelButton: true,
                    cancelButtonText: "关闭",
                },
                ()=>{
                    window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
                });
            return;
        }
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=900,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=450,screenY=250');
        return false;
    }


    render() {
        var NavigationBar = window.r.get("NavigationBar");
        const options = window.r.props("Header");
        let notice=[];
        this.props.notices.forEach((item,index)=>{
            notice.push(<p key={index}>{item.Content}<span className='noti_time'>{item.CreateTime.slice(0,10)}</span></p>);
        });
        return (
            <header id="topHead">
                <div className="headBg BGcolor-main" >

                    <div className="container">
                        <div className="headFname row">
                            <div className="logo">
                                <Link to="/">
                                   <span className="innerLogo"></span>
                                </Link>
                            </div>
                            <div className="pull-right">
                                <div className="top-option text-right">
                                    <i className="glyphicon glyphicon-volume-up" data-toggle="modal" data-target="#noticeModal" ></i>
                                    <span className="language-switcher"></span>
                                </div>
                                {!options.hideLogin? (
                                <div className={`loginForm ${!options.hideLogin? 'afterLogin': ''}`}>
                                    {/*<div className={this.props.user.token?"timeNumber n-timeNumber":"timeNumber"}>*/}
                                        {/*<span className="time_box"><i className="glyphicon glyphicon-time"></i>{config.timezone || "北京时间"}：<b id="clock">{this.state.time}</b></span>*/}
                                        {/*<span className="online_user"><i className="fa fa-male" ></i>在线人数：{this.props.global.onlineUserCount + 20000}人</span>*/}
                                        {/*<span className={this.props.user.token?"personal":"personalHide"}><Link to="/member"><i className="glyphicon glyphicon-user" aria-hidden="true"></i>个人中心</Link></span>*/}

                                        {/*<div className="clear"></div>*/}
                                    {/*</div>*/}
                                    {this.props.user.token? this.renderUserInfo() : this.renderLoginForm()}
                                </div>):null}
                            </div>
                        </div>
                        <div className="menu-nav" id="headerNav" >
                            <nav role="navigation">
                                <NavigationBar menuHover={(value)=>{this.setState({showBlock: value})}}/>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="clear"></div>
                {/*公告弹出层*/}
                <div id="noticeModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                公 告
                                <button type="button" className="close" data-dismiss="modal">
                                    <i className="fa fa-close"></i>
                                </button>
                            </div>                                                                  
                            <div className="modal-body">
                                {notice.length==0?"没有公告!":notice}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );

    }
}

const mapStateToProps = (state, ownProps) => (
    {
        notices:state.notices,
        user : state.user,
        login: state.login,
        sitemsg: state.sitemsg,
        global:state.global,
        remoteSysConfs:state.remoteSysConfs,
        // verifycode: state.verifycode,
        game: state.game
    }
);
export default connect(mapStateToProps)(Header)