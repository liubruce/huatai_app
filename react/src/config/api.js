// import {Urls} from './urls'
import sfetch from 'sfetch'
import * as tool from './tools';
import {
  api_Ip
} from './serverIp'

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
        resolve(data.json)
      } else {
        reject(data)
      }
    });
  });
}

export const login = (phone, password) => {
    let body = {};
    body.phone = phone;
    body.password = password;
    return new Promise((resolve, reject) => {
      sfetch.get({
        url: api_Ip + '/login/dologin',
        body: body
      }).then((data) => {
        if (data.ok) {
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
        timeout: 8000
      }).then((data) => {
        if (data.ok) {
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
    url = tool.url_format(url, 'myhome', 'menu');
    return new Promise((resolve, reject) => {
      sfetch.get({
        url: url,
        timeout: 8000
      }).then((data) => {
        if (data.ok) {
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
export const essaylist = () => {
    let url = `${api_Ip}/appessaycenter/essaylist`;
    url = tool.url_format(url, 'essaylist', 'menu');
    return new Promise((resolve, reject) => {
      sfetch.get({
        url: url,
        timeout: 8000
      }).then((data) => {
        if (data.ok) {
          resolve(data.json)
        } else {
          reject(data)
        }
      });
    });
  }


/*
  我的名片
*/

export const userCard = (userCode) => {
  let body = {}
  body.userCode = userCode
  body = tool.behavior(body, 'getone', 'menu');
  return new Promise((resolve, reject) => {
    sfetch.get({
      url: api_Ip + '/appuseranalysis/getone',
      body: body
    }).then((data) => {
      if (data.ok) {
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

export const essayList = (bM={}) => {
  let body = tool.behavior(bM,'myessaylists','menu');
  return new Promise((resolve,reject)=>{
    sfetch.get({
        url:api_Ip + '/appessaycenter/myessaylists',
        body: body
    }).then((data) => {
        if(data.ok) {
          resolve(data.json)
        } else {
          reject(data)
        }
    })
  })

}