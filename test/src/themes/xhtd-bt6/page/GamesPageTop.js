/**
 * Created by sobi on 2017/6/30.
 */
import React, {Component} from 'react';
import { Link, IndexLink } from 'react-router';

export default class GamesPageTop extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const ImageGallery = window.r.get("ImageGallery");
        return (
            <div className="banner">
                <ImageGallery id="game-pt" width="100%" height="170px" type="games-imgs"
                              imgtype='banner'></ImageGallery>
            </div>
        )
    }
}