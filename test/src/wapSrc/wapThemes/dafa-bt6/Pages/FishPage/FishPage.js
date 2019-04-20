import React, { Component } from 'react';
import {ListView, NavBar, Icon, SearchBar, Flex, Modal, Toast, PullToRefresh, Carousel, Drawer} from 'antd-mobile';
import {config} from "globalConfig";
import connect from "react-redux/es/connect/connect";
let pageIndex = 1;
 let filter={TerminalType:'Mobile'};//捕鱼
let listData=[];
class FishPage extends Component {
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
        };
    }
    componentWillMount(){
        this.getList();
    }
    onEndReached = () => {
        if (!this.state.isLoading && !this.state.hasMore) {
            return false;
        }
        this.setState({ isLoading: true });
        this.getList();
    };
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


    getList(flag){
        let _this = this;
        let gameName = this.refs.SearchBar?this.refs.SearchBar.state.value.replaceAll(' ','') : "";

        if(flag){//如果是搜索
            Toast.loading('数据搜索中...',300);
            filter.GameName = gameName;
            listData=[];
            pageIndex=1;
        }
        new window.actions.ApiQueryAgGamesAction(filter,pageIndex,20).fly(resp=>{
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
        },'sport')
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
                    <h5>{rowData.Title}</h5>
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
        let banner = this.renderBanner();
        return(
                <div className={"gamesPage"}>

                    {/*banner*/}
                    <Carousel autoplay={true} infinite>
                        {banner}
                    </Carousel>
                    {/*游戏分类和搜索*/}
                    {/*<div className={"tabs"}>*/}
                        {/*<SearchBar*/}
                            {/*placeholder="搜一搜，海量赚钱游戏"*/}
                            {/*ref="SearchBar"*/}
                            {/*onSubmit={() => this.getList(true)}*/}
                            {/*cancelText="取消"*/}
                            {/*onClear={()=>setTimeout(this.getList.bind(this,true),0) }*/}
                        {/*/>*/}
                    {/*</div>*/}
                    <div className={"singleList"}>
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
    }
);

export default connect(mapStateToProps)(FishPage)