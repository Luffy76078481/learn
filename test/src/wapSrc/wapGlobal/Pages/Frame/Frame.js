import React, { Component } from 'react';
import {Drawer,Modal} from "antd-mobile";
import {browserHistory,Link} from 'react-router';
import connect from "react-redux/es/connect/connect";
import "./Frame.scss"
import * as cache from "CacheHelper";
import {config} from "globalConfig";
import * as actions from "globalAction";

class Frame extends Component{
    constructor(props) {
        super(props);
        let _this = this;
        this.state={
            open:false,
            footTabs:"/",
            shortCut:cache.getSession('shortCut')?cache.getSession('shortCut'):false,
            showShortCut:false,
            showPromotion:true,
        }
    }
    onOpenChange(flag){
        this.setState({open:flag==undefined?!this.state.open:flag})
    }
    changeFootTabs(name){
        this.setState({footTabs:name})
    }
    wechat(){
        Modal.alert('请联系在线客服索取支付二维码!','',[
            {
                text:"关闭"
            },
            {
                text:"联系客服",onPress:()=>{
                    if(config.isApp){
                        window.Util.appOpen(this.props.remoteSysConfs.online_service_link)
                    }else{
                        window.open(this.props.remoteSysConfs.online_service_link,'_blank');
                    }
                }
            }
        ])
    }
    shortCut(){
        this.setState({
            showShortCut:true
        })
    }
    closeShortCut(event){
        event.preventDefault();
        event.stopPropagation();
        $(event.currentTarget).closest('a').remove();
    }
    isLooking(){//看过了
        cache.setSession('shortCut',true);
        this.setState({
            showShortCut:false,
            shortCut:true
        })
    }
    closeSide(event){
        event.preventDefault();
        event.stopPropagation();
        $(event.currentTarget).closest('a').remove();
    }
    _closeHomePromotion(){
        this.setState({
            showPromotion:false
        })
    }
    openPromotion(link){
        if(!link) return;
        if(config.isApp){
            window.Util.appOpen(link)
        }else{
            window.open(link,'_blank');
        }
    }
    render(){
        let FooterBar = window.r.get("FooterBar");
        let SideBar = window.r.get("SideBar");
        let _this = this;
        return (
            <div>
                {_this.props.homePromotion.length>0?
                    (<div className="homePromotion" style={{display:this.state.showPromotion?"block":"none"}}>
                        <a className="close" onClick={this._closeHomePromotion.bind(this)}>关闭</a>
                        <div className="promotionCon" onClick={this.openPromotion.bind(this,this.props.homePromotion[0].ExternalLink)} dangerouslySetInnerHTML={{__html:this.props.homePromotion[0].Content}}></div>
                    </div>)
                    :null
                }
                <Drawer
                    className="my-drawer"
                    style={{minHeight: document.documentElement.clientHeight,zIndex:this.state.open?"3":""}}
                    enableDragHandle
                    sidebar={<SideBar changeFootTabs={this.changeFootTabs.bind(this)} closeSide={this.onOpenChange.bind(this)} />}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange.bind(this)}
                >
                    <div> </div>
                </Drawer>
                {
                    !this.state.shortCut &&
                    <div className="sideFloat left">
                        <a className="item shortCutImg" onClick={this.shortCut.bind(this)}>
                            <span onClick={this.closeShortCut.bind(this)}></span>
                        </a>
                    </div> 
                }
                <div className="sideFloat right">
                    <a className="item wechat_img" onClick={this.wechat.bind(this)}>
                        <span onClick={this.closeSide.bind(this)}></span>
                    </a>
                </div>
                { 
                    React.Children.map(this.props.children,function(child,index){
                        child.props.params.openSilde = _this.onOpenChange.bind(_this);
                        return (<div key={index}>{child}</div>)
                    })
                }
                <FooterBar footTabs={this.state.footTabs}></FooterBar>
                {
                    this.state.showShortCut &&
                    <div onClick={this.isLooking.bind(this)} className={window.ios?"ios shortCutGif":"shortCutGif"}></div>
                }
            </div> 
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        popup:state.message.popup,
        remoteSysConfs:state.remoteSysConfs,
        homePromotion:state.homePromotion
     }
);

export default connect(mapStateToProps)(Frame)
