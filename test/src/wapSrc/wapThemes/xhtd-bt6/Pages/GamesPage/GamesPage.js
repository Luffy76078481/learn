import React, { Component } from 'react';
import {ListView, NavBar, Icon, SearchBar, Flex, Modal, Toast, PullToRefresh, Carousel, Drawer} from 'antd-mobile';
import {Link} from 'react-router';
import {config} from "globalConfig";
import connect from "react-redux/es/connect/connect";
let pageIndex = 1;
let filter={};
let listData=[];
class GamesPage extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            open:false,
            refreshing: false,
            showSearch:false,
            selPlatformId:this.props.selPlatformId ,
            dataSource: dataSource.cloneWithRows({}),
            hasMore: false,
            isLoading: true,
            tabLoading:true,
            tabsId:"",
            selfGamesClass:""
        };
    }
    componentWillMount(){
        if(this.props.slot_category.length<=0){
            new window.actions.ApiWapGameCategoriesAction('slot_category').fly();
        }else{
            this.tabsChange(this.props.slot_category[0]);
        }
    }
    componentWillReceiveProps (nextProps){
        if(this.props.selPlatformId !== nextProps.selPlatformId){
            this.setState({
                selPlatformId:nextProps.selPlatformId,
                tabLoading:true,
                selfGamesClass:""
            },()=>{
                Toast.loading('数据搜索中...',300);
                listData=[];
                pageIndex=1;
                filter.GamePlatform = nextProps.selPlatformId;
                this.getList();
            })
        }
        if(this.props.slot_category.length !== nextProps.slot_category.length){
            if(nextProps.slot_category[0]){
                this.tabsChange(nextProps.slot_category[0]);
            }
        }
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
            selfGamesClass:""
        });
        filter.GameMarks = item.MarkIds;
        filter.GamePlatform = this.state.selPlatformId;
        filter.Jackpot = item.Jackpot;
        filter.GameType =4;
        filter.YoPlay ="";
        if(item.ID == "YOPLAY"){
            filter.GameMarks = "";
            filter.GamePlatform = "";
            filter.GameType =4;
            filter.YoPlay =1;
        }else if(item.ID=="more_all"){
            filter.YoPlay ="";
        }
        filter.TerminalType="Mobile";
        this.getList();
    }


    //渲染平台


    selfGames(){
        if(this.state.selfGamesClass==="selfGamesClass") return;
        Toast.loading('数据搜索中...',300);
        listData=[];
        pageIndex=1;
        let _this= this;
        this.setState({
            selfGamesClass:"active",
            tabLoading:true,
            tabsId:""
        });
        new window.actions.ApiGetFavoritesAction().fly(resp=>{
            Toast.hide();
            if(resp.StatusCode ==0){
                listData=resp.List;
                _this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(listData),
                    hasMore:resp.List.length>0,
                    isLoading: false,
                    tabLoading:false
                })
            }
        })
    }
    renderTabs(){
        let tabs=[];
        let _this = this;
        // if(this.props.user.token){
        //     tabs.push(<a key={"tabsCateSelf"} className={"tabsCate "+this.state.selfGamesClass} onClick={_this.selfGames.bind(this)}>我的收藏</a>);
        // }
        this.props.slot_category.forEach((item,index)=>{
            let className ="tabsCate";
            if(index==0 && !_this.state.tabsId  && !_this.state.selfGamesClass){
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
                <div className="listItem" onClick={_this.props.playGame.bind(_this,rowData)} >
                    {favoriteBtn}
                    <img src={config.devImgUrl+rowData.ImageUrl}/>
                    <p>{rowData.Title}</p>
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
                className="myListView"
                renderFooter={renderFooter}
                renderRow={row}
                initialListSize={18}
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
    render(){
        return(
                <div className={"gamesPage"}>
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

export default connect(mapStateToProps)(GamesPage)