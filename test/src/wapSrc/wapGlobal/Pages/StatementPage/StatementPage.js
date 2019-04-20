import React, { Component } from 'react';
import {NavBar, Icon, List, Switch,Toast,Modal} from 'antd-mobile';
import {ApiQueryLeaderboardDataAction,ApiQueryLeaderboardDefineAction} from 'globalAction';
import {config} from 'globalConfig';
import {browserHistory,Link} from 'react-router';
import connect from "react-redux/es/connect/connect";
import './StatementPage.scss'
class StatementPage extends Component{
    constructor(props) {
        super(props);
        this.state={
            tabs:0,
            ranking:[],
            rankingHistory:[],
            peridos:[],
        }
    }
    serviceOpen(){
        if(config.isApp){
            window.Util.appOpen(this.props.remoteSysConfs.online_service_link)
        }else{
            window.open(this.props.remoteSysConfs.online_service_link,'_blank');
        }
    }
    componentWillMount(){
        this.getRanking();
        this.getPeridos();
    }
    getRanking(queryId=0,type="now"){
        let that = this;
        Toast.loading('数据加载中,请稍候...')
        new ApiQueryLeaderboardDataAction(queryId,Math.random()).fly(resp=>{
            Toast.hide();
            if(resp.StatusCode==0){
                if(queryId==0){
                    that.setState({ranking:resp.Data,rankingHistory:resp.Data});
                }else{
                    that.setState({
                        rankingHistory:resp.Data
                    })
                }
            }
        },type)
    }
    getPeridos(){
        let that = this;
        new ApiQueryLeaderboardDefineAction(Math.random()).fly(resp=>{
            if(resp.StatusCode==0){
                that.setState({peridos:resp.Data});
                if(resp.Data.length>1){
                    that.getRanking(resp.Data[1].Id,'time');
                }
            }
        })
    }
    changeTab(tab){
        this.setState({
            tabs:tab
        })
    }
    renderSelect(){
        return this.state.peridos.map((data,index)=>{
             let time = data.StartTime.slice(0,10)+" 12:00 ~ "+data.EndTime.slice(0,10)+" 12:00";
            return  <option selected={index==1?"selected":""} key={data.Id} value ={data.Id}>{time}</option>
        })
    }
    histroyChange(e){
        var val = e.target.value;
        this.getRanking(val);
    }
    renderRankingTable(){
        return this.state.ranking.map((data)=>{
            let UserName = data.UserName;
            let realUserName = UserName.substr(0, 1) + '****' + UserName.substr(5, UserName.split('').length);
            return (
                <tr key={data.Ranked} className="spec-border">
                    <td  style={{width:'30px'}}>{data.RankedName}</td>
                    <td>{realUserName}</td>
                    <td>{data.RealBet}</td>
                    <td>{data.Reward}</td>
                </tr>
            )
        })
    }
    renderRankingHistoryTable(){
        return this.state.rankingHistory.map((data)=>{
            let UserName = data.UserName;
            let realUserName = UserName.substr(0, 1) + '****' + UserName.substr(5, UserName.split('').length);
            return (
                <tr key={data.Ranked+'history'} className="spec-border">
                    <td style={{width:'30px'}}>{data.RankedName}</td>
                    <td>{realUserName}</td>
                    <td>{data.RealBet}</td>
                    <td>{data.Reward}</td>
                </tr>
            )
        })
    }
    render(){
        return(
            <div className="StatementPage">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.goBack()}
                >寻找流水王</NavBar>
                <div className="scroll-content">
                    <div className="content-img">
                        <ul className="pronhy" id="tabs01">
                            <li className={this.state.tabs==0?"current":""}  onClick={this.changeTab.bind(this,0)}><a className="an1"></a></li>
                            <li className={this.state.tabs==1?"current":""} id="histrouty-name" onClick={this.changeTab.bind(this,1)}><a  className="an2" ></a></li>
                            <li className={this.state.tabs==2?"current":""} onClick={this.changeTab.bind(this,2)}><a className="an3" ></a></li>
                        </ul>
                        <ul id="container01">
                            <li style={{display:this.state.tabs==0?"block":'none'}}>
                                <h3>即时排行榜</h3>
                                <table >
                                    <thead>
                                    <tr>
                                        <td>名次</td>
                                        <td>账号</td>
                                        <td>有效投注</td>
                                        <td>奖金</td>
                                    </tr>
                                    </thead>
                                    <tbody id="leader-name">
                                    {this.renderRankingTable()}
                                    </tbody>
                                </table>
                            </li>
                            <li style={{display:this.state.tabs==1?"block":'none'}}>
                                <h3>历史获奖名单</h3>
                                <div className="hisorty-name">
                                    <span>活动时间</span>
                                    <select id="TimeList" onChange={this.histroyChange.bind(this)}>
                                        {this.renderSelect()}
                                    </select>
                                </div>
                                <table>
                                    <thead>
                                    <tr>
                                        <td>名次</td>
                                        <td>账号</td>
                                        <td>有效投注</td>
                                        <td>奖金</td>
                                    </tr>
                                    </thead>
                                    <tbody id="define-name">
                                        {this.renderRankingHistoryTable()}
                                    </tbody>
                                </table>
                            </li>
                            <li style={{display:this.state.tabs==2?"block":'none'}}>
                                <h3 >活动规则说明</h3>
                                <div className="statement-rules">
                                    <h4>"寻找流水王"擂台赛,以排行榜的形式实况展现玩家风采及活动美丽!</h4>
                                    <h4>活动时间：2008年11月12日起每周举行一次</h4>
                                    <h4>活动方案</h4>
                                    <h4>1. {config.appName}的会员周有效投注达到10万以上即可参加该活动</h4>
                                    <h4>2. "即时排行榜"每小时更新一次,每自然周确定一次获奖名单</h4>
                                    <h4>3. {config.appName}会员依据"寻找流水王"擂台赛各档投注要求,在该档要求范围内投注最高的会员,即可获得相应奖金,如果出现相同有效投注则以最先达到的时间为准;</h4>
                                    <h4>4. "寻找流水王"擂台赛活动奖金于每周一下午6点发放到{config.appName}上一周获奖名单账户。</h4>
                                    <h4>活动条款</h4>
                                    <h4>1. 该活动奖金只需全额投注即可出款;且能够与返水活动共享;</h4>
                                    <h4>2. 同IP(包含但不限于注册ip,登录ip等)、同会员账号、同姓名（含同手机号码,同银行卡等）,均被视为同一账户;</h4>
                                    <h4>3. 本活动最终解释权归属{config.appName}所有。</h4>
                                </div>
                            </li>
                        </ul>
                        <Link className="register" to="/register"></Link>
                        <a className="service" onClick={this.serviceOpen.bind(this)}></a>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
        remoteSysConfs:state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(StatementPage)