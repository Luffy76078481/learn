import React, {Component} from 'react';
import "./NoticeBar.scss";

class PopNews extends Component {
    constructor(props) {
        super(props);
        this.state = {messages:[]};
        new window.actions.ApiNoticeAction(props.type).fly(resp=>{
            if (resp.StatusCode === 0) {
                this.setState({messages: resp.NewsInfo});
            }
        }, "pop_news_" + props.type);
    }
    showNotice(){
        window.$(this.refs.popBox).addClass('popout');
    }
    hidNotice(){
        window.$(this.refs.popBox).removeClass('popout');
    }
    renderNotice() {
        var ret = [];
        for (var i = 0; i < this.state.messages.length; i++) {
            var msg = this.state.messages[i];
            ret.push(
                <li key={i}>
                    <p className="popBox_body_date">{msg.CreateTime}</p>
                    <p className="popBox_body_title">{msg.Title}</p>
                    <p className="popBox_body_content"><span>{msg.Content}</span>
                    </p>
                </li>
            )
        }
        return ret;
    }
    render() {
        // 公告滚动
        let marqueeCotent = this.state.messages&&this.state.messages[0]&&this.state.messages[0].Content || "";
        let animaTime = Math.floor(marqueeCotent.length / 3) || 45;
        return  (
            <div className="notice-bar">

                <div ref="headNotice" direction="left" className={this.props.marqueeCls + "  marquee"} id="NoticeList">
                    <a href="javascript:void(0);" style={{animation: 'marquee ' + animaTime + 's linear infinite'}} title="网站公告 Site Notice" onClick={this.showNotice.bind(this)} className="app_color color-main">{marqueeCotent}</a>
                </div>
                {/* 公告点击弹窗 */}
                <div ref="popBox" className="popBox">
                    <div className="popBox_title">
                        <i className="fa fa-circle-o-notch popBox_pic" aria-hidden="true"></i>网站公告
                        <i className="fa fa-times popBox_close" aria-hidden="true" onClick={this.hidNotice.bind(this)}></i>
                    </div>
                    <div className="popBox_body">
                        <ul>
                            {this.renderNotice()}
                        </ul>
                    </div>
                </div>
            </div>)
    }
}

export default PopNews;