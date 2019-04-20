/**
 * Created by xm on 2017/5/8.
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
        const GameListPanel = window.r.get("GameListPanel");
        const GamesPageTop = window.r.get("GamesPageTop");
        return (
            <div className="Games-content">
                {/* banner */}
                {GamesPageTop?<GamesPageTop></GamesPageTop>:null}
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