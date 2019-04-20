/**
 * Created by 2015130 on 2015/3/15.
 */
function judge(){
    var $infoinput = $(".info-input"),
        partnerVal = $infoinput.val().trim(),
        uid = 1,
        closeTime = 1500,
        $userinfoPs = $(".pis-text");
    if(partnerVal == ""){
        $infoinput.css("border-color","#ff6600");
        return false;
    }else{
        if($("#empower").attr("checked") == "checked"){
            $.ajax({
                url: '/admin/getinfo.php',
                type: 'POST',
                data: {
                    'uid': uid,
                    'partnerName': partnerVal
                }
            })
            .done(function(resp) {
                if(resp == "1"){
                    $infoinput.val("");
                    $(".pis-text").html('激活成功').fadeIn("slow",function(){
                        delay(closeTime, function () {
                            $userinfoPs.fadeOut(1500);
                        });
                    });
                }else{
                    $(".pis-text").html("激活失败！").fadeIn("slow",function(){
                        delay(closeTime, function () {
                            $userinfoPs.fadeOut(1500);
                        });
                    });
                }
            })
            .fail(function() {
                console.log("error");
            });
            return false;
        }else{
            $("#empower").focus();
            return false;
        }
    }
}

/*咨询信息*/
function userinfo(){
    var $userinfoPs = $(".pis-text"),
        username = $("#username").val(),
        userphone = $("#userphone").val(),
        usermail = $("#usermail").val(),
        usertime = $("#usertime").val(),
        remarks = $("#remarks").val(),
        uid = 2,
        closeTime = 1500,
        reg = /^1\d{10}$/,
        reg2 = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    if(!reg.test(userphone)){
        $(".pis-text").html("手机号不合法！").fadeIn("slow",function(){
            delay(closeTime, function () {
                $userinfoPs.fadeOut(1500);
            });
        });
        return false;
    }
    if(!reg2.test(usermail)){
        $(".pis-text").html("邮箱不合法！").fadeIn("slow",function(){
            delay(closeTime, function () {
                $userinfoPs.fadeOut(1500);
            });
        });
        return false;
    }
    if(username == "" || userphone == ""){
        $(".pis-text").html("填写必填信息！").fadeIn("slow",function(){
            delay(closeTime, function () {
                $userinfoPs.fadeOut(1500);
            });
        });
        return false;
    }

    $.ajax({
        url: '/admin/getinfo.php',
        type: 'POST',
        data: {
            'uid': uid,
            'username': username,
            'userphone' : userphone,
            'usermail' : usermail,
            'usertime' : usertime,
            'remarks' : remarks
        }
    })
    .done(function(resp) {
        if(resp == "1"){
            $(".form_left input").val("");
            $(".form_left textarea").val("");
            $(".pis-text").html('提交成功').fadeIn("slow",function(){
                delay(closeTime, function () {
                    $userinfoPs.fadeOut(1500);
                });
            });
        }else{
            $(".pis-text").html("提交失败！").fadeIn("slow",function(){
                delay(closeTime, function () {
                    $userinfoPs.fadeOut(1500);
                });
            });
        }
    })
    .fail(function() {
        console.log("error");
    });
    return false;
}

function delay(t, callback) {
    return window.setTimeout(function () {
        callback();
    }, t);
}

$(function(){
    $("#empower").on("click",function(){
        console.log($(this).attr("checked"));
        if($(this).attr("checked") == "checked"){
            $(this).attr("checked",false);
        }else{
            $(this).attr("checked",true);
        }
    });
    /*判断屏幕大小*/
    var WeightP = $(window).width();
    if(WeightP > 1688){
        $(".add").css("background-size","100%");
    }
});
