import React from 'react';
import { Link } from 'react-router';

class NotFound extends React.Component {

  render() {

    return (
      <div className='col-xs-12 u-hz-ctr u-mt-full'>
       <h1>Pagina nu a fost gasita</h1>
       <Link to='/home'>
         <h4>Intoarce-te pe prima pagina</h4>
       </Link>
     </div>
   );

  }

}

export default NotFound;
