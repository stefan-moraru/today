import React from 'react';

class Card extends React.Component {

  getType() {

    console.warn('[Card]: getType not implemented');

  }

  getTitle() {

    return '';

  }

  getDescription() {

    return '';

  }

  getContent() {

    console.log(`[${this.getType()}]: getContent not implemented`);

  }

  render() {

    const type = this.getType();
    const title = this.getTitle();
    const description = this.getDescription();
    const content = this.getContent();
    const containerProps = {
      className: `c-card c-card-${type}`
    };

    const titleProps = {
      className: 'title u-mb-half ' + ((this.getTitle() || '').length < 2 ? 'u-hidden' : '')
    };

    return (
      <div {...containerProps}>
        <div {...titleProps}>
          <h5 className='title--title u-m-0'>{ title }</h5>
          <span className='title--description f-light'>{ description }</span>
        </div>

        <div className='content'>
          { content }
        </div>
      </div>
    );

  }

}

export default Card;
