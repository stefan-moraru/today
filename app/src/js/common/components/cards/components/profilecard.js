import React from 'react';

class ProfileCard extends React.Component {

  render() {

    return (
      <div>
        <img src='http://placehold.it/50x50' />
        <h6>Stefan Moraru</h6>
        <h6>3</h6>
        <progress className='progress' value='5' max='10'></progress>
      </div>
    );

  }

}

export default ProfileCard;
