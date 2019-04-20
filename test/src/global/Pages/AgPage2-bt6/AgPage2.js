/**
 * xhtd-bt6-注册
 */
require('../../../plugin/libs/cloud9carousel/jquery.cloud9carousel');
import React, {Component} from 'react';
import './AgPage.scss'
import { Link , IndexLink } from 'react-router';
import {connect} from 'react-redux';


class AgPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            gamePlat:"ag"
        }
    }
    onClickGameLink(parma) {
        if (!window.actions.auth()) {
            return;
        }

        let windowOpen = window.Util.windowOpen('AgGame');
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    componentDidMount() {
        let _this = this;

        window.$("#carousel").Cloud9Carousel( {
            xOrigin:750,
            yOrigin:120,
            xRadius:650,
            yRadius:80,
            farScale:0.6,
            speed:2,
            // autoPlay: 1,
            // autoPlayDelay:5000,
            itemClass:"item",
            frontItemClass:"active",
            bringToFront: true,
            onAnimationFinished:()=>{//动画完成时
                let platId = $('.item.active','#carousel').attr('data-gamePlat');
                _this.setState({
                    gamePlat:platId
                })
            },
        } );
    }
    componentDidUpdate(nextProps){
        if(nextProps.agGames.length != this.props.agGames.length){
            window.$("#carousel").Cloud9Carousel( {
            xOrigin:750,
            yOrigin:120,
            xRadius:650,
            yRadius:80,
            farScale:0.6,
            speed:2,
            // autoPlay: 1,
            // autoPlayDelay:5000,
            itemClass:"item",
            frontItemClass:"active",
            bringToFront: true,
            onAnimationFinished:()=>{//动画完成时
                let platId = $('.item.active','#carousel').attr('data-gamePlat');
                _this.setState({
                    gamePlat:platId
                })
            },
        } );
        }
    }
    detailChange(name,e){
        let _this = $(e.target);
        let selfItem = $(this.refs[name]);
        _this.addClass('select').siblings('li').removeClass('select');
        selfItem.addClass('selected').siblings('.detailItem').removeClass('selected');
    }
    render() {
        let gameContent = this.props.agGames;
        let gameLink,bbinLink;
        if(gameContent.length>0){
            for(var i=0; i<gameContent.length;i++){
                let item = gameContent[i];
                if(item.GamePlatform=="AG"){
                    gameLink = {
                        GamePlatform:item.GamePlatform,
                        GameType:item.GameTypeText,
                        GameId:item.GameIdentify,
                        IsMobile:false,
                        IsDemo:false,
                    };
                }else{
                    bbinLink = {
                        GamePlatform:item.GamePlatform,
                        GameType:item.GameTypeText,
                        GameId:item.GameIdentify,
                        IsMobile:false,
                        IsDemo:false,
                    };
                }
            }
        }
        let _this = this;

        return (
            <article id="ag-game">
                <div className="agBanner">
                    <div className="carousel_wrapper" id="carousel">
                        {
                            gameLink &&
                            <div className="item agItem " data-gamePlat="ag">
                                <div className="hoverBg">
                                    <img className="isShow" src={'/images/agby/ag/ag.png'} />
                                    <img id="ag" className="ag-animate" src={"/images/agby/filler.png"} />
                                    <a className="gameBtn" onClick={_this.onClickGameLink.bind(_this,gameLink)}></a>
                                </div>
                            </div>
                        }
                        {
                            gameLink &&
                            <div className="item ptItem " data-gamePlat="pt">
                                <div className="hoverBg">
                                    <img className="isShow" src={'/images/agby/pt/pt.png'}/>
                                    <img id="pt" className="pt-animate" src={"/images/agby/filler.png"}/>
                                    <a className="gameBtn" onClick={_this.onClickGameLink.bind(_this, gameLink)}></a>
                                </div>
                            </div>
                        }

                        {/* <div className="item gdItem"  data-gamePlat="gd">
                            <div className="hoverBg">
                                <img className="isShow" src={"/images/agby/gd/gd.png"} />
                                <img id="gd" className="gd-animate" src={"/images/agby/filler.png"} />
                                <a className="gameBtn" onClick={_this.onClickGameLink.bind(_this,gameLink)}></a>
                            </div>
                        </div> */}
                        {
                            bbinLink &&
                            <div className="item bbinfeItem "  data-gamePlat="bbinfe">
                                <div className="hoverBg">
                                    <img className="isShow" src={"/images/agby/bbinfe/bbinfe.png"} />
                                    <img id="bbinfe"  src={"/images/agby/filler.png"} />
                                    <a className="gameBtn" onClick={_this.onClickGameLink.bind(_this,bbinLink)}></a>
                                </div>
                            </div>
                        }
                        {
                            bbinLink &&
                            <div className="item bbinfmItem" data-gamePlat="bbinfm">
                                <div className="hoverBg">
                                    <img className="isShow" src={"/images/agby/bbinfm/bbinfm.png"}/>
                                    <img id="bbinfm" src={"/images/agby/filler.png"}/>
                                    <a className="gameBtn" onClick={_this.onClickGameLink.bind(_this, bbinLink)}></a>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {/*<div className="gogame" onClick={this.onClickGameLink.bind(this, gameLink)}></div>*/}
                 <div className="main">
                    <div>
                        {/*Ag玩法*/}
                        <div className="tabsItem tabsAg" style={{display:this.state.gamePlat=="ag"?"block":'none'}}>
                            {/* <div className="step-1">
                                <div className="container">
                                    <div className="row">
                                        <h1 className="col-md-1">01</h1>
                                        <h4 className="col-md-11">AG《捕鱼王2》轻松转账，极速游戏！</h4>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5 col-md-offset-1">
                                            <span className="num">1</span>
                                            <p>
                                                登录后，点击<Link to="/transfer">转</Link>进入转款页面<br/>
                                                如您还没有账号，请点击此处 <Link to="/register">免费注册</Link>
                                            </p>
                                            <div>
                                                <img src='/images/agby/ag/agLeft.png' />
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-md-offset-1">
                                            <span className="num">2</span>
                                            <p>
                                                开始捕鱼游戏前,<br/>
                                                请先将您的资金转入 <Link to="/transfer">AG平台</Link>
                                            </p>
                                            <div className="right-banner">
                                                <img src='/images/agby/ag/agRight.png' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="step-2">
                                <div className="container">
                                    <div className="row">
                                        <h1 className="col-md-1">02</h1>
                                        <h4 className="col-md-11">AG《捕鱼王2》游戏简介</h4>
                                    </div>
                                    <div className="row tabsChange">
                                        <ul>
                                            <li className="select" onClick={this.detailChange.bind(this,'ag1')}>游戏介绍</li>
                                            <li onClick={this.detailChange.bind(this,'ag2')}>游戏大厅</li>
                                            <li onClick={this.detailChange.bind(this,'ag3')}>游戏玩法</li>
                                            <li onClick={this.detailChange.bind(this,'ag4')}>鱼的赔率</li>
                                            <li onClick={this.detailChange.bind(this,'ag5')}>炮的说明</li>
                                        </ul>
                                    </div>
                                    <div className="row detailItem selected " ref="ag1">
                                        <div className="col-md-6">
                                            <img src='/images/agby/ag/ag1.png' />
                                        </div>
                                        <div className="col-md-6">
                                            <h2>游戏介绍</h2>
                                            <p>
                                                捕鱼王2 是一款提供不同倍数的炮弹和20种鱼类的休闲游戏，对传统捕鱼游戏进行调整优化，在传统捕鱼游戏多倍玩法的基础上，自主创新买鱼放鱼玩法，使游戏更更有趣味。使用全概率的游戏玩法保证游戏公平公正。
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row detailItem" ref="ag2">
                                        <div className="col-md-6">
                                            <img src='/images/agby/ag/ag2.png' />
                                        </div>
                                        <div className="col-md-6">
                                            <h2>游戏大厅</h2>
                                            <p>
                                                为了满足不同客人对刺激程度和自身携带额度的不同，我们设计了 5 个倍数房间，刺激程度根据倍数的提高也会有大幅的提高，您在大 倍数房间中可以获得更刺激的游戏体验。
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row detailItem" ref="ag3">
                                        <div className="col-md-6">
                                            <img src='/images/agby/ag/ag3.png' />
                                        </div>
                                        <div className="col-md-6">
                                            <h2>游戏玩法</h2>
                                            <p>
                                                在大厅选择桌子，入桌后选择空的位置进入到单独的捕鱼场景， 4 位玩家共享一个大型捕鱼场景，鱼群会在 4 个场景中穿梭。客人点 击鼠标左键（或键盘空格）发炮，炮弹会射向鼠标所在位置。<br/>
                                                当炮弹 命中鱼，会有明显的打中效果，打中墙壁会反弹。客人每发出一发子 弹，余额扣除发射子弹费用，当子弹没有成功打中鱼（场景中没有鱼 或者鱼已经死亡），返还子弹费用给客人。
                                                如果打中鱼，鱼死亡有明 显的金币效果，客人立刻获得鱼的价值。
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row detailItem" ref="ag4">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8">
                                            <img src='/images/agby/ag/ag4.png' />
                                        </div>
                                        <div className="col-md-2"></div>
                                    </div>
                                    <div className="row detailItem" ref="ag5">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8">
                                            <img src='/images/agby/ag/ag5.png' />
                                        </div>
                                        <div className="col-md-2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*pt玩法*/}
                        <div className="tabsItem tabsPt" style={{display:this.state.gamePlat=="pt"?"block":'none'}}>
                            {/* <div className="step-1">
                                <div className="container">
                                    <div className="row">
                                        <h1 className="col-md-1">01</h1>
                                        <h4 className="col-md-11">PT《深海大赢家》轻松转账，极速游戏！</h4>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5 col-md-offset-1">
                                            <span className="num">1</span>
                                            <p>
                                                登录后，点击<Link to="/transfer">转</Link>进入转款页面<br/>
                                                如您还没有账号，请点击此处 <Link to="/register">免费注册</Link>
                                            </p>
                                            <div>
                                                <img src='/images/agby/ag/agLeft.png' />
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-md-offset-1">
                                            <span className="num">2</span>
                                            <p>
                                                开始捕鱼游戏前,<br/>
                                                请先将您的资金转入 <Link to="/transfer">PT老虎机</Link>.
                                            </p>
                                            <div className="right-banner">
                                                <img src='/images/agby/pt/ptRight.png' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="step-2">
                                <div className="container">
                                    <div className="row">
                                        <h1 className="col-md-1">02</h1>
                                        <h4 className="col-md-11">PT《深海大赢家》游戏简介</h4>
                                    </div>
                                    <div className="row tabsChange">
                                        <ul>
                                            <li className="select" onClick={this.detailChange.bind(this,'pt1')}>游戏介绍</li>
                                            <li onClick={this.detailChange.bind(this,'pt2')}>游戏大厅</li>
                                            <li onClick={this.detailChange.bind(this,'pt3')}>游戏玩法</li>
                                            <li onClick={this.detailChange.bind(this,'pt4')}>鱼的赔率</li>
                                            <li onClick={this.detailChange.bind(this,'pt5')}>炮的说明</li>
                                            <li onClick={this.detailChange.bind(this,'pt6')}>特色奖励</li>
                                        </ul>
                                    </div>
                                    <div className="row detailItem selected " ref="pt1">
                                        <div className="col-md-6">
                                            <img src='/images/agby/pt/pt1.png' />
                                        </div>
                                        <div className="col-md-6">
                                            <h2>游戏介绍</h2>
                                            <p>
                                                深海大赢家带您探索神秘深海的无尽宝藏，简单创意桌机游戏让您欲罢不能！用3个强劲枪炮捕获20种不同类型的深海生物。 好好利用小装备功能增加命中率。捕获金龙赢取888金币，精彩的捕鱼季节，每一枪都会有意想不到的收获哦！<br/><br/>
                                                特别说明：深海大赢家的游戏输赢将会以投注记录为准。
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row detailItem" ref="pt2">
                                        <div className="col-md-6">
                                            <img src='/images/agby/pt/pt2.png' />
                                        </div>
                                        <div className="col-md-6">
                                            <h2>游戏大厅</h2>
                                            <p>
                                                三个不同倍数的房间，配备多把捕鱼枪满足您的任何捕鱼需求。您在大倍数房间中可以获得更刺激的游戏体验。
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row detailItem" ref="pt3">
                                        <div className="col-md-6">
                                            <img src='/images/agby/pt/pt3.png' />
                                        </div>
                                        <div className="col-md-6">
                                            <h2>游戏玩法</h2>
                                                <ol>
                                                    <li>点击三个可选的游戏模式中的一个来开始游戏。</li>
                                                    <li>射击位置始终位于游戏窗口底部的中央，与游戏局中玩家的总数量无关。点击游戏窗口底部的-和+按钮来选择硬币数。每次射击的费用等于您在开枪前选择的硬币数。</li>
                                                    <li>瞄准方向后，点击屏幕任意位置来射击。移动鼠标光标来调整枪瞄准的方向。您还可以按键盘上的空格键来开枪。每按一次都会开火一次。鱼或奖励物体需要不同数量的射击次数才会被捕捉或激活。被捉到或激活后，鱼或奖励物体将从游戏窗口上消失。</li>
                                                    <li>瞄准方向后，点击屏幕任意位置来射击。移动鼠标光标来调整枪瞄准的方向。您还可以按键盘上的空格键来开枪。每按一次都会开火一次。鱼或奖励物体需要不同数量的射击次数才会被捕捉或激活。被捉到或激活后，鱼或奖励物体将从游戏窗口上消失。</li>
                                                </ol>
                                        </div>
                                    </div>
                                    <div className="row detailItem" ref="pt4">
                                        <div className="col-md-6">
                                            <img src='/images/agby/pt/pt4a.png' />
                                        </div>
                                        <div className="col-md-6">
                                            <img src='/images/agby/pt/pt4b.png' />
                                        </div>
                                    </div>
                                    <div className="row detailItem" ref="pt5">
                                        <div className="col-md-6">
                                            <img src='/images/agby/pt/pt5a.png' />
                                        </div>
                                        <div className="col-md-6">
                                            <img src='/images/agby/pt/pt5b.png' />
                                        </div>
                                    </div>
                                    <div className="row detailItem" ref="pt6">
                                        <div className="col-md-6">
                                            <img src='/images/agby/pt/pt6a.png' />
                                        </div>
                                        <div className="col-md-6">
                                            <img src='/images/agby/pt/pt6b.png' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*GD玩法*/}
                        <div className="tabsItem tabsGd"  style={{display:this.state.gamePlat=="gd"?"block":'none'}}>
                            {/* <div className="step-1">
                                <div className="container">
                                    <div className="row">
                                        <h1 className="col-md-1">01</h1>
                                        <h4 className="col-md-11">轻松转账，极速游戏！</h4>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5 col-md-offset-1">
                                            <span className="num">1</span>
                                            <p>
                                                登录后，点击<Link to="/transfer">转</Link>进入转款页面<br/>
                                                如您还没有账号，请点击此处 <Link to="/register">免费注册</Link>
                                            </p>
                                            <div>
                                                <img src='/images/agby/ag/agLeft.png' />
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-md-offset-1">
                                            <span className="num">2</span>
                                            <p>
                                                开始捕鱼游戏前,<br/>
                                                请先将您的资金转入 <Link to="/transfer">GD平台</Link>
                                            </p>
                                            <div className="right-banner">
                                                <img src='/images/agby/ag/agRight.png' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="step-2">
                                <div className="container">
                                    <div className="row">
                                        <h1 className="col-md-1">02</h1>
                                        <h4 className="col-md-11">捕鱼王游戏简介</h4>
                                    </div>
                                    <div className="row tabsChange">
                                        <ul>
                                            <li className="select" onClick={this.detailChange.bind(this,'gd1')}>游戏介绍</li>
                                            <li onClick={this.detailChange.bind(this,'gd2')}>游戏大厅</li>
                                            <li onClick={this.detailChange.bind(this,'gd3')}>游戏操作</li>
                                            <li onClick={this.detailChange.bind(this,'gd4')}>排行榜</li>
                                            <li onClick={this.detailChange.bind(this,'gd5')}>鱼类百科界面</li>
                                        </ul>
                                    </div>
                                    <div className="row detailItem selected " ref="gd1">
                                        <div className="col-md-6">
                                            <img src='/images/agby/gd/fishing_img1.png' />
                                        </div>
                                        <div className="col-md-6">
                                            <h2>游戏介绍</h2>
                                            <p>
                                                《捕鱼王》是一款轻松PC网页游戏，潮流风尚一族新宠。游戏给玩家战史深海领域的曼妙风光，各色鱼类随意游动，玩家轻轻点击即可捕获，得到无限的休闲感受和成就体验。 《捕鱼王》在过往的捕鱼游戏为基础加上更多鱼种，更多玩法，更丰富的任务系统，随机的炸弹系统。
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row detailItem" ref="gd2">
                                        <div className="col-md-6">
                                            <img src='/images/agby/gd/fishing_img2.png' />
                                        </div>
                                        <div className="col-md-6">
                                            <h2>游戏大厅</h2>
                                            <p>
                                                大厅上方显示玩家的姓名/金币/自动取币金额，玩家可以点击右上方的加减按钮调整自动取币金额。<br/>
                                                大厅中部显示新手、精英及帝王三个房间的按钮，玩家点击按钮，进入不同风格的捕鱼界面。<br/>
                                                大厅右下方显示排行榜按钮和设置按钮，点击进入排行榜和设置界面。
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row detailItem" ref="gd3">
                                        <div className="col-md-6">
                                            <img src='/images/agby/gd/fishing_img3.png' />
                                        </div>
                                        <div className="col-md-6">
                                            <h2>游戏操作</h2>
                                            <p>
                                                大厅上方和下方分别显示最多3个玩家的炮塔。<br/>
                                                同一游戏界面最多可供6个玩家共同游戏。<br/>
                                                玩家自己的炮塔有锁定按钮提示 <img src='/images/agby/gd/fishing-icon-1.png' /> 并在游戏开局时有箭头提示 <img src='/images/agby/gd/fishing-icon-2.png' /> <br/>
                                                点击设置按钮 <img src='/images/agby/gd/fishing-icon-3.png' />  进入设置界面。<br/>
                                                点击加币按钮<img src='/images/agby/gd/fishing-icon-4.png' />  可自动取币，点击减币按钮 <img src='/images/agby/gd/fishing-icon-5.png' />  可自动退币。<br/>
                                                点击自动按钮 <img src='/images/agby/gd/fishing-icon-6.png' />  可自动发炮，点击取消按钮 <img src='/images/agby/gd/fishing-icon-7.png' />  可手动发炮。<br/>
                                                点击加炮按钮 <img src='/images/agby/gd/fishing-icon-8.png' />  可增加炮弹，点击减炮按钮 <img src='/images/agby/gd/fishing-icon-9.png' />  可减少炮弹。
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row detailItem" ref="gd4">
                                        <div className="col-md-6">
                                            <img src='/images/agby/gd/fishing_img4.png' />
                                        </div>
                                        <div className="col-md-6">
                                            <h2>排行榜</h2>
                                            <p>
                                                左侧为榜单标签，游戏内提供捕鱼榜和盈利榜供玩家参照。
                                                右侧为榜单内玩家的名次、姓名和成绩列表。最下方为玩家自己的数据。
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row detailItem" ref="gd5">
                                        <div className="col-md-6">
                                            <img src='/images/agby/gd/fishing_img5.png' />
                                        </div>
                                        <div className="col-md-6">
                                            <img src='/images/agby/gd/fishing_img6.png' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*BBINfe玩法捕魚達人*/}
                        <div className="tabsItem tabsBBINfe"  style={{display:this.state.gamePlat=="bbinfe"?"block":'none'}}>
                            {/* <div className="step-1">
                                <div className="container">
                                    <div className="row">
                                        <h1 className="col-md-1">01</h1>
                                        <h4 className="col-md-11">BBIN《捕鱼达人》冰冻鱼群, 轻松捕捉！</h4>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5 col-md-offset-1">
                                            <span className="num">1</span>
                                            <p>
                                                登录后，点击<Link to="/transfer">转</Link>进入转款页面<br/>
                                                如您还没有账号，请点击此处 <Link to="/register">免费注册</Link>
                                            </p>
                                            <div>
                                                <img src='/images/agby/bbinfe/bbinfeLeft.png' />
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-md-offset-1">
                                            <span className="num">2</span>
                                            <p>
                                                开始捕鱼游戏前,<br/>
                                                请先将您的资金转入 <Link to="/transfer">BBIN平台</Link>
                                            </p>
                                            <div className="right-banner">
                                                <img src='/images/agby/bbinfe/bbinfeRight.png' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="step-2">
                                <div className="container">
                                    <div className="row">
                                        <h1 className="col-md-1">02</h1>
                                        <h4 className="col-md-11">BBIN《捕鱼达人》游戏简介</h4>
                                    </div>
                                    <div className="row tabsChange">
                                        <ul>
                                            <li className="select" onClick={this.detailChange.bind(this,'bbinfe1')}>游戏介绍</li>
                                            <li onClick={this.detailChange.bind(this,'bbinfe3')}>游戏玩法</li>
                                            <li onClick={this.detailChange.bind(this,'bbinfe4')}>鱼的赔率</li>
                                            <li onClick={this.detailChange.bind(this,'bbinfe5')}>游戏特色</li>
                                        </ul>
                                    </div>
                                    <div className="row detailItem selected " ref="bbinfe1">
                                        <div className="col-md-6">
                                            <img src='/images/agby/bbinfe/bbinfe1.jpg' />
                                        </div>
                                        <div className="col-md-6">
                                            <h2>游戏介绍</h2>
                                            <p>
                                                《捕鱼达人》是一款提供四人联机系统捕鱼游戏，并搭配5种不同注额炮台及快速换分，使玩家连炮不间断。一起感受丰富鱼群带来高分奖励的刺激快感吧！
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row detailItem" ref="bbinfe3">
                                        <div className="col-md-6">
                                            <img src='/images/agby/bbinfe/bbinfe3a.jpg' />
                                        </div>
                                        <div className="col-md-6">
                                            <h2>游戏玩法</h2>
                                            <p>
                                                自动射击系统：锁定特殊鱼种，让玩家轻松畅玩.
                                                <br/>
                                                可自由施放4大特殊道具：【召唤】、【冰冻】、【锁定】、【狂暴】，多样化技能震荡玩家捕鱼热情
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row detailItem" ref="bbinfe4">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8">
                                            <img src='/images/agby/bbinfe/bbinfe4.jpg' />
                                        </div>
                                        <div className="col-md-2"></div>
                                    </div>
                                    <div className="row detailItem" ref="bbinfe5">
                                        <div className="col-md-4">
                                            <img src='/images/agby/bbinfe/bbinfe5a.jpg' />
                                        </div>
                                        <div className="col-md-4">
                                            <img src='/images/agby/bbinfe/bbinfe5b.jpg' />
                                        </div>
                                        <div className="col-md-4">
                                            <img src='/images/agby/bbinfe/bbinfe5c.jpg' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*BBINfm玩法捕魚大師*/}
                        <div className="tabsItem tabsBBINfm"   style={{display:this.state.gamePlat=="bbinfm"?"block":'none'}}>
                            {/* <div className="step-1">
                                <div className="container">
                                    <div className="row">
                                        <h1 className="col-md-1">01</h1>
                                        <h4 className="col-md-11">BBIN 《捕鱼大师》 锁定鱼群, 随心畅玩！</h4>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5 col-md-offset-1">
                                            <span className="num">1</span>
                                            <p>
                                                登录后，点击<Link to="/transfer">转</Link>进入转款页面<br/>
                                                如您还没有账号，请点击此处 <Link to="/register">免费注册</Link>
                                            </p>
                                            <div>
                                                <img src='/images/agby/bbinfm/bbinfmLeft.png' />
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-md-offset-1">
                                            <span className="num">2</span>
                                            <p>
                                                开始捕鱼游戏前,<br/>
                                                请先将您的资金转入 <Link to="/transfer">BBIN平台</Link>
                                            </p>
                                            <div className="right-banner">
                                                <img src='/images/agby/bbinfm/bbinfmRight.png' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="step-2">
                                <div className="container">
                                    <div className="row">
                                        <h1 className="col-md-1">02</h1>
                                        <h4 className="col-md-11">BBIN《捕鱼大师》游戏简介</h4>
                                    </div>
                                    <div className="row tabsChange">
                                        <ul>
                                            <li className="select" onClick={this.detailChange.bind(this,'bbinfm1')}>游戏介绍</li>
                                            <li onClick={this.detailChange.bind(this,'bbinfm3')}>游戏玩法</li>
                                            <li onClick={this.detailChange.bind(this,'bbinfm4')}>鱼的赔率</li>
                                            <li onClick={this.detailChange.bind(this,'bbinfm5')}>游戏特色</li>
                                        </ul>
                                    </div>
                                    <div className="row detailItem selected " ref="bbinfm1">
                                        <div className="col-md-6">
                                            <img src='/images/agby/bbinfm/bbinfm1.png' />
                                        </div>
                                        <div className="col-md-6">
                                            <h2>游戏介绍</h2>
                                            <p>
                                                《捕鱼达人》是一款提供四人联机系统捕鱼游戏，并搭配5种不同注额炮台及快速换分，使玩家连炮不间断。一起感受丰富鱼群带来高分奖励的刺激快感吧！
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row detailItem" ref="bbinfm3">
                                        <div className="col-md-6">
                                            <img src='/images/agby/bbinfm/bbinfm3a.jpg' />
                                        </div>
                                        <div className="col-md-6">
                                            <h2>游戏玩法</h2>
                                            <p>
                                                自动射击系统：锁定特殊鱼种，让玩家轻松畅玩.
                                                <br/>
                                                可自由施放4大特殊道具：【召唤】、【冰冻】、【锁定】、【狂暴】，多样化技能震荡玩家捕鱼热情
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row detailItem" ref="bbinfm4">

                                        <div className="col-md-6">
                                            <img src='/images/agby/bbinfm/bbinfm4a.jpg' />
                                        </div>
                                        <div className="col-md-6">
                                            <img src='/images/agby/bbinfm/bbinfm4b.jpg' />
                                       </div>
                                    </div>
                                    <div className="row detailItem" ref="bbinfm5">
                                        <div className="col-md-6">
                                            <img src='/images/agby/bbinfm/bbinfm5a.jpg' />
                                        </div>
                                        <div className="col-md-6">
                                            <img src='/images/agby/bbinfm/bbinfm5b.jpg' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
            </article>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
        agGames:state.game.agByGames
    }
);

export default connect(mapStateToProps, {})(AgPage);