import React, { Component } from 'react';
import {InputItem,NavBar,Modal,Toast,Checkbox,DatePicker} from "antd-mobile";
import {Link,browserHistory} from "react-router";
import connect from "react-redux/es/connect/connect";
import "./LoginRegisterPage.scss"
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
    componentDidMount(){
        window.onresize=null;
    }
    componentWillUnmount(){
        window.onresize = window.Util.convertPixel
    }
    // 注册
    onRegister(event) {
        event.preventDefault();
        let checknom = 0;
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        let ExtendCode =this.refs.extendCode? this.refs.extendCode.value:"";
        let notMatchPayPassword = this.refs.notMatchPayPassword.value;
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
             noPayPassword2 = this.refs.noPayPassword2 && this.refs.noPayPassword2.value;
             payPassword = this.refs.noPayPassword && this.refs.noPayPassword.value;
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
        if (this.props.registerSetting.PhoneIsRequire) {
            noPhone = this.refs.noPhone && this.refs.noPhone.value.replaceAll(' ','');
            if (!noPhone) {
                this.setState({
                    noPhone: true
                });
                checknom++;
            }
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
                browserHistory.push("/");
            } else {
                Modal.alert("注册失败！", respond.Message);
            }
        });

    }
    // 鼠标移出修改状态值
    validateInput(which,refName){
        let val = this.refs[refName].value;
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
            let oldVal = this.refs.password.value;
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
    }
    // 取款密码
    checkPay(e){
        this.setState({
            checkPay:e.target.checked
        })
    }
    //獲取驗證碼
    getVerifyCode(VerifyCode){
        this.setState({
            VerifyCode:VerifyCode
        })
    }
    // 查看用户名是否重复
    checkUserName(){
        let _this=this;
        let val = this.refs.username.value;
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
    render(){
        const VerifyCode = window.r.get("VerifyCode");
        return(
            <div className="loginAndRegPage">
                <div className="backHome"><Link to="/"></Link></div>
                <div className="registerWrap">
                    <div className="formWrap">
                        <form onSubmit={this.onRegister.bind(this)}>
                            <div className='userItem'>
                                <label>用户名</label>
                                <input type="text" ref="username" maxLength='12' onChange={this.validateInput.bind(this,'noUsername','username')} onBlur={this.checkUserName.bind(this)}/>
                                {this.state.noUsername?<div className="warningImg"></div>:null}    
                            </div>
                            <div className='userItem'>
                                <label>登录密码</label>
                                <input type="password" ref="password" maxLength='12' onChange={this.validateInput.bind(this,'noPassword','password')}/>
                                {this.state.noPassword?<div className="warningImg"></div>:null} 
                            </div>
                            <div className='userItem'>
                                <label>确认密码</label>
                                <input type="password" ref="notMatchPayPassword" maxLength='12' onChange={this.validateInput.bind(this,'notMatchPayPassword','notMatchPayPassword')}/>
                                {this.state.notMatchPayPassword?<div className="warningImg"></div>:null} 
                            </div>
                            {
                                this.props.registerSetting.PhoneIsVisible ?
                                <div className='userItem'>
                                    <label>手机</label>
                                    <input type="text" ref="noPhone" maxLength='11' onChange={this.validateInput.bind(this,'noPhone','noPhone')}/>
                                    {this.state.noPhone?<div className="warningImg"></div>:null} 
                                </div>
                                :null
                            }
                            {
                                this.props.registerSetting.AgentExtendCodeIsVisible ?
                                <div className='userItem'>
                                    <label>推广码</label>
                                    <input type="text" ref="extendCode" placeholder=""/>
                                </div> 
                                :null                               
                            }

                            {/* <div className='userItem'>
                                <VerifyCode getVerifyCode={this.getVerifyCode.bind(this)} />
                                <input type="text" ref="noVerifycode" placeholder="验证码" onChange={this.validateInput.bind(this,'noVerifycode','extendCode')} maxLength='4' />
                            </div> */}
                            <div className='regButWrap'>
                               <button className="registerBtn"></button> 
                            </div>   
                        </form>
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