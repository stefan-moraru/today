import React from 'react';
import Auth from 'common/services/authenticationService';
import Jumbotron from 'common/components/jumbotron';
import './index.scss';

class Logout extends React.Component {

  componentDidMount() {

    Auth.logout();

  }

  render() {

    const jumbotronProps = {
      title: 'Thank you for using the application',
      description: 'Hope that your plans are in place now',
      className: 'jumbotron--center-text',
      image: '/src/assets/images/background_logout.jpg'
    };

    return (
      <div className='p-logout'>
        <Jumbotron {...jumbotronProps} />
      </div>
    );

  }

}

export default Logout;
