import React from 'react';

class Jumbotron extends React.Component {

  render() {

    const content = this.generateContent();

    return (
      <div className='jumbotron'>
        { content }
      </div>
    );

  }

}

export default Jumbotron;
