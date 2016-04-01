import React from 'react';

class EventCancelCard extends React.Component {

  onMouseLeave() {

    console.log('lv');
    const cards = document.querySelectorAll('.c-card');

    for (let i = 0; i < cards.length; i++) {
      let item = cards[i];

      item.style['-webkit-filter'] = 'grayscale(0%)';
      item.style['opacity'] = '1';
    }

  }

  onMouseEnter() {

    console.log('en');
    const cards = document.querySelectorAll('.c-card');

    for (let i = 0; i < cards.length; i++) {
      let item = cards[i];

      item.style['-webkit-filter'] = 'grayscale(100%)';
      item.style['opacity'] = '0.5';
    }

  }

  render() {

    return (
      <div className='c-card-eventcancel'>
        <h5>Anuleaza participarea</h5>
        <button className='btn btn-danger btnCancel' onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>Anuleaza</button>
      </div>
    );

  }

}

export default EventCancelCard;
