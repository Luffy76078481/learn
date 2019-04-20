

import React, {Component} from 'react';
import {connect} from 'react-redux';
import './bingo2.scss'
import {auth} from "globalAction";
//import Particles from 'react-particles-js';

class BingoPage extends Component {
    constructor (props){
        super();
    }
    componentDidMount() {
        window.$("#root").attr("class", "agcss");
        // document.title = "dafa在线快乐彩|dafabet彩票正式上线，亚洲最好的在线彩票"
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
        return list
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
        return (
            <article id="bingo">
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