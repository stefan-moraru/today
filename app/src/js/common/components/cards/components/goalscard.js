import React from 'react';
import Card from 'common/components/card';

class GoalsCard extends Card {

  getType() {

    return 'goals';

  }

  getTitle() {

    return this.props.title;

  }

  getIntroContent() {

    return 'O lista cu telurile pe care vrei sa le atingi. Poti adauga / bifa elemente mergand pe pagina \'Goals\'';

  }

  getContent() {

    const goals = [
      {
        title: 'Alergat',
        date: '2016-01-01',
        done: true
      },
      {
        title: 'Mancat\ sanatos',
        date: '2016-01-01',
        done: false
      },
      {
        title: 'Teme',
        date: '2016-01-01',
        done: true
      },
      {
        title: 'Programat',
        date: '2016-01-01',
        done: false
      }
    ];

    const goalsRendered = goals.sort((a, b) => a.done > b.done).map((item, index) => {

      const goalProps = {
        className: 'goal ' + (item.done ? 'goal--done' : 'goal--not-done')
      };

      let icon = <i className='fa fa-times'></i>;

      if (item.done === true) {
        icon = <i className='fa fa-check'></i>;
      }

      return (
        <div className='goal-container' key={'c-card-goals-goal-item-' + index}>
          <div {...goalProps}>
            <h6 className='title'>{ item.title }</h6>

            <div className='pull-right icon'>
              { icon }
            </div>

            <div className='clearfix'></div>
          </div>
        </div>
      );

    });

    return (
      <div>
        { goalsRendered }
      </div>
    );

  }

}

export default GoalsCard;
