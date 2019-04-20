
import React, { Component } from 'react';
import { Link , IndexLink } from 'react-router';
import { connect } from 'react-redux'
import "./Header.scss";
class Header extends Component {
    constructor() {
        super();
        this.state = {
            time:"",
            tags: [],
            test:0,
            showBlock: false,
            person:parseInt(Math.random()*3000),
            reqLock:false
        };
    }

    onLogin(event) {
        event.preventDefault();
        if(this.state.reqLock)
        return;
        this.state.reqLock =true;
        var _self = this;
        new window.actions.ApiLoginAction(this.refs.username.value, this.refs.password.value).fly(resp=>{
            if (resp.StatusCode === 0) {
                new window.actions.ApiPlayerInfoAction().fly();
                new window.actions.ApiBankAccountsAction().fly();
            }
            _self.state.reqLock = false;
        });

    }
    onLogout() {
        new window.actions.LogoutAction().fly();
    }
    componentDidMount(){
        window.setInterval(()=>{
            let d = new Date();
            let dt = d.getTime();
            if(window.config.timezone.indexOf("美东") != -1){
                dt = dt + (d.getTimezoneOffset() - 4*60)*60*1000
            }
            this.refs.setClock.innerHTML = new Date(dt).format("yyyy/MM/dd hh:mm:ss")
        }, 1000);
    }

    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }

    renderLoginForm() {
        const options = window.r.props("Header");

        return (
            <form id="login-form" className={this.props.remoteSysConfs.require_login_verify_code=="true" ? "require_verify_code" : ""} onSubmit={this.onLogin.bind(this)}>
                <div className="form-login-input">
                    <input type="text" ref="username"  id="demotestid2" className="account-input input-type border-type" placeholder="会员账号"/>
                    <span className="code-image"><img onClick={this.reVerifyCode.bind(this)} src={this.props.verifycode.img}/></span>
                    <input type="password" ref="password" className="pwd-input input-type border-type" placeholder="密码"/>
                    <input ref="verifycode" type="text" className="code-input input verifycode" placeholder="验证码"/>
                </div>
                <div className="form-login-button">
                    {window.config.spec ==="hg" ?<button type="submit" className="form-login-btn">登陆</button>:<button type="submit" className="form-login-btn">{options.loginTxt}</button>}
                    {!options.xpj4_pwd?
                        (window.config.spec ==="hg" ? null: <a href="javascript:void(0);" id="test" onClick={this.serversOpen.bind(this)} className="demotest forget"><i className="glyphicon glyphicon-question-sign mr5"></i>忘记密码？</a>):
                        <a href="javascript:void(0);" id="test" onClick={this.serversOpen.bind(this)} className="demotest forget">忘记密码</a>
                    }
                    {!options.online_service?null
                        :<a className="head-service" onClick={this.serversOpen.bind(this)}><i className="fa fa-headphones"></i>在线客服</a>
                    }

                </div>
                <div className="form-login-reg">
                    {window.config.spec ==="hg" ? <Link to="/register" className="form-reg-btn" title="免费注册">皇冠开户</Link> : <Link to="/register" className="form-reg-btn" title="免费注册"></Link>}
                    {/*<a href="#" onClick={this.reVerifyCode} className="form-reg-btn" title="免费注册" data-toggle="modal" data-target="#reserveDialog_reservation"></a>*/}
                </div>
                <div className="clear"></div>
            </form>
        );
    }
    renderUserInfo() {
        const user = this.props.user;
        const userLevel = user.userLevelName && user.userLevelName.indexOf("黑名单") !== -1 ? "会员":user.userLevelName|| "欢迎您" ;
        const options = window.r.props("Header");

        return (
            <div className="mt10" style={{textAlign: "left", padding: "5px"}}>
                {!options.noUserLevel?
                <span className="memberItem">{userLevel}：<Link to="/member">{user.username}</Link></span>
                :<span className="memberItem">会员:<Link to="/member">{user.username}</Link></span>}
                {window.config.spec ==="hg" ? <div>
                    <span className="memberItem" style={{paddingLeft:"2px"}}>  余额：{this.props.user.amount} RMB</span><br/>
                    <span className="memberItem"><Link to="/deposit" className="item bai">在线存款</Link></span>
                    <span className="memberItem"><Link to="/withdraw" className="item bai">在线取款</Link></span>
                    <span className="memberItem"><Link to="/transfer" className="item bai">额度转换</Link></span>
                    </div> : <div style={{display:'inline-block'}}>
                    <span className="memberItem" style={{paddingLeft:"2px"}}>  总额：{this.props.user.amount} RMB</span>
                    <span className="memberItem"><Link to="/deposit" className="item bai">存款</Link></span>
                    <span className="memberItem"><Link to="/withdraw" className="item bai">取款</Link></span>
                    <span className="memberItem"><Link to="/transfer" className="item bai">额度转换</Link></span>
                </div>}



                <span className="memberItem">
                                        <Link to="/message" className="item bai member-msg"><i className="fa fa-envelope-o" aria-hidden="true"></i><span className="huang ml5" style={{color: "red"}}>({this.props.sitemsg.unread})</span></Link>
                                    </span>
                <span className="memberItem"><a href="javascript:void(0)" className="item huang bgGray4" onClick={this.onLogout.bind(this)}>退出</a></span>
                <div className="clear"></div>
            </div>

        );
    }


    serversOpen(e){
        e.preventDefault();

        if(e.target.id=='test'){
            window.swal({
                    title: "忘记密码",
                    text: "联系在线客服协助修改密码",
                    confirmButtonColor: "#c5841f",
                    confirmButtonText: "联系客服",
                    showCancelButton: true,
                    cancelButtonText: "关闭",
                },
                ()=>{
                    window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
                });
            return;
        }
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=900,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=450,screenY=250');
        return false;
    }
    pppLoginForm(){
        const config = window.config;
        const options = window.r.props("Header");
        const promotionLink = window.configHelper.getPromotionUrl();
        return(
            <div className="loginForm">
                <div className={this.props.user.token?"timeNumber n-timeNumber":"timeNumber"}>
                    <span className="time_box"><i className="glyphicon glyphicon-time"></i>{config.timezone || "北京时间"}：<b id="clock"  ref="setClock"></b></span>
                    <span className="online_user"><i className="fa fa-male" ></i>在线人数：{20000+this.state.person}人</span>
                    <a href="javascript:Util.AddFavorite('新葡京官网');" className="color-highlight fav"><i className="glyphicon glyphicon-home"></i>收藏本站</a>
                    {!options.appDownlad?null:<a href={promotionLink} className="color-highlight navLink" target="_blank"><i className="fa fa-tasks" aria-hidden="true"></i>APP下载</a>}
                    <div className="clear"></div>
                    {!options.linetest?null:<a href="/nav.html" className="color-highlight navLink" target="_blank"><i className="fa fa-tasks" aria-hidden="true"></i>线路检测</a>}
                    <div className="clear"></div>
                    <span className={this.props.user.token?"personal":"personalHide"}><Link to="/member"><i className="glyphicon glyphicon-user" aria-hidden="true"></i>个人中心</Link></span>
                </div>
                <div className="right-login">
                    {this.props.user.token? this.renderUserInfo() : this.renderLoginForm()}
                </div>
            </div>
        )
    }


    render() {
        var NavigationBar = window.r.get("NavigationBar");
        const config = window.config;
        const options = window.r.props("Header");
        var AffixHongbao = window.r.get("AffixHongbao");
        const PopNews = window.r.get("NoticeBar");
        const SecondNav = window.r.get("SecondNav");
        const agentName = options.agentName||"申请代理";
        const vipName = options.vipName||"VIP";
        const agentLoginUrl = config.agentLoginUrl;
        const loginForm2 = this.pppLoginForm();

        return (
            <header id="topHead">
                <div className="headBg BGcolor-main" >
                    {!options.loginFrom2?null: <div>{loginForm2}</div>}
                    <div className="container">
                        <div className="headFname row">
                            <Link className="gofg" to="/"></Link>
                            <div className="logo">
                                <Link to="/">

                                </Link>
                            </div>
                            <div className="credit">
                            </div>
                        </div>
                        <div className="menu-nav" id="headerNav" >
                            <nav role="navigation">
                                <NavigationBar menuHover={(value)=>{this.setState({showBlock: value})}}/>

                            </nav>
                        </div>
                        {AffixHongbao ? <AffixHongbao/> : null}
                    </div>
                </div>
                <div className="notice">
                    <div className="container">
                        <div className="row">
                            <div className={this.props.user.token?"col-md-3 noticeLeft n-noticeLeft":"col-md-3 noticeLeft"}>
                                {navconfig && <a href="/nav.html" target="_blank" className="color-main sitenav">网站导航</a>}{navconfig && <span>|</span>}
                                <a href="/help.html" target="_blank" className="color-main help">帮助中心</a>
                                <span>|</span>
                                <a href="/agent.html" target="_blank" className="color-main agent">{agentName}</a>
                                {window.config.spec=='dafa'&&
                                <a href="/agent.html" target="_blank" className="color-main contakus"  onClick={this.serversOpen.bind(this)}>联系我们</a>
                                }
                                {!options.agentLogin?null:
                                    <span>|</span>}
                                {!options.agentLogin?null:
                                    <a href={config.agentLoginUrl} className="color-main " target="blank">代理登陆</a>}
                                {!options.hideVip?<span>|</span>:null}
                                {!options.hideVip?<Link to="/promotions" className="color-highlight color-main vip">{vipName}</Link>: null}

                                {!options.promotion?null:
                                    <span>|</span>}
                                {!options.promotion?null:
                                    <a href="https://4332hd.com" target="_blank" className="color-highlight promotion">优惠活动大厅</a>}
                            </div>
                            <div className="col-md-7 noticeCenter">
                                <PopNews></PopNews>

                            </div>
                            <div className="col-md-2 noticeRight">
                                <a className="top_livechat" id="test1" target="_parent" href="#" onClick={this.serversOpen.bind(this)}></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="clear"></div>
                {SecondNav && <SecondNav showBlock={this.state.showBlock}></SecondNav>}
            </header>


        );

    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        login: state.login,
        sitemsg: state.sitemsg,
        remoteSysConfs:state.remoteSysConfs,
    }
);
export default connect(mapStateToProps)(Header)