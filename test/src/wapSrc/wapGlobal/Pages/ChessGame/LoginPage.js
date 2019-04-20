import React, { Component } from 'react';
import {Modal,Toast} from "antd-mobile";
import {Link,browserHistory} from "react-router";
import connect from "react-redux/es/connect/connect";
import "./LoginRegisterPage.scss"
import {config} from "globalConfig";

class LoginPage extends Component{
    constructor(props) {
        super(props);
        this.submitStateLock = true;// 状态锁
    }
    onLogin(event) {
        event.preventDefault();
        if(!this.submitStateLock) return;
        this.submitStateLock=false;
        Toast.hide();// 提示框
        Toast.loading('登录中,请稍后...');
        new window.actions.ApiLoginAction(this.refs.username.value, this.refs.password.value).fly(resp=>{
            Toast.hide();
            this.submitStateLock=true;
            if (resp.StatusCode === 0) {
                new window.actions.LoginAfterInit();
                browserHistory.goBack();
            }else{
                Modal.alert('登录失败!',resp.Message) // 消息框
            }
        });
    }
    // 忘记密码
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
    componentDidMount(){
        window.onresize=null;
    }
    componentWillUnmount(){
        window.onresize = window.Util.convertPixel
    }
    render(){
        return(
            <div className="loginAndRegPage">
                <div className="backHome"><Link to="/"></Link></div>
                <div className="loginWrap">
                    <div className="formWrap">              
                        <form onSubmit={this.onLogin.bind(this)}>
                            <div className='userItem'>
                                <label>账号</label>
                                <input type="text" ref="username" placeholder="" maxLength='16'/>
                            </div>
                            <div className='userItem'>
                                <label>密码</label>
                                <input type="password" ref="password" placeholder="" maxLength='16'/>
                            </div>
                            <button className="loginBtn"></button>
                        </form>
                        <div className='loginBt'>
                            <a onClick={this.forgetPassWord.bind(this)}>忘记密码</a>
                            <Link to="/register">免费开户</Link>
                        </div>
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