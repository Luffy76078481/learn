import React, { Component } from 'react';
import {Link,browserHistory} from 'react-router';
import {auth} from "globalAction";
import { connect } from 'react-redux';
//import("./FirstPage.scss");
import "./FirstPage.scss"

class FirstPage extends Component {
    constructor(props) {
        super(props);
    }
    // 主页图片滚动
    initAll() {
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
        window.renderOwl('.content-game-list', {
            items:1,
            dots:false,
            autoplay:true,
            autoplayHoverPause:true,
            autoplayTimeout:5000,
            loop:true
        });

        window.renderOwl(".sliderBox-1",{
            loop: true,
            autoplay: true,
            items: 1,
            nav: false,
            dots:false,
            autoplayHoverPause: true,
            animateOut: 'slideOutUp',
            animateIn: 'slideInUp'
        });
        window.renderOwl(".sliderBox-2",{
            loop: true,
            autoplay: true,
            items: 1,
            nav: false,
            dots:false,
            autoplayHoverPause: true,
            animateOut: 'slideOutUp',
            animateIn: 'slideInUp'
        });
        window.renderOwl(".sliderBox-3",{
            loop: true,
            autoplay: true,
            items: 1,
            nav: false,
            autoplayHoverPause: true,
            dots:false,
            animateOut: 'slideOutUp',
            animateIn: 'slideInUp'
        });
        window.Util.index();
    }
    // 渲染
    componentDidMount() {
        window.$("#root").attr("class", "dafaFGcss");
        this.initAll();
        document.title = "dafabet在线投注亚洲最好的在线投注网站"
    }
    // 更新后执行滚动插件
    componentDidUpdate() {
        this.initAll();
    }
    // 路由
    onTo(path) {
        window.scrollTo(0, 0);
        browserHistory.push(path);
    }
    // 体育弹窗
    onClickGame(game) {
        // 未登录
        if (!auth()) {
            return;
        }
        let gameLink;
        var width = 1366;
        let parma = {
            GamePlatform:game[0].GamePlatform,
            GameType:game[0].GameTypeText,
            GameId:game[0].GameIdentify,
            IsMobile:false,
            IsDemo:false,
        }
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                // 游戏链接
                gameLink = res.GameLoginUrl;
                if (game[0].Title.indexOf("皇冠体育") >= 0) {
                    width = 1190;
                }
                window.open(gameLink,'game',"width="+width+"px,height=700px,directories=0,alwaysRaised=0,depended=1,z-look=1,location=0, menubar=0,scrollbars=0,status=0,toolbar=0,resizable=1,left=5,top=50,screenX=350,screenY=250", true);
            }
            else{
                alert(res.Message)
            }
        })
    }
    render() {
        const ImageGallery = window.r.get("ImageGallery");
        const promotionLink = this.props.remoteSysConfs.channel_push_url;
        const FirstPagePromotionAlert = window.r.get("FirstPagePromotionAlert");
        let sportGames = [];
        //用户未登陆不显示N188体育
        if( this.props.sportGames && this.props.sportGames.length > 0){
            for(let i = 0; i< this.props.sportGames.length; i++){
                if(this.props.sportGames[i].GamePlatform == "N188"){
                    sportGames.push(this.props.sportGames[i]);
                }
            }              
        }   
        return (
            <div className="dafanewFG">
                <div className="navbg"></div>
                {FirstPagePromotionAlert && <FirstPagePromotionAlert/>}
                <ImageGallery height="360px" imgtype='slider'></ImageGallery>
                <article id="pt_bg_style" className="BGcolor-main">
                    <marquee ref="notice1" direction="left" onMouseOver={(ele)=>{this.refs.notice1.stop();}} onMouseOut={(ele)=>{this.refs.notice1.start();}} className="NewNoticeList color-highlight"><a href="javascript:void(0);" title="网站公告 Site Notice" onClick={()=>{showNotice('newnotice');}} className="app_color">贵宾厅倾心打造一套最细致的服务，只为最尊贵的您</a>&nbsp;&nbsp;&nbsp;&nbsp;</marquee>
                    <div id="dafa_secondSlider-1" className="dafa_secondSlider dafa_secondSlider-1 ">
                        <div className="sliderBox-1" style={{width:"100%"}}>
                            <img src={require('./images/slider/slider-2-0.png')} style={{width:"631px"}}/>
                            <img src={require('./images/slider/slider-2-1.png')} style={{width:"631px"}}/>
                        </div>
                    </div>
                    <div id="dafa_secondSlider-2" className="dafa_secondSlider dafa_secondSlider-2">
                        <div className="sliderBox-2" style={{width:"100%"}}>
                            <img src={require('./images/slider/slider-3-0.png')} style={{width:"631px"}}/>
                            <img src={require('./images/slider/slider-3-1.png')} style={{width:"631px"}}/>
                        </div>
                    </div>
                    <div id="dafa_secondSlider-3" className="dafa_secondSlider dafa_secondSlider-3">
                        <div className="sliderBox-3" style={{width:"100%"}}>
                            <img src={require('./images/slider/slider-4-0.jpg')} style={{width:"631px"}}/>
                            <img src={require('./images/slider/slider-4-1.png')} style={{width:"631px"}}/>
                        </div>
                    </div>
                </article>
                <article id="dafa_indexContent" className="fordemo BGcolor-main">
                    <div className="dafa_container">
                        <div className="dafa_game dafa_index_box" onClick={this.onTo.bind(this, "/casino")}>
                            <div className="dafa_index_title">娱乐场</div>
                                <img src={require('./images/index/game.jpg')}/>
                            <div className="dafa_index_text">
                                欢迎来到亚洲最佳在线娱乐场，<br/>每日奖励和惊喜奉送不断！
                            </div>
                            <div className="dafa_index_cover">
                                <div className="dafa_index_cover_btn">立即参与</div>
                            </div>
                        </div>
                        {/* 体育弹窗 */}
                        <div className="dafa_sport dafa_index_box" onClick={this.onClickGame.bind(this,sportGames)}>
                            <div className="dafa_sport-up">
                                <div className="dafa_index_title">大发体育</div>
                                    <img src={require('./images/index/sport-1.jpg')}/>
                                <div className="dafa_index_text">
                                    大发体育是大发新版的体育博彩，<br/>比赛结束前结算您的盈利！
                                </div>
                                <div className="dafa_index_cover">
                                    <div className="dafa_index_cover_btn">立即参与</div>
                                </div>
                            </div>
                            <div className="dafa_sport-down">
                                <img src={require('./images/index/sport-2.jpg')}/>
                            </div>
                        </div>
                        {/* 第三列 */}
                        <div className="dafa_casino dafa_index_box" onClick={this.onTo.bind(this, "/casino")}>
                            <div className="dafa_casino-up">
                                <div className="dafa_index_title">现场荷官</div>
                                <img src={require('./images/index/casino-1.jpg')}/>
                                <div className="dafa_index_text">
                                    申请您的50%奖金<br/>最高1288元
                                </div>
                                <div className="dafa_index_cover">
                                    <div className="dafa_index_cover_btn">立即参与</div>
                                </div>
                            </div>
                            {/* 手机分发 */}
                            <div className="dafa_casino-down">
                                <a href={promotionLink}>
                                    <img src={require('./images/index/casino-2.jpg')}/>
                                </a>
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
        bestGames: state.game.bestGames,
        sportGames:state.game.sportGames,
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps)(FirstPage)