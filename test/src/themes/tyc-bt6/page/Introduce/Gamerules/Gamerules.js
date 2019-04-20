import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    BackTop,Collapse
} from 'antd';
import '../Privacy/Privacy.scss'
import {config} from "globalConfig";
import {IntroduceJson} from "../IntroduceJson";
const Panel = Collapse.Panel;
class Gamerules extends Component{
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
        let data =  IntroduceJson['gamerules'+num];
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

                <h2 className="page-title">体育博彩投注规则与规定</h2>
                <p className="page-txt">某些赛事和赌盘的规则有所不同，本网站中每项特定赛事或赌盘/投注类型的规则已在下面的“特定赛事/赌盘投注规 则”中列出。 下列一般规则适用于所有赛事与赌盘/投注类型，在投注中须完全遵守。 在适用的情况下，网站所公布 的“条件与条款”中设定的规定和定义应适用于本“投注规则与规定”。</p>
                <h3 className="item-title">一般投注规则与规定</h3>
                <Collapse bordered={false}>
                    {this.renderPanel(1)}
                </Collapse>
                <h3 className="item-title">赌盘（投注类型）规则通则</h3>
                <Collapse bordered={false}>
                    {this.renderPanel(2)}
                </Collapse>
                <h3 className="item-title">特定赛事投注规则</h3>
                <Collapse bordered={false}>
                    {this.renderPanel(3)}
                </Collapse>
                <h3 className="item-title">号码游戏博彩规定</h3>
                <Collapse bordered={false}>
                    {this.renderPanel(4)}
                </Collapse>
                <h3 className="item-title">虚拟运动规则</h3>
                <Collapse bordered={false}>
                    {this.renderPanel(5)}
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

export default connect(mapStateToProps,{})(Gamerules);
