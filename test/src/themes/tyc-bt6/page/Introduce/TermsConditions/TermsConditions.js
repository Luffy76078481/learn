import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    BackTop,Collapse
} from 'antd';
import '../Privacy/Privacy.scss'
import {config} from "globalConfig";
import {IntroduceJson} from "../IntroduceJson";
const Panel = Collapse.Panel;
class TermsConditions extends Component{
    constructor(props){
        super(props)
        this.state = {
        };
    }
    componentDidMount(){
    }
    renderPanelChild(data,num){
        let child=[];
        if(typeof data == "string"){
            child.push(<p style={{marginLeft:0}} key="string" dangerouslySetInnerHTML={{__html:data}}></p>)
        }else{
            for(var i=0;i<data.length;i++){
                let cItem = data[i];
                let Num = num?<p className="num">{num+'.'+(i-0+1)}</p>:"";
                if(typeof cItem === "string"){
                    child.push(<li key={i}>
                        {Num}
                        <p dangerouslySetInnerHTML={{__html:cItem}}></p>
                    </li>)
                }else{
                    child.push(<li key={i}>
                        {Num}
                        <p dangerouslySetInnerHTML={{__html:cItem.title}}></p>
                        {cItem.txt?this.renderPanelChild(cItem.txt):""}
                    </li>)
                }

            }
        }
        return (<ul>{child}</ul>);
    }
    renderPanel(){
        let Panels=[];
        let data =  IntroduceJson.termsconditions;
        for(var i=0;i<data.length;i++){
            let item = data[i];
            let child = this.renderPanelChild(item.txt,i+1);
            Panels.push(<Panel header={i+1+' '+item.title} key={i+1}>
                {child}
            </Panel>)
        }
        return Panels;
    }
    render(){
        return(
            <div className="TermsConditions container">

                <h2 className="page-title">服务条款</h2>
                <Collapse bordered={false} defaultActiveKey={['1']}>
                    {this.renderPanel()}
                </Collapse>
                <BackTop></BackTop>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
{

}
);

export default connect(mapStateToProps,{})(TermsConditions);
