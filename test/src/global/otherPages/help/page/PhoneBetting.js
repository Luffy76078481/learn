/**
 * Created by b3 on 2017/7/3.
 */

import React, {Component} from 'react';
import {config} from "globalConfig";




class PhoneBetting extends Component {



    render() {
        const appName = config.appName;
        return (
            <div id="phoneBetting" className="contents">
                <div className="helpContent">
                    <h3  className="title1">手机下注</h3>
                    <ul className="contentul">
                        <li><a href="#a">1、此功能可否运用于所有手机？</a></li>
                        <li><a href="#b">2、登入时显示密码错误的提示。怎么办？</a></li>
                        <li><a href="#c">3、我的个人资料安全吗？</a></li>
                        <li><a href="#d">4、什么是WAP和GPRS?</a></li>
                    </ul>
                </div>

                <h4 className="title2" id="a">1. 此功能可否运用于所有手机？<a href="#top" className="ReturnTop">返回顶部</a> </h4>

                <div className="helpContent">
                    <p>您的手机必须开启 GPRS 和 WAP 功能此外，您的手机还须具备 JAVA 技术。<br /></p>
                </div>

                <h4 className="title2" id="b">2. 登入时显示密码错误的提示。怎么办？<a href="#top" className="ReturnTop">返回顶部</a> </h4>
                <div className="helpContent">
                    <p>第一步:您必须确定您使用的网络服务已包括(WAP/GPRS)的上网功能。<br />
                        第二步:您的手机必须正确设置此功能，此设置通常由网络运行商提供。<br />
                    </p>
                </div>
                <h4 className="title2" id="c">3. 我的个人资料安全吗？<a href="#top" className="ReturnTop">返回顶部</a> </h4>
                <div className="helpContent">
                    <p>一旦收到和办理{appName}提款条例所要求的资料，任何提款要求都将被发送到我们的财务部进行办理。<br />
                        提款手续将按照以下的时间表进行：<br />
                        从收到提款要求算起，所需办理时间：</p>
                </div>
                <h4 className="title2" id="d">4. 什么是 WAP 和 GPRS?<a href="#top"className="ReturnTop">返回顶部</a> </h4>
                <div className="helpContent">
                    <p>WAP (无线应用通讯协定)<br />
                        手机无线上网技术<br />
                        GPRS (通用无线技术) <br />
                        一种在现有GSM网络下的高速数据连接，只根据您所下载的数据量收费，与上网时间长短无关。 </p>
                </div>
            </div>


        )
    }
}



export default (PhoneBetting);


