/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import "./css/CasinoPage.scss";
import {ApiQueryGamesAction} from "globalAction";
class CasinoPage extends Component {
    onClickGameLink(game) {
        if (!window.actions.auth()) {
            return;
        }
        let parma = {
            GamePlatform:game.PlatformId,
            GameType:1,//Trueman
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen('Casino');
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    renderCansinoList() {
        let CansinoLists = [];
        for (let i = 0; i < this.props.casinos.length; i++) {
            let CansinoList = this.props.casinos[i];
            CansinoLists.push(          
                    <li key={i} className={" c_"+CansinoList.ID+" enabled"} onClick={this.onClickGameLink.bind(this,CansinoList)}></li>
            );
        }
        return CansinoLists;
    }


    render() {
        const CansinoList = this.renderCansinoList();
        const ImageGallery = window.r.get("ImageGallery");
        const options2 = window.r.props('ImageGallery');
        let height = options2.casinoHeight || options2.height || "170px";
        return (
        <div>    
            <article id="casino2">
                <ImageGallery width="100%" height={height} type="casino_banner_imgs" imgtype='banner' />
            </article>
            <div className="casino-content-module ">
                <div className="inner">
                    <ul>
                        {CansinoList}
                    </ul>
                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        casinos : state.views.casinos,
    }
);

export default connect(mapStateToProps, {})(CasinoPage);