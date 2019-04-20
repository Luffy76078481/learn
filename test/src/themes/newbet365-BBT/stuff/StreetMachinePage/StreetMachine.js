import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import './StreetMachine.scss'

class StreetMachine extends Component{
    constructor(props){
        super(props)
        this.state = {
            selCategoryId: "",
            selPlatformId: "TM",
            loading:false,
            allGames:{},
            intoGamePlatform:'',
            intoGameTypeText:''
        };
    }
    componentDidMount(){
        this.onSelectCategory(); 
        window.$("#root").attr("class", "agcss");
        document.title = window.config.title;
    }

    onSelectCategory(category) {
        this.inited = true;
        this.toPage(1);
    }
    toPage(pageNo = 1,gameType=["TM"]) {
        let filter ={};
        let _this =this;
        // const pgsize = window.r.props("GamesPage").gamePgSiz  || 18;
        const pgsize = 20;
        filter.GameMarks = [];
        if(gameType == "YOPLAY"){
            filter.GamePlatform = "";
            filter.YoPlay =1;//是否街机游戏
        }else{
            filter.GamePlatform = gameType;
            filter.YoPlay =0;//是否街机游戏
            filter.GamePlatform = filter.GamePlatform.join(',');
        }
        if (this.state.selCategoryMarkIds) {
            filter.GameMarks.push(this.state.selCategoryMarkIds);
        }
        if(this.selJackpot){
            filter.Jackpot = this.selJackpot;
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
        this.toPage(this.props.StreetGames.pageNo + 1,this.state.selPlatformId);
    }

    toPrevPage() {
        if (this.props.StreetGames.pageNo <= 1) {
            return;
        }
        this.toPage(this.props.StreetGames.pageNo - 1,this.state.selPlatformId);
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

    onClickIntoRoom(game){
        if (!window.actions.auth()) {
            return;
        }
        window.$("#IntoRoom").modal("show");
        this.setState({
            intoGamePlatform:game.GamePlatform,
            intoGameTypeText:game.GameTypeText
        })
    }
    onClickIntoRoomId(){
        let IntoRoomId = this.refs.IntoRoomIdsVlaue.value;
        if(IntoRoomId==""){
            window.swal({
                title: "请填写房间号",
                text: "",
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            return false;
        }else if(IntoRoomId.length<6){
            window.swal({
                title: "房间号不能小于6位",
                text: "",
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            return false;
        } 
        let parma = {
            GamePlatform:this.state.intoGamePlatform,
            GameType:this.state.intoGameTypeText,
            GameId:"2$"+IntoRoomId,
            IsMobile:false,
            IsDemo:false,
            YoPlay: 1
        }
        let windowOpen = window.Util.windowOpen('StreetGame');
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
                window.$(this.refs.dlg).modal("hide");
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    close(){
        this.setState({
            errorPassword : false
        })
    }
    renderLoading(){
        return(<div className="games-loader"></div>)
    }
    renderGames() {
        const toDecimalNumber = window.toDecimalNumber;
        var ret = [];
        let listLength =this.props.StreetGames.rows.length;
        var _this = this;

         for (var i = 0; i < listLength; i++) {
            var g = this.props.StreetGames.rows[i];
            var imgUrl = g.ImageUrl;
            ret.push(
                <div key={i} className="wrapper-game-list-item wrapper-game-list-img width-25 fadeInUp" >
                    {/*{g.ShowJackpots&&g.JackpotsInfo?<div className="jackPot"><span className="jackpot">{toDecimalNumber(g.JackpotsInfo)}</span>  CNY</div>:null}*/}
                    <div className="game-list-item">
                        <img className="gameImg" src={window.config.prdImgUrl+imgUrl} onClick={_this.onClickGame.bind(_this,g)}/>
                        <div className="game-hover"> 
                            <div className="game-hover-inner">
                                <div className="game-hover-wrapper">
                                    <p className="game-title">{g.Title}</p>
                                    <a onClick={_this.onClickGame.bind(_this, g)} className="btn frSelected">开始游戏55</a>
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
                    <a className={i === this.props.StreetGames.pageNo ? "  border-type" : " border-type"} href="javascript:void(0)" onClick={this.toPage.bind(this, i,this.state.selPlatformId)}>{i}</a>
                </div>
            )
        }
        return ret;
    }
    
    change1(){
        this.refs.clas1.classList.add('color-highlight');
        this.refs.clas2.classList.remove('color-highlight');
        this.setState({selPlatformId:["KY"]})
        // this.onSelectCategory();
        this.toPage(1,["KY"]);
    }
    change2(){
        this.refs.clas2.classList.add('color-highlight');
        this.refs.clas1.classList.remove('color-highlight');
        this.setState({selPlatformId:["TM"]});
        // this.onSelectCategory();
        this.toPage(1,["TM"]);
    }
    
    switchPagesShow(){
        if(this.state.loading){
            return this.renderLoading();
        }else{
            return this.renderGamesKaiyuan();
        }

    }

    renderGamesKaiyuan() {
        for (var i = 0; i < this.props.slot_platforms.length; i++) {
            var platform = this.props.slot_platforms[i];
        }
        const toDecimalNumber = window.toDecimalNumber;
        var ret = [];
        let listLength =this.props.StreetGames.rows.length;
        var _this = this;
         for (var i = 0; i < listLength; i++) {
            var g = this.props.StreetGames.rows[i];
            var imgUrl = g.ImageUrl;
            var gameLink = window.configHelper.getGamePlayLink(g.Id);
            ret.push(       
                        <div key={i} className="wrapper-game-list-item wrapper-game-list-img width-25 fadeInUp" >
                        {/*{g.jackpot&&g.jackpotAmount?<div className="jackPot"><span className="jackpot">{toDecimalNumber(g.jackpotAmount)}</span>  CNY</div>:null}*/}
                        <div className="game-list-item">
                            <img className="gameImg" src={window.config.prdImgUrl+imgUrl} />
                            <div className="game-hover" > 
                                <div className="game-hover-inner">
                                    <div className="game-hover-wrapper">
                                        <p className="game-title">{g.Title}</p>
                                        {g.GameIdentify.indexOf("2$X")!=-1?
                                        <a onClick={_this.onClickIntoRoom.bind(_this, g)} className="btn frSelected">进入房间</a>: 
                                        <a onClick={_this.onClickGame.bind(_this,g)} className="btn frSelected">开始游戏</a>
                                        }
                                    
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
    renderHelp(){
        if(window.config.spec== "dafa-bt6" || window.config.spec== "dafa-ldl" ) {
           return <li className="color-main"><Link to="/termsOfUse" target="_blank">常见问题</Link></li>
        }else if(window.config.spec== "xhtd-bt6" || window.config.spec== "xhtd-ldl" ){
            return <li className="color-main"><Link to="/agent.html?tab=Faq" target="_blank">常见问题</Link></li>
        }else{
            return <li className="color-main"><Link to="/help.html" target="_blank">常见问题</Link></li>
        }
    }

    render(){
        const ImageGallery = window.r.get("ImageGallery");
        const options = window.r.props("ImageGallery");
        return(
            <div className="streetMachine">
                <div className="banner">
                   <ImageGallery width="100%" height="360px" type="jieji_banner_imgs" class="game_list_top_img" imgtype='slider'></ImageGallery>
                </div>
                <div className="game-list-fname2">
                    {/* <div className="game-list-left-nav fadeInUp">
                        <ul>
                            {this.renderPlatfromList()}
                        </ul>
                    </div> */}
                    <div className='game_tab'>
                        <ul>
                            <li ref="clas2" className='color-main color-highlight'>
                                <a className="tmpng" onClick={this.change2.bind(this)}>
                                <img src={require("../../page/index/images/bet365/tm.png")} />TM棋牌</a>
                            </li>
                            <li ref="clas1" className='color-main '>
                                <a className="tmpng" onClick={this.change1.bind(this)}>
                                <img src={require("../../page/index/images/bet365/ky.png")}/>KY棋牌</a>
                            </li>

                            {/* <li className="color-main"><Link to="/promotions">优惠活动</Link></li> */}
                            {/* {this.renderHelp()} */}
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
                        {/* 进入房间弹窗 */}
                        <div ref="dlg" id="IntoRoom" className="modal fade" role="dialog">
                          <div className="modal-dialog login">
                              <div className="modal-content custom_modal_content">
                                  <div className="modal-header regis-head BGcolor-second border-type">
                                      <button type="button" className="close" data-dismiss="modal" onClick={()=>{this.close()}}><i className="fa fa-times"></i></button>
                                      <h4 className="modal-title color-second">   加入房间 </h4>
                                  </div>
                                  <div className="modal-body fast_booking_content regis-body BGcolor-main border-type" style={{height:"auto"}}>
                                          <div className="row">
                                              <div className="col-xs-12 col-md-12 input-marg">
                                                  <input ref="IntoRoomIdsVlaue" type="number" maxLength="6" placeholder="请输入6位房间密码" className="border-type BGcolor-main color-main"/>
                                              </div>
                                              <div className="col-xs-6 col-md-6 regisbox">
                                                  <button type="button" className="regisbtn" onClick={this.onClickIntoRoomId.bind(this)} >确定</button>
                                              </div>
                                          </div>

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
        slot_platforms: state.game.slot_platforms,
        StreetGames:state.game.StreetGames,
        platforms: state.game.slot_platforms,
    }
);

export default connect(mapStateToProps,{})(StreetMachine);
