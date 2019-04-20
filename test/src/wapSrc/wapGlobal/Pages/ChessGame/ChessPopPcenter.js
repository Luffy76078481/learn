import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import { Toast , Modal,DatePicker , Picker ,InputItem} from 'antd-mobile';
import {provinces} from "../../../../themes/common/common";
import {config} from "globalConfig";
import "./ChessPop.scss"

class ChessPopPcenter extends Component{
    constructor(props){
        super(props);
        this.state={
            tabType:"grxx",
            beginValue:"",
            birthday:"",
            updatePass:"ZH", //密码管理选项卡默认选中账号密码一栏
            updateBankCard:"ADD", //银行卡默认选中新增银行卡
            pickerValue:"",//选中银行ID
            pickerShen:"",//选中开户省
            selProvince:provinces[0],//选中开户市
            pickerMoneyTo:[], //资金账号转出
            pickerMoneyFrom:[], //资金账号转入
        }
    }

    componentWillMount(){
        new window.actions.ApiBanksAction().fly();
    }

     



    
    componentWillReceiveProps(nextProps){
        if(this.props.tabType !== nextProps.tabType){
            this.setState({
                tabType:nextProps.tabType
            })
        }
    }

    tabChange(tabType){
        this.setState({
            tabType
        });
    }

    onBeginChange(value){
        this.setState({
            beginValue:value
        })
    }

    validateInput(val){
        this.setState({
            birthday:val.format("yyyy-MM-dd")
        });
    }

   
    copyCode(){
        var Url2=document.getElementById("recommendCode");
        Url2.select();
        try{
            if(document.execCommand('copy', false, null)){
                document.execCommand("Copy");
                Toast.success('复制成功！')
            }
        } catch(err){
            Toast.fail('复制失败，请手动复制')
        }
    }

    loadAmount(){
        Toast.loading('金额刷新中...',300);
        new window.actions.ApiPlayerInfoAction().fly(resp=>{
            Toast.hide();
            if (resp.StatusCode === 0) {
                Toast.success('金额刷新成功！')
            }
        });
    }

    changeAutoTransfer(){//自动转账开关
        Toast.loading('转账模式切换中...');
        let open = this.props.user.AutoTransfer == 1?0:1;
        new window.actions.ApiUpdateTransferSettingAction(open).fly(resp=>{
            if(resp.StatusCode === 0){
                new window.actions.ApiPlayerInfoAction().fly(resp=>{
                    Toast.success('转账模式切换成功');
                });
            }else{
                Toast.fail('转账模式切换失败');
            }
        });
    }


    submitUserInfo(){ //修改个人信息
        let email = this.refs.email.value;
        let phone = this.refs.phone.value;
        let webChat = this.refs.webChat.value;
        let birthday = this.state.birthday;
        if(email == "")email = this.props.user.email;
        if(phone == "")phone = this.props.user.phone;
        if(webChat == "")webChat = this.props.user.webChat;
        if(birthday == "")birthday = this.props.user.birthday;

        Toast.loading('信息修改中...',300);
        new window.actions.ApiUpdateUserInfoAction({email,phone,webChat,birthday}).fly(res=>{
            Toast.hide();
            if(res.StatusCode == 0){
                Toast.success('信息修改成功！')
                new window.actions.ApiPlayerInfoAction().fly();
            }else{
                Toast.fail('信息修改失败,请重试！')
            }
           
        })
    }


    reload() {
        new window.actions.ApiGamePlatformsBalanceAction().fly();
        new window.actions.ApiGamePlatformAllBalanceAction().fly();
        new window.actions.ApiPlayerInfoAction().fly();
    }


    // 剩余余额
    getBalance(id) {
        var ret = 0;
        if (id === "main") {
            ret = this.props.user.amount || 0;
        } else {
            for (var i = 0; i < this.props.game.platforms.length; i++) {
                var p = this.props.game.platforms[i];
                if (p.ID === id) {
                    ret = p.Balance || 0;
                    break;
                }
            }
        }
        return Math.floor(ret);
    }

