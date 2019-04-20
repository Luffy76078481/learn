var __PRIZE = {
    lev10: [56, 86],
    lev1: [0, 14],
    lev2: [20, 50],
    lev3: [308, 338],
    lev4: [236, 266],
    lev5: [200, 230],
    lev6: [272, 302],
    lev7: [164, 194],
    lev8: [128, 158],
    lev9: [92, 122],
}
var bRotate = false;
var isClick = false;
function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}
$(function () {
    $('#lotteryBtn').click(function () {
        checkUser();
    })
    lotterylist(1, marquee);
});
function checkUser(){
    var _username = $("#username").val();
    if(_username == ""){
        msgBox('温馨提示', '输入会员帐号不能为空!');
        return false;
    }
    $.ajax({
        url: '/api/v0/Lucky/GetCount?',
        dataType: 'json',
        cache: false,
        type: 'GET',
        headers:{
            "Content-Type": "application/json"
        },
        data: {LuckyNo: "LuckyMoney",username: _username},
        success: function(result){
            console.log(result)
            if(result.StatusCode == 0){
                if(result.Count>0){
                    // 转盘开转
                   startGame();
                }else{
                    msgBox('温馨提示', '您的机会已经用完啦!');
                    bCode = "";
                }
            }else{
                msgBox('温馨提示', result.Message);
            }
        }
    });
}
var rotateN = 0;
function rotateZhuanpan(grade, cb){
    if(grade == 0){
        grade = 9
    }
    rotateN += Math.floor(Math.random()*7 + 3)*360  ;
    var rotate = rotateN + (grade-1)*36;//
    $("#dazhuanpan").css("transform", "rotate("+ rotate +"deg)")
    setTimeout(function(){cb()}, 6000);
}
// 开始游戏
function startGame(){
    if(isClick){
        return;
    }
    var _username = $("#username").val();
    if(_username == ""){
        msgBox('温馨提示', '输入会员帐号不能为空!');
        return false;
    }
    isClick =  true;
    // 抽奖返回数据
    $.ajax({
        url: '/api/v0/Lucky/Draw',
        dataType: 'json',
        cache: false,
        type: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        data: JSON.stringify({LuckyNo: "LuckyMoney",username: _username}),
        success: function (obj) {
            if(obj.StatusCode == 0){
                console.log(obj)
                if(obj.Winning == true){
                    resultMsg = isNaN(obj.Prize) ? obj.Prize : obj.Prize + "元";
                    rotateZhuanpan(parseInt(obj.PrizeGrade), function(){
                        msgBox("恭喜您获得", resultMsg);
                        isClick = false;
                    })
                }
                if(obj.Winning == false){
                    rotateZhuanpan(parseInt(obj.PrizeGrade), function(){
                        msgBox('温馨提示', '很抱歉，本次未中奖!');
                        isClick = false;
                    });

                }
            }else{
                msgBox('温馨提示', obj.Message);
                isClick = false;
            }

        },
        failure: function () {
            //api请求失败处理
            isClick = false;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            var x = 1;
            msgBox('温馨提示', '网络故障,请联系管理员');
            isClick = false;
        }
    })
}
	
function msgBox(_title, _content) {
    art.dialog({
        id: 'xymf_box',
        title: _title,
        width: 300,
        height: 120,
        content: _content,
        ok: function () {
            this.close();
        },
        close: function () {
        },
        okVal: '确定',
        lock: true
    })
}

function rotateFn(awards, angles, txt) {
    $('.rotate-bg').stopRotate();
    $('.rotate-bg').rotate({
        angle: 0,
        animateTo: angles + 1800,
        duration: 8000,
        callback: function () {
            bRotate = false;
            msgBox('温馨提示', txt);
            lotterylist(marquee);
        }
    });
}

