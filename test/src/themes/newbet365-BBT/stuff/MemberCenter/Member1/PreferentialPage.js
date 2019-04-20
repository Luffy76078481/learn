/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import {ApiQueryPromotionsAction} from "../../../../../actions/index";
import PageBar from "./PageBar"

class PreferentialPage extends Component {
    constructor(props) {
        super(props);
        this.state = {selPromo:null,x:true};
    }
    onSelectPromo(promo) {
        this.setState({selPromo:promo,x:false});
    }

    offSelectPromo() {
        this.setState({selPromo:null,x:true});
    }

    componentDidMount() {
        new ApiQueryPromotionsAction().fly();
    }
    toPage(pageNo = 1){
        new ApiQueryPromotionsAction(pageNo).fly();
    }

    renderPromotions() {
        var ret = [];
        for (var i = 0; i < this.props.promotions.rows.length; i++) {
            var promo = this.props.promotions.rows[i];
            ret.push(
                    <tr key={promo.id} style={{display: "table-row; opacity: 1"}}>
                    <td className="tc">{promo.title}</td>
                    <td className="tc">{promo.start}</td>
                    <td className="tc">{promo.end}</td>
                    <td className="tc color-third">
                        <a href="javascript:" onClick={this.onSelectPromo.bind(this,promo)} className="detail_link copyColor1 f14" >查看详情</a>
                    </td>
                    </tr>)
        }
        return ret;

    }

    render() {
        return (

            <div className="clearfix t20 member-content ">
                {this.state.selPromo?
                        <div className="modal-dialog" style={{width:"1000px",position:"absolute",zIndex:"100"}}  >
                            <div className="modal-content custom_modal_content preferential_popbox" style={{width:"1000px"}}  >
                                <div className="modal-header member-madal-header " style={{fontSize:"18px",textAlign:"center",padding:"15px"}}>
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.offSelectPromo.bind(this)}><img
                                         alt="" className="closeImg"/></button>
                                    <h4 className="modal-title">{this.state.selPromo.title}</h4>
                                </div>
                                <div className="modal-body fast_booking_content member-modal preferential_popbox_content" style={{width:"auto",padding:"40px"}}>
                                    <div className="promotions-list-view " style={{display:"block"}}>
                                        <div className="hd-content " dangerouslySetInnerHTML={{__html:this.state.selPromo.content}}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>:[]}
                <div className="block1" hidden={this.state.x} onClick={this.offSelectPromo.bind(this)}></div>
                <table className="table-msg table-border f14">
                    <thead>
                    <tr>
                        <th width="40%" className="tc member-th">优惠标题</th>
                        <th width="18%" className="tc member-th">优惠开始时间</th>
                        <th width="18%" className="tc member-th">优惠结束时间</th>
                        <th width="24%" className="tc member-th">查看详情</th>
                    </tr>
                    </thead>
                    <tbody id="promotab">
                    {this.renderPromotions()}
                    </tbody>
                </table>
                <PageBar page={this.props.promotions} toPage={this.toPage.bind(this)}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        promotions:state.promotions.promotions
    }
);

export default connect(mapStateToProps, {

})(PreferentialPage);