/**
 * Created by jamen on 2017/4/30.
 */

import React from 'react';

import {ChangePwdComponent} from "./ChangePwdComponent";
import {ApiChangePayPwdAction} from "../../../../actions/index";

class ChangePayPwdComponent extends ChangePwdComponent {
    constructor(props) {
        super(props);
        this.title = "支付";
        this.actionCls = ApiChangePayPwdAction;
    }
}


export default ChangePayPwdComponent;