import React, { Component } from 'react';
import { connect } from 'react-redux'
import {config} from "globalConfig";
import {Toast,NoticeBar} from "antd-mobile";
import {browserHistory} from "react-router";
import "./TopBar.scss";

class TopBar extends Component{
    constructor(props){
        super(props);
        this.state={
            strURL:"game.tmg8888.com",// Ping的网址
            intTimeout:3000,// 每过多少秒检测一次延迟
            intStartTime:0, // 初始时间
            intTimerID:0, // 定时器
            objIMG:new Image(),// 图片对象 
            isFull:false,
            pingVal:0,
        }
    }
    // 变量取反
    setVariable = (d) => {
        this.setState({
            [d]: !this.state[d],
        });
    }
    // 信号
    signalRender(strength){
        let ret =[]
        for(let i=1;i<5;i++){
            if(i<(strength+1)){
                ret.push(
                    <div className={"signal"+i+" active"} key={'signal'+i}></div>
                )                
            }
            else{
                ret.push(
                    <div className={'signal'+i} key={'signal'+i}></div>
                )   
            }
        }
        return ret;
    }
    // ping 检测PING值
    checkPing(){
        let _this = this;
        _this.state.objIMG.onload = _this.state.objIMG.onerror = function () {
            //有回应,取消超时计时
            clearTimeout(_this.state.intTimerID);
            var delay = new Date() - _this.state.intStartTime;
            _this.println(_this.state.strURL +" time" +((delay < 1) ? ("<1") : ("=" + delay)) + "ms",delay);
            // 每次请求间隔限制在2秒以上
            _this.state.intTimerID = setTimeout(ping, delay < 3000 ? (3000 - delay) : 3000);
        }
        function ping() {
            // 请求
            _this.state.intStartTime = +new Date();
            _this.state.objIMG.src = _this.state.strURL + "/" + _this.state.intStartTime;
            // 超时
            _this.state.intTimerID = setTimeout(timeout, _this.state.intTimeout);
        }
        function timeout() {
            _this.state.objIMG.src = "X:\\";
            ping();
        }
        ping()
    }
    // 打印延迟毫秒
    println(str,delay){
        let ms;
        switch(true){
            case delay < 100:
            ms = 4;
            break;
            case delay < 300 && delay > 101:
            ms = 3;
            break;
            case delay < 500 && delay > 301:
            ms = 2;
            break;
            case delay > 501:
            ms = 1;
            break;
        }   
        this.setState({
            pingVal:ms
        })
    }
    // 获得PING
    componentDidMount(){
        this.checkPing();    
    }
    // 消除定时器
    componentWillUnmount(){
        clearTimeout(this.state.intTimerID);
        // this.setState = (state,callback)=>{
        //     return;
        // };  
    }
    // 全屏模式
    launchFullscreen(element){
        const fullscreen = window.Util.launchFullscreen(element)
        if(!fullscreen){
            Toast.loading('部分浏览器可能无法开启全屏模式，请使用自带浏览器开启全屏功能！');
        }
        this.setVariable("isFull")
    }
    // 退出全屏模式
    exitFullscreen(){
        window.Util.exitFullscreen();
        this.setVariable("isFull")
    }
    //公告渲染
    renderNotice(){
        let notice=[];
        this.props.notices.forEach((item,index)=>(
            notice.push(
                <span key={index}>{item.Content} </span>
            )
        ))
        return notice;
    }
    // 客服
    serviceOpen(){
        if(config.isApp){
            window.Util.appOpen(this.props.remoteSysConfs.online_service_link)
        }else{
            window.open(this.props.remoteSysConfs.online_service_link,'_blank');
        }
    }
    // 返回页面
    backHome(){
        this.props.showBackButton()
    }
    render(){
        const UserBar = window.r.get("User");
        let notice = this.renderNotice();
        return (
            <div className = "topBar">
                {this.props.isFirst?<UserBar/>:<div className='backHome' onClick={this.backHome.bind(this)}></div>}
                <div className="topMiddle" onClick={()=>{ window.actions.showChessModal(true,"hd","yxgg","10rem","6.5rem")}}>
                    <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                        {notice}
                    </NoticeBar>

                </div>
                <div className ="setting">
                     <div className="signal" ref='signal'>
                        {this.state.pingVal?this.signalRender(this.state.pingVal):null}
                    </div>
                    <div className='rinima'>
                        <div className = "fullScreen" onClick = {!this.state.isFull?this.launchFullscreen.bind(this,document.documentElement):this.exitFullscreen.bind(this)}></div>
                        <div className = "message animate_shake" onClick={()=>{window.actions.showChessModal(true,"xx","","9rem","6rem")}}></div>
                        <div className="service animate_shake" onClick={this.serviceOpen.bind(this)}></div>
                        <div className = "setUp animate_shake" onClick={()=>{window.actions.showChessModal(true,"sz","","8rem","5.5rem")}}></div>                        
                    </div>


                </div>                  
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        notices:state.notices,
        remoteSysConfs:state.remoteSysConfs
    }
)

export default connect(mapStateToProps)(TopBar)