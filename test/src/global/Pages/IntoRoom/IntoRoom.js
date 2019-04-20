/**
 * Created by b3 on 2017/6/9.
 */

import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import './IntoRoom.scss'
class IntoRoom extends Component {
    constructor (props){ 
        super();
        this.state = {
            errorMsg : true,
            VerifyCode:"",
            errorPassword:false,
            reqLock:false
        }
    }


    regis(e){
        window.$(this.refs.dlg).modal("hide");
    }

    close(){
        this.setState({
            errorPassword : false
        })
    }
 
    render() {
        return (
            <div ref="dlg" id="IntoRoom" className="modal fade" role="dialog">
                <div className="modal-dialog login">
                    <div className="modal-content custom_modal_content">
                        <div className="modal-header regis-head BGcolor-second border-type">
                            <button type="button" className="close" data-dismiss="modal" onClick={()=>{this.close()}}><i className="fa fa-times"></i></button>
                            <h4 className="modal-title color-second">   加入房间 </h4>
                        </div>
                        <div className="modal-body fast_booking_content regis-body BGcolor-main border-type" style={{height:"auto"}}>
                                <div className="row">
                                    <div className="col-xs-12 col-md-12 input-marg">
                                        <input ref="IntoRoomId" type="number" maxLength="6" placeholder="请输入6位房间密码" className="border-type BGcolor-main color-main"/>
                                    </div>
                                    <div className="col-xs-6 col-md-6 regisbox">
                                        <button type="button" className="regisbtn" onClick={this.IntoRoomId.bind(this)} >确定</button>
                                    </div>
                                </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        login: state.login,
        sitemsg: state.sitemsg,
        global:state.global,
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps)(IntoRoom) ;