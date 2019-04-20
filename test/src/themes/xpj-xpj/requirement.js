
//Mui框架 移动端使用的
import {MuiTheme, PreferencesIcon} from "./theme";
//公共路由
import Router from "globalRouter";

//页面部分
import BaseRequirement from "../common/base";
import Frame from "../../global/Pages/Frame/Frame";
import Header from "./page/Header";
import Footer from "./page/Footer";
import NavigationBar from "./page/NavigationBar";
import AffixService from "./page/AffixService";
import NoticeBar from "../../global/Components/NoticeBar/NoticeBar";
import ImageGallery from "../../global/Components/ImageGallery/ImageGallery";
import GameListPanel from "./stuff/GameListPanel/GameListPanel";
import StreetMachine from "./stuff/StreetMachinePage/StreetMachine";
import ForgetPasswordPage from "../../global/Pages/ForgetPasswordPage/ForgetPasswordPage";
import LoginPage from "../../global/Pages/LoginPage/LoginPage";
import RegisterPage from "./stuff/RegisterPage/RegisterPage";
import FirstPage from "./page/FirstPage";
import SportPage from "./stuff/SportPage";
import ChessMerge from "./page/ChessMerge";
import CasinoPage from "./stuff/CasinoPage";
import GamesPage from "./stuff/GamesPage";
import GamesPageTop from "./stuff/GamesPageTop/GamesPageTop2";//电子游艺
import BingoPage from "./page/BingoPage";
import PtGamesPage from "./stuff/PtGamesPage/PtGamesPage";
import PtGamesTop from "./stuff/PtGamesPage/PtGamesTop/PtGamesTop2";
import MgGamesPage from "./stuff/MgGamesPage/MgGamesPage";
import MgGamesTop from "./stuff/MgGamesPage/MgGamesTop/MgGamesTop2";
import AgPage from "./stuff/AgPage/AgPage";
import PromotionPage from "../../global/Pages/PromotionPage/PromotionPage";
import MemberCenterRouter from "./stuff/MemberCenter/Router/MemberCenterRouter";
import PromotionAlert from "../../global/Components/PromotionAlert/PromotionAlert";
import VerifyCode from "../../global/Components/VerifyCode/VerifyCode";//驗證碼組建
/*每个站点自己的router*/
import RequireSelfRouter from "./RequireSelfRouter";

//加载该站点自有的样式 
import "./page/index/skin.scss"
export default class Requirement extends BaseRequirement {
    constructor() {
        super();
        this.r("MuiTheme", MuiTheme);
        this.r("PreferencesIcon", PreferencesIcon);
        this.r("Router", Router);
        this.r("Frame", Frame);
        {
            this.r("AffixService", AffixService);
            // this.r("AffixService2", AffixService2);
            this.r("Header", Header,{xpj4_pwd:true,loginTxt:'登入',agentName:'代理加盟',agentLogin:true,vipName:'尊享VIP'});
            {
                this.r("NavigationBar", NavigationBar,{wapDownloadName:"手机app下载"});
                // this.r("AffixHongbao", AffixHongbao, {page:"/hongbao/xhUzi_hb.htm"});

            }
            this.r("Footer", Footer);
            this.r("NoticeBar", NoticeBar);
            this.r("ImageGallery", ImageGallery, {sportHeight: "251px", bingoHeight: "240px", gameHeight: "200px",showBanner:true});
        }
        this.r("ForgetPasswordPage", ForgetPasswordPage);
        this.r("RegisterPage", RegisterPage);
        this.r("LoginPage", LoginPage);
        this.r("FirstPage", FirstPage);
        {
            this.r("FirstPagePromotionAlert", PromotionAlert);
        }
        this.r("SportPage", SportPage);
        this.r("ChessMerge", ChessMerge);
        this.r("CasinoPage", CasinoPage, {hideCasinoTitle:false,bgAnimate:false});
        this.r("GamesPage", GamesPage);
        {
            this.r("GamesPageTop", GamesPageTop);
            this.r("GamesPageNoticeBar", NoticeBar);
            this.r("GameListPanel", GameListPanel,{disableImageGallery:true,pgsize:18});
        }
        this.r("BingoPage", BingoPage, {supportKG:true,supportCG:true,supportFC:true});
        this.r("PtGamesPage", PtGamesPage);
        {
            this.r("PtGamesTop", PtGamesTop);
            this.r("PtGamesNoticeBar", NoticeBar);
        }
        this.r("MgGamesPage", MgGamesPage);
        {
            this.r("MgGamesTop", MgGamesTop);
            this.r("MgGamesNoticeBar", NoticeBar);
        }
        this.r("AgPage", AgPage);
        this.r("PromotionPage", PromotionPage);
        this.r("StreetMachinePage",StreetMachine);
        this.r("MemberCenterRouter", MemberCenterRouter,{moneyPlacehoder:true});
        this.r("VerifyCode",VerifyCode);
        this.r("RequireSelfRouter",RequireSelfRouter);
    }
}