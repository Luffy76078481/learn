/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
class PersonInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            loadAmount:false,
            closeCloud:false,
            webName:window.location.host,
            showPhone:true,
            clickFlag:false,
            submitFlag:false,
            timeInter:null,
            sendButtonMes:"获取",
        }
    }
    getPhoneCode(e){
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(this.props.user.phone)) {
            window.swal("错误", "手机号码错误，请联系在线客服");
            return;
        }
        if(this.state.clickFlag)return;
        this.state.clickFlag = true;
        if(this.state.timeInter){
            clearInterval(this.state.timeInter);
            this.state.timeInter = null;
        }
        new window.actions.ApiSendMobileVCodeAction().fly((resp)=>{
            if(resp.StatusCode === 0){
                // window.swal("成功", "发送成功，请注意查收，今日还可发送短信"+resp.RemainCount+"次");
                window.swal("成功", "发送成功，请注意查收");
                this.state.timeInter = setInterval(()=>{
                    if(this.state.sendButtonMes==1){
                        this.setState({sendButtonMes:"获取"})
                        this.state.clickFlag = false; 
                        clearInterval(this.state.timeInter);
                        this.state.timeInter = null;
                        return;
                    }else{
                        if(typeof this.state.sendButtonMes ==="string"){
                            this.setState({sendButtonMes:60}) 
                        }else{
                            this.setState({sendButtonMes:this.state.sendButtonMes-1}) 
                        }
                    }
                },1000)
                
            }else{
                window.swal("错误", resp.Message);
                this.state.clickFlag = false;
            }
            
        })
    }
    onSubmitPhone(e){
        let inputVCode = this.refs.inputVCode.value;
        if(!inputVCode){
            window.swal("错误", "验证码不能为空");
            return;
        }
       
        if(this.state.submitFlag)return;
        this.state.submitFlag = true;
        new window.actions.ApiValidatePhoneAction(this.props.user.phone,inputVCode).fly((resp)=>{
            if(resp.StatusCode === 0){
                $("#PhoneModalClose").trigger('click');
                new window.actions.ApiPlayerInfoAction().fly();
                window.swal("成功", "恭喜验证成功，现在您可以进行提款"); 
            }else{
                window.swal("错误", resp.Message); 
            }
            this.state.submitFlag = false;
        });
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    render() {
        const options = window.r.props('MemberCenterRouter');

        return (
            <div className="c">
                <form action="#">
                    <table className="ht-fktable f14" width="100%">
                        <tbody><tr>
                            <td width="35%" className="tr">用户名：</td>
                            <td width="65%">
                                <input type="text" className="input w238 member-input" disabled="disabled" value={this.props.user.username} />
                            </td>
                        </tr>
                        <tr>
                            <td width="35%" className="tr">真实姓名：</td>
                            <td width="65%">
                                <input type="text" className="input w238 member-input" disabled="disabled" value={this.props.user.realName} />
                            </td>
                        </tr>
                        {!options.hideUserInfo?
                        <tr>
                            <td width="35%" className="tr">手机号码：</td>
                            <td width="65%">

                                <input type="text" className="input w238 member-input" disabled="disabled" value={this.props.user.phone} />
                                { this.props.user.verfyPhone?
                                <a className="validate">验证通过</a>:
                                <a className="validate"  style={{background:"#cf271e"}} id="shwoPhone" title="手机验证" data-toggle="modal" data-target="#bindPhoneModal" >尚未验证</a>
                                }
                                
                            </td>
                        </tr>:null}
                        {!options.hideUserInfo?
                        <tr>
                            <td width="35%" className="tr">电子邮件：</td>
                            <td width="65%">
                                <input type="text" className="input w238 member-input" disabled="disabled" value={this.props.user.email} />
                            </td>
                        </tr>:null}
                        {!options.hideUserInfo?
                        <tr>
                            <td width="35%" className="tr">QQ号码：</td>
                            <td width="65%">
                                <input type="text" className="input w238 member-input" disabled="disabled" value={this.props.user.qq} />
                            </td>
                        </tr>:null}
                        </tbody></table>
                </form>
                {/*手机短信验证弹框*/}
                <div id="bindPhoneModal" className="modal fade" role="dialog">
                        <div className="modal-backdrop fade"></div>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    &nbsp;&nbsp;手机短信验证
                                    <button type="button" id="PhoneModalClose" className="close" data-dismiss="modal">
                                        <i className="fa fa-close"></i>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="forms">
                                        <div className="hlder">
                                            <div className="lbl">手机号码：</div>
                                            <div className="custinput">
                                                <input type="number" disabled value={this.props.user.phone}/>
                                            </div>
                                            <div className="lbl yzm">验证码:</div>
                                            <div className="custinputt">
                                                <input className="vailacode" ref="inputVCode" type="number" placeholder="请输入验证码"/>
                                                <input className="getcode" type="button" onClick={this.getPhoneCode.bind(this)} value={this.state.sendButtonMes}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="custbtn">
                                        <button onClick={this.onSubmitPhone.bind(this)} type="submit">确定</button>
                                    </div>
                                    <a className="lxzzkf" onClick={this.serversOpen.bind(this)}>联系在线客服</a>
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
        user: state.user
    }
);

export default connect(mapStateToProps, {})(PersonInfoPage);