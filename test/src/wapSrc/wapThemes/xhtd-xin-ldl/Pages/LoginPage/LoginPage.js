import React, { Component } from 'react';
import {Icon, NavBar,Modal,Toast} from "antd-mobile";
import {Link,browserHistory} from "react-router";
import connect from "react-redux/es/connect/connect";
import "./LoginPage.scss"
import {config} from "globalConfig";
import {wapLogin} from "globalAction";


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
                wapLogin(false)
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
    register(){
        wapLogin(false);
        browserHistory.push("/register")
    }
    render(){
        return(
            <div>
                <Modal
                    className={"loginModal"}
                    transparent
                    closable={true}
                    visible={this.props.showLoginModal}
                    onClose={()=>{wapLogin(false)}}
                >
                    <div className="login-logo2"></div>
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
                        <a onClick={this.forgetPassWord.bind(this)}>无法登录?</a>
                        <a>还不是{config.appName}用户?</a>
                        <a onClick={this.register.bind(this)} className={"register"}>立即加入</a>
                    </div>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs:state.remoteSysConfs,
        showLoginModal:state.showLoginModal
    }
);

export default connect(mapStateToProps)(LoginPage)