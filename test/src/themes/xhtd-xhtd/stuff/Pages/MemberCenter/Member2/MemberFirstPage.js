/**
 * xhtd-我的信息
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ApiLoginLogsAction} from "globalAction";
import GamePlatforms from "./GamePlatforms";

class MemberIndexPage extends Component {
    constructor(props) {
        super(props);
        new ApiLoginLogsAction().fly();
        this.state = {
            copied:false,
            copyErr:false,
        }
    }
    componentDidMount(){
        new ApiLoginLogsAction().fly();
    }
    // 最后次登录时间
    renderLoginTime() {
        if(this.props.user.LastLoginTime){
            return this.props.user.LastLoginTime.replace("T"," ");
        }
        
    }
    // 复制代码
    copyCode(){
        var Url2=document.getElementById("recommendCode");
        Url2.select();
        try{
            if(document.execCommand('copy', false, null)){
                document.execCommand("Copy");
                this.setState({
                    copied:true
                })
            }
        } catch(err){
            this.setState({
                copyErr:true
            })
        }
    }

    render() {
        const options = window.r.props('MemberCenterRouter');
        return (
            <div>
                <div className="header">账户概况</div>
                <div className="maincontent">
                    <div className="title">个人信息</div>               
                    <div className="top">
                        <div className="leftside_inpt float_left">
                            <div className="lbl float_left">我的账号:</div>
                            <div className="input float_left"><span>{this.props.user.username}</span></div>
                        </div>
                        {this.props.user.email && !options.hideInfo ?
                            <div className="rightside_inpt float_right">
                                <div className="lbl float_left">邮箱:</div>
                                <div className="input float_left"><input type="text" value={this.props.user.email} className="editable" readOnly/></div>
                                <div className="clearfix"></div>
                            </div>:null
                        }
                        {this.props.user.realName && !options.userName ?null:
                            <div className="rightside_inpt float_right">
                                <div className="lbl float_left">会员姓名:</div>
                                <div className="input float_left"><input type="text" value={this.props.user.realName} className="editable" readOnly/></div>
                                <div className="clearfix"></div>
                            </div>
                        }
                        <div className="clearfix"></div>
                        <div className="leftside_inpt float_left">
                            <div className="lbl float_left">我的等级:</div>
                            <div className="input float_left">{this.props.user.userLevelName}</div>
                        </div>
                        {this.props.user.qq && !options.hideInfo ?
                            <div className="rightside_inpt float_right">
                                <div className="lbl float_left">QQ</div>
                                <div className="input float_left"><input type="text" value={this.props.user.qq} className="editable" readOnly/></div>
                                <div className="clearfix"></div>
                            </div>:null
                        }

                        <div className="clearfix"></div>
                        <div className="leftside_inpt float_left">
                            <div className="lbl float_left">上次登录时间:</div>
                            <div className="input float_left"><span>{this.renderLoginTime()}</span></div>
                        </div>
                        <div className="rightside_inpt float_right">
                            <div className="lbl float_left">我的推广地址:</div>
                            <div className="input float_left promoCode"><input   id="recommendCode" value={"https://"+ location.hostname + "/register?channel=" +this.props.user.recommendCode} className="editable" readOnly/></div>
                            <button className="right btn btn-primary float_left copyBtn" onClick={this.copyCode.bind(this)}>复制</button><br/>
                            {this.state.copied?<span style={{color:'red',marginLeft:'5px'}}> 已复制！</span>:null}
                            {this.state.copyErr?<span style={{color:'red',marginLeft:'5px'}}> 复制失败,请改用手动复制！</span>:null}

                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="divider"></div>
                    <div className="bottom">
                        <GamePlatforms/>
                        <div className="clearfix"></div>
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        game: state.game,
        login: state.login
    }
);


export default connect(mapStateToProps, {})(MemberIndexPage);