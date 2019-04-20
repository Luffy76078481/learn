import React, { Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { message } from 'antd';
import "./Frame.css";


class Frame extends Component {
    componentWillReceiveProps(nextProps) {
        if( nextProps.message.popup){
            const popup =  nextProps.message.popup;
            message.destroy();
            if (popup.msgType === "loading") {
                message.loading(popup.message)
            } else if (popup.msgType === "success"){
                message.success(popup.message,2);
            }else if (popup.msgType === "error") {
                message.error(popup.message,2);
            }
        }
    }
    globeHide(){
        $("#globe-show").hide();
    }
    constructor(props){
        super(props);
        this.state = {
            expand:false
        };
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
                {/*<ForgetPasswordPage/>*/}
                <div id="globe-show">
                    <div className="globe-popbox"></div>
                    <div className="globe-popbox-popbox">
                        <p id="globe-message"></p>
                        <p className="globe-close" onClick={this.globeHide}>关闭</p>
                    </div>
                </div>
                <LoginPage/>
                <Header/>
                {this.props.children}
                <Footer/>
                {AffixService2?<AffixService2></AffixService2>:null}
                {AffixService ? <AffixService/> : null}
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        // user : state.user,
         message:state.message
    }
);

var frame = connect(mapStateToProps, {

})(Frame);

export default frame;