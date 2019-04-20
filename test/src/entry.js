// require("./plugin/libs/bootstrap/3.3.5/");
import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from 'configureStore';
import {config} from "../config/config";
import {requirement} from "../config/requirementConfig"
import * as cache from "./store/CacheHelper";
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as actions from "globalAction";
import * as configHelper from "../config/config_helper";
import "./style/index.scss";
//框架全局css

window.Promise = Promise;//解决IE下Promise报错 【1.install babel-runtime和babel-plugin-transform-runtime 2.添加在主页之前添加window.Promise = Promise】

injectTapEventPlugin();

const store = configureStore();

init();

function init() {
    
    var protocol = location.protocol, hostname = location.hostname, pathname = location.pathname, needRelocation = false;
    if(config.spec.indexOf("-bt6")==-1 && config.spec.indexOf("-ldl")==-1 &&  protocol == "http:" && !window.useHttp && location.hostname.indexOf("test") == -1 && location.port != "8080"){
        protocol = "https:";
        needRelocation = true;
    }

    if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) && hostname.indexOf("m.") != 0){
        hostname = "m." + hostname.replace("www.", "");
        needRelocation = true;
    }
    if(window.navHosts && window.navHosts.indexOf(location.hostname.replace("www.","").replace("m.", "")) > -1){
        pathname = "/nav.html";
        needRelocation = true;
    }
    if(needRelocation){
        location.href = protocol+"//"+hostname + pathname + location.search;
        return false;
    }

    document.title = config.title;
    window.store = store;
    window.config = config;
    window.configHelper = configHelper;
    window.actions = actions;
    window.cache = cache;
    const history = syncHistoryWithStore(browserHistory, store);
    let referer = getUrlParam("referer");
    if(referer){
        cache.set("referer", referer);
    }


    function loop() {
        let state = store.getState();
        if (state.user && state.user.token) {
            new actions.ApiSitemsgUnreadCountAction().fly();
        }
        //（因为都是假数据建议业务代码中自己造吧）
        // new actions.ApiRealtimeStatAction().fly();
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
        new actions.LoadBackConfigsAction().fly(resp=>{
            if (resp.StatusCode == 0) {
                if (resp.SiteStatus == false) {//是否跳转網站维护中
                    location.href = "/maintainPage.html";
                }
            }
        })
        if (state.user.token) {
            // new actions.ApiLoginLogsAction().fly();//登录日志.net没有的API
            new actions.ApiPlayerInfoAction().fly((resp) => {
                if (resp.StatusCode == '-1') {
                    new actions.LogoutAction().fly();
                } else if (resp.StatusCode == 0) {
                    new actions.ApiBankAccountsAction().fly();
                    new actions.ApiPayBanksAction().fly();

                }
            });
        }
        new actions.ApiAllSysConfigAction().fly(resp=>{
            if(resp.StatusCode == 0 && resp.Config['statistics_script']){
                $("body").append(resp.Config['statistics_script']);
            }
        })
        new actions.ApiCheckIpAction().fly(resp=>{
            if(resp.StatusCode ==1021){
                //非法访问 跳转noService页面
                // sessionStorage.setItem("serIP",resp.Message)
                location.href = "/NoServicePage.html";
            }
        });
        new actions.ApiNoticeAction().fly();

        new actions.ApiPcGameCategoriesAction().fly();
        new actions.ApiQueryPromotionTypesAction().fly();
        new actions.ApiLoadCasinoViewsAction().fly();

        new actions.ApiGamePlatformsAction().fly();

        new actions.ApiBanksAction().fly();
        if(window.cache.get("user")){
            //如果登录了才访问用户的银行信息以及所有银行信息
            new actions.ApiOfflineAccountsAction().fly();
            new actions.ApiGamePlatformAllBalanceAction().fly();
        }
        
        new actions.ApiQuerySportGamesAction().fly();
        new actions.ApiQueryBingoGamesAction().fly();
        new actions.ApiQueryTabGamesAction().fly();
        new actions.ApiQueryAgGamesAction().fly();
        
        loop();
    })();

    store.subscribe(() => {
        var getState = store.getState;
        var dispatch = store.dispatch;
        actions.setStorage(dispatch, getState);
    });
    function requireAuth(nextState, replace) {
        let state = store.getState();
        if (!state.user || !state.user.token) {
            replace({
                pathname: '/'
            });
            window.swal('无权限访问','您未登录，请从首页登录','error');
        }
    }

    function requireAuthAndBankAccounts(nextState, replace) {
        let state = store.getState();
        if (!state.user || !state.user.token) {
            replace({
                pathname: '/'
            });
            window.swal('无权限访问','您未登录，请从首页登录','error');
        }
        if (!state.user.bankAccounts || state.user.bankAccounts.length === 0) {
            if(config.webSiteTag&&!config.IsLDL){
                window.swal({
                    title: "无法取款",
                    text: "因没有绑定取款信息，需完善个人取款信息即可执行取款操作",
                    confirmButtonColor: "#c5841f",
                    confirmButtonText: "绑定银行卡",
                    showCancelButton: true,
                    cancelButtonText: "绑定支付宝、微信",
                },
                (isClick)=>{
                    if(isClick){
                        browserHistory.push("/bindCard")
                    }else{
                        browserHistory.push("/bindThirdPay")
                    }
                });
            }else{
                window.swal({
                    title: "无法取款",
                    text: "因没有绑定取款信息，需完善个人取款信息即可执行取款操作",
                    confirmButtonColor: "#c5841f",
                    confirmButtonText: "关闭"
                },
                ()=>{
                        browserHistory.push("/person_bind_card")
                }
                );
            }
            
            return;
        }

        if (!state.user.verfyPhone&&config.webSiteTag&&state.backConfigs.IsBindingPhone&&!config.IsLDL) {
            window.swal({
                title: "无法取款",
                text: "因为没有验证手机号码，需验证手机号码即可执行取款操作",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "手机验证",
                showCancelButton: true,
                cancelButtonText: "关闭",
            },
            ()=>{
                document.getElementById("shwoPhone").click();
                // browserHistory.push("/member?phone=true");
            });
        }
    }
    let CusRouter =  requirement.get("Router");
        render(
            <CusRouter store={store} history={history} requireAuth={requireAuth}
                       requireAuthAndBankAccounts={requireAuthAndBankAccounts}></CusRouter>,
            document.getElementById('root')
        );
}
