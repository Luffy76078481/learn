import React, {Component} from 'react';
import {connect} from 'react-redux';
import {auth} from "globalAction";
import './css/SportPage.scss';
class FanyaEs extends Component {
    constructor (props){
        super(props);
        this.state = {
            gameUrl:"",
            fyData:{},
            loding:false,
            lock:false
        }
    }
    componentWillReceiveProps(nextProps){
       
        nextProps.sportGames.forEach( game =>{
            if(game.GamePlatform == "FY"){
                if(!this.state.loding){
                    this.setState({
                        fyData:game,
                        loding:true
                    })
                    let gameLink;
                    let parma = {
                        GamePlatform:game.GamePlatform,
                        GameType:game.GameTypeText,
                        GameId:game.GameIdentify,
                        IsMobile:false,
                        IsDemo:false
                    }
                    new window.actions.ApiGetLoginUrl(parma).fly(res=>{
                        if(res.StatusCode == 0){
                            gameLink = res.GameLoginUrl;
                            this.setState({
                                gameUrl:gameLink,
                            })
                        }else{
                            swal(res.Message)
                        }
                    })
                }
            }             
        })
    }
    //  获取FY - frame
    fyRender(){
        let ret = [];
        if(this.state.gameUrl){
            ret.push(
                <iframe key='fy' ref="iframeGame" src={this.state.gameUrl} width="100%" height="1000px" frameBorder="0" /> 
            )
        }
        return ret;
    } 
    render() {
        if (!auth()) {
            return (
                <div className="sport-content">
                    <div className="fyContent">

                    </div>
                </div>
            )
        } 
        return(
            <div className="sport-content">
                <div className="fyContent">
                    {
                        this.state.loding?this.fyRender(this.state.fyData):<p className='waitData'>数据加载中...</p>
                    } 
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

export default connect(mapStateToProps, {})(FanyaEs);