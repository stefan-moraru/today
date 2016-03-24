import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {

  render() {

    return (
      <div className='home'>
        <div className='jumbotron'>
          <h1 className='f-bold'>Manageriaza-ti timpul</h1>
          <p className='lead'>Mai usor ca niciodata</p>
        </div>
        <Link to='/logout'>Log out</Link>
        <Link to='/login'>Login</Link>
      </div>
    );

  }

}

export default Home;
