import React from 'react'
import './editUser.less'
import {Link,browserHistory} from 'react-router'
import * as api from '../../../config/api'
import {message,Spin} from 'antd'
import * as tool from '../../../config/tools'
import {getFile_IP } from '../../../config/serverIp'
class EditUser extends React.Component{
	constructor(args){
		super();
        this.state={
            userCard:{},
            headPath:'',
            loading:false
        }
    }
    show(){
		tool.loading(this, true);
		api.userCard().then((data)=>{
			if (data.result === 'RC100') {
				this.setState({
					headPath:data.obj.user.headPath,
                    seifInformation:data.obj.user.seifInformation
				})
                browserHistory.push('/App/PersonalCenter');
			}else{
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
    seifInformation(event){
       this.setState({
		   seifInformation:event.target.value,
	   })
	}
    onSubmit(){
	  let formData = new FormData();
	//   if(this.state.headPath===''){
	// 	formData.append('file',this.state.cover_image);
	//   }else{
	// 	formData.append('file',this.state.headPath);
	//   }
	  formData.append('seifInformation',this.state.seifInformation);
	     tool.loading(this,true);
		api.userUpdate(formData).then((data) => {
			if(data.result==='RC100'){
              message.success('保存成功', 3);
			}else{
              message.error(data.errMsg, 3);
			}
			tool.loading(this,false);
		}, () => {
			message.error('请求失败', 3);
			tool.loading(this,false);
		})
	}
	render(){
        let headPath=this.state.headPath;
		return(
			<div className="warpper">
                <Spin spinning={this.state.loading} tip="加载列表中...">
                <div className="am-panel">
                    <img src={getFile_IP + '/downfile/' + headPath} style={{display: 'block',width: '100px',height: '100px',borderRadius: '50%',margin: '20px auto 10px'}}/>
                    <label for="file" style={{display: 'block',width: '100px',padding: '5px 10px',margin: '0 auto',backgroundColor: '#005496',color: '#FFFFFF',textAlign: 'center',borderRadius: '5px'}}>更换头像</label>
                    <input type="file" name="" id="file" value="" style={{display: 'none'}}/>
                </div>
                <div className="am-panel" style={{paddingTop: '10px'}}>
                    <textarea value={this.state.seifInformation} onChange={this.seifInformation.bind(this)} placeholder="请输入个人说明" style={{width: '100%',height: '100px',padding: '5px',resize: 'none',border: '1px solid #E2EEFB'}}></textarea>
                    <button type="button" onClick={this.onSubmit.bind(this)} className="submit-btn">保&emsp;存</button>
                </div>
                </Spin>
			</div>
		)
	}

}


export default EditUser