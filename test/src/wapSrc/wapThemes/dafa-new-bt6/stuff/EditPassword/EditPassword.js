import React, { Component } from 'react';
import {NavBar, Icon, InputItem, Toast, List, Modal} from 'antd-mobile';
import {browserHistory} from 'react-router';
import connect from "react-redux/es/connect/connect";
import './EditPassword.scss';


class EditPassword extends Component{
    constructor(props) {
        super(props);
        this.submitStateLock = true;
        this.state={
            type:this.props.routeParams.editType,//如果type为1:修改登录密码,2:修改支付密码
            password:false,
            newPassword:false,
            newPassword2:false,
        }
    }
    onEdit(event){
        event.preventDefault();
        let checknom=0;
        let type= this.state.type;
        let password = this.refs.password.state.value;
        let newPassword =this.refs.newPassword.state.value;
        let newPassword2 = this.refs.newPassword2.state.value;
        if(!password){
            this.setState({
                password:true
            });
            checknom++;
        }
        if(!newPassword || password === newPassword){
            this.setState({
                newPassword:true
            });
            checknom++;
        }
        if(!newPassword2 || newPassword!=newPassword2){
            this.setState({
                newPassword2:true
            });
            checknom++;
        }
        if(checknom!=0){
            return;
        }
        if(!this.submitStateLock) return;
        this.submitStateLock=false;
        Toast.loading('密码修改中,请稍后...');
        if(type==1){
            new window.actions.ApiChangePwdAction (password ,newPassword).fly((respond)=>{
                Toast.hide();
                this.submitStateLock=true;
                if (respond.StatusCode === 0) {
                    Modal.alert('密码修改成功,请重新登录!','',   [
                        {text:'确定',onPress:()=>{
                                new window.actions.LogoutAction().fly();
                                browserHistory.push('/');
                                browserHistory.push('/login');
                            }}]
                    )

                } else {
                    Modal.alert("密码修改失败！", respond.Message);
                }
            });
        }else{
            new window.actions.ApiChangePayPwdAction (password ,newPassword).fly((respond)=>{
                Toast.hide();
                this.submitStateLock=true;
                if (respond.StatusCode === 0) {
                    browserHistory.goBack();
                } else {
                    Modal.alert("密码修改失败！", respond.Message);
                }
            });
        }
    }
    errorInfos(which){
        //旧密码
        if(this.state.password && which=="password"){
            if(this.refs.password.state.value==""){
                Toast.info('请填写旧密码！');
            }else{
                Toast.info('旧密码长度必须为6-12位！')
            }
        }
        //新密码
        if(this.state.newPassword && which=="newPassword"){
            if(this.refs.newPassword.state.value==""){
                Toast.info('请填写新密码！');
            }else if(6>this.refs.newPassword.state.value.length){
                Toast.info('新密码长度必须为6-12位！')
            }else{
                Toast.info('新密码于旧密码不能相同！')
            }
        }
        //确认新密码
        if(this.state.newPassword2 && which=="newPassword2"){
            Toast.info('确认密码与新密码不相符！');
        }
    }
    validateInput(which,val){
        //登陆密码
        if(which =="password"){
            if(val==""|| 6>val.length){
                this.setState({
                    password:true
                })
            }else{
                this.setState({
                    password:false
                });
            }
        }
        //新密码
        if( which=="newPassword"){
            let oldVal = this.refs.password.state.value;
            if(val==""|| 6>val.length || oldVal===val){
                this.setState({
                    newPassword:true
                })
            }else{
                this.setState({
                    newPassword:false
                });
            }
        }
        //确认密码
        if(which =="newPassword2"){
            let oldVal = this.refs.newPassword.state.value;
            if(val=="" ||oldVal!==val){
                this.setState({
                    newPassword2:true
                })
            }else{
                this.setState({
                    newPassword2:false
                });
            }
        }
    }
    render(){
        return(
            <div className="EditPassword">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>browserHistory.goBack()}
                >{this.state.type=="1"?"修改登录密码":"修改支付密码"}</NavBar>
                <div className="scroll-content">
                    <form onSubmit={this.onEdit.bind(this)}>
                        <List className="formCon">
                            <InputItem
                                placeholder="旧密码（必填，长度6到12位）"
                                clear
                                maxLength={12}
                                type="password"
                                ref="password"
                                error={this.state.password}
                                onErrorClick={this.errorInfos.bind(this,'password')}
                                onChange={this.validateInput.bind(this,'password')}
                            >
                                <i className="icon icon-lock"></i>
                            </InputItem>
                            <InputItem
                                placeholder="新密码（必填，长度6到12位）"
                                clear
                                maxLength={12}
                                type="password"
                                ref="newPassword"
                                error={this.state.newPassword}
                                onErrorClick={this.errorInfos.bind(this,'newPassword')}
                                onChange={this.validateInput.bind(this,'newPassword')}
                            >
                                <i className="icon icon-key"></i>
                            </InputItem>
                            <InputItem
                                placeholder="确认新密码"
                                clear
                                maxLength={12}
                                type="password"
                                ref="newPassword2"
                                error={this.state.newPassword2}
                                onErrorClick={this.errorInfos.bind(this,'newPassword2')}
                                onChange={this.validateInput.bind(this,'newPassword2')}
                            >
                                <i className="icon icon-key"></i>
                            </InputItem>
                        </List>
                        <button className="btn">确认修改</button>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
    }
);

export default connect(mapStateToProps)(EditPassword)