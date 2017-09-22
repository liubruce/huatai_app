import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute,browserHistory,Redirect} from 'react-router'
import {Provider} from 'react-redux'
import store from '../redux/Store/Store'
import App from '../components/App.jsx'
import NotFoundPage from '../components/notfound/NotFoundPage.jsx'
import Index from '../components/index/Index.jsx'
import Course from '../components/course/Course.jsx'
import Article from '../components/article/Article.jsx'
import Login from '../components/login/Login.jsx'

import personalRoutes from './personal'

// import 'amazeui-touch/dist/amazeui.touch.min.css';

render(
	<Provider store={store}>
       <Router history={browserHistory}>
         <Route path='/Login' component={Login} />
         <Route path='/' component={App}>

             <IndexRoute component={Index} />
             <Route path='/Index' component={Index} />
             <Route path='/Course' component={Course} />
             <Route path='/Article' component={Article} />
             {personalRoutes}

         </Route>
       {/*<Route path='/404' component={NotFoundPage} />
         <Redirect from='*' to='/404' />*/}
       </Router>
    </Provider>,
	document.getElementById('root')
);

