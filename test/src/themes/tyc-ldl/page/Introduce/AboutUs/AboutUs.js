import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  BackTop
} from 'antd';
import './AboutUs.scss'
import {config} from "globalConfig";

class AboutUs extends Component{
    constructor(props){
        super(props)
        this.state = {
        };
    }
    componentDidMount(){
    }

    render(){
        return(
            <div className="AboutUs container">

                <h2 className="page-title">关于我们</h2>
                <p className="sssv28-about_text">{config.appName} 乃正式注册的网上博彩公司。成立至今，我们不但为客户提供各种体育博彩以及多元化网上娱乐，更承诺配备最优质的投注方法，并辅以最先进的网络技术支持，献上最佳的客户服务和最优惠的支付方案。我们致力于为广大客户提供丰富多彩的博彩活动，并极力以最优质的收费方式及丰富奖赏作为回馈。</p>
                <p className="sssv28-about_text">{config.appName} 拥有並经营以下网站： <a href="http://928.app">928.app</a>。网站所提供的所有产品和服务皆由菲律宾政府卡格扬河经济特区First Cagayan Leisure and Resort Corporation (<a href="http://www.firstcagayan.com">www.firstcagayan.com</a>) 所授权和监管。本公司的经营理念是通过向顾客提供最佳的体育博彩及多元化网上娱乐，以进一步拓展我们的业务。</p>
                <h3 className="sssv28-about-title">诚信 </h3>
                <p className="sssv28-about_text">作为国际专业的网上博彩游戏客户端运营企业，我们凭借集合世界级的博彩资讯专家、丰富经验的服务团队、市场营销专家、先进的软硬件开发人员建立出 {config.appName} 全面而完善的组织体系。我们承诺，为每一位客户提供最及时、最安全、最准确的专业博彩数据，以及全方位的国际化服务。同时， {config.appName} 全部游戏设计均采用世界最领先的软件。我们更聘请了多位资深计算机专家给公司设计和提供软硬件设施维护服务，以提供最佳的技术支持，确保客户能无时无刻享受到最优质的娱乐服务。</p>
                <h3 className="sssv28-about-title">优质服务承诺 </h3>
                <p className="sssv28-about_text">自成立至今， {config.appName} 致力提供多元化的体育博彩及网上娱乐，让客户能每天24小时体验到最精彩刺激的休闲享受，更藉以丰富奖赏，以回馈客户对我们的支持及热情参与。</p>
                <p className="sssv28-about_text">我们恪守「顾客至上」的宗旨，以力求创新，不断进步的精神，开拓多元化的娱乐业务。为此，我们聘用庞大的服务团队，凭借市场推广、软件开发、客户服务、技术支持等优秀人员的不懈努力，为客户提供专业的娱乐服务。我们承诺，置身于 {config.appName} 游戏平台的客户，不论参与的是体育娱乐，还是其他网上游戏，也能享有极具价值的博彩回报。同时，对客户个人信息保密对我们来说是最重要的。我们承诺，将继续不遗余力地严格实行保密的私制度。</p>
                <h3 className="sssv28-about-title">严格维护保密及安全性  </h3>
                <p className="sssv28-about_text">根据规定，每位 {config.appName} 用户只能拥有一个相对应的账户。为维护系统的完整性及公平性原则，我们将会进行不定期的安全检查。客户的安全和游戏的公正性乃 {config.appName} 最重要的服务信念与宗旨。我们采用的是全球最先进的游戏软件设备，保证了软件本身的公正性。同时，本公司更用上最先进的加密措施来保证游戏的安全，并作24小时的后台检测和监控，确保我们的客户可以在一个最保密、最安全的网络游戏空间尽情玩乐。</p>
                <h3 className="sssv28-about-title">公平游戏 </h3>
                <p className="sssv28-about_text">{config.appName} 致力为玩家提供最公正的环境，在一个结合体育博彩及网络直播的娱乐平台上尽情游戏。 {config.appName} 线上娱乐平台乃现时亚洲市场最具权威及最先进的科技系统所提供。此外，所有参与现场游戏的荷官均经过严格训练及挑选，每局牌局均有主管负责监察，以确保游戏的真实度。</p>
                <h3 className="sssv28-about-title">付款 </h3>
                <p className="sssv28-about_text">我们提供各种安全简便的存款及提款方式给客户。我们一直坚持了解我们的客户(KYC)和反洗钱（AML）的原则，并与第三方的财务管理当局合作，用以确保在最大程度上遵从相关的法律及法规。 {config.appName} 希望所有的客户能够在一个安全愉快的环境中，享受本公司精心设计的产品和服务，並能够从中获利。我们欢迎客户对我们提出任何意见。如有需要，请通过电子邮件方式将相关意见发送至电子邮箱： <a href="mailto:731667777@qq.com">731667777@qq.com</a></p>
                <h3 className="sssv28-about-title">负责任博彩 </h3>
                <p className="sssv28-about_text">{config.appName} 承诺提供「负责任博彩」，并确保每位客户能与我们一起享受到博彩的乐趣。但是我们也了解到有小部分的人有时候未必能控制自己的投注行为，如遇相关问题， {config.appName} 会积极鼓励这些用户及时与我们联络，以便尽提供相关帮助。</p>

                <BackTop></BackTop>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {

    }
);

export default connect(mapStateToProps,{})(AboutUs);
