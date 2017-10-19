import React from 'react'
import './library.less'
import $ from 'jquery'
import * as tool from '../../../config/tools'
import * as api from '../../../config/api'
import { message,Spin } from 'antd'
import { hashHistory } from 'react-router';
import {getFile_IP } from '../../../config/serverIp'

class Bookshelf extends React.Component {
    constructor(args) {
        super();
        this.state = {
            bookList: [],
            loading:false,
            totalPage:1,
            pageNo:1,
            percent:0
        }
    }
    componentDidMount() {
       tool.addScroll(this,this.myList.bind(this));
    }
    myList(flag){
        tool.loading(this, true);
        api.myList({pageno:this.state.pageNo}).then((data) => {
            if (data.result === 'RC100') {
                this.setState({
                    bookList:flag?this.state.bookList.concat(data.bookList):data.bookList,
                    totalPage:data.totalPage?data.totalPage:0,
                    score:data.score
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
        this.myList();
    }
    componentWillReceiveProps(nextProps) {
        this.myList();
    }

    down(filename) {

        // try {
            // let fileURL = window.cordova.file.cacheDirectory;
            // let fileURL = window.cordova.file.dataDirectory;
            // let fileURL = window.cordova.file.applicationStorageDirectory;
            let fileURL = window.cordova.file.externalDataDirectory;
            // let fileURL = window.cordova.file.externalApplicationStorageDirectory;
            let fileURI = encodeURI(getFile_IP + '/downfile/' + filename);
            fileURL += filename;
            console.log(fileURI);
            console.log(fileURL);
            navigator.fileTransfer.onprogress = (progressEvent) => {
                if (progressEvent.lengthComputable) {
                    console.log(progressEvent.loaded / progressEvent.total * 100);
                    this.setState({
                        percent: (progressEvent.loaded / progressEvent.total * 100).toFixed(0)
                    })
                } else {
                    console.log('complete')
                }
            };
            navigator.fileTransfer.download(
                fileURI,
                fileURL,
                function(entry) {
                    alert("下载成功: " + JSON.stringify(entry, null, 4))
                },
                function(error) {
                    alert('下载失败: ' + JSON.stringify(error, null, 4));
                },
                false, {}
            );
        // } catch (err) {
        //     alert("catch Error: " + err.message);
        // }
    }
    cancelDown(){
        navigator.fileTransfer.abort();
    }
    render() {
        return (
            <Spin spinning={this.state.loading} tip="加载列表中...">
            <div data-tab-panel-0 className="am-tab-panel am-active tab" style={{marginTop: '20px'}}>
				{
		            this.state.bookList.map((item, index) => {
		                return (
		                    <div key={index} className="am-panel goods-list">
			                    <div className="goods-img">
			                    <img alt='test' src={getFile_IP +'/downfile/'+ item.bookPath} />
			                    </div>
								<div className="goods-info">
									<p>图书名：{item.bookName}</p>
									<p>作者：{item.author}</p>
									<p>出版社: {item.press}</p>
									<p>原作名: {item.originalAuthor}</p>
									<p>译者:  {item.translator}</p>
									<p>出版年: {item.publishYear}</p>
									<p>页数: {item.pages}</p>
									<button type="button" className="am-btn-primary" 
                                    onClick={()=>this.down(item.bookEntityPath)}
                                    data-am-modal="{target: '#load-modal'}"
                                    >
                                    <a 
                                    // href={getFile_IP +'/downfile/'+ item.bookEntityPath} download={item.bookEntityPath}
                                     >
                                    下载</a>
                                    </button>
								</div>
							</div>
		                )
		            })
	            }

                <div className="am-modal am-modal-confirm" tabIndex="-1" id="load-modal">
                    <div className="am-modal-dialog">
                        <div className="am-modal-hd">下载中</div>
                        <div className="am-modal-bd">
                            {this.state.percent}%
                        </div>
                        <div className="am-modal-footer">
                           {this.state.percent === 100 || this.state.percent === '100' ?
                            <span className="am-modal-btn">确定</span>
                            :
                            <span onClick={()=>this.cancelDown()} className="am-modal-btn">取消</span>
                           }
                        </div>
                    </div>
                </div>

				<div className="am-modal am-modal-confirm" tabIndex="-1" id="my-modal">
					<div className="am-modal-dialog">
						<div className="am-modal-hd">温馨提示</div>
						<div className="am-modal-bd">
							图书下载成功
						</div>
						<div className="am-modal-footer">
							<span className="am-modal-btn">确定</span>
						</div>
					</div>
				</div>

            </div>
            </Spin>
        )
    }
}
class MyLibrary extends React.Component {
    constructor(args) {
        super();
        this.state = {
            myLibrary: [],
            now_item: 0,
            score: 0,
            loading:false,
            totalPage:1,
            pageNo:1,
        }
    }
    componentDidMount() {
     tool.addScroll(this,this.myBookList.bind(this));
    }
    myBookList(flag){
         tool.loading(this, true);
         api.myBookList({pageno:this.state.pageNo,operationType:1}).then((data) => {
            if (data.result === 'RC100') {
                this.setState({
                    myLibrary:flag?this.state.myLibrary.concat(data.bookList):data.bookList,
                    totalPage:data.totalPage,
                    score: data.score
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
        this.myBookList();
    }
    componentWillReceiveProps(nextProps) {
       this.myBookList();
    }
    jump(item) {
        this.setState({
            now_item: item
        })
    }
    ok() {
        let body = {
            bookId: this.state.now_item.bookId
        }
        api.cashBook(body).then((data) => {
            if (data.result === 'RC100') {
                hashHistory.push(`/App/PersonalCenter/Library`);
            } else {
                message.error(data.errMsg, 3);
            }
            tool.loading(this, false);
        }, (res) => {
            tool.loading(this, false);
            tool.reject(res);
        })
    }
    render() {
        return (
            <Spin spinning={this.state.loading} tip="加载列表中...">
            <div data-tab-panel-0 className="am-tab-panel am-active tab" style={{marginTop: '20px'}}>
	            {
		            this.state.myLibrary.map((item, index) => {
		                return (
		                    <div key={index} className="am-panel goods-list">
			                    <div className="goods-img">
			                     	<img alt='test' src={getFile_IP +'/downfile/'+ item.bookPath}/>
			                    </div>
								<div className="goods-info">
									<p>图书名：{item.bookName}</p>
									<p>作者：{item.author}</p>
									<p>出版社: {item.press}</p>
									<p>原作名: {item.originalAuthor}</p>
									<p>译者:  {item.translator}</p>
									<p>出版年: {item.publishYear}</p>
									<p>页数: {item.pages}</p>
									 <a onClick={() => this.jump(item)}>
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
			           <span className="am-modal-btn" data-am-modal-confirm onClick={() => this.ok()}>确定</span>
			         </div>
			        </div>
			    </div>
            </div>
            </Spin>
        )
    }
}
class Database extends React.Component {
    constructor(args) {
        super();
        this.state = {
            dataBase: [],
            loading:false,
            totalPage:1,
            pageNo:1,
            score:0
        }
    }
    componentDidMount() {
      tool.addScroll(this,this.myBookList.bind(this));
    }
    myBookList(flag){
         tool.loading(this, true);
         api.myBookList({pageno:this.state.pageNo,operationType:2}).then((data) => {
            if (data.result === 'RC100') {
                this.setState({
                    dataBase:flag?this.state.dataBase.concat(data.bookList):data.bookList,
                    totalPage:data.totalPage,
                    score: data.score
                })
            } else {
                message.error(data.errMsg, 3);
            }
             tool.loading(this, false);
        }, (res) => {
            tool.reject(res);
            tool.loading(this, false);
        })  
    }
    componentWillMount() {
        this.myBookList();
    }
    componentWillReceiveProps(nextProps) {
        this.myBookList();
  }
    jump(item) {
        this.setState({
            now_item: item
        })
    }
    ok() {
        let body = {
            bookId: this.state.now_item.bookId
        }
        api.cashBook(body).then((data) => {
            if (data.result === 'RC100') {
                hashHistory.push(`/App/PersonalCenter/Library`);
            } else {
                message.error(data.errMsg, 3);
            }
            tool.loading(this, false);
        }, (res) => {
            tool.loading(this, false);
            tool.reject(res);
        })
    }
    render() {
        return (
            <Spin spinning={this.state.loading} tip="加载列表中...">
            <div data-tab-panel-0 className="am-tab-panel am-active tab" style={{marginTop: '20px'}}>
              {
            this.state.dataBase.map((item, index) => {
                return (
                    <div key={index} className="am-panel goods-list">
                     <div className="goods-img"><img alt='test' src={getFile_IP +'/downfile/'+ item.bookPath}/></div>
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

				<div className="am-modal am-modal-confirm" tabIndex="-1" id="my-confirm">
					<div className="am-modal-dialog">
						<div className="am-modal-hd">温馨提示</div>
						<div className="am-modal-bd">
							兑换《百年孤独》将需要100积分，您的当前积分为1,200，是否继续？
						</div>
						<div className="am-modal-footer">
							<span className="am-modal-btn" data-am-modal-cancel>取消</span>
							<span className="am-modal-btn" data-am-modal-confirm>确定</span>
						</div>
					</div>
				</div>
            </div>
            </Spin>
        )
    }
    f
}
class Library extends React.Component {
    constructor(args) {
        super();
        this.state = {
            tab: 1
        }
    }
    changeTab(tab) {
        this.setState({
            tab
        })
    }
    componentWillUnmount() {
        tool.removeScroll();
     }
    render() {
        return (
            <div className="warpper">
		           <div data-am-widget="tabs" className="am-tabs am-tabs-default">
                      <ul className="am-tabs-nav am-cf nav">
                        <li className={this.state.tab === 1 ? 'am-active' : null} onClick={() => this.changeTab(1)}>
                            <a>我的书架</a>
                        </li>
                        <li className={this.state.tab === 2 ? 'am-active' : null} onClick={() => this.changeTab(2)}>
                            <a>图书馆</a>
                        </li>
                        <li className={this.state.tab === 3 ? 'am-active' : null} onClick={() => this.changeTab(3)}>
                            <a>资料库</a>
                        </li>
				       </ul>
                       <div>
						   {
            this.state.tab === 1 ? <Bookshelf /> : this.state.tab === 2 ? <MyLibrary/> : <Database/>
            }
                        </div> 
                   </div>
			</div>
        )
    }

}


export default Library