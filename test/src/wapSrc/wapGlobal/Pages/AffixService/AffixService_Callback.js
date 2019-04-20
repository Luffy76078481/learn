/**
 * Created by sobi on 2017/11/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {config} from "globalConfig";
import { Modal} from 'antd-mobile';
import "./AffixService_Callback.scss";

class AffixService_Callback extends Component{
    constructor(){
        super();
        this.state = {
            show: true,
            showbg:false
        }
    }

    close(){
        this.setState({show: false});
    }
     
    shwoNumber(){
        this.setState({showbg: true});
    }

    hideNumber(){
        this.setState({showbg: false});
    }

    subPhone(){
        var num = this.refs.callbackNumber.value;
        if(num == ""){
            Modal.alert("请填写您的号码");
            return false;
        }else{
            var isMobilePhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
            var isFixMob= /^0?1[3|4|5|8][0-9]\d{8}$/;
            if(!isFixMob.test(num) && !isMobilePhone.test(num)){
                Modal.alert( "请填写正确的号码！");
                return false;
            } 
        }

        new window.actions.ApiAddPhoneCallAction(num).fly(respond=>{
            if (respond.StatusCode === 0) {
                Modal.alert("回播中", "请等待,我们正在给您回拨电话中!");
            } else {
                Modal.alert("回播失败", respond.Message);
            }
        });
        
        
    }

    enterSub(e){
        if(e.keyCode == 13){
            e.preventDefault()
            this.subPhone();
        }
    }
    
    render(){
        return (
            <div className="callback_box">
                <div className="callback_callimg" onClick={this.shwoNumber.bind(this)}></div>
                <div className={["callback_bg",this.state.showbg && "callback_shwobg"].join(' ')} >
                    <div className="call-control btn-close" onClick={this.hideNumber.bind(this)}></div>
                    <div className="call-control text-1"><span id="brand">尊敬的会员</span>为您提供24小时全天候回拨服务，完全免费，欢迎体验！</div>
                    <div className="call-control number">
                        <div className="left-number">
                            <input pattern="^(\d{3,4}-)?\d{7,8}$" type="text" ref="callbackNumber" onKeyDown={this.enterSub.bind(this)}  placeholder="请输入您的电话号码"/>
                        </div>
                        <div className="right-btn">
                            <input type="button"  onClick={this.subPhone.bind(this)}  value="马上回拨"/>
                        </div>
                    </div>
                    <div className="call-control text-2">
                        温馨提示：<br/>
                        固定电话请加上区号，如北京（010-84488866）深圳（0755-87692514）
                    </div>
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

export default connect(mapStateToProps)(AffixService_Callback)