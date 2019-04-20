
//Mui框架 移动端使用的
import {MuiTheme, PreferencesIcon} from "./theme";
//公共路由
import Router from "globalRouter";

//页面部分
import BaseRequirement      from "../common/base";
import Frame                from "../../global/Pages/Frame/Frame";
import Header               from "./page/Header";
import Footer               from "./page/Footer";
import AffixService         from "./page/AffixService";
import NavigationBar        from "./page/NavigationBar";
import NoticeBar            from "../../global/Components/NoticeBar/NoticeBar";
import ImageGallery         from "../../global/Components/ImageGallery/ImageGallery";
import GameListPanel        from "./page/GameListPanel/GameListPanel";
import StreetMachine        from "./page/StreetMachinePage/StreetMachine";
import ForgetPasswordPage   from "../../global/Pages/ForgetPasswordPage/ForgetPasswordPage";
import LoginPage            from "../../global/Pages/LoginPage/LoginPage";
import RegisterPage         from "./page/RegisterPage/RegisterPage";
import FirstPage            from "./page/FirstPage";
import SportPage            from "./page/SportPage/SportPage";
import ChessMerge           from "./page/ChessMerge";
import CasinoPage           from "./page/CasinoPage/CasinoPage";
import GamesPage            from "../../global/Pages/GamesPage/GamesPage";
import BingoPage            from "./page/BingoPage";
import PtGamesPage          from "./page/PtGamesPage/PtGamesPage";
import MgGamesTop           from "./page/MgGamesPage/MgGamesTop/MgGamesTop";
import PtGamesTop           from "./page/GamesPageTop/GamesPageTop2"
import MgGamesPage          from "./page/MgGamesPage/MgGamesPage";
import AgPage               from "./page/AgPage/AgPage";
import PromotionPage        from "./page/PromotionPage/PromotionPage";
import MemberCenterRouter   from "./page/MemberCenter/Router/MemberCenterRouter";
import PromotionAlert       from "../../global/Components/PromotionAlert/PromotionAlert";
import VerifyCode           from "../../global/Components/VerifyCode/VerifyCode";//驗證碼組建
import GamesPageTop         from "./page/GamesPageTop/GamesPageTop2";//电子游艺
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
            this.r("AffixService", AffixService,{weixinName:'官方微信号'});
            this.r("Header", Header,{xpj4_pwd:true,loginTxt:'登入',agentName:'代理加盟',agentLogin:true,vipName:'尊享VIP'});
            {
                this.r("NavigationBar", NavigationBar,{wapDownloadName:"手机投注"});

            }
            this.r("Footer", Footer);
            this.r("GamesPageTop", GamesPageTop);
            this.r("ImageGallery", ImageGallery, {sportHeight: "170px", bingoHeight: "200px", gameHeight: "170px",showBanner:false});
            this.r("NoticeBar", NoticeBar);
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
        this.r("CasinoPage", CasinoPage, {hideCasinoTitle:true,bgAnimate:true});
        this.r("GamesPage", GamesPage);
        {
            this.r("GamesPageNoticeBar", NoticeBar);
            this.r("GameListPanel", GameListPanel,{disableImageGallery:true,pgsize:18});
        }
        this.r("BingoPage", BingoPage, {supportKG:true,supportCG:true});
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
        this.r("MemberCenterRouter", MemberCenterRouter,{moneyPlacehoder:true,hideUserInfo:true});
        this.r("VerifyCode",VerifyCode);
        this.r("RequireSelfRouter",RequireSelfRouter);
    }
}