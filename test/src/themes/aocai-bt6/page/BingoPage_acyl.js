/**
 * Created by xm on 2017/5/8.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import "./css/bingo_acyl.scss"

class BingoPage extends Component {
    constructor (props){
        super();
    }
    
    onClickGame(platform_id) {
        let parma = {
            GamePlatform:platform_id,
            GameType:'Lottery',//Trueman
            IsMobile:false,
            IsDemo:false,
        }
		let windowOpen = window.Util.windowOpen('Bingo');
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
				let gameLink = res.GameLoginUrl;
				windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }  
    render() {
        const ImageGallery = window.r.get("ImageGallery");
        const options = window.r.props("ImageGallery");
		const height = options.bingoHeight || options.height || "170px";
        return (
            <article id="bingo">
                <div className="banner">
                    <ImageGallery width="100%" height={height} type="bingo_banner_imgs" imgtype='banner'></ImageGallery>
                </div>
                <div className="lottery-content-module ">
					<div className="contentbg">
						<div className="content">
							<div className="">
								<div className="listBox">
									<div className="lotto">
										<div className="lottoimg lottoimg_BJ28">
										</div>
										<div className="lotto-left" onClick={this.onClickGame.bind(this,'CG')}>
											<div className="txt">
												北京28
											</div>
											<div className="into">
											</div>
											<div className="rule">
												{/* <a className="rule-a" href="/help.html?game=%E5%8C%97%E4%BA%AC28" target="_blank">游戏规则</a> */}
											</div>
										</div>
									</div>
									<div className="lotto">
										<div className="lottoimg lottoimg_JND28">
										</div>
										<div className="lotto-left" onClick={this.onClickGame.bind(this,'CG')}>
											<div className="txt">
												加拿大28
											</div>
											<div className="into">
											</div>
											<div className="rule">
												{/* <a class="rule-a" href="/help.html?game=%E5%8A%A0%E6%8B%BF%E5%A4%A728" target="_blank">游戏规则</a> */}
											</div>
										</div>
									</div>
									<div className="lotto">
										<div className="lottoimg lottoimg_LHC">
										</div>
										<div className="lotto-left" onClick={this.onClickGame.bind(this,'CG')}>
											<div className="txt">
												六合彩
											</div>
											<div className="into">
											</div>
											<div className="rule">
												{/* <a class="rule-a" href="/help.html?game=%E5%85%AD%E5%90%88%E5%BD%A9" target="_blank">游戏规则</a> */}
											</div>
										</div>
									</div>
									<div className="lotto">
										<div className="lottoimg lottoimg_CQSSC">
										</div>
										<div className="lotto-left" onClick={this.onClickGame.bind(this,'CG')}>
											<div className="txt">
												重庆时时彩
											</div>
											<div className="into">
											</div>
											<div className="rule">
												{/* <a class="rule-a" href="/help.html?game=%E9%87%8D%E5%BA%86%E6%97%B6%E6%97%B6%E5%BD%A9" target="_blank">游戏规则</a> */}
											</div>
										</div>
									</div>
									<div className="lotto">
										<div className="lottoimg lottoimg_SELF_JSSCPK10">
										</div>
										<div className="lotto-left" onClick={this.onClickGame.bind(this,'CG')}>
											<div className="txt">
												射手赛车
											</div>
											<div className="into">
											</div>
											<div className="rule">
												{/* <a class="rule-a" href="/help.html?game=%E6%9E%81%E9%80%9F%E8%B5%9B%E8%BD%A6" target="_blank">游戏规则</a> */}
											</div>
										</div>
									</div>
									<div className="lotto">
										<div className="lottoimg lottoimg_SELF_LFC">
										</div>
										<div className="lotto-left" onClick={this.onClickGame.bind(this,'CG')}>
											<div className="txt">
												天秤二分彩
											</div>
											<div className="into">
											</div>
											<div className="rule">
												{/* <a class="rule-a" href="/help.html?game=%E4%B8%A4%E5%88%86%E5%BD%A9" target="_blank">游戏规则</a> */}
											</div>
										</div>
									</div>
									<div className="lotto">
										<div className="lottoimg lottoimg_SELF_FFC">
										</div>
										<div className="lotto-left" onClick={this.onClickGame.bind(this,'CG')}>
											<div className="txt">
												腾讯分分彩
											</div>
											<div className="into">
											</div>
											<div className="rule">
												{/* <a class="rule-a" href="/help.html?game=%E5%88%86%E5%88%86%E5%BD%A9" target="_blank">游戏规则</a> */}
											</div>
										</div>
									</div>
									<div className="lotto">
										<div className="lottoimg lottoimg_XJSSC">
										</div>
										<div className="lotto-left" onClick={this.onClickGame.bind(this,'CG')}>
											<div className="txt">
												新疆时时彩
											</div>
											<div className="into">
											</div>
											<div className="rule">
												{/* <a class="rule-a" href="/help.html?game=%E6%96%B0%E7%96%86%E6%97%B6%E6%97%B6%E5%BD%A9" target="_blank">游戏规则</a> */}
											</div>
										</div>
									</div>
									<div className="lotto">
										<div className="lottoimg lottoimg_SELF_WFC">
										</div>
										<div className="lotto-left" onClick={this.onClickGame.bind(this,'CG')}>
											<div className="txt">
												台湾 28
											</div>
											<div className="into">
											</div>
										</div>
									</div>
									<div className="lotto">
										<div className="lottoimg lottoimg_GDKLSF">
										</div>
										<div className="lotto-left" onClick={this.onClickGame.bind(this,'CG')}>
											<div className="txt">
												体彩 P3P5
											</div>
											<div className="into">
											</div>
										</div>
									</div>
									<div className="lotto">
										<div className="lottoimg lottoimg_CQKLSF">
										</div>
										<div className="lotto-left" onClick={this.onClickGame.bind(this,'CG')}>
											<div className="txt">
												双鱼十一选五
											</div>
											<div className="into">
											</div>
										</div>
									</div>
									<div className="lotto">
										<div className="lottoimg lottoimg_GXK3">
										</div>
										<div className="lotto-left" onClick={this.onClickGame.bind(this,'CG')}>
											<div className="txt">
												福彩 3D
											</div>
											<div className="into">
											</div>
											<div className="rule">
												{/* <a class="rule-a" href="/help.html?game=%E5%B9%BF%E8%A5%BF%E5%BF%AB3" target="_blank">游戏规则</a> */}
											</div>
										</div>
									</div>
									<div className="lotto">
										<div className="lottoimg lottoimg_AHK3">
										</div>
										<div className="lotto-left" onClick={this.onClickGame.bind(this,'CG')}>
											<div className="txt">
												北京幸运 28
											</div>
											<div className="into">
											</div>
											<div className="rule">
												{/* <a class="rule-a" href="/help.html?game=%E5%AE%89%E5%BE%BD%E5%BF%AB3" target="_blank">游戏规则</a> */}
											</div>
										</div>
									</div>
									<div className="lotto">
										<div className="lottoimg lottoimg_JSK3">
										</div>
										<div className="lotto-left" onClick={this.onClickGame.bind(this,'CG')}>
											<div className="txt">
												江苏快3
											</div>
											<div className="into">
											</div>
											<div className="rule">
												{/* <a class="rule-a" href="/help.html?game=%E6%B1%9F%E8%8B%8F%E5%BF%AB3" target="_blank">游戏规则</a> */}
											</div>
										</div>
									</div>
									<div className="lotto">
										<div className="lottoimg lottoimg_FC3D">
										</div>
										<div className="lotto-left" onClick={this.onClickGame.bind(this,'CG')}>
											<div className="txt">
												福彩3D
											</div>
											<div className="into">
											</div>
											<div className="rule">
												{/* <a class="rule-a" href="/help.html?game=%E7%A6%8F%E5%BD%A93D" target="_blank">游戏规则</a> */}
											</div>
										</div>
									</div>
									<div className="lotto">
										<div className="lottoimg lottoimg_PL3">
										</div>
										<div className="lotto-left" onClick={this.onClickGame.bind(this,'CG')}>
											<div className="txt">
												新疆时时彩
											</div>
											<div className="into">
											</div>
											<div className="rule">
												{/* <a class="rule-a" href="/help.html?game=%E6%8E%92%E5%88%973" target="_blank">游戏规则</a> */}
											</div>
										</div>
									</div>
									<div className="lotto">
										<div className="lottoimg lottoimg_SD11X5">
										</div>
										<div className="lotto-left" onClick={this.onClickGame.bind(this,'CG')}>
											<div className="txt">
												山东11选5
											</div>
											<div className="into">
											</div>
											<div className="rule">
												{/* <a className="rule-a" href="/help.html?game=%E5%B1%B1%E4%B8%9C11%E9%80%895" target="_blank">游戏规则</a> */}
											</div>
										</div>
									</div>
									<div className="lotto">
										<div className="lottoimg lottoimg_JX11X5">
										</div>
										<div className="lotto-left" onClick={this.onClickGame.bind(this,'CG')}>
											<div className="txt">
												江西11选5
											</div>
											<div className="into">
											</div>
											<div className="rule">
												{/* <a className="rule-a" href="/help.html?game=%E6%B1%9F%E8%A5%BF11%E9%80%895" target="_blank">游戏规则</a> */}
											</div>
										</div>
									</div>
									<div className="lotto">
										<div className="lottoimg lottoimg_GD11X5">
										</div>
										<div className="lotto-left" onClick={this.onClickGame.bind(this,'CG')}>
											<div className="txt">
												双鱼十一选五
											</div>
											<div className="into">
											</div>
											<div className="rule">
												{/* <a class="rule-a" href="/help.html?game=%E5%B9%BF%E4%B8%9C11%E9%80%895" target="_blank">游戏规则</a> */}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
               
            </article>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {}
);

export default connect(mapStateToProps, {})(BingoPage);