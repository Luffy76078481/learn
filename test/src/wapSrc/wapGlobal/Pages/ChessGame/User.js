import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';
import "./User.scss";

class UserBar extends Component{
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    // 检测字符长度
    getByteLen(val){
        let len = 0;
        let list = [];
        if(typeof val!="string"){
           return list = '无用户名'
        }
        for (var i = 0; i < val.length; i++) {
            let item = val.charAt(i);
            if(len<7){
                if (item.match(/[^\x00-\xff]/ig) != null){
                    len += 2;
                }else{
                    len += 1;
                }
                list.push(item)
            }
            else if(len==7){
                if (item.match(/[^\x00-\xff]/ig) != null){
                    len += 1;
                    continue
                }else{
                    len += 1;
                    list.push(item);                 
                }
            }
            else{
                len +=1;
                break;
            }
        }
        if(len>8) return list.join("")+"..."
        else return list.join("");
    }
    // 金钱数字限制
    userAmount(amount){
        if(amount || amount === 0 ){
            return Number(amount.toString().substr(0,8))
        }
    }
    componentDidMount(){
        
    }

    showChessModal(popType,tabType,popWith,popHeight){
        window.actions.showChessModal(true,popType,tabType,popWith,popHeight);
    }

    // 判断登录
    userIslogin(){
        let dom;
        let domWrap = [];
        if(this.props.user.token && this.props.user.ImagePath){
            dom=[
                <img key={'userPic'}  src = {require(`../../style/images/chess/touxiang/${this.props.user.ImagePath}.png`)}  onClick={this.showChessModal.bind(this,"tx","","9rem","6rem")}/>,
                <div className='info' key={'info'}>
                    <Link to=''>{this.getByteLen(this.props.user.username)}</Link><br/>
                    <Link to='' className="userMoney">{this.userAmount(this.props.user.amount)}</Link>                     
                </div>
            ];
            domWrap.push(
                <div className='afterLogin' key='afterLogin'>
                    {dom}
                </div>
            )
        }
        else{
            dom=[
                <Link to='/login' key={"login"} className='toLogin'></Link>,
                <Link to='/register' key={"register"} className='toRegister'></Link>,
            ];
            domWrap.push(
                <div className='beforeLogin' key='beforeLogin'>
                    {dom}
                </div>
            )
        }
        return domWrap;
    }
    // 当在游戏内页的时候，底部
    userFooter(){
        let dom;
        dom=[
            <div className='userFooter' key='userFooter'>
                <img className='userFooterHead' src = {require(`../../style/images/chess/touxiang/${this.props.user.ImagePath}.png`)}/>
                <Link to='/' className='userFooterName'>{this.getByteLen(this.props.user.username)}</Link>
                <div className='userFooterMoney'>
                    <Link to='/'>{this.userAmount(this.props.user.amount)}</Link>
                    <b onClick={()=>{window.actions.showChessModal(true,"ck","","10rem","6.5rem")}}></b>
                </div>      
            </div>
        ]
        return dom;
    }
    render(){
        return(
            <div className = 'userInfo'>
                {this.props.isFooter?this.userFooter():this.userIslogin()}
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
    }
)
export default connect(mapStateToProps)(UserBar)