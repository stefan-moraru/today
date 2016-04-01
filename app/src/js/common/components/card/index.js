import React from 'react';

class Card extends React.Component {

  getType() {

    console.warn('[Card]: getType not implemented');

  }

  getTitle() {

    console.warn(`[${this.getType()}]: getTitle not implemented`);

  }

  getDescription() {

    return '';

  }

  getContent() {

    console.log(`[${this.getType()}]: getContent not implemented`);

  }

  render() {

    const title = this.getTitle();
    const description = this.getDescription();
    const content = this.getContent();

    console.log(content);

    return (
      <div className='c-card c-card-chart'>
        <div className='title'>
          <h5 className='title--title'>{ title }</h5>
          <span className='title--description'>{ description }</span>
        </div>

        <div className='content'>
          { content }
        </div>
      </div>
    );

  }

}

export default Card;
