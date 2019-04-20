/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';
import 'bootstrap/js/modal';
import { browserHistory } from 'react-router'
import {connect} from 'react-redux';
import { Link} from 'react-router'
// import {ApiWithdrawAction,ApiPlayerInfoAction,UnLoadingMsgAction,ApiBankAccountsAction,ErrorMsgAction} from "../../../../actions/index";
import {ApiWithdrawAction,
    ApiPlayerInfoAction,
    ErrorMsgAction} from "globalAction";

class TransferPage extends Component {
    constructor(props) {
        super(props);
        new window.actions.ApiBankAccountsAction().fly();
        this.state={
            clickFlag:false,
            submitFlag:false,
            accountValue:"",
            PayType:"",

        }
    }
    onSubmit(e) {
        // ※※※※※※※※※※※
        let self = this;
        let accountValue = this.state.accountValue;
        e.preventDefault();
         if (!this.props.user.verfyPhone&&this.props.backConfigs.IsBindingPhone&&!window.config.IsLDL) {
            window.swal({
                    title: "无法取款",
                    text: "因为没有验证手机号码，需验证手机号码即可执行取款操作",
                    confirmButtonColor: "#c5841f",
                    confirmButtonText: "手机验证",
                    showCancelButton: true,
                    cancelButtonText: "关闭",
                },
                ()=>{
                    window.$("#bindPhoneModal").modal();
                });
            return;
        }
        if (!accountValue) {
            window.swal("错误", "提款帐号未指定", "error");
            return;
        }
        if (!this.refs.amount.value) {
            window.swal("错误", "提款金额必须大于0", "error");
            return;
        }
        if (!this.refs.password.value) {
            window.swal("错误", "提款密码未指定", "error");
            return;
        }
        if(this.state.reqLock)
            return;
        this.state.reqLock =true;
        let getAmount = this.refs.amount.value;
        let filter = {//后台要接收的参数
            BankAccountId:accountValue,
            Amount:this.refs.amount.value,
            WithdrawalPwd:this.refs.password.value,
            CodeType:this.state.PayType,
            UserAuditConfirm:false,
        };
        new window.actions.ApiWithdrawAction(filter).fly(resp=>{
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
                        browserHistory.push('/');
                    });
                self.state.reqLock = false;
                return;
            }
            if (resp.NeedToAudit && resp.TotalFee>0) {
                if(getAmount - resp.TotalFee<100){
                    window.swal("错误","提款金额不足。 您的稽核未完成，提款需核减稽核金额¥"+resp.TotalFee, "error");
                }else if(!resp.AllowWithdrawals){
                    window.swal({
                            title: "提款稽核确认",
                            text: "<span class='jihe-text'>" + "提款需核减金额¥"+ resp.TotalFee + ", 实际提款金额¥" +(getAmount - resp.TotalFee) + "</span>",
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
                                    BankAccountId:accountValue,
                                    Amount:self.refs.amount.value,
                                    WithdrawalPwd:self.refs.password.value,
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
                                                browserHistory.push('/');
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
        });
    }
    changeAccountValue(PayType,e){
        let accountValue = e.currentTarget.id;
        this.setState({
            accountValue:accountValue,
            PayType
        })
    }


    renderAccounts() {
        var ret = [];
        if (this.props.user.bankAccounts) {
            for (var i = 0; i < this.props.user.bankAccounts.length; i++) {
                var account = this.props.user.bankAccounts[i];
                ret.push(
                    <div key={i} className={this.state.accountValue==account.Id?"bankOption isSelected":"bankOption"} id={account.Id} onClick={this.changeAccountValue.bind(this,account.PayType)}>
                        {/* {account.Bank.BankName + " [" + "**** **** ****" + account.AccountNo.replace(/\s/g, "").substr(-4) + "]"} */}
                        {account.Bank.BankName + " [" + account.AccountNo + "]"}
                        <div className="selectedCard"></div>
                    </div>
                );
            }
        }
        return ret;
    }
    render() {
        return (
            <div className="drawing">
                <div className="row">
                    <div className="col-md-6">
                        <img src={require('./scss/images/game-popup.gif')} />
                    </div>
                    <div className="col-md-6">
                        <form onSubmit={this.onSubmit.bind(this)}>
                            <div className="row">
                                <div className="form-group">
                                    <div className="row">
                                        <label className="col-md-2">账户余额：</label>
                                        <span className="col-md-8 amount">
                                            {this.props.user.amount} RMB
                                        </span>
                                    </div>
                                    <div className="row">
                                        <label className="col-md-2">提款金额：</label>
                                        <span className="col-md-8">
                                            <input ref="amount" className="form-control" type="number" placeholder="请输入提款金额"/>
                                        </span>
                                    </div>
                                    <div className="row">
                                        <label className="col-md-2"></label>
                                        <span className="col-md-10 messege_new">
                                             {
                                                 this.props.user.SingleMinWithdraw && <span>单笔最低提款{this.props.user.SingleMinWithdraw}元！<br/></span>
                                             }
                                            温馨提示：24小时内超过VIP等级对应提款次数加收每笔50元手续费。
                                        </span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-2">提款密码：</label>
                                    <span className="col-md-8">
                                        <input ref="password" className="form-control"  type="password" placeholder="请输入提款密码"/>
                                    </span>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-2">提款帐号：</label>
                                    <span className="accountItems col-md-8">
                                        <div className="account">
                                            {this.renderAccounts()}
                                        </div>
                                    </span>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-2"></label>
                                    <span className="col-md-8">
                                        <Link to="/bindCard" className="addBankButton">+ 添加银行卡</Link>
                                        {/* <Link to="/bindThirdPay" className="addBankButton">+ 添加支付宝、微信二维码</Link> */}
                                        <div className="clearfix"></div>
                                        <span className="messege_new">*初始提款密码默认为登录密码，为了保障资金安全，建议您立即去修改密码页面重新修改<Link to='/editPassWord'>设置提款密码。</Link></span>
                                    </span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2"></label>
                                <span className="col-md-8">
                                    <button className="btn">提交</button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        game: state.game,
        backConfigs:state.backConfigs
    }
);


export default connect(mapStateToProps, {})(TransferPage);