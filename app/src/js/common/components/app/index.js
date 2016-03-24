import React from 'react';
import { Link } from 'react-router';
import Auth from 'common/services/authenticationService';

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      logged: Auth.logged()
    }

  }

  updateAuth(logged) {

    this.setState({
      logged: logged
    });

  }

  componentWillMount() {

    Auth.onChange = this.updateAuth;
    Auth.login();

  }

  render() {

    return (
      <div>
        <h1>Hello, world.</h1>
        { this.state.logged ? 'Logged' : 'Not logged' }
        <Link to='/logout'>Log out</Link>
        <Link to='/login'>Login</Link>
        { this.props.children }
      </div>
    );
  }

}

export default App;
