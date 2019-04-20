/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './PtGamesPage.scss'

class PtGamesPage extends Component {
    componentDidMount() {
        window.$("#root").attr("class", "agcss");
        // document.title = "dafabet娱乐场-最好的在线娱乐场dafabet超级大奖等你来！"
    }
    render() {
        const PtGamesTop = window.r.get("PtGamesTop");
        const NoticeBar = window.r.get("PtGamesNoticeBar");
        const GameListPanel = window.r.get("GameListPanel");
        const GameListPanel2 = window.r.get("GameListPanel2");
        // const ImageGallery = window.r.get("ImageGallery");
        // const options = window.r.props("ImageGallery");
        // const options2 = window.r.props("PtGamesPage");
        // const height = options.PtHeight || options.height || "170px";

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
                    {/*{!options2.topBanner?null:*/}
                    {/*<div className="PtBanner">*/}
                    {/*<ImageGallery width="100%" height={height} type="Pt_banner_imgs" class="game_list_top_img" imgtype='banner'></ImageGallery>*/}
                    {/*</div>}*/}
                    {/*<GameListPanel limitPlatform="PT" id="PTbg"></GameListPanel>*/}
                    {GameListPanel2?<GameListPanel2 limitPlatform="PT" id="PTbg"></GameListPanel2>
                        :<GameListPanel limitPlatform="PT" id="PTbg"></GameListPanel>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {}
);

export default connect(mapStateToProps, {})(PtGamesPage);