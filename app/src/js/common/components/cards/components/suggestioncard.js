import React from 'react';
import Card from 'common/components/card';
import Utils from 'common/utils'
import EventService from 'common/services/eventservice';
import moment from 'moment';
import { EventModal } from 'common/components/modals';

const CONST_MODAL_ID = 'suggestion-card-event-modal';

class SuggestionCard extends Card {

  constructor(props) {

    super(props);

    this.state = {
      event: null
    };

  }

  getType() {

    return 'suggestion';

  }

  getTitle() {

    return this.props.title;

  }

  createEvent(goal, breakItem) {

    this.setState({
      event: {
        title: goal.title,
        timeH: breakItem.start.h,
        timeM: breakItem.start.m,
        duration: goal.duration || 0,
        description: goal.description,
        location: breakItem.location,
        category: 'Goal'
      }
    });

  }

  goalsForBreak(breakItem) {

    const today = moment().day();
    const food = {
      title: 'Food',
      description: 'Eat something'
    };

    const goals = this.props.goals
    .filter(goal => {
      return goal.days.indexOf(today) !== -1;
    })
    .filter(goal => {
      return goal.duration <= breakItem.duration;
    })
    .concat(food);


    const goalsRendered = goals.map((item, index) => {

      const goalProps = {
        className: 'goal goal--not-done u-c-pointer u-ctr-flex u-ctr-flex-v',
        onClick: this.createEvent.bind(this, item, breakItem),
        'data-toggle': 'modal',
        'data-target': `#${CONST_MODAL_ID}`,
        key: `suggestion-card-goal-item-${index}`
      };

      const duration = item.duration ? `(${Utils.durationAsShortSentence(item.duration)})` : '';

      return (
        <div {...goalProps}>
          <h6 className='u-m-0'>{ item.title } <span className='small'>{ duration }</span></h6>
        </div>
      );

    });

    return goalsRendered;

  }

  getBreaksRendered(breaks) {

    return breaks.map((item, index) => {

      const startTime = Utils.padTime(item.start);
      const endTime = Utils.padTime(item.end);
      const goals = this.goalsForBreak(item);
      const location = item.location ? `@ ${item.location}` : null;

      return (
        <div className='suggestion row u-mt-half' key={`suggestion-card-breaks-${index}`}>
          <div className='col-xs-12'>
            <h6>{ `${startTime} - ${endTime}` } { location }</h6>

            <div className='goals'>
              { goals }
            </div>
          </div>
        </div>
      );

    });

  }

  getContent() {

    const events = this.props.events;
    const breaks = Utils.breakIntervals(events);
    const breaksRendered = this.getBreaksRendered(breaks);
    let rendered = null;

    if (breaksRendered.length === 0) {

      if (events.length < 1) {

        rendered = (
          <span>Try achieveing as much as you can today, as you seem to be free</span>
        )

      } else {

        rendered = (
          <span>Looks like you can do your goals at the beginning or at the end of the day</span>
        );

      }

    } else {

      rendered = (
        <div>
          { breaksRendered }
          <EventModal id='suggestion-card-event-modal' event={this.state.event} />
        </div>
      );

    }

    return rendered;

  }

}

SuggestionCard.defaultProps = {
  title: 'Sugestions',
  events: [],
  goals: []
}

export default SuggestionCard;
