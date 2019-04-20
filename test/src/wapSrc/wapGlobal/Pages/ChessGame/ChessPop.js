import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import "./ChessPop.scss"

import ChessPopPcenter from "./ChessPopPcenter";  //个人中心
import ChessPopJL from "./ChessPopJL";  //各种记录
import ChessPopCK from "./ChessPopCK";  //存款
import ChessPopTK from "./ChessPopTK";  //提款
import ChessPopPHB from "./ChessPopPHB";  //排行榜
import ChessPopSZ from "./ChessPopSZ";  //设置
import ChessPopXX from "./ChessPopXX";  //消息
import ChessPopHD from "./ChessPopHD";  //活动
import ChessPopTX from "./ChessPopTX";  //头像设置


class ChessPop extends Component{
    constructor(props){
        super(props);
        this.state={
            showPop:false,
            modelType:"grzx",
            tabType:"",
            width:"10.6rem",
            height:"6.5rem",
        }
        // this.state={
        //     showPop:true,
        //     modelType:"tx",
        //     tabType:"",
        //     width:"9rem",
        //     height:"6rem",
        // }
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.showChessModal.flag!=this.props.showChessModal.flag){
            this.setState({
                showPop:nextProps.showChessModal.flag,
                modelType:nextProps.showChessModal.popType,
                tabType:nextProps.showChessModal.tabType,
                width:nextProps.showChessModal.popWith,
                height:nextProps.showChessModal.popHeight,
            });
        }
    }
    
    componentWillMount(){
        //   //防止页面后退
        // history.pushState(null, null, document.URL);
        // window.addEventListener('popstate',()=>{
        //     history.pushState(null, null, document.URL);
        // })
        if((!!!this.props.user.token || !!!this.props.user.ImagePath) || this.props.showChessModal.flag){
            window.actions.showChessModal(false);
        }
        
    }

    

    showChessModal(e){
        e.stopPropagation();
        this.refs.popIndex.classList.remove("pop_index_animi");
        setTimeout(() => {
            this.refs.popIndex.classList.add("pop_index_animi"); 
        }, 10);
        setTimeout(() => {
            window.actions.showChessModal(false);
        }, 520);
    }

    switchPopType(){
        switch(this.state.modelType){
            case "my": //我的个人中心弹窗
            return <ChessPopPcenter tabType = {this.state.tabType}/>

            case "jl": //记录弹窗
            return <ChessPopJL tabType = {this.state.tabType}/>

            case "ck": //提款弹窗
            return <ChessPopCK tabType = {this.state.tabType}/>

            case "tk": //提款弹窗
            return <ChessPopTK tabType = {this.state.tabType}/>

            case "phb": //排行榜
            return <ChessPopPHB tabType = {this.state.tabType}/>
            
            case "sz": //设置
            return <ChessPopSZ tabType = {this.state.tabType}/>

            case "xx": //消息
            return <ChessPopXX tabType = {this.state.tabType}/>
            
            case "hd": //活动
            return <ChessPopHD tabType = {this.state.tabType}/>

            case "tx": //头像弹窗
            return <ChessPopTX/>
        }
    }
 
  
    render(){
        return (
            <div className="chesspop-box" style={{"display":this.state.showPop?"block":"none"}} onClick={this.showChessModal.bind(this)}>
                <div ref="popIndex" className="pop_index pop_index_animi" style={{"width":this.state.width,"height":this.state.height}} onClick={(e)=>{e.stopPropagation();}}>
                    <div className="pop_close " onClick={this.showChessModal.bind(this)}></div>
                    {this.switchPopType()}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        showChessModal:state.showChessModal,
        user:state.user
    }
)

export default connect(mapStateToProps)(ChessPop)