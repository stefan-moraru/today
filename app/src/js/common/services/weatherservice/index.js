import superagent from 'superagent';

const parseWeatherResponse = (res) => {

  let parsed = {};

  parsed.sky = (res.weather[0] || '').id;
  parsed.temperature = (res.main || {}).temp;
  parsed.wind = (res.wind || {}).speed;

  return parsed;

};

const sUmbrella = (weather) => {

  let suggestion = false;

  if (weather && weather.sky) {

    const sky = weather.sky;
    const id = sky.id;
    const idLetter = sky.toString()[0];

    const shouldMatch = [
      '2', '3', '5', 804, 906, 960
    ];

    suggestion = shouldMatch.indexOf(idLetter) !== -1 || shouldMatch.indexOf(sky) !== -1;

  }

  return suggestion;

};

const s = (weather) => { // Short for 'suggestion'

  let suggestions;

  if (weather) {

    suggestions = {
      umbrella: sUmbrella(weather)
    };

  }

  return suggestions;

};

const weatherForCity = (city) => {

  return new Promise((resolve, reject) => {

    superagent
    .get('http://api.openweathermap.org/data/2.5/weather?units=metric&q=Iasi,RO&appid=cb49502cb7697b7b7e3796c6059e6a1b')
    .end((err, res) => {

      let ret = {};

      if (res.body) {

        ret = parseWeatherResponse(res.body);

      }

      resolve(ret);

    });

  });

}

export default {
  weatherForCity: weatherForCity,
  s: s
};
