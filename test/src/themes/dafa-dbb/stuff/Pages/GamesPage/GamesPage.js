/**
 * ???
 */
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './GamesPage.scss'


class GamesPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            selPlatformId: null
        }
    }
    componentDidMount() {
        window.$("#root").attr("class", "gamecss");
    }
    render() {
        const NoticeBar = window.r.get("GamesPageNoticeBar");
        const GameListPanel = window.r.get("GameListPanel");
        return (
            <div className="Games-content">
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