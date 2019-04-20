
import React, {Component} from 'react';

import { Link, IndexLink } from 'react-router';
import {connect} from 'react-redux';
import {auth} from "globalAction";
import './SportPage.scss';
import bannerLeft from './images/onelab-banner-2-new.jpg';
import bannerRight from './images/onelab-slot1.gif'
class SportPage2 extends Component {

    constructor (props){
        super(props);
        this.state = {
            selGameId:this.props.routeParams.GamePlatform || "SB",//默认显示沙巴体育
            width:"1040px",
            gameUrl:""//默认显示沙巴体育
        };

    }
    componentDidMount(){
        let gameObj = this.getGameObjByGamePlatform(this.state.selGameId);
        if(gameObj){
            this.onClickGame(gameObj);
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.routeParams.GamePlatform != nextProps.routeParams.GamePlatform){
            let gameObj = this.getGameObjByGamePlatform(nextProps.routeParams.GamePlatform);
            if(gameObj){
                this.onClickGame(gameObj);
            }
        }
        if(this.props.sportGames.length != nextProps.sportGames.length){
            this.onClickGame(nextProps.sportGames[0]);
        }
    }
    onClickGame(game) {
        if (!auth()) {
            return;
        }
        let gameLink;
        let parma = {
            GamePlatform:game.GamePlatform,
            GameType:game.GameTypeText,
            GameId:game.GameIdentify,
            IsMobile:false,
            IsDemo:false
        }

        // let windowOpen = window.Util.windowOpen('Sport');
        let _this = this;
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                gameLink = res.GameLoginUrl;
                _this.setState({
                    gameUrl:gameLink,
                    selGameId:game.Id,
                    width:"1200px"
                })
            }else{
                swal(res.Message)
            }
        })


    }

    getGameObjByGamePlatform(GamePlatform){
        let GameObj="";
        for(var i = 0; i< this.props.sportGames.length; i++){
            if(this.props.sportGames[i].GamePlatform == GamePlatform){
                GameObj=this.props.sportGames[i];
                break;
            }
        }
        return GameObj;
    }
    render() {
        let sportGames = [];
        if(!this.props.user.username){
            for(let i = 0; i< this.props.sportGames.length; i++){
                if(this.props.sportGames[i].GamePlatform != "N188"){
                    sportGames.push(this.props.sportGames[i]);
                }
            }
        }else{
            sportGames=this.props.sportGames;
        }
        let _this = this;
        return (
            <div className="sport-content" >
                <div className="row">
                    <div className="col-md-8">
                        <a className="banner_left">
                            <img src={bannerLeft} />
                        </a>
                    </div>
                    <div className="col-md-4">
                        <a className="banner_right">
                            <img src={bannerRight} />
                        </a>
                    </div>
                </div>
                <div className="sportnav">
                    {
                        sportGames.map((item, index)=>{
                            var active = _this.state.selGameId==item.Id?"active":"";
                            return (
                                <a key={index} className={active} onClick={this.onClickGame.bind(this, item)}>
                                    {item.Title}
                                </a>
                            );
                        })
                    }
                </div>
                <div  style={{width:this.state.width,margin:'0 auto'}}>
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