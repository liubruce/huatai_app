// import {Urls} from './urls'
import sfetch from 'sfetch'
import * as tool from './tools';
import { api_Ip, lesson_api_IP } from './serverIp'
import $ from 'jquery'
/*
refreshldToken
 */
export const refreshTken = () => {
    let body = {};
    body.requestFlag = 'app';
    body = tool.behavior(body, '', '');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: api_Ip + '/refreshldToken/getnewldToken',
            body: body,
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
back /goback/updateEndtime
 */
export const goback = () => {
    let body = {};
    body = tool.behavior(body, '', '');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: api_Ip + '/appgoback/appupdateEndtime',
            body: body,
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}

export const login = (phone, password) => {
    let body = {};
    body.userCode = phone;
    body.passWord = password;
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: api_Ip + '/login/dologin',
            body: body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });

    });
}
/*
login
 */
export const getMenu = () => {
    let url = `${api_Ip}/applogin/appdologin`;
    url = tool.url_format(url, 'login', 'button');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: url,
            timeout: 12000
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });

    });
}
/*
注销
 */
export const pc_loginOut = () => {
    let url = `${api_Ip}/home/logout`;
    url = tool.url_format(url, 'logout', 'button');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: url,
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
注销
 */
export const loginOut = () => {
    let url = `${api_Ip}/apphome/applogout`;
    url = tool.url_format(url, 'logout', 'button');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: url,
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
index
 */
export const homeIndex = () => {
    let url = `${api_Ip}/apphome/index`;
    url = tool.url_format(url, 'appMainPage', 'menu');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: url,
            timeout: 8000
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json);
            } else {
                reject(data);
            }
        });
    });
}
/*
myhome /appuseranalysis/myhome
 */
