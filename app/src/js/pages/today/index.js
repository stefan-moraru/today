import React from 'react';
import moment from 'moment';
import Header from 'common/components/header';
import Timeline from 'common/components/timeline';
import {
  Cards,
  ProfileCard,
  EventsCard,
  GoalsCard,
  FriendsCard,
  TimeTrackerCard,
  MapCard,
  EventCard,
  EventCancelCard,
  ChartCard,
  DirectionsCard,
  SuggestionCard
} from 'common/components/cards';
import Utils from 'common/utils';
import EventService from 'common/services/eventservice';
import UserService from 'common/services/userservice';
import GoalsService from 'common/services/goalsservice';
import './index.scss';

class Today extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      events: [],
      goals: []
    };

  }

  componentDidMount() {

    EventService.getTodayEvents().then(this.saveEvents.bind(this));

    UserService.profile().then(this.saveProfile.bind(this));

    GoalsService.getGoals().then(this.saveGoals.bind(this));

  }

  saveEvents(response) {

    this.setState({
      events: response
    });

  }

  saveProfile(profile) {

    this.setState({
      profile: profile
    });

  }

  saveGoals(goals) {

    this.setState({
      goals: goals
    });

  }

  selectEvent(event) {

    this.setState({
      event: event
    });

  }

  getPieChartCategoriesData(events) {

    let _categoriesValues = {};
    let _total = 0;

    events.forEach(ev => {

      const cat = ev.category;

      if (!_categoriesValues[cat.title]) {
        _categoriesValues[cat.title] = 0;
      }

      _categoriesValues[cat.title] += 1;
      _total += 1;

    });

    let data = [];

    const colors = [
      '#EC644B', '#674172', '#1BBC9B', '#4B77BE', '#F89406'
    ];

    let colorInd = Math.floor(Math.random() * colors.length);

    Object.keys(_categoriesValues).forEach(cat => {
      colorInd++;

      if (colorInd == colors.length) {
        colorInd = 0;
      }

      data = data.concat({
        value: Math.round(_categoriesValues[cat] / _total * 100),
        color: colors[colorInd],
        highlight: "#5AD3D1",
        label: cat[0].toUpperCase().concat(cat.slice(1))
      });
    });

    return data;

  }

  getCardsForEvents(events) {

    const cardProfileProps = {
      ...this.state.profile,
      introContent: 'Statistici despre profilul tau. Sfat: Foloseste cat mai mult aplicatia pentru a iti mari nivelul.'
    };

    const cardEventsProps = {
      title: 'Events',
      description: 'Your events for today are:',
      events: this.state.events,
      onClick: this.selectEvent.bind(this),
      introContent: 'Evenimentele la care participi astazi. Click pe oricare din ele pentru a vedea mai multe detalii.'
    };

    const cardMapProps = {
      locations: this.state.events.map(ev => ev.location),
      introContent: 'Drumul pe care il vei parcurge astazi. Locatiile evenimentelor sunt adaugate ca waypoints.'
    };

    const cardChartProps = {
      type: 'pie',
      data: this.getPieChartCategoriesData(this.state.events),
      title: 'Categorii',
      description: 'Cat iti vor ocupa diferite categorii'
    };

    const cardFriendsProps = {
      title: 'Astazi te vei intalni cu'
    };

    const cardTimeTrackerProps = {
      title: 'Timer activitate'
    };

    const cardGoalsProps = {
      title: 'Goals'
    };

    const cardDirectionsProps = {
      title: 'Guide to next event',
      introContent: 'Apasand butonul vei primi o harta pentru urmatorul eveniment'
    };

    const cardSuggestionProps = {
      title: 'Sugestions',
      introContent: 'Vei primi o sugestie',
      events: this.state.events,
      goals: this.state.goals
    };

    const cardsProps = {
      cards: [
        (<ProfileCard {...cardProfileProps} />),
        (<EventsCard {...cardEventsProps} />),
        (<SuggestionCard {...cardSuggestionProps} />),
        (<GoalsCard {...cardGoalsProps} />),
        (<DirectionsCard {...cardDirectionsProps} />),
        (<FriendsCard {...cardFriendsProps} />),
        (<TimeTrackerCard {...cardTimeTrackerProps} />),
        (<MapCard {...cardMapProps} />),
        (<ChartCard {...cardChartProps} />)
      ]
    };

    return <Cards {...cardsProps} />

  }

  getCardsForEvent(event) {

    const cardMapProps = {
      locations: [event.location]
    };

    const cardEventProps = {
      event: event
    };

    const cardEventCancelProps = {
      title: 'Anuleaza eveniment'
    };

    const cardFriendsProps = {
      title: 'Cine mai participa'
    };

    const cards = [
      (<EventCard {...cardEventProps} />),
      (<EventCancelCard {...cardEventCancelProps} />),
      (<MapCard {...cardMapProps} />),
      (<FriendsCard {...cardFriendsProps} />)
    ];

    const cardsProps = {
      cards: cards
    };

    return <Cards {...cardsProps} />

  }

  resetEvent() {
    this.setState({
      event: null
    });
  }

  render() {

    const timelineProps = {
      events: this.state.events,
      event: this.state.event
    };

    let resume = null;
    let cards = null;
    let title = moment().format('MMMM Do');

    if (this.state.event) {
      title += ` - ${this.state.event.title}`;
      resume = (
      <div className='u-c-pointer' onClick={this.resetEvent.bind(this)}>
        <i className='fa fa-arrow-left'></i>
        <span className='u-pl-half'>Back home</span>
      </div>
      );
      cards = this.getCardsForEvent(this.state.event);
    } else {
      resume = Utils.dayResume(this.state.events);
      cards = this.getCardsForEvents(this.state.events);
      title += ` - ${resume}`;
    }

    return (
      <div className='p-today col-xs-12'>
        <div className='row'>
          <div className='col-xs-12'>
            <h1 className='display-4 p-today__title'>{ title }</h1>
          </div>
        </div>

        <div className='row u-mt-full'>
          <div className='col-xs-12'>
            <Timeline {...timelineProps} />
          </div>
        </div>

        <div className='row u-mt-full'>
          <div className='col-md-12'>
            { cards }
          </div>
        </div>
      </div>
    );

  }

}

export default Today;
