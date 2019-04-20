/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';
import {ApiThirdDepositAction,ApiPayBanksAction,ApiPayThirdAction,ApiDepositAction,ApiOfflineDepositAction,
ApiOfflineAccountsAction, ApiQueryOrderAction,ApiPlayerInfoAction,ApiOfflineTransferTypesAction} from "../../../../actions/index";
import {provinces} from "../../../../common/common";
import { browserHistory} from 'react-router'

class DepositPage extends Component {

    constructor(props) { 
        super(props);
        this.state = {
            hiddenThirdpay1: false,
            hiddenThirdpay2: true,
            hiddenThirdpay3: true,
            hiddenOnlineBank: true,
            hiddenATM: true,
            hiddenOfflineWeixinAli: true,
            moneyHint: true,
            moneyHint2: true,
            moneyHint3: true,
            requirePlace: false,
            selAdminAccount: null,
            selOnlineBank: null,
            selThirdPay: null
        };
        this.state.selProvince = provinces[0];
    }
    componentDidMount() {
        new ApiOfflineAccountsAction().fly();
        new ApiPayBanksAction().fly();
        new ApiPayThirdAction().fly();
        new ApiOfflineAccountsAction(3).fly();
        new ApiOfflineTransferTypesAction().fly();
        if (!this.state.selAdminAccount && this.props.offlineAccounts && this.props.offlineAccounts.length > 0) {
            this.setState({selAdminAccount:this.props.offlineAccounts[0]});
        }
        if (!this.state.selOnlineBank && this.props.payBankInfos && this.props.payBankInfos.length > 0) {
            this.setState({selOnlineBank:this.props.payBankInfos[0]});
        }
        if (!this.state.selThirdPay && this.props.payThirdInfos && this.props.payThirdInfos.length > 0) {
            this.setState({selThirdPay:this.props.payThirdInfos[0]});
        }
    }

    componentWillReceiveProps(nextProps) {
        this.componentDidMount();
        var self = this;
        if (nextProps.apiResult !== this.props.apiResult) {
            var api = nextProps.apiResult;
            if (api.response.status === 0) {
                if (api.method === "deposit") {
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
                        function(isConfirm){
                            if (isConfirm) {
                                window.openNewPage("/api/v0/"+api.response.code);
                                setTimeout(()=> {
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
                                                new ApiQueryOrderAction(api.response.recordId).fly(resp=>{
                                                    if (resp.status === 0) {
                                                        new ApiPlayerInfoAction().fly();
                                                    }

                                                });
                                            }
                                            else {
                                                window.openNewPage(self.props.remoteSysConfs.online_service_link);
                                            }
                                        });
                                }, 1000);
                            }
                            else {
                            }
                        });

