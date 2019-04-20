/**
 * Created by sobi on 2017/7/31.
 */
import React, {Component} from 'react';
import {Spin} from 'antd';
import {connect} from 'react-redux';
import { Link, IndexLink } from 'react-router';
import './PromotionPage.scss';

class PromotionPage extends Component {
    constructor(props) {
        super(props);
        let selTypeId =this.props.routeParams.id?this.props.routeParams.id: "";
        this.state = {
            selTypeId:selTypeId,
            selPromoId:"",
            loading:true,
            viewHtml:"",
            itemHeight:0,
        };
    }
    componentDidMount() {
        if(this.props.promotionTypes.length>0){
            this.onSelectType({Id:this.state.selTypeId});
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.routeParams.id != nextProps.routeParams.id){
            this.onSelectType({Id:nextProps.routeParams.id});
        }
        if(this.props.promotionTypes.length != nextProps.promotionTypes.length){
            //默认加载第一个
            this.onSelectType("");
        }
    }
    onSelectType(type) {
        this.setState({
            loading:true
        });
        if(type==""){
            this.setState({
                selTypeId:"",
            });
        }else{
            this.setState({
                selTypeId:type.Id,
            });
        }
        new window.actions.ApiQueryPromotionsAction(1, 20, type.Id,'dafa').fly(resp=>{
            this.setState({
                loading:false
            });
        });
    }
    onSelectPromo(promo) {
        var promoId = promo.Id;
        if (this.state.selPromoId === promoId) {
            promoId = "";
        }
        this.setState({
            selPromoId:promoId,
            viewHtml:promo.Content
        },()=>{
            window.$("#promotionsModal").modal()
        });
    }
    renderPromotions() {
        var ret = [];
        for (var i = 0; i < this.props.promotions.rows.length; i++) {
            var promo = this.props.promotions.rows[i];
            var d = promo.EndTime.split('T')[0];
            ret.push(
                <div key={i} className="col-md-4 fadeInUp animated">
                    <div className="promotion-info" >
                        <div className="promotion-img">
                            <a onClick={this.onSelectPromo.bind(this,promo)}>
                                <img src={window.config.prdImgUrl+promo.Img} />
                            </a>
                        </div>
                        <div className="promotion-title">
                            {promo.Title}
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
            <a  href="javascript:void(0)" key="all" style={{width:width}} className={!this.state.selTypeId?"active promotion-tab-item":"promotion-tab-item"}  onClick={e=>{this.onSelectType("")}}>
                全部优惠
            </a>
        ];
        for (var i = 0; i < length; i++) {
            var type = this.props.promotionTypes[i];
            if(type.TypeName !='虚拟运动'){
                ret.push(
                    <a  href="javascript:void(0)" key={type.Id} style={{width:width}} className={this.state.selTypeId==type.Id?"active promotion-tab-item":"promotion-tab-item"} onClick={this.onSelectType.bind(this,type)}>
                       {type.TypeName}
                    </a>
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
                    <div className="promotion-tab">
                        {this.renderTypes()}
                    </div>
                    <div className="promotion-container row">

                           {this.state.loading? (
                                <div className="loading-container">
                                    <Spin wrapperClassName="loadText" tip="拼命加载中..."/>
                                </div>
                            ):this.renderPromotions()
                           }
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