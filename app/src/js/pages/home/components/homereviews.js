import React from 'react';

class HomeReviews extends React.Component {

  render() {

    const items = this.props.items;
    let renderedItems = [];

    if (items) {

      renderedItems = items.map((item, index) => {
        const style = {
          backgroundImage: `url(${item.image})`
        }

        return (
          <div className='row' key={`HomeReviews-item-${index}`}>
            <div className='col-xs-12'>
              <div className='u-fl u-hz-ctr image' style={style}>
              </div>

              <div className='u-fl'>
                <h5>{ item.title }</h5>
                <p>{ item.description }</p>
              </div>
            </div>
          </div>
        );
      });

    }

    return (
      <div className='c-home-reviews'>
        { renderedItems }
      </div>
    );

  }

}

export default HomeReviews;
