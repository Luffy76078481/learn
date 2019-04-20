/**
 * Created by jamen on 2017/4/28.
 */

import React, { Component } from 'react';
import { Link , IndexLink } from 'react-router';
import { connect } from 'react-redux'
import "./css/Header_acyl.scss";

class Header_acyl extends Component {
    constructor() {
        super();
        this.state = {
            time:"",
            showBlock: true
        };
    }
    onLogin(event) {
        event.preventDefault();
        new window.actions.ApiLoginAction(this.refs.username.value, this.refs.password.value).fly(resp=>{
            if (resp.StatusCode === 0) {
                new window.actions.ApiPlayerInfoAction().fly();
                new window.actions.ApiBankAccountsAction().fly();
            }
        });
    }
    onLogout() {
        new window.actions.LogoutAction().fly();
    }
    componentDidMount(){
        window.setInterval(()=>{
            let d = new Date();
            let dt = d.getTime();
            if(window.config.timezone.indexOf("美东") != -1){
                dt = dt + (d.getTimezoneOffset() - 4*60)*60*1000
            }
            this.refs.setClock.innerHTML = new Date(dt).format("yyyy/MM/dd hh:mm:ss")
        }, 1000);

    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }

    renderLoginForm() {
        const options = window.r.props("Header");
        return (
            <form id="login-form" onSubmit={this.onLogin.bind(this)}>
                <div className="form-login-input">
                    <input type="text" ref="username"  id="demotestid2" className="account-input input-type border-type" placeholder="用户名"/>
                    <input type="password" ref="password" className="pwd-input input-type border-type" placeholder="密码"/>
                </div>
                <div className="form-login-button">
                    <button type="submit" className="form-login-btn">{options.loginTxt}</button>
                    {/*<a id="test" onClick={this.serversOpen.bind(this)} className="demotest forget">*/}
                       {/*<i className="glyphicon glyphicon-question-sign mr5"></i>忘记密码？*/}
                    {/*</a>*/}
                </div>
                <div className="form-login-reg">
                    <Link to="/register" className="form-reg-btn" title="免费注册"></Link>
                </div>
                <div className="clear"></div>
            </form>
        );
    }
    renderUserInfo() {
        const user = this.props.user;
        const userLevel = user.userLevelName && user.userLevelName.indexOf("黑名单") !== -1 ? "会员":user.userLevelName|| "欢迎您" ;

        return (
            <div className="mt10" style={{textAlign: "left", padding: "5px"}}>
                <span className="memberItem">{userLevel}会员：<Link to="/member">{user.username}</Link></span>
                <div style={{display:'inline-block'}}>
                    <span className="memberItem" style={{paddingLeft:"2px"}}>  总额：{this.props.user.amount} RMB</span>
                    <span className="memberItem"><Link to="/deposit" className="item bai">存款</Link></span>
                    <span className="memberItem"><Link to="/withdraw" className="item bai">取款</Link></span>
                    <span className="memberItem"><Link to="/transfer" className="item bai">额度转换</Link></span>
                </div>
                <span className="memberItem">
                    <Link to="/message" className="item bai member-msg">
                        <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        <span className="huang ml5" style={{color: "red"}}>({this.props.sitemsg.unread})</span>
                    </Link>
                </span>
                <span className="memberItem"><a className="item huang bgGray4" onClick={this.onLogout.bind(this)}>退出</a></span>
                <div className="clear"></div>
            </div>
        );
    }
    render() {
        let NavigationBar = window.r.get("NavigationBar");
        const config = window.config;
        let AffixHongbao = window.r.get("AffixHongbao");
        const SecondNav = window.r.get("SecondNav");
        return (
            <header id="topHead">
                <div className="headBg BGcolor-main" >
                        <div className="headFname row">
                            <Link className="gofg" to="/"></Link>
                            <div className="logo">
                                <Link to="/">
                                  <span className="innerLogo"></span>
                                </Link>
                            </div>
                            <div className="luckyLink">
                            </div>
                            <div className="loginForm">
                                <div className={this.props.user.token?"timeNumber n-timeNumber":"timeNumber"}>
                                    <span className="time_box">
                                        <i className="glyphicon glyphicon-time"></i>{config.timezone || "北京时间"}：<span id="clock" ref="setClock"></span>
                                    </span>
                                    <span className={this.props.user.token?"personal":"personalHide"}>
                                        <Link to="/member"><i className="glyphicon glyphicon-user" aria-hidden="true"></i>个人中心</Link>
                                    </span>
                                    <div className="clear"></div>
                                </div>
                                {this.props.user.token? this.renderUserInfo() : this.renderLoginForm()}
                            </div>
                        </div>
                        {/* 导航栏目*/}                     
                        <div className="menu-nav" id="headerNav" >
                            <nav role="navigation">
                                <NavigationBar menuHover={(value)=>{this.setState({showBlock: value})}}/>
                            </nav> 
                        </div>
                        {AffixHongbao ? <AffixHongbao/> : null}
                    </div>
                <div className="clear"></div>
                {SecondNav && <SecondNav showBlock={this.state.showBlock}></SecondNav>}
            </header>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        sitemsg: state.sitemsg,
        remoteSysConfs:state.remoteSysConfs,
    }
);
export default connect(mapStateToProps)(Header_acyl)