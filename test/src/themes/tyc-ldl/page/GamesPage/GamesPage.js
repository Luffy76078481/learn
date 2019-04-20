/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    List, Spin, BackTop, Carousel
} from 'antd';
import{config} from "globalConfig"
import './GamesPage.scss'
import {Link} from "react-router";
import InfiniteScroll from 'react-infinite-scroller';

let pageIndex=1;
class GamesPage extends Component {
    constructor(props) {
        super(props);
        this.selJackpot = false;
        this.ajaxLock = false;
        let gameID =this.props.routeParams.id?this.props.routeParams.id: "AG";
        this.state = {
            selCategoryMarkIds: "",
            selCategoryId:"",
            selPlatformId:gameID,
            data:[],
            hasMore:true,
            loading:true,
        };
        if (this.props.gameCategories && this.props.gameCategories.length > 0) {
            this.state.selCategoryMarkIds = this.props.gameCategories[0].MarkIds;
            this.state.selCategoryId = this.props.gameCategories[0].ID;

        }
    }
    componentDidMount(){
        if(this.props.gameCategories.length>0){
            //默认加载第一个
            this.onSelectPlatform(this.state.selPlatformId);
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.routeParams.id != nextProps.routeParams.id){
            this.onSelectPlatform(nextProps.routeParams.id)
        }
        if(this.props.gameCategories.length != nextProps.gameCategories.length){
            //默认加载第一个
            this.onSelectPlatform(this.state.selPlatformId);
        }
    }
    onSelectCategory(category) {
        if(this.ajaxLock) return;
        this.ajaxLock=true;
        category  = category || this.props.gameCategories[0];
        this.setState({selCategoryMarkIds: category.MarkIds,selCategoryId:category.ID, data:[],loading:true,hasMore:true},()=>{
            pageIndex=1;
            this.toPage(pageIndex);
        });

    }

    renderCategories() {
        var ret = [];
        let counter = this.props.gameCounter[this.state.selPlatformId];
        if (counter !== undefined) {
            for (var i = 0; i < this.props.gameCategories.length; i++) {
                var gc = this.props.gameCategories[i];
                var nums = counter[gc.ID];
                if(!nums) continue;
                ret.push(
                    <a key={gc.ID}
                       className={gc.ID === this.state.selCategoryId ? "active " : ""}
                       href="javascript:void(0)"
                       onClick={this.onSelectCategory.bind(this, gc)}
                    >
                       {gc.Name}
                        <span className="game-text">({nums})</span>
                    </a>
                )
            }
        }
        return ret;
    }
    onSelectPlatform(platformID) {
        this.setState({selPlatformId: platformID,selCategoryMarkIds:"", data:[],loading:true,hasMore:true},()=>{
            this.onSelectCategory();
        });
    }
    renderPlatfromList(){
        let platformLists = [];
        let index=0;
        for (var i = 0; i < this.props.slot_platforms.length; i++) {
            let platform = this.props.slot_platforms[i];
            if(!platform.ShowSlot){
                continue;
            }
            let className="animated";
            if(this.state.selPlatformId === platform.ID){
                className = "active animated"
            }else{
                if(this.state.selPlatformId=="" && index==0){
                    className = "active animated"
                }
            }
            if(platform.Name2 !="YOPLAY"){
                platformLists.push(
                    <li key={i}  style={{visibility: "visible", animationName: "fadeInUp"}} className={className}>
                        <a href="javascript:void(0)" onClick={this.onSelectPlatform.bind(this, platform.ID)}>
                            {platform.Name2+'平台'}
                        </a>
                    </li>
                );
                index++;
            }
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
        let searchText = this.refs.searchText?this.refs.searchText.value:"";
        let filter = {};
        let GamePlatform="",YoPlay="";
        if(this.state.selPlatformId == "YOPLAY"){
            YoPlay=1
        }else{
            GamePlatform=this.state.selPlatformId;
        }
        new window.actions.ApiQueryGameAllCountAction(GamePlatform,YoPlay).fly();
        filter.GameMarks = this.state.selCategoryMarkIds;
        filter.GamePlatform = [this.state.selPlatformId];

        if (searchText) {
            filter.GameName = searchText;
        }
        if(this.selJackpot){
            filter.Jackpot = 1;
        }

        filter.GamePlatform = filter.GamePlatform.join(',');
        filter.GameType = 4;
        if(this.state.selPlatformId  == "YOPLAY"){//如果是Yoplay平台的情况下
            filter.YoPlay = 1;
            filter.GamePlatform="";
        }
        new window.actions.ApiQueryGamesAction(filter, pageNo , pgsize).fly(resp=>{
            if(resp.StatusCode ==0){
                let data = _this.state.data;
                this.ajaxLock = false;
                data = data.concat(resp.Page);
                _this.setState({
                    data,
                    loading: false,
                    hasMore: pageNo*pgsize<resp.TotalRecord
                });
                pageIndex++;
            }
        }, filter.GamePlatform+filter.GameMarks);
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
    renderItem = (item) => {
        return (
            <List.Item key={item.id}>
                <div className="game-list-item animated" style={{animationName: "flipInX"}}>
                    <div className="itemImg">

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
    onJackpotChanged(e) {
        this.setState({data:[],loading:true,hasMore:true});
        this.selJackpot = e.target.checked;
        pageIndex=1;
        this.toPage(pageIndex);
    }
    render() {
        const randomNum = (num)=> Math.floor(Math.random()*num + 100);
        const ImageGallery = window.r.get("ImageGallery");
        return (
            <div className="gamePage">
                <ImageGallery id="game-pt" width="100%" height="320px" type="games-imgs" imgtype='banner'></ImageGallery>
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
                            <h2 className="title">
                                电子游戏
                                <label className={this.selJackpot == true ?"j_chose":""} htmlFor="option">
                                    ( <input onChange={this.onJackpotChanged.bind(this)} type="checkbox" name="jackpot" value="option"/>奖池游戏 )
                                </label>
                            </h2>
                        </div>
                        <div className="pull-right">
                            <ul>
                                {this.renderPlatfromList()}
                            </ul>
                        </div>
                    </div>
                    {/*分类，15-20线*/}
                    <div className="gameTabs">
                        {this.renderCategories()}
                    </div>
                    {/*内容部分*/}
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
                <BackTop></BackTop>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
{
    gameCategories: state.game.gameCategories,
    gameCounter: state.game.gameCounter,
    slot_platforms: state.game.slot_platforms
}
);

export default connect(mapStateToProps, {})(GamesPage);