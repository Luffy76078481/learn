import React, {Component} from 'react';
import { Link, IndexLink,browserHistory} from 'react-router';
import { connect } from 'react-redux';
import "./NavigationBar.scss"

class NavigationBar extends Component {

    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=900,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=450,screenY=250');
        return false;
    }

    render() {
        const menuHoverCallback = this.props.menuHover || function (value) {};
        const showBlock = this.props.showBlock;
        return (
            <div className="navMenu">
                <ul className="main-menu">
                    <li className="mainTitle">
                        <div className={"nav_inbox "+(showBlock=="casino"?"active":"")} onMouseEnter={menuHoverCallback.bind(this, "casino")}><Link to="/casino" activeClassName="active">真人视讯</Link></div>
                    </li>
                    {/*<li className="mainTitle">*/}
                        {/*<div className="nav_inbox"><Link to="/PT" activeClassName="active">PT老虎机</Link></div>*/}
                    {/*</li>*/}
                    <li className="mainTitle" >
                        <div className={"nav_inbox "+(showBlock=="games"?"active":"")}   onMouseEnter={menuHoverCallback.bind(this, "games")} style={{"position":"relative"}}>
                        <i className="icon-hot"></i><Link to="/games" activeClassName="active">电子游戏</Link>
                        </div>
                    </li>
                    <li className="mainTitle">
                        <div className={"nav_inbox "+(showBlock=="ag"?"active":"")}   onMouseEnter={menuHoverCallback.bind(this, "ag")}><Link to="/ag" activeClassName="active">捕鱼达人</Link></div>
                    </li>
                    <li className="mainTitle">
                        <div className={"nav_inbox "+(showBlock=="pt"?"active":"")}   onMouseEnter={menuHoverCallback.bind(this, "pt")} style={{"position":"relative"}}>
                        <i className="icon-hot"></i><Link to="/streetMachine" activeClassName="active" >
                            <span className="icon-s-new"></span>棋牌对战</Link>
                        </div>
                    </li>
                    <li className="mainTitle">
                        <div className={"nav_inbox "+(showBlock=="bingo"?"active":"")}   onMouseEnter={menuHoverCallback.bind(this, "bingo")} ><Link to="/bingo" activeClassName="active">彩票游戏</Link></div>

                    </li>


                    <li className="mainTitle">
                        <div className={"nav_inbox "+(showBlock=="sport"?"active":"")}   onMouseEnter={menuHoverCallback.bind(this, "sport")}><Link activeClassName="active" to="/sport">体育电竞</Link></div>
                    </li>
                    <ul className="pull-right">
                        <li className="mainTitle">
                            <div className={"nav_inbox "+(showBlock=="promotions"?"active":"")}  onMouseEnter={menuHoverCallback.bind(this, "promotions")}><Link to="/promotions" activeClassName="active">优惠活动</Link></div>
                        </li>
                        <li className="mainTitle">
                            <div className="nav_inbox"  onMouseEnter={menuHoverCallback.bind(this, "vip")}><Link to="/vip" activeClassName="active">VIP</Link></div>
                        </li>
                        <li className="mainTitle">
                            <div className="nav_inbox"  onMouseEnter={menuHoverCallback.bind(this, "")}><a href="https://tyc.a58.vip/">线路检测</a></div>
                        </li>
                        {/* <li className="mainTitle">
                            <div className="nav_inbox" ><Link to="/shop" activeClassName="active">积分商城</Link></div>
                        </li> */}
                    </ul>
                    {/*<li className="mainTitle">*/}
                        {/*<div className="nav_inbox "><Link to="/LootoPage" activeClassName="active"><span className="icon-s-new"></span>幸运转轮</Link></div>*/}
                    {/*</li>*/}
                    {/*<li className="mainTitle">*/}
                        {/*<div className="nav_inbox"><Link to="/SstateMent" activeClassName="active"><span className="icon-s-hot"></span>流水王</Link></div>*/}
                    {/*</li>*/}

                </ul>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs:state.remoteSysConfs,
        user : state.user,

    }
);

export default connect(mapStateToProps)(NavigationBar)