import React from 'react';
import SecondHeader from 'common/components/secondheader';
import moment from 'moment';
import momentRange from 'moment-range';
require('./index.scss');

class Goals extends React.Component {

  generateSecondHeader() {

    const secondHeaderProps = {
      items: [
        {
          'icon': 'plus'
        }
      ]
    };

    return <SecondHeader {...secondHeaderProps} />;

  }

  durationAsSentence(duration) {

    const h = Math.floor(duration / 60);
    const m = Math.floor(duration % 60);
    let sen = '';

    if (h) {
      if (h === 1) {
        sen += 'O ora';
      } else {
        sen += `${h} ore`;
      }
    }

    if (m) {
      if (h) {
        sen += ' si ';
      }

      if (m < 20) {
        sen += `${m} minute`;
      } else {
        sen += `${m} de minute`;
      }
    }

    return sen;

  }

  getCells(startDate, endDate, goal) {

    let cellsRendered = [];

    moment().range(startDate, endDate)
    .by('days', item => {
      const date = moment(item).format('YYYY-MM-DD');
      const day = moment(item).day();
      const done = goal.doneOn.indexOf(date) !== -1;

      if (goal.days.indexOf(day) !== -1) {

        const cellProps = {
          className: 'cell ' + (done ? 'done' : '')
        };

        cellsRendered.push((
          <div {...cellProps}>
          </div>
        ));

      }
    });

    return cellsRendered;

  }

  generateChains() {

    const goals = [
      {
        id: 1,
        days: [ 1, 2, 3 ],
        doneOn: [ '2016-03-02', '2016-03-05' ],
        title: 'Mancat sanatos',
        description: 'Fara fast-food sau dulciuri. Cel mult 2000 de calorii.'
      },
      {
        id: 2,
        days: [ 1, 2, 3, 4, 5, 6, 7 ],
        doneOn: [ '2016-03-02', '2016-03-05', '2016-04-01' ],
        title: 'Exercitii fizice',
        description: 'Alergat cel putin 2km sau mers la sala timp de o ora.',
        duration: 30
      },
      {
        id: 3,
        days: [ 1, 2, 3, 4, 5 ],
        doneOn: [ '2016-03-02', '2016-03-05', '2016-04-01' ],
        title: 'Invatat pentru facultate',
        description: 'Alergat cel putin 2km sau mers la sala timp de o ora.',
        duration: 90
      },
      {
        id: 4,
        days: [ 1 ],
        doneOn: [ '2016-03-14', '2016-03-15', '2016-04-01' ],
        title: 'Dansat',
        description: 'Mers la sala de dans',
        location: 'Quasar Dance Iasi',
        duration: 250
      }
    ];

    const profile = {
      createdAt: new Date('2016-01-01')
    };

    const startDate = moment(profile.createdAt);
    const endDate = moment(new Date());

    const goalsRendered = goals
    .map(item => {

      const cellsRendered = this.getCells(startDate, endDate, item);

      let duration = null;

      if (item.duration) {
        duration = (
          <h6 className='f-light chain--time'>
            <i className='fa fa-clock-o'></i>
            { this.durationAsSentence(item.duration) }
          </h6>
        );
      }

      return (
        <div className='col-xs-12 u-mb-full-2 chain'>
          <h4 className='f-light'>{ item.title }</h4>
          <h6 className='f-light chain--description'>
            <i className='fa fa-check-square-o'></i>
            { item.description }
          </h6>

          { duration }

          <div className='cells'>
            { cellsRendered }
          </div>
        </div>
      );

    });

    return goalsRendered;

  }

  render() {

    const secondHeader = this.generateSecondHeader();
    const chains = this.generateChains();

    return (
      <div className='p-goals'>
        { secondHeader }

        <div className='col-xs-12'>
          <div className='row u-mt-full chains'>
            <div className='col-md-10 col-md-push-1'>
              { chains }
            </div>
          </div>
        </div>
      </div>
    );

  }

}

export default Goals;
