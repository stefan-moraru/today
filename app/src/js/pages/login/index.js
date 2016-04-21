import React from 'react';
import Auth from 'common/services/authenticationService';
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
                <div className='input-group'>
                  <span className='input-group-addon'><i className='fa fa-envelope fa-fw'></i></span>
                  <input type='text' className='form-control' placeholder='Email' value={this.state.loginEmail} onChange={this.onChange.bind(this, 'loginEmail')} />
                </div>
                <div className='input-group'>
                  <span className='input-group-addon'><i className='fa fa-asterisk fa-fw'></i></span>
                  <input type='password' className='form-control' placeholder='Password' value={this.state.loginPassword} onChange={this.onChange.bind(this, 'loginPassword')} />
                </div>
                <button className='btn btn-info u-fr u-ml-quarter'>Log in</button>
                <button className='btn btn-info u-fr u-ml-quarter'><i className='fa fa-facebook-square'></i></button>
                <button className='btn btn-info u-fr'><i className='fa fa-twitter-square'></i></button>
              </div>
            </div>
            <div className='row u-mt-full'>
              <div className='col-sm-7 col-xs-10 push-xs-1'>
                <h4>Not registered?</h4>
                <p>By registering, you will gain access to a variety of tools that will boost your productivity.</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-sm-7 col-xs-10 push-xs-1'>
                <div className='input-group'>
                  <span className='input-group-addon'><i className='fa fa-envelope fa-fw'></i></span>
                  <input type='email' className='form-control' placeholder='Email' value={this.state.registerEmail} onChange={this.onChange.bind(this, 'registerEmail')} />
                </div>
                <div className='input-group'>
                  <span className='input-group-addon'><i className='fa fa-asterisk fa-fw'></i></span>
                  <input type='password' className='form-control' placeholder='Password' value={this.state.registerPassword} onChange={this.onChange.bind(this, 'registerPassword')} />
                </div>
                <div className='input-group'>
                  <span className="input-group-addon"><i className='fa fa-asterisk fa-fw'></i></span>
                  <input type='password' className='form-control' placeholder='Repeat password' value={this.state.registerPasswordRepeat} onChange={this.onChange.bind(this, 'registerPasswordRepeat')}/>
                </div>
                <button className='btn btn-info u-fr' disabled={registerProgress !== 3}>Register</button>
                <div className='clearfix'></div>
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
