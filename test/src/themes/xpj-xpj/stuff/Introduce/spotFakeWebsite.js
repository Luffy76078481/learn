import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Introduce.scss';

import introduce1 from './images/Introduce1.jpg';
import introduce2 from './images/Introduce2.jpg';
/*隐藏政策*/
class spotFakeWebsite extends Component {
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    render() {
        return (
            <div className="introduceCon clearfix ">
                <div className="col-8"><h2>识别假冒网站和</h2><p>为确保一个网站为大发所属网站，以下内容都必须存在：</p>

                    <ol><li>安全特性
                        <ul><li>访问真实的大发网站时，查看网址旁边的绿色挂锁</li>
                        </ul></li>
                        <li>多个地区可用
                            <ul><li>大发网站提供适用于所有目标市场的不同语言，多个邮件地址以及国际长途免费联系号码</li>
                            </ul></li>
                        <li><strong>高清图片</strong>
                            <ul><li>大发提供高清图片以保证最佳的玩家体验</li>
                            </ul></li>
                        <li><strong>重定向到大发网站</strong>
                            <ul><li>所有合法的大发商标或任何其他图片都应重定向到符合上述特征的大发网站。</li>
                            </ul></li>
                        <li><strong>大发不授权其竞争对手</strong>
                            <ul><li>大发不会授权任何竞争对手代表其进行经营操作</li>
                            </ul></li>
                    </ol><h1><strong>识别假冒邮件</strong></h1>

                    <p>假冒大发邮件是由黑客发出，恶意利用虚假信息和重定向链接欺骗受害者，以达到谋求私利的目的。 现有如下方法可辨别合法大发邮件与假冒大发邮件：</p>

                    <ol><li>邮件模板
                        <ul><li>大发的邮件开头称呼均为现有玩家的用户名/名字，而不仅仅是“玩家”。同时，若邮件出现拼写错误和语法错误，则该邮件也可能是假冒邮件。</li>
                        </ul></li>
                        <li>向玩家承诺可疑的奖金数额
                            <ul><li>假冒邮件会通过夸大奖金额数和奖励以试图诱骗玩家。</li>
                            </ul></li>
                        <li>账户更新
                            <ul><li>大发不会主动要求或请求玩家更改其账户信息和密码，除非玩家向客服提交修改申请。</li>
                            </ul></li>
                        <li>重定向到假网站
                            <ul><li>若邮件里面提供链接，您可在不点击链接情况下查看网站（如，您可将鼠标悬停在超链接上），并确定为真网站。若想了解如何识别假网站，请<a ><strong>点击这里</strong></a>&nbsp;</li>
                            </ul></li>
                        <li>附件
                            <ul><li>大发不会发送带有附件的邮件，除非是玩家正式提出申请要求发送。您打开附件前，请务必确认该邮件来自大发，因为附件可能带有病毒且试图获取敏感信息。</li>
                            </ul></li>
                    </ol><p>若您不确定邮件是否来自大发，请勿点击该邮件或邮件内的任何链接，马上联系<a onClick={this.serversOpen.bind(this)}><strong>大发客服</strong></a>。假如您收到可疑的邮件，请将假冒邮件附在新邮件上并发送至<a onClick={this.serversOpen.bind(this)}><strong>大发客服</strong></a>。</p>
                </div>
                <div className="col-4">
                    <h3 className="promo-banner-header">大发合作伙伴</h3>
                    <div className="promo-banner mb-20">
                        <a target="_blank"><img className="lazy-load lazy-loaded" src={introduce1} alt="Dafabet Partners" /></a>
                    </div>
                    <h3 className="promo-banner-header">品牌大使</h3>
                    <div className="promo-banner mb-20">
                        <a target="_blank"><img className="lazy-load lazy-loaded" src={introduce2} alt="品牌大使" /></a>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ( {
    remoteSysConfs: state.remoteSysConfs
});

export default connect(mapStateToProps, {})(spotFakeWebsite);