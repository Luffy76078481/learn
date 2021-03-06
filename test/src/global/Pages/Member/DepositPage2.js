/**
 * BT6-存款
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    ApiThirdDepositAction,
    ApiPayBanksAction,
    ApiDepositAction,
    ApiOfflineDepositAction,
    ApiGetAdminAllBanksAction,
    ApiOnlinePayAction,
    ApiSubmitOnlinePayAction
} from "globalAction";
import QRCode from 'qrcode.react';
import {provinces} from "../../../themes/common/common";
import { browserHistory} from 'react-router'
import loadingImg from '../images/loading_wellbet.gif';
 
class DepositPage extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            selAdminAccount: null, // 储存数据
            isLoading:false,//二维码生成中
            thirdProgress:false,//第三方请求状态
            thirdPayImg:"",//二维码地址
            thirdPayRecordId:"",//第三方单号
            payType:"ZXWY",//支付方式
            payIndex:"0",//支付类型在props中的index
            hideAtmBox:true,//银行转账
            onlineBankCode:"",//在线网银Code
            onlineBankId:"",//在线网银Id
            offlineBankCode:"",// 银行转账中的某一条数据
            offlineBankId:"",// 银行转账下标
            payNow:{},//在线支付当前渠道信息
            payCanelList:[],//当前支付所含渠道
            isPayLink:false,//是否是跳转链接或者是二维码
            transferType:1,//银行转账类型参数
            param:{
                amount:0,
                id:0,
                thirdPayId:0,
                resultType:"QRCODE"
            },
            reqLock:false

        };
        this.state.selProvince = provinces[0]; // 省份默认第一个
    }
    // Api 访问
    componentWillMount() {
        let self = this;
        new ApiOnlinePayAction().fly();  // 获取在线支付银行列表
        new ApiGetAdminAllBanksAction().fly(); //新增获取所有收款银行列表  
        //获取用户可用支付银行列表
        new ApiPayBanksAction().fly(resp=>{
                if(resp.StatusCode ===0) {
                    if(resp.Banks.length>0){
                        try {
                        resp.Banks.forEach(item => {
                            if(item.BankNo =="ALIPAY_WAP" || item.BankNo =="WECHAT_WAP" || item.BankNo =="QQPAY_WAP" || item.BankNo =="JDPAY_WAP" || item.BankNo =="WECHAT" || item.BankNo =="ALIPAY" ||  item.BankNo =="QQPAY" ||  item.BankNo =="JDPAY" || item.BankNo =="YLPAY" || item.BankNo =="BAIDUPAY"){
                                throw new Error('exist')
                            }
                        });
                        }catch (e) {
                           
                        }
                    }
                }
            }
        );
    }
    // 选择省份时，城市发生变化
    onProvinceChanged(e) {
        this.setState({selProvince:provinces[e.target.selectedIndex]})
    }
    // 下一步
    SelOffline(){
        var bankAccountId = this.state.offlineBankId;
        var depositmoney = document.getElementById("deposit_money").value;
        var offpay = this.props.offlineAccounts[bankAccountId];// 支付类型
        // 如果银行信息不存在
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
        // 传入类型，银行转账中=》支付宝微信与银联扫码
        let TransType = 1; // 默认1
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
            selAdminAccount: this.props.offlineAccounts[bankAccountId],// 银行信息
            transferType:TransType, // 向后台传入的支付类型
            offlineBankId:offpay.index, // 数组下标
            offlineBankCode:offpay.Bank.Id, // 银行转账银行ID
            hideAtmBox:false, // 显示银行转账下一步后的收款信息
            isPayLink:offpay.Type==3?false:true // 判断二维码支付类型
        });
    }
    // 银行转账=》支付表单
    renderofflinepay_option() {
        var ret = [];
        if(this.props.offlineAccounts.length>0){
            // offlineBankCode为空，DOM未加载时进入
            if(this.state.offlineBankCode == "" || !this.refs.offlineBankDOM){
                this.state.offlineBankId = 0; // 下标
                this.state.offlineBankCode = this.props.offlineAccounts[0].Bank.Id; // 默认选择第一个
                this.state.hideAtmBox = true; // 显示或隐藏
            }
            for (let i = 0; i < this.props.offlineAccounts.length; i++) {
                var BankInfo = this.props.offlineAccounts[i];
                BankInfo.index = i;
                if(i==0){
                    ret.push(<option key={i} selected value={JSON.stringify(BankInfo)}>{BankInfo.Bank.BankName}</option>)              
                }   
                else{
                    ret.push(<option key={i} value={JSON.stringify(BankInfo)}>{BankInfo.Bank.BankName}</option>)   
                }  
            }
        }else{
            ret.push(<option key="1">暂无在线支付方式</option>)
        }
        return(
            <div>
                <p>
                    <label></label>
                    <span className="Yhtext">*银行快捷，更安全更快捷，入款即可享受银行卡优惠</span> 
                </p> 
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
                            <option selected value="银行转账支付方式目前就只有一个，暂时做虚假的">渠道 1</option>
                        </select>
                    </span>
                </p>
            </div>
        )   
    }
    //根据payType不同调用不同api支付。
    howPay(){
        if(this.state.payType=="ZXWY" ){
            //如果是在线网银
            this.sendOnlinePay(true);
        }else if(this.state.payType=="YHZZ"){
            if(this.state.isPayLink){
                // 银行转账银联
                this.offlinePay();
            }
            else{
                // 银行转账二维码
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
    // 渲染省份，城市。
    renderOfflinePay(){
        let self =this;
        // 省份选择
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
        // 城市选择
        function renderCities() {
            var Cities = [];
            // selProvince 开始默认0，选择省份后发生变化
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
                            {/* 二维码扫描方式 */}
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
                                    <span onClick={this.openLink.bind(this)} style={{'cursor':'pointer','color': 'blue'}}>{self.state.selAdminAccount.AccountNo}</span>
                                </p>                                 
                            </div>
                            <div className="alipayCode_qrcode">
                                <div className="alipayQrImg_Box">      
                                    <QRCode includeMargin={false} size={160} value={window.config.prdImgUrl + self.state.selAdminAccount.ImageUrl || ""}  className='qrcodeCanv' />   
                                </div>
                            </div>
                        </div>   
                        :
                        <div className="bankPay">
                            {/* 非二维码扫描 */}
                            <p>
                                <label>帐户名：</label>
                                <span>{self.state.selAdminAccount.AccountName}</span>
                            </p>                  
                            <p>
                                <label>银行卡号：</label>
                                <span onClick={this.openLink.bind(this)} style={{'color':'blue','cursor':'pointer'}}>{self.state.selAdminAccount.AccountNo}</span>
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
                            <label>转账人姓名：</label>
                            <input ref='alipayName' placeholder="请输入转账人姓名"/>
                        </p>  
                    </div>
                }
            </div>
        )
    }
    //银行非二维码转账Action
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
        new ApiOfflineDepositAction(
            filter
        ).fly((resp)=>{
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
    // 二维码支付
    openQrImg(){
        let item = this.props.allOfflineBanks[this.state.offlineBankId]; // 后台传入的信息
        var depositmoney = document.getElementById("deposit_money").value;; // 充值数
        var depositName = this.refs.alipayName.value; // 用户充值名
        var BankName = this.state.selAdminAccount.Bank.BankName
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
    // 银行转账支付方式下拉
    changeOfflineBankCode(e){
        let val = JSON.parse(e.target.value);
        let self = this;
        self.setState({
            offlineBankId:val.index, // 数组下标
            offlineBankCode:val.Bank.Id, // 银行转账Code
            hideAtmBox:true, // 是否是银行转账
            isPayLink:val.Type == 3?false:true // 是否是二维码
        });  
    }
    // 渲染【第三方】支付表单
    renderThirdDom(){
        let self = this;
        let recordId =self.state.thirdPayRecordId;
        let imgCode = self.state.thirdPayImg;
        let typeName = "";
        let money = document.getElementById("deposit_money").value;
        // 支付完成跳转充值记录页面
        function successPay(){
            browserHistory.push("/records_deposit");
        }
        // 支付失败跳转客服页面
        function errorPay(){
            window.open(self.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
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
    // 第三方支付Action
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
                        thirdProgress:true,// 弹窗，第三方支付后弹窗
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
        this.state.param = {
            //提交传参
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
        // 导航无法点击
        $(this.refs.tabUlList).children('li').css({"pointer-events":"none"})
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
                $(self.refs.tabUlList).children('li').css({"pointer-events":"visiblepainted"}) // 导航恢复点击
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
                    $(self.refs.tabUlList).children('li').css({"pointer-events":"visiblepainted"}) // 导航恢复点击
                })
            })            
        }
    }
    //渲染支付方式DOM
    renderTabsUl(){     
        let ret = [];    
        let FeeRate = this.props.backConfigs.DepositRefundFeeRate || 0;
        let bankSys = this.props.remoteSysConfs.deposit_order?JSON.parse(this.props.remoteSysConfs.deposit_order): [];
        for(let i=0;i<bankSys.length;i++){
            let item = bankSys[i];
            switch (item.key){
                case "ZXWY":
                    ret.push(
                        <li key='ZXWY' data-payIndex="" className={this.state.payType=="ZXWY"?"selected_red":""}  onClick={this.navOn.bind(this)} id="ZXWY">
                            <a>在线网银<span className="tooltiptextuc">自动到账</span></a>
                        </li>
                    );
                break;
                case "YHZZ":
                    ret.push(
                        <li key='YHZZ' data-payIndex="" className={this.state.payType=="YHZZ"?"selected_red":""}  onClick={this.navOn.bind(this)} id="YHZZ">
                            <a>银行转账<span className="tooltiptextuc">赠送{(FeeRate*100).toFixed(1)}%无上限</span></a>
                        </li>
                    );
                break;
                case "ZXZF":
                    if(this.props.payThirdInfos.length>0){
                        ret.push(
                            <li key='ZXZF' data-payIndex="" className={this.state.payType=="ZXZF"?"selected_red":""}  onClick={this.navOn.bind(this)} id="ZXZF">
                                <a>在线支付</a>
                            </li>
                        );
                    }
                break;
            }
            if(this.state.payType == "")
            this.state.payType = bankSys[0].key    
        };
        return ret;
    }

    // 根据【payType】渲染表单
    renderPayTypeDom(AmountSpan){
        let payTypeDom;
        if(this.state.payType=="YHZZ"){
            //【银行转账表单渲染】
            payTypeDom=(
                <div>
                    {this.renderofflinepay_option()}
                </div>
            )
        }else{
            // thirdProgress 第三方请求状态
            payTypeDom=(<div>{this.state.thirdProgress?this.renderThirdDom():""}</div>)
        }
        return payTypeDom;
    }
    //切换
    navOn(e){
        let $DOM =  window.$(e.currentTarget);
        let id = e.currentTarget.id;
        this.setState({
            thirdProgress:false,//第三方请求状态
            payType:id,
            hideAtmBox:true, // 隐藏收款信息组件（点击下一步）
            payIndex:$DOM.attr('data-payIndex')
        });
    }
    loadingDom(){
        return(<div className="loaderDom"><img src={loadingImg} /><p>二维码生成中,请稍后...</p></div>)
    }
    // 银行转账渲染-存储金额，第三方支付表单
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
                    if(i==0){
                        ret.push(<option key={i} selected value={JSON.stringify(payTrueList[bgname].cont)}>{payTrueList[bgname].cont[0].BankName}</option>)
                    }else{
                        ret.push(<option key={i} value={JSON.stringify(payTrueList[bgname].cont)}>{payTrueList[bgname].cont[0].BankName}</option>)
                    }
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
    // 选择支付方式,加载对应支付渠道下拉；
    ChangePay(e){
        let data = JSON.parse(e.target.value);
        this.setState({
            payCanelList:data,
            payNow:data[0]
        })
    }
    // 选择渠道，显示对应限额
    ChangeCanl(e){
        let data = JSON.parse(e.target.value);
        this.setState({
            payNow:data
        })
    }
    render() {
        const tabsUl = this.renderTabsUl(); // 存款类型=》转账，支付，网银
        const payTypeDom = this.renderPayTypeDom(AmountSpan); // 渲染表单 或 第三方支付弹窗
        let offlineFrom=""; // 银行转账收款信息，在线网银大小额，在线支付提示语
        let AmountSpan; // 限额提示
        let tips;
        if(this.state.payType=="YHZZ"){
            //【银行转账】
            offlineFrom = this.renderOfflinePay(); // 收款信息
            if(this.state.offlineBankCode){
                AmountSpan = (<span className="font_red font_bold">*单笔转账限额 {this.props.offlineAccounts[this.state.offlineBankId]['MinAmount']}.00~{this.props.offlineAccounts[this.state.offlineBankId]['MaxAmount']}.00元</span>)
            }
        }else if(this.state.payType=="ZXWY"){
            //【在线网银】
            if(this.state.onlineBankCode){
                AmountSpan = (<span className="font_red font_bold">*单笔转账限额 {this.props.payBankInfos[this.state.onlineBankId]['MinAmount']}.00~{this.props.payBankInfos[this.state.onlineBankId]['MaxAmount']}.00元</span>)
            }
        }else{
            tips = ( <p  className="tips font_red font_bold">
                提示：在线支付操作步骤：
                1. 选择支付方式以及支付渠道；
                2. 输入存款金额，再点击提交；
                3. 提交进入即显示付款二维码，采用第三方APP扫一扫进行付款；或者跳转至第三方支付网站进行支付；
                4. 确定付款完成后，系统将会即时添加到您的会员账户
            </p>)
        }
        return (
            <div>
                <div className="deposit">
                    {/* 存款类型=》转账，支付，网银 */}
                    <ul className="tabsUl" ref='tabUlList'>
                        {tabsUl}
                    </ul>
                    <div className="clearfix"></div>
                    <div className="dpt_credit">
                    {/* 银行转账表单与第三方支付后的弹窗*/}
                        {payTypeDom}
                    </div>
                    {this.state.isLoading?this.loadingDom():""}
                    <div className="money" hidden={this.state.isLoading || this.state.thirdProgress}>
                        {/* 银行转账渲染-存储金额，第三方支付表单 */}
                        {this.renderPayTypeFrom(AmountSpan)}
                        {/* 银行转账收款信息，在线网银大小额，在线支付提示语 */}
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
        offlineAccounts: state.allOfflineAccount.allOfflineBanks,
        offlineWeixinAliAccounts: state.offlineAccount.offlineWeixinAliAccounts,
        payOnline:state.payOnline,
        backConfigs:state.backConfigs,
        allOfflineBanks: state.allOfflineAccount.allOfflineBanks
        // offlineTransferTypes: state.offlineAccount.transferTypes
    }
);


export default connect(mapStateToProps, {})(DepositPage);