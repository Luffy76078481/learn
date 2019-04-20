import React, { Component } from 'react';
import "./css/FirstPage.scss";
import { connect } from 'react-redux';
import { Link, IndexLink, browserHistory } from 'react-router';
import {config} from "globalConfig";

class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            bgColor:'#004531',
            fontColor:'#417667',
            borderNone:'none',
            borBottom: 'solid 1px #275a4b',
            pxRuler:'20px'
        }
    }
    onTo(path) {
        browserHistory.push(path);
    }
    render() {
         const ImageGallery = window.r.get("ImageGallery");
        return (
            <div className="bet365_firstPanel">
                <div className="slider"><ImageGallery height="635px" imgtype='slider'></ImageGallery></div>
                <div className="secondaryFeature">
             <div className="keyPointsContainer">
            <div className="keyPoint">
                <Link to="/casino">
                    <span className="icon">
                    <img src={require("./index/images/bet365/0-950-GamesSelection-Icon.png")} alt=""/>
                    </span>
                    <span className="text">众多精彩荟萃</span>
                </Link>
            </div>
            <div className="keyPoint">
                <Link to="/promotions">
                    <span className="icon">
                        <img src={require("./index/images/bet365/0-950-Bonuses-Icon.png")} alt="独家每周奖金"/>
                    </span>
                    <span className="text">独家每周奖金</span>
                </Link>
            </div>
            <div className="keyPoint">
                <Link to="/games">  
                    <span className="icon">
                        <img src={require("./index/images/bet365/0-950-Favourites-Icon.png")}  alt="所有您最爱的老虎机" />
                    </span>
                    <span className="text">所有您最爱的老虎机</span>
                </Link>
            </div>
        </div>

        <div className="titleContainer">
            <div className="header">亚洲最强娱乐平台</div>
            <div className="subHeader">包括：</div>
        </div>
        <div className="gamePodContainer">
            <div className="gamePod" >
            <Link to="/sport"><img src={require("./index/images/bet365/sport.jpg")}  alt="体育" /></Link>
                <div className="gameName"><span>体育</span></div>
            </div>

            <div className="gamePod" >
            <Link to="/casino"><img src={require("./index/images/bet365/live.jpg")}  alt="真人视讯" /></Link>
                <div className="gameName"><span>真人视讯</span></div>
            </div>

            <div className="gamePod" >
            <Link to="/games"><img src={require("./index/images/bet365/laohuji.jpg")}  alt="老虎机" /></Link>
                <div className="gameName"><span>老虎机</span></div>
            </div>

            <div className="gamePod">
            <Link to="/bingo"><img src={require("./index/images/bet365/cai.jpg")} alt="彩票" /></Link>
                <div className="gameName"><span>彩票</span></div>
            </div>
        </div>
        <div className="clear"></div>

     </div>
            </div>
        );
        
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
}
const mapStateToProps = (state, ownProps) => (
    {

    }
);

export default connect(mapStateToProps)(FirstPage)