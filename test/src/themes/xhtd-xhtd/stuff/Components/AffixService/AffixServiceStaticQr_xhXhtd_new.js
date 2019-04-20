
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {config} from "globalConfig";
import "./AffixServiceStaticQr_xhXhtd_new.scss";
import {Link} from 'react-router';
import QRCode from 'qrcode.react'

// 静态二维码专用组件
class AffixServiceStaticQr_xhXhtd_new extends Component{
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
        const spec = config.spec;
        const options = window.r.props('AffixService');

        return (
            <div className="affix-online-server-2" style={{display: this.state.show ? "block":"none"}}>
                <div className="hd serversOpenimg" onClick={this.serversOpen.bind(this)}></div>
                <div className="bd">
                    <div className="block online-service" onClick={this.serversOpen.bind(this)}>
                        <div className="title">
                            <i className="fa fa-headphones"></i>
                            <span className="num">&nbsp;7x24</span>{!options.serviceTxt?null:<span>小时</span>}
                        </div>
                        <div className="content"><span>在线客服</span></div>
                    </div>
                      {this.props.remoteSysConfs.online_service_qq &&
                    <div className="block online-qq">
                        <a href={"tencent://message/?uin="+this.props.remoteSysConfs.online_service_qq+"&Menu=yes"} target="_blank">
                            <div className='newQQ'>
                                <span>{this.props.remoteSysConfs.online_service_qq}</span>
                            </div>
                        </a>
                    </div>}
                    
                    {this.props.remoteSysConfs.online_service_phone &&
                    <div className="block online-phone">
                       <div className='newTEL'>
                            <span>{this.props.remoteSysConfs.online_service_phone}</span>
                       </div>
                    </div>
                    }
                    {options.weixin == true&& this.props.remoteSysConfs.online_service_wechat &&
                    <div className="block online-phone">
                        <div className="title"><i className="fa fa-weixin"></i>&nbsp;<span>客服微信</span></div>
                        <div className="content"><span>&nbsp;{this.props.remoteSysConfs.online_service_wechat}</span>
                        </div>
                    </div>
                    }
                    <div className="newScan">
                        <QRCode includeMargin={true} size={90} value={this.props.remoteSysConfs.channel_push_url || ""} className="qrImg" alt=""  />
                        {/* <img width="100" src={"https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=" + this.props.remoteSysConfs.channel_push_url} className="qrImg" alt="" />  */}
                    </div>
                    {!options.netSpeed?null:
                        <div className="net">
                            <a href="/nav.html" target="_blank"></a>
                        </div>
                    }
                </div>
                <div className="newclose" onClick={this.close.bind(this)}></div>
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

export default connect(mapStateToProps)(AffixServiceStaticQr_xhXhtd_new)