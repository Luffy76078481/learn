/**
 * Created by xm on 2017/5/8.
 */

import React, {Component} from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import './css/ChessMerge.scss';
class ChessMerge extends Component {

    constructor (props){
        super(props);
        this.state = {selGameId:"", sportLink:"about:blank", width:"1020px"};
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
        window.$("#root").attr("class", "usefulcss");
    }

     

    render() {
        let sportGames = [];
        //用户未登陆不显示N188体育
        if(!this.props.user.username){
            for(let i = 0; i< this.props.sportGames.length; i++){
                if(this.props.sportGames[i].platformId != "N188"){
                    sportGames.push(this.props.sportGames[i]);
                }
            }
        }else{
            sportGames = this.props.sportGames.slice();
        }

        if(sportGames.length % 2 == 1){
            sportGames.push({
                platformId: "coming",
                name: "敬请期待"
            })
        }
        const ImageGallery = window.r.get("ImageGallery");
        const options = window.r.props('SportPage');
        const options2 = window.r.props('ImageGallery');
        let height = options2.sportHeight || options2.height || "170px";
        return (
            <div className="sport-content">
                {ImageGallery && <ImageGallery width="100%" height={height} type="sport_banner_imgs" imgtype='banner' />}
                <div className="wow  chess-div">
                    <ul className="sport-card fadeInUp animated">
                        <li className='kaiyuan'>
                            {/* <div className="logo">什么棋牌</div> */}
                            <div className="body">
                                <div className="inner-logo"></div>
                            </div>
                            {/* <div className="foot"></div> */}
                            <div className="mask">
                                <Link to='/streetMachine' className="start">开始游戏</Link>
                            </div>
                        </li>
                        <li className='tianmei'>
                            {/* <div className="logo">什么棋牌</div> */}
                            <div className="body">
                                <div className="inner-logo"></div>
                            </div>
                            {/* <div className="foot"></div> */}
                            <div className="mask">
                            <Link to='/streetMachine2' className="start">开始游戏</Link>
                            </div>
                        </li>
                        <li className='agbuyu'>
                            {/* <div className="logo">什么棋牌</div> */}
                            <div className="body">
                                <div className="inner-logo"></div>
                            </div>
                            {/* <div className="foot"></div> */}
                            <div className="mask">
                            <Link to='/ag' className="start">开始游戏</Link>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        sportGames:state.game.sportGames
    }
);

export default connect(mapStateToProps, {})(ChessMerge);