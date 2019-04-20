    /**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';

import {connect} from 'react-redux';
import {ApiChangePwdAction} from "../../../../../actions/index";


class ChangePwdPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notMatchPswHid:true,
            old_password:true
        };
    }

    onChangePsw(event){
        event.preventDefault();
        if(!this.refs.old_psw.value){
            this.setState({
                old_password:false
            });
            return;
        }
        if(this.refs.new_psw.value !== this.refs.confirm_psw.value){
            this.setState({
                notMatchPswHid:false
            });
            return;
        }

        new ApiChangePwdAction(this.refs.old_psw.value,this.refs.new_psw.value).fly();
    }

    render() {
        return (
            <div className="c">
                <form onSubmit={this.onChangePsw.bind(this)}>
                    <table className="ht-fktable f14" width="100%">
                        <tbody><tr>
                            <td width="35%" className="tr">旧密码：</td>
                            <td width="65%">
                                <input type="password" className="input w238 member-input" placeholder="请输入您现在的密码" name="old_password" ref="old_psw" required="required" />
                                <span className="ml5 red f12" hidden={this.state.old_password}>*此栏不能為空</span>
                            </td>
                        </tr>
                        <tr>
                            <td width="35%" className="tr">新密码：</td>
                            <td width="65%">
                                <input type="password" className="input w238 member-input" placeholder="请输入新的密码" name="fr_new_password" ref="new_psw" required="required" />
                            </td>
                        </tr>
                        <tr>
                            <td width="35%" className="tr">确认新密码：</td>
                            <td width="65%">
                                <input type="password" className="input w238 member-input" placeholder="请重新输入新的密码" name="fr_confirm_password" ref="confirm_psw" required="required" />
                                <span className="ml5 red f12" hidden={this.state.notMatchPswHid}>*密码不相符</span>
                            </td>
                        </tr>
                        <tr>
                            <td width="35%" className="tr">&nbsp;</td>
                            <td width="65%">
                                <button type="submit" className="htbtnlg w260 t20 btn-type">确认并提交</button>
                            </td>
                        </tr>
                        </tbody></table>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {}
);

export default connect(mapStateToProps, {})(ChangePwdPage);