/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Carousel,List, message, Avatar, Spin, BackTop
} from 'antd';
import{config} from "globalConfig"
import './PtGamesPage.scss'
import {Link} from "react-router";
import InfiniteScroll from 'react-infinite-scroller';

let flag=false;
let pageIndex=1;
class PtGamesPage extends Component {
    constructor(props) {
        super(props);
        this.selJackpot = false;
        this.inited =false;
        this.state = {
            selCategoryId:"",
            selCategoryMarkIds:"",
            data:[],
            hasMore:true,
            loading:true,
        };
        if (this.props.gameCategories && this.props.gameCategories.length > 0) {
            this.state.selCategoryId = this.props.gameCategories[0].ID;
            setTimeout(()=>{
                this.onSelectPlatform(this.props.gameCategories[0]);
            }, 100);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!this.inited) {
            if (nextProps.gameCategories && nextProps.gameCategories.length > 0) {
                this.onSelectPlatform(nextProps.gameCategories[0]);
            }
        }
    }
    onSelectPlatform(platform) {
        this.inited = true;
        this.setState({selCategoryId: platform.ID, selCategoryMarkIds: platform.MarkIds,data:[],loading:true,hasMore:true});
        this.state.selCategoryId = platform.ID;
        this.state.selCategoryMarkIds = platform.MarkIds;
        pageIndex=1;
        this.toPage(pageIndex);
    }
    renderCategoriesList(){
        let platformLists = [];
        let index=0;
        for (var i = 0; i < this.props.gameCategories.length; i++) {
            let platform = this.props.gameCategories[i];
            if(!platform.UsedPC){
                continue;
            }
            let className="animated";
            if(this.state.selCategoryId === platform.ID){
                className = "active animated"
            }else{
              if(this.state.selCategoryId=="" && index==0){
                  className = "active animated"
              }
            }
            platformLists.push(
                <li key={i}  style={{visibility: "visible", animationName: "fadeInUp"}} className={className}>
                    <a href="javascript:void(0)" onClick={this.onSelectPlatform.bind(this, platform)}>
                        {platform.Name}
                    </a>
                </li>
            );
            index++;

        }
        return platformLists;
    }
    onSearch(e) {
        e.preventDefault();
        this.setState({data:[],loading:true,hasMore:true});
        this.toPage(1);
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
    toPage(pageNo = 1) {
        let _this = this;
        const pgsize = 30;
        let searchText = this.refs.searchText.value;
        let filter = {};
        filter.GameMarks = [];
        filter.GamePlatform = ["PT"];
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
            if(resp.StatusCode ==0){
                let data = _this.state.data;
                data = data.concat(resp.Page);
                _this.setState({
                    data,
                    loading: false,
                    hasMore: pageNo*pgsize<resp.TotalRecord
                });
                pageIndex++;
            }
        },filter.GameMarks);
    }
    handleInfiniteOnLoad = () => {
        this.setState({
            loading: true,
        });
        if (!this.state.hasMore) {
            this.setState({
                loading: false,
            });
            return;
        }
        this.toPage(pageIndex)
    }
    AddFavorite(item){//添加到收藏夹

    }
    renderItem = (item) => {
        return (
            <List.Item key={item.id}>
                <div className="game-list-item animated" style={{animationName: "flipInX"}}>
                    <div className="itemImg">
                        <a className="addFav animated" style={{animationName: "flipInY"}} onClick={this.AddFavorite.bind(this,item)}></a>
                        <img className="gameImg" src={config.prdImgUrl+item.ImageUrl} onClick={this.onClickGame.bind(this, item)}/>
                        <div className="game-hover">
                            <div className="game-hover-inner">
                                <div className="game-hover-wrapper">
                                    <a onClick={this.onClickGame.bind(this, item)} className="btn frSelected">开始游戏</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="game-title">{item.Title}</p>
                </div>
            </List.Item>
        );
    }
    render() {
        const randomNum = (num)=> Math.floor(Math.random()*num + 100);
        const ImageGallery = window.r.get("ImageGallery");
        return (
            <div className="PtPage-content">
                <ImageGallery id="game-pt" width="100%" height="320px" type="game_banner_imgs" imgtype='banner'></ImageGallery>
                {/*banner上遮罩的层*/}
                <div className="banner_wrapper">
                    <div className="winner-list-wrapper">
                        <div className="winner-list">
                            <Carousel vertical dots={false} autoplay={true}>
                                <div className="item">
                                    <div className="top">
                                        <span className="left">金莲呈祥</span>
                                        <span className="right">CNY</span>
                                    </div>
                                    <div className="bot">
                                        <span className="left">su******01</span>
                                        <span className="right">1,500.00</span>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="top">
                                        <span className="left">金莲呈祥</span>
                                        <span className="right">CNY</span>
                                    </div>
                                    <div className="bot">
                                        <span className="left">su******01</span>
                                        <span className="right">1,500.00</span>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="top">
                                        <span className="left">追击劫匪</span>
                                        <span className="right">CNY</span>
                                    </div>
                                    <div className="bot">
                                        <span className="left">su******01</span>
                                        <span className="right">1,200.00</span>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="top">
                                        <span className="left">五福临门</span>
                                        <span className="right">CNY</span>
                                    </div>
                                    <div className="bot">
                                        <span className="left">su******01</span>
                                        <span className="right">1,800.00</span>
                                    </div>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                    <div className="banner-jackpot">
                        <div className="item" >
                            <div className="left">
                                <img src={require('./images/jackpot-txt.png')} />
                            </div>
                            <div className="right text">
                                <span>¥</span>
                                <span className="jackpot">{'113,'+randomNum(899)+','+randomNum(899)+','+randomNum(89)}</span>
                            </div>
                        </div>
                        <div className="item" >
                            <div className="top">
                                <img src={require('./images/jackpot-txt1.png')} />
                                <span className="jackpot_top_right">达百万爆奖</span>
                            </div>
                            <div className="bot text">
                                <span>¥</span>
                                <span className="jackpot">{'1,'+randomNum(90)+','+randomNum(90)}</span>
                            </div>
                        </div>
                        <div className="item" >
                            <div className="top">
                                <img src={require('./images/jackpot-txt2.png')} />
                                <span className="jackpot_top_right">达13.8万爆奖</span>
                            </div>
                            <div className="bot text">
                                <span>¥</span>
                                <span className="jackpot">{'3,'+randomNum(50)+','+randomNum(50)}</span>
                            </div>
                        </div>
                        <div className="item" >
                            <div className="top">
                                <img src={require('./images/jackpot-txt3.png')} />
                                <span className="jackpot_top_right">随机惊爆</span>
                            </div>
                            <div className="bot text">
                                <span>¥</span>
                                <span className="jackpot">{'5,'+randomNum(60)+','+randomNum(60)}</span>
                            </div>
                        </div>
                        <div className="item" >
                            <div className="top">
                                <img src={require('./images/jackpot-txt4.png')} />
                                <span className="jackpot_top_right">随机惊爆</span>
                            </div>
                            <div className="bot text">
                                <span>¥</span>
                                <span className="jackpot">{'2,'+randomNum(10)+','+randomNum(10)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="game-list">
                    <div className="game-list-categories">
                        <div className="pull-left">
                            <ul>
                                {this.renderCategoriesList()}
                            </ul>
                        </div>
                        <div className="pull-right">
                            <form onSubmit={this.onSearch.bind(this)} className="searchbar" style={{cursor:'pointer'}}>
                                <input ref="searchText" type="text" className="searchbartext" placeholder="查询游戏"/>
                                <div className="search-submit">
                                    <i className="fa fa-search searchBtn" aria-hidden="true" onClick={this.onSearch.bind(this)}></i>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="list-items">
                        <InfiniteScroll
                            initialLoad={false}
                            pageStart={0}
                            loadMore={this.handleInfiniteOnLoad}
                            hasMore={!this.state.loading && this.state.hasMore}
                        >
                            <List
                                dataSource={this.state.data}
                                grid={{ gutter:16, column: 6 }}
                                renderItem={this.renderItem}
                            >
                                {this.state.loading  && (
                                    <div className="loading-container">
                                        <Spin wrapperClassName="loadText" tip="拼命加载中..."/>
                                    </div>
                                )}
                                {!this.state.hasMore && (
                                    <div className="noMore">
                                        我已经到底了,没有更多数据了!￥_￥~
                                    </div>
                                )}
                            </List>
                        </InfiniteScroll>
                    </div>
                </div>
                {/*回到顶部*/}
                <BackTop/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        gameCategories: state.game.gameCategories,
        gameCounter: state.game.gameCounter,
        games: state.game.games,
        slot_platforms: state.game.slot_platforms,
    }
);

export default connect(mapStateToProps, {})(PtGamesPage);