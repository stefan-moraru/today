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
      <div className='login'>
        <div className='jumbotron jumbotron-fluid'>
          <div className='col-xs-12'>
            <h1 className='f-bold display-4'>Fii seful timpului tau</h1>
            <h3 className='f-light'>Lorem ipsum sundasondoa oindasoinda</h3>
          </div>
        </div>

        <div className='login__form'>
          <div className='col-xl-6'>
            <div className='row'>
              <div className='col-xl-7'>
                <h4 className='u-mb-half'>Logheaza-te</h4>
                <div className='input-group'>
                  <span className='input-group-addon'><i className='fa fa-envelope'></i></span>
                  <input type='text' className='form-control' placeholder='Email' value={this.state.loginEmail} onChange={this.onChange.bind(this, 'loginEmail')} />
                </div>
                <div className='input-group'>
                  <span className='input-group-addon'><i className='fa fa-asterisk'></i></span>
                  <input type='password' className='form-control' placeholder='Parola' value={this.state.loginPassword} onChange={this.onChange.bind(this, 'loginPassword')} />
                </div>
                <button className='btn btn-info u-fr'>Log in</button>
                <div className='social u-fr'>
                  <i className='fa fa-facebook-square'></i>
                  <i className='fa fa-twitter-square'></i>
                </div>
              </div>
            </div>
            <div className='row u-mt-full'>
              <div className='col-xl-7'>
                <h4>Nu ai cont ?</h4>
              </div>
            </div>

            <div className='row'>
              <div className='col-xl-7'>
                <div className='input-group'>
                  <span className='input-group-addon'><i className='fa fa-envelope'></i></span>
                  <input type='email' className='form-control' placeholder='Email' value={this.state.registerEmail} onChange={this.onChange.bind(this, 'registerEmail')} />
                </div>
                <div className='input-group'>
                  <span className='input-group-addon'><i className='fa fa-asterisk'></i></span>
                  <input type='password' className='form-control' placeholder='Parola' value={this.state.registerPassword} onChange={this.onChange.bind(this, 'registerPassword')} />
                </div>
                <div className='input-group'>
                  <span className="input-group-addon"><i className='fa fa-asterisk'></i></span>
                  <input type='password' className='form-control' placeholder='Repeta parola' value={this.state.registerPasswordRepeat} onChange={this.onChange.bind(this, 'registerPasswordRepeat')}/>
                </div>
                <button className='btn btn-info u-fr' disabled={registerProgress !== 3}>Inregistreaza-te !</button>
                <div className='clearfix'></div>
                <progress className='progress u-mt-half' value={registerProgress} max='3'></progress>
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
