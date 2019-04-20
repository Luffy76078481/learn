import React, { Component } from 'react';
import {Icon, NavBar,Modal,Toast,Carousel} from "antd-mobile";
//import {Link,browserHistory} from "react-router";
import connect from "react-redux/es/connect/connect";
import {config} from "globalConfig"
import "./LottoPage.scss"
import {ApiQueryLuckyCountAction, ApiQueryLuckyDrawAction, ApiQueryLuckyWinnerAction} from "globalAction";
var ulHeight,ulbox,allHeight,inter,clickFlag = false;
class LottoPage extends Component{
    constructor(props) {
        super(props)
        this.state = {
            showLeft:false,
            showRight:false
        };
    }
    componentWillUnmount(){
        clearInterval(inter);
    }
    componentDidMount(){
        new ApiQueryLuckyWinnerAction("",1,15).fly(resp => {
            if(resp.StatusCode === 0){
                this.carouselAction(resp);
            }
        });
    }
    carouselAction(obj=[]) {
        if(obj.List){
            var sAwardEle = ""
            var awards = ['888','88','IPHONE X','电子优惠券','188','588','100元话费']
            $.each(obj.List, function (i, award) {
                let userName = award.User.UserName;
                userName = userName.substr(0, 1) + '***' + userName.substr(4, userName.split('').length);
                sAwardEle += '<li><span>恭喜' + userName + '</span><span>抽中' + award.LuckyItem.Prizes + '</span></li>';
                if(parseInt((Math.random()*(10-1)+1)+"")>8){
                    var fuckyou = Math.random().toString(36).substr(3);
                    var name = fuckyou.substr(0, 1) + '***' + fuckyou.substr(4, fuckyou.split('').length);
                    var index = parseInt((Math.random()*5)+"");
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
    scollAction(){
        let topPx = $(".ulbox").scrollTop();
        if(inter){
            clearInterval(inter);
        }
        inter = setInterval(() => {
            let scTop = $(".ulbox").scrollTop(topPx);
            topPx++;
            if (topPx >= allHeight) topPx = 0;
        }, 50);
    }
    mouseHover(){
        clearInterval(inter);
        inter = null;
    }
    mouseLeave(){
        clearInterval(inter);
        inter = null;
        this.scollAction();
    }
    zzAction(){
        if(clickFlag){
            return
        }else{
            clickFlag =true;
        }

        if (!this.props.user.username || !this.props.user.token) {

            clickFlag =false;
            return false;
        }
        let that = this;
        new ApiQueryLuckyCountAction(this.props.user.username).fly(resp => {
            if(resp.StatusCode === 0){
                if(resp.Count>0){
                    $(".top-content-lotto-gif").css("z-index",3)
                    that.startGame();
                }else{
                    Modal.alert("您的机会已经用完啦");
                    clickFlag =false;
                }
            }else{
                Modal.alert(resp.Message);
                clickFlag =false;
            }
        });
    }
    startGame(){
        $(".top-content-lotto-zz").css("transition", "none");
        $(".top-content-lotto-zz").css("transform", "rotate(0deg)")
        let that = this;
        new ApiQueryLuckyDrawAction(this.props.user.username).fly(resp => {
            if(resp.StatusCode === 0){
                if(resp.Winning == true&&resp.PrizeGrade == 9){
                    that.rotateZhuanpan(resp.PrizeGrade,()=>{Modal.alert('很抱歉，本次未中奖!'); $(".top-content-lotto-gif").css("z-index",1)});

                }else if(resp.Winning == true){
                    that.rotateZhuanpan(resp.PrizeGrade,()=>{Modal.alert(resp.Message); $(".top-content-lotto-gif").css("z-index",1)})
                }
                if(resp.Winning == false){
                    that.rotateZhuanpan(resp.PrizeGrade,()=>{Modal.alert('很抱歉，本次未中奖!'); $(".top-content-lotto-gif").css("z-index",1)})
                }
            }else{
                Modal.alert(resp.Message);
                $(".top-content-lotto-gif").css("z-index",1)
            }
            clickFlag =false;
        });
    }
    rotateZhuanpan(grade, cb){
        if(grade == 0){
            grade = 9
        }
        $(".top-content-lotto-zz").css("transition", "all 4s ease-out");
        let rotateN = Math.floor(3600);
        let rotate = rotateN+(-grade*36);
        $(".top-content-lotto-zz").css("transform", "rotate("+ rotate +"deg)")
        setTimeout(function(){cb()}, 4500);
    }
    showLeftPop(show){
        this.setState({showLeft:show})
    }
    showRightPop(show){
        this.setState({showRight:show})
    }
    // 表格
    tableDescribe(){
        var ret = []
        if(config.gameTag=="dafa"){
            ret.push(
                <div className="outbox" key='dafaTable'>
                    <div className="pop-xx" onClick={()=> this.setState({showLeft:false})}></div>
                    <div className="pop-box text">
                    <p className="pop-title">活动详情</p>
                    <table>
                        <tbody>
                        <tr className="tit">
                            <td>当日有效投注金额</td>
                            <td>抽奖次数</td>
                        </tr>
                        <tr>
                            <td>日有效投注在5000或以上</td>
                            <td>1次</td>
                        </tr>
                        <tr>
                            <td>日有效投注在50000或以上</td>
                            <td>2次</td>
                        </tr>
                        <tr>
                            <td>日有效投注在100000或以上</td>
                            <td>3次</td>
                        </tr>
                        <tr>
                            <td>日有效投注在500000或以上</td>
                            <td>4次</td>
                        </tr>
                        <tr>
                            <td>日有效投注在1000000或以上</td>
                            <td>5次</td>
                        </tr>
                        </tbody>
                    </table>
                    <p className="pop-cjtj">抽奖条件</p>
                    <p className="wz newwz">
                        活动时间：自美东时间2019年4月13日起<br/>
                        结束时间：以官网通知时间为准<br/>
                        活动对象：【{config.appName}】全体有效会员<br/>
                        开放时间：全天开放<br/>
                        <span>① 奖品设置：保时捷跑车、IphoneX、免费筹码—18元、88元、188元、588元、888元、100元手机话费、电子老虎机存送优惠券，更多奖项不定期更新中</span><br/>
                        <span>②有效投注统计：当日的有效投注额计算周期采用的是美东时间，即北京时间每天中午16:00:00至次日中午11:59:59</span>
                    </p>
                    <p className="wz newkongxi">1、如果您当日有效投注额达到活动条件，即可开始参与，且需在该有效时间内完成转盘旋转，逾期则视为自动</p>
                    <p className="wz ye4">放弃活动资格；</p>
                    <p className="wz">2、获得“存送优惠券”的会员，在使用优惠券进行存款之前，账户余额必须低于10元，需联系24小时在线客服进行申请且彩金未派发前不可投注，否则此次存</p>
                    <p className="wz ye4">款无效，逾期将失去兑换资格；</p>
                    <p className="wz">3、凡是抽中“免费筹码”的会员无需联系申请，系统将在30分钟内自动添加到中奖会员账号上，3倍流水即可申请提款；（<font color="#FFFF00">仅限一次</font>
                        ）；</p>
                    <p className="wz">4、凡是抽中“存送优惠券”的会员务必在中奖后，24小时之内续存相应款项后联系在线客服申请优惠券等额彩金，（申请期间不可下注，否则视为弃权处理）</p>
                    <p className="wz ye4">此项存送优惠，需完成（本金+彩金）的8倍流水后方可自由提款，否则将退回出款金额重新达到所需的电子游艺投注。如超过1小时未派送，请联系在线客</p>
                    <p>
                    </p>
                    <p className="wz ye4">服查询受理；</p>
                    <p className="wz">5、凡是抽中“100元手机话费”的会员务必在中奖后，2小时之内添加<font color="#FFFF00">官网客服QQ：{config.qq}</font>申请话费充值，逾期视为自动放弃；</p>
                    <p className="wz">6、凡是抽中实物奖品的会员，奖品不可折现；请务必于中奖后三个工作日内联系我司客服提供快递收货地址、姓名及联系电话，奖品将在中奖会员提供具体收</p>
                    <p className="wz ye4">货地址后十个工作日内寄出，请耐心等待。如中奖后三个工作日内未联系我司确认收货地址或因个人提供的收件信息不完整、不正确、电话无法联系上导致</p>
                    <p className="wz ye4">物品无法寄达快递退回的情况，均视为自动放弃不再安排寄送，请勿与客服就此理论。</p>
                    <p className="wz">7、所有数据均由系统自动统计，若有任何异议，以系统派送金额为准，部分套利、违反公司条例会员不在赠送名单之内！</p>
                    </div>
                </div>
            )
        }
        else{
            ret.push(
                <div className="outbox" key="xhtdTable">
                    <div className="pop-xx" onClick={() => this.setState({showLeft: false})}></div>
                    <div className="pop-box text">
                        <p className="pop-title">活动详情</p>
                        <table>
                            <tbody>
                            <tr className="tit">
                                <td>当天累计<br/>存款金额</td>
                                <td>抽奖次数</td>
                                <td>流水限制</td>
                                <td>活动时间</td>
                            </tr>
                            <tr>
                                <td>500+</td>
                                <td>1次</td>
                                <td rowSpan={7}>
                                    无需流水
                                    <br/>
                                    即可提款
                                </td>
                                <td rowSpan={7}>
                                    北京时间
                                    <br/>
                                    {config.gameTag=="xhtd"?"16:00":"18:00"}至23:59
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
                        <p className="pop-cjtj">抽奖条件</p>
                        <p className="wz newwz">
                            活动时间：自美东时间2019年4月13日起<br/>
                            结束时间：以官网通知时间为准<br/>
                            活动对象：【{config.appName}】全体有效会员<br/>
                            开放时间：每天下午{config.gameTag=="xhtd"?"16:00":"18:00"}~23:00<br/>
                            <span>① 奖品设置：保时捷跑车、IphoneX、免费筹码—18元、88元、188元、588元、888元、100元手机话费、电子老虎机存送优惠券，更多奖项不定期更新中</span><br/>
                            <span>② 存款金额统计：当日的累计存款金额计算周期采用的是美东时间，即北京时间每天中午12:00:00至次日中午11:59:59</span>
                        </p>
                        <p className="wz newkongxi">1、如果您当日的累计存款金额达到活动条件，即可开始参与，且需在该有效时间内完成转盘旋转次数，逾期未参加视为自动放弃活动资格；</p>
                        <p className="wz">2、在获得“存送优惠券”的会员，在使用优惠券进行存款之前，账户余额必须低于10元，需联系24小时在线客服进行申请且彩金未派发前不可投注，否则此次存款无效，逾期将失去兑换资格；</p>
                        <p className="wz">3、凡是抽中“免费筹码”的会员无需申请，系统会在30分内自动添加到中奖会员账号上，无需流水即可提款；</p>
                        <p className="wz">4、凡是抽中“100元手机话费”的会员务必在中奖后，2小时内添加官网客服QQ：{config.qq}
                            申请话费充值，逾期视为自动放弃；</p>
                        <p className="wz">5、凡是抽中实物奖品的会员，奖品不可折现；请务必于中奖后三个工作日内联系我司客服提供快递收货地址、姓名及联系电话，奖品将在中奖会员提供具体
                            收货地址后十个工作日内寄出，请耐心等待。如中奖后三个工作日内未联系我司确认收货地址或因个人提供的收件信息不完整、不正确、电话无法联系上导致
                            物品无法寄送快递退回的情况，均视为自动放弃不再安排寄送，请勿与客服就此理论；
                        </p>
                        <p className="wz">6、此“幸运大赚盘”活动为【{config.appName}】系统程序自动运行，中奖的概率完全遵循力学及自然概率，不涉及任何人工操作，抽奖结果以系统判定为准，不得争议；</p>
                        <p className="wz">7、如您忘记会员账号/密码，请您联系7x24小时在线客服协助您取回您的账号信息；</p>
                        <p className="wz">8、参与该优惠，即表示您同意《一般优惠规则与条款》。</p>
                    </div>
                </div>
            )
        }
        return ret;
    }
    render(){
        return(
            <div className="LottoPage">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={this.props.router.goBack}
                >幸运大转盘</NavBar>
                <div className="scroll-content">
                    <div className="title-icon"></div>
                    <div className="top-content">
                        <div className="top-content-lotto"></div>
                        <div className="top-content-lotto top-content-lotto-gif"></div>
                        <div className="top-content-lotto-zz" onClick={this.zzAction.bind(this)}></div>
                    </div>
                    <div className="bottom-content-zjbox">
                        <div className="zj-box-title">获奖名单</div>
                        <div className="ulbox" onMouseEnter={this.mouseHover.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>
                            <ul className="prizelist">
                            </ul>
                        </div>
                        <div className="zj-botton-left" onClick={this.showLeftPop.bind(this,true)}></div>
                        <div className="zj-botton-right"  onClick={this.showRightPop.bind(this,true)}></div>
                    </div>
                    <div className="looto-background">
                        {!this.state.showLeft?null:this.tableDescribe()}                        
                        {
                            !this.state.showRight?null:
                            <div  className="outbox">
                            <div className="pop-xx"  onClick={()=> this.setState({showRight:false})}></div>
                                <div className="pop-box text">
                                    <p className="pop-title">活动细则</p>
                                    <div className="wrap_box" style={{clear:'both'}}>
                                        <p className="wz">1、所有优惠以人民币(CNY)为结算金额，以美东时间(EDT)为计时区间。</p>
                                        <p className="wz">2、每位玩家﹑每户﹑每一住址 、每一电子邮箱地址﹑每一电话号码﹑相同支付方式(相同借记卡/信用卡/银行账户)及IP地址只能享有一次优惠；若会员有重复</p>
                                        <p className="wz ye4">申请账号行为，公司保留取消或收回会员优惠彩金的权利。</p>
                                        <p className="wz">3、【{config.appName}】的所有优惠特为玩家而设，如发现任何团体或个人，以不诚实方式套取红利或任何威胁、滥用公司优惠等行为，公司保留冻结、取消该团体</p>
                                        <p className="wz ye4">或个人账户及账户结余的权利。 </p>
                                        <p className="wz">4、若会员对活动有争议时，为确保双方利益，杜绝身份盗用行为，【{config.appName}】有权要求会员向我们提供充足有效的文件，用以确认是否享有该优惠的资</p>
                                        <p className="wz ye4">质。</p>
                                        <p className="wz">5、当参与优惠会员未能完全遵守、或违反、或滥用任何有关公司优惠或推广的条款，又或我们有任何证据有任何团队或个人投下一连串的关联赌注，籍以造成</p>
                                        <p className="wz ye4">无论赛果怎样都可以确保可以从该存款红利或其他推广活动提供的优惠获利，【{config.appName}】保留权利向此团队或个人停止、取消优惠或索回已支付的全部</p>
                                        <p className="wz ye4">优惠</p>
                                        <p className="wz ye4">红利。此外，公司亦保留权利向这些客户扣取相当于优惠红利价值的行政费用，以补偿我们的行政成本。</p>
                                        <p className="wz">6、【{config.appName}】保留对活动的最终解释权；以及在无通知的情况下修改、终止活动的权利；适用于所有优惠。</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user:state.user
    }
);

export default connect(mapStateToProps,{})(LottoPage);
