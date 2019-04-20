/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';

import {connect} from 'react-redux';

class PersonInfoPage extends Component {
    render() {
        const options = window.r.props('MemberCenterRouter');

        return (
            <div className="c">
                <form action="#">
                    <table className="ht-fktable f14" width="100%">
                        <tbody><tr>
                            <td width="35%" className="tr">用户名：</td>
                            <td width="65%">
                                <input type="text" className="input w238 member-input" disabled="disabled" value={this.props.user.username} />
                            </td>
                        </tr>
                        <tr>
                            <td width="35%" className="tr">真实姓名：</td>
                            <td width="65%">
                                <input type="text" className="input w238 member-input" disabled="disabled" value={this.props.user.realName} />
                            </td>
                        </tr>
                        {!options.hideUserInfo?
                        <tr>
                            <td width="35%" className="tr">手机号码：</td>
                            <td width="65%">
                                <input type="text" className="input w238 member-input" disabled="disabled" value={this.props.user.phone} />
                            </td>
                        </tr>:null}
                        {!options.hideUserInfo?
                        <tr>
                            <td width="35%" className="tr">电子邮件：</td>
                            <td width="65%">
                                <input type="text" className="input w238 member-input" disabled="disabled" value={this.props.user.email} />
                            </td>
                        </tr>:null}
                        {!options.hideUserInfo?
                        <tr>
                            <td width="35%" className="tr">QQ号码：</td>
                            <td width="65%">
                                <input type="text" className="input w238 member-input" disabled="disabled" value={this.props.user.qq} />
                            </td>
                        </tr>:null}
                        </tbody></table>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user
    }
);

export default connect(mapStateToProps, {})(PersonInfoPage);