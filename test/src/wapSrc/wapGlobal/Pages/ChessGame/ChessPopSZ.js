import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import "./ChessPop.scss"
import {Link} from "react-router";
class ChessPopTK extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    loginOut(){
        // window.actions.showChessModal(false);
        new window.actions.LogoutAction().fly(res=>{
            window.location.reload();
        });
    }
  
    render(){
        return (
            <div className="chesspop-neibox SZpage">
                <p className="chesspop-white-titlefont chesspop-head">
                    <span className="chesspop-head-title">设置</span>
                </p>
                <div className="chesspop-botbox chesspop-botbox-allstyle">
                    <ul className="SZpage-buttonlist">
                        <li>
                            <div className="SZpage-button">
                                <span className= "SZpage-button-title" onClick={this.loginOut.bind(this)}>登出</span>
                            </div>
                        </li>
                        <li>
                            <div className="SZpage-button">
                                <span className= "SZpage-button-title">帮助中心</span>
                            </div>
                        </li>
                    </ul>
                    <div className="SZpage-imgbox">
                        <img src={require(`../../style/images/chess/backImg/${this.props.user.SceneImage?this.props.user.SceneImage:"A"}.jpg`)}/>
                        <i className="SZpage-flg"></i>
                        <Link onClick={()=>{window.actions.showChessModal(false)}} to="bgchange">
                            <div className="SZpage-button-absl"></div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
    }
)
export default connect(mapStateToProps)(ChessPopTK)