import React, { Component } from 'react';
import {Link,browserHistory} from 'react-router';
import connect from "react-redux/es/connect/connect";
import {config} from "globalConfig";
import {Toast, Modal} from 'antd-mobile';
import {wapAuth} from 'globalAction';
import "./FooterBarChess.scss";

class FooterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IntoRoomGamePlatform:"",
            IntoRoomGameTypeText:"",
            IntoRoomShow:false,// 加入房间弹窗
            TmGame:[] // 天美游戏
        };
    }
    componentDidMount(){
        if(this.props.tmGames.length==0){
            let filter={
                TerminalType:"Mobile",
                GamePlatform:"TM"
            }; 
            new window.actions.ApiQueryGamesAction(filter,1,15).fly()             
        }
    }
    
    // 是否能游戏
    toPlayGame(game){
        if(!wapAuth(true)) return false;
        let totalAmount = parseInt(this.props.user.amount)> 1 ? parseInt(this.props.user.amount):0;
        if(totalAmount>1){
            this.onGetIntoRoom(game)
        }
    }
    // 进入房间API,TransferFlag 自动转入控制
    onGetIntoRoom(game,TransferFlag=false){
        // 加入房间
        let parma = {};
        if(!game){
            let RoomId = this.refs.IntoRoomId.value;// 输入房间号
            if(RoomId==""){
                Toast.info('请填写房间号');
                return false;
            }else if(RoomId.length<6){
                Toast.info('房间号不能低于六位');
                return false;
            }       
            parma = {
                GamePlatform:this.state.IntoRoomGamePlatform,
                GameType:this.state.IntoRoomGameTypeText,
                GameId:"2$"+RoomId,
                IsMobile:true,
                IsDemo:false,
            }     
        }
        // 创建房间
        else{
            parma = {
                GamePlatform:game.GamePlatform,
                GameType:game.GameTypeText,
                GameId:game.GameIdentify,
                IsMobile:true,
                IsDemo:false,
            }
        }
        // 弹窗方式
        let windowOpen;
        if(!config.isApp){
            windowOpen = window.Util.windowOpen('Game');
        }
        new window.actions.ApiGetLoginUrl(parma,'(mobile)',TransferFlag).fly(res=>{
            Toast.hide();
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                /*
                if(TransferFlag){
                    new window.actions.ApiPlayerInfoAction().fly();
                    new window.actions.ApiGamePlatformAllBalanceAction().fly();
                }
                */
                if(!config.isApp){
                    windowOpen.location.href= gameLink;
                    this.setState({
                        IntoRoomShow:false,
                    })
                }else{
                    window.Util.appOpen(gameLink);
                    this.setState({
                        IntoRoomShow:false,
                    })
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
    // 取消进入游戏
    IntoRoomCancel(){
        this.setState({
            IntoRoomShow:false,
        })
    }
    // 加入房间弹窗
    IntoRoom(game){
        if(!wapAuth(true)) return false;
        this.setState({
            IntoRoomShow:true,
            IntoRoomGamePlatform:game.GamePlatform,//GamePlatform 参数 TM
            IntoRoomGameTypeText:game.GameTypeText //GameTypeText 参数 slot
        })
    }
    roomRender(){
        let ret = [];
        this.props.tmGames.forEach((item,index)=>{
            let url = config.devImgUrl + item.IconUrl;// 方便本地看图
            ret.push(
                <div className='translateActive' key={index} style={{"backgroundImage":"url("+url+")"}}  onClick ={
                    item.GameIdentify.indexOf("2$X")!=-1?
                    this.IntoRoom.bind(this,item):
                    this.toPlayGame.bind(this,item) 
                }>
                </div>       
            )
        })
        return ret;     
    }

    showChessModal(popType,tabType,popWith,popHeight){
        window.actions.showChessModal(true,popType,tabType,popWith,popHeight);
    }

    render() {
        let _this = this;
        const UserBar = window.r.get("User");
        return (
            <div className="footerBar" >
                <div className = {this.props.isCategores?"stateBar":"stateBar rightSide"}>
                    <div className = 'animate_shake mine' onClick={this.showChessModal.bind(this,"my","grxx","10rem","6.5rem")}></div>
                    <div className = 'animate_shake record' onClick={this.showChessModal.bind(this,"jl","","10.6rem","6.5rem")}></div>
                    <div className = 'animate_shake deposit' onClick={this.showChessModal.bind(this,"ck","","10rem","6.5rem")}></div>
                    <div className = 'animate_shake drawing'  onClick={this.showChessModal.bind(this,"tk","","10rem","6.5rem")}></div>
                    <div className = 'animate_shake activity' onClick={this.showChessModal.bind(this,"hd","jchd","10rem","6.5rem")}></div>
                    <div className = 'animate_shake more'></div>
                </div> 
                {
                    this.props.isCategores?
                    <div className='roomOptions'>{this.roomRender()}</div>:
                    <UserBar isFooter={true}/>
                }
                {/* 加入棋牌房间 */}
                {
                    <Modal title="加入房间"
                        transparent
                        visible={this.state.IntoRoomShow}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            { text: '取消', onPress: () => {
                                _this.IntoRoomCancel();
                            }},
                            { text: '确定', onPress: () => {
                                _this.onGetIntoRoom();
                            }}
                        ]}
                    >
                        <input ref="IntoRoomId" className="IntoRoomClass" style={{"paddingLeft":"5px"}} type="number" maxLength="6" placeholder="请输入6位房间密码" /><br/>
                    </Modal>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        homeCategores:state.wapCategores.mobileHomeCategories, // 首页游戏分类数据
        tmGames:state.game.tmGames
    }
);

export default connect(mapStateToProps)(FooterBar)