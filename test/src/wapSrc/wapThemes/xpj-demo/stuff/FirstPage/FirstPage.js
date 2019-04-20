import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux'
import * as cache from "CacheHelper";
import {Carousel, NoticeBar, Icon, NavBar, PullToRefresh, Toast, Modal, ListView} from 'antd-mobile';
import {ApiGamePlatformAllBalanceAction, ApiPlayerInfoAction, wapAuth} from 'globalAction';
import "./FirstPage.scss";
import {config} from "globalConfig";
import {Tabs, WhiteSpace, Badge} from 'antd-mobile';


const TabExample = (object) => {
    return (
        <div>
            <Tabs tabs={object.titleList}
                  initialPage={object.index}
                  onChange={(tab, index) => {
                      object.changeFun(object.titleList[index].item, false, index)
                  }}
                  onTabClick={(tab, index) => {
                      object.changeFun(object.titleList[index].item, false, index)
                  }}
                  tabBarBackgroundColor={"#027f5f"}
            >

                {object.contentList}

            </Tabs>
            <WhiteSpace/>
        </div>
    )
};
let handleGame;

class FirstPage extends Component {
    state = {
        imgHeight: "3rem",
        refreshing: false,
        loading: false,
        hasMore: true,
        down: true,
        tabsId: "",
        selfGamesClass: "",
        contentList: [],
        closable: false,
        depositModalShow: false,//是否显示充值弹出层
        transferModalShow: false,//是否显示转入弹出层
        nowTabActive: 0,//当前选中的TAB下标
    }

    componentWillMount() {
        //let user = cache.get('user');
        //if(user){
        //    new ApiPlayerInfoAction().fly();
        //}

        if (this.props.homeCategores[0]) {
            let Categores = this.props.homeCategores[0];
            let indexProp = 0;
            this.props.homeCategores.forEach((item, index) => {
                if (item.ID == this.props.wapCategory.id) {
                    Categores = item;
                    indexProp = index;
                }
            })
            this.tabsChange(Categores, false, indexProp);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.homeCategores.length !== nextProps.homeCategores.length) {
            if (nextProps.homeCategores[0]) {
                this.tabsChange(nextProps.homeCategores[0]);
            }
        }
    }

    openSildeBar() {
        this.props.params.openSilde()
    }

    //渲染头部导航右侧部分
    renderRightCon() {
        let number = (this.props.sitemsg.unread || 0) + (this.props.noticesUnRead || 0) + (this.props.promoUnRead || 0);
        let dom = [];
        let _this = this;
        if (this.props.user.token) {
            dom = [
                <Link to='/message/2' className="userInfo" key={'userInfo'}>
                    <i className="title-message">
                        <span className="msg_no">{number > 99 ? "99+" : number}</span>
                    </i>
                </Link>
            ]
        } else {
            dom = [
                <Link to='/login' key={"firstLogin"}>登录</Link>,
                <Link to='/register' key={"firstRegister"}>注册</Link>
            ]
        }
        return dom;
    }

    //公告渲染
    renderNotice() {
        let notice = [];
        this.props.notices.forEach((item, index) => (
            notice.push(
                <span key={index}>{item.Content} </span>
            )
        ))
        return notice;
    }

    openBanner(link) {
        if (!link) return;
        if (config.isApp) {
            window.Util.appOpen(link)
        } else {
            window.open(link, '_blank');
        }
    }

