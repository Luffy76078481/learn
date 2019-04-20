import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router';
import "./FirstPage.scss";
//import {config} from "globalConfig";


class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {tab:"pt"}
    }
    render() {
        const PopNews = window.r.get("NoticeBar");
        const ImageGallery = window.r.get("ImageGallery2");
        const HomeAdver = window.r.get("HomeAdver");
        const PromotionAlert = window.r.get("FirstPagePromotionAlert")
        // pc_home_images 首页轮播
        return (
            <div className="xhtdfirst">
                {/* xhtd轮播box高度 */}
                <ImageGallery height="440px" type="pc_home_images"></ImageGallery>
                <div className="newsbx">
                    {PromotionAlert && <PromotionAlert/>}
                    <div className="col-md-7 noticeCenter">
                        <span className='new_title'>最新资讯:</span>
                        <PopNews></PopNews>
                    </div>
                </div>
                <HomeAdver></HomeAdver>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        views:state.views,
        global: state.global,
        bestGames: state.game.bestGames,
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(FirstPage)