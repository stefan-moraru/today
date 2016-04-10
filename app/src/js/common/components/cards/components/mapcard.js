import React from 'react';
import Card from 'common/components/card';

class MapCard extends Card {

  getType() {

    return 'map';

  }

  getIntroContent() {

    return this.props.introContent;

  }

  getContent() {

    const locations = this.props.locations
    .filter(item => typeof item !== 'undefined' && item !== null)
    .map(item => item.replace(/\ /g, '+'));

    const first = locations[0];
    const last = locations[locations.length - 1];
    let waypoints;
    let rendered = null;

    let urlParams = [];

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

      const iframeProps = {
        src: `https://www.google.com/maps/embed/v1/directions?key=AIzaSyAEypkJ8m2C1aDAzG_VhOiKn7sMIE0n5Wk&` + urlParams.join('&')
      };

      rendered = <iframe {...iframeProps} />;

    } else if (locations.length === 1) {

      urlParams = [ `q=${first}` ];

      const iframeProps = {
        src: `https://www.google.com/maps/embed/v1/place?key=AIzaSyAEypkJ8m2C1aDAzG_VhOiKn7sMIE0n5Wk&` + urlParams.join('&')
      };

      rendered = <iframe {...iframeProps} />;

    }

    return rendered;

  }

}


export default MapCard;
