import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    ApiQueryLuckyWinnerAction, 
    ApiQueryLuckyCountAction, 
    GlobePopBox, 
    ApiQueryLuckyDrawAction,
    ApiGetQueryLuckyCounts,
    ApiQueryLuckyChangeCounts
} from "globalAction";
import merge from 'lodash/merge'
import {config} from 'globalConfig';
import './LootoPage.scss'
var ulHeight, ulbox, allHeight, inter, clickFlag = false;

class LootoPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showLeft: false,
            showRight: false,
            remainingCount:[],
            shengYu:[]//剩余量 JSON字符串
        };
    }
    componentWillUnmount() {
        clearInterval(inter);
    }
    componentDidMount() {
        document.title = window.config.title;
        new ApiQueryLuckyWinnerAction("", 1, 15).fly(resp => {
            if (resp.StatusCode === 0) {
                this.carouselAction(resp);// 获奖
            }
        });
        /*
        let arr = [
            {"name":"保时捷汽车","count":3},
            {"name":"iphoneX","count":24},
            {"name":"免费筹码888","count":500},
            {"name":"存送优惠券","count":800},
            {"name":"免费筹码188","count":1000},
            {"name":"免费筹码88","count":1500},
            {"name":"免费筹码18","count":3000},
            {"name":"免费筹码588","count":650},
            {"name":"100元手机话费","count":100}
        ]
        this.writeSurplus(arr) // 返写
        return
        */
        // 获取大转盘剩余奖项JSON字符串  
        new ApiGetQueryLuckyCounts().fly(resp => {
            this.setState({
                shengYu:JSON.parse(resp.value)
            })
            this.QueryLuckyTime(resp.currentTime,resp.lastUpdateTime,JSON.parse(resp.value))
            this.carouselAction2(resp) // 剩余奖品滚动展示
        });
    }
    // 匹配年供，月供，日供
    QueryLuckyTime(currentTime,lastUpdateTime,val){
        let params = JSON.stringify(this.state.shengYu);// 临时的JSON数据，用于最后setState shengYu重置数据
        params = JSON.parse(params);
        let currentYear = currentTime.substr(0,4)  // 当前服务器时间年份
        let endYear = lastUpdateTime.substr(0,4)   // 数据最后修改年份
        let currentMonth = currentTime.substr(6,1) // 当前服务器月份
        let endMonth = lastUpdateTime.substr(6,1)  // 数据最后修改月份      
        let currentDay = currentTime.substr(8,2) // 当前服务器号数
        let endDay = lastUpdateTime.substr(8,2) // 最后修改号数
        let currentHour = currentTime.substr(11,2) // 当前服务器小时数
        let endHour = lastUpdateTime.substr(11,2) // 最后修改小时数
        let startActivity =  config.spec == "xhtd-xhtd"?16:18 //活动时间是 startActivity - 23:59
        let isStartActivity = false; // 活动是否开始
        if( Number(currentHour)>=startActivity ){
            isStartActivity = true
        }
        // 活动开始
        this.productYear(val[0],params,currentYear,endYear,endMonth,isStartActivity) // 年供保时捷
        this.productMonth(val[1],params,currentMonth,endMonth,currentDay,endDay,isStartActivity) // 月供iphoneX
        this.productDay(val.slice(2),params,currentDay,endDay,currentHour,endHour,isStartActivity) // 日供               
    }
    // 年供
    productYear(val,params,currentYear,endYear,endMonth,isStartActivity){
        // 活动开始
        if(isStartActivity){
            // 5月份第二季度
            if( Number(endMonth) == 5 ){
                val.count = 2;
                params[0] = val;
                this.writeSurplus(params)
            }
            // 9月份第三季度
            else if( Number(endMonth) == 9 ){
                val.count = 1;
                params[0] = val;
                this.writeSurplus(params)
            }
            // 12月份直接清0
            else if( Number(endMonth) == 12 ){
                val.count = 0;
                params[0] = val;
                this.writeSurplus(params)
            }
        }
        // 活动结束
        else{
            // 活动结束期，判断年份是否更替，如果更替重置保时捷
            if( Number(endYear)-Number(currentYear)>=1 ){ 
                val.count = 3; 
                params[0] = val //
                this.writeSurplus(params) // 返写
            }
        }
    }
    // 月供
    productMonth(val,params,currentMonth,endMonth,currentDay,endDay,isStartActivity){
        // 活动开始
        if(isStartActivity){
            // 如果月份不同且活动开始，重置iphoneX
            if( Number(currentMonth)-Number(endMonth)>=1 ){
                val.count = 30 - parseInt(Math.random()*30);// 直接计算 
                params[1] = val 
                this.writeSurplus(params)
            }
            else{
                // 日期不同，更新剩IphoneX余数
                if( currentDay!=endDay ){
                    if( val.count==0 || val.count=="0" ) return
                    val.count = val.count-parseInt(Math.random()*val.count); // 剩余数
                    params[1] = val // 修改参数
                    this.writeSurplus(params)// 返写            
                }
            }
        }
        // 活动结束
        else{
            // 如果月份不同，重置iphoneX
            if( Number(currentMonth)-Number(endMonth)>=1 ){
                val.count = 30; 
                params[1] = val 
                this.writeSurplus(params)// 返写
            }
        }      
    }
    // 日供
    productDay(val,params,currentDay,endDay,currentHour,endHour,isStartActivity){
        // 如果号数不同，需要重置
        if(currentDay!=endDay){    
            // 活动开始
            if(isStartActivity){
                val[0].count = 500;
                val[1].count = 800;
                val[2].count = 1000;
                val[3].count = 1500;
                val[4].count = 3000;
                val[5].count = 650;
                val[6].count = 100;     
            }
            // 活动结束
            else{
                val[0].count = 500 - parseInt(Math.random()*250)
                val[1].count = 800 - parseInt(Math.random()*400)
                val[2].count = 1000 - parseInt(Math.random()*500)
                val[3].count = 1500 - parseInt(Math.random()*750)
                val[4].count = 3000 - parseInt(Math.random()*1500)
                val[5].count = 650 - parseInt(Math.random()*325)
                val[6].count = 100 - parseInt(Math.random()*50)
            }
            params.forEach((item,index)=>{
                params[index+2].count = item;
            })
            this.writeSurplus(params) //返写
        }
        else{
            // 活動進行時，每小時減少一次禮品
            if( isStartActivity && Number(currentHour)-Number(endHour)>=1 ){
                if( val.count==0 || val.count=="0" ) return
                val.forEach( (ele,index) => {
                    val[index].count = ele.count - parseInt(Math.random()*ele.count)
                    params[index+2].count = val[index].count
                })        
                this.writeSurplus(params) //返写
            }    
            else{return}    
        }
    }
    // 反写剩余奖品API
    writeSurplus(params){
        params = params.slice(0,9) // 9条数据，乱写的，怕liNing偷偷加数据
        new ApiQueryLuckyChangeCounts(params).fly(resp =>{           
            if( resp==1 || resp=="1" ){
                this.setState({
                    shengYu:params
                })
                setTimeout(()=>{
                    console.log('Success')
                },1)
            }
        })
    }
    // 剩余奖品创建
    carouselAction2(obj = []){
        if(this.state.shengYu){
            var sAwardEle = ""
            $.each(this.state.shengYu, function (i, award) {
                sAwardEle += '<li><span>奖项：' + award.name+ '</span><span>'+'活动剩余:' + award.count + '</span></li>';
            });
            ulHeight = $(".prizelist2").height(); //中奖列表实际高度
            ulbox = $(".ulbox2").height(); //框的高度
            allHeight = ulHeight + ulbox; //需要滚动的距离
            $(".prizelist2").html(sAwardEle);
            let trueElement = $(".ulbox2").html();
            $(".ulbox2").append(trueElement);
            this.scollAction();
        }
    }
    // 奖品列表
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
            ulHeight = $(".prizelist1").height(); //中奖列表实际高度
            ulbox = $(".ulbox1").height(); //框的高度
            allHeight = ulHeight + ulbox; //需要滚动的距离
            $(".prizelist1").html(sAwardEle);
            let trueElement = $(".ulbox1").html();
            $(".ulbox1").append(trueElement);
            this.scollAction();
        }
    }
    // 滚动
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
    // 停止滚动
    mouseHover() {
        clearInterval(inter);
        inter = null;
    }
    // 开始滚动
    mouseLeave() {
        clearInterval(inter);
        inter = null;
        this.scollAction();
    }
    // 查询机会
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
                new GlobePopBox(resp.Message);
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
        let webName = "本站";
        let startTime = "16:00";
        let qqNum = "聯係客服"
        if( window.config.spec =="mgm-vv8" ){
            webName = "美高梅";
            startTime = "18:00";
            qqNum = "943427777 "
        }
        else if( window.config.spec =="xhtd-xhtd" ){
            webName = "新濠天地";
            startTime = "16:00";
            qqNum = "353427888"
        }
        return (
            <div className="looto-background">
                <div className="ulbox1 ulbox" onMouseEnter={this.mouseHover.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>
                    <ul className="prizelist prizelist1"></ul>
                </div>
                <div className="ulbox2 ulbox" onMouseEnter={this.mouseHover.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>
                    <ul className="prizelist prizelist2"></ul>
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
                                    活动时间：自美东时间2019年4月13日起<br/>
                                    结束时间：以官网通知时间为准<br/>
                                    活动对象：{webName}全体有效会员<br/>
                                    开放时间：每天下午{startTime}~23:59<br/>
                                    <span>① 奖品设置：保时捷跑车、IphoneX、免费筹码—18元、88元、188元、588元、888元、100元手机话费、电子老虎机存送优惠券，更多奖项不定期更新中</span><br/>
                                    <span>② 存款金额统计：当日的累计存款金额计算周期采用的是美东时间，即北京时间每天中午12:00:00至次日中午11:59:59</span>
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
                                            {startTime}至23:59                              
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
                            <p className="wz">1、如果您当日的累计存款金额达到活动条件，即可开始参与，且需在该有效时间内完成转盘旋转次数，逾期未参加视为自动放弃活动资格；</p>
                            <p className="wz">2、在获得“存送优惠券”的会员，在使用优惠券进行存款之前，账户余额必须低于10元，需联系24小时在线客服进行申请且彩金未派发前不可投注，否则此次存款无效，逾期将失去兑换资格；</p>
                            <p className="wz">3、凡是抽中“免费筹码”的会员无需申请，系统会在30分内自动添加到中奖会员账号上，无需流水即可提款；</p>
                            <p className="wz">4、凡是抽中“100元手机话费”的会员务必在中奖后，2小时内添加官网客服QQ：{qqNum} 申请话费充值，逾期视为自动放弃，</p>
                            <p className="wz">5、凡是抽中实物奖品的会员，奖品不可折现；请务必于中奖后三个工作日内联系我司客服提供快递收货地址、姓名及联系电话，奖品将在中奖会员提供具体收货地址后十个工作日内寄出，请耐心等待。如中奖后三个工作日内未联系我司确认收货地址或因个人提供的收件信息不完整、不正确、电话无法联系上导致物品无法寄送快递退回的情况，均视为自动放弃不再安排寄送，请勿与客服就此理论；</p>
                            <p className="wz">6、此“幸运大赚盘”活动为【{webName}】系统程序自动运行，中奖的概率完全遵循力学及自然概率，不涉及任何人工操作，抽奖结果以系统判定为准，不得争议</p>
                            <p className="wz">7、如您忘记会员账号/密码，请您联系7x24小时在线客服协助您取回您的账号信息</p>
                            <p className="wz">8、参与该优惠，即表示您同意《一般优惠规则与条款》。</p>
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
