import React, { Component } from 'react';
import {Modal, List, InputItem, Picker,Toast,Button} from 'antd-mobile';
import {provinces} from "provincesJson";
import {transferTypes} from "offlineTransferJson";
import './DepositPage.scss';
import {ApiOfflineDepositAction} from "globalAction";
import {browserHistory} from "react-router";
import {config} from "globalConfig";

class AtmBox extends Component{
    constructor(props){
        super(props);
        let Province = [];
        for (let i = 0; i < provinces.length; i++) {
            let p = provinces[i];
            Province.push({
                label:p.name,
                value:i
            });
        }
        let requirePlace = true;
        if(this.props.offpay.Bank.BankCode.indexOf('ALIPAY')>-1){//如果是支付宝
            requirePlace=false;
        }else if(this.props.offpay.Bank.BankCode.indexOf('WECHAT')>-1){//如果是微信
            requirePlace=false;
        }
        this.state={
            requirePlace:requirePlace,
            selProvince:Province,
            selCity:[],
            ProvinceValue:[],
            ProvinceName:"",
            CityValue:[],
            CityName:"",
            hide:false,

        }
    }
    componentDidMount(){

    }
    provinceChange(val){
        let index=val[0];
        let city = [];
        for (let i = 0; i < provinces[index].cities.length; i++) {
            let p = provinces[index].cities[i];
            city.push({
                label:p.name,
                value:i
            });
        }
        this.setState({
            selCity:city,
            ProvinceName:this.state.selProvince[index].label,
            ProvinceValue:[index],
            CityValue:[],
            CityName:"",
        })
    }
    cityChange(val){
        let index=val[0];
        this.setState({
            CityName:this.state.selCity[index].label,
            CityValue:[index]
        })
    }

