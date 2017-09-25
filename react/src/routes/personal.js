import React from 'react';
import { Route, IndexRoute } from 'react-router'
import Personal from '../components/personal/Personal.jsx'
import Menu from '../components/personal/Menu.jsx'
import Set from '../components/personal/set/Set.jsx'
import UserCard from '../components/personal/userCard/UserCard.jsx'
import TestCenter from '../components/personal/testCenter/TestCenter.jsx'
import MyArticle from '../components/personal/myArticle/MyArticle.jsx'
import Collector from '../components/personal/collector/Collector.jsx'
import Dynamic from '../components/personal/dynamic/Dynamic.jsx'
const personalRoutes = (
          <Route path='Personal' component={Personal}>
           	<IndexRoute component={Menu}/>
            <Route path='Set' component={Set}/>
            <Route path='/App/PersonalCenter' component={UserCard}/>
            <Route path='/App/MyArticle' component={MyArticle}/>
            <Route path='/App/NewsCenter' component={TestCenter}/>
            <Route path='/App/Collector' component={Collector}/>
            <Route path='/App/Dynamic' component={Dynamic}/>
    </Route>

);
export default personalRoutes;