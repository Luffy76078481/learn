import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router';

import "./FirstPage.scss";
import {config} from "globalConfig";


class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {tab:"pt"}
    }
    initAll() {
        // ptlist
        window.renderOwl(this.refs.plist, {
            items: 4,
            loop: true,
            dots: false,
            nav: true,
            navText: ['', ''],
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 3000
        });
        // best games
        window.renderOwl('.content-game-list', {
            items:1,
            dots:false,
            autoplay:true,
            autoplayHoverPause:true,
            autoplayTimeout:5000,
            loop:true
        });


        window.Util.index();
    }
    componentDidMount() {
        this.initAll();
    }
    componentDidUpdate() {
        this.initAll();
    }
    onClickGameLink(link) {
        window.actions.authToLink(link);
    }
    onCarouselClick(event){
        let target = $(event.target);
        if(target.hasClass("delegate")){
            let gameLink = target.attr("data-gameLink");
            if(gameLink){
                this.onClickGameLink(gameLink);
            }
        }
    }

    renderCansinoList() {
        const toDecimalNumber = window.toDecimalNumber;
        var ret = [];
        for (var i = 0; i < this.props.views.casinos.content.length; i++) {
            var casino = this.props.views.casinos.content[i];
            var gameLink = window.configHelper.getGamePlayLink(casino.gameId);
            ret.push(
                <div key={casino.id} className="item">
                    <div className="platform">
                        <div className="platform-img">
                            <div className="platform-img-style platform-inco0" style={{background: "url(" + casino.iconUrl + ") no-repeat", "backgroundSize":"100% 100%"}}></div>
                            <div className="platform-Number color-third"><i className="glyphicon glyphicon-user"></i><span className="jackpot">{toDecimalNumber(casino.onlineUserCount || 0)}</span></div>
                        </div>
                        <div className="platform-Introduction">
                            <h4 className="color-third">{casino.title}</h4>
                            <p className="color-main">{casino.description}</p>
                            <a className="delegate" data-gameLink={gameLink} href="javascript:;" >进入游戏</a>
                        </div>
                    </div>
                </div>
            );
        }
        return ret;
    }

    onClickGame(event) {
        window.actions.authToLink(link);
    }

    renderSubPage() {
        if (this.state.tab === "mg") {
            return(
                <div className="gamesbx mg">
                    <Link to="/games" ><div onClick={()=>{window.actions.ChangeLinkID("MG2")}} className="gam mg1"></div></Link>
                    <Link to="/games" ><div onClick={()=>{window.actions.ChangeLinkID("MG2")}} className="gam mg2"></div></Link>
                    <Link to="/games" ><div onClick={()=>{window.actions.ChangeLinkID("MG2")}} className="gam mg3"></div></Link>
                    <Link to="/games" ><div onClick={()=>{window.actions.ChangeLinkID("MG2")}} className="gam mg4"></div></Link>
                </div>
            )
        }else  if(this.state.tab ==="pt"){
            return(
                <div className="gamesbx pt">
                    <Link to="/games" ><div onClick={()=>{window.actions.ChangeLinkID("PT")}} className="gam pt1"></div></Link>
                    <Link to="/games" ><div onClick={()=>{window.actions.ChangeLinkID("PT")}} className="gam pt2"></div></Link>
                    <Link to="/games" ><div onClick={()=>{window.actions.ChangeLinkID("PT")}} className="gam pt3"></div></Link>
                    <Link to="/games" ><div onClick={()=>{window.actions.ChangeLinkID("PT")}} className="gam pt4"></div></Link>
                </div>
            )
        } else if (this.state.tab === "agfish") {
            return(
                <div className="gamesbx agfish">
                    <Link to="/ag" ><div className="agfish"></div></Link>
                </div>
            )
        } else if (this.state.tab ==="ag"){
            return (
                <div className="gamesbx ag">
                    <Link to="/games" ><div onClick={()=>{window.actions.ChangeLinkID("AG")}} className="gam ag1"></div></Link>
                    <Link to="/games" ><div onClick={()=>{window.actions.ChangeLinkID("AG")}} className="gam ag2"></div></Link>
                    <Link to="/games" ><div onClick={()=>{window.actions.ChangeLinkID("AG")}} className="gam ag3"></div></Link>
                    <Link to="/games" ><div onClick={()=>{window.actions.ChangeLinkID("AG")}} className="gam ag4"></div></Link>
                </div>
            )
        }else  if(this.state.tab ==="bbin"){
            return(
                <div className="gamesbx bbin">
                    <Link to="/games" ><div onClick={()=>{window.actions.ChangeLinkID("BBIN")}} className="gam bbin1"></div></Link>
                    <Link to="/games" ><div onClick={()=>{window.actions.ChangeLinkID("BBIN")}} className="gam bbin2"></div></Link>
                    <Link to="/games" ><div onClick={()=>{window.actions.ChangeLinkID("BBIN")}} className="gam bbin3"></div></Link>
                    <Link to="/games" ><div onClick={()=>{window.actions.ChangeLinkID("BBIN")}} className="gam bbin4"></div></Link>
                </div>
            )
        }
        return(
            <div className="gamesbx pt">
                <Link to="/pt" ><div className="gam pt1"></div></Link>
                <Link to="/pt" ><div className="gam pt2"></div></Link>
                <Link to="/pt" ><div className="gam pt3"></div></Link>
                <Link to="/pt" ><div className="gam pt4"></div></Link>
            </div>
        )
    }

    mouseOverTab(tab) {
        this.setState({tab:tab});
    }

    serversOpen(e){
        e.preventDefault();
        if(e.target.id=='test'){
            window.swal({
                    title: "忘记密码",
                    text: "联系在线客服协助修改密码",
                    confirmButtonColor: "#c5841f",
                    confirmButtonText: "联系客服",
                    // closeOnConfirm: false
                    showCancelButton: true,
                    cancelButtonText: "关闭",
                    // cancelButtonColor: "#f8c700",
                },
                ()=>{
                    window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
                });
            return;
        }
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    render() {
        const spec = config.spec;
        window.onClickGameLink = (link)=>{
            this.onClickGameLink(link);
        };
        const gl = window.configHelper.getGamePlayLink;
        const toDecimalNumber = window.toDecimalNumber;
        const ImageGallery = window.r.get("ImageGallery2");
        const options = window.r.props('ImageGallery2').homeType || "pc_home_images";
        const HijackAlert = window.r.get("hijackAlert");
        return (
            <div className="xhtdfirst">
                <ImageGallery height="360px" type={options}></ImageGallery>
                {HijackAlert && <HijackAlert/>}
                <div className="newsbx"></div>

                <div className="content1 content">
                    <div className="gamenavbx">
                        <ul>
                            <li className={this.state.tab=="pt"?"icon_pt onchoose":"icon_pt"} onMouseOver={this.mouseOverTab.bind(this,"pt")}>
                                PT电子
                                <div>PT SLOT MACHINE</div>
                            </li>
                            <li className={this.state.tab=="mg"?"icon_mg onchoose":"icon_mg"}  onMouseOver={this.mouseOverTab.bind(this,"mg")}>
                                MG电子
                                <div>MG SLOT MACHINE</div>
                            </li>
                            <li className={this.state.tab=="agfish"?"icon_ag onchoose":"icon_ag"}  onMouseOver={this.mouseOverTab.bind(this,"agfish")}>
                                AG捕鱼王
                                <div>AG FISH KING</div>
                            </li>
                            <li className={this.state.tab=="ag"?"icon_ag onchoose":"icon_ag"}  onMouseOver={this.mouseOverTab.bind(this,"ag")}>
                                AG电子
                                <div>AG SLOT MACHINE</div>
                            </li>
                            <li className={this.state.tab=="bbin"?"icon_bbin onchoose":"icon_bbin"}  onMouseOver={this.mouseOverTab.bind(this,"bbin")}>
                                BBIN电子
                                <div>BB SLOT MACHINE</div>
                            </li>
                        </ul>
                    </div>
                    {this.renderSubPage()}
                    <div className="winner">
                        <div className="wintitle"></div>
                        <div className="winlistbx">
                            <marquee className="run-cont" ref="affiche" direction="up"
                                     style={{loop: -1, scrollAmount: 1,scrollDelay:20, }} onMouseOut={(e) => {
                                this.refs.affiche.start()
                            }} onMouseOver={(e) => {
                                this.refs.affiche.stop()
                            }}>
                                <div className="cycle-carousel-wrap">
                                    <li className="cycle-slide">
                                        <span className="area">四川</span>
                                        <span className="user">C0***Yh</span>
                                        <span className="game">不朽的浪漫</span>
                                        <span className="money">85000元</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">湖南</span>
                                        <span className="user">Nnzz***2</span>
                                        <span className="game">淑女派对</span>
                                        <span className="money">310452元</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">贵州</span>
                                        <span className="user">S97***Tg</span>
                                        <span className="game">钱海遨游</span>
                                        <span className="money">62005元</span>
                                    </li>
                                    <li className="cycle-slide" >
                                        <span className="area">陕西</span>
                                        <span className="user">E96***Ef</span>
                                        <span className="game">冰上曲棍球</span>
                                        <span className="money">523005元</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">四川</span>
                                        <span className="user">C0***Yh</span>
                                        <span className="game">不朽的浪漫</span>
                                        <span className="money">85000元</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">湖南</span>
                                        <span className="user">Nnzz***2</span>
                                        <span className="game">淑女派对</span>
                                        <span className="money">310452元</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">贵州</span>
                                        <span className="user">S97***Tg</span>
                                        <span className="game">钱海遨游</span>
                                        <span className="money">62005元</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">陕西</span>
                                        <span className="user">E96***Ef</span>
                                        <span className="game">冰上曲棍球</span>
                                        <span className="money">523005元</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">四川</span>
                                        <span className="user">C0***Yh</span>
                                        <span className="game">不朽的浪漫</span>
                                        <span className="money">85000元</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">湖南</span>
                                        <span className="user">Nnzz***2</span>
                                        <span className="game">淑女派对</span>
                                        <span className="money">310452元</span>
                                    </li>
                                </div>
                            </marquee>
                        </div>
                        <div className="winnumber">
                            <div className="jackpot">12,345,632</div>
                        </div>
                    </div>
                </div>
                <div className="content2 content">
                    <div className="content2img">
                        <div className="hostname">m.{window.location.hostname}</div>
                        {/* <img width="100"  className="qrImg" src={require("./image/xhtdappdow.png")}  /> */}
                        <img width="100"  className="qrImg" src={'http://qr.liantu.com/api.php?w=100&h=100&m=5&text='+this.props.remoteSysConfs.channel_push_url}/>
                    </div>
                </div>
                <div className="content3 content">
                    <div className="content3img"></div>
                </div>

            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        views:state.views,
        global: state.global,
        bestGames: state.game.bestGames,
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(FirstPage)