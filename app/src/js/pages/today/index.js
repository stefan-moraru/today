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
        categories: [{ id: 0, title: 'education' }],
        title: 'Curs Sisteme de Operare'
      },
      {
        id: 4,
        time: { h: 12, m: 0 },
        date: '2016-03-30',
        duration: 30,
        location: 'Parcul Copou',
        categories: [{ id: 0, title: 'education' }],
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

    const _total = Utils.activityMinutes(Utils.todayEvents(events));

    console.log(_total);

    const pieChartProps = {
      data: [
        {
          value: 100 * Utils.eventsDuration(events) / _total,
          color:"#F7464A",
          highlight: "#FF5A5E",
          label: "Activitati"
        },
        {
          value: 100 * Utils.breakMinutes(events) / _total,
          color: "#46BFBD",
          highlight: "#5AD3D1",
          label: "Pauza"
        }
      ]
    };

    const cards = [
      (<ProfileCard {...profileCardProps} />),
      (<EventsCard {...eventsCardProps} />),
      (<GoalsCard />),
      (<FriendsCard />),
      //(<TimeTrackerCard />),
      (<MapCard {...mapCardProps} />),
      (<PieChart {...pieChartProps} />),
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
