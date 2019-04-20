/**
 *  update  ====================> 娱乐场
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import merge from 'lodash/merge';
import "./Game2.scss";
var flag=false;

class GameListPanel extends Component {

    constructor(props) {
        super(props);
        this.inited = false;
        this.selCategory = null;
        this.initMap = {};
        this.selJackpot = false;
        let gameID = "PT";
        // 如果有则有
        if(this.props.linkToGames){
            gameID = this.props.linkToGames;
        }
        this.state = {
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
            this.state.selCategoryId = this.props.gameCategories[0].id;
        }
    }


    onClickGame(game) {
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
    /*
    What's this ??
    onSelectPlatform(platform) {
        this.setState({selPlatformId: platform.id, selPlatformMarkId: platform.markId});
        this.state.selPlatformId = platform.id;
        this.state.selPlatformMarkId = platform.markId;
        this.toPage(1);
    }
    */
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
        if (!this.inited) {
            if (nextProps.gameCategories && nextProps.gameCategories.length > 0) {
                this.inited = true;
                for (var i = 0; i < nextProps.gameCategories.length; i++) {
                    var gc = nextProps.gameCategories[i];
                }
                var gc = nextProps.gameCategories[0];
                this.onSelectCategory(gc);
            }
        }
    }
    /*
    What.s this
    onJackpotChanged(e) {
        this.selJackpot = e.target.checked;
        this.toPage();
    }
    */
   // 分类导航
    onSelectCategory(category) {
        flag=true;
        this.setState({selCategoryMarkIds: category.MarkIds,selCategoryId:category.ID});
        this.state.selCategoryMarkIds = category.MarkIds;
        this.state.selCategoryId = category.ID;
        this.toPage(1);
    }
    // 查询
    onSearch(e) {
        e.preventDefault();
        flag=true;
        this.toPage(1);
    }
    // 游戏数据获取
    toPage(pageNo = 1) {
        // 获取一页显示多少游戏数据
        let GameListPanel = window.r.props("GameListPanel");
        const pgsize = GameListPanel.pgsize  || 24;
        // 搜索值
        let searchText = this.refs.searchText.value;
        let filter = {};
        let GamePlatform="",YoPlay=-1;
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
            filter.Jackpot = this.selJackpot;
        }
        filter.GameMarks = filter.GameMarks.join(',');
        filter.GamePlatform = filter.GamePlatform.join(',');
        filter.GameType = 4;
        if(this.state.selPlatformId  == "YOPLAY"){//如果是Yoplay平台的情况下
            filter.YoPlay = 1;
            filter.GamePlatform="";
        }
        new window.actions.ApiQueryGamesAction(filter, pageNo , pgsize).fly(resp=>{
            if(resp.Page.length == 0){
                flag=false;
                // 本站无 显示没有搜索到的游戏
                this.refs.searchText.value = '';
                this.toPage();
                return;
            }else if(flag){
                flag=false;
            }         
            if(resp.status ==0){
                _this.setState({
                    loading:false
                })
            }
        });

    }
    // 下一页
    toNextPage() {
        if (this.props.games.pageNo >= this.props.games.totalPage) {
            return;
        }
        this.toPage(this.props.games.pageNo + 1);
        
    }
    // 上一页
    toPrevPage() {
        if (this.props.games.pageNo <= 1) {
            return;
        }
        this.toPage(this.props.games.pageNo - 1);
    }
    // 游戏区域
    renderGames() {
        const toDecimalNumber = window.toDecimalNumber;
        var ret = [];
        for (var i = 0; i < this.props.games.rows.length; i++) {
            var g = this.props.games.rows[i];
            let imgUrl = window.config.prdImgUrl+g.ImageUrl;
            ret.push(
                <li key={i} className="gameItem wow gamesPic" style={{visibility: "visible", animationName: "fadeInUp",width:"30%",height:"auto"}}>
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
    // 分页
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
    // 获取游戏数目
    getGameCount(key, filter) {
        setTimeout(()=> {
            new window.actions.ApiQueryGameCountAction(key, filter).fly();
        }, 0);
    }
    // 游戏分类导航
    renderCategories() {
        var ret = [];
        // selCategory 游戏分类  gameCategories 分类数据
        if (!this.state.selCategoryId && this.props.gameCategories.length > 0) {
            this.state.selCategoryId = this.props.gameCategories[0].id;
        }
        for (var i = 0; i < this.props.gameCategories.length; i++) {
            var gc = this.props.gameCategories[i];
            if(gc.Name == "街机游戏"){ continue } // 不要街机
            var key = gc.ID + "_" + this.state.selPlatformId; // 数据ID 数据PlatformIds
            var counter = this.props.gameCounter[key]; // undefined
            if (counter === undefined && !this.initMap[key]) {
                this.initMap[key] = true;
                var filter = merge({}, gc); // 合并  
                filter.markIds = filter.markIds || []; // data MarkIds
                if (this.state.selPlatformId) {
                    if (this.state.selPlatformMarkId) {
                        filter.markIds.push(this.state.selPlatformMarkId);
                    } else {
                        filter.platformIds = [this.state.selPlatformId];
                    }
                } else {
                    filter.platformIds = [];
                    for (var j = 0; j < this.props.platforms.length; j++) {
                        var platform = this.props.platforms[j];
                        if (!platform.showSlot) {
                            continue;
                        }
                        filter.platformIds.push(platform.id);
                    }
                }
                filter.enabled = true;
                filter.gameType = "slot";
                this.getGameCount(key, filter);
                counter = 0;
            }
            ret.push(
                <li key={gc.ID}
                    className={gc.ID === this.state.selCategoryId ? "active color-highlight" : "color-main"}>
                    <a href="javascript:void(0)" onClick={this.onSelectCategory.bind(this, gc)}>{gc.Name}
                        <span className="game-text">{counter}</span></a>
                </li>
            )
        }
        return ret;
    }
    // 轮播
    sliderType(){
        const sel = "AG";
        let type;
        if ( sel =="MG2"){
            type = "Mg_banner_imgs"
        }else if(sel =="PT"){
            type = "Pt_banner_imgs"
        }else {
            type ="game_banner_imgs"
        }
        return type;
    }

    render() {
        const ImageGallery = window.r.get("ImageGallery");
        const options = window.r.props("ImageGallery");
        const height = options.gameHeight || options.height || "170px";
        const promotionLink = this.props.remoteSysConfs.channel_push_url;

        return (
            <div className="game-list-content game-list-content2 BGcolor-main">
                <div className="container fadeInUp animated">
                    {/* banner */}
                    <div className="banner">
                        <ImageGallery width="100%" height={height} type={this.sliderType()} class="game_list_top_img" imgtype='banner'></ImageGallery>
                    </div>
                    <div className="sliderlinkbox">
                        <a href={promotionLink} target="_blank">
                            <div className="link1 sliderlink"></div>
                        </a>
                        <a href="/promotions" >
                            <div className="link2 sliderlink"></div>
                        </a>
                        <Link to="/games">
                            <div className="link3 sliderlink">
                                <div className="jackpot">568474957</div>
                            </div>
                        </Link>
                    </div>
                    {/* pt游戏 */}
                    <div className="game-list-fname2" >
                        <div className="game-list-left-nav wow" style={{visibility: "visible", animationName: "fadeInUp"}}>
                            {/* <div className="checkJackpot">
                                <label htmlFor="option"><input onChange={this.onJackpotChanged.bind(this)} type="checkbox" name="jackpot" value="option"/> 奖池游戏</label>
                            </div> */}
                            {/* 游戏Nav */}
                            <ul>
                                {this.renderCategories()}
                            </ul>
                            {/* 查询游戏 */}
                            <form onSubmit={this.onSearch.bind(this)} className="searchbar" style={{cursor:'pointer'}}>
                                <input ref="searchText" type="text" className="searchbartext" placeholder="查询游戏"/>
                                <i className="fa fa-search-minus searchBtn" aria-hidden="true" onClick={this.onSearch.bind(this)}></i>
                            </form>
                        </div>
                        <div className="game-list-mid-box" >
                            <div className="game-list-right-content"> 
                                 {/* 游戏区域遮挡层 */}                        
                                <div id="GamesGridPopupMask" className="none" style={{display: "none"}}>
                                    <div id="LoadingDiv">
                                        <div className="GamePopupMask"></div>
                                    </div>
                                </div>
                                {/* 游戏显示区域 */}
                                <ul className="games_box">
                                    {this.renderGames()}
                                    <div className="clear"></div>
                                    {/* 分页 */}
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
        platforms: state.game.slot_platforms,
        linkToGames:state.linkToGames.linkToGames,
        remoteSysConfs:state.remoteSysConfs
    }
);

export default connect(mapStateToProps, {})(GameListPanel);