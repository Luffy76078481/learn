import React, {Component} from 'react';
import { browserHistory,Route,Router,IndexRoute } from 'react-router'

/*内页路由地址*/

import GameDescription from "./page/CasinoPage/gameDescription/GameDescription";//游戏介绍页面
import AboutUs from "./page/Introduce/AboutUs/AboutUs"
import ContactUs from "./page/Introduce/ContactUs/ContactUs";
import TermsConditions from './page/Introduce/TermsConditions/TermsConditions'//服务条款
import Privacy from './page/Introduce/Privacy/Privacy'
import Responsible from './page/Introduce/Responsible/Responsible'
import Disclaimer from './page/Introduce/Disclaimer/Disclaimer'
import Gamerules from './page/Introduce/Gamerules/Gamerules'
import FAQ from './page/Introduce/FAQ/FAQ';
export default function RequireSelfRouter(){
    return(
        <Route>
            <Route path="/gameDescription(/:PlatformIds)" component={GameDescription} />
            <Route path="/AboutUs" component={AboutUs} />
            <Route path="/ContactUs" component={ContactUs} />
            <Route path="/TermsConditions" component={TermsConditions} />
            <Route path="/Privacy" component={Privacy} />
            <Route path="/Responsible" component={Responsible} />
            <Route path="/Disclaimer" component={Disclaimer} />
            <Route path="/Gamerules" component={Gamerules} />
            <Route path="/FAQ" component={FAQ} />
        </Route>
    )
}