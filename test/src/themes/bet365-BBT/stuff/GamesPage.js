/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
// import './GamesPage.scss'


class GamesPage extends Component {

    constructor(props) {
        super(props);
        this.state={
            selPlatformId: null
        }
    }
    componentDidMount() {
        window.$("#root").attr("class", "gamecss");
        // document.title = "享受世界上最先进的在线游戏！"
    }
    render() {
        const NoticeBar = window.r.get("GamesPageNoticeBar");
        const GameListPanel = window.r.get("GameListPanel");
        const GamesPageTop = window.r.get("GamesPageTop");
        const options = window.r.props("GamesPage");
        return (
            <div className="Games-content">
                <GamesPageTop></GamesPageTop>
                {NoticeBar && !options.hideNotice?
                <div className="broadcast">
                    <div className="broadcast-bg"></div>
                    <div className="container">
                        <NoticeBar marqueeCls="broadcast-content z_in" marqueeWidth="905px" type="notice_slot"></NoticeBar>
                    </div>
                </div>:null}
                <div id="Gamebg">
                        <GameListPanel selPlatformId={this.state.selPlatformId} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {}
);

export default connect(mapStateToProps, {})(GamesPage);