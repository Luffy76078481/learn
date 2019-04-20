/**
 * Created by Administrator on 2019/1/1.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Collapse } from 'antd';
import './GameDescription.scss'

//游戏介绍的静态数据
import {dataJson} from './dataJson'


const Panel = Collapse.Panel;

class GameDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabsPlatId:this.props.routeParams.PlatformIds || this.props.casinos[0].PlatformId,
            rightConNum:-1
        }
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
    tabsChange(plat){
        this.setState({
            tabsPlatId:plat.PlatformId,
            rightConNum:-1
        })
    }
    renderTabs(){
        let tabs=[];
        let platId = this.state.tabsPlatId;
        for (var i = 0; i <   this.props.casinos.length; i++) {
            let item =this.props.casinos[i];
            let className="";
            if(!dataJson[item.PlatformId]) continue;//暂时只有sideNav里面的这些有游戏介绍
            if(item.PlatformId == platId){
                className="active"
            }
            tabs.push(<li key={i}   className={className}>
               <a href="javascript:void(0)" onClick={this.tabsChange.bind(this,item)}>
                   {item.Title}
               </a>
            </li>)
        };
        return tabs;
    }
    rightConNum(num){
        this.setState({
            rightConNum:num-0
        })
    }
    renderCollapse(){
        let _this = this;
        let platId = this.state.tabsPlatId;
        let data  = dataJson[platId];
        return(
            <Collapse defaultActiveKey={['1']}>
                <Panel header="线上游戏" key="1">
                    {
                        data.map((item,index)=>{
                            return(<a key={index} className={this.state.rightConNum==index?"active":""} onClick={_this.rightConNum.bind(this,index)}>{item.name}</a>)
                        })
                    }
                </Panel>
            </Collapse>
        )

    }
    renderCasinosList(){
        let tabs=[];
        for (var i = 0; i <   this.props.casinos.length; i++) {
            let item =this.props.casinos[i];
            tabs.push(<li key={i}>
                <img className={"casino-list-imgItem"} src={window.config.prdImgUrl+item.ImageUrl} />
                <a href="javascript:void(0)" onClick={this.onClickGameLink.bind(this,item)}>
                    开始游戏
                </a>
            </li>)
        };
        return tabs;
    }
    renderContentWrapper(){
        let rightConNum = this.state.rightConNum;
        if(rightConNum >-1){
            return this.renderContentItem();
        }else{
           return this.renderDashBoard()
        }
    }
    renderContentItem(){//渲染内容
        let platId = this.state.tabsPlatId;
        let dataObj  = dataJson[platId][this.state.rightConNum];
        let imgClass=platId+'_'+this.state.rightConNum;
        return(
            <div className="inside-content">
                <h3>{dataObj.name}</h3>
                <figure>
                    <div className={imgClass}></div>
                </figure>
                <div className="conHtml"  dangerouslySetInnerHTML={{__html:dataObj.contentString}}></div>
            </div>
        )
    }
    renderDashBoard(){//渲染DashBoard
        let platId = this.state.tabsPlatId;
        let data  = dataJson[platId];
        let DashBoard=[];
        let _this = this;
        for(var index =0;index<data.length;index++){
            let item = data[index];
            let num = index;
            let imgClass=platId+'_'+num+" txtImg";
            DashBoard.push(
                <div className="col-md-6">
                    <div className="item">
                        <h3>{item.name}</h3>
                        <div className="contentTxt">
                            <p>{item.introduction}</p>
                            <div className={imgClass} onClick={_this.rightConNum.bind(_this,num)}></div>
                        </div>
                        <a  onClick={_this.rightConNum.bind(_this,num)}>更多>></a>
                    </div>
                </div>
            )
        }
        return(<div className="row dashBoard">
            {DashBoard}
        </div>)
    }
    render() {
        return (
            <article id="GameDescription">

                <div className="container">
                    <div className="headTitle">
                        <div className="pull-left">
                            <h2>真人娱乐馆</h2>
                        </div>
                        <div className="pull-right">
                            <ul>
                                {this.renderTabs()}
                            </ul>
                        </div>
                    </div>
                    <div >
                        <div className="sidebarWrapper">
                            <div className="leftNav">
                                {this.renderCollapse()}
                            </div>
                            <ul className="leftGame">
                                {this.renderCasinosList()}
                            </ul>
                        </div>
                        <div className="contentWrapper">
                            {this.renderContentWrapper()}
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
{
    user : state.user,
    casinos:state.views.casinos,
}
);

export default connect(mapStateToProps, {})(GameDescription);