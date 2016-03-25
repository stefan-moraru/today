import React from 'react';
import Header from 'common/components/header';

class Timeline extends React.Component {

  render() {

    const events = [
      { title: 'Hello', description: 'Lorem pisum asimda diasnmda', time: { h: '4', m: '0', s: '0' } },
      { title: 'Hello', description: 'Lorem pisum asimda diasnmda', time: { h: '8', m: '0', s: '0' } },
      { title: 'Hello', description: 'Lorem pisum asimda diasnmda', time: { h: '10', m: '0', s: '0' } },
      { title: 'Hello', description: 'Lorem pisum asimda diasnmda', time: { h: '16', m: '0', s: '0' } },
      { title: 'Hello', description: 'Lorem pisum asimda diasnmda', time: { h: '23', m: '0', s: '0' } }
    ];

    const eventsRendered = events.map(event => {

      const extraClasses = `dot dot-${event.time.h}`;

      const dotProps = {
        'className': extraClasses,
        'data-title': event.title,
        'data-description': event.description
      };

      return (
        <div {...dotProps}>
          <div className='circle'></div>

          <div className='description'>
            <h4>{ event.title }</h4>
            <p>{ event.description }..</p>
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

class Section extends React.Component {

  render() {

    return (
      <div className='section'>
        { this.props.children }
      </div>
    );

  }

}

class Today extends React.Component {

  render() {

    return (
      <div className='today'>
        <div className='row'>
          <div className='col-xs-12 u-hz-ctr'>
            <h1 className='display-4'>Astăzi</h1>
          </div>
        </div>

          <div className='row u-mt-full'>
            <div className='col-md-10 col-md-push-1'>
              <Timeline />
            </div>
          </div>
      </div>
    );

  }

}

export default Today;
