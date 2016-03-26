import React from 'react';

class Cards extends React.Component {

  render() {

    const cards = this.props.cards;

    const cardsRendered = cards.map((item, index) => {

      return (
        <div className="card card-block" key={'today-c-cards-item-' + index}>
          { item }
        </div>
      );

    });

    return (
      <div className='card-columns'>
        { cardsRendered }
      </div>
    );
  }

}

export default Cards;
