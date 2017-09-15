import React from 'react';
import { Router, Route, IndexRoute,browserHistory,Redirect} from 'react-router'
import Personal from '../components/personal/Personal'
import Menu from '../components/personal/Menu.jsx'
import Set from '../components/personal/set/Set.jsx'

const personalRoutes = (
          <Route path='Personal' component={Personal}>
            <IndexRoute component={Menu}/>
            <Route path='Set' component={Set} />
    </Route>

);
export default personalRoutes;