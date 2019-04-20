/**
 * xhtd- 彩票
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {auth} from "globalAction";
//import Particles from 'react-particles-js';
import './bingo2.scss'

class BingoPage extends Component {
    constructor (props){
        super();
    }
    componentDidMount() {
        window.$("#root").attr("class", "agcss");
    }
    onClickGame(GamePlatform) {
        if (!auth()) {
            return;
        }
        let parma = {
            GamePlatform:GamePlatform,
            GameType:"Lottery",
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen("Bingo");
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
        this.props.bingoGames.forEach(item=>{
            if(!item.GameIdentify){
                list.push(
                    <div key={item.Id} className={"bin" + " " + item.GamePlatform.toLowerCase()} onClick={this.onClickGame.bind(this,item.GamePlatform)}></div>
                )
            }

        });
        // 敬请期待
        if(list.length < 3){
            list.push(
                <div className="more bin twoLine" ></div>
            )
        }
        return list;

    }
    render() {
        const ImageGallery = window.r.get("ImageGallery");
        const options = window.r.props("ImageGallery");
        const height = options.bingoHeight || options.height || "400px";

        return (
            <article id="bingo">
                <ImageGallery width="100%" height={height} type="bingo_banner_imgs" imgtype='banner'></ImageGallery>}
                {/* 内容部分 */}
                <div className="main" id="wrapwcent">
                    {this.renderBingoList()}            
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