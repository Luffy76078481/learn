/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';
import MyDatePicker from '../../Components/MyDatePicker/MyDatePicker_records';
import {connect} from 'react-redux';
import {ApiQuerySitemsgsAction} from "globalAction";
import BaseRecordsPage from "./BaseRecordsPage";
class MessagePage extends BaseRecordsPage {
  
    renderMsgs() {
        var ret = [];
        for (var i = 0; i < this.props.sitemsg.sitemsgs.rows.length; i++) {
            var msg = this.props.sitemsg.sitemsgs.rows[i];
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
    renderRecords(){
        var ret = [];
        for (var i= 0; i< this.props.sitemsg.sitemsgs.rows.length ; i++){
            var log = this.props.sitemsg.sitemsgs.rows[i];
            ret.push(<tr key={i}>
                    <td >{i}</td>
                    <td >{log.Message}</td>
                    <td >{log.SendTime.replace("T"," ")}</td>
                </tr>
            );
        }
        return ret;
    }
    toPage(pageNo = 0) {
        new ApiQuerySitemsgsAction(this.refs.startT.getValue(), this.refs.endT.getValue(),pageNo).fly();
    }
    renderQuery() {
        return <div>
            <div className="lbl">起止时间：</div>
            <div className="inputhlder"><MyDatePicker placeholder="开始时间" ref="startT"/></div>
            <div className="">-</div>
            <div className="inputhlder"><MyDatePicker placeholder="结束时间" ref="endT"/></div>
        </div>
    }
    renderHeader() {
        return <tr>
            <th>取款单号</th>
            <th>取款金额</th>
            <th>取款状态</th>
            <th>时间</th>
        </tr>;
    }

    // render() {
    //     return (
    //         <div>
    //             <div className="header">消息管理</div>
    //             <div className="maincontent">
    //                 <div className="tabs_holder">
    //                     <div className="tab-content">
    //                         <div className="tab-pane fade in active" style={{padding:"1rem"}}>
    //                             <div className="table-responsive bethistotbl">
    //                                 <table className="table">
    //                                     <thead>
    //                                     <tr>
    //                                         <th width="5%">序</th>
    //                                         <th width="70%">消息内容</th>
    //                                         <th width="25%">发布时间</th>
    //                                     </tr>
    //                                     </thead>
    //                                     <tbody>
    //                                     {this.renderMsgs()}

    //                                     </tbody>
    //                                 </table>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    renderHeader() {
        return  <tr>
        <th width="5%">序</th>
        <th width="70%">消息内容</th>
        <th width="25%">发布时间</th>
    </tr>
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        sitemsg: state.sitemsg,
        records : state.records.myMsgsRecords
    }
);


export default connect(mapStateToProps, {})(MessagePage);