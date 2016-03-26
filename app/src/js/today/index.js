import React from 'react';
import Header from 'common/components/header';
import { BarChart, PieChart } from 'common/components/chart';
import Timeline from 'common/components/timeline';

console.log(BarChart);
console.log(PieChart);

class Cards extends React.Component {

  render() {

    const cards = this.props.cards;

    const cardsRendered = cards.map((item, index) => {

      return (
        <div className="card card-block" key={'today-c-cards-item-' + index}>
          { item }
        </div>
      );

    });

    return (
      <div className='card-columns'>
        { cardsRendered }
      </div>
    );
  }

}

class ProfileCard extends React.Component {

  render() {

    return (
      <div>
        <img src='http://placehold.it/50x50' />
        <h6>Stefan Moraru</h6>
        <h6>3</h6>
        <progress className='progress' value='5' max='10'></progress>
      </div>
    );

  }

}

class EventsCard extends React.Component {

  render() {

    return (
      <div>
        <h1>Events</h1>
      </div>
    );

  }

}

class GoalsCard extends React.Component {

  render() {

    return (
      <div>
        <div>
          <h4>Hi</h4>
          <input type='checkbox' />
        </div>
        <div>
          <h4>Hi</h4>
          <input type='checkbox' />
        </div>
        <div>
          <h4>Hi</h4>
          <input type='checkbox' />
        </div>
        <div>
          <h4>Hi</h4>
          <input type='checkbox' />
        </div>

      </div>
    );

  }

}

class FriendsCard extends React.Component {

  render() {

    return (
      <div>
        <div>
          <img src='http://placehold.it/50x50' />
        </div>
        <div>
          <img src='http://placehold.it/50x50' />
        </div>
        <div>
          <img src='http://placehold.it/50x50' />
        </div>
        <div>
          <img src='http://placehold.it/50x50' />
        </div>
      </div>
    );

  }

}

class TimeTrackerCard extends React.Component {

  render() {

    return (
      <div>
        <h4>Time tracker</h4>
        <button className='btn btn-info'>Track</button>
      </div>
    );

  }

}

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
