/**
 * Created by sobi on 2017/10/13.
 */

import React, {Component} from 'react';
import QRCode from 'qrcode.react';
import {connect} from 'react-redux';
import {
    ApiThirdDepositAction,
    ApiPayBanksAction,
    ApiDepositAction,
    ApiOfflineDepositAction,
    ApiGetAdminAllBanksAction,
    ApiQueryOrderAction,
    ApiPlayerInfoAction,
    ApiOnlinePayAction,
    ApiSubmitOnlinePayAction,
    ApiQueryDepositRecordsAction
} from "globalAction";
import {transferTypes} from "offlineTransferJson";
import {provinces} from "../../../common/common";
import {Link,browserHistory} from 'react-router'
import {Spin,Icon} from "antd";
class DepositPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requirePlace: false,
            selAdminAccount: null,
            selOnlineBank: null,
            hideonlineQRpayBox:true,
            hideoffline_QRpayBox:true,

            isLoading:false,//二维码生成中
            thirdProgress:false,//第三方请求状态
            thirdPayImg:"",//二维码地址
            thirdPayRecordId:"",//第三方单号
            payType:"",//支付方式
            payIndex:"0",//支付类型在props中的index
            hideAtmBox:true,//银行转账
            onlineBankCode:"",//在线网银Code
            onlineBankId:"",//在线网银Id
            offlineBankCode:"",//银行转账Code
            offlineBankId:"",//银行转账ID
            payNow:{},//在线支付当前渠道信息
            payCanelList:[],//当前支付所含渠道
            isPayLink:true,//是否是跳转链接或者是二维码
            transferType:1,//银行转账类型参数
            param:{
                amount:0,
                id:0,
                thirdPayId:0,
                resultType:"QRCODE"
            },
            reqLock:false

        };
        this.state.selProvince = provinces[0];
    }
    componentWillMount() {
        let self = this;
        new ApiOnlinePayAction().fly();
        new ApiPayBanksAction().fly();
        new ApiGetAdminAllBanksAction().fly();
    }
    onProvinceChanged(e) {
        this.setState({selProvince:provinces[e.target.selectedIndex]})
    }

    //根据payType不同调用不同api
    howPay(){
        if(this.state.payType=="ZXWY" ){//如果是在线网银
            // this.onlineBankPay(this.state.onlineBankId)
            this.sendOnlinePay(true);
        }else if(this.state.payType=="YHZZ"){//银行转账
            if(this.state.isPayLink){
                this.offlinePay();
            }
            else{
                this.openQrImg()
            }
        }else if(this.state.payType=="ZXZF"){//在线支付
            this.sendOnlinePay();
        }else{//第三方支付方式
            this.sendThirdpay(this.state.payIndex,this.state.payType)
        }

    }
    openLink(){
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
    }

    /*【银行转账相关】*/
    SelOffline(){
        var bankAccountId = this.state.offlineBankId;
        var depositmoney = document.getElementById("deposit_money").value;
        var offpay = this.props.allOfflineBanks[bankAccountId];
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
        let BankCodeIf = offpay.Bank.BankCode;
        let TransType = 1;
        if(BankCodeIf.indexOf("ALIPAY") != -1){
            BankCodeIf = false;
            TransType = 6;
        }else if(BankCodeIf.indexOf("WECHAT") != -1){
            BankCodeIf = false;
            TransType = 7;
        }else{//非支付宝微信类型需要填写地址信息；
            BankCodeIf = true;
            TransType = 1;
        }
        this.setState({
            selAdminAccount: this.props.allOfflineBanks[bankAccountId],
            hideAtmBox:false,
            requirePlace:BankCodeIf,
            transferType:TransType
        });
    }
    //银行转账Action
    offlinePay() {
        var depositmoney = document.getElementById("deposit_money").value;
        if(this.state.reqLock)
            return;
        this.state.reqLock =true;
        var self = this;
        let filter = {//后台要接收的参数
            BankId:this.state.selAdminAccount.Id,
            TransType:this.state.transferType,
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
                    hideAtmBox: true,
                    requirePlace:false
                });
            }else{
                if(resp.Message){
                    window.swal("错误",resp.Message, "error");
                }else{
                    window.swal("错误","支付链接，请稍后再试或联系客服", "error");
                }
            }
            new ApiQueryDepositRecordsAction().fly();
            self.state.reqLock = false;
        });
    }
    // 二维码支付
    openQrImg(){
        let item = this.props.allOfflineBanks[this.state.offlineBankId]; // 后台传入的信息
        var depositmoney = document.getElementById("deposit_money").value;; // 充值数
        var depositName = this.refs.alipayName.value; // 用户充值名
        if(this.state.reqLock)
            return;
        this.state.reqLock =true;
        var self = this;
        if(!depositName){
            window.swal({
                title: "未填写姓名",
                text: "请如实填写转账人的姓名，以便核实！",
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            self.state.reqLock = false;
            return;
        }
        let filter = {//后台要接收的参数
            BankId:item.Id,
            TransType:6,
            Amount:depositmoney,
            AccountName:depositName
        };
        new ApiOfflineDepositAction(filter).fly((resp)=>{
            if(resp.StatusCode===0) {
                window.swal({
                        title: item.AccountName+"支付申请成功",
                        text: "支付单号: " + resp.OrderNo + "\n\n帐户名: " +
                            this.state.selAdminAccount.AccountName + "\n\n银行卡号: " +
                            this.state.selAdminAccount.AccountNo + "\n\n银行: " +
                            this.state.selAdminAccount.Bank.BankName,
                        type: "success",
                        confirmButtonColor: "#c5841f",
                        confirmButtonText: "OK",
                    });
                this.setState({
                    hideAtmBox: true,
                    requirePlace:false
                });
            }
            else{
                if(resp.Message){
                    window.swal("错误",resp.Message, "error");
                }else{
                    window.swal("错误","支付链接，请稍后再试或联系客服", "error");
                }
            }
            new ApiQueryDepositRecordsAction().fly();
            self.state.reqLock = false;
        })
    }
    //渲染【银行转账】的收款信息和帐户名部分的Dom
    renderOfflinePay(){
        let self =this;
        function renderProvince() {
            var Provis = [];
            for (var i = 0; i < provinces.length; i++) {
                var Provi = provinces[i];
                Provis.push(
                    <option key={i} value={Provi.name}>{Provi.name}</option>
                );

            }
            return Provis;
        }
        function renderCities() {
            var Cities = [];
            for (var i = 0; i < self.state.selProvince.cities.length; i++) {
                var City = self.state.selProvince.cities[i];
                Cities.push(
                    <option key={i} value={City.name}>{City.name}</option>
                );

            }
            return Cities;
        }
        const Province = renderProvince();
        const City = renderCities();
       
        return (

            <div className="offlineBank" >
                {self.state.selAdminAccount ?
                    <div className="offlineBankInfo ">
                        <h5 className="offlineBank_text">收款信息</h5>
                        {this.state.isPayLink?
                            <div className="bankPay">
                                <p>
                                    <label>帐户名：</label>
                                    <span>{self.state.selAdminAccount.AccountName}</span>
                                </p>
                                <p>
                                    <label>银行卡号：</label>
                                    <span onClick={this.openLink} style={{'color':'blue','cursor':'pointer'}}>{self.state.selAdminAccount.AccountNo}</span>
                                </p>
                                <p>
                                    <label>银行：</label>
                                    <span>{self.state.selAdminAccount.Bank.BankName}</span>
                                </p>
                                <p>
                                    <label>支行：</label>
                                    <span>{self.state.selAdminAccount.OpeningBank}</span>
                                </p>
                            </div>
                            :
                            <div className='alipayCode'>
                                <div className="alipayCode_info">
                                    <p>
                                        <label>收款银行：</label>
                                        <span>{self.state.selAdminAccount.Bank.BankName}</span>
                                    </p>
                                    <p>
                                        <label>收款姓名：</label>
                                        <span>{self.state.selAdminAccount.AccountName}</span>
                                    </p>
                                    <p>
                                        <label>收款账号：</label>
                                        <span onClick={this.openLink} style={{'color':'#ff0000','cursor':'pointer'}}>{self.state.selAdminAccount.AccountNo}</span>
                                    </p>
                                </div>
                                <div className="alipayCode_qrcode">
                                    <div className="alipayQrImg_Box">
                                        <img width='180' src={window.config.prdImgUrl + self.state.selAdminAccount.ImageUrl}/>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    :null
                }
                {
                    this.state.isPayLink?
                        <div className="">
                            <p>
                                <label>转出帐户名：</label>
                                <span>
                                <input type="text"
                                       className="form-control"
                                       ref="offline_accountName"
                                       placeholder="(如果非本人卡，请填写)" defaultValue={self.props.user.realName}
                                />
                            </span>
                            </p>
                            <div  hidden={!self.state.requirePlace}>
                                <p>
                                    <label>支行省：</label>
                                    <span>
                                <select name="fr_promo" className="form-control" ref="province" onChange={self.onProvinceChanged.bind(self)}>
                                    {Province}
                                </select>
                            </span>
                                </p>
                                <p>
                                    <label>支行市：</label>
                                    <span>
                                 <select name="fr_promo"  className="form-control" ref="city">
                                    {City}
                                </select>
                            </span>
                                </p>
                                <p>
                                    <label>支行地址：</label>
                                    <span>
                                 <input type="text" className="form-control" ref="branchName" placeholder="地址" name="fr_branchName"/>
                            </span>
                                </p>
                            </div>
                        </div>
                    :
                        <div className="userPayInfo">
                            <p>
                                <label>存款人姓名：</label>
                                <span>
                                    <input  className="form-control" ref='alipayName' placeholder="请输入存款人姓名"/>
                                </span>
                            </p>
                        </div>
                }

            </div>
        )
    }
    //渲染【银行转账】的渠道
    renderofflinepay_option() {
        var ret = [];
        if(this.props.allOfflineBanks.length>0){
            if(this.state.offlineBankCode == ""){
                this.state.offlineBankId = 0;
                this.state.offlineBankCode = this.props.allOfflineBanks[0].Bank.Id;
                this.state.hideAtmBox = true;
            }
            for (let i = 0; i < this.props.allOfflineBanks.length; i++) {
                var BankInfo = this.props.allOfflineBanks[i];
                BankInfo.index = i;
                ret.push(<option key={i} value={JSON.stringify(BankInfo)}>{BankInfo.Bank.BankName}</option>)
            }

        }else{
            ret.push(<option key="1">暂无在线支付方式</option>)
        }


        return(
            <div>
                <p>
                    <label>支付方式:</label>
                    <span>
                        <select className="form-control" onChange = {this.changeOfflineBankCode.bind(this)}>
                            {ret}
                        </select>
                    </span>
                </p>
                <p>
                    <label>支付渠道:</label>
                    <span>
                        <select className="form-control">
                            <option selected value="银行转账支付方式目前就只有一个，暂时做虚假的">渠道 1</option>
                        </select>
                    </span>
                </p>
            </div>
        )
    }
    //渠道支付方式修改时调用的方法
    changeOfflineBankCode(e){
        let val = JSON.parse(e.target.value);
        let self = this;
        self.setState({
            offlineBankId:val.index,
            offlineBankCode:val.Bank.Id,
            hideAtmBox:true,
            isPayLink:val.Type != 3  // 是否是二维码
        });
    }



    //渲染【在线网银】表单
    renderonlinebank(){
        if(this.state.payType=="ZXWY"){
            var ret = [];//支付方式下拉
            const fifter = ['WECHAT','ALIPAY','QQPAY','JDPAY','WECHAT_WAP','ALIPAY_WAP','QQPAY_WAP','JDPAY_WAP','YLPAY','BAIDUPAY','ETH','BTC']
            let payList = [];//过滤前所有支付信息
            let payTrueList = {};//所有支付方式以及渠道
            let payCanelListOptions = [];//支付渠道下拉
            let AmountSpan="";
            let inputAmount = <input id="deposit_money"
                placeholder="请输入存款金额"
                type="number"
                className="input member-input form-control"
                required
                name="fr_amount" ref="ThirdPayMoney"/>
                
            for (var i = 0; i < this.props.payOnline.length; i++) {
                let p = this.props.payOnline[i];
                let code = p.BankNo;
                let index = payList.indexOf(code);
                if(index>=0){
                    // payList[index].payContent.push(p);
                    payTrueList[code].cont.push(p);
                   
                }else{
                    if($.inArray(code,fifter) < 0){
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
                    let bgname = payList[i]
                    ret.push(<option key={i} value={JSON.stringify(payTrueList[bgname].cont)}>{payTrueList[bgname].cont[0].BankName}</option>)
                }
                let spl = this.state.payNow.FixedAmount.split(",");
                if(spl[0]){//下拉
                    inputAmount = (
                        <select id="deposit_money"  className="form-control" name="fr_amount" ref="ThirdPayMoney">
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
                if(i==0){
                    payCanelListOptions.push(<option selected value={JSON.stringify(this.state.payCanelList[i])} key={i}>{this.state.payCanelList[i].AliasName?this.state.payCanelList[i].AliasName:"渠道"+this.state.payCanelList[i].ThirdPayId}</option>)
                }else{
                    payCanelListOptions.push(<option value={JSON.stringify(this.state.payCanelList[i])} key={i}>{this.state.payCanelList[i].AliasName?this.state.payCanelList[i].AliasName:"渠道"+this.state.payCanelList[i].ThirdPayId}</option>)
                }
                
            }

            return(
                <div>
                    <p>
                        <label>支付方式:</label>
                        <span>
                            <select  className="form-control" onChange = {this.ChangePay.bind(this)}>
                                {ret}
                            </select>
                        </span>
                    </p>
                    <p>
                        <label>支付渠道:</label>
                        <span>
                            <select  className="form-control" onChange = {this.ChangeCanl.bind(this)}>
                                {payCanelListOptions}
                            </select>
                        </span>
                    </p>
                    <p>
                        <label>存款金额:</label>
                        <span>
                            {inputAmount}
                            {AmountSpan}
                        </span>
                    </p>
                </div>
            )   

        }else{
           return(
            <p>
                <label>存款金额:</label>
                <span>
                        <input id="deposit_money"
                            placeholder="请输入存款金额"
                            type="number"
                            className="input member-input form-control"
                            required
                            name="fr_amount" ref="ThirdPayMoney"/>
                    {AmountSpan}
                </span>
            </p>
           )
        }
 
    }
    //在线网银Action
    onlineBankPay(id){
        let self = this;
        var i = id;
        var depositmoney = document.getElementById("deposit_money").value;
        var bank = self.props.payBankInfos[i];
        if(!bank){
            window.swal({
                title: "请选择您的银行",
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            return;
        }
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

        if(depositmoney==0||depositmoney < bank.MinAmount || depositmoney > bank.MaxAmount){
            window.swal({
                title: "存款金额错误",
                text: bank.BankName+"允许存款金额范围："+bank.MinAmount+"～"+bank.MaxAmount,
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            return;
        }
        if(this.state.reqLock)
        return;
        this.state.reqLock =true;

        new ApiDepositAction(depositmoney, bank.BankNo, bank.BankName).fly((resp)=>{
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
                                            // new ApiQueryOrderAction(resp.recordId).fly(resp => {
                                            //     if (resp.StatusCode === 0) {
                                            //         new ApiPlayerInfoAction().fly();
                                            //     }
                                                browserHistory.push("/records_deposit");
                                            // });
                                        }
                                        else {
                                            window.open(self.props.remoteSysConfs.online_service_link,'servers');
                                        }
                                    });
                            }, 1000);
                        }
                        else {
                        }
                    });
            }
            self.state.reqLock = false;
        });

    }


    //渲染【第三方】表单
    renderThirdDom(){
        let self = this;
        let recordId =self.state.thirdPayRecordId;
        let imgCode = self.state.thirdPayImg;
        // let typeName = self.props.payThirdInfos[self.state.payIndex]['name'];
        let typeName = "";
        let money = document.getElementById("deposit_money").value;
        //支付完成
        function successPay(){
            self.setState({payType:""});
            new ApiQueryDepositRecordsAction().fly();
        }
        //支付失败
        function errorPay(){
            self.setState({payType:""});
            new ApiQueryDepositRecordsAction().fly();
            window.open(self.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        }
        return(
            <div className="thirdFrom">
                <QRCode className="qrImg"
                        includeMargin={true} //内部是否有margin
                        size={160}  //图片大小
                        value={imgCode || "" } //地址
                />
                <p>
                    您的单号为:<strong>{recordId}</strong>
                    存款{typeName}账户随时变更，请勿保存当前二维码。<br/>
                    请用您{typeName}软件扫描二维码进行支付，即可实时到帐！<br/>
                    您需要支付的金额为：<strong style={{color:'#f00'}}>{money}</strong>元
                </p>
                <div className="resultBtn">
                    <button className="btn" onClick={successPay}>支付完成</button>
                    <button className="btn default" onClick={errorPay}>支付失败</button>
                </div>
            </div>
        )
    }
    //第三方支付Action
    sendThirdpay(index,code){
        var self = this;
        var Thirdpay = this.props.payThirdInfos[index];
        var Thirdpaycode = code;
        var depositmoney = document.getElementById("deposit_money").value;
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
                text: Thirdpay.name+"允许存款金额范围："+Thirdpay.MinAmount+"～"+Thirdpay.MaxAmount,
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            return;
        }

        if (Thirdpaycode === "WECHAT") {
            Thirdpaycode = 2;
        }
        if(this.state.reqLock)
        return;
        this.state.reqLock =true;
        this.setState({
            isLoading:true
        },()=>{
            new ApiThirdDepositAction(depositmoney, Thirdpaycode).fly((resp)=>{
                if(resp.StatusCode ===0) {
                    self.setState({
                        isLoading:false,
                        thirdProgress:true,
                        thirdPayImg:resp.Content,
                        thirdPayRecordId:resp.OrderNo
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
                self.state.reqLock = false;
            });
        })

    }

    //第三方支付Action
    sendOnlinePay(ZXZF =false){
        var self = this;
        var Thirdpay = this.state.payNow;
        var Thirdpaycode = Thirdpay.BankNo;
        var depositmoney = document.getElementById("deposit_money").value;
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
            ReturnType:Thirdpay.IsJumpScanCode == 1?"QRLink":"QRCode",
            Tag:window.config.webSiteTag,
            BankNo:Thirdpay.BankNo
        }
        if(ZXZF){
            this.state.param.ReturnType = "Online"
        }
        if(this.state.reqLock)
        return;
        this.state.reqLock =true;
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
                                self.setState({payType:""});
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
                                                new ApiQueryDepositRecordsAction().fly();
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
                self.state.reqLock = false;
                
            })
        }else{
            this.setState({
                isLoading:true
            },()=>{
                new ApiSubmitOnlinePayAction(this.state.param).fly((resp)=>{
                    if(resp.StatusCode ===0) {
                        self.setState({
                            isLoading:false,
                            thirdProgress:true,
                            thirdPayImg:resp.Content,
                            thirdPayRecordId:resp.OrderNo
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
                    self.state.reqLock = false;
                })
            })
        }
    }
    //渲染支付方式DOM
    renderTabsUl(){     
        let ret = [];
        let className="col-md-6";
        let FeeRate="";
        FeeRate = this.props.backConfigs.DepositRefundFeeRate*100;
        FeeRate=FeeRate.toFixed(2);//保留2位
        FeeRate=FeeRate.substring(0,FeeRate.lastIndexOf('.')+2);//转成小数点后1位  因为不想进行四舍五入
        if(this.props.payThirdInfos.length>0){
            className="col-md-4";
        }
        let bankSys = this.props.remoteSysConfs.deposit_order?
            JSON.parse(this.props.remoteSysConfs.deposit_order):
            [{"key":"ZXZF","cname":"在线支付"},{"key":"YHZZ","cname":"银行转账"},{"key":"ZXWY","cname":"在线网银"}];
        for(let i=0;i<bankSys.length;i++){
            let item = bankSys[i];
            switch (item.key){
                case "ZXWY":
                    ret.push(
                        <div key='ZXWY' className={className} >
                            <div className="first">
                                <a  data-payIndex="" onClick={this.navOn.bind(this)} id="ZXWY">
                                    极速网银存款
                                    <span className="new"></span>
                                </a>
                            </div>
                            <div><p className="color-limit">自动到账</p></div>
                            <div><p>第三方快捷充值</p></div>
                            <div className="last">
                                <p>支持：电脑,手机</p>
                            </div>
                        </div>
                    );
                break;
                case "YHZZ":
                    ret.push(
                        <div key='YHZZ' className={className}>
                            <div className="first">
                                <a  data-payIndex="" onClick={this.navOn.bind(this)}  id="YHZZ">
                                    银行卡存款
                                    <span className="recommend"></span>
                                </a>
                            </div>
                            <div><p className="color-limit">赠送{FeeRate}%无上限</p></div>
                            <div>
                                <p>第三方快捷充值</p>

                            </div>
                            <div className="last">
                                <p>支持：电脑,手机</p>
                            </div>
                        </div>
                    );
                break;
                case "ZXZF":
                    if(this.props.payThirdInfos.length>0){
                        ret.push(
                            <div key='ZXZF'  className={className}>
                                <div className="first">
                                    <a data-payIndex=""  onClick={this.navOn.bind(this)} id="ZXZF">
                                        在线扫码支付
                                        <span className="new"></span>
                                    </a>
                                </div>
                                <div><p className="color-limit">自动到账</p></div>
                                <div>
                                    <p>手机二维码支付</p>
                                </div>
                                <div className="last">
                                    <p>支持：电脑,手机</p>
                                </div>
                            </div>
                        );
                    }
                break;
            }
        }
        return ret;
    }

    //根据【payType】渲染表单
    renderPayTypeDom(AmountSpan){
        let payTypeDom;
        if(!this.state.payType) return "";
        if(this.state.payType=="YHZZ"){//【银行转账】
            payTypeDom=(
                <div>
                    {this.renderofflinepay_option()}
                </div>
            )
        }else{
            payTypeDom=(<div>{this.state.thirdProgress?this.renderThirdDom():""}</div>)
            //payTypeDom=(<div>{this.renderThirdDom()}</div>)
        }
        return payTypeDom;
    }
    //切换
    navOn(e){
        let $DOM =  window.$(e.currentTarget);
        let id = e.currentTarget.id;
        this.setState({
            thirdProgress:false,
            payType:id,
            hideAtmBox:true, // 隐藏收款信息组件（点击下一步）
            payIndex:$DOM.attr('data-payIndex')
        });

    }
    loadingDom(){
        return(<div className="loaderDom"> <Spin wrapperClassName="loadText" tip="二维码生成中,请稍后..."/></div>)
    }

    renderPayTypeFrom(AmountSpan){
        if(this.state.payType=="ZXZF"){
            var ret = [];//支付方式下拉
            const fifter = ['WECHAT','ALIPAY','QQPAY','JDPAY','WECHAT_WAP','ALIPAY_WAP','QQPAY_WAP','JDPAY_WAP','YLPAY','BAIDUPAY','ETH','BTC']
            let payList = [];//过滤前所有支付信息
            let payTrueList = {};//所有支付方式以及渠道
            let payCanelListOptions = [];//支付渠道下拉
            let inputAmount = <input id="deposit_money"
                placeholder="请输入存款金额"
                type="number"
                className="input member-input form-control"
                required
                name="fr_amount" ref="ThirdPayMoney"/>
                
            for (var i = 0; i < this.props.payOnline.length; i++) {
                let p = this.props.payOnline[i];
                let code = p.BankNo;
                let index = payList.indexOf(code);
                if(index>=0){
                    // payList[index].payContent.push(p);
                    payTrueList[code].cont.push(p)
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
                    let bgname = payList[i]
                    ret.push(<option key={i} value={JSON.stringify(payTrueList[bgname].cont)}>{payTrueList[bgname].cont[0].BankName}</option>)
                }
                let spl = this.state.payNow.FixedAmount.split(",");
                if(spl[0]){//下拉
                    inputAmount = (
                        <select id="deposit_money"  className="form-control" name="fr_amount" ref="ThirdPayMoney">
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
                if(i==0){
                    payCanelListOptions.push(<option selected value={JSON.stringify(this.state.payCanelList[i])} key={i}>{this.state.payCanelList[i].AliasName?this.state.payCanelList[i].AliasName:"渠道"+this.state.payCanelList[i].ThirdPayId}</option>)
                }else{
                    payCanelListOptions.push(<option value={JSON.stringify(this.state.payCanelList[i])} key={i}>{this.state.payCanelList[i].AliasName?this.state.payCanelList[i].AliasName:"渠道"+this.state.payCanelList[i].ThirdPayId}</option>)
                }
                
            }

            return(
                <div>
                    <p>
                        <label>支付方式:</label>
                        <span>
                            <select  className="form-control" onChange = {this.ChangePay.bind(this)}>
                                {ret}
                            </select>
                        </span>
                    </p>
                    <p>
                        <label>支付渠道:</label>
                        <span>
                            <select  className="form-control" onChange = {this.ChangeCanl.bind(this)}>
                                {payCanelListOptions}
                            </select>
                        </span>
                    </p>
                    <p>
                        <label>存款金额:</label>
                        <span>
                            {inputAmount}
                            {AmountSpan}
                        </span>
                    </p>
                </div>
            )   

        }
        else if(this.state.payType=="ZXWY"){
                var ret = [];//支付方式下拉
                const fifter = ['WECHAT','ALIPAY','QQPAY','JDPAY','WECHAT_WAP','ALIPAY_WAP','QQPAY_WAP','JDPAY_WAP','YLPAY','BAIDUPAY','ETH','BTC']
                let payList = [];//过滤前所有支付信息
                let payTrueList = {};//所有支付方式以及渠道
                let payCanelListOptions = [];//支付渠道下拉
                let inputAmount = <input id="deposit_money"
                    placeholder="请输入存款金额"
                    type="number"
                    className="input member-input form-control"
                    required
                    name="fr_amount" ref="ThirdPayMoney"/>
                    
                for (var i = 0; i < this.props.payOnline.length; i++) {
                    let p = this.props.payOnline[i];
                    let code = p.BankNo;
                    let index = payList.indexOf(code);
                    if(index>=0){
                        // payList[index].payContent.push(p);
                        payTrueList[code].cont.push(p)
                    }else{
                        if($.inArray(code,fifter) < 0){
                            payList.push(code);
                            payTrueList[code] = {cont:[p]}
                        }
                    }
                }
                if(payList.length>0){
                    if(!this.state.payNow.MaxAmount || $.inArray(this.state.payNow.BankNo,fifter) >= 0 ){
                        this.state.payNow = payTrueList[payList[0]].cont[0]; 
                    } 
                    if(this.state.payCanelList.length==0|| $.inArray(this.state.payCanelList[0].BankNo,fifter) >= 0 ){
                        this.state.payCanelList = payTrueList[payList[0]].cont;
                    } 
                    for (let i = 0; i < payList.length; i++) {
                        let bgname = payList[i]
                        ret.push(<option key={i} value={JSON.stringify(payTrueList[bgname].cont)}>{payTrueList[bgname].cont[0].BankName}</option>)
                    }
                    let spl = this.state.payNow.FixedAmount.split(",");
                    if(spl[0]){//下拉
                        inputAmount = (
                            <select className="form-control" id="deposit_money" name="fr_amount" ref="ThirdPayMoney">
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
                    
                    if(i==0){
                        payCanelListOptions.push(<option selected value={JSON.stringify(this.state.payCanelList[i])} key={i}>{this.state.payCanelList[i].AliasName?this.state.payCanelList[i].AliasName:"渠道"+this.state.payCanelList[i].ThirdPayId}</option>)
                    }else{
                        payCanelListOptions.push(<option value={JSON.stringify(this.state.payCanelList[i])} key={i}>{this.state.payCanelList[i].AliasName?this.state.payCanelList[i].AliasName:"渠道"+this.state.payCanelList[i].ThirdPayId}</option>)
                    }
                    
                }

                return(
                    <div>
                        <p>
                            <label>支付方式:</label>
                            <span>
                                <select className="form-control" onChange = {this.ChangePay.bind(this)}>
                                    {ret}
                                </select>
                            </span>
                        </p>
                        <p>
                            <label>支付渠道:</label>
                            <span>
                                <select className="form-control" onChange = {this.ChangeCanl.bind(this)}>
                                    {payCanelListOptions}
                                </select>
                            </span>
                        </p>
                        <p>
                            <label>存款金额:</label>
                            <span>
                                {inputAmount}
                                {AmountSpan}
                            </span>
                        </p>
                    </div>
                )   
        }
        else{
           return(
            <p>
                <label>存款金额:</label>
                <span>
                        <input id="deposit_money"
                            placeholder="请输入存款金额"
                            type="number"
                            className="input member-input form-control"
                            required
                            name="fr_amount" ref="ThirdPayMoney"/>
                    {AmountSpan}
                </span>
            </p>
           )
        }
    }
    ChangePay(e){//选择支付方式,加载对应支付渠道下拉；
        let data = JSON.parse(e.target.value);
        this.setState({
            payCanelList:data,
            payNow:data[0]
        })
    }

    ChangeCanl(e){//选择渠道，显示对应限额
        let data = JSON.parse(e.target.value);
        this.setState({
            payNow:data
        })
    }
    render() {
        const tabsUl = this.renderTabsUl();
        const payTypeDom = this.renderPayTypeDom(AmountSpan);
        let offlineFrom="" ;
        let h2Tilte;
        let AmountSpan;//限额提示
        let tips;
        if(this.state.payType=="YHZZ"){//【银行转账】
            h2Tilte="银行卡存款";
            offlineFrom = this.renderOfflinePay();
            if(this.state.offlineBankCode){
                AmountSpan = (<span className="font_red font_bold">*单笔转账限额 {this.props.allOfflineBanks[this.state.offlineBankId]['MinAmount']}.00~{this.props.allOfflineBanks[this.state.offlineBankId]['MaxAmount']}.00元</span>)
            }
        }else if(this.state.payType=="ZXWY"){//【在线网银】
            h2Tilte="极速网银存款";
            if(this.state.onlineBankCode){
                AmountSpan = (<span className="font_red font_bold">*单笔转账限额 {this.props.payBankInfos[this.state.onlineBankId]['MinAmount']}.00~{this.props.payBankInfos[this.state.onlineBankId]['MaxAmount']}.00元</span>)
            }
        }else{
            h2Tilte="在线扫码支付";
            tips = ( <div className="tips font_red font_bold">
                    <div className="tips-icon-container">
                        <Icon type="alert" /><br/>
                        温馨提示
                    </div>
                    <ul className="pull-left">
                        <li>选择支付方式以及支付渠道；</li>
                        <li>输入存款金额，再点击提交；</li>
                        <li>提交进入即显示付款二维码，采用第三方APP扫一扫进行付款；或者跳转至第三方支付网站进行支付；</li>
                        <li>确定付款完成后，系统将会即时添加到您的会员账户</li>
                    </ul>
            </div>)
        }


        return (
                <div className="deposit">
                    <div className="row tabs" hidden={!!this.state.payType}>
                        {tabsUl}
                    </div>
                    <div className="clearfix"></div>
                    <div className="fromCon" hidden={!this.state.payType}>
                        <h2 className="title">{h2Tilte}</h2>
                        {tips}
                        <div className="dpt_credit">
                            {payTypeDom}
                        </div>
                        {this.state.isLoading?this.loadingDom():""}
                        <div className="money" hidden={this.state.isLoading || this.state.thirdProgress}>
                            {this.renderPayTypeFrom(AmountSpan)}
                            {this.state.hideAtmBox?"":(offlineFrom)}

                            {
                                (this.state.hideAtmBox && this.state.payType=="YHZZ") ?
                                    (
                                        <div>
                                            <button onClick={()=>this.setState({payType:""})} className="btn goback">返回</button>
                                            <button onClick={this.SelOffline.bind(this)} className="btn">下一步</button>

                                        </div>
                                    )
                                    :(
                                        <div>
                                            <button onClick={()=>this.setState({payType:""})} className="btn goback">返回</button>
                                            <button onClick={this.howPay.bind(this)} className="btn">存款</button>
                                        </div>
                                    )
                            }

                        </div>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs:state.remoteSysConfs,
        payBankInfos: state.payBankInfos,
        payThirdInfos: state.payThirdInfos,
        backConfigs:state.backConfigs,
        user: state.user,
        allOfflineBanks: state.allOfflineAccount.allOfflineBanks,
        payOnline:state.payOnline
    }
);


export default connect(mapStateToProps, {})(DepositPage);