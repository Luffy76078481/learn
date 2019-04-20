/**
 * 记录--导航--
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';
import "./RecordsPage.css";

class RecordsPage extends Component {

    render() {
        return (

            <div className="clearfix t20 report member-content">
                <div className="t f14 member-border-bottom">
                    <Link to="/records" className={this.props.location.pathname == ("/records") ?'iblock on':'iblock'}>投注记录</Link>
                    <Link to="/records_transfer" className={this.props.location.pathname == ("/records_transfer") ?'iblock on':'iblock'}>转账记录</Link>
                    <Link to="/records_deposit" className={this.props.location.pathname == ("/records_deposit") ?'iblock on':'iblock'}>存款记录</Link>
                    <Link to="/records_withdraw" className={this.props.location.pathname == ("/records_withdraw") ?'iblock on':'iblock'}>取款记录</Link>
                    <Link to="/records_promotion" className={this.props.location.pathname == ("/records_promotion") ?'iblock on':'iblock'}>优惠记录</Link>
                </div>

                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {

    }
);

export default connect(mapStateToProps, {

})(RecordsPage);