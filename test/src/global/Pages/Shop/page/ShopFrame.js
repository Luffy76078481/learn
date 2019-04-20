import React, { Component } from 'react';
import { connect } from 'react-redux'
import {config} from "globalConfig";
import {ApiMerchandiseCategoryAction,ApiMerchandiseListAction,ApiSignContinueDaysAction} from "globalAction";
import { browserHistory,Link,IndexLink } from 'react-router';
import "../css/ShopFrame.scss";


class ShopFrame extends Component {
    constructor(props){
        super(props);

    }

    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    renderLoginForm(){
        return(
            <div>
                <div className="button">
                    <div className="round_button">
                        <a  className="activator " onClick={()=>{
                            window.$("#reserveDialog_login").modal("show");
                        }}>VIP登录</a>
                    </div>
                    <div className="round_button">
                        <Link  to="/register" className="activator yellow" >我要申请VIP</Link>
                    </div>
                </div>
            </div>
        )
    }
    renderUserInfo(){
        const user = this.props.user;
        return(
            <div>
                <div className="userInfo">
                    <span className="memberItem">你好,<b>{user.username}</b>(您的积分:{user.integral}分)</span>
                </div>
            </div>
        )
    }
    render() {

        let LoginPage = window.r.get("LoginPage");
        return (
            <div className="shopPage">
                <header id="shopHeader">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2">
                                <IndexLink className="logo" to="/"><span className="innerLogo"></span></IndexLink>
                            </div>
                            <div className="col-md-10">
                                {this.props.user.token?this.renderUserInfo():this.renderLoginForm()}
                            </div>
                        </div>
                    </div>
                    <div className="shopNav">
                        <div className="container">
                            <ul>
                                <li>
                                    <IndexLink to="/shop" activeClassName={"active"} className="homeIcon" >VIP首页</IndexLink>
                                </li>
                                <li>
                                    <Link to="/shop/vip"  activeClassName={"active"}  >我的特权</Link>
                                </li>
                                <li>
                                    <Link to="shop/mall" activeClassName={"active"}  >积分商城</Link>
                                </li>
                                <li>
                                    <a onClick={this.serversOpen.bind(this)}>联系客服</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
                {this.props.children}
                <footer id="shopFooter">
                    <div className="container">
                        <div className="footer_menu ">
                            <Link to="/sport">体育电竞</Link>
                            |
                            <Link to="/casino">真人视讯</Link>
                            |
                            <Link to="/games">电子游戏</Link>
                            |
                            <Link to="/streetMachine">棋牌对战</Link>
                            |
                            <Link to="/bingo">彩票游戏</Link>
                        </div>
                        <div className="bot">
                            {config.appName} © 版权所有2008 - 2019
                        </div>
                    </div>
                </footer>
                <LoginPage/>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps, {

})(ShopFrame);
