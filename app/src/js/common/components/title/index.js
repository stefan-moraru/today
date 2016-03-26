import React from 'react';

class Title extends React.Component {

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

export default Title;
