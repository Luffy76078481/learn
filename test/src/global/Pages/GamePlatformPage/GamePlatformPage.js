/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';

import {connect} from 'react-redux';
import './GamePlatformPage.scss'


class GamePlatformPage extends Component {

    constructor(props) {
        super(props);
        this.state={
            selPlatformId: props.platforms
        }
    }
    componentDidMount() {
    }

    renderPlatformList() {
        var platformLists = [];

        for (var i = 0; i < this.props.platforms.length; i++) {
            var platform = this.props.platforms[i];
            if(!platform.showSlot){
                continue;
            }

            platformLists.push(
                <li key={platform.id} className={platform.id} onClick={this.onClick.bind(this,platform.id)}></li>
            );

        }
        return platformLists;
    }
    onClick(e){
        location.href="/games?tab="+e
    }
    render() {
        const options = window.r.props("GamePlatformPage");
        const gamePlatform  = this.renderPlatformList();
        return (
            <div className="GamePlatformPage">
                <div className="center">
                    <ul>
                        {gamePlatform}
                    </ul>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        views:state.views,
        gameCategories: state.game.gameCategories,
        games: state.game.games,
        platforms: state.game.platforms,
    }
);

export default connect(mapStateToProps, {})(GamePlatformPage);