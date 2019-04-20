
//Mui框架 移动端使用的
import {MuiTheme, PreferencesIcon} from "./theme";
//公共路由
import Router from "globalRouter";

//页面部分
import BaseRequirement from "../common/base";
import Frame from "../../global/Pages/Frame/Frame";
import Header from "./page/Header";
import Footer from "./page/Footer";
import AffixService from "./page/AffixServiceStaticQr";
import AffixService2 from "./page/AffixService3";
import NavigationBar from "./page/NavigationBar";
// import NoticeBar from "./page/NoticeBar";
import NoticeBar from "../../global/Components/NoticeBar/NoticeBar";
// import ImageGallery2 from "./page/ImageGallery";
import ImageGallery2 from "../../global/Components/ImageGallery/ImageGallery";
import ImageGallery from "../../global/Components/ImageGallery/ImageGallery";
import GameListPanel from "../../global/Components/GameListPanel/GameListPanel3";
import StreetMachine from "../../global/Pages/StreetMachinePage/StreetMachine";
import LootoPage from "../../global/Components/LootoPage/LootoPage"; //大转盘
import SstateMent from "../../global/Components/SstateMent/SstateMent";   //流水王
import VerifyCode from "../../global/Components/VerifyCode/VerifyCode";//驗證碼組建
import ForgetPasswordPage from "../../global/Pages/ForgetPasswordPage/ForgetPasswordPage";
import LoginPage from "../../global/Pages/LoginPage/LoginPage";
import RegisterPage from "./page/RegisterPage";
import FirstPage from "./page/FirstPage";
import SportPage from "../../global/Pages/SportPage-bt6/SportPage";
import CasinoPage from "../../global/Pages/CasinoPage/CasinoPage";
import GamesPage from "../../global/Pages/GamesPage/GamesPage";
import GamesPageTop from "./page/GamesPageTop";
import VipPage from "../../global/Pages/VipPage/VipPage";
import BingoPage from "../vns-bt6/page/BingoPage";
import PtGamesPage from "../../global/Pages/PtGamesPage/PtGamesPage";
import GameListPanel2 from "./page/GameListPanel2"
import PtGamesTop from "../../global/Pages/PtGamesPage/PtGamesTop/PtGamesTop";
import MgGamesPage from "../../global/Pages/MgGamesPage/MgGamesPage";
import GameListPanel3 from "./page/GameListPanel3" 
import MgGamesTop from "../../global/Pages/MgGamesPage/MgGamesTop/MgGamesTop";
import AgPage from "../../global/Pages/AgPage2-bt6/AgPage2";
import PromotionPage from "../../global/Pages/PromotionPage/PromotionPage";
// import MemberCenterRouter from "../../stuff/Pages/MemberCenter/Router/MemberCenterRouter2";
import MemberCenterRouter from "../../global/Pages/Member/MemberCenterRouter";
import PromotionAlert from "../../global/Components/PromotionAlert/PromotionAlert";
import hijackAlert from "../../global/Components/hijackAlert/hijackAlert";//劫持页信息弹窗
import "./page/index/skin.scss"

export default class Requirement extends BaseRequirement {
    constructor() {
        super();
        this.r("MuiTheme", MuiTheme);
        this.r("PreferencesIcon", PreferencesIcon)
        this.r("Router", Router)
        this.r("Frame", Frame);
        {
            this.r("AffixService", AffixService ,{togame:true,toAG:true,procenterimg:false,Hongbao:false,QQ2:true});
            this.r("AffixService2", AffixService2);
            this.r("Header", Header ,{linetest:false});
            {
                this.r("NavigationBar", NavigationBar,{sub:true,onlinserv:true,homeaddText:true});
                this.r("VipPage",VipPage);
                // this.r("AffixHongbao", AffixHongbao, {page:"/hongbao/xhXhtd_hb.htm"});
            }
            this.r("Footer", Footer);
            this.r("NoticeBar", NoticeBar);
            this.r("ImageGallery", ImageGallery ,{bingoHeight:"240px",promotionEnabled:true,promotionHeight:"240px",sportHeight:"251px",height:"170px",casinoHeight:"",showBanner:true,casinoEnabled:true,agPageHeight:"380px"});
            this.r("ImageGallery2", ImageGallery2 ,{homeType:'pc_home_images'});
        }
        this.r("ForgetPasswordPage", ForgetPasswordPage);
        this.r("RegisterPage", RegisterPage ,{banner:true});
        this.r("LoginPage", LoginPage);
        this.r("FirstPage", FirstPage);
        {
            this.r("FirstPagePromotionAlert", PromotionAlert);
            this.r("hijackAlert",hijackAlert);
        }
        this.r("SportPage", SportPage);
        this.r("CasinoPage", CasinoPage, {hideCasinoTitle:true,bgAnimate:true,hideNav:false});
        this.r("GamesPage", GamesPage);
        {
            this.r("GamesPageTop", GamesPageTop);
            this.r("GamesPageNoticeBar", NoticeBar);
            this.r("GameListPanel", GameListPanel,{pgsize:30});
        }
        this.r("BingoPage", BingoPage,  {supportKG:true,supportCG:true,banner:true});
        this.r("PtGamesPage", PtGamesPage);
        {
            this.r("PtGamesTop", PtGamesTop);
            this.r("GameListPanel2", GameListPanel2 ,{sliderlinkbox:true});
            this.r("PtGamesNoticeBar", NoticeBar);
        }
        this.r("MgGamesPage", MgGamesPage);
        {
            this.r("MgGamesTop", MgGamesTop);
            this.r("GameListPanel3", GameListPanel3 ,{sliderlinkbox:true});
            this.r("MgGamesNoticeBar", NoticeBar);
        }
        this.r("AgPage", AgPage);
        this.r("PromotionPage", PromotionPage);
        this.r("StreetMachinePage",StreetMachine);
        this.r("VerifyCode",VerifyCode);
        this.r("LootoPage",LootoPage);
        this.r("SstateMent",SstateMent)
        this.r("MemberCenterRouter", MemberCenterRouter);
    }
}