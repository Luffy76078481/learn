import React, { Component } from 'react';
import { Link , IndexLink,browserHistory } from 'react-router';
import { connect } from 'react-redux'
import "./css/Header.scss";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            time:"",
            showBlock: false,
            person:parseInt(Math.random()*3000),
            reqLock:false
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
                    <button type="submit" className="form-login-btn"></button>
                    <a id="test" onClick={this.serversOpen.bind(this)} className="demotest forget">
                    <i className="glyphicon glyphicon-question-sign mr5"></i>
                        忘记密码？
                    </a>
                </div>
                <div className="form-login-reg">
                    <Link to="/register" className="form-reg-btn" title="立即注册">
                        <span>立即</span>
                        <span>注册</span>
                    </Link>
                </div>
                <div className="clear"></div>
            </form>
        );
    }
    renderUserInfo() {
        const user = this.props.user;
        const userLevel = user.userLevelName && user.userLevelName.indexOf("黑名单") !== -1 ? "会员":user.userLevelName|| "欢迎您" ;

        return (
            <div className="mt10" style={{textAlign: "left"}}>
                    <span className="memberItem">{userLevel}：<Link to="/member">{user.username}</Link></span>
                <div style={{display:'inline-block'}}>
                    <span className="memberItem" style={{paddingLeft:"10px"}}>  总额：{this.props.user.amount} RMB</span>
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
        const NavigationBar = window.r.get("NavigationBar");
        const config = window.config;
        const PopNews = window.r.get("NoticeBar");
        return (
            <header id="topHead">
                {/* <div className="headerBasicInfo">
                    <span className="time_box">
                        <i className="glyphicon glyphicon-time" />
                        {config.timezone || "北京时间"}：
                        <b id="clock"  ref="setClock" />
                    </span>
                    <span className="online_user">
                        <i className="fa fa-male" />
                        在线人数：{20000+this.state.person}人
                    </span>
                    <span className={this.props.user.token?"personal":"personalHide"}><Link to="/member"><i className="glyphicon glyphicon-user" aria-hidden="true"></i>个人中心</Link></span>
                </div> */}
                <div className="headBg BGcolor-main" >

                    <div className="container">
                        <div className="headFname row">
                            <Link className="gofg" to="/"></Link>
                            
                            <div className="logo">
                                <Link to="/">
                                    <span className="innerLogo"></span>
                                </Link>
                            </div>
                            <div className="credit"> </div>
                            <div className="loginForm afterLogin">
                                <div className={this.props.user.token?"timeNumber n-timeNumber":"timeNumber"}>
                                    <a href="/nav.html" target="_blank" className="color-main help">备用网址</a>
                                    <span>|</span>
                                    <a href="/help.html" target="_blank" className="color-main help">帮助中心</a>
                                    <span>|</span>
                                    <a href="/agent.html" target="_blank" className="color-main agent">申请代理</a>
                                    <span>|</span>
                                    {/* <a href="/promotions" className="color-main">VIP</a> */}
                                    <a href="javascript:Util.AddFavorite('新葡京官网');" className="color-highlight fav"><i className="glyphicon glyphicon-home"></i>收藏本站</a>
                                    <div className="clear"></div>
                                </div>
                                <div className="right-login">
                                    {this.props.user.token? this.renderUserInfo() : this.renderLoginForm()}
                                </div>
                            </div>
                        </div>
                        <div className="menu-nav" id="headerNav" >
                            <nav role="navigation">
                                <NavigationBar menuHover={(value)=>{this.setState({showBlock: value})}}/>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="notice">
                    <div className="container">
                        <div className="row">
                            <div className={this.props.user.token?"col-md-3 noticeLeft n-noticeLeft":"col-md-3 noticeLeft"}>
                                <i  className="msg_tip_txt">最新公告</i>
                            </div>
                            <div className="col-md-7 noticeCenter">
                                <PopNews ></PopNews>
                            </div>
                            {/* <div className="col-md-2 noticeRight">
                                <a className="top_livechat" id="test1" target="_parent" href="#" onClick={this.serversOpen.bind(this)} />
                            </div>  */}
                        </div>
                    </div>
                </div>
                {/* <div className="NoticeStyle">
                    <div className="col-md-7 noticeCenter">
                            <PopNews></PopNews>
                    </div>
                    <div className="col-md-2 noticeRight">
                            <a className="top_livechat" id="test1" target="_parent" href="#" onClick={this.serversOpen.bind(this)}></a>
                    </div>                   
                </div> */}
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
        remoteSysConfs:state.remoteSysConfs,
    }
);
export default connect(mapStateToProps)(Header)