    hide(){
        let _this = this;
        this.setState({
            hide:true
        },()=>{
            setTimeout(()=>{
                _this.props.hide();
            },500)
        })
    }
    offlinePay(e){
        e.preventDefault();
        let _this = this;
        let depositmoney = this.props.depositmoney;
        let ProvinceName = this.state.ProvinceName;
        let CityName = this.state.CityName;
        let branchName = this.state.requirePlace?  this.refs.branchName.state.value:"";
        let offline_accountName = this.refs.offline_accountName.state.value || this.props.user.realName || "";
        let TransType;
        if(this.props.offpay.Bank.BankCode.indexOf('ALIPAY')>-1){//如果是支付宝
            TransType=6;
        }else if(this.props.offpay.Bank.BankCode.indexOf('WECHAT')>-1){//如果是微信
            TransType=7;
        }else{//如果是其他
            TransType=1;
        }
        if(!ProvinceName && this.state.requirePlace){
            Modal.alert('请选择支行省!');
            return;
        }
        if(!CityName && this.state.requirePlace){
            Modal.alert('请选择支行市!');
            return;
        }
        Toast.loading('支付申请中,请稍后...');
        let filter = {//后台要接收的参数
            BankId:this.props.offpay.Id,
            TransType,
            Amount:depositmoney,
            Province:ProvinceName,
            City:CityName,
            Address:branchName,
            AccountName:offline_accountName
        };
        new ApiOfflineDepositAction(filter).fly((resp)=>{
            Toast.hide();
            if(resp.StatusCode===0) {
                Modal.alert(
                    "线下支付申请成功",
                    "支付单号: " + resp.OrderNo + "\n\n帐户名: " + this.props.offpay.AccountName + "\n\n银行卡号: " + this.props.offpay.AccountNo + "\n\n银行: " + this.props.offpay.Bank.BankName + "\n\n支行: " + this.props.offpay.OpeningBank,
                    [{text:'确定',onPress:()=>{_this.hide();  window.wapHistoryType.push('/history');}}]
                );
            }else{
                Modal.alert('线下支付申请失败',resp.Message);
            }
        });
    }
    // 复制copyCode
    copyCode(copyId){
        console.log(copyId)
        var copyObj = document.getElementById(copyId);
        copyObj.select();
        copyObj.setSelectionRange(0, copyObj.value.length)
        document.execCommand("Copy");
    }
    render(){
        let className = this.state.hide?"atmbox slideOutDown":"atmbox slideInUp";
        return(
            <div className={className}>
                <div className="mask"></div>
                <div className="dom">
                    <div className="title">
                        <i className="icon icon-remove" onClick={this.hide.bind(this)}></i>
                        银行转账
                    </div>
                    <div className="overflow">
                        <div className="amount">
                            请向下面账号转账:<span>￥{this.props.depositmoney}</span>
                        </div>
                        <div className="con">
                        {/* 
                            原本长这样，因为需要复制功能，所以
                            <List>
                                <InputItem value={this.props.offpay.AccountName} editable={false}>收款姓名:</InputItem>
                                <InputItem value={this.props.offpay.AccountNo} editable={false}>收款账号:</InputItem>
                                <InputItem value={this.props.offpay.Bank.BankName} editable={false}>收款银行:</InputItem>
                                <InputItem value={this.props.offpay.OpeningBank} editable={false}>银行支行:</InputItem>
                            </List>    
                        */}
                        <div className="am-list">
                            <div className="am-list-body">
                                <div className="am-list-item am-input-item am-list-item-middle">
                                    <div className="am-list-line">
                                        <div className="am-input-label am-input-label-5">收款姓名:</div>
                                        <div className="am-input-control">
                                            <input type="text" id='account_name' style={{width:"75%"}} defaultValue={this.props.offpay.AccountName}/>
                                            <Button 
                                                onClick={this.copyCode.bind(this,'account_name')}  
                                                shape="round"
                                                size="small"
                                                type="warning"
                                                style={{"padding":0}}
                                        
                                            >复制</Button>
                                            {/* <button className="copyInfoBtn" onClick={this.copyCode.bind(this,'account_name')}>复制</button> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="am-list-item am-input-item am-list-item-middle">
                                    <div className="am-list-line">
                                        <div className="am-input-label am-input-label-5">收款账号:</div>
                                        <div className="am-input-control">
                                            <input type="text" id='account_no' style={{width:"75%"}} defaultValue={this.props.offpay.AccountNo}/>
                                            <Button 
                                                onClick={this.copyCode.bind(this,'account_no')}  
                                                shape="round"
                                                size="small"
                                                type="warning"
                                                style={{"padding":0}}
                                        
                                            >复制</Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="am-list-item am-input-item am-list-item-middle">
                                    <div className="am-list-line">
                                        <div className="am-input-label am-input-label-5">收款银行:</div>
                                        <div className="am-input-control">
                                            <input type="text" id='account_BankName' style={{width:"75%"}} defaultValue={this.props.offpay.Bank.BankName}/>
                                            <Button 
                                                onClick={this.copyCode.bind(this,'account_BankName')}  
                                                shape="round"
                                                size="small"
                                                type="warning"
                                                style={{"padding":0}}
                                        
                                            >复制</Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="am-list-item am-input-item am-list-item-middle">
                                    <div className="am-list-line">
                                        <div className="am-input-label am-input-label-5">银行支行:</div>
                                        <div className="am-input-control">
                                            <input type="text" id='account_OpeningBank' style={{width:"75%"}} defaultValue={this.props.offpay.OpeningBank}/>
                                            <Button 
                                                onClick={this.copyCode.bind(this,'account_OpeningBank')}  
                                                shape="round"
                                                size="small"
                                                type="warning"
                                                style={{"padding":0}}
                                        
                                            >复制</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </div>
                        <h3>转账信息</h3>
                        <List>
                            <InputItem
                                defaultValue={this.props.user.realName}
                                ref="offline_accountName"
                                placeholder="请输入付款银行卡开户姓名"
                            >持卡姓名:</InputItem>

                            {
                                this.state.requirePlace?
                                    <div>
                                        <Picker extra="请选择开户省"
                                                data={this.state.selProvince}
                                                value={this.state.ProvinceValue}
                                                ref="province"
                                                cols={1}
                                                onOk={(val)=>{this.provinceChange(val)}}
                                        >
                                            <List.Item arrow="down">支行省:</List.Item>
                                        </Picker>
                                        <Picker extra="请选择开户市"
                                                data={this.state.selCity}
                                                value={this.state.CityValue}
                                                ref="city"
                                                cols={1}
                                                onOk={(val)=>{this.cityChange(val)}}
                                        >
                                            <List.Item arrow="down">支行市:</List.Item>
                                        </Picker>
                                        <InputItem
                                            ref="branchName"
                                            placeholder="请输入支行地址"
                                        >支行地址:</InputItem>
                                    </div>
                                    :null
                            }

                        </List>
                        <a onClick={this.offlinePay.bind(this)} className="btn">转账完成点这里</a>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AtmBox;