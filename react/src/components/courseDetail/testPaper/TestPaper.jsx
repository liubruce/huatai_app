import React from 'react'
import  './TestPaper.less'
import { message } from 'antd';
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import $ from 'jquery'
import {browserHistory} from 'react-router'

class testPaper extends React.Component{
	constructor(args) {
		super()
		this.state = {
			single: [],
			multiple: [],
            hourAuction: '00',
            minAuction: '00',
            secAuction: '00',
			answerTime:0,
			point:0
		}
	}

	componentWillMount() {
		//console.log(this.props.params.id)
		let body = {
			testpaperId: this.props.params.id
		};
		api.appTestPaperOnlineAnswer(body).then((data) => {
			if (data.result === 'RC100') {
				let single = [],
					multiple = [];
				for (let x of data.titleList) {
					if (x.titleType === '1') {
						single.push(x);
					} else {
						multiple.push(x);
					}
				}
				this.setState({
					single,
					multiple,
					answerTime: data.testpapers.answerTime ? data.testpapers.answerTime : 0
				}, () => {
					this.countdown();
				});
			} else {
				message.error(data.errMsg, 3);
			}
		}, (res) => {
			tool.reject(res);
		})
	}
	countdown() {
        let t = parseInt(this.state.answerTime,10)*60;
        let h = parseInt(t / 3600,10);
        let m = parseInt((t - h * 3600) / 60,10);
        let s = t - h * 3600 - m * 60;
        this.setState({
            counterAuction:t,
            hourAuction: this.getNumber(h),
            minAuction: this.getNumber(m),
            secAuction: this.getNumber(s)
        });
        if (t !== 0) {
            this.startTimer()
        }
    }

	startTimer() {
        if (!this.timerAuctionHandler) {
            this.timerAuctionHandler = setInterval(() => {

                let counter = parseInt(this.state.counterAuction,10) - 1;

                if (counter === 0) {
                    this.stopTimer()
                }

                let t = parseInt(counter,10);
                let h = parseInt(t / 3600,10);
                let m = parseInt((t - h * 3600) / 60,10);
                let s = t - h * 3600 - m * 60;

                this.setState({
                    counterAuction: counter,
                    hourAuction: this.getNumber(h),
                    minAuction: this.getNumber(m),
                    secAuction: this.getNumber(s)
                })
            }, 1000);
        }
    }

    stopTimer() {
        if (this.timerAuctionHandler) {
            clearInterval(this.timerAuctionHandler)
            this.setState({
                hourAuction: '00',
                minAuction: '00',
                secAuction: '00',
                showLayer: true,
            },()=>{
				this.submit();
			})
        }
    }

    getNumber(no) {
        let number = '00';
        if (no < 10) {
            number = '0' + no;
        } else {
            number = no + ''
        }
        return number;
    }
	submit() {
		let radioTitles = [];
		let checkboxTitles = [];
		clearInterval(this.timerAuctionHandler);
		$('.radio-test-online').each((i,element)=> {
			let checkboxList = $(element).find("input[type='radio']");
			let answer = 0;
			checkboxList.each((index, el) => {
				if (el.checked) {
					switch (index) {
						case 0:
							answer += 1;
							break;
						case 1:
							answer += 2;
							break;
						case 2:
							answer += 4;
							break;
						case 3:
							answer += 8;
							break;
						default:
							break;
					}
				}
			})
			radioTitles.push({
				radioTitleType:'1',
				radioAnswer:answer
			})
			// console.log(this.state.single[i].answer,answer)
		})
		$('.check-test-online').each((i, element)=> {
			let checkboxList = $(element).find("input[type='checkbox']");
			let answer = 0;
			checkboxList.each((index, el) => {
				if (el.checked) {
					switch (index) {
						case 0:
							answer += 1;
							break;
						case 1:
							answer += 2;
							break;
						case 2:
							answer += 4;
							break;
						case 3:
							answer += 8;
							break;
						default:
							break;
					}
				}
			})
			checkboxTitles.push({
				checkboxTitleType:'2',
				checkboxAnswer:answer
			})
		})

		let testpaperdata = {
			testpaperId: this.props.params.id
		}
		let formData = new FormData();
		formData.append('testPapeData', JSON.stringify(testpaperdata))
		formData.append('radioTitles', JSON.stringify(radioTitles));
		formData.append('checkboxTitles', JSON.stringify(checkboxTitles));
		api.appSubmTestPaperTitle(formData).then((data) => {
			if (data.result === 'RC100') {
				this.setState({
					point: data.answerScores
				})
			} else {
				message.error(data.errMsg, 3);
			}

		}, (res) => {
			tool.reject(res);
		})
	}
	render(){
		return(

			<div className="warpper">
				<p className="ans-tips">答题倒计时<span>{this.state.hourAuction}:{this.state.minAuction}:{this.state.secAuction}</span></p>
				<div className="am-panel online-ans">
					{this.state.single.length>0?<h3>单项选择题：</h3>:null}
				     {this.state.single.map((item,index)=>{
				     	return(
					         <div key={index} className="am-panel-bd radio-test-online">
					         	<p className="ans-title">{index+1}、{item.title}</p>
					         	<label className="am-radio am-warning"><input type="radio" name={'radio' + index}  />A. {item.A}</label>
					         	<label className="am-radio am-warning"><input type="radio" name={'radio' + index}  />B. {item.B}</label>
					         	<label className="am-radio am-warning"><input type="radio" name={'radio' + index}  />C. {item.C}</label>
					         	<label className="am-radio am-warning"><input type="radio" name={'radio' + index}  />D. {item.D}</label>
					         </div>
				     		)
				     })}
					{this.state.multiple.length>0?<h3>多项选择题：</h3>:null}
					{this.state.multiple.map((item,index)=>{
						return(
					       <div key={index} className="am-panel-bd check-test-online">
					       	<p className="ans-title">{index+1}、{item.title}</p>
					       	<label className="am-checkbox am-warning"><input type="checkbox"  />A. {item.A}</label>
					       	<label className="am-checkbox am-warning"><input type="checkbox"  />B. {item.B}</label>
					       	<label className="am-checkbox am-warning"><input type="checkbox"  />C. {item.C}</label>
					       	<label className="am-checkbox am-warning"><input type="checkbox"  />D. {item.D}</label>
					       </div>
					    )
					})}
				</div>
				<div className="am-panel">
					<button type="button" className="submit-btn" data-am-modal="{target: '#online-modal'}" onClick={()=>this.submit()} >提交答案</button>
				</div>
		         <div className="am-modal am-modal-confirm" tabIndex="-1" id="online-modal">
		         	<div className="am-modal-dialog">
		         		<div className="am-modal-hd">温馨提示</div>
		         		<div className="am-modal-bd">
		         			考试得分: {this.state.point}<br/>若答题结果不理想，您可重新学习当前课程后再次答题，系统最终将记录您当前课程的最高答题得分！
		         		</div>
		         		<div className="am-modal-footer">
		         			<span className="am-modal-btn" onClick={()=>browserHistory.goBack()} >确定</span>
		         		</div>
		         	</div>
		         </div>
			</div>
		)
	}

}



export default testPaper
