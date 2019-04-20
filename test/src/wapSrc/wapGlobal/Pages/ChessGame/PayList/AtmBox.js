import React, { Component } from 'react';
import {Modal, List, InputItem, Picker,Toast} from 'antd-mobile';
import {provinces} from "provincesJson";
import {transferTypes} from "offlineTransferJson";
import '../ChessPop';
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
        if(this.props.offpay.Bank.BankCode.indexOf('ALIPAY')>-1){   //如果是支付宝
            requirePlace=false;
        }else if(this.props.offpay.Bank.BankCode.indexOf('WECHAT')>-1){ //如果是微信
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
        this.setState({
            hide:true
        })
        this.props.hide();
    }
    offlinePay(e){
        e.preventDefault();
        let _this = this;
        let depositmoney = this.props.depositmoney;
        let ProvinceName = this.state.ProvinceName;
        let CityName = this.state.CityName;
        let branchName = this.state.requirePlace?  this.refs.branchName.value:"";
        let offline_accountName = this.refs.offline_accountName.value || this.props.user.realName || "";
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
                window.actions.showChessModal(false);
                Modal.alert(
                    "线下支付申请成功",
                    "支付单号: " + resp.OrderNo + "\n\n帐户名: " + this.props.offpay.AccountName + "\n\n银行卡号: " + this.props.offpay.AccountNo + "\n\n银行: " + this.props.offpay.Bank.BankName + "\n\n支行: " + this.props.offpay.OpeningBank,
                    [{text:'确定',onPress:()=>{
                        _this.hide(); 
                        window.actions.showChessModal(true,"jl","","10rem","6.5rem");
                    }}]
                );
            }else{
                Modal.alert('线下支付申请失败',resp.Message);
            }
        });
    }
    // 复制copyCode
    copyCode(copyId){
        var copyObj = document.getElementById(copyId);
        copyObj.select();
        copyObj.setSelectionRange(0, copyObj.value.length)
        document.execCommand("Copy");
    }
    render(){
        let className = this.state.hide?"atmbox slideOutDown":"atmbox slideInUp";
        const CustomChildren1 = ({ extra, onClick, children }) => ( //开户银行
            <div className="TKpage-choessCard TKpage-choessCard-spec" onClick={onClick}>{extra}</div>
        );
        return(
            <div className={className}>
                <div className="mask"></div>
                <div className="dom">
                    {/* <div className="title">
                        <i className="icon icon-remove" onClick={this.hide.bind(this)}></i>
                        银行转账
                    </div> */}
                    <div className="overflow">
                        <div className="chesspop-zhuanleft">
                            <div className="amount">
                                请向下面账号转账：<span>￥{this.props.depositmoney}</span> 
                            </div>
                            <div className="con">
                                <p>收款姓名：{this.props.offpay.AccountName} </p>
                                <p>收款账号：{this.props.offpay.AccountNo} </p>
                                <p>收款银行：{this.props.offpay.Bank.BankName} </p>
                                <p>银行支行：{this.props.offpay.OpeningBank} </p>
                            </div>                   
                        </div>

                        <div className="chesspop-zhuanright">
                            <div className="amount">
                                转账信息
                            </div>
                                <p ref="offline_accountName">银行卡姓名：{this.props.user.realName} </p>
                                {
                                    this.state.requirePlace?
                                        <div>
                                <li className="chesspop-grxx-spec chesspop-specli">
                                    <span>支行省：</span>
                                    <Picker extra="请选择开户省"
                                            data={this.state.selProvince}
                                            value={this.state.ProvinceValue}
                                            ref="province"
                                            cols={1}
                                            onOk={(val)=>{this.provinceChange(val)}}
                                    >
                                        <CustomChildren1></CustomChildren1>
                                    </Picker>
                                </li>
                                <li className="chesspop-grxx-spec chesspop-specli chesspop-specli2">
                                    <span>支行市：</span>
                                    <Picker extra="请选择开户市"
                                        data={this.state.selCity}
                                        value={this.state.CityValue}
                                        ref="city"
                                        cols={1}
                                        onOk={(val)=>{this.cityChange(val)}}
                                    >
                                        <CustomChildren1></CustomChildren1>
                                    </Picker>
                                </li>
                                <li className=" chesspop-specli  chesspop-specli2 chesspop-specli3">
                                    <span>支行地址：</span>
                                    <input autoComplete="off" type="text" placeholder="请输入支行地址" ref="branchName"/>
                                </li> 
                                </div>
                                 :null
                                } 
                        </div>
                        <li style={{"textAlign":"center"}}>
                            <div className="TKpage-ulList-button">
                                <span onClick={this.hide.bind(this)} className = "TKpage-ulList-button-title">返回存款</span>
                            </div>
                            <div className="TKpage-ulList-button">
                                <span onClick={this.offlinePay.bind(this)} className = "TKpage-ulList-button-title">转账完成</span>
                            </div>
                        </li> 
                    </div>
                </div>
            </div>
        )
    }
}

export default AtmBox;

