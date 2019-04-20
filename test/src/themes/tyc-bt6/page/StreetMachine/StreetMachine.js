import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    List, Spin, BackTop,Icon,Modal,Button
} from 'antd';
import './StreetMachine.scss'
import {config} from "globalConfig";
import { Scrollbars } from 'react-custom-scrollbars';
import InfiniteScroll from "react-infinite-scroller";
let pageIndex=1;
class StreetMachine extends Component{
    constructor(props){
        super(props)
        this.state = {
            selCategoryId: "",
            selPlatformId: "KY",
            data:[],
            hasMore:true,
            loading:true,
            visible:false,
            gameObj:{}
        };
    }
    componentDidMount(){
        this.toPage(1);
    }
    toPage(pageNo = 1) {
        let filter ={};
        let _this =this;
        let gameType = this.state.selPlatformId;
        const pgsize =30;
        filter.GameMarks = [];
        if(gameType == "YOPLAY"){
            filter.GamePlatform = "";
            filter.YoPlay =1;//是否街机游戏
        }else{
            filter.GamePlatform = gameType;
            filter.YoPlay = "";//是否街机游戏
        }
        filter.GameType = 4;
        new window.actions.ApiQueryGamesAction(filter, pageNo , pgsize).fly(resp=>{
            if(resp.StatusCode ==0){
                let data = _this.state.data;
                data = data.concat(resp.Page);
                _this.setState({
                    data,
                    loading:false,
                    hasMore: pageNo*pgsize<resp.TotalRecord
                })
                pageIndex++;
            }
        },'StreetMachine_'+filter.GamePlatform);
    }
    handleInfiniteOnLoad = () => {
        this.setState({
            loading: true,
        });
        if (!this.state.hasMore) {
            this.setState({
                loading: false,
            });
            return;
        }
        this.toPage(pageIndex)
    }
    onClickGame(game) {
        if (!window.actions.auth()) {
            return;
        }
        let parma = {
            GamePlatform:game.GamePlatform,
            GameType:game.GameTypeText,
            GameId:game.GameIdentify,
            IsMobile:false,
            IsDemo:false,
            YoPlay: 1
        }
        let windowOpen = window.Util.windowOpen('StreetGame');
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    change1(){
        this.setState({data:[],loading:true,selPlatformId:"KY"},()=>{
            pageIndex=1;
            this.toPage(pageIndex);
        })

    }
    change2(){
        this.setState({data:[],loading:true,selPlatformId:"YOPLAY"},()=>{
            pageIndex=1;
            this.toPage(pageIndex);
        })
    }
    showRemark(gameObj){
        this.setState({
            gameObj,
            visible:true
        })
    }
    renderItem=(item)=>{
        return (
            <List.Item key={item.id}>
                <div className="game-list-item animated" style={{animationName: "flipInX"}}>
                    <div className="itemImg" onClick={this.onClickGame.bind(this, item)}>
                        <div className="gifBg">
                            <img className="gameImg" src={config.prdImgUrl+item.ImageUrl} />
                        </div>
                    </div>
                    <p className="game-title">
                        <Icon type="question-circle" onClick={this.showRemark.bind(this,item)} />
                        <a  onClick={this.onClickGame.bind(this, item)}>开始游戏</a>
                    </p>
                </div>
            </List.Item>
        );
    }
    render(){
        const ImageGallery = window.r.get("ImageGallery");
        return(
            <div className="streetMachine">
                <ImageGallery width="100%" height="360px" type="jieji_banner_imgs" class="game_list_top_img" imgtype='slider'></ImageGallery>
                <div className="game-list">
                    {/*<div className='gameTabs'>*/}
                        {/*<a className={"KY" === this.state.selPlatformId ? "active " : ""} onClick={this.change1.bind(this)}>KY棋牌</a>*/}
                        {/*<a className={"KY" !== this.state.selPlatformId ? "active " : ""} onClick={this.change2.bind(this)}>Yoplay</a>*/}
                    {/*</div>*/}
                    <div className="list-items">
                        <InfiniteScroll
                            initialLoad={false}
                            pageStart={0}
                            loadMore={this.handleInfiniteOnLoad}
                            hasMore={!this.state.loading && this.state.hasMore}
                        >
                            <List
                                dataSource={this.state.data}
                                grid={{ gutter:16, column: 6 }}
                                renderItem={this.renderItem}
                            >
                                {this.state.loading  && (
                                    <div className="loading-container">
                                        <Spin wrapperClassName="loadText" tip="拼命加载中..."/>
                                    </div>
                                )}
                                {!this.state.hasMore && (
                                    <div className="noMore">
                                        我已经到底了,没有更多数据了!￥_￥~
                                    </div>
                                )}
                            </List>
                        </InfiniteScroll>
                    </div>
                </div>
                {/*游戏介绍*/}
                {this.state.gameObj.Title &&
                    <Modal
                        className="streetMachineModal"
                        title={this.state.gameObj.Title+'游戏介绍'}
                        maskClosable={true}
                        visible={this.state.visible}
                        onCancel={()=> this.setState({visible:false})}
                        footer={false}
                        centered={true}
                    >
                        <Scrollbars style={{height:200}}>
                            <div className="con" dangerouslySetInnerHTML={{__html:this.state.gameObj.Remark}}></div>
                        </Scrollbars>
                        <div style={{textAlign:'center'}}>
                            <img src={require('./images/btn.png')} onClick={this.onClickGame.bind(this,this.state.gameObj)} />
                        </div>
                    </Modal>
                }
                {/*回到顶部*/}
                <BackTop></BackTop>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        StreetGames:state.game.StreetGames,
    }
);

export default connect(mapStateToProps,{})(StreetMachine);
