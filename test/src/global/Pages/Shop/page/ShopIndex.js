import React, { Component } from 'react';
import { connect } from 'react-redux'
import {config} from "globalConfig";
import { browserHistory,Link } from 'react-router';
import "../css/ShopIndex.scss";
import {ApiMerchandiseCategoryAction, ApiMerchandiseListAction} from "globalAction";


class ShopIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
            category:[]
        };
    }
    componentWillMount(){
        let _this = this;
        new ApiMerchandiseCategoryAction().fly((resp)=>{
            if(resp.StatusCode==0){
                _this.setState({
                    category:resp.Data
                })
            }
        });
    }
    renderCategory(){
        let items=[];
        this.state.category.forEach((item,index)=>{
            items.push(
                <div className={"item"} key={index}>
                    <Link to={"/shop/mall/"+item.Id} className={"mall"+(index+1)} />
                </div>
            )
        })
        return items;
    }
    render() {
        const ImageGallery = window.r.get("ImageGallery");
        return (
            <div className="shopIndex">
                <ImageGallery height="465px" type="banner_Integral" imgtype='slider'></ImageGallery>
                <div className="container">
                    <div className="vip_divider">
                        <div className="vip_title"><Link to="/shop/vip">VIP尊贵会员特权</Link></div>
                        <div className="line-separator"></div>
                        <div className="know_more"><Link to="/shop/vip">&gt;&gt;更多详情</Link></div>
                    </div>
                    <div className="vip_home_icon_conteniar">
                        <div className="item">
                            <Link to={"/shop/vip"} className="icon1" />
                            <h5>超高返水</h5>
                        </div>
                        <div className="item">
                            <Link to="/shop/vip" className="icon2">
                            </Link>
                            <h5>生日/晋升奖励</h5>
                        </div>
                        <div className="item">
                            <Link to="/shop/vip" className="icon4">

                            </Link>
                            <h5>积分购物</h5>
                        </div>
                        <div className="item">
                            <Link to="/shop/vip" className="icon3">

                            </Link>
                            <h5>永久会籍</h5>
                        </div>
                    </div>
                    <div className="vip_divider">
                        <div className="vip_title"><Link to="/shop/mall">VIP购物</Link></div>
                        <div className="line-separator"></div>
                    </div>
                    <div className="vip_home_icon_conteniar mall">
                        <div className="title">
                            {config.appName}俱乐部会员，在{config.appName}游戏，您的每一笔投注都将永久累计，并转换为相应积分，可在积分商城兑换您喜欢的商品。<br/>
                            积分说明：每投注1000元即可累积1积分，系统每周二将会为您自动累积积分，永不清零。<br/>
                            积分兑换及使用：积分兑换前，请您先行查询已有积分数，再到积分商城兑换您喜欢的商品。兑换成功后，请您联系在线客服确认您的收货方式。
                        </div>
                        {this.renderCategory()}
                        {/*<div className="item">*/}
                            {/*<Link to={"/shop/mall"} className="mall1" />*/}
                        {/*</div>*/}
                        {/*<div className="item">*/}
                            {/*<Link to={"/shop/mall"} className="mall2" />*/}
                        {/*</div>*/}
                        {/*<div className="item">*/}
                            {/*<Link to={"/shop/mall"} className="mall3" />*/}
                        {/*</div>*/}
                        {/*<div className="item">*/}
                            {/*<Link to={"/shop/mall"} className="mall4" />*/}
                        {/*</div>*/}
                        {/*<div className="item">*/}
                            {/*<Link to={"/shop/mall"} className="mall5" />*/}
                        {/*</div>*/}
                        {/*<div className="item">*/}
                            {/*<Link to={"/shop/mall"} className="mall6" />*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        // user : state.user,
        message:state.message
    }
);

export default connect(mapStateToProps, {})(ShopIndex);