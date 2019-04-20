import React, { Component } from 'react';
import {NavBar, Icon,Card} from 'antd-mobile';
import {browserHistory,Link} from 'react-router';
import connect from "react-redux/es/connect/connect";
import './CardManage.scss';
class CardManage extends Component{
    constructor(props) {
        super(props);
    }

    renderCards(){
        let cards=[];
        this.props.cards.forEach((item,index)=>{
            cards.push(
                <Card key={index} className="card">
                    <Card.Header
                        title={<b>{item.Bank.BankName}({item.Bank.BankCode})</b>}
                    />
                    <Card.Body>
                        <div>账户名:{item.UserName}<br/>卡号:【**** **** ****{item.AccountNo.replace(/\s/g, "").substr(-4)}】</div>
                    </Card.Body>
                </Card>
            )
        })
        if(cards.length==0){
            cards.push(<div key="noCard" className="noCard">您还没有绑定过银行卡! o(╯□╰)o</div>)
        }
        return cards;
    }
    render(){
        return(
            <div className="CardManage">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.push('/')}
                >银行卡管理</NavBar>
                <div className="scroll-content">
                    <div className="cardsList">
                        {this.renderCards()}
                    </div>
                    {
                        this.props.cards.length>5?
                        "":(
                            <div>
                                <Link to="cardManage/addCard"  className="btn">+ 绑定银行卡</Link>
                                <Link to="cardManage/addQrCode"  className="btn">+ 添加支付宝、微信二维码</Link>
                            </div>
                        )
                    }

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        cards :state.user.bankAccounts
    }
);

export default connect(mapStateToProps)(CardManage)