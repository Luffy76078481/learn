/**
 * Created by sobi on 2017/10/13.
 */
import React, {Component} from 'react';
import { browserHistory,Route,Router,IndexRoute } from 'react-router'



// import PreferencesPage from "/../modules/PreferencesPage";
// import PersonCenterPage from "/../modules/person_center/PersonCenterPage";
// import PersonInfoPage from "/../modules/person_center/PersonInfoPage";

// member

import MemberPage from "../Member2/MemberFrame";
import MemberIndexPage from "../Member2/MemberFirstPage";
import DepositPage from "../Member2/DepositPage2";
import TransferPage from "../Member2/TransferPage";
import WithdrawPage from "../Member2/WithdrawPage";
import BindCardPage from "../Member2/BindCardPage";
import ChangePwdPage from "../Member2/ChangeLoginPwdPage";
import ChangePayPwdPage from "../Member2/ChangePayPwdPage";
import RecordsPage from "../Member2/RecordsPage";
import BetRecordsPage from "../Member2/BetRecordsPage";
import DepositRecordsPage from "../Member2/DepositRecordsPage";
import TransferRecordsPage from "../Member2/TransferRecordsPage";
import WithdrawRecordsPage from "../Member2/WithdrawRecordsPage";
import MessagePage from "../Member2/MessagePage";

export default function MemberCenterRouter(requireAuth, requireAuthAndBankAccounts) {
    return (

        <Route path="/member" component={MemberPage} onEnter={requireAuth}>
            <Route path="/deposit" component={DepositPage} onEnter={requireAuth}/>
            <Route path="/withdraw" component={WithdrawPage} onEnter={requireAuthAndBankAccounts}/>
            <Route path="/transfer" component={TransferPage} onEnter={requireAuth}/>
            {/*<Route path="/preferences" component={PreferencesPage}  onEnter={requireAuth}/>*/}
            <Route path="/person_bind_card" component={BindCardPage} onEnter={requireAuth}/>
            <Route path="/person_change_pwd" component={ChangePwdPage} onEnter={requireAuth}/>
            <Route path="/person_change_pay_pwd" component={ChangePayPwdPage} onEnter={requireAuth}/>
            {/*<Route path="/person" component={PersonCenterPage} onEnter={requireAuth}>*/}
            {/*<IndexRoute component={PersonInfoPage} onEnter={requireAuth}/>*/}
            {/*</Route>*/}
            <Route path="/message" component={MessagePage}  onEnter={requireAuth}/>
            <Route path="/records" component={RecordsPage}  onEnter={requireAuth}>
                <Route path="/records_transfer" component={TransferRecordsPage}  onEnter={requireAuth}/>
                <Route path="/records_deposit" component={DepositRecordsPage}  onEnter={requireAuth}/>
                <Route path="/records_withdraw" component={WithdrawRecordsPage} onEnter={requireAuth}/>
                <IndexRoute component={BetRecordsPage}  onEnter={requireAuth}/>
            </Route>
            <IndexRoute component={MemberIndexPage}  onEnter={requireAuth}/>
        </Route>
    )
}
