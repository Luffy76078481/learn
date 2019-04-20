 /**
 * xhtd-优惠
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link, IndexLink } from 'react-router';
import './PromotionPage.scss';

class PromotionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selTypeId:"", // active
            selPromoId:"" // 内容展开 
        };

    }
    componentDidMount(){
        window.$("#root").attr("class", "usefulcss");
        document.title = "更多详情"
        this.onSelectType(""); 
    }
    componentWillUnmount(){
        document.title = "Www.4776.coM"
    }
    // 选择优惠内容
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
    // 优惠内容展开
    onSelectPromo(promoId) {
        if (this.state.selPromoId === promoId) {
            promoId = "";
        }
        this.setState({selPromoId:promoId});
    }
    // 优惠内容
    renderPromotions() {
        var ret = [];
        for (var i = 0; i < this.props.promotions.rows.length; i++) {
            var promo = this.props.promotions.rows[i];
            let imgUrl = window.config.prdImgUrl+promo.Img;
            ret.push(
                <li key={i} className="wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                    <div className="promotions-list-right">
                        <div className="promotions-list-content BGcolor-third promotions-border">
                            <div className="promotions-list-img" onClick={this.onSelectPromo.bind(this,promo.Id)} style={{background: "url('" + imgUrl + "') no-repeat", cursor:"pointer"}}>
                                <div className="promotions-list-title">
                                    <h3>{promo.Title}</h3>
                                    <span>发布时间：{promo.StartTime.split(' ')[0]}</span>
                                </div>
                            </div>
                            <div className="promotions-list-view" style={{display:this.state.selPromoId==promo.Id?"block":"none"}}>
                                {/* dangerouslySetInnerHTML */}
                                <div className="hd-content" dangerouslySetInnerHTML={{__html:promo.Content}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="clear"></div>
                </li>
            )
        }
        return ret;
    }
    // 优惠列表
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
        if(window.config.spec == "xhtd2"){
            height = "240px";
        }else{
            height = "140px"
        }
        return (
            <article id="promotions" className="BGcolor-main">
                <div className="banner">
                    <ImageGallery width="100%" height={height} type="promotion_banner_imgs" imgtype='banner' />
                </div>
                <div className="container">
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