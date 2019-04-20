/**
 * DBB-老虎机
 */
import React, {Component} from 'react';
import {Link,browserHistory} from 'react-router';

import {connect} from 'react-redux';
import merge from 'lodash/merge';
import "./GameListPanel3.scss";

var flag=false;
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
            platformListStart: 0 ,
            opL: .3,
            opR: 1,
            allGames:{},
        };
        if (this.props.limitPlatform) {
            this.state.selPlatformId = this.props.limitPlatform;
        }

        if (this.props.gameCategories && this.props.gameCategories.length > 0) {
            this.state.selCategoryId = this.props.gameCategories[0].id;
            setTimeout(()=>{
                this.onSelectCategory(this.props.gameCategories[0]);
            }, 100);
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
    onSelectPlatform(platform) {
        flag=true;
        this.setState({selPlatformId: platform.ID, selPlatformMarkId: platform.markId});
        this.state.selPlatformId = platform.ID;
        this.state.selPlatformMarkId = platform.markId;
        this.toPage(1);
    }
    // 导航
    renderPlatfromList() {
        var platformLists = [];
        for (var i = 0; i < this.props.platforms.length; i++) {
            var platform = this.props.platforms[i];
            if(!platform.ShowSlot){
                continue;
            }
            // if(platform.Name2){
            //     if(platform.Name2 == "YOPLAY")
            //     continue
            // }else{
            //     if(platform.Name == "YOPLAY")
            //     continue
            // }
            platformLists.push(
                <div key={platform.ID} className={this.state.selPlatformId === platform.ID ? "list2_onchoose platform_list2" : "platform_list2"}
                     onClick={this.onSelectPlatform.bind(this, platform)}>{platform.Name2?platform.Name2:platform.Name}</div>
            );

        }
        return platformLists;

    }
    componentWillReceiveProps(nextProps) {
        if (!this.inited) {
            if (nextProps.gameCategories && nextProps.gameCategories.length > 0) {
                for (var i = 0; i < nextProps.gameCategories.length; i++) {
                    var gc = nextProps.gameCategories[i];
                }
                var gc = nextProps.gameCategories[0];
                this.onSelectCategory(gc);
            }
        }
    }
    onSelectCategory(category) {
        this.inited = true;
        this.selCategory = category;
        var categoryId = category.id;
        this.setState({selCategoryId: categoryId});
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
        var _this = this;
        new window.actions.ApiQueryGamesAction(filter, pageNo, 12).fly(resp=>{
            if(resp.status ==0){
                if(resp.page.content.length == 0){
                    flag=false;
                    this.toPage();
                    return;
                }else if(flag){
                    flag=false;
                }
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
    // 游戏列表
    renderGames() {
        const toDecimalNumber = window.toDecimalNumber; // 数字处理方法
        var ret = [];
        if(this.props.games.rows){
            for (var i = 0; i < this.props.games.rows.length; i++) {
                var g = this.props.games.rows[i];
                var imgUrl = window.config.prdImgUrl+g.ImageUrl;
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
    // 底部列表
    renderFootGlist(){
        var ret = [];
        for (var i = 0; i < this.props.games.rows.length; i++) {
            var g = this.props.games.rows[i];
            ret.push(
                <li key={i} onClick={this.onClickGame.bind(this, g)}>{i+1+'.'+g.Title}</li>
            );
        }
        return ret;
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=900,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=450,screenY=250');
        return false;
    }

    render() {
        const num = window.numbers["games"] || ("842," + Math.floor(Math.random()*899 + 100) + "," + Math.floor(Math.random()*899 + 100));
        const num2 = window.numbers[""] || ("67," + Math.floor(Math.random()*173 + 100) + "," + Math.floor(Math.random()*899 + 100));
        const num3 = window.numbers[""] || ("305," + Math.floor(Math.random()*527 + 100) + "," + Math.floor(Math.random()*899 + 100));
        const ImageGallery = window.r.get("ImageGallery");
        const options = window.r.props("ImageGallery");
        const height = options.gamesHeight || options.height || "170px";
        return (
            <div className="game-list-content game-list-content2 BGcolor-main">
                <div className="container fadeInUp animated">
                    <Link to="/register" activeClassName="active"><div className="leftregisbtn"></div></Link>
                    <Link to="/register" activeClassName="active"><div className="rigregisbtn"></div></Link>
                    {/* 客服 */}
                    <div className="onlineserv"  onClick={this.serversOpen.bind(this)}></div>
                    {/* 游戏导航 */}
                    <div className="game-list-fname2">
                        <div className="game-list-box2">
                            {this.renderPlatfromList()}
                            <Link to="/promotions"><div className="platform_list2">优惠活动</div></Link>
                            <a href="/help.html?tab=howplay" target="_blank" className="platform_list2">如何游戏</a>
                            <a href="/help.html?tab=commonQ" target="_blank" className="platform_list2">常见问题</a>
                        </div>
                        {/* 左区域 */}
                        <div className="game-list-mid-box" >
                            <div className="game-list-right-content">
                                <div className="game_down_content">
                                    <ImageGallery width="100%" height={height} type="games-imgs" imgtype='slider' />
                                    <form onSubmit={this.onSearch.bind(this)} className="searchbar" style={{cursor:'pointer'}}>
                                        <input ref="searchText" type="text" className="searchbartext" placeholder="查询游戏"/>
                                        <i className="fa fa-search searchBtn" aria-hidden="true" onClick={this.onSearch.bind(this)}></i>
                                    </form>
                                    <div id="GamesGridPopupMask" className="none" style={{display: "none"}}>
                                        <div id="LoadingDiv">
                                            <div className="GamePopupMask"></div>
                                        </div>
                                    </div>
                                    {/* 游戏列表 */}
                                    <ul className="games_box">
                                        {this.renderGames()}
                                        <div className="clear"></div>
                                        <nav id="game-page" className="wow" style={{visibility: "visible", animationName: "fadeInUp"}}>
                                            <div className="pager_box">
                                                <div className="nexprepage_icon"><a href="javascript:void(0)" onClick={this.toPrevPage.bind(this)}>上一页</a></div>
                                                {this.renderGamePage()}
                                                <div className="nexprepage_icon"><a href="javascript:void(0)" onClick={this.toNextPage.bind(this)}>下一页</a></div>
                                            </div>
                                        </nav>
                                    </ul>
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div>
                        <div className="game-list-right-box" >
                            <div className="bonus_box">
                                <div className="bonus_box_title">
                                    <div className="bonus_box_title_text">累计奖池</div>
                                </div>
                                <div className="bonus_box_content">
                                    <div className="bonusgame bonus1">
                                        <div className="bonus_img bonus1_img" onClick={this.onClickGame.bind(this,window.configHelper.getGamePlayLink('3a9aceebb6f2476281f0947a52cafe07'))}></div>
                                        <div className="bonus_text bonus1_text">
                                            <span className="jackpot" data-key="games">{num}</span>
                                        </div>
                                    </div>
                                    <div className="bonusgame bonus2">
                                        <div className="bonus_img bonus2_img" onClick={this.onClickGame.bind(this,window.configHelper.getGamePlayLink('46f2f9afb5f14aa99cb7f7c0dfd2abbe'))}></div>
                                        <div className="bonus_text bonus2_text">
                                          <span className="jackpot" data-key="">{num2}</span>
                                        </div>
                                    </div>
                                    <div className="bonusgame bonus3">
                                        <div className="bonus_img bonus3_img" onClick={this.onClickGame.bind(this,window.configHelper.getGamePlayLink('90d09bc26a3542118e3f1fab39682219'))}></div>
                                        <div className="bonus_text bonus3_text">
                                            <span className="jackpot" data-key="">{num3}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rightbx promo_box">
                                <div className="box_title">优惠活动</div>
                                <Link to="/promotions" activeClassName="active"><div className="proimg"></div></Link>
                                <Link to="/promotions" activeClassName="active">保持在线，更多游戏即将推出！</Link>
                                <div className="more">
                                    <Link to="/promotions" activeClassName="active">查看全部优惠活动</Link>
                                </div>
                            </div>
                            <div className="rightbx problem">
                                <div className="box_title">游戏中有遇到什么问题吗？</div>
                                <a href="/help.html" target="_blank">
                                    <div className="problemimg"></div>
                                    <p>请确保游戏前您已经启用弹窗功能！</p>
                                    <div className="more">
                                        <a href="/help.html" target="_blank">阅读更多</a>
                                    </div>
                                </a>
                            </div>
                            <div className="rightbx contact">
                                <div className="box_title">客户服务</div>
                                <div className="contactimg"   onClick={this.serversOpen.bind(this)} ></div>
                                <div className="mail">
                                    <i className="fa fa-qq"></i>
                                    <a href={"tencent://message/?uin="+this.props.remoteSysConfs.online_service_qq+"&Menu=yes"} target="_blank">{this.props.remoteSysConfs.online_service_qq}</a>
                                </div>
                                <div className="phone">
                                    <div className="phoneimg iconimg"></div>
                                    <div>+63 927 77777 52</div>
                                </div>
                            </div>
                        </div>
                        <div className="gamefootlist">
                            <ul>
                                {this.renderFootGlist()}
                            </ul>
                        </div>

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
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps, {})(GameListPanel);