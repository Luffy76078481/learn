/**
 * Created by sobi on 2017/5/18.
 */
import React, {Component} from 'react';

import {connect} from 'react-redux';
import Toggle from 'material-ui/Toggle';
import {SaveSystemConfigAction} from "../../../../actions/index";

// import {config} from "../../../../common/config";


class PreferencesPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            autoTransfer:this.props.systemConfig.autoTransfer,
            voice:this.props.systemConfig.voice
        };
    }

    onautoTransfer(){
        this.setState({autoTransfer: !this.state.autoTransfer});
    }

    onvoice(){
        this.setState({voice: !this.state.voice});
    }


    onSaveSystem(e){
        e.preventDefault();
        new SaveSystemConfigAction(this.state.autoTransfer,this.state.voice).fly();
        window.swal({
            title: "储存成功",
            type: "success",
            confirmButtonColor: "#c5841f",
            confirmButtonText: "OK",
        });
    }


    render() {

        const PreferencesPageIcon = window.r.get("PreferencesIcon");
        return (

        <div className="clearfix t20 member-content">
            <div className="c">
                <form style={{textAlign:'center'}} method="get" onSubmit={this.onSaveSystem.bind(this)}>
                    <div className="ggg member-border">
                        <div className="" style={PreferencesPageIcon.block} ref="autoTransfer">
                        {/* <Toggle /> */}
                            <Toggle
                                label="自动转帐"
                                defaultToggled={this.state.autoTransfer}
                                thumbStyle={PreferencesPageIcon.thumbOff}
                                trackStyle={PreferencesPageIcon.trackOff}
                                thumbSwitchedStyle={PreferencesPageIcon.thumbSwitched}
                                trackSwitchedStyle={PreferencesPageIcon.trackSwitched}
                                labelStyle={PreferencesPageIcon.labelStyle}
                                onToggle={this.onautoTransfer.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="ggg member-border">
                        <div className="" style={PreferencesPageIcon.block}>
                            <Toggle
                                ref="voice"
                                label="提示音"
                                defaultToggled={this.state.voice}
                                thumbStyle={PreferencesPageIcon.thumbOff}
                                trackStyle={PreferencesPageIcon.trackOff}
                                thumbSwitchedStyle={PreferencesPageIcon.thumbSwitched}
                                trackSwitchedStyle={PreferencesPageIcon.trackSwitched}
                                labelStyle={PreferencesPageIcon.labelStyle}
                                onToggle={this.onvoice.bind(this)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="htbtnlg w260 t20 btn-type">确认并提交</button>
                </form>
            </div>
        </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        systemConfig:state.systemConfig
    }
);

export default connect(mapStateToProps, {})(PreferencesPage);
