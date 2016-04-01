import React from 'react';
require('./index.scss');

class ThreeColumns extends React.Component {

  render() {

    const items = this.props.items;
    let renderedItems = [];

    if (items) {

      renderedItems = items.splice(0, 4).map((item, index) => (
        <div className='col-md-3' key={`item-${index}`}>
          <img src={ item.image } />
          <p>{ item.description }</p>
        </div>
      ));

    }

    return (
      <div className='row c-three-columns'>
        { renderedItems }
      </div>
    );

  }

}

export default ThreeColumns;
