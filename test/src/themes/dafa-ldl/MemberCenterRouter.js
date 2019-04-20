/**
 * Created by sobi on 2017/10/13.
 */
import React, {Component} from 'react';
import { browserHistory,Route,Router,IndexRoute } from 'react-router'



// import PreferencesPage from "/./stuff/modules/PreferencesPage";
// import PersonCenterPage from "/./stuff/modules/person_center/PersonCenterPage";
// import PersonInfoPage from "/./stuff/modules/person_center/PersonInfoPage";

// member
import MemberPage from "./stuff/Member/MemberFrame";
import MemberIndexPage from "./stuff/Member/MemberFirstPage";
import DepositPage from "./stuff/Member/DepositPage2";
import TransferPage from "./stuff/Member/TransferPage";
import WithdrawPage from "./stuff/Member/WithdrawPage";
import BindCardPage from "./stuff/Member/BindCardPage";
import ChangePwdPage from "./stuff/Member/ChangeLoginPwdPage";
import ChangePayPwdPage from "./stuff/Member/ChangePayPwdPage";
import RecordsPage from "./stuff/Member/RecordsPage";
import BetRecordsPage from "./stuff/Member/BetRecordsPage";
import DepositRecordsPage from "./stuff/Member/DepositRecordsPage";
import TransferRecordsPage from "./stuff/Member/TransferRecordsPage";
import WithdrawRecordsPage from "./stuff/Member/WithdrawRecordsPage";
import MessagePage from "./stuff/Member/MessagePage";

export default function MemberCenterRouter(requireAuth, requireAuthAndBankAccounts) {
    return (
        <Route path="/member" component={MemberPage} onEnter={requireAuth}>
            <Route path="/deposit" component={DepositPage} onEnter={requireAuth}/>
            <Route path="/withdraw" component={WithdrawPage} onEnter={requireAuthAndBankAccounts}></Route>
            <Route path="/bindCard" component={BindCardPage}  onEnter={requireAuth}/>
            <Route path="/transfer" component={TransferPage} onEnter={requireAuth}/>
            {/*<Route path="/preferences" component={PreferencesPage}  onEnter={requireAuth}/>*/}
            <Route path="/person_bind_card" component={BindCardPage} onEnter={requireAuth}/>
            <Route path="/person_change_pwd" component={ChangePwdPage} onEnter={requireAuth}/>
            <Route path="/person_change_pay_pwd" component={ChangePayPwdPage} onEnter={requireAuth}/>
            {/*<Route path="/person" component={PersonCenterPage} onEnter={requireAuth}>*/}
            {/*<IndexRoute component={PersonInfoPage} onEnter={requireAuth}/>*/}
            {/*</Route>*/}
            <Route path="/records" component={RecordsPage}  onEnter={requireAuth}>
                <Route path="/records_transfer" component={TransferRecordsPage}  onEnter={requireAuth}/>
                <Route path="/records_deposit" component={DepositRecordsPage}  onEnter={requireAuth}/>
                <Route path="/records_withdraw" component={WithdrawRecordsPage} onEnter={requireAuth}/>
                <Route path="/records_message" component={MessagePage}  onEnter={requireAuth}/>
                <IndexRoute component={BetRecordsPage}  onEnter={requireAuth}/>
            </Route>
            <IndexRoute component={MemberIndexPage}  onEnter={requireAuth}/>
        </Route>
    )
}
