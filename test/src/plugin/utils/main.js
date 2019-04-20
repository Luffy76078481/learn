/**
 * 方法
 */
window.Util = {
    /*初始化函数*/
    init : function () {
        var me = this;
        /*当前时间*/
        if ($("#clock").length > 0) {
            setInterval("Util.updatedate()", 1000);
        }
        /*data*/
        $('span[isnum=true]').attr('now', '0');
        $('span[isnum=true]').each(function (index, element) {
            var thisrel = parseInt($(this).attr('rel'));
            var thistime = parseInt(thisrel / 300);
            if ($(this).attr('isdate') == 'true') {
                thistime = thisrel / 200;
            }
            $(this).attr('time', thistime + 1);
        }).each(function (index, element) {
            me.time($(this), $(this).attr("type"), '天', '时', '分', '秒', false);
        });

    },
    b64EncodeUnicode:(str)=>{//base64转码
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    },
    b64DecodeUnicode:(str)=>{//base64解码
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    },
    /**/
    formatTime:function(date){
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
    },
    /*转换.net接口返回的时间格式*/
    formatNetTime:function(time){
        time = time.split('.')[0].replace('T',' ').replaceAll('-','/');
        return time;
    },
    /*当前时间*/
    updatedate: function () {
        var dd1 = new Date();
        var tgetMonth = dd1.getMonth()+1,
            tdate = dd1.getDate(),
            tmin = dd1.getHours(),
            minutes = dd1.getMinutes(),
            Seconds = dd1.getSeconds();
        if (tdate < 10) {
            tdate = "0" + tdate;
        }
        if (tmin < 10) {
            tmin = "0" + tmin;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (Seconds < 10) {
            Seconds = "0" + Seconds;
        }
        $("#clock").html(tgetMonth+"-"+tdate+" "+tmin + ":" + minutes + ":" + Seconds + " GMT+8");
    },

    /*获取当前网站的host域名*/
    getHost(str){
        return window.location.host+str;
    },
    /*获取当前时间day=-1前一天，day=1后一天*/
    getNowDate(day){
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
    },
    appOpen(link,openPlus=false){
        if (openPlus) {
            // ▲▲▲▲▲▲调用原生浏览器打开页面
            window["plus"].runtime.openURL(location.protocol+"//"+location.host+ link);
            // AndroidJs.goGame(location.protocol+"//"+location.host+ link)
        } else {
            // ▲▲▲▲▲▲调用原生浏览器打开页面
            window["plus"].runtime.openURL(link);
        }
    },
    /**/
    windowOpen(name="_blank"){
        let newOpenObj = window.open('/gameUrlLoading.html','_blank');
        newOpenObj.urlError = function(message){
            let r =newOpenObj.confirm(message+'！是否要关闭窗口？');
            if(r){
                newOpenObj.close();
            }
        }
        return newOpenObj;
    },     
    /*奖池函数*/
    time : function(obj, type, TitleResourceDay, TitleResourceHour, TitleResourceMinute, TitleResourceSecond,jackpost) {
        var me = this;
        var thisrel = parseFloat(obj.attr('rel'));
        var thisnow = parseInt(obj.attr('now'));
        var isjackpot = obj.attr('isjackpot');
        thisnow += parseInt(obj.attr('time'));
        if (thisnow >= thisrel) {
            thisnow = thisrel;
            if(isjackpot){
                me.addJackpot(obj,1000);
            }
        } else {
            setTimeout(function (obj) {
                return function () {
                    me.time(obj, type, TitleResourceDay, TitleResourceHour, TitleResourceMinute, TitleResourceSecond, jackpost);
                }
            }(obj), 10);
        }
        obj.attr('now', thisnow);
        if (obj.attr('isdate') == 'true') {
            var tstr = '';
            if (thisnow >= 60 * 60 * 24) {
                var day = parseInt(thisnow / (60 * 60 * 24));
                tstr += day + TitleResourceDay;
                var hour = thisnow % (60 * 60 * 24);
                var mint = parseInt(hour / (60 * 60));
                if (mint > 0)
                    tstr += mint + TitleResourceHour;
                var sec = hour % (60 * 60);
                if (sec > 0)
                    tstr += sec + TitleResourceMinute;
                var h = parseInt(sec / (60));
                if (h > 0)
                    tstr += h + TitleResourceSecond;
            }
            else if (thisnow >= 60 * 60) {
                var mint = parseInt(thisnow / (60 * 60));
                if (mint > 0)
                    tstr += mint + TitleResourceHour;
                var sec = hour % (60 * 60);
                if (sec > 0)
                    tstr += sec + TitleResourceMinute;
                var h = parseInt(sec / (60));
                if (h > 0)
                    tstr += h + TitleResourceSecond;
            }
            else if (thisnow >= 60) {
                var sec = parseInt(thisnow / (60));
                if (sec > 0)
                    tstr += sec + TitleResourceMinute;
                var h = thisnow % (60)
                if (h > 0)
                    tstr += h + TitleResourceSecond;
            } else {
                tstr = thisnow + TitleResourceSecond;
            }
            obj.html(tstr);
        }
        else {
            obj.html(me.fmoney(thisnow, 2, type));
        }
    },
    /*格式化金额*/
    fmoney : function(s, n, type) {
        var me = this;
        if (typeof type != "undefined") {
            if (type == "currency") {
                n = 2;
                s = "￥" + me.numberWithCommas(parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "", n);
            } else if (type == "integer") {
                n = 0;
                s = me.numberWithCommas(parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "", n);
            }
        }else {
            n = 0;
            s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        }
        return s;
    },
    /*奖池金额*/
    numberWithCommas : function(x, fix) {
        var me = this;
        var value = parseFloat(x).toFixed(fix);
        if (isNaN(value)) return x;
        var tmp = value.toString().split(".");
        value = tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (tmp.length > 1) {
            if (fix > 0) {
                tmp[1] = tmp[1].substring(0, fix);
            }
            value += "." + tmp[1];
        }
        else if (fix > 0) {
            value += ".";
            for (var i = 0; i < fix; i++) {
                value += "0";
            }
        }
        return value;
    },
    /*奖池定时器*/
    addJackpot : function(className,time){
        setInterval(function(){
            var thisNum = Number(className.text().replace(/,/g,"")) + Util.GetRandomNum(1,6),
                thisNum = thisNum.toString(),
                $strval = Util.splitStringVal(thisNum);
            className.html($strval);
        }, time);
    },
    /*随机数*/
    GetRandomNum : function(Min,Max){
        var Range = Max - Min;
        var Rand = Math.random();
        return(Min + Math.round(Rand * Range));
    },
    /*格式化金额1000=1,000*/
    splitStringVal : function(val){
        return val.split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('')
    },
    /*收藏本站*/
    AddFavorite : function(title,favoriteUrl) {
        var url = favoriteUrl?favoriteUrl: window.location.origin;
        try {
            window.external.addFavorite(url, title);
        }
        catch (e) {
            try {
                window.sidebar.addPanel(title, url, "");
            }
            catch (e) {
                // xhtd收藏本站内容
                if(window.config.spec == "xhtd-xhtd"){
                    swal({
                        title: "新濠天地",
                        text: "请使用Ctrl+D快捷键进行收藏",
                        confirmButtonColor: "#c5841f",
                        confirmButtonText: "确认",

                })}
                else{
                    swal("抱歉，您所使用的浏览器无法完成此操作。","加入收藏失败，请使用Ctrl+D进行添加");
                }
                
            }
        }
    },
    /*首页初始化*/
    index : function() {
        var bingo = $(".content-bingo-list");
        bingo.owlCarousel({
            items:1,
            dots:false,
            loop:true
        });

        $(".content-bingo-title a").hover(function(){
            var num = $(this).index(".content-bingo-title a");
            $(this).addClass("active").siblings().removeClass("active");
            bingo.trigger('next.owl.carousel', num);
        });
    },
    // 全屏模式
    launchFullscreen:function(element){
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } 
        else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } 
            else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } 
        else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        else{
            return false
        }
        window.Util.changeOrientation();
        return true;
    },
    // 退出全屏模式
    exitFullscreen(){
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } 
        else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } 
        else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        window.Util.changeOrientation();
    },
    // 棋牌包网rem换算
    convertPixel:function(){
        const _html = document.getElementsByTagName("html")[0];
        const orientation = window.orientation;   
        switch(orientation){
            case 90:
            case -90:
                DoConvertPixel(false)
            break;
            default:
                DoConvertPixel(true)
            break;
        } 
        function DoConvertPixel(type){
            setTimeout( ()=>{
                let width = document.documentElement.clientWidth;
                let height =  document.documentElement.clientHeight;
                let devicePixelRatio = type?(height/width):(width/height); // 屏幕宽高率
                let whichSide = type?height:width; // 竖屏用高度计算，横屏用宽度计算
                // iphoneX 812*375
                if(devicePixelRatio>2){
                    _html.style.fontSize = whichSide/13.34*0.9 +"px";
                }
                else if(devicePixelRatio>1.8){
                    _html.style.fontSize = whichSide/13.34*0.85 +"px";
                }
                else{
                    _html.style.fontSize = whichSide/13.34 +"px"; 
                }       
            },300)                
        }
        // 执行横竖屏判断
        if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) != 0){ 
            window.Util.changeOrientation()
        } 
    },
    // 横竖屏监听
    changeOrientation:function(ele){
        const orientation = window.orientation; 
        let $rotatingPage;
        if(ele) $rotatingPage=ele
        else $rotatingPage = document.getElementById("rotatingPage")
        switch(orientation){
            case 90:
            case -90:
                DoChangeOrientation(0)
            break;
            default:
                DoChangeOrientation(1)
            break;
        }
        function DoChangeOrientation(val){
            setTimeout( function(){
                let style = "";
                let width = document.documentElement.clientWidth;
                let height =  document.documentElement.clientHeight; 
                if(val){
                    //竖屏
                    style += "width:" + height + "px;";
                    style += "height:" + width + "px;";
                    style += "top:" + (height-width)/2 +"px;";
                    style += "left:" + -(height-width)/2 + "px;";
                    style += "-webkit-transform: rotate(90deg); transform: rotate(90deg);";
                    style += "transform-origin: 50% 50%";
                }   
                else{
                    style += "width:" + width + "px;";
                    style += "height:" + height + "px;";
                    style += "top:" + 0 + "px;";
                    style += "left:" + 0 + "px;";
                    style += "transform:" + "none";
                    style += "transform-origin:" + "50% 50%";
                }
                $rotatingPage.style = style;
            },300)                
        }
    }
}
window.Util.init();


