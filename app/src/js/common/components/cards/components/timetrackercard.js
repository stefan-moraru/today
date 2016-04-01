import React from 'react';
import Card from 'common/components/card';

class TimeTrackerCard extends Card {

  getType() {

    return 'timetracker';

  }

  getTitle() {

    return this.props.title;

  }

  getContent() {

    return (
      <div>
        <button className='btn btn-info'>Track</button>
      </div>
    );

  }

}

export default TimeTrackerCard;
