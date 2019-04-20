/**
 * Created by jamen on 2017/4/30.
 */

import React, {Component} from 'react';
import { Collapse ,Panel } from 'antd';
import {connect} from 'react-redux';
import {ApiQuerySitemsgsAction,ApiReadSiteMsgAction,ApiSitemsgUnreadCountAction} from "../../../../../actions/index";
import PageBar from "./PageBar"

class MessagePage extends Component {
    componentDidMount() {
        new ApiQuerySitemsgsAction().fly();
    } 

    renderMsgs() {
        var ret = [];
        const Panel = Collapse.Panel;
        var msg = this.props.sitemsgs.rows;
        for (let i = 0; i < this.props.sitemsgs.rows.length; i++) {
            var msg = this.props.sitemsgs.rows[i];
            ret.push(
                    <Panel header={msg.Message}   key={i+1} >
                        <p dangerouslySetInnerHTML={{__html:msg.Message}}></p>
                        <p className="tc-date">{msg.SendTime}</p>
                        </Panel>
                );
        }
        
        if (ret.length === 0) {
            ret.push(<div key="no_msg">
                <div  >很抱歉，没有您查找的记录.</div>
            </div>);
        }
        return ret;
    }

    toPage(pageNo = 1) {
        new ApiQuerySitemsgsAction('','',pageNo).fly();
    }
    callbacks(key) {
        if(key){
            let messageId = this.props.sitemsgs.rows[key-1].Id
            new ApiReadSiteMsgAction(messageId).fly((resp)=>{
                if(resp.StatusCode==0){
                    new ApiSitemsgUnreadCountAction().fly(); 
                }
            })
              
        }else{
            return
        }

      }
    render() {
        return (
            <div className="clearfix t20 member-content">
                {/* <table className="table-msg table-border f14 member-border">
                    <thead>
                    <tr>
                        <th width="5%" className="tc member-th">序</th>
                        <th width="70%" className="tc member-th">消息内容</th>
                        <th width="25%" className="tc member-th">发布时间</th>
                    </tr>
                    </thead> */}
                    {/* <tbody id="member_message">
                    {this.renderMsgs()}
                    </tbody> */}
                {/* </table> */}
                <Collapse  accordion  style={{"clear":"both"}} onChange={this.callbacks.bind(this)}  >
                   {this.renderMsgs()}
                </Collapse>
             
                <PageBar toPage={this.toPage.bind(this)} page={this.props.sitemsgs}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        sitemsgs:state.sitemsg.sitemsgs
    }
);



export default connect(mapStateToProps, {

})(MessagePage);