/**
 * Created by sobi on 2017/11/7.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import { Link, IndexLink,browserHistory } from 'react-router';
import * as cache from "../../../store/CacheHelper";
import MyDatePicker from '../../../global/Components/MyDatePicker/MyDatePicker_register';
import "./css/RegisterPage.scss";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; //就是它

class RegisterPage extends Component {
    componentDidMount() {
        // this.reVerifyCode();
        new window.actions.ApiRegisterSettingAction().fly();
        window.$("#root").attr("class", "usefulcss");
    }
    constructor (props){
        super();
        this.state = {
            VerifyCode:"",
            noUsername: null,
            notMatchPswHid: null,
            noPassword: null,
            noPassword2: null,
            noPayPassword: null,
            noPayPassword2: null,
            notMatchPayPassword: null,
            noPhone: null,
            noVerifycode: true,
            noRealname: null,
            noEmail: null,
            noQQ: null,
            noBirthday:null,
            noWechat:null,
            UsernameExist: true,
            wrongName:false
        }
    }

    
    getVerifyCode(VerifyCode){//獲取驗證碼
        this.setState({
            VerifyCode:VerifyCode
        })
    }
    handleRegister(e) {
        e.preventDefault();
        // debugger;
        // this.setState({
        //     noUsername: true,
        //     notMatchPswHid: true,
        //     noPassword: true,
        //     noPassword2: true,
        //     noPayPassword: true,
        //     noPayPassword2: true,
        //     notMatchPayPassword: true,
        //     noPhone: true,
        //     noVerifycode: true,
        //     noRealname: true,
        //     noEmail: true,
        //     noQQ: true,
        //     noBirthday:true,
        //     noWechat:true,
        //     UsernameExist: true
        // });

        var checknom = 0;

        if(!this.refs.username.value){
            this.setState({
                noUsername:false
            });
            checknom++;
        }
        if(!this.refs.realname.value){
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
        if(!this.refs.email.value){
            this.setState({
                noEmail:false
            });
            checknom++;
        }
        if(!this.refs.phone.value){
            this.setState({
                noPhone:false
            });
            checknom++;
        }

        if(!this.refs.birthday.getValue()){
            this.setState({
                noBirthday:false
            });
            checknom++;
        }
        if(!this.refs.verifycode.value){
            this.setState({
                noVerifycode:false
            });
            checknom++;
        }
        var phone = this.refs.phone && this.refs.phone.value;
        var email = this.refs.email && this.refs.email.value;
        var birthday = this.refs.birthday && this.refs.birthday.getValue();
        if(checknom!=0){
            return;
        }
        let referer = cache.get("referer") || "";
        new window.actions.ApiRegisterAction (this.refs.username.value, this.refs.realname.value ,this.refs.password.value, email, phone, "",
            this.refs.verifycode.value,"","",birthday,"",referer).fly((respond)=>{

            if (respond.StatusCode === 0) {
                browserHistory.push("/deposit");
            } else {
                window.swal("注册失败", respond.Message, "error");
            }/*else if (respond.status === -2){
             this.setState({
             UsernameExist:　false
             });
             }*/


        });
    }

    // reVerifyCode(e) {
    //     new window.actions.ApiVerifyCodeAction().fly();
    // }

    componentWillReceiveProps(nextProps) {
        if (nextProps.apiResult !== this.props.apiResult) {
            if (nextProps.apiResult.method === "register") {
                // this.reVerifyCode();
                if (nextProps.apiResult.response.status === 0) {
                    window.$("#reserveDialog_reservation").modal("hide");
                }
            }
        }
    }
    inputFocus(e){
        var name = e.target.name;
        var thisDom = window.$(e.target);
        thisDom.parent().addClass('showAnnotation');
    }
    inputBlur(e){
        var name = e.target.name;
        var thisDom = window.$(e.target);

        if(window.$.trim(e.target.value)==""){
            thisDom.parent().removeClass('showAnnotation');
            this.setState({
                ['no'+name]:false
            });
        }else{
            thisDom.parent().removeClass('showAnnotation');
            this.setState({
                ['no'+name]:true
            });
        }
    }
    inputNameBlur(e){
        var name = e.target.name;
        var thisDom = window.$(e.target);
        if(window.$.trim(e.target.value)==""){
            thisDom.parent().removeClass('showAnnotation');
            this.setState({
                ['no'+name]:false,
                wrongName:false
            });
        }else if(this.isChn(e.target.value)){
            thisDom.parent().removeClass('showAnnotation');
            this.setState({
                ['no'+name]:false,
                wrongName:true
            });
        }else{
            thisDom.parent().removeClass('showAnnotation');
            this.setState({
                ['no'+name]:true,
                wrongName:false
            });
        }
    }

    isChn(str){
        var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
        if(reg.test(str)){
            return false;
        }else{
            return true;
        }
        
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
                            <p className="cn">免费注册</p>
                        </div>
                        <div className="text-center">
                            <div className="content">
                                <nav className="reg-steps">
                                    <ul>
                                        <li className="register"><div className="active first-child">注册</div></li>
                                        <li className="deposit"><div className=" last-child">存款</div></li>
                                    </ul>
                                </nav>
                                <div className="form-wrapper">
                                    <form onSubmit={this.handleRegister.bind(this)} className="registration-form ">
                                            <div className={"form-item " +(this.state.noUsername == null?"":this.state.noUsername?"has-success":"has-error")}>
                                                <label className="form-label">
                                                    <span className="form-label-text">用户名</span>
                                                    <span className="required-field">*</span>
                                                </label>
                                                <div className="form-field">
                                                    <input ref="username" name="Username" autoComplete="new-password" type="text" placeholder="6-12位由字母和数字组成" onBlur={this.inputBlur.bind(this)} />
                                                    <span className="icon-validation"></span>
                                                    <span className="form-help-block tag-color-apple-red" hidden={this.state.noUsername}>
                                                        请确保您的用户名独一无二。在所有产品中您都将使用这个用户名。本栏中您只能填写6-12个数字或字母。</span>
                                                </div>
                                            </div>
                                        <div className={"form-item " +(this.state.noPassword == null?"":this.state.noPassword?"has-success":"has-error")}>
                                            <label className="form-label">
                                                <span className="form-label-text">密码</span>
                                                <span className="required-field">*</span>
                                            </label>
                                            <div className="form-field">
                                                <input ref="password" name="Password" type="password" placeholder="6-12位由字母和数字组成"  onBlur={this.inputBlur.bind(this)} />
                                                <span className="icon-validation"></span>
                                                <span className="form-help-block tag-color-apple-red" hidden={this.state.noPassword}>
                                                        请输入密码。</span>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className={"form-item " +(this.state.noEmail == null?"":this.state.noEmail?"has-success":"has-error")}>
                                            <label className="form-label">
                                                <span className="form-label-text">电子邮箱地址</span>
                                                <span className="required-field">*</span>
                                            </label>
                                            <div className="form-field">
                                                <input ref="email" name="Email" type="text" placeholder="邮箱地址"  onFocus={this.inputFocus.bind(this)} onBlur={this.inputBlur.bind(this)}/>
                                                <span className="form-annotation">请输入有效的邮箱地址来接收独家奖金优惠及奉送。重要提示及交易相关的信息也将发送至您的注册邮箱。</span>
                                                <span className="icon-validation"></span>
                                                <span className="form-help-block tag-color-apple-red" hidden={this.state.noEmail}>
                                                        请输入有效邮箱地址。（例如：123456789@qq.com）</span>
                                            </div>
                                        </div>
                                        <div className={"form-item " +(this.state.noPhone == null?"":this.state.noPhone?"has-success":"has-error")}>
                                            <label className="form-label">
                                                <span className="form-label-text">手机号码</span>
                                                <span className="required-field">*</span>
                                            </label>
                                            <div className="form-field">
                                                <input ref="phone" name="Phone" type="text" placeholder="手机号码"  onBlur={this.inputBlur.bind(this)} />
                                                <span className="icon-validation"></span>
                                                <span className="form-help-block tag-color-apple-red" hidden={this.state.noPhone}>
                                                        请输入您的手机号码</span>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className={"form-item " +(this.state.noRealname == null?"":this.state.noRealname?"has-success":"has-error")}>
                                            <label className="form-label">
                                                <span className="form-label-text">输入您的姓名</span>
                                                <span className="required-field">*</span>
                                            </label>
                                            <div className="form-field">
                                                <input ref="realname" name="Realname" type="text" placeholder="请输入姓名"  onFocus={this.inputFocus.bind(this)}   onBlur={this.inputNameBlur.bind(this)} />
                                                <span className="form-annotation">请输入您的名字，例如：陈<u>美丽</u>。如果您输入的名字和银行开户人/身份证姓名不一样，我们将无法处理您的提款申请。</span>
                                                <span className="icon-validation"></span>
                                                <span className="form-help-block tag-color-apple-red" hidden={this.state.noRealname}>
                                                        {this.state.wrongName?'请输入您的中文姓名':'请输入您的姓名。'}</span>
                                            </div>
                                        </div>
                                        <div className={"form-item " +(this.state.noBirthday == null?"":this.state.noBirthday?"has-success":"has-error")}>
                                            <label className="form-label">
                                                <span className="form-label-text">出生日期</span>
                                                <span className="required-field">*</span>
                                            </label>
                                            <div className="form-field">
                                                <MuiThemeProvider>
                                                 <MyDatePicker ref="birthday" className="registerDatePick"></MyDatePicker>
                                                </MuiThemeProvider>
                                                <span className="icon-validation"></span>
                                                <span className="form-help-block tag-color-apple-red" hidden={this.state.noBirthday}>
                                                        请选择出生日期</span>
                                            </div>
                                        </div>
                                        <div className={"form-item " +(this.state.noVerifycode?"":"has-error")}>
                                            <label className="form-label">
                                                <span className="form-label-text">验证码</span>
                                                <span className="required-field">*</span>
                                            </label>
                                            <div className="form-field">
                                                <input ref="verifycode" name="Verifycode" type="text" style={{width:'150px'}} placeholder="请输入验证码"  onBlur={this.inputBlur.bind(this)} />
                                                {/* <img  onClick={this.reVerifyCode} src={this.props.verifycode.Img} alt="" style={{marginLeft:"20px"}}/> */}
                                                <VerifyCode getVerifyCode={this.getVerifyCode.bind(this)} />
                                                <span className="icon-validation"></span>
                                                <span className="form-help-block tag-color-apple-red" hidden={this.state.noVerifycode}>
                                                        请输入验证码。</span>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="form-action-container">
                                            <div className="accept-terms">本人已满18周岁，已阅读并接受<Link to="/termsOfUse"><strong>规则和条款</strong></Link>.</div>
                                            <div className="form-item form-submit-wrapper">
                                                <button type="Submit" className="form-submit btn-small btn">创建账户</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
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