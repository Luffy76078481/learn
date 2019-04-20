import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import "./ChessPop.scss"
import { Modal } from 'antd-mobile';
import {config} from "globalConfig";
 
class ChessPopPHB extends Component{
    constructor(props) {
        super(props);
        this.state={
     
        }
    }

    rankList(){
        console.log(this.props.activity)
        return (this.props.activity.map((Data,index)=>{
            let imgName = Data.HeadImagePath || String.fromCharCode(64+Math.floor(Math.random()*10+1));
            if(index<3){
                return(
                    <li key={index}>
                        <div className={"rank-index rank-index"+(index+1)}></div>
                        <div className="rank-img"><img src={require(`../../style/images/chess/touxiang/${imgName}.png`)}/></div>
                        <div className="rank-username">{Data.UserName}</div>
                        <div className="rank-money">
                            <i className="rank-money-icon"></i>
                            <span>{Data.RealBet}</span>
                        </div>
                        <div className="rank-prize">
                            <i className="rank-prize-icon"></i>
                            <span>{Data.Reward}</span>
                        </div>
                    </li>
                )
            }else{
                return(
                    <li key={index}>
                        <div className="rank-index">{index+1}</div>
                        <div className="rank-img"><img src={require(`../../style/images/chess/touxiang/${imgName}.png`)}/></div>
                        <div className="rank-username">{Data.UserName}</div>
                        <div className="rank-money">
                            <i className="rank-money-icon"></i>
                            <span>{Data.RealBet}</span>
                        </div>
                        <div className="rank-prize">
                            <i className="rank-prize-icon"></i>
                            <span>{Data.Reward}</span>
                        </div>
                    </li>
                )
            }
        }))
    }
    
    render(){
        return(
            <div className="chesspop-neibox ranking">
                <p className="chesspop-white-titlefont chesspop-head">
                    <span className="chesspop-head-title chesspop-head-title-ranking"></span>
                </p>
                <div className="chesspop-botbox chesspop-botbox-allstyle">
                     <ul className="chesspop-rankBox">
                        {this.rankList()}
                     </ul>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        activity:state.activity
    }
);

export default connect(mapStateToProps)(ChessPopPHB)