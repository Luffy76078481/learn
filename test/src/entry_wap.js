
import React from 'react'
import { render } from 'react-dom'
import { createHistory} from  'history';
import { browserHistory,useRouterHistory,hashHistory  } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from 'configureStore';
import {config} from "../config/config_Wap";
import {requirement} from "../config/requirementWap"
import * as cache from "./store/CacheHelper";
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as actions from "globalAction";
import * as configHelper from "../config/config_helper";
//框架全局css
import "./wapSrc/wapGlobal/style/index.scss";

window.Promise = Promise;//解决IE下Promise报错 【1.install babel-runtime和babel-plugin-transform-runtime 2.添加在主页之前添加window.Promise = Promise】


injectTapEventPlugin();
window.wapHistoryType = config.routerHistoryType?browserHistory:hashHistory;


const store = configureStore();
init();

function init() {
    document.title = config.title;
    window.actions = actions;
    const history = syncHistoryWithStore(window.wapHistoryType, store);

    // window.browserHistory = appHistory;
    let referer = getUrlParam("referer");
    if(referer){
        cache.set("referer", referer);
    }
    //阻止默认
    //document.addEventListener('touchmove', function(event) {
    //event.preventDefault();
    //}, { passive: false});
    function loop() {
        let state = store.getState();
        if (state.user && state.user.token) {
            new actions.ApiSitemsgUnreadCountAction().fly();//未读数量
        }
    }

    setInterval(() => {
        loop();
    }, 60000);

    (function () { // do something init
        actions.setStorage(store.dispatch, store.getState);

        var state = store.getState();
        window.store = store;
        // init user
        var stateUser = cache.get("user") || {};
        state.user = stateUser;
        new actions.LoadBackConfigsAction().fly();
        new actions.ApiCheckIpAction().fly(resp=>{
            if(resp.StatusCode ==1021){
                // if (config.isApp) {
                //     // ▲▲▲▲▲▲调用原生退出应用
                //     document.addEventListener("plusready", ()=>{
                //         window["plus"].runtime.quit();
                //     }, false);
                // }else{
                    //非法访问 跳转noService页面
                    // sessionStorage.setItem("serIP",resp.Message)
                    location.href = "/NoServicePage.html";
                // }
            }
        });
        new actions.ApiImageAction('mobile_home_images').fly();
        new actions.ApiNoticeAction().fly();
        new actions.ApiNoticeAction("app_home_promotion").fly();
        new actions.ApiWapGameCategoriesAction().fly();
        new actions.ApiWapGameCategoriesAction("mobile_home_more").fly();
        new actions.ApiGamePlatformsAction().fly();
        if (state.user.token) {
            new actions.LoginAfterInit();
        }
        new actions.ApiAllSysConfigAction().fly(resp=>{
            if(resp.StatusCode == 0 && resp.Config['statistics_script']){
                $("body").append(resp.Config['statistics_script']);
            }
        })
        loop();
    })();

    store.subscribe(() => {
        var getState = store.getState;
        var dispatch = store.dispatch;
        actions.setStorage(dispatch, getState);
    });

    let CusRouter =  requirement.get("RouterWap");
        render(
            <CusRouter store={store} history={history}></CusRouter>,
            document.getElementById('root')
        );
}
