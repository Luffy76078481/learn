/**
 * Created by sobi on 2017/10/13.
 */
import React, {Component} from 'react';
import { browserHistory,Route,Router,IndexRoute } from 'react-router'



// import PreferencesPage from "/./stuff/modules/PreferencesPage";
// import PersonCenterPage from "/./stuff/modules/person_center/PersonCenterPage";
// import PersonInfoPage from "/./stuff/modules/person_center/PersonInfoPage";

// member
import MemberPage from "./MemberFrame";
import MemberIndexPage from "./MemberFirstPage";
import DepositPage from "./DepositPage2";
import TransferPage from "./TransferPage";
import WithdrawPage from "./WithdrawPage";
import BindCardPage from "./BindCardPage";
import BindThirdPayPage from "./BindThirdPayPage";
import ChangePwdPage from "./ChangeLoginPwdPage";
import ChangePayPwdPage from "./ChangePayPwdPage";
import RecordsPage from "./RecordsPage";
import BetRecordsPage from "./BetRecordsPage";
import DepositRecordsPage from "./DepositRecordsPage";
import TransferRecordsPage from "./TransferRecordsPage";
import WithdrawRecordsPage from "./WithdrawRecordsPage";
import MessagePage from "./MessagePage";

export default function MemberCenterRouter(requireAuth, requireAuthAndBankAccounts) {
    return (
        <Route path="/member" component={MemberPage} onEnter={requireAuth}>
            <Route path="/deposit" component={DepositPage} onEnter={requireAuth}/>
            <Route path="/withdraw" component={WithdrawPage} onEnter={requireAuthAndBankAccounts}></Route>
            <Route path="/bindCard" component={BindCardPage}  onEnter={requireAuth}/>
            <Route path="/bindThirdPay" component={BindThirdPayPage}  onEnter={requireAuth}/>
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
