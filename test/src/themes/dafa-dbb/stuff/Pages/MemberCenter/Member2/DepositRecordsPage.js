/**
 * DBB 存款记录
 */

import React from 'react';

import {connect} from 'react-redux';
import MyDatePicker from '../../../../../../global/Components/MyDatePicker/MyDatePicker_records';
import {ApiQueryDepositRecordsAction} from "../../../../../../actions/index";
import BaseRecordsPage from "./BaseRecordsPage";

class DepositRecordsPage extends BaseRecordsPage {
    renderRecords(){
        var ret = [];
        for (var i= 0; i< this.props.records.rows.length ; i++){
            var log = this.props.records.rows[i];
            ret.push(<tr key={i} className="wager mg">
                    <td >{log.OrderNo}</td>
                    <td >{log.TypeText}</td>
                    <td >{log.Amount}</td>
                    <td >{log.StatusText}</td>
                    <td >{log.CreateTime.replace("T"," ")}</td>
                </tr>
            );
        }
        return ret;
    }
    toPage(pageNo = 0) {
        new ApiQueryDepositRecordsAction(this.refs.startT.getValue(), this.refs.endT.getValue(),pageNo).fly();
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
            <th>存款单号</th>
            <th>存款方式</th>
            <th>存款金额</th>
            <th>存款状态</th>
            <th>时间</th>
        </tr>;
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        game : state.game,
        records : state.records.depositRecords
    }
);

export default connect(mapStateToProps, {

})(DepositRecordsPage);