    // 转出 转入替换位置
    onChange() {
        this.setState({pickerMoneyFrom:this.state.pickerMoneyTo, pickerMoneyTo:this.state.pickerMoneyFrom});
    }
    // 转入
    onSubmit(e) {
        e.preventDefault();
        var from = this.state.pickerMoneyFrom[0];
        var to = this.state.pickerMoneyTo[0];
        //判空
        if (!from || !to) {
            Toast.fail('转入转出项必须选择')
            return;
        }
        //判重
        if (from == to) {
            Toast.fail('转入转出项不能相同')
            return;
        }
        var fromBalance = this.getBalance(this.state.pickerMoneyTo[0]);
        //判小
        if (fromBalance <= 0) {
            Toast.fail('转出项可用金额必须大于0')
            return;
        }
        //判大
        if (!this.refs.amount.value || this.refs.amount.value > fromBalance) {
            Toast.fail('输入金额必须大于0并且小于转出可用金额')
            return;
        }

        var next = (platformsId)=>{
            // 转入
            if (this.state.pickerMoneyFrom[0] !== "main") {//如果右边不是主账户就进行转入操作
                new window.actions.ApiTransferAction (this.state.pickerMoneyFrom[0], "in", this.refs.amount.value).fly((resp)=>{
                    Toast.hide();
                    if (resp.StatusCode === 0) {
                        Toast.success('转账成功！');
                        this.reload([to,platformsId]);
                    }else{
                        Toast.fail("转账失败"+resp.Message);
                    }
                });
            } else {//否则已经执行转出到主钱包操作，直接刷新
                Toast.hide();
                Toast.success('转账成功！')
                this.reload(platformsId);
            }
        }
        // 转出
        Toast.loading('转账处理中...',300);
        if (this.state.pickerMoneyTo[0] !== "main") { //如果左边不是主账户那就先进行转出到钱包的操作
            new window.actions.ApiTransferAction (this.state.pickerMoneyTo[0], "out", this.refs.amount.value).fly((resp)=>{
                if (resp.StatusCode === 0) {
                    next();
                }else{
                    Toast.hide();
                    Toast.fail("转账失败"+resp.Message);
                }
            });
        } 
        else { //如果左边是主账户
            next();   
        }
    }

    transferAllOut(){
        let _this = this;1
        let transferArr=[];
        for(let i=0; i<this.props.platforms.length;i++){
            let platform = this.props.platforms[i];
            if(platform.Balance && platform.Balance>=1){
                transferArr.push(platform);
            }
        }
        if(transferArr.length == 0) {
            Toast.fail("当前没有可转出的余额");
            return
        }else{
            Toast.loading('平台余额转出主钱包中...',300);
        }
        for(let i=0; i<transferArr.length;i++){
            let platform = transferArr[i];
            let index = i+1;
            new window.actions.ApiTransferAction (platform.ID,"out",parseInt(platform.Balance)).fly((resp)=>{
                if(resp.StatusCode === 0){
                    this.reload();
                    Toast.hide();
                    Toast.success("余额转出主钱包成功");
                }
            }, "transfer_" + platform.ID);
        }
      
    }

    bindBankCard(){   //绑定新银行卡
        let bankCard = parseInt(this.state.pickerValue);
        let bankTrueName = this.refs.bankTrueName.value;
        let bankNumber = this.refs.bankNumber.value;
        let checkShen = this.state.pickerShen;
        let shen = "";
        let shi =this.state.pickerShi;
        let bankZhihang = this.refs.bankZhihang.value;

        if(!!!bankCard){
            Toast.fail("银行信息不能为空！");
            return false;
        }
        if(!this.props.user.realName){
            if(!!!bankTrueName){
                Toast.fail("账户名信息不能为空！");
                return false;
            }else{
                var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
                if(!reg.test(bankTrueName)){
                    Toast.fail("账户名信息必须为中文！");
                    return false;
                }
            }
        }
        if(!!!bankNumber){
            Toast.fail("银行卡号信息不能为空！");
            return false;
        }
        if(!!!checkShen){
            Toast.fail("开户省信息不能为空！");
            return false;
        }else{
            shen = provinces[parseInt(this.state.pickerShen)].name;
        }
        if(!!!shi){
            Toast.fail("开户市信息不能为空！");
            return false;
        }else{
            shi = shi[0];
        }
        if(!!!bankZhihang){
            Toast.fail("开户支行信息不能为空！");
            return false;
        }
        Toast.loading('银行卡绑定中...',300);
        if(!this.props.user.realName){
            new window.actions.ApiUpdateInfoAction(bankTrueName).fly((resp)=>{
                if(resp.StatusCode === 0){
                    new window.actions.ApiBindCardAction(
                    {
                        BankId:bankCard,
                        Province:shen,
                        City:shi,
                        BranchName:bankZhihang,
                        AccountNo:bankNumber,
                        AccountName:bankTrueName
                    }
                    ).fly(resp=>{
                        Toast.hide();
                        if (resp.StatusCode === 0) {
                            Toast.success('银行卡绑定成功！')
                        }else{
                            Toast.fail(resp.Message);
                        }
                    });
                }else{
                    Toast.fail(resp.Message);
                }
            });
        }else{
            new window.actions.ApiBindCardAction(
            {
                BankId:bankCard,
                Province:shen,
                City:shi,
                BranchName:bankZhihang,
                AccountNo:bankNumber,
                AccountName:bankTrueName
            }
            ).fly(resp=>{
                Toast.hide();
                if (resp.StatusCode === 0) {
                    Toast.success('银行卡绑定成功！')
                }else{
                    Toast.fail(resp.Message);
                }
            });
        }
        
    }

