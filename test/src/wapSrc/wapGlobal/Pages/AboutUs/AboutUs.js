import React, { Component } from 'react';
import {NavBar, Icon} from 'antd-mobile';
import {config} from 'globalConfig'
import {browserHistory} from "react-router";
import connect from "react-redux/es/connect/connect";
import './AboutUs.scss';
class AboutUs extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className="AboutUs">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>{
                            window.wapHistoryType.goBack();
                    }}
                >关于我们</NavBar>
                <div className="scroll-content AboutUs">
                    <h5>1.{config.appName}简介</h5> 
                    <p>亞洲領先在線投註網站，為您呈現不一樣的在線投註體驗，包括體育投註，在線娛樂場，真人娛樂場遊戲，在線撲克，老虎機遊戲和更多世界頂級投註遊戲</p>
                    <h5>2.企业文化（{config.appName}文化）--新·心·信</h5>
                    <p>
                        新：{config.appName}，全新体验，全新享受。Follow Your Heart!<br/>
                        心：用心服务，客户至上。<br/>
                        信：我们相信诚信比红利更能留住会员的心。<br/>
                        娱乐 一切从“新”开始，相信我们"{config.appName}"。
                    </p>
                    <h5>3.服务理念</h5>
                    <p>
                        {config.appName}秉承的优良传统，坚持以热诚、专业的服务换取大众的信任与支持。
                    </p>
                    <h5>4.诚信为本</h5>
                    <p>
                        通过互联网技术，凭借{config.appName}的信誉，打造全新的{config.appName}！作为国际专业的网上博彩游戏运营商，我们承诺，为每一位客户提供最安全、最公平的博彩游戏，以及全方位的服务。游戏结果公平、公正、公开！
                    </p>
                    <h5>5.多样化且精品游戏</h5>
                    <p>
                        除了体育游戏项目多样化外，全方位提供：真人娱乐，时时彩，和电子游戏等。不仅花巨资打造自己的娱乐平台，同时引进世界先进水平的游戏平台（Playtech、Microgaming、BBIN、金宝博 188、OPUS等）。为玩家提供无与伦比的娱乐享受。同时，公司设置有7×24小时在线监测，确保每一局游戏结果均为现场真实的游戏结果，确保大家游戏真实可靠。
                    </p>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, AboutUs) => (
    {
        remoteSysConfs:state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(AboutUs)