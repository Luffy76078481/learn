/**
 * ppp-games
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import merge from 'lodash/merge';
import "./Game.scss";
var flag=false;

class GameListPanel extends Component {


    constructor(props) {
        super(props);
        this.inited = false;
        this.selCategory = '';
        this.initMap = {};
        this.selJackpot = false;
        this.state = {
            selCategoryMarkIds:"",
            selCategoryId: "",
            selPlatformId: props.platform || "AG",
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
    // 游戏点击
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
    // 平台类型选择
    onSelectPlatform(platform) {
        flag=true;
        this.setState({selPlatformId: platform.ID, selPlatformMarkId: platform.markId});
        this.state.selPlatformId = platform.ID;
        this.state.selPlatformMarkId = platform.markId;
        this.toPage(1);
    }

    // 平台导航
    renderPlatfromList() {
        var platformLists = [];
        const options = window.r.props("GameListPanel");
        for (var i = 0; i < this.props.platforms.length; i++) {
            var platform = this.props.platforms[i];
            if(!platform.ShowSlot){
                continue;
            }
            platformLists.push(
                <div key={platform.ID} className={this.state.selPlatformId === platform.ID ? "platform_list_"+platform.ID+"_onchoose platform_list" : "platform_list_"+platform.ID+" platform_list"}
                     onClick={this.onSelectPlatform.bind(this, platform)}>
                    {!options.platformName?null:<span>{platform.Name2}</span>}
                </div>
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
        if(this.props.platform != nextProps.platform){
            for(let i = 0; i<nextProps.platforms.length; i++){
                if(nextProps.platforms[i].id.indexOf(nextProps.platform)>=0){
                    this.onSelectPlatform(nextProps.platforms[i]);
                    return;
                }
            }
        }
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
    onJackpotChanged(e) {
        this.selJackpot = e.target.checked;
        this.toPage();
    }
    onSelectCategory(category) {
        flag=true;
        this.setState({selCategoryMarkIds: category.MarkIds,selCategoryId:category.ID});
        this.state.selCategoryMarkIds = category.MarkIds;
        this.state.selCategoryId = category.ID;
        this.toPage(1);
    }
    onSearch(e) {
        e.preventDefault();
        flag=true;
        this.toPage(1);
    }
    toPage(pageNo = 1) {
        let GameListPanel = window.r.props("GameListPanel");
        const pgsize = GameListPanel.pgsize  || 12;
        // 搜索值
        let searchText = this.refs.searchText.value;
        let filter = {};
        let GamePlatform="",YoPlay="";
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
        let _this = this;
        new window.actions.ApiQueryGamesAction(filter, pageNo , pgsize).fly(resp=>{
            if(resp.Page && resp.Page.length == 0){
                flag=false;
                // 本站无 显示没有搜索到的游戏
                this.refs.searchText.value = '';
                
                return;
            }else if(flag){
                flag=false;
            }         
            if(resp.StatusCode ==0){
                _this.setState({
                    loading:false
                })
            }
            else{
                window.swal('错误',resp.message,'error');
            }
        });
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
    // 游戏区域
    renderGames() {
        const toDecimalNumber = window.toDecimalNumber;
        var ret = [];
        for (var i = 0; i < this.props.games.rows.length; i++) {
            var g = this.props.games.rows[i];
            var imgUrl = window.config.prdImgUrl+g.ImageUrl;
            ret.push(
                <li key={i} className="gameItem wow fadeInUp animated gamesPic"
                    style={{visibility: "visible"}} onClick={this.onClickGame.bind(this, g)}>
                    {g.jackpot&&g.jackpotAmount?<div className="jackPot"><span className="jackpot">{toDecimalNumber(g.jackpotAmount)}</span>  CNY</div>:null}
                    <a target="_blank" href="javascript:void(0)"><img className="gameImg" src={imgUrl} />
                        <span className="game-text game-text-btn">{g.Title}</span>
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
                    <li key={"ex" + i}>
                        <a　className="BGcolor-third border-type color-main" href="javascript:void(0)">...</a>
                    </li>
                )
                invalidTag = false;
            }
            ret.push(
                <li key={i} className={i === this.props.games.pageNo ? "active" : "BGcolor-main color-main"}>
                    <a className={i === this.props.games.pageNo ? "BGcolor-main color-highlight  border-type" : "BGcolor-third color-main border-type"} href="javascript:void(0)" onClick={this.toPage.bind(this, i)}>{i}</a>
                </li>
            )
        }
        return ret;
    }
    // 游戏分类-所有，最新，热门
    renderCategories() {
        var ret = [];
        if (!this.state.selCategoryMarkIds && this.props.gameCategories.length > 0) {
            this.state.selCategoryMarkIds = this.props.gameCategories[0].MarkIds;
        }
        let counter = this.props.gameCounter[this.state.selPlatformId];
        if(counter!== undefined){
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
        const options = window.r.props("GameListPanel");
        return (
                <div className="game-list-content game-list-content1 BGcolor-main">
                    <div className="game-list-bgbox" style={{height: this.props.limitPlatform?"80px":"130px"}}>
                        <div className="game-list-outbox">
                            {this.props.limitPlatform? []:
                            <div className="game-list-inbox">
                                <div className="listboxhid">
                                        {this.renderPlatfromList()}
                                </div>
                            </div>}
                        </div>
                    </div>
                    <div className="container">
                        {options.jockPot?
                        <div className="jockBox">
                            <p>超级彩金</p>
                            <div className="J"><div className="jackpot">168,5987</div>&nbsp;<span>CNY</span></div>
                            <div className="win">
                                <ul>
                                    <li><p>恭喜jp***51</p><p>获得132501.00</p></li>
                                    <li><p>恭喜kr***d8</p><p>获得332800.00</p></li>
                                    <li><p>恭喜g8***20</p><p>获得252904.00</p></li>
                                    <li><p>恭喜ld***33</p><p>获得181608.00</p></li>
                                    <li><p>恭喜kq***97</p><p>获得355840.00</p></li>
                                </ul>
                            </div>
                        </div>:null}
                        <div className="game-list-fname" >
                            <div className="game-list-left-nav wow fadeInUp animated"
                                 style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <div className="checkJackpot">
                                    <label className={this.selJackpot == true ?"j_chose":""} htmlFor="option">
                                    <input onChange={this.onJackpotChanged.bind(this)} type="checkbox" name="jackpot" value="option"/> 奖池游戏</label>
                                </div>
                                <ul>
                                    {this.renderCategories()}
                                </ul>
                                <form onSubmit={this.onSearch.bind(this)} className="searchbar" style={{cursor:'pointer'}}>
                                    <input ref="searchText" type="text" className="searchbartext" placeholder="查询游戏"/>
                                    <i className="fa fa-search searchBtn" aria-hidden="true" onClick={this.onSearch.bind(this)}></i>
                                </form>
                            </div>
                            <div className="game-list-right-content">
                                <div id="GamesGridPopupMask" className="none" style={{display: "none"}}>
                                    <div id="LoadingDiv">
                                        <div className="GamePopupMask"></div>
                                    </div>
                                </div>
                                <ul>
                                    {this.renderGames()}
                                </ul>
                            </div>
                            <div className="clear"></div>
                            <nav id="game-page" className="wow fadeInUp animated"
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
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        gameCategories: state.game.gameCategories,
        gameCounter: state.game.gameCounter,
        games: state.game.games,
        platforms: state.game.slot_platforms
    }
);

export default connect(mapStateToProps, {})(GameListPanel);