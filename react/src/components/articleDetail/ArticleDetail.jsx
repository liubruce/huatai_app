import React from 'react'
import  './ArticleDetail.less'
import * as tool from '../../config/tools'
import * as api from '../../config/api'
import {message} from 'antd'
import {getFile_IP } from '../../config/serverIp'

class ArticleDetail extends React.Component{
	constructor(args) {
		super()
		this.state = {
			essay:{},
			essayPhotos:[]
		}
	}
	componentWillMount() {
		let body = {
			essayId: this.props.params.id
		};
		api.selectEssay(body).then((data) => {
			if (data.result === 'RC100') {
				this.setState({
					essay: data.essay,
					essayPhotos:data.essay.essayPhotos
				})
			} else {
				message.error(data.errMsg, 3);
			}
		}, (res) => {
			tool.reject(res);
		})
	}
	render(){
		let essay = this.state.essay;
		return(
			<div className="warpper">
				<div className="am-panel article-details">
				   <div className="pepole-info">
					<img className='head_img' onError={(e) => tool.headImageError(e)} alt='img' src={getFile_IP + '/downfile/' + essay.headPath} />
					<p className="info"><span>{essay.userRealName}</span>{essay.branchOffice}</p>
					<p className="time">{tool.formatTimestamp(essay.createTime)}</p>
				   </div>
					<article className="am-article">
					  	<div className="am-article-hd">
					   		<h1 className="am-article-title">{essay.essayTitle}</h1>
					   		{/*<p class="like"><span><i class="fa fa-heart-o"></i>12331</span>
					   		<span><i class="fa fa-thumbs-o-up"></i>12331</span></p>*/}
					   		{/*<p className="like">{tool.formatTimestamp(essay.createTime)}</p>*/}
					  	</div>
					  	<div className="am-article-bd">
					    	<p className="am-article-lead">{essay.essayNote}</p>
					    	<ul className="am-avg-sm-3 am-thumbnails">
					    	      {this.state.essayPhotos.map((img,index)=>{
                                    return(
                                       <li key={index} ><img alt='test' src={getFile_IP + '/downfile/' + img.essayPhotoPath} /></li>
                                      )
                                  })}
							</ul>
					  	</div>
					</article>
				</div>
			</div>
		)
	}

}
export default ArticleDetail