export const myhome = () => {
    let url = `${api_Ip}/appuseranalysis/myhome`;
    url = tool.url_format(url, 'myhome', 'menu');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: url,
            timeout: 8000
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
article 
 */
export const essaylist = (body) => {
    let url = `${api_Ip}/appessaycenter/essaylist`;
    url = tool.url_format(url, 'essaylist', 'menu', body);
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: url,
            timeout: 8000
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
/appessaymanager/operateessay
 */
export const operateessay = (body) => {
    let url = `${api_Ip}/appessaycenter/operateessay`;
    url = tool.url_format(url, 'operateEssay', 'button', body);
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: url,
            timeout: 8000
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
/thriftClient/operateCourse
 */
export const operatecourse = (body) => {
    let url = `${api_Ip}/thriftClient/operateCourse`;
    url = tool.url_format(url, 'operatecourse', 'button', body);
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: url,
            timeout: 8000
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
/thriftClient/cashcourse
 */
export const cashcourse = (body) => {
    let url = `${api_Ip}/thriftClient/cashCourse`;
    url = tool.url_format(url, 'cashcourse', 'button', body);
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: url,
            timeout: 8000
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
/appessaycenter/cashessay
 */
export const cashessay = (body) => {
    let url = `${api_Ip}/appessaycenter/cashessay`;
    url = tool.url_format(url, 'cashessay', 'button', body);
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: url,
            timeout: 8000
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}

/*
/apptop/studenttop
 */
export const studenttop = (body) => {
    let url = `${api_Ip}/apptop/studenttop`;
    url = tool.url_format(url, 'studenttop', 'menu', body);
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: url,
            timeout: 8000,
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}


/*
coursetop
 */
export const coursetop = (body) => {
    let url = `${api_Ip}/apptop/coursetop`;
    url = tool.url_format(url, 'coursetop', 'menu', body);
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: url,
            timeout: 8000,
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
/appuseranalysis/sign
 */
export const sign = () => {
    let url = `${api_Ip}/appuseranalysis/sign`;
    url = tool.url_format(url, 'sign', 'button');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: url,
            timeout: 8000,
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
/appELearning/appCourse/appStudentSelectCoursePager
 */
export const appStudentSelectCoursePager = (body = {}) => {
    let url = `${lesson_api_IP}/appELearning/appCourse/appStudentSelectCoursePager`;
    url = tool.url_format(url, 'mainPage', 'menu', body);
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: url,
            timeout: 8000,
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
/eLearning/Course/appLoadCourse
 */
export const appLoadCourse = (body) => {
    let url = `${lesson_api_IP}/appELearning/appCourse/appLoadCourse`;
    url = tool.url_format(url, 'mainPage', 'menu', body);
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: url,
            timeout: 8000,
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
/eLearning/Course/appOnlineAnswer
 */
export const appOnlineAnswer = (body) => {
    let url = `${lesson_api_IP}/appELearning/appCourse/appOnlineAnswer`;
    url = tool.url_format(url, 'mainPage', 'menu', body);
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: url,
            timeout: 8000,
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
/eLearning/Course/appSubmCourseTitle
 */
export const appSubmCourseTitle = (body) => {
    let url = `${lesson_api_IP}/appELearning/appCourse/appSubmCourseTitle`;
    url = tool.url_format(url, 'mainPage', 'menu');
    return new Promise((resolve, reject) => {
        sfetch.post({
            url: url,
            timeout: 8000,
            body: body,
            dataType: 'formdata'
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
综合考题
/appeLearning/randomTitle/selectRandomTitle
 */
export const selectRandomTitle = (body) => {
    let url = `${lesson_api_IP}/appeLearning/randomTitle/appselectRandomTitle`;
    url = tool.url_format(url, 'mainPage', 'menu', body);
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: url,
            timeout: 8000,
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
/appeLearning/randomTitle/submRandomCourseTitle
 */
export const submRandomCourseTitle = (body) => {
    let url = `${lesson_api_IP}/appeLearning/randomTitle/appsubmRandomCourseTitle`;
    url = tool.url_format(url, 'mainPage', 'menu');
    return new Promise((resolve, reject) => {
        sfetch.post({
            url: url,
            timeout: 8000,
            body: body,
            dataType: 'formdata'
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
综合考题
appELearning/appCourse/appTestPaperOnlineAnswer
 */
export const appTestPaperOnlineAnswer = (body) => {
    let url = `${lesson_api_IP}/appELearning/appCourse/appTestPaperOnlineAnswer`;
    url = tool.url_format(url, 'mainPage', 'menu', body);
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: url,
            timeout: 8000,
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
appELearning/appCourse/appSubmTestPaperTitle
 */
export const appSubmTestPaperTitle = (body) => {
    let url = `${lesson_api_IP}/appELearning/appCourse/appSubmTestPaperTitle`;
    url = tool.url_format(url, 'mainPage', 'menu');
    return new Promise((resolve, reject) => {
        sfetch.post({
            url: url,
            timeout: 8000,
            body: body,
            dataType: 'formdata'
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
//------------------------------------------------------

/*
  我的名片
*/

export const userCard = (body = {}) => {
    body = tool.behavior(body, 'getone', 'menu');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: api_Ip + '/appuseranalysis/getone',
            body: body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/**
 *honor/myhonor//称号个人名片显示荣誉
 */
export const myHonor = (body = {}) => {
    body = tool.behavior(body, 'honor', 'menu')
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: api_Ip + '/honor/myhonor',
            body: body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }


        });
    });

}
/*
  我的蜂行圈
*/

export const myEssayList = (bM = {}) => {
    let body = tool.behavior(bM, 'myessaylists', 'menu');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: api_Ip + '/appessaycenter/myessaylists',
            body: body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        })
    })

}

/*
  /appessaycenter/insertOrUpdate我的蜂行圈文章发布
*/
export const appAddArticle = (body, onprogress) => {
    let url = `${api_Ip}/appessaycenter/insertOrUpdate`;
    url = tool.url_format(url, 'essayOperation', 'button');
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            data: body,
            type: 'POST',
            contentType: false,
            processData: false,
            success: function(data) {
                resolve(data)
            },
            error: function(data) {
                console.log(data)
                reject(data)
            },
            xhr: function() {
                let xhr = $.ajaxSettings.xhr();
                if (onprogress && xhr.upload) {
                    xhr.upload.addEventListener("progress", onprogress, false);
                    return xhr;
                }
            },
        });

        // sfetch.post({
        //     url: url,
        //     body: body,
        //     dataType: 'formdata',
        //     timeout: 35000
        // }).then((data) => {
        //     if (data.ok) {
        //         tool.checkLogin(data.json);
        //         resolve(data.json)
        //     } else {
        //         reject(data)
        //     }
        // });


    });
}
/**
 * /appcoursemanagement/moreclick课程动态
 */
export const courseClick = (bM = {}) => {
    let body = tool.behavior(bM, 'moreclick', 'menu');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/appcoursemanagement/moreclick`,
            timeout: 8000,
            body: body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/**
 * /appessaycenter/moreessay锋行圈动态
 */
export const moreEssay = (bM = {}) => {
    let body = tool.behavior(bM, 'moreessay', 'menu');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/appessaycenter/moreessay`,
            timeout: 8000,
            body: body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/**
 * /appessaycenter/morecolessay锋行圈收藏
 */
export const morecolEssay = (bM = {}) => {
    let body = tool.behavior(bM, 'morecolessay', 'menu');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/appessaycenter/morecolessay`,
            timeout: 8000,
            body: body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/**
 * /appcoursemanagement/collection课程收藏
 */
export const couCollection = (bM = {}) => {
    let body = tool.behavior(bM, 'collection', 'menu');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/appcoursemanagement/collection`,
            timeout: 8000,
            body: body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/**
 * /appmessagecenter/unreadinformationlist未读消息
 */
export const unreadInformationlist = (bM = {}) => {
    let body = tool.behavior(bM, 'unreadInformation', 'menu');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/appmessagecenter/unreadinformationlist`,
            timeout: 8000,
            body: body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/**
 * /appmessagecenter/readinformationlist已读消息
 */
export const readInformationlist = (bM = {}) => {
    let body = tool.behavior(bM, 'readInformation', 'menu');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/appmessagecenter/readinformationlist`,
            timeout: 8000,
            body: body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
//查看消息接口
export const viewmessage = (id) => {
    let body = {
        informationId: id,

    }
    body = tool.behavior(body, 'markInformation', 'button')

    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/messagecenter/markinformationasread`,
            body
        }).then((data) => {
            tool.checkLogin(data.json);
            resolve(data.json)
        });
    });
}

/**
 * /appbookmanagerment/mylist我的书架
 */
export const myList = (bM = {}) => {
    let body = tool.behavior(bM, 'myBookshelf', 'menu');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/appbookmanagerment/mylist`,
            timeout: 8000,
            body: body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/**
 * /appbookmanagerment/list图书馆（资料库）
 */
export const myBookList = (bM = {}) => {
    let body = tool.behavior(bM, 'Library', 'menu');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/appbookmanagerment/list`,
            timeout: 8000,
            body: body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}


/*
  /appbookmanagerment/cashbook图书兑换

*/
export const cashBook = (bM = {}) => {
    let body = tool.behavior(bM, 'caseBook', 'button');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/appbookmanagerment/cashbook`,
            timeout: 8000,
            body: body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}

/**
 * /appintegralmall/list积分商城
 */
export const pointShopList = (bM = {}) => {
    let body = tool.behavior(bM, 'IntegralMall', 'menu');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/appintegralmall/list`,
            timeout: 8000,
            body: body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
/appintegralmall/change积分商城兑换
*/
export const pointChange = (bM = {}) => {
    let body = tool.behavior(bM, 'IIntegralChange', 'button');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/appintegralmall/change`,
            timeout: 8000,
            body: body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}

/**
 * 积分详情
 */
/**
 * /appessaycenter/selectessay文章详情
 */
export const selectEssay = (bM = {}) => {
    let body = tool.behavior(bM, 'selectEssay', 'button');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/appessaycenter/selectessay`,
            timeout: 8000,
            body: body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/**
 * /appuserintgrallog/applookintegraldetails个人积分详情
 */
export const integralDetails = (bM = {}) => {
    let body = tool.behavior(bM, 'lookIntegraldetail', 'menu');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/appuserintgrallog/applookintegraldetails`,
            timeout: 8000,
            body: body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/**
 * /appuserintgrallog/appfuzzyintgraldetails积分详情查询
 */
export const fuzzyIntgral = (bM = {}) => {
    let body = tool.behavior(bM, 'fuzzyIntgraldetail', 'button');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/appuserintgrallog/appfuzzyintgraldetails`,
            timeout: 8000,
            body: body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/**
 * /appstoryline/appselectuserdetail故事线
 */
export const selectuserDetail = (bM = {}) => {
    let body = tool.behavior(bM, 'storyline', 'menu');
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/appstoryline/appselectuserdetail`,
            timeout: 8000,
            body: body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/**
 * /appuseranalysis/update个人名片修改
 */
export const userUpdate = (formData) => {
    let url = `${api_Ip}/appuseranalysis/update`;
    url = tool.url_format(url, 'update', 'button');
    // let body = tool.behavior(bM, 'update', 'button');
    return new Promise((resolve, reject) => {
        sfetch.post({
            url: url,
            timeout: 12000,
            body: formData,
            dataType: 'formdata'
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/**
 * 积分规则
 */
/**
 *integralmall/levelset/积分规则
 */
export const levelSet = (body = {}) => {
    body = tool.behavior(body, 'certificate', 'menu')
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/integralmall/levelset`,
            body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });

}

/**
    *appuseranalysis/getagentchangeList成长经历
    */
export const getAgentchangeApp = (body = {}) => {
    body = tool.behavior(body, 'getagentchangeList', 'button')
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/appuseranalysis/getagentchangeList`,
            body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });

}
/**
   *certificate/allcertificate/称号个人名片显示荣誉
   */
export const allCertificate = (body = {}) => {
    body = tool.behavior(body, 'certificate', 'menu')
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/certificate/allcertificate`,
            body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });

}
/**
   *appprivateletter/appaddresseeprivateletter/私信主题接口
   */
export const addresseePrivateLetter = (body = {}) => {
    body = tool.behavior(body, 'privateletter', 'button')
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/appprivateletter/appaddresseeprivateletter`,
            body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });

}
/**
   *appprivateletter/ appdelletter删除私信主题
   */
export const delletter = (body = {}) => {
    body = tool.behavior(body, 'privatelettdeleter', 'button')
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/appprivateletter/appdelletter`,
            body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });

}
/**
   *appprivateletterinfo/appletterinfo查看私信内容详情接口
   */
export const appletterInfo = (body = {}) => {
    body = tool.behavior(body, 'privateletter', 'button')
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${api_Ip}/appprivateletterinfo/appletterinfo`,
            body
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });

}
/*
/ appprivateletterinfo/ appsendletterinfo
 */
export const appsendLetterinfo = (body) => {
    let url = `${api_Ip}/appprivateletterinfo/appsendletterinfo`;
    url = tool.url_format(url, 'privatelettsenderletter', 'button');
    return new Promise((resolve, reject) => {
        sfetch.post({
            url: url,
            timeout: 8000,
            body: body,
            dataType: 'formdata'
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}

/*
*appprivateletter/appsendletter发送主题
 */
export const appsendLetter = (body) => {
    let url = `${api_Ip}/appprivateletter/appsendletter`;
    url = tool.url_format(url, 'privatelettsenderletter', 'button');
    return new Promise((resolve, reject) => {
        sfetch.post({
            url: url,
            timeout: 8000,
            body: body,
            dataType: 'formdata'
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
*appELearning/appCourse/appSelectExamDetail查看课程考试详情
 */
export const appSelectExamDetail = (body) => {
    body = tool.behavior(body, 'mainPage', 'menu')
    let url = `${lesson_api_IP}/appELearning/appCourse/appSelectExamDetail`;
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: url,
            timeout: 8000,
            body: body,
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
/*
*appELearning/appCourse/appSelectBigTestExamDetail查看综合答题历史信息
*/
export const appSelectBigTestExamDetail = (body = {}) => {
    body = tool.behavior(body, 'mainPage', 'menu')
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${lesson_api_IP}/appELearning/appCourse/appSelectBigTestExamDetail`,
            body,
            timeout: 8000,
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}

/*
appELearning/appCourse/appSaveVideoTimes
 */
export const appSaveVideoTimes = (body = {}) => {
    body = tool.behavior(body, 'mainPage', 'menu')
    return new Promise((resolve, reject) => {
        sfetch.get({
            url: `${lesson_api_IP}/appELearning/appCourse/appSaveVideoTimes`,
            body,
            timeout: 8000,
        }).then((data) => {
            if (data.ok) {
                tool.checkLogin(data.json);
                resolve(data.json)
            } else {
                reject(data)
            }
        });
    });
}
