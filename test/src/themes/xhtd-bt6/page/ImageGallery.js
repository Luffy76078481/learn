/**
 * Created by xm on 2017/6/23.
 */
require("../../../vendors/js/app/flux");
import React, { Component } from 'react';

import { connect } from 'react-redux';
import "./style.scss";

var idCounter = 1;
class ImageGallery extends Component {
    constructor(props) {
        super(props);
        this.id = "ig_" + idCounter;
        idCounter++;
        this.state = { imgs: []};
    }
    componentDidMount() {
        new window.actions.ApiImageAction(this.props.type).fly(resp=>{
            if (resp.status === 0) {
                this.setState({imgs: resp.page.content});
                setTimeout(()=>{
                    window.f = new flux.slider('#3d-slider', {
                        pagination: false,
                        controls: false,
                        transitions: ['explode', 'tiles3d', 'bars3d'],
                        autoplay: true,
                        delay: 10000
                    });
                }, 100)
            }
        }, this.id);

    }

    prev(){
        if(window.f){
            window.f.prev();
        }
    }
    next(){
        if(window.f){
            window.f.next();
        }
    }
    render() {
        return (
            <div className="image-slider-2">
                <div id="3d-slider" style={{height: this.props.height, width: this.props.width}}  >
                    {
                        this.state.imgs.length && this.state.imgs.map(item => {
                            return (<img key={item.id} src={item.imageUrl}/>)
                        })
                    }
                </div>
                <div className="prev" onClick={this.prev.bind(this)}></div>
                <div className="next" onClick={this.next.bind(this)}></div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {

    }
);

export default connect(mapStateToProps)(ImageGallery)