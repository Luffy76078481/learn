import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import "./ChessPop.scss"


class ChessPopHD extends Component{
    constructor(props){
        super(props);
        this.state={
            tabType:this.props.showChessModal.tabType,
            message:this.props.showChessModal.tabType == "yxgg"?this.props.notices:this.props.homePromotion,
            nowContent:"",
            nowLink:""
        }
    }
    
    componentWillReceiveProps(nextProps){
        if(this.props.tabType !== nextProps.tabType){
            if(nextProps.tabType === "jchd"){
                this.setState({
                    tabType:nextProps.tabType,
                    message:this.props.homePromotion,
                    nowContent:""
                })
            }else{
                this.setState({
                    tabType:nextProps.tabType,
                    message:this.props.notices,
                    nowContent:""
                })
            }
        }
    }
 

    ulHover(Content,Link){
        this.setState({
            nowContent:Content,
            nowLink:Link
        });
    }

    
    renderList(){
        if(this.state.nowContent == "" && this.state.message.length>0){
            this.state.nowContent = this.state.message[0].Content;
            this.state.nowLink = this.state.message[0].ExternalLink;
        }
        let dataList = this.state.message.map(data=>{
            return(
                <li
                    key={data.Id}
                    onClick={this.ulHover.bind(this,data.Content,data.ExternalLink)}
                    className={["hot",data.Content == this.state.nowContent? "chesspop-self-left-li-active":"chesspop-self-left-li-normal"].join(" ")}
                    >
                    <span className="chesspop-self-left-li-title">{data.Title}</span>
                </li>
        )
        });
        return(
            <div className="chesspop-botbox">
                 <div className="chesspop-self-left">
                    <ul>
                        {dataList}
                    </ul>
                </div>
                <div className="chesspop-self-right">
                    <a href={this.state.nowLink || "javascript:void:(0)"} target="_blank">
                        <div className="home-pop-content-rightImg" dangerouslySetInnerHTML={{__html: this.state.nowContent}}></div>
                    </a>
                </div>
            </div>
        );
    }



    changeTabtoGg(){
        this.setState({
            tabType:"yxgg",
            message:this.props.notices,
            nowContent:""
        })
    }

    changeTabtoHd(){
        this.setState({
            tabType:"jchd",
            message:this.props.homePromotion,
            nowContent:""
        })
    }
    
  
    render(){
        return (
            <div className="chesspop-neibox Activity">
                <p className="chesspop-white-titlefont chesspop-head">
                    <span onClick={this.changeTabtoHd.bind(this)} className={["chesspop-head-title",this.state.tabType == "jchd" && "chesspop-head-title-active"].join(" ")}></span>
                    <span onClick={this.changeTabtoGg.bind(this)} className={["chesspop-head-title chesspop-head-title2",this.state.tabType == "yxgg" && "chesspop-head-title2-active"].join(" ")}></span>
                </p>
                { this.renderList()}
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        notices:state.notices,
        homePromotion:state.homePromotion,
        showChessModal:state.showChessModal
    }
)
export default connect(mapStateToProps)(ChessPopHD)