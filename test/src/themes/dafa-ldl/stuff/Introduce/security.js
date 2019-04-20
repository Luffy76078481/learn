import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Introduce.scss';

import introduce1 from './images/Introduce1.jpg';
import introduce2 from './images/Introduce2.jpg';
/*安全*/
class security extends Component {
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    render() {
        return (
            <div className="introduceCon clearfix ">
                <div className="col-8"><h2>大发体育安全性</h2><p>我们尽可能地确保您的资料安全地存放在我们这里。所有资料传输都会被加密，当资料存储在我们的服务器上时，当今最新的防火墙技术将会确保这些资料的安全。我们的网站和软件将会尽最大可能保证数据的准确和私密性，并确保您的资料不会被错误使用或丢失。</p>

                    <p>如果您有任何关于资料隐私和安全性的问题，请随时联络我们的客服。我们的<a onClick={this.serversOpen.bind(this)}>客服代表</a>将会很乐意协助您。</p>

                    <h3>Cookies 政策</h3>

                    <p>大发致力于为您提供最佳的服务和用户体验。我们的方法之一是通过使用cookie来达成此使命。</p>

                    <h3>什么是 “Cookie”?</h3>

                    <p>Cookie，指的是浏览器或跟踪Cookie通过网络服务器发送给网络浏览器的一小部分信息，同时允许网络服务器从浏览器上收集信息。当您加载一个特定的网站，cookie将被创建。每当用户访问同一网站时候，浏览器将检索并收集信息发送至该网站的服务器。</p>

                    <p>使用Cookies能帮助用户高效浏览网站并执行某些功能。由于其核心作用是增强或启用可用性或站点进程，因此禁用cookies可能会阻止用户使用网站的某些功能。</p>

                    <h3>大发如何使用Cookies</h3>

                    <p>通常来说，大发通过使用cookie来提高用户体验。为了让您更好的理解，下面我们将为您讲解我们的网站是如何使用cookies的。</p>

                    <p>跟踪并分析</p>

                    <ul><li>Cookies用于分析网站流量，并达到进一步改善我们的网站服务的目的。</li>
                        <li>它所收集信息将会用于大发合营商计划。</li>
                        <li>它用于分析用户在网站内的活动情况，并收集关于游客如何使用我们网站的信息。大发将使用以上信息撰写报告，并帮助我们改进服务。</li>
                    </ul><p>功能</p>

                    <ul><li>当您再次访问网站时，它将让我们辨识出您并显示您的首选内容。</li>
                        <li>它可用于加速并提高您对我们所提供服务的体验。</li>
                        <li>Cookies可用于在线聊天服务，并为我们网站的游客提供客户支持。</li>
                    </ul><p>大发使用的Cookies分为会话式和持久式。会话式Cookies会在每次您注销后失效，持久式Cookies会储存在您的浏览器中根据您的浏览器设定1分钟到数年后失效不等。</p>

                    <h3>如何管理cookies</h3>

                    <p>如果您想停用cookies功能，您可以随时通过删除或修改浏览器的隐私设置进行修改。但请注意，停用cookies可能会对我们提供的服务造成一定的影响。</p>

                    <h3>大发官网</h3>

                    <p>谨防无合法牌照且不受监管并恶意模仿大发的网站。这些冒牌网站与大发没有任何关系，并不在大发的控制和保护内。出于最高安全标准的考量，请前往大发官网进行游戏。更多信息，请访问&nbsp;<strong><a target="_blank">dafabetofficial.com</a></strong>。</p>
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

export default connect(mapStateToProps, {})(security);