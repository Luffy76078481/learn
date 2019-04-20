import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import "./css/NavigationBar.scss"


class NavigationBar extends Component {
    serversOpen(e) {
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link, 'servers', 'width=900,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=450,screenY=250');
        return false;
    }





    render() {
        const promotionLink = window.configHelper.getPromotionUrl();
        var options = window.r.props("NavigationBar");
        const menuHoverCallback = this.props.menuHover;
        const bingoName = options.bingoName || "彩票大厅";
        const fishName = options.fishName || "AG捕鱼";
        const gamePath = options.gamePath || "/games";
        const gameName = options.gameName || "电子游艺";
        const wapDownloadName = options.wapDownloadName || "手机投注"
        return (
            <nav role="navigation" className="Navigation">
                <ul className="main_nav">
                    <li><div className="nav_inbox navbx0">
                        <IndexLink to="/" activeClassName="active" className="color-highlight home">
                               首页
                        </IndexLink>
                    </div>
                    </li>
                    <li className="mainTitle n-bingo" onMouseEnter={menuHoverCallback.bind(this, "bingo")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx4"><Link to="/bingo" activeClassName="active">{bingoName}</Link></div>

                    </li>
                    <li className="mainTitle n-sport" onMouseEnter={menuHoverCallback.bind(this, "sport")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx1"><Link activeClassName="active" to="/sport">体育投注</Link></div>

                    </li>
                    <li className="mainTitle n-casino" onMouseEnter={menuHoverCallback.bind(this, "casino")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx2"><Link to="/casino" activeClassName="active">真人视讯</Link></div>

                    </li>
                    <li className="mainTitle n-games" onMouseEnter={menuHoverCallback.bind(this, "games")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx3"><Link to={gamePath} activeClassName="active">{gameName}</Link></div>

                    </li>
                    <li className="mainTitle n-AG" onMouseEnter={menuHoverCallback.bind(this, "agFish")} onMouseLeave={menuHoverCallback.bind(this, false)}>
                        <div className="nav_inbox navbx7">
                            <Link to="/ag" activeClassName="active">
                                <i className="glyphicon glyphicon-fire mr5 agFish"></i>{fishName}
                            </Link>
                        </div>

                    </li>
                    <li className="mainTitle n-promo">
                        <div className="nav_inbox navbx9">
                            <Link to="/promotions" activeClassName="active"><i className="glyphicon glyphicon-gift mr5 mt5"></i>优惠活动</Link>
                        </div>
                    </li>
                    <li className="bomb">
                        <div className="nav_inbox navbx8">
                             <a href={promotionLink} target="_blank">
                                <i className="glyphicon glyphicon-phone mr5 mt5"></i>
                                {wapDownloadName}
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs,
    }
);

export default connect(mapStateToProps)(NavigationBar)