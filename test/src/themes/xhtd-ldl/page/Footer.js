/**
 * Created by xm on 2017/7/27.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
require("./Footer.scss");


class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            online_service_link: "",
        }
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

    godepos(e){
        if(!this.props.user||!this.props.user.token){
            e.preventDefault();
            window.$("#reserveDialog_login").modal("show");
            new ErrorMsgAction("无权限访问", "请先登录").fly();
            return false;
        }
        return
    }

    render() {
        const appName = window.config.appName;
        return (
            <div className="ybbFooter">
                <Link to="/deposit" onClick={this.godepos.bind(this)}><div className="procenter"></div></Link>
                <div className="top">
                    <div className="center">
                        <div className="links">
                            <a href="/agent.html?tab=AboutUs"  target="_blank">关于我們</a>
                            <a href="/agent.html?tab=ContactUs" target="_blank">联络我們</a>
                            <a href="/agent.html?tab=Alliance" target="_blank">代理合作</a>
                            <a href="/agent.html?tab=Deposit" target="_blank">如何存款</a>
                            <a href="/agent.html?tab=Wthdrawal" target="_blank">如何取款</a>
                            <a href="/agent.html?tab=Faq" target="_blank">常见问题</a>
                            <a href="/agent.html?tab=BetRule" target="_blank">责任博彩</a>
                            {/*<a href="#" onClick={this.serversOpen.bind(this)}>客服中心</a>*/}
                        </div>
                        <div className="logoword">Copyright © {appName} Reserved </div>
                    </div>
                </div>
                <div className="footer"><div id="footerimg"></div></div>
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