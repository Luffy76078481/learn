
//Mui框架 移动端使用的
import {MuiTheme, PreferencesIcon} from "./theme";
//公共路由
import Router from "globalRouter";

//页面部分
import BaseRequirement from "../common/base";
import Frame from "../../global/Pages/Frame/Frame"; 
import Header from "./stuff/Header";
import Footer from "./stuff/Footer";
import NavigationBar from "./stuff/NavigationBar/NavigationBar";
import AffixService_Help from "../../global/Components/AffixService/AffixHide/AffixService_Help";
import AffixService_Download from "../../global/Components/AffixService/AffixHide/AffixService_Download";
//import NoticeBar from "../../stuff/Components/NoticeBar/NoticeBar";
import ImageGallery from "../../global/Components/ImageGallery/ImageGallery";
import LoginPage from "../../global/Pages/LoginPage/LoginPage";
import FirstPage from "./stuff/FirstPage";

import GameListPanel from "../../global/Components/GameListPanel/GameListPanel3";
import GameListPanel2 from "./stuff/GameListPanel2";
import GameListPanel3 from "./stuff/GameListPanel3";
import ForgetPasswordPage from "../../global/Pages/ForgetPasswordPage/ForgetPasswordPage";
import RegisterPage from "./stuff/RegisterPage";
import PlaygroundPage from "./stuff/PlaygroundPage";
import SportPage from "./stuff/SportPage";
import CasinoPage from "./stuff/CasinoPage";
import VipPage from "../../global/Pages/VipPage/VipPage";
import GamesPage from "../../global/Pages/GamesPage/GamesPage";
import BingoPage from "./stuff/BingoPage";
import PtGamesPage from "../../global/Pages/PtGamesPage/PtGamesPage";
//import PtGamesTop from "../../stuff/Pages/PtGamesPage/PtGamesTop/PtGamesTop";
import MgGamesPage from "../../global/Pages/MgGamesPage/MgGamesPage";
import AgPage from "../../global/Pages/AgPage2-bt6/AgPage2";
import PromotionPage from "./stuff/PromotionPage";
//import StreetMachine_dafa_new from "./stuff/StreetMachine_dafa_new";
import StreetMachine_dafa_new from "../../global/Pages/StreetMachinePage/StreetMachine";
//import MemberCenterRouter from "./MemberCenterRouter";
import MemberCenterRouter from "../../global/Pages/Member/MemberCenterRouter";
//import MemberCenterRouter from "../../stuff/Pages/MemberCenter/Router/MemberCenterRouter3";
/*网站页面*/
import VerifyCode from "../../global/Components/VerifyCode/VerifyCode";//驗證碼組建
import AboutUsPage from "./stuff/Introduce/AboutUs";//关于我们
import termsOfUse from "./stuff/Introduce/termsOfUse";//使用条款
import responsibleGaming from "./stuff/Introduce/responsibleGaming";//游戏责任
import security from "./stuff/Introduce/security";//安全spotFakeWebsite
import privacy from "./stuff/Introduce/privacy";///*隐藏政策*/
import spotFakeWebsite from "./stuff/Introduce/spotFakeWebsite"; //识别假冒网站
import SstateMent from "../../global/Components/SstateMent/SstateMent";   //流水王
import LootoPage from "../../global/Components/LootoPage/LootoPage"; //大转盘
import PromotionAlert from "../../global/Components/PromotionAlert-bt6/PromotionAlert-bt6";//BT6首页特殊弹窗
import hijackAlert from "../../global/Components/hijackAlert/hijackAlert";//劫持页信息弹窗
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
            //this.r("NoticeBar", NoticeBar);
            this.r("ImageGallery", ImageGallery, {gamesHeight:"170px",gameHeight:"360px",bingoHeight:"360px",gameEnabled:true,casinoEnabled2:true, casinoHeight: "360px",agPageHeight:"380px",showBanner:true});
        }
        this.r("ForgetPasswordPage", ForgetPasswordPage);
        this.r("RegisterPage", RegisterPage);
        this.r("LoginPage", LoginPage);
        this.r("FirstPage", FirstPage);
        this.r("SportPage", SportPage);
        this.r("CasinoPage", CasinoPage, {hideNav:true,hideCasinoTitle:true,hoverMask:false});
        this.r("VipPage",VipPage);
        this.r("GamesPage", GamesPage, {gamePgSiz:30});
        {
            this.r("GameListPanel", GameListPanel,{gameHeight:"360px"});
        }
        this.r("BingoPage", BingoPage, {supportKG:true,banner:true,supportCG:true});
        this.r("PlaygroundPage", PlaygroundPage);
        this.r("PtGamesPage", PtGamesPage ,{gamePgSiz:'60'});
        {
            this.r("GameListPanel2", GameListPanel2 ,{sliderlinkbox:true});
        }
        this.r("MgGamesPage", MgGamesPage);
        {
            this.r("GameListPanel3", GameListPanel3 ,{sliderlinkbox:true});
            this.r("FirstPagePromotionAlert", PromotionAlert);
            this.r("hijackAlert",hijackAlert);
        }
        this.r("AgPage", AgPage);
        this.r("PromotionPage", PromotionPage);
        this.r("StreetMachinePage",StreetMachine_dafa_new);

        this.r("MemberCenterRouter", MemberCenterRouter,{moneyPlacehoder:true,msgNum:true });
        {/*网站介绍相关*/}
        this.r("AboutUsPage",AboutUsPage);
        this.r("termsOfUse",termsOfUse);
        this.r("responsibleGaming",responsibleGaming);
        this.r("security",security);
        this.r("privacy",privacy);
        this.r("spotFakeWebsite",spotFakeWebsite)
        this.r("SstateMent",SstateMent)
        this.r("LootoPage",LootoPage);
        this.r("VerifyCode",VerifyCode);
        
    }
}