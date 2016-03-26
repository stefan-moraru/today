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

    //Auth.login();

  }

  render() {

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
                  <span className="input-group-addon"><i className='fa fa-envelope'></i></span>
                  <input type='text' className='form-control' placeholder='Email' />
                </div>
                <div className='input-group'>
                  <span className="input-group-addon"><i className='fa fa-asterisk'></i></span>
                  <input type='password' className='form-control' placeholder='Parola' />
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
                  <span className="input-group-addon"><i className='fa fa-envelope'></i></span>
                  <input type='text' className='form-control' placeholder='Email' />
                </div>
                <div className='input-group'>
                  <span className="input-group-addon"><i className='fa fa-asterisk'></i></span>
                  <input type='password' className='form-control' placeholder='Parola' />
                </div>
                <div className='input-group'>
                  <span className="input-group-addon"><i className='fa fa-asterisk'></i></span>
                  <input type='password' className='form-control' placeholder='Repeta parola' />
                </div>
                <button className='btn btn-info u-fr'>Inregistreaza-te !</button>
                <div className='clearfix'></div>
                <progress className='progress u-mt-half' value='25' max='100'></progress>
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