                    // window.openNewPage(api.response.code);
                } else if (api.method === "offline_deposit") {
                    if("offline_weixin_alipay" == api.params.type){
                        window.swal({
                            title: "线下支付申请成功, 请用微信/支付宝扫描下方二维码支付",
                            text: "<p>支付单号: " + api.response.code+"</p><p>帐户名: "+this.state.selAdminAccount.accountName+"</p><p>支付金额: "+api.params.amount+"</p><br><p class='qr_code' style='height:190px;width: 100%'><img style='border: 5px solid #fff; ' width='180' src='"+this.state.selAdminAccount.accountNo+"'/></p>",
                            confirmButtonColor: "#c5841f",
                            confirmButtonText: "支付完成点这里",
                            html: true
                        });
                    }else{
                        window.swal({
                            title: "线下支付申请成功",
                            text:"支付单号: " + api.response.code+"\n\n帐户名: "+this.state.selAdminAccount.accountName+"\n\n银行卡号: "+this.state.selAdminAccount.accountNo+"\n\n银行: "+this.state.selAdminAccount.bankName+"\n\n支行: "+this.state.selAdminAccount.branchName,
                            type: "success",
                            confirmButtonColor: "#c5841f",
                            confirmButtonText: "OK",
                        });
                    }

                }
            }
        }
    }
    renderOfflineAccounts() {
        var ret = [];
        for (var i = 0; i < this.props.offlineAccounts.length; i++) {
            var oa = this.props.offlineAccounts[i];
            ret.push(
                <option key={i} value={oa.id}>{oa.accountName + " " + oa.bankName}</option>
            )
        }
        return ret;
    }
    renderOfflineWeixinAliPayAccounts() {
        var ret = [];
        for (var i = 0; i < this.props.offlineWeixinAliAccounts.length; i++) {
            var oa = this.props.offlineWeixinAliAccounts[i];
            ret.push(
                <option key={i} value={oa.id}>{oa.accountName + " " + oa.bankName}</option>
            )
        }
        return ret;
    }

    adminAccountnos(e){

        let bankAccountId = this.refs["adminAccount"].value;
        let target = null;
        for(let i = 0; i< this.props.offlineAccounts.length; i++){
            if(this.props.offlineAccounts[i].id == bankAccountId){
                target = this.props.offlineAccounts[i];
            }
        }
        this.setState({selAdminAccount:target});
    }
    adminWeixinAliAccountnos(e){
        let bankAccountId = this.refs["adminWeixinAliAccount"].value;
        let target = null;
        for(let i = 0; i< this.props.offlineWeixinAliAccounts.length; i++){
            if(this.props.offlineWeixinAliAccounts[i].id == bankAccountId){
                target = this.props.offlineWeixinAliAccounts[i];
            }
        }
        this.setState({selAdminAccount:target});
    }

    onSelectTransferType(e) {
        var selTransferType = this.props.offlineTransferTypes[e.target.selectedIndex];
        if (selTransferType) {
            this.setState({requirePlace:selTransferType.requirePlace});
        }
    }
    renderOfflineTransferTypes() {
        var ret = [];
        for (var i = 0; i < this.props.offlineTransferTypes.length; i++) {
            var oa = this.props.offlineTransferTypes[i];
            ret.push(
                <option key={i} value={oa.id}>{oa.name}</option>
            )
        }
        return ret;
    }
    renderBankInfo() {
        var BankInfos = [];
        for (var i = 0; i < this.props.payBankInfos.length; i++) {
            var BankInfo = this.props.payBankInfos[i];
            BankInfos.push(
                <option key={i} value={BankInfo.id}>{BankInfo.name}</option>
            );

        }
        return BankInfos;
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
        var Cities = [];
        for (var i = 0; i < this.state.selProvince.cities.length; i++) {
            var City = this.state.selProvince.cities[i];
            Cities.push(
                <option key={i} value={City.name}>{City.name}</option>
            );

        }
        return Cities;
    }

    onProvinceChanged(e) {
        this.setState({selProvince:provinces[e.target.selectedIndex]})
    }


    chooseOnlineBank() {
        this.setState({
            hiddenThirdpay1:true,
            hiddenThirdpay2:true,
            hiddenThirdpay3:true,
            hiddenOnlineBank:false,
            hiddenATM:true,
            hiddenOfflineWeixinAli: true,
            selAdminAccount: null
        });

    }
    chooseThirdpay1() {

        this.setState({
                hiddenThirdpay1:false,
                hiddenThirdpay2:true,
                hiddenThirdpay3:true,
            hiddenOnlineBank:true,
            hiddenATM:true,
            hiddenOfflineWeixinAli: true,
            selAdminAccount: null
        });
    }
    chooseThirdpay2() {

        this.setState({
                hiddenThirdpay1:true,
                hiddenThirdpay2:false,
                hiddenThirdpay3:true,
            hiddenOnlineBank:true,
            hiddenATM:true,
            hiddenOfflineWeixinAli: true,
            selAdminAccount: null
        });
    }
    chooseThirdpay3() {

        this.setState({
                hiddenThirdpay1:true,
                hiddenThirdpay2:true,
                hiddenThirdpay3:false,
            hiddenOnlineBank:true,
            hiddenATM:true,
            hiddenOfflineWeixinAli: true,
            selAdminAccount: null
        });
    }
    chooseATM() {
        this.setState({
            hiddenThirdpay1:true,
            hiddenThirdpay2:true,
            hiddenThirdpay3:true,
            hiddenOnlineBank:true,
            hiddenATM:false,
            hiddenOfflineWeixinAli: true,
            selAdminAccount: null
        });
        setTimeout(()=>{
            this.adminAccountnos({});
        },0);
    }
    chooseOfflineWeixinAli(){
        this.setState({
            hiddenThirdpay1:true,
            hiddenThirdpay2:true,
            hiddenThirdpay3:true,
            hiddenOnlineBank:true,
            hiddenATM:true,
            hiddenOfflineWeixinAli: false,
            selAdminAccount: null
        });
        setTimeout(()=>{
            this.adminWeixinAliAccountnos({});
        },0);
    }

    sendThirdpay1(event){
        event.preventDefault();
        if (this.props.payThirdInfos[0].code === "WECHAT") {
            this.props.payThirdInfos[0].code = "WEIXIN";
        } else if (this.props.payThirdInfos[0].code == "ALIPAY") {
            this.props.payThirdInfos[0].code = "ALIPAY";
        }
        new ApiThirdDepositAction(this.refs.ThirdPayMoney1.value, this.props.payThirdInfos[0].code).fly();
    }
    sendThirdpay2(event){
        event.preventDefault();
        if (this.props.payThirdInfos[1].code === "WECHAT") {
            this.props.payThirdInfos[1].code = "WEIXIN";
        } else if (this.props.payThirdInfos[1].code == "ALIPAY") {
            this.props.payThirdInfos[1].code = "ALIPAY";
        }
        new ApiThirdDepositAction(this.refs.ThirdPayMoney2.value, this.props.payThirdInfos[1].code).fly();
    }
    sendThirdpay3(event){
        event.preventDefault();
        if (this.props.payThirdInfos[2].code === "WECHAT") {
            this.props.payThirdInfos[2].code = "WEIXIN";
        } else if (this.props.payThirdInfos[2].code == "ALIPAY") {
            this.props.payThirdInfos[2].code = "ALIPAY";
        }
        new ApiThirdDepositAction(this.refs.ThirdPayMoney3.value, this.props.payThirdInfos[2].code).fly();
    }

    sendLocalpay(event){
        event.preventDefault();
        if(!this.refs.OnlineBankMoney.value){
            this.setState({
                moneyHint2:false
            });
            return;
        }

        var bank = this.props.payBankInfos[this.refs.OnlineBank.selectedIndex];
        new ApiDepositAction(this.refs.OnlineBankMoney.value, bank.code, bank.name).fly();

    }
    offlinePay(e) {
        e.preventDefault();
        new ApiOfflineDepositAction(this.refs.adminAccount.value, this.refs.transferType.value,
            this.refs.offlineAmount.value, this.refs.province.value, this.refs.city.value,
        this.refs.branchName.value).fly();
    }
    offlineWeixinAliPay(e){
        e.preventDefault();
        new ApiOfflineDepositAction(this.refs.adminWeixinAliAccount.value, 1,
            this.refs.offlineWeixinAliAmount.value, "", "", "","offline_weixin_alipay").fly();
    }

    onSelectThirdPay(e) {
        this.setState({selThirdPay:this.props.payThirdInfos[e.target.selectedIndex]});
    }
    renderThirdPayOptions() {
        var ret = [];
        for (var i = 0; i < this.props.payThirdInfos.length; i++) {
            var p = this.props.payThirdInfos[i];
            if (p.code === "WECHAT") {
                p.code = "WEIXIN";
            } else if (p.code == "ALIPAY") {
                p.code = "ALIPAY";
            }
            ret.push(<option value={p.code}>{p.name}</option>);
        }
        return ret;
    }
    onChangeBank(e) {
        this.setState({selOnlineBank:this.props.payBankInfos[e.target.selectedIndex]});
    }

    render() {
        const BankInfo = this.renderBankInfo();
        const Province = this.renderProvince();
        const City = this.renderCities();
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
                    <div className="t tc f14">
                        {this.props.payThirdInfos[0] ?
                        <a href="javascript:" className={this.state.hiddenThirdpay1?"iblock":"iblock on"} onClick={this.chooseThirdpay1.bind(this)}>{this.props.payThirdInfos[0].name}</a>:null}
                        {this.props.payThirdInfos[1] ?
                        <a href="javascript:" className={this.state.hiddenThirdpay2?"iblock":"iblock on"} onClick={this.chooseThirdpay2.bind(this)}>{this.props.payThirdInfos[1].name}</a>:null}
                        {this.props.payThirdInfos[2] ?
                        <a href="javascript:" className={this.state.hiddenThirdpay3?"iblock":"iblock on"} onClick={this.chooseThirdpay3.bind(this)}>{this.props.payThirdInfos[2].name}</a>:null}
                        <a href="javascript:" className={this.state.hiddenOnlineBank?"iblock":"iblock on"} onClick={this.chooseOnlineBank.bind(this)}>在线网银</a>
                        <a href="javascript:" className={this.state.hiddenATM?"iblock":"iblock on"} onClick={this.chooseATM.bind(this)}>银行转帐</a>
                        {this.props.offlineWeixinAliAccounts && this.props.offlineWeixinAliAccounts.length>0 && <a href="javascript:" className={this.state.hiddenOfflineWeixinAli?"iblock":"iblock on"} onClick={this.chooseOfflineWeixinAli.bind(this)}>微信/支付宝转账</a>}
                    </div>

                    {this.props.payThirdInfos[0] ?
                    <div className="c" hidden={this.state.hiddenThirdpay1}>
                        <form id="payform" onSubmit={this.sendThirdpay1.bind(this)}>
                            <table className="ht-fktable f14" width="100%">
                                <tbody>
                                {/*<tr>*/}
                                    {/*<td width="35%" className="tr">支付类型：</td>*/}
                                    {/*<td width="65%">*/}
                                        {/*<select onChange={this.onSelectThirdPay.bind(this)} name="fr_promo" ref="ThirdPayWay" className="select w260 member-input">*/}
                                            {/*{this.renderThirdPayOptions()}*/}
                                        {/*</select>*/}
                                    {/*</td>*/}
                                {/*</tr>*/}
                                <tr>
                                    <td width="35%" className="tr">存款金额：</td>
                                    <td width="65%">
                                        <span id="amt_field">
                                            <input type="number" className="input w238 member-input" required
                                                   placeholder="填写你要存入的金额数" name="fr_amount" ref="ThirdPayMoney1"/></span>
                                        <span className="ml5 red f12">
                                            <span id="min_amt"></span>
                                            <span id="max_amt"></span>
                                        </span>
                                    </td>
                                </tr>

                                <tr>
                                    <td width="35%" className="tr"></td>
                                    <td width="65%">
                                                <span className="ml5 f12" style={{color:"#ba7e70"}}>
                                                允许存款金额范围：{this.props.payThirdInfos[0].minAmount}～{this.props.payThirdInfos[0].maxAmount}
                                            </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="35%" className="tr">&nbsp;</td>
                                    <td width="65%">
                                        <input type="submit" className="htbtnlg w260 t20 color-second BGcolor-second" value="确认并提交"/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>:null}

                    {this.props.payThirdInfos[1] ?
                    <div className="c" hidden={this.state.hiddenThirdpay2}>
                        <form id="payform" onSubmit={this.sendThirdpay2.bind(this)}>
                            <table className="ht-fktable f14" width="100%">
                                <tbody>
                                {/*<tr>*/}
                                {/*<td width="35%" className="tr">支付类型：</td>*/}
                                {/*<td width="65%">*/}
                                {/*<select onChange={this.onSelectThirdPay.bind(this)} name="fr_promo" ref="ThirdPayWay" className="select w260 member-input">*/}
                                {/*{this.renderThirdPayOptions()}*/}
                                {/*</select>*/}
                                {/*</td>*/}
                                {/*</tr>*/}
                                <tr>
                                    <td width="35%" className="tr">存款金额：</td>
                                    <td width="65%">
                                        <span id="amt_field">
                                            <input type="number" className="input w238 member-input" required
                                                   placeholder="填写你要存入的金额数" name="fr_amount" ref="ThirdPayMoney2"/></span>
                                        <span className="ml5 red f12">
                                            <span id="min_amt"></span>
                                            <span id="max_amt"></span>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="35%" className="tr"></td>
                                    <td width="65%">
                                            <span className="ml5 f12" style={{color:"#ba7e70"}}>
                                                允许存款金额范围：{this.props.payThirdInfos[1].minAmount}～{this.props.payThirdInfos[1].maxAmount}
                                            </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="35%" className="tr">&nbsp;</td>
                                    <td width="65%">
                                        <input type="submit" className="htbtnlg w260 t20 color-second BGcolor-second" value="确认并提交"/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>:null}

                    {this.props.payThirdInfos[2] ?
                    <div className="c" hidden={this.state.hiddenThirdpay3}>
                        <form id="payform" onSubmit={this.sendThirdpay3.bind(this)}>
                            <table className="ht-fktable f14" width="100%">
                                <tbody>
                                {/*<tr>*/}
                                {/*<td width="35%" className="tr">支付类型：</td>*/}
                                {/*<td width="65%">*/}
                                {/*<select onChange={this.onSelectThirdPay.bind(this)} name="fr_promo" ref="ThirdPayWay" className="select w260 member-input">*/}
                                {/*{this.renderThirdPayOptions()}*/}
                                {/*</select>*/}
                                {/*</td>*/}
                                {/*</tr>*/}
                                <tr>
                                    <td width="35%" className="tr">存款金额：</td>
                                    <td width="65%">
                                        <span id="amt_field">
                                            <input type="number" className="input w238 member-input" required
                                                   placeholder="填写你要存入的金额数" name="fr_amount" ref="ThirdPayMoney3"/></span>
                                        <span className="ml5 red f12">
                                            <span id="min_amt"></span>
                                            <span id="max_amt"></span>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="35%" className="tr"></td>
                                    <td width="65%">
                                            <span className="ml5 f12" style={{color:"#ba7e70"}}>
                                                允许存款金额范围：{this.props.payThirdInfos[2].minAmount}～{this.props.payThirdInfos[2].maxAmount}
                                            </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="35%" className="tr">&nbsp;</td>
                                    <td width="65%">
                                        <input type="submit" className="htbtnlg w260 t20 color-second BGcolor-second" value="确认并提交"/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>:null}

                    <div className="c" hidden={this.state.hiddenOnlineBank}>
                    {/*<div className="c">*/}
                        <form id="payform" onSubmit={this.sendLocalpay.bind(this)}>
                            <table className="ht-fktable f14" width="100%">
                                <tbody>
                                <tr>
                                    <td width="35%" className="tr">支付银行：</td>
                                    <td width="65%">
                                        <select onChange={this.onChangeBank.bind(this)} name="fr_promo" id="fr_promo" className="select w260 member-input" ref="OnlineBank">
                                            {BankInfo}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="35%" className="tr"></td>
                                    <td width="65%">
                                        {this.state.selOnlineBank ?
                                            <span className="ml5 f12" style={{color:"#ba7e70"}}>
                                                允许存款金额范围：{this.state.selOnlineBank.minAmount}～{this.state.selOnlineBank.maxAmount}
                                            </span>:null}
                                    </td>
                                </tr>
                                <tr>
                                    <td width="35%" className="tr">存款金额：</td>
                                    <td width="65%">
                                        <span id="amt_field">
                                            <input type="number" className="input w238 member-input" ref="OnlineBankMoney"
                                                   placeholder="填写你要存入的金额数" name="fr_amount" id="fr_amount" required="required"/>
                                        </span>
                                        <span className="ml5 red f12">
                                            <span id="min_amt"></span>
                                            <span id="max_amt"></span>
                                        </span>
                                        <span className="ml5 red f12" hidden={this.state.moneyHint2}>* 金额未输入</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="35%" className="tr">&nbsp;</td>
                                    <td width="65%">
                                        <input type="submit" className="htbtnlg w260 t20 color-second BGcolor-second" value="确认并提交" />
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </form>

                    </div>

                    <div className="c" hidden={this.state.hiddenATM}>
                    {/*<div className="c">*/}
                        <form id="payform" onSubmit={this.offlinePay.bind(this)}>
                            <table className="ht-fktable f14" width="100%">
                                <tbody>
                                <tr>
                                    <td width="35%" className="tr">收款帐号：</td>
                                    <td width="65%">
                                            <select name="fr_promo" className="select w260 member-input" ref="adminAccount" onChange={this.adminAccountnos.bind(this)}>
                                            {this.renderOfflineAccounts()}
                                        </select>
                                    </td>
                                </tr>
                                {this.state.selAdminAccount ? <tr>
                                    <td width="35%" className="tr"></td>
                                    <td width="65%">
                                        {/*<span>帳號名：</span>*/}
                                        <span className="ml5 f12" style={{color:"#ba7e70"}}>
                                            帐户名：
                                            {this.state.selAdminAccount.accountName}
                                        </span>
                                        <br/>
                                        <span className="ml5 f12" style={{color:"#ba7e70"}}>
                                            银行卡号：
                                            {this.state.selAdminAccount.accountNo}
                                        </span><br/>
                                        <span className="ml5 f12" style={{color:"#ba7e70"}}>
                                            银行：
                                            {this.state.selAdminAccount.bankName}
                                        </span><br/>
                                        <span className="ml5 f12" style={{color:"#ba7e70"}}>
                                            支行：
                                            {this.state.selAdminAccount.branchName}
                                        </span>
                                    </td>
                                </tr> :null}
                                <tr>
                                    <td width="35%" className="tr">转款方式：</td>
                                    <td width="65%">
                                        <select name="fr_promo" className="select w260 member-input" onChange={this.onSelectTransferType.bind(this)} ref="transferType">
                                            {this.renderOfflineTransferTypes()}
                                        </select>
                                    </td>
                                </tr>

                                <tr style={{display:this.state.requirePlace?"table-row":"none"}}>
                                    <td width="35%" className="tr">支行省：</td>
                                    <td width="65%">
                                        <select name="fr_promo" className="select w260 member-input" ref="province" onChange={this.onProvinceChanged.bind(this)}>
                                            {Province}
                                        </select>
                                    </td>
                                </tr>
                                <tr style={{display:this.state.requirePlace?"table-row":"none"}}>
                                    <td width="35%" className="tr">支行市：</td>
                                    <td width="65%">
                                        <select name="fr_promo" className="select w260 member-input" ref="city">
                                            {City}
                                        </select>
                                    </td>
                                </tr>
                                <tr style={{display:this.state.requirePlace?"table-row":"none"}}>
                                    <td width="35%" className="tr">支行地址：</td>
                                    <td width="65%">
                                     <span id="amt_field">
                                            <input type="text" className="input w238 member-input" ref="branchName"
                                                   placeholder="地址" name="fr_branchName"/>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="35%" className="tr">存款金额：</td>
                                    <td width="65%">
                                        <span id="amt_field">
                                            <input type="number" className="input w238 member-input" ref="offlineAmount"
                                                   placeholder="填写你要存入的金额数" name="fr_amount" required/>
                                        </span>
                                        <span className="ml5 red f12">
                                            <span id="min_amt"></span>
                                            <span id="max_amt"></span>
                                        </span>
                                        <span className="ml5 red f12" hidden={this.state.moneyHint}>* 金额未输入</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="35%" className="tr">&nbsp;</td>
                                    <td width="65%">
                                        <input type="submit" className="htbtnlg w260 t20 color-second BGcolor-second" value="确认并提交"/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <input type="hidden" name="bankid" value="29"/>
                            <input type="hidden" name="_token" value="0jC4nFuh8VJTPNGKnzKwszMVB7uOiLFZYJ9WbNYv"/>
                        </form>

                    </div>


                    <div className="c" hidden={this.state.hiddenOfflineWeixinAli}>
                        <form id="payform" onSubmit={this.offlineWeixinAliPay.bind(this)}>
                            <table className="ht-fktable f14" width="100%">
                                <tbody>
                                    <tr>
                                        <td width="35%" className="tr">收款帐号：</td>
                                        <td width="65%">
                                            <select name="fr_promo" className="select w260 member-input" ref="adminWeixinAliAccount" onChange={this.adminAccountnos.bind(this)}>
                                                {this.renderOfflineWeixinAliPayAccounts()}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="35%" className="tr">存款金额：</td>
                                        <td width="65%">
                                            <span id="amt_field">
                                                <input type="number" className="input w238 member-input" ref="offlineWeixinAliAmount"
                                                       placeholder="填写你要存入的金额数" name="fr_amount" required/>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="35%" className="tr">&nbsp;</td>
                                        <td width="65%">
                                            <span className="ml5 red f12" >建议您存款提交非整数金额，如102，可加速添加到帐时间</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="35%" className="tr">&nbsp;</td>
                                        <td width="65%">
                                            <input type="submit" className="htbtnlg w260 t20 color-second BGcolor-second" value="确认并提交"/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>

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
        offlineAccounts: state.offlineAccount.offlineAccounts,
        offlineWeixinAliAccounts: state.offlineAccount.offlineWeixinAliAccounts,
        offlineTransferTypes: state.offlineAccount.transferTypes,
        remoteSysConfs:state.remoteSysConfs
    }
);

export default connect(mapStateToProps, {})(DepositPage);