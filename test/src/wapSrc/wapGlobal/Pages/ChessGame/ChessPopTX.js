import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import "./ChessPop.scss"
import { Toast } from 'antd-mobile';
class ChessPopTX extends Component{
    constructor(props){
        super(props);
        this.state={
            nowImg:this.props.user.ImagePath,
            woman:false,
            choseImg:""
        }
    }

    choseImg(choseImg){
        this.setState({
            nowImg:choseImg,
            choseImg
        });
    }

    choseSex(flg){
        this.setState({
            woman:flg
        });
    }

    save(){
        if(!this.state.nowImg){
            Toast.fail('您还未选择头像！');
            return;
        }
        Toast.loading('头像更换中...',300);
        new window.actions.SaveUpdateSceneimageAction(this.state.nowImg).fly(resp=>{
            Toast.hide();
            if (resp.StatusCode === 0) {
                Toast.success('头像更换成功！');
                new window.actions.ApiPlayerInfoAction().fly();
            }else{
                Toast.fail(resp.Message);
            }
        });
    }

    sexBox(){
        let domList = [];
        let imgFun;
        if(this.state.woman){
            imgFun = i=>{//前12个女头像
                return String.fromCharCode(65+i);
            };
        }else{
            imgFun = i=>{//后12个男头像
                return String.fromCharCode(77+i);
            };
        }
        for(let i=0;i<12;i++){
            let Code =  imgFun(i);
            domList.push(
                <li key={i} onClick={this.choseImg.bind(this,Code)} className={["sexItem",this.state.choseImg==Code ? "itemActive":""].join(" ")}>
                    <img src={require(`../../style/images/chess/touxiang/${Code}.png`)}/>
                </li>
            )
        }
       
        return(
            <ul className="sexBox">
                {domList}
            </ul> 
        )
    }
  
    render(){
        return (
            <div className="chesspop-neibox Headpro">
                <p className="chesspop-white-titlefont chesspop-head">
                    <span className="chesspop-head-title">头像设置</span>
                </p>
                <div className="chesspop-botbox">
                    <div className="chesspop-botbox">
                        <div className="chesspop-self-left">
                            <p>已选择头像</p>
                            <div className="leftTX-img">
                                <img src={require(`../../style/images/chess/touxiang/${this.state.nowImg}.png`)}/>
                            </div>
                            <div onClick={this.save.bind(this)} className="leftTX-button">
                                <span>保存修改</span>
                            </div>
                        </div>
                        <div className="chesspop-self-right">
                           <div className="tabchange">
                               <div onClick={this.choseSex.bind(this,false)} className={["tabsItem",this.state.woman?"":"active"].join(" ")}>男</div>
                               <div onClick={this.choseSex.bind(this,true)} className={["tabsItem",this.state.woman?"active":""].join(" ")}>女</div>
                           </div>
                            {this.sexBox()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
    }
)

export default connect(mapStateToProps)(ChessPopTX)