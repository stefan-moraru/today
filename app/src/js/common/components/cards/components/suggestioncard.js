import React from 'react';
import Card from 'common/components/card';
import Utils from 'common/utils'
import EventService from 'common/services/eventservice';
import moment from 'moment';

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

    const today = moment().day();

    const goals = this.props.goals
    .filter(goal => {
      return goal.days.indexOf(today) !== -1;
    })
    .filter(goal => {
      return goal.duration <= breakItem.duration;
    });

    const goalsRendered = goals.map((item, index) => {

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
    let rendered = null;

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

    rendered = (
      <div>
        { breaksRendered }
      </div>
    );

    if (breaksRendered.length === 0) {

      rendered = (
        <span>Poti face unul sau mai multe din goaluri la inceputul sau sfarsitul zilei.</span>
      );

    }

    return rendered;

  }

}

SuggestionCard.defaultProps = {
  title: 'Sugestii',
  events: [],
  goals: []
}

export default SuggestionCard;
