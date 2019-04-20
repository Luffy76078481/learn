import React, {Component} from 'react';
import { browserHistory,Route,Router,IndexRoute } from 'react-router'

/*内页路由地址*/

import PromotionPage from "../../wapGlobal/Pages/PromotionPage/PromotionPage";
import AboutUs from '../../wapGlobal/Pages/AboutUs/AboutUs'
import {wapLogin} from "globalAction";
const isLogin = (params,replace)=>{
    if(!wapLogin(true)) replace('/service'); //弹出登录悬浮窗
}
export default function RequireSelfRouter(){
    const r = window.r;
    return(
        <Route>
            <Route path="/promotion" component={PromotionPage} />
            <Route path="/service">
                <IndexRoute  component={r.get('ServicePage')}/>
                <Route path="feedback" component={r.get('Feedback')} onEnter={isLogin}/>
                <Route path="history" component={r.get('HistoryPage')} onEnter={isLogin}/>
                <Route path="message_letter" component={r.get('MyMessage')}  onEnter={isLogin}/>
                <Route path="message_notice" component={r.get('MyMessage')}/>
                <Route path="aboutUs" component={AboutUs}/>
            </Route>
        </Route>
    )
}