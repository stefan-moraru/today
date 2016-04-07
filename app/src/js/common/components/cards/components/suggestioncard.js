import React from 'react';
import Card from 'common/components/card';
import Utils from 'common/utils'

class SuggestionCard extends Card {

  getType() {

    return 'suggestioncard';

  }

  getTitle() {

    return this.props.title;

  }

  getContent() {

    const events = this.props.events;
    const breaks = Utils.breakIntervals(events);

    const breaksRendered = breaks.map((item, index) => {

      const durationSentence = Utils.durationAsSentence(item.duration);
      const startTime = Utils.padTime(item.start);
      const endTime = Utils.padTime(item.end);

      return (
        <div>
          <div>
            { `${startTime} - ${endTime} (${durationSentence})` }
          </div>
        </div>
      );

    });

    return (
      <div>
        <h1>Hi</h1>

        { breaksRendered }
      </div>
    );

  }

}

export default SuggestionCard;
