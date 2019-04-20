/**
 * 仿bet365 css在skin.scss
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/Footer.scss';
import logo from './images/footer-logo.png';


import Gamblingaware from './images/bet365/footer-Gamblingaware.png';
import GamCare from './images/bet365/footer-GamCare.png';
import footer18plus from './images/bet365/footer-18plus.png';
import gibraltar from './images/bet365/footer-gibraltar.png';
import Thwate from './images/bet365/footer-Thwate.png';
import SQS from './images/bet365/footer-SQS.png';
import essa from './images/bet365/footer-essa.png';
import IBAS from './images/bet365/footer-IBAS.png';
import footergt from './images/bet365/footer-gt.png';
import iTechLabs from './images/bet365/footer-iTechLabs.png';
import PIXIU from './images/bet365/footer-PIXIU.png';

class Footer extends Component {

    
    constructor(props) {
        super(props);
        this.state={
            isUnderLine:'none',
            fontColor:this.props.fontColor
        }
        this.userCount = this.num1();
  
      }

    
            
        handleMouseEnter(){
            
            this.setState({
                isUnderLine:'underline'
            })
        }

        handleMouseLeave(){
            this.setState({
                isUnderLine:'none'
            })
        }
    



    num1(){
        var num1 =  ("219" + Math.floor(Math.random()*889 + 103));
        return num1;
    }

    kyyFooter(){
        const config = window.config;
        const appName = config.appName;

        return(

            <div className="Cagayan">
                <a href="/help.html" className="copyColor2 f12 color-third"
                   target="_blank">关于我们</a> |
                <a href="/help.html#deposit" className="copyColor2 f12 color-third" target="_blank">常见问题</a>
                |
                <a href="/agent.html" className="copyColor2 f12 color-third" target="_blank">联系我们</a>
                |
                <a href="/help.html#yibanrule" className="copyColor2 f12 color-third">条款与协议</a> |
                <a href="/help.html#responsibility" className="copyColor2 f12 color-third"
                   target="_blank">免责声明</a> |
                <a href="/agent.html" className="copyColor2 f12 color-third"
                   target="_blank">代理中心</a>
                <p className="lh25 color-third">本网站属于菲律宾政府授权和监管所有版权归{appName}所有，违者必究。</p>
                <p className=" c_right  lh25 color-third">
                    ©2004-2017 {appName}. All rights reserved &nbsp;&nbsp;当前注册人数：<span id="reg_count">219003</span>
                </p>
            </div>
        )
    }


    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }

    serversOpen(e){
        e.preventDefault();

        if(e.target.id=='test'){
            window.swal({
                    title: "忘记密码",
                    text: "联系在线客服协助修改密码",
                    confirmButtonColor: "#c5841f",
                    confirmButtonText: "联系客服",
                    showCancelButton: true,
                    cancelButtonText: "关闭",
                },
                ()=>{
                    window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
                });
            return;
        }
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=900,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=450,screenY=250');
        return false;
    }
   

    render() {
        const config = window.config;
        const appName = config.appName;
        const promotionLink = window.configHelper.getPromotionUrl();
        const options =  window.r.props("Footer");
        const kyyFooter =this.kyyFooter();
        const agentLoginUrl = config.agentLoginUrl;

        return (
                <div className="newcasino_footer">
                    <div className="footerBgColor" style={{backgroundColor:this.props.bgColor,borderTop:this.props.borderNone}}>
                            <div className="divBottomContainer">        
                                <div className="divFooterWrapper" id="FooterWrapper">
                                    <div className="divFooterInnerBorder">
                                        <div className="LogoContainer" style={{marginTop:`-${this.props.pxRuler}`}}>
                                            <img src={logo} />
                                        </div>
                                        <div className="divFooterLinks" id="FooterLinks" style={{marginBottom:this.props.pxRuler}}>
                                            <a href="/help.html" target="_blank" className style={{color:this.props.fontColor}} >关于我们</a>
                                            <a href="/help.html#deposit" target="_blank" style={{color:this.props.fontColor}}>常见问题</a>
                                            <a href='javascript:void(0);' onClick={this.serversOpen.bind(this)} style={{color:this.props.fontColor}}>在线客服</a>
                                            <a href="/agent.html" style={{color:this.props.fontColor}}>联系我们</a>
                                            <a href="/help.html#yibanrule" target="_blank" style={{color:this.props.fontColor}}>条款与协议</a>
                                            <a href="/help.html#responsibility" target="_blank" style={{color:this.props.fontColor}}>免责声明</a>



                                            <a href="/help.html#myAccount" target="_blank" style={{color:this.props.fontColor}}>隐私政策</a>
                                            {/* <a href="/about/cookies" target="_blank">COOKIES 政策</a> */}

                                            <a href="/agent.html" target="_blank" style={{color:this.props.fontColor}}>合营联盟</a>
                                            <a href="/agent.html" target="_blank" style={{color:this.props.fontColor}}>代理注册</a>
                                            <a href={agentLoginUrl} target="_blank" style={{color:this.props.fontColor}}>代理登入</a>      
                                        </div>
                                        {/* <div className="divFooterLinks" id="FooterLinks">
                                            <a href="/agent.html" target="_blank">联系我们</a>
                                            <a href="/about/aboutus" target="_blank">帮助</a>
                                            <a href="javascript:window.open('https://kf1.learnsaas.com/chat/chatClient/chatbox.jsp?companyID=819391&amp;configID=64141&amp;jid=3981986792&amp;s=1#bo',750,600);">在线客服</a>
                                            <a href="/about/responsible_gambling" target="_blank">博彩责任</a>
                                            <a href="/about/terms_and_conditions" target="_blank">条款与规则</a>
                                            <a href="/about/privacy_policy" target="_blank">隐私政策</a>
                                            <a href="/about/cookies" target="_blank">COOKIES 政策</a>
                                                                <a href="/alliance/index" target="_blank">合营联盟</a>
                                            <a href="/agent/registered" target="_blank">代理注册</a>
                                            <a href="http://ag.0136365.com/" target="_blank">代理登入</a>
                                            
                                        </div> */}
                                        <div className="divFooterIcons" style={{display:this.props.borderNone}} id="FooterIcons">
                                            <img src={Gamblingaware} width="120" height="14" />
                                            <img src={gibraltar} width="33" height="34" />
                                            <img src={GamCare} width="26" height="29" />
                                            <img src={Thwate} width="100" height="25" />
                                            <img src={SQS} width="48" height="24" />
                                            <img src={essa} width="82" height="32" />
                                            <img src={footer18plus} width="30" height="30" />
                                            <img src={footergt} width="37" height="32" />
                                            <img src={IBAS} width="92" height="36" />
                                            <img src={iTechLabs} width="32" height="32" />
                                            <img src={PIXIU} width="42" height="32" />
                                        </div>
                                        <div className="divFooterContentTop" id="FooterContentTop" style={{display:this.props.borderNone}}>
                                            <span className="infoTextContainer" style={{color:this.props.fontColor}}>
                                            通过进入、继续使用或浏览此网站，您即被认定接受：我们将使用特定的浏览器cookies优化您的客户享用体验。bet365仅会使用优化您服务体验的cookies，<br />而不是可侵犯您隐私的cookies。关于我们使用cookies，以及您如何取消、管理cookies使用的更多详情，请参考我们的 <a style={{color:this.props.fontColor}} href="javascript:window.open('/about/cookies',950,750);" title="COOKIES政策" data-productid="1">COOKIES 政策</a>。
                                            </span>
                                        </div>

                                        <div className="divFooterContentBottom" id="FooterContentBottom"  style={{borderBottom:this.props.borBottom,marginBottom:this.props.pxRuler}}>
                                            <div className="infoTextContainer" style={{display:this.props.borderNone}}><b>注册办公地址：</b>Hillside（Gaming）LP（注册编号120），Unit 1.1, First Floor, Waterport Place, 2 Europort Avenue, Gibraltar。</div>
                                            <div className="infoTextContainer" style={{display:this.props.borderNone}}><b>Hillside（Gaming）LP</b>是由直布罗陀政府颁发执照并受直布罗陀博彩委员会监管（RGL编号077）。</div>
                                            <div className="infoTextContainer" style={{color:this.props.fontColor}}>© 2001-2018 bet365 版权所有</div>
                                        </div>
                                        {/* <div className="divFooterSocial" id="FooterSocial"><a href="#top" className="BackToTop" data-productid="0">返回页首</a></div> */}
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div> 

        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        message:state.message,
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps, {

})(Footer)