import moment from 'moment';

const dayResume = (vec) => {
	const todayDate = moment().format('YYYY-MM-DD');
	const todayHour = moment().hour();
	let totalDuration = 0, firstHour, lastHour, minutesBreak = 0, countBreaks = 0, startValue = 0, endValue = 0;

	vec = vec.filter(function(item) {
		return moment(item.date).isSame(todayDate);
	});

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

	vec.forEach(function(item) {
		totalDuration += item.duration;
	});

	for (let i = 0; i < vec.length - 1; i++) {
		endValue = vec[i].time.h * 60 + vec[i].time.m + vec[i].duration;
		startValue = vec[i + 1].time.h * 60 + vec[i + 1].time.m;

		if (endValue < startValue) {
			countBreaks++;
		}

		minutesBreak =  minutesBreak + startValue - endValue;
	}

	const hoursOfActivity = vec[vec.length - 1].time.h - vec[0].time.h;

	//TODO: Group messages
	if (minutesBreak <= 120) {
		if (minutesBreak < 0 && hoursOfActivity > 6) {
			return "Se pare ca astazi vei avea evenimente care se vor intersecta...";
		}

		if (minutesBreak < 0 && hoursOfActivity < 6) {
			return "Desi unele evenimente se vor intersecta, nu va fi o zi solicitanta.";
		}

		if (minutesBreak === 0 && hoursOfActivity >= 6) {
			return "Astazi ai " + vec.length + " evenimente, fara pauza. Sper ca te-ai odihnit bine, va fi o zi lunga.";
		}

		if (minutesBreak === 0 && hoursOfActivity <= 6) {
			return "Astazi ai " + vec.length + " evenimente. Desi sunt fara pauza, nu va fi o zi solicitanta.";
		}

		if (minutesBreak > 0 && hoursOfActivity < 6 && countBreaks === 1) {
			return "Vei avea o pauza intre activitatile tale. Va fi o zi usoara.";
		}

		if (minutesBreak > 0 && hoursOfActivity < 6 && countBreaks > 1) {
			return "Ziua de astazi va fi una relaxanta. Vei avea mai multe pauze in cadrul evenimentelor tale.";
		}

		if (minutesBreak > 0 && hoursOfActivity > 6 && countBreaks === 1) {
			return "Vei avea o zi destul de solicitanta, o zi in care ar trebui sa fructifici pauza pe care o ai.";
		}

		if (minutesBreak > 0 && hoursOfActivity > 6 && countBreaks > 1) {
			return "Pauze scurte intre activitati. Va fi o zi solicitanta";
		}
	}

	if (minutesBreak > 120 && minutesBreak < 240) {
		if (hoursOfActivity < 8 && countBreaks === 1) {
			return "Astazi va fi o zi normala, cu o pauza intre evenimentele tale";
		}

		if (hoursOfActivity < 8 && countBreaks > 1) {
			return "Astazi va fi o zi ca oricare alta, in care vei avea " + countBreaks + "pauze";
		}

		if (hoursOfActivity >= 8 && countBreaks === 1) {
			return "Ziua de azi va fi normala, cu o pauza de " + minutesBreak + " minute";
		}

		if (hoursOfActivity >= 8 && countBreaks > 1) {
			return "Desi programul tau este intins, vei avea " + countBreaks +" pauze pentru a te relaxa";
		}
	}

	if (minutesBreak >= 240) {
		if (hoursOfActivity < 8 && countBreaks === 1) {
			return "Vei avea o zi relaxanta, cu o pauza considerabil de mare";
		}

		if (hoursOfActivity < 8 && countBreaks > 1) {
			return "Vei avea o zi linistita cu " + countBreaks + " pauze";
		}

		if (hoursOfActivity >= 8 && countBreaks === 1) {
			return "Astazi ai o pauza lunga intre evenimentele tale";
		}

		if (hoursOfActivity >= 8 && countBreaks > 1) {
			return "Ziua de azi va fi o zi normala. Vei avea " + countBreaks + " pauze";
		}
 	}

}

const todayEvents = (events) => {

	const today = moment().format('YYYY-MM-DD');

	return events.filter(ev => {
		return ev.date === today;
	});

};

export default {
  dayResume,
	todayEvents
};
