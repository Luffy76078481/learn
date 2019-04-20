/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';


export class ChangePwdPage extends Component {
    constructor(props) {
        super(props);
    }
    onSubmit(e) {
        e.preventDefault();
        
        if (!this.refs.oldPassword.value) {
            window.swal("错误", "原密码未指定", "error");
            return;
        }
        if (!this.refs.password.value) {
            window.swal("错误", "新密码未指定", "error");
            return;
        }
        if (this.refs.password.value !== this.refs.password2.value) {
            window.swal("错误", "新密码与确认密码不匹配", "error");
            return;
        }
        new this.actionCls(this.refs.oldPassword.value,this.refs.password.value).fly(
            res=>{
                // if(res.StatusCode === 0){
                //     window.swal("成功", res.Message, "info");
                // }else{
                //     window.swal("错误", res.Message, "error");
                // }
            }
        );
    }
    render() {
        return (
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="hlder"><div className="lbl">{this.title}原密码：</div><div className="custinput"><input ref="oldPassword" type="password"/></div></div>
                    {this.title=="修改支付密码" && window.config.spec =="wf8"?
                    <div className="hit" style={{marginLeft: '90px',marginTop: '-16px',color:'#d41111'}}>*若无更动过支付密码，则与帐号登入密码相同</div>:null}
                    <div className="hlder"><div className="lbl">{this.title}新密码：</div><div className="custinput"><input ref="password" type="password" placeholder="密码必须为6-12位数字和字母的组合"/></div></div>
                    <div className="hlder"><div className="lbl">{this.title}确认密码：</div><div className="custinput"><input ref="password2" type="password" placeholder="请再次输入密码"/></div></div>
                    <span className="messege_new">*初始提款密码默认为登录密码。</span>
                    <div className="custbtn"><button>提交</button></div>
                </form>
        );
    }
}


export default ChangePwdPage;