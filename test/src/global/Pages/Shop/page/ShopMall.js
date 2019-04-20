import React, { Component } from 'react';
import { connect } from 'react-redux'
import {config} from "globalConfig";
import { Pagination,InputNumber,Spin} from 'antd';
import { browserHistory,Link } from 'react-router';
import "../css/ShopMall.scss";
import freeIMG from "../images/FreeBonus.jpg"
import {ApiMerchandiseCategoryAction, ApiMerchandiseListAction,ApiConsumeIntegralAction,ApiPlayerInfoAction} from "globalAction";

class ShopMall extends Component {
    constructor(props){
        super(props);
        this.state={
            dataList:[],
            consumeObj:null,
            currentPage:1,
            total:0,
            defaultPageSize:10,
            loading:true,
            category:[],
            typeId:this.props.params.typeId?this.props.params.typeId:""
        }
    }
    componentWillMount(){
        let _this = this;
        new ApiMerchandiseCategoryAction().fly((resp)=>{
            if(resp.StatusCode==0){
                _this.setState({
                    category:resp.Data
                })
            }
        })
        _this.getList();
    }
    pageChange(page,pageSize){
        this.setState({
            currentPage:page
        },()=>{
            this.getList()
        })

    }
    changeTypeId(typeId){
        this.setState({
            typeId
        },()=>{
            this.getList();
        });

    }
    getList(){
        let params={
            Title:this.refs.mallName?window.$.trim(this.refs.mallName.value):"",
            CategoryId:this.state.typeId,
            PageIndex:this.state.currentPage-1,
            PageSize:this.state.defaultPageSize
        };
        this.setState({
            loading:true
        },()=>{
            new ApiMerchandiseListAction(params).fly((resp)=>{
                if(resp.StatusCode==0){
                    this.setState({
                        dataList:resp.Data.List,
                        total:resp.Data.Count,
                        loading:false
                    })
                }else{
                    window.swal(resp.Message,"",'info');
                    this.setState({
                        loading:false
                    })
                }
            })
        })

    }
    consumeAction(){
        let item = this.state.consumeObj;
        let num = this.refs['consumeNum'+item.Id].inputNumberRef.state.value;
        let params={
            MerchandiseId:item.Id,
            MerchandiseCount:num,
            UserAddress:this.refs.address.value,
            Consignee:this.refs.username.value,
            ConsigneePhone:this.refs.phone.value
        }
        new ApiConsumeIntegralAction(params).fly((resp)=>{
            this.closeModal();
            if(resp.StatusCode==0){
                window.swal('恭喜您，兑换成功！',"",'success');
                new ApiPlayerInfoAction().fly();
            }else{
                window.swal(resp.Message,"",'info');
            }
        })
    }
    ConsumeIntegral(item){
        if(!this.props.user.token){
            window.$("#reserveDialog_login").modal("show");
            return false;
        }
        let consumeType= item.Type;//商品类型 0：积分  1：实物【需要填写收货人、地址、电话】
        this.setState({
            consumeObj:item
        },()=>{
            if(consumeType==1){
                window.$("#shopModal").modal("show");
                return false;
            }else{
                this.consumeAction()
            }
        });
    }
    renderList(){
        let _this = this;
        let list=[];
        if(this.state.dataList.length){
            this.state.dataList.forEach((item,index)=>{
                list.push(
                    <div className="item" key={index}>
                        <div className="item_img">
                            <img src={item.BigImgUrl} width="176" height="178" />
                        </div>
                        <div className="item_title">{item.Title}</div>
                        <div className="item_price">{item.IntegralPrice}积分</div>

                        <div className="item_claim">
                            <InputNumber min={1} max={100000} defaultValue={1} ref={"consumeNum"+item.Id}  />
                            <a className="vip_bt_red" onClick={_this.ConsumeIntegral.bind(_this,item)}>兌換</a>
                        </div>
                    </div>
                )
            })
        }else{

            list.push(
                <div className={"no_result"} key={"no_result"}>
                    {!this.state.loading &&   <p>^0^!!抱歉没有找到相应数据。</p>}

                </div>
            )
        }
        return list;
    }
    renderCategory(){
        let nav=[];
        let selTypeId=this.state.typeId;
        nav.push(
            <li onClick={this.changeTypeId.bind(this,"")} key={"all"} className={selTypeId==""?"active":""}><span>全部</span></li>
        );
        this.state.category.forEach((item,index)=>{
            nav.push(
                <li  onClick={this.changeTypeId.bind(this,item.Id)} className={selTypeId==item.Id?"active":""} key={index}>
                    <span>{item.CategoryName}</span>
                </li>
            )
        });
        return nav;
    }
    closeModal(){
        this.refs.address.value ="";
        this.refs.username.value ="";
        this.refs.phone.value ="";
        window.$("#shopModal").modal('hide');
    }
    render() {
        return (
            <div className="ShopMall">
                <div className="container">
                     <div className="mall_title">
                       <div className="text">积分商城</div>
                       <div className="nav">
                           <ul>
                               {this.renderCategory()}
                           </ul>
                       </div>
                   </div>
                    {/*搜索*/}
                    <div className="vip_grey_bar clear">
                        <div className="left">
                            <div className="vip_text04">礼品名称：</div>
                            <div className="vip_input_field3">
                                <input type="text" id="mallName" ref="mallName" size="14" />
                            </div>
                            <a className="vip_bt_red" onClick={this.getList.bind(this)}>搜索</a>
                        </div>
                        {/*<div className="right">*/}
                            {/*<div className="vip_text04">排序：</div>*/}
                            {/*<div className="vip_input_field3">*/}
                                {/*<select id="product_sort" defaultValue={0}  >*/}
                                    {/*<option value="0">请选择</option>*/}
                                    {/*<option value="1">积分从低到高</option>*/}
                                    {/*<option value="2">积分从高到低</option>*/}
                                    {/*<option value="3">A - Z</option>*/}
                                {/*</select>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    </div>
                    {/**/}
                    <div className="itemList">
                        <Spin spinning={this.state.loading} tip="加载中,请稍后...">
                            {
                                this.state.total>0 &&
                                <div className="topPage">
                                    <Pagination size="small" defaultPageSize={this.state.defaultPageSize} current={this.state.currentPage} total={this.state.total} onChange={this.pageChange.bind(this)} />
                                </div>
                            }
                            <div className="listCon">
                                {this.renderList()}
                            </div>
                            {
                                this.state.total>0 &&
                                <div className="botPage">
                                    <Pagination size="small"   defaultPageSize={this.state.defaultPageSize} current={this.state.currentPage} total={this.state.total} onChange={this.pageChange.bind(this)}  />
                                </div>
                            }

                        </Spin>
                    </div>
                </div>
                <div ref="dlg" id="shopModal" className="modal fade" role="dialog">
                    <div className="modal-dialog shopModal">
                        <div className="modal-content custom_modal_content">
                            <div className="modal-header ">
                                <button type="button" className="close" data-dismiss="modal" onClick={this.closeModal.bind(this)}><i className="fa fa-times"></i></button>
                                <h4 className="modal-title color-second">收货信息</h4>
                            </div>
                            <div className="modal-body" style={{height:"auto"}}>
                                <div className="row">
                                    <div className="col-xs-3 col-md-3"><p>收货人:</p></div>
                                    <div className="col-xs-7 col-md-7">
                                        <input ref="username" type="text" placeholder="请填写收货人姓名" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-3 col-md-3"><p>收货地址:</p></div>
                                    <div className="col-xs-7 col-md-7">
                                        <input ref="address" type="text" placeholder="请填写收货地址" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-3 col-md-3"><p>联系电话:</p></div>
                                    <div className="col-xs-7 col-md-7">
                                        <input ref="phone" type="phone" placeholder="请填写联系电话" />
                                    </div>
                                </div>
                                <div className="row">
                                    <button onClick={this.consumeAction.bind(this)} className={"btn btn-primary"}>确定</button>
                                    <button className={"btn btn-danger"}  onClick={this.closeModal.bind(this)}>取消</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
    }
);

export default connect(mapStateToProps, {})(ShopMall);