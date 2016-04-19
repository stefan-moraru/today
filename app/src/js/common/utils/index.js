import moment from 'moment';

const eventsDuration = (vec) => {
  return vec.reduce((prev, current) => prev + current.duration, 0);
};

const activityMinutes = (vec) => {
  return activityHours(vec) * 60;
};

const activityHours = (vec) => {
  return vec[vec.length - 1].time.h - vec[0].time.h;
};

const eventValue = (event) => {
  return event.time.h * 60 + event.time.m + event.duration;
};

const eventStartMinutes = (event) => {
  return event.time.h * 60 + event.time.m;
};

const eventEnd = (event) => {
  const value = eventValue(event);

  return { h: value / 60, m: value % 60 };
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

  return vec.reduce((prev, current) => prev + current.duration, 0);

};

const sortEvents = (vec) => {

  return vec
  .sort(function(a, b) {
    return eventStartMinutes(a) > eventStartMinutes(b);
  });

};

const dayResume = (vec) => {
  if (vec.length < 1) {
    return "Zi libera!";
  } else if (vec.length === 1) {
    return "Astazi va fi o zi placuta, vei avea un eveniment de la ora " + vec[0].time.h;
  }

  vec = sortEvents(vec);

  const totalDuration = eventsDuration(vec);
  const hours = activityHours(vec);
  const breakDuration = breakMinutes(vec);
  const countBreaks = breakCount(vec);

	//TODO: Group messages
  return 'Easy day';

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
    sen = `${h}h `
  }

  if (m > 0) {
    sen = `${sen}${m}m`;
  }

  return sen;

};

const durationAsSentence = (duration) => {

  //TODO

  const h = Math.floor(duration / 60);
  const m = Math.floor(duration % 60);
  let sen = '';

  if (h) {
    if (h === 1) {
      sen += 'O ora';
    } else {
      sen += `${h} ore`;
    }
  }

  if (m) {
    if (h) {
      sen += ' si ';
    }

    if (m < 20) {
      sen += `${m} minute`;
    } else {
      sen += `${m} de minute`;
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
  activityMinutes,
  padTime,
  colorForCategory,
  isToday,
  isNow,
  durationAsSentence,
  durationAsShortSentence
};
