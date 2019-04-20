

import React, {Component} from 'react';
import "./AffixHongbao.scss";

export default class AffixHongbao extends Component {

    render(){
        var options = window.r.props("AffixHongbao");
        var page = options.page || "/hongBao.html";
        if (page.indexOf("?") > 0) {
            page += "&t=" + new Date().getTime();
        } else {
            page += "?t=" + new Date().getTime();
        }
        return (<div className="affix-hongbao"><a target="_blank" href={page}><span>抢红包</span></a></div>);
    }
}