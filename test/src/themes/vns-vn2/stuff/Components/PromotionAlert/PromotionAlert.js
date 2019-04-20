import * as React from "react";
import "./PromotionAlert.scss";
import {config} from "globalConfig";
export default class PromotionAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            message: "",
            link:"",
            showPop:true
        }
        // xhtd 广告只显示1次
        if(config.spec == "xhXhtd_new"){
            if(sessionStorage.getItem("xhtdTc") == "true"){
                this.state.showPop = false;
            }else{
                sessionStorage.setItem("xhtdTc","true")
            }          
        }
    }
    componentDidMount(){
        new window.actions.ApiNoticeAction("home-promotion").fly(resp=>{
            if (resp.status === 0 && resp.page.content.length > 0) {
                this.setState({message: resp.page.content[0].content, title: resp.page.content[0].title,externalLink: resp.page.content[0].externalLink});
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
            <div id="testaa">
                {this.state.message && this.state.showPop?
                    <div ref="popBox" className="promotionAlert popBox popout">
                        <div className="popBox_title">
                            <i className="fa fa-circle-o-notch popBox_pic" aria-hidden="true"></i>&nbsp;&nbsp;{this.state.title}
                            <i className="fa fa-times popBox_close" aria-hidden="true" onClick={this.hidNotice.bind(this)}></i>
                        </div>
                        <a href={this.state.externalLink} target="blank" className="mainBody">
                            <div className="popBox_body" dangerouslySetInnerHTML={{__html: this.state.message}}></div>
                            {!optios.linkBlock ? null:
                            <a href={link}  target="_blank" className="linkBtn"></a>}
                        </a>
                    </div>
                    :null
                }
            </div>
            )
    }
}