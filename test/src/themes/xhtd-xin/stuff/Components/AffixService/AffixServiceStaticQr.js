
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
        const spec = config.spec;
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
                    <div className="block online-qq">
                        <a href={"tencent://message/?uin="+this.props.remoteSysConfs.online_service_qq+"&Menu=yes"} target="_blank">
                        <div className="title QQ1"><i className="fa fa-qq"></i>&nbsp;<span>客服QQ</span></div>
                        {!options.QQ2?null:
                            <div className="title QQ2"><i className="fa fa-qq"></i>&nbsp;<span>客服QQ</span></div>
                        }
                        <div className="content"><span>{this.props.remoteSysConfs.online_service_qq}</span></div>
                        </a>
                    </div>}
                    {this.props.remoteSysConfs.online_service_phone &&
                    <div className="block online-phone">
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
                    <div>
                        {
                            spec == 'xhtd' || spec == 'xhXhtd'? 
                            <img width="100"  className="qrImg" src={require("./qcode/XHTD.png")}/>
                            :null} 
                    </div> 
                    <div>
                        {
                            spec == 'mgm' ? 
                            <img width="100"  className="qrImg" src={require("./qcode/vv8.png")}/>
                            :null} 
                    </div> 
                    <div>
                        {
                            spec != 'xhtd' && spec != 'xhXhtd'?
                            <img width="100"  className="qrImg"src={"/api/v0/qcode.png?code=" + encodeURIComponent("https://" + location.hostname + "/_promotion/web/index.html")} />
                            :null} 
                    </div>
                        <div className="text1">扫二维码</div>
                        <div className="text1">下载客户端</div>
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

export default connect(mapStateToProps)(AffixServiceStaticQr)