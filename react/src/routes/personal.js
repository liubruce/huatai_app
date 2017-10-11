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
import Library from '../components/personal/library/Library.jsx'
import PointShop from '../components/personal/pointShop/PointShop.jsx'
import PointDetail from '../components/personal/pointDetail/PointDetail.jsx'
import StoryLine from '../components/personal/storyLine/StoryLine.jsx'
import ArticleDetail from '../components/articleDetail/ArticleDetail.jsx'
import CourseDetail from '../components/courseDetail/CourseDetail.jsx'
import AnswerOnline from '../components/courseDetail/answerOnline/AnswerOnline.jsx'
import PubArticle from '../components/pubArticle/PubArticle.jsx'
const personalRoutes = (
          <Route path='Personal' component={Personal}>
           	<IndexRoute component={Menu}/>
            <Route path='Set' component={Set}/>
            <Route path='/App/PersonalCenter' component={UserCard}/>
            <Route path='/App/PersonalCenter/MyArticle' component={MyArticle}/>
            <Route path='/App/PubArticle(:/id)' component={PubArticle}/>
            <Route path='/App/PersonalCenter/ArticleDetail/:id' component={ArticleDetail}/>
            <Route path='/App/NewsCenter' component={TestCenter}/>
            <Route path='/App/PersonalCenter/Collector' component={Collector}/>
            <Route path='/App/PersonalCenter/Dynamic' component={Dynamic}/>
            <Route path='/App/Course/CourseDetail' component={CourseDetail}/>
            <Route path='/App/Course/AnswerOnline' component={AnswerOnline}/>
            <Route path='/App/PersonalCenter/Library' component={Library}/>
            <Route path='/App/PersonalCenter/PointShop' component={PointShop}/>
            <Route path='/App/PersonalCenter/PointDetail' component={PointDetail}/>
            <Route path='/App/StoryLine' component={StoryLine}/>
    </Route>

);
export default personalRoutes;