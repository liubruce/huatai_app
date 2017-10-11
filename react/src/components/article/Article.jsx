import React from 'react'
import './article.less'
import { message,Spin } from 'antd';
import $ from 'jquery'
import * as api from '../../config/api'
import * as tool from '../../config/tools'
import ArticleItem from './ArticleItem.jsx'
class Article extends React.Component {
	constructor(args) {
		super()
    this.state = {
      essayList:[],
      loading:true,
      totalPage:1,
      pageNo:1,
    }
	}
  add() {
    if(this.state.pageNo + 1 > this.state.totalPage){
      // $(window).off('.article');
    }else{
      this.setState({
        pageNo:this.state.pageNo + 1
      },()=>{
          this.show();
      })
    }
  }
  componentDidMount() {
    let method = () => {
      this.add();
    }
    $(window).on('scroll.article', function() {
      var scrollTop = $(this).scrollTop();　　
      var scrollHeight = $(document).height();　　
      var windowHeight = $(this).height();　　
      if (scrollTop + windowHeight === scrollHeight) {　　
        method();　
      }
    });
  }
  componentWillUnmount() {
    $(window).off('.article');
  }
  show(){
    tool.loading(this, true);
    let body = {
      pageno:this.state.pageNo,
      search:tool.getQueryString('search')
    }
    api.essaylist(body).then((data)=>{
      if (data.result === 'RC100') {
        this.setState({
          essayList:data.essayList,
          totalPage:data.total,
          score:data.score
        })
      } else {
        message.error(data.errMsg, 3);
      }
      tool.loading(this, false);
    }, (res) => {
      tool.loading(this, false);
      tool.reject(res);
    })
  }
  componentWillMount() {
    this.show();
  }
  componentWillReceiveProps(nextProps) {
    this.show();
  }
	render(){
		return(
     <div className="warpper">
        <div className="am-panel">
        {this.state.essayList.map((item,index)=>{
          return(
            <ArticleItem show={this.show.bind(this)} key={index} score={this.state.score} item={item} />
            )
        })}
        <div className="bottom-spin" > <Spin spinning={this.state.loading} size='small' /></div>
        </div>
      </div>
			)
	}
}
export default Article;