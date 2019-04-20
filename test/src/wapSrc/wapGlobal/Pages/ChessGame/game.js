import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Toast, Modal} from 'antd-mobile';
import {config} from "globalConfig";
import './game.scss';
require("../../../../plugin/libs/owl.carousel/owl.carousel.min.css")
require("../../../../plugin/libs/owl.carousel/owl.carousel")

class Arcade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentList:[], // 游戏数据
            categoresData:this.props.categoresData// 父组件传入的游戏类型
        };
    }
    // 滚动插件
    renderOwl(selector, config){
        var owl = $(selector);
        if (owl.children().length <= 0) {
            return;
        }
        owl.addClass('owl-carousel').owlCarousel(config);
        return owl;        
    }
    initAll() {
        this.renderOwl(this.refs.plist, {
            items: this.props.categoresData.ID.indexOf("YOPLAY")!=-1?5:(this.props.categoresData.ID.indexOf("FISH")!=-1?3:4),
            responsiveRefreshRate:100,//每 200 毫秒检测窗口宽度并做相应的调整，主要用于响应式
            //loop: true,
            dots: false, // 不显示圆点导航
            nav: true, // 按键
            navText: ['', ''], // 按键内容
            //autoplay: true,
            //autoplayHoverPause: true, // 触摸暂停
            //autoplayTimeout: 3000 // 自动播放时间
        });
    }
    componentDidMount(){
        this.getGameRender()
    }
    // 选择游戏种类
    getGameRender(){
        let item = this.state.categoresData;// 父组件
        let _this = this;
        this.props.wapCategory.id=item.ID;
        let filter={};
        filter.GameMarks = item.MarkIds;
        filter.GamePlatform = item.PlatformIds;
        filter.GameType =item.GameType-0?item.GameType:"";//因爲可能會返回字符串“0”
        if(item.ID == "YOPLAY"){
            filter.GameMarks = "";
            filter.GamePlatform = "";
            filter.GameType =4;
            filter.YoPlay =1;
        }
        filter.TerminalType="Mobile";
        Toast.loading('获取游戏数据中,请稍后...');
        new window.actions.ApiQueryGamesAction(filter,1,20).fly(resp=>{
            Toast.hide();
            if(resp.StatusCode ==0){
                _this.setState({
                    contentList:resp.Page
                })
            }
            else{
                Modal.alert('获取数据失败!',resp.Message) // 消息框
            }

        })
      
    }
    // 跳转游戏
    toPlayGame(game){
        this.getGameUrl(game)
    }
    getGameUrl(game,TransferFlag=false){
        let parma = {
            GamePlatform:game.GamePlatform,
            GameType:game.GameTypeText,
            GameId:game.GameIdentify,
            IsMobile:true,
            IsDemo:false,
        }
        Toast.loading('游戏地址获取中...',300)
        let windowOpen;
        if(!config.isApp){
            windowOpen = window.Util.windowOpen('Game');
        }
        new window.actions.ApiGetLoginUrl(parma,'(mobile)',TransferFlag).fly(res=>{
            Toast.hide();
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                if(TransferFlag){
                    new window.actions.ApiPlayerInfoAction().fly();
                    new window.actions.ApiGamePlatformAllBalanceAction().fly();
                }
                if(!config.isApp){
                    windowOpen.location.href= gameLink;
                }else{
                    window.Util.appOpen(gameLink)
                }
            }
            else{
                if(!config.isApp){
                    windowOpen.urlError(res.Message);
                }else{
                    Modal.alert(res.Message)
                }
            }
        })
    }
    // 游戏内页-分类，判断游戏排列方式
    whichGamePage(){
        let item = this.state.categoresData;
        let ret = [];
        switch(true){
            case item.ID.indexOf("casino")!=-1:
            ret = this.Gamerender("liveGames",2)
            break;
            case item.ID.indexOf("YOPLAY")!=-1:
            ret = this.Gamerender("arcadeGames",2)
            break;
            case item.ID.indexOf("Multiplayer")!=-1:
            ret = this.Gamerender("multiplayerGame",1)
            break;
            case item.ID.indexOf("TM")!=-1:
            ret = this.Gamerender("chessGame",2)
            break;
            case item.ID.indexOf("sport")!=-1:
            ret = this.Gamerender("sportsGame",1)
            break;
            case item.ID.indexOf("FISH")!=-1:
            ret = this.Gamerender("mermaidGame",3)
            break;
            default:
            ret = this.Gamerender("errorClass",1)// 随便write
            break;
        }
        return ret;
    }
    // 游戏渲染
    Gamerender(myClassName,type){
        let ret = [];
        let gameBox = [];// 显示游戏列数
        let index = 0; // 一个盒子两个游戏，判断单双，布局使用
        let data = []; // 游戏数据
        let item = this.state.categoresData; // 父组件传入的游戏类型
        let url = config.devImgUrl;// 方便本地看图
        let len = 0; // 数据数组长度
        // 过滤游戏
        if(item.PlatformIds=="TM" && type==2){
            this.state.contentList.forEach((tmGame,tmIndex)=>{
                // 处理天美的加入房间与创建房间，104百人牛牛在多人游戏
                if(tmIndex>1 && tmGame.GameIdentify!=104){
                    data.push(tmGame)
                }
            })
        }
        else if(item.PlatformIds=="TM" && type==1){
            this.state.contentList.forEach((tmGame)=>{
                // 百人牛牛
                if(tmGame.GameIdentify==104 || tmGame.GameIdentify=="104"){
                    data.push(tmGame)
                }
            })            
        }
        else{
            data = this.state.contentList
        }
        // 渲染游戏
      
        // 一列一个游戏
        if(type==1){
            data.forEach((item,index)=>{
                gameBox.push(
                    <div className="gameBox" key={item+index}>
                        <div className="animate_shake" onClick={this.toPlayGame.bind(this,item)} style={{"backgroundImage":"url("+url+item.IconUrl+")"}}></div>
                    </div>      
                )                
            })
             
        }
        // 一列两个游戏
        else if(type==2){
            len = Math.ceil(data.length/2);
            for(let i=0;i<len;i++){
                if(data[index] && data[index+1]){
                    gameBox.push(
                        <div className="gameBox" key={index}>
                            <div className= "animate_shake" onClick={this.toPlayGame.bind(this,data[index])} style={{"backgroundImage":"url("+url+data[index].IconUrl+")"}}></div>
                            <div className="animate_shake" onClick={this.toPlayGame.bind(this,data[index+1])} style={{"backgroundImage":"url("+url+data[index+1].IconUrl+")"}}></div>
                        </div>
                    ) 
                    index = index+2;   
                }else if(data[index]){
                    gameBox.push(
                        <div className="gameBox" key={index}>
                            <div className="animate_shake" onClick={this.toPlayGame.bind(this,data[index])} style={{"backgroundImage":"url("+url+data[index].IconUrl+")"}}></div>
                        </div>
                    ) 
                    break;
                }
            }           
        // 捕鱼特殊排列
        }else if(type==3){
            if(data.length == 4){//如果数据刚好4条捕鱼才用特殊排列
                for(let i=0;i<2;i++){
                    gameBox.push(
                        <div className="gameBox" key={data[i]+i}>
                            <div className="animate_shake" onClick={this.toPlayGame.bind(this,data[i])} style={{"backgroundImage":"url("+url+data[i].IconUrl+")"}}></div>
                        </div>      
                    )   
                }
                gameBox.push(
                    <div className="gameBox" key={data[2]+2}>
                        <div className="animate_shake spec_bytop" onClick={this.toPlayGame.bind(this,data[2])} style={{"backgroundImage":"url("+url+data[2].IconUrl+")"}}></div>
                        <div className="animate_shake spec_bybot" onClick={this.toPlayGame.bind(this,data[3])} style={{"backgroundImage":"url("+url+data[3].IconUrl+")"}}></div>
                    </div>      
                )   
            }else{
                data.forEach((item,index)=>{
                gameBox.push(
                    <div className="gameBox" key={item+index}>
                        <div className="animate_shake" onClick={this.toPlayGame.bind(this,item)} style={{"backgroundImage":"url("+url+item.IconUrl+")"}}></div>
                    </div>      
                )                
            }) 
            }
            
                    
             
        }
        ret.push(
            <div className={myClassName+" publicGameStyle"} key={myClassName}>
                <div ref='plist'>
                    {gameBox}
                </div>
            </div>
        )            
        return ret;
    }
    // 组件更新后
    componentDidUpdate(){
        this.initAll()
    }
    render() {
        return (
            <div>
                {this.state.contentList?this.whichGamePage():null}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        wapCategory:state.wapCategory,
        user : state.user,
        platforms:state.game.platforms,
    }
);

export default connect(mapStateToProps)(Arcade)