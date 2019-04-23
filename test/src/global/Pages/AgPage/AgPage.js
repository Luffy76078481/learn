/**
 * fish page
 */
import React, {Component} from 'react';
import './AgPage.scss'
import {connect} from 'react-redux';
import {config} from "globalConfig";

class AgPage extends Component {
    onClickGameLink() {
        if (!window.actions.auth()) {
            return;
        }
        let parma = {
            GamePlatform:"AG",
            GameType:"slot",
            //GameType:"Electron",
            GameId:6,
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen('AgGame');
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    componentDidMount() {
        window.$("#root").attr("class", "usefulcss");
    }
    fishCodeRender(){
        let ret = []
        if(config.gameTag!="dafa"){
            ret.push(
                <img src={require("./images/code_"+window.config.gameTag+".png")} key="Fishimg"/>
            )
        }
        else{
            ret.push(
                <img src={'http://qr.liantu.com/api.php?w=200&h=200&text=https://'+location.hostname+'/_promotion/web/index.html'} key="FishLink"/>
            )
        }
        return ret;        
    }
    render() {    
        const toDecimalNumber = window.toDecimalNumber;
        //const gameLink = 'AC656FE07A6E414FBA69A1F5DAA05ED4'; // 捕鱼ID
        return (
            <article id="ag-game">
                <img className="fishing_title" src={require( './images/fishing_title.png')} alt="捕鱼游戏" title="捕鱼游戏"/>
                <div data-wow-duration="2s" className="fishing_bg wow fadeIn animated" style={{visibility: "visible", animationDuration: "2s", animationName: "fadeIn"}}></div>
                <div className="fish_float_box">
                    <div data-wow-duration="12s " className="top_shark wow fadeInUp" style={{visibility: "hidden", animationDuration: "12s", animationName: "none"}}></div>
                    <img className="float_turtle" src={require('./images/float_turtle.png')} />
                    <img className="float_fish" src={require('./images/float_fish.png')} />
                </div>
                <div>
                </div>
                <div data-wow-duration="2s" id="wrapwcent" className="fishing_box wow fadeInDown animated" style={{visibility: "visible", animationDuration: "2s", animationName: "fadeInDown"}}>
                    <div className="fishing">
                        <img className="fh_ban" src={require('./images/fh_ban.jpg')}/>
                        <ul>
                            <li><a target="_blank" href="javascript:void(0)" onClick={this.onClickGameLink.bind(this)}><div className="lotto-game"></div><button className="btn1" onClick={this.onClickGameLink.bind(this)}>开始游戏</button></a></li>
                            <li>
                                <div className="fh_qrcode">
                                    {this.fishCodeRender()}
                                    <p>手机版app</p>
                                </div>
                            </li>
                            <li><div className="numpop"><p><span className="jackpot">{toDecimalNumber(parseInt(Math.random()*100)+2807)}</span></p><p>在线游戏人数</p></div></li>
                        </ul>
                    </div>
                </div>

            </article>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
    }
);

export default connect(mapStateToProps, {})(AgPage);