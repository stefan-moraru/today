import React from 'react';
import Card from 'common/components/card';
import Utils from 'common/utils'
import EventService from 'common/services/eventservice';

class SuggestionCard extends Card {

  getType() {

    return 'suggestion';

  }

  getTitle() {

    return this.props.title;

  }

  createEvent(goal) {

    EventService.createEvent({
      title: goal.title
    });

  }

  goalsForBreak(breakItem) {

    const goalsRendered = this.props.goals.map((item, index) => {

      return (
        <div className='goal u-c-pointer' onClick={this.createEvent.bind(this, item)}>
          { item.title }
        </div>
      );

    });

    return goalsRendered;

  }

  getContent() {

    const events = this.props.events;
    const breaks = Utils.breakIntervals(events);

    const breaksRendered = breaks.map((item, index) => {

      const startTime = Utils.padTime(item.start);
      const endTime = Utils.padTime(item.end);
      const goals = this.goalsForBreak(item);

      return (
        <div className='suggestion row u-mt-half'>
          <div className='col-xs-12'>
            <h6>{ `${startTime} - ${endTime}` }</h6>

            <div className='goals'>
              { goals }
            </div>
          </div>
        </div>
      );

    });

    return (
      <div>
        { breaksRendered }
      </div>
    );

  }

}

SuggestionCard.defaultProps = {
  title: 'Sugestii',
  events: [],
  goals: []
}

export default SuggestionCard;
