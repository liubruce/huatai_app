import {is} from 'immutable';
import * as api from './api'
import {browserHistory} from 'react-router';
import {message} from 'antd'

export const utils = {
	test() {
		console.log('test ok')
	}
}

export let user = JSON.parse(window.localStorage.getItem('user'));

export const save_user = () =>{
	user = JSON.parse(window.localStorage.getItem('user'));
}

export const exit = () => {
	browserHistory.push('/Login');
	window.localStorage.removeItem('user');
	api.loginOut().then((data) => {
		if (data.result === 'RC100') {

		} else {
			message.error(data.errMsg, 3);
		}
	}, (res) => {

	})
}


export const behavior = (body, operationType, behaviorDataType) => {
	return Object.assign(body, {
		operationTypes: operationType,
		behaviorDataType: behaviorDataType,
		ldToken: user.ldToken,
		userCode: user.userCode,
		phone: user.phone,
		// ldToken:'1505458087651ABCDEFG37052',
		// userCode:'20004574',
		// phone:'13920004574',
		deviceId: '',
		netType: '',
		operationLocation: '',
	})
}
export const replaceURLToLink = (text) => {
	var regexp = /((http|ftp|https|file):[^'"\s]+)/ig;
	text = text.replace(regexp, "<a href='$1'>$1</a>");

	return text;
};
export const url_parameter = (data) => {

	var toString = "";
	for (var key in data) {
		var obj = data[key];
		if (Array.isArray(obj)) {
			var arrayString = obj.join(",");
			toString += key + "=" + arrayString + "&";
		} else {
			toString += key + "=" + data[key] + "&";
		}
	}
	toString = "?" + toString;
	return toString;
	// return toString.replace(/$/, "");
}
export const url_format =(url, operationType, behaviorDataType)=>{
	return url  + url_parameter(behavior({},operationType, behaviorDataType));
}

// exit();
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
			answer = [0,1];
			break;
		case 5:
			answer = [0,2];
			break;
		case 9:
			answer = [0,3];
			break;
		case 6:
			answer = [1,2];
			break;
		case 10:
			answer = [1,3];
			break;
		case 7:
			answer = [2,3];
			break;
		case 11:
			answer = [0,1,2];
			break;
		case 14:
			answer = [1,2,3];
			break;
		case 15:
			answer = [1,2,3,4];
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
export const formatTimestamp = (timestamp,type) => {
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
	if(type === 'y-m-d'){
		return year + "-" + month + "-" + day;
	}
	if(type === 'y-m-d h-m'){
		return year + "-" + month + "-" + day + " " + hour + ":" + minute;
	}
	return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

export const reject = (res) => {
	if (res.status === 499) {
		// message.error('请求超时', 3);
	} else {
		// message.error('请求失败', 3);
	}
}
export const courseTypeList = ['销售类', '管理类', '科学类'];
export const courseChannel = ['渠道111', '渠道222', '渠道333'];

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
get local IP
 */
export const getIp = () => {

	// return new Promise((resolve, reject) => {
	//    $.ajax({
	//         url: 'https://api.ipify.org',
	//         type: 'GET',
	//    })
	//    .done(function(data) {
	//         console.log("success",data);
	//    })
	//    .fail(function() {
	//         console.log("error");
	//    })
	//    .always(function() {
	//         // console.log("complete");
	//    });

	// });

}

/*
show loading
 */
export const loading = (_this, flag) => {
	_this.setState({
		loading: flag
	})
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