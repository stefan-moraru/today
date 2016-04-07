import React from 'react';
import moment from 'moment';
import momentRange from 'moment-range';
import SecondHeader from 'common/components/secondheader';
import EventService from 'common/services/eventservice';
import DatePicker from 'common/components/datepicker';
import CreateEvent from './components/createevent';
import Utils from 'common/utils';
require('./index.scss');

class Calendar extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      events: [],
      startOfWeek: moment().startOf('isoweek'),
      endOfWeek: moment().endOf('isoweek'),
      selectedEvent: {}
    };

  }

  componentDidMount() {

    this.getEvents();

  }

  selectEvent(event) {

    this.setState({
      selectedEvent: event
    }, () => {
      const icon = document.querySelector('.secondheader-icon.fa.fa-plus');

      icon.click();

      console.log(icon);

      if (icon) {
        icon.click();
      }
    });

  }

  getEvents() {

    EventService.getEvents(this.state.startOfWeek.format('YYYY-MM-DD'), this.state.endOfWeek.format('YYYY-MM-DD')).then(this.saveEvents.bind(this));

  }

  saveEvents(response) {

    this.setState({
      events: response
    });

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

  getTableHeader(dates) {

    const headers = [ <i className='fa fa-clock-o' />, 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sam', 'Dum' ];
    const headerRendered = headers.map((item, index) => {

      const date = index > 0 ? ` (${moment(dates[index - 1], 'YYYY-MM-DD').format('DD/MM')})` : '';
      const today = Utils.isToday(dates[index - 1]) ? 'today' : '';
      const thProps = {
        className: 'f-light ' + today,
        key: 'calendar-table-th-' + index
      };

      return (
        <th {...thProps}>{ item }{ date }</th>
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

        const eventsRendered = eventsMatched.map((ev, index3) => {

          const height = document.querySelector('.table-events tbody tr').clientHeight;

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
            <div className='event u-c-pointer' style={style} key={'calendar-table-body-td-' + index3 + '-' + index2} onClick={this.selectEvent.bind(this, ev)}>
              <span className='event--title f-bold'>{ ev.title }</span> <br />
              <div>
                { showTime } { showLocation }
              </div>
              { showDescription }
              { showFriends }
            </div>
          );

        });

        const today = Utils.isToday(date) ? 'today' : '';
        const now = Utils.isNow(date, item) ? 'now' : '';

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

  getTable(events, start, end) {

    let dates = [];

    moment().range(start, end).by('days', item => {
      dates.push(item.format('YYYY-MM-DD'))
    });

    const header = this.getTableHeader(dates);
    const body = this.getTableBody(dates, events);

    return (
      <table className='table table-events'>
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

  switchToCurrentWeek() {

    this.setState({
      startOfWeek: moment().startOf('isoweek'),
      endOfWeek: moment().endOf('isoweek')
    });

  }

  switchToLastWeek() {

    this.setState({
      startOfWeek: moment(this.state.startOfWeek).subtract(1, 'weeks').startOf('isoweek'),
      endOfWeek: moment(this.state.endOfWeek).subtract(1, 'weeks').endOf('isoweek')
    });

  }

  switchToNextWeek() {

    this.setState({
      startOfWeek: moment(this.state.startOfWeek).add(1, 'weeks').startOf('isoweek'),
      endOfWeek: moment(this.state.endOfWeek).add(1, 'weeks').endOf('isoweek')
    });

  }

  switchToDate(date) {

    this.setState({
      startOfWeek: moment(date.format('YYYY-MM-DD'), 'YYYY-MM-DD').startOf('isoweek'),
      endOfWeek: moment(date.format('YYYY-MM-DD'), 'YYYY-MM-DD').endOf('isoweek')
    });

  }

  render() {

    const events = this.state.events;
    const start = this.state.startOfWeek;
    const end = this.state.endOfWeek;
    const table = this.getTable(events, start, end);

    const secondHeaderProps = {
      items: [
        {
          icon: 'calendar',
          extra: (
            <div>
              <h5>Alege o data</h5>

              <DatePicker onClick={this.switchToDate.bind(this)} />
            </div>
          )
        },
        {
          icon: 'list'
        },
        {
          icon: 'plus',
          extra: <CreateEvent event={this.state.selectedEvent} />
        }
      ],
      itemsRight: [
        {
          index: 0,
          icon: 'chevron-left',
          onClick: this.switchToLastWeek.bind(this)
        },
        {
          index: 1,
          icon: 'calendar-times-o',
          onClick: this.switchToCurrentWeek.bind(this)
        },
        {
          index: 2,
          icon: 'chevron-right',
          onClick: this.switchToNextWeek.bind(this)
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
