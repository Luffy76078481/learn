/**
 * Created by sobi on 2017/7/27.
 */
import React, {Component} from 'react';
import { Link ,browserHistory} from 'react-router';
import {connect} from 'react-redux';
import merge from 'lodash/merge';
import "./GameListPanel2.scss";


class GameListPanel extends Component {

    constructor(props) {
        super(props);
        this.inited = false;
        this.selCategory = null;
        this.initMap = {};
        this.selJackpot = 0;
        let gameID = "AG";
        if(this.props.linkToGames){
            gameID = this.props.linkToGames;
        }
        this.state = {
            selCategoryMarkIds: "",
            selCategoryId: "",
            selPlatformId: gameID,
            platformListStart: 0 ,
            opL: .3,
            opR: 1
        };
        if (this.props.limitPlatform) {
            this.state.selPlatformId = this.props.limitPlatform;
        }

        if (this.props.gameCategories && this.props.gameCategories.length > 0) {
            this.state.selCategoryMarkIds = this.props.gameCategories[0].MarkIds;
            this.state.selCategoryId = this.props.gameCategories[0].ID;
        }
    }

    onClickGame(game){
        if (!window.actions.auth()) {
            return;
        }
        let parma = {
            GamePlatform:game.GamePlatform,
            GameType:game.GameTypeText,
            GameId:game.GameIdentify,
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen('Game');
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }

    onSelectPlatform(platform) {
        this.setState({selPlatformId: platform.ID, selPlatformMarkId: platform.markId});
        this.setState({selPlatformId: platform.ID});
        this.state.selPlatformId =  platform.ID;
        this.toPage(1);
        browserHistory.push("/games?tab="+this.state.selPlatformId);
    }




    renderPlatfromList() {
        var platformLists = [];
        for (var i = 0; i < this.props.slot_platforms.length; i++) {
            var platform = this.props.slot_platforms[i];
            if(!platform.ShowSlot){
                continue;
            }
            platformLists.push(
                <div key={platform.ID} className={this.state.selPlatformId === platform.ID ? "list2_onchoose platform_list2" : "platform_list2"}
                     onClick={this.onSelectPlatform.bind(this, platform)}>{platform.Name2}</div>
            );

        }
        return platformLists;
    }
    componentDidMount() {
        this.componentWillReceiveProps(this.props);

        var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };
        var web = getUrlParameter('tab');
        if(web && web!=null){
            this.setState({selPlatformId: web});
        }
    }

