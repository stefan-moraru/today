import React from 'react';
import CircleImage from 'common/components/circleimage';
require('./index.scss');

class Profile extends React.Component {

  render() {

    const circleImageProps = {
      size: 'big',
      image: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAatAAAAJDI5NDdiMTUyLTJjODUtNDg1ZC05YmNmLTcxMWIwZDkzYzgyMg.jpg',
      className: 'u-fl'
    };

    return (
      <div className='p-profile col-xs-12'>
        <div className='row'>
          <div className='col-xs-12'>
            <CircleImage {...circleImageProps} />
            <div className='name'>
              <h1 className='f-light'>Stefan Moraru</h1>
            </div>
          </div>
        </div>
      </div>
    );

  }

}

export default Profile;
