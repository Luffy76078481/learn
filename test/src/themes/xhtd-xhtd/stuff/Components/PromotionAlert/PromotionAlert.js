// xhtd - 首页优惠弹窗

import * as React from "react";
import "./PromotionAlert.scss";

export default class PromotionAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            message: "",
            link:"",
            showPop:true
        }   
        if(sessionStorage.getItem("xhtdTc") == "true"){
            this.state.showPop = false;
        }else{
            sessionStorage.setItem("xhtdTc","true");
        }          
    }
    // 优惠数据
    componentDidMount(){
        new window.actions.ApiNoticeAction("home-promotion").fly(resp=>{
            if (resp.StatusCode === 0 && resp.NewsInfo.length > 0) {
                this.setState({message: resp.NewsInfo[0].Content, title: resp.NewsInfo[0].Title,externalLink: resp.NewsInfo[0].ExternalLink});
            }

        }, "home-promotion");
    }
    showNotice(){
        window.$(this.refs.popBox).addClass('popout');
    }
    hidNotice(){
        window.$(this.refs.popBox).removeClass('popout');
    }
    render() {
        let optios = window.r.props("FirstPagePromotionAlert");
        let link = optios.link|| "#";
        return (          
            <div id="testaa" className="promotionAlert popBox popout" ref="popBox">
                {this.state.message && this.state.showPop?
                <div >
                    <div className="popBox_title">
                        <i className="fa fa-circle-o-notch popBox_pic" aria-hidden="true"></i>&nbsp;&nbsp;{this.state.title}
                        <i className="fa fa-times popBox_close" aria-hidden="true" onClick={this.hidNotice.bind(this)}></i>
                    </div>
                    <a href={this.state.externalLink} target="blank" className="mainBody">
                        <div className="popBox_body" dangerouslySetInnerHTML={{__html: this.state.message}}></div>
                        {!optios.linkBlock ? null:
                        <a href={link}  target="_blank" className="linkBtn"></a>}
                    </a>
                </div>:null} 
            </div>
            )
    }
}