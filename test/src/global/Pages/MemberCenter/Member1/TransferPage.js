/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
// import {Link, IndexLink} from 'react-router';
import GamePlatforms from './GamePlatforms';
import {ApiTransferAction,ApiGamePlatformsBalanceAction,ApiPlayerInfoAction} from "../../../../actions/index";


class TransferPage extends Component {
    constructor(){
        super();
        this.state={
            disabled: false,
            from:"main",//转出
            to:"main",//转入
            type:"",//操作类型
        }
    }
    renderPlatforms() {
        var platforms = [];
        for (var i = 0; i<this.props.game.platforms.length; i++) {
            var platform = this.props.game.platforms[i];
            if(platform.Name2.indexOf('YOPLAY')==-1){
            platforms.push(
                <option key={i} value={platform.ID}>{platform.Name}</option>
            )
            }

        }
        return platforms;

    }
    reload() {
        new window.actions.ApiGamePlatformsBalanceAction().fly();
        new window.actions.ApiGamePlatformAllBalanceAction().fly();
        new window.actions.ApiPlayerInfoAction().fly();
    }
    getBalance(id) {
        var ret = 0;
        if (id === "main") {
            
            ret = this.refs.amount.value || 0;
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

    submit(e) {
        e.preventDefault();
        if(this.state.disabled)return;
        this.state.disabled = true;
       let _self = this;
       let amount =_self.refs.amount.value;
       let from = this.refs.platforms.value;
       let to = this.refs.platforms.value;
    //    let fromBalance = _self.getBalance(from);
  
    let actions = (id,type,callBack=null)=>{
        new window.actions.ApiTransferAction (id, type, parseInt(amount)).fly((resp)=>{
            if (resp.StatusCode === 0) {
                if(callBack){
                    callBack();
                    _self.state.disabled = false;
                    return;
                }
                this.reload();
                // $("#modalClose").trigger('click')
                // _self.state.reqLock = false;
            }
            this.state.disabled = false;
        });
    };

    if(this.refs.action.value =="out"){//如果是转出
        actions(from,"out");
        return;
    }
    if(this.refs.action.value =="in"){//如果是转入
        actions(to,"in");
        return;
    }
        // new ApiTransferAction (this.refs.platforms.value, this.refs.action.value, this.refs.amount.value).fly((resp)=>{
        //     if (resp.status === 0) {
        //         new ApiGamePlatformsBalanceAction().fly();
        //         new ApiPlayerInfoAction().fly();
        //     }
        //     this.setState({disabled: false});
        // });
    }


    render() {

        const platforms =this.renderPlatforms();

        return (
            <div className="clearfix t20 member-content">
                <div className="fl col-md-7 p-r-93">
                    <div className="border p10 ht-qkbox">
                        <form action="#" id="transferForm" name="transferForm">
                            <table className="ht-fktable f14 t30 vatop" width="100%">
                                <tbody>
                                <tr>
                                    <td width="30%" className="tr color-main">平台：</td>
                                    <td width="70%">
                                        <select ref="platforms" name="transfertype" id="id_transfertype" className="select w260 member-input">
                                            {platforms}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="30%" className="tr color-main">操作：</td>
                                    <td width="70%">
                                        <select ref="action" name="gametype" id="id_gametype" className="select w260 member-input">
                                            <option value="in">主钱包转入游戏平台</option>
                                            <option value="out">游戏平台转入主钱包</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="30%" className="tr color-main">操作金额：</td>
                                    <td width="70%">
                                        <input type="text" className="input w253 transfer-amount member-input" placeholder="请填写金额" ref="amount" />
                                            {/*<p className="red f12">*金额必须为整数，并且大于1</p>*/}
                                    </td>
                                </tr>
                                <tr>
                                    <td width="30%" className="tr">&nbsp;</td>
                                    <td width="70%">
                                        <input onClick={this.submit.bind(this)} type="button" className="htbtnlg w260 t20 submit-btn color-second BGcolor-second" value="确认并提交" />
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
                <GamePlatforms/>
            </div>
       );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        game:state.game
    }
);

export default connect(mapStateToProps)(TransferPage);