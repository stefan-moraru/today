import React from 'react';
import Header from 'common/components/header';
import { BarChart, PieChart } from 'common/components/chart';
import Timeline from 'common/components/timeline';
import { Cards, ProfileCard, EventsCard, GoalsCard, FriendsCard, TimeTrackerCard, MapCard } from 'common/components/cards';
import Utils from 'common/utils';

class Today extends React.Component {

  render() {

    const profileCardProps = {
      image: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAatAAAAJDI5NDdiMTUyLTJjODUtNDg1ZC05YmNmLTcxMWIwZDkzYzgyMg.jpg',
      name: 'Stefan Moraru',
      xp: 1020
    };

    const events = [
      {
        id: 0,
        time: { h: 7, m: 30 },
        date: '2016-03-31',
        duration: 30,
        location: 'CUG Iasi',
        categories: [{ id: 0, title: 'food' }],
        title: 'Meeting with Anca'
      },
      {
        id: 1,
        title: 'Breakdance practice',
        time: { h: 8, m: 0 },
        date: '2016-03-31',
        duration: 60,
        location: 'Podu Ros',
        categories: [{ id: 0, title: 'sports' }]
      },
      {
        id: 3,
        time: { h: 9, m: 0 },
        date: '2016-03-31',
        duration: 90,
        location: 'Universitatea Alexandru Ioan Cuza Iasi',
        categories: [{ id: 0, title: 'education' }, { id: 1, title: 'sports' }],
        title: 'Curs Sisteme de Operare'
      },
      {
        id: 4,
        time: { h: 12, m: 0 },
        date: '2016-03-30',
        duration: 30,
        location: 'Parcul Copou',
        categories: [{ id: 0, title: 'education' }, { id: 1, title: 'sports' }],
        title: 'Voluntariat'
      },
      {
        id: 5,
        time: { h: 16, m: 30 },
        date: '2016-03-30',
        duration: 90,
        location: 'Podu Ros',
        categories: [{ id: 0, title: 'sports' }],
        title: 'Running'
      },
      {
        id: 6,
        time: { h: 20, m: 0 },
        date: '2016-03-30',
        duration: 90,
        location: 'Palas Mall Iasi',
        categories: [{ id: 0, title: 'meditation' }],
        title: 'Meditating'
      },
    ];

    const eventsCardProps = {
      events: events
    };

    const mapCardProps = {
      locations: events.map(ev => ev.location)
    };

    const ev_props = Utils.todayEvents(events);

    const _breaks = Utils.breakMinutes(ev_props);
    const _cat = ev_props.map(item => item.categories);
    let _categories = [];

    _cat.forEach(a => {
      a.forEach(b => {
        const title = b.title;

        _categories.push(title);
      });
    });

    let _categoriesValues = {};

    _categories = _categories
    .filter((item, index) => {
      return _categories.indexOf(item) === index;
    })
    .forEach(item => {
      _categoriesValues[item] = 0;
    });

    let _total = 0;

    ev_props.forEach(ev => {
      ev.categories.forEach(cat => {
        _categoriesValues[cat.title] += 1;
        _total += 1;
      });
    });

    let pieChartProps = {
      data: []
    };

    Object.keys(_categoriesValues).forEach(cat => {
      pieChartProps.data = pieChartProps.data.concat({
        value: _categoriesValues[cat] / _total * 100,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: cat[0].toUpperCase().concat(cat.slice(1))
      });
    });

    const cards = [
      (<ProfileCard {...profileCardProps} />),
      (<EventsCard {...eventsCardProps} />),
      (<GoalsCard />),
      (<FriendsCard />),
      (<TimeTrackerCard />),
      (<MapCard {...mapCardProps} />),
      (<div className='c-card-chart'>
        <h5 className='title'>Categorii</h5>
        <PieChart {...pieChartProps} />
      </div>),
      //(<BarChart />)
    ];

    const cardsProps = {
      cards: cards
    };

    const timelineProps = {
      events: Utils.todayEvents(events)
    };

    const resume = Utils.dayResume(events);

    return (
      <div className='today col-xs-12'>
        <div className='row'>
          <div className='col-xs-12 u-hz-ctr'>
            <h1 className='display-4'>Astăzi</h1>
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
            <Cards {...cardsProps} />
          </div>
        </div>
      </div>
    );

  }

}

export default Today;
