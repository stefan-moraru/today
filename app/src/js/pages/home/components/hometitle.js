import React from 'react';
import Title from 'common/components/title';

class HomeTitle extends Title {

  generateContent() {

    const props = {
      className: 'row ' + this.props.extraClasses || ''
    };

    const titleProps = {
      className: this.props.extraClassesTitle
    };

    return (
      <div {...props}>
        <div className='col-xs-12'>
          <h3 {...titleProps}>{ this.props.title }</h3>
        </div>
      </div>
    );

  }

}

export default HomeTitle;
