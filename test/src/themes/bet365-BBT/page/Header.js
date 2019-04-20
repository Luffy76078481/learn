/**
 * Created by bet365专用.
 */

import React, { Component } from 'react';
import { Link , IndexLink } from 'react-router';
import { connect } from 'react-redux'
import "./css/Header.scss";

class Header3 extends Component {
    constructor() {
        super();
        this.state = {
            time:"",
            tags: [],
            test:0,
            showBlock: false
        };
    }

    onLogin(event) {
        event.preventDefault();
        new window.actions.ApiLoginAction(this.refs.username.value, this.refs.password.value).fly(resp=>{
            if (resp.StatusCode === 0) {
                new window.actions.ApiPlayerInfoAction().fly();
                new window.actions.ApiBankAccountsAction().fly();
            }else if(resp.StatusCode === 1 ){
                swal(resp.Message)
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
            this.setState({time: new Date(dt).format("yyyy/MM/dd hh:mm:ss")})
        }, 1000);
        this.reVerifyCode();


    }
    componentWillReceiveProps(nextProps) {

    }

    reVerifyCode(e) {
        // new window.actions.ApiVerifyCodeAction().fly();
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }

    renderLoginForm() {
        const options = window.r.props("Header");

        return (

            <form id="login-form" className={this.props.remoteSysConfs.require_login_verify_code=="true" ? "require_verify_code" : ""} onSubmit={this.onLogin.bind(this)}>
                <div className='loginInput'>
                    <input className='userName' ref="username"  id="demotestid2" type='text' placeholder='用户名' />
                    <input className='password' ref="password" type='password' placeholder='密码' />
                    <input ref="verifycode" type="text" className="code-input input verifycode" placeholder="验证码"/>
                    <button>登录</button>  
                </div>
                <div className='forgetItem'>
                   {/* <Link to="/register" className="form-reg" title="立即加入"></Link> */}
                   <a href='/register' className='form-reg'>立即加入</a>
                   <a href="javascript:void(0);" id="test" onClick={this.serversOpen.bind(this)} className="forget">忘记密码？</a>
                </div>
            </form>           
        );
    }
    renderUserInfo() {
        const user = this.props.user;
        const userLevel = user.userLevelName && user.userLevelName.indexOf("黑名单") !== -1 ? "会员":user.userLevelName|| "欢迎您" ;
        const options = window.r.props("Header");

        return (
            <div className="m-t-10" style={{textAlign: "left",width:'250px'}}>
                <div className='Topline'>
                   <div className='user'>
                   <a className='username'>{user.username}</a> <a href='javascript:void(0);' className='out' onClick={this.onLogout.bind(this)}>退出</a>
                   </div>
                   <div className='account'>
                     <Link to="/member" className='ac'>账户中心</Link>
                     <Link to="/message" className='message'></Link>
                     <a href='javascript:void(0);' className='msgNum'>{this.props.sitemsg.unread}</a>
                   </div>

                </div>
                <div className='BottomLine'>
                    <div className='amount'>余额{this.props.user.amount}RMB</div>
                    <div className='transfer'>
                        <Link to="/deposit" className="item bai">存款</Link>
                        <Link to="/withdraw" className="item bai">取款</Link>
                        <Link to="/transfer" className="item bai">转账</Link>
                    </div>
                </div>
            </div>

        );
    }
   
    render() {
        var NavigationBar = window.r.get("NavigationBar");
        const config = window.config;
        const options = window.r.props("Header");
        var AffixHongbao = window.r.get("AffixHongbao");
        const PopNews = window.r.get("NoticeBar");
        const SecondNav = window.r.get("SecondNav");
        const agentName = options.agentName||"申请代理";
        const vipName = options.vipName||"VIP";
        const agentLoginUrl = config.agentLoginUrl;
        return (
            <header id="topHead">
                <div className="headBg headBg3 BGcolor-main" >
                    {!options.loginFrom2?null:<div>{loginForm2}</div>}
                    <div className="container">
                        <div className="headFname headFname3 row">
                            <Link to="/" className="logoimgIndx"></Link>
                            {!options.hideLogin? (window.config.spec == 'hg' ? null :
                            <div className={`loginForm ${this.props.user.token? 'afterLogin': ''}`}>
                         
                                 { this.props.user.token?
                                    <span className="time_box">
                                        <i className="glyphicon glyphicon-time"></i>{config.timezone || "北京时间"}：
                                        <b id="clock">{this.state.time}</b>                                        
                                    </span>

                                    : null }
                              
                                {this.props.user.token? this.renderUserInfo() : this.renderLoginForm()}
                            </div>):null}
                        </div>
                        {/* 导航 */}
                        <div className="menu-nav" id="headerNav" >
                            <nav role="navigation">
                                <NavigationBar menuHover={(value)=>{this.setState({showBlock: value})}}/>
                            </nav>
                        </div>
                        {AffixHongbao ? <AffixHongbao/> : null}
                    </div>
                </div>

                <div className="notice">
                    <div className="container">
                        <div className="row">
                            <div className={this.props.user.token?"col-md-3 noticeLeft n-noticeLeft":"col-md-3 noticeLeft"}>
                            
                                <a href="/help.html" target="_blank" className="color-main help">帮助中心</a>
                                <span>|</span>
                                <a href="/agent.html" target="_blank" className="color-main agent">{agentName}</a>
                                {!options.agentLogin?null: <span>|</span>}
                                {!options.hideVip?<Link to="/promotions" className="color-highlight color-main vip">{vipName}</Link>: null}
                            </div>
                            <div className="col-md-7 noticeCenter">
                                <PopNews></PopNews>

                            </div>
                            <div className="col-md-2 noticeRight">
                                <a className="top_livechat" id="test1" target="_parent" href="#" onClick={this.serversOpen.bind(this)}></a>
                            </div>
                        </div>
                    </div>
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
        login: state.login,
        sitemsg: state.sitemsg,
        global:state.global,
        remoteSysConfs:state.remoteSysConfs,
        verifycode: state.verifycode
    }
);
export default connect(mapStateToProps)(Header3)