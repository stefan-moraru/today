import React from 'react';
import Modal from 'common/components/modal';
import FbUtils from 'common/utils/firebase';
import CircleImage from 'common/components/circleimage';
import { MapCard } from 'common/components/cards';

class CommunityEventModal extends Modal {

  constructor(props) {

    super(props);

    this.state = {
      community: {},
      realtimeUsers: []
    };

    this.realtimeTitle = '';
    this.realtimeDescription = '';
    this.realtimeUsers = [];

  }

  updateRealtimeData(field, ev) {

    const communityId = 0;
    const value = ev.target.value;

    FbUtils.ref
    .child('realtime')
    .child(communityId)
    .once('value', function(snapshot) {

      let data = snapshot.val();

      data[field] = value;

      FbUtils.ref
      .child('realtime')
      .child(communityId)
      .update(data);

    });


  }

  componentDidMount() {

    this.mounted = true;

    FbUtils.getCurrentUser().then(this.saveProfile.bind(this));

    const communityId = 0; //TODO

    FbUtils.ref
    .child('realtime')
    .child(communityId)
    .once('value', function(snapshot) {

      let data = snapshot.val();

      if (!data) {
        const updated = {
          users: [],
          title: '',
          description: ''
        };

        FbUtils.ref
        .child('realtime')
        .child(communityId)
        .update(updated);
      }

    });

    FbUtils.ref
    .child('realtime')
    .child(communityId)
    .on('value', (snapshot) => {
      this.refresh(snapshot.val());
    });

  }

  componentWillUmount() {

    this.mounted = false;

  }

  refresh(data) {

    this.realtimeTitle = data.title;
    this.realtimeDescription = data.description;
    this.realtimeUsers = data.users;
    this.realtimeLocation = data.location;

    if (this.mounted) {
      this.forceUpdate();
    }

    console.log('refresh');

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.community) {

      this.setState({
        community: nextProps.community
      });

    }

  }

  saveProfile(profile) {

    if (profile.email) {

      this.addUser(profile);

    }

    this.setState({
      profile: profile
    });

  }

  addUser(user) {

    console.log('addUser');
    console.log(user);

    const communityId = 0; //TODO

    FbUtils.ref
    .child('realtime')
    .child(communityId)
    .child('users')
    .push(user);
    /* .once('value', function(snapshot) {
      let data = snapshot.val();

      data.users = (data.users || []).filter(item => {

        if (item.email === user.email) {
          return false;
        }

        return true;

      });

      data.users.push(user);

      FbUtils.ref
      .child('realtime')
      .child(communityId) //TODO
      .update(data);
    }); */

  }

  getModalBody() {

    // Get data from Firebase
    const profile = this.state.profile || {};

    const users = this.realtimeUsers;

    const usersRendered = (Object.keys(users) || []).map((key, index) => {

      const user = users[key];

      return (
        <div className='u-fl u-ml-half'>
          <CircleImage image={user.image} />
        </div>
      )

    });

    return (
      <div className='col-xs-12'>
        <div className='col-xs-12 u-mb-half'>
          <h6 className='f-light'>Title</h6>
          <input className='u-fr form-control' type='text' value={this.realtimeTitle} onChange={this.updateRealtimeData.bind(this, 'title') }/>
        </div>

        <div className='col-xs-12 u-mb-half'>
          <h6 className='f-light'>Description</h6>
          <input className='u-fr form-control' type='text' value={this.realtimeDescription} onChange={this.updateRealtimeData.bind(this, 'description') } />
        </div>

        <div className='col-xs-12 u-mb-half'>
          <h6 className='f-light'>Location</h6>
          <input className='u-fr form-control' type='text' value={this.realtimeLocation} onChange={this.updateRealtimeData.bind(this, 'location') } />
        </div>

        <div className='col-xs-12 u-mb-half'>
          <MapCard locations={[this.realtimeLocation]} />
        </div>

        <div className='col-xs-12 u-mb-half'>
          <h6 className='f-light'>Users editing this</h6>
          { usersRendered }
        </div>

        <div className='col-xs-12 u-mb-half'>
          <button type='button' className='btn btn-success pull-right'>
            Save
          </button>
        </div>
      </div>
    );

  }

}

CommunityEventModal.defaultProps = {
  title: 'Community event',
  refresh: () => {
    //
  }
};

export default CommunityEventModal;
