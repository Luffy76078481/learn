/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';
import './AgPage2.scss'

import {connect} from 'react-redux';


class AgPage2 extends Component {
    constructor(props) {
        super(props);
    }
    
    onClickGameLink(parma) {
        if (!window.actions.auth()) {
            return;
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
        window.$("#root").attr("class", "agcss");
        document.title = window.config.title;
    }
    render() {
        let gameContent = this.props.agGames;
        let  gameLink,bbinLink
        if(gameContent.length>0){
            gameLink = {
                GamePlatform:gameContent[0].GamePlatform,
                GameType:gameContent[0].GameTypeText,
                GameId:gameContent[0].GameIdentify,
                IsMobile:false,
                IsDemo:false,
            };
            bbinLink = {
                GamePlatform:gameContent[1].GamePlatform,
                GameType:gameContent[1].GameTypeText,
                GameId:gameContent[1].GameIdentify,
                IsMobile:false,
                IsDemo:false,
            };
        }
   
        const ImageGallery = window.r.get("ImageGallery");
        const options2 = window.r.props('ImageGallery');
        let height = options2.agPageHeight || options2.height || "170px";
        return (
            <article id="ag-game">
                {ImageGallery &&
                <ImageGallery width="100%" height={height} type="ag_banner_imgs" imgtype='banner'/>}
                
                <div className="gogame" onClick={this.onClickGameLink.bind(this, gameLink)}></div>
                 <div className="main">
                    <div className='street_box'>
                        <div className='street_center'>
                                <div className='street_kaiyuan street_ag' onClick={this.onClickGameLink.bind(this, gameLink)}>
                                <div className='street_start'>马上游戏</div>
                                <div className='shadom'></div>
                            </div>
                                <div className='street_yoplay street_bbin' onClick={this.onClickGameLink.bind(this, bbinLink)}>
                                <div className='street_start'>马上游戏</div>
                                <div className='shadom'></div>
                            </div>
                        </div>
                    </div>
                 </div>
            </article>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
        agGames:state.game.agByGames

    }
);

export default connect(mapStateToProps, {})(AgPage2);