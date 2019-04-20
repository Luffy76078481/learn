/**
 * Created by sobi on 2017/11/7.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import { Link, IndexLink,browserHistory } from 'react-router';
import * as cache from "../../../../../store/CacheHelper";
import MyDatePicker from '../../../../../global/Components/MyDatePicker/MyDatePicker_register'; // 日历
import "./RegisterPage.scss";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // 没错就是它，日历的罪魁祸首！

class RegisterPage extends Component {
    componentDidMount() {
        new window.actions.ApiRegisterSettingAction().fly();
        window.$("#root").attr("class", "usefulcss");
    }
    constructor (props){
        super();
        this.state = {
            noUsername: true,
            notMatchPswHid: true,
            noPassword: true,
            noPassword2: true,
            noPayPassword: true,
            noPayPassword2: true,
            notMatchPayPassword: true,
            noPhone: true,
            noVerifycode: true,
            noRealname: true,
            noEmail: true,
            noQQ: true,
            noBirthday:true,
            noWechat:true,
            UsernameExist: true,
            errorVerifycode:true // 验证码判断正误
        }
    }
    handleRegister(e) {
        e.preventDefault();
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
        // this.props.registerSettin 配合返回配置进行判断
        // 用户名判空
        if(!this.refs.username.value){
            this.setState({
                noUsername:false
            });
            checknom++;
        }
        // 真实姓名判空
        if(this.props.registerSetting.TrueNameIsRequire && !this.refs.realname.value){
            this.setState({
                noRealname:false
            });
            checknom++;
        }
        // 密码判空
        if(!this.refs.password.value){
            this.setState({
                noPassword:false
            });
            checknom++;
        }
        // 确认密码判空
        if(!this.refs.password2.value  ){
            this.setState({
                noPassword2:false
            });
            checknom++;
        }
        // 密码输出一致
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

        // 支付密码
        if(this.props.remoteSysConfs.allow_edit_pay_pwd == "true"){
            if (!payPassword) {
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
        // 手机
        if (this.props.registerSetting.PhoneIsRequire && !phone) {
            if (!this.refs.phone.value) {
                this.setState({
                    noPhone: false
                });
                checknom++;
            }
        }
        // eamil
        if (this.props.registerSetting.EmailIsVisible && !email) {
            if (!this.refs.email.value) {
                this.setState({
                    noEmail: false
                });
                checknom++;
            }
        }
        // q
        if (this.props.registerSetting.QQIsRequire && !qq) {
            if (!this.refs.qq.value) {
                this.setState({
                    noQQ: false
                });
                checknom++;
            }
        }
        // 生日
        if (this.props.registerSetting.BirthdayIsRequire && !birthday) {
            if (!this.refs.birthday.getValue()) {
                this.setState({
                    noBirthday:true,
                });
                checknom++;
            }
        }
        // wechat
        if (this.props.registerSetting.WechatIsRequire && !phone) {
            if (!this.refs.wechat.value) {
                this.setState({
                    noWechat:true,
                });
                checknom++;
            }
        }
        // 验证码前台判断正误
        if(this.refs.verifycode.value && this.refs.verifycode.value.toLocaleLowerCase() != this.state.VerifyCode.toLocaleLowerCase()){
            this.setState({
                errorVerifycode:false,
            });
            checknom++;
        }
        // 验证码未输入
        if(!this.refs.verifycode.value){
            this.setState({
                noVerifycode:false
            });
            checknom++;
        }
        if(checknom!=0){
            return;
        }
        let referer = cache.get("referer") || "";
        new window.actions.ApiRegisterAction (
            {
                UserName:this.refs.username.value,
                TrueName:this.refs.realname.value,
                Password:this.refs.password.value,
                Email:email,
                Phone:phone,
                QQ:qq,
                Birthday:birthday,
                Wechat:wechat,
                Referer:referer,
                WithdrawalPassword:payPassword,   
                ExtendCode:this.refs.channel?this.refs.channel.value:null,     
            }
        ).fly((respond)=>{
            if (respond.StatusCode === 0) {
                browserHistory.push("/");
            }else{
                window.swal("注册失败", respond.Message, "error");
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.apiResult !== this.props.apiResult) {
            if (nextProps.apiResult.method === "register") {
                this.reVerifyCode();
                if (nextProps.apiResult.response.status === 0) {
                    window.$("#reserveDialog_reservation").modal("hide");
                }
            }
        }
    }

    // 判断用户名重复
    inputBlur(e){
        var name = e.target.name;
        if(window.$.trim(e.target.value)==""){
            this.setState({
                ['no'+name]:false,
                UsernameExist:true
            });
        }else{
            this.setState({
                ['no'+name]:true
            });
        }
        if(name == "Username"){
            let _this=this;
            let val = e.target.value;
            if(val=="" || 6>val.length){
                return;
            }
            new window.actions.ApiCheckUserNameAction(val).fly(resp=>{
                if(resp.StatusCode==0){
                    if(resp.Registered){
                        _this.setState({
                            UsernameExist:false               
                        })
                    }else{
                        _this.setState({
                            UsernameExist:true,
                        })
                    }
                }
            });
        }
    }
    // 获取验证码
    getVerifyCode(VerifyCode){
        this.setState({
            VerifyCode:VerifyCode
        })
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
                    <div className="divc w1000" style={{paddingBottom: "20px",margin: "auto"}}>
                        <div className="ht-t ht-t-img">
                            <p className="cn">免费注册</p>
                        </div>
                        <div className="text-center">
                            <div className="content">
                                <form onSubmit={this.handleRegister.bind(this)}>
                                    <div className="row">
                                        <div className="col-xs-4 col-md-4">
                                            {/* 用户名 */}
                                            <div className="col-xs-12 col-md-12">
                                                <p className="col-xs-12 col-md-12 registitle">用户名 (*必填项)
                                                    <span className="ml5 red f12 regishint" hidden={this.state.noUsername} style={{"color":"red"}}>*此项不能为空</span>
                                                    <span className="ml5 red f12 regishint" hidden={this.state.UsernameExist} style={{"color":"red"}}>*用户名已存在，请重新输入</span>
                                                </p>
                                                <div className="col-xs-12 col-md-12">
                                                    <input ref="username" type="text" placeholder="6-12位由字母和数字组成" name="Username" className="input w238 member-input" onBlur={this.inputBlur.bind(this)}/>&nbsp;
                                                </div>
                                            </div>
                                            {/* 真实姓名 */}
                                            {this.props.registerSetting.TrueNameIsVisible?
                                            <div className="col-xs-12 col-md-12">
                                                <p className="col-xs-12 col-md-12 registitle">真实姓名{this.props.registerSetting.TrueNameIsRequire?"(*必填项)":""}
                                                    <span className="ml5 red f12 regishint" hidden={this.state.noRealname} style={{"color":"red"}}>*此项不能为空</span>
                                                </p>
                                                <div className="col-xs-12 col-md-12">
                                                    <input ref="realname" type="text" placeholder="请输入姓名" className="input w238 member-input"/>
                                                </div>
                                            </div>:null}
                                            {/* 登录密码 */}
                                            <div className="col-xs-12 col-md-12">
                                                <p className="col-xs-12 col-md-12 registitle">密码 (*必填项)
                                                    <span className="ml5 red f12 regishint" hidden={this.state.noPassword} style={{"color":"red"}}>*此项不能为空</span>
                                                </p>
                                                <div className="col-xs-12 col-md-12">
                                                    <input ref="password" type="password" placeholder="6-12位由字母和数字组成" className="input w238 member-input"/>&nbsp;
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-md-12">
                                                <p className="col-xs-12 col-md-12 registitle">确认密码 (*必填项)
                                                    <span className="ml5 red f12 regishint" hidden={this.state.noPassword2} style={{"color":"red"}}>*此项不能为空</span>
                                                    <span className="ml5 red f12 regishint" hidden={this.state.notMatchPswHid} style={{"color":"red"}}>*密码不相符</span>
                                                </p>
                                                <div className="col-xs-12 col-md-12">
                                                    <input ref="password2" type="password" placeholder="6-12位由字母和数字组成" className="input w238 member-input"/>&nbsp;
                                                </div>
                                            </div>
                                            {/* 取款密码 */}
                                            {this.props.remoteSysConfs.allow_edit_pay_pwd == "true" ?
                                                <div className="col-xs-12 col-md-12 input-marg">
                                                    <p className="col-xs-12 col-md-12 registitle">取款密码 (*必填项)
                                                        <span className="ml5 red f12 regishint" hidden={this.state.noPayPassword} style={{"color":"red"}}>*此项不能为空</span></p>
                                                    <div className="col-xs-12 col-md-12">
                                                        <input ref="payPassword" type="password" placeholder="6-12位由字母和数字组成" className="input w238 member-input"/>&nbsp;
                                                    </div>
                                                </div> : null
                                            }
                                            {/* 确认取款密码 */}
                                            {this.props.remoteSysConfs.allow_edit_pay_pwd == "true" ?
                                                <div className="col-xs-12 col-md-12 input-marg">
                                                    <p className="col-xs-12 col-md-12 registitle">确认取款密码 (*必填项)
                                                        <span className="ml5 red f12 regishint" hidden={this.state.noPayPassword2} style={{"color":"red"}}>*此项不能为空</span>
                                                        <span className="ml5 red f12 regishint" hidden={this.state.notMatchPayPassword} style={{"color":"red"}}>*密码不相符</span>
                                                    </p>
                                                    <div className="col-xs-12 col-md-12">
                                                        <input ref="payPassword2" type="password" placeholder="6-12位由字母和数字组成" className="input w238 member-input"/>&nbsp;
                                                    </div>
                                                </div> : null
                                            }
                                        </div>
                                        <div className="col-xs-4 col-md-4">
                                            {/* 常用手机 */}
                                            {this.props.registerSetting.PhoneIsVisible?
                                                <div className="col-xs-12 col-md-12 input-marg">
                                                    <p className="col-xs-12 col-md-12 registitle">手机 {this.props.registerSetting.PhoneIsRequire?"(*必填项)":""}</p>
                                                    <div className="col-xs-12 col-md-12">
                                                        <input ref="phone" type="text" maxLength="11" placeholder="请输入您的常用手机" className="input w238 member-input"/><br/>
                                                        <span className="ml5 red f12 regishint" hidden={this.state.noPhone} style={{"color": "red"}}>*此项不能为空,并且必须符合手机号码格式</span>
                                                    </div>
                                                </div> : null
                                            }
                                            {/* 常用邮箱 */}
                                            {this.props.registerSetting.EmailIsVisible?
                                                <div className="col-xs-12 col-md-12 input-marg">
                                                    <p className="col-xs-12 col-md-12 registitle">邮箱 {this.props.registerSetting.EmailIsRequire?"(*必填项)":""}</p>
                                                    <div className="col-xs-12 col-md-12">
                                                        <input ref="email" type="text" placeholder="请输入您的常用邮箱"
                                                               className="input w238 member-input"/><br/>
                                                        <span className="ml5 red f12" hidden={this.state.noEmail}
                                                              style={{"color": "red"}}>*此项不能为空</span>
                                                    </div>
                                                </div> : null
                                            }
                                            {/* 生日 */}
                                            {this.props.registerSetting.BirthdayIsVisible?
                                                <div className="col-xs-12 col-md-12 input-marg" >
                                                    <p className="col-xs-12 col-md-12 registitle">生日 {this.props.registerSetting.BirthdayIsRequire?"(*必填项)":""}</p>
                                                    <div className="col-xs-12 col-md-12" style={{height: '50px'}}>
                                                    {/* 日历插件 */}
                                                    <MuiThemeProvider>
                                                        <MyDatePicker ref="birthday" className="registerDatePick"></MyDatePicker>
                                                    </MuiThemeProvider>                                                   
                                                        <br/>
                                                        <span className="ml5 red f12" hidden={this.state.noBirthday}
                                                              style={{"color": "red"}}>*此项不能为空</span>
                                                    </div>
                                                </div> : null
                                            }
                                            {/* 微信 */}
                                            {this.props.registerSetting.WechatIsVisible?
                                                <div className="col-xs-12 col-md-12 input-marg">
                                                    <p className="col-xs-12 col-md-12 registitle">微信 {this.props.registerSetting.WechatIsRequire?"(*必填项)":""}</p>
                                                    <div className="col-xs-12 col-md-12">
                                                        <input ref="wechat" type="text" placeholder="请输入您的微信"
                                                               className="input w238 member-input"/><br/>
                                                        <span className="ml5 red f12" hidden={this.state.noWechat}
                                                              style={{"color": "red"}}>*此项不能为空</span>
                                                    </div>
                                                </div> : null
                                            }
                                            {/* QQ */}
                                            {this.props.registerSetting.QQIsVisible?
                                                <div className="col-xs-12 col-md-12 input-marg">
                                                    <p className="col-xs-12 col-md-12 registitle">QQ {this.props.registerSetting.QQIsRequire?"(*必填项)":""}</p>
                                                    <div className="col-xs-12 col-md-12">
                                                        <input ref="qq" type="text" placeholder="请输入您的QQ"
                                                               className="input w238 member-input"/><br/>
                                                        <span className="ml5 red f12" hidden={this.state.noQQ}
                                                              style={{"color": "red"}}>*此项不能为空</span>
                                                    </div>
                                                </div> : null
                                            }
                                        </div>
                                        <div className="col-xs-4 col-md-4">
                                            <div className="col-xs-12 col-md-12 input-marg">
                                                <p className="col-xs-12 col-md-12 registitle">验证码</p>
                                                <div className="col-xs-12 col-md-12">
                                                    <input ref="verifycode" type="text"  className="input w238 member-input" placeholder="请输入验证码"/>
                                                    <VerifyCode getVerifyCode={this.getVerifyCode.bind(this)} />
                                                    <span className="ml5 red f12" hidden={this.state.noVerifycode} style={{"color":"red"}}>*此项不能为空</span>
                                                    <span className="ml5 red f12" hidden={this.state.errorVerifycode} style={{"color":"red"}}>*验证码不正确</span>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-md-12 input-marg" style={{display: channel ? "none":"block"}}>
                                                <p className="col-xs-12 col-md-12 registitle">推广码</p>
                                                <div className="col-xs-12 col-md-12">
                                                    <input ref="channel" type="text" placeholder="请输入推广码(可不填写)" defaultValue={channel} className="input w238 member-input"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="regisfoot">
                                            <div className="footleft">
                                                <label className="labup">
                                                    <input type="checkbox" className="checkboxBg" id="dacceptService" ref="acceptService" defaultChecked="defaultChecked"/>&nbsp;我已年满18岁并同意 规则和条款。
                                                </label>
                                                {this.props.registerSetting.IsReceiveEmailIsVisible?
                                                    <label className="labdwn">
                                                        <input type="checkbox" className="checkboxBg" id="disreceiveEmail" ref="receiveEmail" defaultChecked="defaultChecked"/>&nbsp;是的，我想收到{config.appName}的最新活动和优惠信息
                                                    </label>                                                    
                                                :null}

                                            </div>
                                            <div className="footright">
                                                <button type="Submit" className="htbtnlg w260 t20 btn-type">立即注册</button>
                                            </div>
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
        register:state.register,
        verifycode:state.verifycode,
        apiResult:state.apiResult,
        registerSetting:state.registerSetting,
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps, {})(RegisterPage);