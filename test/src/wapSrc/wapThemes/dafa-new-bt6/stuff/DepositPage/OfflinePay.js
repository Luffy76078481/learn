/*
    Wap 存款页-快捷支付
*/

import React, { Component } from 'react';
import {Modal, List, InputItem, Picker,Toast,Flex} from 'antd-mobile';
import {config} from "globalConfig";
import connect from "react-redux/es/connect/connect";
import AtmBox from './AtmBox';  //银行转账表单组件
import QrBox from "./QrBox";    //银行转账二维码组件
import './DepositPage.scss';
import DepositOffer from './DepositOffer';  //充值优惠

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
    nextBox(flag){  //显示银行信息表单
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
        //因为要覆盖头部的导航 所以更改CSS样式
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
        if(this.state.offlinePayTrueObj.MinAmount){
            tip=(<div className="tipsAmount">
                *该渠道的存款限制金额为:
                {this.state.offlinePayTrueObj.MinAmount}~{this.state.offlinePayTrueObj.MaxAmount}元
            </div>)
        }
        let  AmountDom=(
            <div className="chooseMoney">
                <span className="tipTxt">选择金额</span>
                {tip}
                {config.gameTag == 'dafa'?
                <Flex className="quick-amount">
                    <Flex.Item onClick={this.setAmount.bind(this,100)} className="rmb100" />
                    <Flex.Item onClick={this.setAmount.bind(this,200)} className="rmb200"/>
                    <Flex.Item onClick={this.setAmount.bind(this,500)} className="rmb500"/>
                    <Flex.Item onClick={this.setAmount.bind(this,1000)} className="rmb1000"/>
                    <Flex.Item onClick={this.setAmount.bind(this,5000)} className="rmb5000"/>
                </Flex>
                :
                <Flex className="quick-amount">
                    <Flex.Item onClick={this.setAmount.bind(this,100)} className="rmb100" />
                    <Flex.Item onClick={this.setAmount.bind(this,200)} className="rmb200"/>
                    <Flex.Item onClick={this.setAmount.bind(this,500)} className="rmb500"/>
                    <Flex.Item onClick={this.setAmount.bind(this,1000)} className="rmb1000"/>
                    <Flex.Item onClick={this.setAmount.bind(this,5000)} className="rmb5000"/>
                </Flex>
                }

                <List.Item className="depositmoney" extra={extraBtn}>
                    <InputItem
                        ref="money"
                        clear
                        value={this.state.depositmoney}
                        maxLength={15}
                        type="digit"//原生的number类型支持小数
                        onChange={this.changeAmountInput.bind(this)}
                        placeholder={"手动填写存款金额"}
                    >存款金额:</InputItem>
                </List.Item>
            </div>
        );
        return(
            <div >
                <div>
                    <Picker extra="请选择转款方式"
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
                        <List.Item arrow="down">支付渠道:</List.Item>
                    </Picker>
                    {AmountDom}
                    <DepositOffer />

                    {this.state.offlinePayTrueObj.Type === 3 ? //类型为3时是二维码
                        <a onClick={this.nextBox.bind(this,true)} className="btn">下一步</a>
                        :
                        <a onClick={this.nextBox.bind(this,false)} className="btn">下一步</a>
                    }
                    <div className="tips">
                        <p>温馨提示</p>
                        <p>请保留好转账单据作为核对凭证；</p>
                        <p>如出现充值失败或充值后未到账等情况，请联系在线客服寻求帮助。</p>
                    </div>

                </div>
                {
                    this.state.showQrBox?
                        <QrBox hide={()=>{
                                //因爲要覆蓋頭部的導航 所以更改CSS樣式
                                $('.DepositPage').css({'marginTop':'1rem','paddingTop':'0rem'});
                                this.setState({
                                    showQrBox:false
                                 })
                            }}
                            {...this.state.boxData} />:null
                }
                {
                    this.state.showAtmBox?
                        <AtmBox hide={()=> {
                            //因爲要覆蓋頭部的導航 所以更改CSS樣式
                            $('.DepositPage').css({'marginTop': '1rem','paddingTop':'0rem'});
                            this.setState({
                                showAtmBox: false
                            })
                        }}
                        {...this.state.boxData} />:null
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