
//Mui框架 移动端使用的
import {MuiTheme, PreferencesIcon} from "./theme";
//公共部分- 路由，页面
import Router from "globalRouter";
import AgPage from "../../global/Pages/AgPage/AgPage";
import NoticeBar            from "../../global/Components/NoticeBar/NoticeBar";
import ImageGallery         from "../../global/Components/ImageGallery/ImageGallery";
import ForgetPasswordPage   from "../../global/Pages/ForgetPasswordPage/ForgetPasswordPage";
import LoginPage            from "../../global/Pages/LoginPage/LoginPage";
import PtGamesPage          from "../../global/Pages/PtGamesPage/PtGamesPage";
import MgGamesPage          from "../../global/Pages/MgGamesPage/MgGamesPage";
import PromotionAlert       from "../../global/Components/PromotionAlert/PromotionAlert";
import VerifyCode           from "../../global/Components/VerifyCode/VerifyCode";//驗證碼組建
import LootoPage            from "../../global/Pages/LootoPage2/LootoPage"; //大转盘
import GamesPage            from "../../global/Pages/GamesPage/GamesPage";
import Frame                from "../../global/Pages/Frame/Frame";
//页面部分
import BaseRequirement      from "../common/base";
import Header               from "./page/Header";
import Footer               from "./page/Footer";
import NavigationBar        from "./page/NavigationBar";
import AffixService         from "./page/AffixService";
import GameListPanel        from "./page/GameListPanel/GameListPanel2";
import StreetMachine        from "./page/StreetMachinePage/StreetMachine"
import RegisterPage         from "./page/RegisterPage/RegisterPage";
import FirstPage            from "./page/FirstPage";
import SportPage            from "./page/SportPage/SportPage";
import ChessMerge           from "./page/ChessMerge";
import CasinoPage           from "./page/CasinoPage/CasinoPage";
import BingoPage            from "./page/BingoPage";
import PromotionPage        from "./page/PromotionPage/PromotionPage";
import AffixService2        from "./page/AffixService2";
//import AffixHongbao         from "../../global/Pages/Frame/Header/AffixHongbao/AffixHongbao";
import MemberCenterRouter   from "./page/MemberCenter/Router/MemberCenterRouter2";


/*每个站点自己的router*/
import RequireSelfRouter from "./RequireSelfRouter";
import SecondNav from "./page/SecondNav/SecondNav"
//加载该站点自有的样式
import "./page/index/skin.scss"
export default class Requirement extends BaseRequirement {
    constructor() {
        super();
        this.r("MuiTheme", MuiTheme);
        this.r("PreferencesIcon", PreferencesIcon);
        this.r("Router", Router);
        this.r("Frame", Frame);
        this.r("LootoPage", LootoPage);
        {
            this.r("AffixService", AffixService);
            this.r("AffixService2", AffixService2);
            this.r("Header", Header,{xpj4_pwd:true,loginTxt:'登入',agentName:'代理加盟',agentLogin:true,vipName:'尊享VIP'});
            {
                this.r("NavigationBar", NavigationBar,{wapDownloadName:"手机投注"});
                //this.r("AffixHongbao", AffixHongbao, {page:"/hongbao/hongbao.htm"});
                {
                    this.r("SecondNav", SecondNav,{sportItems:true,intoBtn:true,agFish:false});
                }

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
            this.r("GameListPanel", GameListPanel,{disableImageGallery:true,pgsize:12});
        }
        this.r("BingoPage", BingoPage, {supportKG:false,supportCG:true});
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
    }
}