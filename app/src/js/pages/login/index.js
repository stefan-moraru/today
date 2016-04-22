import React from 'react';
import Auth from 'common/services/authenticationservice';
require('./index.scss');

class Login extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      err: false,
      loginEmail: null,
      loginPassword: null,
      registerEmail: null,
      registerPassword: null,
      registerPasswordRepeat: null
    };

  }

  onSubmit(ev) {

    //Auth.login();

  }

  onChange(field, ev) {

    let newState = {};

    newState[field] = ev.target.value;

    this.setState(newState);

  }

  loginWithProvider(provider) {

    Auth.loginWithProvider(provider);

  }

  render() {

    let registerProgress = 0;

    if (this.state.registerEmail) {
      registerProgress++;
    }

    if (this.state.registerPassword) {
      registerProgress++;
    }

    if (this.state.registerPasswordRepeat) {
      registerProgress++;
    }

    return (
      <div className='login col-xs-12'>
        <div className='jumbotron jumbotron-fluid u-hz-ctr'>
          <div className='col-xs-10 push-xs-1'>
            <h1 className='f-bold display-4'>Be the boss of your own time</h1>
            <h3 className='f-light'>We provide you the tools to be great</h3>
          </div>
        </div>

        <div className='login__form'>
          <div className='col-xl-6'>
            <div className='row'>
              <div className='col-sm-7 col-xs-10 push-xs-1'>
                <h4 className='u-mb-half'>Log in</h4>
              </div>
              <div className='col-sm-7 col-xs-10 push-xs-1'>
                <button className='btn btn-info u-ml-quarter' onClick={this.loginWithProvider.bind(this, 'facebook')}><i className='fa fa-facebook-square u-pr-quarter'></i>Login with Facebook</button>
              </div>
              <div className='col-sm-7 col-xs-10 push-xs-1 u-mt-quarter'>
                <button className='btn btn-info u-ml-quarter' onClick={this.loginWithProvider.bind(this, 'google')}><i className='fa fa-google u-pr-quarter'></i>Login with Google</button>
              </div>
            </div>
            <div className='row u-mt-full'>
              <div className='col-sm-7 col-xs-10 push-xs-1'>
                <h4>Not registered?</h4>
                <p>By registering, you will gain access to a variety of tools that will boost your productivity. As you will be using a social network account to connect, you won't need to register.</p>
              </div>
            </div>
          </div>
        </div>

        <div className='clearfix'></div>
      </div>
    );

  }

}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Login;
