
// import("./Footer.scss");
import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./Footer.scss"
import QRCode from 'qrcode.react'

class Footer extends Component {
    constructor(props) {
        super(props);
    }
    serversOpen(e){
        e.preventDefault();
        if(e.target.id=='test'){
            window.swal({
                    title: "忘记密码",
                    text: "联系在线客服协助修改密码",
                    confirmButtonColor: "#c5841f",
                    confirmButtonText: "联系客服",
                    // closeOnConfirm: false
                    showCancelButton: true,
                    cancelButtonText: "关闭",
                    // cancelButtonColor: "#f8c700",
                },
                ()=>{
                    window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
                });
            return;
        }
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    render() {
        const appName = window.config.appName;
        const phone = this.props.remoteSysConfs.online_service_phone;
        return (
            <div className="pppFooter">
                <div className="main">
                    <div className="foot-top">
                        <ul>
                            <li>
                                <div className="title"><div className="icon"></div>银行服务</div>
                                <h3>五分钟存款/十分钟提款</h3>
                                <div className="text">
                                    <div className="t1">{appName}简介</div>
                                    <div className="t2">{appName}为最有实力的娱乐平台，制定个人信息保密制度，并设置多项安全设施。</div>
                                </div>
                                <div className="text">
                                    <div className="t1">联系我们</div>
                                    <div className="t2">如有任何问题，可通过
                                        <span onClick={this.serversOpen.bind(this)}>在线客服</span>
                                        、电话等联系客服。{appName}7*24全天候周到服务，客服电话：{phone}。</div>
                                </div>
                            </li>
                            <li>
                                <div className="title"><div className="icon"></div>值得信赖</div>
                                <h3>博彩监管机构监督,政府颁发的执照</h3>
                                <div className="text">
                                    <div className="t1">游戏认证</div>
                                    <div className="t2">{appName}已获得菲律宾First Cagayan授权，并获得英国政府博彩委员会Gambling Commission、GEOTRUST国际、AGCC、IOM以及TST的认证。</div>
                                </div>
                                <div className="text">
                                    <div className="t1">支付方式</div>
                                    <div className="t2">{appName}为客户提供多元且便捷的充值方式，支付宝、微信支付、QQ支付、网银、ATM转帐等</div>
                                </div>
                            </li>
                            <li>
                                <div className="title"><div className="icon"></div>{appName}手机投注</div>
                                <h3>{appName} For iPhone / Android</h3>
                                <div className="qrCode">
                                    <QRCode includeMargin={false} size={140} value={this.props.remoteSysConfs.channel_push_url || ""} className="qrImg" alt=""  />
                                </div>
                                <p>扫一扫下载APP</p>
                            </li>
                        </ul>
                    </div>
                    <div className="foot-nav">
                        <div className="left">
                            <ul>
                                <li><a href="/help.html#terms" target="_blank">使用条款</a></li>
                                <li><a href="/help.html#responsibility" target="_blank">负责任博彩</a></li>
                                <li><a href="/help.html#contact" target="_blank">联系我们</a></li>
                                <li><a href="/help.html" target="_blank">关于我们</a></li>
                                <li><a href="/agent.html" target="_blank">合作代理</a></li>
                            </ul>
                        </div>
                        <div className="right">Copyright © 2018 {appName} 版权所有</div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        message:state.message,
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps, {

})(Footer)