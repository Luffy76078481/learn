/**
 * Created by xm on 2017/5/14.
 */
import {config} from "globalConfig";
import {_getState} from "globalAction";


export function getGamePlayLink(gameId, tryPlay) {
    var state = _getState();
    tryPlay = tryPlay || false;
    var autoTransfer = state.systemConfig.autoTransfer || false;
    var token = state.user && state.user.token || "";
    return config.apiPath + "play.html?gameId=" + gameId + "&token=" + token
        + "&platform=PC&tryPlay=" + tryPlay+"&transferFlag="+autoTransfer;
}

export function getPromotionUrl() {
    var promotionUrl = config.promotionUrl;
    if (window.channel) {
        promotionUrl += "?channel=" + window.channel;
    }
    return promotionUrl;
}
export function getPromotionUrlQRCode() {
    var loc = location.href;
    var i = loc.indexOf("/", 9);
    var webHost = loc.substr(0, i);
    var link = webHost + getPromotionUrl();
    return "/api/v0/qcode.png?code=" + encodeURIComponent(link);
}
export function formatTime(timeStr) {
    return timeStr;
    // if (!timeStr) {
    //     return "";
    // }
    // var t = Date.parse(timeStr);
    // if (!t) {
    //     return timeStr;
    // }
    // let d = new Date(t);
    // let dt = d.getTime();
    // if(window.config.timezone.indexOf("美东") != -1){
    //     dt = dt + (d.getTimezoneOffset() - 4*60)*60*1000;
    // }
    // return new Date(dt).format("yyyy/MM/dd hh:mm:ss");
}