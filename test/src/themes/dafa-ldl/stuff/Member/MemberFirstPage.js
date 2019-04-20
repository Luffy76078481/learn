/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import {ApiLoginLogsAction} from "../../../../actions/index";
import ChangeLoginPwdPage from "./ChangeLoginPwdPage";
import ChangePayPwdPage from "./ChangePayPwdPage";

class MemberIndexPage extends Component {
    constructor(props) {
        super(props);
        new ApiLoginLogsAction().fly();
        this.state = {
            showLoginPwd:false,
            showPayPwd:false,
            copied:false,
            copyErr:false,
            webName:window.location.host
        }
    }

    renderLoginTime() {
        if (this.props.login.logs.length > 0) {
            return this.props.login.logs[0].created;
        }
        return "";
    }
    copyCode(){
        var Url2=document.getElementById("recommendCode");
        Url2.select();
        try{
            if(document.execCommand('copy', false, null)){
                document.execCommand("Copy");
                window.swal('恭喜您','复制成功!','success')
            }
        } catch(err){
            window.swal('错误','复制失败,请改用手动复制','error')
        }
    }
    showLoginPwd(){
        if(this.state.showLoginPwd){
            this.setState({
                showLoginPwd:false,
                showPayPwd:true
            })
        }else{
            this.setState({
                showLoginPwd:true,
                showPayPwd:false
            })
        }
    }
    hideNumber(num){
        if(!num) return num;
        let str = '****'+num.slice(4,num.length);
        return str;
    }
    showPayPwd(){
        if(this.state.showPayPwd){
            this.setState({
                showLoginPwd:true,
                showPayPwd:false
            })
        }else{
            this.setState({
                showLoginPwd:false,
                showPayPwd:true
            })
        }
    }
    render() {
        const options = window.r.props('MemberCenterRouter');
        return (
            <div>
                <div className="userInfo">
                    <div>
                        <h4 className="font_red">个人资料</h4>
                        <span className="crown"></span>
                        <span className="recommendCode">
                            专属域名:
                            <span className="font_red">{this.state.webName}</span>
                        </span>
                        <a href="/help/helpcenter.html" target="_blank" className="guide btn btn-lg btn-danger">新手指南</a>
                    </div>
                    <div className="info">
                        <ul>
                            <li><label>用户名:</label><span className="con">{this.props.user.username}</span></li>
                            <li><label>等级:</label><span className="con">{this.props.user.userLevelName}</span></li>
                            <li><label>手机:</label><span className="con">{this.hideNumber(this.props.user.phone)}<a className="validate">验证通过</a></span></li>
                            <li><label>姓名:</label><span className="con">{this.props.user.realName}</span></li>
                            <li><label>推广链接:</label><input  id="recommendCode" className="conInput" type="text" value={"https://"+ location.hostname + "/register?channel=" +this.props.user.recommendCode} readOnly /><a onClick={this.copyCode.bind(this)} className="validate">复制</a></li>
                            <li><label>邮箱:</label><span className="con">{this.hideNumber(this.props.user.email)}<a className="validate">验证通过</a></span></li>
                        </ul>
                    </div>
                    <div className="clearfix"></div>
                    <div className="changePwd">
                        <a className={this.state.showLoginPwd?"btn btn-sm btn-danger":"btn btn-sm btn-default"} onClick={this.showLoginPwd.bind(this)}>修改登录密码</a>
                        <a className={this.state.showPayPwd?"btn btn-sm btn-danger":"btn btn-sm btn-default"} onClick={this.showPayPwd.bind(this)}>修改支付密码</a>
                        <div className="pwdCon" style={{display:this.state.showLoginPwd?"block":"none"}}>
                            <ChangeLoginPwdPage></ChangeLoginPwdPage>
                        </div>
                        <div className="pwdCon"  style={{display:this.state.showPayPwd?"block":"none"}}>
                            <ChangePayPwdPage></ChangePayPwdPage>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        game: state.game,
        login: state.login
    }
);


export default connect(mapStateToProps, {})(MemberIndexPage);