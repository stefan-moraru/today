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
  SuggestionCard,
  WeatherCard
} from 'common/components/cards';
import Utils from 'common/utils';
import FbUtils from 'common/utils/firebase';
import EventService from 'common/services/eventservice';
import UserService from 'common/services/userservice';
import GoalsService from 'common/services/goalsservice';
import WeatherService from 'common/services/weatherservice';
import './index.scss';

class Today extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      events: [],
      goals: [],
      weather: {},
      profile: {}
    };

  }

  componentDidMount() {

    FbUtils.getEventsToday().then(this.saveInState.bind(this, 'events'));

    UserService.profile().then(this.saveInState.bind(this, 'profile'));

    FbUtils.getGoalsForCurrentUser().then(this.saveInState.bind(this, 'goals'));

    WeatherService.weatherForCity('Iasi').then(this.saveInState.bind(this, 'weather'));

  }

  saveInState(field, response) {

    let state = this.state;

    state[field] = response;

    this.setState(state);

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

      if (!_categoriesValues[cat]) {
        _categoriesValues[cat] = 0;
      }

      _categoriesValues[cat] += 1;
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
        label: cat || 'Not categorised'
      });
    });

    return data;

  }

  getCardsForEvents(events) {

    const cardProfileProps = {
      ...this.state.profile,
      title: 'Profile',
      introContent: `This is you. Don't forget to make the most out of today.`
    };

    const cardEventsProps = {
      title: 'Events',
      description: 'Your events for today are:',
      events: this.state.events,
      onClick: this.selectEvent.bind(this),
      introContent: `Events you are going to. Click on them to see more details.`
    };

    const cardMapProps = {
      locations: this.state.events.map(ev => ev.location),
      title: 'Route',
      introContent: `The path you are going to follow today`
    };

    const cardChartProps = {
      type: 'pie',
      data: this.getPieChartCategoriesData(this.state.events),
      title: 'Categories'
    };

    const cardFriendsProps = {
      title: 'Today you will meet with'
    };

    const cardTimeTrackerProps = {
      title: 'Activity timer'
    };

    const cardGoalsProps = {
      title: 'Goals'
    };

    const cardDirectionsProps = {
      title: 'Guide to next event',
      introContent: 'Guidance to the next event',
      end: Utils.nextEvent(this.state.events).location
    };

    const cardSuggestionProps = {
      title: 'Sugestions',
      introContent: 'You will receive suggestion based on your breaks.',
      events: this.state.events,
      goals: this.state.goals
    };

    const cardWeatherProps = {
      title: 'Weather',
      city: this.state.profile.city,
      events: this.state.events,
      weather: this.state.weather
    };

    const cardsProps = {
      cards: [
        (<ProfileCard {...cardProfileProps} />),
        (<EventsCard {...cardEventsProps} />),
        (<SuggestionCard {...cardSuggestionProps} />),
        (<GoalsCard {...cardGoalsProps} />),
        (<DirectionsCard {...cardDirectionsProps} />),
        (<WeatherCard {...cardWeatherProps} />),
        (<FriendsCard {...cardFriendsProps} />),
        //(<TimeTrackerCard {...cardTimeTrackerProps} />),
        (<MapCard {...cardMapProps} />),
        (<ChartCard {...cardChartProps} />)
      ]
    };

    return <Cards {...cardsProps} />

  }

  getCardsForEvent(event) {

    const cardMapProps = {
      title: 'Event location',
      locations: [event.location]
    };

    const cardEventProps = {
      event: event
    };

    const cardEventCancelProps = {
      title: 'Cancel event'
    };

    const cardFriendsProps = {
      title: 'Who takes part'
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
      const events = [this.state.events[0]];
      const weather = {sky: 804, temperature: 0, temperature: 0 } || this.state.weather;

      resume = Utils.dayResume(events, weather);
      cards = this.getCardsForEvents(events);
    }

    return (
      <div className='p-today col-xs-12'>
        <div className='row'>
          <div className='col-xs-12'>
            <h1 className='display-4 p-today__title u-mb-full'>{ title }</h1>
            <h4 className='today__title__resume f-light'>{ resume }</h4>
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
