import React, {Component} from 'react';
import {connect} from 'react-redux';
import './LootoPage.scss'
import {ApiQueryLuckyWinnerAction, ApiQueryLuckyCountAction, GlobePopBox, ApiQueryLuckyDrawAction} from "globalAction";
import {config} from 'globalConfig';

var ulHeight, ulbox, allHeight, inter, clickFlag = false;

class LootoPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showLeft: false,
            showRight: false
        };
    }
    componentDidMount() {
        new ApiQueryLuckyWinnerAction("", 1, 15).fly(resp => {
            if (resp.StatusCode === 0) {
                this.carouselAction(resp);
            }
        });
        document.title = window.config.title;
    }
    componentWillUnmount() {
        clearInterval(inter);
    }
    carouselAction(obj = []) {
        if (obj.List) {
            var sAwardEle = ""
            var awards = ['888', '88', 'IPHONE X', '电子优惠券', '188']
            $.each(obj.List, function (i, award) {
                let userName = award.User.UserName;
                userName = userName.substr(0, 1) + '***' + userName.substr(4, userName.split('').length);
                sAwardEle += '<li><span>恭喜' + userName + '</span><span>抽中' + award.LuckyItem.Prizes + '</span></li>';
                if (parseInt((Math.random() * (10 - 1) + 1) + "") > 8) {
                    var fuckyou = Math.random().toString(36).substr(3);
                    var name = fuckyou.substr(0, 1) + '***' + fuckyou.substr(4, fuckyou.split('').length);
                    var index = parseInt((Math.random() * 5) + "");
                    sAwardEle += '<li><span>恭喜' + name + '</span><span>抽中' + awards[index] + '</span></li>';
                }
            });
            ulHeight = $(".prizelist").height(); //中奖列表实际高度
            ulbox = $(".ulbox").height(); //框的高度
            allHeight = ulHeight + ulbox; //需要滚动的距离
            $(".prizelist").html(sAwardEle);
            let trueElement = $(".ulbox").html();
            $(".ulbox").append(trueElement);
            this.scollAction();
        }
    }
    scollAction() {
        let topPx = $(".ulbox").scrollTop();
        if (inter) {
            clearInterval(inter);
        }
        inter = setInterval(() => {
            let scTop = $(".ulbox").scrollTop(topPx);
            topPx++;
            if (topPx >= allHeight) topPx = 0;
        }, 50);
    }
    mouseHover() {
        clearInterval(inter);
        inter = null;
    }
    mouseLeave() {
        clearInterval(inter);
        inter = null;
        this.scollAction();
    }
    zzAction() {
        if (clickFlag) {
            return
        }else {
            clickFlag = true;
        }
        if (!this.props.user.username || !this.props.user.token) {
            window.$("#reserveDialog_login").modal("show");
            clickFlag = false;
            return false;
        }
        let that = this;
        new ApiQueryLuckyCountAction(this.props.user.username).fly(resp => {
            if (resp.StatusCode === 0) {
                if (resp.Count > 0) {
                    $(".lotto-right-gif").css("z-index", 3)
                    that.startGame();
                } else {
                    new GlobePopBox("您的机会已经用完啦");
                    clickFlag = false;
                }
            } else {
                new GlobePopBox(resp.message);
                clickFlag = false;
            }
        });
    }
    startGame() {
        $(".lotto-right-zz").css("transition", "none");
        $(".lotto-right-zz").css("transform", "rotate(0deg)")
        let that = this;
        new ApiQueryLuckyDrawAction(this.props.user.username).fly(resp => {
            if (resp.StatusCode === 0) {
                if (resp.Winning == true && resp.PrizeGrade == 9) {
                    that.rotateZhuanpan(resp.PrizeGrade, () => {
                        new GlobePopBox('很抱歉，本次未中奖!');
                        $(".lotto-right-gif").css("z-index", 1)
                    });

                } else if (resp.Winning == true) {
                    // let respMsg = isNaN(resp.result.prize) ? resp.result.prize : resp.result.prize + "元";
                    that.rotateZhuanpan(resp.PrizeGrade, () => {
                        new GlobePopBox(resp.Message);
                        $(".lotto-right-gif").css("z-index", 1)
                    })
                }
                if (resp.Winning == false) {
                    that.rotateZhuanpan(resp.PrizeGrade, () => {
                        new GlobePopBox('很抱歉，本次未中奖!');
                        $(".lotto-right-gif").css("z-index", 1)
                    })
                }
            } else {
                new GlobePopBox(resp.Message);
            }
            clickFlag = false;
        });
    }
    rotateZhuanpan(grade, cb) {
        if (grade == 0) {
            grade = 9
        }
        $(".lotto-right-zz").css("transition", "all 4s ease-out");
        let rotateN = Math.floor(3600);
        let rotate = rotateN + (-grade * 36);
        $(".lotto-right-zz").css("transform", "rotate(" + rotate + "deg)")
        setTimeout(function () {
            cb()
        }, 4500);
    }
    showLeftPop(show) {
        this.setState({showLeft: show})
        this.setState({showRight: false})
    }

    showRightPop(show) {
        this.setState({showRight: show})
        this.setState({showLeft: false})
    }
    render() {
        let siteName;
        let qqNum;
        if( window.config.spec == "mgm-vv8" ){
            siteName = '澳门美高梅';
            qqNum = 943427777
        }
        else if( window.config.spec == "vns-uzi" ){
            siteName = '威尼斯人娱乐场';
            qqNum = 499994332
        }
        else{            
            siteName = '本站';
            qqNum = '联系客服'
        }
        return (
            <div className="looto-background">
                <div className="ulbox" onMouseEnter={this.mouseHover.bind(this)}
                     onMouseLeave={this.mouseLeave.bind(this)}>
                    <ul className="prizelist">
                    </ul>
                </div>
                <div className="lotto-right"></div>
                <div className="lotto-right lotto-right-gif"></div>
                <div className="lotto-right-zz" onClick={this.zzAction.bind(this)}>
                    <div className="lotto-right-zz-img"></div>
                </div>
                <div className="zj-botton-left" onClick={this.showLeftPop.bind(this, true)}></div>
                <div className="zj-botton-right" onClick={this.showRightPop.bind(this, true)}></div>
                {/*活动详情*/}
                {!this.state.showLeft ? null :
                    <div className="huodong_detail">
                        <div className="hd_img">
                            <div className="img1"/>
                        </div>
                        <div className="close_img" onClick={this.showLeftPop.bind(this, false)}>
                            <div className="img-xx"/>
                        </div>
                        <div className="text">
                            <div className="wrap_box">                               
                                <p className="wz newtitle">抽奖条件</p>
                                <p className="wz newwz">
                                    活动时间：自美东时间2019年4月10日起<br/>
                                    结束时间：以官网通知时间为准<br/>
                                    活动对象：{window.config.appName}全体有效会员<br/>
                                    开放时间：每天下午18:00~23:00<br/>
                                    <span>① 奖品设置：保时捷跑车、IphoneX、免费筹码—18元、88元、188元、588元、888元、100元手机话费、电子老虎机存送优惠券，更多奖项不定期更新中</span><br/>
                                    {
                                        config.spec.includes('mgm-vv8') ? null :
                                        <span>② 存款金额统计：当日的累计存款金额计算周期采用的是美东时间，即北京时间每天中午12:00:00至次日中午11:59:59</span>
                                    }
                                </p>
                                <table>
                                    <tbody>
                                    <tr className="tit">
                                        <th>当天累计存款金额</th>
                                        <th>抽奖次数</th>
                                        <th>流水限制</th>
                                        <th>活动时间</th>
                                    </tr>
                                    <tr>
                                        <td>500+</td>
                                        <td>1次</td>
                                        <td rowSpan={7}>无需流水<br/>即可提款</td>
                                        <td rowSpan={7}>北京时间<br/>
                                            {
                                                config.spec.includes('mgm-vv8') ? '18:00至23:59' : '18:00至23:00'
                                            } 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2000+</td>
                                        <td>3次</td>
                                    </tr>
                                    <tr>
                                        <td>5000+</td>
                                        <td>5次</td>
                                    </tr>
                                    <tr>
                                        <td>10000+</td>
                                        <td>8次</td>
                                    </tr>
                                    <tr>
                                        <td>50000+</td>
                                        <td>10次</td>
                                    </tr>
                                    <tr>
                                        <td>100000+</td>
                                        <td>15次</td>
                                    </tr>
                                    <tr>
                                        <td>500000+</td>
                                        <td>28次</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="clear"/>
                                <p className="wz newkongxi">1、如果您当日的累计存款金额达到活动条件，即可开始参与，且需在该有效时间内完成转盘旋转次数，逾期未参加视为自动放弃活动资格；</p>
                                <p className="wz">2、在获得“存送优惠券”的会员，在使用优惠券进行存款之前，账户余额必须低于10元，需联系24小时在线客服进行申请且彩金未派发前不可投注，</p>
                                <p className="wz ye4">否则此次存款无效，逾期将失去兑换资格；</p>
                                <p className="wz">3、凡是抽中“免费筹码”的会员无需申请，系统会在30分内自动添加到中奖会员账号上，无需流水即可提款；</p>
                                <p className="wz">4、凡是抽中“100元手机话费”的会员务必在中奖后，2小时内添加官网客服QQ：{qqNum} 申请话费充值，逾期视为自动放弃；</p>
                                <p className="wz">5、凡是抽中实物奖品的会员，奖品不可折现；请务必于中奖后三个工作日内联系我司客服提供快递收货地址、姓名及联系电话，</p>
                                <p className="wz ye4">奖品将在中奖会员提供具体收货地址后十个工作日内寄出，请耐心等待。</p>
                                <p className="wz ye4">如中奖后三个工作日内未联系我司确认收货地址或因个人提供的收件信息不完整、不正确、电话无法联系上导致物品无法寄送快递退回的情况，</p>
                                <p className="wz ye4">均视为自动放弃不再安排寄送，请勿与客服就此理论；</p>
                                <p className="wz">6、此“幸运大赚盘”活动为【{siteName}】系统程序自动运行，中奖的概率完全遵循力学及自然概率，不涉及任何人工操作，抽奖结果以系统判定为准，不得争议；</p>
                                <p className="wz">7、如您忘记会员账号/密码，请您联系7x24小时在线客服协助您取回您的账号信息；</p>
                                <p className="wz">8、参与该优惠，即表示您同意《一般优惠规则与条款》。</p>
                            </div>
                        </div>
                    </div>
                }
                {/*活动细则*/}
                {!this.state.showRight ? null :
                    <div className="huodong_detail2">
                        <div className="hd_img">
                            <div className="img1"/>
                        </div>
                        <div className="close_img" onClick={this.showRightPop.bind(this, false)}>
                            <div className="img-xx"/>
                        </div>
                        <div className="wrap_box">
                            <p className="wz">1、所有优惠以人民币(CNY)为结算金额，以北京时间GMT+8为计时区。</p>
                            <p className="wz">2、{siteName}的所有优惠特为玩家而设，如发现以不诚实方式套取红利或任何威胁.滥用公司优惠等行为，公司保留冻结.取消该团体或个人账户</p>
                            <p className="wz ye4">及账户结余的权利；</p>
                            <p className="wz">3、若会员对活动有争议时，为确保双方利益，杜绝身份盗用行为，{siteName}有权要求会员向我们提供充足有效的文件，用以确认是否享有</p>
                            <p className="wz ye4">该优惠的资质；</p>
                            <p className="wz">4、当参与优惠会员未能完全遵守.或违反.或滥用任何有关公司优惠或推广的条款，又或我们有任何证据有任何团队或个人投下一连串的关联赌注，</p>
                            <p className="wz ye4">籍以造成无论赛果怎样都可以确保可以从该存款红利或其他推广活动提供的优惠获利，{siteName}保留权利向此团队或个人停止.取消优惠</p>
                            <p className="wz ye4">或索回已支付的全部优惠红利。</p>
                            <p className="wz ye4">此外，公司亦保留权利向这些客户扣取相当于优惠红利价值的行政费用，以补偿我们的行政成本。</p>
                            <p className="wz">5、{siteName}保留对活动的最终解释权，以及在无通知的情况下修改.终止活动的权利，适用于所有优惠。</p>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user
    }
);

export default connect(mapStateToProps, {})(LootoPage);
