import React from 'react'
import './article.less'
import { message,Spin } from 'antd';
import $ from 'jquery'
import {Link} from 'react-router'
import * as api from '../../config/api'
import * as tool from '../../config/tools'
import {getFile_IP } from '../../config/serverIp'
class Article extends React.Component {
	constructor(args) {
		super()
    this.state = {
      essayList:tool.getObject(0),
      loading:true
    }
	}
  // add() {
  //   if (this.state.essayList.length > 10) {
  //     message.error('没有数据了', 3);
  //     this.setState({
  //       loading: false
  //     })
  //     return;
  //   }
  //   setTimeout(() => {
  //     this.setState({
  //       essayList: this.state.essayList.concat(this.state.essayList)
  //     })
  //   }, 500)
  // }
  // componentDidMount() {
  //   let method = () => {
  //     this.add();
  //   }
  //   $(window).on('scroll.article', function() {
  //     var scrollTop = $(this).scrollTop();　　
  //     var scrollHeight = $(document).height();　　
  //     var windowHeight = $(this).height();　　
  //     if (scrollTop + windowHeight === scrollHeight) {　　
  //       method();　
  //     }
  //   });
  // }
  // componentWillUnmount() {
  //   $(window).off('.article');
  // }
  show(){
    tool.loading(this, true);
    api.essaylist().then((data)=>{
      if (data.result === 'RC100') {
        this.setState({
          essayList:data.essayList
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
	render(){
		return(

     <div className="warpper">
     <Spin spinning={this.state.loading} tip="加载列表中...">
        <div className="am-panel">
        {this.state.essayList.map((item,index)=>{
          return(
              <div className="article-list" key={index} >
                <img className='head_img' onError={(e) => tool.headImageError(e)} alt='img' src={getFile_IP + '/downfile/' + item.headPath} />
                <div className="cont">
                  <p className="info"><span>{item.userRealName}</span>{item.branchOffice}</p>
                  <p className="time">{tool.formatTimestamp(item.createTime)}</p>
                  <Link to='/App/PersonalCenter/ArticleDetail'>
                    <article className="am-article">
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
                  </Link>
                  <p className="like"><span><i className="fa fa-heart-o" />{item.sumCollection}</span><span><i className="fa fa-thumbs-o-up" />{item.sumLike}</span></p>
                </div>
              </div>
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