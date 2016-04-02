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

const breakCount = (vec) => {
  let countBreaks = 0, endValue, startValue;

  for (let i = 0; i < vec.length - 1; i++) {
    endValue = vec[i].time.h * 60 + vec[i].time.m + vec[i].duration;
    startValue = vec[i + 1].time.h * 60 + vec[i + 1].time.m;

    if (endValue < startValue) {
      countBreaks++;
    }
  }

  return countBreaks;
};

const breakMinutes = (vec) => {
  let breakDuration = 0, endValue, startValue;

  for (let i = 0; i < vec.length - 1; i++) {
    endValue = vec[i].time.h * 60 + vec[i].time.m + vec[i].duration;
    startValue = vec[i + 1].time.h * 60 + vec[i + 1].time.m;

    breakDuration += startValue - endValue;
  }

  return breakDuration;
};

const dayResume = (vec) => {
  if (vec.length < 1) {
    return "Zi libera!";
  } else if (vec.length === 1) {
    return "Astazi va fi o zi placuta, vei avea un eveniment de la ora " + vec[0].time.h;
  }

  vec = vec
  .map(function(item) {
    item.value = item.time.h * 60 + item.time.m;

    return item;
  })
  .sort(function(a, b) {
    return a.value > b.value;
  });

  const totalDuration = eventsDuration(vec);
  const hours = activityHours(vec);
  const breakDuration = breakMinutes(vec);
  const countBreaks = breakCount(vec);

	//TODO: Group messages
  if (breakDuration <= 120) {
    if (breakDuration < 0 && hours > 6) {
      return "Se pare ca astazi vei avea evenimente care se vor intersecta...";
    }

    if (breakDuration < 0 && hours < 6) {
      return "Desi unele evenimente se vor intersecta, nu va fi o zi solicitanta.";
    }

    if (breakDuration === 0 && hours >= 6) {
      return "Astazi ai " + vec.length + " evenimente, fara pauza. Sper ca te-ai odihnit bine, va fi o zi lunga.";
    }

    if (breakDuration === 0 && hours <= 6) {
      return "Astazi ai " + vec.length + " evenimente. Desi sunt fara pauza, nu va fi o zi solicitanta.";
    }

    if (breakDuration > 0 && hours < 6 && countBreaks === 1) {
      return "Vei avea o pauza intre activitatile tale. Va fi o zi usoara.";
    }

    if (breakDuration > 0 && hours < 6 && countBreaks > 1) {
      return "Ziua de astazi va fi una relaxanta. Vei avea mai multe pauze in cadrul evenimentelor tale.";
    }

    if (breakDuration > 0 && hours > 6 && countBreaks === 1) {
      return "Vei avea o zi destul de solicitanta, o zi in care ar trebui sa fructifici pauza pe care o ai.";
    }

    if (breakDuration > 0 && hours > 6 && countBreaks > 1) {
      return "Pauze scurte intre activitati. Va fi o zi solicitanta";
    }
  }

  if (breakDuration > 120 && breakDuration < 240) {
    if (hours < 8 && countBreaks === 1) {
      return "Astazi va fi o zi normala, cu o pauza intre evenimentele tale";
    }

    if (hours < 8 && countBreaks > 1) {
      return "Astazi va fi o zi ca oricare alta, in care vei avea " + countBreaks + "pauze";
    }

    if (hours >= 8 && countBreaks === 1) {
      return "Ziua de azi va fi normala, cu o pauza de " + breakDuration + " minute";
    }

    if (hours >= 8 && countBreaks > 1) {
      return "Desi programul tau este intins, vei avea " + countBreaks +" pauze pentru a te relaxa";
    }
  }

  if (breakDuration >= 240) {
    if (hours < 8 && countBreaks === 1) {
      return "Vei avea o zi relaxanta, cu o pauza considerabil de mare";
    }

    if (hours < 8 && countBreaks > 1) {
      return "Vei avea o zi linistita cu " + countBreaks + " pauze";
    }

    if (hours >= 8 && countBreaks === 1) {
      return "Astazi ai o pauza lunga intre evenimentele tale";
    }

    if (hours >= 8 && countBreaks > 1) {
      return "Ziua de azi va fi o zi normala. Vei avea " + countBreaks + " pauze";
    }
  }

  return '';

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

export default {
  dayResume,
  todayEvents,
  breakMinutes,
  eventsDuration,
  activityMinutes,
  padTime,
  colorForCategory
};
