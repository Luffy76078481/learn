/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import MyDatePicker from '../../../../global/Components/MyDatePicker/MyDatePicker_records';
import {ApiQueryTransferRecordsAction} from "../../../../actions/index";
import BaseRecordsComponent from "./BaseRecordsComponent";

class TransferRecordsComponent extends BaseRecordsComponent {
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

    renderRecords(){
        var ret = [];
        for (var i= 0; i< this.props.records.rows.length ; i++){
            var log = this.props.records.rows[i];
            ret.push(<tr key={i}>
                    <td>{log.GameType}</td>
                    <td>{log.TypeText}</td>
                    <td>{log.Amount}</td>
                    <td>{log.StatusText}</td>
                    <td>{log.CreateTime.replace("T"," ")}</td>
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
            <div className="form-group">
                <label>
                    转账平台
                </label>
                <span>
                        <select className="form-control" ref="platformId">
                            <option value="">选择转账平台</option>
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

})(TransferRecordsComponent);