    componentWillReceiveProps(nextProps) {
        var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };
        var web = getUrlParameter('tab');
        if(web && web!=null){
            this.setState({selPlatformId: web});
        }
        if (!this.inited) {
            if (nextProps.gameCategories && nextProps.gameCategories.length > 0) {
                this.inited = true;
                for (var i = 0; i < nextProps.gameCategories.length; i++) {
                    var gc = nextProps.gameCategories[i];
                    // if (gc.name.indexOf("热门") >= 0) {
                    //     this.onSelectCategory(gc);
                    //     return;
                    // }
                }
                var gc = nextProps.gameCategories[0];
                this.onSelectCategory(gc);
            }
        }
    }
    onJackpotChanged(e) {
        if(e.target.checked){
            this.selJackpot=1;
        }else{
            this.selJackpot=0;
        }
        this.toPage();
    }
    onSelectCategory(category) {
        this.setState({selCategoryMarkIds: category.MarkIds,selCategoryId:category.ID});
        this.state.selCategoryMarkIds = category.MarkIds;
        this.state.selCategoryId = category.ID;
        this.toPage(1);
    }
    onSearch(e) {
        e.preventDefault();
        this.toPage(1);
    }
    toPage(pageNo = 1) {
        let GameListPanel = window.r.props("GameListPanel");
        const pgsize = GameListPanel.pgsize  || 18;
        let searchText = this.refs.searchText.value;
        let filter = {};
        let GamePlatform="",YoPlay=0;
        if(this.state.selPlatformId == "YOPLAY"){
            YoPlay=1
        }else{
            GamePlatform=this.state.selPlatformId;
        }
        new window.actions.ApiQueryGameAllCountAction(GamePlatform,YoPlay).fly();
        filter.GameMarks = [];
        filter.GamePlatform = [this.state.selPlatformId];
        if (this.state.selCategoryMarkIds) {
            filter.GameMarks.push(this.state.selCategoryMarkIds);
        }
        if (searchText) {
            filter.GameName = searchText;
        }
        if(this.selJackpot){
            filter.Jackpot = 1;
        }
        filter.GameMarks = filter.GameMarks.join(',');
        filter.GamePlatform = filter.GamePlatform.join(',');
        filter.GameType = 4;
        if(this.state.selPlatformId  == "YOPLAY"){//如果是Yoplay平台的情况下
            filter.YoPlay = 1;
            filter.GamePlatform="";
        }
        new window.actions.ApiQueryGamesAction(filter, pageNo , pgsize).fly();

    }

    toNextPage() {
        if (this.props.games.pageNo >= this.props.games.totalPage) {
            return;
        }
        this.toPage(this.props.games.pageNo + 1);
        
    }

    toPrevPage() {
        if (this.props.games.pageNo <= 1) {
            return;
        }
        this.toPage(this.props.games.pageNo - 1);
    }

    renderGames() {
        const toDecimalNumber = window.toDecimalNumber;
        var ret = [];
        for (var i = 0; i < this.props.games.rows.length; i++) {
            var g = this.props.games.rows[i];
            var imgUrl = window.config.prdImgUrl+ g.ImageUrl;
            // 156,542,04 CNY
            ret.push(
                <li key={i} className="gameItem wow gamesPic"
                    style={{visibility: "visible", animationName: "fadeInUp",width:"30%",height:"auto"}}>
                    {g.ShowJackpots&&g.JackpotsInfo?<div className="jackPot"><span className="jackpot">{toDecimalNumber(g.JackpotsInfo)}</span>  CNY</div>:null}
                    <a target="_blank" href="javascript:void(0)"><img className="gameImg" src={imgUrl} onClick={this.onClickGame.bind(this, g)}/>
                        <span className="game-text game-text-btn BGcolor-second color-second">{g.Title}</span>
                    </a>
                    <a target="_blank" href="javascript:void(0)" className="game-fuceng" onClick={this.onClickGame.bind(this, g)}>
                        <img className="game-start-btn"/>
                    </a>
                </li>
            );
        }
        return ret;
    }
    xpj5BonusBox(){
        return(
            <div className="bonus_box_content">
                <div className="bonusgame bonus1">
                    <div className="bonus_img bonus1_img"></div>
                    <div className="bonus_text bonus1_text">
                        <div className="t">掌上新款（手机）：青龙出海</div>
                        <div className="tt">赢27,772.5奖金 2017/10/06</div>
                    </div>
                </div>
                <div className="bonusgame bonus2">
                    <div className="bonus_img bonus2_img"></div>
                    <div className="bonus_text bonus2_text">
                        <div className="t">再抢银行</div>
                        <div className="tt">赢24,000奖金 2017/10/15</div>
                    </div>
                </div>
                <div className="bonusgame bonus3">
                    <div className="bonus_img bonus3_img"></div>
                    <div className="bonus_text bonus3_text">
                        <div className="t">新款上线：不朽情缘</div>
                        <div className="tt">赢1,6200奖金 2017/10/18</div>
                    </div>
                </div>
                <div className="bonusgame bonus4">
                    <div className="bonus_img bonus4_img"></div>
                    <div className="bonus_text bonus4_text">
                        <div className="t">热门经典：冰球突破</div>
                        <div className="tt">赢奖金1,3972.5 2017/10/23</div>
                    </div>
                </div>
            </div>
        )
    }
    renderGamePage() {
        var ret = [];
        var invalidTag = false;
        for (var i = 1; i <= this.props.games.totalPage; i++) {
            if (i !== 1 && i !== this.props.games.totalPage && Math.abs(this.props.games.pageNo - i) >= 3) {
                invalidTag = true;
                continue;
            }
            if (invalidTag) {
                ret.push(
                    <div key={"ex" + i} className="number_icon">
                        <a　className="BGcolor-third border-type color-main" href="javascript:void(0)">...</a>
                    </div>
                )
                invalidTag = false;
            }
            ret.push(
                <div key={i} className={i === this.props.games.pageNo ? "active" : "number_icon"}>
                    <a className={i === this.props.games.pageNo ? "  border-type" : " border-type"} href="javascript:void(0)" onClick={this.toPage.bind(this, i)}>{i}</a>
                </div>
            )
        }
        return ret;
    }

    renderCategories() {
        var ret = [];
        if (!this.state.selCategoryMarkIds && this.props.gameCategories.length > 0) {
            this.state.selCategoryMarkIds = this.props.gameCategories[0].MarkIds;
        }
        let counter = this.props.gameCounter[this.state.selPlatformId];
        if (counter !== undefined) {
            for (var i = 0; i < this.props.gameCategories.length; i++) {
                var gc = this.props.gameCategories[i];
                if(counter[gc.ID]>0){ 
                    ret.push(
                        <li key={gc.ID}
                            className={gc.ID === this.state.selCategoryId ? "active color-highlight" : "color-main"}>
                            <a href="javascript:void(0)" onClick={this.onSelectCategory.bind(this, gc)}>{gc.Name}
                                <span className="game-text">({counter[gc.ID]})</span>
                            </a>
                        </li>
                    )
                }
            }
        }
        return ret;
    }

    render() {
        const num = window.numbers["games"] || ("888," + Math.floor(Math.random()*899 + 100) + "," + Math.floor(Math.random()*899 + 100));
        const ImageGallery = window.r.get("ImageGallery");
        const options = window.r.props("ImageGallery");
        const height = options.gameHeight || options.height || "170px";
        const promotionLink = window.configHelper.getPromotionUrl();

        return (
            <div className="game-list-content game-list-content2 BGcolor-main">
                <div className="container fadeInUp animated">
                        <div className="banner">
                                <ImageGallery width="100%" height={height} type="game_banner_imgs" class="game_list_top_img" imgtype='banner'></ImageGallery>
                        </div> 
                    <div className="game-list-fname2" >
                        <div className="game-list-left-nav wow"
                             style={{visibility: "visible", animationName: "fadeInUp"}}>
                            <div className="checkJackpot">
                                <label htmlFor="option"><input onChange={this.onJackpotChanged.bind(this)} type="checkbox" name="jackpot" value="option"/> 奖池游戏</label>
                            </div>
                            <ul>
                                {this.renderCategories()}
                            </ul>

                            <form onSubmit={this.onSearch.bind(this)} className="searchbar" style={{cursor:'pointer'}}>
                                <input ref="searchText" type="text" className="searchbartext" placeholder="查询游戏"/>
                                <i className="fa fa-search searchBtn" aria-hidden="true" onClick={this.onSearch.bind(this)}></i>
                            </form>
                        </div>

                        <div className="game-list-mid-box" >
                            <div className="game-list-right-content">
                                {this.props.limitPlatform? []:
                                    <div className="game-list-box2">
                                        {this.renderPlatfromList()}
                                    </div>
                                }
                                <div id="GamesGridPopupMask" className="none" style={{display: "none"}}>
                                    <div id="LoadingDiv">
                                        <div className="GamePopupMask"></div>
                                    </div>
                                </div>
                                <ul className="games_box">
                                    {this.renderGames()}
                                    <div className="clear"></div>
                                    <nav id="game-page" className="wow"
                                         style={{visibility: "visible", animationName: "fadeInUp"}}>
                                        <div className="pager_box">
                                            <div className="nexprepage_icon"><a href="javascript:void(0)" onClick={this.toPrevPage.bind(this)}>上一页</a></div>
                                            {this.renderGamePage()}
                                            <div className="nexprepage_icon"><a href="javascript:void(0)" onClick={this.toNextPage.bind(this)}>下一页</a></div>
                                        </div>
                                    </nav>
                                </ul>
                            </div>

                            <div className="clear"></div>
                        </div>


                        <div className="game-list-right-box" >
                            <div className="bonus_box">
                                <div className="bonus_box_title">
                                    <div className="bonus_box_title_text">总奖池</div>
                                    <div className="bonus_box_money">
                                        <div className="game-jackpot-num2"><span className="jackpot color-main" data-key="games">{num}</span></div>
                                    </div>
                                </div>
                                <div className="bonus_box_content">
                                    <div className="bonusgame bonus1">
                                        <div className="bonus_img bonus1_img"></div>
                                        <div className="bonus_text bonus1_text">
                                            <div>百萬幸運球</div>
                                            <div>{num}</div>
                                        </div>
                                    </div>
                                    <div className="bonusgame bonus2">
                                        <div className="bonus_img bonus2_img"></div>
                                        <div className="bonus_text bonus2_text">
                                            <div>百萬幸運球</div>
                                            <div>{num}</div>
                                        </div>
                                    </div>
                                    <div className="bonusgame bonus3">
                                        <div className="bonus_img bonus3_img"></div>
                                        <div className="bonus_text bonus3_text">
                                            <div>百萬幸運球</div>
                                            <div>{num}</div>
                                        </div>
                                    </div>
                                    <div className="bonusgame bonus4">
                                        <div className="bonus_img bonus4_img"></div>
                                        <div className="bonus_text bonus4_text">
                                            <div>百萬幸運球</div>
                                            <div>{num}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="clear"></div>


                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        gameCategories: state.game.gameCategories,
        gameCounter: state.game.gameCounter,
        games: state.game.games,
        slot_platforms: state.game.slot_platforms,
        linkToGames:state.linkToGames.linkToGames
    }
);

export default connect(mapStateToProps, {})(GameListPanel);