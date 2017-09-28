import React from 'react'
import  './AnswerOnline.less'
import { message } from 'antd';
import * as tools from '../../../config/tools' 


class AnswerOnline extends React.Component{
	constructor(args){
		super()
		this.stae={

		}
	}

	render(){
		return(

			<div className="warpper">
				<p className="ans-tips">答题倒计时<span>300</span>s</p>
				<div className="am-panel online-ans">
					<h3>单项选择题：</h3>
					<div className="am-panel-bd">
						<p className="ans-title">1、在风险管理方法中，为高层建筑安装火灾警报器的方式属于?</p>
						<label className="am-radio am-warning"><input type="radio" name="a" value=""  />XXXX</label>
						<label className="am-radio am-warning"><input type="radio" name="a" value=""  />XXXXX</label>
						<label className="am-radio am-warning"><input type="radio" name="a" value=""  />XXX</label>
						<label className="am-radio am-warning"><input type="radio" name="a" value=""  />XXX</label>
					</div>
					<div className="am-panel-bd">
						<p className="ans-title">2、在风险管理方法中，为高层建筑安装火灾警报器的方式属于?</p>
						<label className="am-radio am-warning"><input type="radio" name="b" value=""  />XXXX</label>
						<label className="am-radio am-warning"><input type="radio" name="b" value=""  />XXXXX</label>
						<label className="am-radio am-warning"><input type="radio" name="b" value=""  />XXX</label>
						<label className="am-radio am-warning"><input type="radio" name="b" value=""  />XXX</label>
					</div>
					<div className="am-panel-bd">
						<p className="ans-title">3、在风险管理方法中，为高层建筑安装火灾警报器的方式属于?</p>
						<label className="am-radio am-warning"><input type="radio" name="c" value=""  />XXXX</label>
						<label className="am-radio am-warning"><input type="radio" name="c" value=""  />XXXXX</label>
						<label className="am-radio am-warning"><input type="radio" name="c" value=""  />XXX</label>
						<label className="am-radio am-warning"><input type="radio" name="c" value=""  />XXX</label>
					</div>
					<h3>多项选择题：</h3>
					<div className="am-panel-bd">
						<p className="ans-title">1、在风险管理方法中，为高层建筑安装火灾警报器的方式属于?</p>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXXX</label>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXXXXXXX</label>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXX</label>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXXXXX</label>
					</div>
					<div className="am-panel-bd">
						<p className="ans-title">2、在风险管理方法中，为高层建筑安装火灾警报器的方式属于?</p>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXXX</label>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXXXXXXX</label>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXX</label>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXXXXX</label>
					</div>
					<div className="am-panel-bd">
						<p className="ans-title">3、在风险管理方法中，为高层建筑安装火灾警报器的方式属于?</p>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXXX</label>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXXXXXXX</label>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXX</label>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXXXXX</label>
					</div>
					<div className="am-panel-bd">
						<p className="ans-title">4、在风险管理方法中，为高层建筑安装火灾警报器的方式属于?</p>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXXX</label>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXXXXXXX</label>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXX</label>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXXXXX</label>
					</div>
					<div className="am-panel-bd">
						<p className="ans-title">5、在风险管理方法中，为高层建筑安装火灾警报器的方式属于?</p>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXXX</label>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXXXXXXX</label>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXX</label>
						<label className="am-checkbox am-warning"><input type="checkbox" value=""  />XXXXXX</label>
					</div>
				</div>
				<div className="am-panel">
					<button type="button" className="submit-btn" data-am-modal="{target: '#my-modal'}">提交答案</button>
				</div>
			</div>

		)
	}

}



export default AnswerOnline
