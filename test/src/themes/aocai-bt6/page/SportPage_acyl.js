/**
 * Created by xm on 2017/5/8.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./css/SportPage.scss"
import {ApiGetLoginUrl, auth} from "globalAction";
class SportPage extends Component {

    constructor(props) {
        super(props);
        this.state = { selGameId: "", sportLink: "about:blank", width: "1020px" };
        this.onClickGame = this.onClickGame.bind(this);
    }
    componentDidMount() {
        window.$("#root").attr("class", "usefulcss");
    }

    onClickGame(game, event) {
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

    render() {
        let sportGames = [];
        //用户未登陆不显示N188体育
        if (!this.props.user.username) {
            for (let i = 0; i < this.props.sportGames.length; i++) {
                if (this.props.sportGames[i].GamePlatform != "N188") {
                    sportGames.push(this.props.sportGames[i]);
                }
            }
        } else {
            sportGames = this.props.sportGames.slice();
        }
        return (
            <div className="sport-content">
                <div className="sport-content-module ">
                    <div className="content">
                    {
                    sportGames.map((item, index)=>{
                        return (      
                        <div key={index} className={['sportBox'+ ' '+'enabled'+ ' '+item.GamePlatform]} onClick={(event)=>{this.onClickGame(item, event)}}>
                            <div className={['sportimg'+ ' ' +item.GamePlatform]}></div>
                        </div>
                        );
                    })                         
                } 
                          
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        sportGames: state.game.sportGames
    }
);

export default connect(mapStateToProps, {})(SportPage);