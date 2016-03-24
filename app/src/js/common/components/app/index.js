import React from 'react';

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
      </div>
    );
  }
}

export default App;
