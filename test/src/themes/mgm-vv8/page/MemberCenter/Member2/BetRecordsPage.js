/**
 *
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import MyDatePicker from '../../../../../global/Components/MyDatePicker/MyDatePicker_records';
import {ApiQueryBetRecordsAction} from "globalAction";
import BaseRecordsPage from "./BaseRecordsPage";

class BetRecordsPage extends BaseRecordsPage {
    renderPlatforms() {
        var ret = [];
        for (var i = 0; i < this.props.game.platforms.length; i++) {
            var platform = this.props.game.platforms[i];
            if(platform.Name == "YOPLAY")
            continue;
            ret.push(
                <option key={i} value={platform.ID}>{platform.Name}</option>
            );
        }
        return ret;
    }

    renderRecords() {
        var ret = [];
        for (var i = 0; i < this.props.records.rows.length; i++) {
            var log = this.props.records.rows[i];
            ret.push(<tr key={i} className="wager mg">
                    <td >{log.OrderNumber}</td>
                    <td >{log.GamePlatform}</td>
                    <td >{log.Bet}</td>
                    <td >{log.RealBet}</td>
                    <td >{log.PayOut}</td>
                    <td >{window.Util.formatNetTime(log.CreateTime)}</td>
                </tr>
            );
        }
        return ret;
    }

    toPage(pageNo = 0) {
        new ApiQueryBetRecordsAction(this.refs.startT.getValue(),
            this.refs.endT.getValue(), this.refs.platformId.value, pageNo).fly();
    }

    renderQuery() {
        return <div>
            <div className="lbl selctlabl ">状态：</div>
            <div>
                <select className="form-control" ref="platformId">
                    <option value="">选择游戏类别</option>
                    {this.renderPlatforms()}
                </select>
            </div>
            <div className="lbl" style={{marginLeft: "1rem"}}>起止时间：</div>
            <div className="inputhlder">
            
                    <MyDatePicker placeholder="开始时间" ref="startT"/>
      
            </div>
            <div className="">-</div>
            <div className="inputhlder">
         
                    <MyDatePicker placeholder="结束时间" ref="endT"/>
                
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