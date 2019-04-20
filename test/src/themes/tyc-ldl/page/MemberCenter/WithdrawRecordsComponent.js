/**
 * Created by jamen on 2017/4/30.
 */

import React from 'react';

import {connect} from 'react-redux';
import MyDatePicker from '../../../../global/Components/MyDatePicker/MyDatePicker_records';
import {ApiQueryWithdrawRecordsAction} from "globalAction";
import BaseRecordsComponent from "./BaseRecordsComponent";

class WithdrawRecordsComponent extends BaseRecordsComponent {

    renderRecords(){
        var ret = [];
        for (var i= 0; i< this.props.records.rows.length ; i++){
            var log = this.props.records.rows[i];
            ret.push(<tr key={i}>
                    <td >{log.OrderNo}</td>
                    <td >{log.Amount}</td>
                    <td >{log.StatusText}</td>
                    <td >{log.CreateTime.replace("T"," ")}</td>
                </tr>
            );
        }
        return ret;
    }
    toPage(pageNo = 0) {
        new ApiQueryWithdrawRecordsAction(this.refs.startT.getValue(), this.refs.endT.getValue(),pageNo).fly();
    }
    renderQuery() {
        return <div>
            <div className="form-group">
                <label>
                    开始日期
                </label>
                <span>
                    <MyDatePicker placeholder="开始时间" ref="startT"/>
                 </span>
            </div>
            <div className="form-group">
                <label>
                    结束日期
                </label>
                <span>
                   <MyDatePicker placeholder="结束时间" ref="endT"/>
                 </span>
            </div>
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
}

const mapStateToProps = (state, ownProps) => (
    {
        game : state.game,
        records : state.records.withdrawRecords
    }
);

export default connect(mapStateToProps, {

})(WithdrawRecordsComponent);