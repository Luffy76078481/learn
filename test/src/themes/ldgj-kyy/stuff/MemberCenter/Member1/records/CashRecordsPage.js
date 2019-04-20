/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import MyDatePicker from '../MyDatePicker';
import {ApiQueryCashRecordsAction} from "../../../../../../actions/index";
import {formatTime} from "../../../../../common/config_helper";


import PageBar from "../PageBar"


class CashRecordsPage extends Component {
    componentDidMount() {
        this.toPage();
    }
    renderGamePlate() {
        var GamePlates = [];
        for (var i = 0; i < this.props.game.platforms.length; i++) {
            var GamePlate = this.props.game.platforms[i];
            GamePlates.push(
                <option key={i} value={GamePlate.id}>{GamePlate.name}</option>
            );
        }
        return GamePlates;
    }

    onCashRecords(event){
        event.preventDefault();
        new ApiQueryCashRecordsAction(this.refs.startT.getValue(),this.refs.endT.getValue(),this.refs.gameId.value,this.props.cashRecords.pageNo).fly();
    }

    renderCashRecordList(){
        var CashRecordLists = [];
        for (var i= 0; i< this.props.cashRecords.rows.length ; i++){
            var CashRecordList = this.props.cashRecords.rows[i];
            CashRecordLists.push(<tr key={i} className="wager mg">
                    <td >{CashRecordList.username}</td>
                    <td ></td>
                    <td ></td>
                    <td ></td>
                    <td ></td>
                    <td ></td>
                </tr>
            );
        }
        return CashRecordLists;
    }

    toPage(pageNo = 1){
        new ApiQueryCashRecordsAction(this.refs.startT.getValue(),this.refs.endT.getValue(),pageNo).fly();
    }

    render() {

        const GamePlate = this.renderGamePlate();
        const CashRecordList = this.renderCashRecordList();

        return (
            <div>
                <div className="report-filter wraperh-sm">
                    <form className="search-form" onSubmit={this.onCashRecords.bind(this)}>
                        <select name="com" id="id_com" className="select iblock mr10" ref="gameId">
                            <option value="">选择游戏类别</option>
                            {GamePlate}
                        </select>
                        <div className="date-select input iblock k mr10 datelist" id="date">
                            <MyDatePicker ref="startT"></MyDatePicker>
                        </div>
                        <span className="mr10">至</span>
                        <div className="date-select input iblock mr10 datelist" id="date">
                            <MyDatePicker ref="endT"></MyDatePicker>
                        </div>
                        {/*<input type="button" className="btn-mid search-btn" value="提交" />*/}
                        <button type="submit" className="btn-mid search-btn btn-type">提交</button>
                    </form>
                </div>
                <table className="table-msg table-border f14 tc" width="100%">
                    <thead>
                    <tr>
                        <th>用户名</th>
                        <th>金额</th>
                        <th>类别</th>
                        <th>状态</th>
                        <th>操作时间</th>
                        <th>交易码</th>
                    </tr>
                    </thead>
                    <tbody id="maindata">
                    {CashRecordList}
                        <tr>
                            <td colSpan="6" className="tc">很抱歉，没有您查找的记录。</td>
                        </tr>
                    </tbody>
                </table>
                <PageBar page={this.props.cashRecords} toPage={this.toPage.bind(this)}/>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        game : state.game,
        cashRecords : state.cashRecords
    }
);

export default connect(mapStateToProps, {

})(CashRecordsPage);