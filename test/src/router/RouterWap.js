import React, {Component} from 'react';
import {Route, Router, IndexRoute} from 'react-router'
import {wapAuth,wapLogin} from "globalAction";
import {Provider} from 'react-redux'

const isLogin = (params, replace) => {
    if (!wapAuth()) replace('/login'); //如果要跳转到登录页面
    // if(!wapLogin(true)) replace('/'); //弹出登录悬浮窗
}

export default class CusRouter extends Component {
    render() {
        const r = window.r;
        const RequireSelfRouter = r.get("RequireSelfRouter");
        return (
            <Provider store={this.props.store}>
                <Router history={this.props.history}>
                    <Route path="/" component={r.get("Frame")}>
                        <IndexRoute component={r.get('FirstPage')}/>
                        /*每个站点自己的router*/
                        {RequireSelfRouter ? RequireSelfRouter() : null}
                        <Route path="/login" component={r.get('LoginPage')}/>
                        <Route path="/signIn" component={r.get('SignIn')} />
                        <Route path="/register" component={r.get('RegisterPage')}/>
                        <Route path="/registerRule" component={r.get('RegisterRule')}/>
                        <Route path="/header" component={r.get('Header')}/>
                        <Route path="/help" component={r.get('HelpPage')}/>
                        <Route path="/service">
                            <IndexRoute component={r.get('ServicePage')}/>
                            <Route path="feedback" component={r.get('Feedback')} onEnter={isLogin}/>
                            <Route path="history" component={r.get('HistoryPage')}/>
                            <Route path="message_letter" component={r.get('MessageLetter')}/>
                            <Route path="message_notice" component={r.get('MyMessage')}/>
                            <Route path="aboutUs" component={r.get('AboutUs')}/>
                            <Route path="agentReg" component={r.get('AgentReg')}/>
                        </Route>

                        <Route path="/allGame(/:PlatformIds&:GameType&:GameName)" component={r.get('AllGamePage')}/>
                        <Route path="/message" component={r.get('MyMessage')} > {/* onEnter={isLogin} */}
                            <Route path=":messageType" component={r.get('MyMessage')}/>
                        </Route>
                        <Route path="/read/:messageType&:messageId&:fromUrl" component={r.get('ReadMessage')}/>
                        <Route path="/history" component={r.get('HistoryPage')} onEnter={isLogin}/>
                        <Route path="cardManage" onEnter={isLogin}>
                            <IndexRoute component={r.get('CardManage')}/>
                            <Route path="addCard" component={r.get('AddCard')} onEnter={isLogin}/>
                            <Route path="addQrCode" component={r.get('AddQrCode')} onEnter={isLogin}/>
                        </Route>

                        <Route path="/editPassword/:editType" component={r.get('EditPassword')} onEnter={isLogin}/>
                        <Route path="/setting" component={r.get('SettingPage')} onEnter={isLogin}/>
                        <Route path="/money" onEnter={isLogin}>
                            <IndexRoute component={r.get('MoneyManage')}/>
                            <Route path="transfer/:platformID" component={r.get('TransferPage')}/>
                            <Route path="deposit" component={r.get('DepositPage')}/>
                            <Route path="withdraw" component={r.get('WithdrawPage')}/>
                        </Route>
                        <Route path="/promotion"> {/*onEnter={isLogin}*/}
                            <IndexRoute component={r.get('PromotionPage')}/>
                        </Route>
                        <Route path="/hotActivity">
                            <IndexRoute component={r.get('HotActivity')}/>
                            <Route path="lotto" component={r.get('LottoPage')} onEnter={isLogin}/>
                            <Route path="statement" component={r.get('StatementPage')}/>
                        </Route>
                        <Route path="/myCenter">
                            <IndexRoute component={r.get('MyCenter')}/>
                        </Route>
                        {/*游戏内页*/}
                        <Route path="/gameFrame" component={r.get('GamesFrame')}>
                            <Route path="signIn" component={r.get('SignInPage')}  onEnter={isLogin}/>{/*签到*/}
                            <Route path="sport" component={r.get('SportPage')}/>{/*体育*/}
                            <Route path="casino" component={r.get('CasinoPage')}/>{/*现场荷官*/}
                            <Route path="PT" component={r.get('PTPage')}/>{/*PT老虎机*/}
                            <Route path="MG" component={r.get('MGPage')}/>{/*PT老虎机*/}
                            <Route path="fish" component={r.get('FishPage')}/>{/*捕鱼王*/}
                            <Route path="bingo" component={r.get('BingoPage')}/>{/*彩票*/}
                            <Route path="streetMachine" component={r.get('StreetMachinePage')}/>{/*棋牌*/}
                            <Route path="games(/:platformID)" component={r.get('GamesPage')}/>{/*老虎机*/}
                        </Route>
                        {/*积分商城*/}
                        <Route path="/shop" component={r.get('ShopPage')}></Route>
                    </Route>
                </Router>
            </Provider>
        )
    }
}