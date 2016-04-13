import React from 'react';
import Description from 'common/components/description';

class HomeDescription extends Description {

  generateContent() {

    const props = {
      className: 'row ' + this.props.extraClasses || ''
    };

    return (
      <div {...props}>
        <div className='col-xs-12'>
          <p>{ this.props.description }</p>
        </div>
      </div>
    );

  }

}

export default HomeDescription;
