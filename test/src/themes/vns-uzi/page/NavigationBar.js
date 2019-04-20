import React, {Component} from 'react';
import {Link, IndexLink, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import "./css/NavigationBar.scss"
import {auth} from "globalAction";

class NavigationBar extends Component {
    renderSlotPlatformOnNav() {
        let ret = [];
        for (let i = 0; i < this.props.platforms.length; i++) {
            let platform = this.props.platforms[i];
            if (!platform.ShowSlot) {
                continue;
            }
            ret.push(
                <li key={i} onClick={this.changePT.bind(this, platform.Name2)} key={i} className={platform.id}>
                    <a>{platform.ID + "平台"}</a></li>
            );
        }
        return ret;
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

    renderSportList() {
        const _this = this;
        let SportList = [];
        if (!this.props.user.username) {
            for (let i = 0; i < this.props.sportGames.length; i++) {
                if (this.props.sportGames[i].GamePlatform != "N188") {
                    sportGames.push(this.props.sportGames[i]);
                }
            }
        } else {
            sportGames = this.props.sportGames.slice();
        }
        return SportList;
    }

    renderCasinoList() {
        let CasinoLists = [];
        for (let i = 0; i < this.props.casinos.length && i < 8; i++) {
            let CasinoList = this.props.casinos[i];
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
        for (let i = 0; i < this.props.bingoGames.length && i < 8; i++) {
            let BingoList = this.props.bingoGames[i];
            BingoLists.push(
                <li key={i} onClick={this.onClickBingo.bind(this, BingoList)}><a>{BingoList.Title}</a></li>
            );
        }
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

    gameLinkTo(val) {
        if (val == 'OPUS')
            val = 'OPUS2'
        this.props.dispatch({type: "ChangeLinkID", data: val});
        browserHistory.push("/");
        setTimeout(() => {
            browserHistory.push("/games");
        }, 10);

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

    listRun() {
        let ret = [];
        for (let i = 1; i < this.props.tabGames.length; i++) {
            let tabGame = this.props.tabGames[i]
            ret.push(
                <li className="xhtdGames" onClick={this.onClickGameLink.bind(this, {
                    GamePlatform: tabGames.GamePlatform,
                    Id: tabGames.GameIdentify
                })}><a>{tabGames.Title}</a></li>
            )
        }
    }

    renderTabGames() {
        let tabGames = this.props.tabGames;
        let ret = []
        if (tabGames.length > 0) {
            for (let i = 1; i < tabGames.length; i++) {
                ret.push(<li key={i + 'hotGame'} className="xhtdGames" onClick={this.onClickGameLink.bind(this, {
                    GamePlatform: tabGames[i].GamePlatform,
                    GameIdentify: tabGames[i].GameIdentify
                })}><a>{tabGames[i].Title}</a></li>)
            }
        }
        return ret;
    }

    render() {
        let sportGames = [];
        if (!this.props.user.username) {
            for (let i = 0; i < this.props.sportGames.length; i++) {
                if (this.props.sportGames[i].GamePlatform != "N188") {
                    sportGames.push(this.props.sportGames[i]);
                }
            }
        } else {
            sportGames = this.props.sportGames.slice();
        }
        const promotionLink = this.props.remoteSysConfs.channel_push_url;
        let options = window.r.props("NavigationBar");
        const menuHoverCallback = this.props.menuHover || function (value) {
        };

        return (
            <nav role="navigation" className="Navigation">
                <ul className="main_nav clearfix">
                    <li className="spec-lili">
                        <div className="nav_inbox navbx0">
                            <IndexLink to="/" activeClassName="active" className="color-highlight home">
                                <i className="glyphicon glyphicon-home f24 mt5"/>
                            </IndexLink>
                        </div>
                    </li>
                    {/*体育*/}
                    <li className="mainTitle n-sport" onMouseEnter={menuHoverCallback.bind(this, "sport")}
                        onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx1"><Link activeClassName="active" to="/sport">体育投注</Link></div>
                        <ul className="items">
                            {
                                sportGames.map((item, index) => {
                                    return (
                                        <li key={index} onClick={this.onClickGameLink.bind(this, item)}>
                                            <a>{item.Title}</a></li>
                                    )
                                    // <li key={i} onClick={_this.onClickGameLink.bind(_this,this.props.sportGames[i].GamePlatform)}><a>{this.props.sportGames[i].Title}</a></li>
                                })
                            }
                        </ul>
                    </li>
                    {/*真人*/}
                    <li className="mainTitle n-casino" onMouseEnter={menuHoverCallback.bind(this, "casino")}
                        onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx2"><Link to="/casino" activeClassName="active">真人视讯</Link></div>
                        <ul className="items casino2">
                            {this.renderCasinoList()}
                        </ul>
                    </li>
                    {/*电子*/}
                    <li className="mainTitle n-games" onMouseEnter={menuHoverCallback.bind(this, "games")}
                        onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx3"><Link to="/games" activeClassName="active">电子游艺</Link></div>
                        <ul className="items">
                            {this.renderTabGames()}
                            {this.renderSlotPlatformOnNav()}
                        </ul>
                    </li>
                    {/*彩票*/}
                    <li className="mainTitle n-bingo" onMouseEnter={menuHoverCallback.bind(this, "bingo")}
                        onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx4"><Link to="/bingo" activeClassName="active">彩票游戏</Link></div>
                        <ul className="items">
                            <li className="xhtdGames"
                                onClick={this.onClickBingo.bind(this, {GamePlatform: 'CG', GameIdentify: ""})}>
                                <a>重庆时时彩</a>
                            </li>
                            {/* <li className="xhtdGames" onClick={this.onClickBingo.bind(this, {GamePlatform:'CG',GameIdentify:""})}><a>腾讯分分彩</a></li> */}
                            <li className="xhtdGames"
                                onClick={this.onClickBingo.bind(this, {GamePlatform: 'CG', GameIdentify: ""})}>
                                <a>香港六合彩</a>
                            </li>
                            {/* <li className="xhtdGames" onClick={this.onClickBingo.bind(this, {GamePlatform:'CG',Id:"D20DF9D9BF004974B80A978801EA2767"})}><a>北京PK10</a></li> */}
                            <li className="xhtdGames"
                                onClick={this.onClickBingo.bind(this, {GamePlatform: 'CG', GameIdentify: ""})}>
                                <a>北京PK10</a>
                            </li>
                            {this.renderBingoList()}
                        </ul>
                    </li>
                    {/*棋牌*/}
                    <li className="mainTitle n-bingo" onMouseEnter={menuHoverCallback.bind(this, "sport")}
                        onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx1 n-kaiyuan">
                            <Link activeClassName="active" to="/chessmerge">棋牌游戏</Link>
                        </div>
                        <ul className="items">
                            <li className='xhtdGames'><Link to="/streetMachine">开元棋牌</Link></li>
                            <li className='xhtdGames'><Link to="/streetMachine2">天美棋牌</Link></li>
                            <li className='xhtdGames'><Link to="/ag">AG捕鱼</Link></li>
                        </ul>
                    </li>
                    {/*下载*/}
                    <li className="bomb">
                        <div className="nav_inbox navbx8">
                            <a href={promotionLink} target="_blank">
                                <i className="glyphicon glyphicon-phone mr5 mt5"/>
                                App下载
                            </a>
                        </div>
                    </li>
                    {/*优惠*/}
                    <li className="mainTitle n-promo">
                        <div className="nav_inbox navbx9">
                            <Link to="/promotions" activeClassName="active">
                                <i className="glyphicon glyphicon-gift mr5 mt5"/>优惠活动
                            </Link>
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
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(NavigationBar)