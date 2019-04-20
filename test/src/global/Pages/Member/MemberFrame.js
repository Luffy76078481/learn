/**
 * Created by xm on 2017/6/30.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';

import "./scss/index.scss";
import loadAmount from '../images/loading_wellbet.gif';
class MemberFrame extends Component {
    constructor(props) {
        super(props);
        this.state={
            loadAmount:false,
            closeCloud:false,
            webName:window.location.host,
            showPhone:true,
            clickFlag:false,
            submitFlag:false,
            timeInter:null,
            sendButtonMes:"获取",
        }
    }
    activeCls() {
        for (var i = 0; i < arguments.length; i++) {
            var name = arguments[i];
            if (this.props.location.pathname.indexOf(name)> -1 ) {
                return "selected_bac_tabs";
            }
        }
        return "";
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

    showCloud(){
        this.setState({
            closeCloud:false
        })
    }
    closeCloud(){
        this.setState({
            closeCloud:true
        })
    }
    favoritesChoose(e){
        let $favoritesInput = window.$('.favoritesInput:checked');
        if($favoritesInput.length>=3){
            window.swal("提示", "你不能选择超过两个游戏", "info");
            return false;
        }
        let $this = window.$(e.currentTarget);
        let id = e.currentTarget.id;
        let isChecked = $this.is(':checked');

    }
    renderFavoritesDom(){
        let doms=[];
        for (let i = 0; i < this.props.game.platforms.length; i++) {
            let platform = this.props.game.platforms[i];
            doms.push(
                <div className="" key={i}>
                    <input type="checkbox" className="favoritesInput" onChange={this.favoritesChoose.bind(this)} checked={i===2}  value={platform.id} />
                    {platform.name}
                </div>
            )
        }
        return doms;
    }
    isAuth(val){
        window.swal(val+"已认证", "", "info");
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
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }

    render() {
        let time = new Date().getHours();
        const promotionLink = this.props.remoteSysConfs.channel_push_url;
        return (
            <div className="member2">
                <div className="cust_container">
                    <div className="containerTop">
                        <div className="topLeft">
                            <div className="userName">
                                {time>12?"下午好":"上午好"}<span>{this.props.user.username}</span>
                                <i className="userIcon" onClick={this.showCloud.bind(this)}></i>
                                <div className="cloud" hidden={this.state.closeCloud}>
                                    <div>
                                       您的专属域名：
                                        <p className="font_red">{this.state.webName}</p>
                                    </div>
                                    <i className="glyphicon glyphicon-remove-circle" onClick={this.closeCloud.bind(this)}></i>
                                    <a onClick={()=>{Util.AddFavorite('dafabetName',this.state.webName)}}>添加到收藏夹</a>
                                </div>
                            </div>
                            <div className="my_purse">
                                <p>主账户:</p>
                                {this.state.loadAmount?(<img className="loadAmount" src={loadAmount} />):
                                    (<span>{this.props.user.amount}元 <i onClick={this.loadAmount.bind(this)} className="glyphicon glyphicon-repeat"></i></span>)
                                }
                            </div>
                            <div className="sp_line"></div>
                            <div className="icons_verify">
                                <p>账户安全:</p>
                                <div className="verifyItems">
                                    {
                                        this.props.user.realName?
                                            <a className="name_icon isAuth" title="实名认证" onClick={this.isAuth.bind(this,'实名')}></a>
                                        :
                                            <a className="name_icon" title="实名认证" onClick={this.isAuth.bind(this,'实名')}></a>
                                    }
                                    
                                    {
                                        this.props.user.verfyPhone || window.config.IsLDL?
                                            <a className="mobile_icon isAuth" title="手机验证" onClick={this.isAuth.bind(this,'手机')}></a>
                                        :
                                            <a className="mobile_icon"  id="shwoPhone" title="手机验证" data-toggle="modal" data-target="#bindPhoneModal"></a>
                                    }
                                    <a className="email_icon isAuth" title="邮箱验证" onClick={this.isAuth.bind(this,'邮箱')}></a>
                                    <Link to="/bindCard" className="card_icon" title="银行卡绑定"></Link>
                                </div>
                            </div>
                            <div className="sp_line"></div>
                            <a href={promotionLink} target="view_window">
                                <div className="icons_verify_new"></div>
                            </a>
                            <div className="clearfix"></div>
                            <div className="bac_tabs">
                                <ul>
                                    <li className={this.activeCls("/member")}><Link to="/member">基本信息</Link></li>
                                    <li className={this.activeCls("/deposit")}><Link to="/deposit">存款</Link></li>
                                    <li className={this.activeCls("/withdraw","/bindCard","/bindThirdPay")}><Link to="/withdraw">提款</Link></li>
                                    <li className={this.activeCls("/transfer")}><Link to="/transfer">游戏转帐</Link></li>
                                    <li className={this.activeCls("/records")}><Link to="/records">历史记录</Link></li>
                                    {/*<li><Link to="">等级特权</Link></li>*/}
                                </ul>
                            </div>
                        </div>
                        
                        {/*手机短信验证弹框*/}
                    <div id="bindPhoneModal" className="modal fade" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    &nbsp;&nbsp;手机短信验证
                                    <button type="button" id="PhoneModalClose" className="close" data-dismiss="modal">
                                        <i className="fa fa-close"></i>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="forms">
                                        <div className="hlder">
                                            <div className="lbl">手机号码：</div>
                                            <div className="custinput">
                                                <input type="number" disabled value={this.props.user.phone}/>
                                            </div>
                                            <div className="lbl yzm">验证码:</div>
                                            <div className="custinput">
                                                <input ref="inputVCode" type="number" placeholder="请输入验证码"/>
                                                <input className="getcode" type="button" onClick={this.getPhoneCode.bind(this)} value={this.state.sendButtonMes}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="custbtn">
                                        <button onClick={this.onSubmitPhone.bind(this)} type="submit">确定</button>
                                    </div>
                                    <a className="lxzzkf" onClick={this.serversOpen.bind(this)}>联系在线客服</a>
                                </div>
                            </div>
                        </div>
                    </div>



                        {/*因为没有接口暂时隐藏*/}
                        {/*<div className="favoritesDiv">*/}
                            {/*<div className="favItem">*/}
                                {/*<a data-toggle="modal" data-target="#favoritesModal">*/}
                                    {/*<p className="font-60">+</p>*/}
                                    {/*添加场馆*/}
                                {/*</a>*/}
                            {/*</div>*/}
                            {/*<div className="favItem">*/}
                                {/*<a data-toggle="modal" data-target="#favoritesModal">*/}
                                    {/*<p className="font-60">+</p>*/}
                                    {/*添加场馆*/}
                                {/*</a>*/}
                            {/*</div>*/}
                        {/*</div>*/}

                        <div className="clearfix"></div>
                    </div>
                    <div className="containerCon">
                        {this.props.children}
                    </div>
                    {/*添加快速转账的场馆弹出层*/}
                    {/*因为没有接口暂时隐藏*/}
                    {/*<div id="favoritesModal" className="modal fade" role="dialog">*/}
                        {/*<div className="modal-dialog">*/}
                            {/*<div className="modal-content">*/}
                                {/*<div className="modal-header">*/}
                                    {/*添加快速转账的场馆*/}
                                    {/*<button type="button" className="close" data-dismiss="modal">*/}
                                        {/*<i className="fa fa-close"></i>*/}
                                    {/*</button>*/}
                                {/*</div>*/}
                                {/*<div className="modal-body">*/}
                                    {/*<p>添加快速充值场馆后，可在用户中心任何页面快速充值<br/><span className="font_red">(限2个)</span></p>*/}
                                    {/*{this.renderFavoritesDom()}*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
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
        verifycode: state.verifycode,
    }
);

export default connect(mapStateToProps) (MemberFrame);