/**
 * Created by jamen on 2017/4/30.
 */

import React from 'react';

import {ChangePwdPage} from "./ChangePwdPage";
import {ApiChangePayPwdAction} from "globalAction";

class ChangePayPwdPage extends ChangePwdPage {
    constructor(props) {
        super(props);
        this.title = "支付";
        this.actionCls = ApiChangePayPwdAction;
    }
}


export default ChangePayPwdPage;