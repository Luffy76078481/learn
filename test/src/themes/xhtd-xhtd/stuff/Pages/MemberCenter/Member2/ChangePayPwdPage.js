/**
 * xhtd-修改支付密码
 */

import React from 'react';

import {ChangePwdPage} from "./ChangePwdPage";
import {ApiChangePayPwdAction} from "globalAction";

class ChangePayPwdPage extends ChangePwdPage {
    constructor(props) {
        super(props);
        this.title = "修改取款密码";
        this.actionCls = ApiChangePayPwdAction;
    }
}


export default ChangePayPwdPage;