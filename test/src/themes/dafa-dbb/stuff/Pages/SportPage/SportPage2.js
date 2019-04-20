
import React, {Component} from 'react';

import { Link, IndexLink } from 'react-router';
import {connect} from 'react-redux';
import {auth} from "globalAction";
import './SportPage2.scss';

class SportPage2 extends Component {

    constructor (props){
        super(props);
        this.state = {
            selGameId:"", 
            sportLink:"about:blank", 
            width:"1020px",
            reqLock:false
        };
        this.textMap = {
            "T188": "游戏丰富多元，公平公正的经营理念",
            "N188": "游戏丰富多元，公平公正的经营理念",
            "SB": "国际顶尖综合娱乐平台开发，每月提供超过5000场体育赛事",
            "OPUS": "亚洲知名最稳定、最安全的体育游戏平台",
            "TB": "知名体育平台之一，赛事多元化，投注玩法多样化",
            "coming": "敬请期待更多好玩、刺激的游戏"
        }
    }
    componentDidMount() {
        window.$("#root").attr("class", "sportcss");
        document.title = "大发体育-在线体育投注、足球赔率| Dafabet.com"
    }
    onClickGame(game) {
        // 未登录
        if (!auth()) {
            return;
        }
        if(this.state.reqLock)
        return;
        this.state.reqLock =true;
        let gameLink;
        var _self = this;
        var width = 1366;
        let parma = {
            GamePlatform:game.GamePlatform,
            GameType:game.GameTypeText,
            GameId:game.GameIdentify,
            IsMobile:false,
            IsDemo:false,
        }
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                // 游戏链接
                gameLink = res.GameLoginUrl;
                if (game.Title.indexOf("皇冠体育") >= 0) {
                    width = 1190;
                }
                window.open(gameLink,'game',"width="+width+"px,height=700px,directories=0,alwaysRaised=0,depended=1,z-look=1,location=0, menubar=0,scrollbars=0,status=0,toolbar=0,resizable=1,left=5,top=50,screenX=350,screenY=250", true);
            }
            else{
                alert(res.Message)
            }
            _self.state.reqLock = false;
        })
    
    }
    serversOpen(e){
        e.preventDefault();
        if(e.target.id=='test'){
            window.swal({
                    title: "忘记密码",
                    text: "联系在线客服协助修改密码",
                    confirmButtonColor: "#c5841f",
                    confirmButtonText: "联系客服",
                    showCancelButton: true,
                    cancelButtonText: "关闭",
                },
                ()=>{
                    window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
                });
            return;
        }
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=900,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=450,screenY=250');
        return false;
    }
    render() {
        let sportGames = [];
        //用户未登陆不显示N188体育
        if(!this.props.user.username){
            for(let i = 0; i< this.props.sportGames.length; i++){
                if(this.props.sportGames[i].GamePlatform != "N188"){
                    sportGames.push(this.props.sportGames[i]);
                }
            }
        }else{
            sportGames = this.props.sportGames.slice();
        }
        return (
            <div className="sport-content">
                <div className="wow  sport-div">
                    <div className="servbtn lrbtn" onClick={this.serversOpen.bind(this)}></div>
                    <div className="deposbtn lrbtn"><Link to="/deposit" ></Link></div>
                    {/* 游戏导航 */}
                    <div className="sportnav">
                        {
                            sportGames.map((item, index)=>{
                                return (
                                    <div key={index} className={item.GamePlatform} onClick={this.onClickGame.bind(this, item)}>
                                        {item.Title}
                                    </div>
                                );
                            })
                        }
                        <Link to="/casino" activeClassName="active"><div>现场荷官</div></Link>
                        <a href="/help.html" target="_blank" className="color-main"><div>帮助答疑</div></a>
                        <a href="/promotions" ><div>优惠推广</div></a>
                    </div>
                    {/* 游戏列表 */}
                    <ul className="sport-card fadeInUp animated">
                        {
                            sportGames.map((item, index)=>{
                                return (
                                    <li key={index} className={item.GamePlatform} onClick={this.onClickGame.bind(this, item)}>
                                        <div className="logo">{item.Title}</div>
                                        <div className="body">
                                            <div className="inner-logo"></div>
                                        </div>
                                        <div className="foot">{this.textMap[item.GamePlatform]}</div>
                                        {
                                            item.GamePlatform !== "coming" &&<div className="mask"><a>开始游戏</a></div>
                                        }
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        sportGames:state.game.sportGames,
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps, {})(SportPage2);