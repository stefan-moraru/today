import React from 'react';

class Cards extends React.Component {

  render() {

    const cards = this.props.cards;

    const cardsRendered = cards.map((item, index) => {

      console.log(item.type.name);

      return (
        <div className={"card card-block " + item.type.name} key={'today-c-cards-item-' + index}>
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
