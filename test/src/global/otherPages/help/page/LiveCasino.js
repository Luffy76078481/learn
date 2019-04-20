/**
 * Created by b3 on 2017/7/3.
 */

import React, {Component} from 'react';
import {config} from "globalConfig";



class LiveCasino extends Component {



    render() {
        const appName = config.appName;
        return (
            <div id="liveCasino" className="contents">
                <div className="helpContent">
                    <h3 className="title1">娱乐场</h3>
                    <ul className="contentul">
                        <li><a href="#35">1、返奖率？</a></li>
                        <li><a href="#36">2、{appName}线上娱乐场有哪些真人平台？</a></li>
                    </ul>
                </div>

                <h4 className="title2" id="35">1.什么是返奖率？<a href="#top" className="ReturnTop">返回顶部</a> </h4>

                <div className="helpContent">
                    <p>返奖率<br />
                        <br />
                        <div className="address">
                            返奖率，或称之为返奖百分比，是按照一个游戏的所有投注金额的某个百分比返还给玩家的奖金。<br />下列表格中提供了每个游戏的返奖百分比。<br />这些数值均为数学计算值，是基于游戏设置，包括所有可能出现的赛果，以及其他方面的影响，例如玩家的数量等，或受游戏情况变化影响。<br />这些数值也基于记录列出，不会受之后的派彩 影响。
                        </div> <table className="tab-TFinfo" cellPadding="0" cellSpacing="0" style={{border:'2px solid',textAlign:'center'}}>
                            <tr className="tab-tr-red">
                                <td width="263"  style={{borderRight: '3px solid'}} className="paddding10">游戏类别</td>
                                <td width="160"  style={{align:"center",borderRight: '3px solid',}}><strong>游戏</strong></td>
                                <td width="217" style={{align:"center",borderRight: '3px solid'}}>返奖百分比</td>
                            </tr>
                            <tr className="tab-tr-red">
                                <td style={{border:'2px solid'}} className="paddding10" rowSpan="4">真人荷官游戏</td>
                                <td style={{align:"center",border:'2px solid'}}>百家乐</td>
                                <td style={{align:"center",border:'2px solid'}}>98.75%</td>
                            </tr>
                            <tr>
                                <td style={{align:"center",border:'2px solid'}}>龙虎</td>
                                <td style={{align:"center",border:'2px solid'}}>98.90%</td>
                            </tr>
                            <tr>
                                <td style={{align:"center",border:'2px solid'}}>轮盘</td>
                                <td style={{align:"center",border:'2px solid'}}>97.30%</td>
                            </tr>
                            <tr>
                                <td style={{align:"center",border:'2px solid'}}>骰宝</td>
                                <td style={{align:"center",border:'2px solid'}}>90.63%</td>
                            </tr>
                        </table></p>
                </div>

                <h4 className="title2" id="36">2. {appName}线上娱乐场有哪些真人娱乐平台？<a href="#top" className="ReturnTop">返回顶部</a> </h4>
                <div className="helpContent">
                    <div className="address">
                        {appName}线上娱乐场的真人娱乐平台主要以{appName}直营平台为主、同时也通过技术合作，<br />引进了世界领先的真人娱乐平台。<br />总共八大平台：PT真人、MG真人、AG、BBIN真人、HG真人、EA真人、188真人平台以及直营平台。<br />{appName}线上娱乐场的宗旨主要为大家打造亚洲最佳娱乐平台。
                    </div>
                </div>
            </div>


        )
    }
}



export default (LiveCasino);


