/**
 * xin
 */

import BaseRequirement from "../common/base"; // Base
import {MuiTheme, PreferencesIcon} from "./theme"; // Mui框架 移动端使用的
import Router from "globalRouter"; // 路由
import ImageGallery from "./../../global/Components/ImageGallery/ImageGallery" // banner
import ImageGallery2 from "./../../global/Components/ImageGallery2/ImageGallery" // Flux 3D轮播
import NoticeBar from "./../../global/Components/NoticeBar/NoticeBar"; // 走马灯

// 页面部分
import FirstPage from "./stuff/FirstPage";
import Frame from "./stuff/Frame/Frame";
import Header from "./stuff/Frame/Header/Header";
import Footer from "./stuff/Footer";
import NavigationBar from "./stuff/Frame/Header/NavigationBar/NavigationBar";
import AffixHongbao from "./stuff/Frame/Header/AffixHongbao/AffixHongbao";
// 公共组件
//import AffixService from "./stuff/Components/AffixService/AffixServiceStaticQr";
import AffixService2 from "./stuff/Components/AffixService/AffixService3";
import GameListPanel from "./stuff/Components/GameListPanel/GameListPanel2";
import PromotionAlert from "./stuff/Components/PromotionAlert/PromotionAlert";
// 内页
import ForgetPasswordPage from "./stuff/Pages/ForgetPasswordPage/ForgetPasswordPage";
import LoginPage from "./stuff/Pages/LoginPage/LoginPage";
import RegisterPage from "./stuff/Pages/RegisterPage/RegisterPage3";
import SportPage from "./stuff/Pages/SportPage/SportPage";
import CasinoPage from "./stuff/Pages/CasinoPage/CasinoPage2";
import GamesPage from "./stuff/Pages/GamesPage/GamesPage";
import GamesPageTop from "./stuff/Pages/GamesPage/GamesPageTop/GamesPageTop";
import BingoPage from "./stuff/Pages/BingoPage/BingoPage2";
import AgPage from "./stuff/Pages/AgPage/AgPage";
import StreetMachine from "./stuff/Pages/StreetMachinePage/StreetMachine";
import PromotionPage from "./stuff/Pages/PromotionPage/PromotionPage";
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
            //this.r("AffixService", AffixService);
            this.r("AffixService2", AffixService2,{togame:true,toAG:true,procenterimg:true,Hongbao:true,QQ2:true});
            this.r("Header", Header ,{linetest:true});
            {
                this.r("NavigationBar", NavigationBar,{sub:true,onlinserv:true,homeaddText:true});
                this.r("AffixHongbao", AffixHongbao, {page:"/hongBao.html"});
            }
            this.r("Footer", Footer);
            this.r("NoticeBar", NoticeBar);
            this.r("ImageGallery", ImageGallery ,{bingoHeight:"240px",promotionEnabled:true,promotionHeight:"40px"});
            this.r("ImageGallery2", ImageGallery2 );
        }
        this.r("ForgetPasswordPage", ForgetPasswordPage);
        this.r("RegisterPage", RegisterPage ,{banner:true});
        this.r("LoginPage", LoginPage);
        this.r("FirstPage", FirstPage);
        {
            this.r("FirstPagePromotionAlert", PromotionAlert);
        }
        this.r("SportPage", SportPage);
        this.r("CasinoPage", CasinoPage);
        this.r("GamesPage", GamesPage);
        {
            this.r("GamesPageTop", GamesPageTop);
            this.r("GamesPageNoticeBar", NoticeBar);
            this.r("GameListPanel", GameListPanel);
        }
        this.r("BingoPage", BingoPage,  {supportKG:true,supportCG:true,banner:true});
        {
            this.r("PtGamesNoticeBar", NoticeBar);
        }
        {
            this.r("MgGamesNoticeBar", NoticeBar);
        }
        this.r("AgPage", AgPage);
        this.r("StreetMachinePage",StreetMachine);
        this.r("PromotionPage", PromotionPage);

        this.r("MemberCenterRouter", MemberCenterRouter);
        // 验证码
        this.r("VerifyCode",VerifyCode);
    }
}