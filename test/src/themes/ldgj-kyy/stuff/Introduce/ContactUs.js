import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Introduce.scss';

import introduce1 from './images/Introduce1.jpg';
import introduce2 from './images/Introduce2.jpg';
/*关于我们*/
class ContactUs extends Component {
    render() {
        return (
            <div className="introduceCon clearfix ">
                <h2>联系我们</h2>
                <div className="content-tabs mb-20">
                    <ul className="tab clearfix">
                        <li className="tab-items text-center col-3 active">
                            <a name="content1" className="tab-item">
                                <span className="email-us"></span>
                                发送邮件
                            </a>
                        </li>
                        <li className="tab-items text-center col-3">
                            <a name="content2" className="tab-item">
                                <span className="live-chat"></span>
                                24/7在线聊天
                            </a>
                        </li>
                        <li className="tab-items text-center col-3">
                            <a name="content3" className="tab-item">
                                <span className="call-us"></span>
                                致电
                            </a>
                        </li>
                        <li className="tab-items text-center col-3">
                            <a name="content3" className="tab-item">
                                <span className="social"></span>
                                社交聊天
                            </a>
                        </li>
                    </ul>
                    <div className="tab-contents">
                        <div id="content1" className="tab-content">
                            <p>
                                发送邮件到&nbsp;<a className="text-yellow" href="mailto:cnsupport@dafabet.com">cnsupport@dafabet.com</a>
                            </p>
                        </div>
                        <div id="content2" className="tab-content clearfix live-chat-tab hidden">
                            <p className="mb-15 mt-15">点击此处进行 <span className="text-yellow"><a href="/linkto:avaya" target="">在线聊天</a></span>。</p>
                        </div>
                        <div id="content3" className="tab-content">
                            <p>
                                <a href="https://cdn-images.dafatouzhu.org/2017/01/entrypage/wechat-qr.png" style="color: white; text-decoration:none; font-weight:400" target="window"><span class="we-chat"></span>fafaaidafa </a>
                            </p>
                        </div>
                        <div id="content4" className="tab-content">
                            <p>
                                国际免费电话：&nbsp;<a className="text-yellow" >+63 927 475 2155</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({});

export default connect(mapStateToProps, {})(ContactUs);