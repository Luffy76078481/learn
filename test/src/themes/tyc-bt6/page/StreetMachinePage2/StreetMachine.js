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
            selPlatformId: "TM",
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
        this.setState({data:[],loading:true,selPlatformId:"TM"},()=>{
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
    onClickIntoRoomId(){
        let IntoRoomId = this.refs.IntoRoomIdsVlaue.value;
        let parma = {
            GamePlatform:this.state.intoGamePlatform,
            GameType:this.state.intoGameTypeText,
            GameId:"2$"+IntoRoomId,
            IsMobile:false,
            IsDemo:false,
            YoPlay: 1
        }
        if(IntoRoomId==""){
            window.swal({
                title: "请填写房间号",
                text: "",
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            return false;
        }else if(IntoRoomId.length<6){
            window.swal({
                title: "房间号不能小于6位",
                text: "",
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            return false;
        }
        let windowOpen = window.Util.windowOpen('StreetGame');
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
                window.$(this.refs.dlg).modal("hide");
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    onClickIntoRoom(game){
        if (!window.actions.auth()) {
            return;
        }
        window.$("#IntoRoom").modal("show");
        this.setState({
            intoGamePlatform:game.GamePlatform,
            intoGameTypeText:game.GameTypeText
        })
    }
    close(){
        this.setState({
            errorPassword : false
        })
    }
    renderItem=(item)=>{
        return (
            <List.Item key={item.id}>
                <div className="game-list-item animated" style={{animationName: "flipInX"}}>
                    <div className="itemImg" onClick={item.GameIdentify.indexOf("2$X")!=-1?this.onClickIntoRoom.bind(this,item):this.onClickGame.bind(this, item)}>
                        <div className="gifBg">
                            <img className="gameImg" src={config.prdImgUrl+item.ImageUrl} />
                        </div>
                    </div>
                    <p className="game-title">
                        <Icon type="question-circle" onClick={ this.showRemark.bind(this,item)} />
                        {
                            item.GameIdentify.indexOf("2$X")!=-1?
                            <a onClick={this.onClickIntoRoom.bind(this,item)}>进入房间</a>: 
                            <a  onClick={this.onClickGame.bind(this, item)}>开始游戏</a>
                         }
                        
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
                            <img src={require('../StreetMachine/images/btn.png')} onClick={this.onClickGame.bind(this,this.state.gameObj)} />
                        </div>
                    </Modal>
                }
                {/*回到顶部*/}
                <BackTop></BackTop>

                 {/* 进入房间弹窗 */}
                    <div ref="dlg" id="IntoRoom" className="modal fade" role="dialog">
                          <div className="modal-dialog login">
                              <div className="modal-content custom_modal_content">
                                  <div className="modal-header regis-head BGcolor-second border-type">
                                      <button type="button" className="close" data-dismiss="modal" onClick={()=>{this.close()}}><i className="fa fa-times"></i></button>
                                      <h4 className="modal-title color-second">   加入房间 </h4>
                                  </div>
                                  <div className="modal-body fast_booking_content regis-body BGcolor-main border-type" style={{height:"auto"}}>
                                          <div className="row">
                                              <div className="col-xs-12 col-md-12 input-marg">
                                                  <input ref="IntoRoomIdsVlaue" type="number" maxLength="6" placeholder="请输入6位房间密码" className="border-type BGcolor-main color-main"/>
                                              </div>
                                              <div className="col-xs-6 col-md-6 regisbox">
                                                  <button type="button" className="regisbtn" onClick={this.onClickIntoRoomId.bind(this)} >确定</button>
                                              </div>
                                          </div>

                                  </div>
                              </div>
                          </div>
                      </div>  
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
