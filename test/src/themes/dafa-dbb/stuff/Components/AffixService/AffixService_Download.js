/**
 * DBB-浮动图
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import {config} from '../../../../../../config/config'
import "./AffixService_Download.scss";

class AffixService_Download extends Component{
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
        const promotionLink = this.props.remoteSysConfs.channel_push_url;
        return (
            <div className="download_fix">
                {
                config.spec == 'dafa-dbb'?
                <div className="fix_text">
                    <a href="http://cdn.silvereagle88.com/generic/setupglx.exe"><div className="download_li download_game"><em className="download_game_a">娱乐场</em></div></a>
                    <a href="http://cdn.silvereagle88.com/generic/setupglx.exe" ><div className="download_li download_poker"><em className="download_poker_a">PT老虎机</em></div></a>
                    <a href={promotionLink} ><div className="download_li download_send"><em className="download_send_a" target="_blank">大发app</em></div></a>
                </div>
                :
                <div className="fix_text">
                    <a href="http://cdn.silvereagle88.com/generic/setupglx.exe"><div className="download_li download_poker"><span className="download_poker_a">PT老虎机</span></div></a>
                    <a href={promotionLink} ><div className="download_li download_send"><span className="download_send_a" target="_blank">大发app</span></div></a>
                    <a href="https://sbet.bet/down/down.exe" ><div className="download_li download_game"><span className="download_game_a">资讯端</span></div></a>
                    <a href="http://dafazixun.com" target='_blank'><div className="download_li download_khd"><span className="download_khd_a">游戏客户端</span></div></a>
                 </div>
                }
                <div className="fix_title download_fix_title">下<br/>载</div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(AffixService_Download)