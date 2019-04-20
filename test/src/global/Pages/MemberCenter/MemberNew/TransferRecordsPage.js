/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import MyDatePicker from '../../../Components/MyDatepicker/MyDatePicker_records';
import {ApiQueryTransferRecordsAction} from "globalAction";
import BaseRecordsPage from "./BaseRecordsPage";

class TransferRecordsPage extends BaseRecordsPage {
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

    renderRecords(){
        var ret = [];
        for (var i= 0; i< this.props.records.rows.length ; i++){
            var log = this.props.records.rows[i];
            ret.push(<tr key={i}>
                <td>{log.GameType}</td>
                <td>{log.TypeText}</td>
                <td>{log.Amount}</td>
                <td>{log.StatusText}</td>
                <td>{window.Util.formatNetTime(log.CreateTime)}</td>
                </tr>
            );
        }
        return ret;
    }

    toPage(pageNo = 0) {
        new ApiQueryTransferRecordsAction(this.refs.startT.getValue(), this.refs.endT.getValue(), this.refs.platformId.value, pageNo).fly();
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
            <div className="inputhlder"><MyDatePicker placeholder="开始时间" ref="startT"/></div>
            <div className="">-</div>
            <div className="inputhlder"><MyDatePicker placeholder="结束时间" ref="endT"/></div>
        </div>;
    }
    renderHeader() {
        return <tr>
            <th>游戏类别</th>
            <th>操作方式</th>
            <th>操作金额</th>
            <th>状态</th>
            <th>时间</th>
        </tr>
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