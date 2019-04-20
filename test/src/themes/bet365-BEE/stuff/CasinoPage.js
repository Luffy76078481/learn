/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';
import { Link} from 'react-router';
import {connect} from 'react-redux';
import './css/CasinoPage.scss'


class CasinoPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            tabs:[
                {tabName:"网页版",id:1,type:"website"},
                {tabName:"下载版",id:2,type:"download"},
               
            ],
            currentIndex:1,
        }
    }
    tabChoiced=(id)=>{
        //tab切换到方法
        this.setState({
            currentIndex:id
        });
    }
    onClickGameLink(game) {
        if (!window.actions.auth()) {
            return;
        }
        let GameType = '';
        if(game.PlatformId=="MG2"){
             GameType = 'casino'
        }else{
            GameType = 'Trueman'
        }
        let parma = {
            GamePlatform:game.PlatformId,
            GameType:GameType,//Trueman
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen("Casino");
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
          
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    componentDidMount() {
        window.$("#root").attr("class", "casinocss");
        // document.title = "体验最好的在线真人娱乐场就在dafabet真人现场荷官!"
    }
    renderCansinoList() {
        var CansinoLists = [];
        var options = window.r.props("CasinoPage");
        const maskText = options.maskName || "立即开始";
        for (var i = 0; i <  this.props.casinos.length; i++) {
            var CansinoList =  this.props.casinos[i];
            CansinoLists.push(
                <div key={i} className="color-main" >
                   
                    <div className={" c_"+CansinoList.PlatformId+" c-items wow fadeInUp animated"} style={{visibility: "visible", animationName: "fadeInUp", float:'left', marginLeft:'40px'}}>
                        <div className={ "c_"+CansinoList.PlatformId+" casino-platform-list-img casino-list-img"} onClick={this.onClickGameLink.bind(this,CansinoList)}  style={{backgroundSize:"100%", background: "url("+window.config.prdImgUrl+ CansinoList.ImageUrl + ") no-repeat"}}>
                          
                        </div>
                        <span className="hengBg hengBgMar"></span>
                        <div className={CansinoList.ID+" casino-platform-list-link"}>
                            <a target="_blank" href="javascript:void(0)" onClick={this.onClickGameLink.bind(this,CansinoList)} className="casino-go-game color-highlight">{ !options.hideCasinoTitle?"进入游戏":""}</a>
                        </div>
                        {!options.hoverMask?
                            null:
                            <div className="mask">
                                <a target="_blank" href="javascript:void(0)" onClick={this.onClickGameLink.bind(this,CansinoList)} className="casino-go-game color-highlight">{maskText}</a>
                            </div>
                        }
                    </div>
                </div>

            );
        }
        return CansinoLists;
    }


    render() {

        const CansinoList = this.renderCansinoList();
        const promotionLink =this.props.remoteSysConfs.channel_push_url;
        // var _this=this;
        // var isBox1Show=this.state.currentIndex==1 ? 'block' : 'none';
        // var isbox2Show=this.state.currentIndex==2 ? 'block' : 'none';
        //   var tabList= this.state.tabs.map(function(res,index) {
        //     var tabStyle=res.id==this.state.currentIndex ? 'subCtrl active' : 'subCtrl';
        //     return    <li key={index} onClick={this.tabChoiced.bind(_this,res.id)} className={tabStyle}>
        //             <i className={res.type}></i>
        //              {res.tabName}</li>

        // }.bind(_this));

        return (
            <article id="casino">
                <div className="fnameCenter">
                    <div className="contentHeadNav">
                        <Link to="/casino" className="xchgNavStyle"></Link>
                        <Link to="/casino" className="lpNavStyle"></Link>
                        <Link to="/bingo" className="cpNavStyle"></Link>
                        <Link to="/games" className="dzNavStyle"></Link>
                        <Link to="/sport" className="tyNavStyle"></Link>
                    </div>
                    <div className="contentFousImg">
                        <a href="javascript:;"><img src={require("../page/index/images/bet365/casino/newCasino_03.jpg")} /></a>
                    </div>
                </div>
                <div className="listWrap">
                <ul className="subNavWrap">
                <a className="subCtrl active" href="/help.html"><i className="website"></i>网页版</a>
                <a className="subCtrl" href={promotionLink} target="_blank"><i className="download"></i>下载版</a>  
                <a className="subCtrl" href="/help.html" target="_blank"><i className="liveg"></i>帮助</a>
                   
                </ul>

                <div className="newsList">
                    {/* <div style={{"display":isBox1Show}} > */}
                    <div>
                        <div className="container" style={{"clear":"both"}}>
                            <div className="casino-Content">
                                <div className="row casino-platform-list">
                                    {CansinoList}
                                </div>
                            </div>
                        </div>
                    </div>
                 
                </div>
            </div>
            <div></div>
            </article>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        casinos:state.views.casinos,
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps, {})(CasinoPage);