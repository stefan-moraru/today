import React from 'react';
require('./index.scss');

class ThreeColumns extends React.Component {

  render() {

    const items = this.props.items;
    let renderedItems = [];

    if (items) {

      renderedItems = items.splice(0, 4).map((item, index) => {

        const style = {
          backgroundImage: `url(${item.image})`
        };

        return (
          <div className='col-md-3 column' key={`item-${index}`}>
            <div className='u-ctr-flex u-ctr-flex-h'>
              <div className='image' style={style}></div>
            </div>
    
            <p>{ item.description }</p>
          </div>
        );

      }
    );

    }

    return (
      <div className='row c-three-columns'>
        { renderedItems }
      </div>
    );

  }

}

export default ThreeColumns;
