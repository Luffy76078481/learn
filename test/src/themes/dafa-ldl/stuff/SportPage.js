
import React, {Component} from 'react';

import { Link, IndexLink } from 'react-router';
import {connect} from 'react-redux';
import {auth} from "globalAction";
import './css/SportPage2.scss';

class SportPage2 extends Component {

    constructor (props){
        super(props);
        this.state = {
            selGameId:"",
            sportLink:"about:blank",
            width:"1040px",
            gameUrl:""
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
        document.title = "大发体育-在线体育投注、足球赔率| Dafabet.com";
    }
    onClickGame(game,firstShow=false) {
        if (!auth()) {
            return;
        }
        let gameLink;
        let parma = {
            GamePlatform:game.GamePlatform,
            GameType:game.GameTypeText,
            GameId:game.GameIdentify,
            IsMobile:false,
            IsDemo:false,
        }

        // let windowOpen = window.Util.windowOpen('Sport');
        let _this = this;
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                gameLink = res.GameLoginUrl;
                if(firstShow){
                    _this.state = {
                        selGameId:game.Id,
                        sportLink:"about:blank",
                        width:"1040px",
                        gameUrl:gameLink
                    };
                }else{
                    if (game.Title.indexOf("皇冠体育") >= 0) {
                        _this.setState({
                            gameUrl:gameLink,
                            selGameId:game.Id,
                            width:"1170px"
                        })
                    }else{
                        _this.setState({
                            gameUrl:gameLink,
                            selGameId:game.Id,
                            width:"1040px"
                        })
                    }
                }
            }else{
                alert(res.Message)
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
        let sportGames = [];
        // 默认展示沙巴游戏
        let OPUS_url = 'https://sbops.defengbet.com/sports.aspx';//OPUS体育
        if(!this.props.user.username){
            for(let i = 0; i< this.props.sportGames.length; i++){
                if(this.props.sportGames[i].GamePlatform != "N188"){
                    sportGames.push(this.props.sportGames[i]);
                }
            }
            if(sportGames.length>0 && this.state.gameUrl==""){
                // this.onClickGame(sportGames[0],true)
                this.state.gameUrl = OPUS_url;
            }
        }else{
            sportGames = this.props.sportGames.slice();
            if(sportGames.length>0 && this.state.gameUrl==""){
                this.onClickGame(sportGames[0],true)
            }
        }
        const options = window.r.props('SportPage');
        let _this = this;
        return (
            <div className="sport-content" style={{width:this.state.width}}>
                <div className="sportnav">
                    {
                        sportGames.map((item, index)=>{
                            var action = _this.state.selGameId==item.Id?"active":"";
                            return (
                                <a key={index} className={action} onClick={this.onClickGame.bind(this, item,false)}>
                                    {item.Title}
                                </a>
                            );
                        })
                    }
                    {/*<a href="/help.html" target="_blank" className="color-main">帮助答疑</a>*/}
                </div>
                <div >
                    <iframe ref="iframeGame" src={this.state.gameUrl} width="100%" height="1000px" frameBorder="0" />

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