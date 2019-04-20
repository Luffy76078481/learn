/*
    DBB※一键转出
 */

import React, {Component} from 'react';
import {ApiGamePlatformsBalanceAction,ApiTransferAction,ApiPlayerInfoAction} from "globalAction";
var clickFlag = false; // 状态锁

export class BaseGamePlatforms extends Component {
    constructor(props) {
        super(props);
        this.reload();
        this.submitState = true;//防止多次提交
        this.transferAllOutState = true;
    }
    reload(platformsId) {
        new ApiPlayerInfoAction().fly();
        new ApiGamePlatformsBalanceAction().fly(platformsId);
    }
    transferIn(platformId){
        if(!this.submitState) return;
        var  total = parseInt(this.props.user.amount||0);
        if (!total) {
            return;
        }
        this.submitState = false;
        new ApiTransferAction (platformId,"in", total).fly((resp)=>{
            if (resp.StatusCode === 0) {
                this.reload(platformId);
            }
            this.submitState = true;
        }, "transfer_in_" + platformId);
    }
    transferOut(platformId){
        if(!this.submitState) return;
        var  total = parseInt(this.props.user.amount||0);
        if (!total) {
            return;
        }
        this.submitState = false;
        new ApiTransferAction (platformId,"out", parseInt(total)).fly((resp)=>{
            if (resp.StatusCode === 0) {
                this.reload(platformId);
            }
            this.submitState = true;
        }, "transfer_in_" + platformId);
    }
    transferAllOut(){
        // 状态锁
        let _this = this;
        if(clickFlag){
            return
        }else{
            clickFlag =true;
        }
        for(var i=0; i<this.props.game.platforms.length;i++){
            var platform = this.props.game.platforms[i];
            if(platform.Balance){
                new ApiTransferAction (platform.ID,"out", platform.Balance).fly((resp)=>{
                    if (resp.StatusCode === 0) {
                        _this.reload(platform.ID);
                        setTimeout(()=>{
                            clickFlag = false;
                        },2000)  
                    }
                    else{
                        setTimeout(()=>{
                            clickFlag = false;
                        },2000)  
                    }
                }, "transfer_" + platform.ID);
            }
        }
    }
}

