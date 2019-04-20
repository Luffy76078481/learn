/**
 * Created by sobi on 2017/7/27.
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import merge from 'lodash/merge';
import "./css/Game2.scss";
import {ApiImageAction} from "../../../actions";
var flag=false;
let interValTime=null
class GameListPanel extends Component {

    constructor(props) {
        super(props);
        this.inited = false;
        this.selCategory = null;
        this.initMap = {};
        this.selJackpot = false;
        this.state = {
            selCategoryId: "",
            selPlatformId: "AG",
            listArr:[],
            platformListStart: 0 ,
            loading:false,
            opL: .3,
            opR: 1,
            firstImgUrl:""
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
        this.setState({selPlatformId: platform.ID});
        this.state.selPlatformId =  platform.ID;

        this.toPage(1);
    }

    onSelectPlatform(platform) {
        this.setState({selPlatformId: platform.id, selPlatformMarkId: platform.markId});
        this.state.selPlatformId = platform.id;
        this.state.selPlatformMarkId = platform.markId;
        this.toPage(1);
    }




    renderPlatfromList() {
        var platformLists = [];
        for (var i = 0; i < this.props.platforms.length; i++) {
            var platform = this.props.platforms[i];
            
            if(!platform.showSlot){
                continue;
            }
            platformLists.push(
                <div key={platform.ID} className={this.state.selPlatformId === platform.ID ? "list2_onchoose platform_list2" : "platform_list2"}
                     onClick={this.onSelectPlatform.bind(this, platform)}>{platform.Name2}</div>
            );

        }
        return platformLists;
    }
    componentWillMount(){
        new window.actions.ApiImageAction("PT_tg_ad").fly(resp=>{
            if(resp.StatusCode ==0){
                this.setState({
                    firstImgUrl:resp.List[0].ImgUrl
                })
            }
        })
    }
    componentDidMount() {
        var _this = this;
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
        window.addEventListener("resize", this.onResize);
        this.onResize();

    }
    onResize(){
        var $showcase = window.$("#showcase-slider .showcase-inner-wrapper");
        var windowWidth = window.$(window).width();
        var num = 0.33333;
        if(windowWidth<1420) return;
        if(windowWidth<1899){
            num=0.4
        }
        if(windowWidth<1600){
            num=0.5
        }
        var width = parseInt((windowWidth-200)*num);
        $showcase.height(parseInt(width*0.739));
    }
    componentWillReceiveProps(nextProps) {
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
        const pgsize = GameListPanel.pgsize  || 18;
        let searchText = this.refs.searchText.value;
        let filter = {};
        let GamePlatform="",YoPlay=-1;
        if(this.state.selPlatformId == "YOPLAY"){
            YoPlay=1
        }else{
            GamePlatform=this.state.selPlatformId;
        }
        // new window.actions.ApiQueryGameAllCountAction(GamePlatform,YoPlay).fly();
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
                this.refs.remind.style = 'display:block';
                this.refs.remind_mess.innerHTML = '"'+this.refs.searchText.value+'"';
                this.refs.searchText.value = '';
                this.toPage();
                return;
            }else if(flag){
                this.refs.remind.style = 'display:none';
                flag=false;
            }
           
            if(resp.status ==0){
                _this.setState({
                    loading:false
                })
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
    renderLoading(){
        return(<div className="games-loader"></div>)
    }
    renderGames() {
        const toDecimalNumber = window.toDecimalNumber;
        let firstImg = (<div id="showcase-slider" key="firstImg" className="banner showcase wrapper-game-list-item" >
            <div className="showcase-inner-wrapper">
                <div className="showcase-item slides-item showing slides-item--showNext">
                    <img src={this.state.firstImgUrl} alt="" />
                    {/*<div className="game-showcase-overlay">*/}
                    {/*<div className="game-showcase-content">*/}
                    {/*<p>*/}
                    {/*<strong>王者之战锦标赛</strong><br/>*/}
                    {/*<strong>仅专属于 VIP 黄金 &amp; 铂金</strong><br/>*/}
                    {/*跻身前列，赢取奔驰 <strong>奔驰</strong>!*/}
                    {/*</p>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div> );
        //let ret = [firstImg];
      
        let ret = [];
        for (let i = 0; i < this.props.games.rows.length; i++) {
            if(i>0){

            }
            let g = this.props.games.rows[i];
            let imgUrl = window.config.prdImgUrl+g.ImageUrl;
            let gameLink = window.configHelper.getGamePlayLink(g.Id);
            let ribbon=null;
            if(i<=5){
                ribbon=(<div className="game-ribbon" style={{background: '#FF0000', color: '#FFFFFF'}}>
                            热门游戏
                            <span className="game-ribbon-tail" style={{color: '#FF0000'}}></span>
                        </div>);
            }
            // 156,542,04 CNY
            ret.push(
                <div key={i} className="wrapper-game-list-item wrapper-game-list-img"
                    style={{visibility: "visible", animationName: "fadeInUp",height:"auto"}}>
                    {/*{g.jackpot&&g.jackpotAmount?<div className="jackPot"><span className="jackpot">{toDecimalNumber(g.jackpotAmount)}</span>  CNY</div>:null}*/}
                    <div className="game-list-item">
                        {ribbon}
                        <img className="gameImg" src={imgUrl} onClick={this.onClickGame.bind(this, g)}/>
                        <div className="game-hover">
                            <div className="game-hover-inner">
                                <div className="game-hover-wrapper">
                                    <p className="game-title">{g.Title}</p>
                                    <a onClick={this.onClickGame.bind(this, g)} className="btn frSelected">开始游戏</a>
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

    getGameCount(key, filter) {
        setTimeout(()=> {
            new window.actions.ApiQueryGameCountAction(key, filter).fly();
        }, 0);
    }

    renderCategories() {
        var ret = [];
        if (!this.state.selCategoryId && this.props.gameCategories.length > 0) {
            this.state.selCategoryId = this.props.gameCategories[0].id;
        }
        for (var i = 0; i < this.props.gameCategories.length; i++) {
            var gc = this.props.gameCategories[i];

            var key = gc.ID + "_" + this.state.selPlatformId;
            var counter = this.props.gameCounter[key];
            if (counter === undefined && !this.initMap[key]) {
                this.initMap[key] = true;
                var filter = merge({}, gc);
                filter.markIds = filter.markIds || [];
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
    sliderType(){
        const sel = this.state.selPlatformId;
        let type;
        if ( sel =="MG2"){
            type = "Mg_banner_imgs"
        }else if(sel =="PT"){
            // type = "Pt_banner_imgs"
            type = "game_banner_imgs"
        }else {
            type ="game_banner_imgs"
        }
        return type;
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


    render() {
        let gamesList = this.renderGames();
        const num = window.numbers["games"] || ("888," + Math.floor(Math.random()*899 + 100) + "," + Math.floor(Math.random()*899 + 100));
        const ImageGallery = window.r.get("ImageGallery");
        const options = window.r.props("ImageGallery");
        const MgPromotion = window.r.get("MgPromotion");
        const PtPromotion = window.r.get("PtPromotion");
        var options2 = window.r.props("GameListPanel");
        var GameListPanel2 = window.r.props("GameListPanel2");
        const limitPlatform = this.props.limitPlatform;
        const height = options.gameHeight || options.height || "170px";
        const  xpj5Box = this.xpj5BonusBox();
        const promotionLink = window.configHelper.getPromotionUrl();




        return (
            <div className="game-list-content game-list-content2 BGcolor-main">
                <div className="container fadeInUp animated">

                    {!options2.disableImageGallery?
                        <div className="banner">
                            <ImageGallery width="100%" height={height} type={this.sliderType()} class="game_list_top_img" imgtype='banner' hasOption="true"></ImageGallery>}
                        </div> :null}

                    {window.config.spec =="xpj5"?
                        <div className="ad_box">
                            <div className="mg_download"><a href="http://resigner22.qfcontent.com/mobilecasino1/download?btag2=648242" target="_blank"></a></div>
                            <div className="ad_img"></div>
                        </div>:null
                    }

                    <div className="slider-options" style={{top:'50px'}}>
                        <div className="slider-option-items">
                            <div className="item-title">
                                <a>iPlay</a>
                            </div>
                            <p className="text-align-center">
                                畅游MG老虎机客户端
                            </p>
                            <div className="item-link">
                                <a href="https://dl.fortunabase.com/download.php?file_name=MIP_Launch98.exe&ul=zh&btag2=648242" target="_blank">立即下载</a>
                            </div>
                        </div>
                        <div className="slider-option-items">
                            <div className="item-title">
                                <a>总累积奖金</a>
                            </div>
                            <p className="text-align-center">
                                <div className="redBack" ><span className="jackpot">568474957</span>元</div>
                            </p>
                            <div className="item-link">
                                <Link to="/games">查看所有累积大奖游戏</Link>
                            </div>
                        </div>
                    </div>


                    {MgPromotion && limitPlatform == "MG2"?
                        <MgPromotion></MgPromotion>:null}
                    <div className="game-list-fname2" >
                        <div className="game-list-left-nav wow"
                             style={{visibility: "visible", animationName: "fadeInUp"}}>
                            <div className="checkJackpot">
                                <label htmlFor="option"><input onChange={this.onJackpotChanged.bind(this)} type="checkbox" name="jackpot" value="option"/> 奖池游戏</label>
                            </div>
                            <ul>
                                {this.renderCategories()}
                            </ul>
                            <div className="pull-right">
                                <form onSubmit={this.onSearch.bind(this)} className="searchbar" style={{cursor:'pointer'}}>
                                    <input ref="searchText" type="text" className="searchbartext" placeholder="查询游戏"/>
                                    <i className="fa fa-search searchBtn" aria-hidden="true" onClick={this.onSearch.bind(this)}></i>
                                </form>
                            </div>
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
                                <div className="games_box" id="games-container">
                                <div id="games-notfound" ref='remind'>
                                    <div className="search-message">
                                        <p>
                                            <span className="text-18">没有找到匹配<strong ref='remind_mess'></strong></span>
                                        </p>
                                        <p>您想試玩我們推薦的遊戲</p>
                                    </div>
                                </div>
                                    {this.state.loading?this.renderLoading():gamesList}
                                    <div className="clear"></div>
                                    <nav id="game-page" className="wow"
                                         style={{visibility: "visible", animationName: "fadeInUp"}}>
                                        <div className="pager_box">
                                            <div className="nexprepage_icon"><a href="javascript:void(0)" onClick={this.toPrevPage.bind(this)}>上一页</a></div>
                                            {this.renderGamePage()}
                                            <div className="nexprepage_icon"><a href="javascript:void(0)" onClick={this.toNextPage.bind(this)}>下一页</a></div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div>


                        <div className="game-list-right-box" >
                            <div className="bonus_box">
                                <div className="bonus_box_title">
                                    {window.config.spec =="xpj5"?
                                        <Link to="/register"></Link>:null}
                                    <div className="bonus_box_title_text">总奖池</div>
                                    <div className="bonus_box_money">
                                        <div className="game-jackpot-num2"><span className="jackpot color-main" data-key="games">{num}</span></div>
                                    </div>
                                </div>
                                {window.config.spec !="xpj5" || limitPlatform !="MG2" ?
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
                                </div> :<div>{xpj5Box}</div>}
                            </div>
                        </div>
                        <div className="clear"></div>

                        {MgPromotion && limitPlatform == "PT"?
                        <PtPromotion></PtPromotion>:null}

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