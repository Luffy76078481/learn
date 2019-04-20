
// Base
import BaseRequirement from "../common/base";
//Mui框架 移动端使用的
import {MuiTheme, PreferencesIcon} from "./theme";
//公共路由
import Router from "globalRouter";

// 页面部分
import Frame from "./stuff/Frame/Frame"; 
import Header from "./stuff/Frame/Header/Header";
import Footer from "./stuff/Frame/Footer/Footer";
import NavigationBar from "./stuff/Frame/NavigationBar/NavigationBar";
import AffixService_Help from "./stuff/Components/AffixService/AffixService_Help";
import AffixService_Download from "./stuff/Components/AffixService/AffixService_Download";

import NoticeBar from "./../../global/Components/NoticeBar/NoticeBar"
import ImageGallery from "./../../global/Components/ImageGallery/ImageGallery" // 轮播组件
import GameListPanel from "./stuff/Components/GameListPanel/GameListPanel3";
import GameListPanel2 from "./stuff/Components/GameListPanel/GameListPanel2";

import ForgetPasswordPage from "./stuff/Pages/ForgetPasswordPage/ForgetPasswordPage";
import LoginPage from "./stuff/Pages/LoginPage/LoginPage";
import RegisterPage from "./stuff/Pages/RegisterPage/RegisterPage2";
import FirstPage from "./stuff/FirstPage";
import PlaygroundPage from "./stuff/Pages/PlaygroundPage/PlaygroundPage";
import SportPage from "./stuff/Pages/SportPage/SportPage2";
import CasinoPage from "./stuff/Pages/CasinoPage/CasinoPage";
import GamesPage from "./stuff/Pages/GamesPage/GamesPage";
import BingoPage from "./stuff/Pages/BingoPage/BingoPage2";
import PtGamesPage from "./stuff/Pages/PtGamesPage/PtGamesPage";
import MgGamesPage from "./stuff/Pages/MgGamesPage/MgGamesPage";
import AgPage from "./stuff/Pages/AgPage/AgPage2";
import PromotionPage from "./stuff/Pages/PromotionPage/PromotionPage2";
import StreetMachine from "./stuff/Pages/StreetMachinePage/StreetMachine";
import PromotionAlert from "../../global/Components/PromotionAlert/PromotionAlert";
// Router
import MemberCenterRouter from "../../global/Pages/MemberCenter/Router/MemberCenterRouter2";

import VerifyCode from "../../global/Components/VerifyCode/VerifyCode";//驗證碼組建
//加载该站点自有的样式
import "./stuff/index/skin.scss"
export default class Requirement extends BaseRequirement {
    constructor() {
        super();

        this.r("MuiTheme", MuiTheme);
        this.r("PreferencesIcon", PreferencesIcon);
        this.r("Router", Router);
        this.r("Frame", Frame);
        {
            this.r("AffixService_Help", AffixService_Help);
            this.r("AffixService_Download", AffixService_Download);
            this.r("Header", Header);
            {
                this.r("NavigationBar", NavigationBar);
            }
            this.r("Footer", Footer);
            this.r("NoticeBar", NoticeBar);
            this.r("ImageGallery", ImageGallery, {gamesHeight:"170px",gameHeight:"500px",bingoHeight:"500px",gameEnabled:true,casinoEnabled2:true, casinoHeight: "250px",agPageHeight:"380px"});
        }
        this.r("ForgetPasswordPage", ForgetPasswordPage);
        this.r("RegisterPage", RegisterPage);
        this.r("LoginPage", LoginPage);
        this.r("FirstPage", FirstPage);
        {
            this.r("FirstPagePromotionAlert", PromotionAlert);
        }
        this.r("SportPage", SportPage);
        this.r("CasinoPage", CasinoPage, {hideNav:true,hideCasinoTitle:true,hoverMask:true});
        this.r("GamesPage", GamesPage, {gamePgSiz:12});
        {
            this.r("GameListPanel", GameListPanel);
        }
        this.r("BingoPage", BingoPage, {supportKG:true,banner:true,supportCG:true,supportFC:true});
        this.r("PlaygroundPage", PlaygroundPage);
        this.r("PtGamesPage", PtGamesPage ,{gamePgSiz:'24'});
        {
            this.r("GameListPanel2", GameListPanel2 ,{sliderlinkbox:true});
        }
        this.r("MgGamesPage", MgGamesPage);
        {
        }
        this.r("AgPage", AgPage);
        this.r("PromotionPage", PromotionPage);
        this.r("StreetMachinePage",StreetMachine);
        this.r("MemberCenterRouter", MemberCenterRouter,{moneyPlacehoder:true,msgNum:true });

        this.r("VerifyCode",VerifyCode);
    }
}