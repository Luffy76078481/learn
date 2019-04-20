 /**
 * 
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link, IndexLink } from 'react-router';
import './PromotionPage.scss';

class PromotionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {selTypeId:"",selPromoId:""};
    }
    componentDidMount(){
        this.onSelectType("");
    }
    onSelectType(type) {
        if(type==""){
            this.setState({
                selTypeId:""
            });
        }else{
            this.setState({
                selTypeId:type.Id
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
    renderPromotions() {
        var ret = [];
        for (var i = 0; i < this.props.promotions.rows.length; i++) {
            var promo = this.props.promotions.rows[i];  
            var d = promo.EndTime.split(' ')[0];
            let imgUrl = window.config.prdImgUrl+promo.Img;
            ret.push(
                <li key={i} className="wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                    <div className="promotions-list-left color-highlight ">
                        <h3>{d.split('/')[0]}</h3>
                        <h2>{d.split('/')[1] + "/" + d.split('/')[2]}</h2>
                    </div>
                    <div className="promotions-list-right">
                        <div className="promotions-list-inco "></div>
                        <div className="promotions-list-content BGcolor-third promotions-border">
                            <div className="promotions-list-img" onClick={this.onSelectPromo.bind(this,promo.Id)} style={{background: "url('" + imgUrl + "') no-repeat", cursor:"pointer"}}>
                                <div className="promotions-list-title">
                                    <h3>{promo.Title}</h3>
                                    <span>发布时间：{promo.StartTime.split(' ')[0]}</span>
                                </div>
                            </div>
                            <div className="promotions-list-view" style={{display:this.state.selPromoId==promo.Id?"block":"none"}}>
                                <div className="hd-content" dangerouslySetInnerHTML={{__html:promo.Content}}>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clear"></div>
                </li>
            )
        }
        return ret;
    }
    renderTypes() {
        var ret = [
            <li key="all" className={this.state.selTypeId==''?"active ":""}><a className="color-highlight" href="javascript:void(0)" onClick={e=>{this.onSelectType("")}}>全部</a></li>
        ];
        for (var i = 0; i < this.props.promotionTypes.length; i++) {
            var type = this.props.promotionTypes[i];
            ret.push(
                <li key={type.Id} className={this.state.selTypeId==type.Id?"active ":""}><a className="color-highlight" href="javascript:void(0)" onClick={this.onSelectType.bind(this,type)}>{type.TypeName}</a></li>
            )
        }
        return ret;
    }
    render() {
        const ImageGallery = window.r.get("ImageGallery");
        const options2 = window.r.props('ImageGallery');
        let height = options2.promotionHeight || options2.height || "170px";
        const SideNav = window.r.get("SideNav");
        const options = window.r.props("PromotionPage");
        if(window.config.spec == "xhtd-xin"){
            height = "240px";
        }else{
            height = "140px"
        }
        return (
            <article id="promotions" className="BGcolor-main">
                {options2&&options2.promotionEnabled ?
                    <div className="banner"><ImageGallery width="100%" height={height} type="promotion_banner_imgs" imgtype='banner' /></div>
                    :null}
                {window.config.spec == 'xpj_demo'?<div className='page-title-module'></div>:null}
                <div className="container">
                    {!options.sideBar?null
                    :<div className="leftBox"><SideNav/></div>}
                    <div className="promotions-fname">
                        <div className="promotions-nav wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                            <ul className="promotions_nav_box">
                                {this.renderTypes()}
                            </ul>
                            <div className="clear"></div>
                        </div>
                        <div className="promotions-list ">
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
        promotions:state.promotions.promotions
    }
);

export default connect(mapStateToProps, {})(PromotionPage);