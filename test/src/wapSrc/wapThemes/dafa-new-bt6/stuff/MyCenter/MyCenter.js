import React, {Component} from 'react';
import {NavBar, Flex, List, Icon, Switch, Toast, Modal} from "antd-mobile";
import {browserHistory, Link} from "react-router";
import connect from "react-redux/es/connect/connect";
import "./MyCenter.scss"

const Item = List.Item;

class MyCenter extends Component {
    constructor(props) {
        super(props);
        this.submitStateLock = true;
        this.state = {}
    }

    userQuit = () => {
        if(!this.submitStateLock) return;
        this.submitStateLock=false;
        new window.actions.LogoutAction().fly(resp=>{
            this.submitStateLock=true;
        });
        browserHistory.push('/');
        this.props.closeSide();
    }

    downLoad = () => {
        window.open(this.props.remoteSysConfs.channel_push_url, "_blank");
    }

    render() {
        return (
            <div className="myCenterPage">
                <NavBar mode="light">个人中心</NavBar>
                <div className="scroll-content">
                    <div className="personInfo">
                        <div className="iconFunc">
                            <Link className="my_msg" to="/message" />
                            <div className="my_account">
                                <i className="account_ico"/>
                                <span className="account_txt">username</span>
                            </div>
                            <Link className="my_promo" to="/promotion" />
                        </div>
                        <div className="assetInfo">
                            <span className="assetNum">总资产<i>¥ 0</i></span>
                            <span className="gameWallet">游戏钱包<i>¥ 0</i></span>
                        </div>
                    </div>

                    <Flex className="funcContainer">
                        <List className="moneyFunc">
                            <Item onClick={() => browserHistory.push('/money/deposit')}>
                                <i className="icon myDeposit"/>
                                <span>存款</span>
                            </Item>
                            <Item onClick={() => browserHistory.push('/money/withdraw')}>
                                <i className="icon myWithdraw"/>
                                <span>取款</span>
                            </Item>
                            <Item onClick={() => browserHistory.push('/money')}>
                                <i className="icon myTransfer"/>
                                <span>额度转换</span>
                            </Item>
                        </List>
                    </Flex>

                    <Flex className="recordContainer">
                        <List className="apiFunc">
                            <Item arrow="horizontal" onClick={()=>browserHistory.push('/service/history')}>
                                <i className="icon moneyRecIcon"/>
                                <span>资金记录</span>
                            </Item>
                            <Item arrow="horizontal" onClick={()=>browserHistory.push('/service/feedback')}>
                                <i className="icon betRecIcon"/>
                                <span>信息反馈</span>
                            </Item>
                            <Item arrow="horizontal" onClick={()=>browserHistory.push('/cardManage')}>
                                <i className="icon bankCardIcon"/>
                                <span>银行卡</span>
                            </Item>
                            <Item arrow="horizontal" onClick={()=>browserHistory.push('/editPassword/1')}>
                                <i className="icon changePwdIcon"/>
                                <span>修改密码</span>
                            </Item>
                            <Item arrow="horizontal" onClick={()=>browserHistory.push('/service/aboutUs')}>
                                <i className="icon betRecIcon"/>
                                <span>关于我们</span>
                            </Item>
                            <Item onClick={this.downLoad}>
                                <i className="icon downloadAppIcon"/>
                                <span>下载APP</span>
                            </Item>
                            <Item onClick={this.userQuit}>
                                <i className="icon logOutIcon"/>
                                <span className="logOutTxt">退出登录</span>
                            </Item>
                        </List>
                    </Flex>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(MyCenter);