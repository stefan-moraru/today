import React from 'react';
import { browserHistory, Router, Route, Link, Redirect } from 'react-router';
import Auth from 'common/services/authenticationservice';
import App from 'common/components/app';
import Header from 'common/components/header';
import Login from 'pages/login';
import Logout from 'pages/logout';
import Home from 'pages/home';
import Today from 'pages/today';
import Calendar from 'pages/calendar';
import Goals from 'pages/goals';
import Profile from 'pages/profile';
import Settings from 'pages/settings';
import Activities from 'pages/activities';
import NotFound from 'pages/notfound';
import Communities from 'pages/communities';
import Community from 'pages/community';

const authenticate = (nextState, replace) => {

  if (!Auth.logged()) {

    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
      }
    });

  }

}

const authToToday = (nextState, replace) => {

  if (Auth.logged()) {

    replace({
      pathname: '/today',
      state: {
        nextPathname: nextState.location.pathname
      }
    });

  }

};

const routes = (
  <Router history={browserHistory}>
    <Redirect from='/' to='home' />

    <Route path='/' component={App}>
      <Route path='home' component={Home} onEnter={authToToday} />
      <Route path='login' component={Login} onEnter={authToToday} />
      <Route path='logout' component={Logout} />

      <Route component={Header}>
        <Route path='today' component={Today} onEnter={authenticate} />
        <Route path='calendar' component={Calendar} onEnter={authenticate} />
        <Route path='goals' component={Goals} onEnter={authenticate} />
        <Route path='settings' component={Settings} onEnter={authenticate} />
        <Route path='activities' component={Activities} onEnter={authenticate} />
        <Route path='profile/:email' component={Profile} />
        <Route path='communities' component={Communities} />
        <Route path='community/:id' component={Community} />
      </Route>
    </Route>

    <Route path='*' component={NotFound} />
  </Router>
);

export default routes;
