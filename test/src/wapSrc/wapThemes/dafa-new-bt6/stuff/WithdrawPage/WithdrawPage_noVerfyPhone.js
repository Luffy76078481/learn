/*
*
* 【该JS没有手机验证号码的功能】
*
*
*
* */
import React, { Component } from 'react';
import {Icon, Flex, List, InputItem, NavBar, Modal, Toast, Switch, Picker} from "antd-mobile";
import {Link,browserHistory} from "react-router";
import connect from "react-redux/es/connect/connect";
import {ApiBankAccountsAction, ApiPlayerInfoAction, ApiWithdrawAction,ApiGamePlatformAllBalanceAction} from "globalAction";
import './WithdrawPage.scss'

/*区别没有手机短信验证*/
class WithdrawPage extends Component{
    constructor(props) {
        super(props);
        this.canWithdrawState = true;//取款状态锁
        new ApiBankAccountsAction().fly();
        let Accounts=[];
        this.props.user.bankAccounts.forEach((item,index)=>{
            Accounts.push({
                label:item.Bank.BankName+ " [" + "**** **** ****" + item.AccountNo.replace(/\s/g, "").substr(-4) + "] "+item.UserName,
                id:item.Id,
                PayType:item.PayType,
                value:index
            })
        });
        this.state={
            money:0,
            Accounts:Accounts,
            AccountsValue:[],
            AccountsId:"",
            PayType:""
        };
        if(this.props.user.bankAccounts.length === 0){
            Modal.alert('无法取款!','因没有绑定取款信息，需完善个人取款信息即可执行取款操作',[
                {"text":"完善个人信息",onPress:()=>{
                        browserHistory.push('/cardManage')
                    }}
            ])
        }
    }
    setAmount(){
        this.setState({
            money:parseInt(this.props.user.amount-0)
        })
    }
    moneyChange(val){
        this.setState({
            money:val-0
        })
    }
    accountsChange(val){
        let index = val[0];
        this.setState({
            AccountsValue:[index],
            AccountsId:this.state.Accounts[index].id,
            PayType:this.state.Accounts[index].PayType
        })
    }
    onSubmit(e){
        e.preventDefault();
        let self = this;
        let accountId = this.state.AccountsId;
        let money = this.refs.money.state.value;
        let password =this.refs.password.state.value;
        if(!self.canWithdrawState) return;
        if(money>this.props.user.amount){
            Modal.alert("错误", "取款金额已经超出您的余额");
            return;
        }
        if (!money) {
            Modal.alert("错误", "取款金额必须大于0");
            return;
        }
        if (!accountId) {
            Modal.alert("错误", "取款帐号未指定");
            return;
        }
        if (!password) {
            Modal.alert("错误", "取款密码未指定");
            return;
        }
        self.canWithdrawState = false;
        Toast.loading('提款申请中...',300);
        let filter = {//后台要接收的参数
            BankAccountId:accountId,
            Amount:money,
            WithdrawalPwd:password,
            CodeType:this.state.PayType,
            UserAuditConfirm:false
        };
        this.refs.password.state.value="";
        this.setState({
            AccountsValue:[],
            money:0
        })
        new ApiWithdrawAction(filter).fly(resp=>{
            Toast.hide();
            if(resp.StatusCode==0){
                if(resp.Success){
                    Modal.alert('恭喜您,取款已成功！');
                    new ApiPlayerInfoAction().fly();
                    new ApiGamePlatformAllBalanceAction().fly();
                    self.canWithdrawState = true;
                    return;
                }
                if(resp.NeedToAudit){//如果取款需要稽核时
                    let AllowWithdrawals = resp.AllowWithdrawals;//稽核不通过，是否允许提款
                    let amount = Number(money);
                    let TotalFee = window.Util.numberWithCommas(resp.TotalFee,2);//手续费
                    let leftFee = amount - TotalFee;//减去手续费后的值
                    if(amount < Number(TotalFee)){
                        Modal.alert('取款失败','提款金额不足必须大于需核减稽核金额¥'+TotalFee)
                        self.canWithdrawState = true;
                        return;
                    }
                    else if( amount + Number(TotalFee) > self.props.user.amount){
                        Modal.alert('取款失败','您账户的余额不足,稽核金额¥'+TotalFee+'+提款金额¥'+amount+',已经大于您的账户余额¥'+self.props.user.amount);
                        self.canWithdrawState = true;
                        return;
                    }
                    else if(AllowWithdrawals){
                        Modal.alert(
                            '取款稽核确认',
                            '提款需核减金额¥'+TotalFee+",实际提款金额¥"+leftFee,
                            [
                                {text:'取消',onPress:()=> self.canWithdrawState = true},
                                {text:'确认',onPress:()=>{
                                    Toast.loading('提款申请中...',300);
                                    let filtertwo = {//后台要接收的参数
                                        BankAccountId:accountId,
                                        Amount:money,
                                        WithdrawalPwd:password,
                                        CodeType:self.state.PayType,
                                        UserAuditConfirm:true
                                    };
                                    new ApiWithdrawAction(filtertwo).fly(resp=>{
                                        if (resp.StatusCode === 0) {
                                            Modal.alert('恭喜您,取款已成功！')
                                            new ApiPlayerInfoAction().fly();
                                            new ApiGamePlatformAllBalanceAction().fly();
                                        }else{
                                            Modal.alert("取款申请失败",resp.Message);
                                        }
                                        Toast.hide();
                                        self.canWithdrawState = true;
                                    });
                                }}
                            ]
                        )
                        return;
                    }
                    else {
                        Modal.alert('取款失败','您的稽核未完成，提款需核减稽核金额¥'+TotalFee);
                        self.canWithdrawState = true;
                        return;
                    }
                }
            }else{
                Modal.alert("取款申请失败",resp.Message);
                self.canWithdrawState = true;
            }

        });
    }
    render(){
        let extraBtn=(
            <div className="addAmount">
                <a onClick={this.setAmount.bind(this)} className="">All</a>
            </div>
        )
        return(
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>browserHistory.push('/money')}
                >玩家提款</NavBar>
                <div className="scroll-content WithdrawPage">
                    <div className="profile">
                        <Flex className="userCash">
                            <Flex.Item>
                                <i className="icon icon-credit-card"></i>
                                <div className="itemR">
                                    <span className="title">主账户余额</span>
                                    <span>{this.props.user.amount}<em> RMB</em></span>
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <i className="icon icon-money"></i>
                                <div className="itemR">
                                    <span className="title">总财富</span>
                                    <span>{this.props.user.userBalance}<em> RMB</em></span>
                                </div>
                            </Flex.Item>
                        </Flex>
                    </div>
                    <List>
                        <List.Item  className="noPaddingLeft" extra={extraBtn}>
                            <InputItem
                                type="number"
                                ref="money"
                                placeholder="请填写转账金额"
                                clear
                                maxLength={15}
                                value = {this.state.money}
                                onChange={this.moneyChange.bind(this)}
                            >金额</InputItem>
                        </List.Item>
                        <div className="accounts">
                            <Picker extra="请选择收款账号"
                                    data={this.state.Accounts}
                                    value={this.state.AccountsValue}
                                    cols={1}
                                    onOk={(val)=>{this.accountsChange(val)}}
                            >
                                <List.Item arrow="down">收款账号</List.Item>
                            </Picker>
                        </div>
                        <InputItem
                            ref="password"
                            type="password"
                            placeholder="请输入提款密码"
                        >提款密码</InputItem>

                    </List>
                    <span className="tips">*初始提款密码默认为登录密码，为了保障资金安全，建议您立即去修改密码页面重新修改!</span>
                    {
                        this.props.user.SingleMinWithdraw && <span className="tips">*单笔最低提款{this.props.user.SingleMinWithdraw}元</span>
                    }
                    <a onClick={this.onSubmit.bind(this)} className="btn">提 交</a>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
    }
);

export default connect(mapStateToProps)(WithdrawPage)