import React, {Component} from 'react';
import {connect} from 'react-redux';
import './StreetMachine.scss'
import {auth} from "globalAction";

class StreetMachine extends Component{
    constructor(props){
        super(props)
        this.state = {
            selCategoryId: "",
            selPlatformId: "KY",
            loading:false,
            allGames:{},
        };
    }
    componentDidMount(){
        this.onSelectCategory()
        window.$("#root").attr("class", "agcss");
    }

    // 加载游戏
    onSelectCategory(category) {
        this.inited = true;
        this.toPage(1);
    }
    // 获取游戏数据
    toPage(pageNo = 1) {
        let filter ={};
        let _this =this;
        const pgsize = 16;
        filter.GameMarks = [];
        filter.GamePlatform = "KY";
        filter.YoPlay =0;//是否街机游戏

        if (this.state.selCategoryMarkIds) {
            filter.GameMarks.push(this.state.selCategoryMarkIds);
        }
        filter.GameMarks = filter.GameMarks.join(',');
        filter.GameType = 4;
        //添加加载中动画
        _this.setState({
            loading:true
        });
        new window.actions.ApiQueryGamesAction(filter, pageNo , pgsize).fly(resp=>{
            if(resp.StatusCode ==0){
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
    // 点击游戏
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
            YoPlay: 1
        }
       
        let windowOpen = window.Util.windowOpen('StreetGame');
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    // 加载
    renderLoading(){
        return(<div className="games-loader"></div>)
    }
    // 游戏
    renderGames() {
        var ret = [];
        let listLength =this.props.StreetGames.rows.length;
        var _this = this;

         for (var i = 0; i < listLength; i++) {
            var g = this.props.StreetGames.rows[i];
            var imgUrl = window.config.prdImgUrl+g.ImageUrl
            ret.push(
                <div key={i} className="wrapper-game-list-item wrapper-game-list-img width-25 fadeInUp" >
                    <div className="game-list-item">
                        <img className="gameImg" src={imgUrl} onClick={_this.onClickGame.bind(_this, g)}/>
                        <div className="game-hover">
                            <div className="game-hover-inner">
                                <div className="game-hover-wrapper">
                                    <p className="game-title">{g.name}</p>
                                    <a onClick={_this.onClickGame.bind(_this, g)} className="btn frSelected">开始游戏</a>
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
    render(){
        const ImageGallery = window.r.get("ImageGallery");
        return(
            <div className="streetMachine">
                <div className="banner">
                    <ImageGallery width="100%" height="360px" type="jieji_banner_imgs" class="game_list_top_img" imgtype='slider'></ImageGallery>
                </div>
                <div className="game-list-fname2">
                    <div className="game-list-mid-box" >
                        <div className="game_down_content">
                            <div className="games_box" id="games-container">
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
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        platforms: state.game.slot_platforms,
        StreetGames:state.game.StreetGames,
    }
);

export default connect(mapStateToProps,{})(StreetMachine);
