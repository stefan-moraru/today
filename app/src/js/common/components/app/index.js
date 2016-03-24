import React from 'react';
import { Link } from 'react-router';
import Auth from 'common/services/authenticationService';
require('./index.scss');

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
      <div className='container-fluid'>
       { this.props.children }
      </div>
    );

  }

}

export default App;
