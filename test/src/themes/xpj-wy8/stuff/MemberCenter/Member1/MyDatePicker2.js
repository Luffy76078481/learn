import React, {Component} from 'react';


class MyDatePicker extends Component {
    getValue() {
       if (!this.refs.date.value) {
           return "";
       }
       return this.refs.date.value + " 00:00:00";
    }

    componentDidMount() {
        window.$(this.refs.date).datepicker({changeMonth: true,changeYear: true,dateFormat: 'yy/mm/dd'});
    }

    render() {
        return <input className="form-control" placeholder={this.props.placeholder} ref="date" type="text"/>
    }



}

export default MyDatePicker;
