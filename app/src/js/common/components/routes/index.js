import React from 'react';
import { browserHistory, Router, Route, Link, Redirect } from 'react-router';
import Auth from 'common/services/authenticationService';
import App from 'common/components/app';
import Header from 'common/components/header';
import Login from 'login';
import Logout from 'logout';
import Home from 'home';
import Today from 'today';
import Settings from 'settings';
import NotFound from 'notfound';

const authenticate = (nextState, replace) => {

  console.log(Auth);

  if (!Auth.logged()) {

    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
      }
    });

  }

}

//TODO: 404 page

const routes = (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route component={Header}>
        <Route path='home' component={Home} />
        <Route path='login' component={Login} />
        <Route path='today' component={Today} onEnter={authenticate} />
        <Route path='settings' component={Settings} onEnter={authenticate} />
        <Route path='logout' component={Logout} onEnter={authenticate} />
      </Route>
    </Route>

    <Redirect from='/' to='home' />
    <Route path='*' component={NotFound} />
  </Router>
);

export default routes;
