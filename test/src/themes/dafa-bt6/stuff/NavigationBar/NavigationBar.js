import React, {Component} from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import "./NavigationBar.scss"

class NavigationBar extends Component {
    constructor(props){
        super(props)
        this.state={
            isOpenSecondNav:false,
            hoverObj:"",
            isShowSecondNav:false,
        }
    }
    liHover(e){
        if(!this.state.isOpenSecondNav) return;
        let type = $(e.currentTarget).attr('data-type');
        this.setState({
            hoverObj:type,
            isShowSecondNav:true
        })
    }
    hideSecondNav(){
        this.setState({
            isShowSecondNav:false
        })
    }
    changeOpen(){
        this.setState({
            isOpenSecondNav:!this.state.isOpenSecondNav
        })
    }
    render() {
        const promotionLink = this.props.remoteSysConfs.channel_push_url;
        const hoverObj = this.state.hoverObj;
        return (
            <div onMouseLeave={this.hideSecondNav.bind(this)}>
                <div className="navMenu">
                    <ul className="main-menu" >
                        <li><div className="nav_inbox navbx0" >
                        <IndexLink to="/" activeClassName="active home" className="color-highlight">
                            首页
                        {/* <i className="glyphicon glyphicon-home f24 mt5"></i> */}
                        </IndexLink>
                        </div></li>
                        <li data-type="games"  onMouseOver={this.liHover.bind(this)}>
                            <div className="nav_inbox navbx3">
                                <Link  className={hoverObj=="games"?"active":""}  to="/games" activeClassName="active">电子游戏<span className="new-tag"><span>热</span></span></Link>
                            </div>
                        </li>
                        <li data-type="pt"  onMouseOver={this.liHover.bind(this)}>
                            <div className="nav_inbox navbx7">
                                <Link className={hoverObj=="pt"?"active":""} to="/PT" activeClassName="active">PT老虎机<span className="new-tag"><span>热</span></span></Link>
                            </div>
                        </li>
                        <li data-type="MG"  onMouseOver={this.liHover.bind(this)}>
                            <div className="nav_inbox navbx7">
                                <Link className={hoverObj=="MG"?"active":""} to="/MG" activeClassName="active">MG老虎机<span className="new-tag"><span>热</span></span></Link>
                            </div>
                        </li>
                        <li data-type="streetMachine"  onMouseOver={this.liHover.bind(this)}>
                            <div className="nav_inbox navbx3">
                                <Link className={hoverObj=="streetMachine"?"active":""}   to="/streetMachine" activeClassName="active">棋牌对战<span className="new-tag"><span>热</span></span></Link>
                            </div>
                        </li>
                        <li data-type="ag"  onMouseOver={this.liHover.bind(this)}>
                            <div className="nav_inbox navbx7">
                                <Link className={hoverObj=="ag"?"active":""}  to="/ag" activeClassName="active">捕鱼达人</Link>
                            </div>
                        </li>
                        <li data-type="casino"  onMouseOver={this.liHover.bind(this)}>
                            <div className="nav_inbox navbx2" >
                                <Link className={hoverObj=="casino"?"active":""} to="/casino" activeClassName="active">真人视讯</Link>
                            </div>
                        </li>
                        <li data-type="sport" onMouseOver={this.liHover.bind(this)}>
                            <div className="nav_inbox navbx1" ><Link className={hoverObj=="sport"?"active":""} activeClassName="active" to="/sport">体育电竞</Link></div>
                        </li>

                        <li data-type="bingo"  onMouseOver={this.liHover.bind(this)}>
                            <div className="nav_inbox navbx4">
                                <Link  className={hoverObj=="bingo"?"active":""} to="/bingo" activeClassName="active">彩票游戏</Link>
                            </div>
                        </li>

                       
                        <li >
                            <div className="nav_inbox navbx8"><Link to="/LootoPage" activeClassName="active">幸运转轮<span className="new-tag"><span>新</span></span></Link></div></li>

                        <li>
                            <div className="nav_inbox navbx3"><Link to="/SstateMent" activeClassName="active">流水王<span className="new-tag"><span>新</span></span></Link></div>
                        </li>
                        {/* {window.config.spec == 'dafa'?<li ><div className="nav_inbox navbx8"><a href="#" target="_blank" onClick={this.luckyDicce.bind(this)}>幸运骰子<span className="new-tag"><span>新</span></span></a></div></li>:null} */}
                    </ul>

                    {/*二级菜单开关*/}
                    {/* <div className="switch-menu pull-right">
                        <a className="switchIcon"><i className="glyphicon glyphicon-hand-down"></i></a>
                        <div className="switchCon">
                            <div className="arrow"></div>
                            <div className="title">
                                <h5>快捷选单</h5>
                                <div className="pull-right switch">
                                    {this.state.isOpenSecondNav?"打开":"关闭"}
                                    <span onClick={this.changeOpen.bind(this)}
                                          className={
                                                        this.state.isOpenSecondNav?
                                                        "balance-checkbox checked":"balance-checkbox unchecked"
                                                    }
                                    >
                                        <span></span>
                                    </span>
                                </div>
                            </div>
                            <div className="img">
                                <img src={this.state.isOpenSecondNav?require('./images/on.png'):require('./images/off.png')} />
                            </div>
                            <div className="foot">
                                将鼠标指向产品标签，快捷选单可让您快速进入游戏，优惠详情和其他相关内容。
                            </div>
                        </div>
                    </div> */}

                    <ul className="main-menu pull-right">
                        <li className="main-menu-item  promotion-item separator " >
                            <Link to="/promotions" className="main-menu-link" activeClassName="active">
                                优惠活动
                            </Link>
                        </li>
                        <li className="main-menu-item  vip-item separator ">
                            <Link to="/vip" className="main-menu-link" activeClassName="active">
                                VIP
                            </Link>
                        </li>
                        <li className="main-menu-item  mobile-item-kehuduan">
                            <a href="http://dafazixun.com"  target='_blank' className="main-menu-link"  >
                                线路检测
                            </a>
                        </li>
                        <li className="main-menu-item  mobile-item ">
                            <a href={promotionLink+"?openLink="+location.href}  className="main-menu-link" target="_self" >
                                手机客户端
                            </a>
                        </li>
                      

                    </ul>

                </div>
                {/*下拉二级菜单*/}
                {this.state.isOpenSecondNav &&(
                    <div className="secondNav" style={{display:this.state.isShowSecondNav?"block":"none"}}>
                        <div className="secNavWrap">
                            {/*体育*/}
                            <div className="secNavItem" style={{display:hoverObj=="sport"?"block":"none"}}>
                                <div className="row">
                                    {/*左侧*/}
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-6 item">
                                                <h5 className="title">热门产品</h5>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="game-img">
                                                            <img src={require('./images/sport/colossus-bet-220x70.jpg')} />
                                                            <div className="game-img-hover">
                                                                <Link to="/sport" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                        <div className="img-title">体育博彩</div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="game-img">
                                                            <img src={require('./images/sport/number-game-220x70.jpg')} />
                                                            <div className="game-img-hover">
                                                                <Link to="/sport" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                        <div className="img-title">百练赛</div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="game-img">
                                                            <img src={require('./images/sport/esports-220x70.jpg')} />
                                                            <div className="game-img-hover">
                                                                <Link to="/sport" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                        <div className="img-title">电子竞技</div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="game-img">
                                                            <img src={require('./images/sport/Sports_Betting.png')} />
                                                            <div className="game-img-hover">
                                                                <Link to="/sport" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                        <div className="img-title">沙巴体育</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 item">
                                                <h5 className="title">热门特性</h5>
                                                <div className="row">
                                                    <div className="col-md-6 fullHeight">
                                                        <div className="game-img">
                                                            <img src={require('./images/sport/ow-live-stream-calendar-421x115-sc.jpg')} />
                                                        </div>
                                                        <p><b>视频直播日程表</b></p>
                                                        <p>在大发进行赛事投注，畅享高清现场直播!</p>
                                                    </div>
                                                    <div className="col-md-6 fullHeight">
                                                        <div className="game-img">
                                                            <div className="tag">新</div>
                                                            <img src={require('./images/sport/dp-420-sc.jpg')} />
                                                        </div>
                                                        <p><b>大发合作伙伴</b></p>
                                                        <p>想了解更多关于我们合作伙伴的资讯，点击<b>此处</b>前往大发合作伙伴页面。</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*优惠活动*/}
                                    <div className="col-md-4 item">
                                        <h5 className="title">优惠活动</h5>
                                        <div className="col-md-6 fullHeight">
                                            <div className="game-img">
                                                <div className="tag">沙巴体育</div>
                                                <img src={require('./images/sport/golden-era-575x325-en.jpg')} />
                                            </div>
                                            <p><b>黄金庆典 猪年大吉</b></p>
                                            <p>与大发共庆2019猪年！马上投注您喜爱的赛事，赢取惊喜抽奖奖品.</p>
                                        </div>
                                        <div className="col-md-6 fullHeight">
                                            <div className="game-img">
                                                <div className="tag">沙巴体育</div>
                                                <img src={require('./images/sport/dafaasian-promo-summary-575x325-sc.jpg')} />
                                            </div>
                                            <p><b>百万大发亚洲站</b></p>
                                            <p>提交您的亚洲杯预测，有机会赢取1,600,000元大奖！</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*真人*/}
                            <div className="secNavItem" style={{display:hoverObj=="casino"?"block":"none"}}>
                                <div className="row">
                                    {/*左侧*/}
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-3 item">
                                                <h5 className="title">精选</h5>
                                                    <div className="game-img noTitle ">
                                                        <img src={require('./images/casino/1.jpg')} style={{height:'100%'}} />
                                                        <div className="game-img-hover">
                                                            <span className="game-name">黑豹</span>
                                                            <Link to="/casino" className="btn">马上游戏 </Link>
                                                        </div>
                                                    </div>
                                            </div>
                                            <div className="col-md-9 item">
                                                <h5 className="title">游戏大厅展示</h5>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="game-img noTitle ">
                                                            <img src={require('./images/casino/221x93-ab.jpg')}  />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">AB</span>
                                                                <Link to="/casino" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="game-img noTitle ">
                                                            <img src={require('./images/casino/221x93-ag.jpg')}  />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">AG</span>
                                                                <Link to="/casino" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="game-img noTitle ">
                                                            <img src={require('./images/casino/221x93-ebet.jpg')}  />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">EBET</span>
                                                                <Link to="/casino" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="game-img noTitle ">
                                                            <img src={require('./images/casino/221x93-evo.jpg')}  />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">EVO</span>
                                                                <Link to="/casino" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="game-img noTitle ">
                                                            <img src={require('./images/casino/221x93-gd.jpg')}  />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">GD</span>
                                                                <Link to="/casino" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="game-img noTitle ">
                                                            <img src={require('./images/casino/221x93-opus.jpg')}  />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">opus</span>
                                                                <Link to="/casino" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*优惠活动*/}
                                    <div className="col-md-4 item">
                                        <h5 className="title">优惠活动</h5>
                                        <div className="col-md-6 fullHeight">
                                            <div className="game-img">
                                                <div className="tag">现场荷官</div>
                                                <img src={require('./images/casino/3.jpg')} />
                                            </div>
                                            <p><b>0.88% 无上限返水</b></p>
                                            <p>玩最佳现场牌桌游戏，获返水奖励！</p>
                                        </div>
                                        <div className="col-md-6 fullHeight">
                                            <div className="game-img">
                                                <div className="tag">现场荷官</div>
                                                <img src={require('./images/casino/2.jpg')} />
                                            </div>
                                            <p><b>赢取1,000,000元路虎揽胜运动版！</b></p>
                                            <p>这个圣诞将全新路虎揽胜运动版等您开回家！</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*PT老虎机*/}
                            <div className="secNavItem" style={{display:hoverObj=="pt"?"block":"none"}}>
                                <div className="row">
                                    {/*左侧*/}
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <h5 className="title">特色游戏</h5>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/1.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/2.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/3.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/4.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <h5 className="title">Skywind</h5>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/5.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/6.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/7.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/8.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <h5 className="title">Voidbridge</h5>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/1.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/2.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/3.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/4.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*优惠活动*/}
                                    <div className="col-md-4 item">
                                        <h5 className="title">优惠活动<Link to="/promotions" className="more">更多活动<i className="glyphicon glyphicon-play"></i></Link></h5>
                                        <div className="col-md-6 fullHeight">
                                            <div className="game-img">
                                                <div className="tag">沙巴体育</div>
                                                <img src={require('./images/sport/golden-era-575x325-en.jpg')} />
                                            </div>
                                            <p><b>黄金庆典 猪年大吉</b></p>
                                            <p>与大发共庆2019猪年！马上投注您喜爱的赛事，赢取惊喜抽奖奖品.</p>
                                        </div>
                                        <div className="col-md-6 fullHeight">
                                            <div className="game-img">
                                                <div className="tag">沙巴体育</div>
                                                <img src={require('./images/sport/dafaasian-promo-summary-575x325-sc.jpg')} />
                                            </div>
                                            <p><b>百万大发亚洲站</b></p>
                                            <p>提交您的亚洲杯预测，有机会赢取1,600,000元大奖！</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*老虎机*/}
                            <div className="secNavItem" style={{display:hoverObj=="games"?"block":"none"}}>
                                <div className="row">
                                    {/*左侧*/}
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <h5 className="title">特色游戏</h5>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/1.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/2.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/3.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/4.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <h5 className="title">Skywind</h5>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/5.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/6.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/7.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/8.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <h5 className="title">Voidbridge</h5>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/1.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/2.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/3.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="game-img noTitle">
                                                            <img src={require('./images/4.jpg')} />
                                                            <div className="game-img-hover">
                                                                <span className="game-name">funky monkey</span>
                                                                <Link to="/PT" className="btn">马上游戏 </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*优惠活动*/}
                                    <div className="col-md-4 item">
                                        <h5 className="title">优惠活动<Link to="/promotions" className="more">更多活动<i className="glyphicon glyphicon-play"></i></Link></h5>
                                        <div className="col-md-6 fullHeight">
                                            <div className="game-img">
                                                <div className="tag">沙巴体育</div>
                                                <img src={require('./images/sport/golden-era-575x325-en.jpg')} />
                                            </div>
                                            <p><b>黄金庆典 猪年大吉</b></p>
                                            <p>与大发共庆2019猪年！马上投注您喜爱的赛事，赢取惊喜抽奖奖品.</p>
                                        </div>
                                        <div className="col-md-6 fullHeight">
                                            <div className="game-img">
                                                <div className="tag">沙巴体育</div>
                                                <img src={require('./images/sport/dafaasian-promo-summary-575x325-sc.jpg')} />
                                            </div>
                                            <p><b>百万大发亚洲站</b></p>
                                            <p>提交您的亚洲杯预测，有机会赢取1,600,000元大奖！</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*彩票*/}
                            <div className="secNavItem" style={{display:hoverObj=="bingo"?"block":"none"}}>
                                <div className="row">
                                    {/*左侧*/}
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h5 className="title">快速乐透 & 国际彩票</h5>
                                                <div className="col-md-6 fullHeight">
                                                    <div className="game-img">
                                                        <img src={require('./images/bingo/chineselottery.jpg')} />
                                                    </div>
                                                    <p><b>快速乐透</b></p>
                                                    <p>畅玩快速乐透，体验全新等级的快乐彩。</p>
                                                </div>
                                                <div className="col-md-6 fullHeight">
                                                    <div className="game-img">
                                                        <img src={require('./images/bingo/gameworx-megadrop.jpg')} />
                                                    </div>
                                                    <p><b>国际彩票</b></p>
                                                    <p>赢取至尊大奖，尽在国际彩票。</p>
                                                </div>

                                            </div>
                                            <div className="col-md-6">
                                                <h5 className="title">大发彩票 & PK10</h5>
                                                <div className="col-md-6 fullHeight">
                                                    <div className="game-img">
                                                        <img src={require('./images/bingo/quicklotto-270x134.jpg')} />
                                                    </div>
                                                    <p><b>大发彩票</b></p>
                                                    <p>畅玩快乐彩和大发彩票，每1.5分钟赢大奖。</p>
                                                </div>
                                                <div className="col-md-6 fullHeight">
                                                    <div className="game-img">
                                                        <img src={require('./images/bingo/pk10.jpg')} />
                                                    </div>
                                                    <p><b>PK10</b></p>
                                                    <p>选择您的赛车编号，在6个不同盘口尽情游戏！</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*优惠活动*/}
                                    <div className="col-md-4 item">
                                        <h5 className="title">优惠活动<Link to="/promotions" className="more">更多活动<i className="glyphicon glyphicon-play"></i></Link></h5>
                                        <div className="col-md-6 fullHeight">
                                            <div className="game-img">
                                                <div className="tag">大发彩票</div>
                                                <img src={require('./images/bingo/lottery-faqs-mdd.png')} />
                                            </div>
                                            <p><b>立即了解彩票</b></p>
                                            <p>彩票常见问题 ！</p>
                                        </div>
                                        <div className="col-md-6 fullHeight">
                                            <div className="game-img">
                                                <div className="tag">大发彩票</div>
                                                <img src={require('./images/bingo/lotteryrebaterev-promo-summary-575x325_1.jpg')} />
                                            </div>
                                            <p><b>大发彩票返水</b></p>
                                            <p>无上限周返水 尽在大发彩票投注! Opus快乐彩 | GPI快乐彩 | PK10 | 泰国彩票 | 大发彩票 | 快速乐透 | 国际彩票</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        platforms: state.game.platforms,
        remoteSysConfs:state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(NavigationBar)