import React, { Component } from 'react';
import "./FirstPage.scss";
import { connect } from 'react-redux';
import { Link } from 'react-router';

class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {tab:"MgPart"}
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
    // 在线客服
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
        const FirstPagePromotionAlert = window.r.get("FirstPagePromotionAlert");
        return (
            <div className="venetianFirst">
            {FirstPagePromotionAlert && <FirstPagePromotionAlert/>}
                <div className="testt">
                    <object width="100%" height="400" data="./images/bn.swf">
                        <param name="movie" value="./images/bn.swf"></param>
                        <param name="quality" value="high"></param>
                        <param name="wmode" value="transparent"></param>
                    </object>
                    <object className="ttttt" width="420" height="342" data="./images/888.swf">
                        <param name="movie" value="./images/bn.swf"></param>
                        <param name="quality" value="high"></param>
                        <param name="wmode" value="transparent"></param>
                    </object>
                </div>
                {/* 内容 */}
                <div className="main">
                    <div className="centerBox">
                        <div className="items leftBox">
                            <Link to="/register" className="leftBtns b1" title="免费注册"></Link>
                            <a className="top_livechat leftBtns b2" id="test1" target="_parent" href="#" onClick={this.serversOpen.bind(this)}></a>
                            <Link to="/games" className="leftBtns b3"></Link>
                        </div>
                        <div className="items middleBox">
                            <Link to="/promotions" className="vip"></Link>
                            <div className="bonus">
                                <div className="jackpot">550941</div>
                            </div>
                        </div>
                        <div className="items rightBox">
                            <div className="gameList g1">
                                <Link to="/casino" >百家乐</Link>
                                <Link to="/casino" >龙虎斗</Link>
                                <Link to="/casino" >轮盘</Link>
                                <Link to="/casino" >二八杠</Link>
                                <Link to="/casino" >温州牌九</Link>
                                <Link to="/casino" >德州扑克</Link>
                                <Link to="/casino" >骰宝</Link>
                                <Link to="/casino" >旗舰厅</Link>
                                <Link to="/casino" >金臂厅</Link>
                            </div>
                            <div className="gameList g2">
                                <Link to="/sport">足球赛事</Link>
                                <Link to="/sport">时时滚球</Link>
                                <Link to="/sport">NBA职篮</Link>
                                <Link to="/sport">美式足球</Link>
                                <Link to="/sport">冰球</Link>
                                <Link to="/sport">各式冠军赛事</Link>
                            </div>
                            <div className="gameList g3">
                                <Link to="/bingo">六合彩</Link>
                                <Link to="/bingo">3D彩</Link>
                                <Link to="/bingo">BB3D时时彩</Link>
                                <Link to="/bingo">上海时时乐</Link>
                                <Link to="/bingo">重庆时时彩</Link>
                            </div>
                        </div>
                    </div>
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
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(FirstPage)