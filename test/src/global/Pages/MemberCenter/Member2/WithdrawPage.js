/**
 * 个人中心2-取款
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import {ApiWithdrawAction,
    ApiPlayerInfoAction,
    UnLoadingMsgAction,
    ApiBankAccountsAction,
    ApiGamePlatformAllBalanceAction,
    ErrorMsgAction} from "globalAction";
import GamePlatforms from "./GamePlatforms";

class TransferPage extends Component {
    constructor(props) {
        super(props);
        new window.actions.ApiBankAccountsAction().fly();
        this.canWithdrawState = true;//取款状态锁
        this.state={
            PayType:"",
            BankAccountId:''
        }
        new ApiGamePlatformAllBalanceAction().fly();
        new ApiBankAccountsAction().fly(resp=>{
            if(resp.StatusCode==0){
                let typeID = resp.List[0].PayType;
                let payId = resp.List[0].Id;
                this.setState({
                    PayType:typeID,
                    BankAccountId:payId
                })
            }
        })
    }
    onSubmit(e) {
        e.preventDefault();
        let self = this;
        if(!self.canWithdrawState) return;
        if (!this.refs.account.value) {
            window.swal("错误", "取款帐号未指定", "error");
            return;
        }
        if (!this.refs.amount.value) {
            window.swal("错误", "取款金额必须大于0", "error");
            return;
        }
        if (!this.refs.password.value) {
            window.swal("错误", "取款密码未指定", "error");
            return;
        }
        self.canWithdrawState = false;
        let filter = {//后台要接收的参数
            BankAccountId:this.refs.account.value,
            Amount:this.refs.amount.value,
            WithdrawalPwd:this.refs.password.value,
            CodeType:this.state.PayType,
            UserAuditConfirm:false,
        };
        new ApiWithdrawAction(filter).fly(resp=>{
            if(resp.StatusCode==0){
                if(resp.Success){
                    new ApiPlayerInfoAction().fly();
                    self.canWithdrawState = true;
                    return;
                }
                if(resp.NeedToAudit && resp.TotalFee>0){//如果取款需要稽核时
                    let AllowWithdrawals = resp.AllowWithdrawals;//稽核不通过，是否允许提款
                    let amount = Number(self.refs.amount.value);
                    let TotalFee = window.Util.numberWithCommas(resp.TotalFee,2);//手续费
                    let leftFee = amount - TotalFee;//减去手续费后的值
                    if(amount - Number(TotalFee)<100){
                        
                        swal('取款失败','提款金额不足必须大于需核减稽核金额¥'+TotalFee,'error')
                        self.canWithdrawState = true;
                        return;
                    }
                    else if(AllowWithdrawals){
                        window.swal({
                                title: "取款稽核确认",
                                text: "<span class='jihe-text'>提款需核减金额¥" + TotalFee + ",实际提款金额¥"+leftFee+"</span>",
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#c5841f",
                                confirmButtonText: "确认",
                                cancelButtonText: "取消",
                                closeOnConfirm: true,
                                closeOnCancel: true,
                                html: true
                            },
                            function (isConfirm) {
                                if (isConfirm) {
                                    let filtertwo = {//后台要接收的参数
                                        BankAccountId:self.refs.account.value,
                                        Amount:self.refs.amount.value,
                                        WithdrawalPwd:self.refs.password.value,
                                        CodeType:self.state.PayType,
                                        UserAuditConfirm:true
                                    };
                                    new ApiWithdrawAction(filtertwo).fly(resp=>{
                                        if (resp.StatusCode === 0) {
                                            swal('恭喜您,取款已成功！','','success')
                                            new ApiPlayerInfoAction().fly();
                                        }else{
                                            swal("取款申请失败",resp.Message,'error');
                                        }
                                        self.canWithdrawState = true;
                                    });
                                }else{
                                    self.canWithdrawState = true;
                                }
                            });
                        return;
                    }
                    else {
                        swal('取款失败','您的稽核未完成，提款需核减稽核金额¥'+TotalFee,'error');
                        self.canWithdrawState = true;
                        return;
                    }
                }
            }else{
                swal("取款申请失败",resp.Message,'error');
                self.canWithdrawState = true;
            }
        });
    }

    renderAccounts() {
        var ret = [];
        if (this.props.user.bankAccounts) {
            for (var i = 0; i < this.props.user.bankAccounts.length; i++) {
                var account = this.props.user.bankAccounts[i];
                ret.push(
                    <option key={i} value={account.Id}>{account.Bank.BankName + " [" + "**** **** ****" + account.AccountNo.replace(/\s/g, "").substr(-4) + "]"}</option>
                );
            }
        }
        return ret;
    }

    render() {
        const options = window.r.props('MemberCenterRouter');
        return (
            <div>
                <div className="header">玩家取款</div>
                <div className="maincontent security_pg withdrawalfund">
                    <GamePlatforms/>
                    <div className="clearfix"></div>
                    <div className="divider"></div>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="wrdbot">
                            <div className="hlder">
                                <div className="lbl">收款帐号: </div>
                                <div className="custinput">
                                    <select ref="account" >
                                        {!options.select_Default?null:<option value="">请选择</option>}
                                        {this.renderAccounts()}
                                    </select>
                                </div>
                            </div>
                            <div className="hlder"><div className="lbl">取款金额: </div><div className="custinput"><input ref="amount" type="number" placeholder="请输入取款金额"/></div></div>
                            <div className="hlder"><div className="lbl">取款密码: </div><div className="custinput"><input ref="password" type="password" placeholder="请输入取款密码"/></div></div>
                        </div>
                        <div className="custbtn"><button>提交</button></div>
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