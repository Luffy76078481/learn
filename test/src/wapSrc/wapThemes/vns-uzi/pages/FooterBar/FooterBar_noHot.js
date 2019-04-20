/*
* 【没有火热活动】
* */
import React, { Component } from 'react';
import { Link,IndexLink} from 'react-router';
import { Flex,Badge} from 'antd-mobile';

import "./FooterBar.scss";
import connect from "react-redux/es/connect/connect";
class FooterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab:'/',
        };
    }
    render() {
        let unreadNum = 0;

        return (
            <div className="footerBar" >
                <Flex className="navTabs">
                    <Flex.Item >
                        <IndexLink to="/" activeClassName="active">
                            <i className="icon icon-home"></i>首页</IndexLink>
                    </Flex.Item>
                    <Flex.Item>
                        <Link to="/money" activeClassName="active">
                            <i className="icon icon-money"></i>资金管理</Link>
                    </Flex.Item>
                    <Flex.Item>
                        <Link to="/message" activeClassName="active">
                            <i className="icon icon-globe"></i>我的消息
                            <Badge
                                text={this.props.sitemsg.unread+this.props.noticesUnRead+this.props.promoUnRead}/>

                        </Link>
                    </Flex.Item>
                    <Flex.Item>
                        <Link to="/history" activeClassName="active"><i className="icon icon-paste"></i>历史记录</Link>
                    </Flex.Item>
                    <Flex.Item>
                        <Link to="/service" activeClassName="active"><i className="icon icon-group"></i>客户服务</Link>
                    </Flex.Item>

                </Flex>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        sitemsg:state.sitemsg,
        noticesUnRead:state.noticesUnRead,
        promoUnRead:state.promotions.promoUnRead,
    }
);

export default connect(mapStateToProps)(FooterBar)