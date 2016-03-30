import React from 'react';
import Header from 'common/components/header';
import { BarChart, PieChart } from 'common/components/chart';
import Timeline from 'common/components/timeline';
import { Cards, ProfileCard, EventsCard, GoalsCard, FriendsCard, TimeTrackerCard, MapCard } from 'common/components/cards';

class Today extends React.Component {

  render() {

    const profileCardProps = {
      image: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAatAAAAJDI5NDdiMTUyLTJjODUtNDg1ZC05YmNmLTcxMWIwZDkzYzgyMg.jpg',
      name: 'Stefan Moraru',
      xp: 1020
    };

    const cards = [
      (<ProfileCard {...profileCardProps} />),
      (<EventsCard />),
      (<GoalsCard />),
      (<FriendsCard />),
      //(<TimeTrackerCard />),
      (<MapCard />),
      //(<PieChart />),
      //(<BarChart />)
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
            <h4 className='f-light'>Ai multa treaba astazi, dar ai pauze intre majoritatea evenimentelor.</h4>
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
