import React, { Component } from 'react';
import {Link,browserHistory} from 'react-router';
import {wapAuth} from 'globalAction';
import { connect } from 'react-redux'
import {config} from "globalConfig";
import "./FirstPageChess.scss";

class FirstPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading:false,
            gamebackImg:"HOME",
            isCategores:true,// 是否是主页大厅页，此状态传入游戏内页（游戏内页用户信息在底部，头部无user信息）
            categoresData:{}, // 传给子组件的游戏类型数据
            rankData:[], // 排行榜数据
        }
    }
    // 变量取反
    setVariable = (d) => {
        this.setState({
            [d]: !this.state[d],
        });
    }
    componentWillMount(){
        this.getRanking();
        let isAutoLogin = location.search;
        if(isAutoLogin.indexOf('channel')>0){
            cache.setSession('channel',isAutoLogin.split('=')[1]);
        }
    }

    getRanking(queryId=0){//获取及时排行榜
        let that = this;
        new window.actions.ApiQueryLeaderboardDataAction(queryId,Math.random()).fly(res=>{
            if(res.StatusCode === 0){
                that.setState({
                    rankData:res.Data
                });
            }
        })
        new window.actions.ApiNoticeAction("home-promotion").fly(resp=>{//获取活动弹窗内容
        }, "home-promotion");
    }



    // 首页游戏
    wapCategores(){
        let categores = [];
        this.props.homeCategores.forEach((item,index)=>{ 
            let url =  config.devImgUrl + item.ImageUrl2;//本地看图
            if(index>6){
                return
            }
            categores.push(
                <div key={index} className='categoresWrap'>
                    <div className={item.ID} onClick={this.tabsChange.bind(this,item)} style = {{"backgroundImage":"url("+url+")"}}></div>   
                </div>    
            )                                  
        }); 
        return categores;
    }
    // 游戏传值
    tabsChange(item){
        if(!wapAuth(true)) return false;
        this.setVariable("isCategores")
        this.setState({
            categoresData:item,
            gamebackImg:item.ID
        })
    }
    // 排名列表
    rankList(){ 
        let list = []
        for( let i = 0; i < this.state.rankData.length; i++){
            let imgName = this.state.rankData[i].HeadImagePath || String.fromCharCode(64+Math.floor(Math.random()*24+1));
            list.push(
                <div className="rankUser" key={i}>               
                    <img src={require(`../../style/images/chess/touxiang/${imgName}.png`)}/>                           
                </div>
            )
        }
        return list;
    }
    // 背景图
    whichBackGround(bgname){
        let bgImg;
        const homeBg = require(`../../style/images/chess/backImg/${this.props.user.SceneImage?this.props.user.SceneImage:"A"}.jpg`)
        const chessBg = require("../../style/images/chess/background.jpg")
        const fishBg = require("../../style/images/chess/fishBg.png")
        const casinoBg = require("../../style/images/chess/casinoBg.png")
        const duorenBg = require("../../style/images/chess/duorenBg.png")
        const sportBg = require("../../style/images/chess/dianjingtiyubg.jpg")
        const yoplayBg = require("../../style/images/chess/yoplayBg.png")
        // 背景图
        switch(true){
            case bgname == "HOME":
            bgImg = homeBg;
            break;
            case bgname == "TM":
            bgImg = chessBg;
            break;
            case bgname == "FISH":
            bgImg = fishBg;
            break;
            case bgname == "Multiplayer":
            bgImg = duorenBg;
            break;
            case bgname == "sport":
            bgImg = sportBg;
            break;
            case bgname == "casino":
            bgImg = casinoBg;
            break;
            case bgname == "YOPLAY":
            bgImg = yoplayBg;
            break;
            default:
            bgImg = homeBg;
            break
        }    
        return bgImg;
    }
    // 返回按钮
    showBackButton = () => {
        this.setVariable("isCategores")
        this.setState({
            gamebackImg:"HOME"//背景图恢复
        })
    };
    render(){
        const TopBar = window.r.get("TopBar");
        const FooterBar = window.r.get("FooterBar");
        const Game = window.r.get("Game");
        return (
            <div className = "gamelobby" style={{"backgroundImage":"url("+this.whichBackGround(this.state.gamebackImg)+")"}}>
                {/* 头部 isFirst是否为主页*/}
                <TopBar isFirst = {this.state.isCategores} showBackButton={this.showBackButton} />
                {/* 主页游戏分类 */}
                <div className="middleContent">
                    {
                        this.state.isCategores?
                        <div className="SideBar" id='rankUsers'>
                            <div className = "rankList">
                                <div className="rankScroll">
                                    {this.rankList()}
                                </div>
                            </div>
                            <div className="rankButton"  onClick={()=>{window.actions.showChessModal(true,"phb","","10rem","5.9rem")}}></div>
                        </div>                   
                        :
                        // 游戏页无排名信息
                        null                        
                    }
                    {
                        // 显示主页分类或具体游戏内页
                        this.state.isCategores?
                        <div className ="gamesWrap">{this.wapCategores()}</div>
                        :
                        <Game categoresData={this.state.categoresData}/>
                    }
                </div>
                {/* 底部 */}
                <FooterBar isCategores={this.state.isCategores}/>
            </div>       
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        homeCategores:state.wapCategores.mobileHomeCategories, // 首页游戏分类数据
        user:state.user,
    }
);

export default connect(mapStateToProps,{})(FirstPage)