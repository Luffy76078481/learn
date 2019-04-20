import React, { Component } from 'react';
import { connect } from 'react-redux'

import {ApiVerifyCodeAction,ApiForgetPwd1Action,ApiForgetPwd2Action} from  "../../../../actions/index";

class ForgetPasswordPage extends Component {
    componentDidMount() {

    }
    constructor (props){
        super();
        this.state = {
            noUsername:true,
            noVerifycode:true,
            noPassword:true,
            noPassword2:true,
            notMatchPswHid:true,
            noVerifycode2:true
        }
    }

    handleForgetPassword(e) {
        if(!this.refs.username.value){
            this.setState({
                noUsername:false
            });

        }
        if(!this.refs.verifycode.value){
            this.setState({
                noVerifycode:false
            });

        }

        new ApiForgetPwd1Action (this.refs.username.value,this.refs.method.value,this.refs.verifycode.value).fly();
        this.reVerifyCode()

    }

    handleSubmit(e){
        if(!this.refs.userVerifycode.value){
            this.setState({
                noVerifycode2:false
            });
        }
        if(!this.refs.password.value){
            this.setState({
                noPassword:false
            });

        }
        if(!this.refs.password2.value  ){
            this.setState({
                noPassword2:false
            });

        }
        if(this.refs.password.value !== this.refs.password2.value ) {
            this.setState({
                notMatchPswHid: false
            });
        }

        new ApiForgetPwd2Action (this.refs.username.value,this.refs.method.value,this.refs.userVerifycode.value,this.refs.password2.value).fly();
    }

    reVerifyCode(e) {
        new ApiVerifyCodeAction().fly();
    }

    render() {

        return (
            <div id="forgetPassword" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content custom_modal_content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><img
                                src="images/common/xdialog.png?v=1" alt="" className=""/></button>
                            <h4 className="modal-title">忘記密碼</h4>
                        </div>
                        <div className="modal-body fast_booking_content">
                            <form>
                                <div className="row">
                                    <div className="col-xs-12 col-md-12">
                                        <p>用户名 (*必填项)</p>
                                        <input ref="username" type="text" placeholder="6-12位由字母和数字组成"/>
                                        <span className="ml5 red f12" hidden={this.state.noUsername} style={{"color":"red"}}>*此欄不能為空</span>
                                    </div>
                                    <div className="col-xs-12 col-md-12">
                                        <p>取得方式 (*必选项)</p>
                                        <select ref="method" name="forgetPasswordType" id="id_forgetPasswordType">
                                            <option value="EMAIL">邮箱</option>
                                            <option value="PHONE">简讯</option>
                                        </select>
                                    </div>

                                    <div className="col-xs-5 col-md-5">
                                        <p>驗證碼</p>
                                        <input ref="verifycode" type="text"/>
                                        <span className="ml5 red f12" hidden={this.state.noVerifycode} style={{"color":"red"}}>*此欄不能為空</span>
                                    </div>
                                    <div className="col-xs-3 col-md-3">
                                        <br/>
                                        <img  onClick={this.reVerifyCode} src={this.props.verifycode.img} alt=""/>
                                    </div>
                                    <div className="col-xs-3 col-md-3">
                                        <button type="button" onClick={this.handleForgetPassword.bind(this)}>发送验证码</button>
                                    </div>
                                    <div className="chengPassword">
                                        <div className="col-xs-12 col-md-12">
                                            <p>输入验证码</p>
                                            <input type="text" ref="userVerifycode" />
                                            <span className="ml5 red f12" hidden={this.state.noVerifycode2} style={{"color":"red"}}>*此欄不能為空</span>
                                        </div>
                                        <div className="col-xs-12 col-md-12">
                                            <p>密码 (*必填项)</p>
                                            <input ref="password" type="password" placeholder="6-12位由字母和数字组成"/>
                                            <span className="ml5 red f12" hidden={this.state.noPassword} style={{"color":"red"}}>*此欄不能為空</span>
                                        </div>
                                        <div className="col-xs-12 col-md-12">
                                            <p>确认密码 (*必填项)</p>
                                            <input ref="password2" type="password" placeholder="6-12位由字母和数字组成"/>
                                            <span className="ml5 red f12" hidden={this.state.noPassword2} style={{"color":"red"}}>*此欄不能為空</span>
                                            <span className="ml5 red f12" hidden={this.state.notMatchPswHid} style={{"color":"red"}}>*密碼不相符</span>
                                        </div>
                                        <div className="col-xs-12 col-md-12">
                                            <button type="button" onClick={this.handleSubmit.bind(this)}>送出</button>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        verifycode:state.verifycode

    }
);

export default connect(mapStateToProps)(ForgetPasswordPage)