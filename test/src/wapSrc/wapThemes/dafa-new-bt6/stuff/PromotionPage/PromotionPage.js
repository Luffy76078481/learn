import React, {Component} from 'react';
import {NavBar, Icon, List, Badge, Toast, ListView, Flex} from 'antd-mobile';
import {_dispatch} from "globalAction";
import {config} from "globalConfig";
import {browserHistory, Link} from 'react-router';
import connect from "react-redux/es/connect/connect";
import * as cache from "CacheHelper";
import './Promotion.scss';

let pageIndex = 0;
let listData = [];

class PromotionPage extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            tabLoading: false,
            dataSource: dataSource.cloneWithRows({}),
            isLoading: false,
            hasMore: true,
            down: true,
        }
    }

    componentWillMount() {
        pageIndex = 0;
        listData = [];
        this.getList();
    }

    openSildeBar() {
        this.props.params.openSilde()
    }

    onEndReached = () => {
        if (!this.state.hasMore || this.state.isLoading) return false;
        this.setState({isLoading: true});
        this.getList();
    };

    readNew(id) {
        let tabsType = this.state.tabsType;
        let isReadNews = cache.get('isReadNews') ? cache.get('isReadNews') : "";
        cache.set('isReadNews', isReadNews + id + ',');
        _dispatch({type: "changeReadNewsNum", tabsType: 0});

        browserHistory.push('/read/0&' + id + '&goBack')
    }

    getList = () => {
        let _this = this;
        // Toast.loading('数据加载中,请稍后...',300);
        new window.actions.ApiQueryPromotionsAction(pageIndex,30).fly(resp => {
            // Toast.hide();
            if (resp.StatusCode == 0) {
                if (pageIndex == 0) {
                    resp.List.unshift(//流水王和大转盘置顶
                        {
                            id: "statement",
                            linkTo: "hotActivity/statement",
                            Title: "流水王",
                            type: "link"
                        }, {
                            id: "lotto",
                            linkTo: "hotActivity/lotto",
                            Title: "大转盘",
                            type: "link"
                        }
                    )
                }
                pageIndex++;
                listData = listData.concat(resp.List);
                _this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(listData),
                    hasMore: resp.Count > pageIndex * 30,
                    isLoading: false,
                    tabLoading: false
                });
            }
        })
    }

    renderList() {
        const _this = this;
        let isReadNews = cache.get('isReadNews') ? cache.get('isReadNews') : "";
        if (this.state.tabLoading) {
            return (
                <div className="dataLoading"><i className="icon-spinner icon-spin"></i> 玩命加载中...</div>
            )
        }
        const row = (rowData) => {
            if (rowData.type == "link") {
                return (
                    <List.Item className="listItem">
                        <Link to={rowData.linkTo}>
                            <img className={"promoImg " + rowData.id}/>
                            {rowData.Title}
                        </Link>
                    </List.Item>
                )
            } else {
                return (
                    <List.Item onClick={_this.readNew.bind(_this, rowData.Id)} className="listItem">
                        <img className="promoImg" src={config.devImgUrl + rowData.Img}/>
                        {
                            isReadNews.indexOf(rowData.Id + ',') > -1 ? "" : <Badge text="新" hot className="Badge"/>
                        }
                        {rowData.Title}
                        <small className="time">{rowData.StartTime.slice(0, 10)}</small>
                    </List.Item>
                )
            }
        };
        const renderFooter = () => {
            let con;
            if (_this.state.hasMore) {
                con = (<div className="dataLoading"><i className="icon-spinner icon-spin"></i> 玩命加载中...</div>)
            } else {
                con = (<div style={{textAlign: 'center', lineHeight: '2rem'}}>我没有更多数据了! (ㄒoㄒ)~</div>)
            }
            return con;
        };
        return (
            <ListView
                dataSource={_this.state.dataSource}
                className="myListView"
                renderFooter={renderFooter}
                renderRow={row}
                pageSize={30}//每次事件循环（每帧）渲染的行数
                scrollRenderAheadDistance={200}//当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
                onEndReached={this.onEndReached.bind(this)}//当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用
                onEndReachedThreshold={100}//调用onEndReached之前的临界值，单位是像素
            />
        )
    }

    render() {
        return (
            <div className="promotion">
                <NavBar
                    mode="light"
                    icon={<Icon type="ellipsis"/>}
                    onLeftClick={this.openSildeBar.bind(this)}
                >优惠活动</NavBar>
                <div className="scroll-content">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs,
        notices: state.notices,
        sitemsg: state.sitemsg.sitemsgs,
        unread: state.sitemsg.unread,
        noticesUnRead: state.noticesUnRead,
        promoUnRead: state.promotions.promoUnRead,
        promotions: state.promotions.promotions.rows
    }
);

export default connect(mapStateToProps)(PromotionPage)