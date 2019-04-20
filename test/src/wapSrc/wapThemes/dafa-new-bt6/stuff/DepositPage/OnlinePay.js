import React, { Component } from 'react';
import {Modal, List, InputItem, Picker,Toast,Flex} from 'antd-mobile';
import {config} from "globalConfig";
import connect from "react-redux/es/connect/connect";
import {ApiSubmitOnlinePayAction,ApiPlayerInfoAction} from "globalAction";
import {browserHistory} from "react-router";
import './DepositPage.scss';
import QRCode from 'qrcode.react';
import DepositOffer from './DepositOffer';  //充值优惠

class onlinePay extends Component{
    constructor(props){
        super(props);
        let onlinePayTrueList=[];
        for (let i = 0; i < this.props.onlinePayTrueList.length; i++) {
            let t = this.props.onlinePayTrueList[i];
            onlinePayTrueList.push({
                label:t.AliasName?t.AliasName:'渠道'+t.ThirdPayId,
                onlinePayTrueObj:t,
                value:i
            });
        }
        this.state={
            isQrCode:false,
            qrCodeImg:"",
            onlinePayTrueList:onlinePayTrueList,
            onlinePayTrueValue:[0],
            onlinePayTrueObj:this.props.onlinePayTrueList[0],
            FixedAmountList:[],
            FixedAmountValue:"",
            depositmoney:"",
            hide:false,
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.BankName !== this.props.BankName){
            let onlinePayTrueList=[];
            for (let i = 0; i < nextProps.onlinePayTrueList.length; i++) {
                let t = nextProps.onlinePayTrueList[i];
                onlinePayTrueList.push({
                    label:t.AliasName?t.AliasName:'渠道'+t.ThirdPayId,
                    onlinePayTrueObj:t,
                    value:i
                });
            }
            this.setState({
                onlinePayTrueList:onlinePayTrueList,
                onlinePayTrueObj:nextProps.onlinePayTrueList[0],
                onlinePayTrueValue:[0]
            })
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
    change(val){
        let index=val[0];
        if(index == -1) return;
        this.setState({
            onlinePayTrueObj:this.state.onlinePayTrueList[index].onlinePayTrueObj,
            onlinePayTrueValue:[index]
        })
    }
    changeAmount(val){
        this.setState({
            FixedAmountValue:val,
            depositmoney:val[0]
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
    queryOrder(){
        new ApiPlayerInfoAction().fly();
        browserHistory.push('/history');
    }
    savePay(){
        let self = this;
        let Thirdpay = this.state.onlinePayTrueObj;
        if(!Thirdpay){
            Modal.alert(
                "错误",
                "请选择支付方式和支付渠道！"
            );
            return false;
        }
        let Thirdpaycode = Thirdpay.BankNo;
        let depositmoney = this.state.depositmoney ;
        let isPayLink = Thirdpay.IsJumpScanCode == 1;
        if(!depositmoney||depositmoney==null){
            Modal.alert(
               "存款金额错误",
               "未输入存款金额"
            );
            return false;
        }

        if(depositmoney==0||depositmoney < Thirdpay.MinAmount || depositmoney > Thirdpay.MaxAmount){
            Modal.alert(
                "存款金额错误",
                "允许存款金额范围："+Thirdpay.MinAmount+"～"+Thirdpay.MaxAmount
            );
            return false;
        }
        let param = {//提交传参
            Amount:depositmoney,
            Id:Thirdpay.Id,
            thirdPayId:Thirdpay.ThirdPayId,
            ReturnType:Thirdpay.IsJumpScanCode == 1?"QRLink":"QRCode",
            Tag:config.webSiteTag,
            BankNo:Thirdpay.BankNo
        }
        if(this.props.isBank){
            param.ReturnType="Online";
        }
        Toast.loading(Thirdpay.IsJumpScanCode == 1?"支付连接获取中,请稍候！":"二维码获取中,请稍候！",300);
        new ApiSubmitOnlinePayAction(param).fly((resp)=>{
                Toast.hide();
                if(resp.StatusCode ===0) {
                    if(isPayLink){
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
                                                        window.Util.appOpen(self.props.remoteSysConfs.online_service_link)
                                                    }else{
                                                        window.open(self.props.remoteSysConfs.online_service_link,'_blank');
                                                    }
                                                }, style: 'default' },
                                                { text: '支付完成', onPress: () =>{
                                                    new ApiPlayerInfoAction().fly();
                                                    browserHistory.push('/history');
                                                }
                                                }
                                            ]
                                        )
                                    },1000)
                                } },
                            ]
                        );
                    }else{
                        self.setState({
                            isQrCode:true,
                            qrCodeImg:resp.Content
                        })
                    }
                }else{
                    if(resp.Message){
                        Modal.alert("错误",resp.Message);
                    }else{
                        Modal.alert("错误","二维码生成失败，请稍后再试或联系客服");
                    }
                }

            })
    }
    hide(){
        let _this = this;
        this.setState({
            isQrCode:false
        })
    }
    render(){
        let className = this.state.isQrCode?"QrcodeDeposit slideInUp":"QrcodeDeposit slideOutDown";
        let extraBtn=(
            <div className="addAmount">
                <a onClick={this.addAmount.bind(this,100)} className="">+</a>
                <a onClick={this.addAmount.bind(this,1000)} className="">+K</a>
            </div>
        );
        let tip;
        if(this.state.onlinePayTrueObj){
            tip=(<div className="tipsAmount">
                *该渠道的存款限制金额为:
                {this.state.onlinePayTrueObj.MinAmount}~{this.state.onlinePayTrueObj.MaxAmount}元
            </div>)
        }
        let  AmountDom=(
            <div className="chooseMoney">
                <span className="tipTxt">选择金额</span>
                {tip}
                {
                    config.gameTag == 'dafa' ?
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
                        placeholder={"手动输入存款金额"}
                    >存款金额:</InputItem>
                </List.Item>
            </div>
        );
        if(this.state.onlinePayTrueObj){
            if(this.state.onlinePayTrueObj.FixedAmount.split(',')[0]){
                let FixedAmountList = this.state.onlinePayTrueObj.FixedAmount.split(',').map((item,index)=>{
                    return {
                        label:item+'元',
                        value:item
                    }
                });
                AmountDom=(
                    <Picker extra="请选择存款方式"
                            data={FixedAmountList}
                            value={this.state.FixedAmountValue}
                            ref="money"
                            cols={1}
                            onOk={(val)=>{this.changeAmount(val)}}
                    >
                        <List.Item arrow="down">存款金额:</List.Item>
                    </Picker>
                )
            }
        }
        return(
            <div >
                <div>
                    <Picker extra="请选择转款方式"
                            data={this.state.onlinePayTrueList.length==0?[
                                {
                                    label:(<span style={{color:'#ccc'}}>抱歉,暂无数据!</span>),
                                    value: -1
                                }
                            ]:this.state.onlinePayTrueList}
                            value={this.state.onlinePayTrueValue}
                            ref="province"
                            cols={1}
                            onOk={(val)=>{this.change(val)}}
                    >
                        <List.Item arrow="down">支付渠道:</List.Item>
                    </Picker>
                    {AmountDom}
                    <DepositOffer />

                    <a onClick={this.savePay.bind(this)} className="btn">确定存款</a>

                </div>
                {this.state.isQrCode?
                    <div className={className} style={{position:"fixed"}}>
                        <div className="mask"></div>
                        <div className="dom">
                            <div className="title">
                                <i className="icon icon-remove" onClick={this.hide.bind(this)}></i>
                                {this.props.BankName}
                                <a onClick={this.queryOrder.bind(this)}>支付完成</a>
                            </div>
                            <div className="amount">
                                支付金额:<span>￥{this.state.depositmoney}</span>
                            </div>
                            <div className="con">
                                <div className="qrcode">
                                    <QRCode className="qrImg"
                                            includeMargin={true} //内部是否有margin
                                            size={200}  //图片大小
                                            value={this.state.qrCodeImg || "" } //地址
                                    />
                                </div>
                                <div className="text">
                                    <i className="icon icon-info-sign"></i>
                                    <strong>长按保存二维码</strong>，或使用 <strong>截屏保存</strong>，打开{this.props.BankName}<strong>扫描相册二维码</strong>完成支付。如无法充值，请联系客服。
                                </div>
                            </div>
                        </div>
                    </div>:null
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps)(onlinePay)