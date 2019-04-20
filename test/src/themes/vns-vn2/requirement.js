/**
 * Vn2 RequireMent
 */

 import BaseRequirement from "../common/base"; // Base
 import {MuiTheme, PreferencesIcon} from "./theme"; // Mui框架 移动端使用的
 import Router from "globalRouter"; // 路由
 import ImageGallery from "./../../global/Components/ImageGallery/ImageGallery" // banner
 import NoticeBar from "./../../global/Components/NoticeBar/NoticeBar"; // 走马灯

// 页面部分
import Frame from "./stuff/Frame/Frame";
import Header from "./stuff/Frame/Header";
import Footer from "./stuff/Footer";
import NavigationBar from "./stuff/Frame/NavigationBar";
import FirstPage from "./stuff/FirstPage";
// 浮动图,弹窗
import AffixService from "./stuff/Components/AffixService/AffixService2";
import PromotionAlert from "../../global/Components/PromotionAlert/PromotionAlert";
// 电子
import GameListPanel from "./stuff/Components/GameListPanel/GameListPanel2";
// 分页
import ForgetPasswordPage from "./stuff/Pages/ForgetPasswordPage/ForgetPasswordPage";
import LoginPage from "./stuff/Pages/LoginPage/LoginPage";
import RegisterPage from "./stuff/Pages/RegisterPage/RegisterPage";
import SportPage from "./stuff/Pages/SportPage/SportPage";
import CasinoPage from "./stuff/Pages/CasinoPage/CasinoPage";
import GamesPage from "./stuff/Pages/GamesPage/GamesPage";
import GamesPageTop from "./stuff/Pages/GamesPage/GamesPageTop/GamesPageTop";
import BingoPage from "./stuff/Pages/BingoPage/BingoPage";
import PtGamesPage from "./stuff/Pages/PtGamesPage/PtGamesPage";
import MgGamesPage from "./stuff/Pages/MgGamesPage/MgGamesPage";
import AgPage from "./stuff/Pages/AgPage/AgPage";
import PromotionPage from "./stuff/Pages/PromotionPage/PromotionPage";
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
            this.r("AffixService", AffixService,{weixin:true});
            this.r("Header", Header);
            {
                this.r("NavigationBar", NavigationBar);
            }
            this.r("Footer", Footer);
            this.r("NoticeBar", NoticeBar);
            this.r("ImageGallery", ImageGallery, {promotionEnabled:true,casinoEnabled:true, sportHeight: "200px", bingoHeight: "200px", gameHeight: "200px",casinoHeight:"200px",promotionHeight:"200px"});
        }
        this.r("ForgetPasswordPage", ForgetPasswordPage);
        this.r("RegisterPage", RegisterPage);
        this.r("LoginPage", LoginPage);
        this.r("FirstPage", FirstPage);
        {0
            this.r("FirstPagePromotionAlert", PromotionAlert);
        }
        this.r("SportPage", SportPage);

        this.r("CasinoPage", CasinoPage, {hideCasinoTitle:true,hideNav:true,casinoEnabled:true});
        this.r("GamesPage", GamesPage);
        {
            this.r("GamesPageTop", GamesPageTop);
            this.r("GameListPanel", GameListPanel , {disableImageGallery:true});
        }
        this.r("BingoPage", BingoPage, {supportKG:true,supportCG:false});
        this.r("PtGamesPage", PtGamesPage);
        {
        }
        this.r("MgGamesPage", MgGamesPage);
        {
        }
        this.r("AgPage", AgPage);
        this.r("PromotionPage", PromotionPage);
        this.r("StreetMachinePage",StreetMachine);
        this.r("MemberCenterRouter", MemberCenterRouter,{hideInfo:true,select_Default:true,userName:true});
        // 验证码
        this.r("VerifyCode",VerifyCode);
    }
}