
import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./css/AffixService.scss";
import { SuccessMsgAction } from '../../../actions';
import QRCode from 'qrcode.react';
class AffixService extends Component{
     
    render(){
        const options = window.r.props("AffixService");
        const weixinName = options.weixinName || "微信公众号";
        return (
            <div className="affix-online-server">
                <div className="hd">
                    {!options.icon?
                    <i className="fa fa-headphones"></i>:<i className="fa fa-qq"></i>}
                        在线客服

                </div>
                <div className="bd">
                    <div>
                        <i className="fa fa-headphones"></i>&nbsp;<span>在线客服：</span>        
                        <span className="label-warning" onClick={this.serversOpen.bind(this)}>
                            <i className="fa fa-headphones"></i>&nbsp;在线客服
                        </span>
                    </div>
                    {this.props.remoteSysConfs.online_service_qq?
                        <div>
                            <i className="fa fa-qq"></i>&nbsp;
                            <span>客服QQ：</span>
                            <span className="label-warning">
                                <a href={"tencent://message/?uin="+this.props.remoteSysConfs.online_service_qq+"&Menu=yes"} target="_blank">
                                    <i className="fa fa-qq"></i>&nbsp;
                                    {this.props.remoteSysConfs.online_service_qq}
                                </a>
                            </span>
                        </div>
                    :null}
                    {this.props.remoteSysConfs.agent_service_qq?
                        <div>
                            <i className="fa fa-qq"></i>&nbsp;<span>代理QQ：</span>
                            <span className="label-warning">
                                <a href={"tencent://message/?uin="+this.props.remoteSysConfs.agent_service_qq+"&Menu=yes"} target="_blank">
                                <i className="fa fa-qq"></i>
                                &nbsp;{this.props.remoteSysConfs.agent_service_qq}
                                </a>
                            </span>
                        </div>
                    :null}
                    {this.props.remoteSysConfs.online_service_wechat?
                        <div><i className="fa fa fa-weixin"></i>&nbsp;<span>{weixinName}：</span>         
                            <span className="label-warning">
                                <i className="fa  fa-weixin"></i>
                                &nbsp;{this.props.remoteSysConfs.online_service_wechat}
                            </span>
                        </div>
                    :null}
                    {this.props.remoteSysConfs.online_service_phone?
                        <div>
                            <i className="fa fa-phone"></i>&nbsp;<span>24小时客服：</span>  
                            <span className="label-warning">
                                <i className="fa fa-phone"></i>
                                &nbsp;{this.props.remoteSysConfs.online_service_phone}
                            </span>
                        </div>
                    :null}
                    {this.props.remoteSysConfs.online_service_email?
                        <div>
                            <i className="fa fa-envelope"></i>
                            &nbsp;<span>客服信箱：</span>  
                            <span className="label-warning">
                                <i className="fa fa-envelope"></i>
                                &nbsp;{this.props.remoteSysConfs.online_service_email}
                            </span>
                        </div>
                    :null}
                    <div>
                        <i className="fa fa-mobile"></i>
                        &nbsp;<span>手机下载：</span> 
                        <a className="label-warning" href="./BBTDown/download.html" target="_blank">
                            <i className="fa fa-download"></i>
                            &nbsp;手机下载地址
                        </a>                   
                    </div>
                    <div className="mybtn">
                        <a href="/register" className="btn btn-danger btn-sm">
                            <i className="fa fa-unlock-alt"></i>
                            &nbsp;立即开户
                        </a>
                    </div>
                    {!options.hideWapQR?
                    <div className="qrcode">
                     <QRCode includeMargin={true} size={90} value={this.props.remoteSysConfs.channel_push_url || ""} className="qrImg" alt=""  />
                        <div>扫一扫下载APP</div>
                    </div>:null}
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

export default connect(mapStateToProps)(AffixService)