import React, {Component} from 'react';
import { browserHistory,Route,Router,IndexRoute } from 'react-router'

/*内页路由地址*/
import ChessMerge   from "./page/ChessMerge";
import FanyaEs      from "./stuff/FanyaEs";
export default function RequireSelfRouter(){
    return(
        <Route>
            <Route path="/chessmerge" component={ChessMerge} />                
            <Route path="/fyes" component={FanyaEs} />                
        </Route>
    )
}