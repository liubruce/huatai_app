import React from 'react'
import './editUser.less'
import * as api from '../../../config/api'
import {message,Spin} from 'antd'
import * as tool from '../../../config/tools'
// import Dropzone from 'react-dropzone'
import {hashHistory} from 'react-router';
import lrz from 'lrz';
class EditUser extends React.Component{
	constructor(args) {
		super();
		this.state = {
			userCard: {},
			headPath: '',
			loading: false,
			head_image: {},
		}
	}
	show() {
		tool.loading(this, true);
		api.userCard().then((data) => {
			if (data.result === 'RC100') {
				this.setState({
					headPath: data.user.headPath,
					seifInformation: data.user.seifInformation || ''
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
		this.show()
	}
	seifInformation(event) {
	// if(event.target.value.length>=45){
	// 	message.error('个人感悟字数不能超过45！请重新输入', 3);
	// 	return;
	// }else{
        this.setState({
			seifInformation: event.target.value,
		})
	//}
	}
	getPicture(flag) {
		window.jquery('#choose-head-action').modal('close');
		let that = this;
		if (!flag) {
			tool.imagePicker(1).then((imgs) => {
				lrz(imgs[0])
					.then(function(rst) {
						that.addPicture(rst.base64)
					})
					.catch(function(err) {
						console.log(err)
					})
					.always(function() {

					});
			}, (error) => {
				console.log("Error:" + error)
			})
		} else {
			tool.camera().then((imageData) => {
				lrz(imageData)
					.then(function(rst) {
						that.addPicture(rst.base64)
					})
					.catch(function(err) {
						console.log(err)
					})
					.always(function() {

					});
			}, (error) => {
				console.log("Error:" + error)
			})
		}
	}
	addPicture(preview) {
		let file;
		file = tool.dataURItoBlob(preview);
		let head_image = {
			preview,
			file
		}
		this.setState({
			head_image,
			headPath: ""
		})
	}
	chooseImage(accepted, rejected) {
		this.setState({
			head_image: accepted[0],
			headPath: ""
		})
	}
	onSubmit() {
		let formData = new FormData();
		if (this.state.headPath === '') {
			formData.append('file', this.state.head_image.file, Date.parse(new Date()) + '.jpg');
		} else {
			formData.append('file', this.state.headPath);
		}
		formData.append('seifInformation', this.state.seifInformation);
		tool.loading(this, true);
		api.userUpdate(formData).then((data) => {
			if (data.result === 'RC100') {
				message.success('保存成功', 3);
				hashHistory.push("/Personal")
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
        let headPath=this.state.headPath;
		return(
			<div className="warpper">
                <Spin spinning={this.state.loading}>
                <div className="am-panel">

					{this.state.headPath||this.state.headPath===null?
						<img alt='head'  onError={(e) => tool.headImageError(e)} src={tool.getFile(headPath)} style={{display: 'block',width: '100px',height: '100px',borderRadius: '50%',margin: '20px auto 10px'}}/>:
						<img alt='head' onError={(e) => tool.headImageError(e)} src={this.state.head_image.preview} style={{display: 'block',width: '100px',height: '100px',borderRadius: '50%',margin: '20px auto 10px'}}/>
					}
                  
{/*                    <Dropzone
					onDrop={this.chooseImage.bind(this)}					
					className = 'choose-image'
					accept="image/*"
					>*/}
                    <label
                    //onClick={()=>{window.jquery('#choose-head-action').modal('open');}}
                    data-am-modal="{target: '#choose-head-action'}"
                     style={{display: 'block',width: '100px',padding: '5px 10px',margin: '10px auto',backgroundColor: '#0081d7',color: '#FFFFFF',textAlign: 'center',borderRadius: '5px'}} >更换头像</label>
		{/*			</Dropzone>*/}
				   
					
                    <input type="file" name="" id="file" value="" style={{display: 'none'}}/>
                </div>
                {/* <div className="am-panel" style={{paddingTop: '10px'}}>
					
					<textarea value={this.state.seifInformation} onChange={this.seifInformation.bind(this)} placeholder="请输入个人说明" style={{width: '100%',height: '100px',padding: '5px',resize: 'none',border: '1px solid #E2EEFB'}}></textarea>		
                    <img alt='head' onError={(e) => tool.headImageError(e)} src={tool.getFile(headPath)} style={{display: 'block',width: '100px',height: '100px',borderRadius: '50%',margin: '20px auto 10px'}}/>
                    <label htmlFor="file" style={{display: 'block',width: '100px',padding: '5px 10px',margin: '0 auto',backgroundColor: '#0081d7',color: '#FFFFFF',textAlign: 'center',borderRadius: '5px'}}>更换头像</label>
                    <input type="file" name="" id="file" value="" style={{display: 'none'}}/>
                </div> */}
                <div className="am-panel" style={{paddingTop: '10px'}}>
                    <textarea value={this.state.seifInformation} onChange={(e)=>this.seifInformation(e)} placeholder="请输入个人说明" style={{width: '100%',height: '100px',padding: '5px',resize: 'none',border: '1px solid #E2EEFB'}}></textarea>

                    <button type="button" onClick={this.onSubmit.bind(this)} className="submit-btn">保&emsp;存</button>
                </div>

          <div className="am-modal-actions" id="choose-head-action">
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


export default EditUser