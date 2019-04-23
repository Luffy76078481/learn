/**
 * xhtd-require
 */

 // Base
import BaseRequirement from "../common/base";
// Mui框架 移动端使用的
import {MuiTheme, PreferencesIcon} from "./theme";
// 公共路由，轮播，页面
import Router           from "globalRouter";
import ImageGallery2    from "./../../global/Components/ImageGallery2/ImageGallery" // Flux 3D轮播
import ImageGallery     from "./../../global/Components/ImageGallery/ImageGallery"
import NoticeBar        from "./../../global/Components/NoticeBar/NoticeBar"; // 走马灯
import LootoPage        from "../../global/Pages/LootoPage2/LootoPage"; //大转盘
import VerifyCode       from "../../global/Components/VerifyCode/VerifyCode";//验证码
import AgPage           from "../../global/Pages/AgPage/AgPage"; // 捕鱼页
// 页面部分
import Frame                from "./stuff/Frame/Frame";
import Header               from "./stuff/Frame/Header/Header_xhXhtd_new";
import Footer               from "./stuff/Footer";
import AffixService         from "./stuff/Components/AffixService/AffixServiceStaticQr_xhXhtd_new";
import AffixService2        from "./stuff/Components/AffixService/AffixService3_xhXhtd_new";
import NavigationBar        from "./stuff/Frame/Header/NavigationBar/NavigationBar_xhXhtd_new";
import GameListPanel        from "./stuff/Components/GameListPanel/GameListPanel2"; // game2 scss
import StreetMachine        from "./stuff/Pages/StreetMachinePage/StreetMachine";
import ForgetPasswordPage   from "./stuff/Pages/ForgetPasswordPage/ForgetPasswordPage";
import LoginPage            from "./stuff/Pages/LoginPage/LoginPage";
import RegisterPage         from "./stuff/Pages/RegisterPage/RegisterPage_xhXhtd_new";
import FirstPage            from "./stuff/FirstPage";
import SportPage            from "./stuff/Pages/SportPage/SportPage"; // 体育
import CasinoPage           from "./stuff/Pages/CasinoPage/CasinoPage2"; // 真人
import GamesPage            from "./stuff/Pages/GamesPage/GamesPage";
import GamesPageTop         from "./stuff/Pages/GamesPage/GamesPageTop/GamesPageTop";
import BingoPage            from "./stuff/Pages/BingoPage/BingoPage2"; // 彩票
import PtGamesPage          from "./stuff/Pages/PtGamesPage/PtGamesPage";
import PtGamesTop           from "./stuff/Pages/PtGamesPage/PtGamesTop/PtGamesTop";
import MgGamesPage          from "./stuff/Pages/MgGamesPage/MgGamesPage";
import MgGamesTop           from "./stuff/Pages/MgGamesPage/MgGamesTop/MgGamesTop";
//import AffixHongbao         from "./stuff/Frame/Header/AffixHongbao/AffixHongbao"; // 红包
import PromotionPage        from "./stuff/Pages/PromotionPage/PromotionPage";
import PromotionAlert       from "./stuff/Components/PromotionAlert/PromotionAlert"; // 首页优惠弹窗
import HomeAdver            from "./stuff/Components/HomeAdver/HomeAdver"; // index home page
import MemberCenterRouter   from "./stuff/Pages/MemberCenter/Router/MemberCenterRouter2";// 个人中心
//import SecondNav          from "../../stuff/Components/SecondNav/SecondNav"
//加载该站点自有的样式
import "./stuff/index/skin.scss"

export default class Requirement extends BaseRequirement {
    constructor() {
        super();

        this.r("MuiTheme", MuiTheme);
        this.r("PreferencesIcon", PreferencesIcon)
        this.r("Router", Router)
        this.r("Frame", Frame);
        this.r("LootoPage", LootoPage);
        {
            this.r("AffixService", AffixService ,{togame:true,toAG:true,procenterimg:true,Hongbao:true,QQ2:true});
            this.r("AffixService2", AffixService2);
            this.r("Header", Header ,{linetest:true});
            {
                this.r("NavigationBar", NavigationBar,{sub:true,onlinserv:true,homeaddText:true});
                //this.r("AffixHongbao", AffixHongbao, {page:"/hongBao.html"});
            }
            // {this.r("SecondNav", SecondNav,{sportItems:true,intoBtn:true,casinoName:true,agFish:true});}
            this.r("Footer", Footer);
            this.r("NoticeBar", NoticeBar);
            this.r("ImageGallery", ImageGallery ,{bingoHeight:"240px",promotionEnabled:true,promotionHeight:"240px",sportHeight:"251px"});
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
        this.r("MemberCenterRouter", MemberCenterRouter,{hideInfo:true,select_Default:true,userName:true});
        this.r("HomeAdver", HomeAdver);
        // 验证码
        this.r("VerifyCode",VerifyCode);
    }
}