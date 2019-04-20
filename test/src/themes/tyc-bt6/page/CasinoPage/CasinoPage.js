/**
 * Created by xm on 2017/5/8.
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {dataJson} from "./gameDescription/dataJson";
import './CasinoPage.scss'


class CasinoPage extends Component {
    onClickGameLink(game) {
        if (!window.actions.auth()) {
            return;
        }
        let GameType = '';
        if(game.PlatformId=="MG2"){
             GameType = 'casino'
        }else{
            GameType = 'Trueman'
        }
        let parma = {
            GamePlatform:game.PlatformId,
            GameType:GameType,//Trueman
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen("Casino");
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    renderCansinoList() {
        var CansinoLists = [];
        let newCasinos=[];
        for (var i = 0; i < this.props.casinos.length; i++) {
            var item = this.props.casinos[i];
            if(item.PlatformId !="OPUS2") {//应sky要求去掉印尼厅
                newCasinos.push(item);
            }
        }
        for (var i = 0; i < newCasinos.length; i++) {//因为这个轮播需要数组的序号 而原来的数组中去掉了一个平台 所以又新建了一个数组用来循环
            var CansinoList = newCasinos[i];
            var large= "col-md-3";
            let des;
            // if(2>i || i>5){
            //     large ="col-md-6";
            // }
            if (dataJson[CansinoList.PlatformId]){
                des=(<Link to={"/gameDescription/"+CansinoList.PlatformId}>游戏介绍</Link>)
            }
            CansinoLists.push(
                <div key={i} className={large+" fadeInUp animated item"} >
                    <div className={"casino-list-img "} onClick={this.onClickGameLink.bind(this,CansinoList)} >
                        <img src={config.prdImgUrl+CansinoList.ImageUrl} />
                    </div>
                    <div className="casino-list-bot">
                        <div className="room-info">
                            <span className="room-title">{CansinoList.Title}</span>
                        </div>
                        <div className="btn-list">
                            <a style={{width:des?"50%":"100%",borderRightWidth:des?"1px":"0px"}} onClick={this.onClickGameLink.bind(this,CansinoList)}>开始游戏</a>
                            {des}
                        </div>
                    </div>
                </div>
            );
        }
        return CansinoLists;
    }


    render() {
        const CansinoList = this.renderCansinoList();
        const ImageGallery = window.r.get("ImageGallery");

        return (
            <article id="casino">
                <ImageGallery width="100%" height="360px" type="casino_banner_imgs" imgtype='banner' />
                <div className="container">
                    <div className="casino-platform-list row">
                        {CansinoList}
                    </div>
                </div>
            </article>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        casinos:state.views.casinos,
    }
);

export default connect(mapStateToProps, {})(CasinoPage);