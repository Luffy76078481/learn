/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';
import './AgPage2.scss'

import {connect} from 'react-redux';

import agbuyu from './images/agbuyu.jpg';
import bbinBuYu from './images/bbinBuYu.png';

class AgPage2 extends Component {
    constructor(props) {
        super(props);

    }
    onClickGameLink(link) {
        window.actions.authToLink(link);
    }
    componentDidMount() {
        window.$("#root").attr("class", "agcss");
    }
    render() {
        const  gameLink = window.configHelper.getGamePlayLink('AC656FE07A6E414FBA69A1F5DAA05ED4');
        const bbinLink = window.configHelper.getGamePlayLink('D649B66F3C164832AF7C63A94D0D6027');
        const ImageGallery = window.r.get("ImageGallery");
        const options2 = window.r.props('ImageGallery');
        let height = options2.agPageHeight || options2.height || "170px";
        return (
            <article id="ag-game">
                {ImageGallery &&
                <ImageGallery width="100%" height={height} type="ag_banner_imgs" imgtype='banner'/>}
                <div className="gogame" onClick={this.onClickGameLink.bind(this, gameLink)}></div>
                 <div className="main">
                     {/*<div className="txt">*/}
                         {/*<h1>在亚洲最佳捕鱼游戏捕获最巨大的鱼！</h1>*/}
                         {/*<p>在捕鱼王游戏体验渔汛乐趣！捕捉海洋中最巨大的鱼获取巨额奖励！</p>*/}
                     {/*</div>*/}
                     {/* <div className="agGameList">
                         <div className="listItem" onClick={this.onClickGameLink.bind(this, gameLink)}>
                             <h5>AG捕鱼</h5>
                             <img src={agbuyu} />
                             <a>开始游戏</a>
                         </div>
                         <div className="listItem" onClick={this.onClickGameLink.bind(this, bbinLink)}>
                             <h5>BBIN捕鱼</h5>
                             <img src={bbinBuYu} />
                             <a>开始游戏</a>
                         </div>
                     </div> */}
                    <div className='street_box'>
                        <div className='street_center'>
                                <div className='street_kaiyuan street_ag' onClick={this.onClickGameLink.bind(this, gameLink)}>
                                <div className='street_start'>马上游戏</div>
                                <div className='shadom'></div>
                            </div>
                                <div className='street_yoplay street_bbin' onClick={this.onClickGameLink.bind(this, bbinLink)}>
                                <div className='street_start'>马上游戏</div>
                                <div className='shadom'></div>
                            </div>
                        </div>
                    </div>
                 </div>
            </article>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user:state.user
    }
);

export default connect(mapStateToProps, {})(AgPage2);