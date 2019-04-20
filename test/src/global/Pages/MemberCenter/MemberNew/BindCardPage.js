/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import {ApiBindCardAction,ApiBankAccountsAction} from "globalAction";
import PlaceComponent from "./PlaceComponent";

class BindCardPage extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.reload();
    }
    reload() {
        new ApiBankAccountsAction().fly();
    }
    onSubmit(e) {
        e.preventDefault();
        new ApiBindCardAction(this.refs.bank.value,
            this.refs.place.getSelProvince(),
            this.refs.place.getSelCity(),
            this.refs.place.getBranchName(),
            this.refs.accountNo.value,
            this.refs.accountName.value
        ).fly(resp=>{
            if (resp.StatusCode === 0) {
                this.reload();
            }
        });
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
        return ret;
    }

    render() {
        return (
        <div className="security_pg bindCard">
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
                        {this.renderUserBank()}
                        </tbody>
                    </table>
                </div>
            </div>
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="wrdbot">
                    <p className="title">绑定银行卡</p>
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
                            <input ref="accountName" type="text" value={this.props.user.realName} readOnly/>
                        </div>
                    </div>
                    <div className="hlder">
                        <div className="lbl">银行帐号: </div>
                        <div className="custinput">
                            <input ref="accountNo" type="text" placeholder="请输入银行卡号"/>
                        </div>
                    </div>
                    <PlaceComponent ref="place"/>

                </div>
                <div className="custbtn">
                    <Link to="/withdraw" className="memberBtn">返回提款</Link>
                    <button className="memberBtn">绑定新卡</button>
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