/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import MyDatePicker from '../MyDatePicker';
import {ApiQueryTransferRecordsAction} from "../../../../../../actions/index";
import PageBar from "../PageBar"
import {formatTime} from "../../../../../../../config/config_helper";

class TransferRecordsPage extends Component {
    componentDidMount() {
        this.toPage();
    }
    renderPlatforms() {
        var ret = [];
        for (var i = 0; i < this.props.game.platforms.length; i++) {
            var platform = this.props.game.platforms[i];
            ret.push(
                <option key={i} value={platform.id}>{platform.name}</option>
            );
        }
        return ret;
    }

    renderRecords(){
        var ret = [];
        for (var i= 0; i< this.props.records.rows.length ; i++){
            var log = this.props.records.rows[i];
            ret.push(<tr key={i} className="wager mg">
                    <th  >{log.GameType}</th>
                    <th  >{log.TypeText}</th>
                    <th  >{log.Amount}</th>
                    <th  >{log.StatusText}</th>
                    <th  >{formatTime(log.CreateTime.replace('T',' '))}</th>
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
        new ApiQueryTransferRecordsAction(this.refs.startT.getValue(), this.refs.endT.getValue(), this.refs.platformId.value, pageNo).fly();
    }

    render() {
        return (
            <div>
                <div className="report-filter wraperh-sm">
                    <form className="search-form" onSubmit={this.onQuery.bind(this)}>
                        <select name="com" className="select iblock mr10 member-input" ref="platformId">
                            <option value="">选择游戏类别</option>
                            {this.renderPlatforms()}
                        </select>
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
                        <th className="member-th" >游戏类别</th>
                        <th className="member-th" >操作方式</th>
                        <th className="member-th" >操作金额</th>
                        <th className="member-th" >状态</th>
                        <th className="member-th" >时间</th>
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
        records : state.records.transferRecords
    }
);

export default connect(mapStateToProps, {

})(TransferRecordsPage);