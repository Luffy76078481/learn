/**
 * Created by sobi on 2017/10/13.
 */
import React, {Component} from 'react';
import { browserHistory,Route,Router,IndexRoute } from 'react-router'


// member
import MemberPage from "./page/MemberCenter/MemberFrame";
import MemberIndexPage from "./page/MemberCenter/MemberFirstPage";
import GameHistoryPage from './page/MemberCenter/GameHistoryPage';
import TransferPage from '../../global/Pages/Member/TransferPage';
import MessagePage from './page/MemberCenter/MessagePage';
import EditPassWordPage from './page/MemberCenter/EditPassWordPage';
import WithdrawAndDepositPage from './page/MemberCenter/WithdrawAndDepositPage';
import BindCardPage from "./page/MemberCenter/BindCardPage";
import BindThirdPayPage from "./page/MemberCenter/BindThirdPayPage";
// import DepositPage from "./DepositPage2";




export default function MemberCenterRouter(requireAuth, requireAuthAndBankAccounts) {
    return (
        <Route path="/member" component={MemberPage} onEnter={requireAuth}>
            <Route path="/gameHistory" component={GameHistoryPage} onEnter={requireAuth}/>
            <Route path="/transfer" component={TransferPage} onEnter={requireAuth}/>
            <Route path="/records_message" component={MessagePage}  onEnter={requireAuth}/>
            <Route path="/editPassWord" component={EditPassWordPage} onEnter={requireAuth}/>
            <Route path="/withdrawAndDeposit(/:type)" component={WithdrawAndDepositPage} onEnter={requireAuth}>

            </Route>
            <Route path="/bindCard" component={BindCardPage}  onEnter={requireAuth}/>
            <Route path="/bindThirdPay" component={BindThirdPayPage}  onEnter={requireAuth}/>

            <IndexRoute component={MemberIndexPage}  onEnter={requireAuth}/>
        </Route>
    )
}
