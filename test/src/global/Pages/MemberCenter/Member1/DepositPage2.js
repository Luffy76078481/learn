/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';
import {ApiThirdDepositAction,
    ApiPayBanksAction,
    ApiDepositAction,
    ApiOfflineDepositAction,
    ApiOnlinePayAction,
    ApiSubmitOnlinePayAction,
    ApiOfflineAccountsAction,
     ApiQueryOrderAction,
     ApiPlayerInfoAction,
     ApiSendOnlinePayAction} from "../../../../actions/index";
import {provinces} from "../../../../../config/provincesJson";
import { browserHistory} from 'react-router'
import {transferTypes} from "offlineTransferJson";
import {config} from "../../../../../config/config";
// import loadingImg from '../images/loading_wellbet.gif';
class DepositPage2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requirePlace: false,
            selAdminAccount: null,
            selOnlineBank: null,
            hideAtmBox:true,
            showPop:true,
            payName:"",
            qdList:[],
            inputType:"输入",
            param:{
                amount:0,
                id:0,
                thirdPayId:0,
                resultType:"QRCODE"
            },
            minAmount:0,
            maxAmount:0,
            isPayLink:false,
            payNow:{},//在线支付当前渠道信息
            payCanelList:[],//当前支付所含渠道
            wyPayNow:{},//在线网银当前渠道信息
            yhPayNow:{},//银行转账当前渠道信息
            payType:"ZXZF",//支付方式
            isLoading:false,//二维码生成中
            hideAtmBox:true,//银行转账
            offlineBankId:"",//银行转账ID
            offlineBankCode:"",//银行转账Code
        };
        this.state.selProvince = provinces[0];

    }

    componentDidMount() {
        new ApiOfflineAccountsAction().fly();
        new ApiOfflineAccountsAction(3).fly();
        new ApiOnlinePayAction().fly( );
        new ApiPayBanksAction().fly();
    }
    loadingDom(){
        return(<div className="loaderDom"><img src={loadingImg} /><p>二维码生成中,请稍后...</p></div>)
    }
    //在线支付
    renderPayTypeFrom(AmountSpan){
        let ret = [];
        const fifter = ['WECHAT','ALIPAY','QQPAY','JDPAY','WECHAT_WAP','ALIPAY_WAP','QQPAY_WAP','JDPAY_WAP','YLPAY','BAIDUPAY','ETH','BTC'];
        let payList = [];//过滤前所有支付信息
        let payTrueList = {};//所有支付方式以及渠道
        let payCanelListOptions = [];//支付渠道下拉
        let inputAmount = <input id="deposit_money"
            placeholder="请输入存款金额"
            type="number"
            className="input member-input"
            required
            name="fr_amount" ref="ThirdPayMoney"/>

            for (var i = 0; i < this.props.payOnline.length; i++) {
                let p = this.props.payOnline[i];
                let code = p.BankNo;
                let index = payList.indexOf(code);

                if(index>=0){
                    payTrueList[code].cont.push(p);
                }else{
                    if($.inArray(code,fifter) >= 0){
                        payList.push(code);
                        payTrueList[code] = {cont:[p]}
                    }
                }
            }
            if(payList.length>0){
                if(!this.state.payNow.MaxAmount || $.inArray(this.state.payNow.BankNo,fifter) < 0 ){
                    this.state.payNow = payTrueList[payList[0]].cont[0]; 
                } 
                if(this.state.payCanelList.length==0 || $.inArray(this.state.payCanelList[0].BankNo,fifter) < 0 ){
                    this.state.payCanelList = payTrueList[payList[0]].cont;
                } 
          
                for (let i = 0; i < payList.length; i++) {
                    let bgname = payList[i];
                        ret.push(<option key={i} value={JSON.stringify(payTrueList[bgname].cont)}>{payTrueList[bgname].cont[0].BankName}</option>)
                }
               
                let spl = this.state.payNow.FixedAmount.split(",");
                if(spl[0]){//下拉
                    inputAmount = (
                        <select id="deposit_money" name="fr_amount" ref="ThirdPayMoney">
                            {spl.map((data,index)=>{
                                return <option key={index} value = {data}>{data}</option>
                            })}
                        </select>
                    )
                }else{//输入金额
                    AmountSpan=(
                        <span className="font_red font_bold">*单笔转账限额 {this.state.payNow.MinAmount}.00~{this.state.payNow.MaxAmount}.00元</span>
                    )
                }
            }else{
                ret.push(<option key="1">暂无在线支付方式</option>)
            }
            for (var i = 0; i < this.state.payCanelList.length; i++) {
                    payCanelListOptions.push(<option value={JSON.stringify(this.state.payCanelList[i])} key={i}>{this.state.payCanelList[i].AliasName?this.state.payCanelList[i].AliasName:"渠道"+this.state.payCanelList[i].ThirdPayId}</option>)
            }
            return(
                <div>
                    <p>
                        <label>支付方式 : </label>
                        <span>
                            <select  defaultValue={this.state.payCanelList[0]}  onChange = {this.ChangePay.bind(this)}>
                                {ret}
                            </select>
                        </span>
                    </p>
                    <p>
                        <label>支付渠道 : </label>
                        <span>
                            <select   defaultValue={this.state.payCanelList[0]}    onChange = {this.ChangeCanl.bind(this)}>
                                {payCanelListOptions}
                            </select>
                        </span>
                    </p>
                    <p>
                        <label>存款金额 : </label>
                        <span>
                            {inputAmount}
                            {AmountSpan}
                        </span>
                    </p>
                </div>
            )
    }
    ChangePay(e){//选择支付方式,加载对应支付渠道下拉；
        let data = JSON.parse(e.target.value);
        this.setState({
            payCanelList:data,
            payNow:data[0],
        })
    }
    ChangeCanl(e){//选择渠道，显示对应限额
        let data = JSON.parse(e.target.value);
        this.setState({
            payNow:data,
        })
    }
    //点击在线支付存款
    sendThirdpay(paytype){
        var self = this;
        var Thirdpay = '';
        var depositmoney = '';
        var payOnline = ''
        if(paytype=='ZXZF'){
             depositmoney = document.getElementById("deposit_money").value;
             Thirdpay = this.state.payNow;
             payOnline=Thirdpay.IsJumpScanCode == 1?"QRLink":"QRCode";
        }else if(paytype=='ZXWY'){
             depositmoney = document.getElementById("wydeposit_money").value;
             Thirdpay = this.state.wyPayNow;
             payOnline=Thirdpay.IsJumpScanCode == 1?"Online":"QRCode";
        }
        var Thirdpaycode = Thirdpay.BankNo;
        this.state.isPayLink = Thirdpay.IsJumpScanCode == 1 
        if(!depositmoney||depositmoney==null){
            window.swal({
                title: "存款金额错误",
                text: "未输入存款金额",
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            return;
        }
        if(depositmoney==0||depositmoney < Thirdpay.MinAmount || depositmoney > Thirdpay.MaxAmount){
            window.swal({
                title: "存款金额错误",
                text: "允许存款金额范围："+Thirdpay.MinAmount+"～"+Thirdpay.MaxAmount,
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            return;
        }
        if (Thirdpaycode === "WECHAT") {
            Thirdpaycode = 2;
        }
        this.state.param = {//提交传参
            Amount:depositmoney,
            Id:Thirdpay.Id,
            thirdPayId:Thirdpay.ThirdPayId,
            ReturnType:payOnline,
            Tag:window.config.webSiteTag,
            BankNo:Thirdpay.BankNo
        }

        if(self.state.isPayLink){
            new ApiSubmitOnlinePayAction(this.state.param).fly((resp)=>{
                if(resp.StatusCode ===0) {
                        window.swal({
                            title: "获取支付成功，前往支付?",
                            type: "success",
                            showCancelButton: true,
                            confirmButtonColor: "#c5841f",
                            confirmButtonText: "前往",
                            cancelButtonText: "取消",
                            closeOnConfirm: true,
                            closeOnCancel: true
                        },
                        function (isConfirm) {
                            if (isConfirm) {
                                window.open(resp.Content,'_blank');
                                setTimeout(() => {
                                    window.swal({
                                            title: "支付反馈",
                                            type: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#c5841f",
                                            confirmButtonText: "支付完成",
                                            cancelButtonText: "支付失败",
                                            closeOnConfirm: true,
                                            closeOnCancel: true
                                        },
                                        function (isConfirm) {
                                            if (isConfirm) {
                                                browserHistory.push("/records_deposit");
                                            }
                                            else {
                                                window.open(self.props.remoteSysConfs.online_service_link,'servers');
                                            }
                                        });
                                }, 1000);
                            }
                           
                        });
                }else{
                    if(resp.Message){
                        window.swal("错误",resp.Message, "error");
                    }else{
                        window.swal("错误","支付链接，请稍后再试或联系客服", "error");
                    }
                }
                
            })
        }else{
            this.setState({
                isLoading:true
            },()=>{
                new ApiSubmitOnlinePayAction(this.state.param).fly((resp)=>{
                    if(resp.StatusCode ===0) {
                        // self.setState({
                        //     isLoading:false,
                        //     thirdProgress:true,
                        //     thirdPayImg:"http://qr.liantu.com/api.php?w=180&m=5&h=190&text="+resp.Content,
                        //     thirdPayRecordId:resp.OrderNo
                        // })
                        let payUrl = resp.Content.replace("&","%26")
                        
                        window.swal({ 
                            title: Thirdpay.BankName+"支付",
                            text: "<p>支付单号: " + resp.OrderNo + "</p><p>帐户名: " + Thirdpay.BankName + "</p><p>支付金额: " + depositmoney + "</p><br><p class='qr_code' style='height:190px;width: 100%'><img style='border: 5px solid #fff;'width='180' src='http://qr.liantu.com/api.php?w=180&m=5&h=190&text=" + payUrl + "'/></p><p>请用" + Thirdpay.BankName + "扫描上方二维码进行支付</p>",
                            confirmButtonColor: "#c5841f",
                            confirmButtonText: "支付完成点这里",
                            closeOnConfirm: true,
                            html: true,
                            showCancelButton: true,
                            cancelButtonText: "关闭"
                        },function (isConfirm) {
                            if (isConfirm) {
                                setTimeout(() => {
                                    window.swal({
                                            title: "支付反馈",
                                            type: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#c5841f",
                                            confirmButtonText: "支付完成",
                                            cancelButtonText: "支付失败",
                                            closeOnConfirm: true,
                                            closeOnCancel: true
                                        },
                                        function (isConfirm) {
                                            if (isConfirm) {
                                                browserHistory.push("/records_deposit");
                                            }
                                            else {
                                                window.open(self.props.remoteSysConfs.online_service_link,'servers');
                                            }
                                        });
                                }, 1000);
                            }
                            else {
                            }
                        })
                    }else{
                        self.setState({
                            isLoading:false
                        },()=>{
                            if(resp.Message){
                                window.swal("错误",resp.Message, "error");
                            }else{
                                window.swal("错误","二维码生成失败，请稍后再试或联系客服", "error");
                            }
                        })
                    }
                    
                })
            })
            
        }

    }
    WyChangePay(e){//选择支付方式,加载对应支付渠道下拉；
        let data = JSON.parse(e.target.value);
        this.setState({
            payCanelList:data,
            wyPayNow:data[0],
        })
    }
    WyChangeCanl(e){//选择渠道，显示对应限额
        let data = JSON.parse(e.target.value);
        this.setState({
            wyPayNow:data,
        })
       
    }
    //在线网银
    renderonlinebank(AmountSpan){
        let ret = [];
        const fifter = ['WECHAT','ALIPAY','QQPAY','JDPAY','WECHAT_WAP','ALIPAY_WAP','QQPAY_WAP','JDPAY_WAP','YLPAY','BAIDUPAY','ETH','BTC'];
        let payList = [];//过滤前所有支付信息
        let payTrueList = {};//所有支付方式以及渠道
        let payCanelListOptions = [];//支付渠道下拉
        let inputAmount = <input id="wydeposit_money"
            placeholder="请输入存款金额"
            type="number"
            className="input member-input"
            required
            name="fr_amount" ref="ThirdPayMoney"/>

            for (var i = 0; i < this.props.payOnline.length; i++) {
                let p = this.props.payOnline[i];
                let code = p.BankNo;
                let index = payList.indexOf(code);

                if(index>=0){
                    payTrueList[code].cont.push(p);
                   
                }else{
                    if($.inArray(code,fifter) < 0){
                        payList.push(code);
                        payTrueList[code] = {cont:[p]}
                    }
                }
            }
   
            if(payList.length>0){
                if(!this.state.wyPayNow.MaxAmount || $.inArray(this.state.wyPayNow.BankNo,fifter) >= 0 ){
                    this.state.wyPayNow = payTrueList[payList[0]].cont[0]; 
                   
                } 
                if(this.state.payCanelList.length==0 || $.inArray(this.state.payCanelList[0].BankNo,fifter) >= 0 ){
                    this.state.payCanelList = payTrueList[payList[0]].cont;
                } 
          
                for (let i = 0; i < payList.length; i++) {
                    let bgname = payList[i];
                        ret.push(<option key={i} value={JSON.stringify(payTrueList[bgname].cont)}>{payTrueList[bgname].cont[0].BankName}</option>)
                }
               
                let spl = this.state.wyPayNow.FixedAmount.split(",");
                if(spl[0]){//下拉
                    inputAmount = (
                        <select id="deposit_money" name="fr_amount" ref="ThirdPayMoney">
                            {spl.map((data,index)=>{
                                return <option key={index} value = {data}>{data}</option>
                            })}
                        </select>
                    )
                }else{//输入金额
                    AmountSpan=(
                        <span className="font_red font_bold">*单笔转账限额 {this.state.wyPayNow.MinAmount}.00~{this.state.wyPayNow.MaxAmount}.00元</span>
                    )
                }
            }else{
                ret.push(<option key="1">暂无在线支付方式</option>)
            }
            for (var i = 0; i < this.state.payCanelList.length; i++) {
             
                    payCanelListOptions.push(<option value={JSON.stringify(this.state.payCanelList[i])} key={i}>{this.state.payCanelList[i].AliasName?this.state.payCanelList[i].AliasName:"渠道"+this.state.payCanelList[i].ThirdPayId}</option>)
              
                
            }
            return(
                <div>
                    <p>
                        <label>支付方式 : </label>
                        <span>
                            <select  defaultValue={payList[0]}  onChange = {this.WyChangePay.bind(this)}>
                                {ret}
                            </select>
                        </span>
                    </p>
                    <p>
                        <label>支付渠道 : </label>
                        <span>
                            <select  defaultValue={this.state.payCanelList[0]}    onChange = {this.WyChangeCanl.bind(this)}>
                                {payCanelListOptions}
                            </select>
                        </span>
                    </p>
                    <p>
                        <label>存款金额 : </label>
                        <span>
                            {inputAmount}
                            {AmountSpan}
                        </span>
                    </p>
                </div>
            )
    }
    changeOfflineBankCode(e){
        let val = JSON.parse(e.target.value);
        let self = this;
        self.setState({
            offlineBankId:val.index,
            offlineBankCode:val.Bank.Id,
            hideAtmBox:true
        });
    }
    // 银行转账
    renderofflinepay_option(AmountSpan) {
        var ret = [];
        let inputAmount = <input id="yhdeposit_money"
        placeholder="请输入存款金额"
        type="number"
        className="input member-input"
        required
        name="fr_amount" ref="ThirdPayMoney"/>

        // if(!this.state.payNow.MaxAmount || $.inArray(this.state.payNow.BankNo,fifter) < 0 ){
        //     this.state.payNow = payTrueList[payList[0]].cont[0]; 
           
        // }
        if(this.props.offlineAccounts.length>0){
            if(this.state.offlineBankCode == ""){
                this.state.offlineBankId = 0;
                this.state.offlineBankCode = this.props.offlineAccounts[0].Bank.Id;
                this.state.hideAtmBox = true;
            }
            for (let i = 0; i < this.props.offlineAccounts.length; i++) {
                var BankInfo = this.props.offlineAccounts[i];
                this.state.yhPayNow = this.props.offlineAccounts[0]; 
                BankInfo.index = i;
                ret.push(<option key={i} value={JSON.stringify(BankInfo)}>{BankInfo.Bank.BankName}</option>)
            }
        }else{
            ret.push(<option key="1">暂无在线支付方式</option>)
        }
        AmountSpan=(
            <span className="font_red font_bold">*单笔转账限额 {this.state.yhPayNow.MinAmount}.00~{this.state.yhPayNow.MaxAmount}.00元</span>
        )
        return(
            <div>
                <p>
                    <label>支付方式:</label>
                    <span>
                        <select defaultValue={this.props.offlineAccounts[0]} onChange = {this.changeOfflineBankCode.bind(this)}>
                            {ret}
                        </select>
                    </span>
                </p>
                <p>
                    <label>支付渠道:</label>
                    <span>
                        <select>
                            <option  value="银行转账支付方式目前就只有一个，暂时做虚假的">渠道 1</option>
                        </select>
                    </span>
                </p>
                <p>
                        <label>存款金额 : </label>
                        <span>
                            {inputAmount}
                            {AmountSpan}
                        </span>
                    </p>
            </div>
        )   
    }
    SelOffline(){
        var bankAccountId = this.state.offlineBankId;
        var depositmoney = document.getElementById("yhdeposit_money").value;
        var offpay = this.props.offlineAccounts[bankAccountId];

        if(!offpay){
            window.swal({
                title: "请选择您的银行",
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            return;
        }
        if(!depositmoney||depositmoney==0||depositmoney < offpay.MinAmount || depositmoney > offpay.MaxAmount){
            window.swal({
                title: "存款金额错误",
                text: offpay.Bank.BankName+"允许存款金额范围："+offpay.MinAmount+"～"+offpay.MaxAmount,
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            return;
        }
        this.setState({
            selAdminAccount: this.props.offlineAccounts[bankAccountId],
            hideAtmBox:false
        });

        this.refs.offline_accountName.value = this.props.user.realName;  
    }
    closeAtmBox(){
        this.setState({
            hideAtmBox:true
        });
    }
    //银行转账的转账方式
    renderOfflineTransferTypes() {
        var ret = [];
        for (var i = 0; i < transferTypes.length; i++) {
            var oa = transferTypes[i];
            ret.push(
                <option key={i} value={oa.id}>{oa.name}</option>
            )
        }
        return ret;
    }
    renderProvince() {
        var Provis = [];
        for (var i = 0; i < provinces.length; i++) {
            var Provi = provinces[i];
            Provis.push(
                <option key={i} value={Provi.name}>{Provi.name}</option>
            );

        }
        return Provis;
    }
   renderCities() {
       var self = this;
        var Cities = [];
        for (var i = 0; i < self.state.selProvince.cities.length; i++) {
            var City = self.state.selProvince.cities[i];
            Cities.push(
                <option key={i} value={City.name}>{City.name}</option>
            );

        }
        return Cities;
    }
    onProvinceChanged(e) {
        this.setState({
            selProvince:provinces[e.target.selectedIndex]})
    }
    onSelectTransferType(e) {
        var selTransferType = transferTypes[e.target.selectedIndex];
        if (selTransferType) {
            this.setState({requirePlace:selTransferType.requirePlace});
        }
    }
    //点击银行转账提交
    offlinePay() {
        var depositmoney = document.getElementById("yhdeposit_money").value;
        if(this.state.reqLock)
        return;
        this.state.reqLock =true;
        var self = this;
        let filter = {//后台要接收的参数
            BankId:this.state.selAdminAccount.Id,
            TransType:this.refs.transferType.value,
            Amount:depositmoney,
            AccountName:this.refs.offline_accountName.value || this.props.user.realName || ""
        };
        if(this.state.requirePlace){
            filter.Province=this.refs.province.value;
            filter.City=this.refs.city.value;
            filter.Address=this.refs.branchName.value;
        }
        new ApiOfflineDepositAction(filter).fly((resp)=>{
            if(resp.StatusCode===0) {
                window.swal({
                    title: "线下支付申请成功",
                    text: "支付单号: " + resp.OrderNo + "\n\n帐户名: " + this.state.selAdminAccount.AccountName + "\n\n银行卡号: " + this.state.selAdminAccount.AccountNo + "\n\n银行: " + this.state.selAdminAccount.Bank.BankName + "\n\n支行: " + this.state.selAdminAccount.OpeningBank,
                    type: "success",
                    confirmButtonColor: "#c5841f",
                    confirmButtonText: "OK",
                });
                this.setState({
                    hideAtmBox: true
                });
            }else{
                if(resp.Message){
                    window.swal("错误",resp.Message, "error");
                }else{
                    window.swal("错误","支付链接，请稍后再试或联系客服", "error");
                }
            }
            self.state.reqLock = false;
        });
    }
    render() {
        const Province = this.renderProvince();
        const City = this.renderCities();
        const renderPayTypeFrom = this.renderPayTypeFrom();
        const onlinebank = this.renderonlinebank();
        const offlinepay_list = this.renderofflinepay_option();
        return (
            <div>
                <div className="clearfix t20 member-content member-border-bottom2">
                    <div className="border p20 ht-jinggao clearfix">
                        <div className="fl jgico htico"></div>
                        <div className="fl info f14">
                            <p>支付宝/微信转账操作步骤：1. 输入存款金额，再点击提交；2. 提交进入即显示付款二维码，采用支付宝/微信扫一扫进行付款；3. 确定付款完成后，系统将会即时添加到您的会员账户：</p>
                        </div>
                    </div>
                </div>
                <div className="clearfix t20 ht-cunkuan deposit member-content">
                {this.props.payThirdInfos && this.props.payThirdInfos.length>0?
                        <div>
                            <div className="onlinepay">
                                <div className="onlinepay_left">在线支付</div>
                                <div className="onlinepay_right"></div>
                            </div>
                            {/* {this.state.isLoading?this.loadingDom():""} */}
                            <div className="t f14 depositContent">
                                {renderPayTypeFrom}
                                <p className="tips font_red font_bold">提示：在线支付操作步骤： 1. 选择支付方式以及支付渠道； 2. 输入存款金额，再点击提交； 3. 提交进入即显示付款二维码，采用第三方APP扫一扫进行付款；或者跳转至第三方支付网站进行支付； 4. 确定付款完成后，系统将会即时添加到您的会员账户</p>
                                <button className="memberBtn" onClick={this.sendThirdpay.bind(this,'ZXZF')}>存款</button>

                            </div>
                            
                        </div>
                :null}
                    {this.props.offlineWeixinAliAccounts && this.props.offlineWeixinAliAccounts.length>0?
                        <div>
                            <div className="onlinepay">
                                <div className="onlinepay_left">微信/支付宝转账</div>
                                <div className="onlinepay_right offlineHint">建议您存款提交非整数金额，如102，可加速添加到帐时间</div>
                            </div>
                            <div className="t f14 depositContent">

                            </div>
                        </div>
                        :null}
                        
                    {this.props.payOnline && this.props.payOnline.length>0?
                        <div>
                            <div className="onlinepay">
                                <div className="onlinepay_left">在线网银</div>
                                <div className="onlinepay_right"></div>
                            </div>
                            <div className="t f14 depositContent">
                                {onlinebank}
                                <button className="memberBtn"  onClick={this.sendThirdpay.bind(this,'ZXWY')}>存款</button>
                            </div>
                        </div> :null}
                        {this.props.offlineAccounts && this.props.offlineAccounts.length>0?
                        <div>
                             <div className="onlinepay">
                                <div className="onlinepay_left">银行转帐</div>
                                <div className="onlinepay_right"></div>
                            </div>
                            <div className="t f14 depositContent">
                                {offlinepay_list}
                                <button className="memberBtn" onClick={this.SelOffline.bind(this)}>存款</button>
                                 <div id="payform" >
                                    <div className="atmBox" hidden={this.state.hideAtmBox}>
                                    <div className="atmBox_title">银行转帐</div>
                                    <i className="fa fa-times atmBox_clossbtn" aria-hidden="true" onClick={this.closeAtmBox.bind(this)}></i>
                                    {this.state.selAdminAccount ?
                                         <div className="atmBox_texttitle">
                                           <div width="35%" className="atmBox_text">收款信息:</div>
                                           <div width="65%">
                                           <span className="ml5 f16" style={{color:"#ba7e70"}}>
                                                    帐户名：
                                                    {this.state.selAdminAccount.AccountName}
                                                </span>
                                                <br/>
                                                <span className="ml5 f16" style={{color:"#ba7e70"}}>
                                                                    银行卡号：
                                                <span onClick={this.openLink} style={{'color':'red','cursor':'pointer'}}>{this.state.selAdminAccount.AccountNo}</span>
                                                                </span><br/>
                                                <span className="ml5 f16" style={{color:"#ba7e70"}}>
                                                                    银行：
                                                    {this.state.selAdminAccount.Bank.BankName}
                                                                </span><br/>
                                                <span className="ml5 f16" style={{color:"#ba7e70"}}>
                                                                    支行：
                                                    {this.state.selAdminAccount.OpeningBank}
                                                                </span>
                                           </div>
                                         </div>:null}
                                         <div className="atmBox_texttitle">
                                            <div width="35%" className="atmBox_text">
                                                转出帐户名:
                                            </div>
                                            <div width="65%">
                                                <span id="amt_field">
                                                    <input type="text" className="input w238 member-input" ref="offline_accountName"
                                                           placeholder="(如果非本人卡，请填写)" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="atmBox_texttitle">
                                            <div width="35%" className="atmBox_text">转帐方式：</div>
                                            <div width="65%">
                                                <select name="fr_promo" className="select w260 member-input" ref="transferType" onChange={this.onSelectTransferType.bind(this)}>
                                                    {this.renderOfflineTransferTypes()}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="atmBox_texttitle" hidden={!this.state.requirePlace}>
                                            <div width="35%" className="atmBox_text">支行省：</div>
                                            <div width="65%">
                                                <select name="fr_promo" className="select w260 member-input" ref="province" onChange={this.onProvinceChanged.bind(this)}>
                                                    {Province}
                                                </select>
                                            </div>
                                        </div>

                                         <div className="atmBox_texttitle" style={{display:this.state.requirePlace?"block":"none"}}>
                                            <div width="35%" className="atmBox_text">支行市：</div>
                                            <div width="65%">
                                                <select name="fr_promo" className="select w260 member-input" ref="city">
                                                    {City}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="atmBox_texttitle" style={{display:this.state.requirePlace?"block":"none"}}>
                                            <div width="35%" className="atmBox_text">支行地址：</div>
                                            <div width="65%">
                                                <span id="amt_field">
                                                    <input type="text" className="input w238 member-input" ref="branchName"
                                                           placeholder="地址" name="fr_branchName"/>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="atmBox_texttitle">
                                            <div width="35%" className="atmBox_text">&nbsp;</div>
                                            <div width="65%">
                                                <input type="submit" onClick={this.offlinePay.bind(this)} className="htbtnlg w260 color-second BGcolor-second" value="确认并提交"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>                           
                            </div>
                        </div>
                        :null}


                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        payBankInfos: state.payBankInfos,
        payThirdInfos: state.payThirdInfos,
        apiResult: state.apiResult,
        user: state.user,
        offlineAccounts: state.offlineAccount.offlineAccounts,
        offlineWeixinAliAccounts: state.offlineAccount.offlineWeixinAliAccounts,
        offlineTransferTypes: state.offlineAccount.transferTypes,
        remoteSysConfs:state.remoteSysConfs,
        payOnline:state.payOnline
    }
);

export default connect(mapStateToProps, {})(DepositPage2);
