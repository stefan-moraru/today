import React from 'react';
import Card from 'common/components/card';

class EventCancelCard extends Card {

  getType() {

    return 'eventcancel';

  }

  getTitle() {

    return this.props.title;

  }

  getExtraClassNames() {

    return 'immune';

  }

  getCards() {

    return document.querySelectorAll('.c-card:not(.immune)');

  }

  onMouseLeave() {

    const cards = this.getCards();

    for (let i = 0; i < cards.length; i++) {
      let item = cards[i];

      item.style['-webkit-filter'] = 'grayscale(0%)';
      item.style['opacity'] = '1';
    }

  }

  onMouseEnter() {

    const cards = this.getCards();

    for (let i = 0; i < cards.length; i++) {
      let item = cards[i];

      item.style['-webkit-filter'] = 'grayscale(100%)';
      item.style['opacity'] = '0.5';
    }

  }

  getContent() {

    const btnCancelProps = {
      className: 'btn btn-danger btnCancel',
      onMouseEnter: this.onMouseEnter.bind(this),
      onMouseLeave: this.onMouseLeave.bind(this)
    };

    const btnCancelText = 'Anuleaza';

    return (
      <div>
        <button {...btnCancelProps}>
          { btnCancelText }
        </button>
      </div>
    );

  }

}

export default EventCancelCard;
