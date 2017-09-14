// import {Urls} from './urls'
import sfetch from 'sfetch'
import * as tool from './tools';
import {api_Ip}  from './serverIp'

/*
login
 */
export const login = () => {
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