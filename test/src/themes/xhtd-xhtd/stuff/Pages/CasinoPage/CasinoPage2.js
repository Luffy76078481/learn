/**
 * xhtd-casino
 */
import React, {Component} from 'react';
import { Link  } from 'react-router';
import {connect} from 'react-redux';
import './CasinoPage2.scss'


class CasinoPage extends Component {
    componentDidMount() {
        window.$("#root").attr("class", "casinocss");
    }
    // 点击
    onClickGameLink(game) {
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
    // 真人游戏列表
    renderCansinoList() {
        var CansinoLists = [];
        var options = window.r.props("CasinoPage");
        for (var i = 0; i < this.props.views.casinos.length; i++) {
            var CansinoList = this.props.views.casinos[i];
            let ImageUrl = window.config.prdImgUrl + CansinoList.ImageUrl

            CansinoLists.push(
                <div key={i} className="color-main" >
                    <div className=" c-items wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp", float:'left', marginLeft:'40px'}}>
                        <div className="casino-platform-list-img casino-list-img" onClick={this.onClickGameLink.bind(this,CansinoList)}  style={{backgroundSize:"100%", background: "url(" + ImageUrl + ") no-repeat"}}>
                            <h3 style={{color:"#fff"}} className={'title'+i}>{CansinoList.Title}</h3>
                        </div>
                        <div className={CansinoList.ID+" casino-platform-list-link"}>
                            <a target="_blank"  href="javascript:void(0)" onClick={this.onClickGameLink.bind(this,CansinoList)} className={"casino-go-game color-highligh"+" a"+i}>{!options.hideCasinoTitle?"立即开始":""}</a>
                        </div>
                    </div>
                </div>

            );
        }
        return CansinoLists;
    }
    // 渲染
    render() {
        const CansinoList = this.renderCansinoList();
        const ImageGallery = window.r.get("ImageGallery");
        const options2 = window.r.props('ImageGallery');
        const promotionLink = window.configHelper.getPromotionUrl();
        let height = options2.casinoHeight || options2.height || "170px";
        let type = options2.casinoType || "casino_banner_imgs"
        return (
            <article id="casino2">
                <ImageGallery width="100%" height={height} type={type} imgtype='banner' />
                <div className="container">
                    <div className="casino-Content">
                        <div className="row casino-platform-list">
                            {CansinoList}
                        </div>
                        <div className="ad">
                            <a href={promotionLink} target="blank"><div className="box l-box">
                                <div className="txt1"><p>同时适用于行动版</p></div>
                                <div className="txt2"><p>进行21点、轮盘和百家乐</p></div>
                                <div className="btn">更多详情</div>
                            </div></a>
                            <Link to="/promotions">
                                <div className="box r-box">
                                    <p className="vip">VIP</p>
                                    <p className="t1">计划</p>
                                    <p className="t2">奖励多多</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="games">
                    <div className="main">
                        <div className="g-title">
                            <span>其他游戏</span>
                            <span><Link to="/games">查看更多游戏</Link></span>
                        </div>
                        <Link to="/games">
                            <div className="items item1">
                                <div className="pic"></div>
                                <div className="name"><a>飞龙在天</a></div>
                            </div>
                        </Link>
                        <Link to="/games">
                            <div className="items item2">
                                <div className="pic"></div>
                                <div className="name"><a>招财进宝累积彩池</a></div>
                            </div>
                        </Link>
                        <Link to="/games">
                            <div className="items item3">
                                <div className="pic"></div>
                                <div className="name"><a>诸神时代</a></div>
                            </div>
                        </Link>
                        <Link to="/games">
                            <div className="items item4">
                                <div className="pic"></div>
                                <div className="name"><a>金钱蛙</a></div>
                            </div>
                        </Link>
                    </div>
                </div>
            </article>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        views:state.views
    }
);

export default connect(mapStateToProps, {})(CasinoPage);