import React, { Component } from 'react';
import {NavBar, Icon} from 'antd-mobile';
import {browserHistory} from 'react-router';
import connect from "react-redux/es/connect/connect";
import './HelpPage.scss';

class HelpPage extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className="HelpPage">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.goBack()}
                >帮助说明</NavBar>
                <div className="scroll-content helpPage" dangerouslySetInnerHTML={{__html:this.props.remoteSysConfs.app_help_text}}>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs:state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(HelpPage)