import React, { Component } from 'react';
import {Modal, List, InputItem, Picker,Toast,Flex} from 'antd-mobile';
import {config} from "globalConfig";
import connect from "react-redux/es/connect/connect";
import {ApiSubmitOnlinePayAction,ApiPlayerInfoAction} from "globalAction";
import {browserHistory} from "react-router";
import "../ChessPop.scss"
import QRCode from 'qrcode.react';
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
    
        this.setState({
            hide:true
        })
        this.props.hide();
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
    changeAmountInput(e){
        this.setState({
            depositmoney:e.target.value
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
        window.actions.showChessModal(false);
        new ApiPlayerInfoAction().fly(resp=>{
            window.actions.showChessModal(true,"jl","","10rem","6.5rem");
        });
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
                                                    window.actions.showChessModal(false);
                                                    new ApiPlayerInfoAction().fly(resp=>{
                                                        window.actions.showChessModal(true,"jl","","10rem","6.5rem");
                                                    });
                                                    
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
        let quickAmount;
        if(this.state.onlinePayTrueObj){
            tip=(<div className="tipsAmount">
                *该渠道的存款限制金额为:
                {this.state.onlinePayTrueObj.MinAmount}~{this.state.onlinePayTrueObj.MaxAmount}元
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
        const CustomChildren1 = ({ extra, onClick, children }) => ( //开户银行
            <div className="TKpage-choessCard TKpage-choessCard-spec" onClick={onClick}>{extra}</div>
        );
        return(
            <div >
                <li className="chesspop-grxx-spec">
                    <span>支付渠道：</span>
                    <Picker extra={"请选择转款方式"}
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
                    <div className="TKpage-ulList-button">
                        <span onClick={this.savePay.bind(this)} className = "TKpage-ulList-button-title">确定存款</span>
                    </div>
                </li> 

                {quickAmount}


                {this.state.isQrCode?
                    <div className="chesspop-paybox chesspop-paybox-qrCode">
                        <div className={className}>
                            <div className="mask"></div>
                            <div className="dom">
                                <div className="con">
                                    <div className="qrcode">
                                        <QRCode className="qrImg"
                                                includeMargin={true} //内部是否有margin
                                                size={100}  //图片大小
                                                value={this.state.qrCodeImg || "" } //地址
                                        />
                                    </div>
                                    <div className="text">
                                        <div className="amount">
                                            支付金额：<span>￥{this.state.depositmoney}</span>
                                        </div>
                                        <i className="icon icon-info-sign"></i>
                                        <strong>长按保存二维码</strong>，或使用 <strong>截屏保存</strong>，打开{this.props.BankName}<strong>扫描相册二维码</strong>完成支付。如无法充值，请联系客服。
                                    </div>
                                </div>
                            </div>
                            <li style={{"textAlign":"center"}}>
                                <div className="TKpage-ulList-button">
                                    <span onClick={this.hide.bind(this)} className = "TKpage-ulList-button-title">返回存款</span>
                                </div>
                                <div className="TKpage-ulList-button">
                                    <span onClick={this.queryOrder.bind(this)} className = "TKpage-ulList-button-title">支付完成</span>
                                </div>
                            </li> 
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