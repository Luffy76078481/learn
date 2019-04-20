/**
 * vn2 登录弹窗
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
            errorPassword:false,
            reqLock:false
        }
    }
    // 登录
    onLogin(e) {
        e.preventDefault();
        if(this.state.reqLock)
        return;
        this.state.reqLock =true;
        var _self = this;
        new window.actions.ApiLoginAction(this.refs.username.value,this.refs.password.value).fly(resp=>{
            if (resp.StatusCode === 0) {
                location.reload();
             } 
             else 
                {
                    this.setState({
                    errorPassword : true
                })
             }
             _self.state.reqLock = false;
         });
    }
    regis(e){
        window.$(this.refs.dlg).modal("hide");
        new window.actions.ApiVerifyCodeAction().fly();

    }
    close(){
        this.setState({
            errorPassword : false
        })
    }
    render() {
        return (
            <div ref="dlg" id="reserveDialog_login" className="modal fade" role="dialog">
                <div className="modal-dialog login">
                    <div className="modal-content custom_modal_content">
                        <div className="modal-header regis-head BGcolor-second border-type">
                            <button type="button" className="close" onClick={()=>{this.close()}} data-dismiss="modal">
                                <img src={require("./xdialog.png")} alt="关闭登录框" className=""/>
                            </button>
                            <h4 className="modal-title color-second">会员登录</h4>
                        </div>
                        <div className="modal-body fast_booking_content regis-body BGcolor-main border-type" style={{height:"auto"}}>
                            <form  onSubmit={this.onLogin.bind(this)} className={this.props.remoteSysConfs.require_login_verify_code=="true" ? "require_verify_code" : ""}>
                                <div className="row">
                                    <div className="col-xs-12 col-md-12">
                                        <p>用户名</p>
                                        <input ref="username" type="text" placeholder="6-12位由字母和数字组成" className="border-type BGcolor-main color-main"/>
                                    </div>
                                    <div className="col-xs-12 col-md-12 input-marg">
                                        <p>密码</p>
                                        <input ref="password" type="password" placeholder="6-12位由字母和数字组成" className="border-type BGcolor-main color-main"/>
                                    </div>
                                    <div className="col-xs-12 col-md-12">
                                        <span className="ml5 red f12" hidden={this.state.errorMsg} style={{color:"red",fontSize:"16px",paddingLeft:"30%"}}>*帐号或密码错误</span>
                                    </div>
                                    <div className="col-xs-6 col-md-6">
                                        <button type="Submit" className="loginbtn">登录</button>
                                        {window.config.spec == 'dafa_new' && this.state.errorPassword?<span style={{display: 'block',marginTop:'20px'}}>用户名或密码错误</span>:null}
                                    </div>
                                    <div className="col-xs-6 col-md-6 regisbox">
                                        <Link to="/register" activeClassName="active" onClick={this.regis.bind(this)}>
                                            <button type="button" className="regisbtn">注册</button>
                                        </Link>
                                    </div>
                                </div>
                            </form>
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