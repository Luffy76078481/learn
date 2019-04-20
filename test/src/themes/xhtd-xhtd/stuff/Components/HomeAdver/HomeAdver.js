/**
 * xhtd-首页内容部分
 */
import React, {Component} from 'react';
import {Link,browserHistory} from 'react-router';
import {connect} from 'react-redux';
import "./HomeAdver.scss";

    class HomeAdver extends Component {
        constructor(props) {
            super(props);
            this.state = {
                zcNum:30000 + parseInt(Math.random() * 1000),
                zcSale:150000 + parseInt(Math.random() * 5000),
                howMany:20000000 + parseInt(Math.random() * 5000000),
                timer:null,
                mounted:false
            };
    }
    serversOpen(e) {
        e.preventDefault();
        if (e.target.id == 'test') {
            window.swal({
                title: "忘记密码",
                text: "联系在线客服协助修改密码",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "联系客服",
                showCancelButton: true,
                cancelButtonText: "关闭",
            },
                () => {
                    window.open(this.props.remoteSysConfs.online_service_link, 'servers', 'width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
                });
            return;
        }
        window.open(this.props.remoteSysConfs.online_service_link, 'servers', 'width=900,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=450,screenY=250');
        return false;
    }
    // 挂载
    componentWillMount(){
        clearInterval(this.state.timer),
        this.state.mounted = true;
    }
    // 销毁定时器
    componentWillUnmount(){
        clearInterval(this.state.timer)
    }
    // 挂载
    componentDidMount(){
        // 注册用户数据 
        if(this.state.mounted){
            this.state.timer = setInterval(()=>{
                let num1 = this.state.zcNum;
                let num2 = this.state.zcSale;
                let num3 = this.state.howMany;
                num1 += parseInt( Math.random() * 5);
                num2 += parseInt( Math.random() * 500);
                num3 += parseInt( Math.random() * 50000);
                this.setState({ 
                    zcNum:num1,
                    zcSale:num2,
                    howMany:num3
                })            
            },3000)  
        }        
    }
    render() {
        return (
            <div className='home_adver'>
                <div className='home_box'>
                    <div className='link'>
                        <Link to="/casino">
                            <div id='f1' className='div'></div>
                        </Link>
                        <Link to="/sport">
                            <div id='f2' className='div'></div>
                        </Link>
                        <Link to="/games">
                            <div id='f3' className='div'></div>
                        </Link>
                        <Link to="/bingo">
                            <div id='f4' className='div'></div>
                        </Link>
                        <div className='content_xhtd content'>
                            <div className='service'>
                                <div className='up'>
                                    <span>{ this.state.zcNum }</span>
                                    <div className='load'></div>
                                </div>
                                <div className='middle'>
                                    <span>{ this.state.zcSale }</span>
                                    <div className='load'></div>
                                </div>
                                <div className='bottom'>
                                    <span>{ this.state.howMany }</span>
                                </div>
                            </div>
                        </div>  
                        <div className='clear'></div>
                    </div>
                    <div className='clear'></div>
                    <div className='content2'>
                        <div>
                            <a className='cooperation' href="/agent.html?tab=Alliance" target="_blank"></a>
                            <Link className="custTo" to="/deposit"></Link>
                            {/* <Link className='indexpromotions' to="/promotions"></Link>    */}
                            <a className = "serverTo" href='javascript:void(0);' onClick={this.serversOpen.bind(this)}></a>                 
                        </div>
                        <div className='help'>
                            <a href="/agent.html?tab=AboutUs"  target="_blank">关于我们</a>
                            <a href="/agent.html?tab=ContactUs" target="_blank">联络我们</a>
                            <a href="/agent.html?tab=BetRule" target="_blank">责任博彩</a>
                            <a href="/agent.html?tab=Deposit" target="_blank">存款帮助</a>
                            <a href="/agent.html?tab=Wthdrawal" target="_blank">取款帮助</a>
                            <a href="/agent.html?tab=Faq" target="_blank">常见问题</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => (
    {
        // user : state.user,
        // gameCategories: state.game.gameCategories,
        // gameCounter: state.game.gameCounter,
        // games: state.game.games,
        // platforms: state.game.slot_platforms
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps, {})(HomeAdver);