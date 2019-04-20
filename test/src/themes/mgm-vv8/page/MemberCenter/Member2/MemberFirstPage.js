/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import GamePlatforms from "./GamePlatforms";

class MemberIndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copied:false,
            copyErr:false,
        }
    }

    renderLoginTime() {
        if (this.props.user.LastLoginTime) {
            return this.props.user.LastLoginTime.replace('T',' ');
        }
        return "";
    }

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
                    <div className="title">我的信息</div>

                    <div className="top">
                        <div className="leftside_inpt float_left">
                            <div className="lbl float_left">我的账号:</div>
                            <div className="input float_left"><span>{this.props.user.username}</span></div>
                        </div>
                        {this.props.user.email && !options.hideInfo ?
                            <div className="rightside_inpt float_right">
                                <div className="lbl float_left">邮箱:</div>
                                <div className="input float_left"><input type="text" value={this.props.user.email}
                                                                         className="editable" readOnly/>
                                    {/*<button className="edit"><img className="edit" alt=""/></button>*/}
                                </div>
                                <div className="clearfix"></div>
                            </div>:null
                        }
                        {this.props.user.realName && !options.userName ?null:
                            <div className="rightside_inpt float_right">
                                <div className="lbl float_left">会员姓名:</div>
                                <div className="input float_left"><input type="text" value={this.props.user.realName}
                                                                         className="editable" readOnly/>
                                    {/*<button className="edit"><img className="edit" alt=""/></button>*/}
                                </div>
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
                                <div className="input float_left"><input type="text" value={this.props.user.qq}
                                                                         className="editable" readOnly/>
                                    {/*<button className="edit"><img className="edit" alt=""/></button>*/}
                                </div>
                                <div className="clearfix"></div>
                            </div>:null
                        }

                        <div className="clearfix"></div>
                        <div className="leftside_inpt float_left">
                            <div className="lbl float_left">最后一次登录:</div>
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

                    <div>
                        <GamePlatforms/>
                        <div className="clearfix"></div>
                        {/*<div className="divider"></div>*/}
                        {/*<div className="gamerec">*/}
                            {/*<div className="title">游戏记录</div>*/}
                            {/*<div className="table-responsive">*/}
                                {/*<table className="table table-bordered">*/}
                                    {/*<thead>*/}
                                    {/*<tr>*/}
                                        {/*<th>上次游戏</th>*/}
                                        {/*<th>上次登录时间</th>*/}
                                        {/*<th>上周有效投注</th>*/}
                                        {/*<th>本周有效投注</th>*/}
                                    {/*</tr>*/}
                                    {/*</thead>*/}
                                    {/*<tbody>*/}
                                    {/*<tr>*/}
                                        {/*<td>PT：钢铁侠</td>*/}
                                        {/*<td>2016-08-30 13：32</td>*/}
                                        {/*<td> 3，030</td>*/}
                                        {/*<td> 1，2213</td>*/}
                                    {/*</tr>*/}
                                    {/*</tbody>*/}
                                {/*</table>*/}
                            {/*</div>*/}
                        {/*</div>*/}
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
        game: state.game
    }
);


export default connect(mapStateToProps, {})(MemberIndexPage);