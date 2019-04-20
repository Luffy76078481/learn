


import React from "react";
import "./SecondNav.scss";
import {connect} from "react-redux";
import merge from 'lodash/merge';
import {Link,browserHistory} from "react-router";

class SecondNav extends React.Component {
    constructor(props) {
        super(props);
        this.selCategory = null;
        this.selJackpot = false;
        this.state = {
            lock: false,
            // selPlatformId: props.platforms
        }
    }
    onClickCasinoLink(game) {
        if (!window.actions.auth()) {
            return;
        }
        let GameType = '';
        if(game.PlatformId=="MG2"){
             GameType = 'casino'
        }else{
            GameType = 'Trueman'
        }
        let parma = {
            GamePlatform:game.PlatformId,
            GameType:GameType,//Trueman
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen("Casino");
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
          
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    renderCasinoList() {
        var CasinoLists = [];
        for (var i = 0; i < this.props.casinos.length; i++) {
            var CasinoList = this.props.casinos[i];
            var gameLink = window.configHelper.getGamePlayLink(CasinoList.gameId);
            CasinoLists.push(
                <li key={i}>
                    <a onClick={this.onClickCasinoLink.bind(this, CasinoList)}><div className="pic">
                        <div className={CasinoList.ID+" p-pic"}></div>
                        <h4><a href={gameLink} target="_blank">{CasinoList.ID}</a></h4>
                    </div></a>
                    <div className="txt two"><a href={gameLink}><span>立即游戏</span></a></div>
                </li>
            );
        }
        return CasinoLists;
    }
    componentDidMount(){
        this.componentWillReceiveProps(this.props);
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
    onSearch(e) {
        e.preventDefault();
        this.toPage(1);
    }
    onSelectCategory(category) {
        this.selCategory = category;
        var categoryId = category.id;
        this.setState({selCategoryId: categoryId});
        this.toPage(1);
    }
    onSelectPlatform(platform) {//电子游戏点击事件
        this.setState({selPlatformId: platform.ID, selPlatformMarkId: platform.markId});
        this.state.selPlatformId = platform.ID;//一个是正常api
        this.state.selPlatformMarkId = platform.markId;//特殊处理
        this.toPage(1);
        browserHistory.push("/games?tab="+this.state.selPlatformId);
    }
    onClick(e){
        location.href="/games?tab="+e
    }
    renderCategories() {
        var ret = [];
        if (!this.state.selCategoryId && this.props.gameCategories.length > 0) {
            this.state.selCategoryId = this.props.gameCategories[0].id;
        }
        for (var i = 0; i < this.props.gameCategories.length; i++) {
            var gc = this.props.gameCategories[i];

            var key = gc.id + "_" + this.state.selPlatformId;
            var counter = this.props.gameCounter[key];
            if (counter === undefined && !this.initMap[key]) {
                this.initMap[key] = true;
                var filter = merge({}, gc.filter);
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
            if (counter) {
                ret.push(
                    <li key={gc.id}
                        className={gc.id === this.state.selCategoryId ? "active color-highlight" : "color-main"}>
                        <a href="javascript:void(0)" onClick={this.onSelectCategory.bind(this, gc)}>{gc.name}
                            <span className="game-text">{counter}</span></a>
                    </li>
                )
            }
        }
        return ret;
    }
    toPage(pageNo = 1) {
        let GameListPanel = window.r.props("GameListPanel");
        const pgsize = GameListPanel.pgsize  || 18;
        let filter = {};
        let GamePlatform="",YoPlay=0;
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
        new window.actions.ApiQueryGamesAction(filter, pageNo , pgsize).fly();

    }
    renderPlatfromList() {
        var platformLists = [];
        for (var i = 0; i < this.props.platforms.length; i++) {
            var platform = this.props.platforms[i]; 
            // if(!platform.showSlot){
            //     continue;
            // }
            //电子游艺栏目
            platformLists.push(
                    <li key={platform.ID} onClick={this.onSelectPlatform.bind(this, platform)}>
                    <div className="pic" >
                        <div className={ platform.ID+ "  p-pic"}></div>
                        <h4 className={platform.ID+"t"}><a >{platform.Name2}</a></h4>
                    </div>
                    <div className="txt two"><a><span>立即游戏</span></a></div>
                </li>
            );
           
        }
        return platformLists;
    }

    onClickSportGame(game) {
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
        let windowOpen = window.Util.windowOpen('Sport');
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })

    }
    sportNavItem(){
        let sportGames = [];
        //用户未登陆不显示N188体育
        if(!this.props.user.username){
            for(let i = 0; i< this.props.sportGames.length; i++){
                if(this.props.sportGames[i].GamePlatform != "N188"){
                    sportGames.push(this.props.sportGames[i]);
                }
            }
        }else{
            sportGames = this.props.sportGames.slice();
        }
        return(
                <div className="tab " data-tab="sport">
                    <ul>
                        {
                            sportGames.map((item, index)=>{
                                return (
                                    <li key={index} className={item.GamePlatform} onClick={this.onClickSportGame.bind(this, item)}>
                                        <div className="tit">{item.name}</div>
                                        <div className="pic"></div>
                                        <h4><Link to="/sport">立即游戏</Link></h4>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
        )
    }

    render() {
        const  casinoList = this.renderCasinoList();
        const  gameNav = this.renderPlatfromList();
        const  sportNav = this.sportNavItem();
        const  options = window.r.props("SecondNav");
        return (
            <div className="secondNav">
                {
                    (this.props.showBlock == "sport" || this.state.lock == "sport") &&
                        <div className=" main sport" onMouseEnter={()=>{this.setState({lock: "sport"})}}  >
                            {!options.sportItems?
                            <div className="tab " data-tab="sport" onMouseLeave={()=>{this.setState({lock: false})}}>
                                <ul>
                                    <li className="numb">
                                        <div className="pic"></div>
                                        <div className="txt one">天天返水 不设上限</div>
                                    </li>
                                    <li>
                                        <Link to="/sport"><div className="pic">
                                            <div className="p-pic"></div>
                                            <h4><Link to="/sport">万博体育</Link></h4>
                                        </div></Link>

                                        <div className="txt two">
                                            <span>源自全球领先平台商<br/>世界一流的超高投注赔率</span>

                                        </div>
                                    </li>
                                    <li>
                                        <div className="pic">
                                            <div className="p-pic"></div>
                                        </div>
                                        <div className="txt two">
                                            <div className="left">
                                                <span>APP在手、天下我有</span><br/>
                                                <span>数万场精彩体育赛事应有尽有</span>
                                            </div>
                                            <div className="right">
                                                <span>支付宝、微信支付</span><br/>
                                                <span>无拘无束随时随地想玩就玩</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                                :<div id='shabiwanyi'  onMouseLeave={()=>{this.setState({lock: false})}}>{sportNav}</div>}
                        </div>
                }
                {
                    (this.props.showBlock == "casino" || this.state.lock == "casino") &&
                    <div className="main casino" onMouseEnter={()=>{this.setState({lock: "casino"})}}  >
                        <div className="tab casino" onMouseLeave={()=>{this.setState({lock: false})}}>
                            <ul>
                                <li className="numb">
                                    <div className="pic"></div>
                                    <div className="txt one">天天返水 不设上限</div>
                                </li>
                                {casinoList}
                            </ul>
                        </div>
                    </div>
                }
                {
                    (this.props.showBlock == "games" || this.state.lock == "games") &&
                    <div className="main games" onMouseEnter={()=>{this.setState({lock: "games"})}}  >
                        <div className="tab " onMouseLeave={()=>{this.setState({lock: false})}}>
                            <ul>
                                <li className="numb">
                                    <div className="pic"></div>
                                    <div className="txt one">天天返水 不设上限</div>
                                </li>
                                {gameNav}

                            </ul>
                        </div>
                    </div>
                }
                {
                    (this.props.showBlock == "bingo" || this.state.lock == "bingo") &&
                    <div className=" main bingo" onMouseEnter={()=>{this.setState({lock: "bingo"})}} >
                        <div className="tab "  onMouseLeave={()=>{this.setState({lock: false})}}>
                            <ul>
                                <li className="numb">
                                    <div className="pic"></div>
                                    <div className="txt one">天天返水 不设上限</div>
                                </li>
                                        <li>
                                            <Link to="/bingo"><div className="pic">
                                                <div className="p-pic cg"></div>
                                                <h4><Link to="/bingo">CG彩票</Link></h4>

                                            </div></Link>
                                            <div className="txt two">
                                                {!options.intoBtn?
                                                    <span>游戏多样化，<br/>尽情享受</span>
                                                    :<Link to="/bingo"><span>立即游戏</span></Link>}
                                            </div>
                                        </li>
  

                                <li>
                                    <Link to="/bingo"><div className="pic">
                                        <div className="p-pic bbin"></div>
                                        <h4><Link to="/bingo">BBIN彩票</Link></h4>
                                    </div></Link>
                                    <div className="txt two">
                                        {!options.intoBtn?
                                            <span>多样化玩法，简单刺激<br/>官方同步开奖，更高中奖率</span>
                                            :<Link to="/bingo"><span>立即游戏</span></Link>}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                }
                {
                    options.agFish && ( this.props.showBlock == "agFish" || this.state.lock == "agFish") &&
                    <div className=" main fish" onMouseEnter={()=>{this.setState({lock: "agFish"})}}  >
                        <div className="tab " onMouseLeave={()=>{this.setState({lock: false})}}>
                            <ul>
                                <li className="numb">
                                    <div className="pic"></div>
                                    <div className="txt one">天天返水 不设上限</div>
                                </li>
                                        <li>
                                            <Link to="/ag"><div className="pic">
                                                <div className="p-pic"></div>
                                                <h4><Link to="/ag">Ag捕鱼</Link></h4>

                                            </div></Link>
                                            <div className="txt two">
                                                {!options.intoBtn?
                                                    <span>游戏多样化，<br/>尽情享受</span>
                                                    :<Link to="/bingo"><span>立即游戏</span></Link>}
                                            </div>
                                        </li>
                            </ul>
                        </div>
                    </div>
                }

            </div>
           )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        views:state.views,
        gameCategories: state.game.gameCategories,
        gameCounter: state.game.gameCounter,
        games: state.game.games,
        platforms: state.game.slot_platforms,
        sportGames:state.game.sportGames,
        casinos:state.views.casinos,
    }
);

export default connect(mapStateToProps, {})(SecondNav);