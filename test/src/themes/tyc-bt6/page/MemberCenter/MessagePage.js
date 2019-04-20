/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';

class MessagePage extends Component {
    componentDidMount() {
        new window.actions.ApiQuerySitemsgsAction().fly();
    }
    nextP() {
        if (this.props.records.pageNo == this.props.records.totalPage) {
            return null;
        }
        this.toPage(this.props.records.pageNo + 1);
    }

    preP() {
        if (this.props.records.pageNo <= 1) {
            return null;
        }
        this.toPage(this.props.records.pageNo - 1);
    }
    toPage(pageNo = 0) {
        new window.actions.ApiQuerySitemsgsAction("","",pageNo).fly();
    }
    renderPage() {
        var ret = [];
        var invalidTag = false;
        for (var i = 1; i <= this.props.records.totalPage; i++) {
            if (i !== 1 && i !== this.props.records.totalPage && Math.abs(this.props.records.pageNo - i) >= 3) {
                invalidTag = true;
                continue;
            }
            if (invalidTag) {
                ret.push(
                    <li key={"_" + i}><a href="javascript:void(0)">...</a></li>
                )
                invalidTag = false;
            }
            ret.push(
                <li key={i}><a onClick={this.toPage.bind(this, i-1)}
                               className={(i-1) === this.props.records.pageNo ? "active" : ""} href="javascript:void(0)">{i}</a>
                </li>
            )
        }
        return ret;
    }

    renderMsgs() {
        var ret = [];
        for (var i = 0; i < this.props.records.rows.length; i++) {
            var msg = this.props.records.rows[i];
            ret.push(<tr key={i}>
                <td>{i + 1}</td>
                <td>{msg.Message}</td>
                <td>{msg.SendTime.replace("T"," ")}</td>
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

            <div  className="reportWrapper">

                 <h2 className="title">消息中心</h2>

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
                <div className="tblbottom">

                    <div className="float_left">从<span>{this.props.records.startRowIndex}</span>到<span>
                        {this.props.records.endRowIndex}</span>条记录, 总计
                        <span>{this.props.records.total}</span>条记录.
                    </div>
                    <ul className="custpagination float_right">
                        <li><a href="javascript:void(0)" onClick={this.preP.bind(this)}>上一页</a></li>
                        {this.renderPage()}
                        <li><a href="javascript:void(0)" onClick={this.nextP.bind(this)}>下一页</a></li>
                    </ul>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        records: state.records.myMsgsRecords
    }
);


export default connect(mapStateToProps, {})(MessagePage);