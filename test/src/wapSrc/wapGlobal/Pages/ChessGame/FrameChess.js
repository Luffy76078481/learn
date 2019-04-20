import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";

class Frame extends Component{
    constructor(props){
        super(props);
        this.state={
            showShadom:false
        }
    }
    //添加mate标签
    addMetas(){
        function addMeta(name,content){
            let meta = document.createElement('meta');
            meta.content=content;
            meta.name=name;
            document.getElementsByTagName('head')[0].appendChild(meta);
        }
        // 禁止将页面中的一连串数字识别为电话号码、并设置为手机可以拨打的一个连接
        addMeta("telephone=no","format-detection")
        //  Laya的屏幕匹配
        addMeta("laya","portrait")
        // 删除默认的苹果工具栏和菜单栏
        addMeta("apple-mobile-web-app-capable","yes")
        // 添加到主屏后的标题 ，全屏显示
        addMeta("apple-mobile-web-app-title","true")
        addMeta("apple-touch-fullscreen","yes")
        // QQ浏览器强制竖屏，全屏
        addMeta("x5-fullscreen","true")
        addMeta("x5-orientation","portrait")
        // uc强制竖屏 UC浏览器强制全屏
        addMeta("screen-orientation","portrait")
        addMeta("full-screen","true")
        // 360浏览器
        addMeta("360-fullscreen","true")
    }
    componentDidMount(){
        
        window.Util.convertPixel() // rem换算
        window.onresize = window.Util.convertPixel; // 窗口事件
        if(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) != 0){
            window.addEventListener("orientationchange", function() {
                window.Util.changeOrientation()
            }, false);
        } 
        if(window.orientation === 0){//提示横屏
            this.setState({
                showShadom:true
            })
            setTimeout(() => {
                this.setState({
                    showShadom:false
                })
            }, 3000);
        }
    }
    componentWillMount(){
        this.addMetas()
    }
    render(){
        const ChessPop = window.r.get("ChessPop");
        return (
            <div>
                <div className="rotatingPage" id="rotatingPage" ref="rotatingPage">
                    {
                        React.Children.map(this.props.children,function(child,index){      
                            return (<div key={index} className = "content">{child}</div>)
                        })
                    }
                    {
                        (!!this.props.user.token && !!this.props.user.ImagePath) && <ChessPop/>
                    }
                    {
                        this.state.showShadom && <div className="chessGlobe"><div></div></div>
                    }
                    
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
    }
)

export default connect(mapStateToProps)(Frame)