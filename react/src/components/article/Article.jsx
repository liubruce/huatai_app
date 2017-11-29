import React from 'react'
import './article.less'
import { message,Spin } from 'antd';
// import $ from 'jquery'
import * as api from '../../config/api'
import * as tool from '../../config/tools'
import ArticleItem from './ArticleItem.jsx'
class Article extends React.Component {
	constructor(args) {
		super()
    this.state = {
      essayList:[],
      loading:false,
      totalPage:1,
      pageNo:1,
    }
	}
  componentDidMount() {
    tool.addScroll(this,this.show.bind(this));
  }
  componentWillUnmount() {
    tool.removeScroll();
  }
  componentWillMount() {
    this.show();
  }
  componentWillReceiveProps(nextProps) {
    this.show();
  }
  show(flag){
    tool.loading(this, true);
    let body = {
      pageno:this.state.pageNo
    }
    let search = tool.getQueryString('search');
    if(tool.checkInput(search)){
      body.search = search;
    }
    api.essaylist(body).then((data)=>{
      tool.loading(this, false);
      if (data.result === 'RC100') {
        this.setState({
          essayList:flag?this.state.essayList.concat(data.essayList):data.essayList,
          totalPage:data.total,
          score:data.score
        })
      } else {
        message.error(data.errMsg, 3);
      }
    }, (res) => {
      tool.loading(this, false);
      tool.reject(res);
    })
  }
	render(){
		return(
     <div className="warpper">
     <Spin spinning={this.state.loading} >
        <div style={{minHeight:'300px'}} >
        {this.state.essayList.map((item,index)=>{
          return(
            <ArticleItem show={this.show.bind(this)} key={index} score={this.state.score} item={item} />
            )
        })}
        {/*<div className="bottom-spin" > <Spin spinning={this.state.loading} size='small' /></div>*/}
        </div>
        </Spin>
      </div>
			)
	}
}
export default Article;