/**
 * Created by xm on 2017/6/30.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Icon} from 'antd';
import {Link,IndexLink} from 'react-router';

import "./scss/index.scss";
// import loadAmount from '../images/loading_wellbet.gif';
class MemberFrame extends Component {
    constructor(props) {
        super(props);
        this.state={
            loadAmount:false,
            closeCloud:false,
            sendButtonMes:"获取",
        }
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    getPhoneCode(e){
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(this.props.user.phone)) {
            window.swal("错误", "手机号码错误，请联系在线客服");
            return;
        }
        if(this.state.clickFlag)return;
        this.state.clickFlag = true;
        if(this.state.timeInter){
            clearInterval(this.state.timeInter);
            this.state.timeInter = null;
        }
        new window.actions.ApiSendMobileVCodeAction().fly((resp)=>{
            if(resp.StatusCode === 0){
                // window.swal("成功", "发送成功，请注意查收，今日还可发送短信"+resp.RemainCount+"次");
                window.swal("成功", "发送成功，请注意查收");
                this.state.timeInter = setInterval(()=>{
                    if(this.state.sendButtonMes==1){
                        this.setState({sendButtonMes:"获取"})
                        this.state.clickFlag = false;
                        clearInterval(this.state.timeInter);
                        this.state.timeInter = null;
                        return;
                    }else{
                        if(typeof this.state.sendButtonMes ==="string"){
                            this.setState({sendButtonMes:60})
                        }else{
                            this.setState({sendButtonMes:this.state.sendButtonMes-1})
                        }
                    }
                },1000)

            }else{
                window.swal("错误", resp.Message);
                this.state.clickFlag = false;
            }

        })
    }
    onSubmitPhone(e){
        let inputVCode = this.refs.inputVCode.value;
        if(!inputVCode){
            window.swal("错误", "验证码不能为空");
            return;
        }

        if(this.state.submitFlag)return;
        this.state.submitFlag = true;
        new window.actions.ApiValidatePhoneAction(this.props.user.phone,inputVCode).fly((resp)=>{
            if(resp.StatusCode === 0){
                $("#PhoneModalClose").trigger('click');
                new window.actions.ApiPlayerInfoAction().fly();
                window.swal("成功", "恭喜验证成功，现在您可以进行提款");
            }else{
                window.swal("错误", resp.Message);
            }
            this.state.submitFlag = false;
        });
    }
    loadAmount(){
        this.setState({
            loadAmount:true
        })
        new window.actions.ApiPlayerInfoAction().fly(resp=>{
            if (resp.StatusCode === 0) {
                this.setState({
                    loadAmount:false
                })
            }
        });
    }
    render() {
        return (
            <div id="playerCenterView">
                <div className="header-center">
                    <div className="container">
                        <div className="center-memberBasic">
                            <div className="user">{this.props.user.username}</div>
                            <div className="dropdown">
                                <div className="dropdown-mainTitle">
                                    <div className="mainTitle">
                                        个人资料
                                        <Icon type="caret-down" />
                                    </div>
                                </div>

                                <ul className="list-detail">
                                    <li>
                                        <p className="list-title">状态</p>
                                        <p className="list-txt">己激活</p>
                                    </li>
                                    <li>
                                        <p className="list-title">手机号码</p>
                                        <p className="list-txt">
                                            {this.props.user.phone}
                                        </p>
                                    </li>
                                    <li>
                                        <p className="list-title">推广链接</p>
                                        <p className="list-txt">
                                            {"https://"+ location.hostname + "/register?channel=" +this.props.user.recommendCode}
                                        </p>
                                    </li>
                                    <li>
                                        <p className="list-title">电子邮件</p>
                                        <p className="list-txt">
                                            {this.props.user.email}
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="sub-nav">
                            <Link activeClassName="active" to="/editPassWord">密码修改</Link>
                            <IndexLink activeClassName="active" to="/member">管理中心</IndexLink>
                            <Link activeClassName="active" to="/gameHistory">用户报表</Link>
                            <Link activeClassName="active" to="/transfer">转账</Link>
                            <Link activeClassName="active" to="/withdrawAndDeposit">存款/取款</Link>
                            <Link activeClassName="active" to="/records_message">消息中心</Link>
                        </div>
                    </div>
                </div>
                <div className="centerContainer">
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
                {/*手机短信验证弹框*/}
                <div id="bindPhoneModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content custom_modal_content">
                            <div className="modal-header">
                                &nbsp;&nbsp;手机短信验证
                                <button type="button" id="PhoneModalClose" className="close" data-dismiss="modal">
                                    <i className="fa fa-close"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="forms">
                                    <div className="form-group">
                                        <label>手机号码</label>
                                        <span >
                                            <input type="number" className="form-control" disabled value={this.props.user.phone}/>
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <label>验证码</label>
                                        <span>
                                            <input ref="inputVCode" className="form-control inputVCode" type="number" placeholder="请输入验证码"/>
                                            <input className="getcode" type="button" onClick={this.getPhoneCode.bind(this)} value={this.state.sendButtonMes}/>
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn" onClick={this.onSubmitPhone.bind(this)} type="submit">确定</button>
                                    </div>
                                    <a className="lxzzkf" onClick={this.serversOpen.bind(this)}>联系在线客服</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        login: state.login,
        sitemsg: state.sitemsg,
        global:state.global,
        game: state.game,
        remoteSysConfs:state.remoteSysConfs,
        verifycode: state.verifycode
    }
);

export default connect(mapStateToProps) (MemberFrame);