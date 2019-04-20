/**
 * Created by xm on 2017/7/27.
 */
import "./css/Footer.scss";
import React, { Component } from 'react';
import { connect } from 'react-redux'


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

    render() {
        const appName = window.config.appName;
        const QQ =this.props.remoteSysConfs.online_service_qq;
        const mail = this.props.remoteSysConfs.online_service_email;
        const phone = this.props.remoteSysConfs.online_service_phone;
        const promotionLink = window.configHelper.getPromotionUrl();
        return (
<div className="footer-module ">
	<div className="inner">
		<div className="partner_icon">
			<ul>
				<li className="pt"></li>
				<li className="og"></li>
				<li className="ab"></li>
				<li className="mg"></li>
				<li className="hb"></li>
				<li className="qt"></li>
				<li className="ag"></li>
				<li className="sunbet"></li>
				<li className="opus"></li>
				<li className="bbin"></li>
				<li className="yoplay"></li>
				<li className="pg"></li>
				<li className="cg"></li>
				<li className="keno"></li>
			</ul>
		</div>
		<div className="help">
			<div className="box left_box">
				<div className="qrCode">
                    <img width="100" src={"http://qr.liantu.com/api.php?w=160&h=160&text=https://" + this.props.remoteSysConfs.channel_push_url} className="qrImg" alt="" />
				</div>
				<p>
					免费下载手机客户端
				</p>

			</div>
			<div className="box right_box">
				<h2>使用帮助</h2>
				<ul>
					<li className="f-deposit"><a href="/help.html#deposit" target="_blank">如何存款</a></li>
					<li className="f-responsibility"><a href="/help.html#withdrawal" target="_blank">如何提款</a></li>
					<li className="f-gameHelp"><a href="/help.html#yibanrule" target="_blank">规则条款</a></li>
					<li className="f-protection"><a href="/help.html#responsibility" target="_blank">隐私政策</a></li>
					<li className="f-withdraw"><a href="/agent.html" target="_blank">合作代理</a></li>
				</ul>
				<p>
					{appName}:理性博弈,热爱公益,国家禁止未满18岁未成年人开放博弈！
				</p>
				<span>版权所有 ©  {appName} 有限公司</span><span className="service-phone">客服热线:+63 9158888166</span>
			</div>
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