/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Icon} from 'antd';
import {ApiLoginLogsAction} from "../../../../actions/index";
import WithdrawRecordsPage from './WithdrawRecordsComponent';

class MemberIndexPage extends Component {
    constructor(props) {
        super(props);
        this.submitState = true;
        new ApiLoginLogsAction().fly();
        this.state = {
            loadAmount:false,
            loadBalance:false,
            BalanceId:"",
        }
    }

    loadAmount(){
        this.setState({
            loadAmount:true
        })
        new window.actions.ApiPlayerInfoAction().fly(resp=>{
            if (resp.StatusCode === 0) {
                this.setState({
                    loadAmount:false
                })
            }
        });
    }
    getGameBalance(BalanceId){
        if(!this.submitState) return;
        this.setState({
            loadBalance:true,
            BalanceId
        });
        this.submitState = false;
        new window.actions.ApiGamePlatformBalanceAction(BalanceId).fly(resp=>{
            this.submitState = true;
            this.setState({
                loadBalance:false
            })
        },BalanceId)
    }
    renderGamePlat(){
        let ret = [];
        for (var i = 0; i < this.props.game.platforms.length; i++) {
            let platform = this.props.game.platforms[i];
            if(platform.Name == "YOPLAY")
                continue;
            let noteDOM;
            if(this.state.loadBalance && platform.ID == this.state.BalanceId){
                noteDOM=(<span><Icon type="sync" spin /> 请稍后</span>)
            }else{
                noteDOM=(<span>RMB {platform.Balance || 0} <Icon type="sync"/></span>)
            }
            ret.push(
                <div key={i} className="e-txtBtn" onClick={this.getGameBalance.bind(this,platform.ID)} >
                    <div className="e-txtBtn-title">{platform.Name}</div>
                    <div className="e-txtBtn-note">{noteDOM}</div>
                </div>
            )
        }
        return ret;
    }
    render() {
        return (
            <div>
                <div className="userInfo">
                    <div className="row">
                        <div className="col-md-4">
                            <ul>
                                <li><label>账户名</label><span className="con">{this.props.user.username}</span></li>
                                <li>
                                    <label>主账户余额</label>
                                    {!this.state.loadAmount?(
                                            <span className="con">RMB {this.props.user.amount}
                                                <Icon type="sync" onClick={this.loadAmount.bind(this)}  />
                                            </span>
                                        ):(
                                            <span>
                                                <Icon type="sync" spin /> 请稍后
                                            </span>
                                        )
                                    }
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <ul>
                                <li><label>会员等级</label><span className="con">{this.props.user.userLevelName}</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="gameWrapper">
                        {this.renderGamePlat()}
                    </div>
                </div>
                <div className="reportWrapper">
                    <h2 className="title">取款记录</h2>
                    <WithdrawRecordsPage/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        game: state.game,
        login: state.login
    }
);


export default connect(mapStateToProps, {})(MemberIndexPage);