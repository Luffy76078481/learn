import React, {Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
// import {connect} from 'react-redux';
// import RaisedButton from 'material-ui/RaisedButton';

var _warning = require('warning');
var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function  dateTimeFormat(locale,options){
    var dayAbbreviation = ['日', '一', '二', '三', '四', '五', '六'];
    var dayList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var monthList = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    var monthLongList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

    this.format = function (date) {
        if (options.month === 'short' && options.weekday === 'short' && options.day === '2-digit') {
            return monthList[date.getMonth()] + date.getDate() + '日' + ' ' + dayList[date.getDay()];
        } else if (options.day === 'numeric' && options.month === 'numeric' && options.year === 'numeric') {
            return date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + '日';
        } else if (options.month === 'long' && options.year === 'numeric') {
            return date.getFullYear() + '年' + monthList[date.getMonth()];
        } else if (options.weekday === 'narrow') {
            return dayAbbreviation[date.getDay()];
        }else if (options.year === 'numeric') {
            return date.getFullYear().toString();
        }else if (options.day === 'numeric') {
            return date.getDate();
        }else {
            process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'Wrong usage of DateTimeFormat') : void 0;
        }
    };

}

export default class MyDatePicker extends Component {
    constructor(props){
        super(props);
    }
    handleChange = (e,date) => {
        this.props.handleGet(date);
    }
    getValue() {
        var v = this.refs.date.state.date;
        if (!v) return null;
        return v.format("yyyy/MM/dd 00:00:00");
        // return <DatePicker formatDate={this.formatDate} />;
    }
    render() {  // ref={ this.props.ref ||"date"}
        let {beginDate} = this.props;
        let earliestDate = new Date(new Date().getTime() - 7*24*60*60*1000);
        let latestDate = new Date();
        
        return  <DatePicker 
                    ref={ this.props.ref ||"date"}
                    title="DatePick"
                    hintText={beginDate}
                    container="inline"
                    className={this.props.className +" myDatePick"}
                    // dialogClassName="myDatePick"
                    // calendarClassName="myDatePick"
                    // wrapperClassName="myDatePickxxx"
                    style={{width: "200px"}}
                    mode="portrait"
                    textFieldStyle={{marginLeft:'1rem',textDecoration:'none',width: "200px", color:"#FFF",borderStyle:'none',height:"40px"}}
                    okLabel='确定'
                    cancelLabel='取消'
                    autoOk
                    minDate = {earliestDate}
                    maxDate = {latestDate}
                    DateTimeFormat={dateTimeFormat}
                    onChange = {this.handleChange}
                />
    }
}