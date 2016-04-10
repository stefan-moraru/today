import React from 'react';
import CircleImage from 'common/components/circleimage';
import AchievementsService from 'common/services/achievementsservice';
import EventsService from 'common/services/eventservice';
import { EventCard, ChartCard } from 'common/components/cards';
import './index.scss';

class Profile extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      achievements: [],
      events: []
    };

  }

  componentDidMount() {

    AchievementsService.getAchievements().then(this.saveAchievements.bind(this));
    EventsService.getEventsForCurrentUser().then(this.saveEvents.bind(this));

  }

  saveAchievements(achievements) {

    this.setState({
      achievements: achievements
    });

  }

  saveEvents(events) {

    this.setState({
      events: events
    });

  }

  getAchievements(achievements) {

    const achievementsRendered = achievements.map((item, index) => {

      const user = {}; //TODO

      const done = item.done(user);

      let doneClassName = 'goal--not-done';

      if (done) {
        doneClassName = 'goal--done';
      }

      return (
        <div className='col-md-3'>
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

        <div className='col-md-10 col-md-push-1'>
          { achievementsRendered }
        </div>
      </div>
    );

  }

  getTimeline(events) {

    const timelineRendered = events.map((item, index) => {

      let lineType = '';

      if (index === 0) {
        lineType = 'line--bottom';
      } else if (index === events.length - 1) {
        lineType = 'line--top';
      }

      const eventContent = (
        <div>
          <EventCard event={item} />
          <div className='triangle' />
        </div>
      )

      let left = null, right = null;

      if (index % 2 === 0) {

        left = eventContent;

      } else {

        right = eventContent;

      }

      return (
        <div className='row event-row'>
          <div className='col-md-5 left u-p-0'>
            { left }
          </div>
          <div className='col-md-2 hidden-sm-down mid'>
            <div className={`line ${lineType}`}></div>
            <div className='dot'></div>
          </div>
          <div className='col-md-5 right u-p-0'>
            { right }
          </div>
        </div>
      );

    });

    return (
      <div className='c-verticaltimeline'>
        <div className='col-xs-12 u-mb-full u-hz-ctr'>
          <h1 className='f-light'>Timeline</h1>
          <h6>History of events</h6>
        </div>

        <div className='col-md-10 col-md-push-1'>
          { timelineRendered }
        </div>
      </div>
    );

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

        <div className='col-md-10 col-md-push-1'>
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
    const timeline = this.getTimeline(this.state.events);
    const chart = this.getChart(this.state.events);

    return (
      <div className='p-profile col-xs-12'>
        <div className='row u-mb-full'>
          <div className='col-xs-12 u-flex-ctr'>
            <CircleImage {...circleImageProps} />
          </div>
        </div>

        <div className='row u-mb-full u-hz-ctr'>
          <div className='col-xs-12'>
            <h1 className='display-4 f-light'>Stefan Moraru</h1>
          </div>
        </div>

        <div className='row u-mb-full'>
          { timeline }
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
