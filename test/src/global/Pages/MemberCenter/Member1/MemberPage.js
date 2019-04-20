/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import { Link, IndexLink } from 'react-router';
import './scss/style.scss'

class MemberPage extends Component {


    render() {
        return (
            <main className="Bgmember-main">
                <div className="tm">
                    <div className="divc w1000" style={{paddingBottom: "20px"}}>
                        <div className="ht-t ht-t-img">
                            <p className="cn">会员中心</p>
                            <p className="en">Member Centre</p>
                        </div>
                        <div className="ht-nav text-center">
                            <ul>
                                <li className={this.props.location.pathname === '/member'?'active':''}>
                                    <Link to="/member" className="item2 tm1 tm1-img ">
                                        <i className=" i1"></i>
                                        账户首页
                                    </Link>
                                </li>
                                <li className={this.props.location.pathname === '/deposit'?'active':''}>
                                    <Link to="/deposit" className="item2 tm2 tm2-img ">
                                        <i className=" i2"></i>
                                        我要存款
                                    </Link>
                                </li>
                                <li className={this.props.location.pathname === '/withdraw'?'active':''}>
                                    <Link to="/withdraw" className="item3 tm3 tm3-img ">
                                        <i className=" i3"></i>
                                        我要取款
                                    </Link>
                                </li>
                                <li className={this.props.location.pathname === '/transfer'?'active':''}>
                                    <Link to="/transfer" className="item4 tm4 tm4-img ">
                                        <i className=" i4"></i>
                                        额度转换
                                    </Link>
                                </li>
                                <li id="tm9" className="tm_dw member-color">
                                    <Link to="/preferences" className={this.props.location.pathname === "/preferences" ?'item9  on now':'item9'}>
                                        <i className={this.props.location.pathname === "/preferences" ?'fa fa-cog memberIconOn':'fa fa-cog'} aria-hidden="false" style={{position:'relative',top:'4px',fontSize:'25px',marginRight:'5px'}}></i>
                                        偏好设定
                                    </Link>
                                </li>
                                <li id="tm5" className="tm_dw on  member-color">
                                    <Link to="/person" className={this.props.location.pathname.indexOf('/person')===0?'item5 on now':'item5'}>
                                        <i className="htico"></i>
                                        安全中心
                                    </Link>
                                </li>
                                <li id="tm6" className="tm_dw  member-color">
                                    <Link to="/message" className={this.props.location.pathname === "/message" ?'item6 on now':'item6'}>
                                        <i className="htico"></i>
                                        消息中心
                                    </Link>
                                </li>
                                {/* <li id="tm7" className="tm_dw  member-color">
                                    <Link to="/preferential" className={this.props.location.pathname === "/preferential" ?'item7 on now':'item7'}>
                                        <i className="htico"></i>
                                        优惠活动
                                    </Link>
                                </li> */}
                                <li id="tm8" className="tm_dw  member-color">
                                    <Link to="/records" className={this.props.location.pathname.indexOf("/records")===0 ?'item8 on':'item8'}>
                                        <i className="htico"></i>
                                        报表中心
                                    </Link>
                                </li>
                                <li id="tm11" className="tm_dw  member-color">
                                    <Link to="/RecommendPage" className={this.props.location.pathname.indexOf("/RecommendPage")===0 ?'item11 on':'item11'}>
                                        <i className="fa fa-share-alt"></i>&nbsp;
                                        我的推广
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {this.props.children}
                    </div>
                </div>

            </main>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user
    }
);

export default connect(mapStateToProps, {})(MemberPage);