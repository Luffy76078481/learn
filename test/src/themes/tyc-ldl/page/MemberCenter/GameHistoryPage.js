/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Icon} from 'antd';
import BetRecordsPage from './BetRecordsPage';

class MemberIndexPage extends Component {
    constructor(props) {
        super(props);
        this.submitState = true;
        this.state = {
            loadAmount:false,
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


    render() {
        let recordsNum = this.props.records.length;
        let lastRecords = this.props.records[recordsNum-1];
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
                                <li><label>下注总次数</label><span className="con">{lastRecords?<span>{lastRecords['Num']} 次</span>:""}</span></li>
                                <li><label>下注总金额</label><span className="con">{lastRecords?<span>RMB {lastRecords['RealBet']}</span>:""}</span></li>
                                <li><label>派彩</label><span className="con">{lastRecords?<span>RMB {lastRecords['PayOut']}</span>:""}</span></li>
                            </ul>

                        </div>
                    </div>
                </div>
                <div className="reportWrapper">
                    <h2 className="title">游戏历史</h2>
                    <BetRecordsPage/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        login: state.login,
        records: state.records.betRecords.rows
    }
);


export default connect(mapStateToProps, {})(MemberIndexPage);