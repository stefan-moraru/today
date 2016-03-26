import React from 'react';

class Timeline extends React.Component {

  render() {

    const events = [
      { title: 'Hello', description: 'Lorem pisum asimda diasnmda', time: { h: '4', m: '0', s: '0' } },
      { title: 'Hello', description: 'Lorem pisum asimda diasnmda', time: { h: '8', m: '0', s: '0' } },
      { title: 'Hello', description: 'Lorem pisum asimda diasnmda', time: { h: '10', m: '0', s: '0' } },
      { title: 'Hello', description: 'Lorem pisum asimda diasnmda', time: { h: '16', m: '0', s: '0' } },
      { title: 'Hello', description: 'Lorem pisum asimda diasnmda', time: { h: '23', m: '0', s: '0' } }
    ];

    const eventsRendered = events.map((event, index) => {

      const extraClasses = `dot dot-${event.time.h}`;

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
        <progress className='progress progress-info' value='5' max='24'></progress>

        <div className='dots'>
          { eventsRendered }
        </div>
      </div>
    );

  }

}

export default Timeline;
