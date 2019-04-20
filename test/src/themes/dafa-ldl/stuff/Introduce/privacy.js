import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Introduce.scss';

import introduce1 from './images/Introduce1.jpg';
import introduce2 from './images/Introduce2.jpg';
/*隐藏政策*/
class privacy extends Component {
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    render() {
        return (
            <div className="introduceCon clearfix ">
                <div className="col-8"><h2>大发隐私政策</h2><p>本隐私政策对大发网站或其页面、子页面、子域名，或在任何时候其位于或从域名&nbsp;<a href='http://df52085.com/'>www.dafabet.com</a>&nbsp;进入的部分其进行约束管理。</p>

                    <p>本隐私政策基于由您所提供或我们从您一方收集并加以处理的个人信息。</p>

                    <p>请在使用本网站前仔细阅读本政策。使用或注册本网站，即表示您同意并接受隐私政策的规则和条款。如果您不同意接受并受本隐私政策或其任何修改部分的约束，请勿继续使用本网站。</p>

                    <h3>本政策的修改或变化</h3>

                    <p>我们保留权利在任何时间修改本隐私政策。一旦在网站上发布，任何此类修改都是具有约束性和立即生效的。当前生效的隐私政策内所包含的资料将显示在本页面顶部，以供参考。</p>

                    <h3>法律依据</h3>

                    <p>本隐私政策严格遵守相关数据保护法，包括英国1998年数据保护法。</p>

                    <p>大发同样参考了欧盟相关隐私法律条款和经济合作发展组织（OECD）相关指引以确保玩家的隐私受到保护。</p>

                    <h3>资料收集</h3>

                    <p>一般信息</p>

                    <p>当访问互联网时，浏览器或客户端软件可能会传输信息至您所访问网站的服务器。这些信息将生成网站访客的统计信息，并将用于市场推广用途，以帮助我们改善用户体验。</p>

                    <h3>个人可识别信息</h3>

                    <p>我们所收集您的个人信息，有助于我们对您进行识别。这些信息可能包括，但不限于:</p>

                    <ol><li>开户时您所提供的信息，如您的姓名、电子邮件地址、电话号码、生日和其他可能需要您提供的必填资料，使我们能够设置并管理您的帐户。</li>
                        <li>如果您与我们联系，我们可能会保留与您的通信记录。</li>
                        <li>你提供的任何数据将有可能成为市场推广或竞争的结果。</li>
                        <li>您在网站游戏或投注行为的详细资料。</li>
                        <li>您与我们客户服务的互动行为(通过电话或聊天)。这些信息可能会被记录或保存，用来辅助我们的培训及质量管控，使我们能够快速解决问题和查询。</li>
                    </ol><p>此外，这些资料使我们能够在不同的目的下与您联系，以便为您提供最优质的服务。此个人信息也将用于市场推广用途，我们将及时通知您各大促销和优惠活动。</p>

                    <p>根据数据保护法案1998，您承认您所提供的资料可能包含个人或敏感信息。根据本隐私政策，通过使用本网站您同意您所提供的资料可被进行处理。</p>

                    <h3>使用并公布个人信息</h3>

                    <p>在我们这里注册账户，您将接受我们会保留您的用户资料，并可能由我们拥有或由我们提供给代表我们进行数据处理的第三方公司。</p>

                    <p>您的资料可能将被进行如下处理，但不限于以下情形:</p>

                    <ol><li>在我们的网站上进行账户管理并处理您的交易。</li>
                        <li>为您提供游戏和投注服务。</li>
                        <li>出于验证和识别目的，例如确保您达到法定年龄并未处于本网站规则条款所指定的禁止辖区。</li>
                        <li>根据您的喜好来定制促销材料。</li>
                        <li>网站诊断和维护。</li>
                        <li>监测和改进网站服务。</li>
                        <li>风险管理、欺诈检测和洗钱合规。</li>
                        <li>遵守任何法律或监管要求。</li>
                        <li>在提供相关支持和服务的过程中，根据我们软件供应商(受本政策条款的约束)的要求。</li>
                    </ol><p>我们同样保留权利为了衡量用户兴趣、对网站不同区域使用情况进行用户行为统计分析，此外我们也会通知广告商诸如用户查看或点击广告横幅的数量等资料。我们将仅仅向第三方提供这些分析的合计数据。</p>

                    <p>大发与多个协会通力合作保证体育比赛的公正性和完整性，杜绝人为操作比赛。因此各方（大发以及其它协会）保留监督和共享玩家投注记录的权利。</p>

                    <p>如果您希望收到优惠推广资讯，您可以通过点击相应的注册表格的选项来确认。无论何时您想要改变这些选择，请联络我们的客服代表。</p>

                    <h3>赢利信息：</h3>

                    <p>为了市场推广用途，我们保留权利在网站或其他宣传推广媒介上公开任何赢利或奖品。我们可能会在必要时在网站上公布您的用户名或缩写名，赢利金额以及其他信息，用于宣传。</p>

                    <h3>安全性</h3>

                    <p>我们尽可能地确保您的资料安全地存放在我们这里。所有资料传输都会被加密，当资料存储在我们的服务器上时，当今最新的防火墙技术将会确保这些资料的安全。我们的网站和软件将会尽最大可能保证数据的准确和私密性，并确保您的资料不会被错误使用或丢失。</p>

                    <p>所有互联网的通信并不是完全安全的。我们不能保证在我们为您提供服务时，您所提供任何信息的安全性。通过使用网站，您在此承认并接受使用互联网的固有安全隐患，我们对于在此情况下引起的任何直接、间接、附带的或惩罚性的损失或损害不承担任何责任。</p>

                    <p>请注意，只要所需的目的合理，我们将保留您的信息。我们可能需要在某些情况下，无限期保留您的信息。</p>

                    <h3>Cookies</h3>

                    <p>玩家应该注意，个人资料和数据可能会在注册过程中通过Cookies的使用被自动收集和存储。Cookie是网站服务器传送到网页浏览器的一段小型资讯，它会令服务器通过浏览器收集信息。我们使用Cookies对您的浏览分布进行追踪并建立一个人文统计档案。通过监察和对照这些数据，我们可以改进我们为您提供的服务。联营商系统使用cookies作为追踪处理传送回推荐的联营商的处理过程的一部分。</p>

                    <p>大部分浏览器都有一个简单的步骤允许您接受或拒绝Cookie，如果您不希望Cookies收集您的数据的话。然而请注意，某些个性化服务可能会因为您关闭了cookie的选项而受到影响。</p>

                    <h3>数据销毁</h3>

                    <p>无论包含了什么信息，所有与公司的交互式博彩网站有关的存储媒体都会被要求安全处理。</p>

                    <h3>数据访问及更新</h3>

                    <p>用户可以随时提出书面申请发送到以下地址，要求得到由我们保存的他们的个人信息拷贝。我们将会向您披露我们保存的您的个人信息。您可以通过联系我们的&nbsp;<a onClick={this.serversOpen.bind(this)}>客户支持&nbsp;</a>. 通知我们任何个人资料更新、修改和更正。而且，一旦得到您的申请要求，我们将会删除我们数据库上有关的用户信息；然而，可能不能完全删除那些因为备份数据和删除记录而留下的入口信息。</p>

                    <p>大发保留权利在任何时间修改，更改或更新本隐私政策。任何此类改动将及时公布在我们的隐私政策中。客户有责任定期查看本页面的隐私政策。</p>

                    <p>该页面最后修改于：2015年9月16日。</p>

                    <h3>联络我们</h3>

                    {/* <p>如果您对此政策有任何建议或意见请联络我们的客户支持，详情请查阅本网站的“<a>联络我们&nbsp;</a>”和“<a>帮助</a>”。</p> */}
                    <p>如果您对此政策有任何建议或意见请联络我们的客户支持。</p>
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

export default connect(mapStateToProps, {})(privacy);