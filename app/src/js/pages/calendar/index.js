import React from 'react';
import moment from 'moment';
import SecondHeader from 'common/components/secondheader';

class Calendar extends React.Component {

  padTime(time) {

    let hour = time.h;
    let minutes = time.m;

    if (hour < 10) {
      hour = `0${hour}`
    }

    if (minutes == 0) {
      minutes = `00`;
    }

    return `${hour}:${minutes}`;

  }

  isToday(date) {

    return date === moment().format('YYYY-MM-DD');

  }

  isNow(date, time) {

    const now = new Date();
    const now_h = now.getHours();
    let now_m = now.getMinutes();

    if (now_m > 30) {
      now_m = 30;
    } else {
      now_m = 0;
    }

    return this.isToday(date) && time.h === now_h && time.m === now_m;

  }

  getTableHeader(dates) {

    const headers = [ <i className='fa fa-clock-o' />, 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sam', 'Dum' ];
    const headerRendered = headers.map((item, index) => {

      const date = index > 0 ? ` (${moment(dates[index - 1], 'DD-MM-YYYY').format('DD/MM')})` : '';
      const today = this.isToday(dates[index - 1]) ? 'today' : '';

      return (
        <th className={'f-light ' + today} key={'calendar-table-th-' + index}>{ item }{ date }</th>
      );

    });

    return headerRendered;

  }

  getTableBody(dates, events) {

    let time = [];

    for (let i = 0; i < 24; i++) {
      time.push({ h: i, m: 0 });
      time.push({ h: i, m: 30 });
    }

    const bodyRendered = time.map((item, index) => {

      const eventList = events;

      let tds = dates.map((date, index2) => {

        const eventsMatched = eventList.filter(ev => ev.date === date && ev.time.h === item.h && ev.time.m === item.m);

        const events = eventsMatched.map((ev, index) => {

          return (
            <div className='event' key={'calendar-table-body-td-' + index + '-' + index2}>
              { ev.title }
            </div>
          );

        });

        const today = this.isToday(date) ? 'today' : '';
        const now = this.isNow(date, item) ? 'now' : '';

        return (
          <td className={today + ' ' + now}>
            { events }
          </td>
        );

      });

      tds.unshift(<td>{ this.padTime(item) }</td>);

      return (
        <tr key={'calendar-table-body-tr-' + index}>
          { tds }
        </tr>
      );

    });

    return bodyRendered;

  }

  getTable(events) {

    //Saptamana in care se afla ziua de astazi TODO
    const dates = [
      '2016-03-28',
      '2016-03-29',
      '2016-03-30',
      '2016-03-31',
      '2016-04-01',
      '2016-04-02',
      '2016-04-03'
    ];

    const header = this.getTableHeader(dates);
    const body = this.getTableBody(dates, events);

    return (
        <table className='table'>
          <thead>
            <tr>
              { header }
            </tr>
          </thead>
          <tbody>
            { body }
          </tbody>
        </table>
    );

  }

  render() {

    const events = [
      {
        time: {
          h: 5,
          m: 30,
          s: 0
        },
        duration: 60,
        date: '2016-03-28',
        title: 'Nu'
      },
      {
        time: {
          h: 4,
          m: 30,
          s: 0
        },
        duration: 60,
        date: '2016-03-28',
        title: 'Da'
      },
      {
        time: {
          h: 6,
          m: 30,
          s: 0
        },
        duration: 30,
        date: '2016-03-29',
        title: 'Hi'
      }
    ];

    const table = this.getTable(events);
    const secondHeaderProps = {
      items: [
        {
          icon: 'calendar'
        },
        {
          icon: 'list'
        },
        {
          icon: 'plus'
        }
      ]
    };

    return (
      <div className='calendar'>
        <SecondHeader {...secondHeaderProps} />

        <div className='col-xs-12'>
          { table }
        </div>
      </div>
    );

  }

}

export default Calendar;
