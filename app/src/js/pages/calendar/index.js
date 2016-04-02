import React from 'react';
import moment from 'moment';
import momentRange from 'moment-range';
import SecondHeader from 'common/components/secondheader';
import EventService from 'common/services/eventservice';
import Utils from 'common/utils';
require('./index.scss');

class Calendar extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      events: []
    };

  }

  componentDidMount() {
    EventService.getTodayEvents().then(this.saveEvents.bind(this));
  }

  saveEvents(response) {
    this.setState({
      events: response
    });
  }

  isToday(date) {

    return date === moment().format('YYYY-MM-DD');

  }

  isNow(date, time) {

    const now = new Date();
    const nowH = now.getHours();
    let nowM = now.getMinutes();

    if (nowM > 30) {
      nowM = 30;
    } else {
      nowM = 0;
    }

    return this.isToday(date) && time.h === nowH && time.m === nowM;

  }

  getTableHeader(dates) {

    const headers = [ <i className='fa fa-clock-o' />, 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sam', 'Dum' ];
    const headerRendered = headers.map((item, index) => {

      const date = index > 0 ? ` (${moment(dates[index - 1], 'YYYY-MM-DD').format('DD/MM')})` : '';
      const today = this.isToday(dates[index - 1]) ? 'today' : '';

      return (
        <th className={'f-light ' + today} key={'calendar-table-th-' + index}>{ item }{ date }</th>
      );

    });

    return headerRendered;

  }

  attendeesPictures(event) {

    const images = (event.attendees || []).map(item => {

      const imgProps = {
        src: item.image || 'http://placehold.it/25x25',
        className: 'img-circle'
      };

      return (
        <img {...imgProps} />
      );

    })

    return (
      <div className='attendees'>
        { images }
      </div>
    );

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

        const eventsRendered = eventsMatched.map((ev, index3) => {

          const height = document.querySelector('tbody tr').clientHeight;

          const style = {
            backgroundColor: Utils.colorForCategory(ev.category),
            height: `${Math.floor(ev.duration / 30) * height}px`
          };

          let showDescription = null;
          let showTime = null;
          let showLocation = null;
          let showFriends = null;

          if (ev.duration > 30) {
            showTime = <span>{ Utils.padTime(ev.time) } @</span>;
            showLocation = <span>{ev.location}</span>;
          }

          if (ev.duration > 60) {
            //
          }

          if (ev.duration > 90) {
            showDescription = <div><span>{ ev.description }</span></div>;
            showFriends = this.attendeesPictures(ev);
          }

          return (
            <div className='event' style={style} key={'calendar-table-body-td-' + index3 + '-' + index2}>
              <span className='event--title f-bold'>{ ev.title }</span> <br />
              <div>
                { showTime } { showLocation }
              </div>
              { showDescription }
              { showFriends }
            </div>
          );

        });

        const today = this.isToday(date) ? 'today' : '';
        const now = this.isNow(date, item) ? 'now' : '';

        return (
          <td className={today + ' ' + now} key={'calendar-table-body-td-' + index + ' ' + index2}>
            { eventsRendered }
          </td>
        );

      });

      tds.unshift(<td>{ Utils.padTime(item) }</td>);

      return (
        <tr key={'calendar-table-body-tr-' + index}>
          { tds }
        </tr>
      );

    });

    return bodyRendered;

  }

  getTable(events) {

    const start = moment().startOf('isoweek');
    const end = moment().endOf('isoweek');

    let dates = [];

    moment().range(start, end).by('days', item => {
      dates.push(item.format('YYYY-MM-DD'))
    });

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

    const events = this.state.events;

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
