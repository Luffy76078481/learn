import React, { Component } from 'react';
import { connect } from 'react-redux'
const bgUrl = require("../../style/images/chess/buyubg.jpg")
const odlbgUrl = require("../../style/images/chess/background.jpg")

class Mermaid extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
       document.getElementById('gameframe').style.backgroundImage = "url(" + bgUrl + ")";
    }
    componentWillUnmount(){
        document.getElementById('gameframe').style.backgroundImage = "url(" + odlbgUrl + ")";
    }
    render() {
        return (
            <div className='mermaidGame'>
                <div className='fishAg'></div>
                <div className='fishPt'></div>
                <div>
                    <div className='fishDs'></div>
                    <div className='fishDr'></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {

    }
);

export default connect(mapStateToProps)(Mermaid)