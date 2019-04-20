/**
 * 公共-修改密码
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
        new this.actionCls(this.refs.oldPassword.value,this.refs.password.value).fly();
    }
    render() {
        return (
            <div>
                <div className="header">{this.title}</div>
                <div className="maincontent security_pg gametrans">
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="hlder"><div className="lbl">原密码：</div><div className="custinput"><input ref="oldPassword" type="password"/></div></div>
                        {this.title=="修改支付密码" && window.config.spec =="wf8"?
                        <div className="hit" style={{marginLeft: '90px',marginTop: '-16px',color:'#d41111'}}>*若无更动过支付密码，则与帐号登入密码相同</div>:null}
                        <div className="hlder"><div className="lbl">新密码：</div><div className="custinput"><input ref="password" type="password" placeholder="密码必须为6-12位数字和字母的组合"/></div></div>
                        <div className="hlder"><div className="lbl">确认密码：</div><div className="custinput"><input ref="password2" type="password" placeholder="请再次输入密码"/></div></div>
                        <div className="custbtn"><button>提交</button></div>
                    </form>
                </div>
            </div>
        );
    }
}
export default ChangePwdPage;