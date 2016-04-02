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
    const level = Math.floor(this.props.xp / 100);
    const progress = this.props.xp % 100 || 0;

    const circleImageProps = {
      image: image
    };

    return (
      <div>
        <CircleImage {...circleImageProps} />
        <div className='name'>
          <h5>{ name }</h5>
        </div>
        <div className='clearfix'></div>
        <span className='level pull-right'>Level { level }</span>
        <div className='clearfix'></div>
        <progress className='progress u-m-0' value={ progress } max='100'></progress>
      </div>
    );

  }

}

export default ProfileCard;
