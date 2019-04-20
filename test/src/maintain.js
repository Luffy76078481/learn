
import React, { Component } from 'react';
import { render } from 'react-dom'
import {config} from "globalConfig";
import * as cache from "./store/CacheHelper";
import stopPng from "./global/otherPages/maintain/images/stop.png"
import "./global/otherPages/maintain/maintain.css";
import 'isomorphic-fetch';

window.Promise = Promise;//解决IE下Promise报错 【1.install babel-runtime和babel-plugin-transform-runtime 2.添加在主页之前添加window.Promise = Promise】


// ★★★★★
import "./themes/vns-uzi/otherPages/maintain/maintain.scss"


class ApiSysConfAction {
    fly(callback){
        let user = cache.get("user") || {};
        let authorization="";
        if (user && user.token) {
            authorization = user.username+' '+user.token;
        }
        fetch(config.apiPath+"client/all_sys_cfg?Tag="+config.webSiteTag, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization":authorization
            }
        }).then(function(response){
            return response.json();
        }).then(function(data){
            callback(data);
        });
    }

}

class MaintainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            online_service_link: "",
        }
    }
    componentDidMount() {

        new ApiSysConfAction().fly(resp => {
            if(resp.StatusCode === 0){
                this.setState({online_service_link: resp.Config.online_service_link});
            }
        });
    }

    serversOpen(e){
        e.preventDefault();
        window.open(this.state["online_service_link"],'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }

    render() {
        return (
            <div id="root" className="maintainPage">
                <div className=" item icon">
                    <img src={stopPng} width="100%" alt=""/>
                </div>
                <div className=" item txt">
                    <div className="logo">
                        <div className="innerLogo"></div>
                    </div>
                    <p className="time">进行维护中...</p>
                    <span>请您耐心等候，如有任何疑问,请联系</span><a id="serve" href="#" onClick={this.serversOpen.bind(this)}>24小时在线客服</a>
                    <p>给您带来不便，敬请谅解！</p>
                </div>
            </div>
        )
    }
}

render(<MaintainPage/>, document.getElementById('root'));
