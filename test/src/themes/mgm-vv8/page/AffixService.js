
import React, { Component } from 'react';
import { connect } from 'react-redux';

import "./css/AffixService.scss";
import {ApiAllSysConfigAction} from "globalAction";
import {Link} from 'react-router';
import QRCode from 'qrcode.react'
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
                {!options.procenterimg?null:
                    <a href="/promotionCenter.html">
                    <div className="hd procenterimg" >
                    </div>
                    </a>
                }
                <div className="hd serversOpenimg" onClick={this.serversOpen.bind(this)}>

                </div>
                <div className="bd">
                    <div className="block online-service" onClick={this.serversOpen.bind(this)}>
                        <div className="title">
                            <i className="fa fa-headphones"></i>
                            <span className="num">&nbsp;7x24</span>{!options.serviceTxt?null:<span>小时</span>}
                        </div>
                        <div className="content"><span>在线客服</span></div>
                    </div>
                    {this.props.remoteSysConfs.online_service_qq &&
                    <div className=" online-qq onlinetwoqq">
                        <a href={"tencent://message/?uin="+this.props.remoteSysConfs.online_service_qq+"&Menu=yes"} target="_blank">
                        {/* <div className="title QQ1"><i className="fa fa-qq"></i>&nbsp;<span>客服QQ</span></div> */}
                        {/* {!options.QQ2?null:
                            <div className="title QQ2"><i className="fa fa-qq"></i>&nbsp;<span>QQ客服公众号</span></div>
                        } */}
                        {/* <div className="content"><span>{this.props.remoteSysConfs.online_service_qq}</span></div> */}
                        {/* {!options.QQ2?null:
                            <div className="content QQhint">&nbsp;<span>QQ为公众号非个人QQ</span></div>
                        } */}
                        <span className='faqQQ'>{this.props.remoteSysConfs.online_service_qq}</span>
                        </a>
                    </div>}
                    {this.props.remoteSysConfs.online_service_phone &&
                    <div className="block online-phone">
                    <div style={{"height":"42px"}}></div>
                    
                    {/* this.props.remoteSysConfs.channel_push_url || "" */}
                     <QRCode includeMargin={true} size={90} value={"https://godgm.com/app.php/11"} className="qrImg" alt=""  />
                        <div className="title"><i className="fa fa-phone"></i>&nbsp;<span>客服电话</span></div>
                        <div className="content"><span>&nbsp;{this.props.remoteSysConfs.online_service_phone}</span>
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
                    {!options.wiechatQR?null:
                        <div className="qrcode">
                            <img width="100px" className="weichatQrImg" alt="" />
                            <div>官网微信扫一扫</div>
                        </div>
                    }
                    {!options.hideWapQR?
                    <div className="qrcode">
                    
                        {/* <img width="100" src={"/api/v0/qcode.png?code=" + encodeURIComponent("https://" + location.hostname + "/_promotion/web/index.html")} className="qrImg" alt="" /> */}
                        <div className="text">扫一扫下载APP</div>
                    </div>:null}
                    {!options.netSpeed?null:
                        <div className="net">
                            <a href="/nav.html" target="_blank"></a>
                        </div>
                    }
                </div>
                <div className="block ft">
                    <span className="left-span"></span>
                    <span className="center" onClick={this.close.bind(this)}>关&nbsp;闭</span>
                    <span className="right-span">2</span>
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