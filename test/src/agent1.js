
import React,{Component} from 'react';
import { render } from 'react-dom';
import IndexContent from './global/otherPages/agent/page/IndexContent';
import BrandContent from './global/otherPages/agent/page/BrandContent';
import Registered from './global/otherPages/agent/page/Registered';
import ToolsContent from './global/otherPages/agent/page/ToolsContent';
import FaqContent from './global/otherPages/agent/page/FaqContent';
import ContactContent from './global/otherPages/agent/page/ContactContent';
import AllianceContent from './global/otherPages/agent/page/AllianceContent';
import XpjAllianceContent from './global/otherPages/agent/page/xpj/AllianceContent';
import {config} from "globalConfig";


export default class AgentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {tab:"IndexContent"}
    }

    componentDidMount() {

        var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };
        var web = getUrlParameter('tab');
        this.setState({tab:web});
    }
    onClickTab(tab) {
        this.setState({tab:tab});
    }

    renderSubPage() {
        if (this.state.tab === "IndexContent") {
           return <IndexContent onClickJoin={this.onClickTab.bind(this, "Registered")}/>
        } else if (this.state.tab === "BrandContent") {
            return <BrandContent onClickJoin={this.onClickTab.bind(this, "Registered")} />
        } else if (this.state.tab ==="Registered"){
            return <Registered onClickJoin={this.onClickTab.bind(this, "AllianceContent")} />
        }else  if(this.state.tab ==="AllianceContent"){

            if(config.spec =="xpj-bt6" || config.spec =="xpj-ldl" ||config.spec =="xpj-xpj"){
                return <XpjAllianceContent onClickJoin={this.onClickTab.bind(this, "Registered")} />
            }else {
                return <AllianceContent onClickJoin={this.onClickTab.bind(this, "Registered")} />
            }

        }else if(this.state.tab ==="ToolsContent"){
             return <ToolsContent onClickJoin={this.onClickTab.bind(this, "Registered")} />
        }else if(this.state.tab ==="FaqContent"){
            return <FaqContent/>
        }else if(this.state.tab ==="ContactContent"){
            return <ContactContent/>
        }
        return <IndexContent onClickJoin={this.onClickTab.bind(this, "Registered")}/>;
    }

    render() {
        const agentLoginUrl = config.agentLoginUrl;
        return (
            <div id="IndexContent">
                <div className="header_bg">
                        <div className="header">
                        <div className="logo_img">
                            <a href="/"><div className="header_left"></div></a>
                            <div className="header_right"></div>
                        </div>
                    </div>
                    <div className="selector">
                        <div className="triangle">
                        </div>
                    </div>
                    <div className="menuNav">
                        <div className="menuBtn">
                            <ul >
                                <li className={this.state.tab==="IndexContent"?"active":''} onClick={this.onClickTab.bind(this,"IndexContent")}  data-tab="IndexContent" ><a className={this.state.tab==="IndexContent"?"now":''} href="#">网站首页</a></li>
                                <li className={this.state.tab==="BrandContent"?"active":''} onClick={this.onClickTab.bind(this,"BrandContent")}  data-tab="BrandContent" ><a className={this.state.tab==="BrandContent"?"now":''} href="#">品牌介绍</a></li>
                                <li className={this.state.tab==="AllianceContent"?"active":''} onClick={this.onClickTab.bind(this,"AllianceContent")}  data-tab="AllianceContent"><a className={this.state.tab==="AllianceContent"?"now":''} href="#">合营计划</a></li>
                                <li ><a href={agentLoginUrl} target="_blank">代理登录</a></li>
                                <li className={this.state.tab==="Registered"?"active":''} onClick={this.onClickTab.bind(this,"Registered")}  data-tab="Registered" ><a className={this.state.tab==="Registered"?"now":''} href="#">立即加入</a></li>
                                <li className={this.state.tab==="ToolsContent"?"active":''} onClick={this.onClickTab.bind(this,"ToolsContent")}  data-tab="ToolsContent" ><a className={this.state.tab==="ToolsContent"?"now":''} href="#">营销工具</a></li>
                                <li className={this.state.tab==="FaqContent"?"active":''} onClick={this.onClickTab.bind(this,"FaqContent")}  data-tab="FaqContent" ><a className={this.state.tab==="FaqContent"?"now":''} href="#">常见问题</a></li>
                                <li className={this.state.tab==="ContactContent"?"active":''} onClick={this.onClickTab.bind(this,"ContactContent")} data-tab="ContactContent" ><a className={this.state.tab==="ContactContent"?"now":''}  href="#">联系我们</a></li>
                            </ul>
                            <div className="clear"></div>
                        </div>
                    </div>

                </div>

                {this.renderSubPage()}
                <div className="footerNav">
                    <div className="footerNavBtn">
                        <a onClick={this.onClickTab.bind(this,"AllianceContent")}  data-tab="IndexContent" href="#" > 代理专区 </a> /
                        <a onClick={this.onClickTab.bind(this,"ContactContent")}   data-tab="ContactContent" href="#" > 联系我们 </a> /
                        <a onClick={this.onClickTab.bind(this,"FaqContent")}  data-tab="FaqContent" href="#" > 帮助中心 </a>
                    </div>
                </div>
                <div className="footer">
                    <div className="footer_bg"></div>
                </div>

            </div>
        );
    }
}
