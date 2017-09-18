// import {Urls} from './urls'
import sfetch from 'sfetch'
import * as tool from './tools';
import {
  api_Ip
} from './serverIp'


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
        url: url
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