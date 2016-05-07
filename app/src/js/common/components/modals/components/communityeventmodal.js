import React from 'react';
import Modal from 'common/components/modal';
import FbUtils from 'common/utils/firebase';
import CircleImage from 'common/components/circleimage';

class CommunityEventModal extends Modal {

  constructor(props) {

    super(props);

    this.state = {
      community: {},
      realtimeUsers: []
    };

  }

  componentDidMount() {

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

  refresh(data) {

    this.setState({
      realtimeTitle: data.title,
      realtimeDescription: data.description,
      realtimeUsers: data.users
    });

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.community) {

      this.setState({
        community: nextProps.community
      });

    }

  }

  saveProfile(profile) {

    this.setState({
      profile: profile
    });

  }

  addUser(user) {

    const communityId = 0; //TODO

    FbUtils.ref
    .child('realtime')
    .child(communityId)
    .once('value', function(snapshot) {
      let data = snapshot.val();

      data.users = (data.users || []).filter(item => item.email !== user.email);

      data.users.push(user);

      FbUtils.ref
      .child('realtime')
      .child(communityId) //TODO
      .update(data);
    });

  }

  getModalBody() {

    // Get data from Firebase
    const profile = this.state.profile || {};

    if (profile.email) {

      this.addUser(this.state.profile);

    }

    const users = [ profile ];

    const usersRendered = users.map((user, index) => {

      return (
        <div>
          <CircleImage image={user.image} />
        </div>
      )

    });

    return (
      <div>
        <input type='text' value={this.state.realtimeTitle} />
        { usersRendered }
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
