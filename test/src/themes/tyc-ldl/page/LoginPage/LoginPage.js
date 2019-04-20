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
            errorMsg : "",
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
                    errorPassword : true,
                    errorMsg:resp.Message
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
    render() {
        const VerifyCode = window.r.get("VerifyCode");
        return (
            <div ref="dlg" id="reserveDialog_login" className="modal fade" role="dialog">
                <div className="modal-dialog login">
                    <div className="modal-content custom_modal_content">
                        <div className="modal-header regis-head BGcolor-second border-type">
                            <button type="button" className="close" data-dismiss="modal" onClick={()=>{this.close()}}><i className="fa fa-times"></i></button>
                            <h4 className="modal-title color-second">用户登录<span>太阳城亚洲官方现金网</span></h4>
                        </div>
                        <div className="modal-body " style={{height:"auto"}}>
                            <div className="col-md-6 left-img">
                                <img src={require('./images/loginbanner9.jpg')} />
                            </div>
                            <div className="col-md-6">
                                <form  onSubmit={this.onLogin.bind(this)} className={this.props.remoteSysConfs.require_login_verify_code=="true" ? "require_verify_code" : ""}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input ref="username" type="text" placeholder="用户名" />
                                        </div>
                                        <div className="col-md-12 ">
                                            <input ref="password" type="password" placeholder="请输入密码" />
                                        </div>
                                        <div className="col-md-12 forget"><a>忘记密码?</a></div>
                                        <div className="col-md-12">
                                            <button type="Submit" className="loginbtn">登录</button>
                                            <span className="errorMsg" style={{visibility:this.state.errorPassword?'visible':'hidden'}} >*{this.state.errorMsg}</span>
                                        </div>
                                        <div className="col-md-12 noUser">
                                            <span>还没有游戏帐户？</span>
                                        </div>
                                        <div className="col-md-12 regisbox">
                                            <Link to="/register"  className="regisbtn" onClick={this.regis.bind(this)}>
                                                免费注册
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
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