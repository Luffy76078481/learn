import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Introduce.scss';

import introduce1 from './images/Introduce1.jpg';
import introduce2 from './images/Introduce2.jpg';
/*关于我们*/
class AboutUs extends Component {
    render() {
        return (
            <div className="introduceCon clearfix ">
                <div className="col-8">
                    <h2>关于我们</h2>
                    <p>Dafabet是亚洲领先的在线游戏网站，我们提供体育投注，在线娱乐场，在线扑克和在线游戏。自2004年以来我们一直服务于亚洲市场。我们已经取得充分授权，并严格按照这些管理机构发布的规则进行所有运营。</p>

                    <p>安全私密的环境以及产品的完整性是Dafabet致力为您提供的在线游戏体验。我们拥有目前世界上最先进的安全措施，而且我们不断地提升审核游戏和流程，从而确保我们的玩家有一个安全公平的网络游戏环境。根据我们的隐私保密政策，我们将为您的所有信息保密，决不会分享或出售给第三方。</p>

                    <p>我们致力于提供最佳赔率同时覆盖各大体育盘口和世界各地的体育赛事。我们也提供多种现场游戏和老虎机游戏。我们的在线扑克室是全世界最大的在线扑克网络的其中之一。我们保证您可在Dafabet尽享世界最高水平的在线游戏体验。</p>

                    <p>我们提供训练有素和亲切的客户服务，全天候24小时的在线为客户们服务，以确保快速、礼貌和有效地为玩家解决问题。</p>
    
                    <p>我们的使命是为负责任地为玩家提供最精彩的在线游戏体验，欢迎随时通过电话或电子邮件向我们提出您的意见或建议。</p>
    
                    <p>我们提供安全便捷的各种支付方式。我们坚持以“了解你的客户”和“反洗钱”为一贯宗旨，并配合第三方金融监管机构，以确保遵守最高标准。</p>
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

const mapStateToProps = (state, ownProps) => ({});

export default connect(mapStateToProps, {})(AboutUs);