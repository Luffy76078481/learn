import React, { Component } from 'react';
import {Badge, Modal, Toast} from 'antd-mobile';
import {config} from "globalConfig";
import {ApiSignInAction,ApiSignContinueDaysAction} from "globalAction";
import connect from "react-redux/es/connect/connect";
import './SignInPage.scss';
class SignInPage extends Component {
    constructor(props){
        super(props)
        this.state={
            days:0,
            isSignIn:false
        }

    }
    componentWillMount(){
        new ApiSignContinueDaysAction().fly(resp=>{
            if(resp.StatusCode ===0) {
                this.setState({
                    days:resp.Days,
                    isSignIn:resp.IsSign
                })
            }
        });
    }
    singIn(){
        Toast.loading('签到中,请稍后...');
        new ApiSignInAction().fly((resp)=>{
            Toast.hide();
            if(resp.StatusCode ===0) {
                Modal.alert('恭喜您签到成功！')
            }else{
                Modal.alert('错误！',resp.Message)
            }
        });
    }
    render(){
        return(
            <div className={"signInPage"}>
               <h2>签到有礼</h2>
                <table>
                    <thead>
                        <tr>
                            <th style={{"width":"2.5rem"}}>连续签到天数</th>
                            <th >领取彩券</th>
                            <th>激活额度</th>
                            <th>流水要求</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td >
                                第一天
                                {this.state.days>=1 && <Badge text="已签"/>}
                            </td>
                            <td>30元</td>
                            <td>188</td>
                            <td>8倍</td>
                        </tr>
                        <tr>
                            <td>第二天
                                {this.state.days>=2 && <Badge text="已签"/>}
                            </td>
                            <td>60元</td>
                            <td>388</td>
                            <td>8倍</td>
                        </tr>
                        <tr>
                            <td>第三天  {this.state.days>=3 && <Badge text="已签"/>}
                            </td>
                            <td>120元</td>
                            <td>888</td>
                            <td>8倍</td>
                        </tr>
                        <tr>
                            <td>第四天 {this.state.days>=4 && <Badge text="已签"/>}</td>
                            <td>360元</td>
                            <td>2388</td>
                            <td>8倍</td>
                        </tr>
                        <tr>
                            <td>第五天 {this.state.days>=5 && <Badge text="已签"/>}</td>
                            <td>666元</td>
                            <td>5688</td>
                            <td>8倍</td>
                        </tr>
                        <tr>
                            <td>第六天 {this.state.days>=6 && <Badge text="已签"/>}</td>
                            <td>888元</td>
                            <td>7666</td>
                            <td>8倍</td>
                        </tr>
                        <tr>
                            <td>第七天 {this.state.days>=7 && <Badge text="已签"/>}</td>
                            <td>999元</td>
                            <td>8888</td>
                            <td>8倍</td>
                        </tr>
                    </tbody>
                   
                </table>
                <h3>申请方式：</h3>
                 <div className="detailText">  
                 1. 签到天数每周为一个周期：自然周的周一（中午12:00）至下周一（中午11:59)，每天只能领取彩券一个，一周期内只能按照顺序联系在线客服领取,不能跨天领取。<br/>
                 2. 激活额度为账户内余额，会员领取彩券必须账户内的激活额度大于等于活动要求的额度，否则无法进行派发彩券。<br/>
                 3. 活动流水要求计算：（激活额度+彩券金额）*8倍
                 </div>
                {this.state.isSignIn?(
                    <button className={"signInBtn disabled"}>您已签到</button>
                ):(
                    <button className={"signInBtn"} onClick={this.singIn.bind(this)}>我要签到</button>
                )}

            </div>
        )
    }
}
const mapStateToProps = (state)=>(
    {
        user:state.user
    }
);
export default connect(mapStateToProps)(SignInPage)