/*
*
* 2018年11月以前的替换交互代码，以防万一先留着
*
*
* */
import React, { Component } from 'react';
import {NavBar, Icon, List, InputItem,Toast,Modal,Flex} from 'antd-mobile';
import {browserHistory} from 'react-router';
import {
    ApiDepositAction,
    ApiOfflineAccountsAction,
    ApiPayBanksAction, ApiPlayerInfoAction,
    ApiQueryOrderAction 
} from "globalAction";
import QrcodeDeposit from './qrcodeDeposit_old';//第三方支付组件
import AtmBox from './AtmBox';//银行转账组件
import connect from "react-redux/es/connect/connect";
import './DepositPage.scss'; 
import {config} from "globalConfig";


class DepositPage extends Component{
    constructor(props) {
        super(props);
        this.state={
            money:50,
            showQrcode:false,
            showAtmBox:false,
            AtmBox:{},
            qrcodeParma:{}
        }
    }
    componentWillMount() {
        let _self = this;
        new ApiOfflineAccountsAction().fly();
        new ApiOfflineAccountsAction(0).fly();
        new ApiOfflineAccountsAction(2).fly();
        new ApiPayBanksAction(true).fly();
    }
    moneyChange(val){
        this.setState({
            money:val-0
        })
    }
    addAmount(val){
        this.setState({
            money:this.state.money+val
        })
    }
    setAmount(val,e){
        $('.am-flexbox-item').removeClass('active');
        $(e.currentTarget).addClass('active');
        this.setState({
            money:val
        })
    }
    SelOffline(e){
        let bankAccountId = e.currentTarget.id;
        let depositmoney =this.state.money;
        let offpay = this.props.offlineAccounts[bankAccountId];
        if(!depositmoney||depositmoney==0||depositmoney < offpay.MinAmount || depositmoney > offpay.MaxAmount){
            Modal.alert(
                "存款金额错误",
                offpay.Bank.BankName+"允许存款金额范围："+offpay.MinAmount+"～"+offpay.MaxAmount
            );
            return;
        }
        this.setState({
            showAtmBox:true,
            AtmBox:{
                offpay,
                depositmoney,
                user:this.props.user
            }
        });
    }
    sendThirdpay(e){
        let Bank = this.props.payThirdInfos[e.currentTarget.id];
        let BankCode = Bank.BankNo;
        let BankName = Bank.BankName;
        let depositmoney =this.state.money;

        if(!depositmoney||depositmoney==null){
            Modal.alert(
                "存款金额错误",
                "未输入存款金额"
            );
            return;
        }

        if(depositmoney==0||depositmoney < Bank.MinAmount || depositmoney > Bank.MaxAmount){
            Modal.alert(
                "存款金额错误",
                BankName+"允许存款金额范围："+Bank.MinAmount+"～"+Bank.MaxAmount
            );
            return;
        }
        this.setState({
            showQrcode:true,
            qrcodeParma:{
                type:"sendThirdpay",
                depositmoney,
                Bank,
                BankCode
            }
        })


    }
    offlineWeixinAliPay(e){
        let Bank = this.props.offlineWeixinAliAccounts[e.currentTarget.id];
        let BankName = Bank.Bank.BankName;
        let depositmoney =this.state.money;
        if(!depositmoney||depositmoney==0||depositmoney < Bank.MinAmount || depositmoney > Bank.MaxAmount){
            Modal.alert(
                "存款金额错误",
                BankName+"允许存款金额范围："+Bank.MinAmount+"～"+Bank.MaxAmount
            );
            return;
        }
        this.setState({
            showQrcode:true,
            qrcodeParma:{
                type:"offlineWeixinAliPay",
                depositmoney,
                Bank
            }
        })
    }
    sendLocalpay(e){
        e.preventDefault();
        let self = this;
        let i =  e.currentTarget.id;
        let depositmoney =this.state.money;
        let bank = this.props.payBankInfos[i];

        if(!depositmoney||depositmoney==null){
            Modal.alert(
                "存款金额错误",
                "未输入存款金额"
            );
            return;
        }

        if(depositmoney==0||depositmoney < bank.MinAmount || depositmoney > bank.MaxAmount){
            Modal.alert(
                "存款金额错误",
                bank.BankName+"允许存款金额范围："+bank.MinAmount+"～"+bank.MaxAmount
            );
            return;
        }
        Toast.loading('支付链接获取中',300)
        new ApiDepositAction(depositmoney, bank.BankNo).fly((resp)=>{
            Toast.hide();
            if(resp.StatusCode ===0) {
                Modal.alert(
                    "获取支付成功，前往支付?",
                    "",
                    [
                        { text: '取消'},
                        { text: '前往', onPress: () =>{
                            if(config.isApp){
                                window.Util.appOpen(resp.Content)
                            }else{
                                window.open(resp.Content,'_blank');
                            }
                            setTimeout(() => {
                                Modal.alert(
                                    "支付反馈",
                                    "",
                                    [
                                        { text: '支付失败', onPress: () => {
                                            if(config.isApp){
                                                window.Util.appOpen(this.props.remoteSysConfs.online_service_link)
                                            }else{
                                                window.open(this.props.remoteSysConfs.online_service_link,'_blank');
                                            }
                                        }, style: 'default' },
                                        { text: '支付完成', onPress: () =>{
                                            new ApiPlayerInfoAction().fly();
                                            window.wapHistoryType.push('/history');
                                            // new ApiQueryOrderAction(resp.OrderNo).fly(resp => {
                                            //     if (resp.StatusCode === 0) {
                                            //         new ApiPlayerInfoAction().fly();
                                            //     }
                                            // });
                                        }
                                        }
                                    ]
                                )
                            },1000)
                        } },
                    ]
                );
            }else{
                Modal.alert('支付链接获取失败!',resp.Message)
            }
        });

    }

