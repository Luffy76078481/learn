import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import "./ChessPop.scss"
import {Modal, Toast ,  Picker } from 'antd-mobile';
class ChessPopTK extends Component{
    constructor(props){
        super(props);
        this.state = {
            pickerValue:[]
        }
        if(this.props.user.bankAccounts.length === 0){
            window.actions.showChessModal(false);
            Modal.alert('无法取款!','因没有绑定取款信息，需完善个人取款信息即可执行取款操作',[
                {"text":"完善个人信息",onPress:()=>{
                    window.actions.showChessModal(true,"my","yhk","10rem","6.5rem");
                }}
            ])
            return;
        }
        // if (!this.props.user.verfyPhone && this.props.backConfigs.IsBindingPhone ) {
        //     let _this = this;
        //     Modal.alert("无法取款","因为没有验证手机号码，需验证手机号码即可执行取款操作",[
        //         {"text":"手机验证",onPress:()=>{
        //             _this.showModal();
        //         }}
        //     ])
        //     return;
        // }
    }

    all(){
        this.refs.money.value = parseInt(this.props.user.amount);;
    }

    reload() {
        new window.actions.ApiGamePlatformsBalanceAction().fly();
        new window.actions.ApiGamePlatformAllBalanceAction().fly();
        new window.actions.ApiPlayerInfoAction().fly();
    }

    componentDidMount(){
        if(this.props.user.AutoTransfer === 1){//如果打开了自动转账
            let transferArr=[];
            for(let i=0; i<this.props.platforms.length;i++){
                let platform = this.props.platforms[i];
                if(platform.Balance && platform.Balance>=1){
                    transferArr.push(platform);
                }
            }
            if(transferArr.length == 0) {
                Toast.fail("当前没有可转出的余额");
                return
            }else{
                Toast.loading('平台余额转出主钱包中...',300);
            }
            for(let i=0; i<transferArr.length;i++){
                let platform = transferArr[i];
                let index = i+1;
                new window.actions.ApiTransferAction (platform.ID,"out",parseInt(platform.Balance)).fly((resp)=>{
                    if(resp.StatusCode === 0){
                        this.reload();
                        Toast.hide();
                        Toast.success("余额转出主钱包成功");
                    }
                }, "transfer_" + platform.ID);
            }
        }
    }

    

    submitTK(e){
        e.preventDefault();
        let banks = this.state.pickerValue[0]
        if (!!!banks) {
            Toast.fail('取款帐号未指定')
            return;
        }
        let self = this;
        let accountId = banks.Id;
        let money = this.refs.money.value;
        let password =this.refs.password.value;
        if(money>this.props.user.amount){
            Toast.fail( "取款金额已经超出您的余额");
            return;
        }
        if (!money) {
            Toast.fail( "取款金额必须大于0");
            return;
        }
       
        if (!password) {
            Toast.fail("取款密码未指定");
            return;
        }
        Toast.loading('提款申请中...',300);
        let filter = {//后台要接收的参数
            BankAccountId:accountId,
            Amount:money,
            WithdrawalPwd:password,
            CodeType:banks.PayType,
            UserAuditConfirm:false
        };
       
        new window.actions.ApiWithdrawAction(filter).fly(resp=>{
            Toast.hide();
            if(resp.StatusCode==0){
                if(resp.Success){
                    Toast.success('恭喜您,取款已成功！');
                    new window.actions.ApiPlayerInfoAction().fly();
                    new window.actions.ApiGamePlatformAllBalanceAction().fly();
                    return;
                }
                if(resp.NeedToAudit){//如果取款需要稽核时
                    let AllowWithdrawals = resp.AllowWithdrawals;//稽核不通过，是否允许提款
                    let amount = Number(money);
                    let TotalFee = window.Util.numberWithCommas(resp.TotalFee,2);//手续费
                    let leftFee = amount - TotalFee;//减去手续费后的值
                    if(amount < Number(TotalFee)){
                        Modal.alert('取款失败','提款金额不足必须大于需核减稽核金额¥'+TotalFee)
                        return;
                    }
                    else if( amount + Number(TotalFee) > self.props.user.amount){
                        Modal.alert('取款失败','您账户的余额不足,稽核金额¥'+TotalFee+'+提款金额¥'+amount+',已经大于您的账户余额¥'+self.props.user.amount);
                        return;
                    }
                    else if(AllowWithdrawals){
                        Modal.alert(
                            '取款稽核确认',
                            '提款需核减金额¥'+TotalFee+",实际提款金额¥"+leftFee,
                            [
                                {text:'取消',onPress:()=> {}},
                                {text:'确认',onPress:()=>{
                                    Toast.loading('提款申请中...',300);
                                    let filtertwo = {//后台要接收的参数
                                        BankAccountId:accountId,
                                        Amount:money,
                                        WithdrawalPwd:password,
                                        CodeType:banks.PayType,
                                        UserAuditConfirm:true
                                    };
                                    new window.actions.ApiWithdrawAction(filtertwo).fly(resp=>{
                                        if (resp.StatusCode === 0) {
                                            Toast.success('恭喜您,取款已成功！')
                                            new window.actions.ApiPlayerInfoAction().fly();
                                            new window.actions.ApiGamePlatformAllBalanceAction().fly();
                                        }else{
                                            Modal.alert("取款申请失败",resp.Message);
                                        }
                                        Toast.hide();
                                    });
                                }}
                            ]
                        )
                        return;
                    }
                    else {
                        Modal.alert('取款失败','您的稽核未完成，提款需核减稽核金额¥'+TotalFee);
                        return;
                    }
                }
            }else{
                Modal.alert("取款申请失败",resp.Message);
            }

        });
    }
  
