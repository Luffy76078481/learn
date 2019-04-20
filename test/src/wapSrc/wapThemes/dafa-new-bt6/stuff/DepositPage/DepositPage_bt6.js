/*
*
*【bt6和ldl的   主要区别在于‘银行转账’，‘在线支付’，‘在线网银’之间的顺序，还有就是银行转账有【返点提示】】
*
*
* */
import React, { Component } from 'react';
import {NavBar, Icon, List,Flex, SegmentedControl, Picker} from 'antd-mobile';
import {browserHistory} from 'react-router';
import {
    ApiOnlinePayAction,ApiGetAdminAllBanksAction
} from "globalAction";
import OnlinePay from './OnlinePay';//在线支付
import OfflinePay from './OfflinePay';//银行转账
import connect from "react-redux/es/connect/connect";
import './DepositPage.scss';
import {config} from "globalConfig";
const payFilter = ['WECHAT','ALIPAY','QQPAY','JDPAY','WECHAT_WAP','ALIPAY_WAP','QQPAY_WAP','JDPAY_WAP','YLPAY','BAIDUPAY','ETH','BTC'];
let PayMethodList=[];
let onlinePayTrueList ={},onlineBankList={};
class DepositPage extends Component{
    constructor(props) {
        super(props);
        this.state={
            isInit:true,
            payTabDom:[],//支付方式的dom
            payTab:"",//支付方式切换
            payMethodValue:[0],//支付方式的值
            showOnlinePay:false,
            OnlinePay:{
                BankName:"",
                onlinePayTrueList:[]
            },
            showOfflinePay:false,
            OfflinePay:{
                BankName:"",
                offlinePayTrueList:[{
                    label:'渠道1',
                    offlinePayTrueObj:{},
                    value:0
                }]
            }
        }
    }
    componentDidMount(){
        let payTabDom;
        if(this.props.remoteSysConfs.deposit_order){
            payTabDom = JSON.parse(this.props.remoteSysConfs.deposit_order);
            this.setState({
                payTabDom: payTabDom
            },()=>{
                this.tabChange(payTabDom[0].key)
            })
        }
    }
    componentWillMount(){
        new ApiOnlinePayAction(true).fly();
        new ApiGetAdminAllBanksAction().fly();
    }
    componentWillReceiveProps(nextProps){
        if(this.props.remoteSysConfs.deposit_order != nextProps.remoteSysConfs.deposit_order) {
            let payTabDom = JSON.parse(nextProps.remoteSysConfs.deposit_order);
            this.setState({
                payTabDom: payTabDom
            },()=>{
                this.tabChange(payTabDom[0].key)
            })
        }
    }
    renderonlinePay(){//在线支付
        PayMethodList=[];
        let onlinePayList =[];
        let index=0;
        for (let i = 0; i < this.props.payOnline.length; i++) {
            let p = this.props.payOnline[i];
            let code = p.BankNo;
            if($.inArray(code,payFilter) >= 0){
                if($.inArray(code,onlinePayList)>=0){
                    onlinePayTrueList[code].push(p);
                }else{
                    onlinePayList.push(code);
                    onlinePayTrueList[code] = [p];
                    PayMethodList.push(
                        {
                            label: p.BankName,
                            selfObj:p,
                            value: index
                        }
                    );
                    index++;
                }
            }
        }
    }
    renderonlinebank(){//在线网银
        PayMethodList=[];
        let onlineBankItems =[];
        let index=0;
        for (let i = 0; i < this.props.payOnline.length; i++) {
            let p = this.props.payOnline[i];
            let code = p.BankNo;
            if($.inArray(code,payFilter) < 0){
                if($.inArray(code,onlineBankItems)>=0){
                    onlineBankList[code].push(p);
                }else{
                    onlineBankItems.push(code);
                    onlineBankList[code] = [p];
                    PayMethodList.push(
                        {
                            label: p.BankName,
                            selfObj:p,
                            value: index
                        }
                    );
                    index++;
                }
            }
        }
    }
    renderofflinepay(){//银行转账
        PayMethodList=[];
        for (var i = 0; i < this.props.allOfflineAccount.length; i++) {
            var p = this.props.allOfflineAccount[i];
            PayMethodList.push(
                {
                    label: p.Bank.BankName,
                    selfObj:p,
                    value: i
                }
            );
        }
    }
    tabChange(key){
        let type = key;
        this.setState({
            payTab:type,
            isInit:true,
            payMethodValue:[0],
            showOnlinePay:type=="ZXZF" || type=="ZXWY",
            showOfflinePay:type=="YHZZ",
            OnlinePay:{
                BankName:"",
                onlinePayTrueList:[]
            },
            OfflinePay:{
                BankName:"",
                offlinePayTrueList:[{
                    label:'渠道1',
                    offlinePayTrueObj:{},
                    value:0
                }]
            },
        })
    }
    changePay(val){
        let index=val[0];
        if(index == -1) return;
        let payTab = this.state.payTab;
        let Bank = PayMethodList[index].selfObj;
        let BankCode = Bank.BankNo || Bank.Bank.BankCode;
        let BankName = Bank.BankName || Bank.Bank.BankName;
        if(payTab =="ZXZF"){
            this.setState({
                payMethodValue:[index],
                isInit:false,
                OnlinePay:{
                    BankName,
                    onlinePayTrueList:onlinePayTrueList[BankCode]
                }
            })
        }else if(payTab=="YHZZ"){
            this.setState({
                payMethodValue:[index],
                isInit:false,
                OfflinePay:{
                    BankName,
                    id:Bank.Id,
                    offlinePayTrueList:[{
                        label:'渠道1',
                        offlinePayTrueObj:Bank,
                        value:0
                    }]
                }
            })
        }else if(payTab == "ZXWY"){
            this.setState({
                payMethodValue:[index],
                isInit:false,
                OnlinePay:{
                    isBank:true,//如果是在线网银
                    BankName,
                    onlinePayTrueList:onlineBankList[BankCode]
                }
            })
        }

    }
    init(){
        let index = 0;
        let payTab = this.state.payTab;
        let Bank = PayMethodList[index].selfObj;
        let BankCode = Bank.BankNo || Bank.Bank.BankCode;
        let BankName = Bank.BankName || Bank.Bank.BankName;
        if(payTab =="ZXZF"){
            this.state.OnlinePay={
                BankName,
                onlinePayTrueList:onlinePayTrueList[BankCode]
            }
        }else if(payTab=="YHZZ"){
            this.state.OfflinePay={
                BankName,
                id:Bank.Id,
                offlinePayTrueList:[{
                    label:'渠道1',
                    offlinePayTrueObj:Bank,
                    value:0
                }]
            }
        }else if(payTab == "ZXWY"){
            this.state.OnlinePay={
                BankName,
                isBank:true,//如果是在线网银
                onlinePayTrueList:onlineBankList[BankCode]
            }
        }
        this.state.isInit =false;
    }
    renderPayTabsDom(){
        let payTabsDom=[];
        for(var i=0;i<this.state.payTabDom.length;i++){
            let FeeRateDom="";
            let item = this.state.payTabDom[i];
            if(item.key =="YHZZ"){
                let FeeRate="";
                FeeRate = this.props.backConfigs.DepositRefundFeeRate*100;
                FeeRate=FeeRate.toFixed(2);//保留2位
                FeeRate=FeeRate.substring(0,FeeRate.lastIndexOf('.')+2);//转成小数点后1位  因为不想进行四舍五入
                FeeRateDom=(<p>(赠送{FeeRate}%无上限)</p>)
            }
            let className = "tabsItem";
            if(this.state.payTab == item.key){
                className="tabsItem active"
            }
            payTabsDom.push(
                <div key={i} className={className} onClick={this.tabChange.bind(this,item.key)}>
                    <div>{item.cname}{FeeRateDom}</div>
                </div>
            )
        }
        return payTabsDom;
    }
    render(){
        if(this.state.payTab =="ZXZF"){
            this.renderonlinePay();//在线支付
        }else if(this.state.payTab == "YHZZ"){
            this.renderofflinepay();//银行转账
        }else if(this.state.payTab == "ZXWY"){
            this.renderonlinebank();//在线网银
        }
        if(PayMethodList.length>0 && this.state.isInit){
            this.init();
        }
        return(
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>browserHistory.push('/money')}
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
                    <div className="payTabs">
                        {this.renderPayTabsDom()}
                    </div>
                    <List>
                        {   
                            this.state.payTab =="YHZZ"?
                            <p className="YHtext">*银行快捷，更安全更快捷，入款即可享受银行卡优惠</p>:null
                        }
                        <Picker extra={"请选择支付方式"}
                                data={PayMethodList.length==0?[
                                    {
                                        label:(<span style={{color:'#ccc'}}>抱歉,暂无数据!</span>),
                                        value: -1
                                    }
                                ]:PayMethodList}
                                value={this.state.payMethodValue}
                                ref="payMethod"
                                cols={1}
                                onOk={(val)=>{this.changePay(val)}}
                        >
                            <List.Item arrow="down">支付方式:</List.Item>
                        </Picker>
                        {
                            this.state.showOnlinePay?
                                <OnlinePay {...this.state.OnlinePay}/>:null
                        }
                        { 
                            this.state.showOfflinePay?
                                <OfflinePay showAtmBox={()=>{
                                    this.setState({showAtmBox:true})
                                }} {...this.state.OfflinePay}/>:null
                        }
                    </List>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        payOnline:state.payOnline,
        user: state.user,
        allOfflineAccount: state.allOfflineAccount.allOfflineBanks,
        backConfigs:state.backConfigs,
        remoteSysConfs:state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(DepositPage)