import React from 'react';
import {
    render
} from 'react-dom'
import {
    Router,
    Route,
    IndexRoute,
    hashHistory,
    Redirect
} from 'react-router'
import App from '../components/App.jsx'
import NotFoundPage from '../components/notfound/NotFoundPage.jsx'
import Index from '../components/index/Index.jsx'
import Login from '../components/login/Login.jsx'
import Course from '../components/course/Course.jsx'
import Article from '../components/article/Article.jsx'
import personalRoutes from './personal'
import * as tool from '../config/tools'

const start_render = () => {
    render(
        <Router history={hashHistory}>
         <Route path='/Login' component={Login} />
         <Route path='/' component={App}>
             <IndexRoute component={Index} />
             <Route path='/Index' component={Index} />
             <Route path='/Course' component={Course} />
             <Route path='/Article' component={Article} />
         </Route>
         {personalRoutes}
         <Route path='/404' component={NotFoundPage} />
         <Redirect from='*' to='/404' />
       </Router>,
        document.getElementById('root')
    );
}

if (tool.isPc) {    
    document.addEventListener('deviceready', () => {
        console.log('---------local deviceready')
        start_render();
    }, false);
} else {
    console.log('---------run on APP')
    document.addEventListener('deviceready', () => {
        console.log('---------APP deviceready')
        if (tool.sino_cordova_checkApp().device === 'IOS') {
            let back_url = window.cordova.file.applicationDirectory + 'www/index.html#/index';
            let exit_url = window.cordova.file.applicationDirectory + 'www/index.html';
            tool.setUrl(back_url, exit_url);
        } else {
            let back_url = 'file:////data/data/com.sinosoft.huatai/files/www/DD/build/index.html#/index';
            let exit_url = 'file:////data/data/com.sinosoft.huatai/files/www/DD/build/index.html';
            tool.setUrl(back_url, exit_url);
        }
        tool.info().then((data) => {
            start_render();
        }, () => {
            start_render();
        })
    }, false);
}


