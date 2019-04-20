
/**
 *    update ----------------------------------------> lottery
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {auth} from "globalAction";
import './bingo2.scss'

class BingoPage extends Component {

    constructor (props){
        super();
    }
    componentDidMount() {
        window.$("#root").attr("class", "agcss");
    }
    //bbin
    onClickGame(e) {
        if (!auth()) {
            return;
        }
        let parma = {
            GamePlatform:"BBIN",
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
    //kg
    onClickKenoGame(e) {
        if (!auth()) {
            return;
        }
        let parma = {
            GamePlatform:"KG",
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
    //cg
    onClickTCGame(e) {
        if (!auth()) {
            return;
        }
        let parma = {
            GamePlatform:"CG",
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
    // fc
    onClickFcGgame(e) {
        if (!auth()) {
            return;
        }
        let parma = {
            GamePlatform:"FC",
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
        const height = options.bingoHeight || options.height || "400px";
        const options2 = window.r.props("BingoPage");

        return (
            <article id="bingo">
                <ImageGallery width="100%" height={height} type="bingo_banner_imgs" imgtype='banner'></ImageGallery>
                {/* fc彩票 */}
                <div className="fc bin" onClick={this.onClickFcGgame.bind(this)}>
                    <a>
                        <div className="bingo_fc bingo_item">
                        </div>
                    </a>
                    <div className="txtGroup">
                        <div className="title">丰彩</div>
                        {window.config.spec!="manbet"?
                        <div className="txt">热门六合彩，最低下注1元，波音老品牌，值得您的信赖</div>:
                        <div className="txt">六合彩／时时彩／分分彩／3D彩，应有尽有。官方同步开奖，更高中奖率，感受彩票无限乐趣。</div>}
                    
                    </div>
                    <a>
                        <div className="b-btn">{options2.btnTxt||""}</div>
                    </a>
                </div>  
                {/* cg彩票 */}
                <div className="cg bin twoLine" onClick={this.onClickTCGame.bind(this)}>
                    <a className="lotto-game">
                        <div className="bingo_cg bingo_item">
                        </div>
                    </a>
                    <div className="txtGroup">
                        <div className="title">CG</div>
                        {window.config.spec!="manbet"?
                            <div className="txt">种类多样彩票平台，移动端一流的服务体验，让您随时随地极致享乐</div>:
                            <div className="txt">快乐彩、时时彩、六合彩游戏多样化，应有尽有，尽情体验精彩游戏。</div>}
                    </div>
                    <a>
                        <div className="b-btn">{options2.btnTxt||""}</div>
                    </a>
                </div>
                {/* kg彩票 */}
                <div className="kg bin" onClick={this.onClickKenoGame.bind(this)}>
                    <a className="lotto-game">
                        <div className="bingo_kg bingo_item">
                        </div>
                    </a>
                    <div className="txtGroup">
                        <div className="title">KG</div>
                        {window.config.spec!="manbet"?
                            <div className="txt">最全的彩票平台，移动端一流的服务体验，让您随时随地极致享乐</div>:
                            <div className="txt">快乐彩、时时彩、六合彩游戏多样化，玩家可自订介面，尽情体验精彩游戏。</div>}
                    </div>
                    <a>
                        <div className="b-btn">{options2.btnTxt||""}</div>
                    </a>
                </div>
                {/* bbin彩票 */}
                <div className="bbin bin" onClick={this.onClickGame.bind(this)}>
                    <a>
                        <div className="bingo_bbin bingo_item">
                        </div>
                    </a>
                    <div className="txtGroup">
                        <div className="title">BBIN</div>
                        {window.config.spec!="manbet"?
                        <div className="txt">热门六合彩，最低下注1元，波音老品牌，值得您的信赖</div>:
                        <div className="txt">六合彩／时时彩／分分彩／3D彩，应有尽有。官方同步开奖，更高中奖率，感受彩票无限乐趣。</div>}

                    </div>
                    <a>
                        <div className="b-btn">{options2.btnTxt||""}</div>
                    </a>
                </div>
                {/* <div className="more bin twoLine" >
                    <a href="">
                        <div className="bingo_more bingo_item">
                        </div>
                    </a>
                    <div className="txtGroup">
                        <div className="title">{options2.title ||"敬请期待"}。</div>
                        <div className="txt">种类多样彩票平台，移动端一流的服务体验，让您随时随地极致享乐</div>:
                        <div className="txt"></div>
                    </div>
                    <a href="">
                        <div className="b-btn">{options2.btnTxt||""}</div>
                    </a>
                </div> */}
            </article>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {}
);

export default connect(mapStateToProps, {})(BingoPage);