/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link} from 'react-router'
// import {ApiBindCardAction,ApiBankAccountsAction} from "globalAction";
import PlaceComponent from "./PlaceComponent";

class BindThirdPayPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            QRpath:"",
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
        if(this.state.clickFlag)return;
        this.state.clickFlag = true;
        if(!this.props.user.realName){
            let trueName = this.refs.trueName.value;
            if(!trueName){
                window.swal('错误',"为确保正常提款,请认真填写您的真实姓名",'error');
                this.state.clickFlag = false;
                return;
            }
            new window.actions.ApiUpdateInfoAction(trueName).fly((resp)=>{
                if(resp.StatusCode === 0){
                    new window.actions.ApiAddBankCardExtAction(
                        {
                            CodeType:this.refs.bank.value,
                            CodePath:this.state.QRpath,
                            AccountName:this.refs.realName.value,
                            AccountNo:this.refs.accountName.value
                        }
                        ).fly(
                        resp=>{
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
            new window.actions.ApiAddBankCardExtAction(
                {
                    CodeType:this.refs.bank.value,
                    CodePath:this.state.QRpath,
                    AccountName:this.refs.realName.value,
                    AccountNo:this.refs.accountName.value
                }
                ).fly(
                resp=>{
                if (resp.StatusCode === 0) {
                    this.reload();
                }else{
                    window.swal('错误',resp.Message,'error');
                }
            });
        }
        this.state.clickFlag = false;
        return false;
    }
    
   
    renderUserBank (){
        var ret = [];
        if (this.props.user.bankAccounts) {
            for (var j = 0; j < this.props.user.bankAccounts.length; j++) {
                var userBank = this.props.user.bankAccounts[j];
                if(userBank.PayType != 1){
                    ret.push(<tr key={j}>
                        <td>{userBank.Bank.BankName}</td>
                        <td>{userBank.AccountName}</td>
                        {/*<td>{userBank.accountNo}</td>*/}
                        <td>{userBank.AccountNo}</td>
                    </tr>)
                }
            }
        }
        return ret;
    }

    getQRcode(e){//上传二维码获取服务器路径
        let _self = this;
        var formData = new FormData();
        formData.append("dirName","withdraw");
        formData.append("file", e.target.files[0]);
        new window.actions.ApiUploadafileAction(formData).fly((resp)=>{
            if(resp.StatusCode === 0){
                _self.setState({
                    QRpath:resp.Data.filePath
                })
            }else{
                window.swal('错误',resp.Message,'error');
            }
        })
    }

    render() {
        return (
        <div className="security_pg bindCard">
            <div className="tabs_holder">
                <div className="table-responsive withdrawrectbl">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>提款方式</th>
                            <th>提款人</th>
                            <th>帐号</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderUserBank()}
                        </tbody>
                    </table>
                </div>
            </div>
                <div className="wrdbot">
                    <p className="title">绑定支付宝、微信</p>
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
                        <div className="lbl">选择渠道: </div>
                        <div className="custinput">
                            <select ref="bank">
                                <option value="2">支付宝</option>
                                <option value="3">微信</option>
                            </select>
                        </div>
                    </div>
                    <div className="hlder">
                        <div className="lbl">账户名: </div>
                        <div className="custinput">
                            <input ref="realName" className="warning-placehoder"  type="text" placeholder="为确保正常提款，账户名请对应您的真实姓名"/>
                        </div>
                    </div>
                    <div className="hlder">
                        <div className="lbl">账号: </div>
                        <div className="custinput">
                            <input ref="accountName" type="text" placeholder="请对应支付宝、微信收款账户名"/>
                        </div>
                    </div>
                    <div className="hlder">
                        <div className="lbl">二维码: </div>
                        <div className="custinput spec-jiantou">
                            <input ref="accountNo" readOnly placeholder="请上传二维码" value={this.state.QRpath}/>
                            <span className="fileinput-button">
                                <span>上传</span>
                                <input onChange={this.getQRcode.bind(this)} type="file"/>
                            </span>
                            
                        </div>
                    </div>
                    <span className="messege_new">*初始提款密码默认为登录密码，为了保障资金安全，建议您立即去修改密码页面重新修改<Link to='/member'>设置提款密码。</Link></span>
                </div>
                <div className="custbtn">
                    <Link to="/withdraw" className="memberBtn">返回提款</Link>
                    <button onClick={this.onSubmit.bind(this)} className="memberBtn">绑定新渠道</button>
                </div>
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

export default connect(mapStateToProps, {})(BindThirdPayPage);