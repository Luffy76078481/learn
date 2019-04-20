import React, {Component} from 'react';

import {connect} from 'react-redux';
import WithdrawComponent from './WithdrawComponent'
import DepositComponent from './DepositComponent'
import DepositRecords from './DepositRecordsComponent'
class WithdrawAndDepositPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            type:this.props.routeParams.type || "deposit"
        }
    }
    typeChange(type){
        this.setState({
            type:type
        })
    }
    render() {
        return (
            <div>
                <div className="withdrawAndDeposit">
                    <ul className="tab-a">
                        <li className={this.state.type=="deposit"?"active":""} onClick={this.typeChange.bind(this,'deposit')}>存款</li>
                        <li className={this.state.type=="withdraw"?"active":""} onClick={this.typeChange.bind(this,'withdraw')}>取款</li>
                    </ul>
                    {
                        /*存款*/
                        this.state.type!="withdraw" &&<DepositComponent/>
                    }
                    {   /*取款*/
                        this.state.type=="withdraw" && <WithdrawComponent/>
                    }
                </div>

                {
                    /*只有在存款时才显示*/
                    this.state.type!="withdraw" &&
                    <div className="reportWrapper">
                        <h2 className="title">存款记录</h2>
                        <DepositRecords/>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        game: state.game,
    }
);


export default connect(mapStateToProps, {})(WithdrawAndDepositPage);