    //Banner渲染
    renderBanner() {
        let banner = [];
        this.props.wapAdsList.forEach((img, index) => (
            banner.push(
                <a
                    key={img.Id}
                    onClick={this.openBanner.bind(this, img.Link)}
                    style={{display: 'inline-block', width: '100%', height: this.state.imgHeight}}
                >
                    <img
                        key={index}
                        src={config.devImgUrl + img.ImgUrl}
                        alt=""
                        style={{width: '100%', verticalAlign: 'top'}}
                        onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({imgHeight: 'auto'});
                        }}
                    />
                </a>
            )
        ))
        return banner;
    }

    closeable() {
        this.setState({
            closable: true
        })
    }

    downLoad() {
        window.open(this.props.remoteSysConfs.channel_push_url, "_blank");
    }

    tabsChange(item, flag = false, index = this.props.wapCategory.index) {
        this.setState({
            nowTabActive: index
        })
        if (item === "selfGames") {  //如果是我的游戏特殊处理
            this.selfGames();
            return;
        }
        if (item.ID === this.state.tabsId && !flag) return;
        let _this = this;
        this.props.wapCategory.id = item.ID;
        this.props.wapCategory.index = index;
        this.setState({
            tabsId: item.ID,
            loading: true,
            init: false,
            selfGamesClass: ""
        });
        if (item.FilterGame) {//判断是否调用游戏接口
            let filter = {};
            filter.GameMarks = item.MarkIds;
            filter.GamePlatform = item.PlatformIds;
            filter.Jackpot = item.Jackpot;
            filter.GameType = item.GameType - 0 ? item.GameType : "";//因爲可能會返回字符串“0”
            if (item.ID === "YOPLAY") {
                filter.GameMarks = "";
                filter.GamePlatform = "";
                filter.GameType = 4;
                filter.YoPlay = 1;
            } else if (item.ID == "KY") {
                console.log(123789);
            }
            filter.TerminalType = "Mobile";
            new window.actions.ApiQueryGamesAction(filter, 1, 20).fly(resp => {
                if (resp.StatusCode === 0) {
                    _this.setState({
                        contentList: resp.Page,
                        hasMore: resp.Page.length > 0,
                        refreshing: false,
                        loading: false
                    })
                }

            })
        } else {
            new window.actions.ApiWapGameCategoriesAction(item.MarkIds).fly(resp => {
                if (resp.StatusCode === 0) {
                    for (var i = 0; i < resp.Data.length; i++) {
                        resp.Data[i].category = true;
                    }
                    _this.setState({
                        contentList: resp.Data,
                        refreshing: false,
                        hasMore: resp.Data.length > 0,
                        loading: false
                    })
                }
            }, item.MarkIds)
        }
    }

    reload() {
        this.setState({refreshing: true});
        setTimeout(() => {
            this.setState({refreshing: false})
        }, 1000);

        // this.tabsChange(this.props.homeCategores[0], true);
    }

    selfGames() {
        let _this = this;
        this.setState({
            selfGamesClass: "active",
            loading: true,
            tabsId: ""
        })

        new window.actions.ApiGetFavoritesAction().fly(resp => {
            if (resp.StatusCode === 0) {
                _this.setState({
                    contentList: resp.List,
                    refreshing: false,
                    hasMore: resp.List.length > 0,
                    loading: false
                })
            }
        })
    }

    canPlay(game) {
        event.preventDefault();
        event.stopPropagation();
        
        if (game.category) {
            if (game.GameId) {
                this.toPlayGame(game.Game)
            } else {
                window.wapHistoryType.push('/allGame/' + game.PlatformIds + '&' + game.GameType + '&' + game.Name)
            }
            return false;
        } else {
            this.toPlayGame(game)
        }
    }

    toPlayGame(game) {
        
        if (!wapAuth(true)) return false;
        let _this = this;
        let currentBalance = 0;
        let totalAmount = parseInt(this.props.user.amount) > 1 ? parseInt(this.props.user.amount) : 0;

        for (var i = 0; i < this.props.platforms.length; i++) {
            let _thisBalance = this.props.platforms[i].Balance ? parseInt(this.props.platforms[i].Balance) : 0;
            totalAmount += _thisBalance;
            if (this.props.platforms[i].ID === game.GamePlatform) {
                currentBalance = _thisBalance;
            }
        }

        handleGame = game;
        if (totalAmount < 1) {
            this.setState({
                depositModalShow: true
            })
        } else if (currentBalance < 1) {
            if (this.props.user.AutoTransfer) {
                _this.getGameUrl(handleGame, true);
            } else {
                this.setState({
                    transferModalShow: true
                })
            }
        } else {
            _this.getGameUrl(game)
        }
    }

    getGameUrl(game, TransferFlag = false) {
        let parma = {
            GamePlatform: game.GamePlatform,
            GameType: game.GameTypeText,
            GameId: game.GameIdentify,
            IsMobile: true,
            IsDemo: false,
        }
        Toast.loading('游戏地址获取中...', 300);
        let windowOpen;
        if (!config.isApp) {
            windowOpen = window.Util.windowOpen('Game');
        }
        new window.actions.ApiGetLoginUrl(parma, '(mobile)', TransferFlag).fly(res => {
            Toast.hide();
            if (res.StatusCode === 0) {
                let gameLink = res.GameLoginUrl;
                if (TransferFlag) {
                    new window.actions.ApiPlayerInfoAction().fly();
                    new window.actions.ApiGamePlatformAllBalanceAction().fly();
                }
                if (!config.isApp) {
                    windowOpen.location.href = gameLink;
                } else {
                    window.Util.appOpen(gameLink)
                }
            } else {
                if (!config.isApp) {
                    windowOpen.urlError(res.Message);
                } else {
                    Modal.alert(res.Message)
                }
            }
        })
    }

    gameAddFavorite(item, event) {
        event.preventDefault();
        event.stopPropagation();
        if (!wapAuth(true)) return false;
        Toast.loading(item.Title + '收藏中..', 300);
        new window.actions.ApiAddFavoriteAction(item.Id).fly(resp => {
            Toast.hide();
            if (resp.StatusCode !== 0) {
                Modal.alert("添加失败！", resp.Message);
            }
        });
    }

    gameRemoveFavorite(item, event) {
        event.preventDefault();
        event.stopPropagation();
        Toast.loading(item.Title + '删除收藏中..', 300);
        new window.actions.ApiDeleteFavoriteAction(item.Id).fly(resp => {
            Toast.hide();
            if (resp.StatusCode !== 0) {
                Modal.alert("删除收藏失败！", resp.Message);
            }
        });
    }

    //渲染游戏导航栏
    renderWapCategores() {
        let categores = [];
        let _this = this;
        this.props.homeCategores.forEach((item, index) => {
            // let className ="tabsCate";
            // if(index==0 && !_this.state.tabsId && !_this.state.selfGamesClass){
            //     className="tabsCate active";

            // }else{
            //     className = _this.state.tabsId==item.ID?"tabsCate active":"tabsCate"
            // }
            // categores.push(<a key={index}  className={className} onClick={_this.tabsChange.bind(this,item,false)}>{item.Name}</a>)
            categores.push(
                {
                    title:
                        <div className="WapCategores">
                            <span className={"tabicon"}>
                                <img
                                    src={_this.state.nowTabActive === index ? config.devImgUrl + item.ImageUrl2 : config.devImgUrl + item.ImageUrl}
                                    alt=""/>
                            </span>
                            <span>{item.Name}</span>
                        </div>,
                    item
                }
            )

        });
        if (this.props.user.token) {
            categores.push(
                {
                    title:
                        <div className="WapCategores">
                            <span className={"tabicon tabicon-favort"}/>
                            <span>最爱</span>
                        </div>,
                    item: "selfGames"
                }
            )
        }
        return categores;
    }

    /*渲染导航栏对应的游戏列表*/
    renderContentList() {
        let contentList = [];
        let favoritesIds = this.props.user.favoritesIds || "";
        if (this.state.loading) {
            contentList.push(
                <div key={"goLoading"} className="dataLoading">
                    <i className="icon-spinner icon-spin"/>玩命加载中..
                </div>
            )
        } else if (!this.state.hasMore) {
            contentList.push(
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 'auto',
                    backgroundColor: '#fff',
                    textAlign: 'center',
                    color: '#888',
                    lineHeight: '3rem'
                }} key={"hasMore"}>
                    我没有更多数据了! (ㄒoㄒ)~
                </div>
            )
        } else if (!this.state.hasMore) {

        } else {
            this.state.contentList.forEach((item, index) => {
                let favoriteBtn;
                let itemId = "";
                if (item.FilterGame) {
                    itemId = item.GameId;
                } else {
                    itemId = item.Id;
                }
                if (itemId && favoritesIds.indexOf(itemId) > -1) {
                    if (item.Id) {
                        favoriteBtn = (
                            <div onClick={this.gameRemoveFavorite.bind(this, item)} className="gameInfo removeFavorite">
                                <i className="icon icon-star"/>
                            </div>
                        )
                    } else {
                        favoriteBtn = (
                            <div className="gameInfo removeFavorite">
                                <i className="icon"/>
                            </div>
                        )
                    }
                } else if (itemId && favoritesIds.indexOf(itemId) <= -1) {
                    if (item.Id) {
                        favoriteBtn = (
                            <div onClick={this.gameAddFavorite.bind(this, item)} className="gameInfo removeFavorite">
                                <i className="icon icon-star-empty"/>
                            </div>
                        )
                    } else {
                        favoriteBtn = (
                            <div className="gameInfo removeFavorite">
                                <i className="icon"/>
                            </div>
                        )
                    }
                }

                let imgUrl = item.IconUrl ? item.IconUrl : item.ImageUrl2;
                contentList.push(
                    <div className="listGame" key={index} onClick={this.canPlay.bind(this, item)}>
                        {favoriteBtn}
                        <img className="image" src={config.devImgUrl + imgUrl} alt=""/>
                        <label>{item.Title ? item.Title : item.Name}</label>
                    </div>
                )
            })
        }
        return <div className="first-content">{contentList}</div>;
    }

    render() {
        let _this = this;
        let isShowdownLoad = this.state.closable || config.isApp;
        let rightCon = this.renderRightCon();
        let notice = this.renderNotice();
        let banner = this.renderBanner();
        let wapCategores = this.renderWapCategores();
        let contentList = this.renderContentList();
        return (
            <div className="firstPage">
                <NavBar
                    mode="light"
                    icon={<img style={{"width": ".45rem", "height": ".45rem"}}
                               src={require("../images/hamburger.png")}
                               alt=""
                    />}
                    onLeftClick={this.openSildeBar.bind(this)}
                    rightContent={rightCon}
                >
                    <span className="logo"/>
                </NavBar>
                {/*拉動刷新*/}
                <PullToRefresh
                    className="scroll-content"
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.reload()
                    }}
                >
                    {/*banner*/}
                    <Carousel autoplay={true} infinite>
                        {banner}
                    </Carousel>
                    {isShowdownLoad ?
                        null :
                        <div className="downAPP">
                            <span>下载手机APP体验更多</span>
                            <a onClick={this.downLoad.bind(this)} className="downAPP-btn">下载手机APP</a>
                        </div>
                    }
                    {/*公告*/}
                    <NoticeBar marqueeProps={{loop: true, style: {padding: '0 7.5px'}}}>
                        {notice}
                    </NoticeBar>
                    {/*内容*/}
                    {/* <div>
                        <div className="contentTab">
                            <div className="tabs">
                                {wapCategores}
                            </div>
                            {
                                this.props.mobileHomeMore.length>0 &&  <Link to="/allGame" className="tabsMore">更多></Link>
                            }
                        </div>
                        <div className="contentList">
                            {contentList}
                        </div>
                    </div> */}
                    
                    <TabExample titleList={wapCategores}
                                contentList={contentList}
                                changeFun={this.tabsChange.bind(this)}
                                index={this.props.wapCategory.index}
                    />
                </PullToRefresh>

                {/*充值弹出层*/}
                {
                    this.state.depositModalShow &&
                    <Modal
                        transparent
                        visible={this.state.depositModalShow}
                        onClose={() => {
                            this.setState({depositModalShow: false})
                        }}
                        footer={
                            [
                                {
                                    text: '充值', onPress: () => {
                                        window.wapHistoryType.push('/money/deposit')
                                    }
                                },
                                {
                                    text: '直接进入', onPress: () => {
                                        _this.getGameUrl(handleGame);
                                        this.setState({depositModalShow: false})
                                    }
                                }
                            ]
                        }
                    >
                        <b style={{color: '#333'}}>您的余额不足，是否前往充值?</b>
                    </Modal>
                }
                {/*转账弹出层*/}
                {
                    this.state.transferModalShow &&
                    <Modal
                        transparent
                        visible={this.state.transferModalShow}
                        onClose={() => {
                            this.setState({transferModalShow: false})
                        }}
                        footer={
                            [
                                {
                                    text: '直接进入', onPress: () => {
                                        _this.getGameUrl(handleGame);
                                        _this.setState({transferModalShow: false})
                                    }
                                },
                                {
                                    text: '自动转入', onPress: () => {
                                        _this.getGameUrl(handleGame, true);
                                        _this.setState({transferModalShow: false})
                                    }
                                }
                            ]
                        }
                    >
                        <b style={{color: '#333'}}>您在{handleGame.GamePlatform}的余额不足，是否将资金自动转入{handleGame.GamePlatform}</b>
                    </Modal>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        notices: state.notices,
        wapAdsList: state.wapAdsList,
        remoteSysConfs: state.remoteSysConfs,
        wapCategory: state.wapCategory,
        wapPage: state.wapPage,
        platforms: state.game.platforms,
        homeCategores: state.wapCategores.mobileHomeCategories,
        mobileHomeMore: state.wapCategores.mobileHomeMore,
        sitemsg: state.sitemsg,
        noticesUnRead: state.noticesUnRead,
    }
);

export default connect(mapStateToProps, {})(FirstPage)