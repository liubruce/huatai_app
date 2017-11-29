import { is } from 'immutable';
import * as api from './api'
import { hashHistory } from 'react-router';
import { message } from 'antd';
import $ from 'jquery'
import { getFile_IP } from './serverIp'

export const camera = () => {
    return new Promise((resolve, reject) => {
        navigator.camera.getPicture((imageData) => {
                resolve(imageData)
            },
            (error) => {
                reject(error);
            }, {
                quality: 50,
                correctOrientation: true,
                sourceType: navigator.camera.PictureSourceType.CAMERA,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                saveToPhotoAlbum: false
            }
        );
    });
}
export const imagePicker = (num) => {
    return new Promise((resolve, reject) => {
        window.imagePicker.getPictures(
            (imgs) => {
                resolve(imgs);
            },
            (error) => {
                reject(error);
            }, {
                maximumImagesCount: num,
                width: 800
            }
        );
    });
}
export const dataURItoBlob = (base64Data) => {
    var byteString;
    if (base64Data.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(base64Data.split(',')[1]);
    else
        byteString = unescape(base64Data.split(',')[1]);
    var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {
        type: mimeString
    });
}
export const convertImgToBase64URL = (imgUrl) => {
    function convertFileToDataURLviaFileReader(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }
    var convertFunction = convertFileToDataURLviaFileReader;

    return new Promise((resolve, reject) => {
        convertFunction(imgUrl, function(base64Img) {
            resolve(base64Img)
        })
    });
}

export const orient = () => {
    return window.orientation === 90;
}
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
export const IsPC = () => {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
export const isPc = sino_cordova_checkApp().device === 'Browser';
export const isIOS = sino_cordova_checkApp().device === 'IOS';

export let utils = {
    test() {
        console.log('test ok')
    }
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
    return url.slice(index + 9, url.length)
}

export const execSQL = (sql, value) => {
    console.log('elearning sql: ' + sql);
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
        let userCode = getUserCode();
        console.log('elearning get useCode: ' + userCode);
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
            _user.device = sino_cordova_checkApp().device;
            localStorage.setItem("user", JSON.stringify(_user));
            save_user();
            console.log('elearning user information: ' + JSON.stringify(user))
            api.getMenu().then((data) => {
                if (data.result === 'RC100') {
                    _resolve();
                    _user.menu = data.menu;
                    localStorage.setItem("user", JSON.stringify(_user));
                    save_user();
                } else {
                    _user.menu = [];
                    localStorage.setItem("user", JSON.stringify(_user));
                    save_user();
                    _reject(data.errMsg);
                }
            }, (res) => {
                _user.menu = [];
                localStorage.setItem("user", JSON.stringify(_user));
                save_user();
                if (res.status === 499) {
                    _reject('请求超时,请检查网络');
                } else {
                    _reject('请求失败,请检查服务器');
                }
            })
        }, (err) => {
            _reject('sql error: ' + err);
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
                console.log(result)
            }, (reject) => {
                console.log('elearning sql error:' + reject);
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
export const checkInput = (value) => {
    return value !== undefined && value != '' && value != null;
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
export const getFile = (fileName) => {
    if (fileName === null || fileName === undefined) {
        return '路径错误';
    }
    return url_format(getFile_IP + fileName);
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
        case 12:
            answer = [2, 3];
            break;
        case 7:
            answer = [0, 1, 2];
            break;
        case 11:
            answer = [0, 1, 3];
            break;
        case 13:
            answer = [0, 2, 3];
            break;
        case 14:
            answer = [1, 2, 3];
            break;
        case 15:
            answer = [0, 1, 2, 3];
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
export const addScroll = (_this, show) => {
    let add = () => {
        if (_this.state.totalPage >= _this.state.pageNo + 1) {
            _this.setState({
                pageNo: _this.state.pageNo + 1
            }, () => {
                show(true);
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

export const cancelDown = () => {
    navigator.fileTransfer.abort();
}
export const appAlert = (text) => {
    if (isPc) {
        alert(text);
        return;
    }
    navigator.notification.alert(
        text,
        () => {

        },
        '提示',
        'OK'
    );
}
export const downFile = (filename, that) => {

    let downUrl = encodeURI(getFile(filename));
    if (IsPC()) {
        console.log(downUrl);
        window.jquery('#load-modal').modal('close');
        return;
    }
    down(downUrl, filename);

    function down(downUrl, filename) {
        window.requestFileSystem(navigator.PERSISTENT, 0, function(fs) {
            fs.root.getFile('filename', {
                create: true,
                exclusive: false
            }, function(fileEntry) {
                download(fileEntry, downUrl);
            }, onErrorCreateFile);

        }, onErrorLoadFs);
    }

    //下载文件
    function download(fileEntry, uri) {
        // var fileURL = fileEntry.toURL();
        var path = window.cordova.file.dataDirectory + filename;
        navigator.fileTransfer.download(
            uri,
            path,
            function(entry) {
                navigator.notification.alert(
                    JSON.stringify(entry, null, 4),
                    () => {

                    },
                    '下载成功',
                    'OK'
                );
            },
            function(error) {
                navigator.notification.alert(
                    JSON.stringify(error, null, 4),
                    () => {

                    },
                    '下载失败',
                    'OK'
                );
            }
        );
    }

    //文件创建失败回调
    function onErrorCreateFile(error) {
        console.log("文件创建失败！")
    }

    //FileSystem加载失败回调
    function onErrorLoadFs(error) {
        console.log("文件系统加载失败！")
    }



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

export const checkLogin = (data) => {
    if (data.result === "RC500") {
        if (sino_cordova_checkApp().device === 'Browser') {
            hashHistory.push('/Login');
        }
    }
}
//文章显示
export const subString = (string, subLength) => {
    if (typeof(string) !== 'string') {
        return '';
    }
    if (string.length > subLength) {
        return string.substring(0, subLength) + '...'
    } else {
        return string
    }
}