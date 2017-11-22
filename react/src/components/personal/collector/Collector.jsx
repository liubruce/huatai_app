import React from 'react'
import './collector.less'
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import {message,Spin} from 'antd'
import ArticleItem from '../../article/ArticleItem.jsx'
//import CourseItem from '../../course/CourseItem.jsx'
import {hashHistory} from 'react-router';
class CourseCol extends React.Component{
    constructor(args){
		super()
        this.state={
            colCourseList:tool.getObject(0),
            score:0,
            loading:false,
            totalPage:1,
            pageNo:1,
            now_item: {
				studyIntegral:0
			}
        }
	}
    componentDidMount() {
       tool.addScroll(this,this.couCollection.bind(this));
    }
    couCollection(flag){
       tool.loading(this, true);
       api.couCollection().then((data) => {
       if (data.result === 'RC100') {
        this.setState({
            colCourseList:flag?this.state.colCourseList.concat(data.colCourseList):data.myCourseList,
            score:data.score?data.score:0,
            totalPage:data.totalPage
        })
       } else {
           message.error(data.errMsg, 3);
        }
        tool.loading(this, false);
      }, (res) => {
         tool.reject(res);
         tool.loading(this, false);
       })
    }
    componentWillMount() {
      this.couCollection();
   }
   componentWillReceiveProps(nextProps) {
     this.couCollection();
   }
    jump(item) {
		if (item.goodCourse !== '1' || item.userCourseOperation.isBuy === 1) {
			hashHistory.push(`/App/Course/courseDetail/${item.courseId}`);
			return;
		}
		this.setState({
			now_item: item
		})
	}
  ok() {
		let body = {
			courseId: this.state.now_item.courseId
		}
		api.cashcourse(body).then((data) => {
			if (data.result === 'RC100') {
				hashHistory.push(`/App/Course/courseDetail/${this.state.now_item.courseId}`);
			} else {
				message.error(data.errMsg, 1);
			}
			tool.loading(this, false);
		}, (res) => {
			tool.loading(this, false);
			tool.reject(res);
		})
	}
  action(courseId,recordType){
		let body = {
			courseId,
			recordType
		};
		api.operatecourse(body).then((data) => {
			if (data.result === 'RC100') {
				this.couCollection();
			} else {
				message.error(data.errMsg, 1);
			}
			tool.loading(this, false);
		}, (res) => {
			tool.loading(this, false);
			tool.reject(res);
		})
	}
  click(item){
		if (item.goodCourse !== '1' || item.userCourseOperation.isBuy === 1) {
			this.action(item.courseId,2);
			return;
		}
		this.setState({
			now_item: item
		})
	}
    render(){
        return(
            <div>
            <Spin spinning={this.state.loading}>
                <div style={{minHeight:'300px'}} className="am-tabs-bd">
                 <div data-tab-panel-0 className="am-tab-panel am-active tab">
                  <ul className="cur-list am-avg-lg-3 am-avg-md-3 am-avg-sm-2 clearFix" style={{paddingTop:'10px'}}>
                {
                    this.state.colCourseList.map((item,index)=>{
                        return(
                          <li key={index}>
                          <a>
                            <img onClick={()=>this.jump(item)} data-am-modal={item.goodCourse ==='1' && item.userCourseOperation.isBuy !== 1?`{target: '#course-confirm'}`:""} src={require('../../../style/images/test.png')} alt="test"/>
                            <p onClick={()=>this.jump(item)} data-am-modal={item.goodCourse ==='1' && item.userCourseOperation.isBuy !== 1?`{target: '#course-confirm'}`:""} className="time">{tool.formatTimestamp(item.createTime)}</p>
                          </a>
                          <div className="cur-list-info">
                            <h2 onClick={()=>this.jump(item)} data-am-modal={item.goodCourse ==='1' && item.userCourseOperation.isBuy !== 1?`{target: '#course-confirm'}`:""}>{item.courseName}{item.goodCourse === '1'?<div className="jc-icon" />:null}</h2>
                            <p className="like">
                              <span className={item.userCourseOperation.isCollection===1?'active':''} data-am-modal={item.goodCourse ==='1' && item.userCourseOperation.isBuy !== 1?`{target: '#course-confirm'}`:""} onClick={()=>this.click(item)}><i className="fa fa-heart-o"></i>{item.sumCollection}</span>
                              <span className={item.userCourseOperation.isLike===1?'active':''} onClick={()=>this.action(item.courseId,3)}><i className="fa fa-thumbs-o-up"></i>{item.sumLike}</span>
                              </p>
                          </div>
                          </li>
                        )
                    })
                }
                </ul>
             </div>
             </div>
             </Spin>

             <div className="am-modal am-modal-confirm" tabIndex="-1" id={`course-confirm`}>
					<div className="am-modal-dialog">
						<div className="am-modal-hd">温馨提示</div>
						<div className="am-modal-bd">
						兑换课程将需要{this.state.now_item.studyIntegral}积分，您的当前积分为{this.state.score}，是否继续？
						</div>
						<div className="am-modal-footer">
						<span className="am-modal-btn" data-am-modal-cancel>取消</span>
						<span className="am-modal-btn" data-am-modal-confirm onClick={()=>this.ok()}>确定</span>
						</div>
						</div>
			 </div>
             </div>
        )
    }
}
class EssayCol extends React.Component{
    constructor(args){
		super()
        this.state={
            colCourseList:tool.getObject(0),
            loading:false,
            totalPage:1,
            pageNo:1,
        }
	}
    componentDidMount() {
       tool.addScroll(this,this.morecolEssay.bind(this));
    }
    morecolEssay(flag){
       tool.loading(this, true);
       api.morecolEssay().then((data) => {
        if (data.result === 'RC100') {
            this.setState({
                colCourseList:flag?this.state.colCourseList.concat(data.myEssayColList):data.myEssayColList,
                totalPage:data.total,
                score:data.score
            })
        } else {
            message.error(data.errMsg, 3);
        }
        tool.loading(this, false);
       }, (res) => {
          tool.reject(res);
          tool.loading(this, false);
        })
      }
    componentWillMount() {
      this.morecolEssay();
    }
    componentWillReceiveProps(nextProps) {
       this.morecolEssay();
    }
    render(){
        return(
            <Spin spinning={this.state.loading}>
            <div style={{minHeight:'300px'}} data-tab-panel-0 className="am-tab-panel am-active tab">
                <div className="am-panel">
                {
                    this.state.colCourseList.map((item,index)=>{
                        return(
                        <ArticleItem show={this.morecolEssay.bind(this)} key={index} item={item} />
                        )
                    })
                }
                </div>
                </div>
             </Spin>
        )
    }
}
class Collector extends React.Component{
	constructor(args){
		super();
        this.state={
            tab:1
        }
	}
    componentWillUnmount() {
    tool.removeScroll();
  }
    changeTab(tab){
        this.setState({
        tab
    })
    }
	render(){
		return(
			<div className="warpper">
				<div data-am-widget="tabs" className="am-tabs am-tabs-default">
					<ul className="am-tabs-nav am-cf nav">
                        <li className={this.state.tab===1?'am-active':null} onClick={()=>this.changeTab(1)}>
                            <a >课程收藏</a>
                        </li>
                        <li className={this.state.tab===2?'am-active':null} onClick={()=>this.changeTab(2)}>
                            <a >{localStorage.getItem('channelId')==='4'?'星行圈收藏':'蜂行圈收藏'}</a>
                        </li>
				    </ul>
                    {/*<div className="am-tabs-bd">*/}
                        {
                            this.state.tab===1?<CourseCol/>:<EssayCol/>
                        }
                    {/*</div>*/}
				</div>
			</div>
		)
	}

}


export default Collector