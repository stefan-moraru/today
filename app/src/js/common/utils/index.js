import moment from 'moment';
import WeatherService from 'common/services/weatherservice';

const eventsDuration = (vec) => {

  let duration;

  if (vec.length === 1) {
    duration = vec.duration;
  } else {
    duration = vec.reduce((prev, current) => prev + current.duration, 0);
  }

  return duration;

};

const sortEvents = (vec) => {

  return vec
  .sort(function(a, b) {
    return eventStartMinutes(a) > eventStartMinutes(b);
  });

};


const nextEvent = (events) => {

  let nextEv = {};
  let min = 1440;
  const current = moment().hour() * 60 + moment().minute();

  sortEvents(events)
  .forEach(event => {
    const val = eventValue(event);
    const diff = current - val;

    if (diff > 0 && diff < min) {
      min = diff;
      nextEv = event;
    }
  });

  return nextEv;

};

const eventValue = (event) => {
  return event.time.h * 60 + event.time.m + event.duration;
};

const eventStartMinutes = (event) => {
  return event.time.h * 60 + event.time.m;
};

const eventEnd = (event) => {
  const value = eventValue(event);

  return { h: parseInt(value / 60), m: parseInt(value % 60) };
};

const breakIntervals = (vec) => {

  // There are no events, so no breaks.
  if (!vec.length) {
    return [];
  }

  // We will use this to store events based on their duration
  // time[i] indicates if the minute i in the day is occupied
  const time = Array.apply(null, Array(1440)).map(() => 0);

  vec = sortEvents(vec);

  // Remove time before first event and after last event
  // It's not break time, it's free time
  const _start = eventValue(vec[0]);
  const _end = Math.max.apply(null, vec.map(eventValue));

  for (let i = 0; i < _start; i++) {
    time[i] = 1;
  }

  for (let i = _end; i < 1440; i++) {
    time[i] = 1;
  }

  vec.forEach((event) => {
    for (let i = eventStartMinutes(event); i < eventValue(event); i++) {
      time[i] = 1;
    }
  });

  let start = null, end, duration;
  let intervals = [];

  for (let i = 0; i < 1440; i++) {
    if (time[i] === 0 && start === null) {
      start = i;
    }

    if (time[i] === 1 && start !== null) {
      end = i;
      duration = end - start;

      intervals.push({
        start: {
          h: Math.floor(start / 60),
          m: start % 60
        },
        end: {
          h: Math.floor(end / 60),
          m: end % 60
        },
        duration: duration
      });

      start = null;
    }
  }

  intervals = intervals.map(brk => {

    let location = '';

    let locations = vec.filter(event => {
      const evEnd = eventEnd(event);

      return brk.start.h === evEnd.h && brk.start.m === evEnd.m;
    })
    .sort((a, b) => {
      return a.priority > b.priority;
    });

    location = ((locations || [{}])[0] || {location: ''}).location;

    brk.location = location;

    return brk;

  });

  return intervals;

};

const breakCount = (vec) => {

  return breakIntervals(vec).length;

};

const breakMinutes = (vec) => {

  return breakIntervals(vec).reduce((prev, current) => prev + current.duration, 0);

};

const empty = (vec) => {

  let _empty = true;

  vec.forEach(item => {
    if (item) {
      _empty = false;
    }
  });

  return _empty;

};

const dayResume = (vec, weather) => {

  const events = sortEvents(vec);

  if (events.length < 1) {
    return 'Free day.';
  }

  if (empty(events)) {
    return 'Free day.';
  }

  const totalDuration = eventsDuration(events);
  const breakDuration = breakMinutes(events);
  const countBreaks = breakCount(events) || 'no';

  //First part = First event
  let firstPart = '';

  const title = events[0].title;
  const location = events[0].location;

  if (title) {
    firstPart = `Your day will start with ${title}`;

    if (location) {
      firstPart = firstPart.concat(`, at ${location}`);
    }
  }

  //Second part = break / event raport
  let secondPart = '';

  let difficulty = 'easy';

  if (breakDuration && totalDuration / (breakDuration || 1) >= 1) {
    difficulty = 'easy';
  }

  if (breakDuration && totalDuration / breakDuration < 1) {
    difficulty = 'medium';
  }

  if (totalDuration > 480) {
    difficulty = 'hard';
  }

  secondPart = `With a total of ${events.length} events, and ${countBreaks} breaks, it will be a relatively ${difficulty} day`;

  //Third part = weather
  let thirdPart = '';

  const suggestions = WeatherService.s(weather);

  let clothesType = '';

  if (suggestions.clothes > -1) {
    const types = [ 'warm', 'moderate', 'thin' ];

    thirdPart += `To feel comfortable, wear ${types[suggestions.clothes]} clothes. `;
  }

  if (suggestions.umbrella) {
    thirdPart += `It will rain, so you might want to take an umbrella. `;
  }

  if (suggestions.sunGlasses) {
    thirdPart += `Sunny, so better wear sunglasses. `;
  }

  return `${firstPart}. ${secondPart}. ${thirdPart}`;

}

const todayEvents = (events, today = moment().format('YYYY-MM-DD')) => {

  return events.filter(ev => {
    return ev.date === today;
  });

};

const padTime = (time) => {

  if (!time) {
    return '--:--';
  }

  let hour = time.h;
  let minutes = time.m;

  if (hour < 10) {
    hour = `0${hour}`
  }

  if (minutes == 0) {
    minutes = `00`;
  }

  return `${hour}:${minutes}`;

}

const colorForCategory = (category) => {

  const colors = {
    'food': '#e74c3c',
    'sports': '#27ae60',
    'education': '#2980b9',
    'default': '#34495e'
  };

  let color = colors[category.title];

  if (!color) {
    color = colors['default']
  }

  return color;

};

const isToday = (date) => {

  return date === moment().format('YYYY-MM-DD');

};

const isNow = (date, time) => {

  const now = new Date();
  const nowH = now.getHours();
  let nowM = now.getMinutes();

  if (nowM > 30) {
    nowM = 30;
  } else {
    nowM = 0;
  }

  return isToday(date) && time.h === nowH && time.m === nowM;

};

const durationAsShortSentence = (duration) => {

  const h = Math.floor(duration / 60);
  const m = Math.floor(duration % 60);
  let sen = '';

  if (h > 0) {
    sen = `${h}h`
  }

  if (m > 0) {
    if (h > 0) {
      sen += ' ';
    }

    sen = `${sen}${m}m`;
  }

  return sen;

};

const durationAsSentence = (duration) => {

  const h = Math.floor(duration / 60);
  const m = Math.floor(duration % 60);
  let sen = '';

  if (h) {
    if (h === 1) {
      sen += 'One hour';
    } else {
      sen += `${h} hours`;
    }
  }

  if (m) {
    if (h) {
      sen += ' and ';
    }

    if (m < 20) {
      sen += `${m} minutes`;
    } else {
      sen += `${m} minutes`;
    }
  }

  return sen;

};

export default {
  dayResume,
  todayEvents,
  breakMinutes,
  breakIntervals,
  eventsDuration,
  eventValue,
  eventStartMinutes,
  padTime,
  colorForCategory,
  isToday,
  isNow,
  durationAsSentence,
  durationAsShortSentence,
  nextEvent
};
