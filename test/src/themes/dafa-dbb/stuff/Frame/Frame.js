import React, { Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import "./Frame.css";

class Frame extends Component {
    componentDidMount() {

    }
    constructor(props){
        super(props);
        this.state = {
            expand:false
        };
    }

    renderOutMsgIcon(msg) {
        if (msg.msgType === "loading") {
            return  <i className=" icon fa fa-spinner fa-pulse msgIcon iconLoading " style={{ fontSize:"35px",display:"block",float: "left",marginLeft: "7%",marginTop: "2%"}}></i>;
        } else if (msg.msgType === "success"){
            return <i className=" icon fa fa-check msgIcon" style={{"color":"#8AD77B", fontSize:"45px",display:"block",float: "left",marginLeft: "7%",marginTop: "0%"}}></i>;
        }else if (msg.msgType === "error") {
            return <i className=" icon fa fa-times msgIcon" style={{"color":"#D54F4F", fontSize:"45px",display:"block",float: "left",marginLeft: "7%",marginTop: "0%"}} ></i>
        }
    }
    globeHide(){
        $("#globe-show").hide();
    }
    render() {
        var Header = window.r.get("Header");
        var LoginPage = window.r.get("LoginPage");
        var ForgetPasswordPage = window.r.get("ForgetPasswordPage");
        var Footer = window.r.get("Footer");
        var AffixService = window.r.get("AffixService");
        var AffixService2 = window.r.get("AffixService2");
        var AffixService_Download = window.r.get("AffixService_Download");
        var AffixService_Help = window.r.get("AffixService_Help");
        const appName = window.config.appName;
        return (

            <div>
                <div id="globe-show">
                    <div className="globe-popbox"></div>
                    <div className="globe-popbox-popbox">
                        <p id="globe-message"></p>
                        <p className="globe-close" onClick={this.globeHide}>关闭</p>
                    </div>
                </div>
           


                {this.props.message.popup && !this.state.expand?
                    <div className={"popupArea"}>
                        <div>
                            {this.renderOutMsgIcon(this.props.message.popup)}
                            <span className="popupTitle">{this.props.message.popup.title}</span><br/>
                            <span className="popupMsg">{this.props.message.popup.message}</span>
                        </div>
                    </div> :<div></div>
                }

                <ForgetPasswordPage/>
                <LoginPage/>
                <Header/>
                {this.props.children}
            
                {window.config.spec=='bet365' && browserHistory.getCurrentLocation().pathname=='/'? null: <Footer/>}
                
                {AffixService ? <AffixService/> : null}
                {AffixService2? <AffixService2/> :null}
                {AffixService_Download ? <AffixService_Download/> : null}
                {AffixService_Help? <AffixService_Help/> :null}
            </div>
        );
        return (<div>test</div>)
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        message:state.message
    }
);

var frame = connect(mapStateToProps, {

})(Frame);

export default frame;