/*
* 【打包时需要注意的事项：webSiteTag和gameTag的传值规则】
* {
* 【bt6和ldl】业主
* 比如bt6的新濠天地：    webSiteTag = ‘xhtd’    gameTag = 'dafa'
* 比如bt6的威尼斯人：    webSiteTag = ‘vns’    gameTag = 'dafa'
* }
* {
* 【其他业主】
* 比如dbb的大发 ：    webSiteTag = ‘’    gameTag = 'dbb'
* 比如uzi的威尼斯人 ：    webSiteTag = ‘’    gameTag = 'uzi'
* }
    // 大转盘QQ
    {
        xhtd 353427888
        bt6 65555800
        vv8 943427777
    }
    // 弹窗登录的站
    Bt6 xhtd dafa vns
    Ldl Xhtd 
* */
export const config ={
    "webSiteTag":"",//请求除游戏之外接口时传入的tag
    "gameTag":"wy8",//请求游戏相关接口时传入的tag
    "apiPath": "/api/v0/",
    "version": "1.0.0",
    "appName":"棋牌",
    "title":"棋牌demo",
    "devImgUrl":"http://wy8.net.wap.cgtest06.com/",//开发时图片的域名地址，【打包生产时需要清空】
    "isApp":false,
    "isPopupLogin":true, // 判断是否是弹窗登录 弹窗登录的站见上
    //routerHistoryType：【true代表用browserHistory，false代表用：hashHistory】 如要要部署到子目录下例如www.xxxx.com/wap这种情况时把参数改为false
    "routerHistoryType":true,
    "isWap":true
};
