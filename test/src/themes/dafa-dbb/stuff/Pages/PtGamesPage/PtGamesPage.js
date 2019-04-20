/**
 * update --              2018.12
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './PtGamesPage.scss'
class PtGamesPage extends Component {
    componentDidMount() {
        window.$("#root").attr("class", "agcss");
    }
    render() {
        const PtGamesTop = window.r.get("PtGamesTop");
        const NoticeBar = window.r.get("PtGamesNoticeBar");
        const GameListPanel = window.r.get("GameListPanel");
        const GameListPanel2 = window.r.get("GameListPanel2");
        return (
            <div className="PtPage-content">
                {PtGamesTop?<PtGamesTop></PtGamesTop>:null}
                { NoticeBar ?<div className="broadcast">
                    <div className="broadcast-bg BGcolor-main broadcast-img"></div>
                    <div className="container">
                        <NoticeBar marqueeCls="broadcast-content z_in" marqueeWidth="905px" type="notice_pt"></NoticeBar>
                    </div>
                </div>:null}
                <div id="PTbg">
                    <GameListPanel2 limitPlatform="" id="PTbg"></GameListPanel2>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {}
);

export default connect(mapStateToProps, {})(PtGamesPage);