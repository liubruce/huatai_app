/**
 * 用于判断当前访问的浏览器类型,以便引用不同的cordova.js文件
 * 请注意将该文件引入放置到html文件的末尾,否则无法正常工作
 */
(function() {
	var device = sino_cordova_checkApp().device;
	// console.log('cordova加载器检测设备:', device);
	//如果不是浏览器版本 需要添加cordova
	if (device !== 'Browser') {
		console.debug('当前运行环境为' + device + '系统定制WebView,准备加载cordova');
		var scriptE = document.createElement('script');
		scriptE.setAttribute('type', 'text/javascript');

		// scriptE.setAttribute('src','IOS/cordova.js');
		scriptE.setAttribute('src', device + '/cordova.js');

		document.body.appendChild(scriptE);
	}

	function sino_cordova_checkApp() {
		// 安卓APP 和 IOS APP中增加了自定义UA 用于识别当前的版本
		// 其中安卓UA为 SINO_ANDROID_APP/1.0 1.0为版本号
		// IOS UA为 SINO_IOS_APP/1.0
		var reData = {};
		var match = navigator.userAgent.match(/SINO_([\w]+)_APP\/([\d.]+)/);
		// alert(JSON.stringify(match))
		if (match) {
			reData.device = match[1] === 'IOS' ? 'IOS' : 'Android';
			reData.version = match[2];
		} else {
			reData.device = 'Browser';
			reData.version = '0'
		}

		return reData;
	}

	// function findCordovaPath() {
	// 	var path = null;
	// 	var scripts = document.getElementsByTagName('script');
	// 	var term = '/cordova.js';
	// 	for (var n = scripts.length - 1; n > -1; n--) {
	// 		var src = scripts[n].src.replace(/\?.*$/, ''); // Strip any query param (CB-6007).
	// 		if (src.indexOf(term) === (src.length - term.length)) {
	// 			path = src.substring(0, src.length - term.length);
	// 			break;
	// 		}
	// 	}
	// 	return path;
	// }
})();