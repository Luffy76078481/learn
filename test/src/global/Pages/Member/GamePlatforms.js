/**
 * Created by jamen on 2017/4/30.
 */

import React from 'react';
import {connect} from 'react-redux';
import {BaseGamePlatforms} from "../../Components/base/BaseGamePlatforms";

class GamePlatforms extends BaseGamePlatforms {
    constructor(props) {
        super(props);
    }

    renderPlatforms() {
        var ret = [];
        for (var i = 0; i < this.props.game.platforms.length; i++) {
            var platform = this.props.game.platforms[i];
            if(platform.Name == "YOPLAY"){
                continue;
            }
            ret.push(
                <div className="transferItem" key={i}>
                    <h5>{platform.Name}</h5>
                    <div className="money">
                        余额: <strong>{(platform.Balance || 0).toFixed(2)}</strong>
                    </div>
                    <a onClick={this.props.transfer.bind(null,"to",platform.ID)}>转入</a>
                    <a onClick={this.props.transfer.bind(null,"from",platform.ID)}>转出</a>
                    <a onClick={this.props.transfer.bind(null,"all",platform.ID)}>转入其他游戏</a>
               </div>)
        }
        return ret;
    }

    render() {
        return (
            <div>
                <div >
                    <button style={{'marginTop': '-10px', 'marginBottom': '20px'}} onClick={this.transferAllOut.bind(this)} className="right btn btn-primary">一键转出</button>
                </div>
                <div className="clearfix"></div>
                {/*<div className="purse float_left">*/}
                    {/*<div className="ptitle">中心钱包</div>*/}
                    {/*<div className="bal">￥{this.props.user.amount}<span> 元</span></div>*/}
                    {/*<div className="custbtn float_left"><Link to="/deposit">充值</Link></div>*/}
                    {/*<div className="custbtn float_left"><Link to="/withdraw">提款</Link></div>*/}
                    {/*<div className="custbtn float_left nomarginright"><Link to="/transfer">转账</Link></div>*/}
                    {/*<div className="clearfix"></div>*/}
                {/*</div>*/}
                <div className="transfer_each">
                    {this.renderPlatforms()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        game: state.game,
        platforms: state.game.platforms.filter((item)=>{
            if(item.Enabled){
                return item;
            }
        })
    }
);


export default connect(mapStateToProps, {})(GamePlatforms);