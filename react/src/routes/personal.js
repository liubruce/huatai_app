import React from 'react';
import { Route, IndexRoute } from 'react-router'
import Personal from '../components/personal/Personal.jsx'
import Menu from '../components/personal/Menu.jsx'
import Set from '../components/personal/set/Set.jsx'
import UserCard from '../components/personal/UserCard/UserCard.jsx'
import TestCenter from '../components/personal/TestCenter/TestCenter.jsx'
const personalRoutes = (
          <Route path='Personal' component={Personal}>
           	<IndexRoute component={Menu}/>
            <Route path='Set' component={Set}/>
            <Route path='/App/PersonalCenter' component={UserCard}/>
            <Route path='/App/NewsCenter' component={TestCenter}/>
    </Route>

);
export default personalRoutes;