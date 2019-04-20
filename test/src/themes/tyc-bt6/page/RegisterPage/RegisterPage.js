/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import { Link, IndexLink,browserHistory } from 'react-router';
import MyDatePicker from '../../../../global/Components/MyDatePicker/MyDatePicker_records';
import * as cache from "../../../../store/CacheHelper";
import "./RegisterPage.scss";

class RegisterPage extends Component {

    constructor (props){
        super();
        this.state = {
            VerifyCode:"",
            noUsername: true,
            notMatchPswHid: true,
            noPassword: true,
            noPassword2: true,
            noPayPassword: true,
            noPayPassword2: true,
            notMatchPayPassword: true,
            noPhone: true,
            noVerifycode: true,
            errorVerifycode:true,
            noRealname: true,
            noEmail: true,
            noBirthday:true,
            noWechat:true,
            noQQ: true,
            noUsernameMessage:"*此项不能为空"
        }
    }
    handleRegister(e) {
        e.preventDefault();
        // debugger;
        this.setState({
            noUsername: true,
            notMatchPswHid: true,
            noPassword: true,
            noPassword2: true,
            noPayPassword: true,
            noPayPassword2: true,
            notMatchPayPassword: true,
            noPhone: true,
            noVerifycode: true,
            errorVerifycode:true,
            noRealname: true,
            noEmail: true,
            noBirthday:true,
            noWechat:true,
            noQQ: true,
        });

        var checknom = 0;

        if(!this.refs.username.value){
            this.setState({
                noUsername:false
            });
            checknom++;
        }

        if(!this.refs.password.value){
            this.setState({
                noPassword:false
            });
            checknom++;
        }
        if(!this.refs.password2.value  ){
            this.setState({
                noPassword2:false
            });
            checknom++;
        }
        if(this.refs.password.value !== this.refs.password2.value ){
            this.setState({
                notMatchPswHid:false
            });
            checknom++;
        }
        var phone = this.refs.phone && this.refs.phone.value;
        var email = this.refs.email && this.refs.email.value;
        var qq = this.refs.qq && this.refs.qq.value;
        var birthday = this.refs.birthday && this.refs.birthday.getValue();
        var wechat = this.refs.wechat && this.refs.wechat.value;
        var payPassword = (this.refs.payPassword && this.refs.payPassword.value) || this.refs.password.value;
        if(this.props.remoteSysConfs.allow_edit_pay_pwd == "true"){
            if (!this.refs.payPassword.value) {
                this.setState({
                    noPayPassword: false
                });
                checknom++;
            }
            if (!this.refs.payPassword2.value) {
                this.setState({
                    noPayPassword2: false
                });
                checknom++;
            }

            if(this.refs.payPassword.value !== this.refs.payPassword2.value ){
                this.setState({
                    notMatchPayPassword:false
                });
                checknom++;
            }
        }
        if(this.props.registerSetting.TrueNameIsRequire){
            if(!this.refs.realname.value){
                this.setState({
                    noRealname:false
                });
                checknom++;
            }
        }
        if (this.props.registerSetting.PhoneIsRequire) {
            if (!this.refs.phone.value) {
                this.setState({
                    noPhone: false
                });
                checknom++;
            }
        }
        if (this.refs.phone.value) {
            if(!(/^1[1-9][0-9]\d{4,8}$/.test(this.refs.phone.value))){
                this.setState({
                    noPhone: false
                });
                return;
            }
        }

        if (this.props.registerSetting.EmailIsRequire) {
            if (!this.refs.email.value) {
                this.setState({
                    noEmail: false
                });
                checknom++;
            }
        }
        if (this.props.registerSetting.QQIsRequire) {
            if (!this.refs.qq.value) {
                this.setState({
                    noQQ: false
                });
                checknom++;
            }
        }
        if (this.props.registerSetting.BirthdayIsRequire) {
            if (!this.refs.birthday.getValue()) {
                this.setState({
                    noBirthday:true,
                });
                checknom++;
            }
        }
        if (this.props.registerSetting.WechatIsRequire) {
            if (!this.refs.wechat.value) {
                this.setState({
                    noWechat:true,
                });
                checknom++;
            }
        }
        if(this.refs.verifycode.value && this.refs.verifycode.value.toLocaleLowerCase() != this.state.VerifyCode.toLocaleLowerCase()){
            this.setState({
                errorVerifycode:false,
            });
            checknom++;
        }
        if(!this.refs.verifycode.value){
            this.setState({
                noVerifycode:false
            });
            checknom++;
        }

        if(checknom!=0){
            return;
        }
        let referer = sessionStorage.getItem("channel") || "";
        let params = {//后台要接收的参数
            UserName:this.refs.username.value,
            TrueName:this.refs.realname.value,
            Password:this.refs.password.value,
            Email:email,
            Phone:phone,
            QQ:qq,
            WithdrawalPassword:payPassword,
            ExtendCode:this.refs.channel?this.refs.channel.value:null,
            Birthday:birthday,
            Wechat:wechat,
            Referer:referer
        };
        new window.actions.ApiRegisterAction (params).fly((respond)=>{
            if (respond.StatusCode === 0) {
                browserHistory.push("/withdrawAndDeposit");
            } else {
                window.swal("注册失败", respond.Message, "error");
            }
        });
    }
    componentDidMount() {
        new window.actions.ApiRegisterSettingAction().fly();
        window.$("#root").attr("class", "usefulcss");
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.apiResult !== this.props.apiResult) {
            if (nextProps.apiResult.method === "register") {

                if (nextProps.apiResult.response.status === 0) {
                    window.$("#reserveDialog_reservation").modal("hide");
                }
            }
        }
    }
    openRule(){
        window.open('/pact.html','pact' ,'width=900,height=600, location=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250')
    }

    getVerifyCode(VerifyCode){//獲取驗證碼
        this.setState({
            VerifyCode:VerifyCode
        })
    }

    checkUserName(e){
        let _this=this;
        let val = e.target.value;
        if(val=="" || 6>val.length){
            return;
        }
        new window.actions.ApiCheckUserNameAction(val).fly(resp=>{
            if(resp.StatusCode==0){
                if(resp.Registered){
                    _this.setState({
                        noUsername:false,
                        noUsernameMessage:"账号已注册,请更换！"
                    })
                }else{
                    _this.setState({
                        noUsername:true,
                        noUsernameMessage:"*此项不能为空"
                    })
                }
            }
        });
    }

    render() {
        const config = window.config;
        const VerifyCode = window.r.get("VerifyCode");
        let storeChannel = "";
        if(window.sessionStorage){
            storeChannel = sessionStorage.getItem("channel");
        }
        const channel = storeChannel || window.channel || "";

        return (
            <main className="Bgmember-main" id="RegisterNewPage">
                <div className="tm">
                    <div className="main">
                        <div className="ht-t ht-t-img"></div>
                        <div className="text-center">
                            <div className="content">
                                <form onSubmit={this.handleRegister.bind(this)}>
                                    <div className="row">
                                        <div className="col-xs-12 col-md-12">
                                            <p className="col-xs-6 col-md-6"><i className="fa fa-star" aria-hidden="true"></i>用户名</p>
                                            <div className="col-xs-6 col-md-6">
                                                <input ref="username" type="text" placeholder="6-12位由字母和数字组成" onBlur={this.checkUserName.bind(this)} className="input member-input"/>
                                                <span className="ml5 red f12" hidden={this.state.noUsername} style={{"color":"red"}}>{this.state.noUsernameMessage}</span>
                                            </div>
                                        </div>
                                        {
                                            this.props.registerSetting.TrueNameIsVisible?
                                                (
                                                    <div className="col-xs-12 col-md-12 input-marg">
                                                        <p className="col-xs-6 col-md-6"><i className="fa fa-star" aria-hidden="true"></i>真实姓名 </p>
                                                        <div className="col-xs-6 col-md-6">
                                                            <input ref="realname" type="text" placeholder="请输入姓名" className="input member-input"/>
                                                            <span className="ml5 red f12" hidden={this.state.noRealname} style={{"color":"red"}}>*此项不能为空</span>
                                                        </div>
                                                    </div>
                                                ):null
                                        }
                                        <div className="col-xs-12 col-md-12 input-marg">
                                            <p className="col-xs-6 col-md-6"><i className="fa fa-star" aria-hidden="true"></i>密码 </p>
                                            <div className="col-xs-6 col-md-6">
                                                <input ref="password" type="password" placeholder="6-12位由字母和数字组成" className="input member-input"/>
                                                <span className="ml5 red f12" hidden={this.state.noPassword} style={{"color":"red"}}>*此项不能为空</span>
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-md-12 input-marg">
                                            <p className="col-xs-6 col-md-6"><i className="fa fa-star" aria-hidden="true"></i>确认密码 </p>
                                            <div className="col-xs-6 col-md-6">
                                                <input ref="password2" type="password" placeholder="6-12位由字母和数字组成" className="input member-input"/>
                                                <span className="ml5 red f12" hidden={this.state.noPassword2} style={{"color":"red"}}>*此项不能为空</span>
                                                <span className="ml5 red f12" hidden={this.state.notMatchPswHid} style={{"color":"red"}}>*密码不相符</span>
                                            </div>
                                        </div>
                                        {
                                            this.props.remoteSysConfs.allow_edit_pay_pwd == "true" ?
                                                <div className="col-xs-12 col-md-12 input-marg">
                                                    <p className="col-xs-6 col-md-6"><i className="fa fa-star" aria-hidden="true"></i>取款密码 </p>
                                                    <div className="col-xs-6 col-md-6">
                                                        <input ref="payPassword" type="password" placeholder="6-12位由字母和数字组成" className="input member-input"/>
                                                        <span className="ml5 red f12" hidden={this.state.noPayPassword} style={{"color":"red"}}>*此项不能为空</span>
                                                    </div>
                                                </div> : null

                                        }
                                        {
                                            this.props.remoteSysConfs.allow_edit_pay_pwd == "true" ?
                                                <div className="col-xs-12 col-md-12 input-marg">
                                                    <p className="col-xs-6 col-md-6"><i className="fa fa-star" aria-hidden="true"></i>确认取款密码 </p>
                                                    <div className="col-xs-6 col-md-6">
                                                        <input ref="payPassword2" type="password" placeholder="6-12位由字母和数字组成" className="input member-input"/>
                                                        <span className="ml5 red f12" hidden={this.state.noPayPassword2} style={{"color":"red"}}>*此项不能为空</span>
                                                        <span className="ml5 red f12" hidden={this.state.notMatchPayPassword} style={{"color":"red"}}>*密码不相符</span>
                                                    </div>
                                                </div> : null

                                        }
                                        {
                                            this.props.registerSetting.PhoneIsVisible ?
                                                <div className="col-xs-12 col-md-12 input-marg">
                                                    <p className="col-xs-6 col-md-6">{this.props.registerSetting.PhoneIsRequire?<i className="fa fa-star" aria-hidden="true"></i>:""}手机</p>
                                                    <div className="col-xs-6 col-md-6">
                                                        <input ref="phone" type="number" placeholder="请输入您的常用手机" className="input member-input"/>
                                                        <span className="ml5 red f12" hidden={this.state.noPhone}
                                                              style={{"color": "red"}}>*此项不能为空,并且必须符合手机号码格式</span>
                                                    </div>
                                                </div> : null

                                        }
                                        {
                                            this.props.registerSetting.EmailIsVisible ?
                                                <div className="col-xs-12 col-md-12 input-marg">
                                                    <p className="col-xs-6 col-md-6">{this.props.registerSetting.EmailIsRequire?<i className="fa fa-star" aria-hidden="true"></i>:""}邮箱</p>
                                                    <div className="col-xs-6 col-md-6">
                                                        <input ref="email" type="text" placeholder="请输入您的常用邮箱"
                                                               className="input member-input"/>
                                                        <span className="ml5 red f12" hidden={this.state.noEmail}
                                                              style={{"color": "red"}}>*此项不能为空</span>
                                                    </div>
                                                </div> : null
                                        }
                                        {
                                            this.props.registerSetting.BirthdayIsVisible ?
                                                <div className="col-xs-12 col-md-12 input-marg">
                                                    <p className="col-xs-6 col-md-6">{this.props.registerSetting.BirthdayIsRequire?<i className="fa fa-star" aria-hidden="true"></i>:""}生日</p>
                                                    <div className="col-xs-6 col-md-6">
                                                        <MyDatePicker placeholder="请填写您的生日" ref="birthday" className="registerDatePick myDatePick" />
                                                        <span className="ml5 red f12" hidden={this.state.noBirthday}
                                                              style={{"color": "red"}}>*此项不能为空</span>
                                                    </div>
                                                </div> : null
                                        }
                                        {
                                            this.props.registerSetting.WechatIsVisible?
                                                <div className="col-xs-12 col-md-12 input-marg">
                                                    <p className="col-xs-6 col-md-6">{this.props.registerSetting.WechatIsRequire?<i className="fa fa-star" aria-hidden="true"></i>:""}微信</p>
                                                    <div className="col-xs-6 col-md-6">
                                                        <input ref="wechat" type="text" placeholder="请输入您的微信"
                                                               className="input member-input"/>
                                                        <span className="ml5 red f12" hidden={this.state.noWechat}
                                                              style={{"color": "red"}}>*此项不能为空</span>
                                                    </div>
                                                </div> : null
                                        }
                                        {
                                            this.props.registerSetting.QQIsVisible ?
                                                <div className="col-xs-12 col-md-12 input-marg">
                                                    <p className="col-xs-6 col-md-6">{this.props.registerSetting.QQIsRequire?<i className="fa fa-star" aria-hidden="true"></i>:""}QQ</p>
                                                    <div className="col-xs-6 col-md-6">
                                                        <input ref="qq" type="text" placeholder="请输入您的QQ"
                                                               className="input member-input"/>
                                                        <span className="ml5 red f12" hidden={this.state.noQQ}
                                                              style={{"color": "red"}}>*此项不能为空</span>
                                                    </div>
                                                </div> : null
                                        }

                                        <div className="col-xs-12 col-md-12 input-marg">
                                            <p className="col-xs-6 col-md-6" style={{marginTop:'13px'}}>验证码</p>
                                            <div className="col-xs-6 col-md-6">
                                                <input ref="verifycode" type="text"  className="input member-input" placeholder="请输入验证码"/>
                                                <VerifyCode getVerifyCode={this.getVerifyCode.bind(this)} />
                                                <br/>
                                                <span className="ml5 red f12" hidden={this.state.noVerifycode} style={{"color":"red"}}>*此项不能为空</span>
                                                <span className="ml5 red f12" hidden={this.state.errorVerifycode} style={{"color":"red"}}>*验证码不正确</span>
                                            </div>
                                        </div>
                                        {
                                            this.props.registerSetting.AgentExtendCodeIsVisible?
                                                (
                                                    <div className="col-xs-12 col-md-12 input-marg" style={{display: channel ? "none":"block"}}>
                                                        <p className="col-xs-6 col-md-6">推广码</p>
                                                        <div className="col-xs-6 col-md-6">
                                                            <input ref="channel" type="text" placeholder="请输入推广码(可不填写)" defaultValue={channel}
                                                                   className="input member-input"/>
                                                        </div>
                                                    </div>
                                                )
                                                :null
                                        }


                                        <div className="col-xs-12 col-md-12 input-marg daccept">
                                            <p className="reg-terms">
                                                <label>
                                                    <input type="checkbox" className="checkboxBg" id="dacceptService"
                                                           ref="acceptService" defaultChecked="defaultChecked"/> 确认已年满18岁，并已阅读和接受本<Link to="/Privacy">网站政策、隐私声明、</Link><Link to="/TermsConditions">条款和条件</Link>。</label>
                                            </p>
                                            <p className="reg-terms">
                                                <label>
                                                    <input type="checkbox" className="checkboxBg" id="disreceiveEmail"
                                                           ref="receiveEmail" defaultChecked="defaultChecked"/> 是的，我想收到{config.appName}的通讯</label>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12 col-md-12">
                                            <button type="Submit" className="htbtnlg w260 t20 btn-type">立即注册</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>

            </main>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
{
    apiResult:state.apiResult,
    registerSetting:state.registerSetting,
    remoteSysConfs:state.remoteSysConfs
}
);

export default connect(mapStateToProps, {})(RegisterPage);