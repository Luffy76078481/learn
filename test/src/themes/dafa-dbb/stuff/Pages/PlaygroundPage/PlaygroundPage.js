/**
 * Created by sobi on 2017/9/26.
 */
import React, {Component} from 'react';
import {Link,browserHistory} from 'react-router';

import {connect} from 'react-redux';
import './PlaygroundPage.scss'


class PlaygroundPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start_onofficon: true,
            vip_onofficon: true,
            promo_onofficon: true,
            center:1,
        }
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


    componentDidMount() {
        this.initAll();
        window.$("#root").attr("class", "usefulcss");
    }
    componentDidUpdate() {
        this.initAll();
    }
    onClickGameLink(link) {
        window.actions.authToLink(link);
    }

    serversOpen(e){
        e.preventDefault();
        window.open(this.props.callUrl,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }

    onTo(path) {
        browserHistory.push(path);
    }

    menu_onoff1(e){
        e.preventDefault();
        window.$('.start_menu').slideToggle();
        if(this.state.start_onofficon==false){
            this.setState({ start_onofficon:true });
            return;
        }
        this.setState({ start_onofficon:false });
        return;
    }
    menu_onoff2(e){
        e.preventDefault();
        window.$('.vip_menu').slideToggle();
        if(this.state.vip_onofficon==false){
            this.setState({ vip_onofficon:true });
            return;
        }
        this.setState({ vip_onofficon:false });
        return;
    }
    menu_onoff3(e){
        e.preventDefault();
        window.$('.promo_menu').slideToggle();
        if(this.state.promo_onofficon==false){
            this.setState({ promo_onofficon:true });
            return;
        }
        this.setState({ promo_onofficon:false });
        return;
    }


    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=900,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=450,screenY=250');
        return false;
    }


    render() {
        const ImageGallery = window.r.get("ImageGallery");
        const promotionLink = window.configHelper.getPromotionUrl();
        const num = window.numbers["games"] || ("888," + Math.floor(Math.random()*899 + 100) + "," + Math.floor(Math.random()*899 + 100));
        return (

            <div className="dafa2fg">
                <div className="box_1">
                    <div className="slider">
                        <ImageGallery height="300px" imgtype='slider' type="playground_slider"></ImageGallery>
                    </div>
                    <div className="box1_btnbx">
                        <a href="http://cdn.silvereagle88.com/generic/setupglx.exe" className="box1_btn donlod_btn">立即下載</a>
                        <Link to="/register" className="box1_btn regist_btn">现在注册</Link>
                    </div>
                </div>
                <div className="box_2">
                    <Link to="/promotions" >
                        <div className="vip">
                            <p className="vip1">VIP</p>
                            <p className="vip2">玩家优惠活动</p>
                            <p className="vip3">了解详情 >></p>
                        </div>
                    </Link>
                    <a href="#">
                        <div className="bonus">
                            <p className="bonus1">总奖池</p>
                            <span className="jackpot bonus2" data-key="games">{num}</span>
                            <p className="bonus3">浏览全部累积奖池游戏 >></p>
                        </div>
                    </a>
                </div>
                <div className="box_3">
                    <div className="menu_nav">
                        <ul>
                            <li><a href="" className="mainpg">大发888主页</a></li>
                            <li>
                                <a href="" onClick={this.menu_onoff1.bind(this)}>现在开始</a>
                                <div className={this.state.start_onofficon==true?"on menubtn start_menubtn":"off menubtn start_menubtn" } onClick={this.menu_onoff1.bind(this)}></div>
                                <div className="inmenu start_menu">
                                    <a href="/help.html?tab=howplay" target="_blank">如何游戏</a>
                                    <Link to="/register" >注册账户</Link>
                                    <a href="/help.html?tab=commonQ" target="_blank">常见问题</a>
                                </div>
                            </li>
                            <li><a href="http://cdn.silvereagle88.com/generic/setupglx.exe">大发888游戏下载</a></li>
                            <li><a href="/help.html?tab=payInfo" target="_blank">支付方式</a></li>
                            <li><Link to="/games" >网页版游戏</Link></li>
                            <li><a href="javascript:alert('即将上线！');" className="iplay"></a></li>
                            <li>
                                <a href="" onClick={this.menu_onoff2.bind(this)}>VIP玩家优惠活动</a>
                                <div className={this.state.vip_onofficon==true?"on menubtn vip_menubtn":"off menubtn vip_menubtn" } onClick={this.menu_onoff2.bind(this)}></div>
                                <div className="inmenu vip_menu">
                                    <Link to="/promotions">VIP主页</Link>
                                </div>
                            </li>
                            <li><Link to="/promotions" activeClassName="active">大发888促销活动</Link></li>
                            <li>
                                <a href="" onClick={this.menu_onoff3.bind(this)}>优惠活动获奖者</a>
                                <div className={this.state.promo_onofficon==true?"on menubtn promo_menubtn":"off menubtn promo_menubtn" } onClick={this.menu_onoff3.bind(this)}></div>
                                <div className="inmenu promo_menu">
                                    <Link to="/promotions" activeClassName="active">活动大赢家主页</Link>
                                    <Link to="/promotions" activeClassName="active">VIP抽奖活动</Link>
                                </div>
                            </li>
                            <li><a href="/help.html?tab=payout" target="_blank">出金数额</a></li>
                            <li><a href="/help.html?tab=about" target="_blank">关于大发888</a></li>
                            <li><a href="/help.html?tab=contact" target="_blank">联系大发888</a></li>
                            <li><a href={promotionLink} target="_blank">大发手机客户端</a></li>
                        </ul>
                    </div>
                    <div className="contact">
                        <p className="dw_line title">大发娱乐场客服服务</p>
                        <a href="#" className="dw_line help" onClick={this.serversOpen.bind(this)}>在线客服</a>
                        <a href="#" className="dw_line mail">{this.props.remoteSysConfs.online_service_email}</a>
                        <p className="phone">国际热线电话:</p>
                        <a href="#">{this.props.remoteSysConfs.online_service_phone}</a>
                        <p>大陆客户专访QQ:</p>
                        <a href="#">{this.props.remoteSysConfs.online_service_qq}</a>
                        <p>官方微信: </p>
                        <div className="qrimg"></div>
                    </div>
                </div>
                <div className="box_4">
                    <div className="games">
                        <div className="title">老虎机游戏</div>
                        <Link to="/games" >
                            <div className="games_img"></div>
                        </Link>
                    </div>
                    <div className="bingo">
                        <div className="title">纸牌和桌面游戏</div>
                        <Link to="/bingo" >
                            <div className="bingo_img"></div>
                        </Link>
                    </div>
                    <div className="promotion">
                        <h2>大发888促销活动</h2>
                        <div className="promotion_img"></div>
                        <Link to="/promotions">新玩家幸运红包</Link>
                        <p>加入多姿多彩的旅程，赢取128元欢迎奖金！</p>
                        <Link to="/promotions" className="more">查看更多促销活动!</Link>
                        
                    </div>
                    <div className="dafa888">
                        <h2>大发888特色游戏</h2>
                        <div className="sliderbox">
                            <object width="509px" height="162px" data="/images/flash/featured-games.swf">
                                <param name="movie" value="/images/flash/featured-games.swf"></param>
                                <param name="quality" value="high"></param>
                                <param name="wmode" value="transparent"></param>
                            </object>
                        </div>
                    </div>
                </div>
                <div className="box_5">
                    <div className="casino">
                        <div className="title">现场游戏</div>
                        <Link to="/casino" >
                            <div className="casino_img"></div>
                        </Link>
                    </div>
                    <div className="winner">
                        <h2>大奖得主</h2>
                        <div className="winner_img"></div>
                        <p>5月7日，大发玩家 H****7
                            击中累积老虎机游戏
                            “Nian Nian You Yu”喜赢
                            2,551,613 元人民币 超级大奖!</p>
                        <Link to="/games" >立即开始!</Link>
                    </div>
                    <div className="ad1"></div>
                    <div className="ad2"></div>
                </div>


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
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps, {})(PlaygroundPage);