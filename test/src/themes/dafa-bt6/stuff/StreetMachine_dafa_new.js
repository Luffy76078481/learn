import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import './StreetMachine_dafa_new.scss'

class StreetMachine_dafa_new extends Component{
    constructor(props){
        super(props)
        this.state = {
            selCategoryId: "",
            selPlatformId: "KY",
            loading:false,
            allGames:{},
            gameName:''
        };
    }
    componentDidMount(){
        this.onSelectCategory()
        window.$("#root").attr("class", "agcss");
    }

    onSelectCategory(category) {
        this.inited = true;
        this.toPage(1);
    }
    toPage(pageNo = 1) {
        let filter ={};
        let _this =this;
        let pageNum = window.r.props("GamesPage").gamePgSiz;
        filter.markIds = filter.markIds || [];
        filter.platformIds = [this.state.selPlatformId];
        filter.enabled = true;
        filter.gameType = "slot";
        filter.gamePage = "StreetMachine";
        //添加加载中动画
        _this.setState({
            loading:true
        });

        new window.actions.ApiQueryGamesAction(filter, pageNo, pageNum).fly(resp=>{
            if(resp.status ==0){
                _this.setState({
                    loading:false
                })
            }
        });
    }

    toNextPage() {
        if (this.props.StreetGames.pageNo >= this.props.StreetGames.totalPage) {
            return;
        }
        this.toPage(this.props.StreetGames.pageNo + 1);
    }

