	$(window).scroll(function(){
		if($(window).scrollTop()>275){
			$('.helpc_mainnav2').css({"top":"40%"});
		}else{
			$('.helpc_mainnav2').css({"top":"70%"});
		}

		if($(window).scrollTop() < 600){
			$(".helpc_mainnav2").stop().animate({"marginTop": ($(window).scrollTop()) + "px"}, "slow" );
		}else{
			$(".helpc_mainnav2").stop().animate({"marginTop": ($(window).scrollTop() - $('.helpc_mainnav2').height()) + "px"}, "slow" );
		}

	});

	function changeStyle(element){
		$('.helpc_mainnav2').find('a').removeClass('helpc_maincircle1select');
		$(element).addClass('helpc_maincircle1select');
	}

	function backToTop() {
		$('html,body').animate({
			scrollTop : 0
		}, 700);
		$('.helpc_mainnav2').find('a').removeClass('helpc_maincircle1select');
	}

	//<![CDATA[
		window.lpTag=window.lpTag||{};if(typeof window.lpTag._tagCount==='undefined'){window.lpTag={site:'25507734',section:lpTag.section||'',autoStart:lpTag.autoStart===false?false:true,ovr:lpTag.ovr||{},_v:'1.5.1',_tagCount:1,protocol:location.protocol,events:{bind:function(app,ev,fn){lpTag.defer(function(){lpTag.events.bind(app,ev,fn)},0)},trigger:function(app,ev,json){lpTag.defer(function(){lpTag.events.trigger(app,ev,json)},1)}},defer:function(fn,fnType){if(fnType==0){this._defB=this._defB||[];this._defB.push(fn)}else if(fnType==1){this._defT=this._defT||[];this._defT.push(fn)}else{this._defL=this._defL||[];this._defL.push(fn)}},load:function(src,chr,id){var t=this;setTimeout(function(){t._load(src,chr,id)},0)},_load:function(src,chr,id){var url=src;if(!src){url=this.protocol+'//'+((this.ovr&&this.ovr.domain)?this.ovr.domain:'lptag.liveperson.net')+'/tag/tag.js?site='+this.site}var s=document.createElement('script');s.setAttribute('charset',chr?chr:'UTF-8');if(id){s.setAttribute('id',id)}s.setAttribute('src',url);document.getElementsByTagName('head').item(0).appendChild(s)},init:function(){this._timing=this._timing||{};this._timing.start=(new Date()).getTime();var that=this;if(window.attachEvent){window.attachEvent('onload',function(){that._domReady('domReady')})}else{window.addEventListener('DOMContentLoaded',function(){that._domReady('contReady')},false);window.addEventListener('load',function(){that._domReady('domReady')},false)}if(typeof(window._lptStop)=='undefined'){this.load()}},start:function(){this.autoStart=true},_domReady:function(n){if(!this.isDom){this.isDom=true;this.events.trigger('LPT','DOM_READY',{t:n})}this._timing[n]=(new Date()).getTime()},vars:lpTag.vars||[],dbs:lpTag.dbs||[],ctn:lpTag.ctn||[],sdes:lpTag.sdes||[],ev:lpTag.ev||[]};lpTag.init()}else{window.lpTag._tagCount+=1}
	//]]>

	function clickChineseLiveChat() {
		//alert("clickChineseLiveChat");
		//alert("clickChineseLiveChat"+$("#lpButDivID-1488867972182").find("a").html());
		$("#lpButDivID-1488867972182").find("a").click();
	}

	function displayLiveChatWindow() {
		clickChineseLiveChat();
//		window.open('http://server.iad.liveperson.net/hc/25507734/?cmd=file&amp;file=visitorWantsToChat&amp;site=25507734&amp;imageUrl=http://server.iad.liveperson.net/hcp/Gallery/ChatButton-Gallery/English/General/1a/&amp;referrer=http%3A//co',
//				'_blank','height=550,width=800,top='+ (screen.height - 550)/ 2
//				+ ',left=' + (screen.width - 800)/ 2
//				+ ',toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no');
}
