import React from 'react';
import Auth from 'common/services/authenticationService';

class Logout extends React.Component {

  componentDidMount() {

    Auth.logout();

  }

  render() {

    return (
      <div className='p-logout'>
        <h2>Multumim ca ai folosit aplicatia</h2>

        Feedback
      </div>
    );

  }

}

export default Logout;
