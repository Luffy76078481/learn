$(function () {
    $('[name=top_livechat]').bind('click', openLiveChat);
});
function openLiveChat() {
    var charUrl = 'https://f88.live800.com/live800/chatClient/chatbox.jsp?companyID=684931&configID=137043&jid=6800595120&lan=zh&subject=%E5%92%A8%E8%AF%A2&prechatinfoexist=1';
    var chat = window.open(charUrl, 'service', 'width=1100,height=900,toolbar=0,resizable=1,location=no');
    return chat;
}