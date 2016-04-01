import React from 'react';

class MapCard extends React.Component {

  render() {

    const locations = this.props.locations
    .filter(item => item !== undefined && item !== null)
    .map(item => item.replace(/\ /g, '+'));

    const first = locations[0];
    const last = locations[locations.length - 1];
    let waypoints;

    let urlParams = [
    ];

    if (locations.length > 2) {
      waypoints = locations;

      waypoints.shift();
      waypoints.pop();

      waypoints = waypoints.join('|');

      urlParams = [
        `mode=walking`,
        `origin=${first}`,
        `destination=${last}`,
        `waypoints=${waypoints}`
      ];
    } else if (locations.length === 1) {
      urlParams = [ `q=${first}` ];
    }


    const iframeProps = {
      src: `https://www.google.com/maps/embed/v1/${locations.length > 2 ? 'directions' : 'place'}?key=AIzaSyAEypkJ8m2C1aDAzG_VhOiKn7sMIE0n5Wk&` + urlParams.join('&')
    };

    return (
      <div className='c-card c-card-map'>
        <iframe {...iframeProps} />
      </div>
    );

  }

}


export default MapCard;