/**
 * xin-彩票
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import {auth} from "globalAction";
//import Particles from 'react-particles-js';
import './bingo2.scss'

class BingoPage extends Component {
    constructor (props){
        super(props);
    }
    componentDidMount() {
        window.$("#root").attr("class", "agcss");
    }
    renderBingoList(){
        let list =[];
        this.props.bingoGames.forEach((item,index)=>{
            if(!item.GameIdentify){
                list.push(
                    <div key={index+'bin'} className={"bin" + " " + item.GamePlatform.toLowerCase()} onClick={this.onClickGame.bind(this,item.GamePlatform)}></div>
                )
            }

        });
        // 敬请期待
        if(list.length < 3){
            list.push(
                <div key={'lastbin'} className="more bin" ></div>
            )
        }
        return list;        
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
    render() {
        const ImageGallery = window.r.get("ImageGallery");
        const options = window.r.props("ImageGallery");
        const height = options.bingoHeight || options.height || "240px";
        return (
            <article id="bingo">
                <ImageGallery width="100%" height={height} type="bingo_banner_imgs" imgtype='banner'></ImageGallery>
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