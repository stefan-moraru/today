import React from 'react';
import moment from 'moment';
import momentRange from 'moment-range';
import SecondHeader from 'common/components/secondheader';
import DatePicker from 'common/components/datepicker';
import { EventModal } from 'common/components/modals';
import Utils from 'common/utils';
import FbUtils from 'common/utils/firebase';
import _ from 'lodash';
require('./index.scss');

const CONST_EVENT_MODAL_ID = 'calendar-page-modal-event';

class Calendar extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      events: [],
      startOfWeek: moment().startOf('isoweek'),
      endOfWeek: moment().endOf('isoweek'),
      selectedEvent: {}
    };

    this.mounted = false;
    this.headerTop = 55;

  }

  componentDidMount() {

    FbUtils.getEventsForCurrentUser().then(this.saveEvents.bind(this));

    document.addEventListener('keydown', this.keyDown.bind(this), false);
    document.addEventListener('scroll', this.onScroll.bind(this));

    this.mounted = true;

    const header = document.querySelector('.table-header');

    if (header) {

      this.headerTop = header.getBoundingClientRect().top;

    }

  }

  componentWillUnmount() {

    document.removeEventListener('keydown', this.keyDown.bind(this), false);
    document.removeEventListener('scroll', this.onScroll.bind(this));

    this.mounted = false;

  }

  keyDown(e) {

    if (this.mounted) {

      if (e.keyCode === 37) {

        this.switchToLastWeek();

      } else if (e.keyCode === 39) {

        this.switchToNextWeek();

      }

    }

  }

  getClassWithSticky(scrollY, element, sticky = 'sticky') {

    if (element) {

      const className = element.className;
      const stickyIndex = className.indexOf(sticky);
      let classes = className.split(' ');
      let top = this.headerTop;

      if (scrollY > top && stickyIndex === -1) {
        classes.push(sticky);
      } else if (scrollY <= top && stickyIndex !== -1) {
        classes.splice(classes.indexOf(sticky), 1);
      }

      return classes.join(' ');

    }

  }

  onScroll(ev) {

    if (this.mounted) {

      const header = document.querySelector('.table-header');
      const body = document.querySelector('.table-body');

      const scrollY = window.scrollY;

      header.className = this.getClassWithSticky(scrollY, header);
      body.className = this.getClassWithSticky(scrollY, body, 'sticky-body');

    }

  }

  selectEvent(event) {

    this.setState({
      selectedEvent: event
    });

  }

  saveEvents(response) {

    let newEvents = [];

    response.forEach((event, index) => {

      let value = Utils.eventValue(event);

      if (value > 1440) {

        event.duration = 1440 - Utils.eventStartMinutes(event);

        value = value - event.duration;

        let days = Math.floor(value / 1440);

        for (let i = 0; i < days; i++) {

          let newEvent = _.cloneDeep(event);

          newEvent.duration = 1440;

          if (i === days - 1) {
            newEvent.duration = value % 1440;
          } //Last

          newEvent.date = moment(newEvent.date, 'YYYY-MM-DD').add(i + 1, 'days').format('YYYY-MM-DD');
          newEvent.time.h = 0;
          newEvent.time.m = 0;
          newEvent.displayContent = false;

          newEvents.push(newEvent);

        }

      }

      return event;

    });

    const events = response.concat(newEvents);

    this.setState({
      events: events
    });

  }

  attendeesPictures(event) {

    const images = (event.attendees || []).map((item, index) => {

      const imgProps = {
        src: item.image || 'http://placehold.it/25x25',
        className: 'img-circle',
        key: `page-calendar-attendees-${(event || {}).id}-${index}`
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

    const headers = [ <i className='fa fa-clock-o' />, 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];
    const headerRendered = headers.map((item, index) => {

      const date = index > 0 ? ` (${moment(dates[index - 1], 'YYYY-MM-DD').format('DD/MM')})` : '';
      const today = Utils.isToday(dates[index - 1]) ? 'today' : '';
      const thProps = {
        className: 'f-light ' + today,
        key: 'calendar-table-th-' + index
      };

      return (
        <th {...thProps}>{ item }<span className='header-date'>{ date }</span></th>
      );

    });

    return headerRendered;

  }

  renderEvent(eventCount, ev, index) {

    const height = document.querySelector('.table-events tbody tr').clientHeight;

    const style = {
      height: `${Math.floor(ev.duration / 30) * height}px`,
      width: `${Math.floor(100 / eventCount)}%`,
      marginLeft: `${Math.floor(100 / eventCount) * index}%`
    };

    let showDescription = null;
    let showTime = null;
    let showLocation = null;
    let showFriends = null;

    if (ev.duration > 30) {
      showTime = <span>{ Utils.padTime(ev.time) }</span>;
      showLocation = <span>@ {ev.location}</span>;
    } else if (ev.duration > 90) {
      showDescription = <div><span>{ ev.description }</span></div>;
      showFriends = this.attendeesPictures(ev);
    }

    const eventProps = {
      className: `u-c-pointer event event--priority-${ev.priority}`,
      style: style,
      onClick: this.selectEvent.bind(this, ev),
      'data-toggle': 'modal',
      'data-target': `#${CONST_EVENT_MODAL_ID}`,
      key: `p-calendar-event-${ev.id}-${ev.title}-${ev.date}`
    };

    let content = null;

    if (ev.displayContent !== false) {

      content = (
        <div>
          <span className='event--title f-bold'>{ ev.title }</span> <br />
          <div>
            { showTime } { showLocation }
          </div>
          { showDescription }
          { showFriends }
        </div>
      );

    }

    return (
      <div {...eventProps}>
        { content }
      </div>
    );

  }

  renderTd(events, time, date) {

    //TODO: Match >= and <=
    let eventsMatched = events.filter(ev => ev.date === date && ev.time.h === time.h && ev.time.m === time.m);

    const eventsRendered = eventsMatched.map(this.renderEvent.bind(this, eventsMatched.length));

    const today = Utils.isToday(date) ? 'today' : '';
    const now = Utils.isNow(date, time) ? 'now' : '';

    const tdProps = {
      className: `${today} ${now}`,
      key: `p-calendar-tr-${time.h}-${time.m}-${date}`
    };

    return (
      <td {...tdProps}>
        { eventsRendered }
      </td>
    );

  }

  renderTr(events, dates, time) {

    const timeTdProps = {
      key: `p-calendar-tr-${time.h}-${time.m}-time`
    };

    const timeTd = (
      <td {...timeTdProps}>{ Utils.padTime(time) }</td>
    );

    let tds = dates.map(this.renderTd.bind(this, events, time));

    tds.unshift(timeTd);

    const trProps = {
      key: `p-calendar-tr-${time.h}-${time.m}`
    };

    return (
      <tr {...trProps}>
        { tds }
      </tr>
    );

  }

  getTableBody(dates, events) {

    let time = [];

    for (let i = 6; i < 24; i++) {
      time.push({ h: i, m: 0 });
      time.push({ h: i, m: 30 });
    }

    for (let i = 0; i < 6; i++) {
      time.push({ h: i, m: 0 });
      time.push({ h: i, m: 30 });
    }

    const bodyRendered = time.map(this.renderTr.bind(this, events, dates));

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
      <div>
        <table className='table table-events table-header'>
          <thead>
            <tr>
              { header }
            </tr>
          </thead>
        </table>

        <table className='table table-events table-body'>
          <tbody>
            { body }
          </tbody>
        </table>
      </div>
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
              <h5>Navigate to date</h5>

              <DatePicker onClick={this.switchToDate.bind(this)} selected={this.state.startOfWeek} />
            </div>
          )
        },
        {
          icon: 'list'
        },
        {
          icon: 'plus',
          toggle: 'modal',
          target: `#${CONST_EVENT_MODAL_ID}`,
          onClick: () => {
            this.setState({
              selectedEvent: {}
            });
          }
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
        <EventModal id={CONST_EVENT_MODAL_ID} event={this.state.selectedEvent}/>
        <SecondHeader {...secondHeaderProps} />

        <div>
          { table }
        </div>
      </div>
    );

  }

}

export default Calendar;
