import React from 'react'
import * as tool from '../../config/tools'
import * as api from '../../config/api'
import {message,Spin} from 'antd'
import {browserHistory,hashHistory} from 'react-router'
import './pubArticle.less'
import $ from 'jquery'
import Dropzone from 'react-dropzone'
class PubArticle extends React.Component{
	constructor(args) {
		super()
		this.state = {
			tab: '',
			essayDetail: {},
			essayPhotos: [],
			essayPhotosPH: [],
			essayTitle: '',
			essayNote: '',
			loading: false,
		}
	}
	selectEssay() {
		api.selectEssay({
			essayId: this.props.params.id
		}).then((data) => {
			if (data.result === 'RC100') {
				this.setState({
					essayDetail: data.essay ? data.essay : {},
					essayPhotosPH: data.essay.essayPhotos ? data.essay.essayPhotos : [],
					essayTitle: data.essay.essayTitle ? data.essay.essayTitle : '',
					essayNote: data.essay.essayNote ? data.essay.essayNote : ''
				})
			} else {
				message.error(data.errMsg, 3);
			}
		}, (res) => {
			tool.reject(res);
		})
	}
	componentWillMount() {
		if (this.props.params.id) {
			this.selectEssay();
		} else {
			this.setState({
				essayDetail: {},
				essayPhotos: [],
				essayPhotosPH: [],
				essayTitle: '',
				essayNote: ''
			})
		}
	}
	getPicture(flag) {
		window.jquery('#choose-action').modal('close');
		if (!flag) {
			tool.imagePicker(9 - (this.state.essayPhotosPH.length + this.state.essayPhotos.length)).then((imgs) => {
				for (let i = 0; i < imgs.length; i++) {
					tool.convertImgToBase64URL(imgs[i]).then((url) => {
						this.addPicture(url)
					})
				}
			}, (error) => {
				console.log("Error:" + error)
			})
		} else {
			tool.camera().then((imageData) => {
				tool.convertImgToBase64URL(imageData).then((url) => {
					this.addPicture(url)
				})
			}, (error) => {
				console.log("Error:" + error)
			})
		}
	}
	addPicture(preview) {
		let img = {
			preview
		}
		this.setState({
			essayPhotos: this.state.essayPhotos.concat(img)
		})
	}
	del(index) {
		let essayPhotos = this.state.essayPhotos;
		let newEssayPhotos = [];
		for (let i in essayPhotos) {
			if (Number(i) !== Number(index)) {
				newEssayPhotos.push(essayPhotos[i])
			}
		}
		this.setState({
			essayPhotos: newEssayPhotos
		})
	}
	delPH(index) {
		let essayPhotosPH = this.state.essayPhotosPH;
		let newEssayPhotosPH = [];
		for (let i in essayPhotosPH) {
			if (Number(i) !== Number(index)) {
				newEssayPhotosPH.push(essayPhotosPH[i])
			}
		}
		this.setState({
			essayPhotosPH: newEssayPhotosPH
		})
	}
	add() {
		if (this.state.essayTitle === '') {
			message.error('请输入文章标题', 3);
			return
		}
		if (this.state.essayNote === '') {
			message.error('请输入文章内容', 3);
			return
		}
		let formData = new FormData()
		formData.append('essayTitle', this.state.essayTitle);
		formData.append('essayNote', this.state.essayNote);
		if (this.props.params.id) {
			formData.append('essayId', this.props.params.id);
		}
		formData.append('checkState', '3');
		// formData.append('checkState':'4');
		let essayPhotos = this.state.essayPhotos,
			essayPhotosPH = this.state.essayPhotosPH;
		for (let i in essayPhotos) {
			let start = essayPhotos[i].preview.indexOf(',') + 1;
			let end = essayPhotos[i].preview.length;
			formData.append('base', essayPhotos[i].preview.slice(start, end))
		}
		for (let i in essayPhotosPH) {
			formData.append('photoPath', essayPhotosPH[i].essayPhotoPath)
		}
		tool.loading(this, true);
		api.appAddArticle(formData).then((data) => {
			if (data.result === 'RC100') {
				this.setState({
					essayTitle: '',
					essayNote: '',
					essayPhotos: []
				}, () => {
					hashHistory.push("/App/PersonalCenter/MyArticle")
				})
			} else {
				message.error(data.errMsg, 3);
			}
			tool.loading(this, false);
		},(res)=>{
			tool.loading(this, false);
			tool.reject(res);
		})

	}
	inputValue = (event) => {
		this.setState({
			essayTitle: event.target.value
		});
	}
	textareaValue = (event) => {
		this.setState({
			essayNote: event.target.value
		});
	}
	// chooseImage(accepted, rejected) {
	// 	if (accepted.length + this.state.essayPhotos.length >= 9) {
	// 		message.error('最多选择9张图片')
	// 	} else {
	// 		this.setState({
	// 			essayPhotos: this.state.essayPhotos.concat(accepted),
	// 		})
	// 	}
	// }
	chooseImage() {
		if (this.state.essayPhotosPH.length + this.state.essayPhotos.length >= 9) {
			message.error('最多选择9张图片')
		} else {
			window.jquery('#choose-action').modal('open');
		}
	}
	render(){
		// let essayDetail=this.state.essayDetail;
		return(
			<div> 
				<header className="header">
					<a onClick={()=>browserHistory.goBack()} className="header-left"><i className="fa fa-angle-left fa-2x"></i></a>
                    <h1>{localStorage.getItem('channelId')==='4'?'星行圈发布':'蜂行圈发布'}</h1>
					<div className="header-right" onClick={()=>this.add()} ><span>发布</span></div>
                 </header>
			<Spin spinning={this.state.loading} tip="发布中">
			<div style={{minHeight:'300px'}} className="warpper">
                <div className="am-panel">
                    <div className="fxq-editRela">
                        <input type="text" value={this.state.essayTitle} onChange={this.inputValue.bind()}  placeholder="请输入标题"/>
                        <textarea value={this.state.essayNote} onChange={this.textareaValue.bind()} placeholder="请输入正文"></textarea>
                    </div>
                </div>
                <div className="am-panel">
                    <ul className="file-imgs am-avg-sm-3 clearFix">
						{
							this.state.essayPhotos.map((item,index)=>{
								return(
									<li onClick={()=>this.del(index)} key={index}>
	                                   <img type="image" src={item.preview} alt={`${item.preview}`} />
	                                </li>
								)
							})
						}
						{
							this.state.essayPhotosPH.map((item,index)=>{
								return(
                                    <li onClick={()=>this.delPH(index)} key={index}>
										<img alt={`img${index}${index.essayPhotoPath}`} src={tool.getFile(item.essayPhotoPath)} /></li>
								)
							})
						}

 
{/*                     	<Dropzone
 							multiple={true}
 							onDrop={this.chooseImage.bind(this)}
 							className = 'choose-image am-avg-sm-3'
 							accept="image/*"
 						>	*/}										
	 						<li><label
	 						onClick={()=>this.chooseImage()}
	 						 //data-am-modal="{target: '#choose-action'}"
	 						 className="file-img">+</label></li>
 					{/*</Dropzone>*/}
                    
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
		</Spin>
      </div>
		)
	}
}


export default PubArticle