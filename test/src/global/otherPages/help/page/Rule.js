/**
 * Created by b3 on 2017/7/3.
 */

import React, {Component} from 'react';
import {config} from "globalConfig";



class Rule extends Component {



    render() {
        const appName = config.appName;
        return (
            <div id="rule" className="contents">
                <div className="helpContent">
                    <h3 className="title1">投注规则与规定</h3>
                    <p>某些赛事和赌盘有不同的规则，这些规则列于本网站有关特定赛事或赌盘/投注类型的《特别赛事/赌盘投注规则》中。下述内容为适用于所有赛事和赌盘/投注类型的一般规则，必须完全遵守。在适用的情况下，本公司网站公布的《条款和条件》中所列规定与定义应当适用于本《投注规则与规定》。</p>
                    <ul className="contentul">
                        <li><a href="#42">1、一般投注规则？</a></li>
                        <li><a href="#43">2、赌盘（投注类型）规则通则？</a></li>
                        <li><a href="#44">3、特定赛事投注规则？</a></li>
                    </ul>
                </div>

                <h4 className="title2" id="42">1. 一般投注规则与规定<a href="#top" className="ReturnTop">返回顶部</a> </h4>

                <div className="helpContent">
                    <p><strong>1.1.总则</strong><br /><br />
                        1.1.1. 本公司的所有投注信息都是出于诚意提供的。不过，本公司不对有关日期、时间、地点、竞争对手、赔率、结果、统计数据、团队制服（显示在实时视频中）或其它投注信息的任何错误或遗漏负责。本公司保留纠正任何明显错误的权利，并且应当采取所有合理行动确保以诚信透明的方式管理赌盘，赌盘定义为针对某一体育赛事所提供的不同的投注类型。公司保留做出最终性决定的权利。</p><br />
                    <p>1.1.2. 如果一项赛事在预定时间之前开始，则只有该项赛事（赔率大于等于1.75(欧洲盘)）开始之前所做投注（除指定的现场投注以外）会被视为有效投注，赛事的定义是两个团队或个人间有组织的体育比赛或活动。如果一个赌盘未在正确时间关闭或中止，则本公司有权取消在实际开始时间之后进行的所有投注（除指定的现场投注以外）。</p><br />
                    <p>1.1.3. 如果网站对赛事所用的英语和非英语名称之间有任何差异，以英语版本为准，如使用插件等其他工具投注任何游戏，我们有权禁用玩家会员账号及冻结金额。</p><br />
                    <p>1.1.4. 所显示的赛事进行时间仅供于参考。尽管赛事进行时间和所显示的有所差异，投注仍有可能被视为有效。</p><br />
                    <p>1.1.5. 本公司有权在任何时候出于任何原因修改这些规则。一旦在网站上发布，任何此类修改都是具有约束性和立即生效的。</p><br />
                    <p>1.1.6. 客户承认网站上提供的当前分数、所用时间及其它数据虽然是由第三方以"直播"形式提供，但仍会有时间延迟以及/或者可能不准确的情况，并且根据这些资料做任何投注时，客户应自行承担所有风险。本公司提供这些数据时，不保证其准确性、完整性或及时性，并且不对客户因依赖这些数据而遭受的任何损失（直接或间接损失）负责。</p><br />
                    <p><strong>1.2. 中止和延期</strong></p><br />
                    <p>1.2.1. 如果一项赛事未在预定开始日期开始，并且未按特定体育规则的规定，在原先预定的完成日期完成，则所有的投注都将无效，除了对已获得无条件确定的赌盘所做的投注以外。</p><br />
                    <p>1.2.2. 如果一项赛事已经开始，但之后又中止，并且未按特定体育规则的规定，在原先预定的完成日期完成，则所有的投注都将无效，除了对无条件决定结果的赌盘所做的投注以外。</p><br />
                    <p>1.2.3. 如果一项赛事未按特定体育规则的规定，在原告预定的完成日期完成，而正式的比赛结果得以宣布，或者特定赛事的相关主管机构宣布了一个结果，则本公司有权认定这一比赛是正式有效的。在此方面，本公司的决定是最终和具有结束性的。</p><br />
                    <p><strong>1.3.场地变更</strong></p><br />
                    <p>1.3.1. 除非另有说明，如果一项比赛预计在一个中立性场地上展开，但却在非中立的场地上展开，所有的投注仍将被视为有效，反之亦然。如果主场团队打客场团队的场地变更，反之亦然，对该场比赛的所有投注都将被视为无效。如果主场和客场团队的名称被错误地颠倒，投注也会被视为无效。</p><br />
                    <p>1.3.2. 对于所有非团队赛事，如果预定的场地在赌盘开放后变更，则所有的投注仍将被视为有效。</p><br />
                    <p><strong>1.4. 赛事进行时间</strong></p><br />
                    <p>1.4.1. 所显示的赛事进行时间仅供于参考。尽管赛事进行时间和所显示的有所差异，投注仍有可能被视为有效。</p><br />
                    <p>1.4.2. 在比赛伤停时间发生的任何情况都被视为在常规时间末时发生，例如一场足球比赛上半场伤停补时阶段的一个进球会被视为是在第45分钟时踢进的。</p><br />
                    <p><strong>1.5. 赛果</strong></p><br />
                    <p>1.5.1. 必要时，颁奖仪式的位次将被视为是正式赛果，不论之后是否出现取消或更改赛果的情况。如果没有颁奖仪式，赛果将会依据相关主管机构在赌盘结算时提供的官方结果而定，不论之后是否出现取消或更改赛果的情况。如果没有提供适用的官方结果，则将依据到赌盘结算时适用且已知的证据来确定赛果。</p><br />
                    <p>1.5.2. 赌盘通常会在一项赛事结束后不久尽快进行结算。完全出于服务客户的目的，一些赌盘可能会在正式结果公布之前结算。如果一个赌盘结算错误，本公司有权撤销结算。</p><br />
                    <p>1.5.3. 如果无法确定赛事结果，公司保留暂停任何赌盘结算的权利。</p><br />
                    <p>1.5.4. 对于已经结算的投注，自赛事开始时间起的72个小时后，如赛果有任何修正或变更，本公司不会予以承认。</p><br />
                    <p>1.5.5. 当官方赛果与本公司网站赛果版块公布的赛果之间有冲突时，应当通过参考本公司的有关赛事视频记录来确定正确的结果，以便解决冲突。然而，如果没有此类适用的视频记录，应当根据特定赛事的相关主管机构在其官方网站上公布的赛果确定正确的结果。如果该官方网站无法提供这一结果或者官方网站公布的赛果明显有错，则本公司有权做出决定/修正，以便确定最终的结果。在此方面，本公司的决定是最终和具有结束性的。</p><br />
                    <p><strong>1.6. 自动定时器接受功能</strong></p><br />
                    <p>1.6.1. 对于某些可由本公司确定的赛事，客户可以利用定时器接受功能进行投注，选择菜单上的"定时器接受"按钮即可。利用定时器接受功能所做的每次投注将有自己的倒计时，其持续时间将由本公司独家决定。在定时器倒数完毕时，若没有下文1.6.2节所述任何妨害的情况出现，投注将会被接受。</p><br />
                    <p>1.6.2. 如果在定时器倒数结束前发生任何本节所述的妨害情况，所有使用定时器接受功能所做投注都将立即被取消；</p><br />
                    <p>1.6.2.1. 如果很可能或确实领得一张红牌；</p><br />
                    <p>1.6.2.2. 如果可能或确实被判罚一个点球；</p><br />
                    <p>1.6.2.3. 如果任何球队可能入球或取得入球；</p><br />
                    <p>1.6.2.4. 偶发事件包括但不限于，影响正确地下注、接受投注、记录或通告投注的任何设备或通讯中断，操作或传输延误或中断，通讯线路故障等。</p><br />
                    <p>1.6.3. 在使用定时器接受功能时，客户承认本网站上提供的当前分数、所用时间及其它数据虽然是由第三方以直播形式提供，但仍会有时间延迟以及/或者可能不准确的情况，并且根据这些资料做任何投注时，客户应自行承担所有风险。本公司提供这些数据，并且不对客户因依赖这些数据而遭受的任何损失（直接或间接损失）负责。</p><br />
                </div>

                <h4 className="title2" id="43">2. 赌盘（投注类型）规则之一般规则？<a href="#top" className="ReturnTop">返回顶部</a> </h4>
                <div className="helpContent">
                    <p>2.1. 总则</p><br />
                    <p>2.1.1. 冠军投注</p><br />
                    <p>2.1.1.1. 冠军投注是指对一项赛事、比赛或锦标赛中的获胜者投注。</p><br />
                    <p>2.1.1.2. 冠军排名投注是指对参赛者在一项赛事、比赛或锦标赛中获得的指定名次投注。赌盘标题中将标明会赢得排名投注的数量。</p><br />
                    <p>2.1.1.3. 如果参赛者/球员没有出场参加赛事、比赛或锦标赛，则所有投注于该参赛者/球员的"优胜冠军/冠军"投注将作废，除非在特定的投注规则中另有说明。</p><br />
                    <p>2.1.1.4. 如果有有两名或以上的获胜者，或者任何冠军赌盘中宣布有"不分胜负"的情况，则彩金赔率（减去下注金额）将按获胜者的数量分配和结算，同时退还下注金额。</p><br />
                    <p>这有一个示例，客户询问如果英格兰超级联赛 – 最佳射手有2位，公司应如何计算彩金？</p>
                    <p>彩金将为：下注金额/赢家x（赔率 - 1）= 彩金（如果最佳射手超过2人=下注金额/（人数））</p><br />
                    <p>例如：</p>
                    <p>英格兰超级联赛 - 最佳射手</p>
                    <p>迪米塔•贝尔巴托夫（Dimitar Berbatov）1.40特维斯（Carlos Tevez）3.50<br />
                        如果我对迪米塔•贝尔巴托夫投注100，赔率为1.40<br />
                        如果最佳射手有2人<br />
                        我的彩金将为：=下注金额100/2 X(赔率- 1) = 20<br />
                        如果我对特维斯投注100，赔率为3.50<br />
                        如果最佳射手有2人<br />
                        那么我的彩金将为：=下注金额00/2 X(赔率- 1) =125<br />
                    </p><br />
                    <p>2.1.1.5. 术语"任何其他选手"（任何其他团队等）指所有未在赌盘中列名的参赛者。</p><br />
                    <p>2.1.2.胜负盘</p><br />
                    <p>2.1.2.1 胜负盘表示投注一方参赛者或团队会在一项赛事中击败另一方参赛者，或者在一项配对赛中排名较高。在《特定赛事投注规则》中列出了其余的胜负盘规则。</p><br />
                    <p>2.1.2.2 术语"出场阵容（The Field）"指除了胜负盘配对赛中提名的参赛者以外的所有参赛者。</p><br />
                    <p>2.1.3. 让球盘 (HDP) 和上半场让球盘 (FH HDP)</p><br />
                    <p>2.1.3.1.让球盘是指当一方参赛者或团队获得假定的预先让分（在赛事开始之前凭借该让分而有效领先）。获胜者为赛果加上该让分后得分更高的参赛者或团队。在《特定赛事投注规则》中列出了其余的让球盘规则。</p><br />
                    <p>2.1.3.2. 上半场让球盘是指投注于上半场将让分数加上实际比赛结果后，得分较高的参赛者或队伍即为赢家。</p><br />
                    <p>2.1.4. 大小盘和上半场大小盘</p><br />
                    <p>2.1.4.1. 大/小盘是指由一项赛事最终赛果的总分（入球数、得分情况等）来确定的投注。如果总分超过大/小盘预先指定的分数线，则投注"大盘"者为赢家；如果总分低于大/小盘预先指定的分数线，则投注"小盘"者为赢家。</p><br />
                    <p>2.1.4.2. 上半场大小盘是指投注结果由上半场赛事的总分来决定。如果总分大于"大小盘"预先指定的总分，则投注"大盘"的为赢家；如果总分小于"大小盘"预先指定的总分，则投注"小盘"的为赢家。</p><br />
                    <p>2.1.5. 单双盘 (OE) 和上半场单双盘 (FH OE)</p><br />
                    <p>2.1.5.1. 单/双盘是指由一项赛事最终赛果的总分（入球数、得分情况等）来确定的投注。</p><br />
                    <p>2.1.5.2. 上半场单双盘是指投注结果由上半场赛事的总分来决定。</p><br />
                    <p>2.1.5.3. 如果赛事在上半场结束之前中止，全部上半场的投注将视为无效。相反的，如果赛事在上半场结束之后中止，则全部上半场的投注将视为有效。</p><br />
                    <p>2.1.6. 单支团队单/双盘</p><br />
                    <p>2.1.6.1 单支团队单/双盘是指预测一支特定团队在一项赛事中全场得分为单数还是双数的投注。</p><br />
                    <p>2.1.6.2. 任何对此赛事的额外补时将不计入内，以便确定一支特定团队的全场得分。</p><br />
                    <p>2.1.7. 比赛半场/全场单/双盘</p><br />
                    <p>2.1.7.1. 比赛半场/全场单/双盘是指预测一项赛事半场和全场结果是为单数和单数，单数和双数，双数和单数，还是双数和双数。</p><br />
                    <p>2.1.7.2. 有四（4）种选择方案可供投注：<br />
                        *单数/单数<br />
                        *单数/双数<br />
                        *双数/单数<br />
                        *双数/双数
                    </p><br />
                    <p>2.1.7.3. 对于此种投注类型，为了确定一项赛事的全场结果，任何额外的补时将不会被计入。</p><br />
                    <p>2.1.8. 混合过关（Mix Parlays）</p><br />
                    <p>2.1.8.1. 混合过关是指对至少包含两种选择方案的组合进行投注。如果所有的选择方案都赢，则这一过关投注赢，并将获得按两种选择方案的组合赔率计算的彩金。如果一种（或以上）选择方案没有获胜，则该过关投注输。如果一种（或以上）选择方案延期，则该方案的赔率恢复为1.00。</p><br />
                    <p>2.1.8.2. 在现场混合过关投注期间，如果对选择方案的任何投注被拒绝，则这一过关投注将不会生效。</p><br />
                    <p>2.1.8.3. 有关更多详情，请参阅"混合过关"投注页面上的"说明"。</p><br />
                    <p>2.1.8.4. 三串四式（trixie）投注包含4项投注，涉及不同赛事的3种选择方案，3个双倍赔率和1个三倍赔率。任何两种选择方案获胜都能保证赢得彩金。如果您的选择方案中有任何两者获胜，双倍赔率之一能赢得彩金。如果您的选择方案中有任何三者获胜，则全部3个双倍赔率和1个三倍赔率将为您赢得彩金。如果一种（或以上）选择方案延期，则该方案的赔率恢复为1.00。</p><br />
                    <p>2.1.8.5. 四串一式（yankee）投注包含11项投注，涉及不同赛事的4种选择方案，6个双倍赔率和4个三倍赔率和1个四倍赔率。任何两种选择方案获胜都能保证赢得彩金。如果您的选择方案中有任何两者获胜，双倍赔率之一能赢得彩金。如果任何3个选择方案获胜，3个双倍赔率和1个四倍赔率能赢得彩金。如果全部4个选择方案获胜，所有6个双倍赔率，4个三倍赔率和1个四倍赔率能赢得彩金。如果一种（或以上）选择方案延期，则该方案的赔率恢复为1.00。</p><br />
                    <p>2.1.8.6. 五串二十六（Canadian）式投注包含26项投注，涉及不同赛事的5种选择方案，10个双倍赔率，10个三倍赔率，5个四倍赔率和1个五倍赔率。任何两种选择方案获胜都能保证赢得彩金。如果您的选择方案中有任何两者获胜，双倍赔率之一能赢得彩金。如果任何4个选择方案获胜，则6个双倍赔率，4个三倍赔率和1个四倍赔率能赢得彩金。如果全部5个选择方案获胜，则所有10个双倍赔率，10个三倍赔率，5个四倍赔率和1个五倍赔率能赢得彩金。如果一种（或以上）选择方案延期，则该方案的赔率恢复为1.00。</p><br />
                    <p>2.1.8.7. 六串五十七式（heinz）投注包含57项投注，涉及不同赛事的6种选择方案，15个双倍赔率，20个三倍赔率，15个四倍赔率，6个五倍赔率和1个六倍赔率。任何两种选择方案获胜都能保证赢得彩金。如果您的选择方案中有任何两者获胜，双倍赔率之一能赢得彩金。如果任何5个选择方案获胜，则所有10个双倍赔率，10个三倍赔率，5个四倍赔率和1个五倍赔率能赢得彩金。如果全部6个选择方案获胜，则所有15个双倍赔率，20个三倍赔率，15个四倍赔率，6个五倍赔率和1个六倍赔率能赢得彩金。如果一种（或以上）选择方案延期，则该方案的赔率恢复为1.00。</p><br />
                    <p>2.1.8.8. 超级六串五十七式（super heinz）投注包含120项投注，涉及不同赛事的7种选择方案，21个双倍赔率，35个三倍赔率，35个四倍赔率，21个五倍赔率，7个六倍赔率和1个七倍赔率。任何两种选择方案获胜都能保证赢得彩金。如果您的选择方案中有任何两者获胜，双倍赔率之一能赢得彩金。如果任何6个选择方案获胜，则所有15个双倍赔率，20个三倍赔率，15个四倍赔率，6个五倍赔率和1个六倍赔率能赢得彩金。如果全部7个选择方案获胜，则所有21个双倍赔率，35个三倍赔率，35个四倍赔率，21个五倍赔率，7个六倍赔率和1个七倍赔率能赢得彩金。如果一种（或以上）选择方案延期，则该方案的赔率恢复为1.00。</p><br />
                    <p>2.1.8.9. 八串二百四十七式（goliath）投注包含247项投注，涉及不同赛事的8种选择方案，28个双倍赔率，56个三倍赔率，70个四倍赔率，56个五倍赔率，28个六倍赔率，8个七倍赔率和1个八倍赔率。任何两种选择方案获胜都能保证赢得彩金。如果您的选择方案中有任何两者获胜，双倍赔率之一能赢得彩金。如果任何7个选择方案获胜，则所有21个双倍赔率，35个三倍赔率，35个四倍赔率，21个五倍赔率，7个六倍赔率和1个七倍赔率能赢得彩金。如果全部8种选择方案获胜，则所有的28个双倍赔率，56个三倍赔率，70个四倍赔率，56个五倍赔率，28个六倍赔率，8个七倍赔率和1个八倍赔率能赢得彩金。如果一个（或以上）选择方案延期，则该方案的赔率恢复为1.00。</p><br />
                    <p>2.1.8.10. 现场赛事投注不提供三串四（Trixie）、四串一（Yankee）、五串二十六（Canadian）、六串五十七（heinz）、超级六串五十七（Super Heinz）和八串二百四十七式（goliath）的选择方案。</p><br />
                    <p>2.1.8.11. 有关更多详情，请点击混合过关投注页面中投注菜单上的图标" "参看。</p><br />
                    <p>2.1.8.12. 混合过关/混合过关类型</p><br />
                    <p>2.1.8.12.1. 一般混合过关的定义为选择两个或两个以上单独的赛事进行投注，每个所选赛事必须赢，如第一个所选择赛事赢，所赢得的盈利和本金将作为第二个赛事的本金。直到最后一个赛事并赢得整个串关或遇到输的注单，有些混合过关单独组合是不同于寻常混合过关投注，请查看"混合过关类型"选项获得更多详情.</p><br />
                    <p>例如 :<br />
                        投注三串100USD 在以下赛事中：
                    </p><br />
                    <p>A =曼联 @ 1.80 <br />
                        B = 切尔西 @ 1.50 <br />
                        C = 阿森纳 @ 1.66<br />
                        如果所选三个赛事全赢，则赢得 $448.20. 计算步骤如下：<br />
                        A: 曼联 1.80 x $100 = 返回 $180.<br />
                        B: 切尔西 1.50 x $180 = 返回 $270.<br />
                        C: 阿森纳 1.66 x $270 =返回 $448.20.<br />
                    </p><br />
                    <p>2.1.8.12.2. 混合过关重点:<br />
                        所选赛事与体育规则需相符合<br />
                        并非所有的盘口都适合投注混合过关，如果您看到投注小票不能够组合（请查看以下混合过关详情），这就说明其中一个赛事是无法进行串关投注的。<br />
                        混合过关可以投注于体育赛事和早盘.<br />
                        如果有一场赛事取消作废，其赔率将会以1计算<br />
                    </p><br />
                    <p>2.1.8.12.3. 混合过关选择赛事混合过关投注，组合相同赛事投注方式或者不同的盘口，注单将不会被接受.
                    </p><br />
                    <p>例如: <br />
                        以下两串系统将不会接受：<br />
                        曼联 1x2 @ 赔率 1.80<br />
                        曼联 2-0比分珠仔 @ 赔率 7.0<br />
                        假如曼联 2-0, 组合赔率为 12.6. 但是赔率应该为 7.0 ，因为曼联赢 2-0, 将自动认为曼联已经以在1x2盘口赢<br />
                        混合过关选择相同队伍或球员，即使不同时间，但是系统也将不会接受注单<br />
                    </p><br />
                    <p>2.1.8.12.4. 混合过关</p><br />
                    <p>在一个混合过关中如有赛事作废或者取消（如以下例子），混合过关将依然结合，显示在提示选项中，如下 :<br />
                        A: 切西尔 (-0.5) – 切西尔赢<br />
                        B: 曼联 (-1) – 曼联赢 1-0.<br />
                        C: 阿森纳 (-0.5) – 阿森纳赢<br />
                        由于曼联以 1-0赢得让球 (-1) 香港盘, 此投注作废了，因此 "切尔西赢，此投注以1计算. "阿森纳赢" ，曼联赢的赔率计算最后赢利 <br />
                        例如 bagaimana 作废 dikalkulasikan:<br />
                        例如 1: 一场赛事作废:<br />

                    </p><br />
                    <table className="tab-TFinfo" cellPadding="0" cellSpacing="0" style={{border:'2'}}>
                        <tr className="tab-tr-red">
                            <td className="paddding10">选项</td>
                            <td style={{align:"center"}}>让球</td>
                            <td style={{align:"center"}}>赔率</td>
                            <td style={{align:"center"}}>赛果</td>
                            <td style={{align:"center"}}>结果</td>
                        </tr>
                        <tr className="tab-tr-red">
                            <td className="paddding10">切尔西 = A</td>
                            <td style={{align:"center"}}>(-0.5/1)</td>
                            <td style={{align:"center"}}>1.85</td>
                            <td style={{align:"center"}}>赢2-0</td>
                            <td style={{align:"center"}}>赢</td>
                        </tr>
                        <tr>
                            <td className="paddding10">曼联 = B</td>
                            <td style={{align:"center"}}>(-1)</td>
                            <td style={{align:"center"}}>1.95</td>
                            <td style={{align:"center"}}>赢 1-0</td>
                            <td style={{align:"center"}}>作废</td>
                        </tr>
                        <tr>
                            <td className="paddding10">阿森纳 = C</td>
                            <td style={{align:"center"}}>(-1/1.5)</td>
                            <td style={{align:"center"}}>2.05</td>
                            <td style={{align:"center"}}>赢 3-0</td>
                            <td style={{align:"center"}}>赢</td>
                        </tr>
                    </table>
                    <p>投注额: $100 三串</p><br />
                    <p>计算方法如下:</p><br />
                    <p>A x 1 x C x 投注额 = 1.85 x 1 x 2.05 x 100= $379.25, 减去$100 = 盈利为 $279.25</p><br />
                    <p>A: 赢 - $100 x 1.85 = 返回 $185.<br />
                        B: 作废 - $185 x 1 = $185.<br />
                        C: 赢 - $185 x 2.05 = 返回 $379.25<br />
                        盈利：$379.25 – $100 = $279.25.<br />
                    </p><br />
                    <p>例如 2: 所选赛事半赢半平:</p><br />
                    <table className="tab-TFinfo" cellPadding="0" cellSpacing="0" style={{border:'2'}}>
                        <tr className="tab-tr-red">
                            <td className="paddding10">选项</td>
                            <td style={{align:"center"}}>让球</td>
                            <td style={{align:"center"}}>赔率</td>
                            <td style={{align:"center"}}>赛果</td>
                            <td style={{align:"center"}}>结果</td>
                        </tr>
                        <tr className="tab-tr-red">
                            <td className="paddding10">切尔西 = A</td>
                            <td style={{align:"center"}}>(-0.5/1)</td>
                            <td style={{align:"center"}}>1.85</td>
                            <td style={{align:"center"}}>赢1-0</td>
                            <td style={{align:"center"}}>赢半平半</td>
                        </tr>
                        <tr>
                            <td className="paddding10">曼联 = B</td>
                            <td style={{align:"center"}}>(-1)</td>
                            <td style={{align:"center"}}>1.95</td>
                            <td style={{align:"center"}}>赢 1-0</td>
                            <td style={{align:"center"}}>赢</td>
                        </tr>
                        <tr>
                            <td className="paddding10">阿森纳 = C</td>
                            <td style={{align:"center"}}>(-1/1.5)</td>
                            <td style={{align:"center"}}>2.05</td>
                            <td style={{align:"center"}}>赢 3-0</td>
                            <td style={{align:"center"}}>赢</td>
                        </tr>
                    </table>
                    <p>投注额: $100 三串</p><br />
                    <p>计算方法如下:</p><br />
                    <p>[1 + 0.85/2] x B x C x 投注额 = [1 + 0.5 x 0.85] x 1.95 x 2.05 x $100 = $569.64, 减去$100 = 盈利为 $469.64</p><br />
                    <p>A: 赢半平半 – 投注额的一半金额赢，一半金额是退款<br />
                        盈利部分为 $50 x 1.85 = $92.50<br />
                        平局部分为 $50 x 1 = $50<br />
                        返回 $92.50 + $50 = $142.50.<br />
                    </p><br />
                    <p>B: 赢 - $142.50 x 1.95 = $277.87.<br />
                        C: 赢 - $277.87 x 2.05 = 返回 $569.64<br />
                        盈利为: $569.64 – $100 = $469.64.<br />
                    </p><br />
                    <p>例如 3: 输半平半:</p><br />
                    <table className="tab-TFinfo" cellPadding="0" cellSpacing="0" style={{border:'2'}}>
                        <tr className="tab-tr-red">
                            <td className="paddding10">选项</td>
                            <td style={{align:"center"}}>让球</td>
                            <td style={{align:"center"}}>赔率</td>
                            <td style={{align:"center"}}>赛果</td>
                            <td style={{align:"center"}}>结果</td>
                        </tr>
                        <tr className="tab-tr-red">
                            <td className="paddding10">切尔西 = A</td>
                            <td style={{align:"center"}}>(-0.5/1)</td>
                            <td style={{align:"center"}}>1.85</td>
                            <td style={{align:"center"}}>赢2-0</td>
                            <td style={{align:"center"}}>赢</td>
                        </tr>
                        <tr>
                            <td className="paddding10">曼联 = B</td>
                            <td style={{align:"center"}}>(-1)</td>
                            <td style={{align:"center"}}>1.95</td>
                            <td style={{align:"center"}}>赢 2-0</td>
                            <td style={{align:"center"}}>赢</td>
                        </tr>
                        <tr>
                            <td className="paddding10">阿森纳 = C</td>
                            <td style={{align:"center"}}>(-1/1.5)</td>
                            <td style={{align:"center"}}>2.05</td>
                            <td style={{align:"center"}}>赢 1-0</td>
                            <td style={{align:"center"}}>赢半平半</td>
                        </tr>
                    </table>
                    <p>投注额: $100 三串</p><br />
                    <p>计算方法如下:</p><br />
                    <p>A x B x C x 投注额 = 1.85 x 1.95 x 0.5 x $100 = $180.38, 减去$100 = 盈利 $80.38</p><br />
                    <p>A: 赢 - $100 x 1.85 = $185 = 返回 $185.<br />
                        B: 赢 - $185 x 1.95 = $360.75.<br />
                        C: 输半平板 - $360.75 x 0.5 = $180.38 或 $360.75/2 = $180.38<br />
                        输半: $180.38<br />
                        平半: $180.38 x 1 = $180.38<br />
                        返回 $180.38<br />
                        盈利: = $180.38 – $100 = $80.38.<br />
                    </p><br />
                    <p>2.1.8.12.5 混合过关类型<br />
                        这是{appName}为您提供的多类型投注方式. 以下是投注组合类型表格.
                    </p>
                    <p style={{align:"left"}}><strong>混合过关类型</strong></p>
                    <table width="422" style={{border:"0"}} cellPadding="0" cellSpacing="1">
                        <tr>
                            <td><br />
                                <strong>所选赛事数目 </strong></td>
                            <td><p style={{align:"center"}}><strong>总共投注数 </strong></p></td>
                            <td><p style={{align:"center"}}><strong>两串 </strong></p></td>
                            <td><p style={{align:"center"}}><strong>3 </strong><strong>串 </strong></p></td>
                            <td><p style={{align:"center"}}><strong>4 </strong><strong>串 </strong></p></td>
                            <td><p style={{align:"center"}}><strong>5 </strong><strong>串 </strong></p></td>
                            <td><p style={{align:"center"}}><strong>6 </strong><strong>串 </strong></p></td>
                            <td><p style={{align:"center"}}><strong>7 </strong><strong>串 </strong></p></td>
                            <td><p style={{align:"center"}}><strong>8 </strong><strong>串 </strong></p></td>
                        </tr>
                        <tr>
                            <td><p style={{align:"center"}}>2</p></td>
                            <td><p style={{align:"center"}}>1</p></td>
                            <td><p style={{align:"center"}}>1</p></td>
                            <td><p style={{align:"center"}}> </p></td>
                            <td><p style={{align:"center"}}> </p></td>
                            <td><p style={{align:"center"}}> </p></td>
                            <td><p style={{align:"center"}}> </p></td>
                            <td><p style={{align:"center"}}> </p></td>
                            <td><p style={{align:"center"}}> </p></td>
                        </tr>
                        <tr>
                            <td><p style={{align:"center"}}>3</p></td>
                            <td><p style={{align:"center"}}>4</p></td>
                            <td><p style={{align:"center"}}>3</p></td>
                            <td><p style={{align:"center"}}>1</p></td>
                            <td><p style={{align:"center"}}> </p></td>
                            <td><p style={{align:"center"}}> </p></td>
                            <td><p style={{align:"center"}}> </p></td>
                            <td><p style={{align:"center"}}> </p></td>
                            <td><p style={{align:"center"}}> </p></td>
                        </tr>
                        <tr>
                            <td><p style={{align:"center"}}>4</p></td>
                            <td><p style={{align:"center"}}>11</p></td>
                            <td><p style={{align:"center"}}>6</p></td>
                            <td><p style={{align:"center"}}>4</p></td>
                            <td><p style={{align:"center"}}>1</p></td>
                            <td><p style={{align:"center"}}> </p></td>
                            <td><p style={{align:"center"}}> </p></td>
                            <td><p style={{align:"center"}}> </p></td>
                            <td><p style={{align:"center"}}> </p></td>
                        </tr>
                        <tr>
                            <td><p style={{align:"center"}}>5</p></td>
                            <td><p style={{align:"center"}}>26</p></td>
                            <td><p style={{align:"center"}}>10</p></td>
                            <td><p style={{align:"center"}}>10</p></td>
                            <td><p style={{align:"center"}}>5</p></td>
                            <td><p style={{align:"center"}}>1</p></td>
                            <td><p style={{align:"center"}}> </p></td>
                            <td><p style={{align:"center"}}> </p></td>
                            <td><p style={{align:"center"}}> </p></td>
                        </tr>
                        <tr>
                            <td><p style={{align:"center"}}>6</p></td>
                            <td><p style={{align:"center"}}>57</p></td>
                            <td><p style={{align:"center"}}>15</p></td>
                            <td><p style={{align:"center"}}>20</p></td>
                            <td><p style={{align:"center"}}>15</p></td>
                            <td><p style={{align:"center"}}>6</p></td>
                            <td><p style={{align:"center"}}>1</p></td>
                            <td><p style={{align:"center"}}> </p></td>
                            <td><p style={{align:"center"}}> </p></td>
                        </tr>
                        <tr>
                            <td><p style={{align:"center"}}>7</p></td>
                            <td><p style={{align:"center"}}>134</p></td>
                            <td><p style={{align:"center"}}>35</p></td>
                            <td><p style={{align:"center"}}>35</p></td>
                            <td><p style={{align:"center"}}>35</p></td>
                            <td><p style={{align:"center"}}>21</p></td>
                            <td><p style={{align:"center"}}>7</p></td>
                            <td><p style={{align:"center"}}>1</p></td>
                            <td><p style={{align:"center"}}> </p></td>
                        </tr>
                        <tr>
                            <td><p style={{align:"center"}}>8</p></td>
                            <td><p style={{align:"center"}}>275</p></td>
                            <td><p style={{align:"center"}}>56</p></td>
                            <td><p style={{align:"center"}}>56</p></td>
                            <td><p style={{align:"center"}}>70</p></td>
                            <td><p style={{align:"center"}}>56</p></td>
                            <td><p style={{align:"center"}}>28</p></td>
                            <td><p style={{align:"center"}}>8</p></td>
                            <td><p style={{align:"center"}}>1</p></td>
                        </tr>
                    </table>
                    <p> </p>
                    <p style={{align:"left"}}><strong>2.1.8.12.6</strong> 混合过关相关联投注:<br />
                        <br />
                        以下是混合过关组合的定义：<br />
                        <br />
                        2串是指任意2个赛事赢，2串为一注<br />
                        3串是指任意3个赛事赢，3串为一注<br />
                        4串是指任意4个赛事赢，4串为一注<br />
                        5串是指任意5个赛事赢，5串为一注<br />
                        6串是指任意6个赛事赢，6串为一注<br />
                        7串是指任意7个赛事赢，7串为一注<br />
                        8串是指任意8个赛事赢，8串为一注<br />
                        <br />
                        这样可以确保如有一场赛事为输，其他几串也可以赢<br />
                        <br />
                        <strong>例如</strong><strong> 1</strong>: 投注100元于3串 </p>
                    <table style={{border:"0"}} cellSpacing="1" cellPadding="0">
                        <tr>
                            <td><br />
                                <strong>选项 </strong></td>
                            <td><p style={{align:"center"}}><strong>让球 </strong></p></td>
                            <td><p style={{align:"center"}}><strong>赔率 </strong></p></td>
                            <td><p style={{align:"center"}}><strong>赛果 </strong></p></td>
                            <td><p style={{align:"center"}}><strong>结果 </strong></p></td>
                        </tr>
                        <tr>
                            <td><p style={{align:"center"}}>切尔西 = A</p></td>
                            <td><p style={{align:"center"}}>(-0.5/1)</p></td>
                            <td><p style={{align:"center"}}>1.85</p></td>
                            <td><p style={{align:"center"}}>赢 2-0</p></td>
                            <td><p style={{align:"center"}}>赢 </p></td>
                        </tr>
                        <tr>
                            <td><p style={{align:"center"}}>曼联 = B</p></td>
                            <td><p style={{align:"center"}}>(-1)</p></td>
                            <td><p style={{align:"center"}}>1.95</p></td>
                            <td><p style={{align:"center"}}>赢 2-0</p></td>
                            <td><p style={{align:"center"}}>赢 </p></td>
                        </tr>
                        <tr>
                            <td><p style={{align:"center"}}><strong>阿森纳 = C</strong></p></td>
                            <td><p style={{align:"center"}}><strong>(-1/1.5)</strong></p></td>
                            <td><p style={{align:"center"}}><strong>2.05</strong></p></td>
                            <td><p style={{align:"center"}}><strong>赢 1-0</strong></p></td>
                            <td><p style={{align:"center"}}><strong>赢半平半</strong></p></td>
                        </tr>
                    </table>
                    <p style={{align:"left"}}><br />
                        <br />
                        计算方法如下:<br />
                        <br />
                        <strong>总投注</strong><strong>300</strong><strong>，每场投注</strong><strong>100<br />
                            <br />
                            A x B x </strong><strong>投注额</strong><strong> = 1.85 x 1.95 x $100 = </strong><strong>返回</strong><strong> $360.75.<br />
                            A x C x </strong><strong>投注额</strong><strong> = 1.85 x 2.05 x $100 =</strong><strong>返回</strong><strong> $379.25.<br />
                            B x C x </strong><strong>投注额</strong><strong> = 1.95 x 2.05 x $100 = </strong><strong>返回</strong><strong> $399.75.<br />
                            <br />
                        </strong><strong>盈利</strong><strong>: $379.25 + $360.75 +$399.75 - 300 = $839.75.<br />
                            <br />
                        </strong><strong>例如</strong><strong> 2</strong>: 投注100元于三串，4场赛事<br />
                        <br />
                        选择赛事其中一个为输 </p>
                    <table style={{border:"0"}} cellSpacing="1" cellPadding="0">
                        <tr>
                            <td><br />
                                <strong>选项 </strong></td>
                            <td><p style={{align:"center"}}><strong>让球 </strong></p></td>
                            <td><p style={{align:"center"}}><strong>赔率 </strong></p></td>
                            <td><p style={{align:"center"}}><strong>赛果 </strong></p></td>
                            <td><p style={{align:"center"}}><strong>结果 </strong></p></td>
                        </tr>
                        <tr>
                            <td><p style={{align:"center"}}>切尔西 = A</p></td>
                            <td><p style={{align:"center"}}>(-0.5/1)</p></td>
                            <td><p style={{align:"center"}}>1.85</p></td>
                            <td><p style={{align:"center"}}>赢 2-0</p></td>
                            <td><p style={{align:"center"}}>赢 </p></td>
                        </tr>
                        <tr>
                            <td><p style={{align:"center"}}>曼联 = B</p></td>
                            <td><p style={{align:"center"}}>(-1)</p></td>
                            <td><p style={{align:"center"}}>1.95</p></td>
                            <td><p style={{align:"center"}}>赢 2-0</p></td>
                            <td><p style={{align:"center"}}>赢 </p></td>
                        </tr>
                        <tr>
                            <td><p style={{align:"center"}}>阿森纳 = C</p></td>
                            <td><p style={{align:"center"}}>(-1/1.5)</p></td>
                            <td><p style={{align:"center"}}>2.05</p></td>
                            <td><p style={{align:"center"}}>赢 3-0</p></td>
                            <td><p style={{align:"center"}}>赢 </p></td>
                        </tr>
                        <tr>
                            <td><p style={{align:"center"}}><strong>阿森纳 = C</strong></p></td>
                            <td><p style={{align:"center"}}><strong>(-1/1.5)</strong></p></td>
                            <td><p style={{align:"center"}}><strong>2.05</strong></p></td>
                            <td><p style={{align:"center"}}><strong>赢 1-0</strong></p></td>
                            <td><p style={{align:"center"}}><strong>赢半平半</strong></p></td>
                        </tr>
                    </table>
                    <p style={{align:"left"}}><br />
                        <br />
                        计算方法如下:<br />
                        <br />
                        总投注400，每场投注100<br />
                        <br />
                        A x B x C x 投注额 = 1.85 x 1.95 x 2.05 x $100 = 返回 $739.54<br />
                        A x B x D x 投注额 = 1.85 x 1.95 x 0 x $100 = 返回 $0<br />
                        B x C x D x 投注额 = 1.95 x 2.05 x 0 x $100 = 返回 $0<br />
                        A x C x D x 投注额 = 1.95 x 2.05 x 0 x $100 = 返回 $0<br />
                        <br />
                        盈利: $739.54 + $0 + $0 + $0 - 400 = $339.54<br />
                        <br />
                        <strong>2.1.8.13</strong> Question Mark Feature</p>
                    <p><strong>2.1.8.13.1.</strong> 两串<br />
                        <br />
                        两串定义为投注于两个赛事的组合，无论选择多少场赛事进行串关. 两串适用于最低投注两场赛事的混合过关. 总投注额投注等于投注额乘以相应组合数.<br />
                        <br />
                        例如 :<br />
                        混合过关选择3场赛事 A,B, & C.如玩家投注 2 USD 两串，, 总共组合有 AB, AC, 和 BC (3个组合数).<br />
                        总共投注额为：2 x 3 = 6 USD<br />
                        <br />
                        <strong>2.1.8.13.2.</strong> 三串<br />
                        <br />
                        三串定义为投注于三个赛事的组合，无论选择多少场赛事进行串关.<br />
                        两串适用于最低投注两场赛事的混合过关.<br />
                        总投注额投注等于投注额乘以相应组合数.<br />
                        <br />
                        例如 :<br />
                        混合过关选择赛事 A,B,C & D. 如玩家投注 2 USD 三串, 意味着玩家总共投注 ABC, ABD, ACD, 和 BCD (4个组合数).<br />
                        总投注额为 : 2 x 4 = 8 USD<br />
                        <strong>2.1.8.13.3</strong>. 4 串<br />
                        <br />
                        4串定义为投注于4个赛事的组合，无论选择多少场赛事进行串关.<br />
                        4串适用于最低投注4场赛事的混合过关.<br />
                        总投注额投注等于投注额乘以相应组合数.<br />
                        <br />
                        例如 :<br />
                        混合过关选择赛事A,B,C,D & E.如玩家投注 2 USD 在4串, 总共有组合为 ABCD, ABCE, ABDE, ACDE, 和 BCDE (总共5个组合).<br />
                        总投注额为 : 2 x 5 = 10 USD<br />
                        <br />
                        <strong>2.1.8.13.4.</strong> 5 串<br />
                        <br />
                        5串定义为投注于5个赛事的组合，无论选择多少场赛事进行串关.<br />
                        5串适用于最低投注5场赛事的混合过关.<br />
                        总投注额投注等于投注额乘以相应组合数.<br />
                        <br />
                        例如 :<br />
                        混合过关选择赛事 A,B,C,D,E & F.如玩家投注2 USD 在5串, 总共有ABCDE, ABCDF, ABCEF, ABDEF, ACDEF, 和 BCDEF (6个组合).<br />
                        总投注额为 : 2 x 6 = 12 USD<br />
                        <br />
                        <strong>2.1.8.13.5.</strong> 6 串<br />
                        <br />
                        6串定义为投注于6个赛事的组合，无论选择多少场赛事进行串关.<br />
                        6串适用于最低投注6场赛事的混合过关.<br />
                        总投注额投注等于投注额乘以相应组合数.<br />
                        <br />
                        例如 :<br />
                        混合过关选择赛事A,B,C,D,E & F. 如玩家投注2 USD 在6串, 总共有 ABCDEF (1个组合).<br />
                        总投注额为 : 2 x 1 = 2 USD <br />
                        <br />
                        <strong>2.1.8.13.6.</strong> 7 串<br />
                        <br />
                        7串定义为投注于7个赛事的组合，无论选择多少场赛事进行串关.<br />
                        7串适用于最低投注7场赛事的混合过关.<br />
                        总投注额投注等于投注额乘以相应组合数.<br />
                        <br />
                        例如 :<br />
                        混合过关选择赛事 A,B,C,D,E,F, & G. 如玩家投注 2 USD 在7串, 总共有ABCDEFG (1个组合).<br />
                        总投注额为 : 2 x 1 = 2 USD .<br />
                        <br />
                        <strong>2.1.8.13.7.</strong> 8 串<br />
                        <br />
                        8串定义为投注于8个赛事的组合，无论选择多少场赛事进行串关.<br />
                        8串适用于最低投注8场赛事的混合过关.<br />
                        总投注额投注等于投注额乘以相应组合数.<br />
                        <br />
                        例如 :<br />
                        混合过关选择赛事 A,B,C,D,E,F,G, & H.如玩家投注2 USD 在8串, 有 ABCDEFGH (1个组合).<br />
                        总投注额为 : 2 x 1 = 2 USD.</p>
                    <p> </p>
                    <p style={{align:"left"}}><strong>2.2. </strong><strong>足球投注类型</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>2.2.1.</strong> 除非另有说明，足球投注类型的成绩是指在常规比赛时间（包括裁判判决的伤停补时）结束时的得分。加时赛不计入内。<br />
                        <br />
                        <strong>2.2.2.</strong> 1X2<br />
                        <strong>2.2.2.1.</strong> 1X2指对一项赛事三种可能的获胜结果之一下注。 1代表首先被提及的球队（通常是主场球队）；X代表比赛结果打平或为平局；2代表第二个被提及的球队（通常是客场球队）。 <br />
                        <br />
                        <strong>2.2.3.</strong> 波胆 <br />
                        <strong>2.2.3.1.</strong> 波胆表示投注预测全场比赛时间结束时的最终得分。<br />
                        <br />
                        <strong>2.2.3.2.</strong> 波胆投注赢“5-0UP”（或0-5UP）表示所选球队必须净赢五（5）球或以上。<br />
                        <br />
                        示例：<br />
                        主队<br />
                        投注5-0UP的结果 – 5:1, 6:2等(输) / 5:0, 6:1等(赢)<br />
                        客队<br />
                        投注5-0UP的结果 – 1:5, 2:6等(输) / 0:5, 1:6等(赢)<br />
                        <br />
                        <strong>2.2.3.3</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.4.</strong> 总进球数和上半场总进球数 <br />
                        <strong>2.2.4.1.</strong> 总进球是指由一项赛事的进球总数来决定投注结果。<br />
                        <br />
                        <strong>2.2.4.2.</strong> 上半场总进球数是指由上半场赛事中的总进球数决定投注结果。<br />
                        <br />
                        <strong>2.2.4.3.</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.5.</strong> 半场/全场（HT、FT） <br />
                        <strong>2.2.5.1.</strong> 半场/全场表示投注预测一项赛事的半场赛果和全场赛果（加时赛不计入内）。下列与本赌盘有关的字母含义：H指首先被提及的球队（通常是主场球队）；D指平手；A指第二个被提及的球队（通常是客场球队）。<br />
                        <br />
                        <strong>2.2.5.2.</strong> 示例 – HA表示首先被提及的球队（主队）半场会领先，第二个被提及的球队（客队）的全场得分会领先。 <br />
                        <br />
                        <strong>2.2.6.</strong> 最先进球/最后进球和上半场最先进球/最后进球 <br />
                        <strong>2.2.6.1.</strong> 最先进球/最后进球表示投注哪支队伍在一场比赛中会首先进球和最后进球。关于本赌盘，下列字母代表：HF指首先被提及的队伍（通常是主队）率先进球。 HL指首先被提及的队伍射进最后一球。 AF指第二个被提及的球队（通常是客队）率先进球。 AL指第二个被提及的队伍射进最后一球。 NG指赛事期间没有进球。<br />
                        <br />
                        <strong>2.2.6.2.</strong> 上半场最先进球/最后进球是指投注哪个队伍会在上半场比赛中率先进球或射进最后一球。下面介绍与此赌盘相关的意义：HF 表示首先被提及的队伍（通常是主队）会率先进球。 HL 表示首先被提及的队伍会射进最后一球。 AF 表示第二个被提及的队伍（通常是客队）会率先进球。 AL 表示第二个被提及的队伍会射进最后一球。 NG 表示赛事中没有队伍射门得分。<br />
                        <br />
                        <strong>2.2.6.3.</strong> 乌龙球计入进球队伍的得分。<br />
                        <br />
                        <strong>2.2.6.4.</strong> 如果在一次进球后一项赛事中止，则所有对最先进球（以及无进球）的投注仍有效，但对最后进球的投注将无效。如果一项赛事在没有进球的情况下中止，则所有对最先进球、最后进球和无进球的投注将无效。 <br />
                        <br />
                        <strong>2.2.7.</strong> 开球队伍 <br />
                        <strong>2.2.7.1.</strong> 开球队伍表示对赛事中开球的队伍投注。<br />
                        <br />
                        <strong>2.2.7.2.</strong> 如果开球后一项赛事中止，则所有投注仍然有效。 <br />
                        <br />
                        <strong>2.2.8.</strong> 主队总进球比客队总进球 <br />
                        <strong>2.2.8.1.</strong> 主队总进球比客队总进球表示在特定日进行的特定联盟赛事中，主队总进球数与客队总进球数的对比结果<br />
                        <br />
                        <strong>2.2.8.2.</strong> 主队指首先被提及的队伍，客队指第二个被提及的队伍。<br />
                        <br />
                        <strong>2.2.8.3.</strong> 如果一场（以上）的赛事延期或中止，则投注无效。 <br />
                        <br />
                        <strong>2.2.9.</strong> 单队大小盘和单队上半场大小盘 <br />
                        <strong>2.2.9.1.</strong> 单支队伍大/小盘表示特定球队在一场比赛中的进球数。<br />
                        <br />
                        <strong>2.2.9.2.</strong> 单队上半场大盘/小盘是指投注预测特定队伍在该场上半场赛事中的得分。<br />
                        <br />
                        <strong>2.2.9.3.</strong> 如果总进球数大于“大小盘”预先指定的总进球数，则投注“大盘”的为赢家；如果总进球数少于“大小盘”预先指定的总进球数，则投注“小盘”的为赢家。 <br />
                        <br />
                        <strong>2.2.10.</strong> 角球 <br />
                        <strong>2.2.10.1.</strong> 判罚后未开出的角球不计入内。<br />
                        <br />
                        <strong>2.2.10.2.</strong> 角球数 <br />
                        <strong>2.2.10.2.1.</strong> 让球和上半场让球 <br />
                        <strong>2.2.10.2.1.1.</strong> 让球指投注哪支队伍在一场比赛中角球数最多，包括任何让球数。<br />
                        <br />
                        <strong>2.2.10.2.1.2.</strong> 上半场让球是指投注上半场比赛中角球数最多的队伍，包含任何让球数。<br />
                        <br />
                        <strong>2.2.10.2.1.3.</strong> 如果赛事在上半场期间中止，全部上半场让球的投注将视为无效。相反的，如果赛事在下半场期间中止，则全部上半场让球的投注将视为有效。 <br />
                        <br />
                        <strong>2.2.10.2.2.</strong> 大小盘和上半场大小盘 <br />
                        <strong>2.2.10.2.2.1.</strong> 大/小盘是指投注一场比赛中两支队伍总共开出的角球数。<br />
                        <br />
                        <strong>2.2.10.2.2.2.</strong> 上半场大小盘是指投注上半场比赛中双方所开出角球的总数。<br />
                        <br />
                        <strong>2.2.10.2.2.3.</strong> 如果总角球数大于“大小盘”预先指定的总角球数，则投注“大盘”的为赢家；如果总角球数少于“大小盘”预先指定的总角球数，则投注“小盘”的为赢家。<br />
                        <br />
                        <strong>2.2.10.2.2.4.</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.10.3.</strong> 第一个角球和下半场第一个角球 <br />
                        <strong>2.2.10.3.1.</strong> 第一个角球是指投注比赛中获得第一个角球的队伍。<br />
                        <br />
                        <strong>2.2.10.3.2.</strong> 下半场第一个角球是指投注下半场比赛中获得第一个角球的队伍。<br />
                        <br />
                        <strong>2.2.10.3.3. </strong>如果在开出第一个角球后赛事中止，所有投注仍有效。如果在开出第一个角球前赛事中止，所有投注均作废。 <br />
                        <br />
                        <strong>2.2.10.4.</strong> 最后一个角球 <br />
                        <strong>2.2.10.4.1.</strong> 最后一个角球表示投注一场比赛中哪支队伍会发出最后一个角球。<br />
                        <br />
                        <strong>2.2.10.4.2.</strong> 如果赛事中止，则所有投注都无效。 <br />
                        <br />
                        <strong>2.2.10.5.</strong> 下一个角球 <br />
                        <strong>2.2.10.5.1.</strong> 下一个角球表示投注一场比赛中哪支队伍会发出下一个角球。<br />
                        <br />
                        <strong>2.2.10.5.2.</strong> 如果下注指定的角球已经开出，所有投注会被视为有效。 <br />
                        <br />
                        <strong>2.2.11.</strong> 罚牌总数 <br />
                        <strong>2.2.11.1.</strong> 一张黄牌计一点，一张红牌计两点。一场比赛中一位球员的最高点数为三点（黄牌一点，红牌两点，第二张黄牌不计入内）。<br />
                        <br />
                        <strong>2.2.11.2.</strong> 非上场球员（经理、教练、替补球员）收到的罚牌不计入内。<br />
                        <br />
                        <strong>2.2.11.3.</strong> 总罚牌数 <br />
                        <strong>2.2.11.3.1.</strong> 让分和上半场让分 <br />
                        <strong>2.2.11.3.1.1.</strong> 让球指投注哪支队伍在一场比赛中收到的罚牌数最多，包括任何让分数。<br />
                        <br />
                        <strong>2.2.11.3.1.2.</strong> 上半场让分是指投注上半场比赛中收到最多罚牌的队伍，包含任何让分。<br />
                        <br />
                        <strong>2.2.11.3.1.3.</strong> 如果赛事在上半场期间中止，全部上半场让分的投注将视为无效。相反的，如果赛事在下半场期间中止，则全部上半场让分的投注将视为有效。 <br />
                        <br />
                        <strong>2.2.11.3.2.</strong> 大小盘和上半场大小盘 <br />
                        <strong>2.2.11.3.2.1.</strong> 大/小盘是指投注一场比赛中两支队伍总共收到的罚牌数。<br />
                        <br />
                        <strong>2.2.11.3.2.2.</strong> 上半场大小盘是指投注上半场比赛中两队收到的罚牌总数。<br />
                        <br />
                        <strong>2.2.11.3.2.3.</strong> 如果总罚牌数大于“大小盘”预先指定的总罚牌数，则投注“大盘”的为赢家；如果总罚牌数少于“大小盘”预先指定的总罚牌数，则投注“小盘”的为赢家。<br />
                        <br />
                        <strong>2.2.11.3.2.4.</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.11.4.</strong> 第一张罚牌和下半场第一张罚牌 <br />
                        <strong>2.2.11.4.1.</strong> 第一张罚牌是指投注在一场比赛中哪支球队会收到第一张罚牌（黄牌或红牌）。<br />
                        <br />
                        <strong>2.2.11.4.2.</strong> 下半场第一张罚牌是指投注下半场比赛中收到第一张罚牌 (黄牌或红牌) 的队伍。<br />
                        <br />
                        <strong>2.2.11.4.3.</strong> 若两名以上的球员因为同一个事件收到罚牌，则以裁判首先亮牌的球员为赢家。<br />
                        <br />
                        <strong>2.2.11.4.4. </strong>若在第一张罚牌发出后赛事中止，所有投注仍有效。若在第一张罚牌发出前赛事中止，所有投注皆作废。 <br />
                        <br />
                        <strong>2.2.11.5.</strong> 最后一张罚牌 <br />
                        <strong>2.2.11.5.1.</strong> 最后一张罚牌是指投注在一场比赛中哪支球队会收到最后一张罚牌（黄牌或红牌）。<br />
                        <br />
                        <strong>2.2.11.5.2.</strong> 如果两名或以上球员因为同一事件收到罚牌，则最后被裁判亮牌的球员将被视为赢方。<br />
                        <br />
                        <strong>2.2.11.5.3.</strong> 如果赛事中止，则所有投注都无效。 <br />
                        <br />
                        <br />
                        <strong>2.2.11.6.</strong> 下一张罚牌 <br />
                        <strong>2.2.11.6.1.</strong> 下一张罚牌是指投注预测取得下一张罚牌 (黄牌或红牌) 的队伍。<br />
                        <br />
                        <strong>2.2.11.6.2.</strong> 如果投注的罚牌已经发出，注单将视为有效。 <br />
                        <br />
                        <strong>2.2.12.</strong> 越位 <br />
                        <strong>2.2.12.1.</strong> 越位次数 <br />
                        <strong>2.2.12.1.1.</strong> 让分和上半场让分 <br />
                        <strong>2.2.12.1.1.1.</strong> 让分指投注哪支队伍在一场比赛中越位次数最多，包括任何让分数。<br />
                        <br />
                        <strong>2.2.12.1.1.2.</strong> 上半场让分是指投注上半场比赛中越位次数最多的队伍，包含任何让分。<br />
                        <br />
                        <strong>2.2.12.1.1.3.</strong> 如果赛事在上半场期间中止，全部上半场让分的投注将视为无效。相反的，如果赛事在下半场期间中止，则全部上半场让分的投注将视为有效。 <br />
                        <br />
                        <strong>2.2.12.1.2.</strong> 大小盘和上半场大小盘 <br />
                        <strong>2.2.12.1.2.1.</strong> 大/小盘是指投注一场比赛中被判决的总越位次数。<br />
                        <br />
                        <strong>2.2.12.1.2.2.</strong> 上半场大于/小于是指投注上半场比赛中越位判罚的总数。<br />
                        <br />
                        <strong>2.2.12.1.2.3.</strong> 如果总越位次数大于“大小盘”预先指定的总越位次数，则投注“大盘”的为赢家；如果总越位次数少于“大小盘”预先指定的总越位次数，则投注“小盘”的为赢家。<br />
                        <br />
                        <strong>2.2.12.1.2.4.</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.12.2.</strong> 第一次越位和下半场第一次越位 <br />
                        <strong>2.2.12.2.1.</strong> 第一次越位表示投注一场比赛中哪支队伍会发生第一次越位。<br />
                        <br />
                        <strong>2.2.12.2.2.</strong> 下半场第一次越位是指投注下半场最先被判越位的队伍。<br />
                        <br />
                        <strong>2.2.12.2.3.</strong> 如果在第一次越位判罚后赛事中止，所有投注均有效。如果在第一次越位判罚前赛事中止，所有投注均作废。 <br />
                        <br />
                        <strong>2.2.12.3.</strong> 最后一次越位 <br />
                        <strong>2.2.12.3.1.</strong> 最后一次越位表示投注一场比赛中哪支队伍会发生最后一次越位。<br />
                        <br />
                        <strong>2.2.12.3.2.</strong> 如果赛事中止，则所有投注都无效。 <br />
                        <br />
                        <strong>2.2.12.4.</strong> 下一次越位 <br />
                        <strong>2.2.12.4.1.</strong> 下一次越位是指投注预测下一个被判越位的队伍。<br />
                        <br />
                        <strong>2.2.12.4.2.</strong> 如果投注的越位已经判出，注单将视为有效。 </p>
                    <p><br />
                        <strong>2.2.13.</strong> 换人
                    </p>
                    <p> </p>
                    <p style={{align:"left"}}><strong>2.2.13.1.</strong> 换人次数 <br />
                        <strong>2.2.13.1.1.</strong> 让分 <br />
                        <strong>2.2.13.1.1.1.</strong> 让分指投注哪支队伍在一场比赛中换人次数最多，包括任何让分。<br />
                        <br />
                        <strong>2.2.13.1.1.2.</strong> 如果赛事中止，则所有投注都无效。 <br />
                        <br />
                        <strong>2.2.13.1.2.</strong> 大/小盘 <br />
                        <strong>2.2.13.1.2.1.</strong> 大/小盘是指投注一场比赛中的总换人次数。<br />
                        <br />
                        <strong>2.2.13.1.2.2.</strong> 如果总换人次数超过大/小盘的基线换人次数，则投注大盘者为赢家；如果总越位数少于大/小盘的基线换人次数，则投注小盘者为赢家。<br />
                        <br />
                        <strong>2.2.13.1.2.3.</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.13.2.</strong> 第一次换人 <br />
                        <strong>2.2.13.2.1.</strong> 第一次换人表示投注一场比赛中哪支队伍会首先换人。<br />
                        <br />
                        <strong>2.2.13.2.2.</strong> 如果同一时间内两名或以上球员被替换，则首先被第四裁判亮出编号的球员将被视为赢方。<br />
                        <br />
                        <strong>2.2.13.2.3.</strong> 如果在第一次换人后，比赛中止，则所有投注都有效。如果在第一次换人前比赛中止，则所有投注都无效。 <br />
                        <br />
                        <strong>2.2.13.3.</strong> 最后一次换人 <br />
                        <strong>2.2.13.3.1.</strong> 最后一次换人表示投注一场比赛中哪支队伍会最后换人。<br />
                        <br />
                        <strong>2.2.13.3.2.</strong> 如果同一时间内两名或以上球员被替换，则最后被第四裁判亮出编号的球员将被视为赢方。<br />
                        <br />
                        <strong>2.2.13.3.3.</strong> 如果赛事中止，则所有投注都无效。 <br />
                        <br />
                        <strong>2.2.14.</strong> 零失球 <br />
                        <strong>2.2.14.1.</strong> 零失球表示对将会保持零失球的一支球队投注“是”（不会失分）或者对不会保持零失球（会失分）的一支球队投注“否”。<br />
                        <br />
                        <strong>2.2.14.2.</strong>. 如果赛事在只有主场进球之后中止，则零失球投注选项: “客是” 和“客否” 的投注将有效，但零失球投注选项:“主是” 和“主否” 的投注均视为无效。如果只有客场进球，则零失球投注选项:“主是” 和“主否” 的投注将有效，但零失球投注选项: “客是” 和“客否” 的投注均视为无效。如果主客场均有进球，则全部投注选项视为有效。如果赛事在没有任何进球的情况下中止，则全部投注选项视为无效。 <br />
                        规则1：<br />
                        主场得分 ≥ 1，客场得分 = 0 (1, 2…: 0)<br />
                        主场是– 退还　客场是– 输<br />
                        主场是– 退还　客场是– 输<br />
                        <br />
                        规则2：<br />
                        主场得分 ≥ 1，客场得分 ≥ 1 (1, 2…: 1, 2…)<br />
                        主场是– 退还　客场是– 输<br />
                        主场是– 退还　客场是– 输<br />
                        <br />
                        规则3：<br />
                        主场得分 = 0，客场得分 ≥ 1 (0 : 1, 2…)<br />
                        主场是 – 输客场是 – 退还<br />
                        主场没有 – 赢客场没有 – 退还 <br />
                        <br />
                        <strong>2.2.15.</strong> 点球 <br />
                        <strong>2.2.15.1.</strong> 点球是指对一场比赛中判罚的点球次数下注。<br />
                        <br />
                        <strong>2.2.15.2.</strong> 如果一场比赛在一次点球判罚并发出后中止，则所有投注皆有效。<br />
                        <br />
                        <strong>2.2.15.3.</strong> 如果一场比赛在一次点球判罚并发出前中止，则所有投注皆无效。 <br />
                        <br />
                        <strong>2.2.16.</strong> 点球大战 <br />
                        <strong>2.2.16.1.</strong> 点球大战是指投注哪支球队会在点球大战中获胜。<br />
                        <br />
                        <strong>2.2.16.2.</strong> 在让分投注中，结果包括点球大战中所有的罚球数，包括突然死亡。在大/小盘投注中，结果仅仅包括点球大战中的十个常规点球，并且不包括突然死亡。 <br />
                        <br />
                        <strong>2.2.17.</strong> 梦幻联赛 <br />
                        <strong>2.2.17.1.</strong> 梦幻比赛是将不同赛事中的队伍配对比赛。<br />
                        <br />
                        <strong>2.2.17.2.</strong> 所有场地完全仅供参考。 <br />
                        <br />
                        <strong>2.2.18.</strong> 特定15分钟大/小盘（OU） <br />
                        <strong>2.2.18.1.</strong> 特定15分钟大/小盘（OU）是指投注结果由一场比赛时间[间隔]每15分钟末时的总点数（入球数、角球数、得分情况、牌数）确定。<br />
                        <br />
                        <strong>2.2.18.2.</strong> 如果总分超过大/小盘预先指定的分数线，则投注大盘者为赢家；如果总分低于大/小盘预先指定的分数线，则投注小盘者为赢家。<br />
                        <br />
                        <strong>2.2.18.3.</strong> 例如，<br />
                        <br />
                        第15分钟的大/小盘<br />
                        00:00–15:00大/小盘：从00:00到15:00时计入的总点数。所有投注必须在第15分钟结束之时或之前做出。<br />
                        <br />
                        第30分钟的大/小盘<br />
                        15:01-30:00大/小盘：从15:01到30:00时计入的总点数。所有投注必须在第30分钟结束之时或之前做出。<br />
                        <br />
                        第45分钟的大/小盘<br />
                        30:01- 45:00 的大/小盘：总分数为30:01至45:00。所有下注应在45分钟结束前进行。<br />
                        <br />
                        第60分钟的大/小盘<br />
                        45:01–60:00大/小盘：从45:01到60:00时计入的总点数。所有投注必须在第60分钟结束之时或之前做出。<br />
                        <br />
                        第75分钟的大/小盘<br />
                        60:01-75:00大/小盘：从60:01到75:00时计入的总点数。所有投注必须在第75分钟结束之时或之前做出。<br />
                        <br />
                        第90分钟的大/小盘<br />
                        75:01- 90:00 OU：总分数为75:01至90:00。<br />
                        所有下注应在90分钟结束前进行。<br />
                        <br />
                        <strong>2.2.18.4.</strong> 对于特定15分钟大/小盘来说，投注以现场直播公布的时间显示为准，将根据准确的进球时间（球越过球门线）和角球数（实际开出）黄牌总数（裁判给出的牌数）进行结算。<br />
                        <br />
                        <strong>2.2.18.5.</strong> 如果一场比赛暂停或中止，对于投注于未完成的特定15分钟大/小盘将被视为无效。如果指定的特定15分钟大/小盘已经完成，则投注有效。<br />
                        <br />
                        <strong>2.2.18.6.</strong> 对于任何特定15分钟大/小盘现场投注的最后两（2）分钟，除本条下述操作以外，任何行为都将被视为安全比赛，因此任何待定的投注都会被接受：进球、罚点球和领红牌。<br />
                        <br />
                        <strong>2.2.18.7.</strong> 对于在任意特定15分钟角球数的最后两（2）分钟内的即时投注，除了以下提到的，任何其他行动都将被视为安全玩法，因此所有未决投注将是可接受的：前场危险任意球；攻方球员在前场持球；点球。<br />
                        <br />
                        <strong>2.2.18.8.</strong> 对于在任意特定15分钟罚牌数的最后两（2）分钟内的即时投注，除了以下提到的，任何其他行动都将被视为安全玩法，因此所有未决投注将是可接受的：前场危险任意球；点球；进球；角球；球员受伤倒地原因不明；球员争吵和打架。<br />
                        <br />
                        <strong>2.2.18.9.</strong> 对于30:01-45:00和75:01 - 90:00这两个时段，根据现场转播显示的时间，但不包括加时和伤停补时，在确定得分（球超过球门线）、角球数（获得角球）和总红黄牌数（由官方裁判掏牌）时结算投注。 </p>
                    <p><br />
                        <strong>2.2.19.</strong> 任意球
                    </p>
                    <p style={{align:"left"}}><strong>2.2.19.1.</strong> 判罚后未开出的任意球不计入内。<br />
                        <br />
                        <strong>2.2.19.2.</strong> 任意球指直接任意球和间接任意球。（除点球和球门球以外）<br />
                        <br />
                        <strong>2.2.19.3.</strong> 任意球数 <br />
                        <strong>2.2.19.3.1.</strong> 让分和上半场让分 <br />
                        <strong>2.2.19.3.1.1.</strong> 让分指投注哪支队伍在一场比赛中任意球数最多，包括任何让分。<br />
                        <br />
                        <strong>2.2.19.3.1.2.</strong> 上半场让分是指投注上半场比赛中任意球数最多的队伍，包含任何让分数。<br />
                        <br />
                        <strong>2.2.19.3.1.3.</strong> 如果赛事在上半场期间中止，全部上半场让分的投注将视为无效。相反的，如果赛事在下半场期间中止，则全部上半场让分的投注将视为有效。 <br />
                        <br />
                        <strong>2.2.19.3.2.</strong> 大小盘和上半场大小盘 <br />
                        <strong>2.2.19.3.2.1.</strong> 大/小盘是指投注一场比赛中两支队伍总共开出的任意球数。<br />
                        <br />
                        <strong>2.2.19.3.2.2.</strong> 上半场大小盘是指投注上半场比赛中双方所开出任意球的总数。<br />
                        <br />
                        <strong>2.2.19.3.2.3.</strong> 如果总任意球数大于“大小盘”预先指定的总任意球数，则投注“大盘”的为赢家；如果总进球数少于“大小盘”预先指定的总任意球数，则投注“小盘”的为赢家。<br />
                        <br />
                        <strong>2.2.19.3.2.4.</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.19.4.</strong> 第一个任意球和下半场第一个任意球 <br />
                        <strong>2.2.19.4.1.</strong> 第一个任意球表示投注一场比赛中哪支队伍会踢出第一个任意球。<br />
                        <br />
                        <strong>2.2.19.4.2.</strong> 下半场第一个任意球是指投注下半场比赛中获得第一个任意球的队伍。<br />
                        <br />
                        <strong>2.2.19.4.3.</strong> 如果在开出第一个任意球后赛事中止，所有投注仍有效。如果在开出第一个任意球前赛事中止，所有投注均作废。 <br />
                        <br />
                        <strong>2.2.19.5.</strong> 最后一个任意球 <br />
                        <strong>2.2.19.5.1.</strong> 最后一个任意球表示投注一场比赛中哪支队伍会踢出最后一个任意球。<br />
                        <br />
                        <strong>2.2.19.5.2.</strong> 如果赛事中止，则所有投注都无效。 <br />
                        <br />
                        <strong>2.2.19.6.</strong> 下一个任意球 <br />
                        <strong>2.2.19.6.1.</strong> 下一个任意球是指投注预测下一个获得任意球的队伍。<br />
                        <br />
                        <strong>2.2.19.6.2.</strong> 如果投注的任意球已经开出，注单将视为有效。 <br />
                        <br />
                        <strong>2.2.20.</strong> 球门球 <br />
                        <strong>2.2.20.1.</strong> 如果足球接触到攻方球员后，完全越过底线，则守方球队将获得一个球门球。<br />
                        <br />
                        <strong>2.2.20.2.</strong> 守门员补救后的踢球不算球门球。<br />
                        <br />
                        <strong>2.2.20.3.</strong> 球门球数 <br />
                        <strong>2.2.20.3.1.</strong> 让分和上半场让分 <br />
                        <strong>2.2.20.3.1.1.</strong> 让分指投注哪支队伍在一场比赛中球门球数最多，包括任何让分。<br />
                        <br />
                        <strong>2.2.20.3.1.2.</strong> 上半场让分是指投注上半场比赛中龙门球数最多的队伍，包含任何让分数。<br />
                        <br />
                        <strong>2.2.20.3.1.3.</strong> 如果赛事在上半场期间中止，全部上半场让分的投注将视为无效。相反的，如果赛事在下半场期间中止，则全部上半场让分的投注将视为有效。 <br />
                        <br />
                        <strong>2.2.20.3.2.</strong> 大小盘和上半场大小盘 <br />
                        <strong>2.2.20.3.2.1.</strong> 大/小盘是指投注一场比赛中两支队伍总共开出的球门球数。<br />
                        <br />
                        <strong>2.2.20.3.2.2.</strong> 上半场大小盘是指投注上半场比赛中双方所开出龙门球的总数。<br />
                        <br />
                        <strong>2.2.20.3.2.3.</strong> 如果总龙门球数大于“大小盘”预先指定的总龙门球数，则投注“大盘”的为赢家；如果总龙门球数少于“大小盘”预先指定的总龙门球数，则投注“小盘”的为赢家。<br />
                        <br />
                        <strong>2.2.20.3.2.4.</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.20.4.</strong> 第一个龙门球和下半场第一个龙门球 <br />
                        <strong>2.2.20.4.1.</strong> 第一个球门球表示投注一场比赛中哪支队伍会踢出第一个球门球。<br />
                        <br />
                        <strong>2.2.20.4.2.</strong> 下半场第一个龙门球是指投注下半场比赛中获得第一个龙门球的队伍。<br />
                        <br />
                        <strong>2.2.20.4.3.</strong> 如果在开出第一个龙门球后赛事中止，所有投注仍有效。如果在开出第一个龙门球前赛事中止，所有投注均作废。 <br />
                        <br />
                        <strong>2.2.20.5.</strong> 最后一个球门球 <br />
                        <strong>2.2.20.5.1.</strong> 最后一个球门球表示投注一场比赛中哪支队伍会踢出最后一个球门球。<br />
                        <br />
                        <strong>2.2.20.5.2.</strong> 如果赛事中止，则所有投注都无效。 <br />
                        <br />
                        <br />
                        <strong>2.2.20.6.</strong> 下一个龙门球 <br />
                        <strong>2.2.20.6.1.</strong> 下一个龙门球是指投注预测下一个获得龙门球的队伍。<br />
                        <br />
                        <strong>2.2.20.6.2.</strong> 如果投注的龙门球已经开出，注单将视为有效。 <br />
                        <br />
                        <strong>2.2.21.</strong> 界外球 <br />
                        <strong>2.2.21.1.</strong> 如果足球接触到对方球员后，完全越过边线，则守方球队将获得一个球门球。<br />
                        <br />
                        <strong>2.2.21.2.</strong> 界外球数 <br />
                        <strong>2.2.21.2.1.</strong> 让分和上半场让分 <br />
                        <strong>2.2.21.2.1.1.</strong> 让球指投注哪支队伍在一场比赛中界外球数最多，包括任何让分。<br />
                        <br />
                        <strong>2.2.21.2.1.2.</strong> 上半场让分是指投注上半场比赛中界外球数最多的队伍，包含任何让分数。<br />
                        <br />
                        <strong>2.2.21.2.1.3.</strong> 如果赛事在上半场期间中止，全部上半场让分的投注将视为无效。相反的，如果赛事在下半场期间中止，则全部上半场让分的投注将视为有效。 <br />
                        <br />
                        <strong>2.2.21.2.2.</strong>大/小盘 <br />
                        <strong>2.2.21.2.2.1.</strong> 大/小盘是指投注一场比赛中两支队伍总共掷出的界外球数。<br />
                        <br />
                        <strong>2.2.21.2.2.2.</strong> 上半场大小盘是指投注上半场比赛中双方所开出界外球的总数。<br />
                        <br />
                        <strong>2.2.21.2.2.3.</strong> 如果总界外球数大于“大小盘”预先指定的总界外球数，则投注“大盘”的为赢家；如果总界外球数少于“大小盘”预先指定的总界外球数，则投注“小盘”的为赢家。<br />
                        <br />
                        <strong>2.2.21.2.2.4.</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.21.3.</strong> 第一个界外球和下半场第一个界外球 <br />
                        <strong>2.2.21.3.1.</strong> 第一个界外球表示投注一场比赛中哪支队伍会掷出第一个界外球。<br />
                        <br />
                        <strong>2.2.21.3.2.</strong> 下半场第一个界外球是指投注下半场比赛中获得第一个界外球的队伍。<br />
                        <br />
                        <strong>2.2.21.3.3.</strong> 如果在开出第一个界外球后赛事中止，所有投注仍有效。如果在开出第一个界外球前赛事中止，所有投注均作废。 <br />
                        <br />
                        <strong>2.2.21.4.</strong> 最后一个界外球 <br />
                        <strong>2.2.21.4.1.</strong> 最后一个界外球表示投注一场比赛中哪支队伍会掷出最后一个界外球。<br />
                        <br />
                        <strong>2.2.21.4.2.</strong> 如果赛事中止，则所有投注都无效。 <br />
                        <br />
                        <strong>2.2.21.5.</strong> 下一个界外球 </p>
                    <p><strong>2.2.21.5.1.</strong> 下一个界外球是指投注预测下一个获得界外球的队伍。<br />
                        <br />
                        <strong>2.2.21.5.2.</strong> 如果投注的界外球已经抛出，注单将视为有效。
                    </p>
                    <p> </p>
                    <p style={{align:"left"}}><strong>2.2.22.</strong> 特定10分钟大小盘分段投注 (O/U)<br />
                        <strong>2.2.22.1.</strong> 特定10分钟分段投注 (OU) 的意思是，在每场比赛中的每10分钟 [中场休息] 结束时，根据总点数投注 (进球、角球、比赛、掏牌等)。<br />
                        <br />
                        <strong>2.2.22.2.</strong> 如果总点次数大于“大小盘”预先指定的总点次数，则投注“大盘”的为赢家；如果总点次数少于“大小盘”预先指定的总点次数，则投注“小盘”的为赢家。<br />
                        <br />
                        <strong>2.2.22.3.</strong> 例如： <br />
                        第10分钟OU<br />
                        00:00 – 10:00 O/U: 可得分的总点数从00:00至10:00。<br />
                        必须在第10分钟结束时或在这一刻之前投注。<br />
                        第20分钟OU<br />
                        10:01 – 20:00 O/U: 可得分的总点数从10:01至20:00。<br />
                        必须在第20分钟结束时或在这一刻之前投注。<br />
                        第30分钟OU<br />
                        20:01 – 30:00 O/U: 可得分的总点数从20:01至30:00。<br />
                        必须在第30分钟结束时或在这一刻之前投注。<br />
                        第40分钟OU<br />
                        30:01 – 40:00 O/U: 可得分的总点数从30:01至40:00。<br />
                        必须在第40分钟结束时或在这一刻之前投注。<br />
                        第60分钟OU<br />
                        50:01 – 60:00 O/U: 可得分的总点数从50:01至60:00。<br />
                        必须在第60分钟结束时或在这一刻之前投注。<br />
                        第70分钟OU<br />
                        60:01 – 70:00 O/U: 可得分的总点数从60:01至70:00。<br />
                        必须在第70分钟结束时或在这一刻之前投注。<br />
                        第80分钟OU<br />
                        70:01 – 80:00 O/U: 可得分的总点数从70:01至80:00。<br />
                        必须在第80分钟结束时或在这一刻之前投注。<br />
                        第90分钟OU<br />
                        80:01 – 90:00 O/U: 可得分的总点数从80:01至90:00。<br />
                        必须在第90分钟结束时或在这一刻之前投注。 <br />
                        <br />
                        <strong>2.2.22.4.</strong> 对于特定的10分钟OU，根据现场转播显示的时间，在确定得分（球超过球门线）、角球数（获得角球）和总红黄牌数（由官方裁判掏牌）时结算投注。<br />
                        <br />
                        <strong>2.2.22.5.</strong> 如果暂停或放弃比赛，那么在未结束的这一特定10分钟内的投注将被视为无效。如果指定的特定10分钟O/U结束，那么投注有效。<br />
                        <br />
                        <strong>2.2.22.6.</strong> 对于在任意特定10分钟大小盘的最后两（2）分钟内的即时投注，除了以下提到的，任何其他行动都将被视为安全玩法，因此所有未决投注将是可接受的：进球；点球和红牌。<br />
                        <br />
                        <strong>2.2.22.7.</strong> 对于80:01-90:00这个时段，根据现场转播显示的时间，但不包括加时和伤停补时，在确定得分（球超过球门线）、角球数（获得角球）和总红黄牌数（由官方裁判掏牌）时结算投注。 <br />
                        <br />
                        <strong>2.2.23.</strong> 室内足球规则 <br />
                        <strong>2.2.23.1.</strong> 所有投注依据预定的40分钟（2 x 20分钟）常规时间末时的赛果而定。加时赛或点球不计入内。 <br />
                        <br />
                        <strong>2.2.23.2.</strong> 如果一场比赛延时，或暂停并且未能于当天复赛，则所有投注将被视为无效。 <br />
                        <br />
                        <strong>2.2.23.3.</strong> 如果一场比赛在预定时间之前开始，则只有在实际开球之前做出的投注才会被视为有效。所有比赛开始时间后做出的投注将会被视为无效，除了现场投注以外。 <br />
                        <br />
                        <strong>2.2.24.</strong> 进球最多的球员 <br />
                        <strong>2.2.24.1.</strong> 联赛最佳射脚 <br />
                        <strong>2.2.24.1.1.</strong> 联赛最佳射脚是指以投注来预测哪个球员将会在一个常规联赛中入球较多。<br />
                        <br />
                        <strong>2.2.24.1.2.</strong> 若一个球员在赛季中期加入同一联赛中的另一个球队，所有在不同球队的进球将计算在总进球内。但任何在联赛之外的比赛之进球将不予以计算。<br />
                        <br />
                        <strong>2.2.24.1.3</strong> 任何在附加赛和点球决胜中的进球将不予以计算。<br />
                        <br />
                        <strong>2.2.24.1.4.</strong> 乌龙球将不予以计算及不列入投注目的。<br />
                        <br />
                        <strong>2.2.24.1.5.</strong> 非首发球员的投注仍有效。非首发球员是指任何球员在本赛季联赛没有被列入首发阵容名单。<br />
                        <br />
                        <strong>2.2.24.1.6.</strong> 若一个球员在本赛季开始之前退出本赛季联赛或是转移到不同联赛的球队，所有投注于该球员的“最佳射脚”投注将退还。<br />
                        <br />
                        <strong>2.2.24.1.7.</strong> 若宣布的结果为“不分胜负”，则一半赌金将分配给完全赔率，而另一半赌金将全部丧失。若超过两名参赛者“不分胜负”，则按比例分配赌金。 <br />
                        <br />
                        <strong>2.2.24.2.</strong> 杯赛(非赛事)最佳射脚 <br />
                        <strong>2.2.24.2.1.</strong> 杯赛 (非联赛) 最佳射脚是指以投注来预测哪个球员将会在<br />
                        一个常规杯赛或比赛中入球较多。<br />
                        <br />
                        <strong>2.2.24.2.2.</strong> 乌龙球和点球决胜中的进球将不予以计算及不列入投注目的。然而，任何在加时赛的进球将计算在总进球内。<br />
                        <br />
                        <strong>2.2.24.2.3.</strong> 非首发球员的投注仍有效。非首发球员是指任何球员在本杯赛或比赛没有被列入首发阵容名单。<br />
                        <br />
                        <strong>2.2.24.2.4.</strong> 若一个球员在本赛季开始之前退出本杯赛或比赛或是转移到不同杯赛的球队，所有投注于该球员的“最佳射脚”投注将退还。<br />
                        <br />
                        <strong>2.2.24.2.5.</strong> 若宣布的结果为“不分胜负”，则一半赌金将分配给完全赔率，而另一半赌金将全部丧失。若超过两名参赛者“不分胜负”，则按比例分配赌金。 <br />
                        <br />
                        <strong>2.2.24.3.</strong> 球员一对一比赛时进球最多的球员 <br />
                        <strong>2.2.24.3.1.</strong> 乌龙球和点球大战中的进球不计入内。加时赛除外，将不计入投注。<br />
                        <br />
                        <strong>2.2.24.3.2.</strong> 如果一名球员未展开/进行比赛，则所有投注都将被视为无效。<br />
                        <br />
                        <strong>2.2.24.3.3.</strong> 所有结果依据比赛结束时由主管机构宣布的官方结果而定。 <br />
                        <br />
                        <strong>2.2.25.</strong> 受伤补时 <br />
                        <strong>2.2.25.1.</strong> 伤停补时是指为了弥补比赛时球员受伤所耗时间而额外增加的比赛时间。伤停补时可在上半场和下半场比赛末时给予，持续时长如下所述：<br />
                        <br />
                        无补时<br />
                        1分钟<br />
                        2分钟<br />
                        3分钟<br />
                        4分钟及以上<br />
                        <br />
                        <strong>2.2.25.2.</strong> 在上半场末时给予的受伤补时 <br />
                        <strong>2.2.25.2.1.</strong> 所有投注以完整的45分钟比赛为准，不包括加时。投注以由第四裁判员在完整45分钟比赛以后或上半场末时所判给的受伤补时为准进行结算。<br />
                        <br />
                        <strong>2.2.25.2.2.</strong> 如果一场比赛在上半场任何时间中止，对上半场末受伤补时的所有投注都将被视为无效，并且下注金额将被退还到会员的账户中。 <br />
                        <br />
                        <strong>2.2.25.3.</strong> 下半场判给的受伤补时 <br />
                        <strong>2.2.25.3.1.</strong> 所有投注以完整的90分钟比赛为准，不包括加时。投注以由第四裁判员在完整90分钟比赛后或下半场末时所判给的受伤补时为准进行结算。<br />
                        <br />
                        <strong>2.2.25.3.2.</strong> 如果一场比赛在任何时间中止，对下半场末受伤补时的所有投注都将被视为无效，并且下注金额将被退还到会员的账户中。 <br />
                        <br />
                        <strong>2.2.25.4.</strong> 本公司将根据由负责组织此次比赛的足球主管机构提供的官方结果结算投注。 <br />
                        <br />
                        <strong>2.2.26.</strong> 双重机会和上半场双重机会 <br />
                        <strong>2.2.26.1.</strong> 下列选项可供选择：<br />
                        <br />
                        1或X – 如果赛果是主队获胜或平局，则投注于本选项者为赢家。<br />
                        <br />
                        X或2 – 如果赛果是平局或客队获胜，则投注于本选项者为赢家。<br />
                        <br />
                        1或2 – 如果赛果是主队获胜或客队获胜，则投注于本选项者为赢家。<br />
                        <br />
                        为便于投注，如果一场比赛是在一个中立场地举行，排名在前的球队将被视为是主队。 <br />
                        <br />
                        <strong>2.2.27.</strong> 平局退款 <br />
                        <strong>2.2.27.1.</strong> 预测一场比赛中主队还是客队赢。如果常规比赛时间后或预定时间末时，最终结果为平局，则所有投注被会被退款。 <br />
                        <br />
                        <strong>2.2.28.</strong> 双方/一方/双方皆不得分 <br />
                        双方 = 双方球队皆得分<br />
                        一方 = 一方球队得分<br />
                        双方皆不 = 双方球队皆不得分<br />
                        <br />
                        <strong>2.2.28.1.</strong> 如果赛事在只有主场进球之后中止，则“两者皆不”的投注将有效，但“双反”和“一方”的投注均视为无效。如果只有客场进球，则“两者皆不”的投注将有效，但“双方”和“一方”的投注均视为无效。如果主客场都有进球，则全部投注视为有效。如果赛事在没有任何进球的情况下中止，则全部投注视为无效。 <br />
                        规则1：<br />
                        主场得分 ≥ 1，客场得分 = 0 (1, 2…: 0)<br />
                        双方 – 退还<br />
                        一方 – 退还<br />
                        两者皆不 – 输<br />
                        <br />
                        规则2：<br />
                        主场得分 ≥ 1，客场得分 ≥ 1 (1, 2…: 1, 2…)<br />
                        双方 – 赢<br />
                        一方 – 输<br />
                        两者皆不 – 输<br />
                        <br />
                        规则3：<br />
                        主场得分 = 0，客场得分 ≥ 1 (0 : 1, 2…)<br />
                        双方 – 退还<br />
                        一方 – 退还<br />
                        两者皆不 – 输 <br />
                        <br />
                        <strong>2.2.29.</strong> 零失球获胜 <br />
                        <strong>2.2.29.1.</strong> 预测您所选择的球队是否能在常规比赛时间或预定比赛时间末时获胜且无失球，加时赛或点球大战不计入内。<br />
                        <br />
                        <strong>2.2.29.2.</strong> 如果赛事在只有主场进球之后中止，则“客场”的投注将有效，但“主场”的投注均视为无效。如果只有客场进球，则“主场”的投注将有效，但“客场”的投注均视为无效。如果主客场都有进球，则全部投注视为有效。如果赛事在没有任何进球的情况下中止，则全部投注视为无效。 <br />
                        规则1：<br />
                        主场得分 ≥ 1，客场得分 = 0 (1, 2…: 0)<br />
                        主场 – 退还客场 – 输<br />
                        <br />
                        规则2：<br />
                        主场得分 ≥ 1，客场得分 ≥ 1 (1, 2…: 1, 2…)<br />
                        主场 – 输客场 – 输<br />
                        <br />
                        规则3：<br />
                        主场得分 = 0，客场得分 ≥ 1 (0 : 1, 2…)<br />
                        主场 – 输客场 – 退还 </p>
                    <p><br />
                        <strong>2.2.30.</strong> 3项让分
                    </p>
                    <p> </p>
                    <p style={{align:"left"}}><strong>2.2.30.1.</strong> 将依让分调整后的实际比赛得分所定的赔率进行投注结算。 <br />
                        <br />
                        <strong>2.2.31.</strong> 半场获胜 <br />
                        <strong>2.2.31.1.</strong> 预测您所选择的球队是否在上半场或下半场内可以比对手赢得更多进球。<br />
                        <br />
                        <strong>2.2.31.2 </strong>主队胜出其中一个半场 <br />
                        <strong>2.2.31.2.1</strong> 主队胜出其中一个半场是指投注预测主队在其中一个半场的进球数多于对手。<br />
                        <br />
                        <strong>2.2.31.2.2</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.31.3 </strong>客队胜出其中一个半场 <br />
                        <strong>2.2.31.3.1 </strong>客队胜出其中一个半场是指投注预测客队在其中一个半场的进球数多于对手。 <br />
                        <br />
                        <strong>2.2.31.3.2</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.32.</strong> 上下半场皆赢 <br />
                        <strong>2.2.32.1.</strong> 预测您所选择的球队是否在每个半场都可以比对手赢得更多进球。<br />
                        示例：如果您选择的球队在一场比赛的上半场得分，并且整场比赛以1-0结束，虽然上半场以1-0胜出，但在第二个45分钟比赛中实际比分为0-0，因此为平局。如果这一情况出现，则只有上半场会被视为“赢”，所以这一投注为输。<br />
                        <br />
                        <strong>2.2.32.2.</strong> 主队胜出两个半场 (包括上/下半场投注)<br />
                        <strong>2.2.32.2.1 </strong>主队胜出两个半场是指投注预测主队在两个半场中的进球数都多于对手。<br />
                        <br />
                        <strong>2.2.32.2.2. </strong>如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.32.3.</strong> 客队胜出两个半场 (包括上/下半场投注)<br />
                        <strong>2.2.32.3.1 </strong>客队胜出两个半场是指投注预测客队在两个半场中的进球数都多于对手。<br />
                        <br />
                        <strong>2.2.32.3.2.</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.33.</strong> 进球最多的球队 <br />
                        <strong>2.2.33.1</strong> 进球最多的球队就是赢家。<br />
                        <br />
                        <strong>2.2.33.2</strong> 不计算净胜球。<br />
                        <br />
                        <strong>2.2.33.3 </strong>如果出现两支或以上并列最多进球的球队，则按“不分胜负”的投注规则来分配赌金。<br />
                        <br />
                        <strong>例子：</strong><br />
                        曼市进4 球，史云斯进4球<br />
                        利物浦进4 球，桑德兰进1球<br />
                        那利物浦，曼市和史云斯都是赢家。<br />
                        <br />
                        <strong>2.2.33.4 </strong>中止或延期 <br />
                        <strong>2.2.33.4.1 </strong>若投注的球队之赛事因事故中止或延期 (超出本公司所预定的赛程) ，所有投注于该球队的投注将视为无效。 <br />
                        <br />
                        <strong>2.2.33.5 </strong>点球决胜中的进球将不予以计算。 <br />
                        <br />
                        <strong>2.2.33.6 </strong>针对于杯赛 (非联赛) 的进球最多的球队，任何在加时赛的进球将予以计算。<br />
                        <br />
                        <strong>2.2.33.7 </strong>针对于特定日期内的进球最多的球队，任何在加时赛的进球将不予以计算。 <br />
                        <br />
                        <strong>2.2.34.</strong> 上半场准确进球数 <br />
                        <strong>2.2.34.1.</strong> 上半场准确进球数表示投注预测到上半场结束时两支球队的进球总数。<br />
                        <br />
                        <strong>2.2.34.2.</strong> 如果一场赛事在上半场结束之前终止，则所有投注将被视为无效。 <br />
                        <br />
                        <strong>2.2.35.</strong> 准确组积分： <br />
                        <strong>2.2.35.1.</strong> 准确组积分指投注预测一支球队在一轮小组赛结束时得到的特定总积分数。 <br />
                        <br />
                        <strong>2.2.36.</strong> 得分最高组 <br />
                        <strong>2.2.36.1.</strong> 表示投注预测在指定日期一个组的总进球数。<br />
                        <br />
                        <strong>2.2.36.2.</strong> 如果小组得分持平，则适用“不分胜负”的规则。<br />
                        <br />
                        示例：<br />
                        A 驵<br />
                        波兰比希腊2-1=3个进球<br />
                        俄罗斯比捷克3-2=5个进球<br />
                        A 组总进球数：8个进球<br />
                        B 组总进球数：7个进球<br />
                        C 组总进球数：7个进球<br />
                        D 组总进球数：6个进球<br />
                        A 组为赢家。 <br />
                        <br />
                        <strong>2.2.37.</strong> 球队组积分： <br />
                        <strong>2.2.37.1.</strong> 表示投注在一轮小组赛结束时一支球队的积分所属的准确类别，“小盘”、“中间盘”和“大盘”。<br />
                        <br />
                        示例：<br />
                        球队X的总积分为5分<br />
                        如果投注为：<br />
                        小盘低于3分 – 输<br />
                        中间盘3-4分 – 输<br />
                        大盘4分以上 – 赢 <br />
                        <br />
                        <strong>2.2.38.</strong> 小组顺序科卡士 <br />
                        <strong>2.2.38.1.</strong> 表示投注预测在小组赛阶段结束时，在各自的小组排名中以特定顺序排列，位于第一和第二的球队。 <br />
                        <br />
                        <strong>2.2.39.</strong> 受伤补时大/小盘 <br />
                        <strong>2.2.39.1.</strong> 上半场结束时的受伤补时大/小盘： <br />
                        <strong>2.2.39.1.1.</strong> 上半场受伤补时大/小盘表示对上半场结束时受伤补时的大/小盘投注。<br />
                        <br />
                        <strong>2.2.39.1.2.</strong> 如果总补时数超过大/小盘的基线补时数，则投注大盘者为赢家；如果总补时数少于大/小盘的基线补时数，则投注小盘者为赢家。<br />
                        <br />
                        <strong>2.2.39.1.3.</strong> 投注以由第四裁判员在完整45分钟比赛以后或上半场末时所判给的受伤补时为准进行结算。 <br />
                        <br />
                        <strong>2.2.39.2.</strong> 下半场结束时的受伤补时大/小盘： <br />
                        <strong>2.2.39.2.1.</strong> 下半场受伤补时大/小盘表示对下半场结束时受伤补时的大/小盘投注。<br />
                        <br />
                        <strong>2.2.39.2.2.</strong> 如果总补时数超过大/小盘的基线补时数，则投注大盘者为赢家；如果总补时数少于大/小盘的基线补时数，则投注小盘者为赢家。<br />
                        <br />
                        <strong>2.2.39.2.3.</strong> 投注以由第四裁判员在完整90分钟比赛以后或下半场末时所判给的受伤补时为准进行结算。 <br />
                        <br />
                        <strong>2.2.40.</strong> 第一个进球方式 <br />
                        <strong>2.2.40.1.</strong> 表示预测一场比赛中任一球队第一个进球的方式。 </p>
                    <p><strong>2.2.40.1.1.</strong> 任意球 - 进球必须是直接通过任意球实现的进球。如果任意球的开出者被判进球，则应算做弹射进门。同时包括由一个角球直接获得的进球。<br />
                        <br />
                        <strong>2.2.40.1.2.</strong> 点球 - 进球必须是直接由点球获得的进球，并在点球开出者被称为得分球员时。<br />
                        <br />
                        <strong>2.2.40.1.3.</strong> 乌龙球 – 如果进球被视为乌龙球而宣布。<br />
                        <br />
                        <strong>2.2.40.1.4.</strong> 头球 – 进球队员最后接触球的部分必须为头部。<br />
                        <br />
                        <strong>2.2.40.1.5.</strong> 射门 – 上述未含的所有其它进球类型。<br />
                        <br />
                        <strong>2.2.40.1.6.</strong> 无进球
                    </p>
                    <p> </p>
                    <p style={{align:"left"}}><strong>2.2.40.2.</strong> 本公司将根据由负责组织此次比赛的足球主办单位提供的官方结果结算投注。 <br />
                        <br />
                        <strong>2.2.41.</strong> 点球大战 – 点球是否会得分？ <br />
                        <strong>2.2.41.1.</strong> 表示投注预测在点球大战中一名指定的开球员是否会得分或错失良机。<br />
                        <br />
                        <strong>2.2.41.2.</strong> 如果未进行点球大战，则所有投注将被视作无效。 <br />
                        <br />
                        <strong>2.2.42.</strong> 双重科卡士 <br />
                        <strong>2.2.42.1.</strong> 双重科卡士表示投注预测在比赛结束时，不论以何种顺序，哪两（2）支球队会位居前两名。 <br />
                        <br />
                        <strong>2.2.43.</strong> 顺序科卡士 <br />
                        <strong>2.2.43.1.</strong> 顺序科卡士表示投注预测在比赛结束时，以准确的顺序，哪两（2）支球队会位居前两名。 <br />
                        <br />
                        <strong>2.2.44.</strong> 最佳新队 <br />
                        <strong>2.2.44.1.</strong> 最佳新人表示预测哪支球队会是一场赛事或比赛的最佳新队。一支“新队”指一支新近加入一场赛事或比赛的球队。 <br />
                        <br />
                        <strong>2.2.45.</strong> 地区赢家 <br />
                        <strong>2.2.45.1.</strong> 1地区赢家表示预测一个地区赛事或比赛的获胜方。<br />
                        <br />
                        <strong>2.2.45.2.</strong> 所有结果依据比赛结束时由主办单位宣布的官方结果而定。 <br />
                        <br />
                        <br />
                        <strong>2.2.46.</strong> 主队不赌 <br />
                        <strong>2.2.46.1</strong> 预测一场比赛是平局还是客队赢。如果常规比赛时间后或预定时间末时，最终结果为主队赢，则所有投注都会被退款。 <br />
                        <br />
                        <strong>2.2.47.</strong> 客队不赌 <br />
                        <strong>2.2.47.1.</strong> 预测一场比赛是平局还是主队赢。如果常规比赛时间后或预定时间末时，最终结果为客队赢，则所有投注都会被退款 <br />
                        <br />
                        <strong>2.2.48.</strong> 平局/非平局 <br />
                        <strong>2.2.48.1.</strong> 预测常规比赛时间后或预定时间末时的最终结果是否为平局还是非平局。 <br />
                        <br />
                        <strong>2.2.49.</strong> 上半场波胆 <br />
                        <strong>2.2.49.1.</strong> 上半场波胆表示投注预测上半场比赛结束时的最终得分。<br />
                        <br />
                        <strong>2.2.49.2.</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.50.</strong> 赛果/总进球数 <br />
                        <strong>2.2.50.1.</strong> 赛果/总进球数表示投注预测下列两个方面： <br />
                        a.) 一场比赛是主队赢、客队赢还是平局；以及<br />
                        b.)一场比赛最终赛果的总进球数为大盘还是小盘。 <br />
                        <br />
                        <strong>2.2.50.2.</strong> 下列投注选项可供选择： <br />
                        * 主队和大盘–如果主队赢且总进球数在预先指定的进球数基线之上，则此投注赢。<br />
                        * 主队和小盘–如果主队赢且总进球数在预先指定的进球数基线之下，则此投注赢。<br />
                        * 客队和大盘–如果客队赢且总进球数在预先指定的进球数基线之上，则此投注赢。<br />
                        * 客队和小盘–如果客队赢且总进球数在预先指定的进球数基线之下，则此投注赢。<br />
                        * 平局和大盘–如果比赛结果为平局且总进球数在预先指定的进球数基线之上，则此投注赢。<br />
                        * 平局和小盘–如果比赛结果为平局且总进球数在预先指定的进球数基线之下，则此投注赢。 <br />
                        <br />
                        <strong>2.2.51.</strong> 球队反败为胜 <br />
                        <strong>2.2.51.1.</strong> 球队反败为胜表示预测一支在比赛中任何时候输球的球队最终反败为胜，并在90分钟结束时赢得比赛。 <br />
                        <br />
                        <strong>2.2.52.</strong> 首先进球手 <br />
                        <strong>2.2.52.1.</strong> 首先进球手是指押在预测一名球员在一场比赛中最先进球得分的投注。<br />
                        <br />
                        <strong>2.2.52.2.</strong> 投注任何未在比赛中上场的球员为无效并退还赌注。<br />
                        <br />
                        <strong>2.2.52.3.</strong> 投注任何在比赛中首个进球得分之后才替换上场的球员为无效并退还赌注。<br />
                        <br />
                        <strong>2.2.52.4.</strong> 乌龙球不算首球。在这种情况下，下一个进球手才视为首先进球手。<br />
                        <br />
                        <strong>2.2.52.5.</strong> 在首球进球之后才下注的，该投注视为无效，但若首球为乌龙球，则该投注有效。<br />
                        <br />
                        <strong>2.2.52.6.</strong> 投注在首球进球之前就被替换或罚下的球员为输。<br />
                        <br />
                        <strong>2.2.52.7.</strong> 若在整场比赛中无人进球，则投注“无进球手”者为赢。若乌龙球为该场比赛中的唯一进球，亦为投注“无进球手”者赢。 <br />
                        <br />
                        <strong>2.2.53.</strong> 率先进2球的球队 <br />
                        <strong>2.2.53.1.</strong> 表示投注预测一场比赛中哪支球队会率先获得两（2）个进球。 <br />
                        * 主队<br />
                        * 客队<br />
                        * 两队皆未得2分 <br />
                        <br />
                        <strong>2.2.53.2.</strong> 如果一场比赛在一支球队已经获得两（2）个进球之后中止，则所有投注都将有效。<br />
                        <br />
                        <strong>2.2.53.3.</strong> 如果一场比赛在任一支球队已经获得两（2）个进球之前中止，则所有投注都将无效。 <br />
                        <br />
                        <strong>2.2.54.</strong> 率先进3球的球队 <br />
                        <strong>2.2.54.1.</strong> 表示投注预测一场比赛中哪支球队会率先获得三（3）个进球。 <br />
                        * 主队<br />
                        * 客队<br />
                        * 两队皆未得2分 <br />
                        <br />
                        <strong>2.2.54.2.</strong> 如果一场比赛在一支球队已经获得三（3）个进球之后中止，则所有投注都将有效。<br />
                        <br />
                        <strong>2.2.54.3.</strong> 如果一场比赛在任一支球队已经获得三（3）个进球之前中止，则所有投注都将无效。 <br />
                        <br />
                        <strong>2.2.55.</strong> 第一个进球的时间 <br />
                        <strong>2.2.55.1.</strong> 表示投注预测第一个进球的时间段。<br />
                        <br />
                        <strong>2.2.55.2.</strong> 下列时间段/投注选项可供选择： <br />
                        • 00:00 - 10:00<br />
                        • 10:01 - 20:00<br />
                        • 20:01 - 30:00<br />
                        • 30:01 - 40:00<br />
                        • 40:01 - 50:00<br />
                        • 50:01 - 60:00<br />
                        • 60:01 - 70:00<br />
                        • 70:01 - 80:00<br />
                        • 80:01 – 终场<br />
                        • 无进球 <br />
                        <br />
                        <strong>2.2.55.3.</strong> 如果一场比赛在第一个进球产生之后中止，则所有投注都将有效。<br />
                        <br />
                        <strong>2.2.55.4.</strong> 如果一场比赛在第一个进球产生之前中止，则所有投注都将无效。 <br />
                        <br />
                        <strong>2.2.56.</strong> 会产生第一个进球的半场 <br />
                        <strong>2.2.56.1.</strong> 表示投注预测哪个半场会产生第一个进球。<br />
                        <br />
                        <strong>2.2.56.2.</strong> 下列投注选项可供选择： <br />
                        • 上半场<br />
                        • 下半场<br />
                        • 无进球 <br />
                        <br />
                        <strong>2.2.56.3.</strong> 如果一场比赛在上半场第一个进球产生之后中止，则所有投注都将有效。<br />
                        <br />
                        <strong>2.2.56.4.</strong> 如果一场比赛在第一个进球产生之前的任何时间中止，则所有投注都将无效。 <br />
                        <br />
                        <strong>2.2.57.</strong> 两队皆进球/赛果和两对皆进球/上半场赛果 <br />
                        <strong>2.2.57.1.</strong> 两队得分/结果表示投注预测： <br />
                        (A) 一场比赛是否会导致两队皆得分，以及<br />
                        (B) 一场比赛是主队赢、客队赢还是平局。 <br />
                        <br />
                        <strong>2.2.57.2.</strong> 下列投注选项可供选择： <br />
                        • 是的以及主队赢–如果两队皆进球且主队赢，则此投注赢。<br />
                        • 是的以及客队赢–如果两队皆进球且客队赢，则此投注赢。<br />
                        • 是的以及平局–如果两队皆进球且比赛结果为平局，则此投注赢。 <br />
                        <br />
                        <strong>2.2.57.3.</strong> 两队皆进球/上半场赛果是指投注预测赛事的上半场赛果以及两队是否都在上半场皆有进球。<br />
                        <br />
                        <strong>2.2.57.4.</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.58.</strong> 主队进球最多的半场： <br />
                        <strong>2.2.58.1.</strong> 表示投注预测主队在哪个半场会产生较多进球。<br />
                        <br />
                        <strong>2.2.58.2.</strong> 下列选项可供选择： <br />
                        * 上半场<br />
                        * 下半场<br />
                        * 上下半场进球平分 <br />
                        <br />
                        <strong>2.2.59.</strong> 客队进球最多的半场： <br />
                        <strong>2.2.59.1.</strong> 表示投注预测客队在哪个半场会产生较多进球。<br />
                        <br />
                        <strong>2.2.59.2.</strong> 下列选项可供选择： <br />
                        * 上半场<br />
                        * 下半场<br />
                        * 上下半场进球平分 <br />
                        <br />
                        <strong>2.2.60.</strong> 主队进第一个球的半场 <br />
                        <strong>2.2.60.1.</strong> 表示投注预测主队在哪个半场会产生第一个进球。<br />
                        <br />
                        <strong>2.2.60.2.</strong> 下列选项可供选择： <br />
                        * 上半场<br />
                        * 下半场<br />
                        * 无进球 <br />
                        <br />
                        <strong>2.2.61.</strong> 客队进第一个球的半场 <br />
                        <strong>2.2.61.1.</strong> 表示投注预测客队在哪个半场会产生第一个进球。<br />
                        <br />
                        <strong>2.2.61.2.</strong> 下列选项可供选择： <br />
                        * 上半场<br />
                        * 下半场<br />
                        *无进球 <br />
                        <br />
                        <strong>2.2.62.</strong> 特定15分钟让分盘（HDP<br />
                        <strong>2.2.62.1.</strong> 特定15分钟让分盘表示投注预测参赛者或队伍什么时候会获得假定的预先让分。获胜者为一场比赛内每15分钟（间隔时间）末时的赛果加上假定的让分后成绩较高的参赛者或队伍。<br />
                        <br />
                        <strong>2.2.62.2.</strong> 例如： <br />
                        <strong>15</strong><strong>分钟</strong><strong>HDP</strong><br />
                        00:00 – 15:00 HDP：胜方为.00:00到15:00时成绩较高的参赛者或队伍。<br />
                        所有投注必须在此15分钟之前或末尾时做出。<br />
                        <br />
                        <strong>30</strong><strong>分钟</strong><strong>HDP</strong><br />
                        15:01 – 30:00 HDP：胜方为. 15:01到30:00时成绩较高的参赛者或队伍。<br />
                        所有投注必须在此30分钟之前或末尾时做出。<br />
                        <br />
                        <strong>45</strong><strong>分钟</strong><strong>HDP</strong><br />
                        30:01- 45:00 HDP：胜方为30:01到45:00时成绩较高的参赛者或队伍。<br />
                        所有投注必须在此45分钟之前或末尾时做出。<br />
                        <br />
                        <strong>60</strong><strong>分钟</strong><strong>HDP</strong><br />
                        45:01 – 60:00 HDP：胜方为45:01到60:00时成绩较高的参赛者或队伍。<br />
                        所有投注必须在此60分钟之前或末尾时做出。<br />
                        <br />
                        <strong>75</strong><strong>分钟</strong><strong>HDP</strong><br />
                        60:01 – 75:00HDP：胜方为60:01到75:00时成绩较高的参赛者或队伍。<br />
                        所有投注必须在此75分钟之前或末尾时做出。<br />
                        <br />
                        <strong>90</strong><strong>分钟</strong><strong>HDP</strong><br />
                        75:01 – 90:00 HDP：胜方为75:01到90:00时成绩较高的参赛者或队伍。<br />
                        所有投注必须在此90分钟之前或末尾时做出。 <br />
                        <br />
                        <strong>2.2.62.3.</strong> 对于特定15分钟让分盘来说，投注以现场直播公布的时间显示为准，将根据准确的进球时间（球越过龙门线）、角球数（实际开出）以及总罚牌数（裁判员发出的罚牌）进行结算。<br />
                        <br />
                        <strong>2.2.62.4.</strong> 如果一场比赛暂停或中止，对于投注于未完成的特定15分钟让分盘将被视为无效。如果指定的特定15分钟让分盘已经完成，则投注有效。<br />
                        <br />
                        <strong>2.2.62.5.</strong> 对于任何特定15分钟让分盘现场投注的最后两（2）分钟，除本条下述操作以外，任何行为都将被视为安全比赛，因此任何待定的投注都会被接受：进球、罚点球和领红牌。<br />
                        <br />
                        <strong>2.2.62.6.</strong> 对于30:01-45:00和75:01 - 90:00来说，投注以现场直播公布的时间显示为准，将根据准确的进球时间（球越过龙门线）、角球数（实际开出）以及总罚牌数（裁判员发出的罚牌）进行结算，除了任何额外的时间或伤停补时以外 <br />
                        <br />
                        <strong>2.2.63.</strong> 夢幻比賽: 率先進球的球隊 </p>
                    <p><strong>2.2.63.1.</strong> 夢幻比賽：率先進球的球隊表示投注預測在一場夢幻比賽中哪支球隊會率先進球。<br />
                        <br />
                        示例：<br />
                        比賽：曼城對陣利物浦；切爾西對陣曼聯<br />
                        夢幻比賽：曼城對陣切爾西<br />
                        曼城在比賽第25分10秒時進球<br />
                        切爾西在比賽25分48秒時破門<br />
                        獲勝投注：曼城<br />
                        <br />
                        <strong>2.2.63.2.</strong> 如果兩場比賽在同一時間（精確到分秒）進球或者兩場比賽都沒有進球，則視夢幻比賽為平局。<br />
                        <br />
                        <strong>2.2.63.3.</strong> 如果在一場比賽進第一個球之後，另一場比賽被推遲或取消，則所有投注都有效。如果在一場比賽進第一個球之前，另一場比賽被推遲或取消，則所有投注都無效</p>
                    <p> </p>
                    <p style={{align:"left"}}>示例：<br />
                        比賽：曼城對陣利物浦；切爾西對陣曼聯<br />
                        夢幻比賽：曼城對陣切爾西<br />
                        曼城在比賽第25分10秒時進球<br />
                        切爾西的比賽在25分10秒之前被推遲或取消<br />
                        結果：所有投注都無效。<br />
                        <br />
                        <strong>2.2.63.4.</strong> 如果兩場比賽在未進球的情況下被取消，則所有投注都無效。<br />
                        <br />
                        <strong>2.2.63.5.</strong> 任何在加時賽期間的進球不計入內。 <br />
                        <br />
                        <strong>2.2.64.</strong> 欧洲最高名次球队 <br />
                        <strong>2.2.64.1.</strong> 欧洲最高名次球队是指投注预测哪支欧洲球队在国际足联世界杯赛事得到最高名次。<br />
                        <br />
                        <strong>2.2.64.2.</strong> 如果两个欧洲球队在总决赛或季军争夺赛对决，本场球赛的获胜者将被视为欧洲最高名次球队。<br />
                        <br />
                        <strong>2.2.64.3.</strong> 在其他情况下，如果多个欧洲球队在同一轮赛事终止，则应用“不分胜负”的投注规则，一半赌金将分配给完全赔率，而另一半赌金将全部丧失。若超过两名参赛者“不分胜负”，则按比例分配赌金。<br />
                        <br />
                        <strong>2.2.64.4.</strong> 所有欧洲最高名次球队的投注将根据国际足联世界杯官方公告的成绩来结算投注。 <br />
                        <br />
                        <strong>2.2.65.</strong> 南美洲最高名次球队 <br />
                        <strong>2.2.65.1.</strong> 南美洲最高名次球队是指投注预测哪支南美洲球队在国际足联世界杯赛事得到最高名次。<br />
                        <br />
                        <strong>2.2.65.2.</strong> 如果两个南美洲球队在总决赛或季军争夺赛对决，本场球赛的获胜者将被视为南美洲最高名次球队。<br />
                        <br />
                        <strong>2.2.65.3.</strong> 在其他情况下，如果多个南美洲球队在同一轮赛事终止，则应用“不分胜负”的投注规则，一半赌金将分配给完全赔率，而另一半赌金将全部丧失。若超过两名参赛者“不分胜负”，则按比例分配赌金。<br />
                        <br />
                        <strong>2.2.65.4.</strong> 所有南美洲最高名次球队的投注将根据国际足联世界杯官方公告的成绩来结算投注。 <br />
                        <br />
                        <strong>2.2.66.</strong> 非洲最高名次球队 <br />
                        <strong>2.2.66.1.</strong> 非洲最高名次球队是指投注预测哪支非洲球队在国际足联世界杯赛事得到最高名次。<br />
                        <br />
                        <strong>2.2.66.2.</strong> 如果两个非洲球队在总决赛或季军争夺赛对决，本场球赛的获胜者将被视为非洲最高名次球队。<br />
                        <br />
                        <strong>2.2.66.3.</strong> 在其他情况下，如果多个非洲球队在同一轮赛事终止，则应用“不分胜负”的投注规则，一半赌金将分配给完全赔率，而另一半赌金将全部丧失。若超过两名参赛者“不分胜负”，则按比例分配赌金。<br />
                        <br />
                        <strong>2.2.66.4.</strong> 所有非洲最高名次球队的投注将根据国际足联世界杯官方公告的成绩来结算投注。 <br />
                        <br />
                        <strong>2.2.67.</strong> 两队皆进球 <br />
                        <strong>2.2.67.1.</strong> 两队皆进球是指投注预测两队是否都在赛事中皆有进球。<br />
                        <br />
                        <strong>2.2.67.2.</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.68.</strong> 上半场两队皆进球 <br />
                        <strong>2.2.68.1.</strong> 上半场两队皆进球是指投注预测两队是否都在赛事中的上半场皆有进球。<br />
                        <br />
                        <strong>2.2.68.2.</strong> 如果赛事当主客队都有在上半场进球后中止，“是”的投注将视为胜方，“不是”的投注并视为负方。如果赛事在上半场之前并没有任何进球的情况下中止，则全部投注视为无效。 <br />
                        <br />
                        <strong>2.2.69.</strong> 下半场两队皆进球 <br />
                        <strong>2.2.69.1.</strong> 下半场两队皆进球是指投注预测两队是否都在赛事中的下半场皆有进球。<br />
                        <br />
                        <strong>2.2.69.2.</strong> 如果赛事当主客队都有在下半场进球后中止，“是”的投注将视为胜方，“不是”的投注并视为负方。如果赛事在没有任何进球的情况下中止，则全部投注视为无效。 <br />
                        <br />
                        <strong>2.2.70.</strong> 两队皆进球上半场/下半场 <br />
                        <strong>2.2.70.1.</strong> 两队皆进球，上半场/下半场是指投注预测两队是否在赛事中的上半场皆有进球以及两队是否在赛事中的下半场皆有进球。<br />
                        <br />
                        <strong>2.2.70.2.</strong> 如果赛事中止，除非主客队都有在上半场和下半场进球，否则投注将视为无效 <br />
                        <br />
                        <strong>2.2.71.</strong> 两队皆进球/总进球数 <br />
                        <strong>2.2.71.1.</strong> 两队皆进球/总进球数是指投注预测两队在赛事中的总进球数以及两队是否都在赛事中进球。<br />
                        <br />
                        <strong>2.2.71.2.</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.72.</strong> 上半场赛果/总进球数 <br />
                        <strong>2.2.72.1.</strong> 上半场赛果/总进球数是指投注预测赛事的上半场赛果以及两队在上半场的总进球数。<br />
                        <br />
                        <strong>2.2.72.2.</strong> 如果赛事在上半场期间中止，所有投注将视为无效。如果赛事在下半场期间中止，则所有投注将视为有效。 <br />
                        <br />
                        <strong>2.2.73.</strong> 主队均进球上半场/下半场 <br />
                        <strong>2.2.73.1.</strong> 主队均进球，上半场/下半场是指投注预测主队是否均在上半场和下半场都进球。<br />
                        <br />
                        <strong>2.2.73.2.</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.74.</strong> 客队均进球上半场/下半场 <br />
                        <strong>2.2.74.1.</strong> 客队均进球，上半场/下半场是指投注预测客队是否均在上半场和下半场都进球。<br />
                        <br />
                        <strong>2.2.74.2.</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.75.</strong> 特定15分钟分段投注（1X2） <br />
                        <strong>2.2.75.1.</strong> 特定15分钟分段投注（1X2）是指投注在每场比赛中的每15分钟（中场休息）结束时，预测三种可能的胜利结果中的任何一种。1表示首先被提及的队伍（通常是主队）；X代表比赛结果平手；2代表第二个被提及的队伍（通常是客队）。将以每15分钟比赛结果后决定胜负。<br />
                        <br />
                        <strong>2.2.75.2.</strong> 例如： <br />
                        <strong>第</strong><strong>15</strong><strong>分钟</strong><strong>1X2</strong><br />
                        预测从00:00 – 15:00三种可能的胜利结果中的任何一种，必须在第15分钟结束时或在这一刻之前投注。<br />
                        <br />
                        <strong>第</strong><strong>30</strong><strong>分钟</strong><strong>1X2</strong><br />
                        预测从15:01 – 30:00三种可能的胜利结果中的任何一种，必须在第15分钟结束时或在这一刻之前投注。<br />
                        <br />
                        <strong>第</strong><strong>45</strong><strong>分钟</strong><strong>1X2</strong><br />
                        预测从30:01 – 45:00三种可能的胜利结果中的任何一种，必须在第15分钟结束时或在这一刻之前投注。<br />
                        <br />
                        <strong>第</strong><strong>60</strong><strong>分钟</strong><strong>1X2</strong><br />
                        预测从45:01 – 60:00三种可能的胜利结果中的任何一种，必须在第15分钟结束时或在这一刻之前投注。<br />
                        <br />
                        <strong>第</strong><strong>75</strong><strong>分钟</strong><strong>1X2</strong><br />
                        预测从60:01 – 75:00三种可能的胜利结果中的任何一种，必须在第15分钟结束时或在这一刻之前投注。<br />
                        <br />
                        <strong>第</strong><strong>90</strong><strong>分钟</strong><strong>1X2</strong><br />
                        预测从75:01 – 90:00三种可能的胜利结果中的任何一种，必须在第15分钟结束时或在这一刻之前投注。 <br />
                        <br />
                        <strong>2.2.75.3.</strong> 对于特定的15分钟1X2，根据现场转播显示的时间，在确定得分（球超过球门线）、角球数（获得角球）和总红黄牌数（由官方裁判掏牌）时结算投注。<br />
                        <br />
                        <strong>2.2.75.4.</strong> 如果暂停或放弃比赛，那么在未结束的这一特定15分钟内的投注将被视为无效。如果指定的特定15分钟1X2结束，那么投注将视为有效。<br />
                        <br />
                        <strong>2.2.75.5.</strong> 对于在任意特定15分钟1X2盘的最后两（2）分钟内的即时投注，除了以下提到的，任何其他行动都将被视为安全玩法，因此所有未决投注将是可接受的：进球；点球和红牌。<br />
                        <br />
                        <strong>2.2.75.6.</strong> 对于30:01 – 45:00和75:01 – 90:00这两个时段，根据现场转播显示的时间，但不包括加时和伤停补时，在确定得分（球超过球门线）、角球数（获得角球）和总红黄牌数（由官方裁判掏牌）时结算投注。 <br />
                        <br />
                        <strong>2.2.76.</strong> 哪支球队晋级 <br />
                        <strong>2.2.76.1.</strong> 预测常规时间结束时，哪半场（上下半场）有最多的进球。不包括加时赛和点球大战。 <br />
                        <br />
                        <strong>2.2.77.</strong> 特定10分钟让球分段投注 (HDP)<br />
                        <strong>2.2.77.1.</strong> 特定10分钟分段投注 (HDP) 的意思是，在每场比赛中的每10分钟 [中场休息] 结束时，将假定的让分数预先加给其中一方参赛者或队伍并据此进行投注。将让分数加上每10分钟比赛结果后，得分较高的参赛者或队伍即为赢家。<br />
                        <br />
                        <strong>2.2.77.2.</strong> 供于参考:<br />
                        第10分钟HDP<br />
                        预测从00:00至10:00得分较高的参赛者或队伍，必须在第10分钟结束时或在这一刻之前投注。<br />
                        第20分钟HDP<br />
                        预测从10:01至20:00得分较高的参赛者或队伍，必须在第20分钟结束时或在这一刻之前投注。<br />
                        第30分钟HDP<br />
                        预测从20:01至30:00得分较高的参赛者或队伍，必须在第30分钟结束时或在这一刻之前投注。<br />
                        第40分钟HDP<br />
                        预测从30:01至40:00得分较高的参赛者或队伍，必须在第40分钟结束时或在这一刻之前投注。<br />
                        第60分钟HDP<br />
                        预测从50:01至60:00得分较高的参赛者或队伍，必须在第60分钟结束时或在这一刻之前投注。<br />
                        第70分钟HDP<br />
                        预测从60:01至70:00得分较高的参赛者或队伍，必须在第70分钟结束时或在这一刻之前投注。<br />
                        第80分钟HDP<br />
                        预测从70:01至80:00得分较高的参赛者或队伍，必须在第80分钟结束时或在这一刻之前投注。<br />
                        第90分钟HDP<br />
                        预测从80:01至90:00得分较高的参赛者或队伍，必须在第90分钟结束时或在这一刻之前投注。 <br />
                        <br />
                        <strong>2.2.77.3.</strong> 对于特定的10分钟HDP，根据现场转播显示的时间，在确定得分（球超过球门线）、角球数（获得角球）和总红黄牌数（由官方裁判掏牌）时结算投注。<br />
                        <br />
                        <strong>2.2.77.4.</strong> 如果暂停或放弃比赛，那么在未结束的这一特定10分钟内的投注将被视为无效。如果指定的特定10分钟HDP结束，那么投注有效。<br />
                        <br />
                        <strong>2.2.77.5.</strong> 对于在任意特定10分钟让球盘的最后两（2）分钟内的即时投注，除了以下提到的，任何其他行动都将被视为安全玩法，因此所有未决投注将是可接受的：进球；点球和红牌。<br />
                        <br />
                        <strong>2.2.77.6.</strong> 对于80:01 – 90:00这个时段，根据现场转播显示的时间，但不包括加时和伤停补时，在确定得分（球超过球门线）、角球数（获得角球）和总红黄牌数（由官方裁判掏牌）时结算投注。 <br />
                        <br />
                        <strong>2.2.78.</strong> 第一个点球进或不进 <br />
                        <strong>2.2.78.1.</strong> 第一个点球进或不进是指投注预测该比赛中的第一个点球将会进或错失点球。 <br />
                        <br />
                        <strong>2.2.79.</strong> 最高名次球队的球衣赞助商 <br />
                        <strong>2.2.79.1.</strong> 最高名次球队的球衣赞助商是指投注预测哪个球衣赞助商的球队会赢得冠军头衔。 <br />
                        <br />
                        <strong>2.2.80.</strong> 冠军队教练的洲籍 <br />
                        <strong>2.2.80.1.</strong> 冠军队教练的洲籍是指投注预测冠军队主教练的原籍大洲。 <br />
                        <br />
                        <strong>2.2.81.</strong> 净胜球数 <br />
                        <strong>2.2.81.1.</strong> 净胜球数是指投注预测主队和客队之间的胜方和输赢比数。<br />
                        <br />
                        <strong>2.2.81.2.</strong> 这种投注类型的选项例如有： </p>
                    <ul type="disc">
                        <li>主队以1球取胜 </li>
                        <li>主队以2球取胜 </li>
                        <li>主队以3球或以上取胜 </li>
                        <li>任何平局的比数 </li>
                        <li>客队以1球取胜 </li>
                        <li>客队以2球取胜 </li>
                        <li>客队以3球或以上取胜 </li>
                    </ul>
                    <p style={{align:"left"}}><br />
                        <strong>2.2.81.3.</strong> 任何的加时赛将不包括在判定净胜球数的投注类型。 <br />
                        <br />
                        <strong>2.2.82.</strong> 下一个进球 <br />
                        <strong>2.2.82.1.</strong> 下一个进球是指投注预测该比赛下一个进球的球队。 <br />
                        <br />
                        <br />
                        <strong>2.2.83.</strong> 判罚点球 <br />
                        <strong>2.2.83.1.</strong> 判罚点球是指投注预测是否在该赛事中有判罚点球。<br />
                        <br />
                        <strong>2.2.83.1.</strong>以下为投注选项： </p>
                    <ul type="disc">
                        <li>有 </li>
                        <li>没有 </li>
                    </ul>
                    <p style={{align:"left"}}><br />
                        <strong>2.2.84.</strong> 进球最多的半场 <br />
                        <strong>2.2.84.1.</strong> 进球最多的半场是指投注预测比赛中的哪一个半场进球最多。<br />
                        <br />
                        <strong>2.2.84.2.</strong> 投注选项包括： </p>
                    <ul type="disc">
                        <li>上半场 </li>
                        <li>下半场 </li>
                        <li>打和 </li>
                    </ul>
                    <p style={{align:"left"}}><strong>2.2.84.3.</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。<br />
                        <br />
                        <strong>2.2.84.4.</strong> 主队进球最多的半场 <br />
                        <strong>2.2.84.4.1</strong> 主队进球最多的半场是指投注预测主队在比赛中的哪一个半场进球最多。<br />
                        <br />
                        <strong>2.2.84.4.2</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <br />
                        <strong>2.2.84.5.</strong> 客队进球最多的半场 <br />
                        <strong>2.2.84.5.1</strong> 客队进球最多的半场是指投注预测客队在比赛中的哪一个半场进球最多。<br />
                        <br />
                        <strong>2.2.84.5.2</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 <br />
                        <br />
                        <strong>2.2.85.</strong> 上半场/下半场波胆 <br />
                        <strong>2.2.85.1</strong> 上半场/下半场波胆是指投注均预测上半场的比分和下半场结束后的比分。<br />
                        <br />
                        <strong>2.2.85.2</strong> 如果赛事中止，除非投注结算已可被确认，否则投注将视为无效。 </p>
                    <p><br />
                        <strong>2.2.86.</strong> 净胜球
                    </p>
                    <p> </p>
                    <p><strong>2.2.86.1.</strong> 常规时间结束时，注单会根据比赛净胜球数来结算。不包括加时赛和点球大战。.<br />
                        <br />
                        <strong>2.2.86.2.</strong> 如果比赛在常规时间内中断的话，所有投注在净胜球盘口的注单将被视为无效。 </p>
                </div>
                <h4 className="title2" id="44">3. 特定赛事投注规则<a href="#top" className="ReturnTop">返回顶部</a> </h4>
                <div className="helpContent">
                    <p style={{align:"left"}}><strong>3.1. </strong><strong>足球规则</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.1.1.</strong> 当比赛被安排在常规时间以外进行（例如各种比赛或友谊赛的特殊比赛时间），则所有投注在该预定时间结束时结算。 <br />
                        <strong>3.1.1.1</strong> 当比赛时间少于常规时间时，赌盘经营方有权搁置所有投注的结算，直到比赛的官方结果公布为止。<br />
                        <br />
                        <strong>3.1.1.2.</strong> 除非在所有足球比赛之前网站上明确显示了非常规时间的比赛，否则对此类比赛的投注将被视为无效。 <br />
                        <br />
                        <strong>3.1.2</strong> 如果一场足球比赛延期、中止或暂停，并且未在预定开始时间后的12个小时内复赛，则本比赛投注无效（不论官方决定的结果如何）。所有对中止/暂停比赛的投注结果将由本公司全权决定。<br />
                        <br />
                        <strong>3.1.3.</strong> 上半场（1H）仅适用于上半场比赛。如果一场比赛在上半场进行期间中止，则所有投注会被视为无效。如果一场比赛在下半场进行期间中止，则所有有关上半场的投注仍被视为有效。<br />
                        <br />
                        <strong>3.1.4.</strong> 本公司提供信息（例如中立场地、红牌、计时、统计信息、日期、生效日期等）服务，同时不接受任何相关责任。客户有责任确认任何比赛的正确信息。<br />
                        <br />
                        <strong>3.1.5.</strong> 除非另有说明，如果一项比赛预计在一个中立场地上展开（但却在非中立的场地上展开，反之亦然），所有的投注仍将被视为有效。<br />
                        <br />
                        如果场地变更（主场球队打客场球队的场地变更或反之亦然），对该场比赛的所有投注都将被视为无效。如果主场和客场团队的名称被错误地颠倒，投注也会被视为无效。<br />
                        <br />
                        <strong>3.1.6.</strong> 得分会更新用于足球的现场投注，而在现场交易时显示的赌盘是投注之时所显示的得分。定时器和红牌公告都仅作参考之用。<br />
                        <br />
                        <strong>3.1.7.</strong> 对于现场投注，在一场比赛中，本公司可自行全权认定可能会影响一支球队或一名球员的得分、结果、表现的危险行为；或者批准改变赔率/赌金或赌盘或投注信息（“危险比赛”），本公司有权暂停接受投注并且可以在“危险比赛”后接受或拒绝投注。在一场比赛中的所有其它行为都被视为安全比赛，投注仍会被接受。<br />
                        <br />
                        <strong>3.1.8.</strong> 对于大多数比赛（由本公司决定）的现场投注，可在第90分钟以及任何伤停时间内下注。但在比赛进行后的第85分钟或常规比赛时间结束前的最后五分钟（以适用于一场比赛者为准），任何除了本3.1.8节中所述行为以外的行为将被视作安全比赛，因此所有待定的投注都可被接受：在大禁区中或附近进行比赛；判罚点球；以及本公司认定为危险（可能进球）的任意球。<br />
                        <br />
                        <strong>3.1.9.</strong> 对于现场投注，在裁判宣布半场以及/或者全场比赛时间结束的一刻，所有待定的投注都会被自动拒绝。<br />
                        <br />
                        <strong>3.1.10.</strong> 对于除特定15分钟大/小盘，特定10分钟大/小盘和特定15分钟让分盘的最后两（2）分钟以外的现场投注，当有进球时，待定投注将被拒绝，而当点球罚偏，被视为处于安全区域时，待定的投注将会被接受。<br />
                        <br />
                        <strong>3.1.11.</strong> 对于大多数梦幻比赛（由本公司决定）的现场投注，可在第90分钟以及任何伤停时间内下注。但从比赛开始（00：00）到常规比赛时间（第90分钟）结束前（以适用于一场比赛者为准），任何除了本节下文所述行为以外的行为将被视作安全比赛，因此所有待定的投注都可被接受：在大禁区中或附近进行比赛；判罚点球；以及本公司认定为危险（可能进球）的任意球。 </p>
                    <p style={{align:"left"}}><strong>3.2. </strong><strong>篮球</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.2.1.</strong> 所有全场赌盘包括现场投注将会根据包括加时赛在内的最终赛果结算（除非另有说明）。<br />
                        <br />
                        <strong>3.2.2.</strong> 如果一场比赛没有在预定开始日期开始，则所有投注将无效（除非另有说明）。<br />
                        <br />
                        <strong>3.2.3.</strong> 如果一项比赛开始进行，但在预定开始时间后的十二个小时内暂停或中止，只要至少一场NBA比赛的四十三（43）分钟，或任何其它篮球比赛的三十五（35）分钟已经完成，则全场投注仍会被视为有效。如果相关主办单位宣布了一个官方结果，则投注也会被视为有效。否则对于暂停或中止的比赛的投注将为无效，除了对无条件决定的赌盘所下投注以外。<br />
                        <br />
                        <strong>3.2.4.</strong> 上半场的赛果为第一节和第二节的总得分。下半场的赛果是第三节和第四节的总得分，包括任何可能进行的加时赛。<br />
                        <br />
                        <strong>3.2.5.</strong> 第四节的赛果不包括任何可能会进行的加时赛。 <br />
                        <br />
                        <strong>3.2.6.</strong> 如果一场比赛暂停或中止，对未完成的半场或小节的投注将被视为无效。如果指定的半场或小节已经完成，则投注有效。<br />
                        <br />
                        <strong>3.2.7.</strong> 得分不会更新用于篮球比赛的现场投注，在现场交易时显示的让分是指在比赛开始时的得分，即0-0。所显示的时间和得分仅作参考之用。<br />
                        <br />
                        <strong>3.2.8.</strong> “首先得分球队”的赌盘是根据率先得分的球队进行结算的。如果一场比赛在已经实现得分后暂停或中止，则投注仍然有效。 <br />
                        <br />
                        <strong>3.2.9.</strong> “最后得分球队”的赌盘是根据一场比赛（包括加时赛）或者特定半场/小节（不包括加时赛）中最后得分的球队进行结算的。如果一场比赛暂停或中止，则所有投注将为无效，除了对无条件决定的赌盘所下投注以外。<br />
                        <br />
                        <strong>3.2.10.</strong> 如果双方球员都参与了比赛，特殊赌盘（包括分数、篮板球、助攻、三分球、罚球等）就有效。如果一方或双方球员未参与比赛，则所有投注都无效。特殊赌盘的结果包括加时赛，除非另有说明。当主办单位（NBA.com、FIBA.com等）在比赛结束时宣布了官方结果，这些结果会被认可，并且之后任何统计资料的变更对于投注来说，皆无效。 <br />
                        <strong>3.2.10.1.</strong> 主队最终得分 —尾数/客队最终得分—尾数 <br />
                        <strong>3.2.10.1.1.</strong> 预测主队或客队最终得分的尾数<br />
                        <br />
                        <strong>3.2.10.1.2.</strong> 根据赛事官方公布的赛果结算，包含加时赛。 <br />
                        <br />
                        <strong>3.2.11.</strong> NCAA比赛的主场/客场信息仅供参考。<br />
                        <br />
                        <strong>3.2.12.</strong> 梦幻篮球赌盘（包括现场投注）是将不同比赛中的队伍进行配对或组合。这些涉及两支球队的比赛必须在同一天进行，否则投注将被视为无效。梦幻篮球赌盘的场地完全仅作参考之用。<br />
                        <br />
                        <strong>3.2.13.</strong> “赢得最多小节”的赌盘是根据在一场篮球比赛中赢得最多小节的球队进行结算的。如果一个特定小节的赛果是平局，则两支球队皆未赢得该小节。本赌盘不包括加时赛。如果一场比赛暂停或中止，则所有投注皆无效。 </p>
                    <strong>3.3. </strong><strong>美式足球</strong><strong> </strong>
                    <p style={{align:"left"}}><strong>3.3.1.</strong> 所有全场赌盘包括现场投注将会根据包括加时赛在内的最终赛果结算（除非本规则另有说明）。<br />
                        <br />
                        <strong>3.3.2.</strong> 如果一场比赛没有在预定开始日期开始，则所有投注将无效（除非另有说明）。<br />
                        <br />
                        <strong>3.3.3.</strong> 如果一场比赛在预定开始时间后的十二个小时内中止或暂停，只要比赛已经完成了五十五（55）分钟的赛程，则全场投注仍会被视作有效。如果相关主办单位宣布了一个官方结果，则投注也会被视为有效。否则对于暂停或中止的比赛的投注将为无效，除了对无条件决定的赌盘所下投注以外。<br />
                        <br />
                        <strong>3.3.4.</strong> 上半场的赛果为第一节和第二节的总得分。下半场的赛果是第三节和第四节的总得分，包括任何可能进行的加时赛。<br />
                        <br />
                        <strong>3.3.5.</strong> 第四节的赛果不包括任何可能会进行的加时赛。<br />
                        <br />
                        <strong>3.3.6.</strong> 如果一场比赛暂停或中止，对未完成的半场或小节的投注将被视为无效。如果指定的半场或小节已经完成，则投注有效。<br />
                        <br />
                        <strong>3.3.7.</strong> 得分会更新用于美式足球的现场投注，而在现场交易时显示的赌盘是投注之时所显示的得分。<br />
                        <br />
                        <strong>3.3.8.</strong> “首先得分球队”的赌盘是根据率先得分的球队进行结算的。如果一场比赛在已经实现得分后暂停或中止，则投注仍然有效。<br />
                        <br />
                        <strong>3.3.9.</strong> “最后得分球队”的赌盘是根据最后得分的球队进行结算的。如果一场比赛暂停或中止，则所有投注皆无效。<br />
                        <br />
                        <strong>3.3.10.</strong> NCAA比赛的主场/客场信息仅供参考。<br />
                        <br />
                        <strong>3.3.11.</strong> 对于现场投注，在比赛过程中，本公司拥有全权及绝对酌情权，我们认为可能会影响一支球队或球员的比分、结果、表现的这些行为是危险，;认股权证改变了赔率/价格或市场或投注信息（“危险比赛”），本公司有权暂停接受投注，可能接受或拒绝危险比赛之后的投注。在比赛中的所有其他行动被认为是安全比赛和继续接受投注。 </p>
                    <p style={{align:"left"}}><strong>3.4. </strong><strong>棒球</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.4.1.</strong> 投手姓名仅供参考。不论先发投手是谁，所有的棒球投注都有效。<br />
                        <br />
                        <strong>3.4.2.</strong> 所有全场赌盘包括现场投注将会根据包括加赛局数在内的最终赛果结算（除非本规则另有说明）。日本棒球赛可以宣布平局，而在此情况下，“胜负盘（moneyline）”的赌金将会被退回。 <strong>3.4.3.</strong> 如果一场比赛没有在预定开始日期开始，则所有投注将无效（除非另有说明）。<br />
                        <br />
                        <strong>3.4.4.</strong> 只有比赛必须进行9（九）局时（或者如果主队领先，则为8.5局），棒球投注才会被视为有效。如果一场比赛暂停并且在第二天完成，则所有投注（除了对无条件决定的赌盘所做投注以外）将会被视为无效。<br />
                        <br />
                        <strong>3.4.5.</strong> 如果一场比赛暂停或进入延长赛，则得分将在完整局数后确定，除非主队在局数下半场打成平手或领先，在此情况下，得分会在比赛停止时确定。 <br />
                        <br />
                        <strong>3.4.6.</strong> 前五局投注是根据前五局结束时的赛果进行结算的。如果不论因任何原因而未打满五局，则所有投注都会被视为无效。 <br />
                        <br />
                        <strong>3.4.7.</strong> 得分会更新用于棒球的现场投注，而在现场交易时显示的赌盘是投注之时所显示的得分。 <br />
                        <br />
                        <strong>3.4.8.</strong> 在世界棒球经典赛中，如果在一支队伍已打击至少七局后，另一队伍领先十分或以上，或者一支队伍至少打击五局后，另一支队伍已领先十五分以上，比赛可以提前结束。如果出现此类情况，所有投注均有效。<br />
                        <br />
                        <strong>3.4.9.</strong> 国际棒球比赛（如奥运会棒球比赛）在已经完成6.5局的情况下，可以提前结束，并且投注会被视为有效。 <br />
                        <br />
                        <strong>3.4.10.</strong> 对于现场投注，在比赛过程中，本公司拥有全权及绝对酌情权，我们认为可能会影响一支球队或球员的比分、结果、表现的这些行为是危险，;认股权证改变了赔率/价格或市场或投注信息（“危险比赛”），本公司有权暂停接受投注，可能接受或拒绝危险比赛之后的投注。在比赛中的所有其他行动被认为是安全比赛和继续接受投注。 </p>
                    <p style={{align:"left"}}><strong>3.5. </strong><strong>冰上曲棍球</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.5.1.</strong> 全场赌盘会提供“仅指常规比赛时间”或者“包括加时赛和点球大战”，或者两者皆有。客户应始终参看赌盘名称。对于由点球大战决定的比赛，获胜队伍的得分会被增加一个进球，以便确定最终赛果。<br />
                        <br />
                        <strong>3.5.2.</strong> 如果一场比赛没有在预定开始日期开始，则所有投注将无效（除非另有说明）。<br />
                        <br />
                        <strong>3.5.3.</strong> 如果一场比赛在预定开始时间后的十二个小时内中止或暂停，只要比赛已经完成了五十五（55）分钟的赛程，则全场投注仍会被视作有效。如果相关主办单位宣布了一个官方结果，则投注也会被视为有效。否则对于暂停或中止的比赛的投注将为无效，除了对无条件决定的赌盘所下投注以外。<br />
                        <br />
                        <strong>3.5.4.</strong> 对于赛局投注，必须完成一局，投注才会被视为有效。 <br />
                        <br />
                        <strong>3.5.5.</strong> 第三局结果不包括任何可能会进行的加时赛或点球大战。 <br />
                        <br />
                        <strong>3.5.6.</strong> “冰上曲棍球现场投注”是根据正规时间（三局）结束时的赛果结算的。加时赛和点球大战的结果不计入内。<br />
                        <br />
                        <strong>3.5.7.</strong> 得分会更新用于冰上曲棍球的现场投注，而在现场交易时显示的赌盘是投注之时所显示的得分。 <br />
                        <br />
                        <strong>3.5.8.</strong> 对于现场投注，在比赛过程中，本公司拥有全权及绝对酌情权，我们认为可能会影响一支球队或球员的比分、结果、表现的这些行为是危险，; 认股权证改变了赔率/价格或市场或投注信息（“危险比赛”），本公司有权暂停接受投注，可能接受或拒绝危险比赛之后的投注。在比赛中的所有其他行动被认为是安全比赛和继续接受投注。 </p>
                    <p style={{align:"left"}}><strong>3.6. </strong><strong>网球</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.6.1.</strong> 胜负盘指比赛或指定盘的赢家。让分赌盘依盘或比赛（请参阅赌盘名称）决定；大/小盘和单/双盘则依比赛（除非另有说明）而定。<br />
                        <br />
                        <strong>3.6.2.</strong> 如果选手没有参与一场锦标赛或比赛，则对该名选手的所有投注将为无效。<br />
                        <br />
                        <strong>3.6.3.</strong> 如果一名选手（或双人搭档）在一场比赛中退出或被取消资格，则所有投注将为无效，除了对无条件决定的赌盘所下投注以外。<br />
                        <br />
                        <strong>3.6.4.</strong> 如果一场比赛延期或暂停，只要比赛会完成，则所有投注仍会被视为有效。<br />
                        <br />
                        <strong>3.6.5.</strong> 不论场地或球场表面发生任何变化（包括比赛从户外转向室内球场，反之亦然），则所有投注仍会被视为有效。<br />
                        <br />
                        <strong>3.6.6.</strong> 如果一场比赛原定的获胜所需盘数改变，则所有投注将无效，除了对无条件决定的赌盘的投注以外。<br />
                        <br />
                        <strong>3.6.7.</strong> 第一盘赢家（第二、第三盘赢家等）是指指定盘的结果。如果指定的盘未完成，则所有投注将被视为无效。 <br />
                        <br />
                        <strong>3.6.8.</strong> 网球现场投注是依据比赛（或指定盘）结果结算的。网球现场投注时，得分不会更新。<br />
                        <br />
                        <strong>3.6.9.</strong> “最多发球得分”（两次发球失误等）赌盘是根据官方的比赛统计资料结算的。如果一名选手在比赛结束前退出或被取消比赛资格，则所有投注将无效。 <br />
                        <br />
                        <strong>3.6.10.</strong> “首先发球得分”（两次发球失误等）赌盘是根据官方的比赛统计资料结算的。如果首先发球得分（两次发球失误等）赌盘已经确定，则所有投注仍将被视为有效，即使比赛因为选手退出或被取消资格而未完成。如果在选手退出或被取消资格时没有发球得分（两次发球失误），则所有投注将被视为无效。 <br />
                        <br />
                        <strong>3.6.11.</strong> 赛局获胜方是指特定赛局的获胜方，如第1盘第1局，第1盘第2局等。如果一盘进入决胜局，则赌盘将指定为第第1盘决胜局；第2盘决胜局等。如果比赛完成前有选手退出/被取消资格，则所有投注将被视为无效。如果一场赛局是经裁判判决“罚赛”结束，则该场赛局的所有投注将被视为无效（不过，如果赛局因“罚分”而结束，则所有投注仍然有效。）如果一场比赛暂停，只要比赛会完成，则所有投注仍会被视为有效。 </p>
                    <p style={{align:"left"}}><strong>3.7. </strong><strong>羽毛球</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.7.1.</strong> 胜负盘指比赛或指定局的赢家。让分盘依局或得分（请参阅赌盘名称）决定；大/小盘和单/双盘则依得分（除非另有说明）而定。<br />
                        <br />
                        <strong>3.7.2.</strong> 如果选手没有参与一场锦标赛或比赛，则对该名选手的所有投注将为无效。 <br />
                        <br />
                        <strong>3.7.3.</strong> 如果一名选手（或双人搭档）在一场比赛中退出或被取消资格，则所有投注将为无效，除了对无条件决定的赌盘所下投注以外。<br />
                        <br />
                        <strong>3.7.4.</strong> 如果一场比赛延期或暂停，只要比赛在十二个小时内复赛，则所有投注仍会被视为有效。<br />
                        <br />
                        <strong>3.7.5.</strong> 第一局赢家（第二、第三局赢家等）指指定局的结果。如果指定的局未完成，则所有投注将被视为无效。<br />
                        <br />
                        <strong>3.7.6.</strong> 羽毛球现场投注是依据比赛（或指定局）结果结算的。羽毛球现场投注时，得分不会更新。 </p>
                    <p style={{align:"left"}}><strong>3.8. </strong><strong>乒乓球</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.8.1.</strong> 胜负盘指比赛或指定局的赢家。让分盘依局或得分（请参阅赌盘名称）决定；大/小盘和单/双盘则依得分（除非另有说明）而定。<br />
                        <br />
                        <strong>3.8.2.</strong> 如果选手没有参与一场锦标赛或比赛，则对该名选手的所有投注将为无效。<br />
                        <strong>3.8.3.</strong> 如果一名选手（或双人搭档）在一场比赛中退出或被取消资格，则所有投注将为无效，除了对无条件决定的赌盘所下投注以外。<br />
                        <br />
                        <strong>3.8.4.</strong> 如果一场比赛延期或暂停，只要比赛在十二个小时内复赛，则所有投注仍会被视为有效。<br />
                        <br />
                        <strong>3.8.5.</strong> 第一局赢家（第二、第三局赢家等）是指指定局的结果。如果指定的局未完成，则所有投注将被视为无效。 <br />
                        <br />
                        <strong>3.8.6.</strong> 乒乓球现场投注是依据比赛（或指定局）结果结算的。乒乓球现场投注时，得分不会更新。 </p>
                    <p style={{align:"left"}}><strong>3.9. </strong><strong>排球和沙滩排球</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.9.1.</strong> 胜负盘指比赛或指定局的赢家。让分盘依局或得分（请参阅赌盘名称）决定；大/小盘和单/双盘则依得分（除非另有说明）而定。 <br />
                        <br />
                        <strong>3.9.2.</strong> 如果一支球队没有参与一场锦标赛或比赛，则对该支球队的所有投注将为无效。<br />
                        <br />
                        <strong>3.9.3.</strong> 如果一支球队在一场比赛中退出或被取消资格，则所有投注将为无效，除了对无条件决定的赌盘所下投注以外。<br />
                        <br />
                        <strong>3.9.4.</strong> 如果一场比赛延期或暂停，只要比赛在十二个小时内复赛，则所有投注仍会被视为有效。<br />
                        <br />
                        <strong>3.9.5.</strong> 第一局赢家（第二、第三局赢家等）是指指定局的结果。如果指定的局未完成，则所有投注将被视为无效。<br />
                        <br />
                        <strong>3.9.6.</strong> 排球现场投注是依据比赛（或指定局）结果结算的。排球现场投注时，得分不会更新。 </p>
                    <p style={{align:"left"}}><strong>3.10. </strong><strong>曲棍球</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.10.1.</strong> 所有全场赌盘包括现场投注将会根据正规时间结束时的最终赛果结算。加时赛、金球赛和点球大战不计入全场赌盘。（有关加时赛（ET）和点球大战（PEN）的特定赌盘可接受下注。）<br />
                        <br />
                        <strong>3.10.2.</strong> 如果一场比赛延期、暂停或中止，并且未在预定开赛时间后的十二个小时内复赛，则所有投注会被视为无效，除了对对无条件决定的赌盘所下投注以外。如果相关主办单位宣布了一个官方结果，则投注也会被视为有效。<br />
                        <br />
                        <strong>3.10.3.</strong> “上半场”赌盘指上半场比赛的结果。如果指定的半场未完成，则所有投注将被视为无效。 <br />
                        <br />
                        <strong>3.10.4.</strong> “曲棍球现场投注”是根据正规时间结束时的比赛结果进行结算的。<br />
                        <br />
                        <strong>3.10.5.</strong> 得分会更新用于曲棍球的现场投注，而在现场交易时显示的赌盘是投注之时所显示的得分。 <br />
                        <br />
                        <strong>3.10.6.</strong> 对于现场投注，在比赛过程中，本公司拥有全权及绝对酌情权，我们认为可能会影响一支球队或球员的比分、结果、表现的这些行为是危险，; 认股权证改变了赔率/价格或市场或投注信息（“危险比赛”），本公司有权暂停接受投注，可能接受或拒绝危险比赛之后的投注。在比赛中的所有其他行动被认为是安全比赛和继续接受投注。 </p>
                    <p style={{align:"left"}}><strong>3.11. </strong><strong>斯诺克与台球</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.11.1.</strong> 胜负盘及让分盘指比赛的赢家。大/小盘和单/双盘是根据盘数/三角框数确定的（除非另有说明）。<br />
                        <br />
                        <strong>3.11.2.</strong> 如果一名选手没有参与一场锦标赛或比赛，则对该名选手的所有投注将为无效。<br />
                        <br />
                        <strong>3.11.3.</strong> 如果一场比赛已开始，但未完成，则所有投注将为无效，除了对无条件决定的赌盘所下投注以外。<br />
                        <br />
                        <strong>3.11.4.</strong> 斯诺克和台球现场投注是依据比赛（或指定盘/三角框）结果结算的。斯诺克和台球现场投注时，得分不会更新。<br />
                        <br />
                        <strong>3.11.5.</strong> 对于单局赌盘大/小盘和单/双盘，是依该盘总得分而定。<br />
                        <br />
                        <strong>3.11.6.</strong> 哪位选手将击入第一颗红球？交易指的是选手在一场比赛或某一局中击入第一个有效红球，即在没有犯规的情况下击入第一个红球。（如果一局里需要将球重摆，那么原局的所有赌注仍然有效。）<br />
                        <br />
                        <strong>3.11.7.</strong> 哪位选手首先得到30分？交易指的是哪位选手将在某一局里首先得到三十分。（如果一局里需要将球重摆，那么原局的所有赌注仍然有效。）<br />
                        <br />
                        <strong>3.11.8.</strong> 单杆最高得分指的是在某一局、某场比赛或锦标赛里由某一选手或某些选手“单杆”的最高得分。<br />
                        <br />
                        <strong>3.11.9.</strong> 单杆过百总数指的是在某一局或某一锦标赛里“单杆”超过100分的总次数。 </p>
                    <p style={{align:"left"}}><strong>3.12. </strong><strong>高尔夫球</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.12.1.</strong> 所有高尔夫球投注都是按照官方锦标赛的结果来结算的。<br />
                        <br />
                        <strong>3.12.2.</strong> 如果一名选手没有参与一场锦标赛或特定回合，则对该名选手的所有投注将为无效。如果一名高尔夫球手在一场锦标赛和特定回合中退出或被取消资格，则对该选手的所有投注将全输。<br />
                        <br />
                        <strong>3.12.3.</strong> 如果一场锦标赛或特定回合延期或暂停，则所有投注将在预定结束时间后的四十八小时内有效。 <br />
                        <br />
                        <strong>3.12.4.</strong> 总冠军(锦标赛获胜者)<br />
                        <strong>3.12.4.1.</strong> “任何其他选手”或“场上选手”指总冠军赌盘中未提及的所有高尔夫球选手。<br />
                        <br />
                        <strong>3.12.4.2.</strong> 总冠军赌盘是依照锦标赛获胜者结算的，并且任何延长赛的结果都会计入结算。<br />
                        <br />
                        <strong>3.12.4.3.</strong> 如果一场锦标赛被官方缩短（即未完成原定洞数），只要官方宣布了获胜者，则所有投注仍然有效。然而，如果投注后未继续比赛，则该投注将无效。如果官方未宣布获胜者，则所有投注将被视为无效。 <br />
                        <br />
                        <strong>3.12.5.</strong> 锦标赛积分 <br />
                        <strong>3.12.5.1.</strong> 锦标赛积分指在一场锦标赛期间（通常是72洞）得分最低的高尔夫球手。如果比赛的洞数比原定低，只要官方公布了锦标赛的结果，则所有投注仍然有效。<br />
                        <br />
                        <strong>3.12.5.2.</strong> 两名高尔夫球手必须都有开球，投注才会有效。完成最多洞数（不包括延长赛）的高尔夫球手将会是获胜方。如果高尔夫球手完成了相同的洞数（同样不包括延长赛），则杆数最低的选手为获胜方。<br />
                        <br />
                        <strong>3.12.5.3.</strong> 如果一名高尔夫球手在开球后退出或被取消资格，则另一名选手将被视为获胜方。不过，如果一名选手在另一名选手已遭淘汰后才退出或被取消资格，则完成洞数最多的高尔夫球手仍然是获胜方。 <br />
                        <br />
                        <strong>3.12.5.4.</strong> 如果两名高尔夫球手在同一回合中都退出或被取消资格，则所有投注将为无效，不论每名选手完成了多少洞数。 <br />
                        <br />
                        <strong>3.12.6.</strong> 回合积分 <br />
                        <strong>3.12.6.1.</strong> 回合积分指在特定18洞比赛中杆数最低的高尔夫球手。延长赛不计入内。<br />
                        <br />
                        <strong>3.12.6.2.</strong> 两名高尔夫球手必须都有开球，投注才会有效。如果一名高尔夫球手在开球后退出或被取消资格，则另一名选手将被视为获胜方。不过，如果一名被取消资格的选手已经开始了下一回合，则原有杆数仍然有效。 <br />
                        <br />
                        <strong>3.12.7.</strong> 回合大/小盘 <br />
                        <strong>3.12.7.1.</strong> 回合大/小盘指一名高尔夫球手在指定18洞比赛中的杆数。延长赛不计入内。 <br />
                        <br />
                        <strong>3.12.7.2.</strong> 一名高尔夫球手必须开球，投注才会有效。如果一名高尔夫球手未能完成指定的18洞比赛，则所有投注会被视为无效。 <br />
                        <br />
                        <strong>3.12.8.</strong> 个人洞数大/小盘 <br />
                        <strong>3.12.8.1.</strong> 个人洞数大/小盘指在特定回合的特定洞上打出的杆数。 <br />
                        <br />
                        <strong>3.12.8.2.</strong> 如果高尔夫球手未能完成指定的18洞，则所有投注皆无效。 </p>
                    <p style={{align:"left"}}><strong>3.13. </strong><strong>赛车</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.13.1.</strong> 赛车包括但不限于一级方程式比赛、世界摩托车锦标赛（Moto GP）和A1GP世界杯汽车大奖赛。<br />
                        <br />
                        <strong>3.13.2.</strong> 领奖仪式的排名将被视为是正式赛果，不论之后是否出现取消或更改赛果的情况。如果没有颁奖仪式，则赛果为由相关主办单位在比赛结束后即刻公布的结果。排位赛赌盘依相关主办单位在排位赛后即刻公布的最终晋级排名而定。<br />
                        <br />
                        <strong>3.13.3.</strong> 如果预定的场地变更，则所有投注将被视为无效。<br />
                        <br />
                        <strong>3.13.4.</strong> 如果一场比赛延期，只要比赛在四十八小时内开始，则所有投注仍会被视为有效，否则所有投注将被视为无效。如果一场比赛开始但未完成，只要官方公布了一个赛果，则所有投注仍然有效。如果官方未公布赛果，则所有投注将被视为无效。<br />
                        <br />
                        <strong>3.13.5.</strong> 在摩托车比赛中，当热身圈开始的信号发出时，比赛即被视为开始。如果一名赛车手未从起跑位置（或维修道）准备出发，则对该赛车手的投注将被视为无效。如果一名赛车手未能从官方认定合格的赛程开始比赛，则对该赛车手的杆位投注将被视为无效。<br />
                        <br />
                        <strong>3.13.6.</strong> 对“对决”盘中，两名赛车手必须参与比赛（或官方资格赛），投注才会有效。终局排名领先的赛车手即为获胜方。如果两名赛车手都未能完成比赛，则完成最多圈数者会被视为获胜方。如果两名赛车手完成的圈数相同，则所有投注无效，除非官方公布了终局排名。<br />
                        <br />
                        <strong>3.13.7.</strong> 最快圈数盘指比赛中最快完成圈数的赛车手或赛车队。<br />
                        <br />
                        <strong>3.13.8.</strong> 分类到达终点的车手数量盘依据主办单位公布的官方结果而定。 <br />
                        <br />
                        <strong>3.13.9.</strong> 赛车现场投注是根据指定比赛的官方结果来结算的。 <br />
                        <br />
                        <strong>3.13.10.</strong> 单/双盘依据主办单位的最终排名而定。例如，如果赛车手A以第一名完成比赛，则结果为单；如果赛车手B以第2名完成比赛，则结果为双等等。如果一名车手没有得到官方分类，则投注将被视为无效并退款。 <br />
                        <br />
                        <strong>3.13.11.</strong> 胜负差数盘由主办单位公布的所选赛车手间的时间差（秒）而定。大盘表示时间差大于盘口所示时间，小盘表示时间差小于盘口所示时间。如果赛果时间差与盘口所示时间相同，则投注将被视为无效且会被退款。 </p>
                    <p style={{align:"left"}}><strong>3.14. </strong><strong>手球</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.14.1.</strong> 所有全场赌盘包括现场投注将会根据正规时间结束时的最终赛果结算。加时赛和点球大战不计入全场赌盘。<br />
                        <br />
                        <strong>3.14.2.</strong> 如果一场比赛延期、暂停或中止，并且未在预定开赛时间后的十二个小时内复赛，则所有投注会被视为无效，除了对无条件决定的赌盘所下投注以外。如果相关主办单位宣布了一个官方结果，则投注也会被视为有效。<br />
                        <br />
                        <strong>3.14.3.</strong> 手球现场投注是根据正规时间结束时的比赛结果进行结算的。<br />
                        <br />
                        <strong>3.14.4.</strong> 手球现场投注时，得分不会更新。 </p>
                    <p style={{align:"left"}}><strong>3.15. </strong><strong>水球</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.15.1.</strong> 所有全场赌盘包括现场投注将会根据正规时间（四小节）结束时的最终赛果结算。加时赛和点球大战不计入全场赌盘。<br />
                        <br />
                        <strong>3.15.2.</strong> 如果一场比赛延期、暂停或中止，并且未在预定开赛时间后的十二个小时内复赛，则所有投注会被视为无效，除了对无条件决定的赌盘所下投注以外。如果相关主办单位宣布了一个官方结果，则投注也会被视为有效。<br />
                        <br />
                        <strong>3.15.3.</strong> “上半场”赌盘指第一和第二节比赛的结果。如果指定的半场未完成，则所有投注将被视为无效。<br />
                        <br />
                        <strong>3.15.4.</strong> 水球现场投注是根据正规时间结束时的比赛结果进行结算的。 <br />
                        <br />
                        <strong>3.15.5.</strong> 水球现场投注时，得分不会更新。 </p>
                    <p style={{align:"left"}}><strong>3.16. </strong><strong>拳击</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.16.1.</strong> 如果比赛延期，只要在原定开赛日期后的十四天内举行，对延期比赛的投注仍会被视为有效。<br />
                        <br />
                        <strong>3.16.2.</strong> 如果比赛结果为平局，对于胜负盘（不提供平局投注的选项）的所有投注将无效。如果提供了平局赔率作为第三种投注选项，并且比赛以平局结束，则对平局的投注将赢得彩金，而对两名拳击手的投注则输。<br />
                        <br />
                        <strong>3.16.3.</strong> 当第一回合的钟敲响时，比赛即被视为开始。如果一名或两名拳击手未能参与比赛，则所有投注将无效。如果一名拳击手未能在标志回合开始的钟响时做出回应，或者在下一回合开始前被取消资格，则其对手就被视为赢得了上一回合。<br />
                        <br />
                        <strong>3.16.4.</strong> 所有投注将依比赛后在拳击场中公布的官方决定来结算。随后对赛果的更改将不适用于投注目的。 <br />
                        <br />
                        <strong>3.16.5.</strong> 击倒（KO）胜利也包括技术击倒（TKO）或因对手丧失资格（DSQ）而胜出。点数判决包括技术判决（TD），平局包括技术平局。<br />
                        <br />
                        <strong>3.16.6.</strong> 大/小盘是对比赛中的回合数投注，例如小于9.5表示比赛在第9回合的一分三十秒前结束；大于9.5表示比赛在第9回合的一分三十秒后结束（包括点数判决）。<br />
                        <br />
                        <strong>3.16.7.</strong> UFC（无限制格斗赛） <br />
                        <strong>3.16.7.1.</strong> UFC规则也适用于其它混合武术（MMA）所推广的比赛。<br />
                        <br />
                        <strong>3.16.7.2.</strong> 如果比赛延期，只要在原定开赛日期后的十四天内举行，对延期比赛的投注仍会被视为有效。<br />
                        <br />
                        <strong>3.16.7.3.</strong> 如果一场比赛以平局结束，则所有投注将无效。 </p>
                    <p style={{align:"left"}}><strong>3.17. </strong><strong>飞镖</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.17.1.</strong> 胜负线及赌盘指对比赛的赢家投注。让分盘和大/小盘是根据盘数确定的（除非另有说明）。<br />
                        <br />
                        <strong>3.17.2.</strong> 如果一场比赛延期，并且未能原定开始时间后的十二个小时内开始，则所有投注将被视为无效。<br />
                        <br />
                        <strong>3.17.3.</strong> 如果选手没有参与一场锦标赛或比赛，则对该名选手的所有投注将为无效。<br />
                        <br />
                        <strong>3.17.4.</strong> 如果一场比赛开始但未完成，则所有投注将被视为无效。<br />
                        <br />
                        <strong>3.17.5.</strong> 飞镖现场投注按比赛结果进行结算。飞镖现场投注时，得分不会更新。 <br />
                        <br />
                        <strong>3.17.6.</strong> “180分”盘指在一场比赛中获得最多“180分”的次数。 </p>
                    <p><strong>3.18. 板球</strong></p>
                    <p style={{align:"left"}}><strong>3.18.1.</strong> 对于有限轮比赛（包括ODI（单日国际板球赛）和Twenty20（20强板球赛）），所有投注将依比赛规则和官方结果进行结算。但是，如果比赛是由超级投球轮、击杀、掷铜板等决定结果的，则所有比赛投注将被视为无效。<br />
                        <br />
                        <strong>3.18.2.</strong> 如果官方结果为“无结果”或者比赛规则没有宣布获胜方，则所有投注将无效。<br />
                        <br />
                        <strong>3.18.3.</strong> 如果一场比赛延期或暂停，只要比赛在48个小时内复赛，则所有投注仍会被视为有效。 <br />
                        <br />
                        <strong>3.18.4.</strong> 国际板球锦标赛赌盘以1X2的形式提供。 1代表首先被提及的球队（通常是主场球队）；X代表比赛结果为和局；2代表第二个被提及的球队（通常是客场球队）。如果一场国际板球锦标赛以“平局”（与“和局”不同）结束，则所有比赛投注将被视为无效。如果一场比赛因为外界干扰因素而中止，则可宣布所有投注无效。<br />
                        <br />
                        <strong>3.18.5.</strong> 跑位最多赌盘指在一场比赛或特定局中获得最多跑位分数的选手。双方选手都必须站上击球界线，打击至少一球后，投注才有效。如果官方比赛结果为“无结果”，则所有对此盘的投注将无效。 <br />
                        <br />
                        <strong>3.18.6.</strong> 最多三柱门赌盘指在一场比赛或特定局中获得最多三柱门分数的选手。双方选手都必须至少投出一球后，投注才有效。如果官方比赛结果为“无结果”，则所有对此盘的投注将无效。 <br />
                        <br />
                        <strong>3.18.7.</strong> 最多六分打赌盘指在一场比赛或特定局中获得最多六分打分数的选手。如果官方宣布了一个结果，投注即有效。如果官方比赛结果为“无结果”，则所有对此盘的投注将无效。 <br />
                        <br />
                        <strong>3.18.8.</strong> 下一人出局赌盘指在一场比赛或特定局中哪名选手会首先出局。如果一名选手退出，则投注将被视为无效。如果无选手出局，则所有投注将被视为有效。即使官方宣布的结果为“无结果”，所有对判定的赌盘的投注仍会被视为有效。<br />
                        <br />
                        <strong>3.18.9.</strong> 总跑位赌盘指一名选手或球队在一场比赛中特定局中得到的总跑位数。一名选手都必须站上击球界线，打击至少一球后，投注才有效。如果官方比赛结果为“无结果”，则所有对此盘的投注将无效。 </p>
                    <p style={{align:"left"}}><strong>3.19. </strong><strong>英式橄榄球（</strong><strong>Rugby Union</strong><strong>）</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.19.1.</strong> 所有全场赌盘（包含实时投注）是以正规时间（80 分钟）结束时的结果进行结算。加时赛不计入全场赌盘的计算结果。 7人橄榄球的赌盘是以正规赛结束时的结果来进行结算 (通常是14或20分钟) 。加时赛将不计算在全场7人橄榄球的赌盘内。<br />
                        <br />
                        <strong>3.19.2.</strong> 如果一场比赛延期、暂停或中止，并且未在预定开赛时间后的十二个小时内复赛，则所有投注会被视为无效，除了对对无条件决定的赌盘所下投注以外。如果相关主办单位宣布了一个官方结果，则投注也会被视为有效。<br />
                        <br />
                        <strong>3.19.3.</strong> 上半场”赌盘仅指上半场比赛的结果。如果指定的半场未完成，则所有投注将被视为无效。<br />
                        <br />
                        <strong>3.19.4.</strong> 英式橄榄球现场投注是根据正规时间结束时的比赛结果进行结算的。<br />
                        <br />
                        <strong>3.19.5.</strong> 得分会更新用于英式橄榄球的现场投注，而在现场交易时显示的赌盘是投注之时所显示的得分。<br />
                        <br />
                        <strong>3.19.6.</strong> 对于现场投注，在比赛过程中，本公司拥有全权及绝对酌情权，我们认为可能会影响一支球队或球员的比分、结果、表现的这些行为是危险，; 认股权证改变了赔率/价格或市场或投注信息（“危险比赛”），本公司有权暂停接受投注，可能接受或拒绝危险比赛之后的投注。在比赛中的所有其他行动被认为是安全比赛和继续接受投注。 </p>
                    <p style={{align:"left"}}><strong>3.20. </strong><strong>联盟式橄榄球（</strong><strong>Rugby League</strong><strong>）</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.20.1.</strong> 所有全场赌盘包括现场投注将会根据比赛结束时的最终赛果结算，包括任何可能会进行的加时赛。 <br />
                        <br />
                        <strong>3.20.2.</strong> 如果一场比赛延期、暂停或中止，并且未在预定开赛时间后的十二个小时内复赛，则所有投注会被视为无效，除了对对无条件决定的赌盘所下投注以外。如果相关主办单位宣布了一个官方结果，则投注也会被视为有效。<br />
                        <br />
                        <strong>3.20.3.</strong> “上半场”赌盘仅指上半场比赛的结果。如果指定的半场未完成，则所有投注将被视为无效。<br />
                        <br />
                        <strong>3.20.4.</strong> 联盟式橄榄球现场投注是根据比赛结束时的最终赛果结算，包括任何可能会进行的加时赛。<br />
                        <br />
                        <strong>3.20.5.</strong> 得分会更新用于联盟式橄榄球的现场投注，而在现场交易时显示的赌盘是投注之时所显示的得分。<br />
                        <br />
                        <strong>3.20.6.</strong> 对于现场投注，在比赛过程中，本公司拥有全权及绝对酌情权，我们认为可能会影响一支球队或球员的比分、结果、表现的这些行为是危险，; 或者认股权证改变了赔率/价格或市场或投注信息（“危险比赛”），本公司有权暂停接受投注，可能接受或拒绝危险比赛之后的投注。在比赛中的所有其他行动被认为是安全比赛和继续接受投注。 </p>
                    <p style={{align:"left"}}><strong>3.21. </strong><strong>田径</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.21.1.</strong> 总冠军（赢得金牌）赌盘指每项田径赛事的获胜者。<br />
                        <br />
                        <strong>3.21.2.</strong> 胜负盘指一项赛事（或指定分组赛）中排名第一的选手。如果只有一名运动员进入一项赛事的决赛，则对该名选手的投注即赢得彩金。如果两名选手都未能进入决赛，则在资格赛时分组成绩较好的选手即是赢家。<br />
                        <br />
                        <strong>3.21.3.</strong> 所有投注依官方结果结算，即颁奖仪式的排名。之后如有任何取消资格或更改赛果的情况，将不适用于投注之目的。<br />
                        <br />
                        <strong>3.21.4.</strong> 如果一场比赛延期，暂停或中止，并且未能原定开始时间后的十二个小时内开始，则所有投注将被视为无效。<br />
                        <br />
                        <strong>3.21.5.</strong> 如果一名运动员未参与一项赛事，则所有投注将为无效。如果一名运动员参与比赛的程度足以形成官方赛果或分组的记录（包括DSQ（取消资格）但不包括DNS（未参赛）），则该名运动员会被视为已经参赛。 </p>
                    <p><strong>3.22. 游泳</strong></p>
                    <p> </p>
                    <p style={{align:"left"}}><strong>3.22.1.</strong> 总冠军（赢得金牌）赌盘指每项游泳赛事的获胜者。<br />
                        <br />
                        <strong>3.22.2.</strong> 胜负盘指一项赛事（或指定分组赛）中排名第一的选手。如果只有一名游泳运动员进入一项赛事的决赛，则对该名选手的投注即赢得彩金。如果两名游泳运动员都未能进入决赛，则在资格赛时分组成绩较好的选手即是赢家。<br />
                        <br />
                        <strong>3.22.3.</strong> 所有投注依官方结果结算，即颁奖仪式的排名。之后如有任何取消资格或更改赛果的情况，将不适用于投注之目的。<br />
                        <br />
                        <strong>3.22.4.</strong> 如果一场比赛延期，暂停或中止，并且未能原定开始时间后的十二个小时内开始，则所有投注将被视为无效。<br />
                        <br />
                        <strong>3.22.5.</strong> 如果一名游泳运动员未参与一项赛事，则所有投注将为无效。 </p>
                    <p style={{align:"left"}}><strong>3.23. </strong><strong>沙滩足球</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.23.1.</strong> 所有投注将在获得比赛三个小节（每节12分钟）的结果后结算，除非本公司另有书面说明。<br />
                        <br />
                        <strong>3.23.2.</strong> 如果一场比赛在预定时间之前开始，任何在提前开始后和预定开赛时间之前所做的非现场型投注将被视为无效。接受现场投注期间所做的现场投注会被视为有效，并且当赛事已经开始时，现场投注即被视为已经开始，即使比赛比预定时间提前开始。 <br />
                        <br />
                        <strong>3.23.3.</strong> 加时赛和点球大战不会用于投注和结算，除非另有说明。 <br />
                        <br />
                        <strong>3.23.4.</strong> 如果一场比赛暂停、中止或终止，则整场比赛将被视为无效，不论官方对结果的决定如何，比赛都会被视为无效。对无效比赛的所有投注结算将由本公司全权决定。 <br />
                        <br />
                        <strong>3.23.5.</strong> 本公司所提供场地信息（例如中立场地）仅做辅助信息之用，并且不论所述中立场地是否正确，本公司都皆不对此负责。客户有责任确认任何比赛的正确场地。 <br />
                        <br />
                        <strong>3.23.6.</strong> 对于现场投注，在一场比赛中，本公司可自行全权认定可能会影响一支球队或一名球员的得分、结果、表现的危险行为；或者批准改变赔率/赌金或赌盘或投注信息（“危险比赛”），本公司有权暂停接受投注并且可以在“危险比赛”后接受或拒绝投注。在一场比赛中的所有其它行为都被视为安全比赛，投注仍会被接受。<br />
                        <br />
                        <strong>3.23.7.</strong> 对于现场投注，在裁判宣布每一节以及/或者全场比赛时间结束的一刻，所有待定的投注都会被自动拒绝。<br />
                        <br />
                        <strong>3.23.8.</strong> 沙滩足球投注类型。 <br />
                        <strong>3.23.8.1.</strong> 本公司提供下列投注类型： <br />
                        <strong>3.23.8.1.1.</strong> 非现场投注 <br />
                        <strong>3.23.8.1.1.1.</strong> 亚洲盘 – 表示投注预测哪支球队会获得最多进球，以最终得分加上任何让分为准。<br />
                        <br />
                        <strong>3.23.8.1.1.2.</strong> 单/双盘 – 表示投注全部三个小节（每小节十二分钟）结束时的总得分是否为单数或双数。 <br />
                        <br />
                        <strong>3.23.8.1.1.3.</strong> 大/小盘 – 表示投注全部常规三节（每节十二分钟）比赛的总得分，不含加时赛。 <br />
                        <br />
                        <strong>3.23.8.1.2.</strong> 在实时（“现场”）投注中 <br />
                        <strong>3.23.8.1.2.1.</strong> 亚洲盘 – 表示投注预测哪支球队会获得最多进球，以最终得分加上任何让分为准。<br />
                        <br />
                        <strong>3.23.8.1.2.2.</strong> 大/小盘 – 表示投注全部常规三节（每节十二分钟）比赛的总得分，不含加时赛。 <br />
                        <br />
                        <strong>3.23.8.2.</strong> 关于更为全面的投注类型，请参阅上文所述第2.2节。 </p>
                    <p style={{align:"left"}}><strong>3.24. </strong><strong>壁球</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.24.1.</strong> 胜负盘指比赛或指定局的赢家。让分盘依局或得分（请参阅赌盘名称）决定；大/小盘和单/双盘则依得分（除非另有说明）而定。 <br />
                        <br />
                        <strong>3.24.2.</strong> 如果一名选手没有参与一场锦标赛或比赛，则对该名选手的所有投注将为无效。<br />
                        <br />
                        <strong>3.24.3.</strong> 如果一名选手（或双人搭档）在一场比赛中退出或被取消资格，则所有投注将为无效，除了对无条件决定的赌盘所下投注以外。<br />
                        <br />
                        <strong>3.24.4.</strong> 如果一场比赛延期或暂停，只要比赛在十二个小时内复赛，则所有投注仍会被视为有效。 <br />
                        <br />
                        <strong>3.24.5.</strong> 第一局赢家（第二、第三局赢家等）是指指定局的结果。如果指定的局赛未完成，则所有投注将被视为无效。<br />
                        <br />
                        <strong>3.24.6.</strong> 壁球现场投注是依据比赛（或指定局）结果结算的。壁球现场投注时，得分不会更新。 </p>
                    <p style={{align:"left"}}><strong>3.25. </strong><strong>冬季奥运会比赛规则与规定</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.25.1.</strong> 总则 <br />
                        <strong>3.25.1.1.</strong> 所有赌盘是根据国际奥林匹克委员会（IOC）公布的官方结果结算的。 <br />
                        <br />
                        <strong>3.25.1.2.</strong> 原定颁奖仪式的官方结果将是结算所有投注的依据。之后如有任何取消资格或更改赛果的情况，将不适用于投注之目的。 <br />
                        <br />
                        <strong>3.25.1.3.</strong> 如果比赛或赛事在奥运会期内完成，则所有投注将被视为有效，不论实际的开始时间是怎样。如果一场比赛或赛事未能完成，并且没有公布官方结果，则所有投注将被视为无效，并将被退款。 <br />
                        <br />
                        <strong>3.25.1.4.</strong> 在一项赛事实际开始后错误接受的所有投注将被视作无效，并将被退款（除现场投注外）。 <br />
                        <br />
                        <strong>3.25.1.5.</strong> 如果一支队伍或一名参赛者未参与比赛，则对该队或参赛者的所有投注将被视作无效，并将被退款（包括赢得金牌赌盘）。如果在胜负盘（对决）中提及的一支队伍或一名参赛者未能参与比赛，则所有对该盘的投注将被视为无效，并且将被退款。 <br />
                        <br />
                        <strong>3.25.1.6.</strong> 如果优胜冠军（赢得金牌）赌盘中出现“不分胜负”，则一半投注金额将分配给完全赔率，而另一半投注金额将全部丧失。如果胜负盘（对决）中出现“不分胜负”，则结果将为平手，对两名参赛者的投注将会被退款。 <br />
                        <br />
                        <strong>3.25.2.</strong> 奥运奖牌 <br />
                        <strong>3.25.2.1.</strong> 针对奥运会，会提供预测个人或国家将赢得多少枚奖牌的赌盘。<br />
                        <br />
                        <strong>3.25.2.2.</strong> 这些赌盘可以仅针对金牌数，也可针对总奖牌数（金、银、铜牌总计）。 <br />
                        <br />
                        <strong>3.25.2.3.</strong> 所有赌盘将依据奥运会结束后由IOC实时公布的官方奖牌榜进行结算。之后对奖牌榜的任何更改都不会用于投注之目的。 <br />
                        <br />
                        <strong>3.25.3.</strong> 胜负盘（对决） <br />
                        <strong>3.26.3.1.</strong> 哪名参赛者或哪支队伍会赢得比赛，或者在一项赛事中排名较高？ <br />
                        <strong>3.26.3.1.1.</strong> 最终排名是依赛事中排行最高的参赛者而定。如果两名参赛者在同一比赛阶段被淘汰，则官方排名较高的参赛者将是获胜方。如果两名参赛者在同一比赛阶段被淘汰，但官方并未公布两名参赛者的排名，则投注将被视为无效。 <br />
                        <br />
                        <strong>3.25.4.</strong> 冰上曲棍球 <br />
                        <strong>3.25.4.1.</strong> 奥运会冰上曲棍球依循上述一般冰上曲棍球的投注规则（第3.5.节）。<br />
                        <br />
                        <strong>3.25.4.2.</strong> 第3.5.3节例外，它将被下列规则替代 – 如果比赛在奥运会期间完成，不论其实际开始时间如何，所有投注都将被视为有效。如果IOC宣布了一个官方结果，则投注也会被视为有效。如果一场比赛未能完成，并且没有公布官方结果，则所有投注将被视为无效，并将被退款。<br />
                        <br />
                        <strong>3.25.4.3.</strong> 本公司可能会提供其它赌盘（例如包括加时赛或点球大战胜出方），这些赌盘的条款会清楚地列出其名称中。<br />
                        *注：分组预赛回合期间不会进行加时赛，所以可能会出现平局。 </p>
                    <p style={{align:"left"}}><strong>3.26. </strong><strong>无网篮球</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.26.1.</strong> 所有全场赌盘包括现场投注将会根据包括加时赛在内的最终赛果结算（除非另有说明）。<br />
                        <br />
                        <strong>3.26.2.</strong> 如果一场比赛没有在预定开始日期开始，则所有投注将无效（除非另有说明）。如果一场比赛暂停或中止，则所有投注将被视为无效，除了对无条件决定的赌盘所下投注以外。<br />
                        <br />
                        <strong>3.26.3.</strong> 上半场的赛果为第一节和第二节的总得分。下半场的结果是第三和第四节的得分总和，包括可能会进行的任何加时赛。第四节赛果不包括任何可能会进行的加时赛。<br />
                        <br />
                        <strong>3.26.4.</strong> 如果一场比赛暂停或中止，对未完成的半场或小节的投注将被视为无效。如果指定的半场或小节已经完成，则投注有效。<br />
                        <br />
                        <strong>3.26.5.</strong> 得分不会更新用于无网篮球比赛的现场投注，在现场交易时显示的让分是指在比赛开始时的得分，即0-0。所显示的时间和得分仅作参考之用。 </p>
                    <p style={{align:"left"}}><strong>3.27. </strong><strong>奥运会比赛</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.27.1.</strong> 总则 <br />
                        <strong>3.27.1.1.</strong> 所有赌盘是根据国际奥林匹克委员会（IOC）公布的官方结果结算的。<br />
                        <br />
                        <strong>3.27.1.2.</strong> 原定颁奖仪式的官方结果将是结算所有投注的依据。之后如有任何取消资格或更改赛果的情况，将不适用于投注之目的。<br />
                        <br />
                        <strong>3.27.1.3.</strong> 如果比赛或赛事在奥运会期内完成，则所有投注将被视为有效，不论实际的开始时间是怎样（除足球赛以外）。如果一场比赛或赛事未能完成，并且没有公布官方结果，则所有投注将被视为无效，并将被退款。<br />
                        <br />
                        <strong>3.27.1.4.</strong> 在一项赛事实际开始后错误接受的所有投注将被视作无效，并将被退款（除现场投注外）。<br />
                        <br />
                        <strong>3.27.1.5.</strong> 如果一支队伍或一名参赛者未参与比赛，则对该队或参赛者的所有投注将被视作无效，并将被退款（包括赢得金牌的赌盘）。如果在胜负盘（对决）中提及的一支队伍或一名参赛者未能参与比赛，则所有对该盘的投注将被视为无效，并且将被退款。<br />
                        <br />
                        <strong>3.27.1.6.</strong> 如果优胜冠军（赢得金牌）赌盘中出现“不分胜负”，则一半投注金额将分配给完全赔率，而另一半投注金额将全部丧失。如果胜负盘（对决）中出现不分胜负摂，则结果将为平手，对两名参赛者的投注将会被退款。 <br />
                        <br />
                        <strong>3.27.2.</strong> 奥运奖牌 <br />
                        <strong>3.27.2.1.</strong> 针对2012年奥运会，会提供预测个人或国家将赢得多少枚奖牌的赌盘。 <br />
                        <br />
                        <strong>3.27.2.2.</strong> 这些赌盘可以仅针对金牌数，也可针对总奖牌数（金、银、铜牌总计）。<br />
                        <br />
                        <strong>3.27.2.3.</strong> 所有赌盘将依据奥运会结束后由IOC实时公布的官方奖牌榜进行结算。之后对奖牌榜的任何更改都不会用于投注之目的。 <br />
                        <br />
                        <strong>3.27.3.</strong>胜负盘（对决） <br />
                        <strong>3.27.3.1.</strong> 哪名参赛者或哪支队伍会记得比赛，或者在一项赛事中排名较高？<br />
                        <br />
                        <strong>3.27.3.2.</strong> 最终排名是依赛事中排行最高的参赛者而定。如果两名参赛者在同一比赛阶段被淘汰，则官方排名较高的参赛者将是获胜方。如果两名参赛者在同一比赛阶段被淘汰，但官方并未公布两名参赛者的排名，则投注将被视为无效。 </p>
                    <p style={{align:"left"}}><strong>3.28. </strong><strong>政治投注</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.28.1.</strong> 美国总统选举 <br />
                        <strong>3.28.1.1.</strong> 哪个政党将会赢得2012年的美国总统大选？所提供的候选人姓名仅供参考。如果共和党和民主党均未赢得此次大选，则所有投注都将无效，并会予以退款。 </p>
                    <p style={{align:"left"}}><strong>3.29. </strong><strong>帆船</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.29.1.</strong> 美洲杯（包括路易威登杯） <br />
                        <strong>3.29.1.1.</strong> 所有博彩结果以每场比赛后在官方网站上公布的官方比赛结果为准。且博彩不考虑结果公布之后的任何取消资格或结果修正情况。<br />
                        <br />
                        <strong>3.29.1.2.</strong> 若比赛推迟或取消，但在48小时内重新开始，则所有下注仍视为有效。 </p>
                    <p style={{align:"left"}}><strong>3.30. </strong><strong>自行车</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.30.1.</strong> 所有博彩结果以每场比赛后在官方网站上公布的官方比赛结果为准。且博彩不考虑结果公布之后的任何取消资格或结果修正情况。<br />
                        <br />
                        <strong>3.30.2.</strong> 若比赛推迟或取消，但在48小时内重新开始，则所有下注仍视为有效。<br />
                        <br />
                        <strong>3.30.3.</strong> 在一对一的比赛中，参赛双方开始比赛，则下注有效。完成结果较好的参赛者为赢。若双方均未能完成比赛，则下注无效并退还赌注。 </p>
                    <p style={{align:"left"}}><strong>3.31. </strong><strong>藤球</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.31.1.</strong> 胜负盘指比赛或指定分组的赢家。让分盘依分组或得分（请参阅赌盘名称）决定；大/小盘和单/双盘则依得分（除非另有说明）而定。<br />
                        <br />
                        <strong>3.31.2.</strong> 如果一支球队在一场比赛中退出或被取消资格，则所有投注将为无效，除了对无条件决定的赌盘所下投注以外。<br />
                        <br />
                        <strong>3.31.3.</strong> 如果一场比赛延期或暂停，只要比赛在十二个小时内复赛，则所有投注仍会被视为有效。<br />
                        <br />
                        <strong>3.31.4.</strong> 一局赢家（第二、第三局赢家等）是指指定局的结果。如果指定的局未完成，则所有投注将被视为无效。<br />
                        <br />
                        <strong>3.31.5.</strong> 藤球现场投注时，得分不会更新。 </p>
                    <p style={{align:"left"}}><strong>3.32. </strong><strong>电子竞技</strong><strong> </strong></p>
                    <p style={{align:"left"}}><strong>3.32.1.</strong> 一般规则 <br />
                        <strong>3.32.1.1.</strong> 电子竞技盘口所提供的赛事日期和时间仅供参考，并不保证其是百分百正确的。如比赛暂停或推迟等情况,在12小时内没有按原定赛事信息恢复比赛,所有投注将被视为无效。<br />
                        <br />
                        <strong>3.32.1.2.</strong> 对于优胜冠军赌盘，一个团队或玩家提前进入锦标赛或赢得锦标赛。无论比赛是否暂停或推迟，都将被视为有效。<br />
                        <strong>3.32.1.3.</strong> 团队或玩家在锦标赛开始前退出比赛，或在锦标赛期间退出比赛，所有投注于该团队或玩家赢得锦标赛或进入锦标赛的赌注，将被视为无效。<br />
                        <br />
                        <strong>3.32.1.4.</strong> 如果玩家/团队在比赛开始前离开，而赛事被列为“必须开始”,所有投注这个玩家/团队锦标赛进步或赢得比赛,将被视为无效,这适用于所有球员和球队参加比赛。<br />
                        <br />
                        <strong>3.32.1.5.</strong> 如果比赛没有完成,因为一个球员退赛或被取消资格,所有投注结果将被认为是有效的,除非在以下个人打赌类型规则。<br />
                        <br />
                        <strong>3.32.1.6.</strong> 如果一场比赛在官方预计时间之前开始，所有在比赛开始之后的投注将视为无效，除了场上投注。<br />
                        <br />
                        <strong>3.32.1.7.</strong> 如果比赛是由于没有对手结束，所有赌注都将视为无效。<br />
                        <br />
                        <strong>3.32.1.8.</strong> 所有的投注将保持不变，无论更换地图、地图或的数量。<br />
                        <br />
                        <strong>3.32.1.9.</strong> 如果团队或参赛者的名称拼写有误，所有投注将保持不变。除非既定的证明为错误选择。<br />
                        <br />
                        <strong>3.32.1.10.</strong> 如果参赛者以错误的昵称或小号参加了比赛，结果仍然有效。除非既定的证明该参赛者是不允许参加该比赛。<br />
                        <br />
                        <strong>3.32.1.11.</strong> 所有投注将根据相关赛事的管理机构所公布的官方信息进行结算。<br />
                        <br />
                        <strong>3.32.1.12.</strong> 反恐精英的获胜者是赢得比赛预定的大多数回合（例如：比赛预定为20回合，团队或玩家需要获胜11回合。如预定24回合，玩家赢得13个回合。） <br />
                        <br />
                        <strong>3.32.2</strong> 投注类型<br />
                        以下为我们提供的电子竞技盘口的特别投注类型规则。 <br />
                        <strong>3.32.2.1.</strong> 独赢盘口 <br />
                        <strong>3.32.2.1.1.</strong> 预测谁将会赢得比赛，投注将根据最终赛果结算，包括任何额外或加时赛。<br />
                        <br />
                        <strong>3.32.2.1.2.</strong> 如比赛因玩家退出或取消资格而没有完成，所有投注将被视为有效。 <br />
                        <br />
                        <strong>3.32.2.2.</strong> 让分盘口 <br />
                        <strong>3.32.2.2.1.</strong> 预测某一方参赛者在假定的预先让分后赢得比赛。投注将根据最终赛果结算，包括任何额外或加时赛<br />
                        <br />
                        <strong>3.32.2.2.2.</strong> 电子竞技盘口，让分盘将以轮/区域(地图)，或其他取决于比赛的计算方式。所有此类型的投注将通常为让分盘口（例如，在反恐精英中让分赌盘将以轮进行计算，而在刀塔中，将会以区域（地图）进行计算。）<br />
                        <br />
                        <strong>3.32.2.2.3.</strong> 让分投注在电子竞技盘口将预先添加假定的分数给某一队或玩家（弱队），在比赛开始之前凭借该让分而有效领先。例如： </p>
                    <ul type="disc">
                        <li>玩家 A -1.5 @1.85</li>
                        <li>玩家B +1.5 @2.00</li>
                        <li>如玩家A赢得2轮或2轮以上，投注玩家A将可获胜，投注玩家B将会输掉。如果玩家A只赢得1轮或玩家B赢得比赛，投注玩家B将可获胜，投注玩家A将会输掉。 </li>
                    </ul>
                    <p style={{align:"left"}}><strong>3.32.2.2.4.</strong> 如比赛因玩家退出或取消资格造成中断，所有投注于大/小盘的赌注将被视为无效。<br />
                        <br />
                        <strong>3.32.2.2.5.</strong> 如轮数或区域(地图)数被改变，所有投注于让分盘口将被视为无效。 <br />
                        <br />
                        <strong>3.32.2.3.</strong> 大/小盘 <br />
                        <strong>3.32.2.3.1.</strong> 预测比赛的总轮数或区域(地图)数大于或者小于盘口所标注。投注将根据最终赛果结算，包括任何额外或加时赛。<br />
                        <br />
                        <strong>3.32.2.3.2.</strong> 如比赛因玩家退出或取消资格造成中断，所有投注于大/小盘的赌注将被视为无效，除了对无条件决定的赌盘所下投注以外。<br />
                        <br />
                        <strong>3.32.2.3.3.</strong> 如轮数或区域(地图)数被改变，所有投注于大/小盘口将被视为无效。 <br />
                        <br />
                        <strong>3.32.2.4.</strong> 滚球盘口 <br />
                        <strong>3.32.2.4.1.</strong> 结算将根据比赛最终赛果，让分盘口将会以0-0开始进行计算，投注当时的比分将不会被计算.</p>
                    <p><strong>3.33. 金融</strong></p>
                    <p style={{align:"left"}}><strong>3.33.1.</strong>　规则与规定 <br />
                        <strong>3.33.1.1</strong>　金融投注允许玩家预测准确的亚洲各个市场收盘指数的最后数字。包括奇数/偶数和高/低，不包括小数位。<br />
                        <br />
                        <strong>3.33.1.2.</strong>　最终结算结果将使用官方网站公布结果。<br />
                        <br />
                        <strong>3.33.1.3.</strong>　最后结果将使用整数收盘指数的最后一个数字。小树不算在内。<br />
                        <br />
                        <strong>3.33.1.4.</strong>　投注类型将在官方市场关闭前一个小时关闭。<br />
                        <br />
                        <strong>3.33.1.5.</strong>　如果当天市场提前关闭，不论什么情况，所有在计划外收盘的投注，将被视为无效。<br />
                        <br />
                        <strong>3.33.1.6.</strong>　如果市场在特定的一天没有开盘，所有赌注将被视为无效。<br />
                        <br />
                        <strong>3.33.1.7.</strong>　如果任何事件扰乱市场,包括暂停或限制交易的价格波动超过限制允许有关交易或任何其他事件造成市场混乱,该公司可能在其绝对酌情决定权有或没有通知关闭任何或所有的赌注,拒绝任何赌注,取消任何订单。若在这种情况下完成交易，将被视为失去诚信。<br />
                        <br />
                        <strong>3.33.1.8.</strong> 奇数和偶数的定义： 所有以1，3,5,7,9结尾的数字为奇数 </p>
                    所有以0，2,4,6,8结尾的数字为偶数
                </div>
                <a href="#top" className="ReturnTop ReturnTopBtn">返回顶部</a>
            </div>


        )
    }
}



export default (Rule);