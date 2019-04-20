/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link} from 'react-router'
// import {ApiBindCardAction,ApiBankAccountsAction} from "globalAction";
import PlaceComponent from "./PlaceComponent";

class BindCardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickFlag:false
        }
    }
    componentDidMount() {
        this.reload();
    }
    reload() {
        new window.actions.ApiBankAccountsAction().fly();
        new window.actions.ApiPlayerInfoAction().fly();
    }
    onSubmit(e) {
        e.preventDefault();
        if(this.state.clickFlag)return;
        this.state.clickFlag = true;
        let params = {//后台要接收的参数
            BankId:this.refs.bank.value,
            Province:this.refs.place.getSelProvince(),
            City:this.refs.place.getSelCity(),
            BranchName:this.refs.place.getBranchName(),
            AccountNo:this.refs.accountNo.value,
            AccountName:this.refs.accountName.value
        };
        if(!this.props.user.realName){
            let trueName = this.refs.trueName.value;
            if(!trueName){
                window.swal('错误',"为确保正常提款,请认真填写您的真实姓名",'error');
                this.state.clickFlag = false;
                return;
            }
            new window.actions.ApiUpdateInfoAction(trueName).fly((resp)=>{
                if(resp.StatusCode === 0){
                    new window.actions.ApiBindCardAction(params).fly(resp=>{
                        if (resp.StatusCode === 0) {
                            this.reload();
                        }else{
                            window.swal('错误',resp.Message,'error');
                        }
                    });
                }else{
                    window.swal('错误',resp.Message,'error');
                }
            });
        }else{
            new window.actions.ApiBindCardAction(params).fly(resp=>{
                if (resp.StatusCode === 0) {
                    this.reload();
                }else{
                    window.swal('错误',resp.Message,'error');
                }
            });
        }
        this.state.clickFlag = false;
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
    renderUserBank (){
        var ret = [];
        if (this.props.user.bankAccounts) {
            for (var j = 0; j < this.props.user.bankAccounts.length; j++) {
                var userBank = this.props.user.bankAccounts[j];
                if(userBank.PayType == 1){
                ret.push(<tr key={j}>
                    <td>{userBank.Bank.BankName}</td>
                    <td>{userBank.AccountName}</td>
                    {/*<td>{userBank.accountNo}</td>*/}
                    <td>**** **** **** {userBank.AccountNo.replace(/\s/g, "").substr(-4)}</td>
                    <td>{userBank.Province + " " + userBank.City}</td>
                    <td>{userBank.BranchName}</td>
                </tr>)
                }
            }
        }
        return ret;
    }

    render() {
        return (
        <div className="security_pg bindCard">
            <h2 className="title">绑定银行卡</h2>
            <div className="tabs_holder">
                <div className="table-responsive withdrawrectbl">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>开户银行</th>
                            <th>开户人 </th>
                            <th>帐号</th>
                            <th>开户地</th>
                            <th>开户支行</th>

                        </tr>
                        </thead>
                        <tbody>
                        {this.renderUserBank().length==0?(<tr><td colSpan={5} >暂无数据</td></tr>):this.renderUserBank()}
                        </tbody>
                    </table>
                </div>
            </div>
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="wrdbot">
                    {
                        this.props.user.realName?null:
                        <div className="hlder">
                            <div className="lbl">真实姓名: </div>
                            <div className="custinput">
                            {/* <input ref="accountName" type="text" value={this.props.user.realName} readOnly/> */}
                            <input className="warning-placehoder" ref="trueName" type="text" placeholder="为确保正常提款，请输入您的真实姓名"/>
                            </div>
                        </div>
                    }
                    <div className="hlder">
                        <div className="lbl">选择银行: </div>
                        <div className="custinput">
                            <select ref="bank">
                                {this.renderBankInfos()}
                            </select>
                        </div>
                    </div>
                    <div className="hlder">
                        <div className="lbl">帐户名: </div>
                        <div className="custinput">
                        {/* <input ref="accountName" type="text" value={this.props.user.realName} readOnly/> */}
                        <input className="warning-placehoder"  ref="accountName" type="text" placeholder="为确保正常提款，账户名请对应您的真实姓名"/>
                        </div>
                    </div>
                    <div className="hlder">
                        <div className="lbl">银行帐号: </div>
                        <div className="custinput spec-jiantou">
                            <input ref="accountNo" type="number" placeholder="请输入银行卡号"/>
                        </div>
                    </div>
                    <PlaceComponent ref="place"/>
                    <div className="custbtn">
                        <Link to="/withdrawAndDeposit/withdraw" className="btn goback">返回提款</Link>
                        <button className="btn">绑定新卡</button>
                    </div>
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