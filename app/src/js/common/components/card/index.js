import React from 'react';
require('./index.scss');

class Card extends React.Component {

  getExtraClassNames() {

    return '';

  }

  getType() {

    return '';

  }

  getTitle() {

    return '';

  }

  getDescription() {

    return '';

  }

  getContent() {

    return '';

  }

  getIntroContent() {

    return '';

  }

  render() {

    const type = this.getType();
    const title = this.getTitle();
    const description = this.getDescription();
    const content = this.getContent();
    const extraClassNames = this.getExtraClassNames();
    const introContent = this.getIntroContent();

    let containerProps = {
      className: `${extraClassNames} c-card c-card-${type}`
    };

    if (introContent) {
      containerProps['data-intro'] = introContent;
      containerProps['data-position'] = 'right';
    }

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
