import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Icon} from 'antd';
import {Link,IndexLink} from 'react-router';
import ChangePayPwdComponent from './ChangePayPwdComponent';
import ChangeLoginPwdComponent from './ChangeLoginPwdComponent';
class EditPassWordPage extends Component {
    render(){
        return(
            <div className="reportWrapper">
                <div className="row">
                    <div className="col-md-6" style={{padding:'0 80px'}}>
                        <h2 className="title">修改登录密码</h2>
                        <ChangeLoginPwdComponent></ChangeLoginPwdComponent>
                    </div>
                    <div className="col-md-6" style={{padding:'0 80px'}}>
                        <h2 className="title">修改支付密码</h2>
                        <ChangePayPwdComponent></ChangePayPwdComponent>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {

    }
);

export default connect(mapStateToProps) (EditPassWordPage);