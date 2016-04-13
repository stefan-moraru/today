import React from 'react';
import Card from 'common/components/card';
import CircleImage from 'common/components/circleimage';

class ProfileCard extends Card {

  getType() {

    return 'profile';

  }

  getIntroContent() {

    return this.props.introContent;

  }

  getContent() {

    const image = this.props.image;
    const name = this.props.name;

    const circleImageProps = {
      image: image,
      className: 'u-fl'
    };

    return (
      <div>
        <CircleImage {...circleImageProps} />
        <div className='name'>
          <h4 className='f-light'>{ name }</h4>
        </div>
      </div>
    );

  }

}

export default ProfileCard;
