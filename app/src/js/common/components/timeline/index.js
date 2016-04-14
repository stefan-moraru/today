import React from 'react';
import moment from 'moment';
require('./index.scss');

class Timeline extends React.Component {

  render() {

    const currentHour = moment().hour();

    const events = this.props.events;

    const eventsRendered = events.map((event, index) => {

      let extraClasses = `dot dot-${event.time.h} `;

      if (event.time.h > currentHour) {
        extraClasses += 'faded';
      }

      if (this.props.event && this.props.event.id === event.id) {
        extraClasses += 'current';
      }

      const dotProps = {
        'className': extraClasses,
        'data-title': event.title,
        'data-description': event.description,
        'key': 'c-timeline-item-' + index
      };

      return (
        <div {...dotProps}>
          <div className='circle'></div>

          <div className='description f-light'>
            <h5 className='title'> { event.title }</h5>
            <div className='clearfix'></div>
          </div>

        </div>
      );

    });

    return (
      <div className='c-timeline'>
        <progress className='progress progress-info' value={ currentHour } max='24'></progress>

        <div className='dots'>
          { eventsRendered }
        </div>

        <div className='clearfix'></div>
      </div>
    );

  }

}

export default Timeline;
