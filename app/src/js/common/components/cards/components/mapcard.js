import React from 'react';

class MapCard extends React.Component {

  render() {

    const locations = [
      "Iasi Str Carpati nr 7",
      "Iulius Mall Iasi",
      "Palas Mall Iasi",
      "Universitatea Alexandru Ioan Cuza Iasi"
    ].map(item => item.replace(/\ /g, '+'));

    const first = locations[0];
    const last = locations[locations.length - 1];
    let waypoints;

    if (locations.length > 2) {

      waypoints = locations;

      waypoints.shift();
      waypoints.pop();

      waypoints = waypoints.join('|');

    }

    const urlParams = [
      `origin=${first}`,
      `waypoints=${waypoints}`,
      `destination=${last}`,
      `mode=walking`
    ];

    const iframeProps = {
      src: "https://www.google.com/maps/embed/v1/directions?key=AIzaSyAEypkJ8m2C1aDAzG_VhOiKn7sMIE0n5Wk&" + urlParams.join('&')
    };

    return (
      <div className='c-card-map'>
        <iframe {...iframeProps} />
      </div>
    );

  }

}


export default MapCard;
