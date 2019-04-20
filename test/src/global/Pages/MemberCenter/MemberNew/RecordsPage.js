/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';
class RecordsPage extends Component {
    activeCls() {
        for (var i = 0; i < arguments.length; i++) {
            var name = arguments[i];
            if (this.props.location.pathname === name) {
                return "active";
            }
        }
        return "";
    }
    render() {
        return (
            <div className="recordsHistory">
                <div className="maincontent">
                    <div className="tabs_holder">
                        <ul className="nav nav-tabs">
                            <li className={this.activeCls("/records")}>
                                <Link to="/records"> 投注记录 </Link>
                            </li>
                            <li className={this.activeCls("/records_deposit")}><Link to="/records_deposit"> 充值记录 </Link></li>
                            <li className={this.activeCls("/records_withdraw")}><Link to="/records_withdraw"> 提款记录 </Link></li>
                            <li className={this.activeCls("/records_transfer")}><Link to="/records_transfer"> 转账记录 </Link></li>
                            <li className={this.activeCls("/records_message")}><Link to="/records_message"> 站内信 </Link></li>
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane fade in active">
                                {this.props.children}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="clearfix"></div>

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