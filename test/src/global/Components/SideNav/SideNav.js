import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import "./SideNav.scss";

class SideNav extends Component{

    render(){
        const options = window.r.props("SideNav");
        const promotionLink = window.configHelper.getPromotionUrl();
        return (
            <div className="SideNav">
                <div className="boxes">
                   <ul>
                       <li><Link to="/sport"></Link></li>
                       <li><Link to="/bingo"></Link></li>
                       <li><Link to="/casino"></Link></li>
                       <li><Link to="/games"></Link></li>
                   </ul>
                </div>
            </div>
        );
    }



}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(SideNav)
