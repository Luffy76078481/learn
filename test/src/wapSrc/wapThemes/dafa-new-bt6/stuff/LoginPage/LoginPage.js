import React, { Component } from 'react';
import {Icon, NavBar,Modal,Toast,List,Switch} from "antd-mobile";
import {Link,browserHistory} from "react-router";
import connect from "react-redux/es/connect/connect";
import "./LoginPage.scss"
import {config} from "globalConfig";


class LoginPage extends Component{
    constructor(props) {
        super(props);
        this.submitStateLock = true;
        this.state = {
            remPwd: true
        }
    }
    onLogin (event) {
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
                // browserHistory.goBack();
                browserHistory.push('/');
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
    rememberPwd(){
        this.setState({
            remPwd: !this.state.remPwd
        })
    }
    renderRightCon = () => {
        let dom = [
            <Link to='/login' key={"firstLogin"} className="userLogin">登录</Link>,
            <Link to='/register' key={"firstRegister"} className="userRegister">注册</Link>
        ];
        return dom;
    }

    downLoad = () => {
        window.open(this.props.remoteSysConfs.channel_push_url, "_blank");
    }

    render(){
        let rightCon = this.renderRightCon();
        return(
            <div className="loginPage">
                <NavBar
                    mode="light"
                    leftContent={<span className="logo" />}
                    rightContent={rightCon}
                />
                <div className="scroll-content loginBg">
                    <form onSubmit={this.onLogin.bind(this)}>
                        <div className="inputItem">
                            <i className="icon icon-user"/>
                            <input type="text" ref="username" placeholder="用户名" id="user_name"/>
                            <label htmlFor="user_name" className="user_label">4-16位数字或字母组合</label>
                        </div>
                        <div className="inputItem">
                            <i className="icon icon-lock"/>
                            <input type="password" ref="password" placeholder="密码" id="user_pwd"/>
                            <label htmlFor="user_pwd" className="pwd_label">4-16位数字或字母组合</label>
                        </div>
                        <button className="loginBtn">立即登录</button>
                    </form>

                    {/*<label className="switch_btn">
                        <input type="checkbox" id="checkbox" checked={this.state.remPwd}/>
                        <span className="slider round" onClick={this.rememberPwd.bind(this)}/>
                    </label>
                    <span className="switch_text">记住密码</span>*/}

                    <List>
                        <List.Item extra={
                            <Switch checked={this.state.remPwd}
                                    color="#ffbb44"
                                    onChange={()=>{
                                        this.setState({remPwd: !this.state.remPwd})
                                    }}
                            />
                        }>
                            记住密码
                        </List.Item>
                    </List>


                    <div className="loginBt">
                        <Link to="/register" className="regNow">没有账号?立即注册</Link>
                        <span onClick={this.downLoad} className="downloadApp">下载APP</span>
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