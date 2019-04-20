/**
 * Created by sobi on 2017/7/27.
 */
import React, {Component} from 'react';
import {Link,browserHistory} from 'react-router';

import {connect} from 'react-redux';
import merge from 'lodash/merge';
// import "./Game2.scss";
import "./css/GameListPanel3.scss";

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
            loading:false,
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


    onClickGame(link) {
        window.actions.authToLink(link);
    }

    onSelectPlatform(platform) {
        flag=true;
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
            let gameName;
            if(platform.name2){
                if(platform.name2 == 'Yoplay')
                gameName = 'AG'
                else
                gameName = platform.name2
            }else{
                if(platform.name == 'Yoplay')
                gameName = 'AG'
                else
                gameName = platform.name
            }
            platformLists.push(
                <li key={platform.id} className={this.state.selPlatformId === platform.id  ? "active color-highlight" : "color-main"}>
                    <a href="javascript:void(0)" onClick={this.onSelectPlatform.bind(this, platform)}>
                   {gameName}
                    </a>
                </li>
            );

        }
        platformLists.push(<li className="color-main"><Link to="/promotions">优惠活动</Link></li>);
        // platformLists.push(<li className="color-main"><a href="/help.html?tab=howplay" target="_blank">如何游戏</a></li>);
        platformLists.push(<li className="color-main"><Link to="/help/helpcenter.html" target="_blank">常见问题</Link></li>);
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
        var filter = merge({}, this.selCategory.filter);
        var pageNum = window.r.props("GamesPage").gamePgSiz;
        var _this = this;
        filter.markIds = filter.markIds || [];
        if (this.selJackpot) {
            filter.jackpot = true;
        } else {
            filter.jackpot = "";
        }
        if (this.state.selPlatformMarkId) {
            filter.markIds.push(this.state.selPlatformMarkId);
        } else {
            if (this.state.selPlatformId) {
                filter.platformIds = [this.state.selPlatformId];
            } else {
                filter.platformIds = [];
                for (var i = 0; i < this.props.platforms.length; i++) {
                    var platform = this.props.platforms[i];
                    if (!platform.showSlot) {
                        continue;
                    }
                    filter.platformIds.push(platform.id);
                }
            }
        }
        var searchText = this.refs.searchText.value;
        if (searchText) {
            filter.name = searchText;
        }
        filter.enabled = true;
        filter.gameType = "slot";

        //添加加载中动画
        _this.setState({
            loading:true
        });

        new window.actions.ApiQueryGamesAction(filter, pageNo, pageNum).fly(resp=>{
            if(resp.status ==0){
                if(resp.page.content.length == 0){
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
        var ret = [];
        for (var i = 0; i < this.props.games.rows.length; i++) {
            var g = this.props.games.rows[i];
            var imgUrl = g.imageUrl;
            var gameLink = window.configHelper.getGamePlayLink(g.id);
            var ribbon=null;
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
                        <img className="gameImg" src={imgUrl} onClick={this.onClickGame.bind(this, gameLink)}/>
                        <div className="game-hover">
                            <div className="game-hover-inner">
                                <div className="game-hover-wrapper">
                                    <p className="game-title">{g.name}</p>
                                    <a onClick={this.onClickGame.bind(this, gameLink)} className="btn frSelected">开始游戏</a>
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

    renderFootGlist(){
        var ret = [];

        for (var i = 0; i < this.props.games.rows.length; i++) {
            var g = this.props.games.rows[i];
            var gameLink = window.configHelper.getGamePlayLink(g.id);
            ret.push(
                <li key={i} onClick={this.onClickGame.bind(this, gameLink)}>{i+1+'.'+g.name}</li>
            );
        }
        return ret;
    }

    getGameCount(key, filter) {
        setTimeout(()=> {
            new window.actions.ApiQueryGameCountAction(key, filter).fly();
        }, 0);
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
        var options2 = window.r.props("GameListPanel");
        // const options3 = window.r.props('ImageGallery');
        // let height2 = options3.casinoHeight || options3.height || "170px";
        //
        const height = options.gameHeight|| "170px";
        const promotionLink = window.configHelper.getPromotionUrl();
        return (
            <div className="game-list-content game-list-content2 BGcolor-main">
                <div className="container fadeInUp animated">

                    {options&&options.gameEnabled ?
                        (<div className="banner">
                            <ImageGallery width="100%" hasOption="true" height={height} type="games-imgs" class="game_list_top_img" imgtype='slider'></ImageGallery>
                        </div>)
                        :null}
                    <div className="slider-options" style={{top:'50px'}}>
                        <div className="slider-option-items">
                            <div className="item-title">
                                <a>dafa资讯端</a>
                            </div>
                            <p className="text-align-center">
                                快速访问游戏
                            </p>
                            <div className="item-link">
                                <a href="https://sbet.bet/down/down.exe">立即下载</a>
                            </div>
                        </div>
                        <div className="slider-option-items">
                            <div className="item-title">
                                <a href={promotionLink}>手机APP下载</a>
                            </div>
                            <p className="text-align-center">
                                最新娱乐场大厅迅速通道！
                            </p>
                            <div className="item-link">
                                <a href={promotionLink}>立即下载</a>
                            </div>
                        </div>
                    </div>
                    <div className="game-list-fname2" >
                        <div className="game-list-left-nav fadeInUp">
                            <ul>
                                {this.renderPlatfromList()}
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
                                <div className="game_down_content">
                                    {/*{options&&options.gameEnabled ? <ImageGallery width="100%" height={height} type="games-imgs" imgtype='slider' />:null}*/}
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
                                        {this.state.loading?this.renderLoading():this.renderGames()}
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

                        {/*<div className="gamefootlist">*/}
                            {/*<ul>*/}
                                {/*{this.renderFootGlist()}*/}
                            {/*</ul>*/}
                        {/*</div>*/}

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