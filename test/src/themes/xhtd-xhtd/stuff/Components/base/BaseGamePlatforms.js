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
        this.submitState = true;// 防止多次提交
        this.transferAllOutState = true;// 防止多次提交
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
            setTimeout(()=>{
                this.submitState = true;
            },2000) 
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
            setTimeout(()=>{
                this.submitState = true;
            },2000) 
        }, "transfer_in_" + platformId);
    }
    // 一键转出
    transferAllOut(){
        let _this = this;
        if(!this.transferAllOutState) return;
        let transferArr=[];
        for(let i=0; i<this.props.game.platforms.length;i++){
            let platform = this.props.game.platforms[i];
            if(platform.Balance && platform.Balance>=1){
                transferArr.push(platform);
            }
        }
        if(transferArr.length == 0) {
            let obj = {};
            obj.type="message";
            obj.msgType = "error";
            obj.title = "错误";
            obj.message = "当前没有可转出的余额";
            var d = new Date();
            obj.created = d.format("yyyy/MM/dd hh:mm:ss");
            obj.startTime = d.getTime();
            window.actions._dispatch(obj)
            this.transferAllOutState = true;
            return
        }else{
            this.transferAllOutState = false;
        }
        for(let i=0; i<transferArr.length;i++){
            let platform = transferArr[i];
            let index = i+1;
            new ApiTransferAction (platform.ID,"out",parseInt(platform.Balance)).fly((resp)=>{
                if (resp.StatusCode === 0) {
                    _this.reload(platform.ID);
                }
                if( index == transferArr.length ){
                    setTimeout(()=>{
                        _this.transferAllOutState = true;
                    },2000)            
                }
            }, "transfer_" + platform.ID);
        }
    }
}

