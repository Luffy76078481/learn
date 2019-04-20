import React, {Component} from 'react';
import PropTypes from 'prop-types'

class PageBar extends Component {
    static propTypes = {
        page: PropTypes.object.isRequired,
        toPage: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    renderPage() {
        var ret = [];
        var invalidTag = false;
        for (var i = 1; i <= this.props.page.totalPage; i++) {
            if (i !== 1 && i !== this.props.page.totalPage && Math.abs(this.props.page.pageNo - i) >= 3) {
                invalidTag = true;
                continue;
            }
            if (invalidTag) {
                ret.push(
                    <a key={"_" + i} className="wraperl-xs pi" href="javascript:void(0)">...</a>
                )
                invalidTag = false;
            }
            if(this.props.page.pageNo == i){
                ret.push(
                    <a key={i} onClick={this.props.toPage.bind(this, i-1)}
                       className={i === this.props.page.pageNo ? "wraperl-xs pi active" : "wraperl-xs pi"}
                       href="javascript:void(0)"><strong>{i}</strong></a>
                )
            }else {
                ret.push(
                    <a key={i} onClick={this.props.toPage.bind(this, i-1)}
                       className={i === this.props.page.pageNo ? "wraperl-xs pi active" : "wraperl-xs pi"}
                       href="javascript:void(0)">{i}</a>
                )
            }
        }
        return ret;
    }
    nextP(){
        if(this.props.page.pageNo < this.props.page.totalPage ){
            this.props.toPage(this.props.page.pageNo + 1);
        }
    }
    preP(){
        if(this.props.page.pageNo > 1 ){
            this.props.toPage(this.props.page.pageNo - 1);
        }
    }
    firstP(){
        if(this.props.page.pageNo != 1){
            this.props.toPage();
        }
    }
    lastP(){
        if(this.props.page.pageNo != this.props.page.totalPage){
            this.props.toPage(this.props.page.totalPage);
        }
    }

    render() {
        return  (
            <div className="wraperh-md clearfix f14">
                <div className="fl">                                
                    从<span className="wraperl-xs">{this.props.page.startRowIndex}</span>
                    到<span className="wraperl-xs">{this.props.page.endRowIndex}</span>
                    条记录，总计<span className="wraperl-xs">{this.props.page.total}</span>
                    条记录</div>
                <div className="fr">
                    <a href="javascript:void(0)" className="wraperl-xs" onClick={this.firstP.bind(this)}>首页</a>
                    <a href="javascript:void(0)" className="wraperl-xs" onClick={this.preP.bind(this)}>上一页</a>
                    {this.renderPage()}
                    <a href="javascript:void(0)" className="wraperl-xs" onClick={this.nextP.bind(this)}>下一页</a>
                    <a href="javascript:void(0)" className="wraperl-xs" onClick={this.lastP.bind(this)}>末页</a>
                </div>
            </div>

        );
    }
}

export default PageBar;