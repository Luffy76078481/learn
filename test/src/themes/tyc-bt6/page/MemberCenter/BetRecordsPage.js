/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import MyDatePicker from '../../../../global/Components/MyDatePicker/MyDatePicker_records';
import {ApiQueryBetRecordsAction} from "../../../../actions/index";
import BaseRecordsComponent from "./BaseRecordsComponent";

class BetRecordsPage extends BaseRecordsComponent {
    renderPlatforms() {
        var ret = [];
      
        for (var i = 0; i < this.props.game.platforms.length; i++) {
            var platform = this.props.game.platforms[i];
            if(platform.Name == "YOPLAY")
            continue;
            ret.push(
                <option key={i} value={platform.Id}>{platform.Name}</option>
            );
        }
        return ret;
    }

    renderRecords() {
        var ret = [];
        for (var i = 0; i < this.props.records.rows.length; i++) {
            var log = this.props.records.rows[i];
            if(i==this.props.records.rows.length-1){
                ret.push(<tr key={i}>
                        <td colSpan={2}>搜寻结果总计</td>
                        <td >{log.Bet}</td>
                        <td >{log.RealBet}</td>
                        <td >{log.PayOut}</td>
                        <td ></td>
                    </tr>
                );
                return ret;
            }
            ret.push(<tr key={i}>
                    <td >{log.OrderNumber}</td>
                    <td >{log.GamePlatform}</td>
                    <td >{log.Bet}</td>
                    <td >{log.RealBet}</td>
                    <td >{log.PayOut}</td>
                    <td >{log.CreateTimeDateText +" "+ log.CreateTimeTimeText}</td>
                </tr>
            );
        }
        return ret;
    }

    toPage(pageNo = 0) {
        new ApiQueryBetRecordsAction(this.refs.startT.getValue(), this.refs.endT.getValue(), this.refs.platformId.value, pageNo).fly();
    }

    renderQuery() {
        return <div>
            <div className="form-group">
                <label>
                    游戏类别
                </label>
                <span>
                     <select className="form-control" ref="platformId">
                            <option value="">选择游戏类别</option>
                         {this.renderPlatforms()}
                        </select>
                </span>
            </div>
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
        </div>;
    }
    renderHeader() {
        return <tr>
            <th>单号</th>
            <th>游戏类别</th>
            <th>投注额</th>
            <th>有效投注</th>
            <th>派彩</th>
            <th>时间</th>
        </tr>;
    }

}

const mapStateToProps = (state, ownProps) => (
    {
        game: state.game,
        records: state.records.betRecords
    }
);

export default connect(mapStateToProps, {})(BetRecordsPage);