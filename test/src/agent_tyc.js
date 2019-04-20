
import React,{Component} from 'react';
import AgentTyc from './global/otherPages/agent/page/agent_tyc/AgentTyc';
import {config} from "globalConfig";


export default class AgentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {tab:"IndexContent"}
    }

    componentDidMount() {

    }
    
    render() {
        return (
            <AgentTyc/>
           
        );
    }
}


