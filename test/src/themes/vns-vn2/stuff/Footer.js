/**
 * 
 */
// import("./Footer.scss");
import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./Footer.scss"

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            online_service_link: "",
        }
    }

    serversOpen(e){
        e.preventDefault();
        if(e.target.id=='test'){
            window.swal({
                    title: "忘记密码",
                    text: "联系在线客服协助修改密码",
                    confirmButtonColor: "#c5841f",
                    confirmButtonText: "联系客服",
                    // closeOnConfirm: false
                    showCancelButton: true,
                    cancelButtonText: "关闭",
                    // cancelButtonColor: "#f8c700",
                },
                ()=>{
                    window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
                });
            return;
        }
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }

    render() {
        const appName = window.config.appName;
        let logoName = '威尼斯人'
        if(window.config.promotionTag == 'jinsha'){
            logoName = '金沙';
        }
        return (
            <div className="venetianFooter">
                <div className="top">
                    <div className="center">
                        <div className="pic"></div>
                        <div className="links">
                            <a href="/help.html" target="_blank">帮助中心</a>
                            <a href="/agent.html" target="_blank">代理合作</a>
                            <a href="#" onClick={this.serversOpen.bind(this)}>客服中心</a>
                        </div>
                    </div>
                </div>
                <div className="middle">
                    <div className="m_center"></div>
                </div>
                <div className="bottom">
                    <div className="b_center">
                        <div className="items one">
                            <h5 className="service">服务优势<span>Service Advantages</span>
                            </h5>
                            <div className="s_content">
                                <div className="s s_pic1"></div>
                                <div className="s s_pic2"></div>
                                <div className="s s_pic3"></div>
                            </div>
                        </div>
                        <div className="items two">
                            <h5 className="product">产品优势<span>Product Advantages</span></h5>
                            <div className="p_content">
                                <h6>快乐彩<span>KENO</span></h6>
                                <p>{logoName}娱乐场的快乐彩，兼容iPad/iPhone等各种移动设备，是目前市面上用户体验最优秀的产品。</p>
                                <h6>体育平台 <span>SPORT BET</span></h6>
                                <p>经过{logoName}娱乐场用户体验中心设计的投注界面，能够让您轻松、恬静的享受体育投注的乐趣。</p>
                                <h6>真人娱乐城 <span>LIVE CASINO</span></h6>
                                <p>{logoName}娱乐场所使用的娱乐城平台，必须经过TST Game国际认证，保证每款游戏公平公正。</p>
                            </div>
                        </div>
                        <div className="items three">
                            <h5 className="more">更多服务<span>More Services</span></h5>
                            <div className="m_content">
                                <h6>实力保障 Power Security</h6>
                                <p>{logoName}娱乐场为上市公司新世界集团旗下赌场酒店，位于澳门
                                    新口岸城市日大马路，集团投资120亿港币全力打造线上博彩平台。</p>
                                <h6>合作伙伴 PARTNERS</h6>
                                <div className="m_pic"></div>
                                <h6>使用帮助 USE HELP</h6>
                                <div className="m_nav">
                                    <a href="/help.html">如何存款</a>/
                                    <a href="/help.html">游戏帮助</a>/
                                    <a href="/help.html">隐私保护</a>
                                    <a href="/help.html">如何退款</a>/
                                    <a href="/help.html">责任条款</a>/
                                    <a href="/help.html">规则条款</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        message:state.message,
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps, {

})(Footer)