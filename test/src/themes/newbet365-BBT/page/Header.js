/**
 * Created by bet365专用.
 */

import React, { Component } from 'react';
import { Link , IndexLink } from 'react-router';
import { connect } from 'react-redux'
import "./css/Header.scss";
import { nonsense } from 'antd-mobile/lib/picker';

class Header3 extends Component {
    constructor() {
        super();
        this.state = {
            time:"",
            tags: [],
            test:0,
            showBlock: false,
            isToggleOn: false,
            dispaly: 'block'

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
            this.setState({time: new Date(dt).format("hh:mm:ss")})
        }, 1000);
        document.addEventListener('click', this.handleClickOver.bind(this) );
        
    }

    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    handleClickOver(e){
        if(this.state.isToggleOn){
            this.setState({
                isToggleOn:false,
                dispaly:"none"
            })
        }
    }
    handleClick(e) {
        e.nativeEvent.stopImmediatePropagation();
        this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn,
          display: prevState.isToggleOn ? 'none': 'block'
        }))
    }

    renderLoginForm() {
        
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
        const userLevelVal =  window.cache.get("user").userLevelName
        return (
            <div className="m-t-10" style={{textAlign: "left"}}>
                <div className='Topline'>
                   <div className='user'>
                   <div id="vip-tooltip" className="vip-tooltip tooltip-content text-center" style={{"float":"left"}}>{userLevelVal}</div>
                   <a className='username' style={{"fontSize":"14px"}}>{user.username}</a>
                    <a href='javascript:void(0);' className='out' onClick={this.onLogout.bind(this)}>退出</a>
                   </div>
                   <div className='account'>
                     <Link to="/member" className='ac'>账户中心</Link>
                     <Link to="/message" className='message'></Link>
                     <a href='javascript:void(0);' className='msgNum'>{this.props.sitemsg.unread}</a>
                   </div>

                </div>
                <div className='BottomLine'>
                    <div className='amount'>余额<a style={{"color":"#ffdf1b"}}> {this.props.user.amount}</a> RMB</div>
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
        const PopNews = window.r.get("NoticeBar");
        const promotionLink =this.props.remoteSysConfs.channel_push_url;
        const agentLoginUrl = config.agentLoginUrl;
        return (
            <header id="topHead">
                <div className="headBg headBg3 BGcolor-main" >
                    {!options.loginFrom2?null:<div>{loginForm2}</div>}
                    <div className="container">
                         <Link to="/" className="headFname headFname3 row"></Link>
                        {/* 导航 */}
                        <div className="menu-nav" id="headerNav" >
                            <nav role="navigation">
                                <NavigationBar menuHover={(value)=>{this.setState({showBlock: value})}}/>
                            </nav>
                        </div>
                        <div className={`loginForm ${this.props.user.token? 'afterLogin': ''}`}>
                            {this.props.user.token? this.renderUserInfo() : this.renderLoginForm()}
                        </div>
                    </div>
                </div>

                <div className="notice">
                    <div className="container">
                        <div className="row">
                            <div className={"col-md-3 noticeLeft"}>
                                    <span className="time_box">
                                        {/* <i className="glyphicon glyphicon-time"></i>{config.timezone || "北京时间"}： */}
                                        <b id="clock">{this.state.time}</b> &nbsp;GMT+8                                     
                                    </span>
                            </div>
                            
                            <div className="col-md-7 noticeCenter">
                                <a className="notice-text">网站公告:</a>
                                <PopNews></PopNews>
                            </div>
                            <div className="col-md-2 noticeRight">
                                <a onClick={this.serversOpen.bind(this)}><i className="ChatText"></i>在线客服</a>
                                <a className="phone-text" target="_blank" href={promotionLink} >手机投注<i className="langageinco"></i></a>
                                <a className="server-text" onClick={this.handleClick.bind(this)}>服务<i className="langageinco"></i></a>
                                
                                {/* <a className="top_livechat" id="test1" target="_parent" href="#" onClick={this.serversOpen.bind(this)}></a> */}
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isToggleOn ? 
                <div>
                <span className="beforeserver"></span>
                <ul id="service">
                    <li><a href="/help.html" target="_blank">关于我们</a></li>
                    <li><a href="/agent.html" target="_blank">联系我们</a></li>
                    <li><a href="/agent.html" target="_blank">合营</a></li>
                    <li><a href={agentLoginUrl} target="_blank">代理登录</a></li>
                    <li><a href="/agent.html" target="_blank">代理注册</a></li>
                </ul> </div>
                : null}
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
export default connect(mapStateToProps)(Header3)