    checkBankCardVal(val,message){
        if(!!!val){
            Toast.fail(`${message}信息不能为空！`)
            return true;
        }else{
            return false;
        }
    }

    submitServer(){  //客服链接
        if(config.isApp){
            window.Util.appOpen(this.props.remoteSysConfs.online_service_link)
        }else{
            window.open(this.props.remoteSysConfs.online_service_link,'_blank');
        }
    }

    submitPassWord(){  //修改密码
        let newPass = this.refs.newPass.value;
        let newPass2 = this.refs.newPass2.value;
        let oldPass = this.refs.oldPass.value;

        if (!newPass) {
            Toast.fail('新密码未指定')
            return;
        }
        if (!oldPass) {
            Toast.fail('原密码未指定')
            return;
        }
        if (newPass !== newPass2) {
            Toast.fail('新密码与确认密码不匹配')
            return;
        }
        Toast.loading('密码修改中...',300);
        if(this.state.updatePass == "ZH"){ //修改账号密码
            new window.actions.ApiChangePwdAction(oldPass,newPass).fly(res=>{
                Toast.hide();
                if(res.StatusCode == 0){
                    Toast.success('登录密码修改成功！')
                }else{
                    Toast.fail(res.Message)
                }
            });
        }else{//修改资金密码
            new window.actions.ApiChangePayPwdAction(oldPass,newPass).fly(res=>{
                Toast.hide();
                if(res.StatusCode == 0){
                    Toast.success('资金密码修改成功！')
                }else{
                    Toast.fail(res.Message)
                }
            });

        }
    }

    bankCardList(){//删除银行卡界面
        
        var ret = [];
        if (this.props.user.bankAccounts) {
            for (var i = 0; i < this.props.user.bankAccounts.length; i++) {
                var account = this.props.user.bankAccounts[i];
                ret.push(
                    <div key={i} className="chesspop-yhk-delbox-itembox">
                        <div className="chesspop-yhk-cardImg"></div>
                        <div className="chesspop-yhk-cardUserName">{account.AccountName}</div>
                        <div className="chesspop-yhk-cardName">{account.Bank.BankName}</div>
                        <div className="chesspop-yhk-cardNumber">{account.AccountNo}</div>
                        {/* <div className="chesspop-yhk-cardSwich">
                            <div className="mygougoubox">
                                <div className="yhk-gou1"></div>
                                <div className="yhk-gou2"></div>
                            </div>
                        </div> */}
                    </div>
                );
            }
        }

        return ret;


    }

