import React from 'react'
import './library.less'
import $ from 'jquery'
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import {message} from 'antd'
class Bookshelf extends React.Component{
	constructor(args){
		super();
		this.state={
       bookList:[]
		}
	}
	componentWillMount() {
    api.myList().then((data) => {
      if (data.result === 'RC100') {
        this.setState({
					bookList:data.bookList?data.bookList:[]
        })
      } else {
        message.error(data.errMsg, 3);
      }
    }, (res) => {
      tool.reject(res);
    })
  }
	render(){
		return(
           <div data-tab-panel-0 className="am-tab-panel am-active tab">
							 {
								 this.state.bookList.map((item,index)=>{
									 return(
										 <div key={index} className="am-panel goods-list">
                     <div className="goods-img"><img alt='test' src={require('../../../style/images/test.png')}
										 src={item.bookPath}
										 /></div>
											<div className="goods-info">
												<p>图书名：{item.bookName}</p>
												<p>作者：{item.author}</p>
												<p>出版社: {item.press}</p>
												<p>原作名: {item.originalAuthor}</p>
												<p>译者:  {item.translator}</p>
												<p>出版年: {item.publishYear}</p>
												<p>页数: {item.pages}</p>
												<button type="button" className="am-btn-primary" data-am-modal="{target: '#my-modal'}">下载</button>
											</div>
											</div>
									 )
								 })
							 }
            </div>
		)
	}
}
class MyLibrary extends React.Component{
	constructor(args){
		super();
		this.state={
			myLibrary:[],
			now_item:0,
			score:0
		}
	}
	componentWillMount() {
    api.myBookList().then((data) => {
    	console.log(data)
      if (data.result === 'RC100') {
        this.setState({
					myLibrary:data.bookList?data.bookList:[],
					score:data.score
        })
      } else {
        message.error(data.errMsg, 3);
      }
    }, (res) => {
      tool.reject(res);
    })
  }
  jump(item){
  	this.setState({
      now_item: item
    })
  }
  ok(){
  	let body = {
      bookId:this.state.now_item.bookId
    }
    api.cashBook(body).then((data)=>{
      if (data.result === 'RC100') {
         
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
           <div data-tab-panel-0 className="am-tab-panel am-active tab">
             {
								 this.state.myLibrary.map((item,index)=>{
									 return(
										 <div key={index} className="am-panel goods-list">
                     <div className="goods-img"><img alt='test' src={require('../../../style/images/test.png')}
										 src={item.bookPath}
										 /></div>
											<div className="goods-info">
												<p>图书名：{item.bookName}</p>
												<p>作者：{item.author}</p>
												<p>出版社: {item.press}</p>
												<p>原作名: {item.originalAuthor}</p>
												<p>译者:  {item.translator}</p>
												<p>出版年: {item.publishYear}</p>
												<p>页数: {item.pages}</p>
												 <a onClick={()=>this.jump(item)}>
												 	<button type="button" className="am-btn-primary" data-am-modal={"{target: '#my-confirms'}"}>兑换</button>
												 </a>
												
											</div>
											</div>
									 )
								 })
							 }
							<div className="am-modal am-modal-confirm" tabIndex="-1" id="my-confirms">
						       	<div className="am-modal-dialog">
						         <div className="am-modal-hd">温馨提示</div>
						         <div className="am-modal-bd">
						           兑换《{this.state.now_item.bookName}》将需要{this.state.now_item.cashIntegral}积分，您的当前积分为{this.state.score}，是否继续？
						         </div>
						         <div className="am-modal-footer">
						           <span className="am-modal-btn" data-am-modal-cancel>取消</span>
						           <span className="am-modal-btn" data-am-modal-confirm onClick={()=>this.ok()}>确定</span>
						         </div>
						        </div>
						    </div>
            </div>
		)
	}
}
class Database extends React.Component{
	constructor(args){
		super();
		this.state={
			dataBase:[]
		}
	}
	componentWillMount() {
    api.myBookList().then((data) => {
      if (data.result === 'RC100') {
        this.setState({
					dataBase:data.dataBase?data.bookList:[]
        })
      } else {
        message.error(data.errMsg, 3);
      }
    }, (res) => {
      tool.reject(res);
    })
  }
	render(){
		return(
           <div data-tab-panel-0 className="am-tab-panel am-active tab">
              {
								 this.state.dataBase.map((item,index)=>{
									 return(
										 <div key={index} className="am-panel goods-list">
                     <div className="goods-img"><img alt='test' src={require('../../../style/images/test.png')}
										 src={item.bookPath}
										 /></div>
											<div className="goods-info">
												<p>图书名：{item.bookName}</p>
												<p>作者：{item.author}</p>
												<p>出版社: {item.press}</p>
												<p>原作名: {item.originalAuthor}</p>
												<p>译者:  {item.translator}</p>
												<p>出版年: {item.publishYear}</p>
												<p>页数: {item.pages}</p>
												<button type="button" className="am-btn-primary" data-am-modal="{target: '#my-modal'}">兑换</button>
											</div>
											</div>
									 )
								 })
							 }
            </div>
		)
	}
}
class Library extends React.Component{
	constructor(args){
		super();
		this.state={
            tab:1
        }
	}
	changeTab(tab){
        this.setState({
        tab
    })
    }
	render(){
		return(
			<div className="warpper">
		           <div data-am-widget="tabs" className="am-tabs am-tabs-default">
                      <ul className="am-tabs-nav am-cf nav">
                        <li className={this.state.tab===1?'am-active':null} onClick={()=>this.changeTab(1)}>
                            <a>我的书架</a>
                        </li>
                        <li className={this.state.tab===2?'am-active':null} onClick={()=>this.changeTab(2)}>
                            <a>图书馆</a>
                        </li>
                        <li className={this.state.tab===3?'am-active':null} onClick={()=>this.changeTab(3)}>
                            <a>资料库</a>
                        </li>
				       </ul>
                       <div className="am-tabs-bd">
						   {
							   this.state.tab===1?<Bookshelf />:this.state.tab===2?<MyLibrary/>:<Database/>
						   }
                        </div> 
                   </div>
			</div>
		)
	}

}


export default Library