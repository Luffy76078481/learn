/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import { Link} from 'react-router'
// import {ApiWithdrawAction,ApiPlayerInfoAction,UnLoadingMsgAction,ApiBankAccountsAction,ErrorMsgAction} from "../../../../actions/index";


class TransferPage extends Component {
    constructor(props) {
        super(props);
        new window.actions.ApiBankAccountsAction().fly();
        this.state={
            accountValue:""
        }
    }
    onSubmit(e) {
        // ※※※※※※※※※※※
        let self = this;
        let accountValue = this.state.accountValue;
        e.preventDefault();

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
        let getAmount = this.refs.amount.value;
        new window.actions.ApiWithdrawAction(accountValue ,this.refs.amount.value, this.refs.password.value).fly(resp=>{
            if (resp.Success) {
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
                // new ApiPlayerInfoAction().fly();
                return;
            }
            if (resp.NeedToAudit && resp.TotalFee>0) {
                if(getAmount - resp.TotalFee<100){
                    window.swal("错误","提款金额不足。 您的稽核未完成，提款需核减稽核金额¥"+resp.TotalFee, "error");
                }else if(resp.AllowWithdrawals){
                    window.swal({
                        title: "提款稽核确认",
                        text: "<span class='jihe-text'>" + "提款需核减金额¥"+ resp.TotalFee + ", 实际提款金额¥" + getAmount - resp.TotalFee + "</span>",
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