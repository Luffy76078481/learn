import React,{Component} from 'react';
import {Badge,Modal,Toast,NavBar,Icon} from 'antd-mobile';
import {config} from 'globalConfig';
import {Link, BrowserHistory, browserHistory} from "react-router";
import {ApiSignInAction,ApiSignContinueDaysAction} from "globalAction";
import connect from "react-redux/es/connect/connect";
import './SignIn.scss';

class SignInPage extends Component{
    constructor(props) {
        super(props);
        this.state={
            days: 0,
            isSignIn: false
        }
    }

    componentWillMount() {
        new ApiSignContinueDaysAction().fly(resp => {
            if(resp.StatusCode === 0) {
                this.setState({
                    days: resp.Days,
                    isSignIn: resp.IsSign
                })
            }
        })
    }

    signIn = () => {
        Toast.loading('签到中,请稍后...');
        new ApiSignInAction().fly(resp => {
            Toast.hide();
            if(resp.StatusCode === 0) {
                Modal.alert('恭喜您签到成功');
                this.setState({
                    isSignIn: true
                })
            }else {
                Modal.alert('提示',resp.Message)
            }
        });
    }

    render() {
        return (
            <div className="signInPage">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={"返回"}
                    onLeftClick={browserHistory.goBack}
                >
                    <Link to="/" className={"logo"} />
                </NavBar>
                <h2>签到有礼</h2>
                <table>
                    <thead>
                        <tr>
                            <th>连续签到天数</th>
                            <th>优惠详情</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                第一天
                                {this.state.days >= 1 && <Badge text="已签"/>}
                            </td>
                            <td>单笔充值500元+享彩金38元</td>
                        </tr>
                        <tr>
                            <td>
                                第二天
                                {this.state.days >= 2 && <Badge text="已签"/>}
                            </td>
                            <td>单笔存送优惠10%（8倍流水）</td>
                        </tr>
                        <tr>
                            <td>
                                第三天
                                {this.state.days >= 3 && <Badge text="已签"/>}
                            </td>
                            <td>享受1.1倍返水</td>
                        </tr>
                        <tr>
                            <td>
                                第四天
                                {this.state.days >= 4 && <Badge text="已签"/>}
                            </td>
                            <td>大转轮3次抽奖机会</td>
                        </tr>
                        <tr>
                            <td>
                                第五天
                                {this.state.days >= 5 && <Badge text="已签"/>}
                            </td>
                            <td>老虎机彩金388元</td>
                        </tr>
                        <tr>
                            <td>
                                第六天
                                {this.state.days >= 6 && <Badge text="已签"/>}
                            </td>
                            <td>享受1.2倍返水</td>
                        </tr>
                        <tr>
                            <td>
                                第七天
                                {this.state.days >= 7 && <Badge text="已签"/>}
                            </td>
                            <td>单笔充值5000元+享彩金188元</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2}>
                                点击签到后会有签到成功提示，签到活动计算时间为美东时间，连续第8天签到即重新使用第一天签到优惠。充值存送优惠需联系在线客服领取。
                            </td>
                        </tr>
                    </tfoot>
                </table>
                {
                    this.state.isSignIn ? (
                        <button className="signInBtn disabled">您已签到</button>
                    ) : (
                        <button className="signInBtn" onClick={this.signIn}>我要签到</button>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => (
    {
        user: state.user
    }
);

export default connect(mapStateToProps)(SignInPage)