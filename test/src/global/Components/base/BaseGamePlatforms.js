/**
 * 一键，转入，转出
 */
import React, {Component} from 'react';
import {ApiGamePlatformsBalanceAction,ApiTransferAction,ApiPlayerInfoAction} from "globalAction";
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
        let _this = this;
        if(!this.transferAllOutState) return;
        let transferArr=[];
        for(let i=0; i<this.props.platforms.length;i++){
            let platform = this.props.platforms[i];
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
                if( index == transferArr.length){
                    _this.transferAllOutState = true;
                }
            }, "transfer_" + platform.ID);
        }
    }
}

