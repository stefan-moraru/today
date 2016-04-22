import React from 'react';
import AuthenticationService from 'common/services/authenticationservice';
import './index.scss';

class Social extends React.Component {

  authenticateProvider(provider) {

    AuthenticationService.loginWithProvider(provider, false, true);

  }

  render() {

    const networks = [
      { title: 'Facebook', provider: 'facebook', icon: 'fa fa-facebook', href: 'https://www.facebook.com/TodayApplication' },
      { title: 'Google', provider: 'google', icon: 'fa fa-google' },
      { title: 'Twitter', provider: 'twitter', icon: 'fa fa-twitter' }
    ];

    const networksRendered = networks.map((item, key) => {

      let itemRendered = null;

      if (item.href && !this.props.authenticate) {
        itemRendered = (
          <a href={ item.href } target='_new' key={`Social-item-${key}`}>
            <div className='circle'>
              <i className={ item.icon }></i>
            </div>
          </a>
        );
      } else if (this.props.authenticate) {
        itemRendered = (
          <div className='circle' onClick={this.authenticateProvider.bind(this, item.provider)}>
            <i className={ item.icon }></i>
          </div>
        );
      }


      if (this.props.showOnlyHref && !item.href) {
        itemRendered = null;
      }

      return itemRendered;

    });

    return (
      <div className='c-social'>
        <div className='row'>
          <div className='col-xs-12'>
           { networksRendered }
          </div>
        </div>
      </div>
    );

  }

}

Social.defaultProps = {
  showOnlyHref: false,
  authenticate: false,
  onClick: (icon) => {
    //
  }
}

export default Social;
