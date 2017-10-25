import React from 'react'
import * as tool from '../../config/tools'
import * as api from '../../config/api'
import {message,Spin} from 'antd'
import {Link,browserHistory,hashHistory} from 'react-router'
import './pubArticle.less'
import $ from 'jquery'
class PubArticle extends React.Component{
	constructor(args) {
		super()
		this.state={
			 tab:'',
			 essayDetail:{},
			 essayPhotos:[],
			 essayPhotosPH:[],
			 essayTitle:'',
			 essayNote:'',
			 loading:false,
		}
	}
	selectEssay(){
       api.selectEssay({essayId:this.props.params.id}).then((data) => {
		if (data.result === 'RC100') {
			this.setState({
				essayDetail:data.essay?data.essay:{},
				essayPhotosPH:data.essay.essayPhotos?data.essay.essayPhotos:[],
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
				essayPhotosPH:[],
				essayTitle:'',
				essayNote:''
			})
		}
	}
	getPicture(flag) {
		if (!window.cordova) {
			return;
		}
		if (!flag) {
			tool.imagePicker().then((imgs) => {
				for (let i = 0; i < imgs.length; i++) {
					this.addPicture(imgs[i])
				}
			}, (error) => {
				alert("Error:" + error)
			})
		} else {
			tool.camera().then((imgSrc) => {
				this.addPicture(imgSrc)
			}, (error) => {
				alert("Error:" + error)
			})
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
			essayPhotos:newEssayPhotos
		})
	}
	delPH(index) {
		let essayPhotosPH = this.state.essayPhotosPH;
		let newEssayPhotosPH = essayPhotosPH.splice(index, 1);
		this.setState({
			essayPhotosPH:newEssayPhotosPH
		})
	}
	add() {
		 tool.loading(this, true);
		 if(this.state.essayTitle === ''){
		 	message.error('请输入文章标题', 3);
		 	tool.loading(this, false);
		 	return
		 }
		 if(this.state.essayNote === ''){
		 	message.error('请输入文章内容', 3);
		 	tool.loading(this, false);
		 	return
		 }
		 let formData = new FormData()
		 formData.append('essayTitle',this.state.essayTitle);
    	 formData.append('essayNote',this.state.essayNote);
		 if(this.props.params.id){
             formData.append('essayId',this.props.params.id);
		 }
		 formData.append('checkState','3');
		 // formData.append('checkState':'4');
		 let essayPhotos = this.state.essayPhotos,essayPhotosPH=this.state.essayPhotosPH;
		 for (let x of essayPhotos){
		 	formData.append('file',x)
		 }
		 for (let x of essayPhotosPH){
			 formData.append('photoPath',x)
		 }
		 api.appAddArticle(formData).then((data)=>{
		 	if (data.result ==='RC100') {
		 		this.setState({
		 			essayTitle:'',
		 			essayNote:'',
		 			essayPhotos:[]
		 		},()=>{
		 			hashHistory.push("/App/PersonalCenter/MyArticle")
		 		})
		 		tool.loading(this, false);
		 	}else{
		 		tool.loading(this, false);
		 		message.error(data.errMsg, 3);
		 	}
		 })

	}
	inputValue=(event)=>{
       this.setState({essayTitle: event.target.value});
	}
	textareaValue=(event)=>{
       this.setState({essayNote: event.target.value});
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
			<Spin spinning={this.state.loading} tip="加载列表中...">
			<div className="warpper">
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
                                    <li onClick={()=>this.del(index)} key={index}><img alt={`img${index}${index.src}`} src={item.src} /></li>
								)
							})
						}
						{
							this.state.essayPhotosPH.map((item,index)=>{
								return(
                                    <li onClick={()=>this.delPH(index)} key={index}><img alt={`img${index}${index.src}`} src={item.src} /></li>
								)
							})
						}
{/*						<li ><img alt='test' src={window.cordova.file.dataDirectory + 'abc.jpg'} /></li>*/}
                        <li><label data-am-modal="{target: '#choose-action'}" className="file-img">+</label><input type="file" id="file" style={{display:'none'}}/></li>
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