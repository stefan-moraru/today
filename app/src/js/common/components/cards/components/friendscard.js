import React from 'react';
import Card from 'common/components/card';
import CircleImage from 'common/components/circleimage';

class FriendsCard extends Card {

  getType() {

    return 'friends';

  }

  getTitle() {

    return this.props.title;

  }

  getDescription() {

    return this.props.description;

  }

  getIntroContent() {

    return this.props.introContent || 'O lista cu prietenii tai pe care-i vei intalni. Acestia participa la cel putin unul din evenimentele la care participi si tu.';

  }

  getContent() {

    const friends = [
      { name: 'Carmen', 'image': 'http://static.tumblr.com/402de64fa71db5f91f427d18092129bb/b4ieo2z/0fHn58aid/tumblr_static_63q57z78gpcss40sg4g0wc004.png' },
      { name: 'Gabriel', 'image': 'http://b-i.forbesimg.com/faraigundan/files/2014/01/Aliko-Dangote-2.jpeg' },
      { name: 'Stefan', 'image': 'https://pbs.twimg.com/profile_images/670304972370669568/hm3GGbF1.jpg' },
      { name: 'Dragos', 'image': 'http://ichef.bbci.co.uk/images/ic/256x256/p01bqmbw.jpg' }
    ];

    const friendsRendered = friends.map((item, index) => {

      return (
        <div className='friend col-xl-6' key={'c-card-friends-item-' + index}>
          <CircleImage image={ item.image } />
          <div className='title'>
            <h6>{ item.name.split(' ')[0] }</h6>
          </div>
        </div>
      );

    });

    return (
      <div>
        { friendsRendered }

        <div className='u-clearfix'></div>
      </div>
    );

  }

}

export default FriendsCard;
