/*
* 【没有火热活动】
* */
import React, { Component } from 'react';
import { Link,IndexLink} from 'react-router';
import { Flex,Badge} from 'antd-mobile';
import "./FooterBar_new.scss";
import connect from "react-redux/es/connect/connect";
import {config} from "globalConfig";

class FooterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab:'/',
        };
    }

    serviceOpen(){
        if(config.isApp){
            window.Util.appOpen(this.props.remoteSysConfs.online_service_link)
        }else{
            window.open(this.props.remoteSysConfs.online_service_link,'_blank');
        }
    }

    render() {
        let unreadNum = 0;

        return (
            <div className="footerBar" >
                <Flex className="navTabs">
                    <Flex.Item >
                        <IndexLink to="/" activeClassName="active"><i className="icon icon-home" />首页</IndexLink>
                    </Flex.Item>
                    <Flex.Item>
                        <Link to="/money" activeClassName="active"><i className="icon icon-money" />出纳</Link>
                    </Flex.Item>
                    <Flex.Item>
                        <Link to="/promotion" activeClassName="active"><i className="icon icon-promotion" />优惠</Link>
                    </Flex.Item>
                    <Flex.Item>
                        <Link to="/service" activeClassName="active"><i className="icon icon-group" />客服</Link>
                    </Flex.Item>
                    <Flex.Item>
                        <Link to="/myCenter" activeClassName="active"><i className="icon icon-paste" />我的</Link>
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