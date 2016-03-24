import React from 'react';

class Logout extends React.Component {

  componentDidMount() {

    Auth.logout();

  }

  render() {

    return <span>Logged out</span>;

  }

}

export default Logout;
