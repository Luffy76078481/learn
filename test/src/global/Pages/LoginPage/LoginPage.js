/**
 * Created by b3 on 2017/6/9.
 */

import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import './LoginPage.scss'


class LoginPage extends Component {
    constructor (props){
        super();
        this.state = {
            errorMsg : true,
            VerifyCode:"",
            errorPassword:false,
            reqLock:false
        }
    }
    onLogin(e) {
        e.preventDefault();
        if(this.state.reqLock)
        return;
        this.state.reqLock =true;
        var _self = this;
        new window.actions.ApiLoginAction(this.refs.username.value,this.refs.password.value).fly(resp=>{
           if (resp.StatusCode === 0) {
               location.reload();
            } else {
                this.setState({
                    errorPassword : true
                })
            }
            _self.state.reqLock = false;
        });
    }
    getVerifyCode(VerifyCode){//獲取驗證碼
        this.setState({
            VerifyCode:VerifyCode
        })
    }
    regis(e){
        window.$(this.refs.dlg).modal("hide");
    }
    close(){
        this.setState({
            errorPassword : false
        })
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    render() {
        const VerifyCode = window.r.get("VerifyCode");
        return (
            <div ref="dlg" id="reserveDialog_login" className="modal fade" role="dialog">
                <div className="modal-dialog login">
                    <div className="modal-content custom_modal_content">
                        <div className="modal-header regis-head BGcolor-second border-type">
                            <button type="button" className="close" data-dismiss="modal" onClick={()=>{this.close()}}>
                                <i className="fa fa-times" />
                            </button>
                            <h4 className="modal-title color-second">
                            {window.config.spec == "dafa-bt6" || window.config.spec== "dafa-ldl"?null:
                                window.config.spec == "newbet365-BBT"?"登录":"登录会员"
                            }
                            </h4>
                        </div>
                        <div className="modal-body fast_booking_content regis-body BGcolor-main border-type" style={{height:"auto"}}>
                            <form  onSubmit={this.onLogin.bind(this)} className={this.props.remoteSysConfs.require_login_verify_code=="true" ? "require_verify_code" : ""}>
                                <div className="row">
                                    <div className="col-xs-12 col-md-12">
                                        <p> {window.config.spec == "newbet365-BBT"?null:"用户名"}</p>
                                        {window.config.spec == "newbet365-BBT"?
                                        
                                        <input ref="username" type="text" placeholder="用户名" className="border-type BGcolor-main color-main"/>
                                        :
                                        <input ref="username" type="text" placeholder="6-12位由字母和数字组成" className="border-type BGcolor-main color-main"/>

                                        }
                                    </div>
                                    <div className="col-xs-12 col-md-12 input-marg">
                                        <p> {window.config.spec == "newbet365-BBT"?null:"密码"}</p>
                                        {window.config.spec == "newbet365-BBT"?
                                         <input ref="password" type="password" placeholder="密码" className="border-type BGcolor-main color-main"/>
                                        :
                                        <input ref="password" type="password" placeholder="6-12位由字母和数字组成" className="border-type BGcolor-main color-main"/>
                                    }
                                    </div>
                                    <div className="col-xs-12 col-md-12">
                                        <span className="ml5 red f12" hidden={this.state.errorMsg} style={{color:"red",fontSize:"16px",paddingLeft:"30%"}}>*帐号或密码错误</span>
                                    </div>
                                    {/*<div className={this.props.remoteSysConfs.require_login_verify_code=="true" ?"col-xs-12 col-md-12 " : "hide-login-Code-Img"}>*/}
                                        {/*<p>验证码</p>*/}
                                        {/*<span className="code-image"><VerifyCode getVerifyCode={this.getVerifyCode.bind(this)} ></VerifyCode></span>*/}
                                        {/*<input ref="verifycode" type="text" className="code-input input verifycode" placeholder="验证码"/>*/}
                                    {/*</div>*/}
                                    <div className="col-xs-6 col-md-6">
                                        <button type="Submit" className="loginbtn">登录</button>
                                        {(window.config.spec == 'dafa-bt6' || window.config.spec== "dafa-ldl") && this.state.errorPassword?<span style={{display: 'block',marginTop:'20px'}}>用户名或密码错误</span>:null}
                                    </div>
                                    <div className="col-xs-6 col-md-6 regisbox">
                                        { window.config.spec == "newbet365-BBT"?null:
                                            <Link to="/register" activeClassName="active" onClick={this.regis.bind(this)}>
                                                <button type="button" className="regisbtn">注册</button>
                                            </Link>                                  
                                        }                                   
                                    </div>
                                    
                                </div>
                            </form>
                            {
                                    window.config.spec == "newbet365-BBT"?
                                        <div className="col-xs-7 col-md-7 addnation">    
                                        <a className="forgetpassworf" onClick={this.serversOpen.bind(this)}>忘记密码</a>
                                        <Link to="/register" activeClassName="active" onClick={this.regis.bind(this)}>
                                        <span className="logintext">立即加入</span></Link>
                                        </div>:null
                                    }
                        </div>
                    </div>
                </div>
            </div>

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

export default connect(mapStateToProps)(LoginPage) ;