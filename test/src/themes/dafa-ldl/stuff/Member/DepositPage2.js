/**
 * Created by sobi on 2017/10/13.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import QRCode from 'qrcode.react';
import {
    ApiThirdDepositAction,
    ApiPayBanksAction,
    ApiDepositAction,
    ApiOfflineDepositAction,
    ApiOfflineAccountsAction,
    ApiQueryOrderAction,
    ApiPlayerInfoAction
} from "globalAction";
import {transferTypes} from "offlineTransferJson";
import {provinces} from "../../../common/common";
import { browserHistory} from 'react-router'
import loadingImg from '../images/loading_wellbet.gif';
class ApiSysConfAction {
    constructor(key) {
        this.key = key;
    }
    fly(callback){
        return fetch("/api/v0/sys_conf.api", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({key: this.key, platform: "PC", version: "1.0.0"})
        }).then(function(response){
            return response.json();
        }).then(function(data){
            callback(data);
        });
    }

}
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
            payIndex:"",//支付类型在props中的index
            hideAtmBox:true,//银行转账
            onlineBankCode:"",//在线网银Code
            onlineBankId:"",//在线网银Id
            offlineBankCode:"",//银行转账Code
            offlineBankId:""//银行转账ID
        };
        this.state.selProvince = provinces[0];
    }

    componentWillMount() {
        let _self = this;
        new ApiOfflineAccountsAction().fly();
        new ApiPayBanksAction().fly(resp=>{
            if(resp.StatusCode ===0) {
                if(resp.Banks.length>0){
                    _self.setState({
                        payType:resp.Banks[0].BankNo,
                        payIndex:"0"
                    })
                }
            }
        });
        // new ApiPayThirdAction().fly(resp=>{
        //     if(resp.StatusCode ===0) {
        //         if(resp.payBankInfoList.length>0){
        //             _self.setState({
        //                 payType:resp.payBankInfoList[0].BankNo,
        //                 payIndex:"0"
        //             })
        //         }
        //     }
        // });
        // new ApiOfflineTransferTypesAction().fly();
    }


    onSelectTransferType(e) {
        var selTransferType = transferTypes[e.target.selectedIndex];
        if (selTransferType) {
            this.setState({requirePlace:selTransferType.requirePlace});
        }
    }
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



    onProvinceChanged(e) {
        this.setState({selProvince:provinces[e.target.selectedIndex]})
    }




    offlineWeixinAliPay(e){
        e.preventDefault();
        var p = this.props.offlineWeixinAliAccounts[e.target.id];
        var depositmoney = document.getElementById("deposit_money").value;


        if(!depositmoney||depositmoney==0||depositmoney < p.MinAmount || depositmoney > p.MaxAmount){
            window.swal({
                title: "存款金额错误",
                text: p.Bank.BankName+"允许存款金额范围："+p.MinAmount+"～"+p.MaxAmount,
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            return;
        }

        var appendRandom = "";
        // if(depositmoney%10==0 && this.props.remoteSysConfs && this.props.remoteSysConfs.offline_pay_disable_random != "true"){
        //     appendRandom = "<p style='color:#f00;font-size: 14px'>(存款金额尾数不可为0，已自动为您增加尾数)</p><br>";
        //     depositmoney = depositmoney + (parseInt(Math.random() * 9) + 1);
        //     document.getElementById("deposit_money").value = depositmoney;
        // }

        new ApiOfflineDepositAction(p.id, 1,
            depositmoney, "", "", "","offline_weixin_alipay").fly((resp)=>{
            if(resp.StatusCode===0) {
                window.swal({
                    title: p.Bank.BankName+"线下支付申请成功",
                    text: "<p>支付单号: " + resp.OrderNo + "</p><p>帐户名: " + p.AccountName + "</p><p>支付金额: " + depositmoney + "</p>" + appendRandom + "<p style='height:auto;width: 100%'><img width='180' src='" + p.AccountNo + "'/></p><p>请用" + p.Bank.BankName + "扫描上方二维码进行支付</p>",
                    confirmButtonColor: "#c5841f",
                    confirmButtonText: "支付完成点这里",
                    html: true,
                    showCancelButton: true,
                    cancelButtonText:'取消'
                });
            }
        });
    }
    renderonlineQRpay(){
        var ret = [];
        for (var i = 0; i < this.props.payThirdInfos.length; i++) {
            var p = this.props.payThirdInfos[i];
            var bgname = p.BankNo;
            ret.push(<div className="onlinepayOption "  key={i}>
                {p ?
                    <div>
                        <div id={i} onClick={this.sendThirdpay.bind(this)} className={"onlinepayOption_text "+bgname}></div>
                        <div>{p.name}</div>
                    </div>
                    :null}
            </div>);
        }
        return ret;
    }
    renderofflineQRpay(){

        var offlineQRpay = [];
        for (var i = 0; i < this.props.offlineWeixinAliAccounts.length; i++) {
            var p = this.props.offlineWeixinAliAccounts[i];
            var bgname = p.BankNo;
            offlineQRpay.push(<div className="onlinepayOption " key={i}>
                {p ?
                    <div>
                        <div id={i} onClick={this.offlineWeixinAliPay.bind(this)} className={"onlinepayOption_text "+bgname}></div>
                        <div>{p.Bank.BankName}</div>
                    </div>
                    :null}
            </div>);
        }
        return offlineQRpay;
    }
    closeAtmBox(){
        this.setState({
            hideAtmBox:true
        });
    }



    SelOffline(){
        var bankAccountId = this.state.offlineBankId;
        var depositmoney = document.getElementById("deposit_money").value;
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
    }

    renderofflinepay_option() {
        var ret = [];
        let offlineBankCode = this.state.offlineBankCode;
        for (var i = 0; i < this.props.offlineAccounts.length; i++) {
            var BankInfo = this.props.offlineAccounts[i];
            var code = BankInfo.Bank.Id;
            
            ret.push(
                <div key={i}
                     data-code={code}
                     id={i}
                     className={offlineBankCode == code?"isSelected bankOption":"bankOption"}
                     title={BankInfo.Bank.BankName}
                     onClick={this.changeOfflineBankCode.bind(this)}
                >
                    <img className="bankOption_text" src={window.config.prdImgUrl+BankInfo.Bank.LogoImg} />
                    <div className="selectedCard"></div>
                </div>
            );
        }
        return ret;
    }


    //根据payType不同调用不同api
    howPay(){
        if(this.state.payType=="ZXWY" ){//如果是在线网银
            this.onlineBankPay(this.state.onlineBankId)
        }else if(this.state.payType=="YHZZ"){//银行转账
            this.offlinePay();
        }else{//第三方支付方式
            this.sendThirdpay(this.state.payIndex,this.state.payType)
        }

    }
    openLink(){
        new ApiSysConfAction("online_service_link").fly(resp => {
            if(resp.StatusCode === 0){
                window.open(resp.content,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
            }
        });
    }

    //渲染【银行转账】表单
    renderOfflinePay(){
        let _self =this;
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
            for (var i = 0; i < _self.state.selProvince.cities.length; i++) {
                var City = _self.state.selProvince.cities[i];
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
                {_self.state.selAdminAccount ?
                    <div className="offlineBankInfo ">
                        <h5 className="offlineBank_text">收款信息</h5>
                        <p>
                            <label>帐户名：</label>
                            <span>{_self.state.selAdminAccount.AccountName}</span>
                        </p>
                        <p>
                            <label>银行卡号：</label>
                            <span onClick={this.openLink} style={{'color':'blue','cursor':'pointer'}}>{_self.state.selAdminAccount.AccountNo}</span>
                        </p>
                        <p>
                            <label>银行：</label>
                            <span>{_self.state.selAdminAccount.Bank.BankName}</span>
                        </p>
                        <p>
                            <label>支行：</label>
                            <span>{_self.state.selAdminAccount.OpeningBank}</span>
                        </p>
                    </div>
                    :null
                }
                <div className="">
                    <p>
                        <label>转出帐户名：</label>
                        <span>
                            <input type="text"
                                   ref="offline_accountName"
                                   placeholder="(如果非本人卡，请填写)" defaultValue={_self.props.user.realName}
                            />
                        </span>
                    </p>
                    <p>
                        <label>转款方式：</label>
                        <span>
                            <select name="fr_promo" className="select w260 atmBox_input" onChange={_self.onSelectTransferType.bind(_self)} ref="transferType">
                                {_self.renderOfflineTransferTypes()}
                            </select>
                        </span>
                    </p>
                    <div  hidden={!_self.state.requirePlace}>
                        <p>
                            <label>支行省：</label>
                            <span>
                            <select name="fr_promo" className="select w260 atmBox_input" ref="province" onChange={_self.onProvinceChanged.bind(_self)}>
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
            </div>
        )
    }
    //银行转账Action
    offlinePay() {
        var depositmoney = document.getElementById("deposit_money").value;
        new ApiOfflineDepositAction(this.state.selAdminAccount.Id, this.refs.transferType.value,
            depositmoney, this.refs.province.value, this.refs.city.value,
            this.refs.branchName.value,this.props.user.realName, this.refs.offline_accountName.value || this.props.user.realName || "").fly((resp)=>{
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
            }
        });
    }

    changeOfflineBankCode(e){
        let $Dom = window.$(e.currentTarget);
        let self = this;
        self.setState({
            offlineBankId:$Dom.attr('id'),
            offlineBankCode:$Dom.attr('data-code'),
            hideAtmBox:true
        });
    }


    //渲染【在线网银】表单
    renderonlinebank(){
        var onlinebanks = [];
        let onlineBankCode = this.state.onlineBankCode
        for (var i = 0; i < this.props.payBankInfos.length; i++) {
            var BankInfo = this.props.payBankInfos[i];
            var code = BankInfo.BankNo;
            onlinebanks.push(
                <div key={i}
                     data-code={code}
                     id={i}
                     className={onlineBankCode == code?"isSelected bankOption":"bankOption"}
                     onClick={this.changeOnlineBankCode.bind(this)}
                >
                    <div className={"bankOption_text bankimg"+code}></div>
                    <div className="selectedCard"></div>
                </div>
            );
        }
        return onlinebanks;
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
        });

    }
    //在线网银 银行切换
    changeOnlineBankCode(e){
        let $Dom = window.$(e.currentTarget);
        let self = this;
        self.setState({
            onlineBankId:$Dom.attr('id'),
            onlineBankCode:$Dom.attr('data-code')
        });
    }


    //渲染【第三方】表单
    renderThirdDom(){
        let _self = this;
        let recordId =_self.state.thirdPayRecordId;
        let imgCode = _self.state.thirdPayImg;
        let typeName = _self.props.payThirdInfos[_self.state.payIndex]['name'];
        let money = document.getElementById("deposit_money").value;
        //支付完成
        function successPay(){
            // new ApiQueryOrderAction(recordId).fly(resp => {
            //     if (resp.StatusCode === 0) {
            //         new ApiPlayerInfoAction().fly();
            //     }
                browserHistory.push("/records_deposit");
            // });
        }
        //支付失败
        function errorPay(){
            window.open(_self.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        }
        return(
            <div className="thirdFrom">
                <QRCode style={{"float":"left"}}
                    includeMargin={false} //内部是否有margin
                    size={180}  //图片大小
                    value={imgCode || ""} //地址
                />
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
            });
        })

    }


    //渲染支付方式DOM
    renderTabsUl(){
        let ret = [];
        for (let i = 0; i < this.props.payThirdInfos.length; i++) {
            let p = this.props.payThirdInfos[i];
            let code = p.BankNo;
            ret.push(
                <li key={i} data-payIndex={i} className={this.state.payType==code?"selected_red":""}  onClick={this.navOn.bind(this)} id={code}>
                    <a>{p.BankName}</a>
                </li>
            );
        }
        ret.push(
            <li key='YHZZ' data-payIndex="" className={this.state.payType=="YHZZ"?"selected_red":""}  onClick={this.navOn.bind(this)} id="YHZZ">
                <a>银行转账</a>
            </li>
        );
        ret.push(
            <li key='ZXWY' data-payIndex="" className={this.state.payType=="ZXWY"?"selected_red":""}  onClick={this.navOn.bind(this)} id="ZXWY">
                <a>在线网银<span className="tooltiptextuc">自动到账</span></a>
            </li>
        );
        return ret;
    }

    //根据【payType】渲染表单
    renderPayTypeDom(){
        let payTypeDom;
        if(this.state.payType=="YHZZ"){//【银行转账】
            payTypeDom=(
                <div>
                    <h4 className="font_red tipsH">请选择您的银行</h4>
                    {this.renderofflinepay_option()}
                </div>
            )
        }else if(this.state.payType=="ZXWY"){//【在线网银】
            payTypeDom=(
                <div>
                    <h4 className="font_red tipsH">请选择您的银行</h4>
                    {this.renderonlinebank()}
                </div>
            )
        }else{
            payTypeDom=(<div>{this.state.thirdProgress?this.renderThirdDom():""}</div>)
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
            payIndex:$DOM.attr('data-payIndex')
        });

    }
    loadingDom(){
        return(<div className="loaderDom"><img src={loadingImg} /><p>二维码生成中,请稍后...</p></div>)
    }
    render() {
        const tabsUl = this.renderTabsUl();
        const payTypeDom = this.renderPayTypeDom();
        let offlineFrom="" ;
        let AmountSpan;//限额提示
        let tips;
        if(this.state.payType=="YHZZ"){//【银行转账】
            offlineFrom = this.renderOfflinePay();
            if(this.state.offlineBankCode){
                AmountSpan = (<span className="font_red font_bold">*单笔转账限额 {this.props.offlineAccounts[this.state.offlineBankId]['MinAmount']}.00~{this.props.offlineAccounts[this.state.offlineBankId]['MaxAmount']}.00元</span>)
            }
        }else if(this.state.payType=="ZXWY"){//【在线网银】
            if(this.state.onlineBankCode){
                AmountSpan = (<span className="font_red font_bold">*单笔转账限额 {this.props.payBankInfos[this.state.onlineBankId]['MinAmount']}.00~{this.props.payBankInfos[this.state.onlineBankId]['MaxAmount']}.00元</span>)
            }
        }else{
            tips = ( <p  className="tips font_red font_bold">
                提示：支付宝/微信转账操作步骤：
                1. 输入存款金额，再点击提交；
                2. 提交进入即显示付款二维码，采用支付宝/微信扫一扫进行付款；
                3. 确定付款完成后，系统将会即时添加到您的会员账户
            </p>)
            if(this.state.payIndex !=""){
                AmountSpan=(<span className="font_red font_bold">*单笔转账限额 {this.props.payThirdInfos[this.state.payIndex]['MinAmount']}.00~{this.props.payThirdInfos[this.state.payIndex]['MaxAmount']}.00元</span>)
            }
        }


        return (
            <div>
                <div className="deposit">
                    <ul className="tabsUl">
                        {tabsUl}
                    </ul>
                    <div className="clearfix"></div>
                    <div className="dpt_credit">
                        {payTypeDom}
                    </div>
                    {this.state.isLoading?this.loadingDom():""}
                    <div className="money" hidden={this.state.isLoading || this.state.thirdProgress}>
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
        offlineAccounts: state.offlineAccount.offlineAccounts,
        offlineWeixinAliAccounts: state.offlineAccount.offlineWeixinAliAccounts,
        // offlineTransferTypes: state.offlineAccount.transferTypes
    }
);


export default connect(mapStateToProps, {})(DepositPage);