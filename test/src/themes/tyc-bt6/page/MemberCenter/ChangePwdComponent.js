/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';


export class ChangePwdComponent extends Component {
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
                if(res.StatusCode === 0){
                    window.swal("成功", res.Message, "success");
                }else{
                    window.swal("错误", res.Message, "error");
                }
            }
        );
    }
    render() {
        return (
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label className="col-md-4">
                            {this.title}原密码：
                        </label>
                        <span className="col-md-8">
                            <input className="form-control" ref="oldPassword" type="password"/>
                        </span>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4">
                            {this.title}新密码：
                        </label>
                        <span className="col-md-8">
                            <input className="form-control" ref="password" type="password"  placeholder="密码必须为6-12位数字和字母的组合"/>
                        </span>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4">
                            {this.title}确认密码：
                        </label>
                        <span className="col-md-8">
                            <input className="form-control" ref="password2" type="password"  placeholder="请再次输入密码"/>
                        </span>
                    </div>
                    <div className="form-group" style={{marginTop:'30px'}} >
                        <button className="btn">提交</button>
                        {this.title=="支付" &&
                        (
                            <span className="messege_new" style={{fontSize:'12px',color:'#af0000'}}>*若无更动过支付密码，则与帐号登入密码相同。</span>
                        )
                        }
                    </div>
                </form>
        );
    }
}


export default ChangePwdComponent;