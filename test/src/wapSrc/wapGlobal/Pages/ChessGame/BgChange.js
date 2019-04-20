import React, { Component } from 'react';
import {Modal,Toast,Tabs, WhiteSpace, Badge } from "antd-mobile";
import connect from "react-redux/es/connect/connect";
import "./BgChange.scss"
import {Link,browserHistory} from 'react-router';




   

class BgChange extends Component{
    constructor(props) {
        super(props);
        this.state={
            isCategores:false,
            nowBgImg:this.props.user.SceneImage
        }
    }

    showBackButton(){
        browserHistory.replace("/");
    }

    tabList(tab){
        let imgPathName = tab.title;
        return(
            <div 
            className={["cjbox",imgPathName == this.props.user.SceneImage?"chose":""].join(" ")}
            style={
                {
                "backgroundImage":"url("+require(`../../style/images/chess/backImg/${imgPathName}.jpg`)+")",
                    "borderColor":`${imgPathName == this.props.user.SceneImage?"#0cc308":"#bd9860"}`
                }}>
               
            </div> 
        )
    }
    tabChange(a){
       this.state.nowBgImg = a.title;
    }

    submitBg(){
        Toast.loading('背景更换中...',300);
        new window.actions.SaveUpdateSceneimageAction("",this.state.nowBgImg).fly(resp=>{
            Toast.hide();
            if (resp.StatusCode === 0) {
                Toast.success('背景更换成功！');
                new window.actions.ApiPlayerInfoAction().fly();
            }else{
                Toast.fail(resp.Message);
            }
        });
    }

    content(){
        let bgImgList = [];
        let tabs2 = [];
        let pageIndex = 0;//默认选中第一个
        // let imgName = this.state.rankData[i].SceneImage 
        for(let i=0;i<5;i++){
            let imgPathName = String.fromCharCode(65+i);
            bgImgList.push(
                <div key={i} className="tabContent" style={{"backgroundImage":"url("+require(`../../style/images/chess/backImg/${imgPathName}.jpg`)+")"}}>
                </div>
            )
            tabs2.push(
                { title: imgPathName, sub: i+1 }
            )
            if(imgPathName == this.props.user.SceneImage){
                pageIndex = i;
            }
        }
        return(
            <div className="tabsbox">
                <Tabs tabs={tabs2}
                initialPage={pageIndex}
                tabBarPosition="bottom"
                renderTab={this.tabList.bind(this)}
                tabBarBackgroundColor={"rgb(0,0,0,0)"}
                onChange={this.tabChange.bind(this)}
                >
                {bgImgList}
                </Tabs>
            </div>
        )
    }
    
    render(){
        const TopBar = window.r.get("TopBar");
        return(
            <div className="bgChangePage">
               <TopBar  isFirst = {this.state.isCategores} showBackButton={this.showBackButton} />
               {this.content()}
               <div className="bgChangePage-button" onClick={this.submitBg.bind(this)}>确认更改</div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs:state.remoteSysConfs,
        user:state.user,
    }
);

export default connect(mapStateToProps)(BgChange)