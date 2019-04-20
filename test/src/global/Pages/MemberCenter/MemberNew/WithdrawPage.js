/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import { Link} from 'react-router'
import {ApiWithdrawAction,
    ApiPlayerInfoAction,
    UnLoadingMsgAction,
    ApiBankAccountsAction,
    ErrorMsgAction} from "globalAction";


class TransferPage extends Component {
    constructor(props) {
        super(props);
        this.canWithdrawState = true;//取款状态锁
        new ApiBankAccountsAction().fly();
        this.state={
            accountValue:""
        }
    }
    onSubmit(e) {
        e.preventDefault();
        let self = this;
        if(!self.canWithdrawState) return;
        let accountValue = this.state.accountValue;

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
        self.canWithdrawState = false;
        new ApiWithdrawAction(accountValue ,this.refs.amount.value, this.refs.password.value).fly(resp=>{
            if(resp.StatusCode==0){
                if(resp.Success){
                    window.swal({
                            title: "提款成功",
                            text: "",
                            confirmButtonColor: "#c5841f",
                            confirmButtonText: "前往游戏",
                            // closeOnConfirm: false
                            showCancelButton: true,
                            cancelButtonText: "继续提款",
                            // cancelButtonColor: "#f8c700",
                        },
                        ()=>{
                            location.href = '/';
                        });
                    new ApiPlayerInfoAction().fly();
                    self.canWithdrawState = true;
                    return;
                }
                if(resp.NeedToAudit){//如果取款需要稽核时
                    let AllowWithdrawals = resp.AllowWithdrawals;//稽核不通过，是否允许提款
                    let amount = Number(self.refs.amount.value);
                    let TotalFee = window.Util.numberWithCommas(resp.TotalFee,2);//手续费
                    let leftFee = amount - TotalFee;//减去手续费后的值
                    if(amount < Number(TotalFee)){
                        swal('取款失败','提款金额不足必须大于需核减稽核金额¥'+TotalFee,'error')
                        self.canWithdrawState = true;
                        return;
                    }
                    else if( amount + Number(TotalFee) > self.props.user.amount){
                        swal('取款失败','您账户的余额不足,稽核金额¥'+TotalFee+'+提款金额¥'+amount+',已经大于您的账户余额¥'+self.props.user.amount,'error');
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
                                    new ApiWithdrawAction(accountValue ,self.refs.amount.value, self.refs.password.value).fly(resp=>{
                                        if (resp.StatusCode === 0) {
                                            window.swal({
                                                    title: "提款成功",
                                                    text: "",
                                                    confirmButtonColor: "#c5841f",
                                                    confirmButtonText: "前往游戏",
                                                    // closeOnConfirm: false
                                                    showCancelButton: true,
                                                    cancelButtonText: "继续提款",
                                                    // cancelButtonColor: "#f8c700",
                                                },
                                                ()=>{
                                                    location.href = '/';
                                                });
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
    changeAccountValue(e){
        let accountValue = e.currentTarget.id;
        this.setState({
            accountValue:accountValue
        })
    }
    renderAccounts() {
        var ret = [];
        if (this.props.user.bankAccounts) {
            for (var i = 0; i < this.props.user.bankAccounts.length; i++) {
                var account = this.props.user.bankAccounts[i];
                ret.push(
                    <div key={i} className={this.state.accountValue==account.Id?"bankOption isSelected":"bankOption"} id={account.Id} onClick={this.changeAccountValue.bind(this)}>
                        {account.Bank.BankName + " [" + "**** **** ****" + account.AccountNo.replace(/\s/g, "").substr(-4) + "]"}
                        <div className="selectedCard"></div>
                    </div>
                );
            }
        }
        return ret;
    }
    render() {
        const options = window.r.props('MemberCenterRouter');
        return (
            <div className="drawing">
                {/*提款*/}
                <div hidden={this.state.addBankBox} className="maincontent security_pg withdrawalfund">
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="wrdbot">
                            <div className="hlder">
                                <div className="lbl">提款金额：</div>
                                <div className="custinput">
                                    <input ref="amount" type="number" placeholder="请输入提款金额"/>
                                </div>
                                <span className="messege_new" style={{'display':'block','fontSize':'13px','marginLeft':'118px',"marginTop": "-16px"}}>单笔最低提款100元</span>
                            </div>
                            <div className="hlder">
                                <div className="lbl">提款密码：</div>
                                <div className="custinput">
                                    <input ref="password" type="password" placeholder="请输入提款密码"/>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="accBox">
                                <div className="lbl">提款帐号：</div>
                                <div className="accountItems">
                                    <div className="account">
                                        {this.renderAccounts()}
                                    </div>
                                    <Link to="/bindCard" className="addBankButton">+ 添加银行卡</Link>
                                    <span className="messege_new">*初始提款密码默认为登录密码，为了保障资金安全，建议您立即去修改密码页面重新修改<Link to='/member'>设置提款密码。</Link></span>
                                </div>
                            </div>
                        </div>

                        <div className="custbtn"><button className="memberBtn">提交</button></div>
                    </form>
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