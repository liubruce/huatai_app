import React from 'react'
import './article.less'
import { message,Spin } from 'antd';
import $ from 'jquery'
import * as api from '../../config/api'
import * as tool from '../../config/tools'
import {getFile_IP } from '../../config/serverIp'
import {hashHistory} from 'react-router';
class Article extends React.Component {
	constructor(args) {
		super()
    this.state = {
      essayList:[],
      loading:true,
      totalPage:1,
      pageNo:1,
      now_item:0,
      score:0
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
  jump(item) {
    if (item.goodEssay !== '1') {
      hashHistory.push(`/App/PersonalCenter/ArticleDetail/${item.essayId}`);
    }
    this.setState({
      now_item: item
    })
  }
  ok(){
    let body = {
      essayId:this.state.now_item.essayId
    }
    api.cashessay(body).then((data)=>{
      if (data.result === 'RC100') {
         hashHistory.push(`/App/PersonalCenter/ArticleDetail/${this.state.now_item.essayId}`);
      } else {
        message.error(data.errMsg, 3);
      }
      tool.loading(this, false);
    }, (res) => {
      tool.loading(this, false);
      tool.reject(res);
    })
  }
	render(){
		return(

     <div className="warpper">
     
        <div className="am-panel">
        {this.state.essayList.map((item,index)=>{
          let isBuy = item.goodEssay ==='1' && item.userEssayOperation.isBuy !== '1';
          return(
              <div className="article-list" key={index} >
                <img className='head_img' onError={(e) => tool.headImageError(e)} alt='img' src={getFile_IP + '/downfile/' + item.headPath} />
                <div className="cont">
                  <p className="info"><span>{item.userRealName}</span>{item.branchOffice}</p>
                  <p className="time">{tool.formatTimestamp(item.createTime)}</p>
                  <a onClick={()=>this.jump(item)}>
                    <article data-am-modal={isBuy?"{target: '#my-confirm'}":""} className="am-article">
                      <div className="am-article-hd">
                        <h1 className="am-article-title">
                        {item.goodEssay === '1'?<div className="jc-icon" />:null}
                        {item.essayTitle}</h1>
                      </div>
                      <div className="am-article-bd">
                        <p className="am-article-lead">{item.essayNote}</p>
                        <ul className="am-avg-sm-3 am-thumbnails">
                        {item.essayPhotos.map((img,index)=>{
                          return(
                             <li key={index} ><img alt='test' src={getFile_IP + '/downfile/' + img.essayPhotoPath} /></li>
                            )
                        })}
                        </ul>
                      </div>
                    </article>
                  </a>
                  <p className="like"><span><i className="fa fa-heart-o" />{item.sumCollection}</span><span><i className="fa fa-thumbs-o-up" />{item.sumLike}</span></p>
                </div>
              </div>
            )
        })}

      <div className="am-modal am-modal-confirm" tabIndex="-1" id="my-confirm">
       <div className="am-modal-dialog">
         <div className="am-modal-hd">温馨提示</div>
         <div className="am-modal-bd">
           兑换将需要{this.state.now_item.exchangeIntegral}积分，您的当前积分为{this.state.score}，是否继续？
         </div>
         <div className="am-modal-footer">
           <span className="am-modal-btn" data-am-modal-cancel>取消</span>
           <span className="am-modal-btn" data-am-modal-confirm onClick={()=>this.ok()}>确定</span>
         </div>
        </div>
       </div>

        <div className="bottom-spin" > <Spin spinning={this.state.loading} size='small' /></div>

        </div>
    
      </div>


			)
	}
}
export default Article;