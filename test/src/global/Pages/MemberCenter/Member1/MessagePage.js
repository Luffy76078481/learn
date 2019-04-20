/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import {ApiQuerySitemsgsAction} from "../../../../actions/index";
import PageBar from "./PageBar"

class MessagePage extends Component {
    componentDidMount() {
        new ApiQuerySitemsgsAction().fly();
    }

    renderMsgs() {
        var ret = [];
        for (var i = 0; i < this.props.sitemsgs.rows.length; i++) {
            var msg = this.props.sitemsgs.rows[i];
            ret.push(<tr key={i}><td className="tc">{i+1}</td><td className="tc">{msg.Message}</td><td className="tc">{msg.SendTime}</td></tr>);
        }
        if (ret.length === 0) {
            ret.push(<tr key="no_msg">
                <td className="tc member-border" colSpan="3">很抱歉，没有您查找的记录.</td>
            </tr>);
        }
        return ret;
    }

    toPage(pageNo = 1) {
        new ApiQuerySitemsgsAction(pageNo).fly();
    }

    render() {
        return (
            <div className="clearfix t20 member-content">
                <table className="table-msg table-border f14 member-border">
                    <thead>
                    <tr>
                        <th width="5%" className="tc member-th">序</th>
                        <th width="70%" className="tc member-th">消息内容</th>
                        <th width="25%" className="tc member-th">发布时间</th>
                    </tr>
                    </thead>
                    <tbody id="member_message">
                    {this.renderMsgs()}
                    </tbody>
                </table>
                <PageBar toPage={this.toPage.bind(this)} page={this.props.sitemsgs}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        sitemsgs:state.sitemsg.sitemsgs
    }
);



export default connect(mapStateToProps, {

})(MessagePage);