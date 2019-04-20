


import React from "react";
import {browserHistory} from "react-router";
import "./css/SecondNav_acyl.scss";
import {connect} from "react-redux";



class SecondNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lock: false,
            selPlatformId: props.platforms
        }
    }
    renderCasinoList() {
        var CasinoLists = [];
        const  options = window.r.props("SecondNav");
        for (var i = 0; i < this.props.casinos.length; i++) {
            var CasinoList = this.props.casinos[i];
            CasinoLists.push(
                <li key={i} onClick={this.onClickGame.bind(this, CasinoList)}>
                    <div className={"icon " +CasinoList.ID}>
                    </div>
                    <div className="title">
                        <div className="name3 btn2">
                            {CasinoList.Title}
                        </div>
                        <div className="start btn2">
                            立即开始
                        </div>
                    </div>
                </li>
            );
        }
        return CasinoLists;
    }

    onClick(e){
        browserHistory.push("/games/tab="+e)
        // location.href="/games?tab="+e
    }

    renderPlatfromList() {
        var platformLists = [];
        for (var i = 0; i < this.props.slot_platforms.length; i++) {
            var platform = this.props.slot_platforms[i];
            if(!platform.ShowSlot){
                continue;
            }
            platformLists.push(
                    <li key={platform.ID} onClick={this.onClick.bind(this,platform.ID)}>
                        <div className={platform.ID+" icon"}>
                        </div>
                        <div className="title">
                            <div className="name3 btn2">
                                {platform.Name2}
                            </div>
                            <div className="start btn2">
                                立即开始
                            </div>
                        </div>
                    </li>
            );

        }
        return platformLists;
    }
    onClickGame(game){
        if (!window.actions.auth()) {
            return;
        }
        let parma = {
            GamePlatform:game.GamePlatform,
            GameType:game.GameTypeText,
            GameId:game.GameIdentify,
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen('Sport');
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    sportNavItem(){
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

        return(
		<div className="inner">
			<ul>
                {
                    sportGames.map((item, index)=>{
                        return (
                            <li key={index} onClick={(event)=>{this.onClickGame(item, event)}}>
                                <div className={"icon "+item.GamePlatform.toLocaleLowerCase()}></div>
                                <div className="title">
                                    <div className="name3 btn2">{item.Title}</div>
                                    <div className="start btn2">立即开始</div>
                                </div>
                            </li>
                        );
                    })
                }
			</ul>
		</div>
        )
    }

    render() {
        const  sportNav = this.sportNavItem();
        const  CasinoNav = this.renderCasinoList();
        const renderPlatfromList = this.renderPlatfromList();
        const  options = window.r.props("SecondNav");
        return (
            <div className="second-nav-module menuNav">
                {
                    (this.props.showBlock == "sport" || this.state.lock == "sport") &&
                        <div className=" main sport" onMouseEnter={()=>{this.setState({lock: "sport"})}}  onMouseLeave={()=>{this.setState({lock: false})}}>
                            <div>{sportNav}</div>
                        </div>
                }

               {//真人视讯
                    (this.props.showBlock == "casino" || this.state.lock == "casino") &&
                     <div className="main casino" onMouseEnter={()=>{this.setState({lock: "casino"})}}  onMouseLeave={()=>{this.setState({lock: false})}}>
                        <div className="inner">
                            <ul>
                                {CasinoNav}
                            </ul>
                        </div>
                    </div>
                }
                {//电子游艺栏目
                    (this.props.showBlock == "games" || this.state.lock == "games") &&
                    <div className="main games" onMouseEnter={()=>{this.setState({lock: "games"})}}  onMouseLeave={()=>{this.setState({lock: false})}}>
                        <div className="inner">
                            <ul>
                                {renderPlatfromList}
                            </ul>
                        </div>
                    </div>
                }
                {
                    (this.props.showBlock == "bingo" || this.state.lock == "bingo") &&
                    <div className="main bingo" onMouseEnter={()=>{this.setState({lock: "bingo"})}}  onMouseLeave={()=>{this.setState({lock: false})}}>
                        <div className="inner">
                            <div className="hot">
                                <div className="hotItems">
                                    <p className="image">
                                        <img src={require('./images/liu.png')}/>
                                    </p>
                                    <p className="title">
                                        <span className="name6">六合彩</span>
                                    </p>
                                </div>
                                <div className="hotItems">
                                    <p className="image">
                                        <img src={require('./images/bjsc.png')}/>
                                    </p>
                                    <p className="title">
                                        <span className="name6">北京赛车</span>
                                    </p>
                                </div>
                                <div className="hotItems">
                                    <p className="image">
                                    <img src={require('./images/cqssc.png')}/>
                                    </p>
                                    <p className="title">
                                        <span className="name6">重庆时时彩</span>
                                    </p>
                                </div>
                                <div className="hotItems">
                                    <p className="image">
                                    <img src={require('./images/fen.png')}/>
                                    </p>
                                    <p className="title">
                                        <span className="name6">分分彩</span>
                                    </p>
                                </div>
                                <div className="hotItems">
                                    <p className="image">
                                        <img src={require('./images/guangx.png')}/>
                                    </p>
                                    <p className="title">
                                        <span className="name6">广西快3</span>
                                    </p>
                                </div>
                            </div>
                            <div className="lottery">
                                <div className=" outer-div lotteryitems">
                                    <div className="inner-div ">
                                        <div className="t1">
                                            <span className="t1Icon"></span>&nbsp;PC蛋蛋
                                        </div>
                                        <ul className="items">
                                            <li className="PC蛋蛋">北京28</li>
                                            <li className="PC蛋蛋">加拿大28</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className=" outer-div lotteryitems">
                                    <div className="inner-div ">
                                        <div className="t1">
                                            <span className="t1Icon"></span>&nbsp;低频彩
                                        </div>
                                        <ul className="items">
                                            <li className="低频彩">六合彩</li>
                                            <li className="低频彩">福彩3D</li>
                                            <li className="低频彩">排列3</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className=" outer-div lotteryitems">
                                    <div className="inner-div ">
                                        <div className="t1">
                                            <span className="t1Icon"></span>&nbsp;时时彩
                                        </div>
                                        <ul className="items">
                                            <li className="时时彩">北京赛车</li>
                                            <li className="时时彩">重庆时时彩</li>
                                            <li className="时时彩">极速赛车</li>
                                            <li className="时时彩">两分彩</li>
                                            <li className="时时彩">分分彩</li>
                                            <li className="时时彩">新疆时时彩</li>
                                            <li className="时时彩">五分彩</li>
                                            <li className="时时彩">广东快乐十分</li>
                                            <li className="时时彩">重庆快乐十分</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className=" outer-div lotteryitems">
                                    <div className="inner-div ">
                                        <div className="t1">
                                            <span className="t1Icon"></span>&nbsp;快3
                                        </div>
                                        <ul className="items">
                                            <li className="快3">广西快3</li>
                                            <li className="快3">安徽快3</li>
                                            <li className="快3">江苏快3</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className=" outer-div lotteryitems">
                                    <div className="inner-div ">
                                        <div className="t1">
                                            <span className="t1Icon"></span>&nbsp;11选5
                                        </div>
                                        <ul className="items">
                                            <li className="11选5">山东11选5</li>
                                            <li className="11选5">江西11选5</li>
                                            <li className="11选5">广东11选5</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
           )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        casinos:state.views.casinos,
        slot_platforms: state.game.slot_platforms,
        sportGames:state.game.sportGames
    }
);

export default connect(mapStateToProps, {})(SecondNav);