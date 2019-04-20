import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  BackTop,Icon
} from 'antd';
import './ContactUs.scss'
import {config} from "globalConfig";

class ContactUs extends Component{
    constructor(props){
        super(props)
        this.state = {
        };
    }
    componentDidMount(){
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers');
        return false;
    }
    render(){
        return(
            <div className="ContactUs container">
                <h2 className="page-title">联系我们</h2>
                {
                    this.props.remoteSysConfs.online_service_phone&&
                    <div className="item">
                        <div className="leftI"><Icon type="phone" />热线</div>
                        <div className="rightI">菲律宾热线 :{this.props.remoteSysConfs.online_service_phone}</div>
                    </div>
                }
                {
                    this.props.remoteSysConfs.online_service_qq&&
                    <div className="item">
                        <div className="leftI"><Icon type="qq" />QQ</div>
                        <div className="rightI">在线QQ :{this.props.remoteSysConfs.online_service_qq}</div>
                    </div>
                }
                {
                    this.props.remoteSysConfs.online_service_wechat&&
                        <div className="item">
                            <div className="leftI"><Icon type="wechat" />微信</div>
                            <div className="rightI">客服微信 :{this.props.remoteSysConfs.online_service_wechat}</div>
                        </div>
                }
                {
                    this.props.remoteSysConfs.online_service_email&&
                    <div className="item">
                        <div className="leftI"><Icon type="mail" />邮箱</div>
                        <div className="rightI">客户服务 :{this.props.remoteSysConfs.online_service_email}</div>
                    </div>
                }
                {
                    this.props.remoteSysConfs.online_service_worktime&&
                    <div className="item">
                        <div className="leftI"><Icon type="dashboard" />工作时间</div>
                        <div className="rightI">工作时间 :{this.props.remoteSysConfs.online_service_worktime}</div>
                    </div>
                }
                {
                    this.props.remoteSysConfs.online_service_link&&
                    <div className="item">
                        <div className="leftI"><Icon type="message" />在线客服</div>
                        <div className="rightI">7x24 在线客服&nbsp;&nbsp;<a onClick={this.serversOpen.bind(this)}>Chat Now</a></div>
                    </div>
                }
                <BackTop></BackTop>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps,{})(ContactUs);
