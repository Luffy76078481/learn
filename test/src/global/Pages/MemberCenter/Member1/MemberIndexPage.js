/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import {ApiLoginLogsAction,ApiQuerySitemsgsAction} from "../../../../actions/index";
import GamePlatforms from './GamePlatforms';

class MemberIndexPage extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        new ApiLoginLogsAction().fly();
        new ApiQuerySitemsgsAction().fly();
    }
    renderLogs() {
        var logs = [];
        for (var i = 0; i < this.props.login.logs.length; i++) {
            var log = this.props.login.logs[i];
 
            logs.push(<li key={i}>
                <i className="htico dlsj"></i>
                <span>登录时间：{log.CreateTimeText}</span>
                <span>登录IP：{log.Ip}</span>
            </li>);
        }
        return logs;
    }
    renderMsgs(){
        var msgs = [];
        var length = this.props.sitemsgs.rows.length;
        if(length == 0){
            msgs.push(
                <li className="ellipsis" key={1}>
                    <Link to="/message">
                        沒有任何消息
                    </Link>
                </li>
            );
        }
        for (let i = 0; i < length ; i++){
            msgs.push(
                <li className="ellipsis" key={i}>
                    <Link to="/message">
                        {this.props.sitemsgs.rows[i].Message}
                    </Link>
                </li>
            );
        }
        return msgs;
    }
    render() {
        const logs = this.renderLogs();
        return (

            <div className="clearfix t20 member-content  ">
                <div className="f-l p-l-0 col-md-7 p-r-15">
                    <div className="border p5">
                        <div className="clearfix bbd hyn member-border-bottom" style={{width:"466px"}}>
                            <i className="ico hyi fl"></i>
                            <div className="fl info">
                                <p className="f20 member-text-color">
                                    尊敬的会员
                                    <span className="huang wraperl-xs">{this.props.user.username}</span>
                                    您好！
                                </p>
                                <p className="qhui">您是第{this.props.login.loginCount}次在我站登陆</p>
                            </div>
                        </div>
                        <div className="p10">
                            <p className="f14 member-text-color">
                                以下是您近{logs.length}次登录信息，如发现异常，请及时
                                <Link to="/person_change_pwd" className="huang ml5">修改密码</Link>
                            </p>
                            <ul className="logininfo">
                                {logs}

                            </ul>
                        </div>
                    </div>
                    <div className="border p5 t20 xxzx" style={{width:"466px"}}>
                        <div className="clearfix bbd t member-border-bottom">
                            <p className="f20 member-text-color">
                                消息中心
                                <Link to="/message"  className="huang wraperl-xs">{this.props.sitemsgs.rows.length}</Link>
                                条
                            </p>
                        </div>
                        <div className="p10">
                            <ul className="xxlist">
                                {this.renderMsgs()}
                            </ul>
                        </div>
                    </div>
                </div>
                <GamePlatforms/>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        game:state.game,
        login: state.login,
        sitemsgs:state.sitemsg.sitemsgs
    }
);



export default connect(mapStateToProps, {

})(MemberIndexPage);