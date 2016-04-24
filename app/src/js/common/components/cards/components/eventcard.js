import React from 'react';
import Card from 'common/components/card';
import Utils from 'common/utils';
import EventService from 'common/services/eventservice';
import FbUtils from 'common/utils/firebase';
import moment from 'moment';

class EventCard extends Card {

  getDescription() {

    return this.props.description;

  }

  getExtraClassNames() {

    return 'u-p-0 ' + this.props.extraClasses;

  }

  getType() {

    return 'event';

  }

  deleteEvent(event, ev) {

    ev.stopPropagation();

    if (confirm('Are you sure you want to delete the event ?')) { // eslint-disable-line

      FbUtils.deleteEvent(event);

    }

  }

  getContent() {

    const event = this.props.event;
    const onClick = this.props.onClick.bind(this, event);
    let remove = null;
    let image = event.image;

    if (!image) {
      image = EventService.backgroundImageFromCategories(event);
    }

    if (this.props.remove) {

      remove = (
        <div className='remove' onClick={this.deleteEvent.bind(this, event)}>
          <i className='fa fa-remove'></i>
        </div>
      );

    }

    const style = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)), url(${image})`
    };

    const start = Utils.padTime(event.time);
    const value = Utils.eventValue(event);
    const endingH = Math.floor(value / 60);
    const endingM = value % 60;
    const ending = Utils.padTime({ h: endingH, m: endingM });
    const time = `${start} - ${ending}`;

    const containerProps = {
      style: style,
      onClick: onClick,
      className: `event-inner-content event--priority-${event.priority}`
    };

    let date = null;

    if (event.date) {

      date = `${moment(event.date).format('DD MMM')} /`;

    }

    return (
      <div {...containerProps}>
        <div className='description'>
          <h5>{ event.title }</h5>
          <h6>{ date } { time }</h6>
          <h6>{ event.location }</h6>

          { remove }
        </div>
      </div>
    );

  }

}

EventCard.defaultProps = {
  onClick: () => {
    return;
  },
  remove: false
};

export default EventCard;
