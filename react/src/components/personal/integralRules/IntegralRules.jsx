import React from 'react'
import './integralRules.less'
import $ from 'jquery'
import {Link} from 'react-router'
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import {message} from 'antd'
var lineIndex=0;
class StoryLine extends React.Component{
	constructor(args){
		super();
		this.state={
		   allLevelSet:[]
		}
	}
    levelSet(){
    tool.loading(this, true);
    api.levelSet().then((data)=>{
         if (data.result === 'RC100') {
           this.setState({
              allLevelSet:data.allLevelSet?data.allLevelSet:[]
           })
         }else{
				message.error(data.errMsg, 3);
			}
      tool.loading(this, false);
		}, (res) => {
		   	tool.reject(res);
         tool.loading(this, false);
		})
  }
	componentWillMount() {
     this.levelSet();
   }
	render(){
		let sex=this.state.sex;
		return(
		  <div className="warpper">
			<div className="jf-table">
				
				
				<ul className="table-title clearFix">
					<li>序号</li>
					<li>积分称谓</li>
					<li>
						<div style={{width: '100%',borderBottom: '1px solid #D9E7F6'}}>积分标准</div>
						<div style={{width: '50%',borderRight: '1px solid #D9E7F6'}}>≥</div>
						<div style={{width: '50%'}}>≤</div>
					</li>
					<li>蜂行之力级别</li>
				</ul>
				<ul className="table-td">
                {
              this.state.allLevelSet.map((item,index)=>{
                return(
                <li key={index}>
									<span>{item.mainId}</span>
									<span>{item.integralName}</span>
									<span>{item.integralBegin}</span>
									<span>{item.integralEnd}</span>
									<span>{item.beeLinePowerName}</span>
					     	</li>
                )
              })
            }
				</ul>
			</div>
		</div>
		)
	}

}

export default StoryLine