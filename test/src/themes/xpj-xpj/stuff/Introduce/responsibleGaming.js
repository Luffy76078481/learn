import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Introduce.scss';

import introduce1 from './images/Introduce1.jpg';
import introduce2 from './images/Introduce2.jpg';
/*游戏责任*/
class responsibleGaming extends Component {
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    render() {
        return (
            <div className="introduceCon clearfix ">
                <div className="col-8"><h2>游戏责任</h2><p>我们希望我们的用户在Dafabet享受到乐趣，因此我们鼓励负责任博彩。我们允许玩家制定自己的负责任博彩限制，然后我们会通过管理工具帮助设立和控制这些自定义限制。</p>

                    <p>博彩是娱乐的一种形式，同时不应该给您财务和感情生活带来负担。借钱来玩，花费超出预算或挪用其他用途的金钱不仅是不明智的，而且会您和您身边的人带来严重的问题。我们希望您在Dafabet享受到乐趣，因此请负责任地投注并玩得开心！</p>

                    <p><strong>寻求协助</strong></p>

                    <p>有很多机构可以为在博彩中产生问题的人提供支持和帮助，我们推荐这些玩家联络这些自助组织获得额外的帮助。</p>

                    <p>以下网站提供建议和指引。每个组织都有帮助热线和电子邮件地址，如果您需要严格保密的建议和帮助，您可以联络他们。</p>

                    <ul><li><a href="http://www.gamblersanonymous.org/" target="_blank">www.gamblersanonymous.org</a>&nbsp;</li>
                        <li><a href="http://www.gamcare.org.uk/" target="_blank">www.gamcare.org.uk</a>&nbsp;</li>
                        <li><a href="http://www.gamblingtherapy.org/" target="_blank">www.gamblingtherapy.org</a></li>
                    </ul><p><strong>您是否有博彩方面的问题？</strong></p>

                    <p>如果您感到您可能会有博彩方面的问题，请问一下您自己一下问题：</p>

                    <ol><li>有无人曾经批评过您进行赌博？</li>
                        <li>您是否曾经因为试图掩饰您在赌博方面花费的时间和金钱而撒谎？</li>
                        <li>争吵、挫折感和失望令您想进行赌博？</li>
                        <li>您是否独自一人长时间赌博？</li>
                        <li>您是否远离工作、同事或学校进行赌博？</li>
                        <li>您是否通过赌博来逃避烦闷或不快的生活？</li>
                        <li>您是否很不情愿将赌博用的钱使用在其他地方？</li>
                        <li>您是否因为赌博而对家庭、朋友和其他消遣失去兴趣？</li>
                        <li>输钱之后，您是否感觉您必须再次尝试并尽可能赢回您输掉的钱？</li>
                        <li>当您赌博并输掉所有钱之后，您会否感到失落和绝望，并需要尽可能再赌一次？</li>
                        <li>您会赌到输掉最后一分钱吗？</li>
                        <li>您是否曾经撒谎，偷窃或借钱来取得资金进行赌博或还赌债？</li>
                        <li>您是否因为赌博感觉沮丧甚至想自杀？</li>
                    </ol><p>您回答“是的”越多，越表明您可能有严重的博彩问题，并可能需要寻求以上列出的渠道的帮助和建议。</p>

                    <p><strong>管理您的博彩方法</strong></p>

                    <p>对于经常享受博彩乐趣的玩家来说，有时花费超过预算并不罕见。我们建议您制定特定的预算计划以确保您的博彩花费是可以负担的。</p>

                    <p>有时人们会否认有问题，并只有在受到批评时才寻求帮助。坦率地问您自己，并且您是否认为您能够在遇到博彩问题是为自己设立一个目标，例如两周或一个月，停止博彩作为试验。如果您不能做到这点，您可能真的有问题，您可能需要与您的顾问讨论一下您的处境。</p>

                    <p><strong>自我排除</strong></p>

                    <p>如果您相信您有博彩问题或强制性地停止赌博，Dafabet让您可以永久地将您自我排除在Dafabet 之外。如果您选择永久自我排除，您将会被禁止在Dafabet玩。您只需要联络<a onClick={this.serversOpen.bind(this)}>客服团队</a>就可以了。</p>

                    <p>如果您希望阻止您访问互联网软件上不同的博彩、投注或赌博设施，您可以访问Gamblock™&nbsp;<a href="http://www.gamblock.com/" target="_blank">http://www.gamblock.com</a>， 它会帮助您拦截互联网的博彩网站。这会帮助有问题的博彩玩家避免危险或不受约束的赌博行为。</p>

                    <p><strong>防止未成年人博彩</strong></p>

                    <p>您必须年满18岁才能在Dafabet玩。我们会进行检查以确保没有未成年人访问我们的博彩网站。提供不准确或不诚实的玩家年龄资料将会导致没收赢利的后果甚至法律诉讼的后果。</p>

                    <p><strong>父母监控</strong></p>

                    <p>为防止未成年人访问博彩网站，我们推荐负责任的玩家在电脑上安装互联网过滤软件。有很多第三方的应用程序可以让父母或监护人用于监控或禁止他们的电脑访问互联网。这些包括：</p>

                    <ul><li>Net Nanny过滤软件保护儿童远离不合适的网站内容：&nbsp;<a href="http://www.netnanny.com/" target="_blank">www.netnanny.com</a></li>
                        <li>CYBER Sitter过滤软件可以让父母添加他们要阻止的网站：&nbsp;<a href="http://www.cybersitter.com/" target="_blank">www.cybersitter.com</a></li>
                    </ul>
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

const mapStateToProps = (state, ownProps) => ({
    remoteSysConfs: state.remoteSysConfs
});

export default connect(mapStateToProps, {})(responsibleGaming);