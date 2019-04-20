
//公共路由
import RouterWap from "globalRouter";
//页面部分
import BaseRequirement  from "../common/base";
import Frame            from "../../wapGlobal/Pages/Frame/Frame_noWeixin";
import SideBar          from "../../wapGlobal/Pages/SideBar/SideBar";
import FooterBar        from "./stuff/FooterBar/FooterBar_new";
import FirstPage        from "./stuff/FirstPage/FirstPage";
import VerifyCode       from "../../../global/Components/VerifyCode/VerifyCode";
import LoginPage        from "./stuff/LoginPage/LoginPage";
import RegisterPage     from "./stuff/RegisterPage/RegisterPage";
import HelpPage         from "../../wapGlobal/Pages/HelpPage/HelpPage";
import ServicePage      from "./stuff/ServicePage/ServicePage"
import Feedback         from "../../wapGlobal/Pages/Feedback/Feedback"
import AllGamePage      from "./stuff/AllGamePage/AllGamePage"
import MyMessage        from "./stuff/MyMessage/MyMessage"
import ReadMessage      from "../../wapGlobal/Pages/MyMessage/ReadMessage"
import HistoryPage      from "./stuff/HistoryPage/HistoryPage"
import EditPassword     from "./stuff/EditPassword/EditPassword"
import CardManage       from "./stuff/CardManage/CardManage";
import AddCard          from '../../wapGlobal/Pages/CardManage/AddCard';
import AddQrCode        from '../../wapGlobal/Pages/CardManage/AddQrCode';
import SettingPage      from './stuff/SettingPage/SettingPage'
import MoneyManage      from './stuff/MoneyManage/MoneyManage'
import TransferPage     from '../../wapGlobal/Pages/TransferPage/TransferPage'
import DepositPage      from './stuff/DepositPage/DepositPage_bt6'
import WithdrawPage     from './stuff/WithdrawPage/WithdrawPage'
import LottoPage        from '../../wapGlobal/Pages/LottoPage/LottoPage'
import StatementPage    from '../../wapGlobal/Pages/StatementPage/StatementPage'
import HotActivity      from '../../wapGlobal/Pages/HotActivity/HotActivity'
import AgentReg         from './stuff/AgentReg/AgentReg'
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
        this.r('AgentReg',AgentReg);
        {
            this.r('LottoPage',LottoPage);
            this.r('StatementPage',StatementPage)
        }
    }
}