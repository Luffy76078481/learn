/**
 * Created by xm on 2017/5/8.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MtGamesPage.scss';
import appqr from './images/downappqr.png';

class MtGamesPage extends Component {

    render() {
        return (
            <div className="Mg-content">
                <div id="MGbg">
                    <div className='qr_content'>
                        <img className='quit_code' src={appqr} />
                        <a href="http://cdn.moneytree88.com/mtgame/mtgame-pc_1024.exe" download="MTgame_pc"><button className="down"></button></a> 
                    </div>
                   
                </div>
               
                
                 
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {}
);

export default connect(mapStateToProps, {})(MtGamesPage);