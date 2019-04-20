/**
 * Created by sobi on 2017/12/6.
 */
/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import { Link, IndexLink,browserHistory } from 'react-router';
import MyDatePicker from '../../../global/Components/MyDatePicker/MyDatePicker_records';
import * as cache from "../../../store/CacheHelper";
import "./RegisterPage.scss";

class RegisterPage extends Component {
    componentDidMount() {
        new window.actions.ApiRegisterSettingAction().fly();
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
            noQQ: true,
            noBirthday:true,
            noWechat:true,
            UsernameExist: true,
            noUsernameMessage:"*此项不能为空"
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
            noQQ: true,
            noBirthday:true,
            noWechat:true,
            UsernameExist: true
        });

        var checknom = 0;

        if(!this.refs.username.value){
            this.setState({
                noUsername:false
            });
            checknom++;
        }
        if(this.props.registerSetting.TrueNameIsRequire && !this.refs.realname.value ){
            this.setState({
                noRealname:false
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
        if(this.refs.verifycode.value && this.refs.verifycode.value.toLocaleLowerCase() != this.state.VerifyCode.toLocaleLowerCase()){
            this.setState({
                errorVerifycode:false,
            });1
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
        if (this.props.registerSetting.PhoneIsRequire) {
            if (!this.refs.phone.value) {
                this.setState({
                    noPhone: false
                });
                checknom++;
            }
        }
        // if (this.props.registerSetting.EmailIsRequire) {
        //     if (!this.refs.email.value) {
        //         this.setState({
        //             noEmail: false
        //         });
        //         checknom++;
        //     }
        // }
        // if (this.props.registerSetting.QQIsRequire) {
        //     if (!this.refs.qq.value) {
        //         this.setState({
        //             noQQ: false
        //         });
        //         checknom++;
        //     }
        // }
        // if (this.props.registerSetting.BirthdayIsRequire) {
        //     if (!this.refs.birthday.getValue()) {
        //         this.setState({
        //             noBirthday:true,
        //         });
        //         checknom++;
        //     }
        // }
        // if (this.props.registerSetting.WechatIsRequire) {
        //     if (!this.refs.wechat.value) {
        //         this.setState({
        //             noWechat:true,
        //         });
        //         checknom++;
        //     }
        // }
        if(!this.refs.verifycode.value){
            this.setState({
                noVerifycode:false
            });
            checknom++;
        }
        if(this.refs.verifycode.value && this.refs.verifycode.value.toLocaleLowerCase() != this.state.VerifyCode.toLocaleLowerCase()){
            this.setState({
                noVerifycode:false
            });
            checknom++;
        }
        if(checknom!=0){
            return;
        }
        let referer = sessionStorage.getItem("channel") || "";// 推广码
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
                ExtendCode:this.refs.channel.value,//可以不传
            }
        ).fly((respond)=>{
            if (respond.StatusCode === 0) {
                browserHistory.push("/deposit");
            } else {
                window.swal("注册失败", respond.Message, "error");
            }


        });
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

    getVerifyCode(VerifyCode){//獲取驗證碼
        this.setState({
            VerifyCode:VerifyCode
        })
    }
    openRule(){
        if(window.config.spec =="ybb"){
            window.open('/ybb_pact.html','pact' ,'width=900,height=600, location=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250')
        }
        if(window.config.spec =="hg"){
            window.open('/hg_pact.html','pact' ,'width=900,height=600, location=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250')
        }
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
                        noUsernameMessage:"您填写的账号已经被注册,请您更换一个！"
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
    inputBlur(e){
        let val = e.target.value;
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(val)) {
            this.setState({
                noPhone: false
            });
            return;
        }else{
            this.setState({
                noPhone: true
            });
        }

    }

    render() {
        const config = window.config;
        let storeChannel = "";
        if(window.sessionStorage){
            storeChannel = sessionStorage.getItem("channel");
        }
        const channel = storeChannel || window.channel || "";
        const ImageGallery = window.r.get("ImageGallery");
        const RegisterPage = window.r.props("RegisterPage");
        const options = window.r.props("ImageGallery");
        const options2 = window.r.props("RegisterPage");
        const btnText = options2.btnText;
        const SideNav = window.r.get("SideNav");
        const height = options.RegisterHeight || options.height || "170px";
        const VerifyCode = window.r.get("VerifyCode");
        return (
            <main className="Bgmember-main" id="RegisterNewPage">
                {!RegisterPage.banner?null:
                    <ImageGallery width="100%" height={height} type="register_banner_imgs" imgtype='banner'></ImageGallery>
                }
                <div className="tm">
                    <div className="divc w1000" style={{paddingBottom: "20px"}}>
                        <div className="ht-t ht-t-img">
                            <p className="cn">免费注册</p>
                        </div>
                        <div className="upnav"></div>
                        <div className="leftnave">
                            {!options2.sideNav?null
                                :<SideNav/>
                            }
                            <ul className="items">
                                <a href="/agent.html?tab=AboutUs"  target="_blank"><li>关于我們</li></a>
                                <a href="/agent.html?tab=ContactUs" target="_blank"><li>联络我們</li></a>
                                <a href="/agent.html?tab=Faq" target="_blank"><li>常见问题</li></a>
                                <a href="/agent.html?tab=BetRule" target="_blank"><li>责任博彩</li></a>
                            </ul>
                        </div>
                        <div className="text-center">
                   
                                <div className="content">
                                    <form onSubmit={this.handleRegister.bind(this)}>
                                        <div className="regisdata">
                                            <div className="inputBox">
                                                <p className="inputinbox"><i className="fa fa-star" aria-hidden="true"></i>用户名</p>
                                                <div className="inputinbox">
                                                    <input ref="username" type="text" placeholder="6-12位由字母和数字组成" onBlur={this.checkUserName.bind(this)} className="input w238 member-input"/>&nbsp;
                                                    <span className="ml5 red f12" hidden={this.state.noUsername} style={{"color":"red"}}>{this.state.noUsernameMessage}</span>
                                                </div>
                                            </div>
                                            <div style={{"display":this.props.registerSetting.TrueNameIsVisible?"block":"none"}} className="inputBox realName input-marg">
                                                <p className="inputinbox"><i className="fa fa-star" aria-hidden="true"></i>真实姓名 </p>
                                                <div className="inputinbox">
                                                    <input ref="realname" type="text" placeholder="请输入姓名" className="input w238 member-input"/>
                                                    <span className="ml5 red f12" hidden={this.state.noRealname} style={{"color":"red"}}>*此项不能为空</span>
                                                </div>
                                            </div>
                                            
                                            {
                                                this.props.registerSetting.PhoneIsVisible?
                                                <div className="inputBox">
                                                    <p className="inputinbox"><i className="fa fa-star" aria-hidden="true"></i>手机 </p>
                                                    <div className="inputinbox">
                                                        <input onBlur={this.inputBlur.bind(this)} ref="phone" type="text" max="10" placeholder="请输入您的常用手机" className="input w238 member-input"/><br/>
                                                        <span className="ml5 red f12" hidden={this.state.noPhone}
                                                              style={{"color": "red"}}>*此项不能为空,并且必须符合手机号码格式</span>
                                                    </div>
                                                </div> : null
                                            }
                                            <div className="inputBox input-marg">
                                                <p className="inputinbox"><i className="fa fa-star" aria-hidden="true"></i>密码 </p>
                                                <div className="inputinbox">
                                                    <input ref="password" type="password" placeholder="6-12位由字母和数字组成" className="input w238 member-input"/>&nbsp;
                                                    <span className="ml5 red f12" hidden={this.state.noPassword} style={{"color":"red"}}>*此项不能为空</span>
                                                </div>
                                            </div>
                                            <div className="inputBox input-marg">
                                                <p className="inputinbox"><i className="fa fa-star" aria-hidden="true"></i>确认密码 </p>
                                                <div className="inputinbox">
                                                    <input ref="password2" type="password" placeholder="6-12位由字母和数字组成" className="input w238 member-input"/>&nbsp;
                                                    <span className="ml5 red f12" hidden={this.state.noPassword2} style={{"color":"red"}}>*此项不能为空</span>
                                                    <span className="ml5 red f12" hidden={this.state.notMatchPswHid} style={{"color":"red"}}>*密码不相符</span>
                                                </div>
                                            </div>
                                            
                                            {
                                                this.props.remoteSysConfs.allow_edit_pay_pwd == "true" ?
                                                    <div className="inputBox payPsw input-marg">
                                                        <p className="inputinbox"><i className="fa fa-star" aria-hidden="true"></i>取款密码 </p>
                                                        <div className="inputinbox">
                                                            <input ref="payPassword" type="password" placeholder="6-12位由字母和数字组成" className="input w238 member-input"/>&nbsp;
                                                            <span className="ml5 red f12" hidden={this.state.noPayPassword} style={{"color":"red"}}>*此项不能为空</span>
                                                        </div>
                                                    </div> : null

                                            }
                                            {
                                                this.props.remoteSysConfs.allow_edit_pay_pwd == "true" ?
                                                    <div className="inputBox payPsw2 input-marg">
                                                        <p className="inputinbox"><i className="fa fa-star" aria-hidden="true"></i>确认取款密码 </p>
                                                        <div className="inputinbox">
                                                            <input ref="payPassword2" type="password" placeholder="6-12位由字母和数字组成" className="input w238 member-input"/>&nbsp;
                                                            <span className="ml5 red f12" hidden={this.state.noPayPassword2} style={{"color":"red"}}>*此项不能为空</span>
                                                            <span className="ml5 red f12" hidden={this.state.notMatchPayPassword} style={{"color":"red"}}>*密码不相符</span>
                                                        </div>
                                                    </div> : null

                                            }

                                        </div>
                                        
                                            <div className="inputBox code-img input-marg">
                                                <p className="inputinbox">验证码</p>
                                                <div className="inputinbox">
                                                    <input ref="verifycode" type="text"  className="input w238 member-input" placeholder="请输入验证码"/>
                                                    <br/>
                                                    <VerifyCode getVerifyCode={this.getVerifyCode.bind(this)} />
                                                    {/* <img  onClick={this.reVerifyCode} src={this.props.verifycode.img} alt="" style={{marginLeft:"20px"}}/>&nbsp;1 */}
                                                    <span className="ml5 red f12 spec-yzm" hidden={this.state.noVerifycode} style={{"color":"red"}}>*验证码错误</span>
                                                    <p className="wxts">贴心提醒：看不清？点击图片更换</p>
                                                </div>
                                            </div>
                                            <div className="inputBox channel　input-marg" style={{display: channel? "none":"block"}}>
                                                <p className="inputinbox">推广码</p>
                                                <div className="inputinbox">
                                                    <input ref="channel" type="text" placeholder="请输入推广码(可不填写)" defaultValue={channel}
                                                           className="input w238 member-input"/>
                                                </div>

                                            </div>
                                        <div className="inputBox input-marg daccept">
                                            <p className="reg-terms">
                                                <label>
                                                    <input type="checkbox" className="checkboxBg" id="dacceptService"
                                                           ref="acceptService" defaultChecked="defaultChecked"/>&nbsp;确认已年满18岁，并已阅读和接受本网站政策、隐私声明、
                                                    <a onClick={this.openRule.bind(this)}>条款和条件。</a>
                                                </label>
                                            </p>
                                            <p style={{"display":this.props.registerSetting.IsReceiveEmailIsRequire?"block":"none"}} className="reg-terms">
                                                <label>
                                                    <input type="checkbox" className="checkboxBg" id="disreceiveEmail"
                                                           ref="receiveEmail" defaultChecked="defaultChecked"/>&nbsp;是的，我想收到{config.appName}的通讯</label>
                                            </p>
                                        </div>
                                        <div className="inputBox submitbox">
                                            <button type="Submit" className="htbtnlg w260 btn-type">{btnText}</button>
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