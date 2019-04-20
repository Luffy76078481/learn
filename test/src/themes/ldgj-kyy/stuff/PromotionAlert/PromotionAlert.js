

import React, {Component} from 'react';
import "./PromotionAlert.scss";

export default class PromotionAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            message: "",
            link:"",
            showPop:true
        }
    }
    componentDidMount(){
        if(sessionStorage.getItem("homePopState")){
            window.$(this.refs.popBox).removeClass('popout');
            return;
        }
        new window.actions.ApiNoticeAction("home-promotion").fly(resp=>{
            if (resp.StatusCode == 0 && resp.NewsInfo.length > 0) {
                this.setState({message: resp.NewsInfo[0].Content, title: resp.NewsInfo[0].Title,externalLink: resp.NewsInfo[0].ExternalLink});
            }

        }, "home-promotion");
    }
    showNotice(){
        $(this.refs.popBox).addClass('popout');
    }
    hidNotice(){
        sessionStorage.setItem("homePopState",true)
        window.$(this.refs.popBox).removeClass('popout');
    }
    render() {
        let optios = window.r.props("FirstPagePromotionAlert");
        let link = optios.link|| "#";
        return (
            <div>
                { this.state.message &&this.state.showPop?
                    <div ref="popBox" className="promotionAlert popBox popout">
                        {/* <div className="popBox_title">
                            <i className="fa fa-circle-o-notch popBox_pic" aria-hidden="true"></i>&nbsp;&nbsp;{this.state.title}
                            <i className="fa fa-times popBox_close" aria-hidden="true" onClick={this.hidNotice.bind(this)}></i>
                        </div> */}
                   
                          {/* <i className="fa fa-times popBox_close" aria-hidden="true" onClick={this.hidNotice.bind(this)}></i> */}
                        <a href={this.state.externalLink} target="blank" className="mainBody">
                        <i className="fa fa-times popBox_close" aria-hidden="true" onClick={this.hidNotice.bind(this)}></i>
                            <div className="popBox_body" dangerouslySetInnerHTML={{__html: this.state.message}}></div>
                            {!optios.linkBlock ? null:
                            <a href={link}  target="_blank" className="linkBtn"></a>}
                        </a>
                    </div>:null
                }
            </div>
            )

    }
}