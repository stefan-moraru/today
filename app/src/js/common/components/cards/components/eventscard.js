import React from 'react';
import Card from 'common/components/card';
import EventCard from './eventcard';

class EventsCard extends Card {

  getType() {

    return 'events';

  }

  getTitle() {

    return this.props.title;

  }

  getIntroContent() {

    return this.props.introContent;

  }

  generateEvents(events) {

    return events
    .map(item => {
      item.value = item.time.h * 60 + item.time.m + item.duration

      return item;
    })
    .sort((a, b) => a.value > b.value)
    .map((item, index) => {

      const cardEventProps = {
        event: item,
        onClick: this.props.onClick.bind(this),
        extraClasses: 'u-mt-half u-c-pointer',
        key: `eventscard-event-item-${index}`,
        remove: true
      };

      return <EventCard {...cardEventProps} />;

    });

  }

  getContent() {

    const eventsRendered = this.generateEvents(this.props.events);

    let rendered = <h6 className='u-f-light u-mt-quarter u-hz-ctr'>No events today</h6>;

    if (eventsRendered.length > 0) {
      rendered = eventsRendered;
    }

    return (
      <div>
        { rendered }
      </div>
    );

  }

}

EventsCard.defaultProps = {
  onClick: () => {
    return;
  }
};

export default EventsCard;
