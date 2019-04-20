/**
 * 取款M2
 */

import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {BaseGamePlatforms} from "../../../../../global/Components/base/BaseGamePlatforms";

class GamePlatforms extends BaseGamePlatforms {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        new window.actions.ApiGamePlatformAllBalanceAction().fly();
    }

    renderPlatforms(startIndex = 0 ,ColumnNumber) {
        var ret = [];
        for (var i = startIndex; i < this.props.platforms.length && i < startIndex + ColumnNumber; i++) {
            var platform = this.props.platforms[i];
            ret.push(<td key={i}>
                <div className="custbtn" onClick={this.transferIn.bind(this, platform.ID)}>闪入</div>
                {platform.Name}<p>{(platform.Balance || 0).toFixed(2)}</p></td>)
        }
        return ret;
    }

    render() {
        return (
            <div>
                <div className="title">我的资产<button onClick={this.transferAllOut.bind(this)} className="right btn btn-primary">一键转出</button></div>

                <div className="purse float_left">
                    <div className="ptitle">中心钱包</div>
                    <div className="bal">￥{this.props.user.amount}<span> 元</span></div>
                    <div className="custbtn float_left"><Link to="/deposit">充值</Link></div>
                    <div className="custbtn float_left"><Link to="/withdraw">提款</Link></div>
                    <div className="custbtn float_left nomarginright"><Link to="/transfer">转账</Link></div>
                    <div className="clearfix"></div>
                </div>
                <div className="table_holder float_left">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                         
                            <tbody className="plateformMoney1">
                            <tr>
                                {this.renderPlatforms(0,8)}
                            </tr>
                            <tr>
                                {this.renderPlatforms(8,8)}
                            </tr>
                            <tr>
                                {this.renderPlatforms(16,8)}
                            </tr>
                            <tr>
                                {this.renderPlatforms(24,8)}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        platforms: state.game.platforms.filter((item)=>{
            if(item.Enabled){
                return item;
            }
        })
    }
);


export default connect(mapStateToProps, {})(GamePlatforms);