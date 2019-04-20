/**
 * Created by sobi on 2017/6/30.
 */
import React, {Component} from 'react';
import { Link, IndexLink } from 'react-router';

export default class PtGamesTop extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const num = window.numbers["pt"] || ("888," + Math.floor(Math.random()*899 + 100) + "," + Math.floor(Math.random()*899 + 100));
        const kyy_num = window.numbers["games"] || ("178," + Math.floor(Math.random()*899 + 100) + "," + Math.floor(Math.random()*899 + 100));
        return (
            <article id="game-pt" className="BGcolor-main game-title-img ">
                <div className="container">
                    <div className="row" style={{position:'relative'}}>
                        <div className="col-md-3 game-pt-client wow fadeInUp animated" style={{visibility:"visible",animationName:"fadeUp"}}>
                            <a href="http://cdn.silvereagle88.com/generic/setupglx.exe" target="_blank">
                                <div className="ptgame_download_img"></div>
                            </a>
                            <a href="http://m.ld176988.com/download.html">
                                <div className="ptwapDownload"></div>
                            </a>
                        </div>
                      <div className="col-md-5 game-ptjackpot-num"><span className="jackpot" data-key="pt">{kyy_num}</span></div>
                        <div className="col-md-3 game-ptheader-focus-right wow fadeInUp animated color-second" style={{visibility:"visible",animationName:"fadeUp"}}>
                            <ul>
                                <li>
                                    <p className="color-main" >神的时代：激情四</p>
                                    <div className="game-header-focus-right-jackpot"><i></i>￥<span className="jackpot">474,776,721.78</span></div>
                                    <div className="clear"></div>
                                </li>
                                <li>
                                    <p className="color-main" >金色召集</p>
                                    <div className="game-header-focus-right-jackpot"><i></i>￥<span className="jackpot">6,109,587.47</span></div>
                                    <div className="clear"></div>
                                </li>
                                <li>
                                    <p className="color-main" >高速公路之王</p>
                                    <div className="game-header-focus-right-jackpot"><i></i>￥<span className="jackpot">31,969,303</span></div>
                                    <div className="clear"></div>
                                </li>
                                <li>
                                    <p className="color-main" >疯狂水果</p>
                                    <div className="game-header-focus-right-jackpot"><i></i>￥<span className="jackpot">101,501.55</span></div>
                                    <div className="clear"></div>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}