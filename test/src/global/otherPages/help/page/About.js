/**
 * Created by b3 on 2017/7/3.
 */
import React, {Component} from 'react';
import {config} from "globalConfig";
import * as help from "../helpJson";



class About extends Component {



    render() {
        const appName = config.appName;
        return (
            <div id="about" className=" contents active ">
                <div className="helpContent">
                    <h3 className="title1">关于我们</h3>
                    <ul className="contentul">
                        <li><a href="#11">1、{appName}线上娱乐场简介</a></li>
                        <li><a href="#12">2、企业文化（{appName}文化）--新·心·信</a></li>
                        <li><a href="#13">3、服务理念</a></li>
                        <li><a href="#14">4、诚信为本</a></li>
                        <li><a href="#15">5、多样化且精品游戏</a></li>
                    </ul>
                </div>

                <h4 className="title2" id="11">1.{appName}线上娱乐場简介<a href="#top" className="ReturnTop">返回顶部</a> </h4>

                <div className="helpContent">
                    <p>{help.renderProfile()}</p>
                    
                    {/* {config.spec=='uzi-uzi'?
                    <p>{appName}于2007年初正式開拓亞洲市場，被授予“亞洲最受玩家喜愛的博彩品牌”，如今也成為亞洲最具有領導地位的頂級博彩公司。背靠亞洲具代表地位的網絡博彩娛樂集團（BBIN），提供豐富多樣的視訊直播、電子遊藝、體育賽事、及彩票等遊戲產品，逐步建構亞洲最大網絡博彩娛樂事業體</p>:
                    
                    <p>亞洲領先在線投註網站，為您呈現不一樣的在線投註體驗，包括體育投註，在線娛樂場，真人娛樂場遊戲，在線撲克，老虎機遊戲和更多世界頂級投註遊戲</p>} */}
                </div>

                <h4 className="title2" id="12">2. 企业文化（{appName}文化）--新·心·信<a href="#top" className="ReturnTop">返回顶部</a> </h4>
                <div className="helpContent">
                    <p>新：{appName}线上娱乐场，全新体验，全新享受。Follow Your Heart!<br />
                        心：用心服务，客户至上。<br />
                        信：我们相信诚信比红利更能留住会员的心。<br /><br />
                        娱乐 一切从“新”开始，相信我们"{appName}"。<br />
                    </p>
                </div>
                <h4 className="title2" id="13">3.服务理念<a href="#top" className="ReturnTop">返回顶部</a> </h4>
                <div className="helpContent">
                    <p>{appName}线上娱乐场秉承的优良传统，坚持以热诚、专业的服务换取大众的信任与支持。</p>

                </div>
                <h4 className="title2" id="14">4.诚信为本<a href="#top" className="ReturnTop">返回顶部</a> </h4>
                <div className="helpContent">
                    <p>通过互联网技术，凭借{appName}娱乐场的信誉，打造全新的{appName}线上娱乐场！作为国际专业的网上博彩游戏运营商，我们承诺，为每一位客户提供最安全、最公平的博彩游戏，以及全方位的服务。游戏结果公平、公正、公开！</p>
                </div>

                <h4 className="title2" id="15">5.多样化且精品游戏<a href="#top"className="ReturnTop">返回顶部</a> </h4>
                <div className="helpContent">
                    <p>除了体育游戏项目多样化外，全方位提供：真人娱乐，时时彩，和电子游戏等。不仅花巨资打造自己的娱乐平台，同时引进世界先进水平的游戏平台（Playtech、Microgaming、BBIN、金宝博 188、OPUS等）。为玩家提供无与伦比的娱乐享受。同时，公司设置有7×24小时在线监测，确保每一局游戏结果均为现场真实的游戏结果，确保大家游戏真实可靠。</p>
                </div>
            </div>
        )
    }
}



export default (About);