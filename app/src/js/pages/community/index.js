import React from 'react';
import SecondHeader from 'common/components/secondheader';
import moment from 'moment';
import momentRange from 'moment-range';
import { CommunityEventModal } from 'common/components/modals';
import Utils from 'common/utils';
import FbUtils from 'common/utils/firebase';
import Jumbotron from 'common/components/jumbotron';
import { EventCard } from 'common/components/cards';
import VerticalTimeline from 'common/components/verticaltimeline';
import './index.scss';

const CONST_CREATE_COMMUNITY_MODAL_ID = 'community-page-modal-goal';
const CONST_CREATE_COMMUNITY_EVENT_MODAL_ID = 'community-page-event-modal-goal';

class Community extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      communities: [],
      events: [],
      originalEvents: []
    };

  }

  searchEvents(ev) {

    let events = this.state.originalEvents;

    let query = ev.target.value;

    query = (query.toString() || '').toLowerCase();

    if (query.match(/^\d{4}$/g)) {
      // YYYY
      events = events.filter(event => (event.date || '').indexOf(query) !== -1);
    } else if (query === 'today') {
      // today
      const today = moment().format('YYYY-MM-DD');
      events = events.filter(event => (event.date || '') === today);
    } else if (query.match(/^\d{4}-\d{2}-\d{2}$/)) {
      // YYYY-MM-DD
      events = events.filter(event => (event.date || '') === query);
    } else {
      // Category / title / description / location
      events = events.filter(event => {
        let match = false;

        if ((event.title || '').toLowerCase().indexOf(query) !== -1) {
          match = true;
        }

        if ((event.description || '').toLowerCase().indexOf(query) !== -1) {
          match = true;
        }

        if ((event.category || '').toLowerCase().indexOf(query) !== -1) {
          match = true;
        }

        if ((event.location || '').toLowerCase().indexOf(query) !== -1) {
          match = true;
        }

        return match;
      })
    }

    this.setState({
      events: events
    });

  }

  refresh() {

    this.getCommunities();

  }

  componentDidMount() {

    this.getCommunities();
    this.getEvents();

  }

  getEvents() {

    FbUtils.getEvents().then(this.saveEvents.bind(this));

  }

  saveEvents(events) {

    this.setState({
      originalEvents: events,
      events: events
    });

  }

  getCommunities() {

    FbUtils.getCommunities().then(this.saveCommunities.bind(this));

  }

  saveCommunities(communities) {

    const community = communities.filter(comm => comm.id == this.props.routeParams.id)[0];

    this.setState({
      community: community
    });

  }

  generateSecondHeader() {

    const secondHeaderProps = {
      items: [
        {
          'icon': 'edit',
          'toggle': 'modal',
          'target': `#${CONST_CREATE_COMMUNITY_MODAL_ID}`,
          'onClick': () => {
            this.setState({
              selectedGoal: {}
            });
          }
        },
        {
          'icon': 'plus',
          'toggle': 'modal',
          'target': `#${CONST_CREATE_COMMUNITY_EVENT_MODAL_ID}`,
          'onClick': () => {
            this.setState({
              selectedGoal: {}
            });
          }
        }
      ]
    };

    return <SecondHeader {...secondHeaderProps} />;

  }

  generateCommunities(communities) {

    return (communities || []).map((community, index) => {

      const backgroundColor = {
        backgroundColor: 'pink'
      };

      return (
        <div className='community col-xs-12 u-mb-half' style={ backgroundColor }>
          <h3 className='f-light'>Sportivi extremi</h3>
          <h6 className='f-light'>
            <i className='fa fa-fw fa-users'></i> 5 membri
          </h6>
          <h6 className='f-light'>
            <i className='fa fa-fw fa-tags'></i> Sport, Extrem, Parapanta, Fun
          </h6>
          <h6 className='f-light'>
            <i className='fa fa-fw fa-comment'></i> Cea mai faina comunitate de sport din ROmani
          </h6>
        </div>
      );

    });

  }

  refresh() {

  }

  render() {

    const secondHeader = this.generateSecondHeader();

    const community = this.state.community || {};

    const timeline = <VerticalTimeline events={this.state.events} searchEvents={this.searchEvents.bind(this)} />;

    let lastEvent = null;

    if (this.state.events && this.state.events.length > 0) {

      const item = this.state.events[0];

      lastEvent = (
        <div>
          <EventCard event={item} />
        </div>
      );

    }

    return (
      <div className='p-communities'>
        <CommunityEventModal id={CONST_CREATE_COMMUNITY_EVENT_MODAL_ID} community={community} refresh={this.refresh.bind(this)} />
        { secondHeader }
        <Jumbotron image={ community.image } className='jumbotron--small f-light' title={ community.title } description={ community.description } />

        <div className='col-xs-12 col-md-6 push-md-3 u-mb-full'>
          <h1 className='f-light u-hz-ctr'>Most recent event</h1>
          <h6 className='u-hz-ctr u-mb-full'>The last event organised by { community.title }</h6>
          { lastEvent }
        </div>

        <div className='col-xs-12'>
          { timeline }
        </div>
      </div>
    );

  }

}

export default Community;
