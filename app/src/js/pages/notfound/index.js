import React from 'react';
import { Link } from 'react-router';

class NotFound extends React.Component {

  render() {

    return (
      <div className='col-xs-12 u-hz-ctr u-mt-full'>
        <h1 className='display-4 f-light'>Today</h1>

        <h3 className='u-mt-full'>We are sorry, but we couldn't find the page.</h3>

        <Link to='/home'>
          <button className='btn btn-default u-mt-full'>Return to home</button>
        </Link>
     </div>
   );

  }

}

export default NotFound;
