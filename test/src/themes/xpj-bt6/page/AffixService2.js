
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link,browserHistory} from 'react-router';

import "./css/AffixService2.scss";

class AffixService2 extends Component{
    constructor(){
        super();
        this.state = {
            show: true
        }
    }

    close(){
        this.setState({show: false});
    }

    render(){
        const promotionLink = window.configHelper.getPromotionUrl();
        const options = window.r.props('AffixService');

        var optionsHongbao = window.r.props("AffixHongbao");
        var page = optionsHongbao.page || "/hongbao/hongbao.htm";
        if (page.indexOf("?") > 0) {
            page += "&t=" + new Date().getTime();
        } else {
            page += "?t=" + new Date().getTime();
        }


        return (
            <div className="affix-online-server-3" style={{display: this.state.show ? "block":"none"}}>
                <div className="affix-AG">
                    <Link to="/casino"/>
                </div>
                <div className="affix-SB">
                    <Link to="/casino"/>
                </div>
                <div className="affix-BY">
                    <Link to="/ag"/>
                </div>
                <div className="affix-PT">
                    <Link to="/ag"/>
                </div>
                <div className="affix-BB">
                    <Link to="/ag"/>
                </div>
                <div className="affix-close" onClick={this.close.bind(this)}>
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