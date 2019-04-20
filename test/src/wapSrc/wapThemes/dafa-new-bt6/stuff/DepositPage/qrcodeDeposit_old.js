/*
 *
 * 2018年11月以前的替换交互代码，以防万一先留着
 *
 *
 * */
import React, { Component } from 'react';
import {
    ApiOfflineDepositAction,
    ApiPlayerInfoAction,
    ApiQueryOrderAction,
    ApiThirdDepositAction

} from "globalAction";
import {Modal} from 'antd-mobile';
import './DepositPage.scss';
import {browserHistory} from "react-router";

class QrcodeDeposit extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:true,
            hide:false,
            OrderNo:"",
            img:""
        }
    }
    componentDidMount(){
        let _this = this;
        if(this.props.type=="sendThirdpay"){
            new ApiThirdDepositAction(this.props.depositmoney, this.props.BankCode).fly((resp)=>{
                if(resp.StatusCode ===0) {
                    _this.setState({
                        img:resp.Content,
                        loading:false,
                        OrderNo:resp.OrderNo
                    })
                }else{
                    Modal.alert('二维码加载失败!',resp.Message)
                }
            })
        }else{
            _this.setState({
                img:this.props.Bank.AccountNo,
                loading:false
            })
        }
    }
    queryOrder(){//查询订单结果
        let _this =this;
        if(this.props.type=="sendThirdpay"){
            new ApiPlayerInfoAction().fly();
            _this.props.hide();
            browserHistory.push('/history');
            // new ApiQueryOrderAction(_this.state.OrderNo).fly(resp => {
            //     if (resp.StatusCode === 0) {
            //         new ApiPlayerInfoAction().fly();
            //     }
            //     _this.props.hide();
            // });
        }else{
            let Bank =this.props.Bank;
            let depositmoney = this.props.depositmoney;
            let filter = {//后台要接收的参数
                BankId:Bank.Id,
                TransType:1,
                Amount:depositmoney,
                Province:"",
                City:"",
                Address:"",
                AccountName:Bank.AccountName,
                DepositType:1
            };
            new ApiOfflineDepositAction(filter).fly((resp)=>{
                _this.props.hide();
                if(resp.StatusCode===0) {
                    Modal.alert(
                        Bank.Bank.BankName+"线下支付申请成功！",
                        '支付单号:'+resp.OrderNo+';\n帐户名:'+Bank.AccountName+';\n支付金额:'+depositmoney,
                        [
                            {
                                text:"确定",onPress:()=>{
                                    browserHistory.push('/history');
                                }
                            }
                        ]
                    );
                }else{
                    Modal.alert(
                        "支付失败！",
                        "很抱歉，"+Bank.AccountName+"线下支付申请失败，请联系客服处理"
                    );
                }
            });
        }
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
    render(){
        let className = this.state.hide?"QrcodeDeposit slideOutDown":"QrcodeDeposit slideInUp";
        let BankName = this.props.type=="sendThirdpay"?this.props.Bank.BankName:this.props.Bank.Bank.BankName;
        return(
            <div className={className}>
                <div className="mask"></div>
                <div className="dom">
                    <div className="title">
                        <i className="icon icon-remove" onClick={this.hide.bind(this)}></i>
                        {BankName}
                        <a onClick={this.queryOrder.bind(this)}>支付完成</a>
                    </div>
                    <div className="amount">
                        支付金额:<span>￥{this.props.depositmoney}</span>
                    </div>
                    <div className="con">
                        <div className="qrcode">
                            {
                                this.state.loading?
                                    <span><i className="icon-spinner icon-spin"></i> 二维码生成中...</span>:
                                    <img src={'http://qr.liantu.com/api.php?w=160&h=160&text='+this.state.img} />

                            }
                        </div>
                        <div className="text">
                            <i className="icon icon-info-sign"></i>
                            <strong>长按保存二维码</strong>，或使用 <strong>截屏保存</strong>，打开{BankName}<strong>扫描相册二维码</strong>完成支付。如无法充值，请联系客服。
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default QrcodeDeposit;