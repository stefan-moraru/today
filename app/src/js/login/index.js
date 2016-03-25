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
      <div className='login'>
        <div className='jumbotron'>
          <h1 className='f-bold display-4'>Fii seful timpului tau</h1>
          <h3 className='f-light'>Lorem ipsum sundasondoa oindasoinda</h3>
        </div>

        <div className='login__form'>
          <div className='col-md-4'>
            <div className='row'>
              <div className='col-md-2 social'>
                <div>
                  <i className='fa fa-facebook-square'></i>
                </div>
                <div>
                  <i className='fa fa-twitter-square'></i>
                </div>
              </div>
              <div className='col-md-10'>
                <div className='input-group'>
                  <span className="input-group-addon"><i className='fa fa-user'></i></span>
                  <input type='text' className='form-control' placeholder='Username' />
                </div>
                <div className='input-group'>
                  <span className="input-group-addon"><i className='fa fa-asterisk'></i></span>
                  <input type='password' className='form-control' placeholder='Parola' />
                </div>
                <button className='btn btn-info u-fr'>Inregistreaza-te !</button>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-12'>
                <h4>Nu ai cont ?</h4>
                <p>Lorem asiondosian dsanio dnoasi ndoasnoidoasniodpnaspiodn pasind ioas ndoasndo nasoi dnsaoi ndoasn odasnio dnasoidnosaidnoiasndosa noiasn oidasnio dnsaoi ndoiasn odnasoi dnasoi dnoaisndoasindsaoidnasoida</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6'>
                <input className='form-control' />
                <input className='form-control' />
                <input className='form-control' />
                <button className='btn btn-info u-fr'>Inregistreaza-te !</button>
                <div className='clearfix'></div>
                <progress className='progress' value='25' max='100'></progress>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }

}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Login;
