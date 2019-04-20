/*
    Wap 存款页-快捷支付
*/

import React, { Component } from 'react';
import {Modal, List, InputItem, Picker,Toast,Flex} from 'antd-mobile';
import {config} from "globalConfig";
import connect from "react-redux/es/connect/connect";
import AtmBox from './AtmBox';//银行转账表单组件
import QrBox from "./QrBox";//银行转账二维码组件
import {browserHistory} from "react-router";
import "../ChessPop"
class offlinePay extends Component{
    constructor(props){
        super(props);

        this.state={
            offlinePayTrueList:this.props.offlinePayTrueList,
            offlinePayTrueObj:this.props.offlinePayTrueList[0].offlinePayTrueObj,
            offlinePayTrueValue:[0],
            depositmoney:"",
            boxData:{},
            showAtmBox:false,
            showQrBox:false
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.id !== this.props.id){
            this.setState({
                offlinePayTrueObj:nextProps.offlinePayTrueList[0].offlinePayTrueObj,
            })
        }
    }
    change(val){
        let index=val[0];
        if(index == -1) return;
        this.setState({
            offlinePayTrueValue:[index]
        })
    }
    changeAmountInput(val){
        this.setState({
            depositmoney:val
        })
    }
    setAmount(val,e){
        $('.am-flexbox-item').removeClass('active');
        $(e.currentTarget).addClass('active');
        this.setState({
            depositmoney:val
        })
    }
    addAmount(val){
        this.setState({
            depositmoney:this.state.depositmoney-0+val
        })
    }
    nextBox(flag){//显示银行信息表单
        let offpay = this.state.offlinePayTrueObj;
        if(!offpay){
            Modal.alert(
                "存款金额错误",
                "请选择支付方式和支付渠道！"
            );
            return false;
        }
        let depositmoney = this.state.depositmoney;
        if(!depositmoney||depositmoney==0||depositmoney < offpay.MinAmount || depositmoney > offpay.MaxAmount){
            Modal.alert(
                "存款金额错误",
                offpay.Bank.BankName+"允许存款金额范围："+offpay.MinAmount+"～"+offpay.MaxAmount
            );
            return;
        }
        //因爲要覆蓋頭部的導航 所以更改CSS樣式 
        $('.DepositPage').css({'marginTop':'0','paddingTop':'1rem'});
        this.setState({
            showAtmBox:flag?false:true, //flag代表是否是二维码
            showQrBox:flag?flag:false,
            boxData:{
                offpay,
                depositmoney,
                user:this.props.user
            }
        });
    }
    render(){
        let extraBtn=(
            <div className="addAmount">
                <a onClick={this.addAmount.bind(this,100)} className="">+</a>
                <a onClick={this.addAmount.bind(this,1000)} className="">+K</a>
            </div>
        );
        let tip;
        let quickAmount;
        if(this.state.offlinePayTrueObj.MinAmount){
            tip=(<div className="tipsAmount">
                *该渠道的存款限制金额为:
                {this.state.offlinePayTrueObj.MinAmount}~{this.state.offlinePayTrueObj.MaxAmount}元
            </div>)
        }
        quickAmount=(
            <div className="quick-box">
                <Flex className="quick-amount">
                    <Flex.Item onClick={this.setAmount.bind(this,100)}>100元</Flex.Item>
                    <Flex.Item onClick={this.setAmount.bind(this,200)}>200元</Flex.Item>
                    <Flex.Item onClick={this.setAmount.bind(this,500)}>500元</Flex.Item>
                </Flex>
                <Flex className="quick-amount">
                    <Flex.Item onClick={this.setAmount.bind(this,1000)}>1000元</Flex.Item>
                    <Flex.Item onClick={this.setAmount.bind(this,2000)}>2000元</Flex.Item>
                    <Flex.Item onClick={this.setAmount.bind(this,5000)}>5000元</Flex.Item>
                </Flex>
            </div>
        )
        let  AmountDom=(
            <div>
                <List.Item className="depositmoney" extra={extraBtn}>
                    <InputItem
                        ref="money"
                        clear
                        value={this.state.depositmoney}
                        maxLength={15}
                        type="digit"//原生的number类型支持小数
                        onChange={this.changeAmountInput.bind(this)}
                        placeholder={"请填写存款金额"}
                    >存款金额:</InputItem>
                </List.Item>
                {tip}
                {quickAmount}

            </div>
        );
        const CustomChildren1 = ({ extra, onClick, children }) => ( //开户银行
            <div className="TKpage-choessCard TKpage-choessCard-spec" onClick={onClick}>{extra}</div>
        );
        return(
            <div>
                <li className="chesspop-grxx-spec">
                    <span>支付渠道：</span>
                    <Picker extra={"请选择转款方式"}
                            data={this.state.offlinePayTrueList.length==0?[
                                {
                                    label:(<span style={{color:'#ccc'}}>抱歉,暂无数据!</span>),
                                    value: -1
                                }
                            ]:this.state.offlinePayTrueList}
                            value={this.state.offlinePayTrueValue}
                            ref="province"
                            cols={1}
                            onOk={(val)=>{this.change(val)}}
                    >
                        <CustomChildren1></CustomChildren1>
                    </Picker>
                </li>
                <li>
                    <span>存款金额：</span>
                    <input value={this.state.depositmoney} onChange={this.changeAmountInput.bind(this)} autoComplete="off" type="number"/>
                    {/* {AmountDom} */}
                </li> 
                <li>
                    {tip}
                </li>
                <li>
                    {this.state.offlinePayTrueObj.Type ==3?//类型为3时是二维码
                        <div className="TKpage-ulList-button">
                            <span onClick={this.nextBox.bind(this,true)} className = "TKpage-ulList-button-title">下一步</span>
                        </div>
                        :
                        <div className="TKpage-ulList-button">
                            <span onClick={this.nextBox.bind(this,false)} className = "TKpage-ulList-button-title">下一步</span>
                        </div>
                    }
                </li> 

                {quickAmount}

             
                {
                    this.state.showQrBox?
                        <div className="chesspop-paybox chesspop-paybox-qrCode chesspop-paybox-YHqrCode">
                        <QrBox hide={()=>{
                                //因爲要覆蓋頭部的導航 所以更改CSS樣式
                                this.setState({
                                    showQrBox:false
                                 })
                            }}
                            {...this.state.boxData} /></div>:null
                }
                {
                    this.state.showAtmBox?
                        <div className="chesspop-paybox">
                        <AtmBox hide={()=>{
                                //因爲要覆蓋頭部的導航 所以更改CSS樣式
                                this.setState({
                                    showAtmBox:false
                                 })
                            }}
                        {...this.state.boxData} /></div>:null
                        
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
{
    user:state.user,
    remoteSysConfs:state.remoteSysConfs,
}
);

export default connect(mapStateToProps)(offlinePay)