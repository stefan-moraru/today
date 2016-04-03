import React from 'react';
import Card from 'common/components/card';

class DirectionsCard extends Card {

  constructor(props) {

    super(props);

    this.state = {
      mapVisible: false,
      positionLat: null,
      positionLong: null
    };

    this.getPosition();

    setInterval(() => {
      this.getPosition();
    }, 3000);

  }

  hideMap() {

    this.setState({
      mapVisible: false
    });

  }

  showMap() {

    this.setState({
      mapVisible: true
    });

  }

  getPosition() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.savePosition.bind(this));
    }

  }

  savePosition(pos) {

    this.setState({
      positionLat: pos.coords.latitude,
      positionLong: pos.coords.longitude
    });

  }

  getType() {

    return 'directions';

  }

  getTitle() {

    return this.props.title;

  }

  getMap(lat, long) {

    const first = `${lat}, ${long}`;
    const last = 'Universitatea Alexandru Ioan Cuza Iasi';

    const urlParams = [
      `mode=walking`,
      `origin=${first}`,
      `destination=${last}`
    ];

    const iframeProps = {
      src: `https://www.google.com/maps/embed/v1/directions?key=AIzaSyAEypkJ8m2C1aDAzG_VhOiKn7sMIE0n5Wk&` + urlParams.join('&')
    };

    return (
      <div className='fixed-full'>
        <iframe className='u-w-full u-h-full' {...iframeProps} />

        <div className='close-top u-c-pointer' onClick={ this.hideMap.bind(this) }>
          <i className='fa fa-times'></i>
        </div>
      </div>
    );

  }

  getLoading() {

    return (
      <div className='fixed-full'>
        Loading
      </div>
    );

  }

  getContent() {

    let map = null;

    if (this.state.mapVisible) {
      if (this.state.positionLat && this.state.positionLong) {
        map = this.getMap(this.state.positionLat, this.state.positionLong);
      } else {
        map = this.getLoading();
      }
    }

    return (
      <div>
        <button className='btn btn-info' onClick={ this.showMap.bind(this) }>Arata</button>

        { map }
      </div>
    );

  }

}

export default DirectionsCard;
