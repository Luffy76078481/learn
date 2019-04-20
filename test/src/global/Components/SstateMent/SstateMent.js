import React, {Component} from 'react';

import {connect} from 'react-redux';
import './SstateMent.scss'
import { Link } from 'react-router';
// import {   ApiQueryDataviewAction  } from "../../../actions";
var RANKFLAG = true;
class SstateMent extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            ranking:[],
            rankingNow:[],
            peridos:[],
            activeClass:"js"
        };
    }

    getRanking(queryId=0){
        let that = this;
        fetch("api/v0/Leaderboard/dataview?id="+queryId+"&asd="+Math.random(),{
            method:"GET"
        }).then(function(Response){
            return Response.json();
        }).then((data)=>{
           
            if(that.state.rankingNow.length>0){
                that.setState({
                    ranking:data.Data,
                });
            }else{
                that.setState({
                    ranking:data.Data,
                    rankingNow:data.Data,
                });
            }
        }).catch(function(err){
        })
    }


    getPeridos(){
        let that = this;
        fetch("api/v0/Leaderboard/define?asd="+Math.random(),{
            method:"GET"
        }).then(function(Response){
            return Response.json();
        }).then((data)=>{
            that.setState({peridos:data.Data});
        }).catch(function(err){
        })
    }

    componentWillMount(){
        this.getPeridos();
        this.getRanking();
    }

    componentDidMount(){
        document.title = window.config.title;
    }

    selectChange(e){
        RANKFLAG = false;
        this.getRanking(e.target.value);
    }

    renderSelect(){
        let _this = this;
        return this.state.peridos.map((data,index)=>{
            let time = data.StartTime.slice(0,10)+" 12:00 ~ "+data.EndTime.slice(0,10)+" 12:00"
            if(index == 1){
                if(RANKFLAG){
                    RANKFLAG = false;
                    this.getRanking(data.Id);
                }
                return  <option key={data.Id} value ={data.Id} selected = "selected">{time}</option>
            }else{
                return  <option key={data.Id} value ={data.Id}>{time}</option>
            }
        })
        

    }

    renderRankingTable(rankingNow){
        if(rankingNow){
            return this.state.rankingNow.map((data)=>{
                let UserName = data.UserName;
                let realUserName = UserName.substr(0, 1) + '****' + UserName.substr(5, UserName.split('').length);
                return (
                <tr key={data.Ranked} className="spec-border">
                    <td>{data.RankedName}</td>
                    <td>{realUserName}</td>
                    <td>{data.RealBet}</td>
                    <td>{data.Reward}</td>
                </tr>
                )
            })
        }else{
            return this.state.ranking.map((data)=>{
                let UserName = data.UserName;
                let realUserName = UserName.substr(0, 1) + '****' + UserName.substr(5, UserName.split('').length);
                return (
                <tr key={data.Ranked} className="spec-border">
                    <td>{data.RankedName}</td>
                    <td>{realUserName}</td>
                    <td>{data.RealBet}</td>
                    <td>{data.Reward}</td>
                </tr>
                )
            })
        }
       
    }

    renderTable(rankingNow){
        if(this.state.rankingNow && this.state.rankingNow.length>0){
            return(
            <table className="statement-table">
                <tbody>
                    <tr className="statement-table-title">
                        <td>名次</td>
                        <td>账号</td>
                        <td>有效投注</td>
                        <td>奖金</td>
                    </tr>
                    {this.renderRankingTable(rankingNow)}
                
                </tbody>
            </table>
            )
        }else{
            return(<p>暂无数据</p>)
        }
       
    }

    changeTab(activeClass){
        RANKFLAG = true;
        this.setState({activeClass});
    }


    renderTabTable(){

        switch(this.state.activeClass){
            case "js":{
                return(
                    <div className="statement-background" >
                        <p className="statement-jstitle">排行数据每小时更新一次</p>
                        {this.renderTable(true)}
                    </div>  
                )
            }
            case "ls":{
                return(
                    <div className="statement-background" >
                        <span style={{color:"white"}}>活动时间 </span>
                        <select id="statement-select" ref = "seletTime" onChange={(e)=>this.selectChange(e)}>
                            {this.renderSelect()}
                        </select>
                        {this.renderTable(false)}
                    </div>  
                )
            }
            case "gz":{
                let appName = window.config.appName;
                return(
                    <div className="statement-background" >
                        <h4>"寻找流水王"擂台赛,以排行榜的形式实况展现玩家风采及活动美丽!</h4>
                        <h4>活动时间：2008年11月19日起每周举行一次</h4>
                        <h4>活动方案</h4>
                        <h4>1. {appName}的会员周有效投注达到10万以上即可参加该活动</h4>
                        <h4>2. "即时排行榜"每小时更新一次,每自然周确定一次获奖名单（每周一中午12：00至下周一中午11:59）</h4>
                        <h4>3. {appName}会员依据"寻找流水王"擂台赛各档投注要求,在该档要求范围内投注最高的会员,即可获得相应奖金,如果出现相同有效投注则以最先达到的时间为准。</h4>
                        <h4>4. "寻找流水王"擂台赛活动奖金于每周一下午6点发放到{appName}上一周获奖名单账户。</h4>
                        <h4>5. 每个会员每周只能领取一次奖励。</h4>
                        <h4>6. 每季度随机抽取一名周冠军领取“奥迪R8”一辆。</h4>
                        
                        <h4>活动条款</h4>
                        <h4>1. 该活动奖金只需全额投注即可出款;且能够与返水活动共享;</h4>
                        <h4>2. 同IP(包含但不限于注册ip,登录ip等)、同会员账号、同姓名（含同手机号码,同银行卡等）,均被视为同一账户;</h4>
                        <h4>3. 本活动最终解释权归属{appName}所有。</h4>
                    </div>  
                )
            }
        }

         
    }

    switchText(){
        switch(this.state.activeClass){
            case "js":{
                return "即时排行榜"
            }
            case "ls":{
                return "历史获奖名单"
            }
            case "gz":{
                return "活动规则说明"
            }
        }

    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    render(){
        return (
        <div className="statement-box">
            <div className="statement-slidbox">
                {/* <div className="statement-titleimg"></div> */}
                <p className="statement-titletext">{this.switchText()}</p>
                <div className="statement-top-swich">
                    <div onClick={this.changeTab.bind(this,"js")} className={this.state.activeClass == "js"?"statement-js-active":"statement-js"}></div>
                    <div onClick={this.changeTab.bind(this,"ls")} className={this.state.activeClass == "ls"?"statement-ls-active":"statement-ls"}></div>
                    <div onClick={this.changeTab.bind(this,"gz")} className={this.state.activeClass == "gz"?"statement-gz-active":"statement-gz"}></div>
                    <Link to="/register"><div className="statement-zhuce"></div></Link>
                    <div className="statement-kefu" onClick={this.serversOpen.bind(this)}></div>
                </div>
                {this.renderTabTable()}
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
     {
        user:state.user,
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps,{})(SstateMent);
