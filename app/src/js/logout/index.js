import React from 'react';
import Auth from 'common/services/authenticationService';

class Logout extends React.Component {

  componentDidMount() {

    Auth.logout();

  }

  render() {

    return <span>Logged out</span>;

  }

}

export default Logout;
