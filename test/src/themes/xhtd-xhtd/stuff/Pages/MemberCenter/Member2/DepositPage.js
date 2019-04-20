/**
 * xhtd-充值
 */

import React, {Component} from 'react';
import {connect,Link,IndexLink} from 'react-redux';
import {
    ApiThirdDepositAction,
    ApiPayBanksAction,
    ApiDepositAction,
    ApiOfflineDepositAction,
    ApiGetAdminAllBanksAction,
    ApiOnlinePayAction,
    ApiSubmitOnlinePayAction,
    ApiBanksAction
} from "globalAction";
import {provinces} from "../../../../../common/common";
import {browserHistory} from 'react-router'
import {transferTypes} from "offlineTransferJson";
import loadingImg from './scss/img/loading_wellbet.gif';
import { isRegExp } from 'util';
import QRCode from 'qrcode.react'
class DepositPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selAdminAccount: null, // 储存数据
            isLoading:false,//二维码生成中
            thirdProgress:false,//第三方请求状态
            thirdPayImg:"",//二维码地址
            thirdPayRecordId:"",//第三方单号
            payType:"YHZZ",//支付方式
            payIndex:"0",//支付类型在props中的index
            hideAtmBox:true,//银行转账
            onlineBankCode:"",//在线网银Code
            onlineBankId:"",//在线网银Id
            offlineBankCode:"",//银行转账Code
            offlineBankId:"",//银行转账ID
            payNow:{},//在线支付当前渠道信息
            payCanelList:[],//当前支付所含渠道
            isPayLink:true,//是否是跳转链接或者是二维码
            shortCut:true,// 是否存在快捷金额---
            transferType:1,//银行转账类型参数
            param:{
                amount:0,
                id:0,
                thirdPayId:0,
                resultType:"QRCODE"
            },
            reqLock:false,

        };
        this.state.selProvince = provinces[0]; // 省份默认第一个
    }
  
    // Api
    componentWillMount() {
        let self = this;
        new ApiGetAdminAllBanksAction().fly(); //新增获取所有收款银行列表  
        new ApiOnlinePayAction().fly(); // 获取在线支付银行列表
        new ApiPayBanksAction().fly(resp=>{
                if(resp.StatusCode ===0) {
                    if(resp.Banks.length>0){
                        try {
                        resp.Banks.forEach(item => {
                            if(item.BankNo =="ALIPAY_WAP" || item.BankNo =="WECHAT_WAP" || item.BankNo =="QQPAY_WAP" || item.BankNo =="JDPAY_WAP" || item.BankNo =="WECHAT" || item.BankNo =="ALIPAY" ||  item.BankNo =="QQPAY" ||  item.BankNo =="JDPAY" || item.BankNo =="YLPAY" || item.BankNo =="BAIDUPAY"){
                                self.setState({
                                    payType:"ZXZF"
                                })
                                throw new Error('exist')
                            }
                        });
                        }catch (e){   
                                      
                        }          
                    }
                }
            }
        );
    }  
    // 中文判断
    isChinese(str){
        var reCh=/[u00-uff]/;
        return !reCh.test(str);
    }
    // 选择省份时，城市发生变化
    onProvinceChanged(e) {
        this.setState({
            selProvince:provinces[e.target.selectedIndex]
        })
    }
    // 下一步    
    SelOffline(){
        var bankAccountId = this.state.offlineBankId; // 银行信息 下标   
        var depositmoney = document.getElementById("deposit_money").value; // 存款数
        var offpay = this.props.allOfflineBanks[bankAccountId]; // 传入的支付方式 ， 通过下标
        if(!offpay){
            window.swal({
                title: "请选择您的银行",
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            return;
        }
        // 判断输入金额
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
        // 传入类型，银行转账中 =》 支付宝微信与银联扫码
        let TransType = 1;
        let BankCodeIf = offpay.Bank.BankCode;
        if(BankCodeIf.indexOf('ALIPAY')!=-1){
            TransType = 6;
        }
        else if(BankCodeIf.indexOf('WECHAT')!=-1){
            TransType = 7;
        }
        else{
            TransType = 1;
        }                       
        this.setState({
            selAdminAccount: this.props.allOfflineBanks[bankAccountId],// 银行信息
            transferType:TransType, // 向后台传入的支付类型
            offlineBankId:offpay.index, // 数组下标
            offlineBankCode:offpay.Bank.Id, // 银行转账银行ID
            hideAtmBox:false, // 显示银行转账下一步后的收款信息
            isPayLink:offpay.Type==3?false:true // 判断二维码支付类型
        });
        document.getElementById("deposit_money").setAttribute('disabled',true)
    }
    // 银行转账下拉，支付方式，支付渠道选择下拉框
    renderofflinepay_option() {
        var ret = [];
        if(this.props.allOfflineBanks.length>0 ){
            if(this.state.offlineBankCode == "" || !this.refs.offlineBankDOM){
                // 默认选择第一个
                // 下标    
                this.state.offlineBankId = 0;    
                this.state.offlineBankCode = this.props.allOfflineBanks[0].Bank.Id; // 银行ID
                this.state.hideAtmBox = true; // 控制显示隐藏，点击下一步后显示的收款信息
            }
            for (let i = 0; i < this.props.allOfflineBanks.length; i++) {
                var BankInfo = this.props.allOfflineBanks[i];
                BankInfo.index = i;
                if(i==0){
                    ret.push(<option key={i} selected  value={JSON.stringify(BankInfo)}>{BankInfo.Bank.BankName}</option>)   
                }   
                else{
                    ret.push(<option key={i}  value={JSON.stringify(BankInfo)}>{BankInfo.Bank.BankName}</option>)   
                }          
            }
        }else{
            ret.push(<option key="1">暂无在线支付方式</option>)
        }
        return(
            <div>
                <p>
                    <label>支付方式:</label>
                    <span>
                        <select ref="offlineBankDOM" onChange = {this.changeOfflineBankCode.bind(this)}>
                            {ret}
                        </select>
                    </span>
                </p>
                <p>
                    <label>支付渠道:</label>
                    <span>
                        <select>
                            {/* 银行转账暂时1渠道 */}
                            <option value="银行转账支付方式目前就只有一个，暂时做虚假的">渠道 1</option>
                        </select>
                    </span>
                </p>
            </div>
        )   
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
        if(!this.isChinese(depositName)){
            window.swal({
                title: "非中文名称",
                text: "请如实填写转账人中文姓名，以便核实！",
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            self.state.reqLock = false;
            return;              
        }
        let filter = {//后台要接收的参数
            BankId:item.Id,
            TransType:this.state.transferType,
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
                },
                (isClick)=>{
                    if(isClick){
                        browserHistory.push("/records_deposit")
                    }   
                });
            }
            else{
                if(resp.Message){
                    window.swal("错误",resp.Message, "error");
                }else{
                    window.swal("错误","支付链接，请稍后再试或联系客服", "error");
                }
            }
            self.state.reqLock = false;
        })
    }
    //根据payType不同调用不同api
    howPay(){
        if(this.state.payType=="ZXWY" ){//如果是在线网银
            this.sendOnlinePay(true);
        }else if(this.state.payType=="YHZZ"){
            //银行转账
            if(this.state.isPayLink){
                this.offlinePay();
            }
            else{
                this.openQrImg()
            }
        }else if(this.state.payType=="ZXZF"){
            //在线支付
            this.sendOnlinePay();
        }else{
            //第三方支付方式
            this.sendThirdpay(this.state.payIndex,this.state.payType)
        }

    }
    // 客服
    openLink(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    //渲染【银行转账】表单
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
                        {!this.state.isPayLink?
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
                        :
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
                        }
                    </div>
                    :null
                }
                {
                    this.state.isPayLink?
                    <div className="bankInfos">
                        <p>
                            <label>转出帐户名：</label>
                            <span>
                                <input type="text" ref="offline_accountName" placeholder="(如果非本人卡，请填写)" defaultValue={self.props.user.realName}/>
                            </span>
                        </p>
                        <div>
                            <p>
                                <label>支行省：</label>
                                <span>
                                <select name="fr_promo" className="select w260 atmBox_input" ref="province" onChange={self.onProvinceChanged.bind(self)}>
                                    {Province}
                                </select>
                            </span>
                            </p>
                            <p>
                                <label>支行市：</label>
                                <span>
                                <select name="fr_promo" className="select w260 atmBox_input" ref="city">
                                    {City}
                                </select>
                            </span>
                            </p>
                            <p>
                                <label>支行地址：</label>
                                <span>
                                <input type="text" ref="branchName" placeholder="地址" name="fr_branchName"/>
                            </span>
                            </p>
                        </div>
                    </div>                        
                    :
                    <div className="userPayInfo">
                        <p>
                            <label>存款人姓名：</label>
                            <input ref='alipayName' placeholder="请输入存款人姓名"/>
                        </p>  
                    </div>
                }
            </div>
        )
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
            AccountName:this.refs.offline_accountName.value || this.props.user.realName || "",
            Province:this.refs.province.value,
            City:this.refs.city.value,
            Address:this.refs.branchName.value
        };
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
            self.state.reqLock = false;
            document.getElementById("deposit_money").removeAttribute('disabled')    
        });
    }
    // 选择支付方式 - 下拉框选择。
    changeOfflineBankCode(e){
        document.getElementById("deposit_money").removeAttribute('disabled')
        let val = JSON.parse(e.target.value);
        let self = this;
        self.setState({
            offlineBankId:val.index, // 数组下标
            offlineBankCode:val.Bank.Id, // 银行转账Code
            hideAtmBox:true, // 是否是银行转账
            isPayLink:val.Type == 3?false:true // 是否是二维码
        });  
    }
    //渲染【第三方】表单
    renderThirdDom(){
        let self = this;
        let recordId =self.state.thirdPayRecordId;
        let imgCode = self.state.thirdPayImg;
        let typeName = "";
        let money = document.getElementById("deposit_money").value;
        //支付完成
        function successPay(){
            browserHistory.push("/records_deposit");
        }
        //支付失败
        function errorPay(){
            window.open(self.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        }
        return(
            <div className="thirdFrom">
               <QRCode includeMargin={false} size={180} value={imgCode || ""}  className='qrcodeCanv' />
                <p>
                    您的单号为:<strong>{recordId}</strong>
                    存款{typeName}账户随时变更，请勿保存当前二维码。<br/>
                    请用您{typeName}软件扫描二维码进行支付，即可实时到帐！<br/>
                    您需要支付的金额为：<strong style={{color:'#f00'}}>{money}</strong>元
                </p>
                <div className="resultBtn">
                    <button className="memberBtn" onClick={successPay}>支付完成</button>
                    <button className="memberBtn default" onClick={errorPay}>支付失败</button>
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
    // 渲染支付方式DOM
    renderTabsUl(){     
        let ret = [];    
        if(this.props.payThirdInfos.length>0){            
            ret.push(
                <li key='ZXZF' data-payIndex="" className= {this.state.payType=="ZXZF"?"selected_red navbox navOnchoose":"navbox"}  onClick={this.navOn.bind(this)} id="ZXZF">
                    <a>在线支付</a>
                </li>
            );
        }
        ret.push(
            <li key='YHZZ' data-payIndex="" className={this.state.payType=="YHZZ"?"selected_red navbox navOnchoose":"navbox"}  onClick={this.navOn.bind(this)} id="YHZZ">
                <a>银行转账</a>
            </li>
        );
        ret.push(
            <li key='ZXWY' data-payIndex="" className={this.state.payType=="ZXWY"?"selected_red navbox navOnchoose":"navbox"}  onClick={this.navOn.bind(this)} id="ZXWY">
                <a>在线网银<span className="tooltiptextuc">自动到账</span></a>
            </li>
        );
        return ret;
    }
    //根据【payType】渲染表单
    renderPayTypeDom(AmountSpan){
        let payTypeDom;
        if(this.state.payType=="YHZZ"){//【银行转账】
            payTypeDom=(
                <div>
                    {/* <h4 className="font_red tipsH">请选择您的银行</h4> */}
                    {this.renderofflinepay_option()}
                </div>
            )
        }else{
            payTypeDom=(<div>{this.state.thirdProgress?this.renderThirdDom():""}</div>)
        }
        return payTypeDom;
    }
    // 支付方式切换（注释注释注释，导航切换，记性不好）
    navOn(e){
        let $DOM =  window.$(e.currentTarget);
        let id = e.currentTarget.id; // 点击导航元素的ID，支付方式ID
        this.setState({
            thirdProgress:false,//第三方支付请求状态
            payType:id, // 支付方式
            hideAtmBox:true, // 隐藏收款信息组件（点击下一步）
            payIndex:$DOM.attr('data-payIndex') //支付类型在props中的index
        });
    }
    // loading
    loadingDom(){
        return(<div className="loaderDom"><img src={loadingImg} /><p>二维码生成中,请稍后...</p></div>)
    } 
    // 请输入金额
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
                className="input member-input"
                required
                name="fr_amount" ref="ThirdPayMoney"/>                 
            for (var i = 0; i < this.props.payOnline.length; i++) {
                let p = this.props.payOnline[i];
                let code = p.BankNo;
                let index = payList.indexOf(code);
                if(index>=0){
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
                if(spl[0]){//下拉金额
                    this.state.shortCut = false;// 快捷金额隐藏
                    inputAmount = (
                        <select id="deposit_money" name="fr_amount" ref="ThirdPayMoney">
                            {spl.map((data,index)=>{
                                return <option key={index} value = {data}>{data}</option>
                            })}
                        </select>
                    )
                }else{//输入金额
                    this.state.shortCut = true; // 快捷金额显示
                    AmountSpan=(
                        <span className="font_red font_bold">*单笔转账限额 {this.state.payNow.MinAmount}.00~{this.state.payNow.MaxAmount}.00元</span>
                    )
                }
            }else{
                ret.push(<option key="1">暂无在线支付方式</option>)
            }

            for (var i = 0; i < this.state.payCanelList.length; i++) {
                if(i==0){
                    payCanelListOptions.push(<option value={JSON.stringify(this.state.payCanelList[i])} key={i}>{this.state.payCanelList[i].AliasName?this.state.payCanelList[i].AliasName:"渠道"+this.state.payCanelList[i].ThirdPayId}</option>)
                }else{
                    payCanelListOptions.push(<option value={JSON.stringify(this.state.payCanelList[i])} key={i}>{this.state.payCanelList[i].AliasName?this.state.payCanelList[i].AliasName:"渠道"+this.state.payCanelList[i].ThirdPayId}</option>)
                }
                
            }
            return(
                <div>
                    <p>
                        <label>支付方式:</label>
                        <span>
                            <select onChange = {this.ChangePay.bind(this)}>
                                {ret}
                            </select>
                        </span>
                    </p>
                    <p>
                        <label>支付渠道:</label>
                        <span>
                            <select onChange = {this.ChangeCanl.bind(this)}>
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
        }else if(this.state.payType=="ZXWY"){
            var ret = [];//支付方式下拉
            const fifter = ['WECHAT','ALIPAY','QQPAY','JDPAY','WECHAT_WAP','ALIPAY_WAP','QQPAY_WAP','JDPAY_WAP','YLPAY','BAIDUPAY','ETH','BTC']
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
                    this.state.payNow = payTrueList[payList[0]].cont[0]; // mmp
                } 
                if(this.state.payCanelList.length==0|| $.inArray(this.state.payCanelList[0].BankNo,fifter) >= 0 ){
                    this.state.payCanelList = payTrueList[payList[0]].cont;
                } 
                for (let i = 0; i < payList.length; i++) {
                    let bgname = payList[i]
                    ret.push(<option key={i} value={JSON.stringify(payTrueList[bgname].cont)}>{payTrueList[bgname].cont[0].BankName}</option>)
                }
                let spl = this.state.payNow.FixedAmount.split(",");
                // 存款金额下拉
                if(spl[0]){
                    this.state.shortCut = false;
                    inputAmount = (
                        <select id="deposit_money" name="fr_amount" ref="ThirdPayMoney">
                            {spl.map((data,index)=>{
                                return <option key={index} value = {data}>{data}</option>
                            })}
                        </select>
                    )
                }else{//输入金额
                    this.state.shortCut = true;
                    AmountSpan=(
                        <span className="font_red font_bold">*单笔转账限额 {this.state.payNow.MinAmount}.00~{this.state.payNow.MaxAmount}.00元</span>
                    )
                }
            }else{
                ret.push(<option key="1">暂无在线支付方式</option>)
            }
            for (var i = 0; i < this.state.payCanelList.length; i++) {
                
                if(i==0){
                    payCanelListOptions.push(<option value={JSON.stringify(this.state.payCanelList[i])} key={i}>{this.state.payCanelList[i].AliasName?this.state.payCanelList[i].AliasName:"渠道"+this.state.payCanelList[i].ThirdPayId}</option>)
                }else{
                    payCanelListOptions.push(<option value={JSON.stringify(this.state.payCanelList[i])} key={i}>{this.state.payCanelList[i].AliasName?this.state.payCanelList[i].AliasName:"渠道"+this.state.payCanelList[i].ThirdPayId}</option>)
                }
                
            }
            return(
                <div>
                    <p>
                        <label>支付方式:</label>
                        <span>
                            <select onChange = {this.ChangePay.bind(this)}>
                                {ret}
                            </select>
                        </span>
                    </p>
                    <p>
                        <label>支付渠道:</label>
                        <span>
                            <select onChange = {this.ChangeCanl.bind(this)}>
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
                            className="input member-input"
                            required
                            name="fr_amount" ref="ThirdPayMoney"/>
                    {AmountSpan}
                </span>
            </p>
            )
        }
    }
    // 快捷金额
    shortCutAddMoney(){
        const moneyNum = [101,201,501,1001,2001,5001]
        let ret = [];
        for( let i = 0; i < moneyNum.length; i ++){
            ret.push(
                <li key={i} onClick={ ()=>{ document.getElementById("deposit_money").value = moneyNum[i] } }>{moneyNum[i]}</li>
            )
        }
        return(
            <ul className="shortCut">
                {ret}
            </ul>
        )
    }
    ChangePay(e){//选择支付方式,加载对应支付渠道下拉；
        let data = JSON.parse(e.target.value);
        this.setState({
            payCanelList:data,
            payNow:data[0]
        })
    }
    //选择渠道，显示对应限额
    ChangeCanl(e){
        let data = JSON.parse(e.target.value);
        this.setState({
            payNow:data
        })
    }
    render() {
        const tabsUl = this.renderTabsUl();// 支付类型，方式，（导航）
        const payTypeDom = this.renderPayTypeDom(AmountSpan); // 支付渠道
        let offlineFrom="" ;// 渲染表单
        let AmountSpan;//限额提示
        let tips;
        if(this.state.payType=="YHZZ"){//【银行转账】
            offlineFrom = this.renderOfflinePay();
            if(this.state.offlineBankCode){
                AmountSpan = (<span className="font_red font_bold">*单笔转账限额 {this.props.allOfflineBanks[this.state.offlineBankId]['MinAmount']}.00~{this.props.allOfflineBanks[this.state.offlineBankId]['MaxAmount']}.00元</span>)
                tips = ( <p  className="tips font_red font_bold">
                提示：银行转账操作步骤：<br/>
                1. 选择支付方式以及银行；<br/>
                2. 输入存款金额，再点击下一步；<br/>
                3. 复制收款账户名及银行卡号使用手机银行进行转账；<br/>
                4. 确定转账成功后，在转出账户名填写转账人姓名，再点击存款即确认提交申请，会在三分钟内添加到您的会员账户中<br/>
            </p>)
            }
        }else if(this.state.payType=="ZXWY"){//【在线网银】
            if(this.state.onlineBankCode){
                AmountSpan = (<span className="font_red font_bold">*单笔转账限额 {this.props.payBankInfos[this.state.onlineBankId]['MinAmount']}.00~{this.props.payBankInfos[this.state.onlineBankId]['MaxAmount']}.00元</span>)
            }
            tips = ( <p  className="tips font_red font_bold">
            提示：在线网银操作步骤：<br/>
            1. 选择您方便使用的银行；<br/>
            2. 输入存款金额或点击下方的快捷金额，再点击存款；<br/>
            3. 在线网银支付是使用网络银行公司直接支付到账；<br/>
            4. 确定付款完成后，系统将会即时添加到您的会员账户<br/>
        </p>)

        }else{
            tips = ( <p  className="tips font_red font_bold">
                提示：在线支付操作步骤：<br/>
                1. 选择支付方式以及支付渠道；<br/>
                2. 输入存款金额，再点击提交；<br/>
                3. 提交进入即显示付款二维码，采用第三方APP扫一扫进行付款；或者跳转至第三方支付网站进行支付；<br/>
                4. 确定付款完成后，系统将会即时添加到您的会员账户
            </p>)
        }
        return (
            <div>
                <div className="header">玩家存款</div>
                <div className="maincontent security_pg depositfund withdrawalfund">
                    <div className="clearfix t20 ht-cunkuan deposit member-content">
                        <div className="deposNav">
                            {tabsUl}
                        </div>
                        <div className="dpt_credit">
                            {payTypeDom}
                        </div>
                        {this.state.isLoading?this.loadingDom():""}
                        <div className="money" hidden={this.state.isLoading || this.state.thirdProgress}>
                            {/* 存款金额或在线网银，转账 */}
                            {this.renderPayTypeFrom(AmountSpan)}
                            {/* 快捷金额 */}
                            {this.state.shortCut?this.shortCutAddMoney():null}            
                            {/* 点击下一步 */}
                            {this.state.hideAtmBox?"":(offlineFrom)}
                            {tips}
                            {
                                (this.state.hideAtmBox && this.state.payType=="YHZZ") ?
                                    (<button onClick={this.SelOffline.bind(this)} className="memberBtn">下一步</button>)
                                    :(<button onClick={this.howPay.bind(this)} className="memberBtn">存款</button>)
                            }
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>
            );
        }
    }
const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs:state.remoteSysConfs,
        payBankInfos: state.payBankInfos,
        payThirdInfos: state.payThirdInfos,
        apiResult: state.apiResult,
        user: state.user,
        allOfflineBanks: state.allOfflineAccount.allOfflineBanks,
        payOnline:state.payOnline
    }
);


export default connect(mapStateToProps, {})(DepositPage);