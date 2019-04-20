import React, {Component} from 'react';

import {connect} from 'react-redux';
import './StreetMachine.scss'

class StreetMachine extends Component{
    constructor(props){
        super(props)
        this.state = {
            selCategoryId: "",
            selPlatformId: "KY",
            loading:false,
            allGames:{},
        };
    }
    componentDidMount(){
        this.onSelectCategory()
    }

    onSelectCategory(category) {
        this.inited = true;
        this.toPage(1);
    }
    toPage(pageNo = 1) {
        let filter = {};
        const pgsize = StreetMachine.pgsize  || 18; 
        filter.GamePlatform = 'KY';
        filter.GameMarks=''
        filter.TerminalType="PC";
        filter.YoPlay='';
        filter.GameType = 4;
        
        new window.actions.ApiQueryGamesAction(filter, pageNo , pgsize).fly();

    }

    toNextPage() {
        if (this.props.StreetGames.pageNo >= this.props.StreetGames.totalPage) {
            return;
        }
        this.toPage(this.props.StreetGames.pageNo + 1);
    }

    toPrevPage() {
        if (this.props.StreetGames.pageNo <= 1) {
            return;
        }
        this.toPage(this.props.StreetGames.pageNo - 1);
    }
    renderPlatfromList() {
        var platformLists = [];

        for (var i = 0; i < this.props.platforms.length; i++) {
            var platform = this.props.platforms[i];
            if(!platform.showSlot){
                continue;
            }

            platformLists.push(
                <li key={platform.id} className={this.state.selPlatformId === platform.id  ? "active color-highlight" : "color-main"}>
                    <a href="javascript:void(0)" onClick={this.onSelectPlatform.bind(this, platform)}>
                        {platform.name2?platform.name2:platform.name}
                    </a>
                </li>
            );

        }
        return platformLists;
    }
    onClickGame(link) {
        window.actions.authToLink(link);
    }
    renderLoading(){
        return(<div className="games-loader"></div>)
    }
    renderGames() {
        const toDecimalNumber = window.toDecimalNumber;
        var ret = [];
        let listLength =this.props.StreetGames.rows.length;
        var _this = this;
        
         for (var i = 0; i < listLength; i++) {
            var g = this.props.StreetGames.rows[i];
            var imgUrl = window.config.prdImgUrl +  g.ImageUrl;
            var gameLink = window.configHelper.getGamePlayLink(g.id);
            ret.push(
                <div key={i} className="wrapper-game-list-item wrapper-game-list-img width-25 fadeInUp" >
                    {/*{g.jackpot&&g.jackpotAmount?<div className="jackPot"><span className="jackpot">{toDecimalNumber(g.jackpotAmount)}</span>  CNY</div>:null}*/}
                    <div className="game-list-item">
                        <img className="gameImg" src={imgUrl} onClick={_this.onClickGame.bind(_this, gameLink)}/>
                        <div className="game-hover">
                            <div className="game-hover-inner">
                                <div className="game-hover-wrapper">
                                    <p className="game-title">{g.name}</p>
                                    <a onClick={_this.onClickGame.bind(_this, gameLink)} className="btn frSelected">开始游戏</a>
                                    <span className="game-hover-options">
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return ret;
    }
    renderGamePage() {
        var ret = [];
        var invalidTag = false;
        for (var i = 1; i <= this.props.StreetGames.totalPage; i++) {
            if (i !== 1 && i !== this.props.StreetGames.totalPage && Math.abs(this.props.StreetGames.pageNo - i) >= 3) {
                invalidTag = true;
                continue;
            }
            if (invalidTag) {
                ret.push(
                    <li key={"ex" + i}>
                        <a　className="BGcolor-third border-type color-main" href="javascript:void(0)">...</a>
                    </li>
                )
                invalidTag = false;
            }
            ret.push(
                <li key={i} className={i === this.props.StreetGames.pageNo ? "active" : "BGcolor-main color-main"}>
                    <a className={i === this.props.StreetGames.pageNo ? "BGcolor-main color-highlight  border-type" : "BGcolor-third color-main border-type"} href="javascript:void(0)" onClick={this.toPage.bind(this, i)}>{i}</a>
                </li>
            )
        }
        return ret;
    }

    render(){
        const ImageGallery = window.r.get("ImageGallery");
        return(
            <div className="streetMachine">
                <div className="banner"> 
                    <ImageGallery width="100%" height="360px" type="jieji_banner_imgs" class="game_list_top_img" imgtype='slider'></ImageGallery>
                </div>
                <div className="game-list-fname2">
                    <div className="game-list-left-nav fadeInUp">
                        <ul>
                            {this.renderPlatfromList()}
                        </ul>
                    </div>

                    <div className="game-list-mid-box" >
                        <div className="game_down_content">
                            <div className="games_box" id="games-container">
                                {this.state.loading?this.renderLoading():this.renderGames()}
                                <div className="clear"></div>
                                <nav id="game-page" className="wow"
                                     style={{visibility: "visible", animationName: "fadeInUp"}}>
                                    <ul className="pager">
                                        <li><a className="BGcolor-second color-second  border-type" href="javascript:void(0)" onClick={this.toPrevPage.bind(this)}>上一页</a></li>
                                        {this.renderGamePage()}
                                        <li><a className="BGcolor-second color-second  border-type" href="javascript:void(0)" onClick={this.toNextPage.bind(this)}>下一页</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        platforms: state.game.slot_platforms,
        StreetGames:state.game.StreetGames,
    }
);

export default connect(mapStateToProps,{})(StreetMachine);
