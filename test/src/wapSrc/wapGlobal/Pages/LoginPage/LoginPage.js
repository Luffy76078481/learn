import React, { Component } from 'react';
import {Icon, NavBar,Modal,Toast} from "antd-mobile";
import {Link,browserHistory} from "react-router";
import connect from "react-redux/es/connect/connect";
import "./LoginPage.scss"
import {config} from "globalConfig";


class LoginPage extends Component{
    constructor(props) {
        super(props);
        this.submitStateLock = true;
    }
    onLogin(event) {
        event.preventDefault();
        if(!this.submitStateLock) return;
        this.submitStateLock=false;
        Toast.hide();
        Toast.loading('登录中,请稍后...');
        new window.actions.ApiLoginAction(this.refs.username.value, this.refs.password.value).fly(resp=>{
            Toast.hide();
            this.submitStateLock=true;
            if (resp.StatusCode === 0) {
                new window.actions.LoginAfterInit();
                window.wapHistoryType.goBack();
            }else{
                Modal.alert('登录失败!',resp.Message)
            }
        });
    }
    forgetPassWord(){
        let onlineService = this.props.remoteSysConfs.online_service_link;
        Modal.alert('忘记密码?','联系在线客服协助修改密码?',[
            {text:'关闭'},
            {
                text:'联系客服',
                onPress:()=>{
                    if(config.isApp){
                        window.Util.appOpen(onlineService)
                    }else{
                        window.open(onlineService,'_blank');
                    }
                }
            }
        ])
    }
    render(){
        return(
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    rightContent={<div className="goHome" onClick={()=>window.wapHistoryType.push('/')}><i className="icon icon-home"></i></div>}
                    onLeftClick={this.props.router.goBack}
                >用户登录</NavBar>
                <div className="scroll-content loginBg">
                    <div className="login-logo"></div>
                    <form onSubmit={this.onLogin.bind(this)}>
                        <div className="inputItem">
                            <i className="icon icon-user"></i>
                            <input type="text" ref="username" placeholder="用户名" />
                        </div>
                        <div className="inputItem">
                            <i className="icon icon-lock"></i>
                            <input type="password" ref="password" placeholder="密码" />
                        </div>
                        <button className="loginBtn">登录</button>
                    </form>
                    <div className="loginBt">
                        <a onClick={this.forgetPassWord.bind(this)}>忘记密码?</a>
                        <Link to="/register">免费开户</Link>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps)(LoginPage)