/**
 * update --------------------------- promotion
 */
import React, {Component} from 'react';

import {connect} from 'react-redux';
import { Link, IndexLink } from 'react-router';
import "./PromotionPage2.scss";

class PromotionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selTypeId:"",
            selPromoId:"",
            protitle:"全部优惠"
        };
    }
    componentWillUnmount(){
        document.title = "dafabet在线投注亚洲最好的在线投注网站"
    }
    componentDidMount() {
        window.$("#root").attr("class", "usefulcss");
        document.title = "更多详情"

        var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };
        var web = getUrlParameter('tab');
        if(web=="sport"){
            this.setState({
                selTypeId:'8',
                protitle:"体育优惠"
            });
            new window.actions.ApiQueryPromotionsAction(1, 20, 8).fly();
        }else if(web=="vip"){
            this.setState({
                selTypeId:'6',
                protitle:"VIP玩家优惠活动"
            });
            new window.actions.ApiQueryPromotionsAction(1, 20, 6).fly();
        }
        else {
            this.onSelectType("");
        }
    }
    // 选择优惠内容
    onSelectType(type) {
        if(type==""){
            this.setState({
                selTypeId:"",
                protitle:"全部优惠"
            });
        }else{
            this.setState({
                selTypeId:type.Id,
                protitle:type.TypeName
            });
        }
        new window.actions.ApiQueryPromotionsAction(1, 20, type.Id).fly();
    }
    onSelectPromo(promoId) {
        if (this.state.selPromoId === promoId) {
            promoId = "";
        }
        this.setState({selPromoId:promoId});
    }
    // 优惠列表
    renderPromotions() {
        var ret = [];
        if(this.props.promotions.rows){
            for (var i = 0; i < this.props.promotions.rows.length; i++) {
                var promo = this.props.promotions.rows[i];
                let imgUrl = window.config.prdImgUrl+promo.Img;
                ret.push(
                    <li key={i} className="wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                        <div className="promotions-list-right">
                            <div className="promotions-list-content BGcolor-third promotions-border">
                                <div className="promotions-list-img2" onClick={this.onSelectPromo.bind(this,promo.Id)} style={{background: "url('" + imgUrl + "') no-repeat", cursor:"pointer"}}>
                                    <div className="promotions-list-title">
                                        <h3>{promo.Title}</h3>
                                        <span>发布时间：{promo.StartTime.split('T')[0]}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* dangerouslySetInnerHTML */}
                        <div className="promotions-list-view" style={{display:this.state.selPromoId==promo.Id?"block":"none"}}>
                            <div className="hd-content" dangerouslySetInnerHTML={{__html:promo.Content}}></div>
                        </div>
                        <div className="clear"></div>
                    </li>
                )
            }            
        }
        return ret;
    }
    // 优惠导航
    renderTypes() {
        var ret = [
            <li key="all" className={this.state.selTypeId==''?"active promotions_type":"promotions-border2 promotions_type"}  onClick={e=>{this.onSelectType("")}}><a className="color-highlight" href="javascript:void(0)">全部优惠</a></li>
        ];
        for (var i = 0; i < this.props.promotionTypes.length; i++) {
            var type = this.props.promotionTypes[i];
            ret.push(
                <li key={type.Id} className={this.state.selTypeId==type.Id?"active promotions_type":"promotions-border2 promotions_type"} onClick={this.onSelectType.bind(this,type)}><a className="" href="javascript:void(0)">{type.TypeName}</a></li>
            )
        }
        return ret;
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=900,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=450,screenY=250');
        return false;
    }
    render() {
        const ImageGallery = window.r.get("ImageGallery");
        return (
            <article id="promotions" className="BGcolor-main">
                <div className="container">
                    <div className="promotions-fname">
                        <div className="promotions-nav2 wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                            {/* 优惠导航 */}
                            <ul className="promotions_nav_box">
                                {this.renderTypes()}
                            </ul>
                            <div className="contact">
                                <p className="dw_line title">大发娱乐场客服服务</p>
                                <a href="#" className="dw_line help" onClick={this.serversOpen.bind(this)}>在线客服</a>
                                <a href="#" className="dw_line mail">{this.props.remoteSysConfs.online_service_email}</a>
                                <p className="phone">国际热线电话:</p>
                                <a href="#">{this.props.remoteSysConfs.online_service_phone}</a>
                                <p>大陆客户专访QQ:</p>
                                <a href="#">{this.props.remoteSysConfs.online_service_qq}</a>
                                <p>官方微信: </p>
                                <div className="qrimg"></div>
                            </div>
                            <div className="clear"></div>
                        </div>
                        <div className="promotions-list">
                            <div className="protitle">{this.state.protitle}</div>
                            {/* 优惠列表 */}
                            <ul className="promotions_content_box">
                                {this.renderPromotions()}
                            </ul>
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        promotionTypes:state.promotions.promoTypes,
        promotions:state.promotions.promotions,
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps, {})(PromotionPage);