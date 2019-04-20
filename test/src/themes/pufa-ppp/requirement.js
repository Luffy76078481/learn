/**
 * ppp-
 */

import BaseRequirement from "../common/base"; // Base
import {MuiTheme, PreferencesIcon} from "./theme"; // Mui框架 移动端使用的
import Router from "globalRouter"; // 路由
import ImageGallery from "../../global/Components/ImageGallery/ImageGallery" // banner
import NoticeBar from "../../global/Components/NoticeBar/NoticeBar"; // 走马灯

import Frame from "./stuff/Frame";
import FirstPage from "./stuff/FirstPage";
import Header from "./stuff/Header";
import Footer from "./stuff/Footer";
import NavigationBar from "./stuff/NavigationBar";
import GameListPanel from "./stuff/Components/GameListPanel/GameListPanel";
import PromotionAlert from "./stuff/Components/PromotionAlert/PromotionAlert";
import AffixHongbao from "./stuff/Components/AffixHongbao/AffixHongbao";
import AffixService from "./stuff/Components/AffixService/AffixService";

// 内页
import ForgetPasswordPage from "./stuff/Pages/ForgetPasswordPage/ForgetPasswordPage";
import LoginPage from "./stuff/Pages/LoginPage/LoginPage";
import RegisterPage from "./stuff/Pages/RegisterPage/RegisterPage";
import SportPage from "./stuff/Pages/SportPage/SportPage";
import CasinoPage from "./stuff/Pages/CasinoPage/CasinoPage";
import GamesPage from "./stuff/Pages/GamesPage/GamesPage";
import GamesPageTop from "./stuff/Pages/GamesPage/GamesPageTop/GamesPageTop";
import BingoPage from "./stuff/Pages/BingoPage/BingoPage2";
import AgPage from "./stuff/Pages/AgPage/AgPage";
import PromotionPage from "./stuff/Pages/PromotionPage/PromotionPage";
import TeachPage from "./stuff/Pages/TeachPage/TeachPage";
import StreetMachine from "./stuff/Pages/StreetMachinePage/StreetMachine";
// 个人中心
import MemberCenterRouter from "../../global/Pages/MemberCenter/Router/MemberCenterRouter2";
import VerifyCode from "../../global/Components/VerifyCode/VerifyCode";//验证码
import "./stuff/index/skin.scss"

export default class Requirement extends BaseRequirement {
    constructor() {
        super();

        this.r("MuiTheme", MuiTheme);
        this.r("PreferencesIcon", PreferencesIcon)
        this.r("Router", Router)
        this.r("Frame", Frame);
        {
            this.r("AffixService", AffixService,{qrCodeImg:true,weixinName:"官方微信"});
            this.r("Header", Header,{hideLogin:true,linetest:true,loginFrom2:true,appDownlad:true});
            {
                this.r("NavigationBar", NavigationBar,{homeText:true,helpBtn:true});
                this.r("AffixHongbao", AffixHongbao, {page:"/hongBao.html"});
                {
                    // this.r("SecondNav", SecondNav);
                }
            }
            this.r("Footer", Footer);
            this.r("NoticeBar", NoticeBar);
            this.r("ImageGallery", ImageGallery, {casinoEnabled:true, promotionEnabled:true, sportHeight: "150px", bingoHeight: "400px", casinoHeight: "200px", promotionHeight: "200px",gameHeight:"300px"});
        }
        this.r("ForgetPasswordPage", ForgetPasswordPage);
        this.r("RegisterPage", RegisterPage);
        this.r("LoginPage", LoginPage);
        this.r("FirstPage", FirstPage);
        {
            this.r("FirstPagePromotionAlert", PromotionAlert);
        }
        this.r("SportPage", SportPage);
        this.r("CasinoPage", CasinoPage, {hideNav:true,hideCasinoTitle:false,hoverMask:true,maskName:"进入游戏"});
        this.r("GamesPage", GamesPage);
        {
            this.r("GamesPageTop", GamesPageTop);
            this.r("GamesPageNoticeBar", NoticeBar);
            this.r("GameListPanel", GameListPanel,{platformName:true,pgsize:16,jockPot:true});
        }
        this.r("BingoPage", BingoPage, {supportKG:false,supportCG:true,banner:false,notice:false});
        this.r("AgPage", AgPage);
        this.r("PromotionPage", PromotionPage);
        this.r("TeachPage", TeachPage);
        this.r("StreetMachinePage",StreetMachine);
        this.r("MemberCenterRouter", MemberCenterRouter);
        // 验证码
        this.r("VerifyCode",VerifyCode);
    }
}