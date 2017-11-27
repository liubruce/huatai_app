import React from 'react'
import  '../answerOnline/AnswerOnline.less'
import  './answerhistory.less'
import { message } from 'antd';
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import $ from 'jquery'
import {hashHistory,browserHistory} from 'react-router'

class AnswerOnline extends React.Component{
	constructor(args) {
		super()
		this.state = {
			single: [],
			multiple: [],
			point:0,
            examRecords:{}
		}
	}
    appSelectExamDetail(){
        let body = {
			courseId: this.props.params.id
		};
		api.appSelectExamDetail(body).then((data) => {
			if (data.result === 'RC100') {
				let single = [],
					multiple = [],
					titleList=data.titleList;
				for (let i in titleList) {
					if (titleList[i].titleType === '1') {
						single.push(titleList[i]);
					} else {
						multiple.push(titleList[i]);
					}
				}
				this.setState({
					single,
					multiple,
					examRecords:data.examRecords?data.examRecords:{}
				},()=>{
                    $('.SingleQuestion').each(function(i) {
						if(single[i].isTrue === 1 ){
							$(this).find('.answers').addClass('imgRight');
						}else{
							$(this).find('.answers').addClass('imgWrong')
						}
						let answer = tool.getAnswer(single[i].chooseAnswer);
						$(this).find("input[type='radio']").each((index, el) => {
							for(let x of answer){
								if(x === index){
									el.checked = true;
								}
							}
						})
                });
                $('.MultipleQuestion').each(function(i) {
						if(multiple[i] !== undefined){
							if(multiple[i].isTrue === 1 ){
							$(this).find('.answers').addClass('imgRight');
						}else{
							$(this).find('.answers').addClass('imgWrong')
						}
							let answer = tool.getAnswer(multiple[i].chooseAnswer);
							
							$(this).find("input[type='checkbox']").each((index, el) => {
								
								for(let x of answer){
									if(x === index){
										el.checked = true;
									}
								}
							})
						}
						
			});
        })} else {
				message.error(data.errMsg, 3);
			}
		}, (res) => {
			tool.reject(res);
		})
    }
    appSelectBigTestExamDetail(){
         let body = {
			testpaperId: this.props.params.id
		};
		api.appSelectBigTestExamDetail(body).then((data) => {
			if (data.result === 'RC100') {
				let single = [],
					multiple = [],
					titleList=data.titleList;
				for (let i in titleList) {
					if (titleList[i].titleType === '1') {
						single.push(titleList[i]);
					} else {
						multiple.push(titleList[i]);
					}
				}
				this.setState({
					single,
					multiple,
					examRecords:data.examRecords?data.examRecords:{}
				},()=>{
                    $('.SingleQuestion').each(function(i) {
						if(single[i].isTrue === 1 ){
							$(this).find('.answers').addClass('imgRight');
						}else{
							$(this).find('.answers').addClass('imgWrong')
						}
						let answer = tool.getAnswer(single[i].chooseAnswer);
						$(this).find("input[type='radio']").each((index, el) => {
							for(let x of answer){
								if(x === index){
									el.checked = true;
								}
							}
						})
                });
                 $('.MultipleQuestion').each(function(i) {
						if(multiple[i] !== undefined){
							if(multiple[i].isTrue === 1 ){
							$(this).find('.answers').addClass('imgRight');
						}else{
							$(this).find('.answers').addClass('imgWrong')
						}
							let answer = tool.getAnswer(multiple[i].chooseAnswer);
							
							$(this).find("input[type='checkbox']").each((index, el) => {
								
								for(let x of answer){
									if(x === index){
										el.checked = true;
									}
								}
							})
						}
                });
			});
        } else {
				message.error(data.errMsg, 3);
			}
		}, (res) => {
			tool.reject(res);
		})
    }
	componentWillMount() {
		if(this.props.params.code==='1'){
             this.appSelectExamDetail();
        }else{
            this.appSelectBigTestExamDetail();
        }
	}
	render(){
        let examRecords=this.state.examRecords
		return(
           <div>
            <header className="header">
				<a onClick={()=>browserHistory.goBack()} className="header-left"><i className="fa fa-angle-left fa-2x"></i></a>
				<h1>答题历史</h1>
			</header>
			<div className="warpper">
                <p className="ans-tips">得分:<span>{examRecords !== undefined ?examRecords.answerScore:''}</span></p>
				<div className="am-panel online-ans">
					{this.state.single.length>0?<h3>单项选择题：</h3>:null}
				     {this.state.single.map((item,index)=>{
				     	return(
					         <div key={index} className="am-panel-bd radio-test-online SingleQuestion">
					         	<p className="ans-title">{index+1}、{item.title}</p>
					         	<label className="am-radio am-warning"><input type="radio" disabled name={'radio' + index}  />A. {item.A}</label>
					         	<label className="am-radio am-warning"><input type="radio" disabled name={'radio' + index}  />B. {item.B}</label>
					         	<label className="am-radio am-warning"><input type="radio" disabled name={'radio' + index}  />C. {item.C}</label>
					         	<label className="am-radio am-warning"><input type="radio" disabled name={'radio' + index}  />D. {item.D}</label>
                                <a className='answers'><span></span></a>
					         </div>
				     		)
				     })}
					{this.state.multiple.length>0?<h3>多项选择题：</h3>:null}
					{this.state.multiple.map((item,index)=>{
						return(
					       <div key={index} className="am-panel-bd check-test-online MultipleQuestion">
					       	<p className="ans-title">{index+1}、{item.title}</p>
					       	<label className="am-checkbox am-warning"><input disabled type="checkbox"  />A. {item.A}</label>
					       	<label className="am-checkbox am-warning"><input disabled type="checkbox"  />B. {item.B}</label>
					       	<label className="am-checkbox am-warning"><input disabled type="checkbox"  />C. {item.C}</label>
					       	<label className="am-checkbox am-warning"><input disabled type="checkbox"  />D. {item.D}</label>
                            <a className='answers'><span></span></a>
					       </div>
					    )
					})}
				</div>
			</div>
            </div>
		)
	}

}



export default AnswerOnline
