import React from 'react';
import Social from 'common/components/social';
import {
  ProfileCard
} from 'common/components/cards';
import UserService from 'common/services/userservice';
import CircleImage from 'common/components/circleimage';

import 'common/components/card/index.scss';

class PanelUser extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      email: '',
      password: '',
      profile: {}
    };

  }

  componentDidMount() {

    UserService.profile().then(this.saveProfile.bind(this));

  }

  saveProfile(profile) {

    this.setState({
      profile: profile
    });

  }

  onChange(field, ev) {

    let newState = {};

    newState[field] = ev.target.value;

    this.setState(newState);

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
          <ProfileCard {...cardProfileProps} />

          <div className='col-xs-12 u-mb-half u-mt-half'>
            <h4>Details</h4>
            <div className='row'>
              <div className='col-md-6'>
                <div className='input-group'>
                  <span className='input-group-addon'><i className='fa fa-envelope fa-fw'></i></span>
                  <input type='text' className='form-control' placeholder='Email' disabled value={this.state.email} />
                </div>

                <div className='input-group'>
                  <span className='input-group-addon'><i className='fa fa-user fa-fw'></i></span>
                  <input type='text' className='form-control' placeholder='Username' value={this.state.username} onChange={this.onChange.bind(this, 'username')} />
                </div>

                <div className='input-group'>
                  <span className='input-group-addon'><i className='fa fa-asterisk fa-fw'></i></span>
                  <input type='password' className='form-control' placeholder='Parola' value={this.state.password} onChange={this.onChange.bind(this, 'password')} />
                </div>

                <button className='btn btn-success u-fr'>
                  Update
                </button>
              </div>
            </div>
          </div>

          <div className='col-xs-12 u-mb-full'>
            <h4>Connect with apps</h4>
            <Social />
          </div>

          <div className='col-xs-12 u-mb-full'>
            <h4>Friends that use the application</h4>
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
