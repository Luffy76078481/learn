/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Icon} from "antd";
import TransferRecordsPage from "./TransferRecordsComponent";


class TransferPage extends Component {
    constructor(props) {
        super(props);
        this.reload();
        this.state = {
            loadAmount:false,
            platformId:"",
            amount:0,
            type:"in",//操作类型
        };
        new window.actions.ApiGamePlatformsAction().fly();
        new window.actions.ApiGamePlatformAllBalanceAction().fly();
    }
    reload() {
        new window.actions.ApiGamePlatformsBalanceAction().fly();
        new window.actions.ApiGamePlatformAllBalanceAction().fly();
        new window.actions.ApiPlayerInfoAction().fly();
    }
    onSubmit() {
        let _self = this;
        let amount =_self.refs.amount.value;
        let type = _self.state.type;
        if(type=="out"){
            let fromBalance = _self.getBalance(_self.state.platformId);
            if (fromBalance <= 0 || amount > fromBalance) {
                window.swal("错误", "平台没有足够的可用金额！", "error");
                return;
            }
        }else{
            let userAmount = this.props.user.amount;
            if (userAmount < 1 || amount > userAmount) {
                window.swal("错误", "主账户没有足够的可用金额！", "error");
                return;
            }
        }
        if (!amount) {
            window.swal("错误", "输入金额必须大于0！");
            return;
        }
        let actions = (id,type)=>{
            new window.actions.ApiTransferAction (id, type, parseInt(amount)).fly((resp)=>{
                if (resp.StatusCode === 0) {
                    this.reload();
                }else{
                    window.swal("错误", resp.Message, "error");
                }
            });
        };
        actions(_self.state.platformId,_self.state.type);
    }


    typeChange(type){
        this.setState({
            type
        })
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
    renderSelect(){
        let ret = [];
        ret.push()
        for (var i = 0; i < this.props.game.platforms.length; i++) {
            let platform = this.props.game.platforms[i];
            if(platform.Name == "YOPLAY")
                continue;
            ret.push( <option key={i} value={platform.ID}>{platform.Name}</option>);
        }
        return ret;
    }
    platChange(e){
        let platformId = e.target.value;
        this.setState({
            platformId
        })
    }
    getBalance(id) {
        let ret = 0;
        for (var i = 0; i < this.props.game.platforms.length; i++) {
            var p = this.props.game.platforms[i];
            if (p.ID === id) {
                ret = p.Balance || 0.00;
                break;
            }
        }
        return Math.floor(ret);
    }
    render() {
        let canSubmit = true;
        if( this.state.platformId!="" && this.state.amount>0){
            canSubmit=false;
        }
        return (
            <div className="TransferPage">
                <ul className="tab-a">
                    <li className={this.state.type=="in"?"active":""} onClick={this.typeChange.bind(this,'in')}>转入资金</li>
                    <li className={this.state.type=="out"?"active":""} onClick={this.typeChange.bind(this,'out')}>转出资金</li>
                </ul>

                <div className="userInfo">
                        <h2 className="title">转入主账户</h2>
                        <div className="row">
                            <div className="col-md-4">
                                <ul>
                                    <li><label>账户名</label><span className="con">{this.props.user.username}</span></li>
                                    <li>
                                        <label>主账户余额</label>
                                        {!this.state.loadAmount?(
                                            <span className="con">RMB {this.props.user.amount}
                                                <Icon type="sync" onClick={this.loadAmount.bind(this)} />
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
                            <div className="col-md-4"></div>
                            <div className="col-md-4 transfer" style={{marginTop:'-50px'}}>
                                <div className="form-group">
                                    <label className="col-md-4">转{this.state.type=="in"?"入":"出"}平台</label>
                                    <span className="col-md-8">
                                        <select className="form-control" defaultValue={this.state.platformId} onChange={this.platChange.bind(this)} >
                                            <option value="">请选择</option>
                                            {this.renderSelect()};
                                        </select>
                                    </span>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4">转账金额(RMB)</label>
                                    <span className="col-md-8">
                                        <input  className="form-control" defaultValue={this.state.amount}  onChange={(e)=> this.setState({amount:e.target.value})} ref="amount" type="number" disabled={this.state.platformId?false:true}/>
                                    </span>
                                </div>
                                {this.state.type=="out"&& this.state.platformId &&(
                                    <div className="form-group">
                                        <p style={{color:'#af0000',fontSize:"13px",lineHeight:'26px'}}>*转出资金范围 1.00 - 100,000.00 , 每天最多可以转出金额为：500,000.00 , 每天最多可以转出次数：50次<br/>
                                            *您当前可以转出的最大资金大约为: <b style={{fontSize:"15px"}}>{this.getBalance(this.state.platformId)}</b> , 实际可以转出资金以当前账户余额为准，如您有未结算投注，请用当前金额减去未投注金额
                                        </p>
                                    </div>
                                )}
                                <div className="form-group">
                                    <button className="btn" onClick={this.onSubmit.bind(this)} disabled={canSubmit}>执行</button>
                                </div>
                            </div>
                        </div>
                    </div>

                <div className="reportWrapper">
                    <h2 className="title">转账历史</h2>
                    <TransferRecordsPage/>
                </div>
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