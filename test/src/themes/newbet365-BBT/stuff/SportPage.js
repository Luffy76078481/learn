
import React, {Component} from 'react';
import { Link, IndexLink } from 'react-router';
import {connect} from 'react-redux';
import {auth} from "globalAction";
import {ApiQuerySportGamesAction} from "globalAction";
import './css/SportPage.scss';
import loadingImg from '../page/index/images/bet365/sport/bx_loader.gif';
class SportPage2 extends Component {

    constructor (props){
        super(props);
        this.state = {
            selGameId:"",
            sportLink:"about:blank",
            width:"1300px",
            gameUrl:"https://sport.ugamingservice.com", // SB
            isLoading:false,//体育游戏加载中...
            OneGamePlatform:"",
            OneGameTypeText:"",
            OneGameIdentify:""
        };
        this.textMap = {
            "T188": "游戏丰富多元，公平公正的经营理念",
            "N188": "游戏丰富多元，公平公正的经营理念",
            "SB": "国际顶尖综合娱乐平台开发，每月提供超过5000场体育赛事",
            "OPUS": "亚洲知名最稳定、最安全的体育游戏平台",
            "TB": "知名体育平台之一，赛事多元化，投注玩法多样化",
            "coming": "敬请期待更多好玩、刺激的游戏"
        }
    }
    componentDidMount() {
        window.$("#root").attr("class", "sportcss");
        if(this.props.user.username){
            new window.actions.ApiQuerySportGamesAction().fly((resp)=>{
                this.onClickGame(resp.Page[0],true)
            },"sportMarkIds")
        }
    }
    loadingDom(){
        return(
            <div className="loaderDom">
                <img src={loadingImg} />
            </div>
        )
    }
    onClickGame(game,firstShow=false) {
        if (!auth()) {
            return;
        }
        let _this = this;
        this.setState({
            isLoading:true,
        })
        let gameLink;
        let parma = {
            GamePlatform:game.GamePlatform,
            GameType:game.GameTypeText,
            GameId:game.GameIdentify,
            IsMobile:false,
            IsDemo:false,
        }
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                gameLink = res.GameLoginUrl;
                if (game.Title.indexOf("皇冠体育") >= 0) {
                    _this.setState({
                        isLoading:false,
                        gameUrl:gameLink,
                        selGameId:game.Id,
                        width:"1300px",           
                    })
                }
                else{
                    _this.setState({
                        isLoading:false,
                        gameUrl:gameLink,
                        selGameId:game.Id,
                        width:"1300px"
                    })
                }
            }
            else if(res.StatusCode == 1){
                window.swal({
                    title: res.Message,
                    text: "",
                    type: "warning",
                    cancelButtonText: "关闭",
                });
                return;
            }
        })
    }
    serversOpen(e){
        e.preventDefault();
        if(e.target.id=='test'){
            window.swal({
                    title: "忘记密码",
                    text: "联系在线客服协助修改密码",
                    confirmButtonColor: "#c5841f",
                    confirmButtonText: "联系客服",
                    showCancelButton: true,
                    cancelButtonText: "关闭",
                },
                ()=>{
                    window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
                });
            return;
        }
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=900,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=450,screenY=250');
        return false;
    }

    render() {
        let sportGames = this.props.sportGames.slice();
        let _this = this;
        return (
            <div className="sport-content" style={{width:this.state.width}}>
                <div className="sportnav">
                    {
                        sportGames.map((item, index)=>{
                            var action = _this.state.selGameId==item.Id?"active ":"";
                            return (
                                <a key={index} className={action} onClick={this.onClickGame.bind(this, item,false)}>
                                    <span className={"sport_"+item.GamePlatform}></span>
                                </a>
                            );
                        })
                    }
                </div>
                <div className="sportContent">
                    {
                        !this.state.isLoading?
                        <iframe ref="iframeGame" src={this.state.gameUrl} width="100%" height="1000px" frameBorder="0" />: 
                        this.loadingDom()
                    }                 
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        sportGames:state.game.sportGames,
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps, {})(SportPage2);