/**
 * Created by b3 on 2017/6/27.
 */
import React, {Component} from 'react';
import {config} from "globalConfig";
import * as help from "../../help/helpJson";


class IndexContent extends Component {

    renderNum(){
        var num;
        if (config.spec =="xpj"){
            num ='25%';
            return num
        }else {
            num ='40%';
            return num
        }
    }


    render() {
        const appName = config.appName;
        const  agentLoginUrl = config.agentLoginUrl;
        const  unm = this.renderNum();
        return (
            <div id="IndexContent" className="show active">
                <div className="banner">
                    <div className="bannerImg"></div>
                </div>
                <div className="content_up">
                    <div className="introduce">
                        <h3>{appName}简介</h3>
                        <p className="text">
                            {help.renderProfile()}
                        </p>
                    </div>
                </div>
                <div className="content_bottom">
                    <div className="introduce">
                        <div className="imgLeft"></div>
                        <div className="textRight">
                            <div className="textRight_content">
                                <span>√ 轻松赚取丰厚收入，每月赚取高达{unm}佣金！</span><br/>
                                <span>√ 拥有超过60多年的博彩经验，信誉保证！</span><br/>
                                <span>√ 专注品牌建设，诚信为先，用心做</span><br/>
                                <span>√ 好与合作伙伴的沟通，致力双赢!</span><br/>
                                <a onClick={this.props.onClickJoin} href="#" className="addRegister textRightBtn " id="sqBtnStyle" >现在申请</a>
                                <a className="textRightBtn" href={agentLoginUrl} id="sqBtnStyle"  style={{marginLeft:"40px"}}>代理登入</a>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
            </div>
        )
    }
}



export default (IndexContent);