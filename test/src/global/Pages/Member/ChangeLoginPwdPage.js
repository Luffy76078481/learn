/**
 * Created by jamen on 2017/4/30.
 */

import React from 'react';

import {ChangePwdPage} from "./ChangePwdPage";
import {ApiChangePwdAction} from "../../../actions/index";

class ChangeLoginPwdPage extends ChangePwdPage {
    constructor(props) {
        super(props);
        this.title = "登录";
        this.actionCls = ApiChangePwdAction;
    }
}


export default ChangeLoginPwdPage;