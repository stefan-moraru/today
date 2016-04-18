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

  getContent() {

    const city = this.props.city;
    const weather = this.state.weather;

    const suggestions = WeatherService.s(weather);

    const sUmbrella = suggestions['umbrella'];

    return (
      <div>
        <h2>{ sUmbrella ? 'umbr' : 'no-umbr' }</h2>
      </div>
    );

  }

}

WeatherCard.defaultProps = {
  city: ''
};

export default WeatherCard;
