import React from 'react';
import Jumbotron from 'common/components/jumbotron';

class HomeJumbotron extends Jumbotron {

  generateContent() {

    return (
      <div>
        <h1 className='f-bold display-4'>{ this.props.title }</h1>
        <h3 className='f-light'>{ this.props.description }</h3>

        <div className='arrow'>
          <p>Afla mai multe</p>
          <i className='fa fa-chevron-down'></i>
        </div>
      </div>
    );

  }

}

export default HomeJumbotron;
