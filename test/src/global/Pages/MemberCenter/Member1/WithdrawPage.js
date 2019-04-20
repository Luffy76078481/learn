/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import GamePlatforms from "./GamePlatforms";
import {ApiWithdrawAction,ErrorMsgAction,ApiBankAccountsAction,ApiPlayerInfoAction,UnLoadingMsgAction} from "../../../../actions/index";

class WithdrawPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selAccountIndex:window.r.props("MemberCenterRouter").bankCardOption ?null:0,
            moneyHint:true,
            pswHint:true,
            PayType:"",
            BankAccountId:''
        };
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
    renderAccountPw() {
        var AccountPws = [];
        if (this.props.user.bankAccounts) {
            for (var i = 0; i < this.props.user.bankAccounts.length; i++) {
                var AccountPw = this.props.user.bankAccounts[i];
                AccountPws.push(
                    <option key={i}   value={JSON.stringify({'payId':AccountPw.Id,'paytype':AccountPw.PayType})}>{AccountPw.Bank.BankName}</option>
                );
            }
        }
    
        return AccountPws;
    }



    onSelectAccount(event) {
        const options = window.r.props("MemberCenterRouter");
             let data =JSON.parse(this.refs.bankindex.value );
            this.setState({
                PayType:data.paytype,
                BankAccountId:data.payId
            })

        if(options.bankCardOption === true){
            if(event.target.value =="default"){
                this.setState({selAccountIndex:null})
            }else {
                this.setState({selAccountIndex: event.target.selectedIndex-1});
            }
        }else {
            this.setState({selAccountIndex: event.target.selectedIndex});
        }
    }

    onWithdrawal(event){
        event.preventDefault();
        if(!this.refs.withdrawalAmount.value||!this.refs.withdrawalPsw.value){
            if(!this.refs.withdrawalAmount.value) {
                this.setState({
                    moneyHint: false,
                });
            }
            if(!this.refs.withdrawalPsw.value){
                this.setState({
                    pswHint:false,
                });
            }
            return;
        }
        var self = this;
        let getAmount = this.refs.withdrawalAmount.value;
        let filter = {//后台要接收的参数
            BankAccountId:this.state.BankAccountId,
            Amount:this.refs.withdrawalAmount.value,
            WithdrawalPwd:this.refs.withdrawalPsw.value,
            CodeType:this.state.PayType,
            UserAuditConfirm:false,
        };
        new ApiWithdrawAction(filter).fly(resp=>{
            if (resp.Success) {
                window.swal({
                    title: "提款成功",
                    text: "",
                    confirmButtonColor: "#c5841f",
                    confirmButtonText: "前往游戏",
                    showCancelButton: true,
                    cancelButtonText: "继续提款",
                },
                ()=>{
                    location.href = '/';
                });
                self.state.reqLock = false;
                return;
            }

            if (resp.NeedToAudit && resp.TotalFee>0) {
                if(getAmount - resp.TotalFee<100){
                    window.swal("错误","提款金额不足。 您的稽核未完成，提款需核减稽核金额¥"+resp.TotalFee, "error");
                }else if(resp.AllowWithdrawals){
                    window.swal({
                        title: "提款稽核确认",
                        text: "<span class='jihe-text'>" + "提款需核减金额¥"+ resp.TotalFee + ", 实际提款金额¥" + (getAmount - resp.TotalFee) + "</span>",
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
                                BankAccountId:self.state.BankAccountId ,
                                Amount:self.refs.withdrawalAmount.value,
                                WithdrawalPwd:self.refs.withdrawalPsw.value,
                                CodeType:self.state.PayType,
                                UserAuditConfirm:true
                            };
                            new ApiWithdrawAction(filtertwo).fly(resp=>{
                                if (resp.StatusCode === 0) {
                                    window.swal({
                                        title: "提款成功",
                                        text: "",
                                        confirmButtonColor: "#c5841f",
                                        confirmButtonText: "前往游戏",
                                        showCancelButton: true,
                                        cancelButtonText: "继续提款",
                                    },
                                    ()=>{
                                        location.href = '/';
                                    });
                                }
                            });
                        } else {
                            new UnLoadingMsgAction("withdraw").fly();
                        }
                    });
                }else{
                    window.swal("错误","您的稽核未完成，提款需核减稽核金额¥"+resp.TotalFee, "error");
                   
                } 
            } else {
                window.swal("错误",resp.Message || "提款申请失败", "error");
            }
            self.state.reqLock = false;
        }
        );
    }



    render() {
        const AccountPw = this.renderAccountPw();
        const options = window.r.props("MemberCenterRouter");
        const widthdrawHit = options.widthdrawHit || "请填写您的取款金额 1 ~ 100";

        return (
            <div className="clearfix t20 member-content">
                <div className="fl col-md-7 p-l-0 p-r-15">
                    <div className="border p10 ht-qkbox">
                        <form id="withdrawForm" onSubmit={this.onWithdrawal.bind(this)}>
                            <table className="ht-fktable f14 t30 vatop" width="100%">
                                <tbody>
                                <tr>
                                    <td width="30%" className="tr color-main">己绑定银行卡信息：</td>
                                    <td width="70%">
                                        <select name="fr_bankindex" ref="bankindex" className="select w260 member-input" onChange={this.onSelectAccount.bind(this)} >
                                            {!options.bankCardOption?null: <option className="default" value="default" >---------- 请选择 ----------</option>}
                                            {AccountPw}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="30%" className="tr"></td>
                                    <td width="70%">
                                        { this.props.user.bankAccounts && this.props.user.bankAccounts.length > 0 && this.state.selAccountIndex!=null?
                                            <div id="verifyField">
                                                <span>**** **** **** {this.props.user.bankAccounts[this.state.selAccountIndex].AccountNo.replace(/\s/g, "").substr(-4)}</span>
                                            </div>
                                            :<div id="verifyField"></div>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td width="30%" className="tr color-main">取款金额：</td>
                                    <td width="70%">
                                        <input type="number" ref="withdrawalAmount"  name="fr_amount" required="required" className="input w238 member-input" placeholder={widthdrawHit} />
                                        <span className="ml5 red f12" hidden={this.state.moneyHint}>* 金额未输入</span>
                                            <p className="red f12">

                                            </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="30%" className="tr color-main">取款密碼：</td>
                                    <td width="70%">
                                        <input type="password" ref="withdrawalPsw" name="fr_securitycode_1" required="required" className="input w238 member-input" placeholder="请填写您取款密碼" />
                                        <span className="ml5 red f12" hidden={this.state.pswHint}>* 密碼未输入</span>

                                        <p className="red f12"></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="30%" className="tr">&nbsp;</td>
                                    <td width="70%">
                                        <input type="submit" className="htbtnlg w260 t20 color-second BGcolor-second" value="确认并提交"/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <input type="hidden" name="access_token" value="" />
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
        user: state.user
    }
);

export default connect(mapStateToProps, {})(WithdrawPage);