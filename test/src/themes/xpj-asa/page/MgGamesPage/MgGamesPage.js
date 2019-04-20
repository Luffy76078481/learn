/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './MgGamesPage.scss'

class MgGamesPage extends Component {

    render() {
        const MgGamesTop = window.r.get("MgGamesTop");
        const NoticeBar = window.r.get("MgGamesNoticeBar");
        const GameListPanel = window.r.get("GameListPanel");
        // const ImageGallery = window.r.get("ImageGallery");
        // const options = window.r.props("ImageGallery");
        const options2 = window.r.props("MgGamesPage");
        const options = window.r.props("ImageGallery");
        const ImageGallery = window.r.get("ImageGallery");
        const height = options.MgHeight || options.height || "170px";
        // const height = options.MgHeight || options.height || "170px";


        return (
            <div className="Mg-content">
                {MgGamesTop?
                <MgGamesTop></MgGamesTop>:null}

                {NoticeBar?<div className="broadcast">
                    <div className="broadcast-bg BGcolor-main"></div>
                    <div className="container">
                        <NoticeBar marqueeCls="broadcast-content z_in" marqueeWidth="905px" type="notice_mg"></NoticeBar>
                    </div>
                </div>:null}
                {options2.banner == true ?
                <ImageGallery width="100%" height={height} type="mg-imgs" class="mgBanner" imgtype='banner'></ImageGallery>
                :null
                }
                <div id="MGbg">
                    <GameListPanel limitPlatform="MG2" li="" id="PTbg"></GameListPanel>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {}
);

export default connect(mapStateToProps, {})(MgGamesPage);