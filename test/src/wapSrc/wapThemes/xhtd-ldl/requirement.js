
//公共路由
import RouterWap from "globalRouter";

//页面部分
import BaseRequirement from "../common/base";
import Frame from "../../wapGlobal/Pages/Frame/Frame_noWeixin";
import SideBar from "../../wapGlobal/Pages/SideBar/SideBar_noWeixin";
import FooterBar from "../../wapGlobal/Pages/FooterBar/FooterBar";
import FirstPage from "../../wapGlobal/Pages/FirstPage/FirstPage_autoLogin";
import VerifyCode from "../../../global/Components/VerifyCode/VerifyCode";
import LoginPage from"../../wapGlobal/Pages/LoginPage/LoginPage";
import RegisterPage from "../../wapGlobal/Pages/RegisterPage/RegisterPage";
import HelpPage from"../../wapGlobal/Pages/HelpPage/HelpPage";
import ServicePage from"../../wapGlobal/Pages/ServicePage/ServicePage"
import Feedback from"../../wapGlobal/Pages/Feedback/Feedback"
import AllGamePage from"../../wapGlobal/Pages/AllGamePage/AllGamePage"
import MyMessage from "../../wapGlobal/Pages/MyMessage/MyMessage"
import ReadMessage from "../../wapGlobal/Pages/MyMessage/ReadMessage"
import HistoryPage from "../../wapGlobal/Pages/HistoryPage/HistoryPage"
import EditPassword from "../../wapGlobal/Pages/EditPassword/EditPassword"
import CardManage from "../../wapGlobal/Pages/CardManage/CardManage_noWeixin";
import AddCard from '../../wapGlobal/Pages/CardManage/AddCard';
import AddQrCode from '../../wapGlobal/Pages/CardManage/AddQrCode';
import SettingPage from '../../wapGlobal/Pages/SettingPage/SettingPage'
import MoneyManage from '../../wapGlobal/Pages/MoneyManage/MoneyManage'
import TransferPage from '../../wapGlobal/Pages/TransferPage/TransferPage'
import DepositPage from '../../wapGlobal/Pages/DepositPage/DepositPage_bt6'
import WithdrawPage from '../../wapGlobal/Pages/WithdrawPage/WithdrawPage_noVerfyPhone'
import LottoPage from '../../wapGlobal/Pages/LottoPage/LottoPage'
import StatementPage from '../../wapGlobal/Pages/StatementPage/StatementPage'
import HotActivity from '../../wapGlobal/Pages/HotActivity/HotActivity'
//import AffixService_Callback from "../../../global/Components/AffixService/AffixHide/AffixService_Callback" //电话回访


//加载该站点自有的样式

import "./style/skin.scss"
export default class Requirement extends BaseRequirement {
    constructor() {
        super();
        this.r("RouterWap", RouterWap);
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
        this.r('HotActivity',HotActivity);
        this.r("AffixService_Callback", AffixService_Callback);
        {
            this.r('LottoPage',LottoPage);
            this.r('StatementPage',StatementPage)
        }
    }
}