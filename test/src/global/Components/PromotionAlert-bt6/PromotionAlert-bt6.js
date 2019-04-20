

import React, {Component} from 'react';
import "./PromotionAlert-bt6.scss";

export default class PromotionAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            nowLink:"",
            showPop:true,
            nowContent:"",
        }
    }
    componentDidMount(){
        if(sessionStorage.getItem("homePopState")){
            this.state.showPop = false;
            return;
        }
        new window.actions.ApiNoticeAction("home-promotion").fly(resp=>{
            if (resp.StatusCode == 0 && resp.NewsInfo.length > 0) {
                this.setState({message: resp.NewsInfo});
            }
        }, "home-promotion");
    }

    renderContent(){
        if(this.state.nowContent == ""){
            this.state.nowContent = this.state.message[0].Content
        }
        return  this.state.message.map(data=>{
            return(
                <li key={data.Id} onMouseOver={this.ulHover.bind(this,data.Content,data.ExternalLink)}>
                    <a href={data.ExternalLink} target="_blank" className={data.Content == this.state.nowContent?"pop-box-hover":null}>{data.Title}</a>
                </li>
            )
        });
    }

    ulHover(Content,Link){
        this.setState({
            nowContent:Content,
            nowLink:Link
        });
    }

    closePop(){
        this.setState({
            showPop:false
        });
        sessionStorage.setItem("homePopState",true)
    }

    render() {
        return (
            <div >
                { this.state.message &&this.state.showPop?
                    <div id="container">
                        <div className="home-pop-title"></div>
                        <div className="home-pop-close" onClick={this.closePop.bind(this)}></div>
                        <div className="home-pop-content-box">
                            <ul className="home-pop-content-leftUl">
                                {this.renderContent()}
                                <li key={111} >
                                    <div className="home-pop-left-url"></div>
                                </li>
                            </ul>
                            <a href={this.state.nowLink || "javascript:void:(0)"} target="_blank">
                                <div className="home-pop-content-rightImg" dangerouslySetInnerHTML={{__html: this.state.nowContent}}></div>
                            </a>
                        </div>
                    </div>
                :null}

            </div>
        )

    }
}