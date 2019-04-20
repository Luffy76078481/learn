import React, {Component} from 'react';
import "./fuckTime.scss"

class FuckTime extends Component{

    constructor(){
        super();
        this.state = {
            year:1,
            month:1,
            day:1,
            week:1,
            hour:1,
            mint:1,
            nowDay:1,
            shwoDate:false,
            inputTime:"",
        }
    }

   

    componentWillMount(){
        this.mathNumber();
    }

    shwoDate(shwoDate){
        this.setState({shwoDate});
    }

    inputTime(e){
        e.preventDefault();
        let time = this.refs.inputTime.value?this.refs.inputTime.value:"00:00";
        this.setState({
            inputTime:`${this.state.year}-${this.state.month+1}-${this.state.day} ${time}:00`
        })
        this.shwoDate(false)
    }

    getValue() {
        if (!this.state.inputTime) {
            return "";
        }
        return this.state.inputTime;
     }

    render(){
        return(
            <div className="fucktime-box">
                <input ref="date" type="text" onClick={this.shwoDate.bind(this,true)} value={this.state.inputTime}/>
                <div className="fucktime-date-box" style={{"display":this.state.shwoDate?"block":"none"}} >
                    <div className="fucktime-shadom" onClick={this.shwoDate.bind(this,false)}></div>
                    <p className="fucktime-years">{this.state.year}</p>
                    <p className="fucktime-month">{(this.state.month+1)+"月"+this.state.day+"日  "+"星期"+this.state.week}</p>
                    <p className="fucktime-chose-box">
                        <span className="fucktime-chose-left" onClick={this.lastMonth.bind(this)}>《</span>
                        {this.state.year+"年"+(this.state.month+1)+"月"}
                        <span className="fucktime-chose-right"  onClick={this.nextMonth.bind(this)}>》</span>
                    </p>
                    <div className="fucktime-datebox">
                        {this.renderWeek()}
                        {this.renderDay()}
                    </div>
                    <div className='timeButton'>
                        <label>时分：</label>
                        <input type="time" ref="inputTime" defaultValue='00:00' id='hourMinEnter'/>
                        <br/>
                        <button onClick={this.inputTime.bind(this)}>确定</button>
                        <button onClick={this.shwoDate.bind(this,false)}>取消</button>
                    </div>
                </div>
            </div>
        )    
    }
    lastMonth(){
        if(this.state.month==0){
            this.mathNumber(this.state.year-1,11,1);
        }else{
            this.mathNumber(this.state.year,this.state.month-1,1);
        } 
    }
    nextMonth(){
        if(this.state.month==12){
            this.mathNumber(this.state.year+1,0,1);
        }else{
            this.mathNumber(this.state.year,this.state.month+1,1);
        }
       
    }
    renderWeek(){
        let week = ["一","二","三","四","五","六","日"];
        let weekList=[]
        for(let i=0;i<week.length;i++){
            weekList.push(
                <div key={i} className="fucktime-dateborder fucktime-dateweek">
                    {week[i]}
                </div>
            )
        }
        return weekList;
    }
    changeDay(dayNum){
        this.mathNumber(this.state.year,this.state.month,dayNum);
    }
    renderDay(){
        let firstDay = new Date(this.state.year, this.state.month, 1).getDay();//获取当前月第一天是星期几
        let lastDay = new Date(this.state.year, this.state.month+1, 0).getDate();//获取当前月一共有多少天    实际下表+1
        let dayList = [];
        let dayNum=1;
        if(firstDay == 0){
            firstDay = 7;
        }
        for(let i=0;i<lastDay+firstDay-1;i++){
            if(i<firstDay-1){
                dayList.push(
                    <div key={i} className="fucktime-dateborder">
                    -
                    </div>
                )
            }else{
                dayList.push(
                    <div key={i} className={`fucktime-dateborder ${this.state.nowDay == dayNum?"fucktime-dateactive":""}`} onClick={this.changeDay.bind(this,dayNum)}>
                        {dayNum}
                    </div>
                )
                dayNum++;
            }
        }
        return dayList
    }

    mathNumber(y=null,m,d){
        let myDate = new Date();//获取系统当前时间
        if(y)myDate.setFullYear(y,m,d)//设置指定日期
        let year = myDate.getFullYear(); //获取完整的年份
        let month = myDate.getMonth(); //获取当前月份(0-11,0代表1月)
        let day = myDate.getDate(); //获取当前日(1-31)
        let week = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
        let hour = myDate.getHours(); //获取当前小时数(0-23)
        let mint = myDate.getMinutes(); //获取当前分钟数(0-59)
        
        // myDate.toLocaleDateString(); //获取当前日期
        // var mytime=myDate.toLocaleTimeString(); //获取当前时间
        // myDate.toLocaleString( ); //获取日期与时间
       
        if(y){
            this.setState({
                year,month,day,nowDay:day
            });
        }else{
            this.state.year = year;
            this.state.month = month;
            this.state.day = day;
            this.state.nowDay = day;
        }
        switch(week){
            case 0:
            this.state.week = "天";
            break;
            case 1:
            this.state.week = "一";
            break;
            case 2:
            this.state.week = "二";
            break;
            case 3:
            this.state.week = "三";
            break;
            case 4:
            this.state.week = "四";
            break;
            case 5:
            this.state.week = "五";
            break;
            case 6:
            this.state.week = "六";
            break;
        }
    }
}
export {
    FuckTime
}
