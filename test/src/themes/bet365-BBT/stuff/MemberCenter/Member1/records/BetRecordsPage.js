/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import MyDatePicker from '../MyDatePicker';
import {ApiQueryBetRecordsAction} from "../../../../../../actions/index";
import PageBar from "../PageBar"
import {formatTime} from "../../../../../../../config/config_helper";

class BetRecordsPage extends Component {
    componentDidMount() {
        this.toPage();
    }

    renderPlatforms() {
        var ret = [];
        for (var i = 0; i < this.props.game.platforms.length; i++) {
            var platform = this.props.game.platforms[i];
            ret.push(
                <option key={i} value={platform.ID}>{platform.Name2}</option>
            );
        }
        return ret;
    }

    renderRecords(){
        var ret = [];
       
        for (var i= 0; i< this.props.records.rows.length ; i++){
            var log = this.props.records.rows[i];
           
            if(i==this.props.records.rows.length-1){
                ret.push(<tr key={i} className="wager mg">
                        <td >搜寻结果总计</td>
                        <td ></td>
                        <td >{log.Bet}</td>
                        <td >{log.RealBet}</td>
                        <td >{log.PayOut}</td>
                        <td ></td>
                    </tr>
                );
                return ret;
            }
            ret.push(<tr key={i} className="wager mg">
                    <td >{log.OrderNumber}</td>
                    <td >{log.GamePlatform}</td>
                    <td >{log.Bet}</td>
                    <td >{log.RealBet}</td>
                    <td >{log.PayOut}</td>
                    <td >{formatTime(log.CreateTimeDateText+' '+log.CreateTimeTimeText)}</td>
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
        
        new ApiQueryBetRecordsAction(this.refs.startT.getValue(), this.refs.endT.getValue(), this.refs.platformId.value, pageNo).fly();
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
                        <th className="member-th" >单号</th>
                        <th className="member-th" >游戏类别</th>
                        <th className="member-th" >投注额</th>
                        <th className="member-th" >有效投注</th>
                        <th className="member-th" >派彩</th>
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
        records : state.records.betRecords
    }
);

export default connect(mapStateToProps, {

})(BetRecordsPage);