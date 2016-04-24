import React from 'react';
import { PieChart, BarChart, RadarChart } from 'common/components/chart';
import moment from 'moment';

class Activity extends React.Component {

  generateMenu() {

    return (
      <div>
          <div className='input-group u-mb-quarter'>
            <span className='input-group-addon'><i className='fa fa-calendar fa-fw'></i></span>
            <input type='date' className='form-control' placeholder='Date' />
          </div>

          <div className='input-group u-mb-quarter'>
            <span className='input-group-addon'><i className='fa fa-clock-o fa-fw'></i></span>
            <input type='text' className='form-control' placeholder='Time' />
          </div>

          <button className='btn'>
            <i className='fa fa-edit'></i>
          </button>

          <button className='btn btn-success u-ml-quarter'>
            <i className='fa fa-plus'></i>
          </button>

          <button className='btn btn-danger u-ml-quarter'>
            <i className='fa fa-minus'></i>
          </button>
      </div>
    );

  }

  generateSpentList(spentList) {

    const rendered = (spentList || []).map((item) => {

      return (
        <li className='list-group-item'>
          <div className='u-fl'>
            <i className='fa fa-calendar'></i>{moment(item.date).format('YYYY-MM-DD')}
          </div>
          <div className='u-fl'>
            <i className='fa fa-clock-o'></i>{item.duration}
          </div>
          <div className='u-fr'>
            <i className='fa fa-times'></i>
          </div>

          <div className='clearfix'></div>
        </li>
      );

    });

    return (
      <ul className='list-group spent-list'>
        { rendered }
      </ul>
    );

  }

  generateChart(spentList, good = false) {

    let color = 'rgb(231, 76, 60)';

    if (good) {
      color = 'rgb(46, 204, 113)';
    }

    let timePerDay = [0, 0, 0, 0, 0, 0, 0];

    spentList.forEach(spent => {
      const start = moment(spent.date);

      if (start.isoWeek() === moment().isoWeek()) {

        timePerDay[start.isoWeekday()] += spent.duration;

      }
    });

    let data = {
      labels: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ],
      datasets: [
        {
          label: 'Time spent',
          fillColor: color,
          strokeColor: 'rgba(220,220,220,0.8)',
          highlightFill: 'rgba(220,220,220,0.75)',
          highlightStroke: 'rgba(220,220,220,1)',
          data: timePerDay
        }
      ]
    };

    return <BarChart data={data} />;

  }

  render() {

    const data = {
    };

    return (
      <div>
        <div className='col-xl-12 u-mb-quarter'>
          <h2 className='f-light'>{ this.props.title }</h2>
        </div>

        <div className='col-xl-3'>
          { this.generateMenu() }
        </div>

        <div className='col-xl-3'>
          { this.generateSpentList(this.props.spent) }
        </div>

        <div className='col-xl-6'>
          { this.generateChart(this.props.spent, this.props.good) }
        </div>
      </div>
    );

  }

}

export default Activity;
