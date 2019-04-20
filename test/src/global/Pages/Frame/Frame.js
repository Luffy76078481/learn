import React, { Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { message } from 'antd';
import "./Frame.css";
import config from '../../../../config/config'

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
    constructor(props){
        super(props);
        this.state = {
            expand:false
        };
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
        var AffixService_Callback = window.r.get("AffixService_Callback");
        
        var AffixService_Help = window.r.get("AffixService_Help");
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
                {/* <Footer/> */}
                {window.config.spec=='bet365' && browserHistory.getCurrentLocation().pathname=='/'? null: <Footer/>}
                {AffixService2?<AffixService2></AffixService2>:null}
                {AffixService ? <AffixService/> : null}
                {AffixService_Download ? <AffixService_Download/> : null}
                {AffixService_Callback ? <AffixService_Callback/> : null}
                {AffixService_Help? <AffixService_Help/> :null}
            </div>
        );
        return (<div>test</div>)
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