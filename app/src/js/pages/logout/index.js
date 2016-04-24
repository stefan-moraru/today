import React from 'react';
import { Link } from 'react-router';
import Auth from 'common/services/authenticationservice';
import Jumbotron from 'common/components/jumbotron';
import './index.scss';

class Logout extends React.Component {

  componentDidMount() {

    Auth.logout();

  }

  render() {

    const jumbotronProps = {
      title: 'Thank you for using Today',
      description: 'Hope that your plans are in place now. You can always come back later.',
      className: 'jumbotron--center-text u-m-0',
      image: '/src/assets/images/background_logout.jpg'
    };

    return (
      <div className='p-logout'>
        <Link to='/home'>
          <div className='home'>
            <i className='fa fa-fw fa-home'></i>
          </div>
        </Link>

        <Jumbotron {...jumbotronProps} />
      </div>
    );

  }

}

export default Logout;
