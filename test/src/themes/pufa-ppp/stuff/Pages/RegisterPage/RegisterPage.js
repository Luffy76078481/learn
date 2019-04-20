/**
 * ppp-注册
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import MyDatePicker from '../../../../../global/Components/MyDatePicker/MyDatePicker_register'; // 日历
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // 没错就是它，日历的罪魁祸首！
import * as cache from "../../../../../store/CacheHelper";
import "./RegisterPage.scss";

class RegisterPage extends Component {
    componentDidMount() {
        new window.actions.ApiRegisterSettingAction().fly();// 控制显示隐藏
        window.$("#root").attr("class", "usefulcss");
    }
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
            noRealname: true,
            noEmail: true,
            noBirthday:true,
            noWechat:true,
            UsernameExist:true,
            noQQ: true,
            errorVerifycode:true
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
            noRealname: true,
            noEmail: true,
            noBirthday:true,
            UsernameExist:true,
            noWechat:true,
            noQQ: true,
            errorVerifycode:true
        });
        var checknom = 0;
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
        //let referer = cache.get("referer") || "";
        let referer = sessionStorage.getItem("channel") || "";
        new window.actions.ApiRegisterAction (
            {
                UserName:this.refs.username.value,
                TrueName:this.refs.realname?this.refs.realname.value:"",
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
            } else {
                window.swal("注册失败", respond.Message, "error");
            }
        });
    }
    getVerifyCode(VerifyCode){
        this.setState({
            VerifyCode:VerifyCode
        })
    }
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

    openRule(){
        window.open('/pact.html','pact' ,'width=900,height=600, location=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250')
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
                    <div className="divc w1000" style={{paddingBottom: "20px"}}>
                        <div className="ht-t ht-t-img">
                            <p className="cn"></p>
                        </div>
                        <div className="text-center">
                            <div className="content">
                                <form onSubmit={this.handleRegister.bind(this)}>
                                    <div className="row">
                                        {/* 用户名 */}
                                        <div className="col-xs-12 col-md-12">
                                            <p className="col-xs-6 col-md-6"><i className="fa fa-star" aria-hidden="true"></i>用户名</p>
                                            <div className="col-xs-6 col-md-6">
                                                <input ref="username" type="text" placeholder="6-12位由字母和数字组成" name="Username" className="input w238 member-input" onBlur={this.inputBlur.bind(this)}/>
                                                <span className="ml5 red f12" hidden={this.state.noUsername} style={{"color":"red"}}>*此项不能为空</span>
                                                <span className="ml5 red f12" hidden={this.state.UsernameExist} style={{"color":"red"}}>用户名已存在</span>
                                            </div>
                                        </div>
                                        {/* 真实姓名 */}
                                        { this.props.registerSetting.TrueNameIsVisible?
                                        <div className="col-xs-12 col-md-12 input-marg">
                                            <p className="col-xs-6 col-md-6"><i className="fa fa-star" aria-hidden="true"></i>真实姓名 </p>
                                            <div className="col-xs-6 col-md-6">
                                                <input ref="realname" type="text" placeholder="请输入姓名" className="input w238 member-input"/>
                                                <span className="ml5 red f12" hidden={this.state.noRealname} style={{"color":"red"}}>*此项不能为空</span>
                                            </div>
                                        </div>:null}
                                        {/* 密码 */}
                                        <div className="col-xs-12 col-md-12 input-marg">
                                            <p className="col-xs-6 col-md-6"><i className="fa fa-star" aria-hidden="true"></i>密码 </p>
                                            <div className="col-xs-6 col-md-6">
                                                <input ref="password" type="password" placeholder="6-12位由字母和数字组成" className="input w238 member-input"/>&nbsp;
                                                <span className="ml5 red f12" hidden={this.state.noPassword} style={{"color":"red"}}>*此项不能为空</span>
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-md-12 input-marg">
                                            <p className="col-xs-6 col-md-6"><i className="fa fa-star" aria-hidden="true"></i>确认密码 </p>
                                            <div className="col-xs-6 col-md-6">
                                                <input ref="password2" type="password" placeholder="6-12位由字母和数字组成" className="input w238 member-input"/>&nbsp;
                                                <span className="ml5 red f12" hidden={this.state.noPassword2} style={{"color":"red"}}>*此项不能为空</span>
                                                <span className="ml5 red f12" hidden={this.state.notMatchPswHid} style={{"color":"red"}}>*密码不相符</span>
                                            </div>
                                        </div>
                                        {/* 取款密码 */}
                                        {this.props.remoteSysConfs.allow_edit_pay_pwd == "true" ?
                                        <div className="col-xs-12 col-md-12 input-marg">
                                            <p className="col-xs-6 col-md-6"><i className="fa fa-star" aria-hidden="true"></i>取款密码 </p>
                                            <div className="col-xs-6 col-md-6">
                                                <input ref="payPassword" type="password" placeholder="6-12位由字母和数字组成" className="input w238 member-input"/>&nbsp;
                                                <span className="ml5 red f12" hidden={this.state.noPayPassword} style={{"color":"red"}}>*此项不能为空</span>
                                            </div>
                                        </div> : null}
                                        {/* 确认取款密码 */}
                                        {this.props.remoteSysConfs.allow_edit_pay_pwd == "true" ?
                                        <div className="col-xs-12 col-md-12 input-marg">
                                            <p className="col-xs-6 col-md-6"><i className="fa fa-star" aria-hidden="true"></i>确认取款密码 </p>
                                            <div className="col-xs-6 col-md-6">
                                                <input ref="payPassword2" type="password" placeholder="6-12位由字母和数字组成" className="input w238 member-input"/>&nbsp;
                                                <span className="ml5 red f12" hidden={this.state.noPayPassword2} style={{"color":"red"}}>*此项不能为空</span>
                                                <span className="ml5 red f12" hidden={this.state.notMatchPayPassword} style={{"color":"red"}}>*密码不相符</span>
                                            </div>
                                        </div> : null}
                                        {/* 常用手机 */}
                                        {this.props.registerSetting.PhoneIsVisible?
                                        <div className="col-xs-12 col-md-12 input-marg">
                                            <p className="col-xs-6 col-md-6">{this.props.registerSetting.PhoneIsRequire?<i className="fa fa-star" aria-hidden="true"></i>:""}手机</p>
                                            <div className="col-xs-6 col-md-6">
                                                <input ref="phone" type="text" max="10" placeholder="请输入您的常用手机" className="input w238 member-input"/><br/>
                                                <span className="ml5 red f12" hidden={this.state.noPhone}
                                                        style={{"color": "red"}}>*此项不能为空,并且必须符合手机号码格式</span>
                                            </div>
                                        </div>:null}
                                        {/* 常用邮箱 */}    
                                        {this.props.registerSetting.EmailIsVisible?
                                        <div className="col-xs-12 col-md-12 input-marg">
                                            <p className="col-xs-6 col-md-6">{this.props.registerSetting.EmailIsRequire?<i className="fa fa-star" aria-hidden="true"></i>:""}邮箱</p>
                                            <div className="col-xs-6 col-md-6">
                                                <input ref="email" type="text" placeholder="请输入您的常用邮箱"
                                                        className="input w238 member-input"/><br/>
                                                <span className="ml5 red f12" hidden={this.state.noEmail}
                                                        style={{"color": "red"}}>*此项不能为空</span>
                                            </div>
                                        </div> : null}
                                        {/* 生日 */}                        
                                        {this.props.registerSetting.BirthdayIsVisible?
                                        <div className="col-xs-12 col-md-12 input-marg">
                                            <p className="col-xs-6 col-md-6">{this.props.registerSetting.BirthdayIsRequire?<i className="fa fa-star" aria-hidden="true"></i>:""}生日</p>
                                            <div className="col-xs-6 col-md-6">
                                            {/* 日历插件 */}
                                            <MuiThemeProvider>
                                                <MyDatePicker ref="birthday" className="registerDatePick"></MyDatePicker>
                                            </MuiThemeProvider> 
                                                <span className="ml5 red f12" hidden={this.state.noBirthday}
                                                        style={{"color": "red"}}>*此项不能为空</span>
                                            </div>
                                        </div> : null}
                                        {/* 微信 */}
                                        {this.props.registerSetting.WechatIsVisible?
                                        <div className="col-xs-12 col-md-12 input-marg">
                                            <p className="col-xs-6 col-md-6">{this.props.registerSetting.WechatIsRequire ?<i className="fa fa-star" aria-hidden="true"></i>:""}微信</p>
                                            <div className="col-xs-6 col-md-6">
                                                <input ref="wechat" type="text" placeholder="请输入您的微信"
                                                        className="input w238 member-input"/><br/>
                                                <span className="ml5 red f12" hidden={this.state.noWechat}
                                                        style={{"color": "red"}}>*此项不能为空</span>
                                            </div>
                                        </div> : null}
                                        {/* QQ */}
                                        {this.props.registerSetting.QQIsVisible?
                                        <div className="col-xs-12 col-md-12 input-marg">
                                            <p className="col-xs-6 col-md-6">{this.props.registerSetting.qq === "REQUIRED"?<i className="fa fa-star" aria-hidden="true"></i>:""}QQ</p>
                                            <div className="col-xs-6 col-md-6">
                                                <input ref="qq" type="text" placeholder="请输入您的QQ"
                                                        className="input w238 member-input"/><br/>
                                                <span className="ml5 red f12" hidden={this.state.noQQ}
                                                        style={{"color": "red"}}>*此项不能为空</span>
                                            </div>
                                        </div> : null }
                                        {/* 验证码 */}
                                        <div className="col-xs-12 col-md-12 input-marg">
                                            <p className="col-xs-6 col-md-6">验证码</p>
                                            <div className="col-xs-6 col-md-6">
                                                <input ref="verifycode" type="text"  className="input w238 member-input" placeholder="请输入验证码"/>
                                                <VerifyCode getVerifyCode={this.getVerifyCode.bind(this)} />
                                                <span className="ml5 red f12" hidden={this.state.noVerifycode} style={{"color":"red"}}>*此项不能为空</span>
                                                <span className="ml5 red f12" hidden={this.state.errorVerifycode} style={{"color":"red"}}>*验证码错误</span>
                                            </div>
                                        </div>
                                         {/* 推广码 */}
                                        {this.props.registerSetting.AgentExtendCodeIsVisible?
                                        <div className="col-xs-12 col-md-12 input-marg" style={{display: channel ? "none":"block"}}>
                                            <p className="col-xs-6 col-md-6">推广码</p>
                                            <div className="col-xs-6 col-md-6">
                                                <input ref="channel" type="text" placeholder="请输入推广码(可不填写)" defaultValue={channel} className="input w238 member-input"/>
                                            </div>
                                        </div>: null}
                        
                                        <div className="col-xs-12 col-md-12 input-marg daccept">
                                            <p className="reg-terms">
                                                <label>
                                                <input type="checkbox" className="checkboxBg" id="dacceptService"
                                                       ref="acceptService" defaultChecked="defaultChecked"/>&nbsp;确认已年满18岁，并已阅读和接受本网站政策、隐私声明、
                                                       <a onClick={this.openRule.bind(this)}></a>条款和条件。</label>
                                            </p>
                                            <p className="reg-terms">
                                                <label>
                                                <input type="checkbox" className="checkboxBg" id="disreceiveEmail"
                                                       ref="receiveEmail" defaultChecked="defaultChecked"/>&nbsp;是的，我想收到{config.appName}的通讯</label>
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
        register:state.register,
        verifycode:state.verifycode,
        apiResult:state.apiResult,
        registerSetting:state.registerSetting,
        remoteSysConfs:state.remoteSysConfs
    }
);

    export default connect(mapStateToProps, {})(RegisterPage);