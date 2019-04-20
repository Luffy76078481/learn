
import React,{Component} from 'react';
import { render } from 'react-dom';
import {config} from "globalConfig";
import AgentPage1 from "./agent1";
import AgentPage2 from "./agent2";
import AgentPageTYC from "./agent_tyc"
import "./global/otherPages/agent/css/agent.scss"
import 'isomorphic-fetch';

window.Promise = Promise;//解决IE下Promise报错 【1.install babel-runtime和babel-plugin-transform-runtime 2.添加在主页之前添加window.Promise = Promise】

// ★★★★★
//__start import "./themes/#{spec}/otherPages/agent/skin.scss";
import "./themes/xhtd-xhtd/otherPages/agent/skin.scss";
//__end

let agentPage = AgentPage1;
if (config.spec == "ybb"||config.spec == "xhtd-xin"||config.spec == "xhtd-bt6"||config.spec == "xhtd-xhtd" || config.spec == "xhtd-ldl" ) {
    agentPage = AgentPage2;
}else if(config.spec == "tyc-bt6" || config.spec == "tyc-ldl" ){
    agentPage = AgentPageTYC;
}
render(
   React.createElement(agentPage),
    document.getElementById('agent')
);