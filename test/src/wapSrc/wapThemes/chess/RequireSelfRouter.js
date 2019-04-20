import React, {Component} from 'react';
import { browserHistory,Route,Router,IndexRoute } from 'react-router'
/*内页路由地址*/
import {wapAuth} from "globalAction";
const isLogin = (params,replace)=>{
    if(!wapAuth()) replace('/login');
}
export default function RequireSelfRouter(){
    const r = window.r;
    return(
        // <Route path="gameFrame" component={r.get('GameFrame')}>
        //     <Route path="chess" component={r.get('Chess')}  onEnter={isLogin}/>
        //     <Route path="mermaid" component={r.get('Mermaid')} onEnter={isLogin}/>
        //     <Route path="multiplayer" component={r.get('Multiplayer')} onEnter={isLogin}/>
        //     <Route path="sports" component={r.get('Sports')}  onEnter={isLogin}/>
        //     <Route path="live" component={r.get('Live')}  onEnter={isLogin}/>
        //     <Route path="arcadeVideo" component={r.get('ArcadeVideo')}  onEnter={isLogin}/>
        // </Route>
        <Route>
            <Route path="/bgchange" component={r.get('BgChange')}  onEnter={isLogin}/>
        </Route>  
    )
}
