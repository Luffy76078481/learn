/**
 * Created by xm on 2017/6/30.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';

import "./scss/index.scss";

class MemberFrame extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        window.$("#root").attr("class", "usefulcss");
    }
    activeCls() {
        for (var i = 0; i < arguments.length; i++) {
            var name = arguments[i];
            if (this.props.location.pathname === name) {
                return "active sub2";
            }
        }
        return "sub2";
    }
    render() {
        const options = window.r.props("MemberCenterRouter");
        return (
            <div className="member2">
            <div className="cust_container">
                <div className="leftside float_left">
                    <div className="header">个人中心</div>
                    <ul className="cust_nav">
                        <li className={this.activeCls("/member")}><Link to="/member"><i className="fa fa-user" aria-hidden="true"></i> 账户概况</Link>
                        </li>
                        <li className={this.activeCls("/deposit","/withdraw","/transfer")}><Link to="/deposit" className=""><i className="fa fa-money" aria-hidden="true"></i> 资金管理</Link>
                            <ul>
                                <li className="sub"><Link to="/deposit" className={this.activeCls("/deposit")}>存款</Link></li>
                                <li className="sub"><Link to="/withdraw" className={this.activeCls("/withdraw")}>取款</Link></li>
                                <li className="sub"><Link to="/transfer" className={this.activeCls("/transfer")}>游戏转帐</Link></li>
                            </ul>
                        </li>
                        <li className={this.activeCls("/person_change_pwd","/person_change_pay_pwd","/person_bind_card")}><Link to="/person_change_pwd" className=""><i className="fa fa-shield" aria-hidden="true"></i> 安全设置</Link>
                            <ul>
                                <li className="sub"><Link to="/person_change_pwd" className={this.activeCls("/person_change_pwd")}>登录密码</Link></li>
                                {this.props.all_sys_cfg.allow_edit_pay_pwd == "true"?
                                     <li className="sub"><Link to="/person_change_pay_pwd" className={this.activeCls("/person_change_pay_pwd")}>取款密码</Link></li>
                                :null}
                                <li className="sub"><Link to="/person_bind_card" className={this.activeCls("/person_bind_card")}>银行卡</Link></li>
                            </ul>
                        </li>
                        <li className={this.activeCls("/records","/records_deposit","/records_withdraw","/records_transfer")}><Link to="/records" className=""><i className="fa fa-clock-o" aria-hidden="true"></i> 历史记录</Link>
                            <ul>
                                <li className="sub"><Link to="/records" className={this.activeCls("/records")}>投注记录</Link></li>
                                <li className="sub"><Link to="/records_deposit" className={this.activeCls("/records_deposit")}>充值记录</Link></li>
                                <li className="sub"><Link to="/records_withdraw" className={this.activeCls("/records_withdraw")}>提款记录</Link></li>
                                <li className="sub"><Link to="/records_transfer" className={this.activeCls("/records_transfer")}>转账记录</Link></li>
                            </ul>
                        </li>
                        {!options.msgNum?
                        <li className={this.activeCls("/message")}><Link to="/message" className=""><i className="fa fa-envelope-o " aria-hidden="true"></i> 消息管理 </Link></li>
                        :<li className={this.activeCls("/message")} style={{paddingLeft:"25px"}}><Link to="/message" className=""><i className="fa fa-envelope-o " aria-hidden="true"></i> 消息管理 <span>({this.props.sitemsg.unread})</span></Link></li>}

                    </ul>
                </div>
                <div className="rightside float_right">
                    {this.props.children}
                </div>
            </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        login: state.login,
        sitemsg: state.sitemsg,
        global:state.global,
        remoteSysConfs:state.remoteSysConfs,
        all_sys_cfg:state.remoteSysConfs
    }
);

export default connect(mapStateToProps) (MemberFrame);