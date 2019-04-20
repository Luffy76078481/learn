/**
 * Created by b3 on 2017/11/30.
 */
import React, {Component} from 'react';
import {config} from "globalConfig";
import * as help from "../../../help/helpJson.js";


class AboutUs extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const appName = config.appName;
        return (
            <div id="AboutUs" className="mainCon show">
                <div className="title"></div>
                <div className="center">
                    <div className="cont">
                        <div className="tit">{appName}娱乐场</div>
                        <div className="txt">
                        <span>{help.renderProfile()}</span>
                        </div>
                        <div className="tit">经营理念</div>
                        {help.render_tittxt()}
                        {/*<div className="txt">*/}
                            {/*<span style={{lineHeight: "35px",fontWeight:"700"}}>公平公正</span><br/>*/}
                            {/*<span>是我们最基本的宗旨。我们采用最具亚洲代表的网络博彩娱乐集团多家国际公司同时使用一套真人游戏系统；给玩家提供绝对公平公正的在线娱乐平台。*/}
                            {/*我们在处理客户的投诉回馈，都秉持着公平公正的基本原则，旨在打造一个客户信赖的娱乐平台。</span><br/>*/}
                            {/*<span style={{lineHeight: "35px",fontWeight:"700"}}>诚信专业</span><br/>*/}
                            {/*<span>诚信经营是公司的核心宗旨之一，因为只有诚信经营才能赢得客户的信赖和口碑；我们的经营团队具备多年的博彩运营经验，所有的技术团队和客服团队都经过专业的训练，我们以最专业的水平和态度，*/}
                            {/*力求给客户提供安全稳定的游戏平台及优质的客服。</span><br/>*/}
                            {/*<span style={{lineHeight: "35px",fontWeight:"700"}}>客户至上</span><br/>*/}
                            {/*<span>{appName}的目标是打造最受玩家欢迎的在线娱乐平台，我们更关心客户的需求和利益。提供24小时专业的客户服务，随时解决客户的咨询及问题。多渠道的与客户互动交流，*/}
                            {/*了解客户的需求，随时关注客户的意见。举办更多的优惠及促销活动，给客户提供更多的回馈及惊喜。</span><br/>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        )
    }
}



export default (AboutUs);