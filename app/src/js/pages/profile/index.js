import React from 'react';
import CircleImage from 'common/components/circleimage';
import AchievementsService from 'common/services/achievementsservice';
import EventsService from 'common/services/eventservice';
import { EventCard, ChartCard } from 'common/components/cards';
import FbUtils from 'common/utils/firebase';
import moment from 'moment';
import VerticalTimeline from 'common/components/verticaltimeline';
import './index.scss';

class Profile extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      achievements: [],
      events: [],
      originalEvents: [],
      user: {}
    };

  }

  componentDidMount() {

    AchievementsService.getAchievements().then(this.saveAchievements.bind(this));
    FbUtils.getEventsForUser(this.props.params.email).then(this.saveEvents.bind(this));
    FbUtils.getUserWithEmail(this.props.params.email).then(this.saveUser.bind(this));

  }

  saveUser(user) {

    this.setState({
      user: user
    });

  }


  saveAchievements(achievements) {

    this.setState({
      achievements: achievements
    });

  }

  saveEvents(events) {

    this.setState({
      events: events,
      originalEvents: events
    });

  }

  getAchievements(achievements) {

    const achievementsRendered = achievements.map((item, index) => {

      const done = item.done(this.state.user);

      let doneClassName = 'goal--not-done';

      if (done) {
        doneClassName = 'goal--done';
      }

      return (
        <div className='col-md-3' key={`page-profile-item-${index}`}>
          <div className={`goal ${doneClassName} u-c-pointer`}>
            <h5 className='title'>{ item.title }</h5>
            <span className='f-light'>{ item.description }</span>
          </div>
        </div>
      );

    });

    return (
      <div>
        <div className='col-xs-12 u-hz-ctr u-mb-full'>
          <h1 className='f-light'>Achievements</h1>
          <h6>What you have achieved so far</h6>
        </div>

        <div className='col-md-10 push-md-1'>
          { achievementsRendered }
        </div>
      </div>
    );

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

  getChart(events) {

    const cardChartProps = {
      type: 'pie',
      data: this.getPieChartCategoriesData(events)
    };

    return (
      <div className='c-verticaltimeline'>
        <div className='col-xs-12 u-mb-full u-hz-ctr'>
          <h1 className='f-light'>Categories</h1>
          <h6>See how much time you spent</h6>
        </div>

        <div className='col-md-10 push-md-1'>
           <ChartCard {...cardChartProps} />
        </div>
      </div>
    );

  }

  render() {

    const circleImageProps = {
      size: 'big',
      image: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAatAAAAJDI5NDdiMTUyLTJjODUtNDg1ZC05YmNmLTcxMWIwZDkzYzgyMg.jpg',
      className: 'u-fl'
    };

    const achievements = this.getAchievements(this.state.achievements);
    const timeline = <VerticalTimeline events={this.state.events} searchEvents={this.searchEvents.bind(this)} />;
    const chart = this.getChart(this.state.events);
    let timelineRendered = null;

    if (this.state.originalEvents.length > 0) {
      timelineRendered = timeline;
    } else {
      timelineRendered = (
        <div className='full-loader u-ctr-flex u-ctr-flex-vh u-mt-full'>
          <img src='http://i.imgur.com/2CIo4so.gif' />
        </div>
      );
    }

    return (
      <div className='p-profile col-xs-12'>
        <div className='row u-mb-full'>
          <div className='col-xs-12 u-flex-ctr'>
            <CircleImage {...circleImageProps} />
          </div>
        </div>

        <div className='row u-mb-full u-hz-ctr'>
          <div className='col-xs-12'>
            <h1 className='display-4 f-light'>{ this.state.user.name }</h1>
          </div>
        </div>

        <div className='row u-mb-full'>
          { timelineRendered }
        </div>

        <div className='clearfix'></div>

        <div className='row u-mt-half'>
          { achievements }
        </div>

        <div className='clearfix'></div>

        <div className='row u-mt-full'>
          { chart }
        </div>
      </div>
    );

  }

}

export default Profile;
