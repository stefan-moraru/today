import React from 'react';
import ReactDOM from 'react-dom';
import Auth from 'common/services/authenticationService';
import App from 'common/components/app';
import Routes from '  common/components/routes';

//TODO: 404 page

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

ReactDOM.render(Routes, document.body);
