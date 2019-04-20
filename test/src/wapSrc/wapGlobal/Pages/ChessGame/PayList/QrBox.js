import React, { Component } from 'react';
import {
    ApiOfflineDepositAction,
    ApiPlayerInfoAction,
    ApiQueryOrderAction,
    ApiThirdDepositAction

} from "globalAction";
import {InputItem, List, Modal, Toast} from 'antd-mobile';
import '../ChessPop';
import {browserHistory} from "react-router";
import {config} from "globalConfig";

class QrcodeDeposit extends Component{
    constructor(props){
        super(props)
        this.state={
            AccountName:"",
            hide:false,
        }
    }
    hide(){
        this.setState({
            hide:true
        })
        this.props.hide();
    }
    offlinePay(e){
        e.preventDefault();
        if(!this.state.AccountName){
            Toast.fail("请填写转账人姓名");
            return;
        }
        let _this = this;
        let depositmoney = this.props.depositmoney;
        let TransType;
        if(this.props.offpay.Bank.BankCode.indexOf('ALIPAY')>-1){//如果是支付宝
            TransType=6;
        }else if(this.props.offpay.Bank.BankCode.indexOf('WECHAT')>-1){//如果是微信
            TransType=7;
        }else{//如果是其他
            TransType=1;
        }
        Toast.loading('支付申请中,请稍后...');
        let filter = {//后台要接收的参数
            BankId:this.props.offpay.Id,
            TransType,
            Amount:depositmoney,
            AccountName:this.state.AccountName
        };
        new ApiOfflineDepositAction(filter).fly((resp)=>{
            Toast.hide();
            if(resp.StatusCode===0) {
                window.actions.showChessModal(false);
                Modal.alert(
                    "线下支付申请成功",
                    "支付单号: " + resp.OrderNo + ";\n\n帐户名: " + _this.props.offpay.AccountName + ";\n\n银行: " + _this.props.offpay.Bank.BankName+ ";\n\n银行卡号: " + _this.props.offpay.AccountNo,
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
    AccountNameChange(val){
        if(val==" ") return;
        this.setState({
            AccountName:val
        })
    }
    AsaVn2Copy(){
        let ret = []

        return ret;
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
        let BankName = this.props.offpay.Bank.BankName;
        return(
            <div className={className}>
                <div className="mask"></div>
                <div className="dom">
                    {/* <div className="title">
                        <i className="icon icon-remove" onClick={this.hide.bind(this)}></i>
                        银行转账
                    </div> */}
                    <div className="overflow">
                        
                        <div className="con">
                            <div className="qrcode">
                               <img src={config.devImgUrl+this.props.offpay.ImageUrl } />
                            </div>
                            <div className="chesspop-YHspecbox">
                                <p>支付金额：￥{this.props.depositmoney} </p>
                                <p>收款姓名：{this.props.offpay.AccountName} </p>
                                <p>收款账号：{this.props.offpay.AccountNo} </p>
                                <p>收款银行：{this.props.offpay.Bank.BankName} </p>
                                <li className=" chesspop-specli">
                                    <span>转账人姓名：</span>
                                    <input onChange={this.AccountNameChange.bind(this)} defaultValue={this.state.AccountName} autoComplete="off" type="text"  placeholder="请输入转账人姓名" />
                                </li> 
                            </div>
                            <div className="text">
                                <i className="icon icon-info-sign"></i>
                                <strong>长按保存二维码</strong>，或使用 <strong>截屏保存</strong>，打开{BankName}<strong>扫描相册二维码</strong>完成支付。如无法充值，请联系客服。
                            </div>
                            <li style={{"textAlign":"center"}}>
                                <div className="TKpage-ulList-button">
                                    <span onClick={this.hide.bind(this)} className = "TKpage-ulList-button-title">返回存款</span>
                                </div>
                                {
                                    <div className="TKpage-ulList-button">
                                        <span onClick={this.offlinePay.bind(this)} className = "TKpage-ulList-button-title">转账完成</span>
                                    </div>
                                }
                            </li> 
                        </div>
                        
                    </div>

                </div>
            </div>
        )
    }
}

export default QrcodeDeposit;