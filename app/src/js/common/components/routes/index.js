import React from 'react';
import { browserHistory, Router, Route, Link } from 'react-router';
import Auth from 'common/services/authenticationService';
import App from 'common/components/app';
import Login from 'login';
import Logout from 'logout';
import Home from 'home';
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
    <Route path='/' component={App}>
      <Route path='home' component={Home} />
      <Route path='login' component={Login} />
      <Route path='logout' component={Logout} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
);

export default routes;
