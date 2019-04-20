import React, { Component } from 'react';
import {NavBar, Icon, SegmentedControl, PullToRefresh,DatePickerView, List, Modal, Flex, Toast,ListView, Badge} from 'antd-mobile';
import connect from "react-redux/es/connect/connect";
import './HistoryPage.scss';

let pageIndex = 0;
let listData=[];
class HistoryPage extends Component{
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state={
            dataSource: dataSource.cloneWithRows({}),
            hasMore:true,
            isLoading: false,
            tabLoading:false,
            refreshing: false,
            tabsType:0,
            showTimeChoose:false,
            beginValue:new Date(new Date().getTime() - 7*24*60*60*1000),
            endValue:new Date(),
            fromDate:window.Util.getNowDate(-7).slice(0,10),
            toDate:window.Util.getNowDate().slice(0,10)
        }
    }
    componentWillMount(){
        pageIndex=0;
        listData=[];
        Toast.loading('数据加载中,请稍候...');
       this.getData();
    }
    openSildeBar(){
        this.props.params.openSilde()
    }
    onEndReached = () => {
        if(!this.state.hasMore || this.state.isLoading)  return false;
        this.getData();
    };
    getData(){
        let tabsType = this.state.tabsType;
        this.setState({isLoading:true});
        if(tabsType == 0){
            new window.actions.ApiQueryDepositRecordsAction(this.state.fromDate,this.state.toDate,pageIndex,30).fly(resp=>{
                Toast.hide();
                if(resp.StatusCode ==0){
                    pageIndex++;
                    listData=listData.concat(resp.List);
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(listData),
                        hasMore: resp.Count>pageIndex*30,
                        isLoading: false,
                        tabLoading:false,
                    })
                }else{
                    this.setState({isLoading:false});
                }
            });//存款记录
        }else if(tabsType==1){
            new window.actions.ApiQueryTransferRecordsAction(this.state.fromDate,this.state.toDate,"",pageIndex,30).fly(resp=>{
                Toast.hide();
                if(resp.StatusCode ==0){
                    pageIndex++;
                    listData=listData.concat(resp.List);
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(listData),
                        hasMore: resp.Count>pageIndex*30,
                        isLoading: false,
                        tabLoading:false,
                    })
                }else{
                    this.setState({isLoading:false});
                }
            });//转帐记录
        }else if(tabsType==2){
            new window.actions.ApiQueryWithdrawRecordsAction(this.state.fromDate,this.state.toDate,pageIndex,30).fly(resp=>{
                Toast.hide();
                if(resp.StatusCode ==0){
                    pageIndex++;
                    listData=listData.concat(resp.List);
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(listData),
                        hasMore: resp.Count>pageIndex*30,
                        isLoading: false,
                        tabLoading:false,
                    })
                }else{
                    this.setState({isLoading:false});
                }
            });//取款记录
        }else{
            new window.actions.ApiQueryBetRecordsAction(this.state.fromDate,this.state.toDate,"",pageIndex,15).fly(resp=>{
                Toast.hide();
                if(resp.StatusCode ==0){
                    pageIndex++;
                    listData=listData.concat(resp.List);
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(listData),
                        hasMore: resp.Count>pageIndex*30,
                        isLoading: false,
                        tabLoading:false,
                    })
                }else{
                    this.setState({isLoading:false},()=>{
                        this.onEndReached();
                    });
                }
            });//投注记录
        }
    }
    renderList(){
        const _this = this;
        let tabsType = _this.state.tabsType;
        if(this.state.tabLoading){
            return(
                <div className="dataLoading"><i className="icon-spinner icon-spin"></i> 玩命加载中...</div>
            )
        }

        const row = (item) => {
            if(tabsType==0){
                let className= "badg";
                //0：未支付，1：处理中，2：审核中，3：拒绝，4：成功，5：取消
                if(item.Status==1 ||item.Status==3 || item.Status==5 ){
                    className="badg red"
                }else if(item.Status == 4){
                    className="badg blue"
                }
                return (
                    <Flex className="listItem">
                        <div className="itemL">
                            {item.CreateTime.split('T')[0]}<br/>
                            {item.CreateTime.split('T')[1].slice(0,8)}
                        </div>
                        <div className="itemC">
                            <span>{item.TypeText}{item.Amount}</span>
                            <span className="bot">{item.OrderNo}</span>
                        </div>
                        <div className="itemR">
                            <span className={className}>{item.StatusText}</span>
                        </div>
                    </Flex>
                )
            }
            else if(tabsType==1){
                let className= "badg";
                //0：失败，1：成功
                if(item.Status==1){
                    className="badg blue"
                }
                return (
                    <Flex className="listItem" >
                        <div className="itemL">
                            {item.CreateTime.split('T')[0]}<br/>
                            {item.CreateTime.split('T')[1].slice(0,8)}
                        </div>
                        <div className="itemC">
                            <span>平台{item.GameType} {item.TypeText} ￥{item.Amount}</span>
                        </div>
                        <div className="itemR">
                            <span className={className}>{item.StatusText}</span>
                        </div>
                    </Flex>
                )
            }
            else if(tabsType==2){
                let className= "badg";
                //0：未支付，1：处理中，2：审核中，3：拒绝，4：成功，5：取消
                if(item.Status==1 ||item.Status==3 || item.Status==5 ){
                    className="badg red"
                }else if(item.Status == 4){
                    className="badg blue"
                }
                return (
                    <Flex className="listItem" >
                        <div className="itemL">
                            {item.CreateTime.split('T')[0]}<br/>
                            {item.CreateTime.split('T')[1].slice(0,8)}
                        </div>
                        <div className="itemC">
                            <span>提款金额:￥{item.Amount}</span>
                            <span className="bot">{item.OrderNo}</span>
                        </div>
                        <div className="itemR">
                            <span className={className}>{item.StatusText}</span>
                        </div>
                    </Flex>
                )
            }
            else if(tabsType==3){
                if(item.GamePlatform =="总计" ){
                    return (
                        <Flex className="listItem" style={{background:'#ddd',position:'fixed',bottom:'51px',width:'100%'}} >
                            <div className="itemL">
                                {item.GamePlatform}投注:{item.Num}次<br/>
                            </div>
                            <div className="itemC" style={{width:'75%'}}>
                                <span>总投注￥{item.Bet}元,总有效投注￥{item.RealBet}元</span>
                            </div>
                        </Flex>
                    )
                }
                let className= "badg";
                let name="无效"
                //1输 2赢 3和 4无效
                if(item.ResultType==1){
                    className="badg red"
                    name="输"
                }else if(item.ResultType == 2){
                    className="badg blue"
                    name="赢"
                }

                return (
                    <Flex className="listItem" >
                        <div className="itemL">
                            {item.CreateTimeDateText}<br/>
                            {item.CreateTimeTimeText}
                        </div>
                        <div className="itemC">
                            <span>{item.GamePlatform} 投注￥{item.Bet},有效￥{item.RealBet}</span>
                            <span>{item.OrderNumber}</span>
                        </div>
                        <div className="itemR">
                            <span className={className}>{name}</span>
                        </div>
                    </Flex>
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
                initialListSize={16}
                pageSize={30}//每次事件循环（每帧）渲染的行数
                scrollRenderAheadDistance={200}//当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
                onEndReached={this.onEndReached.bind(this)}//当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用
                onEndReachedThreshold={120}//调用onEndReached之前的临界值，单位是像素
            />
        )
    }
    tabChange(val){
        listData=[];
        pageIndex=0;
        Toast.loading('数据加载中,请稍候...')
        this.setState({
            tabLoading:true,
            tabsType:val.key-0
        },()=>{
            this.getData();
        })
    }
    showTimeChoose(){
        this.setState({
            showTimeChoose:true
        })
    }
    hideTimeChoose(){
        this.setState({
            showTimeChoose:false
        })
    }
    onBeginChange(value){
        this.setState({
            beginValue:value
        })
    }
    onEndChange(value){
        this.setState({
            endValue:value
        })
    }
    chooseTime(){
        let beginTime = this.state.beginValue;
        let endTime = this.state.endValue;
        if(beginTime>endTime){
            Modal.alert('结束时间不能小于开始时间','');
            return;
        }
        if(endTime-beginTime> 30*24*60*60*1000){
            Modal.alert('查询时间请小于1个月！','');
            return;
        }
       this.setState({
           fromDate:window.Util.formatTime(beginTime).slice(0,10),
           toDate:window.Util.formatTime(endTime).slice(0,10),
           showTimeChoose:false,
           tabLoading:true
       },()=>{
           pageIndex=0;
           listData=[];
           this.getData();
       })
    }
    render(){
        return(
            <div className="HistoryPage">
                <NavBar
                    mode="light"
                    icon={<Icon type="ellipsis" />}
                    onLeftClick={this.openSildeBar.bind(this)}
                >历史记录</NavBar>
                <SegmentedControl
                    values={
                        [
                            <div className="tabsItem" key={0}>存款记录</div>,
                            <div className="tabsItem" key={1}>转帐记录</div>,
                            <div className="tabsItem" key={2}>提款记录</div>,
                            <div className="tabsItem" key={3}>投注记录</div>,
                        ]
                    }
                    selectedIndex={this.state.tabsType-0}
                    onValueChange={this.tabChange.bind(this)}
                    className="Segmented"
                />
                <div className="timeBtn">
                    <a onClick={this.showTimeChoose.bind(this)}>时间区间 : {this.state.fromDate} ~~ {this.state.toDate}</a>
                </div>
                <div className="scroll-content">
                    {this.renderList()}
                </div>
                {/*<PullToRefresh*/}
                    {/*className="scroll-content"*/}
                    {/*refreshing={this.state.refreshing}*/}
                    {/*onRefresh={()=>{*/}
                        {/*this.setState({ refreshing: true });*/}
                        {/*this.getData()*/}
                    {/*}}*/}
                {/*>*/}
                    {/*<List className="">*/}
                        {/*{*/}
                            {/*this.state.noResult?*/}
                            {/*<div className="noResult">没有更多了^_^</div>*/}
                            {/*:list*/}
                        {/*}*/}
                    {/*</List>*/}
                {/*</PullToRefresh>*/}
                {
                    this.state.showTimeChoose?
                        <div className="timeChoose">
                            <div className="mask" onClick={this.hideTimeChoose.bind(this)}></div>
                            <div className="timeCon">
                                <div className="timeConBtn">
                                    <a className="left" onClick={this.hideTimeChoose.bind(this)}>取消</a>
                                    <a className="right" onClick={this.chooseTime.bind(this)}>确定</a>
                                </div>
                                <div className="sub-title">开始时间</div>
                                <DatePickerView
                                    mode="date"
                                    value={this.state.beginValue}
                                    onChange={this.onBeginChange.bind(this)}
                                />
                                <div className="sub-title">结束时间</div>
                                <DatePickerView
                                    mode="date"
                                    value={this.state.endValue}
                                    onChange={this.onEndChange.bind(this)}
                                />
                            </div>
                        </div>:null
                }

            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        records:state.records
    }
);

export default connect(mapStateToProps)(HistoryPage)