

import React, {Component} from 'react';
import Reactdom from'react-dom'
import {connect} from 'react-redux';

// import {config} from "../../../../common/config";


class RecommendPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            autoTransfer:this.props.systemConfig.autoTransfer,
            voice:this.props.systemConfig.voice,
            value: '',
            copied: false,
            copyErr:false,
        };
    }

    copyCode(){
        var Url2=document.getElementById("recommendCode");
        Url2.select();
        try{
            if(document.execCommand('copy', false, null)){
                document.execCommand("Copy");
               this.setState({
                   copied:true
               })
            }
        } catch(err){
            this.setState({
                copyErr:true
            })
        }
    }

    render() {
        return (

            <div className="clearfix t20 member-content promContent">
                <div className="promo-main  recommend">
                    {/*<div className="promo-title">我的推广地址</div>*/}
                    <div className="promo-body tm " style={{marginLeft: "-35px"}}>
                        <sapn>我的推广地址</sapn>&nbsp;&nbsp;&nbsp;
                        <input  id="recommendCode" className="input" readOnly type="text" value={"https://"+ location.hostname + "/register?channel=" +this.props.user.recommendCode} />
                        <div className="copyBtn htbtnlg" data-clipboard-target="#myCode" onClick={this.copyCode.bind(this)}>复制</div>
                        {this.state.copied?<span> 已复制！</span>:null}
                        {this.state.copyErr?<span> 复制失败,请改用手动复制！</span>:null}

                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        systemConfig:state.systemConfig,
        user:state.user,
        // remoteSysConfs:state.remoteSysConfs
    }
);

export default connect(mapStateToProps, {})(RecommendPage);
