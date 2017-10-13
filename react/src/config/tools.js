import {
	is
} from 'immutable';
import * as api from './api'
import {
	hashHistory
} from 'react-router';
import {
	message
} from 'antd';
import $ from 'jquery'

export const sino_cordova_checkApp = () => {
	// 安卓APP 和 IOS APP中增加了自定义UA 用于识别当前的版本
	// 其中安卓UA为 SINO_ANDROID_APP/1.0 1.0为版本号
	// IOS UA为 SINO_IOS_APP/1.0
	let reData = {};
	let match = navigator.userAgent.match(/SINO_([\w]+)_APP\/([\d.]+)/);
	if (match) {
		reData.device = match[1] === 'IOS' ? 'IOS' : 'Android';
		reData.version = match[2];
	} else {
		reData.device = 'Browser';
		reData.version = '0'
	}
	return reData;
}

// export const isPc = document.URL.indexOf(":8889") !== -1;
export const isPc = sino_cordova_checkApp().device === 'Browser';

export let utils = {
	test() {
		console.log('test ok')
	}
}

export const log = (text) => {
	console.log('----------------------' + text);
	// alert(text);
}

export let back_url;
export let exit_url;

export const setUrl = (a, b) => {
	back_url = a;
	exit_url = b;
}

export let user = JSON.parse(localStorage.getItem('user'));

export const save_user = () => {
	user = JSON.parse(localStorage.getItem('user'));
}

export const exit = () => {
	if (isPc) {
		hashHistory.push('/Login');
	}
	localStorage.removeItem('user');
	api.loginOut().then((data) => {
		if (data.result === 'RC100') {

		} else {
			message.error(data.errMsg, 3);
		}
	}, (res) => {
		reject(res);
	})
}
export const back = () => {
	api.goback().then((data) => {
		if (data.result === 'RC100') {

		} else {
			message.error(data.errMsg, 3);
		}
	}, (res) => {
		reject(res);
	})
}
export const getUserCode = () => {
	let url = document.URL;
	let index = url.indexOf('userCode=');
	return url.slice(index + 9, index + 17)
}

export const execSQL = (sql, value) => {
	log(sql);
	return new Promise((resolve, reject) => {
		let db = window.SQLitePlugin.sqlitePlugin.openDatabase({
			name: 'HuaTai.db',
			location: 'default'
		});
		let sqlValue = [];
		if (value !== "") {
			sqlValue = value;
		}
		db.transaction(function(tx) {
			tx.executeSql(sql, sqlValue, function(tx, rs) {
				resolve({
					tx,
					rs
				})
			}, function(tx, err) {
				reject(err.message)
			});
		});
	});
}

export const info = () => {
	return new Promise((_resolve, _reject) => {
		localStorage.setItem("device", sino_cordova_checkApp().device);
		log("-------------device-------------" + localStorage.getItem('device'))
		let userCode = getUserCode();
		let sql = 'SELECT a.USERCODE,a.MOBILE,a.DEADTIME,a.LDTOKEN FROM LSUSER a WHERE a.USERCODE=' + userCode;
		localStorage.setItem("user", JSON.stringify({
			userCode: userCode
		}));
		save_user();
		execSQL(sql).then((result) => {
			let item = result.rs.rows.item(0)
			let _user = {};
			_user.deadTime = item.DEADTIME;
			_user.ldToken = item.LDTOKEN;
			_user.phone = item.MOBILE;
			_user.userCode = userCode;

			localStorage.setItem("user", JSON.stringify(_user));
			save_user();
			alert(JSON.stringify(user))
			api.getMenu().then((data) => {
				if (data.result === 'RC100') {
					_resolve();
					message.success('菜单获取成功', 3);
					_user.menu = data.menu;
					localStorage.setItem("user", JSON.stringify(_user));
					save_user();
					log(JSON.stringify(user))
				} else {
					_reject();
					_user.menu = [];
					localStorage.setItem("user", JSON.stringify(_user));
					save_user();
					message.error(data.errMsg, 3);
					setTimeout(() => {
						window.location.href = exit_url;
					}, 2000)
				}
			}, (res) => {
				_reject();
				_user.menu = [];
				localStorage.setItem("user", JSON.stringify(_user));
				save_user();
				reject(res);
			})
		}, (err) => {
			_reject();
			log('******sql error**** :' + err)
		})
	});
}

export const refreshToken = () => {
	api.refreshTken().then((data) => {
		if (data.result === 'RC100') {
			let _user = user;
			_user.deadTime = data.deadTime;
			_user.ldToken = data.ldToken;
			localStorage.removeItem('user');
			localStorage.setItem("user", JSON.stringify(_user));
			save_user();
			let sql = `UPDATE LSUSER  SET DEADTIME='${data.deadTime}',LDTOKEN='${data.ldToken}' WHERE USERCODE='${user.userCode}'`;
			execSQL(sql).then((result) => {
				console.log('-----update ok------' + JSON.stringify(result))
			}, (reject) => {
				log('******sql error**** :' + reject);
			})
		} else {
			message.error(data.errMsg, 3);
		}
	}, (res) => {
		reject(res);
	})
}
export const checkldToken = () => {
	let now_timestamp = Date.parse(new Date());
	let min = (user.deadTime - now_timestamp) / (60 * 1000);
	if (min < 10) {
		refreshToken();
	}
}

