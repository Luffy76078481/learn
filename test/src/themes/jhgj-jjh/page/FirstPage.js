import React, { Component } from 'react';
import "./css/FirstPage.scss";
import { connect } from 'react-redux';
import { Link } from 'react-router';

class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {tab:1}
    }
    initAll() {
        // ptlist
       window.renderOwl(this.refs.plist, {
            items: 4,
            loop: true,
            dots: false,
            nav: true,
            navText: ['', ''],
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 3000
        });
        // best games
        window.renderOwl('.content-game-list', {
            items:1,
            dots:false,
            autoplay:true,
            autoplayHoverPause:true,
            autoplayTimeout:5000,
            loop:true
        });
        let num =  window.renderOwl('.content-bingo-list', {
            items:1,
            dots:false,
            autoplay:true,
            autoplayHoverPause:true,
            autoplayTimeout:4000,
            loop:true
    });
    $(".content-bingo-title a").hover(function(){
        var numtype = $(this).index(".content-bingo-title a");
        $(this).addClass("active").siblings().removeClass("active");
       num.trigger('to.owl.carousel',numtype)
    })
    }
    componentDidMount() {
        
        this.initAll();
    }
    componentDidUpdate() {
        this.initAll();
    }
    onClickGameLink(link) {
        window.actions.authToLink(link);
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    onCarouselClick(event){
        if (!window.actions.auth()) {
            return;
        }
        
        let target = $(event.target);
        
        if(target.hasClass("delegate")){
            let casinoID = target.attr("data-gameLink");
            let GameType = '';
            if(casinoID=="MG2"){
                 GameType = 'casino'
            }else{
                GameType = 'Trueman'
            }
            let parma = {
                GamePlatform:casinoID,
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
            // if(gameLink){
            //     this.onClickGameLink(gameLink);
            // }
        }
    }
    renderCansinoList() {
        const toDecimalNumber = window.toDecimalNumber;
        var ret = [];
        for (var i = 0; i < this.props.views.casinos.length; i++) {
            var casino = this.props.views.casinos[i];
            var gameLink = window.configHelper.getGamePlayLink(casino.GameId);
            ret.push(
                <div key={casino.ID} className="item">
                    <div className="platform">
                        <div className="platform-img">
                            <div className="platform-img-style platform-inco0" style={{background: "url(" + casino.IconUrl + ") no-repeat", "backgroundSize":"100% 100%"}}></div>
                            <div className="platform-Number color-third"><i className="glyphicon glyphicon-user"></i><span className="jackpot">{toDecimalNumber(casino.OnlineUserCount|| 0)}</span></div>
                        </div>
                        <div className="platform-Introduction">
                            <h4 className="color-third">{casino.Title}</h4>
                            <p className="color-main">{casino.Description}</p>
                            <a className="delegate" data-gameLink={casino.PlatformId} href="javascript:;" >进入游戏</a>
                        </div>
                    </div>
                </div>
            );
        }
        return ret;
    }
    render() {
        window.onClickGameLink = (link)=>{
            this.onClickGameLink(link);
        }
        const ImageGallery = window.r.get("ImageGallery");
        const NoticeBar = window.r.get("NoticeBar");
        const gl = window.configHelper.getGamePlayLink;
        const toDecimalNumber = window.toDecimalNumber;
        return (
            <div>
                 <ImageGallery height="520px" imgtype='slider'></ImageGallery>
                    <article id="pt_bg_style" className="BGcolor-main">
                        <div className="container">
                            <div ref="plist" className="ptlist" onClick={this.onCarouselClick.bind(this)}>
                                {this.renderCansinoList()}
                            </div>
                        </div>
                    </article>
                    <article id="indexContent" className="fordemo BGcolor-main">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 wow fadeInUp">
                                <div className="content-jackpot">
                                    <h3 className="color-main"><i className="glyphicon glyphicon-usd color-highlight"></i>累计奖池 <span className="right color-highlight">JACKPOT</span></h3>
                                    <ul>
                                        <li><span className="color-main">神的时代：激情四</span><i className="color-highlight ">￥<span className="jackpot">474,776,721.78</span></i></li>
                                        <li><span className="color-main">疯狂水果</span><i className="color-highlight">￥<span className="jackpot">101,501.55</span></i></li>
                                        <li><span className="color-main">金字塔女王</span><i className="color-highlight">￥<span className="jackpot">313,936.31</span></i></li>
                                        <li><span className="color-main">金色召集</span><i className="color-highlight">￥<span className="jackpot">6,109,587.47</span></i></li>
                                        <li><span className="color-main">全景电影</span><i className="color-highlight">￥<span className="jackpot">463,919.88</span></i></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-8 wow fadeInUp" data-wow-duration="2s">
                                <div className="updateContent">
                                    <div className="updataAd BGcolor-second">
                                        <h4 className="color-second"><i className="glyphicon glyphicon-volume-up"></i>最新公告</h4>
                                        <div className="noticeCenter">
                                             {/* <NoticeBar ></NoticeBar> */}
                                        </div>
                                    </div>
                                    <div className="updataAd-img">
                                        <a href=""></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 wow fadeInUp">
                                <div className="content-game">
                                    <h3 className="color-main"><i className="glyphicon glyphicon-star color-highlight"></i>最强游戏王 <span className="right color-highlight">GAME</span></h3>
                                    <div className="content-game-list" onClick={this.onCarouselClick.bind(this)}>
                                        <div className="item"><a className="geme_img0"></a> <div className="content-game-introduction"><div className="content-game-introduction-left"><h4 className="color-highlight">恭喜会员j**a中奖</h4><p className="color-main">在AG《捕鱼王者》中得CNY30,000.00</p></div><a href="/games" className="btn-type border-type " >前往</a></div></div>
                                        <div className="item"><a className="geme_img1"></a><div className="content-game-introduction"><div className="content-game-introduction-left"><h4 className="color-highlight">恭喜会员c**55中奖</h4><p className="color-main">在MG《黄金海岸》中得CNY20,000.00</p></div><a href="/games" className="btn-type border-type " >前往</a></div></div>
                                        <div className="item"><a className="geme_img2"></a><div className="content-game-introduction"><div className="content-game-introduction-left"><h4 className="color-highlight">恭喜会员f**y中奖</h4><p className="color-main">在PT《古怪猴子》中得CNY20,000.00</p></div><a href="/games" className="btn-type border-type " >前往</a></div></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 content-bingo wow fadeInUp" data-wow-duration="1.5s">
                                <h3><i className="glyphicon glyphicon-tree-conifer color-highlight"></i>彩票区<span className="right color-highlight">BINGO</span></h3>
                                <div className="content-bingo-fname BGcolor-second">
                                    <div className="content-bingo-list">
                                        {/*<div className="item"><img src="images/index/bingo_0.png?v=1"/></div>*/}
                                        {/*<div className="item"><img src="images/index/bingo_1.png?v=1"  height="142px" /></div>*/}
                                        {/*<div className="item"><img src="images/index/bingo_2.png?v=1"  height="142px" /></div>*/}
                                        {/*<div className="item"><img src="images/index/bingo_3.png?v=1"  height="142px" /></div>*/}
                                        <div className="item bingo_0" style={{width:"245px"}}></div>
                                        <div className="item bingo_1" style={{width:"245px"}}></div>
                                        <div className="item bingo_2" style={{width:"245px"}}></div>
                                        <div className="item bingo_3" style={{width:"245px"}}></div>
                                    </div>
                                    <div className="content-bingo-title">
                                        <a href="/bingo" className="BGcolor-second color-second active">快乐彩</a>
                                        <a href="/bingo" className="BGcolor-second color-second">时时彩</a>
                                        <a href="/bingo" className="BGcolor-second color-second">六合彩</a>
                                        <a href="/bingo" className="BGcolor-second color-second">快乐8</a>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                                <div className="content-bingo-offers" data-wow-duration="2s" data-wow-delay="1s">
                                    <a href="/promotions" className="color-main"><i className="glyphicon glyphicon-fire"></i>1920奖金模式,新东方非 <span className="btn-type border-type"><i className="glyphicon glyphicon-gift mr5 mt5"></i>更多优惠</span></a>
                                </div>
                            </div>
                            <div className="col-md-4 wow fadeInUp content-data">
                                <h3 className="hous_03"></h3>
                                <ul className="time-data">
                                    <li>
                                        <div className="data-list-title text-hidden"><i className="glyphicon glyphicon-user"></i>活跃用户数</div>
                                        <div className="data-list-style data_title"><span className="data-list-style-width BGcolor-second" style={{width: "44%"}}><span className="un1"><span>{toDecimalNumber(this.props.global.onlineUserCount || 2989)}</span> 人</span></span></div>
                                        <div className="clear"></div>
                                    </li>
                                    <li>
                                        <div className="data-list-title text-hidden"><i className="glyphicon glyphicon-check"></i>累计注单量</div>
                                        <div className="data-list-style data_title"><span className="data-list-style-width BGcolor-second" style={{width: "60%"}}><span className="un1"><span className="jackpot">{toDecimalNumber(this.props.global.betCount || 1989565)}</span> 注</span></span></div>
                                        <div className="clear"></div>
                                    </li>
                                    <li>
                                        <div className="data-list-title text-hidden"><i className="glyphicon glyphicon-usd"></i>累计存提款</div>
                                        <div className="data-list-style data_title"><span className="data-list-style-width BGcolor-second text-hidden" style={{width: "98%"}}><span className="jackpot">{toDecimalNumber(this.props.global.cashCount||55808)}</span> 笔 / <span> {this.props.global.cashSpeed||332} 秒</span>每笔</span></div>
                                        <div className="clear"></div>
                                    </li>
                                    <li>
                                        <div className="data-list-title text-hidden"><i className="glyphicon glyphicon-star-empty"></i>累计派彩</div>
                                        <div className="data-list-style data_title"><span className="data-list-style-width BGcolor-second" style={{width: "80%"}}><span className="un1">￥<span className="jackpot">{toDecimalNumber(this.props.global.bonusAmount||0)}</span> / 人</span></span></div>
                                        <div className="clear"></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        views:state.views,
        global: state.global,
        bestGames: state.game.bestGames
    }
);

export default connect(mapStateToProps, {})(FirstPage);