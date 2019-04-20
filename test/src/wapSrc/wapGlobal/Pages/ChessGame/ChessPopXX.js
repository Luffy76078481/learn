import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import "./ChessPop.scss"
import { List, Badge, ListView , Icon} from 'antd-mobile';
import { _dispatch } from "globalAction";
import * as cache from "CacheHelper";

let pageIndex = 0;
let listData=[];
class ChessPopXX extends Component{
    constructor(props){
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
            insideBox:false,
            message:"",
            time:""
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
        let isReadNews = cache.get('isReadNews')?cache.get('isReadNews'):"";
        cache.set('isReadNews',isReadNews+id+',');
    }
    read(item){
        let id = item.Id;
        this.setState({
            insideBox:true,
            message:item.Message,
            time:item.SendTime.slice(0,10)
        })
        new window.actions.ApiReadSiteMsgAction(id).fly(()=>{
            new window.actions.ApiSitemsgUnreadCountAction().fly();
        });
    }
    onEndReached = () => {
        if(!this.state.hasMore || this.state.isLoading)  return false;
        this.setState({ isLoading: true });
        this.getList();
    };

    renderList(){
        const _this = this;
        let isReadNews = cache.get('isReadNews')?cache.get('isReadNews'):"";
        if(this.state.tabLoading){
            return(
                <div className="dataLoading"><i className="icon-spinner icon-spin"></i> 玩命加载中...</div>
            )
        }

        const row = (rowData) => {
            return (
                <li onClick={_this.read.bind(_this,rowData)} className="chesspopliitem"  >
                    {
                        rowData.Status?<span className="Badge"></span>:<span className="Badge">●</span>
                    }
                    <span className="message-content">通知：{rowData.Message}</span>
                    <span className="message-date">{rowData.SendTime.slice(0,10)}&nbsp;&nbsp;&nbsp;></span>
                </li>
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
                pageSize={30}//每次事件循环（每帧）渲染的行数
                scrollRenderAheadDistance={200}//当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
                onEndReached={this.onEndReached.bind(this)}//当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用
                onEndReachedThreshold={100}//调用onEndReached之前的临界值，单位是像素
            />
        )
    }

    getList(){
        let _this = this;
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
    
  

    renderContent(){
        return (
            <div className="chesspopMess">
                <div onClick={()=>{this.setState({insideBox:false})}} style={{"color":"#8e3627"}}><Icon type={'left'} size="lg" color='#8e3627'/></div>
                <p>{this.state.message}</p>
                <p className="chesspopMess-specP">{this.state.time}</p>
            </div>
        )
    }
  
    render(){
        return (
            <div className="chesspop-neibox Message">
                <p className="chesspop-white-titlefont chesspop-head">
                    <span className="chesspop-head-title">信息</span>
                </p>
                <div className="chesspop-botbox chesspop-botbox-allstyle">
                    {
                        this.state.insideBox?
                        this.renderContent()
                        :
                        <ul className="scroll-content">
                            {this.renderList()}
                        </ul>
                    }
                    
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
)
export default connect(mapStateToProps)(ChessPopXX)