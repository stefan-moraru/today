import React from 'react';

class GoalsCard extends React.Component {

  render() {

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

    const goalsRendered = goals.map((item, index) => {

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
      <div className='c-card-goals'>
        <h5 className='c-card-title'>Goals</h5>

        { goalsRendered }
      </div>
    );

  }

}

export default GoalsCard;
