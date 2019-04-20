//公共路由
import RouterWap from "globalRouter";

//页面部分
import BaseRequirement  from "../common/base";
import Frame            from "../../wapGlobal/Pages/Frame/Frame_noWeixin";
import SideBar          from "../../wapGlobal/Pages/SideBar/SideBar";
import FooterBar        from "./stuff/FooterBar/FooterBar_new";
import FirstPage        from "./stuff/FirstPage/FirstPage";
import VerifyCode       from "./stuff/VerifyCode/VerifyCode";
import LoginPage        from "./stuff/LoginPage/LoginPage";
import RegisterPage     from "./stuff/RegisterPage/RegisterPage";
import RegisterRule     from "./stuff/RegisterPage/RegisterRule";
import HelpPage         from "../../wapGlobal/Pages/HelpPage/HelpPage";
import ServicePage      from "./stuff/ServicePage/ServicePage_bt6";
import Feedback         from "./stuff/Feedback/Feedback";
import AllGamePage      from "./stuff/AllGamePage/AllGamePage";
import MyMessage        from "./stuff/MyMessage/MyMessage";
import MessageLetter    from "./stuff/MyMessage/MyMessage_bt6";
import ReadMessage      from "./stuff/MyMessage/ReadMessage";
import HistoryPage      from "./stuff/HistoryPage/HistoryPage_bt6";
import EditPassword     from "./stuff/EditPassword/EditPassword";
import CardManage       from "./stuff/CardManage/CardManage";
import AddCard          from '../../wapGlobal/Pages/CardManage/AddCard';
import AddQrCode        from '../../wapGlobal/Pages/CardManage/AddQrCode';
import SettingPage      from '../../wapGlobal/Pages/SettingPage/SettingPage';
import MoneyManage      from './stuff/MoneyManage/MoneyManage';
import DepositPage      from './stuff/DepositPage/DepositPage';
import WithdrawPage     from './stuff/WithdrawPage/WithdrawPage';
import TransferPage     from '../../wapGlobal/Pages/TransferPage/TransferPage';
import LottoPage        from '../../wapGlobal/Pages/LottoPage/LottoPage';   //大转盘
import StatementPage    from '../../wapGlobal/Pages/StatementPage/StatementPage';
import HotActivity      from '../../wapGlobal/Pages/HotActivity/HotActivity';
import PromotionPage    from './stuff/PromotionPage/PromotionPage';
import AboutUs          from './stuff/AboutUs/AboutUs';
import MyCenter         from './stuff/MyCenter/MyCenter';
import SignIn           from './stuff/SignIn/SignIn';

//加载该站点自由的router

//加载该站点自有的样式
import "./style/skin.scss"

export default class Requirement extends BaseRequirement {
    constructor() {
        super();
        this.r("RouterWap", RouterWap);
        this.r("Frame", Frame);
        this.r("FooterBar", FooterBar);
        this.r("FirstPage", FirstPage);
        this.r("LoginPage", LoginPage);
        this.r("RegisterPage", RegisterPage);
        this.r("RegisterRule", RegisterRule);
        this.r("SideBar", SideBar);
        this.r("HelpPage", HelpPage);
        this.r("ServicePage", ServicePage);
        this.r('Feedback', Feedback);
        this.r("VerifyCode", VerifyCode);
        this.r("AllGamePage", AllGamePage);
        this.r('MyMessage', MyMessage);
        this.r('MessageLetter',MessageLetter);
        this.r('ReadMessage', ReadMessage);
        this.r('HistoryPage', HistoryPage);
        this.r('EditPassword', EditPassword);
        this.r('CardManage', CardManage);
        this.r('AddCard', AddCard);
        this.r('AddQrCode', AddQrCode);
        this.r('SettingPage', SettingPage);
        this.r('MoneyManage', MoneyManage);
        this.r('TransferPage', TransferPage);
        this.r('DepositPage', DepositPage);
        this.r('WithdrawPage', WithdrawPage);
        this.r('HotActivity', HotActivity);
        this.r('PromotionPage',PromotionPage);
        this.r('AboutUs', AboutUs);
        this.r('MyCenter', MyCenter);
        this.r('SignIn', SignIn);
        {
            this.r('LottoPage', LottoPage);
            this.r('StatementPage', StatementPage)
        }
    }
}