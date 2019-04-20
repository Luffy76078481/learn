/**
 * Created by xm on 2017/5/8.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import { Link } from 'react-router';
import {ApiAllSysConfigAction} from "../../../../../../actions/index";


class PersonCenterPage extends Component {
    constructor(){
        super();
        this.state = {
            allow_edit_pay_pwd: false
        }
    }
    componentDidMount(){
        new ApiAllSysConfigAction("allow_edit_pay_pwd").fly(resp => {
            if(resp.status == 0 && (resp.content == true || resp.content == "true")){
                this.setState({allow_edit_pay_pwd: true});
            }
        }, "allow_edit_pay_pwd");
    }
    render() {
        return (
            <div className="divc w1000" style={{paddingBottom: "20px"}}>
                <div className="clearfix t20 member-content">
                    <div className="border p20 ht-jinggao clearfix">
                        <div className="fl jgico htico"></div>
                        <div className="fl info f14"><p>保护您的信息安全是我们义不容辞的责任，我们将杜绝向任何单位/个人透露您的个人信息，同时请您妥善保管。</p>
                            <p>温馨提示：会员账户信息是您重要的个人信息，是您资金安全的重要保障。为了保障您个人信息的安全，我们禁止在线修改您的个人信息，如您需要修改请联系在线客服。谢谢配合！</p>
                        </div>
                    </div>
                </div>
                <div className="clearfix t20 ht-cunkuan deposit member-content">
                    <div className="t tc f14">
                        <Link to="/person" className={this.props.location.pathname === '/person'?'iblock on':'iblock'}>个人资料</Link>
                        <Link to="/person_change_pwd" className={this.props.location.pathname === '/person_change_pwd'?'iblock on':'iblock'}>修改密码</Link>
                        {this.state.allow_edit_pay_pwd ? <Link to="/person_change_pay_pwd" className={this.props.location.pathname === '/person_change_pay_pwd'?'iblock on':'iblock'}>修改取款密码</Link> : null}
                        <Link to="/person_bind_card" className={this.props.location.pathname === '/person_bind_card'?'iblock on':'iblock'}>绑定银行卡</Link>

                        {/*<a href="ptpassword.html" className="iblock ">同步PT密码</a>*/}
                        {/*<a href="abpassword.html" className="iblock ">同步AB密码</a>*/}
                    </div>
                    <div className="">
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {}
);

export default connect(mapStateToProps, {})(PersonCenterPage);
