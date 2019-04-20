import React, { Component } from 'react';
import {ListView, NavBar, Icon, SearchBar, Flex, Modal, Toast, PullToRefresh, Carousel, Drawer} from 'antd-mobile';
import {config} from "globalConfig";
import {wapLogin,isShowDownApp} from 'globalAction';
import connect from "react-redux/es/connect/connect";
let pageIndex = 1;
let filter={};
let listData=[];
let categoryArr=[
    {
        ID:"KY",
        Jackpot:-1,
        GameType:"4",
        Name:"KY棋牌",
        PlatformIds:"KY"
    },
    {
        ID:"TM",
        Name:"TM棋牌",
        Jackpot:-1,
        GameType:"4",
        PlatformIds:"TM"
    },
]
class StreetMachinePage extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            refreshing: false,
            showSearch:false,
            dataSource: dataSource.cloneWithRows({}),
            hasMore: false,
            isLoading: true,
            tabLoading:true,
            IntoRoomShow:false,
        };
    }
    componentWillMount(){
       this.tabsChange(categoryArr[0]);
    }
    onEndReached = () => {
        if (!this.state.isLoading && !this.state.hasMore) {
            return false;
        }
        this.setState({ isLoading: true });
        this.getList();
    };
    tabsChange(item){
        if(item.ID === this.state.tabsId) return;
        Toast.loading('数据搜索中...',300);
        listData=[];
        pageIndex=1;
        this.setState({
            tabsId:item.ID,
            tabLoading:true,
        });
        filter.GameMarks = item.MarkIds;
        filter.GamePlatform = item.PlatformIds;
        filter.Jackpot = item.Jackpot;
        filter.GameType =item.GameType;
        filter.YoPlay ="";
        if(item.ID == "YOPLAY"){
            filter.GameMarks = "";
            filter.GamePlatform = "";
            filter.GameType =4;
            filter.YoPlay =1;
        }
        filter.TerminalType="Mobile";
        this.getList();
    }
    //Banner渲染
    renderBanner(){
        let banner=[];
        this.props.wapAdsList.forEach((img,index)=>(
            banner.push(
                <a
                    key={img.Id}
                    onClick={this.openBanner.bind(this,img.Link)}
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                    <img
                        key={index}
                        src={config.devImgUrl+img.ImgUrl}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                        }}
                    />
                </a>
            )
        ))
        return banner;
    }
    openBanner(link){
        if(!link) return;
        if(config.isApp){
            window.Util.appOpen(link)
        }else{
            window.open(link,'_blank');
        }
    }


    renderTabs(){
        let tabs=[];
        let _this = this;
        categoryArr.forEach((item,index)=>{
            let className ="tabsCate";
            if(index==0 && !_this.state.tabsId){
                className="tabsCate active";

            }else{
                className = _this.state.tabsId==item.ID?"tabsCate active":"tabsCate"
            }

            tabs.push(
                <a key={index} className={className} onClick={this.tabsChange.bind(this,item)}>
                    {item.Name}
                </a>
            )
        })

        return tabs;
    }


    getList(flag){
        let _this = this;
        let gameName = this.refs.SearchBar?this.refs.SearchBar.state.value.replaceAll(' ','') : "";

        if(flag){//如果是搜索
            Toast.loading('数据搜索中...',300);
            filter.GameName = gameName;
            listData=[];
            pageIndex=1;
        }
        new window.actions.ApiQueryGamesAction(filter,pageIndex,20).fly(resp=>{
            Toast.hide();
            if(resp.StatusCode ==0){
                listData=listData.concat(resp.Page);
                _this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(listData),
                    hasMore: resp.TotalPages>pageIndex,
                    isLoading: false,
                    tabLoading:false
                })
                pageIndex++;
            }
        })
    }
    renderList(){
        const _this = this;
        if(this.state.tabLoading){
            return(
                <div className="dataLoading"><i className="icon-spinner icon-spin"></i> 玩命加载中...</div>
            )
        }
        let favoritesIds = this.props.user.favoritesIds ||"";
        const row = (rowData) => {
            let favoriteBtn;
            if(favoritesIds.indexOf(rowData.Id)>-1){
                favoriteBtn=(
                    <div onClick={this.props.gameRemoveFavorite.bind(this,rowData)} className="gameInfo removeFavorite">
                        <i className="icon icon-star"></i>
                    </div>
                )
            }else{
                favoriteBtn=(
                    <div onClick={this.props.gameAddFavorite.bind(this,rowData)} className="gameInfo">
                        <i className="icon icon-star-empty"></i>
                    </div>
                )
            }
            return (
                <div className="listItem" onClick={ rowData.GameIdentify.indexOf("2$X")!=-1?_this.IntoRoom.bind(_this,rowData): _this.props.playGame.bind(_this,rowData)} >
                    {favoriteBtn}
                    <img src={config.devImgUrl+rowData.ImageUrl}/>
                </div>
            );
        };
        const renderFooter = ()=>{
            let con;
            if(_this.state.isLoading){
                con=(<div className="dataLoading"><i className="icon-spinner icon-spin"></i> 玩命加载中...</div>)
            }else if(!_this.state.hasMore){
                con=(<div style={{textAlign:'center',lineHeight:'2rem'}}>我没有更多数据了! (ㄒoㄒ)~</div>)
            }
            return con;
        };
        return(
            <ListView
                dataSource={_this.state.dataSource}
                className="myListView streetMachine"
                renderFooter={renderFooter}
                renderRow={row}
                pageSize={20}//每次事件循环
                useBodyScroll={true}
                scrollRenderAheadDistance={400}//当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
                onEndReached={this.onEndReached.bind(this)}//当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用
                onEndReachedThreshold={100}//调用onEndReached之前的临界值，单位是像素
            />
        )
    }
    showSearch(){
        this.setState({
            showSearch:true
        },()=>{
            this.refs.SearchBar.focus();
        });

    }
    IntoRoomCancel(){
        this.setState({
            IntoRoomShow:false,
           })
    }
    IntoRoom(game){
        if(!wapLogin(true)) return false;;
       this.setState({
        IntoRoomShow:true,
        IntoRoomGamePlatform:game.GamePlatform,
        IntoRoomGameTypeText:game.GameTypeText
       })
    }
    onGetIntoRoom(TransferFlag=false){
        let RoomId = this.refs.IntoRoomId.value;
        if(RoomId==""){
            Toast.info('请填写房间号');
            return false;
        }else if(RoomId.length<6){
            Toast.info('房间号不能低于六位');
            return false;
        }
        let parma = {
            GamePlatform:this.state.IntoRoomGamePlatform,
            GameType:this.state.IntoRoomGameTypeText,
            GameId:"2$"+RoomId,
            IsMobile:true,
            IsDemo:false,
        }
        Toast.loading('游戏地址获取中...',300);
        let windowOpen;
        if(!config.isApp){
            windowOpen = window.Util.windowOpen('Game');
        }
        new window.actions.ApiGetLoginUrl(parma,'(mobile)',TransferFlag).fly(res=>{
            Toast.hide();
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                if(TransferFlag){
                    new window.actions.ApiPlayerInfoAction().fly();
                    new window.actions.ApiGamePlatformAllBalanceAction().fly();
                }
                if(!config.isApp){
                    windowOpen.location.href= gameLink;
                    this.setState({
                        IntoRoomShow:false,
                       })
                }else{
                    window.Util.appOpen(gameLink);
                    this.setState({
                        IntoRoomShow:false,
                       })
                }
            }
            else{
                if(!config.isApp){
                    windowOpen.urlError(res.Message);
                }else{
                    Modal.alert(res.Message)
                }
            }
        })
    }
    render(){
        let _this = this;
        let banner = this.renderBanner();

        return(
                <div className={"gamesPage"}>
                    {/*banner*/}
                    <Carousel autoplay={true} infinite>
                        {banner}
                    </Carousel>
                    {/*游戏分类和搜索*/}
                    <div className={"tabs"}>
                        {
                            !this.state.showSearch&&
                            <div>
                                <div className={"search"}>
                                   <Icon onClick={this.showSearch.bind(this)} type={"search"} />
                                </div>
                                <div className="tabsList">
                                    {this.renderTabs()}
                                </div>
                            </div>
                        }
                        {
                            this.state.showSearch&&
                            <SearchBar
                                placeholder="搜一搜，海量赚钱游戏"
                                ref="SearchBar"
                                onSubmit={() => this.getList(true)}
                                onBlur={()=>{this.setState({showSearch:false})}}
                                cancelText="取消"
                                onCancel={() => this.setState({showSearch:false})}
                                onClear={()=>setTimeout(this.getList.bind(this,true),0) }
                            />
                        }
                    </div>
                    <div className={"gamelist"}>
                        {this.renderList()}
                    </div>

                     {/* 加入棋牌房间 */}
                {
                      <Modal title="加入房间"
                      transparent
                      visible={this.state.IntoRoomShow}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      footer={[
                        { text: '取消', onPress: () => {
                            _this.IntoRoomCancel();
                        }},
                        { text: '确定', onPress: () => {
                            _this.onGetIntoRoom();
                       }}
                      ]}
                      >
                        <input ref="IntoRoomId" className="IntoRoomClass" style={{"paddingLeft":"5px"}} type="number" maxLength="6" placeholder="请输入6位房间密码"  /><br/>
                      </Modal>
                }
                </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
        wapAdsList:state.wapAdsList,
        slot_platforms:state.game.slot_platforms,
        slot_category:state.wapCategores.slot_category//老虎机的分类
    }
);

export default connect(mapStateToProps)(StreetMachinePage)