/**
 * xhtd-修改登录密码
 */

import React from 'react';

import {ChangePwdPage} from "./ChangePwdPage";
import {ApiChangePwdAction} from "globalAction";

class ChangeLoginPwdPage extends ChangePwdPage {
    constructor(props) {
        super(props);
        this.title = "修改登录密码";
        this.actionCls = ApiChangePwdAction;
    }
}


export default ChangeLoginPwdPage;