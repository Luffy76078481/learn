import React, {Component} from 'react';


class MyDatePicker extends Component {
    getValue() {
       if (!this.refs.date.value) {
           return "";
       }
       return this.refs.date.value + " 00:00:00";
    }

    componentDidMount() {
        window.$(this.refs.date).datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'yy/mm/dd',
            // maxDate:'%d',
            // minDate:'#F{$dp.$D(\'datepicker2\',{d:+0})}'
        });
    }

    render() {
        let className=this.props.className?this.props.className:"form-control"
        return <input className={className} placeholder={this.props.placeholder} ref="date" type="text"/>
    }



}

export default MyDatePicker;
