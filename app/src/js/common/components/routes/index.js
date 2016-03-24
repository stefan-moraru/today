import React from 'react';
import { browserHistory, Router, Route, Link } from 'react-router';
import App from 'js/common/components/app';

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='login' component={Login} />
      <Route path='logout' component={Logout} />
    </Route>
  </Router>
);

export default routes;
