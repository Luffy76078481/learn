/**
 * Created by sobi on 2017/12/6.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link, IndexLink,browserHistory } from 'react-router';
import MyDatePicker from '../../../../../global/Components/MyDatePicker/MyDatePicker_register'; // 日历
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // 没错就是它，日历的罪魁祸首！
import * as cache from "../../../../../store/CacheHelper";
import "./RegisterPage_xhXhtd_new.scss";

class RegisterPage extends Component {
    componentDidMount() {
        new window.actions.ApiRegisterSettingAction().fly();
        window.$("#root").attr("class", "usefulcss");
    }
    constructor (props){
        super();
        this.state = {
            VerifyCode:"",// 验证码
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
            phoneNum:false,
            noPasswordType:true,
            errorVerifycode:true // 验证码判断正误
        }
    }
    // 表单提交
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
        let referer = sessionStorage.getItem("channel") || "";
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
            } else {
                window.swal("注册失败", respond.Message, "error");
            }
        });
    }
    // 密码检验提示
    checkPassword(e){
        this.setState({noPassword2:true})
        let passwordVal = this.refs.password.value; 
        let passwordSureVal = this.refs.password2.value;
        if( passwordSureVal.length > 0 && passwordVal.length > 0 ){
            if( passwordVal != passwordSureVal ){
                this.setState({
                    notMatchPswHid:false,
                })
            }
            else{
                this.setState({
                    notMatchPswHid:true
                })          
            }            
        }
        else{
            this.setState({
                notMatchPswHid:true,
            })        
        }            
    }
    // 数字+字母 组成12位
    checkType(e){
        this.setState({ noPassword:true })
        let password = this.refs.password.value; 
        this.checkPassword();
        let reg = /^[\w]{6,12}$/;
        if( password.length > 0 ){
            if( !password.match(reg) ){
                this.setState({
                    noPasswordType:false
                })
            }     
            else{
                this.setState({
                    noPasswordType:true
                })              
            }       
        }
        else{
            this.setState({
                noPasswordType:true
            })              
        }           
    }
    // 手机可输入数字
    changeNum(e) {
        this.setState({ noPhone:true })
        let getVal = e.target.value;
        let len = getVal.length;
        // 手机数字少于11位情况下
        if( len<11 && len!=0){
            this.setState(
                { phoneNum:true }
            )
        }
        else{
            this.setState(
                { phoneNum:false }
            )           
        }            
    }
    //
    getVerifyCode(VerifyCode){
        this.setState({
            VerifyCode:VerifyCode
        })
    }
    // 用户名判重
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
    // 渲染
    render() {
        const config = window.config;
        let storeChannel = "";
        if(window.sessionStorage){
            storeChannel = sessionStorage.getItem("channel");
        }
        const channel = storeChannel || window.channel || "";
        const options2 = window.r.props("RegisterPage");
        const btnText = options2.btnText;
        const VerifyCode = window.r.get("VerifyCode");
        return (
            <main className="Bgmember-main" id="RegisterNewPage">
                <div className="tm">
                    <div className="divc w1000" style={{paddingBottom: "20px"}}>
                        <div className="upnav"></div>
                        <div className="leftnave">
                            <ul className="items">
                                <a href="/agent.html?tab=AboutUs"  target="_blank"><li>关于我们</li></a>
                                <a href="/agent.html?tab=ContactUs" target="_blank"><li>联络我们</li></a>
                                <a href="/agent.html?tab=Faq" target="_blank"><li>常见问题</li></a>
                                <a href="/agent.html?tab=BetRule" target="_blank"><li>责任博彩</li></a>
                            </ul>
                        </div>
                        <div className="text-center">
                            {/* 注册内容 */}
                            <div className="content">
                                <form onSubmit={this.handleRegister.bind(this)}>
                                    <div className="regisdata">
                                        <div className="inputBox">
                                            {/* 用户名 */}
                                            <p className="inputinbox"><i className="fa fa-star" aria-hidden="true"></i>账号：</p>
                                            <div className="inputinbox">
                                                <input ref="username" type="text" placeholder="6-12位由字母和数字组成" name="Username" className="input w238 member-input" onBlur={this.inputBlur.bind(this)}/>&nbsp;
                                                <span className="ml5 red f12" hidden={this.state.noUsername} style={{"color":"red"}}>*此项不能为空</span>
                                                <span className="ml5 red f12" hidden={this.state.UsernameExist} style={{"color":"red"}}>*用户名已存在，请重新输入</span>
                                            </div>
                                        </div>
                                        {/* 登录密码 */}
                                        <div className="inputBox input-marg">
                                            <p className="inputinbox"><i className="fa fa-star" aria-hidden="true"></i>密码：</p>
                                            <div className="inputinbox">
                                                <input ref="password" type="password" placeholder="6-12位由字母和数字组成" minLength="6" className="input w238 member-input" onChange = {this.checkType.bind(this)}/>&nbsp;
                                                <span className="ml5 red f12" hidden={this.state.noPassword} style={{"color":"red"}}>*此项不能为空</span>
                                                <span className="ml5 red f12" hidden={this.state.noPasswordType} style={{"color":"red"}}>*请输入6-12位数字+字母</span>
                                            </div>
                                        </div>
                                        <div className="inputBox input-marg">
                                            <p className="inputinbox"><i className="fa fa-star" aria-hidden="true"></i>确认密码：</p>
                                            <div className="inputinbox">
                                                <input ref="password2" type="password" placeholder="6-12位由字母和数字组成" minLength="6" className="input w238 member-input"  onChange = {this.checkPassword.bind(this)} />&nbsp;
                                                <span className="ml5 red f12" hidden={this.state.noPassword2} style={{"color":"red"}}>*此项不能为空</span>
                                                <span className="ml5 red f12" hidden={this.state.notMatchPswHid} style={{"color":"red"}}>*两次密码输入不一致</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 内容          */}
                                    <div className="memberdata">  
                                        {/* 真实姓名 */}
                                        {this.props.registerSetting.TrueNameIsVisible?                
                                        <div className="inputBox realName input-marg">
                                            <p className="inputinbox">{this.props.registerSetting.TrueNameIsVisible?<i className="fa fa-star" aria-hidden="true"></i>:""}真实姓名</p>
                                            <div className="inputinbox">
                                                <input ref="realname" type="text" placeholder="请输入姓名" className="input w238 member-input"/>
                                                <span className="ml5 red f12" hidden={this.state.noRealname} style={{"color":"red"}}>*此项不能为空</span>
                                            </div>
                                        </div>:null}
                                        {/* 常用手机 */}
                                        {this.props.registerSetting.PhoneIsVisible?
                                        <div className="inputBox input-marg">
                                            <p className="inputinbox">{this.props.registerSetting.PhoneIsRequire?<i className="fa fa-star" aria-hidden="true"></i>:""}手机：</p>
                                            <div className="inputinbox">
                                                <input id='sstest' ref="phone" type="text" max="10" maxLength="11" placeholder="请输入您的手机" className="input w238 member-input" onChange = {this.changeNum.bind(this)} />
                                                <span className="ml5 red f12" hidden={!this.state.phoneNum}>请输入11位手机号码</span>
                                                <br/>
                                                <span className="ml5 red f12" hidden={this.state.noPhone} style={{"color": "red"}}>*此项不能为空,并且必须符合手机号码格式</span>
                                            </div>
                                        </div>:null}
                                        {/* 常用邮箱 */}       
                                        {this.props.registerSetting.EmailIsVisible?
                                        <div className="inputBox input-marg">
                                            <p className="inputinbox">{this.props.registerSetting.EmailIsRequire?<i className="fa fa-star" aria-hidden="true"></i>:""}邮箱</p>
                                            <div className="inputinbox">
                                                <input ref="email" type="text" placeholder="请输入您的常用邮箱"
                                                        className="input w238 member-input"/>
                                                <span className="ml5 red f12" hidden={this.state.noEmail} style={{"color": "red"}}>*此项不能为空</span>
                                            </div>
                                        </div> : null }
                                        {/* 生日 */}
                                        {this.props.registerSetting.BirthdayIsVisible?
                                        <div className="inputBox input-marg">
                                            <p className="inputinbox">{this.props.registerSetting.BirthdayIsRequire?<i className="fa fa-star" aria-hidden="true"></i> : ""}生日</p>
                                            <div className="inputinbox">
                                                {/* 日历插件 */}
                                                <MuiThemeProvider>
                                                    <MyDatePicker ref="birthday" className="registerDatePick"></MyDatePicker>
                                                </MuiThemeProvider> 
                                                <span className="ml5 red f12" hidden={this.state.noBirthday} style={{"color": "red"}}>*此项不能为空</span>
                                            </div>
                                        </div>:null}
                                        {/* 微信 */}
                                        {this.props.registerSetting.WechatIsVisible?
                                        <div className="inputBox input-marg">
                                            <p className="inputinbox">{this.props.registerSetting.WechatIsRequire?<i className="fa fa-star" aria-hidden="true"></i> : ""}微信</p>
                                            <div className="inputinbox">
                                                <input ref="wechat" type="text" placeholder="请输入您的微信" className="input w238 member-input"/>
                                                <span className="ml5 red f12" hidden={this.state.noWechat} style={{"color": "red"}}>*此项不能为空</span>
                                            </div>
                                        </div> : null}
                                        {/* QQ */}
                                        {this.props.registerSetting.QQIsVisible?
                                        <div className="inputBox input-marg">
                                            <p className="inputinbox">{this.props.registerSetting.QQIsRequire?<i className="fa fa-star" aria-hidden="true"></i>:""}QQ</p>
                                            <div className="inputinbox">
                                                <input ref="qq" type="text" placeholder="请输入您的QQ" className="input w238 member-input"/>
                                                <span className="ml5 red f12" hidden={this.state.noQQ} style={{"color": "red"}}>*此项不能为空</span>
                                            </div>
                                        </div> : null}
                                        {/* 取款密码 */}
                                        {this.props.remoteSysConfs.allow_edit_pay_pwd == "true" ?
                                        <div className="inputBox payPsw input-marg">
                                            <p className="inputinbox"><i className="fa fa-star" aria-hidden="true"></i>取款密码：</p>
                                            <div className="inputinbox">
                                                <input ref="payPassword" type="password" placeholder="6-12位由字母和数字组成" className="input w238 member-input"/>&nbsp;
                                                <span className="ml5 red f12" hidden={this.state.noPayPassword} style={{"color":"red"}}>*此项不能为空</span>
                                            </div>
                                        </div> : null}
                                        {/* 确认取款密码 */}
                                        {this.props.remoteSysConfs.allow_edit_pay_pwd == "true" ?
                                        <div className="inputBox payPsw2 input-marg">
                                            <p className="inputinbox"><i className="fa fa-star" aria-hidden="true"></i>确认密码：</p>
                                            <div className="inputinbox">
                                                <input ref="payPassword2" type="password" placeholder="6-12位由字母和数字组成" className="input w238 member-input"/>&nbsp;
                                                <span className="ml5 red f12" hidden={this.state.noPayPassword2} style={{"color":"red"}}>*此项不能为空</span>
                                                <span className="ml5 red f12" hidden={this.state.notMatchPayPassword} style={{"color":"red"}}>*密码不相符</span>
                                            </div>
                                        </div> : null}           
                                    </div>
                                    {/* 最后的轻语 */}
                                    <div className="memberdata3">
                                        <div className="inputBox code-img input-marg">
                                            <p className="inputinbox"><i className="fa fa-star" aria-hidden="true"></i>验证码：</p>
                                            <div className="inputinbox">
                                                <input ref="verifycode" type="text"  className="input w238 member-input" placeholder="请输入验证码"/>
                                                <VerifyCode getVerifyCode={this.getVerifyCode.bind(this)} />
                                                <span className="ml5 red f12" hidden={this.state.noVerifycode} style={{"color":"red"}}>*此项不能为空</span>
                                                <span className="ml5 red f12" hidden={this.state.errorVerifycode} style={{"color":"red"}}>*验证码错误</span>
                                                {/* <p>贴心提醒：看不清？<span className="clickbtn" onClick={this.getVerifyCode.bind(this)}>点击更换。</span></p> */}
                                            </div>
                                        </div>
                                        {this.props.registerSetting.AgentExtendCodeIsVisible?
                                        <div className="inputBox channel input-marg" style={{display: channel? "none":"block"}}>
                                            <p className="inputinbox">推广码：</p>
                                            <div className="inputinbox">
                                                <input ref="channel" type="text" placeholder="请输入推广码(可不填写)" defaultValue={channel} className="input w238 member-input"/>
                                            </div>
                                        </div>: null}
                                    </div>   

                                    <div className="inputBox input-marg daccept">
                                        <p className="reg-terms">
                                            <label>
                                                <input type="checkbox" className="checkboxBg" id="dacceptService" ref="acceptService" defaultChecked="defaultChecked"/>
                                                    &nbsp;确认已年满18岁，并已阅读和接受本网站政策、隐私声明、条款和条件。
                                            </label>
                                        </p>
                                        <p className="reg-terms">
                                            <label>
                                                <input type="checkbox" className="checkboxBg" id="disreceiveEmail" ref="receiveEmail" defaultChecked="defaultChecked"/>
                                                    &nbsp;是的，我想收到{config.appName}的通讯
                                            </label>
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