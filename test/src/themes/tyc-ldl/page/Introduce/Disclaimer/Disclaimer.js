import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  BackTop
} from 'antd';
import './Disclaimer.scss'
import {config} from "globalConfig";

class Disclaimer extends Component{
    constructor(props){
        super(props)
        this.state = {
        };
    }
    componentDidMount(){
    }

    render(){
        return(
            <div className="AboutUs container">
                <h2 className="page-title">免责声明</h2>
                <p className="sssv28-about_text">{config.appName} 对网站的內容及第三者在网站內提供的资料或內容之准确性等，并不会负上任何的法律责任。</p>
                <p className="sssv28-about_text">{config.appName} 会尽力确保网站资讯的准确性、完整性以及即时性(一切以发表日期为准)，但本公司并不能保证相关內容的准确性、完整性、即时性、网络技术与排版效果可达百分百的准确无误。</p>
                <p className="sssv28-about_text">另外，网站內的部分资讯与其发布的日期和时间是相关的。所以，在特定日期时间之后，相关资讯可能已不再准确真实，本公司亦不承诺会更新该项目，而您也有责任在采纳这些资讯前对其真实性进行核对验证。本公司保留在没有预先通知的情况下，修改或更新网站內容资讯的权利。同时，基于某些产品或服务乃受到规章及其他限制约束，所以有关项目并不适合于所有市场。</p>
                <BackTop></BackTop>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {

    }
);

export default connect(mapStateToProps,{})(Disclaimer);
