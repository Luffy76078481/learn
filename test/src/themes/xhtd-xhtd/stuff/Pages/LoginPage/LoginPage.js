/**
 * xhtd 弹窗登录
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
    componentDidMount(){
     
    }
    // 登录完成隐藏登录框
    regis(e){
        window.$(this.refs.dlg).modal("hide");
    }
    // 登录框X
    close(){
        this.setState({
            errorPassword : false
        })
    }
    serversOpen(e){
        e.preventDefault();

        if(e.target.id=='test'){
            window.swal({
                    title: "忘记密码",
                    text: "联系在线客服协助修改密码",
                    confirmButtonColor: "#c5841f",
                    confirmButtonText: "联系客服",
                    showCancelButton: true,
                    cancelButtonText: "关闭",
                },
                ()=>{
                    window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
                });
            return;
        }
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=900,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=450,screenY=250');
        return false;
    }
    // 渲染
    render() {
        return (
            <div ref="dlg" id="reserveDialog_login" className="modal fade" role="dialog">
                <div className="modal-dialog login">
                    <div className="modal-content custom_modal_content">
                        <div className="modal-header regis-head BGcolor-second border-type">
                            <button type="button" className="close" onClick={()=>{this.close()}} data-dismiss="modal">
                                <img src={require('./../../images/xdialog.png')} alt="" className=""/>
                            </button>
                            <h4 className="modal-title color-second">会员登录</h4>
                        </div>
                        <div className="modal-body fast_booking_content regis-body BGcolor-main border-type" style={{height:"auto"}}>                  
                             <form onSubmit={this.onLogin.bind(this)} className={this.props.remoteSysConfs.require_login_verify_code=="true" ? "require_verify_code" : ""}>
                                <div className="row">
                                    <div className="col-xs-12 col-md-12 mt25">                            
                                        <input ref="username" type="text" placeholder="账号" className="border-type BGcolor-main color-main"/>
                                        <i className="login_line"></i>
                                    </div>
                                    <div className="col-xs-12 col-md-12 input-marg mt25">
                                        <input ref="password" type="password" placeholder="密码" className="border-type BGcolor-main color-main"/>
                                        <i className="login_line"></i>
                                        <a href="javascript:void(0);" id="test" onClick={this.serversOpen.bind(this)} className="demotest forget">忘记密码</a>
                                    </div>
                                    <div className="col-xs-12 col-md-12">
                                        <span className="ml5 red f12" hidden={this.state.errorMsg} style={{color:"red",fontSize:"16px",paddingLeft:"30%"}}>*帐号或密码错误</span>
                                    </div>
                                    {/* <div className={this.props.remoteSysConfs.require_login_verify_code=="true" ?"col-xs-12 col-md-12 " : "hide-login-Code-Img"}>
                                        <p>验证码</p>
                                        <input ref="verifycode" type="text" className="code-input input verifycode" placeholder="验证码"/>
                                    </div> */}
                                    <div className="col-xs-12 col-md-12 login_btn_box">
                                        <button type="Submit" className="loginbtn">登录</button>                                
                                    </div>
                                    <div className="regisbox">
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