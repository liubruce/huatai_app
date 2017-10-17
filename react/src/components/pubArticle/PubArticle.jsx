import React from 'react'
import * as tool from '../../config/tools'
import * as api from '../../config/api'
import {message} from 'antd'
import {Link,browserHistory} from 'react-router'
import './pubArticle.less'
import $ from 'jquery'
class PubArticle extends React.Component{
	constructor(args) {
		super()
		this.state={
			 tab:'',
			 essayDetail:{},
			 essayPhotos:[],
			 essayTitle:'',
			 essayNote:''
		}
	}
	selectEssay(){
       api.selectEssay({essayId:this.props.params.id}).then((data) => {
		if (data.result === 'RC100') {
			this.setState({
				essayDetail:data.essay?data.essay:{},
				essayPhotos:data.essay.essayPhotos?data.essay.essayPhotos:[],
				essayTitle:data.essay.essayTitle?data.essay.essayTitle:'',
				essayNote:data.essay.essayNote?data.essay.essayNote:''
			})
		} else {
			message.error(data.errMsg, 3);
		}
		}, (res) => {
		tool.reject(res);
		})
	}
	componentWillMount() {
		if(this.props.params.id){
           this.selectEssay();
		}else{
			this.setState({
				essayDetail:{},
				essayPhotos:[],
				essayTitle:'',
				essayNote:''
			})
		}
	}
	getPicture(flag) {
		if (tool.IsPC()) {
			this.addPicture("/static/media/test.13065ad9.png");
			return;
		}
		console.log('------'+JSON.stringify(navigator.camera));
		if (!flag) {
			window.imagePicker.getPictures(
				(imgs) => {
					for (let i = 0; i < imgs.length; i++) {
						this.addPicture(imgs[i])
						console.log('------Image URI: ' + imgs[i]);
					}
				},
				(error) => {
					console.log('------Error: ' + error);
				}, 
				{
					maximumImagesCount: 10,
					width: 800
				}
			);
		} else {
			// navigator.camera.PictureSourceType.PHOTOLIBRARY
			navigator.camera.getPicture((imgSrc) => {
					this.addPicture(imgSrc)
				},
				(error) => {
					console.log("------Error" + error)
				}, 
				{
					quality: 50,
					sourceType: navigator.camera.PictureSourceType.CAMERA
				}
			);
		}
	}
	addPicture(src) {
		let img = {
			src
		}
		this.setState({
			essayPhotos: this.state.essayPhotos.concat(img)
		})
	}
	del(index) {
		let essayPhotos = this.state.essayPhotos;
		let newEssayPhotos = essayPhotos.splice(index, 1);
		this.setState({
			newEssayPhotos
		})
	}
	add() {

	}
	render(){
		// let essayDetail=this.state.essayDetail;
		return(
			<div> 
				<header className="header">
					<a onClick={()=>browserHistory.goBack()} className="header-left"><i className="fa fa-angle-left fa-2x"></i></a>
                    <h1>蜂行圈发布</h1>
					<div className="header-right" onClick={()=>this.add()} ><span>发布</span></div>
                 </header>

			<div className="warpper">
                <div className="am-panel">
                    <div className="fxq-editRela">
                        <input type="text" value={this.state.essayTitle?this.state.essayTitle:''}  placeholder="请输入标题"/>
                        <textarea value={this.state.essayNote?this.state.essayNote:''} placeholder="请输入正文"></textarea>
                    </div>
                </div>
                <div className="am-panel">
                    <ul className="file-imgs am-avg-sm-3 clearFix">
						{
							this.state.essayPhotos.map((item,index)=>{
								return(
                                    <li onClick={()=>this.del(index)} key={index}><img alt={`img${index}${index.src}`} src={item.src} /></li>
								)
							})
						}
                        <li data-am-modal="{target: '#choose-action'}" ><label className="file-img">+</label><input type="file" id="file" style={{display:'none'}}/></li>
                    </ul>
                </div>	
			</div>

           <div className="am-modal-actions" id="choose-action">
             <div className="am-modal-actions-group">
               <ul className="am-list">
                 <li className="am-modal-actions-header" onClick={()=>this.getPicture(true)} >拍照</li>
                 <li className="am-modal-actions-header" onClick={()=>this.getPicture(false)} >从相册选择</li>
               </ul>
             </div>
             <div className="am-modal-actions-group">
               <button className="am-btn am-btn-secondary am-btn-block" data-am-modal-close>取消</button>
             </div>
           </div>

      </div>
		)
	}
}


export default PubArticle