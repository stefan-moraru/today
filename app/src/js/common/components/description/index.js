import React from 'react';

class Description extends React.Component {

  generateContent() {

    return null;

  }

  render() {

    const props = {
      className: this.props.extraClasses || ''
    };

    return (
      <div {...props}>
        { this.generateContent() }
      </div>
    );

  }

}

export default Description;
