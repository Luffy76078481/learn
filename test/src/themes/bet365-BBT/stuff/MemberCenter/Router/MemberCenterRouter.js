import React, {Component} from 'react';
import { browserHistory,Route,Router,IndexRoute } from 'react-router'

import MemberPage from "../Member1/MemberPage";
import MemberIndexPage from "../Member1/MemberIndexPage";
import DepositPage from "../Member1/DepositPage2";
import WithdrawPage from "../Member1/WithdrawPage";
import TransferPage from "../Member1/TransferPage";
import PreferencesPage from "../Member1/PreferencesPage";
import RecommendPage from "../Member1/RecommendPage";

// person
import PersonCenterPage from "../Member1/person_center/PersonCenterPage";
import PersonInfoPage from "../Member1/person_center/PersonInfoPage";
import ChangePwdPage from "../Member1/person_center/ChangePwdPage";
import ChangePayPwdPage from "../Member1/person_center/ChangePayPwdPage";
import BindCardPage from "../Member1/person_center/BindCardPage";

import MessagePage from "../Member1/MessagePage";
import PreferentialPage from "../Member1/PreferentialPage";
import RecordsPage from "../Member1/records/RecordsPage";
import BetRecordsPage from "../Member1/records/BetRecordsPage";
import TransferRecordsPage from "../Member1/records/TransferRecordsPage";
import DepositRecordsPage from "../Member1/records/DepositRecordsPage";
import WithdrawRecordsPage from "../Member1/records/WithdrawRecordsPage";

export default function MemberCenterRouter(requireAuth, requireAuthAndBankAccounts) {
    return (

        <Route path="/member" component={MemberPage} onEnter={requireAuth}>
            <Route path="/deposit" component={DepositPage} onEnter={requireAuth}/>
            <Route path="/withdraw" component={WithdrawPage} onEnter={requireAuthAndBankAccounts}/>
            <Route path="/transfer" component={TransferPage} onEnter={requireAuth}/>
            <Route path="/preferences" component={PreferencesPage}  onEnter={requireAuth}/>
            <Route path="/person" component={PersonCenterPage} onEnter={requireAuth}>
                <IndexRoute component={PersonInfoPage} onEnter={requireAuth}/>
                <Route path="/person_change_pwd" component={ChangePwdPage} onEnter={requireAuth}/>
                <Route path="/person_change_pay_pwd" component={ChangePayPwdPage} onEnter={requireAuth}/>
                <Route path="/person_bind_card" component={BindCardPage} onEnter={requireAuth}/>
            </Route>
            <Route path="/message" component={MessagePage}  onEnter={requireAuth}/>
            <Route path="/preferential" component={PreferentialPage}  onEnter={requireAuth}/>
            <Route path="/records" component={RecordsPage}  onEnter={requireAuth}>
                <Route path="/records_transfer" component={TransferRecordsPage}  onEnter={requireAuth}/>
                <Route path="/records_deposit" component={DepositRecordsPage}  onEnter={requireAuth}/>
                <Route path="/records_withdraw" component={WithdrawRecordsPage} onEnter={requireAuth}/>
                <IndexRoute component={BetRecordsPage}  onEnter={requireAuth}/>
            </Route>
            <Route path="/RecommendPage" component={RecommendPage}  onEnter={requireAuth}/>
            <IndexRoute component={MemberIndexPage}  onEnter={requireAuth}/>
        </Route>
    )
}
