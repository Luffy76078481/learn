/**
 * Created by jamen on 2017/4/30.
 */

import React from 'react';

import {ChangePwdComponent} from "./ChangePwdComponent";
import {ApiChangePwdAction} from "../../../../actions/index";

class ChangeLoginPwdComponent extends ChangePwdComponent {
    constructor(props) {
        super(props);
        this.title = "登录";
        this.actionCls = ApiChangePwdAction;
    }
}


export default ChangeLoginPwdComponent;