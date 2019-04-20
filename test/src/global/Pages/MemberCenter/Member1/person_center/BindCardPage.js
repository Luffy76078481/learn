/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';
import  {provinces} from "../../../../../../config/provincesJson"
import {connect} from 'react-redux';
import {ApiBindCardAction,ApiBankAccountsAction} from "../../../../../actions/index";
import "./BindCardPage.css";
class BindCardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // noAccountName:true,
            noAccountNo:true,
            // noPayPwd:true,
            noBranch:true

        };

        this.state.selTab = "t2";
        this.state.selBankAccount = {};
        this.state.cities = provinces[0].cities;
    }
    componentDidMount() {
        new ApiBankAccountsAction().fly();
    }
    renderBankInfos (){
        var bankInfos = [];
        for (var i = 0; i < this.props.bankInfos.length; i++){
            var  bank = this.props.bankInfos [i] ;
      
            bankInfos.push(
                <option key={bank.Id} value={bank.Id}>{bank.BankName}</option>
            )
        }
        return bankInfos;
    }
    renderCities() {
        var ret = [];
        for (var i = 0; i < this.state.cities.length; i++) {
            var city = this.state.cities[i];
            ret.push(
                <option key={city.id} value={city.name}>{city.name}</option>
            )
        }
        return ret;
    }
    onSelectProvince(e) {
        var province = provinces[e.target.selectedIndex];
        this.setState({cities:province.cities});
    }
    renderBankArea (){
        var bankAreas = [];
        for (var i = 0; i < provinces.length; i++ ){
            var bankArea = provinces[i];
            bankAreas.push(
                <option key={bankArea.id} value={bankArea.name}>{bankArea.name}</option>
            )
        }
        return bankAreas ;
    }

    onClickTab(selBankAccount) {
        this.setState({selBankAccount:selBankAccount,selTab:selBankAccount.id});
    }

    renderBank(i, userBank) {
        return (
            <li key={i}
                className={this.state.selTab === userBank.id ? "bankNameItem" + i + " bankNameItem now " : "bankNameItem" + i + " bankNameItem"}>
                <a onClick={this.onClickTab.bind(this, userBank)} className="iblock"
                   aria-expanded="false"><img src={"images/bindcard/bank" + userBank.Bank.Id + ".png?v=1"}
                                              width="100%" alt=""/></a>
                <p className="text">
                    {/*<span>{userBank.accountNo.slice(0, 4)}</span>*/}
                    {/*<span>{userBank.accountNo.slice(4, 8)}</span>*/}
                    {/*<span>{userBank.accountNo.slice(8, 12)}</span>*/}
                    {/*<span>{userBank.accountNo.slice(12, 16)}</span>*/}
                    <span>**** **** **** {userBank.AccountNo.replace(/\s/g, "").substr(-4)}</span>
                </p>
            </li>
        );
    }
    renderUserBank (){
        var userBanks = [];
        var selBank = null;
        if (this.props.user.bankAccounts) {
            var i = 0;
            for (var j = 0; j < this.props.user.bankAccounts.length; j++) {
                var userBank = this.props.user.bankAccounts[j];
                if (this.state.selTab !== userBank.id) {
                    userBanks.push(
                        this.renderBank(i, userBank)
                    )
                    i++;
                } else {
                    selBank = userBank;
                }
            }
            if (selBank) {
                userBanks.push(this.renderBank(this.props.user.bankAccounts.length-1, selBank));
            }
        }
        return userBanks;
    }
    onBindCard(e) {
        e.preventDefault();
        if(!this.refs.branch.value){
            this.setState({
                noBranch:false
            });
            return
        }

        if(!this.refs.accountNo.value){
            this.setState({
                noAccountNo:false
            });
            return
        }
        
        let params = {//后台要接收的参数
            BankId:this.refs.bank.value,
            Province:this.refs.province.value,
            City:this.refs.city.value,
            BranchName:this.refs.branch.value,
            AccountNo:this.refs.accountNo.value,
            AccountName:this.refs.accountName.value
        };
        new ApiBindCardAction(params ).fly(resp=>{
            if (resp.status === 0) {
                new ApiBankAccountsAction().fly();
            }
        });
    }

    render() {
        const bankInfos = this.renderBankInfos();
        const bankAreas = this.renderBankArea();
        const bankCities = this.renderCities();
        const userBanks = this.renderUserBank();
        const accountNo = this.state.selBankAccount.accountNo;
        return (

            <div id="bindCardPage" className="c">
                <div className="">
                    <div className="t tc f14 content-left">
                        <h1 className="title">已绑定银行卡</h1>

                        <ul>
                            {userBanks}
                            <li  className={this.state.selTab==="t2"?"active addBtn":"addBtn "}>
                                <a onClick={e=>{this.setState({selTab:"t2"})}} className="iblock color-second" aria-expanded="true"><i className="fa fa-plus" style={{paddingLeft:'1rem'}}></i> 新增</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <form className="card_form">
                    <div className="col-md-6 col-md-offset-3 dis"  style={{display:this.state.selTab!=="t2"?"block":"none"}}>
                        <div className="input-group">
                            <span className="input-group-addon">银行：</span>
                            <input type="text" className="input w238 member-input" readOnly value={this.state.selBankAccount.bankName} style={{marginLeft:"14px"}}/>
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon">账号：</span>
                            <input style={{marginLeft:'14px'}} type="text" className="input w238 member-input" readOnly value={accountNo&& "**** **** **** " + accountNo.replace(/\s/g, "").substr(-4)}/>
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon">开户地：</span>
                            <input type="text" className="input w238 member-input" readOnly value={this.state.selBankAccount.province + " " + this.state.selBankAccount.city}/>
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon">开户支行：</span>
                            <input type="text" className="input w238 member-input" value={this.state.selBankAccount.branchName} readOnly style={{marginLeft:"-13px"}}/>
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon">开户人：</span>
                            <input type="text" className="input w238 member-input" readOnly value={this.state.selBankAccount.accountName}/>
                        </div>

                    </div>
                    <div className="col-md-6 col-md-offset-3 dis" style={{display:this.state.selTab==="t2"?"block":"none"}}>
                        <div className="input-group">
                            <span className="input-group-addon">选择银行：</span>
                            <select ref="bank" name="fr_bankindex" className="select w260 member-input" style={{width:'238px'}}>
                                {bankInfos}
                            </select>
                            <span className="red ml5 f12">*请选择银行</span>
                        </div>

                        <div className="input-group" style={{width:'450px'}}>
                            <span className="input-group-addon address-input">开户省/市：</span>
                            <select  style={{marginLeft:"-25px",width:"100px"}} ref="province" name="fr_bankprovince" className="select w128 prov member-input address" onChange={this.onSelectProvince.bind(this)}>
                                {bankAreas}
                            </select>
                            <select  style={{marginLeft:"7px",width:"130px"}} ref="city" name="fr_bankcity" className="select w128 prov member-input address">
                                {bankCities}
                            </select><br/>
                            <span className="red ml5 f12" style={{marginLeft:"-20px"}}>*请选择开户省/市</span>
                        </div>
                        {/*<div className="input-group">*/}
                        {/*<span className="input-group-addon">开户市：</span>*/}
                        {/*<span className="red ml5 f12">*请选择开户市</span>*/}
                        {/*</div>*/}
                        <div className="input-group">
                            <span className="input-group-addon">开户人：</span>
                            <input ref="accountName" type="text" className="input w238 member-input" readOnly value={this.props.user.realName}  style={{marginLeft:'14px',width:'238px'}}/>
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon">银行账号：</span>
                            <input ref="accountNo" type="text" className="input w238 member-input" name="fr_bankaccno" placeholder="请填写您的银行账号" style={{width:'238px'}} />
                            <span className="ml5 red f12" hidden={this.state.noAccountNo}>*此栏不能为空</span>
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon">开户支行：</span>
                            <input ref="branch" type="text" name="fr_bankaddress" className="input w238 member-input" placeholder="请填写您的开户支行信息" style={{width:'238px'}}  />
                            <span className="ml5 red f12" hidden={this.state.noBranch}>*此栏不能为空</span>
                        </div>
                        {/*<div className="input-group">*/}
                            {/*<span className="input-group-addon">支付密码：</span>*/}
                            {/*<input ref="payPwd" type="password" className="input w238 member-input" name="fr_bankaccno" placeholder="请填写支付密码"/>*/}
                            {/*<span className="ml5 red f12" hidden={this.state.noPayPwd}>*此栏不能为空</span>*/}
                        {/*</div>*/}
                        <button type="button" onClick={this.onBindCard.bind(this)} className="htbtnlg w260 t20 btn-type" value="确认并提交">确认并提交</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        bankInfos:state.bankInfos,
        user:state.user
    }
);

export default connect(mapStateToProps, {})(BindCardPage);