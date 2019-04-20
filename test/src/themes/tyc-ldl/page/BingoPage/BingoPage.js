/**
 * Created by sobi on 2017/9/1.
 */
/**
 * Created by xm on 2017/5/8.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import './bingo.scss'
import {auth} from "globalAction";
import lobbytile from "./images/lobbytile.jpg";

class BingoPage extends Component {

    constructor (props){
        super();
    }

    componentDidMount() {
        window.$("#root").attr("class", "agcss");
        // document.title = "dafa在线快乐彩|dafabet彩票正式上线，亚洲最好的在线彩票"
        document.title = window.config.title;
    }

    onClickGame(game) {
        if (!auth()) {
            return;
        }

        let parma = {
            GamePlatform:game.GamePlatform,
            GameType:"Lottery",
            GameId:game.GameIdentify,
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen('Bingo');
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    renderBingoList(){
        let list =[];
        this.props.bingoGames.forEach((item,index)=>{
            list.push(
                <div  key={index} className="wrapper-game-list-item ">
                    <div className="game-list-item">
                        <img className="game-thumb" src={window.config.prdImgUrl + item.ImageUrl} />
                        <div className="game-hover">
                            <div className="game-hover-inner">
                                <div className="game-hover-wrapper">
                                    <a className="btn pre-login-launch"  onClick={this.onClickGame.bind(this,item)}>马上游戏</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="room-info-wrapper">
                        <div className="room-info">
                            <span className="room-title">{item.Title}</span>
                        </div>
                    </div>
                </div>
            )
        });
        return list;


       
    }

    render() {
        const ImageGallery = window.r.get("ImageGallery");
        const options = window.r.props("ImageGallery");
        const height = options.bingoHeight || options.height || "400px";
        return (
            <article id="bingo">
               <ImageGallery width="100%" height={height} hasOption="true" type="bingo_banner_imgs" imgtype='banner'></ImageGallery>
                <div className="slider-options">
                    <div className="slider-option-items">
                        <div className="item-title">
                            <Link to="/promotions">首存奖金</Link>
                        </div>
                        <p className="text-align-center">
                            大发彩票新玩家<br/>可获高达<strong>88888元</strong>奖金！
                        </p>
                        <div className="item-link">
                            <Link to="/promotions">了解更多</Link>
                        </div>
                    </div>
                    <div className="slider-option-items">
                        <div className="item-title">
                            <Link to="/promotions">无限期返水</Link>
                        </div>
                        <p className="text-align-center">
                           高达1%返水无上限!<br/>尽在大发 天成彩票 BBIN彩票
                        </p>
                        <div className="item-link">
                            <Link to="/promotions">了解更多</Link>
                        </div>
                    </div>
                </div>
                <div id="wrapwcent">
                    {this.renderBingoList()}

                    {/*敬请期待*/}
                    {/*<div className="wrapper-game-list-item ">*/}
                        {/*<div className="game-list-item">*/}
                            {/*<img className="game-thumb" src={lobbytile} />*/}
                        {/*</div>*/}
                        {/*<div className="room-info-wrapper">*/}
                            {/*<div className="room-info">*/}
                                {/*<span className="room-title">敬请期待</span>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}

                </div>
            </article>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        bingoGames:state.game.bingoGames
    }
);

export default connect(mapStateToProps, {})(BingoPage);