export const behavior = (body, operationType, behaviorDataType) => {
	if (user === null) {
		hashHistory.push('/Login');
		return;
	}
	return Object.assign(body, {
		operationTypes: operationType,
		behaviorDataType: behaviorDataType,
		ldToken: user.ldToken,
		userCode: user.userCode,
		phone: user.phone,
		deadTime: user.deadTime,
		deviceId: '',
		netType: '',
		operationLocation: '',
	})
}
export const getQueryString = (name) => {
	let url = window.location.hash.slice(window.location.hash.indexOf('?'), window.location.hash.length);
	let qs = url.substr(1), // 获取url中"?"符后的字串   
		args = {}, // 保存参数数据的对象
		items = qs.length ? qs.split("&") : [], // 取得每一个参数项,
		item = null,
		len = items.length;

	for (let i = 0; i < len; i++) {
		item = items[i].split("=");
		let name = decodeURIComponent(item[0]),
			value = decodeURIComponent(item[1]);
		if (name) {
			args[name] = value;
		}
	}
	return args[name] === undefined ? '' : args[name];
}
export const url_parameter = (data) => {

	let toString = "";
	for (let key in data) {
		let obj = data[key];
		if (Array.isArray(obj)) {
			let arrayString = obj.join(",");
			toString += key + "=" + arrayString + "&";
		} else {
			toString += key + "=" + data[key] + "&";
		}
	}
	toString = "?" + toString;
	return toString;
	// return toString.replace(/$/, "");
}
export const url_format = (url, operationType, behaviorDataType, body = {}) => {
	return url + url_parameter(behavior(body, operationType, behaviorDataType));
}

export const getAnswer = (num) => {
	let answer = []
	switch (num) {
		case 1:
			answer = [0];
			break;
		case 2:
			answer = [1];
			break;
		case 4:
			answer = [2];
			break;
		case 8:
			answer = [3];
			break;
		case 3:
			answer = [0, 1];
			break;
		case 5:
			answer = [0, 2];
			break;
		case 9:
			answer = [0, 3];
			break;
		case 6:
			answer = [1, 2];
			break;
		case 10:
			answer = [1, 3];
			break;
		case 7:
			answer = [2, 3];
			break;
		case 11:
			answer = [0, 1, 2];
			break;
		case 14:
			answer = [1, 2, 3];
			break;
		case 15:
			answer = [1, 2, 3, 4];
			break;
		default:
			break;
	}
	return answer;
}

/*
get Object to map
 */
export const getObject = (num) => {
	let obj = [];
	for (let i = 0; i < num; i++) {
		obj.push({})
	}
	return obj;
}

/*
format timestamp
 */
export const formatTimestamp = (timestamp, type) => {
	let now = new Date(timestamp);
	let year = now.getFullYear();
	let month = now.getMonth() + 1;
	let day = now.getDate();
	let hour = now.getHours();
	let minute = now.getMinutes();
	let second = now.getSeconds();
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	hour = hour < 10 ? "0" + hour : hour;
	minute = minute < 10 ? "0" + minute : minute;
	second = second < 10 ? "0" + second : second;
	if (type === 'y-m-d') {
		return year + "-" + month + "-" + day;
	}
	if (type === 'y/m/d') {
		return year + "/" + month + "/" + day;
	}
	if (type === 'y-m-d h-m') {
		return year + "-" + month + "-" + day + " " + hour + ":" + minute;
	}
	return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

export const reject = (res) => {
	if (res.status === 499) {
		message.error('请求超时,请检查网络', 3);
	} else {
		message.error('请求失败,请检查服务器', 3);
	}
}

export const headImageError = (e) => {
	e.target.src = require('../style/images/portrait.png');
}
export const courseChannel = ['内勤', '个险', '团险', '', '银保', '续期'];


/*
get today date
 */
export const getToday = () => {
	let date = new Date();
	// let Y = date.getFullYear();
	let M = date.getMonth() + 1;
	let D = date.getDate();
	M = M < 10 ? '0' + M : M;
	D = D < 10 ? '0' + D : D;

	let today = M + '月' + D + '日';
	return today;
}


/*
show loading
 */
export const loading = (_this, flag) => {
	_this.setState({
		loading: flag
	})
}

/*
scrollShow
 */
export const addScroll = (_this) => {　
	let add = () => {
		if (_this.state.totalPage >= _this.state.pageNo + 1) {
			_this.setState({
				pageNo: _this.state.pageNo + 1
			}, () => {
				_this.show(true);
			})
		}
	}
	$(window).on('scroll.show', function() {
		let scrollTop = $(this).scrollTop();　　
		let scrollHeight = $(document).height();　　
		let windowHeight = $(this).height();　　
		if (scrollTop + windowHeight === scrollHeight) {　
			add();　
		}
	});
}

export const removeScroll = () => {
	$(window).off('.show');
}

/**
 * 代码优化
 * by QianLi
 * 2017-8-24
 */
export const shouldComponentUpdate = (nextProps = {}, nextState = {}, thisProps = {}, thisState = {}) => {
	if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
		return true;
	}
	if (thisState && nextState && Object.keys(thisState).length !== Object.keys(nextState).length) {
		return true;
	}
	for (const key in nextProps) {
		if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
			return true;
		}
	}
	for (const key in nextState) {
		if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
			return true;
		}
	}
	return false;
}