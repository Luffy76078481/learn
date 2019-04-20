/**
 * Created by b3 on 2017/6/27.
 */
import React, {Component} from 'react';
import {config} from "globalConfig";
import * as help from "../../help/helpJson.js";


class AllianceContent extends Component {



    render() {
        const appName = config.appName;
        const spec =config.spec;
        return (
            <div id="AllianceContent" className="show">
                <div className="money-fousImg">
                    {/*<img src="//www.p9113.com/assets/images/money/money_02.jpg" width="100%"/>*/}
                </div>
                <div className="fnameCenter money-text heiti">
                    <p><span>合作共赢计划</span>
                        <br/>
                        <br/>
                        只需简单步骤，就能带领您迈向成功之路！
                        </p>
                </div>
                <div className="borderHeng"></div>
                <div className="fnameCenter">
                    <div className="moneyStep">
                        <div className="moneyStepList">
                            <h3>1. 注册账号</h3>
                            <p>在线注册代理会员账号<br/>
                                等待审核通过
                            </p>
                        </div>
                        <div className="moneyBorderSan"></div>
                        <div className="moneyStepList">
                            <h3>2. 开始推广</h3>
                            <p>申请代理连接条或者宣传代码<br/>
                                或者代理代码，进行推广
                            </p>
                        </div>
                        <div className="moneyBorderSan"></div>
                        <div className="moneyStepList">
                            <h3>3. 赚取佣金</h3>
                            <p>按照代理合作计划<br/>
                                赢取丰厚的佣金
                            </p>
                        </div>
                        <div className="clear"></div>
                        <div className="moneStepAdd">
                            <a onClick={this.props.onClickJoin} href="#" className="productMix">现在加入</a>
                        </div>
                        <p className="f18 yahei juzhong moneyTextStyle">您可能已经发现，{appName}合营计划为我们的合营伙伴提供了业界最具吸引力的共赢计划。<br/>
                            在{appName}，我们所有的合营伙伴都有可能赚到最高达40%的合营佣金!</p>
                        <h3 className="f28 heiti juzhong font300" style={{marginTop:"20px"}} >我如何赚取佣金？</h3>
                        <p className="yongjin f14">当您注册成为{appName}的合营伙伴后，基于您每月推荐到{appName}体育博彩和娱乐场的玩家所产生的盈利，通过您的用户名，我们可以追踪到流量、下载量、注册数量、有参与投注的会员数量等信息，基于所有的数据来计算佣金。通过我们的市场营销工具，您的合营事业将会很容易建立起来。</p>
                    </div>
                </div>
                <div className="borderHeng"></div>
                <div className="fnameCenter">
                    <p className="moneyPstyle juzhong f18 heiti"><span className="huang">佣金计划</span>（分层佣金结构）</p>
                    {spec=='mgm-vv8'?
                      <p className="juzhong f12 textListText">注：代理佣金每月2-5号结算，届时请联系业务经理结算即可，QQ ：2388884661</p>:  
                     <p className="juzhong f12 textListText">注：合营伙伴除了要达到上表中提及的活跃会员数以外，{appName}还制定了一套针对会员质量的审核标准，以考核您拥有会员的质量。<br/>
                     对于部分会员质量不达标，且未能达到最低自身活跃玩家要求的合营伙伴，我们将不会发放推介佣金。计算示例</p>          
                       }


                    {help.renderAllianceTable()}
                    {
                        spec=='vns-uzi' ?
                        <p className="f12 textListText">
                        1.佣金计算方法总存款-总取款-总存款*2%=盈利-盈利*12%=实际盈利 注：需额外扣除2%存款第三方手续费以及当月盈利的12%的游戏对接维护费。 例如：假设代理第一个月 负盈利100万(就是我们亏) 第二个月盈利90万 这两月是无佣金 第三月盈利 50万 减负盈利10万 等于40万 分为（5+5+30） 按比例算：5万*50%+5万*55%+30万*60%=232500元<br/>

                        2.系统自动结算初始条件：3个存款会员和3个有效投注会员（注：每个会员有效投注≥1000；公司盈利＞1）<br/>

                        3.我们会时刻关注合作商的表现，会及时地调整佣金比率并通知合作商。<br/>

                        4.负收益将被带入下一月。<br/>

                        5.合作伙伴需要的支付费用,优惠和市场费用,这些费用将会累计并会在代理每月的佣金中扣除。这些费用包括:<br/>

                        （1）转账费用 - 包括所有代理会员的存款和提款费用。<br/>

                        （2）媒介费用 - 任何费用支出为{appName}支持或协助代理与促销或营销目的。<br/>

                        （3）优惠红利 - 给予代理会员的现金红利或是折扣。<br/>
                    </p>:
                    spec=='mgm-vv8'?
                    <p className="f12 textListText">
                        1.例如：假设代理第一个月 负盈利100万(就是我们亏) 第二个月盈利90万 这两月是无佣金 第三月盈利 50万 减负
                        盈利10万 等于40万 分为（5+5+30） 按比例算：5万*50%+5万*55%+30万*60%=232500元<br/>

                        2.系统自动结算初始条件：5个存款会员和5个有效投注会员（注：每个会员有效投注≥1000；公司盈利＞1）<br/>

                        3.我们会时刻关注合作商的表现，会及时地调整佣金比率并通知合作商。<br/>

                        4.负收益将被带入下一月。<br/>

                        5.合作伙伴需要的支付费用,优惠和市场费用,这些费用将会累计并会在代理每月的佣金中扣除。这些费用包括:<br/>

                        （1）转账费用 - 包括所有代理会员的存款和提款费用。<br/>

                        （2）媒介费用 - 任何费用支出为{appName}支持或协助代理与促销或营销目的。<br/>

                        （3）优惠红利 - 给予代理会员的现金红利或是折扣。<br/>
                    </p>:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

                    <p className="f12 textListText">
                    1.佣金计算方法：【负派彩金额-费用】×佣金比例=所得佣金。【负派彩金额减掉费用大于0为有佣金，正派彩的金额加费用将会累积到下个月】     
                    例如：派彩是 -1,200,000 ， 费用为200,000，佣金比例为40%，佣金计算为 【1,200,000-200,000】×40%=400,000<br/>

                    2.系统自动结算初始条件：5个存款会员和5个有效投注会员（注：每个会员有效投注≥1000；公司盈利＞1）<br/>

                    3.我们会时刻关注合作商的表现，会及时地调整佣金比率并通知合作商。<br/>

                    4.负收益将被带入下一月。<br/>

                    5.合作伙伴需要的支付费用,优惠和市场费用,这些费用将会累计并会在代理每月的佣金中扣除。这些费用包括:<br/>

                    （1）转账费用 - 包括所有代理会员的存款和提款费用。<br/>

                    （2）媒介费用 - 任何费用支出为{appName}支持或协助代理与促销或营销目的。<br/>

                    （3）优惠红利 - 给予代理会员的现金红利或是折扣。<br/>
                </p>

                    }
                </div>
                <div className="borderHeng"></div>
                <div className="fnameCenter moneyPaddingFot">
                    <p className="juzhong">
                        <span className="huang f18 heiti">支付方式</span> 只要提供您的银行个人账户信息给我们，您的合营佣金将会自动转到账户上，让您安枕无忧。
                    </p>
                    <p className="juzhong">
                        <span className="huang f18 heiti">我何时才能收到佣金？</span> {appName}将会在次月5日统一支付佣金到合营伙伴的代理帐户，提交提款就可以
                    </p>
                </div>
            </div>
        )
    }
}



export default (AllianceContent);