    toPrevPage() {
        if (this.props.StreetGames.pageNo <= 1) {
            return;
        }
        this.toPage(this.props.StreetGames.pageNo - 1);
    }
    renderPlatfromList() {
        var platformLists = [];
       

        for (var i = 0; i < this.props.platforms.length; i++) {
            var platform = this.props.platforms[i];
            if(!platform.showSlot){
                continue;
            }

            platformLists.push(
                <li key={platform.id} className={this.state.selPlatformId === platform.id  ? "active color-highlight" : "color-main"}>
                    <a href="javascript:void(0)" onClick={this.onSelectPlatform.bind(this, platform)}>
                        {platform.name2?platform.name2:platform.name}
                    </a>
                </li>
            );

        }
        return platformLists;
    }
    onClickGame(link) {
        window.actions.authToLink(link);
    }
    renderLoading(){
        return(<div className="games-loader"></div>)
    }
    renderGamesKaiyuan() {
        for (var i = 0; i < this.props.platforms.length; i++) {
            var platform = this.props.platforms[i];
        }
        const toDecimalNumber = window.toDecimalNumber;
        var ret = [];
        let listLength =this.props.StreetGames.rows.length;
        var _this = this;

         for (var i = 0; i < listLength; i++) {
            var g = this.props.StreetGames.rows[i];
            var imgUrl = g.imageUrl;
            var gameLink = window.configHelper.getGamePlayLink(g.id);
            ret.push(
                <div key={i} className="wrapper-game-list-item wrapper-game-list-img width-25 fadeInUp" >
                    {/*{g.jackpot&&g.jackpotAmount?<div className="jackPot"><span className="jackpot">{toDecimalNumber(g.jackpotAmount)}</span>  CNY</div>:null}*/}
                    <div className="game-list-item">
                        <img className="gameImg" src={imgUrl} onClick={_this.onClickGame.bind(_this, gameLink)}/>
                        <div className="game-hover" onClick={_this.onClickGame.bind(_this, gameLink)}>
                            <div className="game-hover-inner">
                                <div className="game-hover-wrapper">
                                    <p className="game-title">{g.name}</p>
                                    <a onClick={_this.onClickGame.bind(_this, gameLink)} className="btn frSelected">开始游戏</a>
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



    componentWillMount(){
        this.beforeRenderGames()
    }

    beforeRenderGames(){
        let filter = {
            enabled:true,
            gameType:"slot",
            jackpot:"",
            markIds:["YOPLAY"]
        }
        // new window.actions.ApiQueryGamesAction(filter, pageNo, pageNum).fly(resp=>{
        new window.actions.ApiQueryGamesAction(filter).fly(resp=>{
            // if(resp.status ==0){
            //     _this.setState({
            //         loading:false
            //     })
            // }
        });
    }

    renderGamesYOPLAY() {

        const toDecimalNumber = window.toDecimalNumber;
        var ret = [];
        let listLength =this.props.games.rows.length;
        var _this = this;
       
         for (var i = 0; i < listLength; i++) {
           
            var g = this.props.games.rows[i];
            var imgUrl = g.imageUrl;
            var gameLink = window.configHelper.getGamePlayLink(g.id);
            ret.push(
                <div key={i} className="wrapper-game-list-item wrapper-game-list-img width-25 fadeInUp" >
                    {/*{g.jackpot&&g.jackpotAmount?<div className="jackPot"><span className="jackpot">{toDecimalNumber(g.jackpotAmount)}</span>  CNY</div>:null}*/}
                    <div className="game-list-item">
                        <img className="gameImg" src={imgUrl} onClick={_this.onClickGame.bind(_this, gameLink)}/>
                        <div className="game-hover" onClick={_this.onClickGame.bind(_this, gameLink)}>
                            <div className="game-hover-inner">
                                <div className="game-hover-wrapper">
                                    <p className="game-title">{g.name}</p>
                                    <a onClick={_this.onClickGame.bind(_this, gameLink)} className="btn frSelected">开始游戏</a>
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
        for (var i = 1; i <= this.props.StreetGames.totalPage; i++) {
            if (i !== 1 && i !== this.props.StreetGames.totalPage && Math.abs(this.props.StreetGames.pageNo - i) >= 3) {
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
                <div key={i} className={i === this.props.StreetGames.pageNo ? "active" : "number_icon"}>
                    <a className={i === this.props.StreetGames.pageNo ? "  border-type" : " border-type"} href="javascript:void(0)" onClick={this.toPage.bind(this, i)}>{i}</a>
                </div>
            )
        }
        return ret;
    }

    choseGames(){
        return (
            <div className='street_box'>
                <div className='street_center'>
                        <div className='street_kaiyuan'>
                        <div className='street_start' onClick={()=>{this.setState({gameName:'Kaiyuan'})}}>马上游戏</div>
                        <div className='shadom'></div>
                    </div>
                        <div className='street_yoplay'>
                        <div className='street_start' onClick={()=>{this.setState({gameName:'YOPLAY'})}}>马上游戏</div>
                        <div className='shadom'></div>
                    </div>
                </div>
            </div>
        )
    }

    switchPagesShow(){
        if(this.state.loading){
            return this.renderLoading();
        }else{
            switch(this.state.gameName){
                case 'YOPLAY':
                return this.renderGamesYOPLAY();
                case 'Kaiyuan':
                return this.renderGamesKaiyuan();
                default:
                // return this.choseGames();
                return this.renderGamesKaiyuan();
            }
        }

    }

    change1(){
        this.refs.clas1.classList.add('color-highlight');
        this.refs.clas2.classList.remove('color-highlight');
        this.setState({gameName:'Kaiyuan'});
    }
    change2(){
        this.refs.clas2.classList.add('color-highlight');
        this.refs.clas1.classList.remove('color-highlight');
        this.setState({gameName:'YOPLAY'})
    }
    render(){
        const ImageGallery = window.r.get("ImageGallery");
        return(
            <div className="streetMachine">
                <div className="banner">
                    <ImageGallery width="100%" height="360px" type="jieji_banner_imgs" class="game_list_top_img" imgtype='slider'></ImageGallery>
                </div>
                <div className="game-list-fname2">
                    {/*<div className="game-list-left-nav fadeInUp">*/}
                        {/*<ul>*/}
                            {/*{this.renderPlatfromList()}*/}
                        {/*</ul>*/}
                    {/*</div>*/}
                    <div className='game_tab'>
                        <ul>
                            <li ref="clas1" className='color-main color-highlight'>
                                <a onClick={this.change1.bind(this)}>KY棋牌</a>
                            </li>
                            <li ref="clas2" className='color-main'>
                                <a onClick={this.change2.bind(this)}>Yoplay</a>
                            </li>
                            <li className="color-main"><Link to="/promotions">优惠活动</Link></li>
                            <li className="color-main"><Link to="/termsOfUse" target="_blank">常见问题</Link></li>
                        </ul>
                        <div className='pull-right'>
                        {/* <form class="searchbar" style="cursor: pointer;">
                            <input type="text" class="searchbartext" placeholder="查询游戏"></input>
                            <i class="fa fa-search searchBtn" aria-hidden="true"></i>
                        </form> */}
                        </div>
                    </div>
                    <div className="game-list-mid-box" >
                        <div className="game_down_content">
                            <div className="games_box" id="games-container">
                                {this.switchPagesShow()}
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
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        platforms: state.game.slot_platforms,
        StreetGames:state.game.StreetGames,
        games: state.game.games
    }
);


export default connect(mapStateToProps,{})(StreetMachine_dafa_new);
