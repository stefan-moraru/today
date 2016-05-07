import React from 'react';
import Modal from 'common/components/modal';
import FbUtils from 'common/utils/firebase';
import CircleImage from 'common/components/circleimage';
import { MapCard } from 'common/components/cards';
import _ from 'lodash';
import moment from 'moment';

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
    this.realtimeLocation = '';
    this.realtimeChat = [];
    this.realtimeTimeH = 0;
    this.realtimeTimeM = 0;
    this.realtimeDuration = 0;
    this.realtimeDate = '';

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
          description: '',
          location: '',
          chat: []
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
    this.realtimeChat = data.chat;
    this.realtimeTimeH = data.timeH;
    this.realtimeTimeM = data.timeM;
    this.realtimeDuration = data.duration;
    this.realtimeDate = data.date;

    if (this.mounted) {
      this.forceUpdate();
    }

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.community) {

      const communityId = 0;

      FbUtils.ref
      .child('realtime')
      .child(communityId)
      .child('title')
      .set('');

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

    const communityId = 0; //TODO

    this.storedRef = FbUtils.ref
    .child('realtime')
    .child(communityId)
    .child('users')
    .push(user);

  }

  saveMessage(event) {

    this.message = event.target.value;

  }

  sendMessage() {

    const communityId = 0;

    const message = {
      content: this.message,
      date: new Date().getTime(),
      userName: this.state.profile.name
    };

    FbUtils.ref
    .child('realtime')
    .child(communityId)
    .child('chat')
    .push(message);

    document.getElementById('input-message').value = '';

  }

  createEvent() {

    const communityId = 0;

    const event = {
      title: this.realtimeTitle,
      description: this.realtimeDescription,
      location: this.realtimeLocation,
      time: {
        h: parseInt(this.realtimeTimeH || ''),
        m: parseInt(this.realtimeTimeM || '')
      },
      duration: parseInt(this.realtimeDuration || ''),
      community: communityId,
      date: this.realtimeDate
    };

    FbUtils.ref
    .child('events')
    .once('value', function(snapshot) {

      let data = snapshot.val();

      if (data) {

        data = data || [];

        data[Object.keys(data).length] = event;

      }

      FbUtils.ref
      .child('events')
      .update(data);

    });

    FbUtils.ref
    .child('realtime')
    .child(communityId)
    .child('title')
    .set('CLOSE');

  }

  getModalBody() {

    const users = this.realtimeUsers;
    const chat = this.realtimeChat;

    let images = [];

    (Object.keys(users) || []).map((key, index) => {

      const user = users[key];

      images.push(user.image);

    });

    images = _.uniq(images);

    const usersRendered = images.map(image => {

      return (
        <div className='u-fl u-ml-half'>
          <CircleImage image={image} />
        </div>
      );

    });

    let chatRendered = null;

    if (chat) {

      chatRendered = (Object.keys(chat) || []).map((key) => {

        const message = chat[key];

        return (
          <div className='message'>
            <h5 className='f-light'>
              { message.userName } <span className='f-small'>{ moment(message.date).format('MMMM mm:HH:ss')}</span>
            </h5>
            <h5 className='f-light'>
            </h5>
            <h6 className='f-light'>
              { message.content }
            </h6>
          </div>
        );

      });

    }

    let rendered = null;

    if (this.realtimeTitle === 'CLOSE') {

      rendered = (
        <div>
          <h4 className='f-light'>Event was created</h4>
        </div>
      );

    } else {

      let map = null;

      if (this.realtimeLocation && this.realtimeLocation.length > 2) {

        map = (
          <div className='col-xs-12 u-mb-half'>
            <MapCard locations={[this.realtimeLocation]} />
          </div>
        );

      }

      rendered = (
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
            <h6 className='f-light'>Date</h6>
            <input className='u-fr form-control' type='text' value={this.realtimeDate} onChange={this.updateRealtimeData.bind(this, 'date') } />
          </div>

          <div className='col-md-6 u-mb-half'>
            <h6 className='f-light'>Time H</h6>
            <input className='u-fr form-control' type='number' value={this.realtimeTimeH} onChange={this.updateRealtimeData.bind(this, 'timeH') } />
          </div>

          <div className='col-md-6 u-mb-half'>
            <h6 className='f-light'>Time M</h6>
            <input className='u-fr form-control' type='number' value={this.realtimeTimeM} onChange={this.updateRealtimeData.bind(this, 'timeM') } />
          </div>

          <div className='col-xs-12 u-mb-half'>
            <h6 className='f-light'>Duration</h6>
            <input className='u-fr form-control' type='number' value={this.realtimeDuration} onChange={this.updateRealtimeData.bind(this, 'duration') } />
          </div>

          { map }

          <div className='col-xs-12 u-mb-half'>
            <h6 className='f-light'>Users editing this</h6>
            { usersRendered }
          </div>

          <div className='col-xs-12 u-mb-half'>
            <button type='button' className='btn btn-success pull-right' onClick={this.createEvent.bind(this)}>
              Save
            </button>
          </div>

          <div className='col-xs-12 chat'>
            <h6 className='f-light'>Chat</h6>

            { chatRendered }

            <input type='input' id='input-message' className='form-control u-mt-half' placeholder='Message' onChange={this.saveMessage.bind(this)} />

            <button type='button' className='btn btn-success pull-right u-mt-half' onClick={this.sendMessage.bind(this)}>
              Send message
            </button>
          </div>
        </div>
      );
    }

    return rendered;

  }

}

CommunityEventModal.defaultProps = {
  title: 'Community event',
  refresh: () => {
    //
  }
};

export default CommunityEventModal;
