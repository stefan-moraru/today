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

  onClick(item) {

    this.props.onClick(item);

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
        event: item
      };

      return <EventCard {...cardEventProps} />;

    });

  }

  getContent() {

    const eventsRendered = this.generateEvents(this.props.events);

    return (
      <div>
        { eventsRendered }
      </div>
    );

  }

}

export default EventsCard;
