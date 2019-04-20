import React, {Component} from 'react';
import "./css/FirstPage_BEE.scss";
import {connect} from 'react-redux';
import {Link, IndexLink, browserHistory} from 'react-router';
import {config} from "globalConfig";

class FirstPage_BEE extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bgColor: '#004531',
            fontColor: '#417667',
            borderNone: 'none',
            borBottom: 'solid 1px #275a4b',
            pxRuler: '20px'
        }
    }

    onTo(path) {
        browserHistory.push(path);
    }

    render() {
        const agentLoginUrl = config.agentLoginUrl;
        window.Util = window.Util || {};
        window.Util.languageSekect = function () {
            window.swal("提示", "您目前的地区不支持该语言！", "info");
        }
        // const Footer = window.r.get("Footer");
        return (
            <div className="firstPage">
                <div className="bet365_firstPanel" style={{height: "800px"}}>
                    <div className="indexLeft">
                        <ul className="lpnm">
                            <li><a href="javascript:Util.languageSekect(0);">English</a></li>
                            <li><a href="javascript:Util.languageSekect(1);">Español</a></li>
                            <li><a href="javascript:Util.languageSekect(2);">Deutsch</a></li>
                            <li><a href="javascript:Util.languageSekect(3);">Italiano</a></li>
                            <li><a href="javascript:Util.languageSekect(4);">Português</a></li>
                            <li><a href="javascript:Util.languageSekect(5);">Dansk</a></li>
                            <li><a href="javascript:Util.languageSekect(6);">Svenska</a></li>
                            <li><a href="javascript:Util.languageSekect(7);">Norsk</a></li>
                            <li><a href="javascript:void(0);" className="hoverSelect">简体中文</a></li>
                            <li><a href="javascript:Util.languageSekect(9);">繁體中文</a></li>
                            <li><a href="javascript:Util.languageSekect(10);">Български</a></li>
                            <li><a href="javascript:Util.languageSekect(11);">Ελληνικά</a></li>
                            <li><a href="javascript:Util.languageSekect(12);">Polski</a></li>
                            <li><a href="javascript:Util.languageSekect(13);">Română</a></li>
                            <li><a href="javascript:Util.languageSekect(14);">Česky</a></li>
                            <li><a href="javascript:Util.languageSekect(15);">Magyar</a></li>
                            <li><a href="javascript:Util.languageSekect(16);">Slovenčina</a></li>
                            <li><a href="javascript:Util.languageSekect(17);">Nederlands</a></li>
                        </ul>
                    </div>
                    <div className="indexRight">
                        <div className="indexRightContent">
                            <div className="indexRightSports">
                                {/*体育*/}
                                <div className="sportsContent-border" onClick={this.onTo.bind(this, "/sport")}>
                                    <div className="sportsContent">
                                        <div className="sportsContentHead">
                                            <img
                                                src={require("./images/bet365_firstpage/bg-sports-title-white.gif?v=1")}/>
                                        </div>
                                        <div className="sportsContentRight">
                                            <div className="sportsContentLogin"><Link to="/sport">
                                                <img src={require("./images/bet365_firstpage/NCDBP_210x204.gif?v=1")}/></Link>
                                            </div>
                                            <div className="sportsContentHref">
                                                <Link to="/sport">
                                                    <img src={require("./images/bet365_firstpage/liveinplay.gif?v=1")}/>
                                                    <span className="sportsContentHref-title">比赛开始即可进行投注</span>
                                                    <span className="sportsContentHref-text">我们提供最广泛的滚球盘服务。</span>
                                                    <span className="sportsContentHref-btn">立即投注</span>
                                                </Link>
                                                <Link to="/sport">
                                                    <img
                                                        src={require("./images/bet365_firstpage/204x30-live-streaming-02.gif?v=1")}/>
                                                    <span className="sportsContentHref-title">观看现场体育</span>
                                                    <span className="sportsContentHref-text">
                                                        每年我们向您的电脑提供超过<br/>70,000场的现场赛事链接。</span>
                                                    <span className="sportsContentHref-btn">立即投注</span>
                                                </Link>
                                            </div>
                                            <div className="clear"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="contentList">
                                    {/*娱乐场*/}
                                    <div className="contentListOl" onClick={this.onTo.bind(this, "/casino")}>
                                        <div className="casino">
                                            <div className="casino-title">
                                                <a href="casino">
                                                    <img src={require("./images/bet365_firstpage/bg-casino.jpg?v=1")} height="81"/>
                                                </a>
                                            </div>
                                            <div className="casino-content">
                                                <img src={require("./images/bet365_firstpage/bg-casino-title.gif?v=1")}/>
                                                <h4>新玩家奖金</h4>
                                                <p>超过250种精选游戏，包括最经典的现场荷官，精彩内容面向全部玩家。</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/*彩票游戏*/}
                                    {/*<div className="contentListOl pokerStyle" onClick={this.onTo.bind(this, "/bingo")}>
                                        <div className="poker">
                                            <div className="casino-title">
                                                <a href="bingo">
                                                    <img src={require("./images/bet365_firstpage/cp.jpg?v=1")} height="81"/>
                                                </a>
                                            </div>
                                            <div className="casino-content">
                                                <img src={require("./images/bet365_firstpage/caipiao.png?v=1")}/>
                                                <h4>加入精彩角逐</h4>
                                                <p>最受全球华人喜欢的彩票游戏：时时彩，香港彩，双色球，福彩3D等在线投注方便快捷。</p>
                                            </div>
                                        </div>
                                    </div>*/}
                                    {/*扑克牌*/}
                                    <div className="contentListOl gameStyle" onClick={this.onTo.bind(this, "/casino")}>
                                        <div className="game">
                                            <div className="casino-title">
                                                <a href="new_casino">
                                                    <img src={require("./images/bet365_firstpage/bg-poker.jpg?v=1")} height="81"/>
                                                </a>
                                            </div>
                                            <div className="casino-content">
                                                <img src={require("./images/bet365_firstpage/bg-liveCasino-title2.png?v=1")}/>
                                                <h4>新玩家奖金</h4>
                                                <p>体验全球最奢华的真人娱乐世界，九大真人平台，全球首发，无忧博彩尽在Bet365。</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/*游戏*/}
                                    <div className="contentListOl gameStyle" onClick={this.onTo.bind(this, "/games")}>
                                        <div className="game">
                                            <div className="casino-title">
                                                <a href="game_all">
                                                    <img src={require('./images/bet365_firstpage/PharaohTreasure.jpg')}/>
                                                </a>
                                            </div>
                                            <div className="casino-content">
                                                <img src={require("./images/bet365_firstpage/bg-games-title.gif?v=1")}/>
                                                <h4>新玩家奖金</h4>
                                                <p>从老虎机到刮奖卡，我们种类丰富的在线游戏将让您体验娱乐无限的欢乐感受。</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clear"/>
                                </div>
                            </div>
                        </div>

                        <div className="footer">
                            <div className="footer-desion">
                                <div className="footerLinks">
                                    <a href="/help.html" target="_blank">关于我们</a>&nbsp;|&nbsp;
                                    <a href="/help.html#deposit" target="_blank">常见问题</a>&nbsp;|&nbsp;
                                    <a href='javascript:void(0);'
                                       onClick={this.serversOpen.bind(this)}>在线客服</a>&nbsp;|&nbsp;
                                    <a href="/agent.html">联系我们</a>&nbsp;|&nbsp;
                                    <a href="/help.html#yibanrule" target="_blank">条款与协议</a>&nbsp;|&nbsp;
                                    <a href="/help.html#responsibility" target="_blank">免责声明</a>&nbsp;|&nbsp;
                                    <a href="/help.html#myAccount" target="_blank">隐私政策</a>&nbsp;|&nbsp;
                                    <a href="/agent.html" target="_blank">合营联盟</a>&nbsp;|&nbsp;
                                    <a href="/agent.html" target="_blank">代理注册</a>&nbsp;|&nbsp;
                                    <a href={config.agentLoginUrl} target="_blank">代理登入</a>
                                    <span className="ban">© 2001-2019 bet365 版权所有 | 18+</span>
                                </div>
                                <div className="si_content">
                                    <span className="kong">
                                        通过进入、继续使用或浏览此网站，您即被认定接受：我们将使用特定的浏览器COOKIES优化您的客户享用体验。Bet365仅会使用优化您服务体验的COOKIES，而不是可侵犯您隐私的COOKIES。关于我们使用COOKIES，以及您如何取消、管理COOKIES使用的更多详情，请参考我们的COOKIES政策。
                                    </span>
                                    <span className="kong">
                                        Bet365是世界领先的网络博彩集团之一，提供体育投注、金融、娱乐场、扑克牌及游戏等丰富选择。
                                    </span>
                                    <span className="kong">
                                        我们向客户提供全部体育范围内的丰富投注，内容涵盖足球、网球、篮球、斯诺克及乒乓球等。投注一系列丰富的赛前及滚球盘盘口，无限精彩尽在每一场英超联赛和欧冠联赛足球现场比赛中，且我们的欧洲精英足球奖金优惠同样适用。此外，您还可以使用网球过关投注奖金尽享ATP网球顶级赛事带来的众多诱人投注机会。您可同时通过手机或平板电脑访问“移动中的Bet365”，体验一系列同样精彩诱人的赛事及盘口，包括现场滚球盘服务。为增加滚球盘的兴奋感受，我们还特别推出了现场链接，每年向您的电脑直播70,000多场精彩赛事。精选包括大师系列赛网球锦标赛和来自世界各地顶尖的国家级足球联赛。如想查看最新的体育投注信息，请访问我们全新的投注新闻站点。
                                    </span>
                                    <span className="kong">
                                        {/*除了类别多样的体育投注之外，我们还提供丰富多种的精彩优惠。比如激动人心的欧洲精英足球奖金，如果您在英超、意甲、西甲、德甲或欧洲冠军联赛上进行过关投注，即有机会获取最高可达您彩金100％比例的奖金。另外，还有我们的零分平局退本大赠送优惠；如果您在赛前投注了“正确比分”、“半场/全场”或“比分预测”等足球赛事盘口，且假如比赛结果为0-0，我们将把输的投注取消，不惜退本大赠送！*/}
                                    </span>
                                    <span className="kong">
                                        为何不尝试我们惊喜不断的在线娱乐场？250多种精彩游戏任您选择，包括21点等各种游戏。如想进行轮盘或百家乐，请立即访问现场荷官。而且，我们的扑克室是世界最大的在线扑克网络，您可在此挑战数千名现金比赛玩家或参加在线大型锦标赛事。
                                    </span>
                                    <span className="kong">
                            我们是由直布罗陀政府颁发执照并受直布罗陀博彩委员会监管。
                        </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

    serversOpen(e) {
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link, 'servers', 'width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
}

const mapStateToProps = (state, ownProps) => (
    {}
);

export default connect(mapStateToProps)(FirstPage_BEE)