import React, { Component } from 'react';
import "./css/FirstPage.scss";
import { connect } from 'react-redux';
import { Link } from 'react-router';

class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {tab: "MG"}
    }
    onClickGameLink(link) {
        window.actions.authToLink(link);
    }

    onClickGame(event) {
        window.actions.authToLink(link);
    }

    mouseOverContentgo(goto){
        switch(goto){
            case 'casinolink':
                window.$('.sportlink').css("left","667px");
                window.$('.bingolink').css("left","841px");
                break;
            case 'sportlink':
                window.$('.sportlink').css("left","176px");
                window.$('.bingolink').css("left","841px");
                break;
            case 'bingolink':
                window.$('.sportlink').css("left","176px");
                window.$('.bingolink').css("left","333px");
                break;
        }
    }

    mouseOverGmNav(tab){
        this.setState({tab:tab});
    }

    renderGameBx(){
        if (this.state.tab === "MG"){
            return(
                    <div className="gm_middle">
                        <div className="gm_list MG1">
                            <Link to="/mg"></Link>
                            <p>摆脱</p>
                        </div>
                        <div className="gm_list MG2">
                            <Link to="/mg"></Link>
                            <p>抢银行</p>
                        </div>
                        <div className="gm_list MG3">
                            <Link to="/mg"></Link>
                            <p>淑女之夜</p>
                        </div>
                        <div className="gm_list MG4">
                            <Link to="/mg"></Link>
                            <p>招财鞭炮</p>
                        </div>
                        <div className="gm_list MG5">
                            <Link to="/mg"></Link>
                            <p>黄金工厂</p>
                        </div>
                        <div className="gm_list MG6">
                            <Link to="/mg"></Link>
                            <p>媚娘</p>
                        </div>
                    </div>
                )
        }else if(this.state.tab === "PT"){
            return(
                    <div className="gm_middle">
                        <div className="gm_list PT1">
                            <Link to="/pt"></Link>
                            <p>百慕大三角</p>
                        </div>
                        <div className="gm_list PT2">
                            <Link to="/pt"></Link>
                            <p>中国厨房</p>
                        </div>
                        <div className="gm_list PT3">
                            <Link to="/pt"></Link>
                            <p>疯狂之七</p>
                        </div>
                        <div className="gm_list PT4">
                            <Link to="/pt"></Link>
                            <p>海豚碉</p>
                        </div>
                        <div className="gm_list PT5">
                            <Link to="/pt"></Link>
                            <p>诙谐财富</p>
                        </div>
                        <div className="gm_list PT6">
                            <Link to="/pt"></Link>
                            <p>古怪猴子</p>
                        </div>
                    </div>
                )
        }else if(this.state.tab === "BBIN"){
            return(
                    <div className="gm_middle">
                        <div className="gm_list BBIN1">
                            <Link to="/games"></Link>
                            <p>连环夺宝</p>
                        </div>
                        <div className="gm_list BBIN2">
                            <Link to="/games"></Link>
                            <p>糖果派对</p>
                        </div>
                        <div className="gm_list BBIN3">
                            <Link to="/games"></Link>
                            <p>喜福猴年</p>
                        </div>
                        <div className="gm_list BBIN4">
                            <Link to="/games"></Link>
                            <p>夜市人生</p>
                        </div>
                        <div className="gm_list BBIN5">
                            <Link to="/games"></Link>
                            <p>斗鸡</p>
                        </div>
                        <div className="gm_list BBIN6">
                            <Link to="/games"></Link>
                            <p>明星97</p>
                        </div>
                    </div>
                )
        }else if(this.state.tab === "AG"){
            return(
                    <div className="gm_middle">
                        <div className="gm_list AG1">
                            <Link to="/games"></Link>
                            <p>水果拉霸</p>
                        </div>
                        <div className="gm_list AG2">
                            <Link to="/games"></Link>
                            <p>灵猴献瑞</p>
                        </div>
                        <div className="gm_list AG3">
                            <Link to="/games"></Link>
                            <p>列强争霸</p>
                        </div>
                        <div className="gm_list AG4">
                            <Link to="/games"></Link>
                            <p>复古花园</p>
                        </div>
                        <div className="gm_list AG5">
                            <Link to="/games"></Link>
                            <p>太空漫游</p>
                        </div>
                        <div className="gm_list AG6">
                            <Link to="/games"></Link>
                            <p>杰克高手</p>
                        </div>
                    </div>
                )
        }else if(this.state.tab === "GPI"){
            return(
                    <div className="gm_middle">
                        <div className="gm_list GPI1">
                            <Link to="/games"></Link>
                            <p>锦鲤纳福</p>
                        </div>
                        <div className="gm_list GPI2">
                            <Link to="/games"></Link>
                            <p>四大美女</p>
                        </div>
                        <div className="gm_list GPI3">
                            <Link to="/games"></Link>
                            <p>深海探险</p>
                        </div>
                        <div className="gm_list GPI4">
                            <Link to="/games"></Link>
                            <p>转三国</p>
                        </div>
                        <div className="gm_list GPI5">
                            <Link to="/games"></Link>
                            <p>摇钱树</p>
                        </div>
                        <div className="gm_list GPI6">
                            <Link to="/games"></Link>
                            <p>经典老虎机</p>
                        </div>
                    </div>
                )
        }
    }

    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }



    render() {
        window.onClickGameLink = (link) => {
            this.onClickGameLink(link);
        };
        const FirstPagePromotionAlert = window.r.get("FirstPagePromotionAlert");
        const ImageGallery = window.r.get("ImageGallery");
        return (
            <div className="mgmFirst">
              {FirstPagePromotionAlert && <FirstPagePromotionAlert/>}
                <ImageGallery height="450px"></ImageGallery>
                <div className="contentgo">
                    <div className="bigbx">
                        <Link to="/casino" >
                            <div className="linkto casinolink" onMouseOver={this.mouseOverContentgo.bind(this,"casinolink")}></div>
                        </Link>
                        <Link to="/sport" >
                        <div className="linkto sportlink" onMouseOver={this.mouseOverContentgo.bind(this,"sportlink")}></div>
                        </Link>
                        <Link to="/bingo" >
                            <div className="linkto bingolink" onMouseOver={this.mouseOverContentgo.bind(this,"bingolink")}></div>
                        </Link>
                    </div>
                </div>
                <div className="about"></div>
                <div className="content content5">
                    <div className="fromCenter center5">
                        <div className="service">
                            <ul>
                                <li>
                                    <i className="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp;
                                    客服热线：
                                    <span>{this.props.remoteSysConfs.online_service_phone}</span>
                                </li>
                                <li>
                                    <i className="fa fa-qq" aria-hidden="true"></i>&nbsp;&nbsp;
                                    投诉与建议：
                                    <span>{this.props.remoteSysConfs.online_service_qq}</span>
                                </li>
                                <li>
                                    <i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;
                                    联系邮箱：
                                    <span>{this.props.remoteSysConfs.online_service_email}</span>
                                </li>
                                <li>
                                    <i className="fa fa-headphones" aria-hidden="true"></i>&nbsp;&nbsp;
                                    <a  href="#" style={{color:'#635846'}} onClick={this.serversOpen.bind(this)}>
                                        <span>7X24</span>
                                        小时在线客服
                                    </a>
                                </li>
                            </ul>
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
        remoteSysConfs:state.remoteSysConfs
    }
);

export default connect(mapStateToProps, {})(FirstPage);