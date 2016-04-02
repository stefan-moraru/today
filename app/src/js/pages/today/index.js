import React from 'react';
import Header from 'common/components/header';
import Timeline from 'common/components/timeline';
import { Cards, ProfileCard, EventsCard, GoalsCard, FriendsCard, TimeTrackerCard, MapCard, EventCard, EventCancelCard, ChartCard } from 'common/components/cards';
import Utils from 'common/utils';
import EventService from 'common/services/eventservice';
import UserService from 'common/services/userservice';
require('./index.scss');

class Today extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      events: []
    };

  }

  componentDidMount() {

    EventService.getTodayEvents().then(this.saveEvents.bind(this));

    UserService.profile().then(this.saveProfile.bind(this));

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

  selectEvent(event) {

    this.setState({
      event: event
    });

  }

  getPieChartCategoriesData(events) {

    let _categoriesValues = {};
    let _total = 0;

    events.forEach(ev => {
      ev.categories.forEach(cat => {
        if (!_categoriesValues[cat.title]) {
          _categoriesValues[cat.title] = 0;
        }

        _categoriesValues[cat.title] += 1;
        _total += 1;
      });
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
        value: _categoriesValues[cat] / _total * 100,
        color: colors[colorInd],
        highlight: "#5AD3D1",
        label: cat[0].toUpperCase().concat(cat.slice(1))
      });
    });

    return data;

  }

  getCardsForEvents(events) {

    const cardProfileProps = {
      ...this.state.profile
    };

    const cardEventsProps = {
      title: 'Evenimente',
      events: this.state.events,
      onClick: this.selectEvent.bind(this)
    };

    const cardMapProps = {
      locations: this.state.events.map(ev => ev.location)
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

    const cardsProps = {
      cards: [
        (<ProfileCard {...cardProfileProps} />),
        (<EventsCard {...cardEventsProps} />),
        (<GoalsCard {...cardGoalsProps} />),
        (<FriendsCard {...cardFriendsProps} />),
        (<TimeTrackerCard {...cardTimeTrackerProps} />),
        (<MapCard {...cardMapProps} />),
        (<ChartCard {...cardChartProps} />)
      ]
    };

    return <Cards {...cardsProps} />

  }

  getCardsForEvent(event) {

    const mapCardProps = {
      locations: [event.location]
    };

    const eventCardProps = {
      event: event
    };

    const cardEventCancelProps = {
      title: 'Anuleaza eveniment'
    };

    const cards = [
      (<EventCard {...eventCardProps} />),
      (<EventCancelCard {...cardEventCancelProps} />),
      (<MapCard {...mapCardProps} />),
      (<FriendsCard />)
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
    let title = 'Astăzi ';

    if (this.state.event) {
      title += ` - ${this.state.event.title}`;
      resume = (
      <div className='u-c-pointer' onClick={this.resetEvent.bind(this)}>
        <i className='fa fa-arrow-left'></i>
        <span className='u-pl-half'>Inapoi acasa</span>
      </div>
      );
      cards = this.getCardsForEvent(this.state.event);
    } else {
      resume = Utils.dayResume(this.state.events);
      cards = this.getCardsForEvents(this.state.events);
    }

    return (
      <div className='p-today col-xs-12'>
        <div className='row'>
          <div className='col-xs-12 u-hz-ctr'>
            <h1 className='display-4'>{ title }</h1>
          </div>
        </div>

        <div className='row u-mt-full'>
          <div className='col-md-10 col-md-push-1'>
            <Timeline {...timelineProps} />
          </div>
        </div>

        <div className='row u-mt-full'>
          <div className='col-md-10 col-md-push-1'>
            <h4 className='f-light'>{ resume }</h4>
          </div>
        </div>

        <div className='row u-mt-full'>
          <div className='col-md-10 col-md-push-1 u-mt-half'>
            { cards }
          </div>
        </div>
      </div>
    );

  }

}

export default Today;
