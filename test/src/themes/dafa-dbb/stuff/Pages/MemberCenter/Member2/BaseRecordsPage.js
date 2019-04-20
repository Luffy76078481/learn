/*
    DBB-记录查询与表单
 */

import React, {Component} from 'react';

class BaseRecordsPage extends Component {

    componentDidMount() {
        this.toPage();
    }
    onQuery(event) {
        event.preventDefault();
        this.toPage(0);
    }
    nextP() {
        if (this.props.records.pageNo == this.props.records.totalPage) {
            return null;
        }
        this.toPage(this.props.records.pageNo + 1);
    }
    preP() {
        if (this.props.records.pageNo <= 0) {
            return null;
        }
        this.toPage(this.props.records.pageNo - 1);
    }
    renderPage() {
        var ret = [];
        var invalidTag = false;
        for (var i = 1; i <= this.props.records.totalPage; i++) {
            if (i !== 1 && i !== this.props.records.totalPage && Math.abs(this.props.records.pageNo - i) >= 3) {
                invalidTag = true;
                continue;
            }
            if (invalidTag) {
                ret.push(
                    <li key={"_" + i}><a href="javascript:void(0)">...</a></li>
                )
                invalidTag = false;
            }
            ret.push(
                <li key={i}><a onClick={this.toPage.bind(this, i-1)}
                       className={i === this.props.records.pageNo ? "active" : ""} href="javascript:void(0)">{i}</a>
                </li>
            )
        }
        return ret;
    }
    renderQuery() {
        return null;
    }
    render() {
        return (
            <div>
                <div className="fnc_holder">
                    <form onSubmit={this.onQuery.bind(this)}>
                        {this.renderQuery()}
                        <div style={{marginLeft: "1rem"}}>
                            <button type="submit" className="btn btn-primary">查询</button>
                        </div>
                    </form>
                </div>
                <div className="divider"></div>
                <div className="table-responsive bethistotbl">
                    <table className="table">
                        <thead>
                        {this.renderHeader()}
                        </thead> 
                        <tbody>
                        {this.renderRecords()}
                        </tbody>
                    </table>
                </div>
                <div className="tblbottom">

                    <div className="float_left">从<span>{this.props.records.startRowIndex}</span>到<span>
                        {this.props.records.endRowIndex}</span>条记录, 总计
                        <span>{this.props.records.total}</span>条记录.
                    </div>
                    <ul className="custpagination float_right">
                        <li><a href="javascript:void(0)" onClick={this.preP.bind(this)}>上一页</a></li>
                        {this.renderPage()}
                        <li><a href="javascript:void(0)" onClick={this.nextP.bind(this)}>下一页</a></li>
                    </ul>
                    <div className="clearfix"></div>
                </div>


            </div>
        );
    }
}
export default BaseRecordsPage;