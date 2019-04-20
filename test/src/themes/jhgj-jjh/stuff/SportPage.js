/**
 * Created by xm on 2017/5/8.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import './css/SportPage.scss';
import {ApiGetLoginUrl, auth} from "globalAction";
class SportPage2 extends Component {
    constructor (props){
        super(props);
        this.state = {selGameId:"", sportLink:"about:blank", width:"1020px"};
        this.textMap = {
            "T188": "游戏丰富多元，公平公正的经营理念",
            "N188": "游戏丰富多元，公平公正的经营理念",
            "SB": "国际顶尖综合娱乐平台开发，每月提供超过5000场体育赛事",
            "OPUS": "亚洲知名最稳定、最安全的体育游戏平台",
            "TB": "知名体育平台之一，赛事多元化，投注玩法多样化",
            "coming": "敬请期待更多好玩、刺激的游戏"
        }
        this.onClickGame = this.onClickGame.bind(this);
     }
    componentDidMount() {
        window.$("#root").attr("class", "usefulcss");
    }

    onClickGame(game,event) {
        if($(event.target).hasClass("sportRule")){
            var ruleLink = window.config.spec+"_sport_rule.html";
            window.open(ruleLink,'_blank');

        }else {
            if (!auth()) {
                return;
            }
            let parma = {
                GamePlatform:game.GamePlatform,
                GameType:game.GameTypeText,
                GameId:game.GameIdentify,
                IsMobile:false,
                IsDemo:false,
            }
            let windowOpen = window.Util.windowOpen('Sport');
            new window.actions.ApiGetLoginUrl(parma).fly(res=>{
                if(res.StatusCode == 0){
                    let gameLink = res.GameLoginUrl;
                    windowOpen.location.href= gameLink;
                }else{
                    windowOpen.urlError(res.Message);
                }
            })
        }

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
                Title: "敬请期待"
            })
        }
        const ImageGallery = window.r.get("ImageGallery");
        const options = window.r.props('SportPage');
        const options2 = window.r.props('ImageGallery');
        let height = options2.sportHeight || options2.height || "170px";
        return (
            <div className="sport-content">
                {ImageGallery && <ImageGallery width="100%" height={height} type="sport_banner_imgs" imgtype='banner' />}
                <div className="wow  sport-div">
                    <ul className="sport-card fadeInUp animated">
                            {
                                sportGames.map((item, index)=>{
                                    return (
                                        <li key={index} className={item.GamePlatform} onClick={(event)=>{this.onClickGame(item, event)}}>
                                            <div className="logo">{item.Title}</div>
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