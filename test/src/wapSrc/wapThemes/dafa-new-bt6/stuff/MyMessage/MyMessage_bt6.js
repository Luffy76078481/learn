import React, { Component } from 'react';
import {NavBar, Icon, SegmentedControl, List, Badge, Toast,ListView} from 'antd-mobile';
import { _dispatch } from "globalAction";
import {browserHistory, Link} from 'react-router';
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
            tabLoading:false,
            dataSource: dataSource.cloneWithRows({}),
            isLoading: false,
            hasMore:true,
            down: true,
            titleName:location.pathname.indexOf("message_notice")>-1?"平台公告":"站内信",
            tabsType:location.pathname.indexOf("message_notice")>-1?1:2,
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
    readNew(id){
        let tabsType = this.state.tabsType;
        let isReadNews = cache.get('isReadNews')?cache.get('isReadNews'):"";
        cache.set('isReadNews',isReadNews+id+',');
        _dispatch({type:"changeReadNewsNum",tabsType:tabsType});

        browserHistory.push('/read/'+this.state.tabsType+'&'+id+'&goBack')
    }
    read(item){
        let id = item.Id;
        let message = item.Message;
        new window.actions.ApiReadSiteMsgAction(id).fly(()=>{
            new window.actions.ApiSitemsgUnreadCountAction().fly();
        });
        browserHistory.push('/read/'+this.state.tabsType+'&'+id+'&goBack')
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
        if(tabsType == 1) {
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
    renderList(){
        const _this = this;
        let isReadNews = cache.get('isReadNews')?cache.get('isReadNews'):"";
        if(this.state.tabLoading){
            return(
                <div className="dataLoading"><i className="icon-spinner icon-spin"></i> 玩命加载中...</div>
            )
        }

        const row = (rowData) => {
            if(this.state.tabsType==1){
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
            <div className="MyMessage noTabs">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>{
                        browserHistory.goBack();
                    }}
                >{this.state.titleName}</NavBar>
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