/**
 * Created by sobi on 2017/6/30.
 */
import React, {Component} from 'react';
import { Link, IndexLink } from 'react-router';

export default class MgGamesTop extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const ImageGallery = window.r.get("ImageGallery");
        const options = window.r.props("ImageGallery");
        let bannerType = "games-imgs";
        if(window.config.spec == 'tyc'){
            bannerType = "games-imgs-AG"
        }
        var height = options.gameHeight || options.height || "170px";
        return (
            <ImageGallery id="game-pt" width="100%" height={height} type={bannerType} imgtype='banner'></ImageGallery>
        )
    }
}