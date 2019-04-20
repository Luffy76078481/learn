/**
 * xhtd-头部
 */

import React, { Component } from 'react';
import { Link , IndexLink } from 'react-router';
import { connect } from 'react-redux'
import "./Header_xhXhtd_new.scss";
import { browserHistory } from 'react-router';
//import navconfig from "../../../../../../config/navconfig";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            time:"",
            tags: [],
            test:0,
            showBlock: false,
            reqLock:false//状态锁
        };
    }
    // 登录
    onLogin(event) {
        event.preventDefault();
        if(this.state.reqLock)
        return;
        this.state.reqLock =true;
        var _self = this;
        new window.actions.ApiLoginAction(this.refs.username.value, this.refs.password.value, "", "").fly(resp=>{
            if (resp.StatusCode === 0) {
                new window.actions.ApiBankAccountsAction().fly(); //获取会员绑定的银行卡
                new window.actions.ApiPlayerInfoAction().fly(); //获取会员信息
            }
            _self.state.reqLock = false;
        });
    }
    // 退出
    onLogout(event) {
        new window.actions.LogoutAction().fly();
        setTimeout(() => {
            browserHistory.push("/");
        }, 300);
    }
    // 挂载
    componentDidMount(){
        window.setInterval(()=>{
            let d = new Date();
            let dt = d.getTime();
            if(window.config.timezone.indexOf("美东") != -1){
                dt = dt + (d.getTimezoneOffset() - 4*60)*60*1000
            }
            this.setState({time: new Date(dt).format("yyyy/MM/dd hh:mm:ss")})
        }, 1000);
        if(location.search == ""){}
        else if(location.search == '?tab=HB' || location.search == '?tab=PT'|| location.search == '?tab=MG2'|| location.search == '?tab=OPUS2'|| location.search == '?tab=AG'|| location.search == '?tab=YOPLAY'|| location.search == '?tab=QT'|| location.search == '?tab=BBIN'){}
        else if((location.search).split('=')[0]=='?channel'){}
        else{
            function getSearch(key){
                var str=location.search;
                var newstr=str.slice(1);
                var strArr=newstr.split('&');
                var strObj={};
                var newArr=[];
                for(var i=0;i<strArr.length;i++){
                  newArr=strArr[i].split('=');
                  strObj[newArr[0]]=newArr[1]
                }
                var name = window.atob(strObj.name);
                var password = window.atob(strObj.password);
                new window.actions.ApiLoginAction(name,password).fly(resp=>{
                    if (resp.status === 0) {
                        new window.actions.ApiBankAccountsAction().fly();
                    }
                });
              }
              getSearch();
        }
    }
    // 未登录
    renderLoginForm() {
        const options = window.r.props("Header");
        return (
            <form id="login-form" className={this.props.remoteSysConfs.require_login_verify_code=="true" ? "require_verify_code" : ""} onSubmit={this.onLogin.bind(this)}>
                <div className="form-login-input">

                    <input type="text" ref="username"  id="demotestid2" className="account-input input-type border-type" placeholder="账号"/>
                    <input type="password" ref="password" className="pwd-input input-type border-type" placeholder="密码"/>

                    {/* <input ref="verifycode" type="text" className="code-input input verifycode" placeholder="验证码"/> */}
                    <a href="javascript:void(0);" id="test" onClick={this.serversOpen.bind(this)} className="demotest forget">
                        {/* <i className="glyphicon mr5"></i> */}
                        忘记密码？
                    </a>
                </div>
                {/* 登录 */}
                <div className="form-login-button">
                    <button type="submit" className="form-login-btn">{options.loginTxt}</button>
                </div>
                 {/* 注册 */}
                <div className="form-login-reg">
                    <Link to="/register" className="form-reg-btn" title="免费注册"></Link>
                </div>
                <div className="clear"></div>
            </form>
        );
    }
    // 用户信心
    renderUserInfo() {
        const user = this.props.user;
        const userLevel = user.userLevelName && user.userLevelName.indexOf("黑名单") !== -1 ? "会员":user.userLevelName|| "欢迎您" ;
        const options = window.r.props("Header");

        return (
            <div className="infoContent mt10">
                <span className="memberItem">{userLevel}：<Link to="/member">{user.username}</Link></span>
                <div className="infoWrap">
                    <span className="memberItem" style={{paddingLeft:"2px"}}>  余额：{this.props.user.amount} ￥</span>
                    <span className="memberItem" ><Link to="/deposit" className="item bai charge" style = {{"color":"#ff0000"}}>充值</Link></span>
                    <span className="memberItem"><Link to="/withdraw" className="item bai">取款</Link></span>
                    <span className="memberItem"><Link to="/transfer" className="item bai">游戏转账</Link></span>
                </div>
                <span className="memberItem">
                    <Link to="/message" className="item bai member-msg"><i className="fa fa-envelope-o" aria-hidden="true"></i><span className="huang ml5" >({this.props.sitemsg.unread})</span></Link>
                </span>
                <span className="memberItem"><a href="javascript:void(0)" className="item huang bgGray4" onClick={this.onLogout.bind(this)}>退出</a></span>
                <div className="clear"></div>
            </div>

        );
    }
    // 忘记密码
    serversOpen(e){
        e.preventDefault();

        if(e.target.id=='test'){
            window.swal({
                    title: "忘记密码",
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

    godepos(e){
        if(!this.props.user||!this.props.user.token){
            e.preventDefault();
            window.$("#reserveDialog_login").modal("show");
            new ErrorMsgAction("无权限访问", "请先登录").fly();
            return false;
        }
        return
    }

    render() {
        const promotionLink = this.props.remoteSysConfs.channel_push_url; // 手机投注
        var NavigationBar = window.r.get("NavigationBar");
        const config = window.config;
        const options = window.r.props("Header");
        var AffixHongbao = window.r.get("AffixHongbao");
        const agentLoginUrl = config.agentLoginUrl;
        return (
            <header id="topHead">
                <div className="headBg BGcolor-main" >
                    <div className="container">
                        <div className="headFname row">
                            {/* 回到主页 */}
                            <Link className="gofg" to="/"></Link>
                            <div className="logo">
                                <Link to="/"></Link>
                            </div>
                            <Link to="/" title='返回首页'><div className="procenter"></div></Link>
                            {/* 中间LOGO */}
                            <div className="credit"></div>
                            {/* 登录 */}
                            <div className='loginForm afterLogin'>
                                <div className="timeNumber">
                                    { this.props.user.token?
                                        <span className="time_box">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <i className="glyphicon glyphicon-time"></i>{config.timezone || "北京时间"}：<b id="clock">{this.state.time}</b></span>
                                    : null }
                                    <div className = {this.props.user.token?"personalHide":"proxy"}>
                                        <a href="/agent.html?tab=Alliance" target="_blank">代理合作</a>
                                        <a href={agentLoginUrl} target="_blank">代理登入</a>
                                    </div>
                                    {/* 未登录 */}
                                    { !this.props.user.token?
                                        <div className="mobile_betting">
                                            <a href={promotionLink} target="_blank">
                                                <i className="glyphicon glyphicon-phone mt5"></i>
                                                手机投注
                                            </a>
                                        </div>
                                    : null }
                                    {/* 登录 */}
                                    <div className = {this.props.user.token?"top_phoneAdd":"personalHide top_phoneAdd"} >
                                        <a href={promotionLink} target="_blank">
                                            <i className="glyphicon glyphicon-phone mt5"></i>
                                            手机投注
                                        </a>}
                                    </div>
                                    <span className={this.props.user.token?"personal":"personalHide"}><Link to="/member"><i className="glyphicon glyphicon-user" aria-hidden="true"></i>个人中心</Link></span>
                                    <a href="javascript:Util.AddFavorite('新濠天地');" className="color-highlight fav"><i className="glyphicon glyphicon-home"></i>收藏本站</a>
                                    {!options.linetest ? null :
                                        <span className = {this.props.user.token?"rightSide navLink color-highlight":"navLink color-highlight"}>
                                            <a href="/xhtd/nav.html" target="_blank"><i className="fa fa-tasks" aria-hidden="true"></i>线路检测</a>
                                            {
                                                this.props.user.token ?
                                                    <span>
                                                        <a href="/agent.html?tab=Alliance" target="_blank" className="hot_word">代理加盟</a>
                                                        <a href={agentLoginUrl} target="_blank">代理登入</a>
                                                    </span> : null
                                            }
                                        </span>
                                    }

                                    {/* 清除浮动 */}
                                    <div className="clear"></div>
                                </div>
                                {/* 登陆前后 */}
                                {this.props.user.token? this.renderUserInfo() : this.renderLoginForm()}
                            </div>
                        </div>
                        {AffixHongbao ? <AffixHongbao/> : null}
                    </div>
                    {/* 导航 */}
                    <div className="menu-nav" id="headerNav" >
                        <NavigationBar menuHover={(value)=>{this.setState({showBlock: value})}}/>
                    </div>                           
                </div>
                <div className="clear"></div>
            </header>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        login: state.login,
        sitemsg: state.sitemsg,
        global:state.global,
        remoteSysConfs:state.remoteSysConfs,
        verifycode: state.verifycode
    }
);
export default connect(mapStateToProps)(Header)