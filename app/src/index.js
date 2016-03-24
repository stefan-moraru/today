import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, Link } from 'react-router';
import Auth from './js/common/services/AuthenticationService';

console.log(Auth);

//TODO: 404 page

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

class Logout extends React.Component {

  componentDidMount() {

    Auth.logout();

  }

  render() {

    return <span>Logged out</span>;

  }

}

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

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='login' component={Login} />
      <Route path='logout' component={Logout} />
    </Route>
  </Router>
), document.body);
