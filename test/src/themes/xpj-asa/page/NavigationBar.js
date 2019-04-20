import React, {Component} from 'react';
import {Link, IndexLink, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import "./css/NavigationBar.scss"
import {auth} from "globalAction";

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        let gameID = "AG";
        this.state = {
            selPlatformId: gameID,
        };
        this.onClickGame = this.onClickGame.bind(this);
        this.enterCasinoGame = this.enterCasinoGame.bind(this);
    }

    renderSlotPlatformOnNav() {
        var ret = [];

        for (var i = 0; i < this.props.platforms.length; i++) {

            var platform = this.props.platforms[i];
            if (!platform.ShowSlot) {
                continue;
            }
            ret.push(
                <li key={i} className={platform.ID}><Link to="/games"
                                                          onClick={this.changePT.bind(this, platform.Name2)}>{platform.Name + "平台"}</Link>
                </li>
            );
        }
        return ret;
    }

    changePT(LinkID) {
        window.actions.ChangeLinkID(LinkID);
    }

    renderSportList() {
        const _this = this;
        let SportList = [];
        this.props.sportGames.forEach(function (item, index) {
            if (item.GamePlatform == "N188") {
                if (_this.props.user.token) {
                    SportList.push(
                        <li key={index} onClick={_this.onClickGameLink.bind(_this, item)}><a>{item.Title}</a></li>
                    )
                }
            } else {
                SportList.push(
                    <li key={index} onClick={_this.onClickGameLink.bind(_this, item)}><a>{item.Title}</a></li>
                )
            }
        })
        return SportList;
    }

    renderCasinoList() {
        var CasinoLists = [];
        for (var i = 0; i < this.props.casinos.length && i < 8; i++) {
            var CasinoList = this.props.casinos[i];
            CasinoLists.push(
                <li key={i} className={'CasinoHdNav_' + CasinoList.ID}
                    onClick={this.onClickCasinoLink.bind(this, CasinoList)}><Link to="/casino">{CasinoList.Title}</Link>
                </li>
            );
        }
        return CasinoLists;
    }

    renderBingoList() {
        let BingoLists = [];
        this.props.bingoGames.map((item,index) => {
            BingoLists.push(
                <li key={index} onClick={this.onClickBingo.bind(this,item)}>
                    <a>{item.Title}</a>
                </li>
            )
        });
        // for (var i = 0; i < this.props.bingoGames.length && i < 8; i++) {
        //     var BingoList = this.props.bingoGames[i];
        //     BingoLists.push(
        //         <li key={i} onClick={this.onClickBingo.bind(this, BingoList)}><a>{BingoList.Title}</a></li>
        //     );
        // }
        return BingoLists;
    }

    onClickGameLink(game) {
        if (!auth()) {
            return;
        }

        let parma = {
            GamePlatform: game.GamePlatform,
            GameType: game.GameTypeText,
            GameId: game.GameIdentify,
            IsMobile: false,
            IsDemo: false,
        }
        let windowOpen = window.Util.windowOpen('Game');
        new window.actions.ApiGetLoginUrl(parma).fly(res => {
            if (res.StatusCode == 0) {
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href = gameLink;
            } else {
                windowOpen.urlError(res.Message);
            }
        })
    }

    onClickCasinoLink(game) {
        if (!window.actions.auth()) {
            return;
        }
        let parma = {
            GamePlatform: game.PlatformId,
            GameType: 'Trueman',//Trueman
            IsMobile: false,
            IsDemo: false,
        }
        let windowOpen = window.Util.windowOpen('Casino');
        new window.actions.ApiGetLoginUrl(parma).fly(res => {
            if (res.StatusCode == 0) {
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href = gameLink;
            } else {
                windowOpen.urlError(res.Message);
            }
        })
    }

    onClickBingo(game) {
        if (!auth()) {
            return;
        }
        let parma = {
            GamePlatform: game.GamePlatform,
            GameType: "Lottery",
            GameId: game.GameIdentify,
            IsMobile: false,
            IsDemo: false,
        }
        let windowOpen = window.Util.windowOpen('Bingo');
        new window.actions.ApiGetLoginUrl(parma).fly(res => {
            if (res.StatusCode == 0) {
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href = gameLink;
            } else {
                windowOpen.urlError(res.Message);
            }
        })
    }

    listRun(tabGames) {
        for (let i = 1; i < tabGames.length; i++) {
            return (<li className="xhtdGames" onClick={this.onClickGameLink.bind(this, {
                GamePlatform: tabGames[i].GamePlatform,
                Id: tabGames[i].GameIdentify
            })}><a>{tabGames[i].Title}</a></li>)
        }
    }

    renderTabGames() {
        let tabGames = this.props.tabGames
        if (tabGames.length > 0) {
            return (
                <ul className="items">
                    <li className="xhtdGames spec-li" onClick={this.onClickGameLink.bind(this, {
                        GamePlatform: tabGames[0].GamePlatform,
                        Id: tabGames[0].GameIdentify
                    })}><a>{tabGames[0].Title}</a></li>
                    {
                        this.listRun(tabGames)
                    }
                    {this.renderSlotPlatformOnNav()}
                </ul>
            )
        }

    }

    //登录体育游戏
    onClickGame(game, event) {
        if ($(event.target).hasClass("sportRule")) {
            var ruleLink = window.config.spec + "_sport_rule.html";
            window.open(ruleLink, '_blank');

        } else {
            if (!auth()) {
                return;
            }
            let parma = {
                GamePlatform: game.GamePlatform,
                GameType: game.GameTypeText,
                GameId: game.GameIdentify,
                IsMobile: false,
                IsDemo: false,
            }
            let windowOpen = window.Util.windowOpen('Sport');
            new window.actions.ApiGetLoginUrl(parma).fly(res => {
                if (res.StatusCode == 0) {
                    let gameLink = res.GameLoginUrl;
                    windowOpen.location.href = gameLink;
                } else {
                    windowOpen.urlError(res.Message);
                }
            })
        }

    }

    //登录真人视讯
    enterCasinoGame(game) {
        if (!window.actions.auth()) {
            return;
        }
        let GameType = '';
        if (game.PlatformId == "MG2") {
            GameType = 'casino'
        } else {
            GameType = 'Trueman'
        }
        let parma = {
            GamePlatform: game.PlatformId,
            GameType: GameType,//Trueman
            IsMobile: false,
            IsDemo: false,
        }
        let windowOpen = window.Util.windowOpen("Casino");
        new window.actions.ApiGetLoginUrl(parma).fly(res => {
            if (res.StatusCode == 0) {
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href = gameLink;
            } else {
                windowOpen.urlError(res.Message);
            }
        })
    }

    changePT(LinkID) {
        if (LinkID == 'OPUS真人/电子')
            LinkID = 'OPUS2'
        window.actions.ChangeLinkID(LinkID);

        browserHistory.push("/");
        setTimeout(() => {
            browserHistory.push("/games");
        }, 10);

    }

    serversOpen(e) {
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link, 'servers', 'width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }

    render() {
        var options = window.r.props("NavigationBar");
        const menuHoverCallback = this.props.menuHover || function (value) {
        };
        const promotionLink = this.props.remoteSysConfs.channel_push_url;
        const platforms = this.props.platforms;
        const casinos = this.props.casinos;
        const sportGames = this.props.sportGames;
        const bingoGames = this.props.bingoGames;
        const chessGames = ['TM棋牌', 'KY棋牌'];
        const fishGames = ['AG捕鱼'];

        return (
            <nav role="navigation" className="Navigation">
                <ul className="main_nav">
                    {/* 首页 */}
                    <li className="spec-lili">
                        <div className="nav_inbox navbx0">
                            <IndexLink to="/" activeClassName="active" className="color-highlight home">
                                <i className="glyphicon glyphicon-home f24 mt5"/>
                            </IndexLink>
                        </div>
                    </li>
                    {/* 体育 */}
                    <li className="mainTitle n-sport" onMouseEnter={menuHoverCallback.bind(this, "sport")}
                        onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx1"><Link activeClassName="active" to="/sport">体育投注</Link></div>

                        <ul className="dropdown_menu sportList">
                            {
                                sportGames && sportGames.map((item) => {
                                    return <li key={item.Id} onClick={(event) => {
                                        this.onClickGame(item, event)
                                    }}>
                                        <a href="#">
                                            <i className="gameIcon"/>
                                            <span>{item.Title}</span>
                                        </a>
                                    </li>
                                })
                            }
                        </ul>
                    </li>
                    {/* 真人视讯 */}
                    <li className="mainTitle n-casino" onMouseEnter={menuHoverCallback.bind(this, "casino")}
                        onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx2"><Link to="/casino" activeClassName="active">真人视讯</Link></div>

                        <ul className="dropdown_menu casino">
                            {
                                casinos && casinos.map((item) => {
                                    return <li key={item.ID} onClick={() => {
                                        this.enterCasinoGame(item)
                                    }}>
                                        <a href="#">
                                            <i className="gameIcon"/>
                                            <span>{item.Title}</span>
                                        </a>
                                    </li>
                                })
                            }
                        </ul>
                    </li>
                    {/* 电子游艺 */}
                    <li className="mainTitle n-games" onMouseEnter={menuHoverCallback.bind(this, "games")}
                        onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx3"><Link to="/games" activeClassName="active">电子游艺</Link></div>

                        <ul className="dropdown_menu electricGames">
                            {
                                platforms && platforms.map((item, index) => {

                                    return <li key={index} onClick={this.changePT.bind(this, item.Name2)}
                                               className={item.ID}><a><i className="gameIcon"/>
                                        <span>{item.ID}</span></a></li>

                                })
                            }
                            {/* <li>
                                <Link to="/pt" activeClassName="active">
                                    <i className="gameIcon" />
                                    <span>PT老虎机</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/mg" activeClassName="active">
                                    <i className="gameIcon" />
                                    <span>MG老虎机</span>
                                </Link>
                            </li> */}
                        </ul>
                    </li>
                    {/* 彩票 */}
                    <li className="mainTitle n-bingo" onMouseEnter={menuHoverCallback.bind(this, "bingo")}
                        onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx4"><Link to="/bingo" activeClassName="active">彩票游戏</Link></div>
                        <ul className="dropdown_menu bingo">
                            {
                                bingoGames && bingoGames.map((item) => {
                                    return <li key={item.Id}>
                                        <Link to="/bingo">
                                            <i className="gameIcon"/>
                                            <span>{item.Title}</span>
                                        </Link>
                                    </li>
                                })
                            }
                        </ul>
                    </li>
                    {/* 捕鱼 */}
                    <li className="mainTitle n-AG" onMouseEnter={menuHoverCallback.bind(this, "agFish")}
                        onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx7">
                            <Link to="/ag" activeClassName="active">
                                {/* <i className="glyphicon glyphicon-fire mr5 agFish"></i> */}
                                捕鱼游戏
                            </Link>
                        </div>
                        <ul className="dropdown_menu fishGames">
                            {
                                fishGames && fishGames.map((item, index) => {
                                    return <li key={index}>
                                        <Link to="/ag">
                                            <i className="gameIcon"/>
                                            <span>{item}</span>
                                        </Link>
                                    </li>
                                })
                            }
                        </ul>
                    </li>
                    {/*PT老虎机*/}
                    {/* <li className="mainTitle n-PT"><div className="nav_inbox navbx5"><Link to="/pt" activeClassName="active">PT老虎机</Link></div></li> */}
                    {/*MG老虎机*/}
                    {/* <li className="mainTitle n-MG"><div className="nav_inbox navbx6"><Link to="/mg" activeClassName="active">MG老虎机</Link></div></li> */}
                    {/* 棋牌 */}
                    <li className="mainTitle ">
                        <div className="nav_inbox navbx2 n-kaiyuan">
                            <Link to="/streetMachine" activeClassName="active">
                                {/* <i className='glyphicon glyphicon-fire mr5 agFish'></i> */}
                                棋牌对战
                            </Link>
                        </div>
                        <ul className="dropdown_menu chessGames">
                            {
                                chessGames && chessGames.map((item, index) => {
                                    return <li key={index}>
                                        <Link to="/streetMachine" activeClassName="active">
                                            <i className="gameIcon"/>
                                            <span>{item}</span>
                                        </Link>
                                    </li>
                                })
                            }
                        </ul>
                    </li>
                    {/* 优惠活动 */}
                    <li className="mainTitle n-promo">
                        <div className="nav_inbox navbx9">
                            <Link to="/promotions" activeClassName="active">
                                {/* <i className="glyphicon glyphicon-gift mr5 mt5"></i> */}
                                优惠活动
                            </Link>
                        </div>
                    </li>
                    {/* 手机投注 */}
                    <li className="bomb">
                        <div className="nav_inbox navbx8">
                            <a href={promotionLink} target="_blank">
                                {/* <i className="glyphicon glyphicon-phone mr5 mt5"></i> */}
                                手机投注
                            </a>
                        </div>
                    </li>
                    {/* 在线客服 */}
                    <li className="mainTitle">
                        <div className="nav_inbox navbx8">
                            <a className="top_livechat" href="#" onClick={this.serversOpen.bind(this)}/>
                        </div>
                    </li>
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        platforms: state.game.slot_platforms,
        casinos: state.views.casinos,
        sportGames: state.game.sportGames,
        bingoGames: state.game.bingoGames,
        tabGames: state.game.tabGames,
        remoteSysConfs: state.remoteSysConfs,
        linkToGames: state.linkToGames.linkToGames,
    }
);

export default connect(mapStateToProps)(NavigationBar)