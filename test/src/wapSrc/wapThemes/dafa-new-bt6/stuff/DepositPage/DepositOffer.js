/*
* 存款页 存款优惠选项
* */

import React, {Component} from 'react';
import {Tabs,List,Radio,Flex} from "antd-mobile";
import connect from "react-redux/es/connect/connect";
import "./DepositPage.scss";

const RadioItem = Radio.RadioItem;
class DepositOffer extends Component {
    constructor(props){
        super(props);
        this.state = {
            sportValue: 0,
            elecValue: 0,
            zhenRenValue: 0,
            chessValue: 0,
        }
    }

    onChangeSport = (value) => {
        this.setState({
            sportValue: value,
        })
    }
    onChangeElec = (value) => {
        this.setState({
            elecValue: value
        })
    }
    onChangeZhenRen = (value) => {
        this.setState({
            zhenRenValue: value
        })
    }
    onChangeChess = (value) => {
        this.setState({
            chessValue: value
        })
    }

    render() {
        const {sportValue,elecValue,zhenRenValue,chessValue} = this.state;
        const tabs = [
            {title:'体育优惠'},
            {title:'电子优惠'},
            {title:'真人优惠'},
            {title:'棋牌优惠'}
        ];

        const sportData = [
            {value:1,label:"周周续存30%(二选一)"},
            {value:2,label:"周周续存50%(二选一)"},
            {value:3,label:"首存100%(四选一)"},
            {value:4,label:"首存30%(四选一)"},
            {value:5,label:"首存50%(四选一)"},
            {value:6,label:"首存80%(四选一)"}
        ];
        const elecData = [
            {value:1,label:"电子首存100%(三选一)"},
            {value:2,label:"电子首存50%(三选一)"},
            {value:3,label:"电子首存5%(三选一)"},
            {value:4,label:"电子笔笔存10%"},
            {value:5,label:"电子笔笔存20%"},
            {value:6,label:"电子笔笔存30%"},
            {value:7,label:"电子笔笔存40%"},
            {value:8,label:"电子笔笔存50%"}
        ];
        const zhenRenData = [
            {value:1,label:"首存30%(三选一)"},
            {value:2,label:"首存50%(三选一)"},
            {value:3,label:"首存80%(三选一)"},
            {value:4,label:"再存35%"},
        ];
        const chessData = [
            {value:1,label:"棋牌首存30%(三选一)"},
            {value:2,label:"棋牌首存50%(三选一)"},
            {value:3,label:"棋牌首存80%(三选一)"}
        ];

        return(
            <div className="deposit_offer_page">
                <Tabs tabs={tabs}
                      initialPage={0}
                      onChange={(tab,index)=> {console.log('onChange',index,tab);}}
                      onTabClick={(tab,index)=> {console.log('onTabClick',index,tab);}}
                      renderTab={tab => <span>{tab.title}</span>}
                >
                    <div className="offer_content" >
                        <List>
                            {sportData.map(i => (
                                <RadioItem key={i.value} checked={sportValue === i.value} onChange={() => this.onChangeSport(i.value)}
                                    style={{color:sportValue === i.value ? "#f00" : "#727272"}}
                                >
                                    {i.label}
                                </RadioItem>
                            ))}
                        </List>
                    </div>
                    <div className="offer_content" >
                        <List>
                            {
                                elecData.map(i => (
                                    <RadioItem key={i.value} checked={elecValue === i.value} onChange={()=>this.onChangeElec(i.value)}
                                        style={{color:elecValue === i.value ? "#f00" : "#727272"}}
                                    >
                                        {i.label}
                                    </RadioItem>
                                ))
                            }
                        </List>
                    </div>
                    <div className="offer_content" >
                        <List>
                            {
                                zhenRenData.map(i => (
                                    <RadioItem key={i.value} checked={zhenRenValue === i.value} onChange={()=>this.onChangeZhenRen(i.value)}
                                        style={{color:zhenRenValue === i.value ? "#f00" : "#727272"}}
                                    >
                                        {i.label}
                                    </RadioItem>
                                ))
                            }
                        </List>
                    </div>
                    <div className="offer_content" >
                        <List>
                            {
                                chessData.map(i => (
                                    <RadioItem key={i.value} checked={chessValue === i.value} onChange={()=>this.onChangeChess(i.value)}
                                        style={{color: chessValue === i.value ? "#f00" : "#727272"}}
                                    >
                                        {i.label}
                                    </RadioItem>
                                ))
                            }
                        </List>
                    </div>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => (
    {

    }
);

export default connect(mapStateToProps)(DepositOffer)