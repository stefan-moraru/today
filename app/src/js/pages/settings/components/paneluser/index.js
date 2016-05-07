import React from 'react';
import Social from 'common/components/social';
import {
  ProfileCard
} from 'common/components/cards';
import UserService from 'common/services/userservice';
import CircleImage from 'common/components/circleimage';
import FbUtils from 'common/utils/firebase';

import 'common/components/card/index.scss';

class PanelUser extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      email: '',
      password: '',
      profile: {},
      categories: ''
    };

  }

  componentDidMount() {

    UserService.profile().then(this.saveProfile.bind(this));

  }

  saveProfile(profile) {

    this.setState({
      profile: profile,
      categories: (profile || {}).categories
    });

  }

  onChange(field, ev) {

    let newState = {};

    newState[field] = ev.target.value;

    this.setState(newState);

  }

  saveCategories() {

    FbUtils.getCurrentUser()
    .then(user => {
      user.categories = (this.state.categories || []).split(',');

      FbUtils.updateUserWithEmail(user.email, user);

        UserService.profile().then(this.saveProfile.bind(this));
    });

  }

  render() {

    const cardProfileProps = {
      ...this.state.profile
    };

    const friends = [
      { name: 'Carmen', 'image': 'http://static.tumblr.com/402de64fa71db5f91f427d18092129bb/b4ieo2z/0fHn58aid/tumblr_static_63q57z78gpcss40sg4g0wc004.png' },
      { name: 'Gabriel', 'image': 'http://b-i.forbesimg.com/faraigundan/files/2014/01/Aliko-Dangote-2.jpeg' },
      { name: 'Stefan', 'image': 'https://pbs.twimg.com/profile_images/670304972370669568/hm3GGbF1.jpg' },
      { name: 'Carmen', 'image': 'http://static.tumblr.com/402de64fa71db5f91f427d18092129bb/b4ieo2z/0fHn58aid/tumblr_static_63q57z78gpcss40sg4g0wc004.png' },
      { name: 'Gabriel', 'image': 'http://b-i.forbesimg.com/faraigundan/files/2014/01/Aliko-Dangote-2.jpeg' },
      { name: 'Stefan', 'image': 'https://pbs.twimg.com/profile_images/670304972370669568/hm3GGbF1.jpg' },
      { name: 'Dragos', 'image': 'http://ichef.bbci.co.uk/images/ic/256x256/p01bqmbw.jpg' }
    ];

    const friendsRendered = friends.slice(0, 4).map((item, index) => {

      return (
        <div className='friend u-fl' key={'c-card-friends-item-' + index}>
          <CircleImage image={ item.image } />
        </div>
      );

    }).concat(
      (
        <div className='friend' key='c-card-friends-item--0'>
          <div className='title'>
            {friends.length > 4 ? <h6>..and {friends.length - 4} more</h6> : null }
          </div>
        </div>
      )
    );

    return (
      <div className='panel panel__user'>
        <h1>Account</h1>

        <div className='row'>
          <div className='col-md-5'>
            <ProfileCard {...cardProfileProps} />
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12 u-mb-half u-mt-half'>
            <h3 className='f-light'>Details</h3>
            <div className='col-md-5 u-p-0'>
              <div className='input-group'>
                <span className='input-group-addon'><i className='fa fa-envelope fa-fw'></i></span>
                <input type='text' className='form-control' placeholder='Email' disabled value={this.state.profile.email} />
              </div>

              <div className='input-group'>
                <span className='input-group-addon'><i className='fa fa-user fa-fw'></i></span>
                <input type='text' className='form-control' placeholder='Username' disabled value={this.state.profile.name} onChange={this.onChange.bind(this, 'username')} />
              </div>

              <div className='input-group'>
                <span className='input-group-addon'><i className='fa fa-tags fa-fw'></i></span>
                <input type='text' className='form-control' placeholder="Categories I'm interested in" value={this.state.categories} onChange={this.onChange.bind(this, 'categories')} />
              </div>

              <button className='btn btn-success pull-right' onClick={this.saveCategories.bind(this)}>
                Save
              </button>
            </div>
          </div>

          <div className='col-xs-12 u-mb-full'>
            <h3 className='f-light'>Connect with apps</h3>
            <Social authenticate={true} {...this.state.profile} />
          </div>

          <div className='col-xs-12 u-mb-full'>
            <h3 className='f-light'>Friends that use the application</h3>
            <div className='c-card-friends'>
              { friendsRendered }
            </div>
          </div>
        </div>
      </div>
    );

  }

}

export default PanelUser;
