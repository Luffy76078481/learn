/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import GamePlatforms from "./GamePlatforms";

class TransferPage extends Component {
    constructor(props) {
        super(props);
        this.reload();
        this.state = {
            from:"main",//转出
            to:"main",//转入
            type:"",//操作类型
        };
        new window.actions.ApiGamePlatformsAction().fly();
    }
    reload() {
        new window.actions.ApiGamePlatformsBalanceAction().fly();
        new window.actions.ApiGamePlatformAllBalanceAction().fly();
        new window.actions.ApiPlayerInfoAction().fly();
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
        this.setState({to:this.refs.to.value});
    }
    onChange() {
        var v = this.refs.from.value;
        this.refs.from.value = this.refs.to.value;
        this.refs.to.value = v;
        this.onChangeFromOrTo();
    }
    onSubmit(e) {
        e.preventDefault();
        let _self = this;
        let amount =_self.refs.amount.value;
        let from = _self.state.from;
        let to = _self.state.to;
        let fromBalance = _self.getBalance(from);
        if (fromBalance <= 0 || amount > fromBalance) {
            window.swal("错误", "没有足够的可用金额", "error");
            return;
        }
        if(from == to){
            window.swal("错误", "请选择其他的游戏厅进行转入");
            return;
        }
        if (!amount) {
            window.swal("错误", "输入金额必须大于0");
            return;
        }
        if (!to) {
            window.swal("错误", "请选择要转入的游戏厅", "error");
            return;
        }

        let actions = (id,type,callBack=null)=>{
            new window.actions.ApiTransferAction (id, type, parseInt(amount)).fly((resp)=>{
                if (resp.StatusCode === 0) {
                    if(callBack){

                        callBack();
                        return;
                    }
                    this.reload();
                    $("#modalClose").trigger('click')
                }1
            });
        };
        if(_self.state.type =="all"){//如果是转入其他游戏时  需要先从该账户转入主账户  再从主账户转出到目标账户
            actions(from,"out",actions(to,"in",null));
            return;
        }
        if(_self.state.type =="from"){//如果是转出
            actions(from,"out");
            return;
        }
        if(_self.state.type =="to"){//如果是转入
            actions(to,"in");
            return;
        }
    }
    renderPlatformSelect() {
        var ret = [];
         ret.push(<option key="main" value="">请选择</option>);
        for (var i = 0; i < this.props.game.platforms.length; i++) {
            var platform = this.props.game.platforms[i];
            if(platform.Name == "YOPLAY")
            continue;
            ret.push(<option key={i} disabled={this.state.from == platform.Id} value={platform.Id}>{platform.Name}</option>)
        }
        return ret;
    }
    transfer(type,platId){
        let stateObj={};
        if(type == "from"){
            stateObj={
                type,
                from:platId,
                to:"main"
            }
        }else if(type == "to"){
            stateObj={
                type,
                from:"main",
                to:platId
            }
        }else{
            stateObj={
                type,
                from:platId,
                to:""
            }
        }
        this.setState(stateObj)
    }

    render() {
        let toDom;
        let surplusAmount;
        if(this.state.type !="to"){
            surplusAmount =(<div className="seclbl">当前游戏可转出金额：{this.getBalance(this.state.from)}</div>);
            if(this.state.type =="all"){
                toDom =(
                    <div className="hlder">
                        <div className="lbl">转入：</div>
                        <div className="custinput">
                            <select ref="to" onChange={this.onChangeFromOrTo.bind(this)}>
                                {this.renderPlatformSelect()}
                            </select>
                        </div>
                    </div>
                )
            }
        }else if(this.state.type =="to"){
            surplusAmount =(<div className="seclbl">主账户可转入金额：{this.getBalance(this.state.from)}</div>);
        }
        return (
            <div>
                <div className="gametrans">
                    <GamePlatforms transfer={this.transfer.bind(this)}/>
                    {/*快速转账弹出层*/}
                    <div id="transferModal" className="modal fade" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    快速转账
                                    <button type="button" className="close" id="modalClose" data-dismiss="modal">
                                        <i className="fa fa-close"></i>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.onSubmit.bind(this)}>
                                        <div className="forms">
                                            {/*<div className="changehlder"><img onClick={this.onChange.bind(this)} className="change" alt=""/></div>*/}
                                            <div className="hlder">
                                                <div className="lbl">转账金额：</div>
                                                <div className="custinput">
                                                    <input ref="amount" type="number" placeholder="请输入转账金额"/>
                                                </div>
                                                {surplusAmount}
                                            </div>
                                            {toDom}
                                        </div>
                                        <div className="custbtn">
                                            <button type="submit">确定</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
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