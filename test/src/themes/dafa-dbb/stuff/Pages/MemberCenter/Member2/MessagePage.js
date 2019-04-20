/**
 * DBB - 消息记录
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ApiQuerySitemsgsAction} from "globalAction";

class MessagePage extends Component {
    componentDidMount() {
        // 站内信信息
        new ApiQuerySitemsgsAction().fly();
    }
    renderMsgs() {
        var ret = [];
        for (var i = 0; i < this.props.sitemsg.sitemsgs.rows.length; i++) {
            var log = this.props.sitemsg.sitemsgs.rows[i];
            ret.push(<tr key={i}>
                    <td >{i+1}</td>
                    <td >{log.Message}</td>
                    <td >{log.SendTime.replace("T"," ")}</td>
            </tr>);
        }
        if (ret.length === 0) {
            ret.push(<tr key="no_msg">
                <td colSpan="3">很抱歉，没有您查找的记录.</td>
            </tr>);
        }
        return ret;
    }
    render() {
        return (
            <div>
                <div className="header">消息管理</div>
                <div className="maincontent">
                    <div className="tabs_holder">
                        <div className="tab-content">
                            <div className="tab-pane fade in active" style={{padding:"1rem"}}>
                                <div className="table-responsive bethistotbl">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th width="5%">序</th>
                                            <th width="70%">消息内容</th>
                                            <th width="25%">发布时间</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.renderMsgs()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        sitemsg: state.sitemsg
    }
);


export default connect(mapStateToProps, {})(MessagePage);