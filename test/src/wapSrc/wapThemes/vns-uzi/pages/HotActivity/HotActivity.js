import React, { Component } from 'react';
import {NavBar, Icon, List, Flex,Toast,Modal} from 'antd-mobile';
import {Link} from 'react-router';
import connect from "react-redux/es/connect/connect";
import "./HotActivity.scss";


class HotActivity extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        // setTimeout(()=>{
        //     $(".animated").addClass('zoomIn');
        // },0)
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
                    {/*<Flex  className="animated">*/}
                        {/*<Link className="statement" to="hotActivity/statement" />*/}
                    {/*</Flex>*/}
                    <Flex className="animated">
                        <Link className="lotto" to="hotActivity/lotto"/>
                    </Flex>
                    <Flex className="animated">
                        <a className="more"/>
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