import React, { Component } from 'react';
import {Flex, WhiteSpace, List, Badge} from 'antd-mobile';
import {Link,browserHistory} from 'react-router';
import connect from "react-redux/es/connect/connect";
import {wapLogin} from "globalAction";
import {wapNav} from "wapNavJson";
import {config } from "globalConfig";
import './SideBar.scss';

const Item = List.Item;
class SideBar extends Component{
    constructor(props) {
        super(props);
        this.submitStateLock = true;
    }
    userQuit(){
        if(!this.submitStateLock) return;
        this.submitStateLock=false;
        new window.actions.LogoutAction().fly(resp=>{
            this.submitStateLock=true;
        });
        window.wapHistoryType.push('/');
        this.props.closeSide();
    }
    linkTo(router){
        window.wapHistoryType.push(router)
        this.props.closeSide();
    }
    login(){
        wapLogin(true);
    }
    openLine(link){
        if(config.isApp){
            window.Util.appOpen(link)
        }else{
            window.open(link,'_blank');
        }
    }
    renderNav(){
        let navList = [];

        for (var i =0; i< wapNav.length; i++){
          
            let nav = wapNav[i];
            navList.push(
                <a className={"item"} key={i} onClick={nav.target?this.openLine.bind(this,nav.link):this.linkTo.bind(this,nav.link)}>
                    {nav.hot&&<Badge text="热门"  />}
                    {nav.className?
                        <span className={"icon platIcon "+nav.className}></span>:
                        <div className={"icon"}
                             dangerouslySetInnerHTML={{__html:nav.svg}}></div>
                    }
                    <p>{nav.name}</p>
                </a>
            );
        }
        return navList;
    }
    render(){
        let navList = this.renderNav();
        return(
            <div className="SideBar">
                <Flex className="topLogo" align="start">
                    {!this.props.user.token?
                        (
                            <div className={"logo"}>

                            </div>
                        ):(
                            <div className={"userInfo"}>
                                <div className="userIcon">
                                    <i className="icon icon-user"></i>
                                </div>
                                <div className="userMoney">
                                    <div className="userName">{this.props.user.username}<span>(推广地址:{this.props.user.recommendCode})</span></div>
                                    <div className="money">总金额:￥{this.props.user.amount?this.props.user.amount:"0"}元</div>
                                </div>
                            </div>
                        )
                    }
                    <a className={"close"} onClick={()=>{this.props.closeSide()}}><i className={"icon icon-remove"}></i></a>
                </Flex>
                {this.props.user.token?
                    (
                        <div className="btnGroup">
                            <button onClick={this.linkTo.bind(this,"money/deposit")}>存款</button>
                            <button onClick={this.linkTo.bind(this,"/money")}>我的账户</button>
                        </div>
                    ):(
                        <div className="btnGroup">
                            <button onClick={this.linkTo.bind(this,"/register")}>立即加入</button>
                            <button className={"login"} onClick={this.login.bind(this)}>登录</button>
                        </div>
                    )
                }

                <div className={"navItems"}>
                    {navList}

                </div>

                <h3 className={"line-heared"}>
                    <span>Quicklinks</span>
                </h3>
                <div className={"QuickLinks"}>
                    <div className={"item"} onClick={this.linkTo.bind(this,'/editPassword/1')}>
                        <i className="icon icon-user"></i>登录密码
                    </div>
                    {
                        this.props.remoteSysConfs['allow_edit_pay_pwd'] == "true" ?
                        <div className={"item"} onClick={this.linkTo.bind(this, '/editPassword/2')}>
                            <i className="icon icon-key"></i>支付密码
                        </div>:null
                    }
                    <div className={"item"} onClick={this.linkTo.bind(this,'/cardManage')}>
                        <i className="icon icon-credit-card"></i>银行卡绑定
                    </div>
                    <div className={"item"}  onClick={this.linkTo.bind(this,'/setting')}>
                        <i className="icon icon-cogs"></i>偏好设置
                    </div>
                    <div className={"item"} onClick={this.linkTo.bind(this,'/help')}>
                        <i className="icon icon-question-sign"></i>帮助说明
                    </div>
                    {
                        this.props.user.token?
                            <div className={"item"} onClick={this.userQuit.bind(this)}>
                                <i className="icon icon-off"></i>登出
                            </div>:null
                    }

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
        remoteSysConfs:state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(SideBar)