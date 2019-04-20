import React, {Component} from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import "./NavigationBar2.scss"
import {auth} from "globalAction";
class NavigationBar extends Component {

    serversOpen(e){
        e.preventDefault();
        if(e.target.id=='test'){
            window.swal({
                    title: "忘记密码",
                    text: "联系在线客服协助修改密码",
                    confirmButtonColor: "#c5841f",
                    confirmButtonText: "联系客服",
                    showCancelButton: true,
                    cancelButtonText: "关闭",
                },
                ()=>{
                    window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
                });
            return;
        }
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=900,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=450,screenY=250');
        return false;
    }

    renderSlotPlatformOnNav(){
        var ret = [];
        for (var i = 0; i < this.props.platforms.length; i++) {
            var platform = this.props.platforms[i];
            if(platform.showSlot!==1){
                continue;
            }
            ret.push(
                <li><Link to="/games">{platform.name2+ + "平台"}</Link></li>
            );
        }
        return ret;
    }
    // 大转盘
    lottocheck(e){
        e.preventDefault();
        if (!auth()) {
            return;
        }
        var lottolink='/Lotto/dafa_Lotto.html?tab='+this.props.user.username;
        window.open(lottolink)
    }
    render() {
        const promotionLink = window.configHelper.getPromotionUrl();
        var options = window.r.props("NavigationBar");

        return (
            <div>
            <nav role="navigation" className="Navigation">
                <ul className="main-menu">
                    <li><div className="nav_inbox navbx0" ><IndexLink to="/" activeClassName="active home" className="color-highlight"><i className="glyphicon glyphicon-home f24 mt5"></i></IndexLink></div></li>
                    <li className="mainTitle">
                        <div className="nav_inbox navbx1" ><Link activeClassName="active" to="/sport">体育</Link></div>
                        {!options.sub?null:
                        <ul className="items">
                            <li><Link to="/sport" >OPUS体育</Link></li>
                            <li><Link to="/sport" >皇冠体育</Link></li>
                            <li><Link to="/sport" >沙巴体育</Link></li>
                            {this.props.user.token?<li><Link to="/sport" >188体育</Link></li>:null}
                        </ul>}
                    </li>
                    <li><div className="nav_inbox navbx7"><Link to="/PT" activeClassName="active">娱乐场</Link></div></li>
                    <li className="mainTitle">
                        <div className="nav_inbox navbx2" ><Link to="/casino" activeClassName="active">现场荷官</Link></div>
                        {!options.sub?null:
                        <ul className="items">
                            <li><Link to="/casino" >AG厅</Link></li>
                            <li><Link to="/casino" >BBIN厅</Link></li>
                            <li><Link to="/casino" >AB厅</Link></li>
                            <li><Link to="/casino" >PT厅</Link></li>
                            <li><Link to="/casino">MG厅</Link></li>
                            <li><Link to="/casino">OPUS厅 </Link></li>
                        </ul>}
                    </li>
                    <li className="mainTitle">
                        <div className="nav_inbox navbx3"><Link to="/games" activeClassName="active">老虎机</Link></div>
                        {!options.sub?null:
                        <ul className="items">
                            {this.renderSlotPlatformOnNav()}
                        </ul>}
                    </li>
                    <li className="mainTitle">
                        <div className="nav_inbox navbx4"><Link to="/bingo" activeClassName="active">彩票</Link></div>
                        {!options.sub?null:
                        <ul className="items">
                            <li><Link to="/bingo">BBIN彩票</Link></li>
                            <li><Link to="/bingo">KENO彩票</Link></li>
                        </ul>}
                    </li>
                    {/*<li><div className="nav_inbox navbx5"><Link to="/pt" activeClassName="active">PT老虎机</Link></div></li>*/}
                    {/*<li><div className="nav_inbox navbx6"><Link to="/mg" activeClassName="active">MG老虎机</Link></div></li>*/}
                    <li className="mainTitle"><div className="nav_inbox navbx3"><Link to="/streetMachine" activeClassName="active">棋牌</Link></div></li>
                    <li><div className="nav_inbox navbx7"><Link to="/ag" activeClassName="active">捕鱼王</Link></div></li>
                    <li className="bomb"><div className="nav_inbox navbx8"><a target="_blank" onClick={this.lottocheck.bind(this)}>大转盘</a></div></li>
                    <li><div className="nav_inbox navbx9"><Link to="/promotions" activeClassName="active">优惠活动</Link></div></li>
                    {/* <li  onClick={this.serversOpen.bind(this)}><div className="nav_inbox navbx9">在线客服</div></li> */}
                </ul>
            </nav>
           <nav>
           <ul className="main-menu pull-right">
                <li className="main-menu-item  promotion-item separator ">
                <Link to="/promotions" activeClassName="active">
                    优惠活动
                </Link>
                </li>
                <li className="main-menu-item  mobile-item ">
                    <a href={promotionLink}  className="main-menu-link" target="_self">
                        移动 
                    </a>
                </li>
            </ul>
           </nav>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs:state.remoteSysConfs,
        user : state.user,
        platforms: state.game.platforms
    }
);

export default connect(mapStateToProps)(NavigationBar)
