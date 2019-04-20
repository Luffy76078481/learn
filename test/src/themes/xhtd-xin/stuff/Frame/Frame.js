import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./Frame.css";

class Frame extends Component {
    constructor(props){
        super(props);
    }
    globeHide(){
        $("#globe-show").hide();
    }
    // 弹窗
    renderOutMsgIcon(msg) { 
        if (msg.msgType === "loading") {
            return  <i className=" icon fa fa-spinner fa-pulse msgIcon iconLoading " style={{ fontSize:"35px",display:"block",float: "left",marginLeft: "7%",marginTop: "2%"}}></i>;
        } else if (msg.msgType === "success"){
            return <i className=" icon fa fa-check msgIcon" style={{"color":"#8AD77B", fontSize:"45px",display:"block",float: "left",marginLeft: "7%",marginTop: "0%"}}></i>;
        }else if (msg.msgType === "error") {
            return <i className=" icon fa fa-times msgIcon" style={{"color":"#D54F4F", fontSize:"45px",display:"block",float: "left",marginLeft: "7%",marginTop: "0%"}} ></i>
        }
    }
    render() {
        var Header = window.r.get("Header");
        var LoginPage = window.r.get("LoginPage");
        var ForgetPasswordPage = window.r.get("ForgetPasswordPage");
        var Footer = window.r.get("Footer");
        var AffixService = window.r.get("AffixService");
        var AffixService2 = window.r.get("AffixService2");
        return (
            <div>
                <div id="globe-show">
                    <div className="globe-popbox"></div>
                    <div className="globe-popbox-popbox">
                        <p id="globe-message"></p>
                        <p className="globe-close" onClick={this.globeHide}>关闭</p>
                    </div>
                </div>
                {this.props.message.popup?
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
                <Footer/>     
                {AffixService ? <AffixService/> : null}
                {AffixService2? <AffixService2/> :null}
            </div>
        );
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