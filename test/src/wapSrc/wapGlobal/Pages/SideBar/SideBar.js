import React, { Component } from 'react';
import { Flex, WhiteSpace,List} from 'antd-mobile';
import {Link,browserHistory} from 'react-router';
import connect from "react-redux/es/connect/connect";
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
    render(){
        return(
            <div className="SideBar">
                <Flex className="item-inner" align="start">
                    <Flex.Item>
                        <div className="side-logo"></div>
                        {this.props.user.username?
                            <div className="deposicon-div">
                                <a  onClick={this.linkTo.bind(this,"money/deposit")} className="deposicon">
                                    <i className="icon icon-credit-card"></i>
                                    存款
                                </a>
                            </div>:""
                        }
                    </Flex.Item>
                    <WhiteSpace size="lg" />
                    <Flex.Item className="rightCon">
                        <div className="userName">
                            {this.props.user.username?this.props.user.username:"游客"}, 欢迎您!
                        </div>
                        <div className="account-label">
                          帐户余额
                        </div>
                        <div className="account-number">
                            ￥{this.props.user.amount?this.props.user.amount:"0"}
                        </div>
                    </Flex.Item>
                </Flex>
                <Flex >
                    <List className="sideList">
                        {this.props.user.token?
                            <Item>
                                <i className="icon icon-pinterest"></i>推广地址:{this.props.user.recommendCode}
                            </Item>:""
                        }
                        <Item arrow="horizontal" onClick={this.linkTo.bind(this,'/editPassword/1')}>
                            <i className="icon icon-user"></i>修改登录密码
                        </Item>
                        {this.props.remoteSysConfs['allow_edit_pay_pwd'] =="true" ?
                            <Item arrow="horizontal" onClick={this.linkTo.bind(this,'/editPassword/2')}>
                                <i className="icon icon-key"></i>修改支付密码
                            </Item>
                            : null
                        }
                        <Item arrow="horizontal" onClick={this.linkTo.bind(this,'/cardManage')}>
                            <i className="icon icon-credit-card"></i>银行卡/二维码管理
                        </Item>
                        <Item arrow="horizontal" onClick={this.linkTo.bind(this,'/setting')}>
                            <i className="icon icon-cogs"></i>偏好设置
                        </Item>
                        <Item arrow="horizontal"  onClick={this.linkTo.bind(this,'/help')}>
                            <i className="icon icon-question-sign"></i>帮助说明
                        </Item>
                        {this.props.user.token?
                            <Item arrow="horizontal"  onClick={this.userQuit.bind(this)}>
                                <i className="icon icon-off"></i>登出
                            </Item>:""
                        }
                    </List>
                </Flex>
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