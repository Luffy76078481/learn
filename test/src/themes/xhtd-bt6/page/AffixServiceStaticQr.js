
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {config} from "globalConfig";
import "./AffixServiceStaticQr.scss";



// 静态二维码专用组件
class AffixServiceStaticQr extends Component{
    constructor(){
        super();
        this.state = {
            show: true
        }
    }

    close(){
        this.setState({show: false});
    }
    componentDidMount(){

    }

    render(){
        const promotionLink =this.props.remoteSysConfs.channel_push_url;
        return (
            <div className="affix-online-server-2" style={{display: this.state.show ? "block":"none"}}>
            <div className="affix-servers" onClick={this.serversOpen.bind(this)}></div>
            <div className="affix-qq">
                <a href={"tencent://message/?uin="+this.props.remoteSysConfs.online_service_qq+"&Menu=yes"} target="_blank">
                    {this.props.remoteSysConfs.online_service_qq}
                </a>
            </div>
            <div className="affix-phone">
                {this.props.remoteSysConfs.online_service_phone}
            </div>
            <div className="affix-wechat">
                {this.props.remoteSysConfs.online_service_wechat}
            </div>
            <div className="affix-downAPP">
                <a href={promotionLink} target="_blank"></a>
            </div>
            <div className="affix-close" onClick={this.close.bind(this)}></div>
        </div>
        );
    }

    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }

}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(AffixServiceStaticQr)