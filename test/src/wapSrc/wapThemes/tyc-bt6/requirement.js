
//公共路由
import RouterWap from "globalRouter";

//页面部分
import BaseRequirement from "../common/base";
import Frame from "../../wapGlobal/Pages/Frame/Frame";
import SideBar from "../../wapGlobal/Pages/SideBar/SideBar";
import FooterBar from "../../wapGlobal/Pages/FooterBar/FooterBar_bt6";
import FirstPage from "../../wapGlobal/Pages/FirstPage/FirstPage_autoLogin";
import VerifyCode from "../../../global/Components/VerifyCode/VerifyCode";
import LoginPage from"../../wapGlobal/Pages/LoginPage/LoginPage";
import RegisterPage from "../../wapGlobal/Pages/RegisterPage/RegisterPage";
import HelpPage from"../../wapGlobal/Pages/HelpPage/HelpPage";
import ServicePage from"../../wapGlobal/Pages/ServicePage/ServicePage_bt6"
import Feedback from"../../wapGlobal/Pages/Feedback/Feedback"
import AllGamePage from"../../wapGlobal/Pages/AllGamePage/AllGamePage"
import MyMessage from "../../wapGlobal/Pages/MyMessage/MyMessage_bt6"
import ReadMessage from "../../wapGlobal/Pages/MyMessage/ReadMessage"
import HistoryPage from "../../wapGlobal/Pages/HistoryPage/HistoryPage_bt6"
import EditPassword from "../../wapGlobal/Pages/EditPassword/EditPassword"
import CardManage from "../../wapGlobal/Pages/CardManage/CardManage_noWeixin";
import AddCard from '../../wapGlobal/Pages/CardManage/AddCard';
import AddQrCode from '../../wapGlobal/Pages/CardManage/AddQrCode';
import SettingPage from '../../wapGlobal/Pages/SettingPage/SettingPage'
import MoneyManage from '../../wapGlobal/Pages/MoneyManage/MoneyManage'
import TransferPage from '../../wapGlobal/Pages/TransferPage/TransferPage'
import DepositPage from '../../wapGlobal/Pages/DepositPage/DepositPage_bt6'
import WithdrawPage from '../../wapGlobal/Pages/WithdrawPage/WithdrawPage'
import LottoPage from '../../wapGlobal/Pages/LottoPage/LottoPage'

import StatementPage from '../../wapGlobal/Pages/StatementPage/StatementPage'
import HotActivity from '../../wapGlobal/Pages/HotActivity/HotActivity'
import HijackAlert from '../../wapGlobal/Pages/HijackAlert/HijackAlert'// 二次验证

//加载该站点自由的router
import RequireSelfRouter from './RequireSelfRouter'
//加载该站点自有的样式
import "./style/skin.scss"
export default class Requirement extends BaseRequirement {
    constructor() {
        super();
        this.r("RouterWap", RouterWap);
        this.r("RequireSelfRouter",RequireSelfRouter);
        this.r("Frame", Frame);
        this.r("FooterBar", FooterBar);
        this.r("FirstPage", FirstPage);
        this.r("LoginPage",LoginPage);
        this.r("RegisterPage",RegisterPage);
        this.r("SideBar",SideBar);
        this.r("HelpPage",HelpPage);
        this.r("ServicePage",ServicePage);
        this.r('Feedback',Feedback);
        this.r("VerifyCode",VerifyCode);
        this.r("AllGamePage",AllGamePage);
        this.r('MyMessage',MyMessage);
        this.r('ReadMessage',ReadMessage);
        this.r('HistoryPage',HistoryPage);
        this.r('EditPassword',EditPassword);
        this.r('CardManage',CardManage);
        this.r('AddCard',AddCard);
        this.r('AddQrCode',AddQrCode);
        this.r('SettingPage',SettingPage);
        this.r('MoneyManage',MoneyManage);
        this.r('TransferPage',TransferPage);
        this.r('DepositPage',DepositPage);
        this.r('WithdrawPage',WithdrawPage);
        this.r('HijackAlert',HijackAlert);
        this.r('HotActivity',HotActivity);
        {
            this.r('LottoPage',LottoPage);
            this.r('StatementPage',StatementPage)
        }
    }
}