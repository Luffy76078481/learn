import React, { Component } from 'react';
import {NavBar, Icon, SegmentedControl, List, Badge, Toast,ListView} from 'antd-mobile';
import { _dispatch } from "globalAction";
import {browserHistory} from 'react-router';
import connect from "react-redux/es/connect/connect";
import * as cache from "CacheHelper";
import './MyMessage.scss';
import {Flex} from "antd-mobile/lib/flex";

let pageIndex = 0;
let listData=[];
class MyMessage extends Component{
    constructor(props) {
        super(props);
        this.tabsChangeState = false;
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state={
            tabLoading: false,
            dataSource: dataSource.cloneWithRows({}),
            isLoading: false,
            hasMore: true,
            down: true,
            tabsType: this.props.params.messageType === undefined ? 0 : parseInt(this.props.params.messageType)
        }
    }
    componentWillMount(){
        let _this = this;
        pageIndex=0;
        listData=[];
        this.getList();
        // if(this.props.sitemsg.rows.length==0){
        //     new window.actions.ApiQuerySitemsgsAction().fly(resp=>{
        //         if(resp.StatusCode ==0){
        //             listData=listData.concat(resp.List);
        //             _this.setState({
        //                 dataSource: this.state.dataSource.cloneWithRows(listData),
        //                 hasMore: resp.Count>pageIndex*20,
        //                 isLoading: false,
        //                 tabLoading:false,
        //             });
        //         }
        //     });
        // }
    }
    openSildeBar(){
        this.props.params.openSilde()
    }
    readNew(id){
        let tabsType = this.state.tabsType;
        let isReadNews = cache.get('isReadNews')?cache.get('isReadNews'):"";
        cache.set('isReadNews',isReadNews+id+',');
        _dispatch({type:"changeReadNewsNum",tabsType:tabsType});

        window.wapHistoryType.push('/read/'+this.state.tabsType+'&'+id+'&message')
    }
    read(item){
        let id = item.Id;
        let message = item.Message;
        new window.actions.ApiReadSiteMsgAction(id).fly(()=>{
            new window.actions.ApiSitemsgUnreadCountAction().fly();
        });
        window.wapHistoryType.push('/read/'+this.state.tabsType+'&'+id+'&message')
    }
    onEndReached = () => {
        if(!this.state.hasMore || this.state.isLoading)  return false;
        this.setState({ isLoading: true });
        this.getList();
    };
    getList(){
        let _this = this;
        let tabsType = _this.state.tabsType;
        // Toast.loading('数据加载中,请稍后...',300);
        if(tabsType==0){
            new window.actions.ApiQueryPromotionsAction(pageIndex,30).fly(resp=>{
                // Toast.hide();
                this.tabsChangeState=true;
                if(resp.StatusCode ==0){
                    pageIndex++;
                    listData=listData.concat(resp.List);
                    _this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(listData),
                        hasMore: resp.Count>pageIndex*30,
                        isLoading: false,
                        tabLoading:false
                    });
                }
            })
        }else if(tabsType == 1) {
            listData=this.props.notices;
            this.tabsChangeState=true;
            // Toast.hide();
            _this.setState({
                dataSource: this.state.dataSource.cloneWithRows(listData),
                hasMore:false,
                isLoading: false,
                tabLoading:false
            });
        }else if(tabsType==2){
            new window.actions.ApiQuerySitemsgsAction("","",pageIndex,30).fly(resp=>{
                // Toast.hide();
                this.tabsChangeState=true;
                if(resp.StatusCode ==0){
                    pageIndex++;
                    listData=listData.concat(resp.List);

                    _this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(listData),
                        hasMore: resp.Count>pageIndex*30,
                        isLoading: false,
                        tabLoading:false
                    });
                }
            });
        }

    }
    tabChange(val){
        this.tabsChangeState=false;
        listData=[];
        pageIndex=0;
        this.setState({
            tabsType:val.key-0,
            tabLoading:true,
        },()=>{
            this.getList();
        })
    }
    renderList(){
        const _this = this;
        let isReadNews = cache.get('isReadNews')?cache.get('isReadNews'):"";
        if(this.state.tabLoading){
            return(
                <div className="dataLoading"><i className="icon-spinner icon-spin"></i> 玩命加载中...</div>
            )
        }

        const row = (rowData) => {
            if(this.state.tabsType==0){
                return (
                    <List.Item  onClick={_this.readNew.bind(_this,rowData.Id)} className="listItem"  >
                        <img className="promoImg" src={rowData.Img} />
                        {
                            isReadNews.indexOf(rowData.Id+',')>-1?"":<Badge text="新" hot className="Badge"/>
                        }
                        {rowData.Title}<small className="time">{rowData.StartTime.slice(0,10)}</small>
                    </List.Item>
                )
            }else if(this.state.tabsType==1){
                return (
                    <List.Item onClick={_this.readNew.bind(_this,rowData.Id)} className="listItem" arrow="horizontal" extra={rowData.CreateTime.slice(0,10)} >
                        {
                            isReadNews.indexOf(rowData.Id+',')>-1?"":<Badge text="新" hot className="Badge"/>
                        }
                        {rowData.Title}
                    </List.Item>
                )
            }else if(this.state.tabsType==2){
                return (
                    <List.Item onClick={_this.read.bind(_this,rowData)} className="listItem" arrow="horizontal" extra={rowData.SendTime.slice(0,10)} >
                        {
                            rowData.Status?"":<Badge text="新" hot className="Badge"/>
                        }
                        {rowData.Message}
                    </List.Item>
                )
            }
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
                pageSize={30}//每次事件循环（每帧）渲染的行数
                scrollRenderAheadDistance={200}//当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
                onEndReached={this.onEndReached.bind(this)}//当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用
                onEndReachedThreshold={100}//调用onEndReached之前的临界值，单位是像素
            />
        )
    }
    render(){
        return(
            <div className="MyMessage">
                <NavBar
                    mode="light"
                    icon={<Icon type="ellipsis" />}
                    onLeftClick={this.openSildeBar.bind(this)}
                >{
                    parseInt(this.state.tabsType) === 0 ? "优惠活动" : "我的消息"
                }</NavBar>
                <div className="SegmentedCon" >
                    <SegmentedControl
                        values={
                            [
                                <div className="tabsItem" key={0}>活动推广<Badge  text={this.props.promoUnRead}/></div>,
                                <div className="tabsItem" key={1}>平台公告<Badge text={this.props.noticesUnRead}/></div>,
                                <div className="tabsItem" key={2}>站内信<Badge text={this.props.unread}/></div>
                            ]
                        }
                        disabled={!this.tabsChangeState}
                        selectedIndex={this.state.tabsType-0}
                        onValueChange={this.tabChange.bind(this)}
                        className="Segmented"
                    />
                </div>
                <div className="scroll-content">
                    {this.renderList()}
                </div>
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

export default connect(mapStateToProps)(MyMessage)