import React, { Component } from 'react';
import {Icon,Flex,List,NavBar,Modal,Toast} from "antd-mobile";
import {browserHistory,Link} from "react-router";
import {ApiGamePlatformsBalanceAction,
    ApiTransferAction,ApiGamePlatformBalanceAction,
    ApiPlayerInfoAction,ApiGamePlatformsAction,ApiGamePlatformAllBalanceAction} from "globalAction";
import connect from "react-redux/es/connect/connect";
import "./MoneyManage.scss";

class MoneyManage extends Component{
    constructor(props) {
        super(props);
        this.submitState = true;//防止多次提交
        this.transferAllOutState = true;
        this.state={
            allAmount:this.props.user.amount,
            allLoading:true,
            platformsIdLoading:[]
        }
    }
    componentWillMount(){
        let _this = this;
        new ApiPlayerInfoAction().fly();
        new ApiGamePlatformsAction().fly(resp=>{
            if(resp.StatusCode ==0){
                new ApiGamePlatformAllBalanceAction().fly(resp=>{
                    _this.setState({
                        allLoading:false
                    })
                },new Date());
            }
        })
    }
    reload(platformsId) {
        let _this =this;
        let nowArr = _this.state.platformsIdLoading;
        nowArr.push(platformsId);
        _this.setState({platformsIdLoading:nowArr});
        new ApiPlayerInfoAction().fly();
        new ApiGamePlatformBalanceAction(platformsId).fly(resp=>{
            let newArr = _this.state.platformsIdLoading;//因爲是異步調用所以需要獲取最新的platformsIdLoading；
            newArr = newArr.filter((id) => id != platformsId)
            _this.setState({
                platformsIdLoading:newArr
            })
        },platformsId);
        Toast.hide();
    }
    openSildeBar(){
        this.props.params.openSilde()
    }
    transferIn(platformId,event){//閃入
        event.preventDefault();
        event.stopPropagation();
        let _this =this;
        if(!this.submitState) return;
        let total = parseInt(this.props.user.amount||0);
        if (!total) {
            Modal.alert('您的账户余额不足!');
            return;
        }
        this.submitState = false;
        Toast.loading('转入中,请稍后...',300);

        new ApiTransferAction (platformId,"in", total).fly((resp)=>{
            Toast.hide();
            if (resp.StatusCode === 0) {
                this.reload(platformId);
            }else{
                Modal.alert(resp.Message);
            }
            this.submitState = true;
        }, "transfer_in_" + platformId);
    }
    goToTransferPage(platform){
        window.wapHistoryType.push('money/transfer/'+platform.ID);
    }
    transferAllOut(){//一键转出
        let _this = this;
        if(!this.transferAllOutState) return;
        let transferArr=[];
        for(let i=0; i<this.props.platforms.length;i++){
            let platform = this.props.platforms[i];
            if(platform.Balance && platform.Balance>=1){
                transferArr.push(platform);
            }
        }
        if(transferArr.length == 0) {
            Toast.hide();
            Modal.alert('抱歉!','您的所有平台没有足够的余额可以转出！');
            this.transferAllOutState = true;
            return;
        }else{
            this.transferAllOutState = false;
        }
        Toast.loading('转出中,请稍后...');
        for(let i=0; i<transferArr.length;i++){
            let platform = transferArr[i];
            let index = i+1;
            new ApiTransferAction(platform.ID,"out", parseInt(platform.Balance)).fly((resp)=>{
                if (resp.StatusCode === 0) {

                    _this.reload(platform.ID);
                }
                if( index == transferArr.length){
                    Toast.hide();
                    _this.transferAllOutState = true;
                }
            }, "transfer_" + platform.ID);
        }
    }
    renderList(){
        let list=[];
        let _this =this;
        this.props.platforms.forEach((item,index)=>{
            if(item.ID =="YOPLAY") return false;
            let balanceDom="";
            if(_this.state.allLoading){
                balanceDom = <span className="loading"><i className="icon-spinner icon-spin"></i>余额获取中...</span>;
            }else{
                if(_this.state.platformsIdLoading.join(',').includes(item.ID)){
                    balanceDom = <span className="loading"><i className="icon-spinner icon-spin"></i>余额获取中...</span>;
                }else{
                    balanceDom= (<span>
                            <a onClick={_this.transferIn.bind(this,item.ID)} className="bolt">闪入 <i className="icon icon-bolt"></i></a>
                            <span className={item.Balance>0?"has balance":"balance"}>￥{item.Balance?item.Balance:0}</span>
                       </span>
                        )
                }
            }
            let rightBtn=(
                <div>
                    {balanceDom}
                </div>
            )
            list.push(
                <List.Item key={index}
                           className="listItem"
                           arrow="horizontal"
                           extra={rightBtn}
                           onClick={this.goToTransferPage.bind(this,item)}
                >
                    {item.Name}
                </List.Item>
            )
        });
        return list;
    }
    render(){

        return(
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="ellipsis" />}
                    onLeftClick={this.openSildeBar.bind(this)}
                >资金管理</NavBar>
                <div className="scroll-content MoneyManage">
                    <div className="profile">
                        <Flex>
                            <Flex.Item>
                                <div className="finance-logo"></div>
                                <div className="userLevel">{this.props.user.userLevelName}</div>
                                <div className="username">{this.props.user.username}</div>
                            </Flex.Item>
                        </Flex>
                        <Flex className="userCash">
                            <Flex.Item>
                                <i className="icon icon-credit-card"></i>
                                <div className="itemR">
                                    <span className="title">主账户余额</span>
                                    <span>{this.props.user.amount}<em> RMB</em></span>
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <i className="icon icon-money"></i>
                                <div className="itemR">
                                    <span className="title">总财富</span>
                                    <span>{this.props.user.userBalance}<em> RMB</em></span>
                                </div>
                            </Flex.Item>
                        </Flex>
                    </div>
                    <div className="cashBtn">
                        <Link to="money/deposit"><i className="icon icon-signin"></i>存款</Link>
                        <Link to="money/withdraw" className="withdrawBtn"><i className="icon icon-signout"></i>提款</Link>
                    </div>
                    <List className="list">
                        <div className="title">
                            游戏余额
                            <a onClick={this.transferAllOut.bind(this)}><i className="icon icon-bolt"></i>一键转出</a>
                        </div>
                        {this.renderList()}
                    </List>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
        platforms:state.game.platforms,
    }
);

export default connect(mapStateToProps)(MoneyManage)