import React, { Component } from 'react';
import {NavBar, Icon, List, Switch,Toast,Modal} from 'antd-mobile';
import {browserHistory,Link} from 'react-router';
import connect from "react-redux/es/connect/connect";
import * as cache from "CacheHelper";

class SettingPage extends Component{
    constructor(props) {
        super(props);
        this.state={
            checked:cache.get('setting')
        }
    }
    componentWillMount(){
    }
    submit(){
        Toast.loading('设置保存中...');
        cache.set('setting',this.state.checked);
        setTimeout(()=>{
            Toast.hide();
            Modal.alert('设置保存成功!','',[{text:'确定',onPress:()=> window.wapHistoryType.goBack()}])
        },500)
    }
    render(){
        return(
            <div className="SettingPage">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.goBack()}
                >偏好设置</NavBar>
                <div className="scroll-content">
                    <List>
                         <List.Item
                            extra={<Switch
                                checked={this.state.checked}
                                onChange={() => {
                                    this.setState({
                                        checked: !this.state.checked,
                                    });
                                }}
                            />}
                        >自动转账</List.Item>
                    </List>
                    <button onClick={this.submit.bind(this)} className="btn">提交</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
    }
);

export default connect(mapStateToProps)(SettingPage)