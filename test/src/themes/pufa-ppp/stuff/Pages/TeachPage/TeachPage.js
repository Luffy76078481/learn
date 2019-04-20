/**
 * Created by b3 on 2017/10/26.
 */

import React, {Component} from 'react';

import { Link, IndexLink } from 'react-router';
import {connect} from 'react-redux';
import './TeachPage.scss';

class TeachPage extends Component {

    constructor (props){
        super(props);

    }
    componentDidMount() {
    }




    render() {
        const options = window.r.props('TeachPage');
        return (
            <div className="teachPage">
                <div id="top" className="content content1">
                    <div className=" center-c menuNav">
                        <ul>
                            <a href="#c1"><li className="a"></li></a>
                            <a href="#c2"><li className="b"></li></a>
                            <a href="#c3"><li className="c"></li></a>
                            <a href="#c4"><li className="d"></li></a>
                            <a href="#c5"><li className="e"></li></a>
                            <a href="#c6"><li className="f"></li></a>
                        </ul>
                    </div>
                </div>
                <div id="c1" className="content content2">
                    <div className="center-c">
                        <div className="arrow"></div>
                        <div className="txt">
                            <h2>1. 体育页面不是北京时间？</h2>
                            <p>万博体育为<span> 美国东部时间 GMT-4</span></p>
                            <p>比北京时间<span>慢12小时。</span></p>
                            <p>所以，请您留意</p>
                            <p>赛事开始时间 + 12小时 = 北京时间</p>

                        </div>
                        <div className="pic">
                            <div className="one">
                                <div className="l">东部时间</div>
                                <div className="r">北京时间</div>
                            </div>
                            <div className="two"></div>
                        </div>
                    </div>
                </div>
                <div id="c2" className="content  content3">
                    <div className="center-c">
                        <div className="arrow"></div>
                        <div className="lbox">
                            <div className="pic3"></div>
                            <div className="txt3">
                                <div className="t">
                                    ”今日“顾名思义就是今天的所有赛事啦
                                    请您留意这是以万博体育时间来列举的。
                                </div>
                                <div className="imgs"></div>
                            </div>
                        </div>
                        <div className="rbox">
                            <div className="rt1">
                                <h2>2. 什么是 滚球 / 今日 / 早盘 ？</h2>
                                <p><span>滚球</span>又叫<span>走地</span>，也就是目前正在进行的赛事啦。</p>
                                <p>这里小小骄傲下：目前万博体育是提供亚洲滚球赛事投注最多的公司哦。</p>
                            </div>
                            <div className="rt2">
                                <p><span>早盘</span>是未来将要开始的赛事，所以如果您要找的赛</p>
                                <p>事不是正在进行的滚球，那就一定在早盘里咯。</p>
                                <div className="rimg"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="c3" className="content content4">
                    <div className="center-c">
                        <div className="arrow"></div>
                        <div className="txt4">
                            <div className="t5">
                                <h2>3. 如何找到我要的赛事？</h2>
                                <p>您可以通过万博体育<span>左边</span>的<span>导航栏</span></p>
                                <p>查找各种项目和盘口，看这里:</p>
                            </div>
                            <div className="img5"></div>
                        </div>
                        <div className="txt5">
                            <div className="tt">如果当前页面没有您需要的赛事可以试试<span>时间排序</span>或<span>联盟排序</span>。</div>
                            <div className="img6"></div>
                        </div>
                        <div className="txt6">
                            <div className="tt">快捷查询今日某场赛事</div>
                            <div className="img7"></div>
                        </div>
                    </div>
                </div>
                <div id="c4" className="content content5">
                    <div className="center-c">
                    <div className="arrow"></div>
                        <h2>4. 什么是1*2和波胆？</h2>
                        <div className="main">
                            <p>1*2即胜平负，又叫独赢盘。祝您猜中结果哦。</p>
                            <div className="img8"></div>
                            <p>波胆就是猜正确的比分，波胆不同，赔率也不同，下一个预测准确的人就可能是你吧？</p>
                            <div className="img9"></div>
                        </div>
                    </div>
                </div>
                <div id="c5" className="content content5 content6">
                    <div className="center-c">
                        <div className="arrow"></div>
                        <h2>5. 如何投注更多的盘口？</h2>
                        <div className="main">
                            <p>万博体育对每个赛事开设有更多的盘口哦，在这里点开</p>
                            <div className="img10"></div>
                            <p>这里可以看到更多选择，应该能满足您的要求！</p>
                            <div className="img11"></div>
                        </div>
                    </div>
                </div>
                <div id="c6" className="content content7">
                    <div className="center-c">
                        <div className="arrow"></div>
                        <h2>6. 如何投注复式过关？</h2>
                        <div className="box1">
                            <div className="box1-t">请您点击左侧导航栏里的<span>混合过关</span>:
                            </div>
                            <div className="box1-p"></div>
                        </div>
                        <div className="box2">
                            <div className="box2-t">
                                选择<span>任意三场</span>或以上赛事后,即可进行
                                <p>复式过关投注，看这里:</p>
                            </div>
                            <div className="box2-p"></div>
                        </div>

                    </div>
                </div>
                <div className="affixNav">
                    <ul>
                        <a href="#c1"><li className="btn1"></li></a>
                        <a href="#c2"><li className="btn2"></li></a>
                        <a href="#c3"><li className="btn3"></li></a>
                        <a href="#c4"><li className="btn4"></li></a>
                        <a href="#c5"><li className="btn5"></li></a>
                        <a href="#c6"><li className="btn6"></li></a>
                        <a href="#top"><li className="btn7"></li></a>
                    </ul>
                </div>

            </div>

        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {

    }
);

export default connect(mapStateToProps, {})(TeachPage);