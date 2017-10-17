import React from 'react'
import * as tool from '../../config/tools'
import * as api from '../../config/api'
import {message} from 'antd'
import {Link,browserHistory} from 'react-router'
import './pubArticle.less'
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
	addPicture() {
		console.log('------------------getPicture');
		navigator.camera.getPicture(function(imageData) {
				console.log(imageData)
			},
			function(error) {
				console.log("---------照片获取失败！---" + error)
			}, {
				quality: 50,
				destinationType: navigator.camera.DestinationType.FILE_URI,
				sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
			});
	}
	add() {
		console.log('-------------test add')
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
                                    <li key={index} data-am-modal="{target: '#my-confirm'}"><img alt='test' src={require("../../style/images/test.png")}/></li>
								)
							})
						}
                        <li onClick={()=>this.addPicture()} ><label className="file-img">+</label><input type="file" id="file" style={{display:'none'}}/></li>
                    </ul>
                </div>	
			</div>
      </div>
		)
	}
}


export default PubArticle