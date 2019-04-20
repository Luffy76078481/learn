/**
 * 红包
 */
import React, { Component } from 'react';
import {config} from "globalConfig";
import {default as swal} from "sweetalert2"

// API
class ApiSysConfAction {
    fly(callback){
        let authorization="";
        fetch(config.apiPath+"client/all_sys_cfg?Tag="+config.webSiteTag, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization":authorization
            }
        }).then(function(response){
            return response.json();
        }).then(function(data){
            callback(data);
        }).catch(function (err) {
            console.log(err);
        });
    }
}

var NowTimeOld = new Date("2017-08-09 11:12:51");
var startDateTime = new Date("2017-08-08 16:00:00");
var endDateTime = new Date("2017-08-08 23:59:00");
var one, two, NowTime, waveTime, timerhb,Timerr,isClick;

// 获取当前时间day=-1前一天，day=1后一天
function getNowDate(day){
    var d = new Date();
    var date = day?new Date(d.getTime() + day*24*60*60*1000):d;
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h=h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second=date.getSeconds();
    second=second < 10 ? ('0' + second) : second;
    return y + '/' + m + '/' + d+' '+h+':'+minute+':'+second;
}
// 日历格式化
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,               //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
// 后台返回时间字符串处理
function changeTime(s) {
    s= s.replace('T',' ').replace('-','/').replace('-','/');
    var t = Date.parse(s);
    t += 12 * 3600000;
    return new Date(t).format("yyyy/MM/dd hh:mm:ss");
}
// 获得活动时间API
function ajaxLottery(){
    $.ajax({
        url: config.apiPath+'Lucky/Get?LuckyNo=LuckyMoney',
        dataType: 'json',
        cache: false,
        type: 'get',
        success: function (obj) {
            if(obj.StatusCode == 0){
                var startTime = new Date(changeTime(obj.LuckyInfo.StartTime.replace('T',' ')));
                var endTime = new Date(changeTime(obj.LuckyInfo.EndTime.replace('T',' ')));
                $("#startTimeSpan").html(changeTime(obj.LuckyInfo.StartTime.replace('T',' ')));
                $("#endTimeSpan").html(changeTime(obj.LuckyInfo.EndTime.replace('T',' ')));
                var now = new Date();
                console.log(endTime,obj.LuckyInfo)
                if(now.getTime() > endTime.getTime()){
                    clearInterval(Timerr);
                    $("#hb_start").hide();
                    $("#hb_for").hide();
                    $("#hb_next").hide();
                    $("#hb_end").hide();
                    $("#today_end").show();
                    window.clearInterval(timerhb);
                }else if(now.getTime() < startTime.getTime()){//下一波倒计时
                    NowTimeOld = now;//new Date(c_time);
                    startDateTime =  startTime; //new Date(start_time);
                    one = setInterval(getRTimeOne,1000);
                    window.clearInterval(timerhb);
                    $("#hb_start").hide();
                    $("#hb_for").hide();
                    $("#hb_end").hide();
                    $("#today_end").hide();
                    $("#hb_next").show();
                }else if(now.getTime()<endTime.getTime()){//活动进行中
                    
                    NowTimeOld = now;//new Date(c_time);
                    waveTime =  endTime; //new Date(end_time);
                    two = setInterval(getRTimeTwo,1000);
                    timerhb = setInterval(hby,200);
                    $("#hb_start").hide();
                    $("#hb_end").hide();
                    $("#today_end").hide();
                    $("#hb_next").hide();
                    $("#hb_for").show();
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            var x = 1;
        }
    })
}
// 红包雨
function hby() {
    var wh = $(window).height();
    var f = $(document).width();
    var e = Math.random() * f - 100;//
    var o = 0.5 + Math.random();//
    var fon = 10 + Math.random() * 30;//
    var l = e - 100 + 200 * Math.random();//
    var k = 2000 + 5000 * Math.random();
    var html;
    switch (Math.floor(Math.random() * 3 + 1)) {
        case 1:
            html = "<div data-key='logn' class='snow snow-1'><div>";
            break;
        case 2:
            html = "<div data-key='logn' class='snow snow-2'><div>";
            break;
        case 3:
            html = "<div data-key='logn' class='snow snow-3'><div>";
            break;
    }
    $(html).clone().appendTo(".banner").css({
        left: e + "px",
        opacity: o,
        "font-size": fon,
    }).animate({
        top: (wh * 1) + "px",
        left: l + "px",
        opacity: 0.1,
    }, k, "linear", function () {
        $(this).remove();
    })
}

// 活动进行中时间倒计时
function getRTimeTwo() {
    var t_s = NowTimeOld.getTime();
    var NowTime = NowTimeOld.setTime(t_s + 1000);
    var t = waveTime - NowTime;
    if (t <= 0) {
        clearInterval(two);
        ajaxLottery();
        return;
    }
    var d = Math.floor(t / 1000 / 60 / 60 / 24);
    var h = Math.floor(t / 1000 / 60 / 60 % 24);
    var m = Math.floor(t / 1000 / 60 % 60);
    var s = Math.floor(t / 1000 % 60);
    var h = d * 24 + h;
    document.getElementById("t_d_2").innerHTML = "<em>" + d + "</em>" + "天";
    document.getElementById("t_h_2").innerHTML = "<em>" + h + "</em>" + "小时";
    document.getElementById("t_m_2").innerHTML = "<em>" + m + "</em>" + "分";
    document.getElementById("t_s_2").innerHTML = "<em>" + s + "</em>" + "秒";
}
// 下次活动的倒计时
function getRTimeOne() {
    var t_s = NowTimeOld.getTime();
    var NowTime = NowTimeOld.setTime(t_s + 1000);
    var t = startDateTime - NowTime;

    if (t <= 0) {
        clearInterval(one);
        ajaxLottery();
        return;
    }
    var d = Math.floor(t / 1000 / 60 / 60 / 24);
    var h = Math.floor(t / 1000 / 60 / 60 % 24);
    var m = Math.floor(t / 1000 / 60 % 60);
    var s = Math.floor(t / 1000 % 60);
    document.getElementById("t_d_3").innerHTML = "<em>" + d + "</em>" + "天";
    document.getElementById("t_h_3").innerHTML = "<em>" + h + "</em>" + "小时";
    document.getElementById("t_m_3").innerHTML = "<em>" + m + "</em>" + "分";
    document.getElementById("t_s_3").innerHTML = "<em>" + s + "</em>" + "秒";
}

// 检查用户帐号，查询中奖剩余次数API
function checkUser(){
    var _username = $("#username").val();
    if(_username == ""){
        swal("输入会员帐号不能为空!",'','info');
        return false;
    }
    $.ajax({
        url:  config.apiPath+'Lucky/GetCount?LuckyNo=LuckyMoney'+'&UserName='+_username,
        dataType: 'json',
        cache: false,
        type: 'get',
        success: function(result){
            if(result.StatusCode == 0){
                if(result.Count>0){
                    $('#hb_count').html('您还有<span>'+result.Count+'</span>次机会');
                    $('#j-packet').show();
                    $('#j-packet-bg').show();
                    $('#j-dailog-bag').hide();
                    $('.dailog-bag-bg').hide();
                }else{
                    swal('您的机会已经用完啦!','','info');
                }
            }else{
                swal('网络错误,请稍后再抽奖','','error');
            }
        }
    });
}
//获取手机投注链接
function urlLink(){
    $.ajax({
        url:  config.apiPath+'client/all_sys_cfg',
        dataType: 'json',
        cache: false,
        type: 'get',
        headers:{
            "Content-Type": "application/json"
        },
        data:{
            tag:''
        },
        success:function(data){
            if(data.StatusCode==0){
                var html = ''
                html = `<a target='_blank' href=${data.Config.channel_push_url}>手机投注</a>`
                 $("#aLink").html(html)
            }
           
        }
    })
}
//拆紅包
function startGame(pullDoneHongBao,getHongBaoWindow,hongBaoWrap,getHongBaoNum){
    if(isClick){
        return;
    }
    var _username = $("#username").val();
    if(_username == ""){
        swal("输入会员帐号不能为空!",'','error');
        return false;
    }
    isClick = true;
    $.ajax({
        url:  config.apiPath+'Lucky/Draw',
        dataType: 'json',
        cache: false,
        type: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        data: JSON.stringify({LuckyNo:'LuckyMoney',username: _username}),
        success: function (obj) {
            if(obj.StatusCode == 0){
                if(obj.Winning == true || obj.Winning == 'true' ){
                    $(hongBaoWrap).addClass('animated shake');
                    $(hongBaoWrap).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
                        $(hongBaoWrap).removeClass('animated shake');
                        $(getHongBaoNum).html("<span>"+ obj.Prize +"</span>元");
                        $(getHongBaoWindow).show();
                        $(pullDoneHongBao).hide();
                        //swal('恭喜您,中奖了!',obj.Message,'success')
                    });
                }else{
                    swal('很抱歉，本次未中奖!');
                    checkUser();
                }
            }else{
                swal(obj.Message,'','info');
                checkUser();
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            swal('网络故障,请联系管理员');
        }
    })
}
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            online_service_link: "",
            jackpot :false,
            pages:false,
            jackpotData:null,
            nowPage:1
        }
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.state["online_service_link"],'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    componentWillMount(){
        ajaxLottery();
        urlLink();
    }
    componentDidMount(){
        new ApiSysConfAction().fly(resp => {
            if(resp.StatusCode === 0){
                this.setState({online_service_link: resp.Config.online_service_link});
            }
        });
        //红包雨被点击时
        $(".banner").on("click", "[data-key='logn']", function () {
            $('#j-logn').show();
            $('#j-packet-bg').show();
        });

        //悬浮广告
        var duilian = $("div.duilian");
        var duilian_close = $("a.duilian_close");

        var screen_w = screen.width;
        if (screen_w > 1024) {
            duilian.show();
        }
        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();
            duilian.stop().animate({top: scrollTop + 160});
        });
        duilian_close.click(function () {
            $(this).parent().hide();
            return false;
        });
        // 拆红包关闭按钮
        $('.packet-close').click(function () {
            $('#j-packet').hide();
            $('#j-packet-bg').hide();
            $('.packet-2').hide();
            $('.packet-1').show();
            isClick = false;
        })
    }
    // 紅包中將查询
    queryBtn(){
        var _bonuscode = $("#querycode").val();
        if(_bonuscode == "") {
            swal("输入会员帐号不能为空!");
            return false;
        }
        this.queryPage(0);
    }
    // 红包中奖数据
    queryPage(page){
        // 清空状态
        this.setState({
            jackpotData:null,
            nowPage:page
        })
        // 指针
        let that = this;
        $.ajax({
            url:  config.apiPath+'Lucky/GetWinners?',
            dataType: 'json',
            headers:{
                "Content-Type": "application/json"
            },
            data : {LuckyNo:"LuckyMoney",UserName:$("#querycode").val(), pageIndex: page, pageSize: 5},
            cache: false,
            type: 'GET',
            success: function (obj) {
                if(obj.List && obj.List.length >0){
                    that.setState({
                        jackpot:true,
                        pages:true,       
                        jackpotData:obj // 返回数据
                    })
                }else{
                    that.setState({
                        jackpot:true,
                        pages:false
                    })
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var x = 1;
            }
        })
    }
    // 中奖表单
    renderList(){
        let list = [];
        if(this.state.jackpotData){
            for (var i = 0; i < this.state.jackpotData.List.length; i++) {
                var g = this.state.jackpotData.List[i]; 
                list.push(
                    <tr key={"ss"+i}><td>{g.LuckyItem['Prizes']}</td><td>{g.CreateTime.replace("T"," ")}</td><td>{g.StatusText}</td></tr>
                )
            }
        }
        else{
            list.push(
                <tr key={999}><td colSpan="3">未找到相关信息</td></tr>
            );
        }
        return list;
    }
    // 分页
    renderPageList(){
        var ret = [];
        var invalidTag = false;
        if(this.state.jackpotData)
        for (var i = 0; i <= Math.ceil(this.state.jackpotData.Count/5)-1; i++) {
            if (i !== 0 && i !== this.state.jackpotData.Count && Math.abs(this.state.nowPage - i) >= 3) {
                invalidTag = true;
                continue;
            }
            if (invalidTag) {
                ret.push(
                    <a key={"ex"+i} href="javascript:void(0)" href="javascript:void(0)">...</a>
                )
                invalidTag = false;
            }
            ret.push(
                <a key={i} className={i === this.state.nowPage ? "jackPage active" : "jackPage"}  onClick={this.queryPage.bind(this,i)}>{i+1}</a>
            )
        }
        return ret;
    }
    toPrevPage(){
        if( (this.state.nowPage-1) < 0 ){
            return
        } 
        let val = this.state.nowPage;
        this.queryPage(val-1)
    }
    toNextPage() {
        if( (this.state.nowPage+1) >= Math.ceil(this.state.jackpotData.Count/5) ){
            return
        } 
        let val = this.state.nowPage;
        this.queryPage(val+1)   
    }
    showSearch(){
        $("#light,#fade").show();
    }
    // 关闭查询
    hideSearch(){
        $("#light,#fade").hide();
        $('#querycode').val("") 
        this.setState({
            jackpot:false,
            pages:false,
            jackpotData:null
        })
    }
    // 隐藏 -- 
    jLognHide(){
        $("#j-logn").hide();
        $('#j-packet-bg').hide();
    }
    // 立即领取按钮
    loginClick(){
        $("#username").val($("#username2").val());
        checkUser();
        this.jLognHide();
    }
    // 返回存款金额数
    rechargeNum(whichNum){
        let num;
        if(config.spec == "jhgj-jjh" || config.spec == "xhtd-xhtd" || config.spec == "pufa-ppp"){
            if(whichNum == 1){
                num = 100
            }else if(whichNum == 2){
                num = 1000
            }    
        }
        else{
            if(whichNum == 1){
                num = 500
            }else if(whichNum == 2){
                num = 2000
            }               
        }
        return num;
    }
    render() {
        const appName = config.appName;
        return (
            <div>
                {/*頭部*/}
                <div className="header">
                    <div className="wrapper">
                        <a href="/#" className="logo"></a>
                        <ul className="nav">
                            <li><a href="/" target="_blank">官网首页</a></li>
                            <li><a href="/register" target="_blank">会员注册</a></li>
                            <li><a id="showSearch" onClick={this.showSearch}>红包查询</a></li>
                            <li id="aLink"><a  target="_blank" >手机投注</a></li>
                            <li>
                                <a onClick={this.serversOpen.bind(this)} className="z5 serviceLink" >在线客服</a>
                            </li>
                        </ul>
                    </div>
                </div>
                {/*banner*/}
                <div className="banner">
                    <div className="banner-bg">
                        <div className="banner-a"></div>
                    </div>
                    <div className="notice">
                        <div className="wrapper">
                            <h3>最新消息：</h3>
                            <div className="marquee-box" >
                                <p style={{animation: 'marquee 10s linear infinite',whiteSpace:'nowrap'}}>
                                    【最新公告】尊敬的{appName}会员，您好！【亿元现金抢红包】活动，已正式开启...当日累计存款金额，不计输赢，即可参与抢红包机会，单个红包最高金额8888元，每天澳门时间16:00准时开抢，机不可失！拼一拼谁是真正的手气王！赶快通知您的朋友一起来抢吧~~
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper">
                        <a className="btn-link" href="#" target="_blank"></a>
                        <div id="hb_start" style={{display:'none'}}>
                            <div className="txt">
                                活动准备开启
                            </div>
                            <div className="HotDate">
                                <div className="tle">
                                    倒计时:
                                </div>
                                <span id="t_d"><em>00</em>天</span>
                                <span id="t_h"><em>00</em>小时</span>
                                <span id="t_m"><em>00</em>分</span> 
                                <span id="t_s"><em>00</em>秒</span>
                            </div>
                        </div>
                        {/* <!-- 进行中 -->*/}
                        <div id="hb_for" style={{display:'none'}}>
                            <div className="search">
                                <input type="text" name="username" id="username" placeholder="请输入会员账号" />
                                <button onClick={checkUser} className="btn-search" type="button" name="button">点击抢红包</button>
                            </div>
                            <div className="txt">
                                活动正在进行中
                            </div>
                            <div className="HotDate">
                                <div className="tle">
                                    本期结束:
                                </div>
                                <span id="t_d_2"><em>00</em>天</span>
                                <span id="t_h_2"><em>00</em>小时</span>
                                <span id="t_m_2"><em>00</em>分</span>
                                <span id="t_s_2"><em>00</em>秒</span>
                            </div>
                        </div>
                        {/*<!-- 下一波倒计时 -->*/}
                        <div id="hb_next" style={{display:'none'}}>
                            <div className="txt">
                                距离下期开始
                            </div>
                            <div className="HotDate">
                                <div className="tle">
                                    倒计时:
                                </div>
                                <span id="t_d_3"><em>00</em>天</span>
                                <span id="t_h_3"><em>00</em>小时</span>
                                <span id="t_m_3"><em>00</em>分</span>
                                <span id="t_s_3"><em>00</em>秒</span>
                            </div>
                        </div>
                        {/*<!-- 今日已结束 -->*/}
                        <div className="HotDate" id="today_end" >
                            <br/>
                            <div className="tle" style={{fontSize:'30px'}}>抢红包活动今日已结束</div>
                            <br/>
                            <div className="tle">请明天再来</div>
                        </div>
                        {/*<!-- 活动结束 -->*/}

                        <div className="HotDate" id="hb_end" style={{display:'none'}}>
                            <br/>
                            <div className="tle" style={{fontSize:'30px'}}>亿元抢红包活动已结束</div>
                            <br/>
                            <div className="tle" style={{fontSize:'25px'}}>我们后续将推出更多惊喜优惠敬请关注</div>
                        </div>
                    </div>
                </div>
                {/* 活动详情 */}
                <div className="content">
                    <div className="mod mod-1">
                        <div className="wrapper">
                            <div className="hd">
                                <img src={require("../images/hd-1.png")} alt="" />
                            </div>
                            <div className="mt-20">
                                即日起凡是在{appName}
                                <font color="#FFFF00">存款达到{this.rechargeNum(1)}元+</font>
                                的会员皆可在当日参与抢亿元现金红包活动，亿元现金红包将于(<font color="#FFFF00">澳门时间<span id="startTimeSpan"></span>至<span id="endTimeSpan"></span>限时开抢</font>)，会员登录{appName}参与抢红包，单个红包最高8888元，快来试试您的运气吧！更多给力现金回馈活动筹备中,敬请关注{appName}）<br/>
                                <font color="#00FF00">
                                    温馨提示：亲们！尚未注册/存款的亲们强烈建议您注册/存款,每天在{appName}进行存款游戏,天天参与多项优惠活动噢！如此给力，速来{appName}尽情玩乐吧！</font><table className="tbl">
                                <tbody>
                                </tbody></table><table className="tbl">
                                <tbody><tr>
                                    <th>当天累计<span lang="zh-cn">存款</span>金额</th>
                                    <th>抢红包次数</th>
                                    <th>单个红包最大金额</th>
                                    <th>流水限制</th>
                                    <th>活动时间</th>
                                </tr>
                                <tr>
                                    <td>
                                        {this.rechargeNum(1)}
                                        <span>+</span>
                                    </td>
                                    <td>1次</td>
                                    <td rowSpan="7">8888元</td>
                                    <td rowSpan="7">无需流水<p>即可出款</p></td>
                                    <td rowSpan="7">
                                        每天北京时间<br/>下午
                                        {config.spec=="xhtd-xhtd"?"16:00":"18:30"}
                                        至晚上00:00
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    {this.rechargeNum(2)}
                                    <span>+</span>
                                    </td>
                                    <td>3次</td>
                                </tr>
                                <tr>
                                    <td>5000<span>+</span></td>
                                    <td>5次</td>
                                </tr>
                                <tr>
                                    <td>10000<span>+</span></td>
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
                                <tr>
                                    <td colSpan="5"><p>会员达到条件后在该时间段没抢红包，视为自动弃权。温馨提示：输入游戏账号时请勿输入大写字母,否则导致派彩失败则视为自动放弃。</p></td>
                                </tr>
                                </tbody></table>
                            </div>
                            <p>
                                <span className="fc-yellow">注：会员必须达到指定的存款金额才可以获得对应抢红包次数。<br/>
                                    <font color="#00FF00">例：会员小明当天累积存款2000元， 则可获得3次抢红包机会，抢到的红包将在30秒内派送到该会员的账号上。</font>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="mod mod-2">
                        <div className="wrapper">
                            <div className="hd">
                                <img src={require("../images/hd-2.png")} alt=""/>
                            </div>
                            <p>
                                1、会员在当日存款累计金额达到{this.rechargeNum(1)}元+，即可在当日获得抢红包机会。<br/>
                                2、 所获得红包 彩金无需流水即可申请提款。<br/>
                                3、会员每天存款金额均有系统自动统计，若有任何异议，以{appName}核定为准不得争议。<br/>
                                4、部分套利、违反公司条例会员不在活动名单之内！<br/>
                                6、如果您的当日有效投存款达到抢红包条件，超过限定抢红包时间将视为会员自动弃权，不得争议！<br/>
                                5、<font color="#00FF00">每台电脑，每位会员，每个IP当日最多仅88次参与机会，如发现会员同一个IP下注册多个账号进行投注抢红包，公司有权拒绝赠送其彩金并做账号冻结处理，保证正常玩家的利益；</font><br/>
                                6、此抢红包活动为【{appName}】系统程序自动运行，红包的概率完全遵循力学及自然概率.不涉及任何人工操作，抽奖结果以系统判定为准.不得争议。<br/>
                                7、如您忘记会员账号/密码，请您联系<font color="#FFFF00">7×24小时在线客服</font>协助您取回您的账号信息；<br/>
                                8、参与该优惠，即表示您同意《<font color="#FFFF00">一般优惠规则与条款</font>》。</p>
                        </div>
                    </div>
                    <div className="mod mod-3">
                        <div className="wrapper">
                            <div className="hd">
                                <img src={require("../images/hd-3.png")} alt="" />
                            </div>
                            <p>
                                1、所有优惠以<span className="fc-yellow">人民币(CNY)</span>为结算金额，以<span className="fc-yellow">美东时间(EDT)</span>为计时区间；
                                <br/>
                                2、每位玩家﹑每户﹑每一住址 、每一电子邮箱地址﹑每一电话号码﹑相同支付方式(相同借记卡/信用卡/银行账户) 及IP地 址只能享有一次优惠；若会员有重复申请账号行为，公司保留取消或收回会员优惠彩金的权利；
                                <br/>
                                3、<span className="fc-yellow">{appName}</span>的所有优惠特为玩家而设，如发现任何团体或个人，以不诚实方式套取红利或任何威胁、滥用公司优惠等行 为，公司保留冻结、取消该团体或个人账户及账户结余的权利；
                                <br/>
                                4、若会员对活动有争议时，为确保双方利益，杜绝身份盗用行为，<span className="fc-yellow">{appName}有权要求会员向我们提供充足有效的文件</span>用以确认是否享有该优惠的资质；
                                <br/>
                                5、当参与优惠会员未能完全遵守、或违反、或滥用任何有关公司优惠或推广的条款，又或我们有任何证据有任何团队或个人投下一连串的关联赌注，籍以造成无论赛果怎样都可以确保可以从该存款红利或其他推广活动提供的优惠获利，<span className="fc-yellow">{appName}保留权利向此团队或个人停止、取消优惠或索回已支付的全部优惠红利</span>。此外，公司亦保留权利向这些客户扣取 相当于优惠红利价值的行政费用，以补偿我们的行政成本；
                                <br/>
                                6、<span className="fc-yellow">{appName}保留对活动的最终解释权，</span>以及在无通知的情况下修改、终止活动的权利，适用于所有优惠。
                            </p>
                        </div>
                    </div>
                </div>
                {/*footer*/}
                <div className="footer">
                    Copyright © {appName}版权所有 Reserved
                </div>
                {/*悬浮*/}
                <div className="duilian duilian_right" style={{display:'block',top:'160px'}}>
                    <a onClick={this.serversOpen.bind(this)} className="block1 serviceLink" ></a>
                    <a className="block2" href="#toTop"></a>
                </div>

                {/*<!--红包查询-->*/}
                <div id="light" className="white_content">
                    <div className="cxbox">
                        <div className="cxbox_bt">
                            <p>输入会员账号查询</p>
                            <a style={{color:'#ffe681',textDecoration:'none'}} onClick={this.hideSearch.bind(this)} className="gban">X</a>
                        </div>
                        <div className="cxbox_hy">
                            <p>会员账号：</p><input name="querycode" id="querycode" type="text"  placeholder="输入帐号" /> <a onClick={this.queryBtn.bind(this)}>查 询</a>
                        </div>
                        <div className="cxbox_bd" style={{color:'#ffe681'}}>
                            <table width="480" cellPadding="0" cellSpacing="0">
                                <tbody><tr className="ad">
                                    <td>红包金额</td>
                                    <td>领取时间</td>
                                    <td>是否派彩</td>
                                </tr>
                                </tbody><tbody id="query_content">
                                    {this.state.jackpot?this.renderList():null}                 
                                </tbody>
                            </table>
                            {/* 分页 */}
                            {this.state.pages?<div className="quotes" >
                                <div className="nexprepage_icon"><a href="javascript:void(0)" onClick={this.toPrevPage.bind(this)}>上一页</a></div>
                                {this.renderPageList()}
                                <div className="nexprepage_icon"><a href="javascript:void(0)" onClick={this.toNextPage.bind(this)}>下一页</a></div>
                            </div>:null}

                        </div>
                    </div>
                </div>
                <div id="fade" className="black_overlay"></div>
                <div className="rbag" id="j-logn" style={{display:'none'}}>
                    <a  href="javascript:void(0)" className="close" data-key="lognClose" onClick={this.jLognHide} className="close" data-key="lognClose"></a>
                    <div className="cont">
                        <p><input className="txt" type="text" name="username2" id="username2" placeholder="请输入会员账号" /></p>
                        <button className="btn" type="button" onClick={this.loginClick.bind(this)} name="button2">立即领取</button>
                    </div>
                </div>
                {/*<!-- 拆红包 -->*/}
                <div className="packet" id="j-packet" ref="hongBaoWrap">
                    <a className="packet-close" href="javascript:void(0)"></a>
                    <div className="packet-1" ref="pullDoneHongBao">
                        <div className="packet-t">
                            <div className="pic">
                                {
                                    (()=>{
                                        let url = '';
                                        if(config.spec=='xhtd-xhtd'){
                                            url = 'p-logo-xhtd'
                                        }
                                        else if(config.spec=='pufa-ppp'){
                                            url = 'p-logo-ppp'
                                        }
                                        else if(config.spec=='ldgj-kyy'){
                                            url = 'p-logo-kyy'
                                        }
                                        else if(config.spec=='jhgj-jjh'){
                                            url = 'p-logo-jjh'
                                        }
                                        else{
                                            url = 'p-logo'
                                        }
                                        return <img src={require(`../images/${url}.png`)} alt="" />
                                    })()
                                }
                            </div>
                            <h3>{appName}</h3>
                            <div id="hb_count" className="num">
                                您还有 <span>9997</span> 次机会
                            </div>
                        </div>
                        <div className="packet-copy">
                            {appName}
                        </div>
                        <a className="packet-open" onClick={startGame.bind(this,this.refs.pullDoneHongBao,this.refs.getHongBaoWindow,this.refs.hongBaoWrap,this.refs.getHongBaoNum)}>拆红包</a>
                    </div>
                    <div className="packet-2" ref="getHongBaoWindow">
                        <div className="pannel">
                            <div className="pic">
                                {
                                    (()=>{
                                        let url = '';
                                        if(config.spec=='xhtd-xhtd'){
                                            url = 'p-logo-xhtd'
                                        }
                                        else if(config.spec=='pufa-ppp'){
                                            url = 'p-logo-ppp'
                                        }
                                        else if(config.spec=='ldgj-kyy'){
                                            url = 'p-logo-kyy'
                                        }
                                        else if(config.spec=='jhgj-jjh'){
                                            url = 'p-logo-jjh'
                                        }
                                        else{
                                            url = 'p-logo'
                                        }
                                        return <img src={require(`../images/${url}.png`)} alt="" />
                                    })()
                                }
                            </div>
                        </div>
                        <h3>恭喜发财，大吉大利!</h3>
                        <div id="hb_money" className="num" ref="getHongBaoNum">
                            <span>88</span>元
                        </div>
                        <div className="packet-copy">
                            {appName}
                        </div>
                    </div>
                </div>
                <div className="packet-bg" id="j-packet-bg"></div>
            </div>
        )
    }
}


export default (Content)
