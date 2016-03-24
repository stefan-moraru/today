import React from 'react';
import { browserHistory, Router, Route, Link } from 'react-router';
import App from 'common/components/app';
import Login from 'login';
import Logout from 'logout';

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='login' component={Login} />
      <Route path='logout' component={Logout} />
    </Route>
  </Router>
);

export default routes;
