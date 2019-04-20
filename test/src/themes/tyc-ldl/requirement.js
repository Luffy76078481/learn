
//公共路由
import Router from "globalRouter";

//页面部分
import BaseRequirement from "../common/base";
import Frame from "./page/Frame/Frame";
import Header from "./page/Header/Header";
import NavigationBar from './page/NavigationBar/NavigationBar'
import Footer from "./page/Footer/Footer";
import FirstPage from "./page/FirstPage/FirstPage";
import AffixService from "./page/AffixService/AffixService";
import AffixService2 from "./page/AffixService/AffixService2";
import ImageGallery from "../../global/Components/ImageGallery/ImageGallery";
import LoginPage from "./page/LoginPage/LoginPage";
import ForgetPasswordPage from "../../global/Pages/ForgetPasswordPage/ForgetPasswordPage";
import RegisterPage from "./page/RegisterPage/RegisterPage";
import SportPage from "./page/SportPage/SportPage";
import CasinoPage from "./page/CasinoPage/CasinoPage";
import VipPage from "./page/VipPage/VipPage";
import GamesPage from "./page/GamesPage/GamesPage";
import BingoPage from "./page/BingoPage/BingoPage";
import PtGamesPage from "./page/PtGamesPage/PtGamesPage";


import AgPage from "../../global/Pages/AgPage2-bt6/AgPage2";
import PromotionPage from "./page/PromotionPage/PromotionPage";
import StreetMachine from "./page/StreetMachine/StreetMachine";
import StreetMachine2 from "./page/StreetMachinePage2/StreetMachine";
import MemberCenterRouter from "./MemberCenterRouter";
/*网站页面*/
import VerifyCode from "../../global/Components/VerifyCode/VerifyCode";//驗證碼組建


import SstateMent from "../../global/Components/SstateMent/SstateMent";   //流水王
import LootoPage from "../../global/Components/LootoPage/LootoPage"; //大转盘

//积分商城
import ShopFrame from "../../global/Pages/Shop/page/ShopFrame";
import ShopIndex from "../../global/Pages/Shop/page/ShopIndex";
import ShopMall from "../../global/Pages/Shop/page/ShopMall";
/*每个站点自己的router*/
import RequireSelfRouter from "./RequireSelfRouter";
import AffixService_Callback from "../../global/Components/AffixService/AffixHide/AffixService_Callback" //电话回访

//加载该站点自有的样式
import "./page/index/skin.scss"
export default class Requirement extends BaseRequirement {
    constructor() {
        super();
        this.r("Router", Router);
        this.r("Frame", Frame);
        this.r("AffixService_Callback", AffixService_Callback);
        {
            this.r("AffixService", AffixService);
            this.r("AffixService2", AffixService2);
            this.r("Header", Header);
            {
                 this.r("NavigationBar", NavigationBar);
                 this.r('FirstPage',FirstPage);
            }
            this.r('Footer',Footer);
            this.r("ImageGallery", ImageGallery, {gamesHeight:"170px",gameHeight:"360px",bingoHeight:"360px",gameEnabled:true,casinoEnabled2:true, casinoHeight: "360px",agPageHeight:"380px",showBanner:true});
        }
        this.r('LoginPage',LoginPage);
        this.r("ForgetPasswordPage", ForgetPasswordPage);
        this.r("RegisterPage", RegisterPage);
        this.r("SportPage", SportPage);
        this.r("CasinoPage", CasinoPage, {hideNav:true,hideCasinoTitle:true,hoverMask:false});
        this.r("VipPage",VipPage);
        this.r("GamesPage", GamesPage);

        this.r("BingoPage", BingoPage, {supportKG:true,banner:true,supportCG:true});
        this.r("PtGamesPage", PtGamesPage ,{gamePgSiz:'60'});

        this.r("AgPage", AgPage);
        this.r("PromotionPage", PromotionPage);
        this.r("StreetMachinePage",StreetMachine);
        this.r("StreetMachinePage2",StreetMachine2);
        this.r("MemberCenterRouter", MemberCenterRouter,{moneyPlacehoder:true,msgNum:true });


        this.r("SstateMent",SstateMent)
        this.r("LootoPage",LootoPage);

        this.r("VerifyCode",VerifyCode);
        this.r("RequireSelfRouter",RequireSelfRouter);
        //积分商城
        this.r("ShopFrame",ShopFrame);
        {
            this.r("ShopIndex",ShopIndex);
            this.r("ShopMall",ShopMall)
        }
    }
}