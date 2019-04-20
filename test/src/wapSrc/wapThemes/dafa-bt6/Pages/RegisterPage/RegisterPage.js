import React, { Component } from 'react';
import {Icon,List, InputItem,NavBar,Modal,Toast,Checkbox,DatePicker} from "antd-mobile";
import {Link,browserHistory} from "react-router";
import connect from "react-redux/es/connect/connect";
import "./RegisterPage.scss"
import {wapLogin} from "globalAction";
import * as cache from "CacheHelper";

class RegisterPage extends Component{
    constructor(props) {
        super(props);
        this.submitStateLock = true;
        this.state = {
            birthday:"",
            checkPay:false,
            VerifyCode:"",
            noUsername: false,
            noRealname:false,
            noPassword: false,
            notMatchPayPassword: false,
            noBirthday:false,
            noEmail:false,
            noVerifycode:false,
            noPayPassword: false,
            noPayPassword2: false,
            noPhone: false,
            noWechat:false,
            noQQ: false
        }
    }
    componentWillMount() {
        Toast.info('数据加载中,请稍后');
        new window.actions.ApiRegisterSettingAction().fly(resp=>{
            Toast.hide();
        });
        // 推广链接
        let isAutoLogin = location.search;
        if(isAutoLogin.indexOf('channel')>0){
            cache.setSession('channel',isAutoLogin.split('=')[1]);
        }
    }
    onRegister(event) {
        event.preventDefault();
        let checknom = 0;
        let username = this.refs.username.state.value;
        let password = this.refs.password.state.value;
        let ExtendCode =this.refs.extendCode? this.refs.extendCode.state.value:"";
        let notMatchPayPassword = this.refs.notMatchPayPassword.state.value;
        let noPayPassword2="",payPassword="",noRealname="",noPhone="",noEmail="",noQQ="",noBirthday="",noWechat="";
        let params={};
        if(!username){
            this.setState({
                noUsername:true
            });
            checknom++;
        }

        if(!password){
            this.setState({
                noPassword:true
            });
            checknom++;
        }

        if(!notMatchPayPassword){
            this.setState({
                notMatchPayPassword:true
            });
            checknom++;
        }

        if(password !== notMatchPayPassword ){
            this.setState({
                notMatchPayPassword:true
            });
            checknom++;
        }

        if(this.props.remoteSysConfs.allow_edit_pay_pwd == "true" ){
             noPayPassword2 = this.refs.noPayPassword2 && this.refs.noPayPassword2.state.value;
             payPassword = this.refs.noPayPassword && this.refs.noPayPassword.state.value;
            if(this.state.checkPay){
                if (!payPassword) {
                    this.setState({
                        noPayPassword: true
                    });
                    checknom++;
                }
                if (!noPayPassword2 || noPayPassword2!==payPassword) {
                    this.setState({
                        noPayPassword2: true
                    });
                    checknom++;
                }
            }else{
                if (!payPassword) {
                    payPassword = password
                }
            }

        }

        if(this.props.registerSetting.TrueNameIsRequire){
            noRealname =this.refs.noRealname.state.value;
            if(!noRealname ){
                this.setState({
                    noRealname:true
                });
                checknom++;
            }
        }

        if (this.props.registerSetting.PhoneIsRequire) {
            noPhone = this.refs.noPhone && this.refs.noPhone.state.value.replaceAll(' ','');
            if (!noPhone) {
                this.setState({
                    noPhone: true
                });
                checknom++;
            }
        }

        if (this.props.registerSetting.EmailIsRequire) {
            noEmail = this.refs.noEmail && this.refs.noEmail.state.value;
            if (!noEmail) {
                this.setState({
                    noEmail: true
                });
                checknom++;
            }
        }

        if (this.props.registerSetting.QQIsRequire) {
            noQQ = this.refs.noQQ && this.refs.noQQ.state.value;
            if (!noQQ) {
                this.setState({
                    noQQ: true
                });
                checknom++;
            }
        }

        if (this.props.registerSetting.BirthdayIsRequire) {
            noBirthday = this.refs.noBirthday && this.state.birthday;
            if (!noBirthday) {
                this.setState({
                    noBirthday:true,
                });
                checknom++;
            }
        }

        if (this.props.registerSetting.WechatIsRequire) {
            noWechat = this.refs.noWechat && this.refs.noWechat.state.value;
            if (!noWechat) {
                this.setState({
                    noWechat:true,
                });
                checknom++;
            }
        }

        if(!this.refs.noVerifycode.state.value || this.refs.noVerifycode.state.value.toLocaleLowerCase() != this.state.VerifyCode.toLocaleLowerCase()){
            this.setState({
                noVerifycode:true
            });
            checknom++;
        }


        if(checknom!=0){
            return;
        }
        if(!this.submitStateLock) return;
        this.submitStateLock=false;
        Toast.loading('注册中,请稍后...');
        params={
            UserName:username,
            TrueName:noRealname,
            Password:password,
            Email:noEmail,
            Phone:noPhone,
            QQ:noQQ,
            WithdrawalPassword:payPassword,
            Birthday:noBirthday,
            Wechat:noWechat,
            ExtendCode:ExtendCode,
            Referer:ExtendCode
        }
        new window.actions.ApiRegisterAction (params).fly((respond)=>{
            Toast.hide();
            this.submitStateLock=true;
            if (respond.StatusCode === 0) {
                new window.actions.LoginAfterInit();
                window.wapHistoryType.push("/money/deposit");
            } else {
                Modal.alert("注册失败！", respond.Message);
            }
        });

    }
    errorInfos =(which)=>{
        //用户名
        if(which=="noUsername" && this.state.noUsername){
            if(this.refs.username.state.value==""){
                Toast.info('请确保您的用户名独一无二。在所有产品中您都将使用这个用户名。本栏中您只能填写6-12个数字或字母。');
            }else if(this.refs.username.state.value.length<6){
                Toast.info('本栏中您只能填写6-12个数字或字母！')
            }else{
                Toast.info('您填写的账号已经被注册,请您更换一个！');
            }
        }
        //真实姓名
        if(this.state.noRealname && which=="noRealname"){
            Toast.info('请填写您的真实姓名！');
        }
        //密码
        if(this.state.noPassword && which=="noPassword"){
            if(this.refs.password.state.value==""){
                Toast.info('请填写登陆密码！');
            }else{
                Toast.info('登陆密码长度必须为6-12位！')
            }
        }
        //确认密码
        if(this.state.notMatchPayPassword && which=="notMatchPayPassword"){
            Toast.info('确认密码与密码不相符！');
        }
        //取款密码
        if(this.state.noPayPassword  && which=="noPayPassword"){
            if(this.refs.noPayPassword.state.value==""){
                Toast.info('请填写取款密码！');
            }else if(this.refs.noPayPassword.state.value===this.refs.password.state.value){
                Toast.info('取款密码和登录密码不能相同！')
            }else{
                Toast.info('取款密码长度必须为6-12位！')
            }
        }
        //确认取款密码
        if(this.state.noPayPassword2 && which =="noPayPassword2"){
            Toast.info('确认取款密码与取款密码不相符！');
        }
        //郵箱
        if(this.state.noEmail && which =="noEmail"){
            Toast.info('请填写您的邮箱！');
        }
        //生日
        if(this.state.noBirthday && which=="noBirthday"){
            Toast.info('您的生日不能为空！');
        }
        //手机
        if(this.state.noPhone && which=="noPhone"){
            if(this.refs.noPhone.state.value==""){
                Toast.info('请填写您的手机号码！');
            }else{
                Toast.info('手机号码长度错误！')
            }
        }
        //微信
        if(this.state.noWechat && which =="noWechat"){
            Toast.info('您的微信号码不能为空！');
        }
        //QQ
        if(this.state.noQQ && which =="noQQ"){
            Toast.info('您的QQ号码不能为空！')
        }
        //验证码
        if(this.state.noVerifycode && which=="noVerifycode"){
            if(this.refs.noVerifycode.state.value==""){
                Toast.info('验证码不能为空!');
            }else {
                Toast.info('您输入的验证码错误!');
            }

        }
    }
    validateInput(which,val){
        //用户名
        if(which=="noUsername"){
            if(val=="" || 6>val.length){
                this.setState({
                    noUsername:true
                })
            }else{
                this.setState({
                    noUsername:false
                })
            }
        }
        //真实姓名
        if(which =="noRealname" && this.props.registerSetting.TrueNameIsRequire){
            if(val==""){
                this.setState({
                    noRealname:true
                })
            }else{
                this.setState({
                    noRealname:false
                });
            }
        }
        //登陆密码
        if(which =="noPassword"){
            if(val==""|| 6>val.length){
                this.setState({
                    noPassword:true
                })
            }else{
                this.setState({
                    noPassword:false
                });
            }
        }
        //确认密码
        if(which =="notMatchPayPassword"){
            let oldVal = this.refs.password.state.value;
            if(val=="" ||oldVal!==val){
                this.setState({
                    notMatchPayPassword:true
                })
            }else{
                this.setState({
                    notMatchPayPassword:false
                });
            }
        }

        //取款密码
        if(which == "noPayPassword"){
            let oldVal = this.refs.password.state.value;
            if(val==""|| 6>val.length || oldVal ===val){
                this.setState({
                    noPayPassword:true
                })
            }else{
                this.setState({
                    noPayPassword:false
                });
            }
        }
        //确认取款密码
        if(which == "noPayPassword2"){
            let oldVal = this.refs.noPayPassword.state.value;
            if(val=="" ||oldVal!==val){
                this.setState({
                    noPayPassword2:true
                })
            }else{
                this.setState({
                    noPayPassword2:false
                });
            }
        }
        //郵箱
        if(which =="noEmail"){
            if(val=="" ){
                this.setState({
                    noEmail:true
                })
            }else{
                this.setState({
                    noEmail:false
                });
            }
        }
        //手机
        if(which == "noPhone" &&this.props.registerSetting.PhoneIsRequire){
            if(val=="" ||val.replaceAll(' ','').length>11 || val.replaceAll(' ','').length<11){
                this.setState({
                    noPhone:true
                })
            }else{
                this.setState({
                    noPhone:false
                });
            }
        }
        //微信
        if(which =="noWechat" && this.props.registerSetting.WechatIsRequire){
            if(val ==""){
                this.setState({
                    noWechat:true
                })
            }else{
                this.setState({
                    noWechat:false
                });
            }
        }
        //QQ
        if(which =="noQQ" && this.props.registerSetting.QQIsRequire){
            if(val ==""){
                this.setState({
                    noQQ:true
                })
            }else{
                this.setState({
                    noQQ:false
                });
            }
        }
        //生日
        if(which=="noBirthday"&& this.props.registerSetting.BirthdayIsRequire){
            if(val==""){
                this.setState({
                    noBirthday:true,
                    birthday:val.format("yyyy-MM-dd")
                })
            }else{
                this.setState({
                    noBirthday:false,
                    birthday:val.format("yyyy-MM-dd")
                });
            }
        }
        //验证码
        if(which =="noVerifycode"){
            if(val =="" || val.toLocaleLowerCase() != this.state.VerifyCode.toLocaleLowerCase()){
                this.setState({
                    noVerifycode:true
                })
            }else{
                this.setState({
                    noVerifycode:false
                })
            }
        }
    }
    checkPay(e){
        this.setState({
            checkPay:e.target.checked
        })
    }
    renderPayPasswordDOM(){
        if( this.props.remoteSysConfs.allow_edit_pay_pwd == "false" ) return;
        let dom=[];
        if(this.state.checkPay){
            dom.push(
                <InputItem
                    placeholder="取款密码（必填，长度6到12位）"
                    clear
                    maxLength={12}
                    key={1}
                    type="password"
                    ref="noPayPassword"
                    error={this.state.noPayPassword}
                    onErrorClick={this.errorInfos.bind(this,'noPayPassword')}
                    onChange={this.validateInput.bind(this,'noPayPassword')}
                >
                    <i className="icon icon-credit-card"></i>
                </InputItem>
            );
            dom.push(
                <InputItem
                    placeholder="确认取款密码"
                    clear
                    key={2}
                    maxLength={12}
                    type="password"
                    ref="noPayPassword2"
                    error={this.state.noPayPassword2}
                    onErrorClick={this.errorInfos.bind(this,'noPayPassword2')}
                    onChange={this.validateInput.bind(this,'noPayPassword2')}
                >
                    <i className="icon icon-key"></i>
                </InputItem>
            )
        }
        return dom;
    }
    getVerifyCode(VerifyCode){//獲取驗證碼
        this.setState({
            VerifyCode:VerifyCode
        })
    }
    checkUserName(which,val){
        let _this=this;
        if(val=="" || 6>val.length){
            return;
        }
        new window.actions.ApiCheckUserNameAction(val).fly(resp=>{
            if(resp.StatusCode==0){
                if(resp.Registered){
                    Toast.info('您填写的账号已经被注册,请您更换一个！');
                    _this.setState({
                        noUsername:true
                    })
                }
            }
        });
    }
    showLogin(){
        wapLogin(true);
        window.wapHistoryType.push('/');
    }
    render(){
        const PayPasswordDOM = this.renderPayPasswordDOM();
        const VerifyCode = window.r.get("VerifyCode");
        const CustomChildren = ({ extra, onClick, children }) => (
            <InputItem
                placeholder={extra}
                value={this.state.birthday}
                error={this.state.noBirthday}
                onClick={onClick}
                onErrorClick={this.errorInfos.bind(this,'noBirthday')}
            >
                <i className="icon icon-calendar"></i>
                {children}
            </InputItem>
        );
        return(
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={window.wapHistoryType.goBack}
                >注册账号</NavBar>
                <div className="scroll-content register">
                    <form onSubmit={this.onRegister.bind(this)}>
                        <List>
                            <InputItem
                                placeholder="用户名（必填，长度6到12位）"
                                clear
                                maxLength={12}
                                ref="username"
                                error={this.state.noUsername}
                                onErrorClick={this.errorInfos.bind(this,'noUsername')}
                                onChange={this.validateInput.bind(this,'noUsername')}
                                onBlur={this.checkUserName.bind(this,'noUsername')}
                            >
                                <i className="icon icon-user"></i>
                            </InputItem>
                            {
                                this.props.registerSetting.TrueNameIsVisible?
                                <InputItem
                                    placeholder="真实姓名（必填，涉及结款）"
                                    clear
                                    ref="noRealname"
                                    error={this.state.noRealname}
                                    onErrorClick={this.errorInfos.bind(this,'noRealname')}
                                    onChange={this.validateInput.bind(this,'noRealname')}
                                    onBlur = {this.validateInput.bind(this,'noRealname')}
                                >
                                    <i className="icon icon-user-md"></i>
                                </InputItem>:null
                            }

                            <InputItem
                                placeholder="登陆密码（必填，长度6到12位）"
                                clear
                                maxLength={12}
                                type="password"
                                ref="password"
                                error={this.state.noPassword}
                                onErrorClick={this.errorInfos.bind(this,'noPassword')}
                                onChange={this.validateInput.bind(this,'noPassword')}
                            >
                                <i className="icon icon-lock"></i>
                            </InputItem>

                            <InputItem
                                placeholder="确认密码（请再次输入你的密码）"
                                clear
                                maxLength={12}
                                type="password"
                                ref="notMatchPayPassword"
                                error={this.state.notMatchPayPassword}
                                onErrorClick={this.errorInfos.bind(this,'notMatchPayPassword')}
                                onChange={this.validateInput.bind(this,'notMatchPayPassword')}
                            >
                                <i className="icon icon-key"></i>
                            </InputItem>
                            {
                                this.props.registerSetting.EmailIsVisible ?
                                    <InputItem
                                        placeholder="请输入您的常用邮箱"
                                        clear
                                        ref="noEmail"
                                        type="email"
                                        error={this.state.noEmail}
                                        onErrorClick={this.errorInfos.bind(this,'noEmail')}
                                        onChange={this.validateInput.bind(this,'noEmail')}
                                    >
                                        <i className="icon icon-envelope"></i>
                                    </InputItem>:null
                            }
                            {
                                this.props.registerSetting.BirthdayIsVisible ?
                                    <DatePicker
                                        mode="date"
                                        title="日期选择"
                                        extra="请选择您的生日"
                                        ref="noBirthday"
                                        value={this.state.birthday?new Date(this.state.birthday):""}
                                        minDate={new Date(1900,1,1)}
                                        maxDate={new Date()}
                                        onOk = {this.validateInput.bind(this,'noBirthday')}
                                    >
                                        <CustomChildren></CustomChildren>
                                    </DatePicker>:null
                            }
                            {
                                this.props.registerSetting.QQIsVisible ?
                                    <InputItem
                                        placeholder="QQ（用于找回账户密码）"
                                        clear
                                        ref="noQQ"
                                        type="number"
                                        error={this.state.noQQ}
                                        onErrorClick={this.errorInfos.bind(this,'noQQ')}
                                        onChange={this.validateInput.bind(this,'noQQ')}
                                    >
                                        <i className="icon icon-comment-alt"></i>
                                    </InputItem>:null
                            }
                            {
                                this.props.registerSetting.WechatIsVisible?
                                    <InputItem
                                        placeholder="微信（用于找回账户密码）"
                                        clear
                                        ref="noWechat"
                                        error={this.state.noWechat}
                                        onErrorClick={this.errorInfos.bind(this,'noWechat')}
                                        onChange={this.validateInput.bind(this,'noWechat')}
                                    >
                                        <i className="icon icon-comments"></i>
                                    </InputItem>:null
                            }
                            {
                                this.props.registerSetting.PhoneIsVisible ?
                                    <InputItem
                                        placeholder="手机（用于找回账户密码）"
                                        clear
                                        type="number"
                                        ref="noPhone"
                                        error={this.state.noPhone}
                                        maxLength={11}
                                        onErrorClick={this.errorInfos.bind(this,'noPhone')}
                                        onChange={this.validateInput.bind(this,'noPhone')}
                                    >
                                        <i className="icon icon-mobile-phone"></i>
                                    </InputItem>:null
                            }
                            {
                                this.props.registerSetting.AgentExtendCodeIsVisible ?
                                    <InputItem
                                        defaultValue={ sessionStorage.getItem("channel") || ""}
                                        placeholder="推广码(可以不填写)"
                                        clear
                                        type="text"
                                        ref="extendCode"
                                    >
                                        <i className="icon icon-tags"></i>
                                    </InputItem>:null
                            }
                            {
                                this.props.remoteSysConfs.allow_edit_pay_pwd == "true" ?
                                <List.Item className="checkPay">
                                    <Checkbox.CheckboxItem  onChange={this.checkPay.bind(this)}>
                                        设置取款密码(不设置同登录密码)
                                    </Checkbox.CheckboxItem>
                                </List.Item>:null
                            }

                            {PayPasswordDOM}
                            <InputItem
                                placeholder="验证码"
                                clear
                                className="verifyCode"
                                type="text"
                                maxLength={4}
                                ref="noVerifycode"
                                error={this.state.noVerifycode}
                                onErrorClick={this.errorInfos.bind(this,'noVerifycode')}
                                onChange={this.validateInput.bind(this,'noVerifycode')}
                            >
                                <VerifyCode getVerifyCode={this.getVerifyCode.bind(this)} />
                            </InputItem>
                        </List>
                        <button className="btn registerBtn">注 册</button>
                    </form>
                    <div className="loginBt">
                        <a onClick={this.showLogin.bind(this)}>已有账号?登陆</a>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        registerSetting:state.registerSetting,
        remoteSysConfs:state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(RegisterPage)