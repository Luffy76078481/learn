//游戏介绍静态数据

export const dataJson={
    AG:[//海王星馆
        {name:"百家乐",introduction:"百家乐英文为Baccarat，是世界上公认的最文明、最公平的娱乐项目, 是世界各地赌场中受欢迎的赌戏之一。...",contentString:`<article>
                    <section>
                        <h4 class="title">游戏描述</h4>
                        <p>
                            百家乐英文为Baccarat，是世界上公认的最文明、最公平的娱乐项目, 是世界各地赌场中受欢迎的赌戏之一。
                        </p>
                    </section>
                    <section>
                        <h4 class="title">如何胜出</h4>
                        <p>
                            百家乐中将发两份牌&lt;&lt;庄家&gt;&gt; 和&lt;&lt;闲家&gt;&gt;，总数得9点或最接近9 点的一家胜出。
                        </p>
                    </section>
                    <section>
                        <h4 class="title">操作及下注指南</h4>
                        <ul>
                            <li>点击下注的筹码，再点击桌上下注任何一块( 闲家、庄家或平局)。</li>
                            <li>闲家和庄家将获发两张牌，加起来等於10作0点，总和超过9，则只算总数中的个位。</li>
                            <li>任何一家拿到9点（天生赢家），牌局就算结束，不再补牌。</li>
                            <li>派出两张牌後，如果任何一手牌的头两张牌的牌面为0至7，将依照补牌规则多发一张牌，不可以任选补牌。</li>
                            <li>没有任何一手牌获得超过三张牌。</li>
                        </ul>
                    </section>
                    <section>
                        <h4 class="title">游戏玩法</h4>
                        <p>本游戏采用8副牌（每副牌52张）来进行，游戏牌数合计416张。</p>
                        <p>“闲家”“庄家”各先派两张牌，以“闲家”先发，如第一轮未分出胜负需再按“牌例”发第二轮的牌，最多每方3张牌，谁最接近9点即为胜方，而相同点数即和局 。</p>
                    </section>
                    <section>
                        <h4 class="title">游戏规则</h4>
                        <p>1. 点数计算: </p>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td>牌面</td>
                                    <td>点数</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2 至 9</td>
                                    <td>根据其数值显示的点数</td>
                                </tr>
                                <tr>
                                    <td>Ace</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>K或Q或J或10</td>
                                    <td>0</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>*当任何一家头两张牌的点数总和为8或9，就称为(天生赢家)。</p>
                        <p>*派出两张牌後，如果需要补牌，将依照博牌规则向需要补牌方多发一张牌。</p>
                        <p>例子:</p>
                        <p>4 + 2 + 6 = 2</p>
                        <p>5 + 6 + 8 = 9</p>
                        <p>10 + 10 + 10 = 0</p>


                        <p>2. 补牌规则: </p>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td>闲两牌合计点数</td>
                                    <td>(闲家)</td>
                                    <td>庄两牌合计点数</td>
                                    <td>(庄家)</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>0</td>
                                    <td>必须博牌</td>
                                    <td>0</td>
                                    <td>必须博牌</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>必须博牌</td>
                                    <td>1</td>
                                    <td>必须博牌</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>必须博牌</td>
                                    <td>2</td>
                                    <td>必须博牌</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>必须博牌</td>
                                    <td>3</td>
                                    <td>若闲家博得第三张牌是8点，庄家不得博牌</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>必须博牌</td>
                                    <td>4</td>
                                    <td>若闲家博得第三张牌是0，1，8，9点， 庄家不得博牌</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>必须博牌</td>
                                    <td>5</td>
                                    <td>若闲家博得第三张牌是0，1，2，3，8，9点， 庄家不得博牌</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>不得博牌</td>
                                    <td>6</td>
                                    <td>若闲家博得第三张牌是6 或 7点，庄家必须博牌</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>不得博牌</td>
                                    <td>7</td>
                                    <td>不得博牌</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>例牌，即定胜负</td>
                                    <td>8</td>
                                    <td>例牌，即定胜负</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>例牌，即定胜负</td>
                                    <td>9</td>
                                    <td>例牌，即定胜负</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>*庄闲任何一方两牌合计8、9点为例牌，对方不须博牌，即定胜负。庄闲两方头两张牌各得6或7点，即和局。</p>
                    </section>
                    <section>
                        <h4 class="title">派彩赔率:</h4>
                        <p>本游戏为玩家提供百家乐玩法和免佣百家乐玩法。这两种玩法的博牌规则和投注种类一致，但投注庄的派彩方式有区别。其投注种类与派彩分别如下: </p>
                        <p>百家乐：</p>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td>投注项目</td>
                                    <td>赔率</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>闲家</td>
                                    <td>1 ：1 (开和局时退回下注金额)</td>
                                </tr>
                                <tr>
                                    <td>庄家</td>
                                    <td>1 ：0.95 (开和局时退回下注金额)</td>
                                </tr>
                                <tr>
                                    <td>和局</td>
                                    <td>1 ：8</td>
                                </tr>
                                <tr>
                                    <td>闲对子</td>
                                    <td>1 ：11</td>
                                </tr>
                                <tr>
                                    <td>庄对子</td>
                                    <td>1 ：11</td>
                                </tr>
                                <tr>
                                    <td>大</td>
                                    <td>1 ：0.5</td>
                                </tr>
                                <tr>
                                    <td>小</td>
                                    <td>1 ：1.5</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>免佣百家乐：</p>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td>投注项目</td>
                                    <td>赔率</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>闲家</td>
                                    <td>1 ：1 (开和局时退回下注金额)</td>
                                </tr>
                                <tr>
                                    <td>庄家</td>
                                    <td>1 ：1 (如庄以6点取胜，则赔一半；开和局时退回下注金额)</td>
                                </tr>
                                <tr>
                                    <td>和局</td>
                                    <td>1 ：8</td>
                                </tr>
                                <tr>
                                    <td>闲对子</td>
                                    <td>1 ：11</td>
                                </tr>
                                <tr>
                                    <td>庄对子</td>
                                    <td>1 ：11</td>
                                </tr>
                                <tr>
                                    <td>大</td>
                                    <td>1 ：0.5</td>
                                </tr>
                                <tr>
                                    <td>小</td>
                                    <td>1 ：1.5</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <section>
                        <h4 class="title">大小、庄/闲对子:</h4>
                        <ul>
                            <li>大小:指根据当局所开之牌张数的总和为依据，4张牌为小，5张牌或6张牌为大。游戏中，若庄家及闲家各只发两张牌，合共4张牌，即押注「小」者为胜。相反，若庄、闲任一方有博牌，令总牌数为5或6张，即押注「大」者为胜。</li>
                            <li>庄/闲对子 ：指根据当局所开之牌的庄/闲前两张牌的牌面（数字或字母，不计花式）为依据，牌面相同为对子。游戏中，庄家前两张牌的牌面相同，为庄对子，即押注「庄对」者为胜。闲家前两张牌牌面相同，为闲对子，即押注「闲对」者为胜。</li>
                        </ul>
                    </section>
                    <section>
                        <h4 class="title">请注意:</h4>
                        <p>•	当每一靴牌进入第31局或以後，玩家将不得投注大小。</p>
                        <p>•	桌台限红是本游戏桌台主要玩法的最小、最大玩法限红。玩家在每个玩法的可押注限额是玩法限红与玩家个人限红的交集。如需调节个人限红，请联系网站客服。</p>
                        <p>•	荷官发牌时，偶有系统无法判读状况时，此时荷官将重新扫描，直到系统能够完整判读(如遇故障因素将注销所有相关注单/派彩)。</p>
                        <p>•	如遇结算错误，按照当期视频结果重新结算。</p>
                    </section>
                    <section>
                        <h4 class="title">联络客服:</h4>
                        <p>

                            点击游戏萤幕左下方的聊天视窗中的白色框以便开始聊天。您可以在白色框内输入信息然后点选寄出去以便与赌桌上其他玩家聊天，您的信息和其他玩家的信息将显示于游戏介面上方。 请不要使用任何会侮辱到他人的言语。
                        </p>
                    </section>
                </article>`},
        {name:"急速百家乐",introduction:"急速百家乐是在百家乐的基础上发展而来，速度更快，体验更刺激！ ...",contentString:`<article>
                    <section>
                        <h4 class="title">游戏描述</h4>
                        <p>急速百家乐是在百家乐的基础上发展而来，速度更快，体验更刺激！</p>
                    </section>
                    <section>
                        <h4 class="title">遊戏玩法</h4>
                        <p>发牌员会派出﹝莊家﹞和﹝闲家﹞两份牌，总数得9点或最接近9点的一家胜出 你有七种下注选择：◎闲家◎莊家◎和局◎莊对子◎闲对子◎大◎小</p>
                    </section>
                    <section>
                        <h4 class="title">先发六张牌百家乐发牌介绍</h4>
                        <p>
                            新开始的任一局，荷官首先从牌靴中抽出6张牌 ，前4张牌放置的顺序依次为 闲第一张，莊第一张，闲
                            第二张，莊第二张。第五张牌放在补牌区的第一张补牌的位置。第六张牌放在补牌区第二张的补牌位置上。
                            6张牌全部放好後，才开始这一局的投注，玩家有25秒的投注时间。投注停止後，荷官开牌。闲第一张，
                            莊第一张，闲第二张，莊第二张这样的顺序开。如果需要补牌，那麽补牌区的第一张先使用。如果前5张
                            牌能定输赢，那麽补牌区的第六张牌在本局不使用，作为下一局的闲第一张使用。如果不需要补牌，那麽
                            补牌区的第一张牌作为下一局的闲第一张牌，补牌区的第二张牌作为下一局的莊第一张牌。以此类推，每
                            新开一局。桌面上保持有6张牌在相应的牌位置上。
                        </p>
                    </section>
                    <section>
                        <h4 class="title">牌面点数</h4>
                        <p>•	所有从2到9的牌，其数值就是他们显示的点数：</p>
                        <p>•	A当作是1点，K、Q、J、10是0点，而加起来等於10的也当作是0点。 当任何一家头两张牌的点数总和为8或9，就称为﹝天生赢家﹞。任何一家拿到﹝天生赢家﹞，牌局就算结束，不再补牌。 派出两张牌後，如果需要补牌，将依照补牌规则多发一张牌。参考上面的先发六张牌的发牌介绍</p>
                    </section>
                    <section>
                        <h4 class="title">补牌规则</h4>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td>闲家头两张牌合计点数</td>
                                    <td>闲家</td>
                                    <td>庄家头两张牌合计点数</td>
                                    <td>庄家</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>0</td>
                                    <td>必须补牌</td>
                                    <td>0</td>
                                    <td>必须补牌</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>必须补牌</td>
                                    <td>1</td>
                                    <td>必须补牌</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>必须补牌</td>
                                    <td>2</td>
                                    <td>必须补牌</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>必须补牌</td>
                                    <td>3</td>
                                    <td>若闲家补得8，不得补牌</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>必须补牌</td>
                                    <td>4</td>
                                    <td>若闲家补得0，1，8，9，不得补牌</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>必须补牌</td>
                                    <td>5</td>
                                    <td>若闲家补得0，1，8，9，不得补牌</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>不得补牌</td>
                                    <td>6</td>
                                    <td>若闲家博得第三张牌是*6 或 7点，庄家必须博牌</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>不得补牌</td>
                                    <td>7</td>
                                    <td>不得补牌</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>既定输赢</td>
                                    <td>8</td>
                                    <td>既定输赢</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>既定输赢</td>
                                    <td>9</td>
                                    <td>既定输赢</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <section>
                        <h4 class="title">大小</h4>
                        <p>指根据当局所开之牌张数的总和为依据，4张牌为小，5张牌或6张牌为大，即增牌为大，不增牌为小。</p>
                    </section>
                    <section>
                        <h4 class="title">派彩</h4>
                        <p>•	下注闲家赢，1赔1</p>
                        <p>•	下注莊家赢，1赔1，但扣除5%傭金</p>
                        <p>•	下注和局赢，1赔8</p>
                        <p>•	下注莊对子赢，1赔11</p>
                        <p>•	下注闲对子赢，1赔11</p>
                        <p>•	下注大，1赔0.5</p>
                        <p>•	下注小，1赔1.5</p>
                    </section>
                    <section>
                        <h4 class="title">联络客服:</h4>
                        <p>

                            点击游戏萤幕左下方的聊天视窗中的白色框以便开始聊天。您可以在白色框内输入信息然后点选寄出去以便与赌桌上其他玩家聊天，您的信息和其他玩家的信息将显示于游戏介面上方。 请不要使用任何会侮辱到他人的言语。
                        </p>
                    </section>
                </article>`},
        {name:"龙虎",introduction:"龙虎是真人娱乐场最容易上手的桌牌游戏.，以牌面大小来决定输赢的桌牌游戏。...",contentString:`<article>
                    <section>
                        <h4 class="title">游戏描述</h4>
                        <p>龙虎是真人娱乐场最容易上手的桌牌游戏.，以牌面大小来决定输赢的桌牌游戏。</p>
                    </section>
                    <section>
                        <h4 class="title">如何胜出</h4>
                        <p>正确预计两家&lt;&lt;龙&gt;&gt; 和&lt;&lt;虎&gt;&gt; 的点数比较大。</p>
                    </section>
                    <section>
                        <h4 class="title">操作及下注指南</h4>
                        <ul>
                            <li>点击下注的筹码，再点击桌上下注任何一块 ( 龙、虎或平局 )。</li>
                            <li>荷官只派两门牌，每门各派一只牌，即龙与虎，双方斗大。</li>
                        </ul>
                    </section>
                    <section>
                        <h4 class="title">游戏规则</h4>
                        <ul>
                            <li>牌面的大小不比花色，只比点数，K为最大牌，A为最小。</li>
                            <li>荷官先派发第一张牌于龙的位置，而第二张牌派发到虎的位置，牌面全是向上的，点数较大的胜出。</li>
                        </ul>
                    </section>
                    <section>
                        <h4 class="title">派彩赔率</h4>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td>投注项目</td>
                                    <td>赔率</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>龙</td>
                                    <td>1 ：1 (开和局时，退回一半下注金额)</td>
                                </tr>
                                <tr>
                                    <td>虎</td>
                                    <td>1 ：1 (开和局时，退回一半下注金额)</td>
                                </tr>
                                <tr>
                                    <td>和局</td>
                                    <td>1 ：8</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <section>
                        <h4 class="title">请注意</h4>
                        <p>•	桌台限红是本游戏桌台主要玩法的最小、最大玩法限红。玩家在每个玩法的可押注限额是玩法限红与玩家个人限红的交集。如需调节个人限红，请联系网站客服。</p>
                        <p>•	荷官发牌时，偶有系统无法判读状况时，此时荷官将重新扫描，直到系统能够完整判读(如遇故障因素将注销所有相关注单/派彩)。</p>
                        <p>•	如遇结算错误，按照当期视频结果重新结算。</p>
                    </section>
                    <section>
                        <h4 class="title">联络客服:</h4>
                        <p>

                            点击游戏萤幕左下方的聊天视窗中的白色框以便开始聊天。您可以在白色框内输入信息然后点选寄出去以便与赌桌上其他玩家聊天，您的信息和其他玩家的信息将显示于游戏介面上方。 请不要使用任何会侮辱到他人的言语。
                        </p>
                    </section>
                </article>`},
        {name:"轮盘",introduction:"本游戏是采用国际标准单零轮盘. 透过海王星馆高角度视频, 玩家可清楚看见旋转中的球, 带出轮盘游戏的刺激体验...",contentString:`<article>
                    <section>
                        <h4 class="title">游戏描述</h4>
                        <p>本游戏是采用国际标准单零轮盘. 透过海王星馆高角度视频, 玩家可清楚看见旋转中的球, 带出轮盘游戏的刺激体验.</p>
                    </section>
                    <section>
                        <h4 class="title">如何胜出</h4>
                        <p>下注结束后，荷官会把轮盘向一个方向转动，然后把象牙制滚球抛到轮盘的外侧，让滚球在轮盘内转动多周后慢慢停下来，并降落在其中一个细沟内为该局结果。</p>
                    </section>
                    <section>
                        <h4 class="title">操作及下注指南</h4>
                        <ul>
                            <li>开始新局后，即开始下注倒数计时，请玩家在桌面不同的方格内或方格的边界上押放筹码。</li>
                            <li>倒数结束前由荷官转动轮盘，并抛出滚球。</li>
                            <li>由荷官输入结果数字，同时玩家画面显示结果。</li>
                        </ul>
                    </section>
                    <section>
                        <h4 class="title">游戏规则</h4>
                        <p>筹码放在划有不同投注项目的方格的赌桌上，你可以下注在任何的方格，但要在下注时限之内押注。</p>
                    </section>
                    <section>
                        <h4 class="title">投注方式及派彩赔率</h4>
                        <p>轮盘的投注方式有 12个种类，各项投注类型与派彩赔率如下:</p>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td>投注项目</td>
                                    <td>说明</td>
                                    <td>赔率</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>直接注</td>
                                    <td>1个号码（投注包括 0在内的任意一个数位。下注时将筹码放到那个数位的中心</td>
                                    <td>1 ：35</td>
                                </tr>
                                <tr>
                                    <td>分注</td>
                                    <td>2个号码（投注于两个号码之间的格线上 。如2和3）</td>
                                    <td>1 ：17</td>
                                </tr>
                                <tr>
                                    <td>街注</td>
                                    <td>3个一行的数（投注三个号码。将筹码押在轮盘桌上有三个数位那一行右侧的那条边线上）</td>
                                    <td>1 ：11</td>
                                </tr>
                                <tr>
                                    <td>三数</td>
                                    <td>0,1,2（投注于 0, 1, 2交接区域）或0,2,3（投注于0, 2, 3的交接区域）</td>
                                    <td>1 ：11</td>
                                </tr>
                                <tr>
                                    <td>角注</td>
                                    <td>4个数交叉（将筹码放到四个数位方框交差的那个角区）</td>
                                    <td>1 ：8</td>
                                </tr>
                                <tr>
                                    <td>四个号码</td>
                                    <td>0,1,2,3（将筹码放到 0和3交线的右侧以下注数位 0, 1, 2 和3）</td>
                                    <td>1 ：8</td>
                                </tr>
                                <tr>
                                    <td>线注</td>
                                    <td>两行相交的顶部（将筹码下注到两行相交的最顶部的交点处（虚拟桌右侧），6个数字）</td>
                                    <td>1 ：5</td>
                                </tr>
                                <tr>
                                    <td>列注</td>
                                    <td>每列12个号码（桌上每列数位底部都有带‘第*列 ' 字样的方框，12个号码，不含零）</td>
                                    <td>1 ：2</td>
                                </tr>
                                <tr>
                                    <td>下注一打</td>
                                    <td>将筹码下到有 ”第一打”，”第二打”和“第三打”字样的赌区以同时下注 12个数位。 (分别为1-12、13-24及25-36)</td>
                                    <td>1 ：2</td>
                                </tr>
                                <tr>
                                    <td>红色/黑色</td>
                                    <td>投注开奖号码为红色或黑色。若开0则通杀</td>
                                    <td>1 ：1</td>
                                </tr>
                                <tr>
                                    <td>双数/单数</td>
                                    <td>投注开奖号码为单数或双数。若开0则通杀</td>
                                    <td>1 ：1</td>
                                </tr>
                                <tr>
                                    <td>大/小</td>
                                    <td>小（1-18）；大（19-36）；若开0则通杀</td>
                                    <td>1 ：1</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <section>
                        <h4 class="title">法式下注</h4>
                        <p>法式下注：以椭圆形画出轮盘上的分区（号码、颜色），而后根据玩法不同分隔为4个分区（轮盘下角注、轮上孤注、零旁注上角、轮上零旁），法式下注提供5种投注种类</p>
                        <p>投注方式：使用筹码点击“法式下注”的椭圆形轮盘对应的玩法，轮盘投注桌上显示每个玩法投注的筹码，点击确定时将所选玩法提交下单。</p>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td>投注种类</td>
                                    <td>注数</td>
                                    <td>投注号位</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>轮上零旁</td>
                                    <td>4</td>
                                    <td>0/3；12/15；32/35；26</td>
                                </tr>
                                <tr>
                                    <td rowspan="4">零旁注上角</td>
                                    <td rowspan="4">9</td>
                                </tr>
                                <tr>
                                    <td>4/7；12/15；18/21；19/22；32/35 ---- 一注</td>
                                </tr>
                                <tr>
                                    <td>0/2/3 --- 两注</td>
                                </tr>
                                <tr>
                                    <td>25/26/28/29 ---- 两注</td>
                                </tr>
                                <tr>
                                    <td>轮上孤注</td>
                                    <td>5</td>
                                    <td>6/9；14/17；17/20；31/34；1</td>
                                </tr>
                                <tr>
                                    <td>轮盘下角注</td>
                                    <td>6</td>
                                    <td>5/8；10/11；13/16；23/24；27/30；33/36</td>
                                </tr>
                                <tr>
                                    <td>相邻投注</td>
                                    <td>5</td>
                                    <td>投注轮盘上该号码及左邻与右邻各两个号码（一共5个号码）。</td>
                                </tr>
                                <tr>
                                    <td>相邻投注</td>
                                    <td>5</td>
                                    <td>例如：选中18，则投注号码为：9；22；18；29；7</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <section>
                        <h4 class="title">请注意</h4>
                        <p>桌台限红是本游戏桌台主要玩法的最小、最大玩法限红。玩家在每个玩法的可押注限额是玩法限红与玩家个人限红的交集。</p>
                        <p>荷官在游戏进行中若把球掷出轮盘外，或轮盘停止运转等因素则该局游戏必将重新进行掷球。如遇故障因素将注销所有相关注单/派彩。</p>
                        <p>如遇结算错误，按照当期视频结果重新结算。</p>
                    </section>
                    <section>
                        <h4 class="title">联络客服:</h4>
                        <p>

                            点击游戏萤幕左下方的聊天视窗中的白色框以便开始聊天。您可以在白色框内输入信息然后点选寄出去以便与赌桌上其他玩家聊天，您的信息和其他玩家的信息将显示于游戏介面上方。 请不要使用任何会侮辱到他人的言语。
                        </p>
                    </section>
                </article>`},
        {name:"保险百家乐",introduction:"经过多年发展，百家乐已在各地发展出多种不同玩法，而保险百家乐则是近年最受欢迎的一个版本。保险百家乐是在经典百...",contentString:`<article>
                    <section>
                        <h4 class="title">游戏描述</h4>
                        <p>经过多年发展，百家乐已在各地发展出多种不同玩法，而保险百家乐则是近年最受欢迎的一个版本。保险百家乐是在经典百家乐玩法基础上，加入保险元素，目的是让玩家的本钱或所得彩金得到一定的保障。</p>
                    </section>
                    <section>
                        <h4 class="title">如何胜出</h4>
                        <p>下注&lt;&lt;庄保险&gt;&gt;或&lt;&lt;闲保险&gt;&gt;，保险符合输赢规则而胜出。</p>
                        <p>不同触发时机的输赢规则，详见游戏规则。</p>
                    </section>
                    <section>
                        <h4 class="title">操作及下注指南</h4>
                        <ul>
                            <li>荷官开庄闲首两张牌，任何一家首两牌为8或9点（天生赢家），牌局就算结束，不再补牌，也不会触发保险。</li>
                            <li>触发保险时，符合投保条件的用户默认自动弹出保险投注窗口（取消了自动弹出的用户可点击闪烁的保险区域）。</li>
                            <li>点击投注窗口中的筹码进行投注（一局中触发两次同类型保险时，玩家只能投注一次。若玩家不符合投保条件，则需等待其他合资格玩家下注）。</li>
                        </ul>
                    </section>
                    <section>
                        <h4 class="title">游戏规则</h4>
                        <p>每局游戏中，庄闲各有2个保险触发点。当牌面满足以下条件时，系统将触发保险下注。触发庄保险时，只有本局投注了庄的玩家有资格进行庄保险下注，闲保险同理。</p>
                        <br>
                        <p>保险的限红根据玩家所下的庄或闲注、触发保险时保险的赔率而定，计算方式为：</p>
                        <p class="title">下限 = 1</p>
                        <p class="title">上限 = （玩家所下庄/闲注额÷赔率）-1</p>
                        <br>
                        <p>其中，赔率根据触发保险时的庄闲牌面而定，详见下方列表：</p>
                    </section>
                    <section>
                        <h4 class="title">庄保险</h4>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th colspan="3">输赢规则</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <td class="gray">最终结果</td>
                                    <td class="gray">庄保险</td>
                                    <td class="gray">庄</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>闲赢</td>
                                    <td>赢</td>
                                    <td>输</td>
                                </tr>
                                <tr>
                                    <td>庄赢</td>
                                    <td>输</td>
                                    <td>赢</td>
                                </tr>
                                <tr>
                                    <td>和</td>
                                    <td>和</td>
                                    <td>和</td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th colspan="3">闲补牌后</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <td class="gray">庄点数</td>
                                    <td class="gray">闲点数</td>
                                    <td class="gray">赔率</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>7</td>
                                </tr>
                                <tr>
                                    <td>1 ~ 6</td>
                                    <td>0</td>
                                    <td>9</td>
                                </tr>
                                <tr>
                                    <td>2 ~ 6</td>
                                    <td>1</td>
                                    <td>8</td>
                                </tr>
                                <tr>
                                    <td>3 ~ 6</td>
                                    <td>2</td>
                                    <td>4</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>3</td>
                                    <td>2</td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th colspan="3">输赢规则</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <td class="gray">最终结果</td>
                                    <td class="gray">庄保险</td>
                                    <td class="gray">庄</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>闲赢</td>
                                    <td>赢</td>
                                    <td>输</td>
                                </tr>
                                <tr>
                                    <td>庄赢</td>
                                    <td>输</td>
                                    <td>赢</td>
                                </tr>
                                <tr>
                                    <td>0点和</td>
                                    <td>赢</td>
                                    <td>和</td>
                                </tr>
                                <tr>
                                    <td>≥1点和</td>
                                    <td>和</td>
                                    <td>和</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section>
                        <h4 class="title">闲保险</h4>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th colspan="3">闲补牌前</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <td class="gray">闲点数</td>
                                    <td class="gray">庄点数</td>
                                    <td class="gray">赔率</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>5</td>
                                    <td>4</td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>0 ~ 5</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>0 ~ 5</td>
                                    <td>3</td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th colspan="3">输赢规则</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <td class="gray">最终结果</td>
                                    <td class="gray">闲保险</td>
                                    <td class="gray">闲</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>庄赢</td>
                                    <td>赢</td>
                                    <td>输</td>
                                </tr>
                                <tr>
                                    <td>闲赢</td>
                                    <td>输</td>
                                    <td>赢</td>
                                </tr>
                                <tr>
                                    <td>和</td>
                                    <td>和</td>
                                    <td>和</td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th colspan="3">闲补牌后</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <td class="gray">闲点数</td>
                                    <td class="gray">庄点数</td>
                                    <td class="gray">赔率</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>5</td>
                                    <td>0 ~ 4</td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>0 ~ 5</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>0 ~ 6</td>
                                    <td>4</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>0 ~ 6</td>
                                    <td>8</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>0 ~ 6</td>
                                    <td>9</td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th colspan="3">输赢规则</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <td class="gray">最终结果</td>
                                    <td class="gray">闲保险</td>
                                    <td class="gray">闲</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>庄赢</td>
                                    <td>赢</td>
                                    <td>输</td>
                                </tr>
                                <tr>
                                    <td>闲赢</td>
                                    <td>输</td>
                                    <td>赢</td>
                                </tr>
                                <tr>
                                    <td>9点和</td>
                                    <td>赢</td>
                                    <td>和</td>
                                </tr>
                                <tr>
                                    <td>≤8 点和</td>
                                    <td>和</td>
                                    <td>和</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <section>
                        <h4 class="title">联络客服:</h4>
                        <p>

                            点击游戏萤幕左下方的聊天视窗中的白色框以便开始聊天。您可以在白色框内输入信息然后点选寄出去以便与赌桌上其他玩家聊天，您的信息和其他玩家的信息将显示于游戏介面上方。 请不要使用任何会侮辱到他人的言语。
                        </p>
                    </section>
                </article>`},
        {name:"骰宝",introduction:"骰宝也叫赌大小，以猜测骰子开出的点数或是点数总合的博彩。多元化的投注种类及吸引的赔率，极度受玩家欢迎。海王星...",contentString:`<article>
                    <section>
                        <h4 class="title">游戏描述</h4>
                        <p>骰宝也叫赌大小，以猜测骰子开出的点数或是点数总合的博彩。多元化的投注种类及吸引的赔率，极度受玩家欢迎。海王星辰旗舰厅骰宝为广大玩家提供了最舒适的环境。</p>
                    </section>
                    <section>
                        <h4 class="title">如何胜出</h4>
                        <p>玩家的押注的内容与三颗骰子停留开出的点数相同，便赢得彩金。</p>
                    </section>
                    <section>
                        <h4 class="title">操作及下注指南</h4>
                        <ul>
                            <li>开始新局后即开始下注倒数计时，你可以依照你的预测，选择筹码下注 。</li>
                            <li>倒数时间结束后停止下注，再由荷官按钮经机械自动摇骰。</li>
                            <li>待骰盅停止后，视讯显示三颗骰子停留开出的点数，由荷官输入三点数，同时画面亮起灯光，可清楚看到胜出注码和赔率；是否与玩家押注的内容相同，来判定输赢。</li>
                            <li>若骰子靠在骰盎边缘上而造成有斜骰或叠骰情形发生，无法判断点数时，该局作废所有下注无效退回本金，游戏重开新局。</li>
                        </ul>
                    </section>
                    <section>
                        <h4 class="title">游戏规则</h4>
                        <p>筹码放在划有不同赌法的方格的赌桌上，你可以下注在任何的方格，但要在下注时限之内押注。</p>
                    </section>
                    <section>
                        <h4 class="title">派彩赔率</h4>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td>投注项目</td>
                                    <td>说明</td>
                                    <td>赔率</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowspan="2">大 / 小</td>
                                    <td>大：总点数 11 至 17</td>
                                    <td rowspan="2">1 ：1</td>
                                </tr>
                                <tr>
                                    <td>小：总点数为 4 至 10 ( 遇围骰庄家通吃 )</td>
                                </tr>
                                <tr>
                                    <td>围骰</td>
                                    <td>投注指定的围骰 ( 如 1 围骰 ) ，必须开出 3 颗所投注的骰子</td>
                                    <td>1 ：150</td>
                                </tr>
                                <tr>
                                    <td>全围</td>
                                    <td>3 颗骰子都一样</td>
                                    <td>1 ：24</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>下注在单一个点数:</p>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td>投注项目</td>
                                    <td>说明</td>
                                    <td>赔率</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>出现单骰</td>
                                    <td>投注每颗骰子 1 至 6 中指定的点数，点数出现 1 次</td>
                                    <td>1 ：1</td>
                                </tr>
                                <tr>
                                    <td>出现双骰</td>
                                    <td>投注每颗骰子 1 至 6 中指定的点数，点数出现 2 次</td>
                                    <td>1 ：2</td>
                                </tr>
                                <tr>
                                    <td>出现全骰</td>
                                    <td>投注每颗骰子 1 至 6 中指定的点数，点数出现 3 次</td>
                                    <td>1 ：3</td>
                                </tr>
                                <tr>
                                    <td>对子 ( 双骰、长牌 )</td>
                                    <td>投注指定的双骰 ( 如双 1 点 ) ，至少开出 2 颗所投注的骰子</td>
                                    <td>1 ：8</td>
                                </tr>
                                <tr>
                                    <td>牌九式 ( 骨牌、短牌 )</td>
                                    <td>投注 15 种 2 颗骰子可能出现的组合 ( 如 1、2)</td>
                                    <td>1 ：5</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>3颗骰子点数总和:</p>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td>投注项目</td>
                                    <td>说明</td>
                                    <td>赔率</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>4 或17 点</td>
                                    <td>总和为 4 或 17 点</td>
                                    <td>1 ：50</td>
                                </tr>
                                <tr>
                                    <td>5 或 16 点</td>
                                    <td>总和为 5 或 16 点</td>
                                    <td>1 ：18</td>
                                </tr>
                                <tr>
                                    <td>6 或 15 点</td>
                                    <td>总和为 6 或 15 点</td>
                                    <td>1 ：14</td>
                                </tr>
                                <tr>
                                    <td>7 或 14 点</td>
                                    <td>总和为 7 或 14 点</td>
                                    <td>1 ：12</td>
                                </tr>
                                <tr>
                                    <td>8 或 13 点</td>
                                    <td>总和为 8 或 13 点</td>
                                    <td>1 ：8</td>
                                </tr>
                                <tr>
                                    <td>9、10、11、或 12 点</td>
                                    <td>总和为 9、10、11 或 12 点</td>
                                    <td>1 ：6</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>3颗骰子点数总和:</p>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td>投注项目</td>
                                    <td>说明</td>
                                    <td>赔率</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowspan="2">单</td>
                                    <td>总点数为 5, 7, 9, 11, 13, 15, 17 点</td>
                                    <td rowspan="2">1 ：1</td>
                                </tr>
                                <tr>
                                    <td>( 遇围骰庄家通吃 )</td>
                                </tr>
                                <tr>
                                    <td rowspan="2">双</td>
                                    <td>总点数为 4, 6, 8, 10, 12, 14, 16 点</td>
                                    <td rowspan="2">1 ：1</td>
                                </tr>
                                <tr>
                                    <td>( 遇围骰庄家通吃 )</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <section>
                        <h4 class="title">请注意</h4>
                        <p>•	桌台限红是本游戏桌台主要玩法的最小、最大玩法限红。玩家在每个玩法的可押注限额是玩法限红与玩家个人限红的交集。如需调节个人限红，请联系网站客服。</p>
                        <p>•	骰子摇动后，偶有稳定后无法判读点数状况时，此时荷官将重摇骰，直到能够完整判读(如遇故障因素将注销所有相关注单/派彩)。</p>
                        <p>•	如遇结算错误，按照当期视频结果重新结算。</p>
                    </section>
                    <section>
                        <h4 class="title">联络客服:</h4>
                        <p>

                            点击游戏萤幕左下方的聊天视窗中的白色框以便开始聊天。您可以在白色框内输入信息然后点选寄出去以便与赌桌上其他玩家聊天，您的信息和其他玩家的信息将显示于游戏介面上方。 请不要使用任何会侮辱到他人的言语。
                        </p>
                    </section>
                </article>`},
        {name:"VIP百家乐",introduction:"在这享有贵宾式的招待.，可自行控制游戏节奏，尽享更换荷官，飞牌以及换靴等优越功能，成就更高级及及自主的娱乐享...",contentString:`<article>
                    <section>
                        <h4 class="title">游戏描述</h4>
                        <p>在这享有贵宾式的招待.，可自行控制游戏节奏，尽享更换荷官，飞牌以及换靴等优越功能，成就更高级及及自主的娱乐享受。</p>
                    </section>
                    <section>
                        <h4 class="title">遊戏玩法</h4>
                        <p>发牌员会派出﹝莊家﹞和﹝闲家﹞两份牌，玩家根据自己的想法可任意选择庄、闲、和与对子或其他任意一门下注。 </p>
                    </section>
                    <section>
                        <h4 class="title">牌面点数</h4>
                        <p>•	所有从2到9的牌，其数值就是他们显示的点数：</p>
                        <p>•	A当作是1点，K、Q、J、10是0点，而加起来等於10的也当作是0点。 当任何一家头两张牌的点数总和为8或9，就称为﹝天生赢家﹞。任何一家拿到﹝天生赢家﹞，牌局就算结束，不再补牌。 派出两张牌後，如果需要补牌，将依照补牌规则多发一张牌。参考上面的先发六张牌的发牌介绍</p>
                    </section>
                    <section>
                        <h4 class="title">补牌规则</h4>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td>闲家头两张牌合计点数</td>
                                    <td>闲家</td>
                                    <td>庄家头两张牌合计点数</td>
                                    <td>庄家</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>0</td>
                                    <td>必须补牌</td>
                                    <td>0</td>
                                    <td>必须补牌</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>必须补牌</td>
                                    <td>1</td>
                                    <td>必须补牌</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>必须补牌</td>
                                    <td>2</td>
                                    <td>必须补牌</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>必须补牌</td>
                                    <td>3</td>
                                    <td>若闲家补得8，不得补牌</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>必须补牌</td>
                                    <td>4</td>
                                    <td>若闲家补得0，1，8，9，不得补牌</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>必须补牌</td>
                                    <td>5</td>
                                    <td>若闲家补得0，1，2，3，8，9，不得补牌</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>不得补牌</td>
                                    <td>6</td>
                                    <td>若闲家博得第三张牌是*6 或 7点，庄家必须博牌</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>不得补牌</td>
                                    <td>7</td>
                                    <td>不得补牌</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>既定输赢</td>
                                    <td>8</td>
                                    <td>既定输赢</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>既定输赢</td>
                                    <td>9</td>
                                    <td>既定输赢</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <section>
                        <h4 class="title">派彩</h4>
                        <p>•	下注闲家赢，1赔1</p>
                        <p>•	下注莊家赢，1赔1，但扣除5%傭金</p>
                        <p>•	下注和局赢，1赔8</p>
                        <p>•	下注莊对子赢，1赔11</p>
                        <p>•	下注闲对子赢，1赔11</p>
                        <p>•	下注大，1赔0.5</p>
                        <p>•	下注小，1赔0.5</p>
                    </section>
                    <section>
                        <h4 class="title">联络客服:</h4>
                        <p>

                            点击游戏萤幕左下方的聊天视窗中的白色框以便开始聊天。您可以在白色框内输入信息然后点选寄出去以便与赌桌上其他玩家聊天，您的信息和其他玩家的信息将显示于游戏介面上方。 请不要使用任何会侮辱到他人的言语。
                        </p>
                    </section>
                </article>`},
        {name:"竞咪百家乐",introduction:"投注额最高者享咪牌权利，牌桌上会清楚显示所有筹码，拥有一种置身于实体赌场的真实座位体验。'等我'功能让您掌控牌...",contentString:`<article>
                    <section>
                        <h4 class="title">游戏描述</h4>
                        <p>投注额最高者享咪牌权利，牌桌上会清楚显示所有筹码，拥有一种置身于实体赌场的真实座位体验。'等我'功能让您掌控牌局节奏；玩家可以即时和俏丽中或英文主播互动，边聊天边下注，创造实地赌场无可比拟的升级体验。</p>
                    </section>
                    <section>
                        <h4 class="title">下注模式：</h4>
                        <p>•	竞咪（LED）百家乐有“旁观下注”和“进桌下注”两种方式；</p>
                        <p>•	当桌台为空（人数为0）时，玩家只能选择进桌下注，进桌下注有最低VIP 额度, 低于此额度的只能选择旁观下注；</p>
                        <p>•	当桌台人数已满（7人）时，玩家只能选择旁观下注，旁观下注玩家所在桌台，如果其他进桌玩家都离开了。若此局旁观 下注的玩家有下注，那么此局结算完之后旁观玩家会被踢出桌台；若此局旁观玩家没有下注，会立刻被踢出桌台；</p>
                        <p>•	其他情况玩家可以自由选择旁观下注或者进桌下注。</p>
                    </section>
                    <section>
                        <h4 class="title">下注限红：</h4>
                        <p>•	进桌下注：下注限红是游戏桌台定义的限红，不受个人限红的限制；</p>
                        <p>•	旁观下注：下注限红是玩家的个人限红与对应不同玩法限红的交集。</p>
                    </section>
                    <section>
                        <h4 class="title">咪牌（竞咪）：</h4>
                        <p>•	只有“进桌下注”的玩家才有咪牌资格；</p>
                        <p>•	不同玩家下注庄/闲，下注金额多的玩家获得对应庄/闲的咪牌资格；</p>
                        <p>•	不同玩家下注庄/闲相同的金额，先下注成功的玩家拥有咪庄/闲家牌的资格；</p>
                        <p>•	同一玩家，如果一局中下注庄和闲的金额一样，那么默认该玩家咪闲家牌；（前提：其他玩家没有下注庄/闲，或者下注金额没有高于这一玩家）</p>
                    </section>
                    <section>
                        <h4 class="title">其他功能：</h4>
                        <p>•	等我：在下注倒计时内，玩家可以点击“等我”按键，请求荷官延长下注时间；</p>
                        <p>•	开牌：</p>
                        <p>a. 只有进座下注的玩家才有开牌的权限；</p>
                        <p>b. 当玩家点击“开牌”申请荷官开牌时,荷官会根据桌面上玩家投注情况决定是否直接开牌或提示其他玩家继续下注。</p>
                    </section>
                    <section>
                        <h4 class="title">联络客服:</h4>
                        <p>

                            点击游戏萤幕左下方的聊天视窗中的白色框以便开始聊天。您可以在白色框内输入信息然后点选寄出去以便与赌桌上其他玩家聊天，您的信息和其他玩家的信息将显示于游戏介面上方。 请不要使用任何会侮辱到他人的言语。
                        </p>
                    </section>
                </article>`},
    ],
    BBIN:[//土星馆
        {name:"BB快乐彩",introduction:"「BB快乐彩」是一个专业且开奖迅速的彩票游戏，每日10:00~隔天09:00以公正的直播视讯进行开奖，每次开奖约3分钟。...",contentString:`<article class="inside-content">
            
                <section>
                    <h4> 简介 INTRODUCTION</h4>
                    <p>

                        「BB快乐彩」是一个专业且开奖迅速的彩票游戏，每日10:00~隔天09:00以公正的直播视讯进行开奖，每次开奖约3分钟。<br>中奖号码是由1至80的号码中随机摇出20个号码构成。丰富玩法除了选号，还有和值、奇偶、上下盘等多种游戏方式提供选择。
                    </p>
                    <h4>	游戏玩法 PLAYING METHOD</h4>
                    <h4> 选号玩法</h4>
                    <p>选号玩法是在1至80的80个号码中选出1至5个号码组合成一组进行的投注。会员将选择的投注号码与中奖号码对照，根据所选号码与中奖号码相符的个数多少（顺序不限）确定相应的中奖奖级。 </p>
                    <p>※举例：投注者购买的是1，2，3这三个号码为一个组合，且该期开奖号码中包含1，2，3这三个数字，则视为投注‘3中3’的玩法者中奖；若开出号码中只有1，2则视为投注‘3中2’的玩法者中奖。 </p>
                    <h4>和值玩法	</h4>
                    <p>以所有开出的全部20个号码加起来的和值来判定。 <br>总单/双：20个号码加总的和值为单，叫做和单；20个号码加总的和值为双，叫做和双。<br>总大/小：20个号码加总的和值大于810，为和大；20个号码加总的和值小于810，则为和小。<br>和值810：20个号码加总的和值等于810，叫和值810。(当和值等于810,则大小退回本金)<br>※举例：开奖号码为1，2，3，4，5，6，7，8，9，10，11，12，13，14，15，16，17，18，19，20；那么此20个开奖号码的和值总和为210，则为小，为双。则投注小和双者中奖。投注大、单、和值810者不中奖。 </p>
                    <h4> 上中下盘玩法	</h4>
                    <p>上下盘：开奖号码1至40为上盘号码，41至80为下盘号码。开出的20个号码中：如上盘号码（1-40）在此局开出号码数目占多数时，此局为上盘；下盘号码（41-80）在此局开出号码数目占多数时，此局为下盘；上盘号码（1－40）和下盘号码（41-80）在此局开出的数目相同时（各10个数字），此局为中盘。 </p>
                    <p>
                        ※举例：此局开出1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20. 此局为上盘。
                        <br>※举例：此局开出41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60 此局为下盘。
                        <br>※举例：此局开出 1,2,3,4,5,6,7,8,9,10,41,42,43,44,45,46,47,48,49,50 此局为中盘。
                    </p>
                    <h4> 奇偶和盘玩法	</h4>
                    <p>开奖号码中1，3，5，7，…，75，77，79为奇数号码，2，4，6，8，……，76，78，80为偶数号码。当期开出的20个中奖号码中，如奇数号码数目占多数时（超过10个），则为奇盘，投注奇者中奖；偶数号码占多数时（超过10个），则为偶盘，投注偶者中奖；如果奇数和偶数号码数目相同时（均为 10个），则为和，投注和者中奖。 </p>
                    <p>
                        ※举例：此期开出1，3，5，7，9，11，13，15，17，19，21，22，24，26，28，30，32，34，46，68， 其中奇数11个偶数9个，此期为奇盘。
                        <br>※举例：此期开出2，4，6，8，10，12，14，16，44，48，66，68，25，27，31，35，37，39，41，55， 其中偶数12个奇数8个，此期为偶盘。
                        <br>※举例：此期开出2，4，6，8，10，12，14，16，18，20，41，43，45，47，49，51，53，55，57，59， 其中奇数10个偶数10个，此期为和。
                    </p>
                    
                    <h4>賠率設置結構表</h4>
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr>
                                <td>名称</td>
                                <td>投注项目	</td>
                                <td>说明</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>选号</td>
                                <td>选号</td>
                                <td>
                                    选号玩法是在1至80的80个号码中选出1至5个号码组合成一组进行的投注。
                                    <table class="table table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <td colspan="6">号码 </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td> </td>
                                                <td>选5</td>
                                                <td>选4</td>
                                                <td>选3</td>
                                                <td>选2</td>
                                                <td>选1</td>
                                            </tr>
                                            <tr>
                                                <td>各数</td>
                                            </tr>
                                            <tr>
                                                <td>中5</td>
                                                <td>250.00</td>
                                                <td>无</td>
                                                <td>无</td>
                                                <td>无</td>
                                                <td>无</td>
                                            </tr>
                                            <tr>
                                                <td>中4</td>
                                                <td>21.00</td>
                                                <td>50.00</td>
                                                <td>无</td>
                                                <td>无</td>
                                                <td>无</td>
                                            </tr>
                                            <tr>
                                                <td>中3</td>
                                                <td>3.00</td>
                                                <td>6.00</td>
                                                <td>20.00</td>
                                                <td>无</td>
                                                <td>无</td>
                                            </tr>
                                            <tr>
                                                <td>中2</td>
                                                <td>无</td>
                                                <td>2.00</td>
                                                <td>2.30</td>
                                                <td>10.00</td>
                                                <td>无</td>
                                            </tr>
                                            <tr>
                                                <td>中1</td>
                                                <td>无</td>
                                                <td>无</td>
                                                <td>无</td>
                                                <td>无</td>
                                                <td>3.00</td>
                                            </tr>
                                            <tr>
                                                <td>中0</td>
                                                <td>250.00</td>
                                                <td>无</td>
                                                <td>无</td>
                                                <td>无</td>
                                                <td>无</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="2">合数</td>
                                <td>合值单双
                                </td><td>
                                    20个号码加总的和值为单，叫做和“单”。<br>20个号码加总的和值为双，叫做和“双”。
                                    <table class="table table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <td> </td>
                                                <td>单</td>
                                                <td>双</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>赔率</td>
                                                <td>1.95</td>
                                                <td>1.95</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                
                            </tr>
                            <tr>
                                <td>合值大小合值810</td>
                                <td>
                                    20个号码加总的和值大于810，为和“大”。<br>20个号码加总的和值小于810，则为和“小”。<br>20个号码加总的和值等于810，叫和值“810”。
                                    <table class="table table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <td> </td>
                                                <td>大</td>
                                                <td>810</td>
                                                <td>小</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>赔率</td>
                                                <td>1.95</td>
                                                <td>108</td>
                                                <td>1.95</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="2">区域</td>
                                <td>上中下盘
                                </td><td>
                                    上盘号码(1-40)在此局开出号码数目占多数时，此局为“上盘”。<br>下盘号码(41-80)在此局开出号码数目占多数时，此局为“下盘”。<br>上盘号码(1－40)和下盘号码(41-80)在此局开出的数目相同时(各10个数字)，此局为“中盘”。
                                    <table class="table table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <td></td>
                                                <td>上</td>
                                                <td>中</td>
                                                <td>下</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>赔率</td>
                                                <td>2.3</td>
                                                <td>4.3</td>
                                                <td>2.3</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                
                            </tr>
                            <tr>
                                <td>奇偶和盘</td>
                                <td>
                                    奇数号码数目占多数时(超过10个)，则为“奇盘”。<br>偶数号码占多数时(超过10个)，则为“偶盘”。<br>如果奇数和偶数号码数目相同时(均为10个)，则为“和”。
                                    <table class="table table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <td> </td>
                                                <td>奇</td>
                                                <td>和</td>
                                                <td>偶</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>赔率</td>
                                                <td>2.3</td>
                                                <td>4.3</td>
                                                <td>2.3</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3">注记「敬请会员注意！以上公告之赔率为初始赔率本公司会根据市场机制进行调整」	</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </article>`},
        {name:"二八扛",introduction:"二八杠游戏，是利用中国麻将中，单一色筒子牌( 一筒到九筒，每一种花色4张牌， 一共36张牌)，外加白皮4张牌，共有40张牌...",contentString:`<section>
                    <h4> 简介 INTRODUCTION</h4>
                    <p>

                        二八杠游戏，是利用中国麻将中，单一色筒子牌( 一筒到九筒，每一种花色4张牌， 一共36张牌)，外加白皮4张牌，共有40张牌。
                    </p>
                    <h4>	游戏玩法 PLAYING METHOD</h4>
                    <p>

                        玩法很简单，区分为庄家( 1方 )跟闲家( 3方 )，总共四方，游戏开始前，需将40张牌洗干净，然后掷出3个骰子所得数字依庄家是1、上门是2、中门是3、下门是4、庄家是5、上门是6, ……依此类推。
                    </p>
                    <h4>	牌面点数 COUNT THE CARD</h4>
                    <p>

                        开始发开牌，每家发两张牌来比点数大小，两张牌的点数相加后，取其个位数字，每家单独跟庄家比输赢，然后直接比大小，正所谓一番两瞪眼，庄家必须跟三个闲家比大小，庄家的点数，如果比闲家小，则庄家输了该赌局；反之，庄家的点数，如果比闲家大，则庄家赢了该赌局。
                    </p>
                    <h4>	大小 COMPETE TILES</h4>
                    <p>

                        在游戏中，先比对子大小，再比数字大小。<br>比点数时有一特例，即二筒配八筒，该组合除对子外为点数最大。 <br>详细大小比较请看图示。
                    </p>
                    <h4>	图示点数大小 TILES RANKING</h4>
                    <p>

                        点数大小如下图所示：( 排序由最大点数依次排由左至右到最下方最小点数 )<div class="BBIN_1-1"></div>
                    </p>
                    <p>

                        和局： <br>庄家与闲家所持牌的组合完全相同时，该局即为和局，退还本金。
                    </p>
                    <h4>派彩 PAYOFF </h4>
                    <table class="table table-bordered text-center">
                            <tbody>
                                <tr>
                                    <td>下注上门赢</td>
                                    <td>1赔0.97</td>
                                </tr>
                                <tr>
                                    <td>下注上门输</td>
                                    <td>1赔0.97</td>
                                </tr>
                                <tr>
                                    <td>下注中门赢</td>
                                    <td>1赔0.97</td>
                                </tr>
                                <tr>
                                    <td>下注中门赢</td>
                                    <td>1赔0.97</td>
                                </tr>
                                <tr>
                                    <td>下注下门赢</td>
                                    <td>1赔0.97</td>
                                </tr>
                                <tr>
                                    <td>下注下门赢</td>
                                    <td>1赔0.97</td>
                                </tr>
                                <tr>
                                    <td>下注上门和局</td>
                                    <td>1赔60</td>
                                </tr>
                                <tr>
                                    <td>下注中门和局</td>
                                    <td>1赔60</td>
                                </tr>
                                <tr>
                                    <td>下注下门和局</td>
                                    <td>1赔60</td>
                                </tr>
                                <tr>
                                    <td>下注上门对子</td>
                                    <td>1赔6</td>
                                </tr>
                                <tr>
                                    <td>下注中门对子</td>
                                    <td>1赔6</td>
                                </tr>
                                <tr>
                                    <td>下注下门对子</td>
                                    <td>1赔6</td>
                                </tr>
                            </tbody>
                        </table>
                    <h4>其他补充说名 EXPLANATION</h4>
                    <p>每靴第四及第五局不接受对子与和局之投注 <br>(如遇故障因素将注销所有相关注单/奖金) <br>此游戏之玩家获利率约为 98.70%</p>
                </section>`},
        {name:"德州扑克",introduction:"视讯德州扑克Texas Hold'em，使用52张扑克牌，玩法是利用2张底牌与牌桌上的5张公牌，共7张牌，再取其中5张组成最佳牌组...",contentString:`<section>
                    <h4> 简介 INTRODUCTION</h4>
                    <p>

                        视讯德州扑克Texas Hold'em，使用52张扑克牌，玩法是利用2张底牌与牌桌上的5张公牌，共7张牌，再取其中5张组成最佳牌组，玩家单纯与庄家比拚牌型大小而不用考虑花色，是一款考验智力与运气的扑克游戏。
                    </p>
                    <h4>	游戏玩法 PLAYING METHOD</h4>
                    <p>

                        闲家下底注后，庄家与闲家轮流分配2张底牌，再依赌桌上5张公牌分次下注，最后庄家开牌与闲家依照牌型组合大小定胜负。 <br>闲家下底注同时可选择下注Bonus，闲家当局底牌拿到符合Bonus的牌型时，可依照牌型组合获得3 ~ 30倍不等的赔率奖金。
                    </p>
                    <h4>	游戏规则 GAME RULE</h4>
                    <p>
                        牌局开始，闲家在时限内下注并决定是否加注：
                        </p><table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td>下注</td>
                                    <td>注额</td>
                                    <td>说明</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>底注　Ante</td>
                                    <td> </td>
                                    <td>底注的下注金额须符合限额大小。</td>
                                </tr>
                                <tr>
                                    <td>翻牌　Flop</td>
                                    <td>2倍底注</td>
                                    <td>可加注或弃牌，弃牌则输掉底注，加注后庄家在赌桌上分配3张公牌。（未在倒数时限内跟注，视同弃牌）</td>
                                </tr>
                                <tr>
                                    <td>转牌　Turn</td>
                                    <td>1倍底注</td>
                                    <td>可加注或过牌，过牌不需再下注，加注或过牌后庄家在赌桌上分配第4张公牌。</td>
                                </tr>
                                <tr>
                                    <td>河牌　River</td>
                                    <td>1倍底注</td>
                                    <td>可加注或过牌，过牌不需再下注，加注或过牌后庄家在赌桌上分配第5张公牌并摊牌。</td>
                                </tr>
                            </tbody>
                        </table>
                    <p></p>
                    <p>摊牌后，闲家与庄家以自己的2张底牌加上桌面5张公牌，共7张牌中取最大的5张牌型组合决定胜负。 若牌型组合在顺子以上(含顺子)，获胜时可取得Ante、Flop、Turn、River个别1：1的下注赔率奖金；若牌型组合在三条以下(含三条)，获胜时可取得Flop、Turn、River个别1：1的下注赔率奖金。<br>庄家与闲家牌型组合相同时将取中扑克数字最大的定胜负，若数字依然相同时则为平局，闲家将拿回所有下注金额，不含Bonus。</p>
                    <h4>	BONUS赔率表 BONUS PAYOUTS</h4>
                    <p>
                        底牌牌型组合将依照下注金额与赔率获得奖金，无论当局结果输赢。
                        </p><table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td>牌型组合</td>
                                    <td>赔率</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>A-A</td>
                                    <td>1︰30</td>
                                </tr>
                                <tr>
                                    <td>A-K（相同花色）</td>
                                    <td>1︰25</td>
                                </tr>
                                <tr>
                                    <td>A-Q or A-J（相同花色）</td>
                                    <td>1︰20</td>
                                </tr>
                                <tr>
                                    <td>A-K（不同花色）</td>
                                    <td>1︰15</td>
                                </tr>
                                <tr>
                                    <td>K-K or Q-Q or J-J</td>
                                    <td>1︰10</td>
                                </tr>
                                <tr>
                                    <td>A-Q or A-J（不同花色）</td>
                                    <td>1︰5</td>
                                </tr>
                                <tr>
                                    <td>2到10任何一对</td>
                                    <td>1︰3</td>
                                </tr>
                            </tbody>
                        </table>
                        <h4>
                            获胜组合 WINNING COMBINATION
                            <table class="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <td>牌型组合大小</td>
                                        <td>牌型说明</td>
                                        <td>图解</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>同花大顺</td>
                                        <td>10~ACE花色相同的顺子</td>
                                        <td><span class="BBIN_2-1"></span></td>
                                    </tr>
                                    <tr>
                                        <td>同花顺</td>
                                        <td>5张花色相同数字相连的牌</td>
                                        <td><span class="BBIN_2-2"></span></td>
                                    </tr>
                                    <tr>
                                        <td>四条</td>
                                        <td>有4张数字同的牌</td>
                                        <td><span class="BBIN_2-3"></span></td>
                                    </tr>
                                    <tr>
                                        <td>葫芦</td>
                                        <td>三条与一对组合的牌</td>
                                        <td><span class="BBIN_2-4"></span></td>
                                    </tr>
                                    <tr>
                                        <td>同花</td>
                                        <td>5张花色相同的牌</td>
                                        <td><span class="BBIN_2-5"></span></td>
                                    </tr>
                                    <tr>
                                        <td>顺子</td>
                                        <td>5张数字相连的牌</td>
                                        <td><span class="BBIN_2-6"></span></td>
                                    </tr>
                                    <tr>
                                        <td>三条</td>
                                        <td>有3张数字相同的牌</td>
                                        <td><span class="BBIN_2-7"></span></td>
                                    </tr>
                                    <tr>
                                        <td>两对</td>
                                        <td>有两组一对的牌</td>
                                        <td><span class="BBIN_2-8"></span></td>
                                    </tr>
                                    <tr>
                                        <td>一对</td>
                                        <td>有2张数字相同的牌</td>
                                        <td><span class="BBIN_2-9"></span></td>
                                    </tr>
                                    <tr>
                                        <td>高牌</td>
                                        <td>牌型中最大的牌</td>
                                        <td><span class="BBIN_2-10"></span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </h4>
                    <p></p>
                </section>`},
        {name:"温州牌九",introduction:"温州牌九是古代中国传统游戏的一种，玩法是依据一副共32张牌，点数的不同组合来比较大小，以决胜负...",contentString:`<section>
                  <h4 class="title"> 简介 INTRODUCTION</h4>
                  <p>
                     
                    温州牌九是古代中国传统游戏的一种，玩法是依据一副共32张牌，点数的不同组合来比较大小，以决胜负。
                  </p>
                  <h4 class="title">游戏玩法 PLAYING METHOD</h4>
                  <p>
                     
                    理牌：以两张牌为一副，排列成一列 <br>每副牌只玩两局即重新洗牌 <br>发牌：庄家以两骰先击骰，再以点数除以4的余数，1 = 庄，2 = 顺门，3 = 出门，0 = 到门，来决定从哪一门开始发牌，每门一圈发一张牌，每家共各有两张牌 <br>下注门数：有三门，每一门可分别下注该门输或赢，但押闲输者每个玩家只能押一门，押闲赢者最高可以押到3门 <br>以两支牌点数之和的个位数来分胜负，最大是9，最小是0
                  </p>
                  <h4 class="title">牌面点数 COUNT THE CARD</h4>
                  <h5>单张牌的大小顺序</h5>
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <td class="wider">大小顺序</td>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td colspan="3">5</td>
                        <td colspan="4">6</td>
                      </tr>
                    </thead>
                    <tbody> 
                      <tr>
                        <td>单张牌</td>
                        <td><span class="BBIN3-img q-hearts"></span><span class="BBIN3-img q-diamonds"></span></td>
                        <td><span class="BBIN3-img hearts-2"></span><span class="BBIN3-img diamonds-2"></span></td>
                        <td> <span class="BBIN3-img hearts-8"></span><span class="BBIN3-img diamonds-8"></span></td>
                        <td><span class="BBIN3-img hearts-4"></span><span class="BBIN3-img diamonds-4"></span></td>
                        <td colspan="3"><span class="BBIN3-img clubs-10"></span><span class="BBIN3-img clubs-6"></span><span class="BBIN3-img clubs-4"></span><span class="BBIN3-img spades-10"></span><span class="BBIN3-img spades-6"></span><span class="BBIN3-img spades-4"></span></td>
                        <td colspan="4"><span class="BBIN3-img j-hearts"></span><span class="BBIN3-img hearts-10"></span><span class="BBIN3-img hearts-7"></span><span class="BBIN3-img hearts-6"></span>
                        <span class="BBIN3-img j-diamonds"></span>
                        <span class="BBIN3-img diamonds-10"></span>
                        <span class="BBIN3-img diamonds-7"></span><span class="BBIN3-img diamonds-6"></span></td>
                      </tr>
                      <tr>
                        <td>名称</td>
                        <td>天牌</td>
                        <td>地牌</td>
                        <td>人牌</td>
                        <td>鵝牌</td>
                        <td>梅牌</td>
                        <td>长三</td>
                        <td>板凳</td>
                        <td>斧头</td>
                        <td>红头十</td>
                        <td>高脚七</td>
                        <td>零霖六</td>
                      </tr>
                      <tr>
                        <td>点数</td>
                        <td>12</td>
                        <td>2</td>
                        <td>8 </td>
                        <td>4</td>
                        <td>10</td>
                        <td>6</td>
                        <td>4</td>
                        <td>11</td>
                        <td>10 </td>
                        <td>7</td>
                        <td>6 </td>
                      </tr>
                      <tr>
                        <td>大小顺序</td>
                        <td colspan="11">7 </td>
                      </tr>
                      <tr>
                        <td>单张牌</td>
                        <td colspan="2"> <span class="BBIN3-img hearts-9"></span><span class="BBIN3-img diamonds-9"></span></td>
                        <td colspan="2"> <span class="BBIN3-img clubs-8"></span><span class="BBIN3-img spades-8"></span></td>
                        <td colspan="2"> <span class="BBIN3-img clubs-7"></span><span class="BBIN3-img spades-7"></span></td>
                        <td colspan="2"> <span class="BBIN3-img a-spades"></span></td>
                        <td colspan="2"> <span class="BBIN3-img hearts-5"></span><span class="BBIN3-img diamonds-5"></span></td>
                        <td> <span class="BBIN3-img spades-3"></span></td>
                      </tr>
                      <tr>
                        <td>名称</td>
                        <td colspan="2">杂九</td>
                        <td colspan="2">杂八</td>
                        <td colspan="2">杂七</td>
                        <td colspan="2">大鸡六 </td>
                        <td colspan="2">杂五</td>
                        <td>小鸡 </td>
                      </tr>
                      <tr>
                        <td>点数</td>
                        <td colspan="2">9 </td>
                        <td colspan="2">8 </td>
                        <td colspan="2">7 </td>
                        <td colspan="2">6 </td>
                        <td colspan="2">5 </td>
                        <td>3 </td>
                      </tr>
                    </tbody>
                  </table>
                  <h5>对牌的大小顺序</h5>
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <td class="wider">大小顺序</td>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td colspan="2"> 5</td>
                      </tr>
                    </thead>
                    <tbody> 
                      <tr>
                        <td>对牌</td>
                        <td> <span class="BBIN3-img q-hearts"></span><span class="BBIN3-img q-diamonds"></span></td>
                        <td> <span class="BBIN3-img hearts-2"></span><span class="BBIN3-img diamonds-2"></span></td>
                        <td> <span class="BBIN3-img a-spades"></span><span class="BBIN3-img spades-3"></span></td>
                        <td> <span class="BBIN3-img hearts-8"></span><span class="BBIN3-img diamonds-8"></span></td>
                        <td colspan="2"> <span class="BBIN3-img hearts-4"></span><span class="BBIN3-img diamonds-4"></span></td>
                      </tr>
                      <tr>
                        <td>名称</td>
                        <td>双天</td>
                        <td>双地</td>
                        <td>至尊</td>
                        <td>双人</td>
                        <td colspan="2"> 双鹅</td>
                      </tr>
                      <tr>
                        <td>大小顺序</td>
                        <td colspan="6">7 </td>
                      </tr>
                      <tr>
                        <td>对牌</td>
                        <td> <span class="BBIN3-img clubs-10"></span><span class="BBIN3-img spades-10"></span></td>
                        <td> <span class="BBIN3-img clubs-6"></span><span class="BBIN3-img spades-6"></span></td>
                        <td> <span class="BBIN3-img clubs-4"></span><span class="BBIN3-img spades-4"></span></td>
                        <td> <span class="BBIN3-img j-hearts"></span><span class="BBIN3-img j-diamonds"></span></td>
                        <td colspan="2"> <span class="BBIN3-img hearts-10"></span><span class="BBIN3-img diamonds-10"></span></td>
                      </tr>
                      <tr>
                        <td>名称</td>
                        <td>双梅</td>
                        <td>双长三</td>
                        <td>双板凳</td>
                        <td>双斧头</td>
                        <td colspan="2"> 双红头十</td>
                      </tr>
                      <tr>
                        <td>大小顺序</td>
                        <td colspan="2">7 </td>
                        <td colspan="4">8 </td>
                      </tr>
                      <tr>
                        <td>对牌</td>
                        <td> <span class="BBIN3-img hearts-7"></span><span class="BBIN3-img diamonds-7"></span></td>
                        <td> <span class="BBIN3-img hearts-6"></span><span class="BBIN3-img diamonds-6"></span></td>
                        <td> <span class="BBIN3-img hearts-9"></span><span class="BBIN3-img diamonds-9"></span></td>
                        <td> <span class="BBIN3-img clubs-8"></span><span class="BBIN3-img spades-8"></span></td>
                        <td> <span class="BBIN3-img clubs-7"></span><span class="BBIN3-img spades-7"></span></td>
                        <td> <span class="BBIN3-img hearts-5"></span><span class="BBIN3-img diamonds-5"></span></td>
                      </tr>
                      <tr>
                        <td>名称</td>
                        <td>双高脚七 </td>
                        <td>双零霖六</td>
                        <td>双杂九 </td>
                        <td>双杂八 </td>
                        <td>双杂七 </td>
                        <td>双杂五</td>
                      </tr>
                      <tr>
                        <td>大小顺序</td>
                        <td>9 </td>
                        <td>10 </td>
                        <td>11 </td>
                        <td>12 </td>
                        <td colspan="2"> 13</td>
                      </tr>
                      <tr>
                        <td>对牌</td>
                        <td> <span class="BBIN3-img q-hearts"></span><span class="BBIN3-img hearts-9"></span><span class="BBIN3-img q-diamonds"></span><span class="BBIN3-img diamonds-9"></span></td>
                        <td> <span class="BBIN3-img q-hearts"></span><span class="BBIN3-img q-diamonds"></span><span class="BBIN3-img hearts-8"></span><span class="BBIN3-img diamonds-8"></span><span class="BBIN3-img clubs-8"></span><span class="BBIN3-img spades-8"></span></td>
                        <td><span class="BBIN3-img hearts-2"></span><span class="BBIN3-img diamonds-2"></span><span class="BBIN3-img hearts-8"></span><span class="BBIN3-img diamonds-8"></span><span class="BBIN3-img clubs-8"></span><span class="BBIN3-img spades-8"></span></td>
                        <td><span class="BBIN3-img q-hearts"></span><span class="BBIN3-img q-diamonds"></span><span class="BBIN3-img hearts-7"></span><span class="BBIN3-img diamonds-7"></span><span class="BBIN3-img clubs-7"></span><span class="BBIN3-img spades-7"></span></td>
                        <td colspan="2"> <span class="BBIN3-img hearts-2"></span><span class="BBIN3-img diamonds-2"></span><span class="BBIN3-img hearts-7"></span><span class="BBIN3-img diamonds-7"></span><span class="BBIN3-img clubs-7"></span><span class="BBIN3-img spades-7"></span></td>
                      </tr>
                      <tr>
                        <td>名称</td>
                        <td>天九王</td>
                        <td>天杠</td>
                        <td>地杠</td>
                        <td>天九</td>
                        <td colspan="2"> 地九</td>
                      </tr>
                    </tbody>
                  </table>
                  <h5>没有对牌的大小顺序</h5>
                  <p>若没有对牌，则以两牌点数之和的个位数来分胜负，最大是9，最小是0。 <br>范例一：没对牌的组合方式</p>
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <td>組合</td>
                        <td>点数和方式</td>
                      </tr>
                    </thead>
                    <tbody> 
                      <tr>
                        <td> <span class="BBIN3-img hearts-4"></span><span class="BBIN3-img diamonds-5"></span></td>
                        <td>左边的牌 = 4点，右边的牌 = 5点，4 + 5 = 9此牌组为9点</td>
                      </tr>
                      <tr>
                        <td> <span class="BBIN3-img hearts-5"></span><span class="BBIN3-img j-diamonds"></span></td>
                        <td>左边的牌 = 5点，右边的牌 = 11点，5 + 11 = 16，超过10点则只取除以10的余数，此牌组为6点</td>
                      </tr>
                      <tr>
                        <td> <span class="BBIN3-img spades-10"></span><span class="BBIN3-img hearts-10"></span></td>
                        <td>左边的牌 = 10点，右边的牌 = 10点，10 + 10 = 20，超过10点除以10正好整除(余数等于0)，此牌组为0点</td>
                      </tr>
                    </tbody>
                  </table>
                  <p>范例二：比点数时如遇到同点数，就以其中最大单张牌的级别来比较大小</p>
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <td>組合</td>
                        <td>点数和方式</td>
                      </tr>
                    </thead>
                    <tbody> 
                      <tr>
                        <td> <span class="BBIN3-img q-hearts"></span><span class="BBIN3-img hearts-5"></span>
                          <p>V.S.</p><span class="BBIN3-img diamonds-9"></span><span class="BBIN3-img spades-8"></span>
                        </td>
                        <td>同样是7点，但天牌比杂牌大，有天牌的7点为大</td>
                      </tr>
                      <tr>
                        <td> <span class="BBIN3-img clubs-10"></span><span class="BBIN3-img diamonds-9"></span>
                          <p>V.S.</p><span class="BBIN3-img diamonds-10"></span><span class="BBIN3-img hearts-9"></span>
                        </td>
                        <td>同样是9点，但梅牌比红头牌大，有梅牌的9点为大</td>
                      </tr>
                      <tr>
                        <td><span class="BBIN3-img clubs-6"></span><span class="BBIN3-img diamonds-9"></span>
                          <p>V.S.</p><span class="BBIN3-img hearts-7"></span><span class="BBIN3-img clubs-8"></span>
                        </td>
                        <td>同样是5点，但长三牌比高脚七牌大，有长三牌的5点为大</td>
                      </tr>
                      <tr>
                        <td><span class="BBIN3-img clubs-6"></span><span class="BBIN3-img hearts-5"></span>
                          <p>V.S.</p><span class="BBIN3-img hearts-6"></span><span class="BBIN3-img hearts-5"></span>
                        </td>
                        <td>同样是1点，但长三牌比零霖牌大，有长三牌的1点为大</td>
                      </tr>
                      <tr>
                        <td><span class="BBIN3-img clubs-10"></span><span class="BBIN3-img hearts-9"></span>
                          <p>V.S.</p><span class="BBIN3-img spades-4"></span><span class="BBIN3-img hearts-5"></span>
                        </td>
                        <td>梅牌与板凳一样大，所以两者一样大(视为庄家赢)</td>
                      </tr>
                    </tbody>
                  </table>
                  <p>范例三：「大鸡六」和「小鸡」不能变化点数</p>
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <td>組合</td>
                        <td>点数和方式</td>
                      </tr>
                    </thead>
                    <tbody> 
                      <tr>
                        <td> <span class="BBIN3-img spades-3"></span><span class="BBIN3-img hearts-7"></span></td>
                        <td>两张牌的点数相加3 + 7 = 10，小鸡只能定义为3点，此牌组为0点</td>
                      </tr>
                      <tr>
                        <td> <span class="BBIN3-img spades-3"></span><span class="BBIN3-img clubs-6"></span></td>
                        <td>两张牌的点数相加 3 + 6 = 9，此牌组为9点</td>
                      </tr>
                    </tbody>
                  </table>
                  <h5>牌型比较</h5>
                  <p>任何对牌皆大于没对牌，任何没对牌皆小于对牌 <br> 若双方对牌名称相同，则为庄家赢 (若庄门对牌级别为同级，则庄家赢） <br>若没对牌的点数，其最大单张牌级别大小皆相同，则为庄家赢 <br>0点没有级别，庄家通吃 <br>「大鸡六」和「小鸡」不能变化点数</p>
                  <h4 class="title">派彩 PAYOFF</h4>
                  <p>押门赢赔率为1 : 0.99 <br>押门输赔率为1 : 0.93           </p>
                  <h4 class="title">其他补充说名 EXPLANATION</h4>
                  <p>荷官发牌时，偶有系统无法判读状况时，此时荷官将重新扫描，直到系统能够完整判读 <br>(如遇故障因素将注销所有相关注单/奖金) <br>此游戏之玩家获利率约为 98.27%</p>
                </section>`},
        {name:"轮盘",introduction:"我们提供的是欧式蒙地卡罗轮盘，转轮有 37个槽，号码为0，1到36。下注结束后，荷官会把轮盘向一个方向转动...",contentString:`<section>
                  <h4 class="title"> 简介 INTRODUCTION</h4>
                  <p>
                     
                    我们提供的是欧式蒙地卡罗轮盘，转轮有 37个槽，号码为0，1到36。下注结束后，荷官会把轮盘向一个方向转动，然后把象牙制滚球抛到轮盘的外侧，让滚球在轮盘内转动多周后慢慢停下来，并降落在其中一个细沟内为该局结果。
                  </p>
                  <h4 class="title">    游戏玩法 PLAYING METHOD</h4>
                  <ul>
                    <li>开始新局后，即开始下注倒数计时，请玩家在桌面不同的方格内或方格的边界上押放筹码。 </li>
                    <li>倒数结束前由荷官转动轮盘，并抛出滚球。 </li>
                    <li>由荷官输入结果数字，同时玩家画面显示结果。 </li>
                    <li>若滚球停止转动后仍无法判别结果，该局将作废；所有下注无效退回本金，游戏重开新局。</li>
                  </ul>
                  <h4 class="title">    掷球规则 THROW RULES</h4>
                  <ul> 
                    <li>本游戏进行方式为最接近实境赌场之设置，若有发生特殊情形将依本公司公告之办法处理。 </li>
                    <li>本游戏为即时视讯传输，为让您清楚看到号码特写，于每局游戏结果产生时，荷官在不影响游戏结果的情况下会将结果号码转至定点，然后提供结果特写给所有玩家。 </li>
                    <li> </li>（a）荷官掷球时若不慎将球掷出轮盘之外视为“飞球<br> （b）圆球若旋转不到三圈即落入号码框格内；<br>（c）圆球在盘缘上转动不停而未正常落入号码框格内；<br>此时将由荷官停止轮盘运转，并将圆球摆放回轮盘正中央。玩家会在视窗内看到“无法判定结果，重新掷球”等提示后再由荷官重新进行掷球。 
                    <li>荷官在游戏进行中若因种种因素把轮盘停止运转则该局游戏必将重新进行掷球。 </li>
                    <li>若游戏结果与系统开配有误时，所有游戏结果将以视讯为主并重新派彩。 </li>
                    <li>游戏进行中因线路问题造成视讯中断:<br>(a) 若圆球已落入号码框格内，则该局游戏视为有效并由系统进行开配；<br>(b) 若圆球还在旋转中未落入号码框格内，则由荷官停止轮盘运转并将圆球摆放回轮盘正中央，等视讯恢复正常后再重新掷球，游戏继续。 </li>
                    <li>游戏进行中若遇某种因素需暂停游戏而关桌处理时，若游戏尚未有结果则退回所有下注金额 。 </li>
                    <li>本公司所提供之每局电脑画面游戏结果与历史赛果记录仅供参考，所有游戏结果皆以视讯结果为依据。</li>
                  </ul>
                  <h4 class="title">    投注種類 BET TYPES</h4>
                  <p>轮盘的投注方式有 12个种类，详细说明如下:</p>
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <td style="width:15%;">名称</td>
                        <td>说明</td>
                      </tr>
                    </thead>
                    <tbody> 
                      <tr>
                        <td>直接注</td>
                        <td>您可以投注包括 0在内的任意一个数位。下注时将筹码放到那个数位的中心 (如8、23或35)。</td>
                      </tr>
                      <tr>
                        <td>分注</td>
                        <td>您可以投注于两个号码之间的格线上 (如2和3，或13和16)。</td>
                      </tr>
                      <tr>
                        <td>街注</td>
                        <td>您可以投注三个号码。将筹码押在轮盘桌上有三个数位那一行顶部的那条边线上即可 (如7、8和9)。</td>
                      </tr>
                      <tr>
                        <td>三数</td>
                        <td>您可以投注于 0, 1, 2或0, 2, 3的交接区域。</td>
                      </tr>
                      <tr>
                        <td>角注</td>
                        <td>您也可以将筹码放到四个数位方框交差的那个角区以下注那四个数位 (如19、20、22和23)。</td>
                      </tr>
                      <tr>
                        <td>四个号码</td>
                        <td>您可将筹码放到 0和3交线的左侧以下注数位 0, 1, 2 和3。</td>
                      </tr>
                      <tr>
                        <td>线注</td>
                        <td>您可将筹码下注到两行相交的最顶部的交点处 ， 您可以赌两个街注，也就是两行的六个数位。 (如28、29、30及31、32、33便组成一条Line)。</td>
                      </tr>
                      <tr>
                        <td>列注</td>
                        <td>桌上每列数位底部都有带‘ 2 比 1 ' 字样的方框，一共有三个。 如果被击中的号码是那一列中的数位，那麼您就按 1:2 的比率赢钱。这种赌区不包括 0 。 (如：3、6、9、12、15、18、21、24、27、30、33、36)。</td>
                      </tr>
                      <tr>
                        <td>下注一打数位</td>
                        <td>您可以将筹码下到有 ”第一打 12”，”第二打 12”和”第三打 12 “字样的赌区以同时下注 12个数位。 (分别为1-12、13-24及25-36)。</td>
                      </tr>
                      <tr>
                        <td>红色 /黑色</td>
                        <td>投注中彩号码将为红色或是黑色的，共投注十八个数位。(若开0则通杀)。</td>
                      </tr>
                      <tr>
                        <td>双数 / 单数</td>
                        <td>投注中彩号码将为单数或是双数，共投注十八个数位。(若开0则通杀)。</td>
                      </tr>
                      <tr>
                        <td>大 / 小</td>
                        <td>投注中彩号码将算小 (1-18)或是算大(19-36)，共十八个数位。(若开0则通杀)。</td>
                      </tr>
                    </tbody>
                  </table>
                  <h4 class="title">派彩 PAYOFF</h4>
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <td>投注类型</td>
                        <td>派彩</td>
                      </tr>
                    </thead>
                    <tbody> 
                      <tr>
                        <td>直接注</td>
                        <td>1:35</td>
                      </tr>
                      <tr>
                        <td>分注</td>
                        <td>1:17</td>
                      </tr>
                      <tr>
                        <td>街注</td>
                        <td>1:11</td>
                      </tr>
                      <tr>
                        <td>三数</td>
                        <td>1:11</td>
                      </tr>
                      <tr>
                        <td>角注</td>
                        <td>1:8</td>
                      </tr>
                      <tr>
                        <td>四个号码</td>
                        <td>1:8</td>
                      </tr>
                      <tr>
                        <td>线注</td>
                        <td>1:5</td>
                      </tr>
                      <tr>
                        <td>列注</td>
                        <td>1:2</td>
                      </tr>
                      <tr>
                        <td>下注一打数位</td>
                        <td>1:2</td>
                      </tr>
                      <tr>
                        <td>红色 /黑色</td>
                        <td>1:1</td>
                      </tr>
                      <tr>
                        <td>双数 / 单数</td>
                        <td>1:1</td>
                      </tr>
                      <tr>
                        <td>大 / 小</td>
                        <td>1:1</td>
                      </tr>
                    </tbody>
                  </table>
                  <h5>闲家 / Player - 头两张牌点数总和</h5>
                  <table class="table table-bordered text-center">
                    <tbody> 
                      <tr>
                        <td>0-1-2-3-4-5</td>
                        <td>补一张牌</td>
                      </tr>
                      <tr>
                        <td>6或7</td>
                        <td>不需补牌</td>
                      </tr>
                      <tr>
                        <td>8或9</td>
                        <td>﹝天生赢家﹞不需补牌</td>
                      </tr>
                    </tbody>
                  </table>
                  <h4 class="title">其他补充说名 EXPLANATION</h4>
                  <h5>邻注 [Neighbor Bets] </h5>
                  <p>
                     
                    当玩家选中一个号码下Neighbor Bets时，代表他下了这个号码及其前后各两个号码(轮盘位置上左右的号码)，总共为5个号码，皆为直注（单一号码）。需要5个筹码
                  </p>
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <td>名称</td>
                        <td>说明</td>
                      </tr>
                    </thead>
                    <tbody> 
                      <tr>
                        <td>直接注</td>
                        <td>若开球号为Neighbor Bets中的号码，其赔率为1:35 。</td>
                      </tr>
                    </tbody>
                  </table>
                  <h5>轮盘零旁注 [Neighbors of Zero] </h5>
                  <p>您可以将筹码押注在轮盘的“零旁注上角”区，即轮盘枱上的4号与7号之间，12号与15号之间，18号与21号之间，19号与22号之间，32号与35号之间各一注；0号，2号与3号之间两注；25号，26号，28号与29号之间两注。若结果是落在零旁注上角区，您将可赢得相应的赌金，此押注合共9注。 下注的方式为:</p>
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <td>下注区</td>
                        <td>筹码数</td>
                        <td>赔率</td>
                        <td>下注类型</td>
                      </tr>
                    </thead>
                    <tbody> 
                      <tr>
                        <td>0, 2, 3</td>
                        <td>2</td>
                        <td>1:11</td>
                        <td>三数</td>
                      </tr>
                      <tr>
                        <td>25, 26, 28, 29</td>
                        <td>2</td>
                        <td>1:8</td>
                        <td>角注</td>
                      </tr>
                      <tr>
                        <td>4, 7</td>
                        <td>1</td>
                        <td>1:17</td>
                        <td>分注</td>
                      </tr>
                      <tr>
                        <td>12, 15</td>
                        <td>1</td>
                        <td>1:17</td>
                        <td>分注</td>
                      </tr>
                      <tr>
                        <td>18, 21</td>
                        <td>1</td>
                        <td>1:17</td>
                        <td>分注</td>
                      </tr>
                      <tr>
                        <td>19, 22</td>
                        <td>1</td>
                        <td>1:17</td>
                        <td>分注</td>
                      </tr>
                      <tr>
                        <td>32, 35</td>
                        <td>1</td>
                        <td>1:17</td>
                        <td>分注</td>
                      </tr>
                    </tbody>
                  </table>
                  <h5>轮盘下角注 [The Third]</h5>
                  <p>您可以将筹码押注在轮盘的“轮盘下角注”区，即轮盘枱上的5号与8号之间，10号与11号之间，13号与16号之间，23号与24号之间，27号与30号之间，和33号与36号之间上。若结果是落在轮盘下角注区，您将可赢得相应的赌金，此押注合共6注。下注的方式为：</p>
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <td>下注区</td>
                        <td>筹码数</td>
                        <td>赔率</td>
                        <td>下注类型</td>
                      </tr>
                    </thead>
                    <tbody> 
                      <tr>
                        <td>5, 8</td>
                        <td>1</td>
                        <td>1:17</td>
                        <td>分注</td>
                      </tr>
                      <tr>
                        <td>10, 11</td>
                        <td>1</td>
                        <td>1:17</td>
                        <td>分注</td>
                      </tr>
                      <tr>
                        <td>13, 16</td>
                        <td>1</td>
                        <td>1:17</td>
                        <td>分注</td>
                      </tr>
                      <tr>
                        <td>23, 24</td>
                        <td>1</td>
                        <td>1:17</td>
                        <td>分注</td>
                      </tr>
                      <tr>
                        <td>27, 30</td>
                        <td>1</td>
                        <td>1:17</td>
                        <td>分注</td>
                      </tr>
                      <tr>
                        <td>33, 36</td>
                        <td>1</td>
                        <td>1:17</td>
                        <td>分注</td>
                      </tr>
                    </tbody>
                  </table>
                  <h5>轮盘孤注 [Orphans]</h5>
                  <p>您可以将筹码押注在轮盘的“轮上孤注”区，即轮盘枱上的6号与9号之间，14号与17号之间，17号与20号之间，31号与34号之间，和1号上。若结果是落在轮上孤注区，您将可赢得相应的赌金，此押注合共5注。下注的方式为：</p>
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <td>下注区</td>
                        <td>筹码数</td>
                        <td>赔率</td>
                        <td>下注类型</td>
                      </tr>
                    </thead>
                    <tbody> 
                      <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1:35</td>
                        <td>直接注</td>
                      </tr>
                      <tr>
                        <td>6, 9</td>
                        <td>1</td>
                        <td>1:17</td>
                        <td>分注</td>
                      </tr>
                      <tr>
                        <td>14, 17</td>
                        <td>1</td>
                        <td>1:17</td>
                        <td>分注</td>
                      </tr>
                      <tr>
                        <td>17, 20</td>
                        <td>1</td>
                        <td>1:17</td>
                        <td>分注</td>
                      </tr>
                      <tr>
                        <td>31, 34</td>
                        <td>1</td>
                        <td>1:17</td>
                        <td>分注</td>
                      </tr>
                    </tbody>
                  </table>
                  <p>※如遇故障因素将注销所有相关注单/奖金 <br>※此游戏之玩家获利率约为 97.98%</p>
                </section>`},
        {name:"金臂百家乐",introduction:"长期以来，百家乐是亚洲、欧洲和拉丁美洲最受欢迎的游戏之ㄧ，看似复杂，但事实上，百家乐可能是赌场内最简单的游戏...",contentString:`<section>
              <h4 class="title"> 简介 INTRODUCTION</h4>
              <p>
                 
                长期以来，百家乐是亚洲、欧洲和拉丁美洲最受欢迎的游戏之ㄧ，看似复杂，但事实上，百家乐可能是赌场内最简单的游戏
              </p>
              <h4 class="title">    游戏玩法 PLAYING METHOD</h4>
              <p>游戏使用八副扑克牌。 <br>发牌员会派出﹝庄家﹞和﹝闲家﹞两份牌，总数得9点或最接近9点的一家胜出 <br>你有十一种下注选择：◎闲家 ◎庄家 ◎和局 ◎庄对子 ◎庄双 ◎庄单 ◎闲对子 ◎闲单 ◎闲双 ◎大 ◎小</p>
              <h4 class="title">    牌面点数 COUNT THE CARD</h4>
              <p>所有从2到9的牌，其数值就是他们显示的点数： <br> A当作是1点，K、Q、J、10是0点，而加起来等于10的也当作是0点当任何一家头两张牌的点数总和为8或9，就称为﹝天生赢家﹞ <br>任何一家拿到﹝天生赢家﹞，牌局就算结束，不再补牌 <br>派出两张牌后，如果需要补牌，将依照补牌规则多发一张牌</p>
              <h4 class="title">    大小  BIG &amp; SMALL CARD COUNTING</h4>
              <p>指根据当局所开之牌张数的总和为依据，4张牌为小，5张牌或6张牌为大，即增牌为大，不增牌为小。</p>
              <h4 class="title">    派彩 PAYOFF</h4>
              <table class="table table-bordered text-center">
                <thead>
                  <tr>
                    <td>投注种类</td>
                    <td>赔率</td>
                  </tr>
                </thead>
                <tbody> 
                  <tr>
                    <td>下注闲家</td>
                    <td>1赔1 (开和局时退回下注金额)</td>
                  </tr>
                  <tr>
                    <td>下注庄家</td>
                    <td>1赔0.95 (开和局时退回下注金额)</td>
                  </tr>
                  <tr>
                    <td>下注和局</td>
                    <td>1赔8</td>
                  </tr>
                  <tr>
                    <td>下注庄对子</td>
                    <td>1赔11（即庄首两张牌为同数字或英文字母者）</td>
                  </tr>
                  <tr>
                    <td>下注闲对子   </td>
                    <td>1赔11（即闲首两张牌为同数字或英文字母者）</td>
                  </tr>
                  <tr>
                    <td>下注大</td>
                    <td>1赔0.53</td>
                  </tr>
                  <tr>
                    <td>下注小</td>
                    <td>1赔1.45</td>
                  </tr>
                  <tr>
                    <td>下注闲单</td>
                    <td>1赔0.95</td>
                  </tr>
                  <tr>
                    <td>下注闲双    </td>
                    <td>1赔0.88</td>
                  </tr>
                  <tr>
                    <td>下注庄单</td>
                    <td>1赔0.92</td>
                  </tr>
                  <tr>
                    <td>下注庄双</td>
                    <td>1赔0.92</td>
                  </tr>
                </tbody>
              </table>
              <h5>闲家 / Player - 头两张牌点数总和</h5>
              <table class="table table-bordered text-center">
                <tbody> 
                  <tr>
                    <td>0-1-2-3-4-5</td>
                    <td>补一张牌</td>
                  </tr>
                  <tr>
                    <td>6或7</td>
                    <td>不需补牌</td>
                  </tr>
                  <tr>
                    <td>8或9</td>
                    <td>﹝天生赢家﹞不需补牌</td>
                  </tr>
                </tbody>
              </table>
              <h5>庄家 / Banker</h5>
              <table class="table table-bordered text-center">
                <thead>
                  <tr>
                    <td>头两张牌点数总和</td>
                    <td>庄家补牌如果闲家第三张牌是…</td>
                    <td>庄家不补牌，如果闲家第三张牌是..</td>
                  </tr>
                </thead>
                <tbody> 
                  <tr>
                    <td>0-1-2</td>
                    <td>0，1，2，3，4，5，6，7，8，9</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>0，1，2，3，4，5，6，7，9</td>
                    <td>8</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>2，3，4，5，6，7</td>
                    <td>0，1，8，9</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>4，5，6，7</td>
                    <td>0，1，2，3，8，9</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>6或7</td>
                    <td>0，1，2，3，4，5，8，9</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>不须补牌</td>
                    <td>不须补牌</td>
                  </tr>
                  <tr>
                    <td>8或9</td>
                    <td>不须补牌</td>
                  </tr>
                </tbody>
              </table>
              <h4 class="title">其他补充说名 EXPLANATION</h4>
              <p>每靴第30局以上，不接受单双与大小之投注 荷官发牌时，偶有系统无法判读状况时，此时荷官将重新扫描，直到系统能够完整判读 (如遇故障因素将注销所有相关注单/奖金) 此游戏之玩家获利率约为 98.10%</p>
            </section>`},
        {name:"骰宝",introduction:"骰宝也叫赌大小，是中国古老相传的游戏。这个游戏的用具是个密封的骰盅，由各玩家选择筹码下注，猜测经机械摇动后骰子开出的点数或是点数总合...",contentString:`<section>
                    <h4> 简介 INTRODUCTION</h4>
                    <p>

                        骰宝也叫赌大小，是中国古老相传的游戏。这个游戏的用具是个密封的骰盅，由各玩家选择筹码下注，猜测经机械摇动后骰子开出的点数或是点数总合。
                    </p>
                    <h4>	游戏玩法 PLAYING METHOD</h4>
                    <ul>
                        <li>开始新局后即开始下注倒数计时，您可以依照您的猜测，选择筹码下注 。 </li>
                        <li>倒数时间结束后停止下注，再由荷官按钮经机械自动摇骰。 </li>
                        <li>待骰盅停止后，视三颗骰子停留开出的点数，由荷官输入三点数，同时画面亮起灯光，可清楚看到胜出注码和赔率；是否与玩家押注的内容相同，来判定输赢。 </li>
                        <li>若骰子靠在骰盎边缘上而造成有斜骰或叠骰情形发生，无法判断点数时，该局作废所有下注无效退回本金，游戏重开新局。</li>
                    </ul>
                    <h4>投注種類 BET TYPES</h4>
                    <p>筹码是放在划有不同赌法的方格的赌桌上，您可以下注在任何的方格，但要在下注时限之内押注。</p>
                    <h4>大小 QUANTITY</h4>
                    <p>最大为K, 最小为A, 不比花色, 只比点数, 点数相同为和。</p>
                    <h4>派彩 PAYOFF</h4>
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr>
                                <td>下注</td>
                                <td>说明</td>
                                <td>赔率</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>大 / 小</td>
                                <td>大 : 总点数 11 至 17 ( 遇围骰庄家通吃 )<br>小 : 总点数为 4 至 10 ( 遇围骰庄家通吃 )</td>
                                <td>1赔1</td>
                            </tr>
                            <tr>
                                <td>围骰</td>
                                <td>投注指定的围骰 ( 如 1 围骰 ) ，一定开出 3 颗所投注的骰子</td>
                                <td>1赔150</td>
                            </tr>
                            <tr>
                                <td>全围</td>
                                <td>3 颗骰子都一样</td>
                                <td>1赔24</td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <td colspan="3">下注在单一个点数 ( 三军 )</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>出现单骰</td>
                                <td>投注每颗骰子 1 至 6 中指定的点数，点数出现 1 次</td>
                                <td>1 赔 2</td>
                            </tr>
                            <tr>
                                <td>出现双骰</td>
                                <td>投注每颗骰子 1 至 6 中指定的点数，点数出现 2 次</td>
                                <td>1 赔 1</td>
                            </tr>
                            <tr>
                                <td>出现全骰</td>
                                <td>投注每颗骰子 1 至 6 中指定的点数，点数出现 3 次</td>
                                <td>1 赔 3</td>
                            </tr>
                            <tr>
                                <td>对子 ( 双骰、长牌 )</td>
                                <td>投注指定的双骰 ( 如双 1 点 ) ，至少开出 2 颗所投注的骰子</td>
                                <td>1 赔 8</td>
                            </tr>
                            <tr>
                                <td>牌九式 ( 骨牌、短牌 )</td>
                                <td>投注 15 种 2 颗骰子可能出现的组合 ( 如 1 ， 2)</td>
                                <td>1 赔 5</td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <td colspan="3">点数总和</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>4 或 17 点</td>
                                <td>总和为 4 或 17 点</td>
                                <td>1 赔 50</td>
                            </tr>
                            <tr>
                                <td>5 或 16 点</td>
                                <td>总和为 5 或 16 点</td>
                                <td>1 赔 18</td>
                            </tr>
                            <tr>
                                <td>6 或 15 点</td>
                                <td>总和为 6 或 15 点</td>
                                <td>1 赔 14</td>
                            </tr>
                            <tr>
                                <td>7 或 14 点</td>
                                <td>总和为 7 或 14 点</td>
                                <td>1 赔 12</td>
                            </tr>
                            <tr>
                                <td>8 或 13 点</td>
                                <td>总和为 8 或 13 点	1 赔 </td>
                                <td>1 赔 8</td>
                            </tr>
                            <tr>
                                <td>9, 10, 11, 或 12</td>
                                <td>总和为 8 或 13 点	1 赔 </td>
                                <td>1 赔 8</td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <td colspan="3">单 / 双</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>单 </td>
                                <td>总点数为 5, 7, 9, 11, 13, 15, 17 点 ( 遇围骰庄家通吃 )</td>
                                <td>1 赔 1</td>
                            </tr>
                            <tr>
                                <td>双</td>
                                <td>总点数为 4, 6, 8, 10, 12, 14, 16 点 ( 遇围骰庄家通吃 )</td>
                                <td>1 赔 1</td>
                            </tr>
                        </tbody>
                    </table>
                    <h4>其他补充说名 EXPLANATION</h4>
                    <p>如遇故障因素将注销所有相关注单/奖金 此游戏之玩家获利率约为 95.52%</p>
                </section>`},
        {name:"龙虎游戏",introduction:"以牌   面大小来决定输赢的桌牌游戏，游戏的容易程度让玩家不分男女老少都喜爱。牌面大小不比花色，只比点数，K为最大牌，A为最小...",contentString:`<section>
                    <h4> 简介 INTRODUCTION</h4>
                    <p>

                        牌面大小来决定输赢的桌牌游戏，游戏的容易程度让玩家不分男女老少都喜爱。牌面大小不比花色，只比点数，K为最大牌，A为最小。
                    </p>
                    <h4>	游戏玩法 PLAYING METHOD</h4>
                    <p>

                        游戏使用八副扑克牌。 <br>玩家可投注 龙 虎 和 三门。 <br>荷官只派两门牌, 每门各派一只牌, 即龙与虎, 双方斗大。
                    </p>
                    <h4>	大小 QUANTITY</h4>
                    <h4>	牌面点数 COUNT THE CARD</h4>
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr>
                                <td>投注种类</td>
                                <td>赔率</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>下注龙</td>
                                <td>1赔1,开和时输一半下注金额.</td>
                            </tr>
                            <tr>
                                <td>下注虎</td>
                                <td>1赔1,开和时输一半下注金额.</td>
                            </tr>
                            <tr>
                                <td>下注和</td>
                                <td>1赔8</td>
                            </tr>
                            <tr>
                                <td>下注龙单</td>
                                <td>1赔0.75</td>
                            </tr>
                            <tr>
                                <td>下注龙双</td>
                                <td>1赔1.05</td>
                            </tr>
                            <tr>
                                <td>下注虎单</td>
                                <td>1赔0.75</td>
                            </tr>
                            <tr>
                                <td>下注虎双</td>
                                <td>1赔1.05</td>
                            </tr>
                            <tr>
                                <td>下注龙红</td>
                                <td>1赔0.9</td>
                            </tr>
                            <tr>
                                <td>下注龙黑</td>
                                <td>1赔0.9</td>
                            </tr>
                            <tr>
                                <td>下注虎红</td>
                                <td>1赔0.9</td>
                            </tr>
                            <tr>
                                <td>下注虎黑</td>
                                <td>1赔0.9</td>
                            </tr>
                        </tbody>
                    </table>
                    <h4>其他补充说名 EXPLANATION</h4>
                    <p>每靴第50局以上，不接受单双与红黑之投注 如遇故障因素将注销所有相关注单/奖金，此游戏之玩家获利率约为 96.91%</p>
                </section>`}
    ],
    TGP:[//金星[申博]
        {name:"竞咪百家乐",introduction:"为提升游戏的兴奋度，令玩家们在参与时更见投入，我们诚意呈献全新打造的咪牌百家乐。登入游戏后，各位可即时观摩...",contentString:`<article>
                    <section>
                        <h4>当局最高投注额玩家，可进行咪牌。</h4>
                        <p>
                           “闲家”“庄家”各先派两张牌，以“闲家”先发，如第一轮未分出胜负需再按“牌例”发第二轮的牌，最多每方三张牌，谁最接近9点即为胜方，若又相同点数即和局。
                        </p>
                    </section>
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th colspan="2">百家乐博牌规则 </th>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <td class="gray">闲两牌合计点数(闲家) </td>
                                <td class="gray">庒两牌合计点数(庒家) </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0 必须博牌  </td>
                                <td>0 必须博牌 </td>
                            </tr>
                            <tr>
                                <td>1 必须博牌  </td>
                                <td>1 必须博牌   </td>
                            </tr>
                            <tr>
                                <td>2 必须博牌 </td>
                                <td>2 必须博牌 </td>
                            </tr>
                            <tr>
                                <td>3 必须博牌  </td>
                                <td>3 若闲博得8毋须博牌 </td>
                            </tr>
                            <tr>
                                <td>4 必须博牌  </td>
                                <td>4 若闲博得1、8、9、10毋须博牌 </td>
                            </tr>
                            <tr>
                                <td>5 必须博牌  </td>
                                <td>5 若闲博得1、2、3、8、9、10毋须博牌  </td>
                            </tr>
                            <tr>
                                <td>6 必须停牌 </td>
                                <td>6 若闲博得6、7必须博牌  </td>
                            </tr>
                            <tr>
                                <td>7 必须停牌  </td>
                                <td>7 不得博牌  </td>
                            </tr>
                            <tr>
                                <td>8 例牌，即定胜负 </td>
                                <td>8 例牌，即定胜负  </td>
                            </tr>
                            <tr>
                                <td>9 例牌，即定胜负</td>
                                <td>9 例牌，即定胜负             </td>
                            </tr>
                            <tr>
                                <td colspan="2">庄闲任何一方两牌合计8、9点为例牌，对方不须博牌，即定胜负。庄闲两方各得6、7点，即和局。</td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th colspan="2">赔率 </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>选择押庄贏 1赔0.95，抽水5%</td>
                            </tr>
                            <tr>
                                <td>选择押闲贏 1赔1，免抽水  </td>
                            </tr>
                            <tr>
                                <td>选择押和局 1赔8，免抽水   </td>
                            </tr>
                            <tr>
                                <td>选择押庄对 1赔11，免抽水   </td>
                            </tr>
                            <tr>
                                <td>选择押闲对 1赔11，免抽水                   </td>
                            </tr>
                        </tbody>
                    </table>

                    <section>
                        <h4>计算方法：</h4>
                        <p>
                            数字牌以牌面点数作计算（2计2点、3计3点，如此类推）
                            A牌计为1点、J、Q、K牌则以零点计算。
                        </p>
                    </section>
                </article>`},
        {name:"百家乐",introduction:"Baccarat(中译：百家乐)来自义大利语，意指「什么也不是」。据说，自公元1490年开始，这种桌上运动渐渐由义大利传入法国...",contentString:`<article>
              <section>
                <h4>起源：</h4>
                <p>

                  Baccarat(中译：百家乐)来自义大利语，意指「什么也不是」。据说，自公元1490年开始，这种桌上运动渐渐由义大利传入法国，更旋即成为流行于贵族阶层的游戏。后来，它逐渐成为民间纸牌消闲玩意，而且变化出多种不同玩法。时至今日，大部分欧洲国家流行一款称为"Chemin de fer"的百家乐分支游戏；相反，流行于英美等地的版本，则主要来自于英国。上世纪50年代，百家乐正式登陆美国拉斯维加斯的娱乐场，更成为人们的新宠。起初，百家乐桌上的赌注相当大，一般只为豪客们而设，但随着时代变迁，今日它已成为普罗大众的精采娱乐。
                </p>
              </section>
              <section>
                <h4>玩法：</h4>
                <p>

                  一般而言，投注百家乐没有人数限制。在娱乐场內，除了9人参与的小桌及14人参与的大桌所提供的座位外，站立者亦可参与投注。要注意，荷官会在发牌前点算投注区內庄闲及对子的注码(又称数红)，当注码超过个別赌桌的指定金额(限定金额因桌而异)，有关方面会指示客人减注至限定数目。除了设定最高限红外，每张赌桌亦设最低投注额。下注时，如玩家认为庄闲点数一样，不能胜负，可押注和局(Tie)；玩家如认为庄或闲任一方或两者同时获发一对牌，如两张9或两张Q，则可押注对子(Pair)。
                </p>
              </section>
              <section>
                <h4>发牌及博牌：</h4>
                <p>

                  百家乐一般会用上8副牌。经洗牌后，牌会放在发派箱內。庄、闲家双方每局均会收到最少两张牌，但最多亦不会超过3张。第1及第3张牌发给「闲家」，第2及第4张牌发给「庄家」。能否博牌，就要根据个別的牌例而定。
                </p>
              </section>
              <section>
                <h4>点算方法：</h4>
                <p>

                  百家乐游戏中，Ace牌被视为1点，由2至9的点数扑克牌则依照其显示的点数计算，而10、J、Q及K牌则被视为0点(某些娱乐场或会以10点计算)。当全部扑克的点数总和多于9时，则只会计算总数中的个位数字。例如：一张8和一张7的牌点大小应为5点(8 + 7 = 15)。由于只计算扑克的个位数值，因此百家乐游戏中的最大点数为9点(如一张5和一个 4的点数和是9），最少则是0点，而这又称Baccarat(如一张10和一张 Q相配，即10 + 10 = 20，牌面的总和只能视0计算)
                </p>
              </section>
              <table class="table table-bordered text-center">
                <thead>
                  <tr>
                    <th colspan="2">百家乐博牌规则 </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <td class="gray">闲两牌合计点数(闲家) </td>
                    <td class="gray">庒两牌合计点数(庒家) </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0 必须博牌  </td>
                    <td>0 必须博牌 </td>
                  </tr>
                  <tr>
                    <td>1 必须博牌  </td>
                    <td>1 必须博牌   </td>
                  </tr>
                  <tr>
                    <td>2 必须博牌 </td>
                    <td>2 必须博牌 </td>
                  </tr>
                  <tr>
                    <td>3 必须博牌  </td>
                    <td>3 若闲博得8毋须博牌 </td>
                  </tr>
                  <tr>
                    <td>4 必须博牌  </td>
                    <td>4 若闲博得1、8、9、10毋须博牌 </td>
                  </tr>
                  <tr>
                    <td>5 必须博牌  </td>
                    <td>5 若闲博得1、2、3、8、9、10毋须博牌  </td>
                  </tr>
                  <tr>
                    <td>6 必须停牌 </td>
                    <td>6 若闲博得6、7必须博牌  </td>
                  </tr>
                  <tr>
                    <td>7 必须停牌  </td>
                    <td>7 不得博牌  </td>
                  </tr>
                  <tr>
                    <td>8 例牌，即定胜负 </td>
                    <td>8 例牌，即定胜负  </td>
                  </tr>
                  <tr>
                    <td>9 例牌，即定胜负</td>
                    <td>9 例牌，即定胜负             </td>
                  </tr>
                </tbody>
              </table>
              <table class="table table-bordered text-center">
                <thead>
                  <tr>
                    <th colspan="2">赔率 </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th colspan="2" class="gray">庄闲任何一方两牌合计8、9点为例牌，对方不须博牌，即定胜负。庄闲两方各得6、7点，即和局。 </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>选择押庄贏 1赔0.95，抽水5%</td>
                  </tr>
                  <tr>
                    <td>选择押闲贏 1赔1，免抽水  </td>
                  </tr>
                  <tr>
                    <td>选择押和局 1赔8，免抽水   </td>
                  </tr>
                  <tr>
                    <td>选择押庄对 1赔11，免抽水   </td>
                  </tr>
                  <tr>
                    <td>选择押闲对 1赔11，免抽水                   </td>
                  </tr>
                </tbody>
              </table>
            </article>`},
        {name:"轮盘",introduction:"轮盘的起源众说纷紜，其中较可信的是17世纪时，法国有一位名为布莱士．帕斯卡的着名数学家，他在研究永动机原理期间...",contentString:`<article>
                    <section>
                        <h4>起源：</h4>
                        <p>

                            轮盘的起源众说纷紜，其中较可信的是17世纪时，法国有一位名为布莱士．帕斯卡的着名数学家，他在研究永动机原理期间，得到启发，设计出轮盘这种受全球人士欢迎的游戏来。在1842年，法国人白兰斯在原初的轮盘上加上0号，用以增加庄家的优势。及后传往美国时，人们又在轮盘加上00号(早期以「鹰」图代替）。至今，世界各地有不少娱乐场所，也为顾客提供精采刺激的轮盘游戏。
                        </p>
                    </section>
                    <section>
                        <h4>游戏步骤：</h4>
                        <ul>
                            <li>局开始后，玩家在限定时间內下注，並把筹码押在桌面不同的方格內或其边界上。</li>
                            <li>倒数结束后，立刻停止接受下注。接着，荷官会拋出滚球。</li>
                            <li>最后，荷官即时输入结果，而玩家则可于显示画面作即时收看。</li>
                        </ul>
                    </section>
                    <section>
                        <h4>投注方式：</h4>
                        <ul>
                            <li>单号：可投注由0至36內的任何一个数字。下注时，请将筹码放在相关的数字格上。</li>
                            <li>双号：可投注两个号码。下注时，把筹码放在数字之间的格线上(如5各6、20和23)。此外，或可以投注于0, 1或0, 2或0, 3的交接区上。</li>
                            <li>三号：可投注三个号码。下注时，把筹码押在轮盘桌上有三个数字的顶行边线內(如7、8、9)，或可投注于0、1、2或0、2、3的交接区內。</li>
                            <li>四号：可投注4个号码。下注时，把筹码放到四个数字格的相连区域內，以投注4个不同数字(如19、20、23和24)。此外，亦可将筹码放到0和1交线的左侧来押注数字0, 1, 2 和3。</li>
                            <li>六号：可投注六个号码。下注时，将筹码放到两行相交的最顶交点处，玩家可以投注两个三号，也就是两行的六个数字。(如28、29、30及31、32、33便组成一组)。</li>
                            <li>列注：轮盘玩戏桌每列数字底部也有「2 to 1」的字样方框，总数为3个。要留意，这个投注项目不包括0。(如：3、4、9、10、15、16、21、22、27、28、33、34)。</li>
                            <li>组注：可将筹码下到印有「1st 12」、「2nd 12」或「3rd 12」字样的投注区內，以同一时间下注12个数字。(分別为1-12、13-24及25-36)。</li>
                            <li>红/黑：投注中彩号码将分为红色或黑色的，共投注18个数字。</li>
                            <li>双/单：投注中彩号码将为单数或双数，共投注18个数字。</li>
                            <li>大/小：投注中彩号码将以小(1-18)或大(19-36)来区分，共投注18个数字。</li>
                        </ul>
                        <p>*注意：投注项目若为红黑、单双、大小，遇0庄家通吃。</p>
                    </section>
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th colspan="2">各项投注类型之赔率</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>单号 </td>
                                <td>1赔35 </td>
                            </tr>
                            <tr>
                                <td>双号  </td>
                                <td>1赔17  </td>
                            </tr>
                            <tr>
                                <td>三号 </td>
                                <td>1赔11  </td>
                            </tr>
                            <tr>
                                <td>四号  </td>
                                <td>1赔8  </td>
                            </tr>
                            <tr>
                                <td>六号  </td>
                                <td>1赔5  </td>
                            </tr>
                            <tr>
                                <td>列注 </td>
                                <td>1赔2  </td>
                            </tr>
                            <tr>
                                <td>组注  </td>
                                <td>1赔2  </td>
                            </tr>
                            <tr>
                                <td>红/黑 </td>
                                <td>1赔1  </td>
                            </tr>
                            <tr>
                                <td>双/单  </td>
                                <td>1赔1  </td>
                            </tr>
                            <tr>
                                <td>大/小  </td>
                                <td>1赔1  </td>
                            </tr>
                        </tbody>
                    </table>
                </article>`},
        {name:"龙虎",introduction:"龙虎游戏非常简单，荷官只派两门牌，即龙及虎。每门各派一只牌，双方斗大，最大为K，最小为A。玩家可投注龙、虎、和三门...",contentString:`<article>
                    <section>
                        <h4>玩法及赔率：</h4>
                        <p>
                            龙虎游戏非常简单，荷官只派两门牌，即龙及虎。每门各派一只牌，双方斗大，最大为K，最小为A。玩家可投注龙、虎和三门，如买中龙或虎，1赔1，两门的牌相同即和，买和赔率为1赔8。如开和，投注龙或虎两门，各输一半。
                        </p>
                    </section>
                </article>`},
        {name:"斗牛",introduction:"玩家可押注「庄家」、「闲家」、「庄两对」、「庄3条」、「闲两对」、「闲3条」多个区域...",contentString:`<article>
                    <section>
                        <p>

                            玩家可押注「庄家」、「闲家」、「庄两对」、「庄3条」、「闲两对」、「闲3条」多个区域。游戏开始后，庄闲家各发牌5张。庄家和闲家从中抽出总和为10的倍数(即10、20、30)之3张牌置于下方，最后剩下的2张牌则置于上方。如下方牌点数总和为10的倍数(即「有牛」)，则可进而以上方2张牌之点数总和进行比对。如下方牌的总和未能为10之倍数(即「无牛」)，就以5张牌中点数最大者进行比对。
                        </p>
                    </section>
                    <section>
                        <h4>牌面点数：</h4>
                        <ul>
                            <li>「斗牛」游戏中，A计为1点，2-9牌则以牌面点数计算，而10、J、Q、K牌，皆算为10点。</li>
                            <li>如押注「两对」或「3条」，遇开4条者，则算两者皆胜。</li>
                        </ul>
                    </section>
                    <section>
                        <h4>牌型类別：</h4>
                        <p>牛牛＞牛9 - 牛1&gt;无牛</p>
                        <p>
                            牛牛：<br>
                            若下方3张牌的点数总和为10的倍数(即10、20、30)，进而上方两张牌的点数总和为10的倍数，此类组合即称为「牛牛」。<br>
                            例子：下方3张牌点数为K、8、2 (10倍数)，上方2张牌点数为10、Q(10的倍数)，此牌型称为「牛牛」。
                        </p>
                        <p>
                            牛1 - 牛9：<br>
                            若下方3张牌的点数总和为10的倍数(即10、20、30)，即可将上面两张牌点数的总和，与对家进行比对。(若相加后点数大于10，就以其中的个位数字计算)点数分为1~9点。若计算后，个位数字为1，即称为「牛1」，个位数字为2，即称为「牛2」。如此类推，当中又以「牛9」为最大。<br>
                            例子：下方3张牌点数为Q、4、6(10倍数)，上方两张牌点数为10、2，此牌型称为「牛2」。
                        </p>
                        <p>
                            无牛：<br>
                            若玩家下方3张牌面无法形成10倍数之组合，便不能以上方两张牌点数的总和进行比对，这种牌型称为「无牛」。<br>
                            例子：整副牌为A、A、2、2、3，由于下方3张牌无法形成10倍数之组合，所以此牌型称为「无牛」。
                            如双方牌型一样，则以5张牌中最大者作比对。举例，庄家牌为K、Q、7、2、A，闲家牌为Q、J、10、6、4，此局算「庄」胜。如若双方牌中最大者相同，则以第二最大者比对；如若相同，则以第三最大者作比对，如此类推，直到分出胜负为止。如庄闲双方5张牌点数均相同，则作「和局」。此规则，亦适用于「牛一」~「牛九」等多种牌型。
                        </p>
                    </section>
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th colspan="2">赔率一览</th>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <th colspan="2" class="gray">胜方：</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>组合</td>
                                <td>赔率</td>
                            </tr>
                            <tr>
                                <td>无牛 ～ 牛6</td>
                                <td>1 x 0.95   </td>
                            </tr>
                            <tr>
                                <td>牛7</td>
                                <td>1 x 0.90</td>
                            </tr>
                            <tr>
                                <td>牛8</td>
                                <td>1 x 0.90</td>
                            </tr>
                            <tr>
                                <td>牛9</td>
                                <td>1 x 0.90</td>
                            </tr>
                            <tr>
                                <td>牛牛</td>
                                <td>1 x 2.85</td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th colspan="2" class="gray">负方：</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>组合</td>
                                <td>赔率</td>
                            </tr>
                            <tr>
                                <td>无牛 ～ 牛6</td>
                                <td>1 x 1 </td>
                            </tr>
                            <tr>
                                <td>牛7</td>
                                <td>1 x 2</td>
                            </tr>
                            <tr>
                                <td>牛8</td>
                                <td>1 x 2</td>
                            </tr>
                            <tr>
                                <td>牛9</td>
                                <td>1 x 2</td>
                            </tr>
                            <tr>
                                <td>牛牛</td>
                                <td>1 x 3</td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th colspan="2" class="gray">下注庄闲：</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>牌型</td>
                                <td>赔率</td>
                            </tr>
                            <tr>
                                <td>庄两对</td>
                                <td>1 x 10</td>
                            </tr>
                            <tr>
                                <td>庄三条</td>
                                <td>1 x 13</td>
                            </tr>
                            <tr>
                                <td>闲两对</td>
                                <td>1 x 10</td>
                            </tr>
                            <tr>
                                <td>闲三条</td>
                                <td>1 x 13</td>
                            </tr>
                        </tbody>
                    </table>
                </article>`},
        {name:"骰宝盅",introduction:"骰宝，乃中国一种古老的骰子游戏。直至今日，骰宝的玩法基本上没有很大的改变。首先，玩家押注三颗在骰盅內转动的骰子...",contentString:`<article>
                    <section>
                        <h4>起源：</h4>
                        <p>

                            骰宝，乃中国一种古老的骰子游戏。直至今日，骰宝的玩法基本上没有很大的改变。首先，玩家押注三颗在骰盅內转动的骰子，但同时亦可押注桌面上一个或多个数字。一般来说，游戏桌通常分割为几个押注「区」，每区皆代表着不同类型的骰子结果或组合。下注完毕，庄家摇晃盅內的骰子，即根据结果派彩。由于最常投注为骰子点数的大小(总点数为4至10称作小，11至17为大，围骰除外)，故亦常被称为「买大小」。
                        </p>
                    </section>
                    <section>
                        <h4>玩法：</h4>
                        <ul>
                            <li>「小」：三粒骰子之点数总和由4点至10点。</li>
                            <li>「大」：三粒骰子之点数总和由11点至17点。</li>
                            <li>「三军」：任何一粒骰子出现选定之平面点数。</li>
                            <li>「围骰」：三粒骰子平面与选定点数相同。</li>
                            <li>「全骰」：在1点至6点內，三粒骰子之点数相同。</li>
                            <li>

                                「点数」：由4点至17点，三粒骰子之点数总和。
                            </li>
                            <li>「长牌」：其中两粒骰子之点数。</li>
                            <li>「短牌」：选定两粒骰子之点数。</li>
                        </ul>
                    </section>
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th colspan="2">赔率</th>
                            </tr>
                        </thead>
                        <tbody class="venus-6">
                            <tr>
                                <td>「小」</td>
                                <td>1赔1</td>
                            </tr>
                            <tr>
                                <td>「大」</td>
                                <td>1赔1</td>
                            </tr>
                            <tr>
                                <td>「三军」</td>
                                <td>1 投中一粒骰子平面点数为1赔1，两骰相同为1赔2，三骰相同为1赔3</td>
                            </tr>
                            <tr>
                                <td>「围骰」</td>
                                <td>1赔150</td>
                            </tr>
                            <tr>
                                <td>「全骰」  </td>
                                <td>1赔24</td>
                            </tr>
                            <tr>
                                <td>「点数」 </td>
                                <td>4点及17点，1赔50；5点及16点，1赔18；6点及15点，1赔14；7点及14点，1赔12；8点及13点，1赔8；9点、10点、11点及12点，1赔6。</td>
                            </tr>
                            <tr>
                                <td>「长牌」</td>
                                <td>1赔5</td>
                            </tr>
                            <tr>
                                <td>「短牌」</td>
                                <td>1赔8</td>
                            </tr>
                        </tbody>
                    </table>
                    <section>
                        <h4>应注意事项：</h4>
                        <ul>
                            <li>若三粒骰子平面点数相同，通吃「大」、「小」、「单」、「双」各注。</li>
                            <li>有骰子相叠或斜靠不平时，荷官随即再拍打3次，进行此局，所以投注之注单均为有效。遇到上述情况时，玩家不得取消下注。</li>
                        </ul>
                    </section>
                </article>`},
        {name:"三公对对碰",introduction:"三公乃中国的一种传统消闲娱乐。现代的三公游戏，主要是闲家与庄家以扑克对阵，获得比对方更大点数者为胜...",contentString:`<article>
                    <section>
                        <h4>简介：</h4>
                        <p>

                            三公乃中国的一种传统消闲娱乐。现代的三公游戏，主要是闲家与庄家以扑克对阵，获得比对方更大点数者为胜。 基本上，J、Q、K统称「公牌」，算为零点，其他则根据牌面的点数计算。这项游戏最小的点数为0，最大的点数为9，如庄闲的点数相同，则以持有较多公牌者为胜。
                        </p>
                    </section>
                    <section>
                        <h4>玩法：</h4>
                        <p>

                            三公对对碰为创新的三公游戏，目的是增加其公平性。首先，玩家选择一门为庄，然后再投注余下的任何一门或多门与庄斗大。游戏中，荷官派发6门牌，每门各派牌3只。三公对对碰的牌例与普通三公的牌例相同。三公为最大，其后以三牌合计最近9点者为胜。如点数相同，则以多公者为胜方。
                        </p>
                    </section>
                </article>`},
        {name:"麻雀排九",introduction:"麻雀排九是由麻雀演变出来的，但玩法较牌九简单，反而与三公更相似。游戏共分7门，每门有两只牌，以点数大为之胜方...",contentString:`<article>
                    <section>
                        <h4>简介：</h4>
                        <p>

                            麻雀排九是由麻雀演变出来的，但玩法较牌九简单，反而与三公更相似。游戏共分7门，每门有两只牌，以点数大为之胜方。
                        </p>
                    </section>
                    <section>
                        雀九玩法：
                    </section>
                    <section>
                        1.雀九共有二十只麻雀牌，分别是白板、九筒、八筒、七筒、六筒、五筒、四筒、三筒、二筒及一筒各两只。
                    </section>
                    <section>
                        2.雀九派七门牌，包括六门闲及一门庄，每门两只牌。玩家可下注任何一门与庄家斗大。
                    </section>
                    <section>
                        3.雀九牌例如下：玩家下注六门与庄家斗大，以对子为最大（即一对相同的牌），在对子中以一对白板为最大，九筒次之，如此类推，一筒为最小。如无对子，则计算两只牌的点数总和，以九点为最大，十点为最小，白板作零点计。则其中一只牌的点数大为胜方。如白板加九筒为点数中最大，四筒加六筒为最小。
                    </section>
                    <section>
                        4.若庄与闲同牌，算庄胜。
                    </section>
                    <section>
                        <h4>赔率一览：</h4>
                    </section>
                    <section>
                        <div>闲门1 1:0.95</div>
                        <div>闲门2 1:0.95</div>
                        <div>闲门3 1:0.95</div>
                        <div>闲门4 1:0.95</div>
                        <div>闲门5 1:0.95</div>
                        <div>闲门6 1:0.95</div>
                    </section>
                </article>`},
    ],
    AB:[//木星馆
        {name:"百家乐",introduction:"长期以来，百家乐是亚洲、欧洲和拉丁美洲最受欢迎的游戏之一，玩法简单，却刺激紧张! 百家乐中将发两份牌<<庄家>> 和<<闲家>>，总数得9点...",contentString:`<article>
                    <section>
                        <p>

                            长期以来，百家乐是亚洲、欧洲和拉丁美洲最受欢迎的游戏之一，玩法简单，却刺激紧张!
                        </p>
                        <p>

                            百家乐中将发两份牌&lt;&lt;庄家&gt;&gt; 和&lt;&lt;闲家&gt;&gt;，总数得9点或最接近9 点的一家胜出。
                        </p><br>
                    </section>
                    <section>
                        <h4><b>操作及下注指南:</b></h4>
                        <p>1.	点击下注的筹码，再点击桌上下注任何一块( 闲家、庄家或平局)。</p>
                        <p>2.	闲家和庄家将获发两张牌，加起来等于10作0点，总和超过9，则只算总数中的个位。</p>
                        <p>3.	任何一家拿到9点（天生赢家），牌局就算结束，不再补牌。</p>
                        <p>4.	派出两张牌後，如果任何一手牌的头两张牌的牌面为0至7，将依照博牌规则多发一张牌，不可以任选补牌。</p>
                        <p>5.	没有任何一手牌获得超过三张牌。</p><br>
                    </section>
                    <section>
                        <h4><b>游戏玩法:</b></h4>
                        <p>

                            本游戏采用8副牌（每副牌52张）来进行，游戏牌数合计416张。
                        </p>
                        <p>

                            “闲家”“庄家”各先派两张牌，以“闲家”先发，如第一轮未分出胜负需再按“牌例”发第二轮的牌，最多每方3张牌，谁最接近9点即为胜方，而相同点数即和局。
                        </p><br>
                    </section>
                    <section>
                        <h4><b>牌靴管理:</b></h4>
                        <p>

                            当更换牌靴的时候，现场荷官需要对新的牌靴进行洗牌。洗完牌之后， pitboss会对的洗牌结果进行确认，同时将黑色卡片随机插入到洗完的牌上。
                            当发牌遇到黑色卡片时，当前局即为最后一局。荷官应该要继续派完最后一局，之后再申请更换牌靴。
                            剩下的牌将被弃用。在新开始一靴牌时，荷官将从牌靴中翻开第一张牌，根据所翻牌的点数，来决定需要销毁多少牌，除了是J,Q和K以10来计算外，其它由牌面点数来决定。
                        </p><br>
                    </section>
                    <section>
                        <h4><b>游戏规则:</b></h4>
                        <h4>点数计算：</h4>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td><b>牌面</b></td>
                                    <td><b>点数</b></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2 至 9</td>
                                    <td>根据其数值显示的点数</td>
                                </tr>
                                <tr>
                                    <td>Ace</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>K或Q或J或10</td>
                                    <td>0</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <p>*当任何一家头两张牌的点数总和为8或9，就称为(天生赢家)。</p>
                    <p>*派出两张牌後，如果需要补牌，将依照博牌规则向需要补牌方多发一张牌</p>
                    <section>
                        <h4>例子:</h4>
                        <p>4 + 2 + 6 = 2</p>
                        <p>5 + 6 + 8 = 9</p>
                        <p>10 + 10 + 10 = 0</p><br>
                    </section>
                    <section>
                        <p>博牌规则：</p>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td><b>闲两牌合计点数</b></td>
                                    <td><b>(闲家)</b></td>
                                    <td><b>庄两牌合计点数</b></td>
                                    <td><b>(庄家)</b></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>0</td>
                                    <td>必须博牌</td>
                                    <td>0</td>
                                    <td>必须博牌</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>必须博牌</td>
                                    <td>1</td>
                                    <td>必须博牌</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>必须博牌</td>
                                    <td>2</td>
                                    <td>必须博牌</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>必须博牌</td>
                                    <td>3</td>
                                    <td>若闲家博得第三张牌是8点，庄家不得博牌</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>必须博牌</td>
                                    <td>4</td>
                                    <td>若闲家博得第三张牌是0，1，8，9点， 庄家不得博牌</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>必须博牌</td>
                                    <td>5</td>
                                    <td>若闲家博得第三张牌是0，1，2，3，8，9点， 庄家不得博牌</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>不得博牌</td>
                                    <td>6</td>
                                    <td>若闲家博得第三张牌是6 或 7点，庄家必须博牌</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>不得博牌</td>
                                    <td>7</td>
                                    <td>不得博牌</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>例牌，即定胜负</td>
                                    <td>8</td>
                                    <td>例牌，即定胜负</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>例牌，即定胜负</td>
                                    <td>9</td>
                                    <td>例牌，即定胜负</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>*庄闲任何一方两牌合计8、9点为例牌，对方不须博牌，即定胜负。庄闲两方头两张牌各得6或7点，即和局。</p><br>
                    </section>
                    <section>
                        <p>百家乐派彩赔率：</p>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td><b>投注项目</b></td>
                                    <td><b>赔率</b></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>闲家</td>
                                    <td>1 赔 1 (开和局时退回下注金额)</td>
                                </tr>
                                <tr>
                                    <td>庄家</td>
                                    <td>1 赔 0.95 (开和局时退回下注金额)</td>
                                </tr>
                                <tr>
                                    <td>和局</td>
                                    <td>1 赔8</td>
                                </tr>
                                <tr>
                                    <td>闲对子</td>
                                    <td>1 赔11</td>
                                </tr>
                                <tr>
                                    <td>庄对子</td>
                                    <td>1 赔11</td>
                                </tr>
                                <tr>
                                    <td>大</td>
                                    <td>1 赔0.5</td>
                                </tr>
                                <tr>
                                    <td>小</td>
                                    <td>1 赔1.5</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    
                </article>`},
        {name:"VIP百家乐",introduction:"VIP百家乐的游戏逻辑和下注类型与普通百家乐是完全一致的。",contentString:`<article>
                    <section>
                        <p>

                            VIP百家乐的游戏逻辑和下注类型与普通百家乐是完全一致的。
                        </p><br>
                    </section>
                    <section>
                        <h4><b>操作及下注指南:</b></h4>
                        <p>1.	点击下注的筹码，再点击桌上下注任何一块( 闲家、庄家或平局)。</p>
                        <p>2.	闲家和庄家将获发两张牌，加起来等于10作0点，总和超过9，则只算总数中的个位。</p>
                        <p>3.	任何一家拿到9点（天生赢家），牌局就算结束，不再补牌。</p>
                        <p>4.	派出两张牌後，如果任何一手牌的头两张牌的牌面为0至7，将依照博牌规则多发一张牌，不可以任选补牌。</p>
                        <p>5.	没有任何一手牌获得超过三张牌。</p>
                    </section><br>
                    <section>
                        <h4>VIP百家乐特殊规则：</h4>
                        <table class="table table-bordered text-center">
                            <tbody>
                                <tr>
                                    <td>开牌控制</td>
                                    <td>当您使用“包桌”模式进入游戏，下注成功后，在60秒内您可以随意开牌，但超过60秒系统自动开牌。</td>
                                </tr>
                                <tr>
                                    <td>咪牔控制</td>
                                    <td>当您使用“包桌”模式进入游戏，下注闲或庄成功后，您可对闲家牌或庄家牌进行咪牔控制。</td>
                                </tr>
                                <tr>
                                    <td>飞牌控制</td>
                                    <td>当您使用“包桌”模式进入游戏，当局不想下注，您可选择飞牌，现场荷官将直接开牌。但您不能连续飞牌超过5次。</td>
                                </tr>
                                <tr>
                                    <td>更换荷官</td>
                                    <td>当您使用“包桌”模式进入游戏，您可申请更换荷官，现场pitboss会安排更换荷官，但当前荷官会继续进行直到新荷官到来。</td>
                                </tr>
                                <tr>
                                    <td>更换牌靴</td>
                                    <td>当您使用“包桌”模式进入游戏，并且当前牌靴已开超过30局，您可申请更换牌靴。现场荷官收到请求后将在5分钟内更换牌靴。</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </article>`},
        {name:"竞咪百家乐",introduction:"竞咪百家乐的游戏逻辑和下注类型与普通百家乐是完全一致的。当您以“竞咪下注”模式进入游戏有机会获得咪牌权。",contentString:`<article>
                    <section>
                        <p>

                            竞咪百家乐的游戏逻辑和下注类型与普通百家乐是完全一致的。
                        </p>
                    </section>
                    <section>
                        <h4>当您以“竞咪下注”模式进入游戏有机会获得咪牌权。规则如下：</h4>
                        <p>a.当您下庄的金额高于其他人时，获得咪庄牌权。</p>
                        <p>b.当您下闲的金额高于其他人时，获得咪闲牌权。</p>
                        <p>c.如果相同金额，先下注成功的人获得咪牌权。</p><br>
                    </section>
                    <section>
                        <h4><b>派彩赔率：</b></h4>
                        <p>
                            本游戏为玩家提供百家乐玩法和免佣百家乐玩法。
                            这两种玩法的博牌规则和投注种类一致，但投注庄的派彩方式有区别。
                            其投注种类与派彩分别如下∶
                        </p><br>
                        
                    </section>
                    <section>
                        <h4><b>免佣百家乐派彩赔率:</b></h4>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td><b>投注项目</b></td>
                                    <td><b>赔率</b></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>闲家</td>
                                    <td>1 赔 1 (开和局时退回下注金额)</td>
                                </tr>
                                <tr>
                                    <td>庄家</td>
                                    <td>1 赔 1 (如庄以6点取胜，则赔一半；开和局时退回下注金额)</td>
                                </tr>
                                <tr>
                                    <td>和局</td>
                                    <td>1 赔 8</td>
                                </tr>
                                <tr>
                                    <td>闲对子</td>
                                    <td>1 赔 11</td>
                                </tr>
                                <tr>
                                    <td>庄对子</td>
                                    <td>1 赔 11</td>
                                </tr>
                                <tr>
                                    <td>大</td>
                                    <td>1 赔 0.5</td>
                                </tr>
                                <tr>
                                    <td>小</td>
                                    <td>1 赔 1.5</td>
                                </tr>
                            </tbody>
                        </table><br>
                    </section>
                    <section>
                        <h4><b>大小、庄/闲对子</b></h4>
                        <p>
                            1.大小∶指根据当局所开之牌张数的总和为依据，4张牌为小，5张牌或6张牌为大。
                            游戏中，若庄家及闲家各只发两张牌，合共4张牌，即押注「小」者为胜。
                            相反，若庄、闲任一方有博牌，令总牌数为5或6张，即押注「大」者为胜。
                        </p>
                        <p>
                            2.庄/闲对子 ：指根据当局所开之牌的庄/闲前两张牌的牌面（数字或字母，不计花式）为依据，牌面相同为对子。
                            游戏中，庄家前两张牌的牌面相同，为庄对子，即押注「庄对」者为胜。
                            闲家前两张牌牌面相同，为闲对子，即押注「闲对」者为胜。
                        </p><br>
                    </section>
                    <section>
                        <h4><b>请注意</b></h4>
                        <p>
                            1. 当每一靴牌进入第31局或以後，玩家将不得投注大小。<br>
                            2. 桌台限红是本游戏桌台主要玩法的最小、最大玩法限红。<br>
                            3. 荷官发牌时，偶有系统无法判读状况时，此时荷官将重新扫描，直到系统能够完整判读(如遇故障因素将注销所有相关注单/派彩)。<br>
                            4. 如遇结算错误，按照当期视频结果重新结算
                        </p>
                    </section>
                </article>`},
        {name:"龙虎",introduction:"一个以牌面点数大小来决定输赢的博彩游戏，简单易学，让玩家完全体验赌场的趣味!",contentString:`<article>
                    <section>
                        <p>一个以牌面点数大小来决定输赢的博彩游戏，简单易学，让玩家完全体验赌场的趣味!</p>
                        <h4><b>如何胜出:</b></h4>
                        <p>正确预计两家&lt;&lt;龙&gt;&gt; 和&lt;&lt;虎&gt;&gt; 的点数比较大。</p><br>
                    </section>
                    <section>
                        <h4><b>操作及下注指南:</b></h4>
                        <p>1.点击下注的筹码，再点击桌上下注任何一块 ( 龙、虎或平局 )。</p>
                        <p>2.荷官只派两门牌，每门各派一只牌，即龙与虎，双方斗大。</p><br>
                    </section>
                    <section>
                        <h4><b>游戏规则:</b></h4>
                        <p>1.本游戏戏采用6副牌（每副牌52张）来进行，游戏牌数合计312张</p>
                        <p>2.牌面的大小不比花色，只比点数，K为最大牌，A为最小，其中从2到10牌面就为对应点数，并且10&lt;J&lt;Q&lt;K。相同点数即为“和”。</p>
                        <p>3.荷官先派发第一张牌于龙的位置，而第二张牌派发到虎的位置，牌面全是向上的，点数较大的胜出。</p><br>
                    </section>
                    <section>
                        <h4><b>牌靴管理:</b></h4>
                        <p>
                            当更换牌靴的时候，现场荷官需要对新的牌靴进行洗牌。
                            洗完牌之后， pitboss会对的洗牌结果进行确认，同时将黑色卡片随机插入到洗完的牌上。
                            当发牌遇到黑色卡片时，当前局即为最后一局。荷官应该要继续派完最后一局，之后再申请更换牌靴。
                            剩下的牌将被弃用。在新开始一靴牌时，荷官将从牌靴中翻开第一张牌，根据所翻牌的点数，
                            来决定需要销毁多少牌，除了是J,Q和K以10来计算外，其它由牌面点数来决定。 
                            每局游戏中，在给龙和虎派牌前荷官都会销毁一张牌。
                        </p><br>
                    </section>
                    <section>
                        <h4><b>派彩赔率:</b></h4>
                        <br><table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td><b>投注项目</b></td>
                                    <td><b>赔率</b></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>龙</td>
                                    <td>1 赔 1 (开和局时，退回一半下注金额)</td>
                                </tr>
                                <tr>
                                    <td>虎</td>
                                    <td>1 赔 1 (开和局时，退回一半下注金额)</td>
                                </tr>
                                <tr>
                                    <td>和局</td>
                                    <td>1 赔 8</td>
                                </tr>
                            </tbody>
                        </table><br>
                    </section>
                    <section>
                        <h4><b>请注意：</b></h4>
                        <p>
                            荷官发牌时，偶有系统无法判读状况时，此时荷官将重新扫描，
                            直到系统能够完整判读(如遇故障因素将注销所有相关注单/派彩)。
                        </p>
                        <p>
                            如遇结算错误，按照当期视频结果重新结算。
                        </p><br>
                    </section>
                </article>`},
        {name:"骰宝",introduction:"骰宝也叫赌大小，以猜测骰子开出的点数或是点数总合的博彩。多元化的投注种类及吸引的赔率，极之受玩家欢迎.",contentString:`<article>
                    <section>
                        <p>
                            骰宝也叫赌大小，以猜测骰子开出的点数或是点数总合的博彩。多元化的投注种类及吸引的赔率，极之受玩家欢迎。
                        </p><br>
                    </section>
                    <section>
                        <h4><b>如何胜出:</b></h4>
                        <p>玩家的押注的内容与三颗骰子停留开出的点数相同，便赢得彩金。</p><br>
                    </section>
                    <section>
                        <h4><b>操作及下注指南:</b></h4>
                        <p>1.	开始新局后即开始下注倒数计时，你可以依照你的预测，选择筹码下注 。</p>
                        <p>2.	倒数时间结束后停止下注，再由荷官按钮经机械自动摇骰。</p>
                        <p>3.	待骰盅停止后，视讯显示三颗骰子停留开出的点数，由荷官输入三点数，同时画面亮起灯光，可清楚看到胜出注码和赔率；是否与玩家押注的内容相同，来判定输赢。</p>
                        <p>4.	若骰子靠在骰盎边缘上而造成有斜骰或叠骰情形发生，无法判断点数时，荷官将重摇骰，直到能够完整判读。</p>
                    </section><br>
                    <section>
                        <h4><b>游戏规则:</b></h4>
                        <p>筹码放在划有不同赌法的方格的赌桌上，你可以下注在任何的方格，但要在下注时限之内押注。</p><br>
                    </section>
                    <section>
                        <h4><b>派彩赔率:</b></h4>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td><b>投注项目</b></td>
                                    <td><b>说明</b></td>
                                    <td><b>赔率</b></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td nowrap="true">大 / 小</td>
                                    <td>
                                        大：总点数 11 至 17<br>
                                        小：总点数为 4 至 10 ( 遇围骰庄家通吃 )
                                    </td>
                                    <td>1 赔 1</td>
                                </tr>
                                <tr>
                                    <td>围骰</td>
                                    <td>投注指定的围骰 ( 如 1 围骰 ) ，必须开出 3 颗所投注的骰子；下注记录中将显示为“围-n”,比如下注围骰1，将表示为“围-1”，以此类推；</td>
                                    <td nowrap="true">1 赔 150</td>
                                </tr>
                                <tr>
                                    <td>全围</td>
                                    <td>3 颗骰子都一样</td>
                                    <td>1 赔 24</td>
                                </tr>
                            </tbody>
                        </table><br>
                    </section>
                    <section>
                        <h4><b>下注在单一个点数:</b></h4>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td><b>投注项目</b></td>
                                    <td><b>说明</b></td>
                                    <td><b>赔率</b></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>单骰</td>
                                    <td>投注每颗骰子 1 至 6 中指定的点数，点数出现 1 次；下注记录中将显示为“单-n”,比如下注单骰1，将表示为“单-1”，以此类推；</td>
                                    <td nowrap="true">1 赔 1</td>
                                </tr>
                                <tr>
                                    <td>对子 ( 出现双骰、长牌 )</td>
                                    <td>投注指定的出现双骰 ( 如双 1 点 ) ，至少开出 2 颗所投注的骰子；下注记录中将显示为“对-n”,比如下注对子1，将表示为“对-1”，以此类推；</td>
                                    <td>1 赔 8</td>
                                </tr>
                                <tr>
                                    <td>牌九式 ( 骨牌、短牌 )</td>
                                    <td>投注 15 种 2 颗骰子可能出现的组合 ( 如 1、2),桌台资料中显示为组合；下注记录中将显示为“结果:(n, m)”,比如下注牌九式（1、2），将表示为“结果:(1, 2)”，以此类推；</td>
                                    <td>1 赔 5</td>
                                </tr>
                            </tbody>
                        </table><br>
                    </section>
                    <section>
                        <h4><b>3颗骰子点数总和:</b></h4>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td><b>投注项目</b></td>
                                    <td><b>说明</b></td>
                                    <td><b>赔率</b></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>4 或17 点</td>
                                    <td>总和为 4 或 17 点；下注记录中将显示为“总和-4”或“总和-17”；</td>
                                    <td nowrap="true">1 赔 50</td>
                                </tr>
                                <tr>
                                    <td>5 或 16 点</td>
                                    <td>总和为 5 或 16 点；下注记录中将显示为“总和-5”或“总和-16”；</td>
                                    <td>1 赔 18</td>
                                </tr>
                                <tr>
                                    <td>6 或 15 点</td>
                                    <td>总和为 6 或 15 点；下注记录中将显示为“总和-6”或“总和-15”；</td>
                                    <td>1 赔 14</td>
                                </tr>
                                <tr>
                                    <td>7 或 14 点</td>
                                    <td>总和为 7 或 14 点；下注记录中将显示为“总和-7”或“总和-14”；</td>
                                    <td>1 赔 12</td>
                                </tr>
                                <tr>
                                    <td>8 或 13 点</td>
                                    <td>总和为 8 或 13 点；下注记录中将显示为“总和-8”或“总和-13”；</td>
                                    <td>1 赔 8</td>
                                </tr>
                                <tr>
                                    <td>9、10、11、或 12 点</td>
                                    <td>总和为 9、10、11 或 12 点；下注记录中将显示为“总和-n”, 比如下注9点，将表示为“总和-9”，以此类推；</td>
                                    <td>1 赔 6</td>
                                </tr>
                            </tbody>
                        </table><br>
                    </section>
                    <section>
                        <h4><b>3颗骰子点数总和:</b></h4>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td><b>投注项目</b></td>
                                    <td><b>说明</b></td>
                                    <td><b>赔率</b></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>单</td>
                                    <td>总点数为 5, 7, 9, 11, 13, 15, 17 点( 遇围骰庄家通吃 )</td>
                                    <td>1 赔 1</td>
                                </tr>
                                <tr>
                                    <td>双</td>
                                    <td>总点数为 5, 7, 9, 11, 13, 15, 17 点( 遇围骰庄家通吃 )</td>
                                    <td>1 赔 1</td>
                                </tr>
                            </tbody>
                        </table><br>
                    </section>
                    <section>
                        <h4><b>请注意：</b></h4>
                        <p>骰子摇动后，偶有稳定后无法判读点数状况时，此时荷官将重摇骰，直到能够完整判读(如遇故障因素将注销所有相关注单/派彩)。</p>
                        <p>如遇结算错误，按照当期视频结果重新结算。</p>
                    </section>
                </article>`},
        {name:"轮盘",introduction:"本游戏是采用欧式单零轮盘，单零轮盘上共有37 个细长沟道。其中一个绿色沟道的数字编号为0，另外36个沟道分别编号为1 至36...",contentString:`<article>
                    <section>
                        <p>
                            本游戏是采用欧式单零轮盘，单零轮盘上共有37 个细长沟道。
                            其中一个绿色沟道的数字编号为0，另外36个沟道分别编号为1 至36，其中从编号1到10、19-28，奇数编号沟道为红色 偶数编号沟道为黑色; 
                            从编号11到18、29到36，奇数编号沟道为黑色，偶数编号沟道为红色。 玩家可以买单一数字或赌桌上的数字组合。
                        </p><br>
                    </section>
                    <section>
                        <h4><b>如何胜出:</b></h4>
                        <p>
                            下注结束后，荷官会把轮盘向一个方向转动，然后把象牙制滚球抛到轮盘的外侧，让滚球在轮盘内转动多周后慢慢停下来，并降落在其中一个细沟内为该局结果。
                        </p><br>
                    </section>
                    <section>
                        <h4><b>操作及下注指南:</b></h4>
                        <p>1.	开始新局后，即开始下注倒数计时，请玩家在桌面不同的方格内或方格的边界上押放筹码。</p>
                        <p>2.	倒数结束后由荷官转动轮盘，并抛出滚球,让滚球沿着轮盘在相反方向转动。</p>
                        <p>3.	当滚球降落在轮盘的其中一个细沟为该局结果，由荷官输入结果数字，同时玩家画面显示结果。</p>
                    </section><br>
                    <section>
                        <h4><b>游戏规则:</b></h4>
                        <p>
                            筹码放在划有不同投注项目的方格的赌桌上，你可以下注在任何的方格，但要在下注时限之内押注。
                        </p><br>
                    </section>
                    <section>
                        <h4><b>投注方式及派彩赔率:</b></h4>
                        <h4>轮盘的投注方式有 12个种类，各项投注类型与派彩赔率如下:</h4>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td><b>投注项目</b></td>
                                    <td><b>说明</b></td>
                                    <td><b>赔率</b></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>直注</td>
                                    <td>1个号码（投注包括 0在内的任意一个数位。下注时将筹码放到那个数位的中心）</td>
                                    <td nowrap="true">1 赔 35</td>
                                </tr>
                                <tr>
                                    <td>分注</td>
                                    <td>2个号码（投注于两个号码之间的格线上 。如2和3）</td>
                                    <td>1 赔 17</td>
                                </tr>
                                <tr>
                                    <td>街注</td>
                                    <td>3个一行的数（投注三个号码。将筹码押在轮盘桌上有三个数位那一行右侧的那条边线上）</td>
                                    <td>1 赔 11</td>
                                </tr>
                                <tr>
                                    <td>三数</td>
                                    <td>0,1,2（投注于 0, 1, 2交接区域）或0,2,3（投注于0, 2, 3的交接区域）</td>
                                    <td>1 赔 11</td>
                                </tr>
                                <tr>
                                    <td>角注</td>
                                    <td>4个数交叉（将筹码放到四个数位方框交差的那个角区）</td>
                                    <td>1 赔 8</td>
                                </tr>
                                <tr>
                                    <td>四数</td>
                                    <td>0,1,2,3（将筹码放到 0和3交线的右侧以下注数位 0, 1, 2 和3）</td>
                                    <td>1 赔 8</td>
                                </tr>
                                <tr>
                                    <td>线注</td>
                                    <td>两行相交的顶部（将筹码下注到两行相交的最顶部的交点处（虚拟桌右侧），6个数字）</td>
                                    <td>1 赔 5</td>
                                </tr>
                                <tr>
                                    <td>列注</td>
                                    <td>每列12个号码（桌上每列数位底部都有带‘第*列 ' 字样的方框，12个号码，不含零）</td>
                                    <td>1 赔 2</td>
                                </tr>
                                <tr>
                                    <td>下注一打</td>
                                    <td>将筹码下到有 ”第一打”，”第二打”和“第三打”字样的赌区以同时下注 12个数位。 (分别为1-12、13-24及25-36)</td>
                                    <td>1 赔 2</td>
                                </tr>
                                <tr>
                                    <td>红色/黑色</td>
                                    <td>投注开奖号码为红色或黑色。若开0则通杀</td>
                                    <td>1 赔 1</td>
                                </tr>
                                <tr>
                                    <td>双数/单数</td>
                                    <td>投注开奖号码为单数或双数。若开0则通杀</td>
                                    <td>1 赔 1</td>
                                </tr>
                                <tr>
                                    <td>大/小</td>
                                    <td>小（1-18）；大（19-36）；若开0则通杀</td>
                                    <td>1 赔 1</td>
                                </tr>
                            </tbody>
                        </table><br>
                    </section>
                    <section>
                        <h4><b>法式下注：</b></h4>
                        <p>
                            法式下注：以椭圆形画出轮盘上的分区（号码、颜色），而后根据玩法不同分隔为4个分区（轮盘下角注、轮上孤注、零旁注上角、轮上零旁），法式下注提供5种投注种类。
                        </p>
                        <p>
                            投注方式：使用筹码点击“法式下注”的椭圆形轮盘对应的玩法，轮盘投注桌上显示每个玩法投注的筹码，点击确定时将所选玩法提交下单。
                        </p>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <td><b>投注种类</b></td>
                                    <td><b>注数</b></td>
                                    <td><b>投注号位</b></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>轮上零旁</td>
                                    <td>4</td>
                                    <td>0/3；12/15；32/35；26</td>
                                </tr>
                                <tr>
                                    <td>零旁注上角</td>
                                    <td>9</td>
                                    <td>
                                        4/7；12/15；18/21；19/22；32/35 ---- 一注<br>
                                        0/2/3 --- 两注<br>
                                        25/26/28/29 ---- 两注
                                    </td>
                                </tr>
                                <tr>
                                    <td>轮上孤注</td>
                                    <td>5</td>
                                    <td>6/9；14/17；17/20；31/34；1</td>
                                </tr>
                                <tr>
                                    <td>轮盘下角注</td>
                                    <td>6</td>
                                    <td>5/8；10/11；13/16；23/24；27/30；33/36</td>
                                </tr>
                                <tr>
                                    <td>相邻投注</td>
                                    <td>5</td>
                                    <td>
                                        投注轮盘上该号码及左邻与右邻各两个号码（一共5个号码）。 <br>
                                        例如：选中18，则投注号码为：9；22；18；29；7
                                    </td>
                                </tr>
                            </tbody>
                        </table><br>
                    </section>
                    <section>
                        <h4><b>请注意：</b></h4>
                        <p>
                            荷官在游戏进行中若把球掷出轮盘外，或轮盘停止运转等因素则该局游戏必将重新进行掷球。如遇故障因素将注销所有相关注单/派彩。
                        </p>
                        <p>
                            如遇结算错误，按照当期视频结果重新结算。
                        </p>
                    </section>
                </article>`},

    ],
    /*下面是我们没有的*/
    GD:["3D百家乐","多台百家乐","多彩百家乐","传统百家乐"],//水星馆
    EA:["超级百家乐","免佣百家乐","对子百家乐","贵宾百家乐","轮盘","国际轮盘","骰宝","多手龙虎游戏"], //火星馆
}