    render(){
        const CustomChildren1 = ({ extra, onClick, children }) => ( //开户银行
            <div className="TKpage-choessCard" onClick={onClick}>{extra}</div>
        );
        var data1 = [];
        this.props.user.bankAccounts.forEach((item,index)=>{
            data1.push(
                {
                    label:item.Bank.BankName+ " [" + "**** **** ****" + item.AccountNo.replace(/\s/g, "").substr(-4) + "] "+item.UserName,
                    value: item,
                }
            )
        });
        return (
            <div className="chesspop-neibox TKpage">
                <p className="chesspop-white-titlefont chesspop-head">
                    <span className="chesspop-head-title">提款</span>
                </p>
                <div className="chesspop-botbox chesspop-botbox-allstyle">
                    <p className="TKpage-monetTitle">主账户余额：<span>{this.props.user.amount}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总财富：<span>{this.props.user.userBalance}</span></p>
                    <from autoComplete="off">
                        <ul className="TKpage-ulList">
                            <li className="chesspop-grxx-spec">
                                <span>请选择提款银行卡：</span>
                                <Picker 
                                    title="选择银行"
                                    data={data1}
                                    value={this.state.pickerValue}
                                    onOk={v =>this.setState({ pickerValue: v})}
                                    cols={1}
                                    >
                                    <CustomChildren1></CustomChildren1>
                                </Picker>
                            </li>
                            <li>
                                <span>请输入提款金额：</span>
                                <input ref="money" type="number"/>
                                <div onClick={this.all.bind(this)} className="TKpage-ALL"></div>
                            </li>
                            {/* 为了消除各种浏览器自动填写密码的情况 */}
                            <li style={{"display":"none"}}> 
                                <span>请输入提款密码：</span>
                                <input autoComplete="off" type="password"/>
                            </li>
                            <li>
                                <span>请输入提款密码：</span>
                                <input ref="password"  type="password" autoComplete='new-password'/>
                            </li>
                            <li>
                                <div onClick={this.submitTK.bind(this)} className="TKpage-ulList-button">
                                    <span className = "TKpage-ulList-button-title">确认提交</span>
                                </div>
                            </li>
                        </ul>
                    </from>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
        platforms: state.game.platforms.filter((item)=>{
            if(item.Enabled){
                return item;
            }
        }),
    }
)
export default connect(mapStateToProps)(ChessPopTK)