import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    BackTop,Collapse
} from 'antd';
import './Privacy.scss'
import {config} from "globalConfig";
import {IntroduceJson} from "../IntroduceJson";
const Panel = Collapse.Panel;
class Privacy extends Component{
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
        let data =  IntroduceJson.privacy;
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

                <h2 className="page-title">隐私政策</h2>
                <p className="page-txt">对于保存客户资料方面， {config.appName} 一向采取最谨慎的态度及工作程序作处理。以下的政策说明了我们对客户所肩负起的责任与承诺。另外，也清晰说明了我们处理客户资料的方式。
                    当阁下使用https://www.sg909.com时，表示您承认并接受 {config.appName} 隐私政策的规则与条件， 并了解收集各项资料之目的及处理之方式。</p>
                <Collapse bordered={false} defaultActiveKey={['1']}>
                    {this.renderPanel()}
                </Collapse>
                <p>如客户对我们的隐私政策和安全有任何疑问，请随时来信咨询或使用 {config.appName} 24小时在线服务与我们联系。</p>
                <BackTop></BackTop>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
{

}
);

export default connect(mapStateToProps,{})(Privacy);
