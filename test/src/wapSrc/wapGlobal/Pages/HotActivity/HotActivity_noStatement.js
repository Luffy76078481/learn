/*
*
* 【该JS没有流水王】
*
*
*
* */

import React, { Component } from 'react';
import {NavBar, Icon, Flex} from 'antd-mobile';
import {Link} from 'react-router';
import connect from "react-redux/es/connect/connect";
import "./HotActivity.scss";


class HotActivity extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){
    }
    openSildeBar(){
        this.props.params.openSilde()
    }
    render(){
        return(
            <div className="HotActivity">
                <NavBar
                    mode="light"
                    icon={<Icon type="ellipsis" />}
                    onLeftClick={this.openSildeBar.bind(this)}
                >火热活动</NavBar>
                <div className="scroll-content">
                    <Flex className="animated">
                        <Link className="lotto" to="hotActivity/lotto"></Link>
                    </Flex>
                    <Flex className="animated">
                        <a className="more"></a>
                    </Flex>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
    }
);

export default connect(mapStateToProps)(HotActivity)