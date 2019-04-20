/**
 *  xhtd 省份选择组件
 */

import React, {Component} from 'react';
import {provinces} from "provincesJson";

class PlaceComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {selProvince:provinces[0]};

        this.getSelProvince = this.getSelProvince.bind(this);
        this.getSelCity = this.getSelCity.bind(this);
        this.getBranchName = this.getBranchName.bind(this);
    }
    renderProvinces() {
        var ret = [];
        for (var i = 0; i < provinces.length; i++) {
            var p = provinces[i];
            ret.push(
                <option key={i} value={p.name}>{p.name}</option>
            );

        }
        return ret;
    }
    renderCities() {
        var ret = [];
        for (var i = 0; i < this.state.selProvince.cities.length; i++) {
            var c = this.state.selProvince.cities[i];
            ret.push(
                <option key={i} value={c.name}>{c.name}</option>
            );

        }
        return ret;
    }
    onProvinceChanged(e) {
        this.setState({selProvince:provinces[e.target.selectedIndex]})
    }

    getSelProvince() {
        if (!this.refs.province) {
            return "";
        }
        return this.refs.province.value;
    }
    getSelCity() {
        if (!this.refs.city) {
            return "";
        }
        return this.refs.city.value;
    }
    getBranchName() {
        if (!this.refs.branchName) {
            return "";
        }
        return this.refs.branchName.value;
    }
    render() {
        return (
            <div>
                <div>
                    <div className="hlder">
                        <div className="lbl">开户省: </div>
                        <div className="custinput">
                            <select ref="province" onChange={this.onProvinceChanged.bind(this)}>
                                {this.renderProvinces()}
                            </select>
                        </div>
                    </div>
                    <div className="hlder">
                        <div className="lbl">开户市: </div>
                        <div className="custinput">
                            <select ref="city">
                                {this.renderCities()}
                            </select>
                        </div>
                    </div>
                    <div className="hlder">
                        <div className="lbl">开户支行：</div>
                        <div className="custinput"><input ref="branchName" type="text" placeholder="请输入开户支行名称"/></div>
                    </div>
                </div>
            </div>
        );
    }
}


export default PlaceComponent;