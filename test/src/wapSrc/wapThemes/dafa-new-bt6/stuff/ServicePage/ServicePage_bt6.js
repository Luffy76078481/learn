import React, { Component } from 'react';
import {Flex, List,NavBar, Icon,Badge} from 'antd-mobile';
import {browserHistory} from "react-router";
import connect from "react-redux/es/connect/connect";
import './ServicePage.scss';
const Item = List.Item;
import {config} from "globalConfig";
class ServicePage extends Component{
    constructor(props) {
        super(props);
    }
    openSildeBar(){
        this.props.params.openSilde()
    }
    serviceOpen(){
        if(config.isApp){
            window.Util.appOpen(this.props.remoteSysConfs.online_service_link)
        }else{
            window.open(this.props.remoteSysConfs.online_service_link,'_blank');
        }
    }
    render(){
        return(
            <div className="HelpPage">

                <NavBar
                    mode="light"
                    icon={<Icon type="ellipsis" />}
                    onLeftClick={this.openSildeBar.bind(this)}
                >客户服务</NavBar>
                <div className="scroll-content ServicePage">
                    <Flex>
                        <List className="list">


                            <h5 className="title">联系我们</h5>
                            <Item arrow="horizontal" onClick={this.serviceOpen.bind(this)}>
                                <i className="icon icon-comments" />在线客服
                            </Item>
                            {
                                this.props.remoteSysConfs.online_service_phone?
                                    <Item>
                                        <i className="icon icon-phone" />客服电话：{this.props.remoteSysConfs.online_service_phone}
                                    </Item>:null
                            }

                            {
                                this.props.remoteSysConfs.online_service_email?
                                    <Item >
                                        <i className="icon icon-envelope" />官方邮箱：{this.props.remoteSysConfs.online_service_email}
                                    </Item>:null
                            }
                            {
                                this.props.remoteSysConfs.online_service_worktime?
                                    <Item >
                                        <i className="icon icon-time" />工作时间：{this.props.remoteSysConfs.online_service_worktime}
                                    </Item>:null
                            }

                        </List>
                    </Flex>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs:state.remoteSysConfs,
        sitemsg:state.sitemsg,
        noticesUnRead:state.noticesUnRead,
    }
);

export default connect(mapStateToProps)(ServicePage)