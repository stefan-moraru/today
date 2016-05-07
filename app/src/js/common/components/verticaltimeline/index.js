import React from 'react';
import { EventCard, ChartCard } from 'common/components/cards';

class VerticalTimeline extends React.Component {

  getTimeline(events) {

    const timelineRendered = events.map((item, index) => {

      let lineType = '';

      if (index === 0) {
        lineType = 'line--bottom';
      } else if (index === events.length - 1) {
        lineType = 'line--top';
      }

      const eventContent = (
        <div>
          <EventCard event={item} />
          <div className='triangle' />
        </div>
      )

      let left = null, right = null;

      if (index % 2 === 0) {

        left = eventContent;

      } else {

        right = eventContent;

      }

      let lineClass = events.length === 1 ? 'u-hidden' : '';

      return (
        <div className='row event-row' key={`page-profile-event-${index}`}>
          <div className='col-md-5 left u-p-0'>
            { left }
          </div>
          <div className='col-md-2 hidden-sm-down mid'>
            <div className={`line ${lineType} ${lineClass}`}></div>
            <div className='dot'></div>
          </div>
          <div className='col-md-5 right u-p-0'>
            { right }
          </div>
        </div>
      );

    });

    const noEvents = timelineRendered.length === 0 ? <h4 className='f-light'>No events</h4> : null;

    let input = null;

    if (timelineRendered.length > 0) {

      input = (
        <div className='row'>
          <div className='col-xs-12 col-md-6 push-md-3 u-mb-full u-p-0'>
            <div className='input-group u-mb-quarter'>
              <span className='input-group-addon'><i className='fa fa-search'></i></span>
              <input type='text' className='form-control' placeholder='Search (ex: 2016, Practice, 2016-01-03, today, Palas mall)' onChange={this.props.searchEvents.bind(this)} />
            </div>
          </div>
        </div>
      );
  
    }

    return (
      <div className='c-verticaltimeline'>
        <div className='col-xs-12 u-mb-full u-hz-ctr'>
          <h1 className='f-light'>Timeline</h1>
          <h6>History of events</h6>
        </div>

        { input }

        <div className='col-md-10 push-md-1'>
          <div className='u-hz-ctr'>
            { noEvents }
          </div>
          { timelineRendered }
        </div>
      </div>
    );

  }

  render() {

    const timeline = this.getTimeline(this.props.events);

    return (
      <div>
        { timeline }
      </div>
    );

  }

}

export default VerticalTimeline;
