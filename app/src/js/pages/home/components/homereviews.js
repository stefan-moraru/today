import React from 'react';

class HomeReviews extends React.Component {

  render() {

    const items = this.props.items;
    let renderedItems = [];

    if (items) {

      renderedItems = items.map((item, index) => (
        <div className='row' key={`HomeReviews-item-${index}`}>
          <div className='col-xs-12'>
            <div className='u-fl u-hz-ctr'>
              <img src={ item.image } />
            </div>

            <div className='u-fl'>
              <h5>{ item.title }</h5>
              <p>{ item.description }</p>
            </div>
          </div>
        </div>
      ));

    }

    return (
      <div className='c-home-reviews'>
        { renderedItems }
      </div>
    );

  }

}

export default HomeReviews;
