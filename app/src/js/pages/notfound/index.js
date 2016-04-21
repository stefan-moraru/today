import React from 'react';
import { Link } from 'react-router';

class NotFound extends React.Component {

  render() {

    return (
      <div className='col-xs-12 u-hz-ctr u-mt-full'>
       <h1>The page was not found</h1>
       <Link to='/home'>
         <button className='btn btn-default u-mt-half'>Return to home</button>
       </Link>
     </div>
   );

  }

}

export default NotFound;
