
//继承的基础class
import BaseRequirement from "../common/base";
//Mui框架 移动端使用的
import {MuiTheme, PreferencesIcon} from "./theme";
//公共路由
import Router from "globalRouter";

//页面部分
import Frame from "../../global/Pages/Frame/Frame";//公共Frame（父）页面
import AffixService from "../../global/Components/AffixService/AffixService";//在线客服悬浮层
import PromotionAlert from "../../global/Components/PromotionAlert/PromotionAlert";//首页自动弹出层
import Header from "./page/Header_acyl";//澳彩娱乐头部
import Footer from "./page/Footer_acyl";//澳彩娱乐底部
import NavigationBar from "./page/NavigationBar_acyl";//澳彩娱乐导航
import SecondNav from "./page/SecondNav_acyl" //澳彩娱乐下滑导航菜单
import NoticeBar from "../../global/Components/NoticeBar/NoticeBar";//公告栏
import ImageGallery from "../../global/Components/ImageGallery/ImageGallery";//banner
import FirstPage from "./page/FirstPage_acyl";//澳彩娱乐中部内容区域
import RegisterPage from "../../global/Pages/RegisterPage/RegisterPage";
import LoginPage from "../../global/Pages/LoginPage/LoginPage"



import SportPage from "./page/SportPage_acyl"; //体育
import GamesPage from "../../global/Pages/GamesPage/GamesPage"; //电子游艺
import GameListPanel from "../../global/Components/GameListPanel/GameListPanel";//电子游艺
import GamesPageTop from "../../global/Pages/GamesPage/GamesPageTop/GamesPageTop";//电子游艺
import CasinoPage from "./page/CasinoPage_acyl";  //真人视讯
import BingoPage from "./page/BingoPage_acyl";//彩票
import AgPage from "./page/AgPage_acyl";  //捕鱼
import PromotionPage from "../../global/Pages/PromotionPage/PromotionPage";  //优惠活动
//会员中心路由
import MemberCenterRouter from "../../global/Pages/MemberCenter/Router/MemberCenterRouter2";//会员中心router
import VerifyCode from "../../global/Components/VerifyCode/VerifyCode";//驗證碼組建
//自有路由（如果需要的话）


//加载该站点自有的样式
import "./page/index/skin.scss"
export default class Requirement extends BaseRequirement{
    constructor(){
        super();

        // this.r("MuiTheme", MuiTheme);
        // this.r("PreferencesIcon", PreferencesIcon);
        this.r("Router", Router);
        this.r("Frame",Frame);
        {
            //登陸
            this.r("LoginPage",LoginPage);
            //首页
            {
                this.r("Header", Header);
                {
                    this.r("NavigationBar", NavigationBar);
                    {
                        this.r("SecondNav", SecondNav,{sportItems:true,intoBtn:true,casinoName:true});
                    }
                }
                this.r("AffixService",AffixService,{qrCodeImg:true,weixinName:"官方微信"});
                this.r("Footer", Footer);
                this.r("NoticeBar", NoticeBar);
                this.r("ImageGallery", ImageGallery, {casinoEnabled:true, promotionEnabled:false, sportHeight: "200px", bingoHeight: "400px", casinoHeight: "400px", promotionHeight: "400px",gameHeight:"348px"});
                this.r("FirstPage", FirstPage);
                {
                    this.r("FirstPagePromotionAlert", PromotionAlert);
                }
            }
            //彩票
            this.r("BingoPage", BingoPage, {supportKG:false,supportCG:true,banner:false,notice:false,bgAnimate:true});
            //体育
            {this.r("SportPage", SportPage);}
            //真人视讯
            this.r("CasinoPage", CasinoPage, {hideNav:true,hideCasinoTitle:true,hoverMask:true});
            //电子游艺
            {
                this.r("GamesPage", GamesPage);
                {
                    this.r("GamesPageTop", GamesPageTop);
                    this.r("GamesPageNoticeBar", NoticeBar);
                    this.r("GameListPanel", GameListPanel, {platformName: true});
                }
            }
            //捕鱼
            this.r("AgPage", AgPage);
            //优惠活动
            this.r("PromotionPage", PromotionPage);
            //注册
            this.r("RegisterPage", RegisterPage);
            //会员中心
            this.r("MemberCenterRouter", MemberCenterRouter);
            this.r("VerifyCode",VerifyCode)
            //自有的router（如果需要的话）

        }
    }
}