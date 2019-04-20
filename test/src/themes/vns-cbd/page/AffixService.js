
import React, { Component } from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import "./css/AffixService.scss";
import {ApiAllSysConfigAction} from "globalAction";
import {Link} from 'react-router';
class AffixService2 extends Component{
    componentWillMount(){
        new ApiAllSysConfigAction().fly();
    }
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
        const options = window.r.props('AffixService');

        return (
            <div className="affix-online-server-2" style={{display: this.state.show ? "block":"none"}}>
                {
                    options.procenterimg ?  
                    <Link to="/promotions">
                        <div className="hd procenterimg" />
                    </Link> : null
                }
                <div className="hd serversOpenimg" onClick={this.serversOpen.bind(this)}>

                </div>
                <div className="bd">
                    <div className="block online-service" onClick={this.serversOpen.bind(this)}>
                        <div className="title">
                            <i className="fa fa-headphones" />
                            <span className="num">&nbsp;7x24小时</span>
                            {!options.serviceTxt ? null : <span>小时</span>}
                        </div>
                        <div className="content"><span>在线客服</span></div>
                    </div>
                    {
                        this.props.remoteSysConfs.online_service_qq &&
                        <div className="block online-qq">
                            <a href={"tencent://message/?uin="+this.props.remoteSysConfs.online_service_qq+"&Menu=yes"} target="_blank">
                                <div className="title QQ1">
                                    <i className="fa fa-qq" />&nbsp;
                                    <span>客服QQ</span>
                                </div>
                                {
                                    options.QQ2 ? 
                                    <div className="title QQ2">
                                        <i className="fa fa-qq"/>&nbsp;
                                        <span>QQ客服公众号</span>
                                    </div> : null
                                }
                                <div className="content">
                                    <span>{this.props.remoteSysConfs.online_service_qq}</span>
                                </div>
                                {
                                    options.QQ2 ? 
                                    <div className="content QQhint">
                                        &nbsp;<span>QQ为公众号非个人QQ</span>
                                    </div> : null
                                }
                            </a>
                        </div>
                    }
                    {   /* 客服电话 */
                        this.props.remoteSysConfs.online_service_phone &&
                        <div className="block online-phone">
                            <div className="title"><i className="fa fa-phone"/>&nbsp;<span>客服电话</span></div>
                            <div className="content"><span style={{fontSize:'14px'}}>&nbsp;{this.props.remoteSysConfs.online_service_phone}</span>
                            </div>
                        </div>
                    }
                    {
                        options.weixin == true && this.props.remoteSysConfs.online_service_wechat &&
                        <div className="block online-phone">
                            <div className="title"><i className="fa fa-weixin" />&nbsp;<span>客服微信</span></div>
                            <div className="content">
                                <span>&nbsp;{this.props.remoteSysConfs.online_service_wechat}</span>
                            </div>
                        </div>
                    }
                    { 
                        options.wiechatQR ? 
                        <div className="qrcode">
                            <img width="100px" className="weichatQrImg" alt="" />
                            <div>官网微信扫一扫</div>
                        </div> : null
                    }
                    {
                        options.hideWapQR ? null :
                        <div className="qrcode">
                            <QRCode includeMargin={true} size={90} value={this.props.remoteSysConfs.channel_push_url || ""} className="qrImg" alt=""  />
                            <div className="text">扫一扫下载APP</div>
                        </div> 
                    }
                    {
                        options.netSpeed ? 
                        <div className="net">
                            <a href="/nav.html" target="_blank"></a>
                        </div> : null
                    }
                </div>
                <div className="block ft">
                    <span className="left-span"></span>
                    <span className="center" onClick={this.close.bind(this)}>关&nbsp;闭</span>
                    <span className="right-span"></span>
                </div>
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

export default connect(mapStateToProps)(AffixService2)