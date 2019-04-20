import React, { Component } from 'react';
import {NavBar, Icon, List,Modal ,Button,InputItem, Badge, Toast, ListView, Flex,Stepper,Popover,SearchBar } from 'antd-mobile';
import {
    ApiMerchandiseCategoryAction,
    ApiMerchandiseListAction,
    ApiConsumeIntegralAction,
    ApiPlayerInfoAction,
    wapLogin
} from "globalAction"
import {config} from "globalConfig";
import {browserHistory, Link} from 'react-router';
import connect from "react-redux/es/connect/connect";
import * as cache from "CacheHelper";
import './ShopPage.scss';
let pageIndex = 0;
let listData=[];
const PopoverItem = Popover.Item;
const dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
});
function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}
class ShopPage extends Component{
    constructor(props) {
        super(props);

        this.state={
            tabLoading:false,
            showModal:false,
            consumeObj:{},
            dataSource: dataSource.cloneWithRows({}),
            isLoading: false,
            hasMore:true,
            category:[],
            categoryVal:"",
            PopoverVisible:false
        }
    }
    componentWillMount(){
        let _this = this;
        pageIndex=0;
        listData=[];
        new ApiMerchandiseCategoryAction().fly((resp)=>{
            if(resp.StatusCode==0){
                _this.setState({
                    category:resp.Data
                })
            }
        })
        this.getList();
    }
    openSildeBar(){
        this.props.params.openSilde()
    }
    onEndReached = () => {
        if(!this.state.hasMore || this.state.isLoading)  return false;
        this.setState({ isLoading: true });
        this.getList();
    };

