import React from 'react';
import moment from 'moment';

class Timeline extends React.Component {

  render() {

    const currentHour = moment().hour();

    const events = this.props.events;

    const eventsRendered = events.map((event, index) => {

      let extraClasses = `dot dot-${event.time.h} `;

      if (event.time.h > currentHour) {
        extraClasses += 'faded';
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

          <div className='description'>
            <h5>{ event.title }</h5>
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
      </div>
    );

  }

}

export default Timeline;
