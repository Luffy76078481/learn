/**
 * Created by b3 on 2017/5/5.
 */
import React, {Component} from 'react';

import {connect} from 'react-redux';
// import {ApiGamePlatformsBalanceAction,ApiTransferAction,ApiPlayerInfoAction,ErrorMsgAction} from "../../../../actions/index";
// import {BaseGamePlatforms} from "../../../Components/base/BaseGamePlatforms";
import {BaseGamePlatforms} from "../../../../../global/Components/base/BaseGamePlatforms";
import "./GamePlatforms.css";
class GamePlatforms extends BaseGamePlatforms {
    constructor(props) {
        super(props);
    }
    renderPlatforms() {
        var total = this.props.user.amount;
        var platforms = [];
        for (var i = 0; i < this.props.game.platforms.length; i++) {
            var platform = this.props.game.platforms[i];
            if(platform.Name2.indexOf('YOPLAY')==-1){
            platforms.push(
            <div key={platform.ID} className="row playtech2 member-border-bottom">
                <div className="transbtns" onClick={this.transferIn.bind(this,platform.ID)} ><span>闪入</span><a className='transIcon'></a></div>
                <div className="col-md-6 col-xs-7 t playtech2">{platform.Name}</div> 
                <div className="col-md-5 col-xs-5 c"><span className="amount playtech2">{(platform.Balance||0).toFixed(2)}</span><span
                    className="f14"> 元</span></div>
            </div>);

            total += (platform.Balance || 0);
            }
        }
        platforms.push(<div key="summary" className="row totalccl">
            <div className="col-md-6 t member-border-bottom total_money_title" >总余额</div>
            <div className="col-md-5 totalccl c member-border-bottom total_money_number" >
                <span className="amount totle">{total.toFixed(2)}</span>
                <span className="f14"> 元</span>
            </div>
        </div>);
        return platforms;
    }
    render() {
        const platforms = this.renderPlatforms();
        return (
            <div className="border f-r col-md-5 p-0" style={{marginLeft:"-45px"}}>
                <div className="transbtns all" onClick={this.transferAllOut.bind(this)}>
                    {/*<img src="images/transIcon.png?v=1" alt=""/>*/}
                    一键转出
                </div>
                <div className="gminfolist">
                    <div className="row mainccl member-border-bottom">
                        <div className="col-md-6 t ">主钱包</div>
                        <div className="col-md-5 c  ">
                            <span className="amount">{(this.props.user.amount || 0).toFixed(2)}</span>
                            <span className="f14"> 元</span>
                        </div>
                    </div>
                    {platforms}
                </div>
            </div>
        )

    };


}

const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
        game : state.game,
        platforms:state.game.platforms
    }
)


export default connect(mapStateToProps)(GamePlatforms);
