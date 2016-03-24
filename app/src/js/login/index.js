import React from 'react';
import Auth from 'common/services/authenticationService';

class Login extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      err: false
    };

  }

  onSubmit(ev) {

    console.log('suibmit');

    //Auth.login();

  }

  render() {

    return (
      <div>
        Login page
        { this.state.error }
      </div>
    );

  }

}

Login.contextTypes = {
  router: React.PropTypes.func.isRequired
}

export default Login;
