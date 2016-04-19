import React from 'react';
import Card from 'common/components/card';
import WeatherService from 'common/services/weatherservice';

class WeatherCard extends Card {

  constructor(props) {

    super(props);

    this.state = {
      weather: {}
    };

  }

  getType() {

    return `weather`;

  }

  getTitle() {

    return this.props.title;

  }

  getDescription() {

    return this.props.description;

  }

  componentDidMount() {

    WeatherService.weatherForCity(this.props.city).then(this.saveWeather.bind(this));

  }

  saveWeather(weather) {

    this.setState({
      weather: weather
    });

  }

  outdoorEventsCount(events) {

    return events
    .filter(event => event.locationType === 'outdoor')
    .length;

  }

  outdoorEventsMessage(count) {

    let message = '';

    if (count < 1) {

      message = 'You have no outdoor events today, but if you are walking, consider the weather.';

    } else {

      message = `You have ${count} outdoor events today.`;

    }

    return message;

  }

  getContent() {

    const city = this.props.city;
    const weather = this.state.weather;
    const events = this.props.events;
    const outdoorEventsCount = this.outdoorEventsCount(events);
    const outdoorEventsMessage = this.outdoorEventsMessage(outdoorEventsCount);

    const suggestions = WeatherService.s(weather);

    const sUmbrella = suggestions['umbrella'];
    const sSunGlasses = suggestions['sunGlasses'];
    const sClothes = suggestions['clothes'];

    let clothes = '';

    if (sClothes === 0) {
      clothes = 'Warm clothes';
    } else if (sClothes === 1) {
      clothes = 'Medium clothes';
    } else if (sClothes === 2) {
      clothes = 'Thin clothes';
    }

    return (
      <div>
        <span>{ outdoorEventsMessage }</span>

        <div className='suggestions'>
          <div className='suggestion u-ctr-flex u-ctr-flex-v'>
            <div className='icon u-fl u-ctr-flex u-ctr-flex-vh'>
              <i className='fa fa-umbrella fa-fw'></i>
            </div>
            <span>{ sUmbrella ? 'Yes' : 'No' }</span>
          </div>

          <div className='clearfix'></div>

          <div className='suggestion u-ctr-flex u-ctr-flex-v'>
            <div className='icon u-fl u-ctr-flex u-ctr-flex-vh'>
              <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/8272-200.png' />
            </div>
            <span>{ sSunGlasses ? 'Yes' : 'No' }</span>
          </div>

          <div className='clearfix'></div>

          <div className='suggestion u-ctr-flex u-ctr-flex-v'>
            <div className='icon u-fl u-ctr-flex u-ctr-flex-vh'>
              <img src='http://www.nairobiacademy.or.ke/images/school_uniform.png' />
            </div>
            <span>{ clothes }</span>
          </div>
        </div>
      </div>
    );

  }

}

WeatherCard.defaultProps = {
  city: '',
  events: []
};

export default WeatherCard;
