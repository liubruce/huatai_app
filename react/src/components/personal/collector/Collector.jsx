import React from 'react'
import './collector.less'
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import {message,Spin} from 'antd'
import ArticleItem from '../../article/ArticleItem.jsx'
import CourseItem from '../../course/CourseItem.jsx'
import {getFile_IP } from '../../../config/serverIp'
class CourseCol extends React.Component{
    constructor(args){
		super()
        this.state={
            colCourseList:tool.getObject(0),
            score:0,
            loading:false,
            totalPage:1,
            pageNo:1,
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
    render(){
        return(
            <Spin spinning={this.state.loading} tip="加载列表中...">
            <div data-tab-panel-0 className="am-tab-panel am-active tab">
                {
                    this.state.colCourseList.map((item,index)=>{
                        return(
                            <CourseItem show={this.couCollection.bind(this)} key={index} score={this.state.score} item={item} />
                        )
                    })
                }
             </div>
             </Spin>
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
            <Spin spinning={this.state.loading} tip="加载列表中...">
            <div data-tab-panel-0 className="am-tab-panel am-active tab">
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
                            <a >蜂行圈收藏</a>
                        </li>
				    </ul>
                    <div className="am-tabs-bd">
                        {
                            this.state.tab===1?<CourseCol/>:<EssayCol/>
                        }
                    </div>
				</div>
			</div>
		)
	}

}


export default Collector