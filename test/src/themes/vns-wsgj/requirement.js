
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
import GameListPanel from "../../global/Components/GameListPanel/GameListPanel3";
import StreetMachine from "../../global/Pages/StreetMachinePage/StreetMachine";
import ForgetPasswordPage from "../../global/Pages/ForgetPasswordPage/ForgetPasswordPage";
import LoginPage from "../../global/Pages/LoginPage/LoginPage";
import RegisterPage from "../../global/Pages/RegisterPage/RegisterPage";
import FirstPage from "./page/FirstPage";
import SportPage from "../../global/Pages/SportPage-bt6/SportPage";
import ChessMerge from "./page/ChessMerge";
import CasinoPage from "../../global/Pages/CasinoPage/CasinoPage";
import GamesPage from "../../global/Pages/GamesPage/GamesPage";
import BingoPage from "./page/BingoPage";
import PtGamesPage from "../../global/Pages/PtGamesPage/PtGamesPage";
import MgGamesPage from "../../global/Pages/MgGamesPage/MgGamesPage";
import AgPage from "../../global/Pages/AgPage2-ldl/AgPage2";
import PromotionPage from "../../global/Pages/PromotionPage/PromotionPage";
import AffixService2 from "./page/AffixService2";
// import AffixHongbao from "../../global/Pages/Frame/Header/AffixHongbao/AffixHongbao";
// import MemberCenterRouter from "../../global/Pages/MemberCenter/Router/MemberCenterRouter2";
import MemberCenterRouter from "../../global/Pages/Member/MemberCenterRouter";

import PromotionAlert from "../../global/Components/PromotionAlert/PromotionAlert";
import VerifyCode from "../../global/Components/VerifyCode/VerifyCode";//驗證碼組建
/*每个站点自己的router*/
import RequireSelfRouter from "./RequireSelfRouter";
import SstateMent from "../../global/Components/SstateMent/SstateMent";   //流水王
import LootoPage from "../../global/Components/LootoPage/LootoPage"; //大转盘
import AffixService_Callback from "../../global/Components/AffixService/AffixHide/AffixService_Callback" //电话回访

//加载该站点自有的样式
import "./page/index/skin.scss"
export default class Requirement extends BaseRequirement {
    constructor() {
        super();
        this.r("MuiTheme", MuiTheme);
        this.r("PreferencesIcon", PreferencesIcon);
        this.r("Router", Router);
        this.r("Frame", Frame);
        this.r("AffixService_Callback", AffixService_Callback);
        {
            this.r("AffixService", AffixService);
            this.r("AffixService2", AffixService2);
            this.r("Header", Header,{xpj4_pwd:true,loginTxt:'登入',agentName:'代理加盟',agentLogin:true,vipName:'尊享VIP'});
            {
                this.r("NavigationBar", NavigationBar,{wapDownloadName:"手机app下载"});
                // this.r("AffixHongbao", AffixHongbao, {page:"/hongbao/xhUzi_hb.htm"});

            }
            this.r("Footer", Footer);
            this.r("NoticeBar", NoticeBar);
            this.r("ImageGallery", ImageGallery, {sportHeight: "220px", bingoHeight: "200px", gameHeight: "200px",showBanner:false});
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
            this.r("GameListPanel", GameListPanel,{disableImageGallery:true,pgsize:30});
        }
        this.r("BingoPage", BingoPage, {supportKG:true,supportCG:true});
        this.r("PtGamesPage", PtGamesPage);
        {
        }
        this.r("MgGamesPage", MgGamesPage);
        {
        }
        this.r("AgPage", AgPage);
        this.r("PromotionPage", PromotionPage);
        this.r("StreetMachinePage",StreetMachine);
        this.r("MemberCenterRouter", MemberCenterRouter,{moneyPlacehoder:true});
        this.r("VerifyCode",VerifyCode);
        this.r("RequireSelfRouter",RequireSelfRouter);

        this.r("SstateMent",SstateMent)
        this.r("LootoPage",LootoPage);
    }
}