    getList(flag){
        let _this = this;
        if(flag){
            pageIndex=0;
            listData=[];
        }
        let params={
            Title: this.refs.SearchBar?this.refs.SearchBar.state.value.replaceAll(' ','') : "",
            CategoryId:this.state.categoryVal,
            PageIndex:pageIndex,
            PageSize:10
        };
        this.setState({
            loading:true,
            dataSource:flag?dataSource.cloneWithRows({}):this.state.dataSource,
            hasMore:true
        },()=>{
            new ApiMerchandiseListAction(params).fly((resp)=>{
                pageIndex++;
                listData=listData.concat(resp.Data.List);
                if(resp.StatusCode==0){
                    _this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(listData),
                        hasMore: resp.Data.Count>pageIndex*10,
                        isLoading: false,
                        tabLoading:false
                    })
                }else{
                    Modal.alert(resp.Message);
                    _this.setState({
                        isLoading: false,
                        tabLoading:false
                    })
                }
            })
        })
    }
    showModal(){
        this.setState({
            showModal:true
        })
    }
    onCloseModal(){
        this.setState({
            showModal:false
        },()=>{
            this.refs.address.state.value ="";
            this.refs.username.state.value ="";
            this.refs.phone.state.value ="";
        })
    }

    ConsumeIntegral(item){
        if(!wapLogin(true)) return false;
        let consumeType= item.Type;//商品类型 0：积分  1：实物【需要填写收货人、地址、电话】
        this.setState({
            consumeObj:item
        },()=>{
            if(consumeType==1){
                this.showModal();
            }else{
                this.consumeAction()
            }
        });
    }
    renderList(){
        const _this = this;
        if(this.state.tabLoading){
            return(
                <div className="dataLoading"><i className="icon-spinner icon-spin"></i> 玩命加载中...</div>
            )
        }
        const row = (rowData) => {
            function createStepperRef(ref) {
                _this['Stepper'+rowData.Id]=ref;
            }
            return (
                <Flex className="listItem" align="start">
                    <Flex.Item className="itemL">
                        <img src={config.devImgUrl+rowData.BigImgUrl} width={'30%'}  />
                    </Flex.Item>
                    <Flex.Item className="itemR">
                        <h5>{rowData.Title}</h5>
                        <div className="item_price">{rowData.IntegralPrice}积分</div>
                        <div className="item_claim">
                            <Stepper
                                ref={createStepperRef}
                                showNumber
                                min={1}
                                defaultValue={1}
                            ></Stepper>
                            <Button type="primary" onClick={_this.ConsumeIntegral.bind(_this,rowData)} inline size="small">兌換</Button>
                        </div>
                    </Flex.Item>
                </Flex>
            )
        };
        const renderFooter = ()=>{
            let con;
            if(_this.state.hasMore){
                con=(<div className="dataLoading"><i className="icon-spinner icon-spin"></i> 玩命加载中...</div>)
            }else {
                con=(<div style={{textAlign:'center',lineHeight:'2rem'}}>我没有更多数据了! (ㄒoㄒ)~</div>)
            }
            return con;
        };
        return(
            <ListView
                dataSource={_this.state.dataSource}
                className="myListView"
                renderFooter={renderFooter}
                renderRow={row}
                pageSize={20}//每次事件循环（每帧）渲染的行数
                scrollRenderAheadDistance={200}//当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
                onEndReached={this.onEndReached.bind(this)}//当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用
                onEndReachedThreshold={100}//调用onEndReached之前的临界值，单位是像素
            />
        )
    }
    categoryChange(val){
        let categoryVal =val.props.value;
        if(this.state.categoryVal == categoryVal) return false;
        this.setState({
            categoryVal,
            PopoverVisible:false
        },()=>{
            this.getList(true)
        })
    }
    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }
    consumeAction(){
        let item = this.state.consumeObj;
        let num = this['Stepper'+item.Id].stepperRef.state.value;
        let params={
            MerchandiseId:item.Id,
            MerchandiseCount:num,
            UserAddress:this.refs.address?this.refs.address.state.value:"",
            Consignee:this.refs.username?this.refs.username.state.value:"",
            ConsigneePhone:this.refs.phone?this.refs.username.state.value:""
        }
        this.onCloseModal();
        Toast.loading('正在为您准备礼品,请稍候...',300)
        new ApiConsumeIntegralAction(params).fly((resp)=>{
            Toast.hide();
            if(resp.StatusCode==0){
              Modal.alert('恭喜您，兑换成功！');
                new ApiPlayerInfoAction().fly();
            }else{
                Modal.alert(resp.Message);
            }
        })
    }
    validForm(){
        let userName=this.refs.username.state.value;
        let address = this.refs.address.state.value;
        let phone = this.refs.phone.state.value;
        if(!userName || !address || !phone){
            Modal.alert('缺少个人信息','请完善您的个人信息,以方便我们能够把礼品寄送给您！')
            return false;
        }
        this.consumeAction();
    }
    render(){
        let _this = this;
        let PopoverItemCon=[(<PopoverItem key="0" value="" >全部</PopoverItem>)];
        let categoryName="全部";
        this.state.category.forEach((item,index)=>{
            if(_this.state.categoryVal == item.Id){
                categoryName=item.CategoryName
            }
            PopoverItemCon.push(<PopoverItem key={index+1} value={item.Id} >{item.CategoryName}</PopoverItem>)
        })

        return(
            <div className="shopPage">
                <NavBar
                    mode="light"
                    icon={<Icon type="ellipsis" />}
                    onLeftClick={this.openSildeBar.bind(this)}
                    rightContent={
                        (
                            <Popover
                                visible={_this.state.PopoverVisible}
                                overlayClassName="fortest"
                                overlayStyle={{ color: 'currentColor' }}
                                overlay={PopoverItemCon}
                                placement="bottomRight"
                                onSelect={this.categoryChange.bind(this)}
                            >
                                <div>{categoryName}<Icon type="down" size="xs" /></div>
                            </Popover>
                        )
                    }
                >积分商城</NavBar>
                <div className="scroll-content">
                    <SearchBar
                        placeholder="搜一搜,找到您心动的礼品!"
                        ref="SearchBar"
                        onSubmit={() => this.getList(true)}
                        cancelText="确认"
                        onCancel={() => this.getList(true)}
                        onClear={()=>setTimeout(this.getList.bind(this,true),0) }
                    />
                    {this.renderList()}
                </div>
                <Modal
                    visible={_this.state.showModal}
                    transparent
                    maskClosable={false}
                    onClose={_this.onCloseModal}
                    title="收货信息!"
                    footer={
                        [
                            {
                                text:"确定",onPress:()=>{
                                    this.validForm();
                                }
                            },
                            { text: '取消', onPress: () => {_this.onCloseModal() } }

                        ]
                    }
                    wrapProps={{ onTouchStart: _this.onWrapTouchStart }}
                >
                    <List className="shopPage">
                        <InputItem
                            placeholder="请填写收货人姓名（必填）"
                            clear
                            ref="username"
                        >
                            <i className="icon icon-user-md"></i>
                        </InputItem>
                        <InputItem
                            placeholder="请填写收货地址（必填）"
                            clear
                            ref="address"
                        >
                            <i className="icon icon-home"></i>
                        </InputItem>
                        <InputItem
                            placeholder="请填写联系电话手机（必填）"
                            clear
                            type="number"
                            ref="phone"
                        >
                            <i className="icon icon-mobile-phone"></i>
                        </InputItem>
                    </List>

                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs:state.remoteSysConfs,
        notices:state.notices,
        sitemsg:state.sitemsg.sitemsgs,
        unread:state.sitemsg.unread,
        noticesUnRead:state.noticesUnRead,
        promoUnRead:state.promotions.promoUnRead,
        promotions:state.promotions.promotions.rows
    }
);

export default connect(mapStateToProps)(ShopPage)