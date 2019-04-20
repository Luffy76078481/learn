/**
 * Created by sobi on 2017/7/31.
 */
import React, {Component} from 'react';

import {connect} from 'react-redux';
import { Link, IndexLink } from 'react-router';

class PromotionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selTypeId:"",
            selPromoId:"",
            protitle:"全部优惠",
            viewHtml:"测试",
            itemHeight:0,
        };
    }
    componentDidMount() {
        window.$("#root").attr("class", "usefulcss");
        document.title = "更多详情";
        // window.addEventListener("resize", this.onResize.bind(this));
        // this.onResize();

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
    onResize(){
        var $showcase = window.$("#promotions .col-4");
        var windowWidth = window.$(window).width();
        var num = 0.33333;
        if(windowWidth<1300) return;
        var width = parseInt((windowWidth-200)*num);
        if(this.state.itemHeight>0){
            $showcase.height( parseInt(width*(2/3)));
        }else{
            this.setState({
                itemHeight:parseInt(width*(2/3))
            })
        }

    }

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
        new window.actions.ApiQueryPromotionsAction(1, 20, type.Id,'dafa').fly();
    }
    onSelectPromo(promo) {
        var promoId = promo.Id;
        if (this.state.selPromoId === promoId) {
            promoId = "";
        }
        this.setState({
            selPromoId:promoId,
            viewHtml:promo.Content
        });
    }
    renderPromotions() {
        var ret = [];
        var colorArr=['tag-bule','tag-red','tag-dealer',''];

        for (var i = 0; i < this.props.promotions.rows.length; i++) {
            var randoms =parseInt(4*Math.random());
            var promo = this.props.promotions.rows[i];
            var d = promo.EndTime.split('T')[0];
            ret.push(
                <div key={i} className="col-4 fadeInUp animated">
                    <div className="promotion-thumbnail-info" style={{height:'398px'}}>
                        {/*<div className={"promo-ribbon "+colorArr[randoms]}>*/}
                            {/*街机*/}
                        {/*</div>*/}
                        <div className="promotion-list-img">
                            <a onClick={this.onSelectPromo.bind(this,promo)} data-toggle="modal"  data-target="#promotionsModal" >
                                <img src={window.config.prdImgUrl+promo.Img} />
                            </a>
                        </div>
                        <div className="promotion-list-title">
                            <h3>{promo.Title} </h3>
                            <span>{promo.Description} <a onClick={this.onSelectPromo.bind(this,promo)}  data-toggle="modal"  data-target="#promotionsModal" >更多详情 »</a></span>
                        </div>
                    </div>
                </div>
            )
        }
        return ret;
    }



    renderTypes() {
        let length = this.props.promotionTypes.length;
        let width= 100/(length+2)+'%';
        var ret = [
            <li key="all" style={{width:width}} className={this.state.selTypeId==''?"active promotion-tab-item":"promotion-tab-item"}  onClick={e=>{this.onSelectType("")}}>
                <a href="javascript:void(0)">全部优惠</a>
            </li>
        ];
        for (var i = 0; i < length; i++) {
            var type = this.props.promotionTypes[i];
            if(type.TypeName !='虚拟运动'){
                ret.push(
                    <li key={type.Id} style={{width:width}} className={this.state.selTypeId==type.Id?"active promotion-tab-item":"promotion-tab-item"} onClick={this.onSelectType.bind(this,type)}>
                        <a href="javascript:void(0)">{type.TypeName}</a>
                    </li>
                )
            }

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
                <div id="promotionsModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">
                                    <i className="fa fa-close"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div style={{padding:'20px',color:"#555"}} dangerouslySetInnerHTML={{__html:this.state.viewHtml}}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    {/*<ImageGallery width="100%" height="170px" type="promotion_banner_imgs" class="game_list_top_img" imgtype='banner'></ImageGallery>*/}
                    <div className="promotion-tab">
                        <ul className="tab">
                            {this.renderTypes()}
                        </ul>
                        <div className="clear"></div>
                    </div>
                    <div className="promotion-container">
                           {this.renderPromotions()}
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