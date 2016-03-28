import React from 'react';
import Header from 'common/components/header';
import { BarChart, PieChart } from 'common/components/chart';
import Timeline from 'common/components/timeline';
import { Cards, ProfileCard, EventsCard, GoalsCard, FriendsCard, TimeTrackerCard } from 'common/components/cards';

class Today extends React.Component {

  render() {

    const cards = [
      (<ProfileCard />),
      (<EventsCard />),
      (<GoalsCard />),
      (<FriendsCard />),
      (<TimeTrackerCard />),
      (<iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAEypkJ8m2C1aDAzG_VhOiKn7sMIE0n5Wk&q=Space+Needle,Seattle+WA"></iframe>),
      (<PieChart />),
      (<BarChart />)
    ];

    const cardsProps = {
      cards: cards
    };

    return (
      <div className='today col-xs-12'>
        <div className='row'>
          <div className='col-xs-12 u-hz-ctr'>
            <h1 className='display-4'>Astăzi</h1>
          </div>
        </div>

        <div className='row u-mt-full'>
          <div className='col-md-10 col-md-push-1'>
            <Timeline />
          </div>
        </div>

        <div className='row u-mt-full'>
          <div className='col-md-10 col-md-push-1'>
            <h5>Ziua de astazi</h5>
            <p>Ai multa treaba astazi, dar ai pauze intre majoritatea evenimentelor.</p>
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