    left(){
        return(
            <div className="chesspop-self-left">
                <ul>
                    <li onClick={this.tabChange.bind(this,"grxx")} className={this.state.tabType =="grxx" ? "chesspop-self-left-li-active" : "chesspop-self-left-li-normal"}>
                        <span className="chesspop-self-left-li-title">个人信息</span>
                    </li>
                    <li onClick={this.tabChange.bind(this,"yhk")} className={this.state.tabType =="yhk" ? "chesspop-self-left-li-active" : "chesspop-self-left-li-normal"}>
                        <span className="chesspop-self-left-li-title">银行卡</span>
                    </li>
                    <li onClick={this.tabChange.bind(this,"mmgl")} className={this.state.tabType =="mmgl" ? "chesspop-self-left-li-active" : "chesspop-self-left-li-normal"}>
                        <span className="chesspop-self-left-li-title">密码管理</span>
                    </li>
                    <li onClick={this.tabChange.bind(this,"ptye")} className={this.state.tabType =="ptye" ? "chesspop-self-left-li-active" : "chesspop-self-left-li-normal"}>
                        <span className="chesspop-self-left-li-title">平台余额</span>
                    </li>
                    <li onClick={this.tabChange.bind(this,"ptzz")} className={this.state.tabType =="ptzz" ? "chesspop-self-left-li-active" : "chesspop-self-left-li-normal"}>
                        <span className="chesspop-self-left-li-title">平台转账</span>
                    </li>
                    <li onClick={this.tabChange.bind(this,"tglj")} className={this.state.tabType =="tglj" ? "chesspop-self-left-li-active" : "chesspop-self-left-li-normal"}>
                        <span className="chesspop-self-left-li-title">推广链接</span>
                    </li>
                </ul>
            </div>
        )
    }
    right(){
        switch(this.state.tabType){
            case "grxx": // 个人信息
            const CustomChildren = ({ extra, onClick, children }) => (
                <div style={{"position":"relative"}}>
                     <input className="chesspop-specbirth"  defaultValue={this.state.birthday?this.state.birthday:(this.props.user.birthday && this.props.user.birthday.split("T"))?this.props.user.birthday.split("T")[0]:"-"}>
                    </input> 
                    <div  onClick={onClick}  className="aatest"></div>
                </div> 
            );
            return(
                <div className="chesspop-grxx">
                    <div className="chesspop-grxx-txbox">
                        <img src={require(`../../style/images/chess/touxiang/${this.props.user.ImagePath}.png`)}/>
                    </div>
                    <div className="chesspop-grxx-button-tx">
                        <span className= "chesspop-grxx-button-tx-title">更换头像</span>
                    </div>
                    <ul className="chesspop-grxx-admlist">
                        {/* <li>
                            <lable>昵称：</lable>
                            <input ref="" type="text" placeholder={this.props.user.username}/>
                        </li> */}
                        <li>
                            <lable>邮箱：</lable>
                            <input ref="email" type="text" defaultValue={this.props.user.email}/>
                        </li>
                        <li>
                            <lable>手机：</lable>
                            <input ref="phone" type="text" defaultValue={this.props.user.phone}/>
                        </li>
                        <li>
                            <lable>微信：</lable>
                            <input ref="webChat" type="text" defaultValue={this.props.user.webChat}/>
                        </li>
                        <li className="chesspop-grxx-spec">
                            <lable>生日：</lable> 
                            <DatePicker
                                mode="date"
                                title="日期选择"
                                extra="请选择您的生日"
                                ref="birthday"
                                minDate={new Date(1900,1,1)}
                                maxDate={new Date()}
                                value={this.state.birthday?new Date(this.state.birthday):""}
                                onOk = {this.validateInput.bind(this)}
                            >
                                <CustomChildren></CustomChildren>
                            </DatePicker>
                           
                        </li>
                        <li>
                            <div onClick={this.submitUserInfo.bind(this)} className="chesspop-grxx-button-qrxg">
                                <span className= "chesspop-grxx-button-qrxg-title">确认修改</span>
                            </div>
                        </li>
                    </ul>
                  
                </div>
           )
           case "yhk": //银行卡
            const CustomChildren1 = ({ extra, onClick, children }) => ( //开户银行
                    <input  type="text" defaultValue={extra} readOnly onClick={onClick}/>
            );
            var data1 = [];
            for (var i = 0; i < this.props.bankInfos.length; i++){
                var  bank = this.props.bankInfos [i] ;
                data1.push(
                    {
                        label:bank.BankName,
                        value: bank.Id,
                    }
                )
            }

            var data2 = [];
            for (var i = 0; i < provinces.length; i++) {
                var p = provinces[i];
                data2.push(
                    {
                        label:p.name,
                        value: i,
                    }
                );
            }

            var data3 = [];
            for (var i = 0; i < this.state.selProvince.cities.length; i++) {
                var c = this.state.selProvince.cities[i];
                data3.push(
                    {
                        label:c.name,
                        value: c.name,
                    }
                );
    
            }

            return(
                <div className="chesspop-yhk">
                    <div onClick={()=>{this.setState({updateBankCard:"ADD"})}} className={["chesspop-tab chesspop-tab-left",this.state.updateBankCard == "ADD" && "chesspop-tab-active"].join(' ')}>新增银行卡</div>
                    <div onClick={()=>{this.setState({updateBankCard:"DEL"})}} className={["chesspop-tab chesspop-tab-right",this.state.updateBankCard == "DEL" && "chesspop-tab-active"].join(' ')}>我的银行卡</div>
                    {this.state.updateBankCard == "ADD"?
                        <from>
                            <ul className="chesspop-grxx-passlist">
                                <li className="chesspop-grxx-spec">
                                    <lable>选择银行：</lable>
                                    <Picker 
                                        title="选择银行"
                                        data={data1}
                                        value={this.state.pickerValue}
                                        onOk={v =>this.setState({ pickerValue: v})}
                                        cols={1}
                                        >
                                        <CustomChildren1></CustomChildren1>
                                    </Picker>
                                
                                </li>
                                {!this.props.user.realName &&
                                    <li>
                                        <lable>账&nbsp;户&nbsp;名&nbsp;：</lable>
                                        <input ref="bankTrueName" type="text" placeholder="请填写真实姓名"/>
                                    </li>
                                }
                                
                                <li>
                                    <lable>银行卡号：</lable>
                                    <input ref="bankNumber" type="number" placeholder="请输入银行卡号"/>
                                </li>
                                <li className="chesspop-grxx-spec">
                                    <lable>开&nbsp;户&nbsp;省&nbsp;：</lable>
                                    <Picker 
                                        title="选择开户省"
                                        data={data2}
                                        value={this.state.pickerShen}
                                        onOk={v =>{this.setState({ pickerShen: v,selProvince:provinces[parseInt(v)]})}}
                                        cols={1}
                                        >
                                        <CustomChildren1></CustomChildren1>
                                    </Picker>
                                </li>
                                <li className="chesspop-grxx-spec">
                                    <lable>开&nbsp;户&nbsp;市&nbsp;：</lable>
                                    <Picker 
                                        title="选择开户市"
                                        data={data3}
                                        value={this.state.pickerShi}
                                        onOk={v =>this.setState({ pickerShi: v})}
                                        cols={1}
                                        >
                                        <CustomChildren1></CustomChildren1>
                                    </Picker>
                                </li>
                                <li>
                                    <lable>开户支行：</lable>
                                    <input ref="bankZhihang" type="text" placeholder="请输入开户支行"/>
                                </li>
                                <li>
                                    <div onClick={this.bindBankCard.bind(this)} className="chesspop-yhk-button-tj">
                                        <span className = "chesspop-yhk-button-tj-title">绑定新卡</span>
                                    </div>
                                </li>
                            </ul>
                        </from>
                    :
                        <div className="chesspop-yhk-delbox">
                                {this.bankCardList()}
                        </div> 
                    }
                </div>
           )
           case "mmgl"://密码管理
           return(
               <div className="chesspop-mmgl">
                    <div onClick={()=>{this.setState({updatePass:"ZH"})}} className={["chesspop-tab chesspop-tab-left",this.state.updatePass == "ZH" && "chesspop-tab-active"].join(' ')}>账号密码</div>
                    <div onClick={()=>{this.setState({updatePass:"ZJ"})}} className={["chesspop-tab chesspop-tab-right",this.state.updatePass == "ZJ" && "chesspop-tab-active"].join(' ')}>资金密码</div>
                    <from>
                        <ul className="chesspop-grxx-passlist">
                            <li>
                                <lable>原始密码：</lable>
                                <input ref="oldPass" type="text" placeholder="请输入原始密码"/>
                            </li>
                            <li>
                                <lable>新&nbsp;密&nbsp;码&nbsp;：</lable>
                                <input ref="newPass" type="text" placeholder="请输入新密码"/>
                            </li>
                            <li>
                                <lable>确认密码：</lable>
                                <input ref="newPass2" type="text" placeholder="请再次输入新密码"/>
                            </li>
                            <li>
                                <div onClick={this.submitPassWord.bind(this)} className="chesspop-mmgl-button-tj">
                                    <span className = "chesspop-mmgl-button-tj-title">提交</span>
                                </div>
                                <div onClick={this.submitServer.bind(this)} className="chesspop-mmgl-button-kf">
                                    <span className = "chesspop-mmgl-button-kf-title">客服</span>
                                </div>
                            </li>
                        </ul>
                    </from>
               </div>
          )
          case "ptye": //平台余额
                var ret = [];
                for (var i = 0; i < this.props.game.platforms.length; i++) {
                    var platform = this.props.game.platforms[i];
                    if(platform.Name == "YOPLAY"){
                        continue;
                    }
                    ret.push(
                        <li key={platform.Name2} className="chesspop-ptye-li">
                            <span>{platform.Name2}</span>
                            <span>{(platform.Balance || 0).toFixed(2)}</span>
                        </li>
                    )
                }
                 return(
                    <div className="chesspop-ptye">
                        <ul>
                            {ret}
                        </ul>
                    </div>
                )
          case "ptzz": //平台转账
            const CustomChildren2 = ({ extra, onClick, children }) => ( //开户市
                <div className="chesspop-ptzz-ptzzbox" onClick={onClick}>
                    <span>{extra}</span>
                    {/* <i className={this.state.autoMoney?"chesspop-ptzz-listbox":""}></i> */}
                </div>
            );
            var data4 = [{
                label:"主账户",
                value:"main"
            }];
            for (var i = 0; i < this.props.game.platforms.length; i++) {
                var platform = this.props.game.platforms[i];
                if(platform.Name == "YOPLAY")
                continue;
                data4.push(
                    {
                        label:platform.Name,
                        value: platform.ID,
                    }
                );
    
            }
          return(
            <div className="chesspop-ptzz">
                <div className="chesspop-ptzz-listbox">
                    <span>主钱包：</span>
                    <input value={this.props.user.amount} type="text" readOnly/>
                    <i onClick={this.loadAmount.bind(this)} className="chesspop-ptzz-reloding"></i>
                    <div className="chesspop-ptzz-zdzzbox">
                        <span>自动转账</span>
                        <i onClick={this.changeAutoTransfer.bind(this)} className={this.props.user.AutoTransfer==0?"":"chesspop-ptzz-zdzzbox-iactive"}></i>
                    </div>
                </div>
                {this.props.user.AutoTransfer==0?
                <div className="chesspop-ptzz-listbox">
                    <span>金额：</span>
                    <input ref="amount" defaultValue="0" type="text"/>
                   
                    <div>
                        <button className="chesspop-button1"  onClick={this.transferAllOut.bind(this)}></button>
                        {/* <button>一键转出</button> */}
                    </div>
                </div>
                 :null}
                {this.props.user.AutoTransfer==0?
                <div className="chesspop-ptzz-listbox chesspop-ptzz-listbox-forinput">
                    <span>&nbsp;</span>
                    <Picker 
                        title="选择转出平台"
                        data={data4}
                        value={this.state.pickerMoneyTo}
                        onOk={v =>this.setState({ pickerMoneyTo: v})}
                        cols={1}
                        >
                        <CustomChildren2></CustomChildren2>
                    </Picker>
                    <i onClick={this.onChange.bind(this)} className="chesspop-ptzz-jiantou"></i>
                    <Picker 
                        title="选择转入平台"
                        data={data4}
                        value={this.state.pickerMoneyFrom}
                        onOk={v =>this.setState({ pickerMoneyFrom: v})}
                        cols={1}
                        >
                        <CustomChildren2></CustomChildren2>
                    </Picker>
                </div>
                :null}
                {this.props.user.AutoTransfer==0?
                <div className="chesspop-ptzz-listbox chesspop-ptzz-listbox-spec">
                    <div onClick={this.onSubmit.bind(this)} className="chesspop-ptzz-button">确认转账</div>
                </div>
                :null}
            </div>
         )
         case "tglj": //推广链接
          return(
              <div className="chesspop-tglj">
                    <p className="chesspop-tglj-title">
                        <span>推广码：</span>
                        <input id="recommendCode" className="chesspop-tglj-speccolor"  type="text" value={location.protocol+"//"+ location.hostname + "/register?channel=" +this.props.user.recommendCode}/>
                        <span onClick={this.copyCode.bind(this)} className="chesspop-tglj-copy"></span>
                    </p>
                    <p className="chesspop-tglj-title chesspop-tglj-speccolor">
                        友情提示
                    </p>
                    <p className="chesspop-tglj-title chesspop-tglj-speccolor chesspop-tglj-spectitle">
                        <textarea readOnly defaultValue="我们一直致力于打造一个公平公正、绿色健康的游戏环境，为保证玩家的利益，运营团队听取各方面意见并经过多次讨论后，郑重决定通过封号等措施，全面打击非正常游戏的行为。"></textarea>
                    </p>
              </div>
         )
        }
    }
  
    render(){

        return (
            <div className="chesspop-neibox">
                <p className="chesspop-white-titlefont chesspop-head">
                    <span className="chesspop-head-title">个人中心</span>
                </p>
                <div className="chesspop-botbox">
                    {this.left()}
                    <div className="chesspop-self-right">
                        {this.right()}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
        game: state.game,
        remoteSysConfs:state.remoteSysConfs,
        bankInfos:state.bankInfos,
        platforms: state.game.platforms.filter((item)=>{
            if(item.Enabled){
                return item;
            }
        }),
    }
)

export default connect(mapStateToProps)(ChessPopPcenter)