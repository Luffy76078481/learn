/**
 * DBB-右浮动图
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import "./AffixService_Help.scss";

class AffixService_Help extends Component{
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
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }

    render(){
        return (
            <div className="help_fix">
                <div className="fix_title help_fix_title">帮<br/>助<br/>中<br/>心</div>
                <div className="fix_text">
                    <a><div onClick={this.serversOpen.bind(this)}  className="help_li help_onlineHelp"><span href="#" id="test1" target="_parent" className="help_onlineHelp_a">在线聊天</span></div></a>
       
                    <a><div className="help_li help_phone"><span href="#" className="help_phone_a">{this.props.remoteSysConfs.online_service_phone}</span></div></a>
                    {this.props.remoteSysConfs.online_service_qq && <a href={"tencent://message/?uin="+this.props.remoteSysConfs.online_service_qq+"&Menu=yes"} target="_blank" ><div className="help_li help_qq"><i className="fa fa-qq"></i><span className="help_wechat_a" >{this.props.remoteSysConfs.online_service_qq}</span></div></a>}
                    
                    {/* {window.config.weixin && window.config.spec!='dafa-dbb'? <a href="/images/qr-code.jpg" target="_blank" ><div className="help_li help_wechat"><span className="help_wechat_a" >{window.config.weixin}</span></div></a>:null} */}
                </div>
            </div>
        );
    }



}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(AffixService_Help)