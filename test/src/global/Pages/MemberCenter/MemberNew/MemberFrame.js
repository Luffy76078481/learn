/**
 * Created by xm on 2017/6/30.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';

import "./scss/index.scss";
import loadAmount from './scss/img/loading_wellbet.gif';
class MemberFrame extends Component {
    constructor(props) {
        super(props);
        this.state={
            loadAmount:false,
            closeCloud:false
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
    render() {
        let time = new Date().getHours();
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
                                        <p className="font_red">http://www.betcn.bet/</p>
                                    </div>
                                    <i className="glyphicon glyphicon-remove-circle" onClick={this.closeCloud.bind(this)}></i>
                                    <a href="javascript:Util.AddFavorite('dafabetName','http://www.betcn.bet/');">添加到收藏夹</a>
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
                                    <a className="name_icon isAuth" title="实名认证" onClick={this.isAuth.bind(this,'实名')}></a>
                                    <a className="mobile_icon isAuth" title="手机验证" onClick={this.isAuth.bind(this,'手机')}></a>
                                    <a className="email_icon isAuth" title="邮箱验证" onClick={this.isAuth.bind(this,'邮箱')}></a>
                                    <Link to="/bindCard" className="card_icon" title="银行卡绑定"></Link>
                                </div>
                            </div>
                            <div className="sp_line"></div>
                            <a href='https://betcn.app/' target="view_window">
                                <div className="icons_verify_new"></div>
                            </a>
                            <div className="clearfix"></div>
                            <div className="bac_tabs">
                                <ul>
                                    <li className={this.activeCls("/member")}><Link to="/member">基本信息</Link></li>
                                    <li className={this.activeCls("/deposit")}><Link to="/deposit">存款</Link></li>
                                    <li className={this.activeCls("/withdraw","/bindCard")}><Link to="/withdraw">提款</Link></li>
                                    <li className={this.activeCls("/transfer")}><Link to="/transfer">游戏转帐</Link></li>
                                    <li className={this.activeCls("/records")}><Link to="/records">历史记录</Link></li>
                                    {/*<li><Link to="">等级特权</Link></li>*/}
                                </ul>
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
    }
);

export default connect(mapStateToProps) (MemberFrame);