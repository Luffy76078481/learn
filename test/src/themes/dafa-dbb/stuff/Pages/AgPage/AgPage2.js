/**
 *  Fish --------------- update
 */
import React, {Component} from 'react';
import './AgPage2.scss'
import {connect} from 'react-redux';

class AgPage2 extends Component {
    constructor(props) {
        super(props);
        this.state = {tab:"tab1"};

    }
    // 开始
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
    // Class
    componentDidMount() {
        window.$("#root").attr("class", "agcss");
    }
    // 开始游戏
    renderTab(){
        let gameContent = this.props.agGames;
        let gameLink;

        if(gameContent.length>0){
            gameLink = {
                GamePlatform:gameContent[0].GamePlatform,
                GameType:gameContent[0].GameTypeText,
                GameId:gameContent[0].GameIdentify,
                IsMobile:false,
                IsDemo:false,
            };
        }
        if(this.state.tab ==="tab1"){
            return(
                <div className="tab tab1">
                    <div className="tabTxt1">
                        汪洋大海捕猎尽在亚洲最佳捕鱼游戏—捕鱼王！ <br/>
                        瞄准你的大炮，捕获大鱼赢取海量金币。使用大炮乘数加大每次射击力度，同时启用锁定功能对目标持续射击！您有5个不同的乘数房间可选择，以满足您的游戏偏好。享受深海捕鱼乐趣尽在捕鱼王游戏
                    </div>
                    <div className="pic">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="tab-banner" onClick={this.onClickGameLink.bind(this, gameLink)}></div>
                </div>
            )
        }else if(this.state.tab ==="tab2"){
            return(
                <div className="tab tab2">
                    <div className="tabTxt2">
                        <sapn>1.注册并登录您的大发账户。</sapn><br/>
                        <sapn>2.点击“出纳柜台”选择您偏好的支付方式。</sapn><br/>
                        <sapn>3.在捕鱼王钱包存款即可开始捕鱼游戏。</sapn>
                    </div>
                    <p>亚洲最佳游戏开始捕鱼游戏！</p>
                </div>
            )
        }
    }
    // nav 切换
    tabClick(tab){
        this.setState({tab:tab});
    }
    render() {
        const promotionLink = this.props.remoteSysConfs.channel_push_url;
        const ImageGallery = window.r.get("ImageGallery");
        const options2 = window.r.props('ImageGallery');
        let height = options2.agPageHeight || options2.height || "170px";
        let gameContent = this.props.agGames;
        let gameLink;

        if(gameContent.length>0){
            gameLink = {
                GamePlatform:gameContent[0].GamePlatform,
                GameType:gameContent[0].GameTypeText,
                GameId:gameContent[0].GameIdentify,
                IsMobile:false,
                IsDemo:false,
            };
        }
        return (
            <article id="ag-game">
                {ImageGallery && <ImageGallery width="100%" height={height} type="ag_banner_imgs" imgtype='banner'/>}
                <div className="gogame" onClick={this.onClickGameLink.bind(this, gameLink)}></div>
                <div className="main">
                    <div className="txt">
                        <h1>在亚洲最佳捕鱼游戏捕获最巨大的鱼！</h1>
                        <p>在捕鱼王游戏体验渔汛乐趣！捕捉海洋中最巨大的鱼获取巨额奖励！</p>
                    </div>
                    <div className="content1">
                        <div className="boxs box1">
                            <span><h1>随时随地</h1></span>
                            <div className="box-cont">
                                <div className="icon icon1"></div>
                                <div className="text">在电脑或手机玩游戏。</div>
                                <a target="blank" href={promotionLink}>立即开始</a>
                            </div>
                        </div>
                        <div className="boxs box2">
                            <span><h1>抓住大奖的机会！</h1></span>
                            <div className="box-cont">
                                <div className="icon icon2"></div>
                                <div className="text">捕获幸运之鱼获超级大奖！</div>
                                <a href="javascript:void(0)" onClick={this.onClickGameLink.bind(this, gameLink)}>立即开始</a>
                            </div>
                        </div>
                        <div className="boxs box3">
                            <span><h1>轻松游戏</h1></span>
                            <div className="box-cont">
                                <div className="icon icon3"></div>
                                <div className="text">体验用户友好的界面以及其他特色。</div>
                                <a href="javascript:void(0)" onClick={this.onClickGameLink.bind(this, gameLink)}>立即开始</a>
                            </div>
                        </div>
                    </div>
                    <div className="content2">
                        {/* 内容导航 */}
                        <div className="btnGroup">
                            <a onClick={this.tabClick.bind(this,"tab1")}>特色</a>
                            <a onClick={this.tabClick.bind(this,"tab2")}>如何存款</a>
                        </div>
                        {this.renderTab()}
                    </div>
                </div>
            </article>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
        agGames:state.game.agByGames,
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps, {})(AgPage2);