function logBox() {
    var sHtml = '<div style="text-align:right;"><br/>会员帐号：<input id="login-na" type="text" value="" />' + '<br /></div>';
    art.dialog({
        id: 'xymf_box_code',
        title: '请先输入会员帐号',
        content: sHtml,
        width: 360,
        height: 120,
        lock: true,
        ok: function () {
            var _bonuscode = $("#login-na").val();
            if (_bonuscode == "") {
                alert("会员帐号不能为空!");
                return false
            }
            bCode = _bonuscode;
            var _obj = this;
            $.ajax({
                url: 'ajax.php?action=check',
                dataType: 'json',
                cache: false,
                type: 'POST',
                data: {
                    bonuscode: bCode
                },
                success: function (obj) {
                    switch (obj.stat) {
                        case '-1':
                            alert('您输入的会员帐号不能为空!');
                            break;
                        case '-2':
                            alert('您输入的会员帐号不存在!');
                            break;
                        case '0':
                            alert('验证成功，您有' + obj.score + '次抽奖机会!');
                            _obj.close();
                            break;
                        default:
                            alert('网络错误,请稍后再抽奖');
                            break
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    var x = 1
                }
            });
            return false
        },
        okValue: '确定',
        cancel: function () { }
    })
}

// 所有中奖者
function lotterylist(page, callback) {
    $.ajax({
        url: '/api/v0/Lucky/GetWinners?',
        dataType: 'json',
        cache: false,
        headers:{
            "Content-Type": "application/json"
        },
        data : JSON.stringify({"username":"", pageNo: page, pageSize: 10}),
        type: 'GET',
        success: function (obj) {
            callback(obj);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {

        }
    })
}
// 中奖名单滚动
function marquee(obj) {
    if(obj.List && obj.List.length > 0){
        var sAwardEle = ""
        $.each(obj.List, function (i, award) {
            let userName = award.User.UserName; //用户名
            userName = userName.substr(0, 1) + '***' + userName.substr(4, userName.split('').length); // 过滤名字
            sAwardEle += '<li>恭喜&nbsp;' + userName + '&nbsp;抽中&nbsp;' + award.LuckyItem.Prizes + '</li>';
        });
        $(".infoList").html(sAwardEle);
        jQuery(".list").slide({ mainCell: ".bd ul", autoPlay: true, effect: "topMarquee", vis: 5, interTime: 50, trigger: "click" });
    }
}
// 查询，如果未登录提示登录
function queryBtn() {
    // querycode 输入的查询账号
    var _bonuscode = $("#querycode").val();
    if (_bonuscode == "") {
        alert("输入会员帐号不能为空!");
        return false;
    }
    queryPage(1);
}

var pagesize = 5;
// 查询中奖名单数据
function queryPage(page){
    console.log(page)
    $.ajax({
        url: '/api/v0/Lucky/GetWinners?',
        dataType: 'json',
        cache: false,
        headers:{
            "Content-Type": "application/json"
        },
        data : {UserName:$("#querycode").val(), PageIndex: page, pageSize: pagesize},
        type: 'GET',
        success: function (obj) {
            if(obj.List && obj.List.length > 0){
                var sHtml1 = "";
                var str;
                $.each(obj.List, function(i,award){
                    if(award.CreateTime.indexOf('T')){
                        var $index = award.CreateTime.indexOf('T');
                        var time1 = award.CreateTime.substr(0,$index)
                        var time2 = award.CreateTime.substr($index+1,award.CreateTime.length-2)
                        str = time1 + ' ' + time2
                    }
                    sHtml1 +="<tr><td>"+award.LuckyItem.Prizes+"</td><td>"+str+"</td><td>"+(award.Status?'已派彩':'未派彩')+"</td></tr>";
                })
                var sPage = Paging(page, pagesize, obj.Count, 2, "queryPage",'','','上一页','下一页');
                $(".quotes").html(sPage);
                $("#query_content").html(sHtml1);
            }else{
                $("#query_content").html("<tr><td colspan='3'>未找到相关信息</td></tr>");
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            var x = 1;
        }
    })

}
// 中奖列表生成
function Paging(pageNum,pageSize,totalCount,skipCount,fuctionName,currentStyleName,currentUseLink,preText,nextText,firstText,lastText){
	    var returnValue = "";
	    var begin = 1;
	    var end = 1;
	    var totalpage = Math.floor(totalCount / pageSize);
	    if(totalCount % pageSize >0){
	        totalpage ++;
	    }	   
	    if(preText == null){
	        firstText = "prev";
	    }
	    if(nextText == null){
	        nextText = "next";
	    }

	    begin = pageNum - skipCount;
	    end = pageNum + skipCount;
	    if(begin <= 0){
	        end = end - begin +1;
	        begin = 1;
	    }
	    if(end > totalpage){
	        end = totalpage;
	    }
	    for(count = begin;count <= end;count ++){
	        if(currentUseLink){ 
	            if(count == pageNum){
	                returnValue += "<a class=\""+currentStyleName+"\" href=\"javascript:void(0);\" onclick=\""+fuctionName+"("+count.toString()+");\">"+count.toString()+"</a> ";
	            }
	            else{
	                returnValue += "<a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + count.toString() + ");\">" + count.toString() + "</a> ";
	            }
	        }
	        else {
	            if (count == pageNum) {
	                returnValue += "<span class=\""+currentStyleName+"\">"+count.toString()+"</span> ";
	            }
	            else{           
	                returnValue += "<a href=\"javascript:void(0);\" onclick=\""+fuctionName+"("+count.toString()+");\">"+count.toString()+"</a> ";}
	            }
	        }
	        if(pageNum - skipCount >1){
	          returnValue = " ... "+returnValue;
	        }
	        if(pageNum + skipCount < totalpage){
	            returnValue = returnValue + " ... ";
	        }
	        if(pageNum > 1){
	            returnValue = "<a href=\"javascript:void(0);\" onclick=\""+fuctionName+"("+(pageNum - 1).toString()+");\"> " + preText + "</a> " + returnValue;
	        }
	        if(pageNum < totalpage){
	            returnValue = returnValue + " <a href=\"javascript:void(0);\" onclick=\""+fuctionName+"("+(pageNum+1).toString()+");\">" + nextText + "</a>";
	        }
	        if(firstText!= null){
	            if(pageNum >1){
	                returnValue = "<a href=\"javascript:void(0);\" onclick=\""+fuctionName+"(1);\">" + firstText + "</a> " + returnValue;}
	        }
	        if(lastText !=null){
	            if(pageNum < totalpage){
	                returnValue = returnValue + " " + " <a href=\"javascript:void(0);\" onclick=\""+fuctionName+"("+totalpage.toString()+");\">" + lastText + "</a>";}
	        }
	        return returnValue;
	}
