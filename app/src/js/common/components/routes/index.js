import React from 'react';
import { browserHistory, Router, Route, Link, Redirect } from 'react-router';
import Auth from 'common/services/authenticationService';
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
import NotFound from 'pages/notfound';

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

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route component={Header}>
        <Route path='home' component={Home} />
        <Route path='login' component={Login} />
        <Route path='today' component={Today} onEnter={authenticate} />
        <Route path='calendar' component={Calendar} onEnter={authenticate} />
        <Route path='goals' component={Goals} onEnter={authenticate} />
        <Route path='settings' component={Settings} onEnter={authenticate} />
        <Route path='profile/:username' component={Profile} />
        <Route path='logout' component={Logout} onEnter={authenticate} />
      </Route>
    </Route>

    <Redirect from='/' to='home' />
    <Route path='*' component={NotFound} />
  </Router>
);

export default routes;
