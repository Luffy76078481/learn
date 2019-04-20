// ------------------------ 棋牌Web
// 公共路由
import RouterWap from "globalRouter";
// Base window对象方法 window.r window.get
import BaseRequirement from "../common/base";
// 主要页面
import Frame from "../../wapGlobal/Pages/ChessGame/FrameChess";
import ChessPop from "../../wapGlobal/Pages/ChessGame/ChessPop.js" //全局弹窗
import FirstPage from "../../wapGlobal/Pages/ChessGame/FirstPageChess";
import TopBar from "../../wapGlobal/Pages/ChessGame/TopBar";
import FooterBar from "../../wapGlobal/Pages/ChessGame/FooterBar";
import Game from "../../wapGlobal/Pages/ChessGame/game";
import User from "../../wapGlobal/Pages/ChessGame/User"
//功能页
import LoginPage from"../../wapGlobal/Pages/ChessGame/LoginPage";
import RegisterPage from "../../wapGlobal/Pages/ChessGame/RegisterPage";
//二维码
import VerifyCode from "../../../global/Components/VerifyCode/VerifyCode";
//加载该站点自由的router
import BgChange from"../../wapGlobal/Pages/ChessGame/BgChange"; //切换背景
import RequireSelfRouter from './RequireSelfRouter'
// 样式文件
import "./style/skin.scss"
import "./style/variables.scss"
export default class Requirement extends BaseRequirement {
    constructor() {
        super();
        this.r("RouterWap", RouterWap);//路由
        {
            this.r("RequireSelfRouter",RequireSelfRouter);// 私人路由
            this.r("BgChange",BgChange);// 切换背景
            
        }
        this.r("Frame", Frame);
        this.r("ChessPop", ChessPop);
        this.r("FirstPage", FirstPage);
        this.r("TopBar", TopBar);
        {
            this.r("User", User);
        }
        this.r("FooterBar", FooterBar);
        this.r("LoginPage",LoginPage);
        this.r("RegisterPage",RegisterPage);
        this.r("VerifyCode",VerifyCode);
        this.r("Game",Game);
    }
}