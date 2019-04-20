import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  BackTop,Collapse
} from 'antd';
import '../Privacy/Privacy.scss'
import {config} from "globalConfig";
import {IntroduceJson} from "../IntroduceJson";
const Panel = Collapse.Panel;
class AboutUs extends Component{
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
    renderPanel(num){
        let Panels=[];
        let data =  IntroduceJson['qa'+num];
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
            <div className="AboutUs container">

                <h2 className="page-title">常见问题</h2>
                <h3 className="item-title">热门问题</h3>
                <Collapse bordered={false} defaultActiveKey={['1']}>
                    {this.renderPanel(1)}
                </Collapse>
                <h3 className="item-title">存款问题</h3>
                <Collapse bordered={false} >
                    {this.renderPanel(2)}
                </Collapse>
                <h3 className="item-title">优惠问题</h3>
                <Collapse bordered={false} >
                    {this.renderPanel(3)}
                </Collapse>
                <h3 className="item-title">手机娱乐</h3>
                <Collapse bordered={false} >
                    {this.renderPanel(4)}
                </Collapse>
                <h3 className="item-title">游戏相关问题</h3>
                <Collapse bordered={false} >
                    {this.renderPanel(5)}
                </Collapse>
                <h3 className="item-title">技术操作</h3>
                <Collapse bordered={false} >
                    {this.renderPanel(6)}
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

export default connect(mapStateToProps,{})(AboutUs);