    renderonlineQRpay(){
        let ret = [];
        for (let i = 0; i < this.props.payThirdInfos.length; i++) {
            let p = this.props.payThirdInfos[i];
            let bgname = p.BankNo;
            ret.push(<div className="bankItem"  key={i}>
                <div id={i}  onClick={this.sendThirdpay.bind(this)}  className={"bankIcon "+bgname}></div>
                <div>{p.BankName}</div>
            </div>);
        }
        return ret;
    }
    renderofflineQRpay(){
        var offlineQRpay = [];
        for (var i = 0; i < this.props.offlineWeixinAliAccounts.length; i++) {
            var p = this.props.offlineWeixinAliAccounts[i];
            var bgname = p.Bank.BankCode;
            offlineQRpay.push(<div className="bankItem"  key={i}>
                <div id={i}  onClick={this.offlineWeixinAliPay.bind(this)}  className={"bankIcon "+bgname}></div>
                <div>{p.Bank.BankName}</div>
            </div>);
        }
        return offlineQRpay;
    }
    renderonlinebank(){
        var onlinebanks = [];
        for (var i = 0; i < this.props.payBankInfos.length; i++) {
            var BankInfo = this.props.payBankInfos[i];
            var bankimg = BankInfo.BankNo;
            onlinebanks.push(<div key={i} id={i} onClick={this.sendLocalpay.bind(this)}  className={"bankItem"}>
                <div  className={"bankIcon "+bankimg}>
                </div>
                <div>{BankInfo.BankName}</div>
            </div>);
        }
        return onlinebanks;
    }
    renderofflinepay_option(){
        var ret = [];
        for (var i = 0; i < this.props.offlineAccounts.length; i++) {
            var oa = this.props.offlineAccounts[i];
            ret.push(
                <div key={i} className="bankItem">
                    <div id={i} className={"bankIcon "+oa.Bank.BankCode} onClick={this.SelOffline.bind(this)}></div>
                    <div>{oa.Bank.BankName}</div>
                </div>
            )
        }
        return ret;
    }
    render(){
        const onlineQRpay = this.renderonlineQRpay();
        const offline_QRpay = this.renderofflineQRpay();
        const onlinebank = this.renderonlinebank();
        const offlinepay_list = this.renderofflinepay_option();
        let extraBtn=(
            <div className="addAmount">
                <a onClick={this.addAmount.bind(this,100)} className="">+</a>
                <a onClick={this.addAmount.bind(this,1000)} className="">+K</a>
            </div>
        )
        return(
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.push('/money')}
                >存款</NavBar>
                <div className="scroll-content DepositPage">
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
                        <List.Item extra={extraBtn}>
                            <InputItem
                                type="number"
                                ref="money"
                                placeholder="请填写转账金额"
                                clear
                                onChange={this.moneyChange.bind(this)}
                                value = {this.state.money}
                                maxLength={15}
                            >充值金额</InputItem>
                        </List.Item>
                    </List>
                    <Flex className="quick-amount">
                        <Flex.Item onClick={this.setAmount.bind(this,50)}>50元</Flex.Item>
                        <Flex.Item onClick={this.setAmount.bind(this,100)}>100元</Flex.Item>
                        <Flex.Item onClick={this.setAmount.bind(this,200)}>200元</Flex.Item>
                        <Flex.Item onClick={this.setAmount.bind(this,500)}>500元</Flex.Item>
                    </Flex>
                    <Flex className="quick-amount">
                        <Flex.Item onClick={this.setAmount.bind(this,1000)}>1000元</Flex.Item>
                        <Flex.Item onClick={this.setAmount.bind(this,2000)}>2000元</Flex.Item>
                        <Flex.Item onClick={this.setAmount.bind(this,5000)}>5000元</Flex.Item>
                        <Flex.Item onClick={this.setAmount.bind(this,10000)}>10000元</Flex.Item>
                    </Flex>

                    {this.props.payThirdInfos && this.props.payThirdInfos.length>0?
                        <div>
                            <div className="onlinepay">
                                <div className="onlinepay_left"><i className="icon icon-th"/> 在线支付</div>
                            </div>
                            <div className="depositContent">
                                {onlineQRpay}
                            </div>
                        </div>
                        :null
                    }
                    {this.props.offlineWeixinAliAccounts && this.props.offlineWeixinAliAccounts.length>0?
                        <div>
                            <div className="onlinepay">
                                <div className="onlinepay_left"><i className="icon icon-th"/> 微信/支付宝转账</div>
                            </div>
                            <div className="depositContent">
                                {offline_QRpay}
                            </div>
                        </div>
                        :null}
                    {this.props.payBankInfos && this.props.payBankInfos.length>0?
                        <div>
                            <div className="onlinepay">
                                <div className="onlinepay_left"><i className="icon icon-th"/> 在线网银</div>
                            </div>
                            <div className="depositContent">
                                {onlinebank}
                            </div>
                        </div>
                        :null}
                    {this.props.offlineAccounts && this.props.offlineAccounts.length>0?
                        <div>
                            <div className="onlinepay">
                                <div className="onlinepay_left"><i className="icon icon-th"/> 银行转帐</div>
                            </div>
                            <div className="depositContent">
                                {offlinepay_list}
                            </div>
                        </div>
                        :null}
                </div>
                {
                    this.state.showQrcode?
                        <QrcodeDeposit hide={()=>this.setState({
                                        showQrcode:false
                                     })}
                            {...this.state.qrcodeParma} />:null
                }
                {
                    this.state.showAtmBox?
                        <AtmBox  hide={()=>this.setState({
                            showAtmBox:false
                        })} {...this.state.AtmBox} />:null
                }

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
{
    remoteSysConfs:state.remoteSysConfs,
    payBankInfos: state.payBankInfos,
    payThirdInfos: state.payThirdInfos,
    user: state.user,
    offlineAccounts: state.offlineAccount.offlineAccounts,
    offlineWeixinAliAccounts: state.offlineAccount.offlineWeixinAliAccounts,
}
);

export default connect(mapStateToProps)(DepositPage)