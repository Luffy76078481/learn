/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import MyDatePicker from '../MyDatePicker';
import {ApiQueryWithdrawRecordsAction} from "../../../../../actions/index";
import PageBar from "../PageBar";
import {formatTime} from "../../../../../../config/config_helper";


class WithdrawRecordsPage extends Component {
    componentDidMount() {
        this.toPage();
    }
    renderRecords(){
        var ret = [];
        for (var i= 0; i< this.props.records.rows.length ; i++){
            var log = this.props.records.rows[i];
            ret.push(<tr key={i} className="wager mg">
                    <td >{log.OrderNo}</td>
                    <td >{log.Amount}</td>
                    <td >{log.StatusText}</td>
                    <td >{formatTime(log.CreateTime.replace("T",' '))}</td>
                </tr>
            );
        }
        return ret;
    }

    onQuery(event){
        event.preventDefault();
        this.toPage(0);
    }

    toPage(pageNo = 0) {
        new ApiQueryWithdrawRecordsAction(this.refs.startT.getValue(), this.refs.endT.getValue(),pageNo).fly();
    }

    render() {
        return (
            <div>
               <div className="report-filter wraperh-sm">
                    <form className="search-form" onSubmit={this.onQuery.bind(this)}>
                        <div className="date-select input iblock k mr10 datelist member-input">
                            <MyDatePicker ref="startT"></MyDatePicker>
                        </div>
                        <span className="mr10">至</span>
                        <div className="date-select input iblock mr10 datelist member-input">
                            <MyDatePicker ref="endT"></MyDatePicker>
                        </div>
                        <button type="submit" className="btn-mid search-btn btn-type">提交</button>
                    </form>
                </div>
                <table className="table-msg table-border f14 tc" width="100%">
                    <thead>
                    <tr className="wager all">
                        <th className="member-th">取款单号</th>
                        <th className="member-th">取款金额</th>
                        <th className="member-th">取款状态</th>
                        <th className="member-th">时间</th>
                    </tr>
                    </thead>
                    <tbody id="maindata">
                    {this.renderRecords()}
                    </tbody>
                </table>
                <PageBar page={this.props.records} toPage={this.toPage.bind(this)}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        game : state.game,
        records : state.records.withdrawRecords
    }
);

export default connect(mapStateToProps, {

})(WithdrawRecordsPage);