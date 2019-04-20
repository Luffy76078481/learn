/**
 * ppp-sport
 */

import React, {Component} from 'react';
import {auth} from "globalAction";
import {connect} from 'react-redux';
import './SportPage.scss';

class SportPage2 extends Component {

    constructor (props){
        super(props);
        this.state = {
            selGameId:"", 
            sportLink:"about:blank", 
            width:"1020px",
            reqLock:false
        };
        this.textMap = {
            "T188": "游戏丰富多元，公平公正的经营理念",
            "N188": "游戏丰富多元，公平公正的经营理念",
            "SB": "国际顶尖综合娱乐平台开发，每月提供超过5000场体育赛事",
            "OPUS": "亚洲知名最稳定、最安全的体育游戏平台",
            "TB": "知名体育平台之一，赛事多元化，投注玩法多样化",
            "coming": "敬请期待更多好玩、刺激的游戏"
        }
        //this.onClickGame = this.onClickGame.bind(this);
     }
    componentDidMount() {
        window.$("#root").attr("class", "usefulcss");
    }

    onClickGame(game) {
        if(game.GamePlatform=='coming'){
            return
        }
        // 未登录
        if (!auth()) {
            return;
        }
        if(this.state.reqLock)
        return;
        this.state.reqLock =true;
        let gameLink;
        var _self = this;
        var width = 1366;
        let parma = {
            GamePlatform:game.GamePlatform,
            GameType:game.GameTypeText,
            GameId:game.GameIdentify,
            IsMobile:false,
            IsDemo:false,
        }
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                // 游戏链接
                gameLink = res.GameLoginUrl;
                if (game.Title.indexOf("皇冠体育") >= 0) {
                    width = 1190;
                }
                window.open(gameLink,'game',"width="+width+"px,height=700px,directories=0,alwaysRaised=0,depended=1,z-look=1,location=0, menubar=0,scrollbars=0,status=0,toolbar=0,resizable=1,left=5,top=50,screenX=350,screenY=250", true);
            }
            else{
                alert(res.Message)
            }
            _self.state.reqLock = false;
        })
    }

    render() {
        let sportGames = [];
        //用户未登陆不显示N188体育
        if(!this.props.user.username){
            for(let i = 0; i< this.props.sportGames.length; i++){
                if(this.props.sportGames[i].GamePlatform != "N188"){
                    sportGames.push(this.props.sportGames[i]);
                }
            }
        }else{
            sportGames = this.props.sportGames.slice();
        }
        if(sportGames.length % 2 == 1){
            sportGames.push({
                GamePlatform: "coming",
                name: "敬请期待"
            })
        }
        const ImageGallery = window.r.get("ImageGallery");
        const options = window.r.props('SportPage');
        const options2 = window.r.props('ImageGallery');
        let height = options2.sportHeight || options2.height || "170px";
        let type = options2.sportType || "sport_banner_imgs"
        return (
            <div className="sport-content">
                {ImageGallery && <ImageGallery width="100%" height={height} type={type} imgtype='banner' />}
                <div className="wow  sport-div">
                    <ul className="sport-card fadeInUp animated">
                        {
                            sportGames.map((item, index)=>{
                                return (
                                    <li key={index} className={item.GamePlatform} onClick={(event)=>{this.onClickGame(item, event)}}>
                                        <div className="logo">{item.Title?item.Title:"敬请期待"}</div>
                                        <div className="body">
                                            <div className="inner-logo"></div>
                                        </div>
                                        <div className="foot">{this.textMap[item.GamePlatform]}</div>
                                        {item.GamePlatform !== "coming" &&
                                        <div className="mask">
                                            <a className="start">{!options.hideText?'开始游戏':''}</a>
                                            {!options.sportRule?null: <a className="sportRule"></a>}
                                        </div>
                                        }
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        sportGames:state.game.sportGames
    }
);

export default connect(mapStateToProps, {})(SportPage2);