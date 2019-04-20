/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import {ApiGamePlatformsAction,
    ApiPlayerInfoAction,
    ApiGamePlatformsBalanceAction,
    ApiGamePlatformAllBalanceAction,
    ApiTransferAction} from "globalAction";
import GamePlatforms from "./GamePlatforms";

class TransferPage extends Component {
    constructor(props) {
        super(props);
        this.reload();
        this.submitState = true;//防止多次提交
        this.state = {from:"main", to:"main"};
        new ApiGamePlatformsAction().fly(); 
          new ApiGamePlatformAllBalanceAction().fly();
    }
 
    reload(platformsId) {
        new ApiPlayerInfoAction().fly();
        new ApiGamePlatformsBalanceAction().fly(platformsId);
    }
    getBalance(id) {
        var ret = 0;
        if (id === "main") {
            ret = this.props.user.amount || 0;
        } else {
            for (var i = 0; i < this.props.game.platforms.length; i++) {
                var p = this.props.game.platforms[i];
                if (p.ID === id) {
                    ret = p.Balance || 0;
                    break;
                }
            }
        }
        return Math.floor(ret);
    }
    onChangeFromOrTo() {
        this.setState({from:this.refs.from.value, to:this.refs.to.value});
    }
    onChange() {
        var v = this.refs.from.value;
        this.refs.from.value = this.refs.to.value;
        this.refs.to.value = v;
        this.onChangeFromOrTo();
    }
    onSubmit(e) {
        e.preventDefault();
        if(!this.submitState) return;
        var from = this.refs.from.value;
        var to = this.refs.to.value;
        if (!from || !to) {
            window.swal("错误", "转入转出项必须填写", "error");
            return;
        }
        if (from == to) {
            window.swal("错误", "转入转出项不能相同", "error");
            return;
        }
        var fromBalance = this.getBalance(this.state.from);
        if (fromBalance <= 0) {
            window.swal("错误", "转出项可用金额必须大于0", "error");
            return;
        }
        if (!this.refs.amount.value || this.refs.amount.value > fromBalance) {
            window.swal("错误", "输入金额必须大于0并且小于转出可用金额");
            return;
        }
        this.submitState = false;
        var next = (platformsId)=>{
            if (this.refs.to.value !== "main") {
                new ApiTransferAction (this.refs.to.value, "in", this.refs.amount.value).fly((resp)=>{
                    if (resp.StatusCode === 0) {
                        this.reload([to,platformsId]);
                    }
                    this.submitState = true;
                });
            } else {
                this.reload(platformsId);
                this.submitState = true;
            }
        }
        if (this.state.from !== "main") {
            new ApiTransferAction (this.refs.from.value, "out", this.refs.amount.value).fly((resp)=>{
                if (resp.StatusCode === 0) {
                    next(from);
                }
            });
        } else {
            next();
        }
    }
    renderPlatformSelect() {
        var ret = [];
        ret.push(<option key="main" value="main">主帐户</option>);
        for (var i = 0; i < this.props.game.platforms.length; i++) {
            var platform = this.props.game.platforms[i];
            if(platform.Name == "YOPLAY")
            continue;
            ret.push(<option key={i} value={platform.ID}>{platform.Name}</option>)
        }
        return ret;
    }
    render() {
        return (
            <div>
                <div className="header">游戏转帐</div>
                <div className="maincontent security_pg gametrans">
                    <GamePlatforms/>
                    <div className="clearfix"></div>
                    <div className="divider"></div>
                    <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="forms">
                        <div className="changehlder"><img onClick={this.onChange.bind(this)} className="change" alt=""/></div>
                        <div className="hlder">
                            <div className="lbl">转出：</div>
                            <div className="custinput">
                                <select ref="from" onChange={this.onChangeFromOrTo.bind(this)}>
                                    {this.renderPlatformSelect()}
                                </select>
                            </div>
                        </div>
                        <div className="seclbl">可转余额：{this.getBalance(this.state.from)}</div>
                        <div className="hlder">
                            <div className="lbl">转入：</div>
                            <div className="custinput">
                                <select ref="to" onChange={this.onChangeFromOrTo.bind(this)}>
                                    {this.renderPlatformSelect()}
                                </select>
                            </div>
                        </div>
                        <div className="seclbl">剩余金额：{this.getBalance(this.state.to)}</div>
                        <div className="hlder">
                            <div className="lbl">转账金额：</div>
                            <div className="custinput"><input ref="amount" type="number" placeholder="请输入转账金额"/></div>
                            <span>元</span></div>
                    </div>
                    <div className="custbtn">
                        <button type="submit">确定</button>
                    </div>
                    </form>
                </div>

                <div className="clearfix"></div>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        game: state.game,
    }
);


export default connect(mapStateToProps, {})(TransferPage);